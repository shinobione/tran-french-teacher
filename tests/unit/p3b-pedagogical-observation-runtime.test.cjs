'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '../..');
const runtime = require(path.join(repoRoot, 'src/pedagogy/pedagogical-observation-runtime.js'));

assert.equal(runtime.roadmapSlice, 'P3b');
assert.equal(runtime.version, '1.0.0-ephemeral');
assert.equal(runtime.schema, 'french-tranquille-pedagogical-observation/v1');
assert.equal(runtime.capacity, 64);
assert.equal(runtime.persistent, false);
assert.equal(runtime.durableWrite, false);
assert.equal(runtime.masteryClaim, false);

runtime.clear();
let result = runtime.recordFoundationCheck({
  at: '2026-08-20T19:45:00+02:00',
  lessonId: 38,
  capsuleId: 'a-de-contractions-core',
  conceptIds: ['F16'],
  checkId: 'f16-l38-au',
  choice: 'au',
  correct: true,
  sourceSlice: 'foundations:F16'
});
assert.equal(result.ok, true);
assert.equal(runtime.size(), 1);
let observation = runtime.snapshot()[0];
assert.equal(observation.activityKind, 'foundation-check');
assert.deepEqual(observation.target.ids, ['F16']);
assert.equal(observation.activityId, 'a-de-contractions-core');
assert.equal(observation.exerciseId, 'f16-l38-au');
assert.equal(observation.outcome, 'success');
assert.equal(observation.assistance.modelShownAfterMiss, false);
assert.equal(observation.sourceOwner, 'foundations');
assert.equal(observation.sourceSlice, 'foundations:F16');
assert.equal(Object.isFrozen(observation), true);
assert.equal(Object.isFrozen(runtime.snapshot()), true);

result = runtime.recordFoundationCheck({
  at: '2026-08-20T19:46:00+02:00',
  lessonId: 38,
  capsuleId: 'a-de-contractions-core',
  conceptIds: ['F16'],
  checkId: 'f16-de-le',
  choice: 'des',
  correct: false,
  sourceSlice: 'foundations:F16'
});
assert.equal(result.ok, true);
observation = runtime.snapshot()[1];
assert.equal(observation.outcome, 'miss');
assert.equal(observation.assistance.modelShownAfterMiss, true);

result = runtime.recordTransferCheck({
  at: '2026-08-20T19:47:00Z',
  lessonId: 36,
  familyId: 'present-je-regular-action-to-recent-past-je-venir-de',
  exerciseId: 'present-je-regular-action-to-recent-past-je-venir-de:1',
  choice: 'Je vais travailler.',
  correct: false,
  sourceSlice: 'transfer:41.3'
});
assert.equal(result.ok, true);
observation = runtime.snapshot()[2];
assert.equal(observation.activityKind, 'transfer-check');
assert.deepEqual(observation.target.ids, ['present-je-regular-action-to-recent-past-je-venir-de']);
assert.equal(observation.activityId, observation.target.ids[0]);
assert.equal(observation.outcome, 'miss');
assert.equal(observation.assistance.modelShownAfterMiss, true);
assert.equal(observation.sourceOwner, 'transfer');
assert.equal(observation.sourceSlice, 'transfer:41.3');

const beforeBooleanInvalid = runtime.size();
result = runtime.recordFoundationCheck({
  at: '2026-08-20T19:47:30Z',
  lessonId: 38,
  capsuleId: 'a-de-contractions-core',
  conceptIds: ['F16'],
  checkId: 'f16-de-le',
  choice: 'du',
  sourceSlice: 'foundations:F16'
});
assert.equal(result.ok, false);
assert.deepEqual(result.issues, ['source.correct:boolean-required']);
assert.equal(runtime.size(), beforeBooleanInvalid);

const beforeInvalid = runtime.size();
result = runtime.recordTransferCheck({
  at: 'not-a-date',
  lessonId: 36,
  familyId: 'present-je-regular-action-to-recent-past-je-venir-de',
  exerciseId: 'present-je-regular-action-to-recent-past-je-venir-de:1',
  choice: 'Je viens de travailler.',
  correct: true,
  sourceSlice: 'transfer:41.3'
});
assert.equal(result.ok, false);
assert.equal(runtime.size(), beforeInvalid);

runtime.clear();
for (let index = 0; index < 65; index += 1) {
  const bounded = runtime.recordFoundationCheck({
    at: '2026-08-20T19:48:00Z',
    lessonId: 38,
    capsuleId: 'a-de-contractions-core',
    conceptIds: ['F16'],
    checkId: `check-${index}`,
    choice: `choice-${index}`,
    correct: index % 2 === 0,
    sourceSlice: 'foundations:F16'
  });
  assert.equal(bounded.ok, true);
}
assert.equal(runtime.size(), 64);
assert.equal(runtime.snapshot()[0].exerciseId, 'check-1');
assert.equal(runtime.snapshot()[63].exerciseId, 'check-64');
assert.equal(runtime.clear(), 0);
assert.equal(runtime.size(), 0);

const runtimeSource = fs.readFileSync(path.join(repoRoot, 'src/pedagogy/pedagogical-observation-runtime.js'), 'utf8');
assert.match(runtimeSource, /\[data-foundation-choice\]/);
assert.match(runtimeSource, /\[data-transfer-choice\]/);
assert.match(runtimeSource, /queueMicrotask/);
assert.match(runtimeSource, /classList\?\.contains\('ok'\)/);
assert.match(runtimeSource, /classList\?\.contains\('bad'\)/);

