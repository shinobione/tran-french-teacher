'use strict';

const assert = require('node:assert/strict');
const core = require('../../src/pedagogy/pedagogical-observation-core.js');

function foundation(overrides = {}) {
  return {
    at: '2026-08-20T18:00:00+02:00',
    activityKind: 'foundation-check',
    lessonId: 38,
    target: { kind: 'foundation-concept', ids: ['F16'] },
    activityId: 'a-de-contractions-core',
    exerciseId: 'f16-au-restaurant',
    outcome: 'success',
    response: { mode: 'multiple-choice', choice: 'au restaurant' },
    assistance: { modelShownAfterMiss: false },
    sourceOwner: 'foundations',
    sourceSlice: '42.2',
    ...overrides
  };
}

function transfer(overrides = {}) {
  const family = 'present-je-regular-action-to-recent-past-je-venir-de';
  return {
    at: '2026-08-20T18:02:00+02:00',
    activityKind: 'transfer-check',
    lessonId: 36,
    target: { kind: 'transfer-family', ids: [family] },
    activityId: family,
    exerciseId: `${family}:1`,
    outcome: 'miss',
    response: { mode: 'multiple-choice', choice: 'Je vais manger.' },
    assistance: { modelShownAfterMiss: true },
    sourceOwner: 'transfer',
    sourceSlice: '41.3',
    ...overrides
  };
}

assert.equal(core.roadmapSlice, 'P3a');
assert.equal(core.version, '1.0.0-contract');
assert.equal(core.schema, 'french-tranquille-pedagogical-observation/v1');
assert.deepEqual(core.activityKinds, ['foundation-check', 'transfer-check']);
assert.deepEqual(core.targetKinds, ['foundation-concept', 'transfer-family']);
assert.deepEqual(core.outcomes, ['success', 'miss']);
assert.equal(core.limits.maxLessonId, 52);

{
  const result = core.normalizeObservation(foundation());
  assert.equal(result.ok, true);
  assert.equal(result.observation.at, '2026-08-20T16:00:00.000Z');
  assert.equal(result.observation.target.kind, 'foundation-concept');
  assert.deepEqual(result.observation.target.ids, ['F16']);
  assert.equal(result.observation.outcome, 'success');
  assert.equal(result.observation.assistance.modelShownAfterMiss, false);
  assert.equal(Object.isFrozen(result), true);
  assert.equal(Object.isFrozen(result.observation), true);
  assert.equal(Object.isFrozen(result.observation.target), true);
  assert.equal(Object.isFrozen(result.observation.target.ids), true);
  assert.equal(Object.isFrozen(result.observation.response), true);
  assert.equal(Object.isFrozen(result.observation.assistance), true);
}

{
  const result = core.normalizeObservation(transfer());
  assert.equal(result.ok, true);
  assert.equal(result.observation.activityKind, 'transfer-check');
  assert.equal(result.observation.outcome, 'miss');
  assert.equal(result.observation.assistance.modelShownAfterMiss, true);
  assert.deepEqual(result.observation.target.ids, [
    'present-je-regular-action-to-recent-past-je-venir-de'
  ]);
}

{
  const raw = foundation({ extraDecorativeData: { score: 999, label: 'ignore me' } });
  const result = core.normalizeObservation(raw);
  assert.equal(result.ok, true);
  assert.equal('extraDecorativeData' in result.observation, false);
  raw.target.ids[0] = 'F01';
  raw.response.choice = 'mutated';
  assert.deepEqual(result.observation.target.ids, ['F16'], 'output must be detached from caller input');
  assert.equal(result.observation.response.choice, 'au restaurant');
}

{
  const result = core.normalizeObservation(foundation({
    target: { kind: 'foundation-concept', ids: ['f16'] }
  }));
  assert.equal(result.ok, true);
  assert.deepEqual(result.observation.target.ids, ['F16'], 'Foundation IDs normalize to canonical uppercase');
}

{
  const result = core.normalizeObservation(foundation({
    outcome: 'success',
    assistance: { modelShownAfterMiss: true }
  }));
  assert.equal(result.ok, false);
  assert.equal(result.observation, null);
  assert(result.issues.includes('assistance:model-after-success-forbidden'));
}

{
  const result = core.normalizeObservation(foundation({
    target: { kind: 'transfer-family', ids: ['subject-substitution-regular-er'] }
  }));
  assert.equal(result.ok, false);
  assert(result.issues.includes('target.kind:activity-mismatch'));
}

