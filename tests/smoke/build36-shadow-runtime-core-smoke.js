'use strict';

const assert = require('node:assert/strict');

const RecoveryV2 = require('../../src/core/data-recovery-core.js');
const Evidence = require('../../src/pedagogy/memory-evidence-v2-core.js');
const Contract = require('../../src/core/data-recovery-v3-contract.js');

// The browser adapter is UMD and reads globals at module evaluation time.
global.FrenchTranquilleRecoveryCore = RecoveryV2;
global.FrenchTranquilleRecoveryV3Contract = Contract;
global.FrenchTranquilleMemoryEvidenceV2 = Evidence;
require('../../src/core/data-recovery-v3-runtime-core.js');
const Core = global.FrenchTranquilleRecoveryV3Core;

assert(Core, 'Recovery v3 runtime core must attach');
assert.equal(Core.BACKUP_VERSION, 3);
assert.equal(Core.STORE_SPECS.length, 7);
assert.equal(Core.EVIDENCE_STORE_KEY, Evidence.PROPOSED_STORE_KEY);

function createStorage(seed = {}) {
  const map = new Map(Object.entries(seed).filter(([, value]) => value !== null).map(([key, value]) => [key, String(value)]));
  return {
    getItem(key) { return map.has(key) ? map.get(key) : null; },
    setItem(key, value) { map.set(key, String(value)); },
    removeItem(key) { map.delete(key); },
    dump() { return Object.fromEntries([...map.entries()].sort(([a], [b]) => a.localeCompare(b))); }
  };
}

const sourceStores = {
  learner: { schemaVersion:2, lessonProgress:{l1:3}, completedLessons:['l1'], knownItems:['i1'], reviewState:{i1:2} },
  memory: { schemaVersion:1, items:{ i1:{ id:'i1', firstSeen:'2026-08-01T00:00:00.000Z', lastSeen:'2026-08-10T00:00:00.000Z', lastReviewed:'2026-08-10T00:00:00.000Z', attempts:2, successes:2, misses:0, streak:2, strength:2, lastRating:2, lastSource:'smart-review' } }, totals:{reviews:2} },
  errors: { schemaVersion:1, items:{}, recent:[], totals:{errors:0,recoveries:0,assisted:0,voice:0,repeated:0} },
  scenarios: { schemaVersion:1, scenarios:{}, totalCompletions:0 },
  listening: { schemaVersion:1, totals:{sessions:0,attempts:0,correct:0,misses:0,plays:0,replays:0,slowPlays:0}, families:{meaning:{attempts:0,correct:0},contrast:{attempts:0,correct:0},dialogue:{attempts:0,correct:0}}, recent:[] },
  milestones: { schemaVersion:1, seen:{} }
};

const seed = {};
for (const spec of RecoveryV2.STORE_SPECS) seed[spec.key] = JSON.stringify(sourceStores[spec.id]);
const storage = createStorage(seed);

const missingNoCreate = Core.ensureEvidenceFresh(storage, undefined, { createIfMissing:false });
assert.equal(missingNoCreate.ok, true);
assert.equal(missingNoCreate.missing, true);
assert.equal(storage.getItem(Evidence.PROPOSED_STORE_KEY), null);

const adopted = Core.ensureEvidenceFresh(storage, undefined, { createIfMissing:true });
assert.equal(adopted.ok, true);
assert.equal(adopted.changed, true);
assert.equal(adopted.coherent, true);
assert(storage.getItem(Evidence.PROPOSED_STORE_KEY));
assert.equal(Core.validateRawMap(Core.collectRaw(storage), { allowMissing:true, requireEvidenceCoherence:true }).ok, true);
const firstFingerprint = adopted.shadow.source.fingerprint;

const noRewrite = Core.ensureEvidenceFresh(storage, undefined, { createIfMissing:true });
assert.equal(noRewrite.ok, true);
assert.equal(noRewrite.changed, false, 'coherent shadow should not be rewritten');