const loaderSource = fs.readFileSync(path.join(repoRoot, 'src/core/build32-loader.js'), 'utf8');
const contractAt = loaderSource.indexOf('pedagogical-observation-core.js');
const runtimeAt = loaderSource.indexOf('pedagogical-observation-runtime.js');
const foundationsAt = loaderSource.indexOf('foundations-capsule-engine.js');
const transferLessonAt = loaderSource.indexOf('generalization-transfer-lesson.js');
assert.ok(contractAt >= 0, 'P3a contract must be loaded by the runtime loader');
assert.ok(runtimeAt > contractAt, 'P3b runtime must load after P3a contract');
assert.ok(foundationsAt > runtimeAt, 'P3b observer must be installed before Foundations learner-facing source');
assert.ok(transferLessonAt > runtimeAt, 'P3b observer must be installed before Transfer learner-facing source');

(async () => {
  runtime.clear();

  let clickHandler = null;
  let foundationRenderedClass = null;
  let transferRenderedClass = null;

  const foundationRenderedButton = {
    dataset: { foundationChoice: 'des' },
    classList: { contains: value => value === foundationRenderedClass }
  };
  const transferRenderedButton = {
    dataset: { transferChoice: 'Je vais travailler.' },
    classList: { contains: value => value === transferRenderedClass }
  };
  const foundationDialog = {
    dataset: { foundationActiveCapsule: 'F16' },
    querySelector: selector => selector === '.ft-foundation-q .muted' ? { textContent: '1/6' } : null,
    querySelectorAll: selector => selector === '[data-foundation-choice]' ? [foundationRenderedButton] : []
  };
  const transferDialog = {
    dataset: {
      transferActiveFamily: 'present-je-regular-action-to-recent-past-je-venir-de',
      transferActiveLesson: '36'
    },
    querySelector: selector => selector === '.ft-transfer-q .muted' ? { textContent: '1/3' } : null,
    querySelectorAll: selector => selector === '[data-transfer-choice]' ? [transferRenderedButton] : []
  };

  global.document = {
    addEventListener(type, handler, capture) {
      if (type === 'click' && capture === true) clickHandler = handler;
    },
    querySelector(selector) {
      if (selector === '.screen-lesson .topbar h1') return { textContent: 'Leçon 38' };
      return null;
    },
    querySelectorAll(selector) {
      if (selector === '[data-foundation-active-capsule]') return [foundationDialog];
      if (selector === '[data-transfer-active-family]') return [transferDialog];
      return [];
    }
  };
  global.FrenchTranquilleFoundationsCapsules = {
    F16: {
      id: 'a-de-contractions-core',
      concepts: ['F16'],
      checks: [{ id: 'f16-l38-au' }]
    }
  };
  global.FrenchTranquilleTransferLesson = {
    routes: [{
      family: 'present-je-regular-action-to-recent-past-je-venir-de',
      lesson: 36,
      slice: '41.3',
      exerciseIndexes: [0, 1, 2]
    }]
  };

  assert.equal(runtime.installSourceObservers(), true);
  assert.equal(typeof clickHandler, 'function');
  assert.equal(runtime.installSourceObservers(), false, 'observer installation must be idempotent');

  const foundationChoiceButton = {
    dataset: { foundationChoice: 'des' },
    closest(selector) {
      if (selector === '[data-foundation-choice]') return this;
      if (selector === '[data-foundation-active-capsule]') return foundationDialog;
      return null;
    }
  };
  clickHandler({ target: foundationChoiceButton });
  foundationRenderedClass = 'bad';
  await Promise.resolve();
  assert.equal(runtime.size(), 1);
  let observed = runtime.snapshot()[0];
  assert.equal(observed.activityKind, 'foundation-check');
  assert.equal(observed.lessonId, 38);
  assert.equal(observed.exerciseId, 'f16-l38-au');
  assert.equal(observed.outcome, 'miss');
  assert.equal(observed.assistance.modelShownAfterMiss, true);

  global.document.querySelector = selector => selector === '.screen-lesson .topbar h1' ? { textContent: 'Leçon 36' } : null;
  const transferChoiceButton = {
    dataset: { transferChoice: 'Je vais travailler.' },
    closest(selector) {
      if (selector === '[data-transfer-choice]') return this;
      if (selector === '[data-transfer-active-family]') return transferDialog;
      return null;
    }
  };
  clickHandler({ target: transferChoiceButton });
  transferRenderedClass = 'bad';
  await Promise.resolve();
  assert.equal(runtime.size(), 2);
  observed = runtime.snapshot()[1];
  assert.equal(observed.activityKind, 'transfer-check');
  assert.equal(observed.lessonId, 36);
  assert.equal(observed.exerciseId, 'present-je-regular-action-to-recent-past-je-venir-de:1');
  assert.equal(observed.outcome, 'miss');
  assert.equal(observed.sourceSlice, 'transfer:41.3');
  assert.equal(observed.assistance.modelShownAfterMiss, true);

  const beforeAbstention = runtime.size();
  transferRenderedClass = null;
  clickHandler({ target: transferChoiceButton });
  await Promise.resolve();
  assert.equal(runtime.size(), beforeAbstention);

  delete global.document;
  delete global.FrenchTranquilleFoundationsCapsules;
  delete global.FrenchTranquilleTransferLesson;

  console.log('P3b pedagogical observation runtime: PASS');
})().catch(error => {
  console.error(error);
  process.exitCode = 1;
});