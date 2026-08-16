'use strict';

const assert = require('node:assert/strict');
const Recovery = require('../../src/core/data-recovery-core.js');
const Evidence = require('../../src/pedagogy/memory-evidence-v2-core.js');
const MigrationSim = require('../../src/pedagogy/memory-evidence-v2-migration-sim.js');

const stores = {
  learner: {
    schemaVersion: 2,
    lessonProgress: { l2: 3 },
    completedLessons: ['l1'],
    knownItems: ['i1', 'i2'],
    reviewState: { i1: 2, i2: 0 }
  },
  memory: {
    schemaVersion: 1,
    items: {
      i1: {
        id: 'i1',
        firstSeen: '2026-08-01T08:00:00.000Z',
        lastSeen: '2026-08-10T10:00:00.000Z',
        lastReviewed: '2026-08-10T10:00:00.000Z',
        attempts: 3,
        successes: 3,
        misses: 0,
        streak: 2,
        strength: 3,
        lastRating: 2,
        lastSource: 'smart-review'
      },
      i2: {
        id: 'i2',
        firstSeen: '2026-08-02T08:00:00.000Z',
        lastSeen: '2026-08-11T10:00:00.000Z',
        attempts: 2,
        successes: 1,
        misses: 1,
        streak: 0,
        strength: 1,
        lastRating: 1,
        lastSource: 'scenario-success'
      }
    },
    totals: { reviews: 5 }
  },
  errors: {
    schemaVersion: 1,
    items: {
      i1: {
        recoveries: 1,
        lastRecoveryAt: '2026-08-09T09:00:00.000Z',
        lastSource: 'review',
        events: [
          { type: 'retrieval-difficult', source: 'smart-review', at: '2026-08-05T09:00:00.000Z', repeated: false },
          { type: 'voice-unrecognized', source: 'free-voice', at: '2026-08-06T09:00:00.000Z', repeated: false }
        ]
      },
      i2: {
        recoveries: 0,
        events: [
          { type: 'assisted', source: 'scenario-assisted', at: '2026-08-07T09:00:00.000Z', repeated: false }
        ]
      }
    },
    recent: [],
    totals: { errors: 3, recoveries: 1, assisted: 1, voice: 1, repeated: 0 }
  },
  scenarios: {
    schemaVersion: 1,
    scenarios: {
      s1: { plays: 2, completions: 1, bestErrors: 1 }
    },
    totalCompletions: 1
  },
  listening: {
    schemaVersion: 1,
    totals: { attempts: 2, correct: 1, misses: 1 },
    families: {
      meaning: { attempts: 1, correct: 1 },
      contrast: { attempts: 1, correct: 0 },
      dialogue: { attempts: 0, correct: 0 }
    },
    recent: [
      { at: '2026-08-08T10:00:00.000Z', family: 'meaning', id: 'meaning:i1', ok: true, slow: false, replays: 1 },
      { at: '2026-08-08T11:00:00.000Z', family: 'contrast', id: 'contrast:g1:i2', ok: false, slow: true, replays: 0 }
    ]
  },
  milestones: { schemaVersion: 1, seen: { welcome: true } }
};

function rawSeed(sourceStores = stores) {
  return Object.fromEntries(Recovery.STORE_SPECS.map(spec => [
    spec.key,
    sourceStores[spec.id] == null ? null : JSON.stringify(sourceStores[spec.id])
  ]));
}

const sandbox = MigrationSim.createSandboxStorage(rawSeed());
const initialDump = sandbox.dump();
const success = MigrationSim.simulateTransaction({
  storage: sandbox,
  recovery: Recovery,
  evidence: Evidence,
  projectionOptions: { curriculumItemIds: ['i1', 'i2'] }
});
assert.equal(success.ok, true);
assert.equal(success.committedInSandbox, true);
assert.equal(success.verified, true);
assert.equal(success.rereadMatched, true);
assert.equal(success.rolledBack, true);
assert.equal(success.sourceUntouched, true);
assert.equal(success.targetRestored, true);
assert.deepEqual(sandbox.dump(), initialDump, 'successful simulation must leave the sandbox byte-equivalent');
assert.equal(sandbox.getItem(Evidence.PROPOSED_STORE_KEY), null);