const learnerKey = RecoveryV2.STORE_SPECS.find(spec => spec.id === 'learner').key;
const learner = JSON.parse(storage.getItem(learnerKey));
learner.conversationWins = 7;
storage.setItem(learnerKey, JSON.stringify(learner));
const refreshed = Core.ensureEvidenceFresh(storage, undefined, { createIfMissing:true });
assert.equal(refreshed.ok, true);
assert.equal(refreshed.changed, true);
assert.notEqual(refreshed.shadow.source.fingerprint, firstFingerprint);
assert.equal(Core.validateRawMap(Core.collectRaw(storage), { allowMissing:true, requireEvidenceCoherence:true }).ok, true);

const backup = Core.buildBackup(storage, {version:'2.4.0',build:36});
assert.equal(backup.version, 3);
assert.equal(Object.keys(backup.stores).sort().join(','), 'errors,evidence,learner,listening,memory,milestones,scenarios');
assert.equal(Contract.validateEvidenceShadow(backup.stores.evidence, { sources:backup.stores, requireCoherence:true }).ok, true);

const beforeRestore = storage.dump();
const v2Payload = RecoveryV2.buildBackup({
  getItem(key) { return seed[key] ?? null; }
}, {version:'2.3.0',build:34});
const restoreResult = Core.restore(storage, v2Payload);
assert.equal(restoreResult.ok, true);
assert.equal(restoreResult.migratedFrom, 2);
assert.deepEqual(restoreResult.rebuildDerivedIds, ['evidence']);
assert.equal(Core.validateRawMap(Core.collectRaw(storage), { allowMissing:true, requireEvidenceCoherence:true }).ok, true);
assert.notDeepEqual(storage.dump(), beforeRestore, 'v2 restore should replace current target timeline');

// A refresh only writes if the source timeline differs from its coherent shadow.
// Create a *real* stale-derived case; otherwise the fault injection is never called.
const corruptBefore = storage.getItem(Evidence.PROPOSED_STORE_KEY);
const learnerForFault = JSON.parse(storage.getItem(learnerKey));
learnerForFault.conversationWins = 9;
storage.setItem(learnerKey, JSON.stringify(learnerForFault));
const expectedRefresh = Core.deriveEvidenceFromStorage(storage);
assert.equal(expectedRefresh.ok, true);
assert.notEqual(expectedRefresh.evidenceRaw, corruptBefore, 'source mutation must require a shadow refresh');

// Corrupt the first Evidence write, but allow the rollback write to succeed.
// A permanently corrupting writer cannot demonstrate atomic restoration.
let corruptAttempts = 0;
const corruptWriter = {
  set(key, value) {
    if (key === Evidence.PROPOSED_STORE_KEY && ++corruptAttempts === 1) {
      storage.setItem(key, '{broken-json');
    } else {
      storage.setItem(key, value);
    }
  },
  remove(key) { storage.removeItem(key); }
};
const failedRefresh = Core.ensureEvidenceFresh(storage, corruptWriter, { createIfMissing:true });
assert.equal(corruptAttempts, 2, 'fault and rollback must each write Evidence once');
assert.equal(failedRefresh.ok, false);
assert.equal(failedRefresh.stage, 'write');
assert.equal(failedRefresh.error?.message, 'evidence-write-mismatch');
assert.equal(failedRefresh.rolledBack, true);
assert.equal(storage.getItem(Evidence.PROPOSED_STORE_KEY), corruptBefore, 'failed refresh restores previous shadow bytes');

// Recovery after a transient write fault must derive the latest timeline again.
const repairedRefresh = Core.ensureEvidenceFresh(storage, undefined, { createIfMissing:true });
assert.equal(repairedRefresh.ok, true);
assert.equal(repairedRefresh.changed, true);
assert.equal(storage.getItem(Evidence.PROPOSED_STORE_KEY), expectedRefresh.evidenceRaw);
assert.equal(Core.validateRawMap(Core.collectRaw(storage), { allowMissing:true, requireEvidenceCoherence:true }).ok, true);

console.log('Build 36.2 Recovery v3 runtime core smoke: PASS');
