'use strict';

const assert = require('node:assert/strict');
const core = require('../../src/pedagogy/learner-intelligence-v3-core.js');

const TYPES = [
  'phrase-retrieval',
  'concept-review',
  'foundation-capsule',
  'listening',
  'scenario',
  'transfer-construction'
];

function reliable(overrides = {}) {
  return {
    available: true,
    need: 0.82,
    urgency: 0.72,
    confidence: 0.84,
    support: 0.75,
    evidenceCount: 2,
    independentEvidenceCount: 2,
    channels: ['memory', 'errors'],
    reasonCode: 'test-reliable-signal',
    ...overrides
  };
}

function emptyInput() {
  return Object.fromEntries(TYPES.map(type => [type, { available: false }]));
}

function deepFreeze(value) {
  if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
  Object.freeze(value);
  Object.values(value).forEach(deepFreeze);
  return value;
}

assert.equal(core.roadmapSlice, '39.1');
assert.equal(core.version, '3.0.0-core');
assert.deepEqual(core.actions, TYPES);

for (const type of TYPES) {
  const input = emptyInput();
  input[type] = reliable(type === 'transfer-construction'
    ? { channels: ['transfer', 'memory'], reasonCode: 'known-material-transfer-need' }
    : {});
  const result = core.decide(input);
  assert.equal(result.abstained, false, `${type} should be selectable`);
  assert.equal(result.selected.type, type, `${type} should win when it is the only reliable need`);
  assert.equal(result.reason, 'highest-reliable-need');
}

{
  const input = emptyInput();
  input['phrase-retrieval'] = reliable({
    need: 1,
    urgency: 1,
    confidence: 1,
    support: 1,
    evidenceCount: 9,
    independentEvidenceCount: 9,
    channels: ['recognition-failure'],
    recognitionFailureOnly: true,
    reasonCode: 'speech-recognition-miss'
  });
  input.listening = reliable({ need: 0.55, urgency: 0.40, confidence: 0.72, support: 0.60, channels: ['listening'] });
  const result = core.decide(input);
  assert.equal(result.selected.type, 'listening', 'recognition failure alone must never drive the next action');
  const rejected = result.rejected.find(row => row.type === 'phrase-retrieval');
  assert.equal(rejected.eligibilityReason, 'recognition-failure-only');
}

{
  const input = emptyInput();
  input['transfer-construction'] = reliable({
    need: 0.95,
    urgency: 0.90,
    confidence: 0.90,
    evidenceCount: 1,
    independentEvidenceCount: 1,
    channels: ['transfer']
  });
  input.scenario = reliable({ need: 0.62, urgency: 0.55, confidence: 0.65, support: 0.58, channels: ['scenario'] });
  const result = core.decide(input);
  assert.equal(result.selected.type, 'scenario');
  assert.equal(
    result.rejected.find(row => row.type === 'transfer-construction').eligibilityReason,
    'insufficient-independent-evidence',
    'transfer requires two independent pieces of evidence'
  );
}

{
  const input = emptyInput();
  input['concept-review'] = reliable({ confidence: 0.20, independentEvidenceCount: 3 });
  input['foundation-capsule'] = reliable({ need: 0, confidence: 0.90 });
  const result = core.decide(input);
  assert.equal(result.selected, null);
  assert.equal(result.abstained, true);
  assert.equal(result.reason, 'insufficient-reliable-evidence');
}

{
  const a = reliable({ need: 0.70, urgency: 0.70, confidence: 0.70, support: 0.70 });
  const b = reliable({ need: 0.70, urgency: 0.70, confidence: 0.70, support: 0.70 });
  const first = core.decide([
    { type: 'scenario', ...b },
    { type: 'phrase-retrieval', ...a }
  ]);
  const second = core.decide([
    { type: 'phrase-retrieval', ...a },
    { type: 'scenario', ...b }
  ]);
  assert.equal(first.selected.type, 'phrase-retrieval');
  assert.equal(second.selected.type, 'phrase-retrieval');
  assert.deepEqual(
    first.ranking.map(row => row.type),
    second.ranking.map(row => row.type),
    'input order must not affect deterministic tie-breaks'
  );
}

{
  const inputA = emptyInput();
  const inputB = emptyInput();
  inputA.listening = reliable({ need: 0.68, channels: ['listening'], activityCount: 0 });
  inputA.scenario = reliable({ need: 0.66, channels: ['scenario'], activityCount: 0 });
  inputB.listening = { ...inputA.listening, activityCount: 999999 };
  inputB.scenario = { ...inputA.scenario, activityCount: 1 };
  assert.equal(core.decide(inputA).selected.type, core.decide(inputB).selected.type, 'decorative activity counts must not affect arbitration');
}

{
  const frozen = deepFreeze({
    'phrase-retrieval': reliable({ targetId: 'i1', channels: ['memory'] }),
    listening: reliable({ need: 0.40, channels: ['listening'] })
  });
  assert.doesNotThrow(() => core.decide(frozen));
}

console.log('Build39.1 learner action arbitration: PASS');
