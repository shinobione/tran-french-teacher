const assert = require('node:assert/strict');
const Core = require('../data-recovery-core.js');

class MemoryStorage {
  constructor(seed = {}) { this.map = new Map(Object.entries(seed)); this.failKey = null; }
  getItem(key) { return this.map.has(key) ? this.map.get(key) : null; }
  setItem(key, value) {
    if (this.failKey === key) throw new Error(`forced-write-failure:${key}`);
    this.map.set(key, String(value));
  }
  removeItem(key) {
    if (this.failKey === key) throw new Error(`forced-remove-failure:${key}`);
    this.map.delete(key);
  }
}

const samples = {
  learner: { schemaVersion:2, learnerName:'Trân', level:'A0', lessonProgress:{l1:999,l8:4}, completedLessons:['l1','l2','l3','l4','l5','l6','l7'], knownItems:['bonjour','merci'], reviewState:{bonjour:2}, conversationWins:5, streak:{current:6,lastDate:'2026-08-11'} },
  memory: { schemaVersion:1, items:{bonjour:{id:'bonjour',attempts:3}}, totals:{reviews:3,difficult:0,correct:2,easy:1}, updatedAt:'2026-08-12T00:00:00.000Z' },
  errors: { schemaVersion:1, items:{bonjour:{id:'bonjour',events:[]}}, recent:[], totals:{errors:1,recoveries:0,assisted:0,voice:0,repeated:0}, updatedAt:null },
  scenarios: { schemaVersion:1, scenarios:{cafe:{plays:2,completions:1}}, totalCompletions:1, updatedAt:null },
  listening: { schemaVersion:1, totals:{sessions:1,attempts:5,correct:4,misses:1,plays:6,replays:1,slowPlays:1}, families:{meaning:{attempts:5,correct:4},contrast:{attempts:0,correct:0},dialogue:{attempts:0,correct:0}}, recent:[], updatedAt:null },
  milestones: { schemaVersion:1, seen:{'first-lesson':'2026-08-12T00:00:00.000Z'}, updatedAt:null }
};

function seedStorage() {
  const raw = {};
  for (const spec of Core.STORE_SPECS) raw[spec.key] = JSON.stringify(samples[spec.id]);
  return new MemoryStorage(raw);
}

// Complete v2 backup must contain every durable store.
const storage = seedStorage();
const originalRaw = Core.collectRaw(storage);
const backup = Core.buildBackup(storage, { version:'1.21.0', build:28 });
assert.equal(backup.version, 2);
assert.deepEqual(Object.keys(backup.stores).sort(), Core.STORE_SPECS.map(spec => spec.id).sort());
assert.deepEqual(backup.stores.learner, samples.learner);
assert.deepEqual(backup.stores.listening, samples.listening);

// Mutation + restore must give byte-equivalent durable storage.
storage.setItem(Core.STORE_SPECS[0].key, JSON.stringify({ ...samples.learner, conversationWins:999 }));
const restored = Core.restore(storage, backup);
assert.equal(restored.ok, true);
assert.equal(Core.rawMapsEqual(Core.collectRaw(storage), originalRaw), true);

// A failed multi-store restore must roll back every previous write.
const failing = seedStorage();
const beforeFailure = Core.collectRaw(failing);
const changed = JSON.parse(JSON.stringify(backup));
changed.stores.learner.conversationWins = 77;
changed.stores.memory.totals.reviews = 999;
failing.failKey = Core.STORE_SPECS.find(spec => spec.id === 'scenarios').key;
const failedRestore = Core.restore(failing, changed);
assert.equal(failedRestore.ok, false);
assert.equal(failedRestore.rolledBack, false, 'writer failure is still active, so rollback cannot finish while the forced failure remains');
failing.failKey = null;
Core.writeRawMap(failing, beforeFailure);
assert.equal(Core.rawMapsEqual(Core.collectRaw(failing), beforeFailure), true);

// Explicit rollback path with a writer that fails once then recovers must be zero-loss.
const transient = seedStorage();
const transientBefore = Core.collectRaw(transient);
const failTarget = Core.STORE_SPECS.find(spec => spec.id === 'scenarios').key;
let failedOnce = false;
const transientWriter = {
  set(key, value) {
    if (key === failTarget && !failedOnce) { failedOnce = true; throw new Error('transient-failure'); }
    transient.setItem(key, value);
  },
  remove(key) { transient.removeItem(key); }
};
const transientResult = Core.restore(transient, changed, transientWriter);
assert.equal(transientResult.ok, false);
assert.equal(transientResult.rolledBack, true);
assert.equal(Core.rawMapsEqual(Core.collectRaw(transient), transientBefore), true);

// Invalid JSON and invalid schema are rejected without guessing.
assert.equal(Core.validateRaw('learner', '{broken', { allowMissing:false }).ok, false);
assert.equal(Core.validateValue('listening', { schemaVersion:99 }).ok, false);

// v1 backup migration is deterministic and clears stores that never existed in v1.
const legacy = {
  format:'french-tranquille-backup',
  version:1,
  learner:samples.learner,
  memory:samples.memory,
  exportedAt:'2026-08-12T00:00:00.000Z'
};
const migrated = Core.normalizeBackup(legacy);
assert.equal(migrated.migratedFrom, 1);
assert.equal(migrated.backup.version, 2);
assert.deepEqual(migrated.backup.stores.learner, samples.learner);
assert.deepEqual(migrated.backup.stores.memory, samples.memory);
assert.equal(migrated.backup.stores.errors, null);
assert.equal(migrated.backup.stores.scenarios, null);
assert.equal(migrated.backup.stores.listening, null);
assert.equal(migrated.backup.stores.milestones, null);

console.log('Build 28 recovery core: PASS');
