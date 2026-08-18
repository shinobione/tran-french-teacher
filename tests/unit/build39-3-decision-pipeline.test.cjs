'use strict';

const assert = require('node:assert/strict');
const pipeline = require('../../src/pedagogy/learner-action-decision-pipeline.js');

function deepFreeze(value) {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
  Object.freeze(value);
  Object.values(value).forEach(deepFreeze);
  return value;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function baseInput() {
  return {
    memory: { entries: [], due: [], fragile: [], learning: [], solid: [] },
    errors: { top: [], recent: [], totals: { errors: 0 } }
  };
}

assert.equal(pipeline.roadmapSlice, '39.3');
assert.equal(pipeline.version, '3.0.0-decision-pipeline');
assert.equal(pipeline.ready, true);

{
  const input = baseInput();
  input.memory.entries.push({ id: 'bonjour', attempts: 3 });
  input.memory.due.push({ id: 'bonjour' });
  input.memory.fragile.push({ id: 'bonjour' });
  input.errors.top.push({
    item: { id: 'bonjour' },
    score: 12,
    dominant: 'retrieval-difficult',
    entry: { id: 'bonjour', lastType: 'retrieval-difficult', events: [{ type: 'retrieval-difficult', source: 'smart-review' }] }
  });
  const result = pipeline.decide(input);
  assert.equal(result.selected?.type, 'phrase-retrieval');
  assert.equal(result.selected?.targetId, 'bonjour');
  assert.equal(result.reason, 'highest-reliable-need');
  assert.equal(result.diagnostics.evidenceV2ReadCutover, false);
  assert.equal(result.diagnostics.durableWrite, false);
  assert.equal(result.diagnostics.runtimeWiring, false);
}

{
  const input = baseInput();
  input.errors.recent.push({ id: 'gare', type: 'practice-miss', source: 'listening-choice', repeated: false });
  const result = pipeline.decide(input);
  assert.equal(result.selected?.type, 'listening');
  assert.equal(result.selected?.targetId, 'gare');
}

{
  const input = baseInput();
  input.errors.recent.push({ id: 'train', type: 'assisted', source: 'scenario-assisted', repeated: true });
  const result = pipeline.decide(input);
  assert.equal(result.selected?.type, 'scenario');
  assert.equal(result.selected?.targetId, 'train');
}

{
  const input = baseInput();
  input.errors.top.push({
    item: { id: 'merci' },
    score: 14,
    dominant: 'voice-unrecognized',
    entry: { id: 'merci', lastType: 'voice-unrecognized', events: [{ type: 'voice-unrecognized', source: 'free-voice-voice' }] }
  });
  input.errors.recent.push({ id: 'merci', type: 'voice-unrecognized', source: 'free-voice-voice', repeated: true });
  const result = pipeline.decide(input);
  assert.equal(result.selected, null);
  assert.equal(result.abstained, true);
  assert.equal(result.reason, 'insufficient-reliable-evidence');
}

{
  const result = pipeline.decide(baseInput());
  assert.equal(result.selected, null);
  assert.equal(result.candidates['concept-review'].available, false);
  assert.equal(result.candidates['foundation-capsule'].available, false);
  assert.equal(result.candidates['transfer-construction'].available, false);
  assert.equal(result.candidates['concept-review'].reasonCode, 'no-durable-concept-evidence');
  assert.equal(result.candidates['foundation-capsule'].reasonCode, 'foundations-ephemeral-no-need-evidence');
  assert.equal(result.candidates['transfer-construction'].reasonCode, 'transfer-ephemeral-no-durable-evidence');
}

{
  const a = baseInput();
  a.errors.recent.push({ id: 'gare', type: 'practice-miss', source: 'listening-choice' });
  const b = clone(a);
  b.activityCount = 999999;
  b.completedSessions = 999999;
  b.accuracy = 1;
  b.errors.totals = { errors: 999999, assisted: 999999, voice: 999999 };
  const resultA = pipeline.decide(a);
  const resultB = pipeline.decide(b);
  assert.equal(resultA.selected?.type, resultB.selected?.type);
  assert.equal(resultA.selected?.targetId, resultB.selected?.targetId);
  assert.equal(resultA.selected?.score, resultB.selected?.score);
}

{
  const first = baseInput();
  first.errors.recent.push(
    { id: 'b', type: 'practice-miss', source: 'listening-choice' },
    { id: 'a', type: 'practice-miss', source: 'listening-choice' }
  );
  const second = baseInput();
  second.errors.recent.push(...[...first.errors.recent].reverse());
  const a = pipeline.decide(first);
  const b = pipeline.decide(second);
  assert.equal(a.selected?.type, b.selected?.type);
  assert.equal(a.selected?.targetId, b.selected?.targetId);
  assert.equal(a.selected?.targetId, 'a');
}

{
  const input = baseInput();
  input.memory.entries.push({ id: 'bonjour', attempts: 2 });
  input.memory.fragile.push({ id: 'bonjour' });
  const before = clone(input);
  deepFreeze(input);
  const result = pipeline.decide(input);
  assert.deepEqual(input, before);
  assert.equal(Object.isFrozen(result), true);
  assert.equal(Object.isFrozen(result.ranking), true);
  assert.equal(Object.isFrozen(result.rejected), true);
}

console.log('Build 39.3 learner action decision pipeline: PASS');
