'use strict';

const assert = require('node:assert/strict');
const Evidence = require('../../src/pedagogy/memory-evidence-v2-core.js');

const stores = {
  learner: {
    schemaVersion: 2,
    knownItems: ['i1', 'i2'],
    completedLessons: ['l1'],
    lessonProgress: { l2: 3 },
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
      s1: {
        plays: 2,
        completions: 1,
        bestErrors: 1,
        lastPlayed: '2026-08-11T08:00:00.000Z',
        lastCompleted: '2026-08-11T08:10:00.000Z'
      }
    },
    totalCompletions: 1
  },
  listening: {
    schemaVersion: 1,
    totals: { attempts: 3, correct: 2, misses: 1 },
    families: {
      meaning: { attempts: 1, correct: 1 },
      contrast: { attempts: 1, correct: 0 },
      dialogue: { attempts: 1, correct: 1 }
    },
    recent: [
      { at: '2026-08-08T10:00:00.000Z', family: 'meaning', id: 'meaning:i1', ok: true, slow: false, replays: 1 },
      { at: '2026-08-08T11:00:00.000Z', family: 'contrast', id: 'contrast:g1:i2', ok: false, slow: true, replays: 0 },
      { at: '2026-08-08T12:00:00.000Z', family: 'dialogue', id: 'dialogue:d1', ok: true, slow: false, replays: 0 }
    ]
  },
  milestones: { schemaVersion: 1, seen: { welcome: true } }
};

const sourceBefore = JSON.stringify(stores);
const run = Evidence.simulate(stores, { curriculumItemIds: ['i1', 'i2'] });
assert.equal(run.ok, true);
assert.equal(run.deterministic, true);
assert.equal(run.sourceUntouched, true);
assert.equal(JSON.stringify(stores), sourceBefore);
assert.equal(run.proposal.schemaVersion, 2);
assert.equal(run.proposal.adoption, 'dry-run-only');
assert.equal(run.proposal.proposedStoreKey, 'french-tranquille:memory-evidence:v2');
assert.deepEqual(Object.keys(run.proposal.items), ['i1', 'i2']);

const i1 = run.proposal.items.i1;
const i2 = run.proposal.items.i2;
assert.equal(i1.state, 'autonomous-recall');
assert.equal(i2.state, 'contextual-reuse');
assert.equal(i1.dimensions.listening.successes, 1);
assert.equal(i2.dimensions.listening.misses, 1);
assert.equal(i1.dimensions.recognition.unrecognized, 1);
assert.equal(i1.dimensions.recognition.misses, 0, 'speech-recognition miss must not become pronunciation failure');
assert.equal(i2.dimensions.assistance.assisted, 1);
assert.notEqual(i2.state, 'assisted-success', 'model use alone cannot prove assisted success');
assert.equal(i1.dimensions.construction.reconstructable, false);
assert.equal(i1.dimensions.transfer.reconstructable, false);
assert(run.diagnostics.warnings.some(warning => warning.code === 'listening-dialogue-unattributed'));
assert(run.diagnostics.warnings.some(warning => warning.code === 'scenario-aggregate-unattributed'));
assert(run.diagnostics.warnings.some(warning => warning.code === 'milestones-not-item-evidence'));

const many = JSON.parse(JSON.stringify(stores));
many.errors.items.i1.events = Array.from({ length: 40 }, (_, index) => ({
  type: 'practice-miss',
  source: 'practice',
  at: new Date(Date.UTC(2026, 7, 1, 0, index)).toISOString(),
  repeated: index > 0
}));
const bounded = Evidence.project(many, { maxItemHistory: 7 });
assert.equal(bounded.ok, true);
assert.equal(bounded.proposal.items.i1.history.length, 7);

const corrupt = JSON.parse(JSON.stringify(stores));
corrupt.memory.schemaVersion = 99;
const rejected = Evidence.project(corrupt);
assert.equal(rejected.ok, false);
assert(rejected.diagnostics.quarantineCandidates.some(entry => entry.sourceStore === 'memory'));

const normalizedBackup = { format: 'french-tranquille-backup', version: 2, stores };
assert.equal(Evidence.projectBackup(normalizedBackup).ok, true);
const legacyBackup = { format: 'french-tranquille-backup', version: 1, learner: stores.learner, memory: stores.memory };
const needsRecoveryNormalization = Evidence.projectBackup(legacyBackup);
assert.equal(needsRecoveryNormalization.ok, false);
assert.equal(needsRecoveryNormalization.diagnostics.issues[0].code, 'backup-normalization-required');

console.log('Build 35 Memory Evidence v2 projection smoke: PASS');