for (const fault of ['after-write', 'corrupt-target', 'source-drift']) {
  const faulty = MigrationSim.createSandboxStorage(rawSeed());
  const before = faulty.dump();
  const result = MigrationSim.simulateTransaction({
    storage: faulty,
    recovery: Recovery,
    evidence: Evidence,
    projectionOptions: { curriculumItemIds: ['i1', 'i2'] },
    fault
  });
  assert.equal(result.ok, false, `${fault} must fail the simulated transaction`);
  assert.equal(result.rolledBack, true, `${fault} must rollback exactly`);
  assert.equal(result.sourceUntouched, true, `${fault} must restore all six source stores`);
  assert.equal(result.targetRestored, true, `${fault} must restore/remove the proposed target`);
  assert.deepEqual(faulty.dump(), before, `${fault} must leave the sandbox byte-equivalent`);
}

const preexisting = MigrationSim.createSandboxStorage({
  ...rawSeed(),
  [Evidence.PROPOSED_STORE_KEY]: '{"preexisting":true}'
});
const preexistingBefore = preexisting.dump();
const preexistingRun = MigrationSim.simulateTransaction({ storage: preexisting, recovery: Recovery, evidence: Evidence });
assert.equal(preexistingRun.ok, true);
assert.equal(preexisting.getItem(Evidence.PROPOSED_STORE_KEY), '{"preexisting":true}');
assert.deepEqual(preexisting.dump(), preexistingBefore, 'preexisting target must be restored exactly');

const corruptSeed = rawSeed();
const memorySpec = Recovery.STORE_SPECS.find(spec => spec.id === 'memory');
corruptSeed[memorySpec.key] = '{broken-json';
const corruptSandbox = MigrationSim.createSandboxStorage(corruptSeed);
const corruptBefore = corruptSandbox.dump();
const rejected = MigrationSim.simulateTransaction({ storage: corruptSandbox, recovery: Recovery, evidence: Evidence });
assert.equal(rejected.ok, false);
assert.equal(rejected.stage, 'source-validation');
assert.equal(rejected.quarantined, true);
assert(rejected.quarantineRecords.some(record => record.sourceStore === 'memory' && record.reason === 'invalid-json'));
assert.equal(rejected.rolledBack, true);
assert.deepEqual(corruptSandbox.dump(), corruptBefore, 'invalid source is preserved and quarantine is simulation-only');

assert.throws(() => MigrationSim.simulateTransaction({
  storage: { getItem() { return null; }, setItem() {}, removeItem() {} },
  recovery: Recovery,
  evidence: Evidence
}), /sandbox-required/);

const legacyBackup = {
  format: 'french-tranquille-backup',
  version: 1,
  exportedAt: '2026-08-12T00:00:00.000Z',
  learner: stores.learner,
  memory: stores.memory
};
const legacyRun = MigrationSim.simulateBackupTransaction(legacyBackup, {
  recovery: Recovery,
  evidence: Evidence,
  projectionOptions: { curriculumItemIds: ['i1', 'i2'] }
});
assert.equal(legacyRun.ok, true);
assert.equal(legacyRun.migratedFrom, 1);
assert.equal(legacyRun.backupVersion, 2);
assert.equal(legacyRun.preserveMissing, true);
assert.equal(legacyRun.verified, true);
assert.equal(legacyRun.rolledBack, true);

const invalidBackup = MigrationSim.simulateBackupTransaction({ format: 'wrong', version: 1 }, { recovery: Recovery, evidence: Evidence });
assert.equal(invalidBackup.ok, false);
assert.equal(invalidBackup.stage, 'backup-normalization');
assert.equal(invalidBackup.rolledBack, true);

console.log('Build 35 Memory Evidence v2 transaction simulation smoke: PASS');