{
  const result = core.normalizeObservation(transfer({ activityId: 'wrong-family' }));
  assert.equal(result.ok, false);
  assert(result.issues.includes('activityId:transfer-family-mismatch'));
}

{
  const result = core.normalizeObservation(transfer({
    target: { kind: 'transfer-family', ids: [
      'subject-substitution-regular-er',
      'affirmation-negation-regular-er-je'
    ] }
  }));
  assert.equal(result.ok, false);
  assert(result.issues.includes('target.ids:transfer-family-requires-one'));
}

{
  const result = core.normalizeObservation(foundation({
    target: { kind: 'foundation-concept', ids: ['F19'] }
  }));
  assert.equal(result.ok, false);
  assert(result.issues.includes('target.ids:invalid-foundation-concept'));
}

{
  const result = core.normalizeObservation(foundation({ at: 'not-a-date' }));
  assert.equal(result.ok, false);
  assert(result.issues.includes('at:source-time-iso-required'));
}

for (const impossible of [
  '2026-02-30T12:00:00Z',
  '2025-02-29T12:00:00Z',
  '2026-13-01T12:00:00Z',
  '2026-08-20T24:00:00Z',
  '2026-08-20T12:60:00Z'
]) {
  const result = core.normalizeObservation(foundation({ at: impossible }));
  assert.equal(result.ok, false, `${impossible} must be rejected`);
  assert(result.issues.includes('at:invalid-calendar'));
}

{
  const result = core.normalizeObservation(foundation({ at: '2024-02-29T12:00:00Z' }));
  assert.equal(result.ok, true, 'real leap-day timestamp must remain valid');
}

for (const malformedLesson of [true, '38', 38.5, null]) {
  const result = core.normalizeObservation(foundation({ lessonId: malformedLesson }));
  assert.equal(result.ok, false, `${String(malformedLesson)} must not be coerced into a lesson id`);
  assert(result.issues.includes('lessonId:integer-required'));
}

for (const outsideLesson of [0, 53, 999]) {
  const result = core.normalizeObservation(foundation({ lessonId: outsideLesson }));
  assert.equal(result.ok, false, `${outsideLesson} is outside the current 52-lesson namespace`);
  assert(result.issues.includes('lessonId:outside-current-curriculum'));
}

{
  const result = core.normalizeObservation({ ...foundation(), score: 0.9 });
  assert.equal(result.ok, false);
  assert(result.issues.includes('input:forbidden-field:score'));
}

{
  const result = core.normalizeObservation({ ...foundation(), itemId: 'i1' });
  assert.equal(result.ok, false);
  assert(result.issues.includes('input:forbidden-field:itemId'));
}

{
  const result = core.normalizeObservation({ ...foundation(), mastery: true });
  assert.equal(result.ok, false);
  assert(result.issues.includes('input:forbidden-field:mastery'));
}

{
  const result = core.normalizeObservation(foundation({
    response: { mode: 'free-text', choice: 'au restaurant' }
  }));
  assert.equal(result.ok, false);
  assert(result.issues.includes('response.mode:unsupported'));
}

{
  const result = core.normalizeObservation(foundation({ sourceOwner: 'transfer' }));
  assert.equal(result.ok, false);
  assert(result.issues.includes('sourceOwner:activity-mismatch'));
}

{
  const result = core.normalizeObservation(foundation({
    target: { kind: 'foundation-concept', ids: ['F16', 'F16'] }
  }));
  assert.equal(result.ok, false);
  assert(result.issues.includes('target.ids:duplicate'));
}

{
  const oversized = 'x'.repeat(core.limits.maxChoiceLength + 1);
  const result = core.normalizeObservation(foundation({
    response: { mode: 'multiple-choice', choice: oversized }
  }));
  assert.equal(result.ok, false);
  assert(result.issues.includes('response.choice:too-long'));
}

{
  const frozen = Object.freeze(foundation({
    target: Object.freeze({ kind: 'foundation-concept', ids: Object.freeze(['F16']) }),
    response: Object.freeze({ mode: 'multiple-choice', choice: 'au restaurant' }),
    assistance: Object.freeze({ modelShownAfterMiss: false })
  }));
  assert.doesNotThrow(() => core.normalizeObservation(frozen));
}

{
  const result = core.validateObservationInput(transfer());
  assert.deepEqual(result, { ok: true, issues: [] });
  assert.equal(Object.isFrozen(result), true);
  assert.equal(Object.isFrozen(result.issues), true);
}

console.log('P3a pedagogical observation contract: PASS');
