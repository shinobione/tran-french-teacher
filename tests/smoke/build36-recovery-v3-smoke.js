'use strict';

const assert = require('node:assert/strict');
const RecoveryV2 = require('../../src/core/data-recovery-core.js');
const Evidence = require('../../src/pedagogy/memory-evidence-v2-core.js');
const RecoveryV3 = require('../../src/core/data-recovery-v3-contract.js');

function baseStores() {
  return {
    learner: {
      schemaVersion: 2,
      lessonProgress: { l1: 3, l2: 1 },
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
      totals: { reviews: 5, difficult: 1, correct: 1, easy: 3 }
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
      scenarios: { s1: { plays: 2, completions: 1, bestErrors: 1 } },
      totalCompletions: 1
    },
    listening: {
      schemaVersion: 1,
      totals: { sessions: 1, attempts: 2, correct: 1, misses: 1, plays: 2, replays: 1, slowPlays: 1 },
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
}

const sources = baseStores();
const derived = RecoveryV3.deriveEvidenceShadow(sources);
assert.equal(derived.ok, true);
assert.equal(derived.shadow.schemaVersion, 2);
assert.equal(derived.shadow.role, 'derived-shadow');
assert.match(derived.shadow.source.fingerprint, /^fnv1a32:[0-9a-f]{8}$/);
assert.deepEqual(derived.shadow.source.derivedFrom, ['learner', 'memory', 'errors', 'scenarios', 'listening', 'milestones']);
assert.equal(derived.shadow.limits.maxItemHistory, Evidence.MAX_ITEM_HISTORY);
assert.equal(RecoveryV3.validateEvidenceShadow(derived.shadow).ok, true);
assert.equal(RecoveryV3.validateEvidenceShadow(derived.shadow, { sources, requireCoherence: true }).ok, true);
assert.equal(RecoveryV3.STORE_SPECS.length, 7);
assert.equal(RecoveryV3.BACKUP_VERSION, 3);
assert.equal(RecoveryV3.specForKey(Evidence.PROPOSED_STORE_KEY).id, 'evidence');

const changedSources = baseStores();
changedSources.memory.items.i1.attempts += 1;
const changed = RecoveryV3.deriveEvidenceShadow(changedSources);
assert.equal(changed.ok, true);
assert.notEqual(changed.shadow.source.fingerprint, derived.shadow.source.fingerprint, 'source fingerprint must change with source truth');
assert.equal(
  RecoveryV3.validateEvidenceShadow(derived.shadow, { sources: changedSources, requireCoherence: true }).issues.some(issue => issue.reason === 'evidence-source-mismatch'),
  true,
  'a structurally valid but stale shadow must fail coherence'
);

const invalidDimension = structuredClone(derived.shadow);
invalidDimension.items.i1.history[0].dimension = 'pronunciation-score';
const invalidDimensionResult = RecoveryV3.validateEvidenceShadow(invalidDimension);
assert.equal(invalidDimensionResult.ok, false);
assert(invalidDimensionResult.issues.some(issue => issue.reason === 'unsupported-history-dimension'));

const overBounded = structuredClone(derived.shadow);
overBounded.limits.maxItemHistory = 1;
assert.equal(RecoveryV3.validateEvidenceShadow(overBounded).ok, false, 'existing history larger than declared bound must fail');

const staleProvided = structuredClone(derived.shadow);
staleProvided.source.fingerprint = 'fnv1a32:00000000';
const backupV3 = RecoveryV3.buildBackupV3(
  { ...sources, evidence: staleProvided },
  { version: '2.4.0', build: 36 },
  { exportedAt: '2026-08-16T00:00:00.000Z' }
);
assert.equal(backupV3.version, 3);
assert.equal(Object.keys(backupV3.stores).sort().join(','), 'errors,evidence,learner,listening,memory,milestones,scenarios');
assert.equal(backupV3.stores.evidence.source.fingerprint, derived.shadow.source.fingerprint, 'v3 export must rebuild Evidence instead of trusting a stale supplied shadow');
assert.equal(RecoveryV3.validateBackupV3(backupV3).ok, true);

const v3Plan = RecoveryV3.planRestore(backupV3, { ...sources, evidence: staleProvided });
assert.equal(v3Plan.sourceVersion, 3);
assert.equal(v3Plan.migratedFrom, null);
assert.deepEqual(v3Plan.preserveMissingIds, []);
assert.deepEqual(v3Plan.rebuildDerivedIds, []);
assert.equal(v3Plan.targetStores.evidence.source.fingerprint, derived.shadow.source.fingerprint);
assert.equal(v3Plan.targetRaw[Evidence.PROPOSED_STORE_KEY], Evidence.canonicalStringify(v3Plan.targetStores.evidence));

const staleBackupV3 = structuredClone(backupV3);
staleBackupV3.stores.evidence = staleProvided;
assert.throws(() => RecoveryV3.planRestore(staleBackupV3, sources), /evidence-source-mismatch/);

const backupV2 = RecoveryV2.buildBackup({
  getItem(key) {
    const spec = RecoveryV2.specForKey(key);
    return spec && sources[spec.id] != null ? JSON.stringify(sources[spec.id]) : null;
  }
}, { version: '2.3.0', build: 34 });
const currentWithForeignEvidence = { ...baseStores(), evidence: staleProvided };
const v2Plan = RecoveryV3.planRestore(backupV2, currentWithForeignEvidence);
assert.equal(v2Plan.sourceVersion, 2);
assert.equal(v2Plan.migratedFrom, 2);
assert.deepEqual(v2Plan.preserveMissingIds, []);
assert.deepEqual(v2Plan.rebuildDerivedIds, ['evidence']);
assert.notEqual(v2Plan.targetStores.evidence.source.fingerprint, staleProvided.source.fingerprint, 'v2 restore must never preserve a newer device Evidence shadow');
assert.equal(
  RecoveryV3.validateEvidenceShadow(v2Plan.targetStores.evidence, { sources: v2Plan.targetStores, requireCoherence: true }).ok,
  true
);

const legacyLearner = {
  schemaVersion: 1,
  lesson1Step: 3,
  lesson1Completed: true,
  knownItems: ['i1'],
  reviewState: { i1: 2 }
};
const legacyMemory = structuredClone(sources.memory);
const backupV1 = {
  format: 'french-tranquille-backup',
  version: 1,
  exportedAt: '2026-08-12T00:00:00.000Z',
  learner: legacyLearner,
  memory: legacyMemory
};
const currentForV1 = baseStores();
currentForV1.errors.totals.errors = 77;
currentForV1.scenarios.totalCompletions = 9;
currentForV1.listening.totals.attempts = 55;
currentForV1.milestones.seen.current = true;
currentForV1.evidence = staleProvided;
const v1Plan = RecoveryV3.planRestore(backupV1, currentForV1);
assert.equal(v1Plan.sourceVersion, 1);
assert.equal(v1Plan.migratedFrom, 1);
assert.deepEqual(v1Plan.preserveMissingIds, ['errors', 'scenarios', 'listening', 'milestones']);
assert.deepEqual(v1Plan.rebuildDerivedIds, ['evidence']);
assert.deepEqual(v1Plan.targetStores.errors, currentForV1.errors);
assert.deepEqual(v1Plan.targetStores.scenarios, currentForV1.scenarios);
assert.deepEqual(v1Plan.targetStores.listening, currentForV1.listening);
assert.deepEqual(v1Plan.targetStores.milestones, currentForV1.milestones);
assert.notEqual(v1Plan.targetStores.evidence.source.fingerprint, staleProvided.source.fingerprint, 'v1 restore must rebuild Evidence from the combined target timeline');
assert.equal(
  RecoveryV3.validateEvidenceShadow(v1Plan.targetStores.evidence, { sources: v1Plan.targetStores, requireCoherence: true }).ok,
  true
);

assert.throws(() => RecoveryV3.normalizeBackup({ format: 'wrong', version: 3, stores: {} }), /invalid-backup-format/);
assert.throws(() => RecoveryV3.normalizeBackup({ format: RecoveryV3.FORMAT, version: 4, stores: {} }), /unsupported-backup-version:4/);

assert.equal(RecoveryV2.BACKUP_VERSION, 2, 'live Build 28 Recovery remains v2 during Build 36.1');
assert.equal(RecoveryV2.STORE_SPECS.length, 6, 'live Build 28 Recovery remains six-store during Build 36.1');
assert.equal(RecoveryV2.specForKey(Evidence.PROPOSED_STORE_KEY), null, 'live Recovery must not know the Evidence key yet');

console.log('Build 36.1 Recovery v3 contract smoke: PASS');
