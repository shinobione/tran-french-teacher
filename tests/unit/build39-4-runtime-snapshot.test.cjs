'use strict';

const assert = require('node:assert/strict');
const runtimeSnapshot = require('../../src/pedagogy/learner-action-runtime-snapshot.js');

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function installOwners(memorySummary, errorSummary) {
  globalThis.FrenchTranquilleMemory = { summary: () => memorySummary };
  globalThis.FrenchTranquilleErrors = { summary: () => errorSummary };
}

function emptyOwners() {
  return {
    memory: { entries: [], due: [], fragile: [], learning: [{ id: 'ignored' }], solid: [], tomorrow: [] },
    errors: { top: [], recent: [], recurring: [{ id: 'ignored' }], totals: { errors: 999 }, session: { errors: 999 } }
  };
}

assert.equal(runtimeSnapshot.roadmapSlice, '39.4');
assert.equal(runtimeSnapshot.version, '3.0.0-runtime-snapshot');

{
  const source = emptyOwners();
  source.memory.entries.push({ id: 'bonjour', attempts: 3, successes: 99, secret: 'do-not-copy' });
  source.memory.due.push({ id: 'bonjour', dueAt: 'ignored' });
  source.memory.fragile.push({ id: 'bonjour', misses: 8 });
  source.errors.top.push({
    item: { id: 'bonjour', fr: 'Bonjour', vi: 'ignored' },
    score: 12,
    dominant: 'retrieval-difficult',
    entry: {
      id: 'bonjour',
      lastType: 'retrieval-difficult',
      totalErrors: 99,
      events: [{ type: 'retrieval-difficult', source: 'smart-review', at: 'ignored', note: 'ignored' }]
    }
  });
  source.errors.recent.push({ id: 'gare', type: 'practice-miss', source: 'listening-choice', repeated: true, at: 'ignored' });
  const before = clone(source);
  installOwners(source.memory, source.errors);

  const status = runtimeSnapshot.status();
  assert.equal(status.ready, true);
  assert.equal(status.memoryReady, true);
  assert.equal(status.errorsReady, true);
  assert.equal(status.pipelineReady, true);
  assert.equal(status.runtimeReadWiring, true);
  assert.equal(status.learnerFacingWiring, false);
  assert.equal(status.evidenceV2ReadCutover, false);
  assert.equal(status.durableWrite, false);

  const snapshot = runtimeSnapshot.collect();
  assert.deepEqual(snapshot, {
    memory: {
      entries: [{ id: 'bonjour', attempts: 3 }],
      due: [{ id: 'bonjour' }],
      fragile: [{ id: 'bonjour' }]
    },
    errors: {
      top: [{
        item: { id: 'bonjour' },
        score: 12,
        dominant: 'retrieval-difficult',
        entry: {
          id: 'bonjour',
          lastType: 'retrieval-difficult',
          events: [{ type: 'retrieval-difficult', source: 'smart-review' }]
        }
      }],
      recent: [{ id: 'gare', type: 'practice-miss', source: 'listening-choice', repeated: true }]
    }
  });
  assert.equal(Object.isFrozen(snapshot), true);
  assert.equal(Object.isFrozen(snapshot.memory), true);
  assert.equal(Object.isFrozen(snapshot.memory.entries), true);
  assert.equal(Object.isFrozen(snapshot.memory.entries[0]), true);
  assert.equal(Object.isFrozen(snapshot.errors.top[0]), true);
  assert.equal(Object.isFrozen(snapshot.errors.top[0].entry.events), true);
  assert.equal(Object.isFrozen(snapshot.errors.top[0].entry.events[0]), true);

  assert.throws(() => { snapshot.memory.entries[0].id = 'tampered'; }, TypeError);
  assert.throws(() => { snapshot.errors.recent.push({ id: 'tampered' }); }, TypeError);
  assert.deepEqual(source, before);
}

{
  const source = emptyOwners();
  source.memory.entries.push({ id: 'bonjour', attempts: 3 });
  source.memory.due.push({ id: 'bonjour' });
  source.memory.fragile.push({ id: 'bonjour' });
  source.errors.top.push({
    item: { id: 'bonjour' },
    score: 12,
    dominant: 'retrieval-difficult',
    entry: { id: 'bonjour', lastType: 'retrieval-difficult', events: [{ type: 'retrieval-difficult', source: 'smart-review' }] }
  });
  installOwners(source.memory, source.errors);
  const decision = runtimeSnapshot.decide();
  assert.equal(decision.selected?.type, 'phrase-retrieval');
  assert.equal(decision.selected?.targetId, 'bonjour');
  assert.equal(decision.reason, 'highest-reliable-need');
  assert.equal(decision.diagnostics.evidenceV2ReadCutover, false);
  assert.equal(decision.diagnostics.durableWrite, false);
}

{
  const source = emptyOwners();
  source.errors.top.push({
    item: { id: 'merci' },
    score: 14,
    dominant: 'voice-unrecognized',
    entry: { id: 'merci', lastType: 'voice-unrecognized', events: [{ type: 'voice-unrecognized', source: 'free-voice-voice' }] }
  });
  source.errors.recent.push({ id: 'merci', type: 'voice-unrecognized', source: 'free-voice-voice', repeated: true });
  installOwners(source.memory, source.errors);
  const decision = runtimeSnapshot.decide();
  assert.equal(decision.selected, null);
  assert.equal(decision.abstained, true);
  assert.equal(decision.reason, 'insufficient-reliable-evidence');
  assert.equal(decision.candidates['concept-review'].available, false);
  assert.equal(decision.candidates['foundation-capsule'].available, false);
  assert.equal(decision.candidates['transfer-construction'].available, false);
}

{
  delete globalThis.FrenchTranquilleMemory;
  delete globalThis.FrenchTranquilleErrors;
  const status = runtimeSnapshot.status();
  assert.equal(status.ready, false);
  const snapshot = runtimeSnapshot.collect();
  assert.deepEqual(snapshot, {
    memory: { entries: [], due: [], fragile: [] },
    errors: { top: [], recent: [] }
  });
  const decision = runtimeSnapshot.decide();
  assert.equal(decision.ready, false);
  assert.equal(decision.selected, null);
  assert.equal(decision.abstained, true);
  assert.equal(decision.reason, 'runtime-snapshot-dependencies-missing');
}

console.log('Build 39.4 runtime snapshot collector: PASS');
