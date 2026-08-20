(function attachPedagogicalObservationRuntime(root, factory) {
  'use strict';

  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.FrenchTranquillePedagogicalObservationRuntime = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createPedagogicalObservationRuntime(root) {
  'use strict';

  const core = typeof module === 'object' && module.exports
    ? require('./pedagogical-observation-core.js')
    : root?.FrenchTranquillePedagogicalObservationCore;

  if (!core || core.schema !== 'french-tranquille-pedagogical-observation/v1') {
    throw new Error('P3b observation runtime requires the accepted P3a observation core');
  }

  const ROADMAP_SLICE = 'P3b';
  const VERSION = '1.0.0-ephemeral';
  const CAPACITY = 64;
  const observations = [];
  let installed = false;

  const freeze = value => Object.freeze(value);

  function invalidResult(code) {
    return freeze({ ok: false, observation: null, issues: freeze([code]) });
  }

  function record(raw) {
    const result = core.normalizeObservation(raw);
    if (!result.ok) return result;
    observations.push(result.observation);
    if (observations.length > CAPACITY) observations.splice(0, observations.length - CAPACITY);
    return result;
  }

  function recordFoundationCheck(source = {}) {
    if (typeof source.correct !== 'boolean') return invalidResult('source.correct:boolean-required');
    return record({
      at: source.at,
      activityKind: 'foundation-check',
      lessonId: source.lessonId,
      target: { kind: 'foundation-concept', ids: source.conceptIds },
      activityId: source.capsuleId,
      exerciseId: source.checkId,
      outcome: source.correct === true ? 'success' : 'miss',
      response: { mode: 'multiple-choice', choice: source.choice },
      assistance: { modelShownAfterMiss: source.correct !== true },
      sourceOwner: 'foundations',
      sourceSlice: source.sourceSlice
    });
  }

  function recordTransferCheck(source = {}) {
    if (typeof source.correct !== 'boolean') return invalidResult('source.correct:boolean-required');
    return record({
      at: source.at,
      activityKind: 'transfer-check',
      lessonId: source.lessonId,
      target: { kind: 'transfer-family', ids: [source.familyId] },
      activityId: source.familyId,
      exerciseId: source.exerciseId,
      outcome: source.correct === true ? 'success' : 'miss',
      response: { mode: 'multiple-choice', choice: source.choice },
      assistance: { modelShownAfterMiss: source.correct !== true },
      sourceOwner: 'transfer',
      sourceSlice: source.sourceSlice
    });
  }

  function snapshot() {
    return freeze([...observations]);
  }

  function clear() {
    observations.length = 0;
    return 0;
  }

  function size() {
    return observations.length;
  }

  function currentLessonNumber(documentRef) {
    const title = documentRef.querySelector('.screen-lesson .topbar h1')?.textContent || '';
    return Number(title.match(/\d+/)?.[0] || 0);
  }

  function questionOrdinal(dialog, selector) {
    const text = dialog?.querySelector(selector)?.textContent || '';
    const match = text.match(/^\s*(\d+)\s*\//);
    return match ? Number(match[1]) : 0;
  }

  function renderedOutcome(dialog, selector, choice) {
    if (!dialog) return null;
    const selected = [...dialog.querySelectorAll(selector)].find(button => button.dataset?.foundationChoice === choice || button.dataset?.transferChoice === choice);
    if (!selected) return null;
    if (selected.classList?.contains('ok')) return true;
    if (selected.classList?.contains('bad')) return false;
    return null;
  }

  function findFoundationDialog(documentRef, capsuleKey) {
    return [...documentRef.querySelectorAll('[data-foundation-active-capsule]')]
      .find(dialog => dialog.dataset?.foundationActiveCapsule === capsuleKey) || null;
  }

  function findTransferDialog(documentRef, familyId, lessonId) {
    return [...documentRef.querySelectorAll('[data-transfer-active-family]')]
      .find(dialog => dialog.dataset?.transferActiveFamily === familyId && Number(dialog.dataset?.transferActiveLesson) === lessonId) || null;
  }

  function captureFoundation(button, documentRef) {
    const dialog = button.closest?.('[data-foundation-active-capsule]');
    const capsuleKey = dialog?.dataset?.foundationActiveCapsule;
    const capsule = root?.FrenchTranquilleFoundationsCapsules?.[capsuleKey];
    const ordinal = questionOrdinal(dialog, '.ft-foundation-q .muted');
    const check = capsule?.checks?.[ordinal - 1];
    const choice = button.dataset?.foundationChoice;
    const lessonId = currentLessonNumber(documentRef);
    if (!capsuleKey || !capsule || !check || !choice || !lessonId) return;
    const at = new Date().toISOString();

    queueMicrotask(() => {
      const liveDialog = findFoundationDialog(documentRef, capsuleKey);
      const correct = renderedOutcome(liveDialog, '[data-foundation-choice]', choice);
      if (correct === null) return;
      recordFoundationCheck({
        at,
        lessonId,
        capsuleId: capsule.id,
        conceptIds: capsule.concepts,
        checkId: check.id,
        choice,
        correct,
        sourceSlice: `foundations:${capsuleKey}`
      });
    });
  }

  function captureTransfer(button, documentRef) {
    const dialog = button.closest?.('[data-transfer-active-family]');
    const familyId = dialog?.dataset?.transferActiveFamily;
    const lessonId = Number(dialog?.dataset?.transferActiveLesson || 0);
    const ordinal = questionOrdinal(dialog, '.ft-transfer-q .muted');
    const route = root?.FrenchTranquilleTransferLesson?.routes?.find(candidate => candidate.family === familyId && candidate.lesson === lessonId);
    const sourceIndex = route?.exerciseIndexes?.[ordinal - 1];
    const choice = button.dataset?.transferChoice;
    if (!familyId || !lessonId || !route || !Number.isInteger(sourceIndex) || !choice) return;
    const at = new Date().toISOString();

    queueMicrotask(() => {
      const liveDialog = findTransferDialog(documentRef, familyId, lessonId);
      const correct = renderedOutcome(liveDialog, '[data-transfer-choice]', choice);
      if (correct === null) return;
      recordTransferCheck({
        at,
        lessonId,
        familyId,
        exerciseId: `${familyId}:${sourceIndex + 1}`,
        choice,
        correct,
        sourceSlice: `transfer:${route.slice}`
      });
    });
  }

  function onSourceChoice(event, documentRef) {
    const target = event?.target;
    const foundation = target?.closest?.('[data-foundation-choice]');
    if (foundation) {
      captureFoundation(foundation, documentRef);
      return;
    }
    const transfer = target?.closest?.('[data-transfer-choice]');
    if (transfer) captureTransfer(transfer, documentRef);
  }

  function installSourceObservers() {
    const documentRef = root?.document;
    if (installed || !documentRef?.addEventListener) return false;
    documentRef.addEventListener('click', event => onSourceChoice(event, documentRef), true);
    installed = true;
    return true;
  }

  installSourceObservers();

  return freeze({
    roadmapSlice: ROADMAP_SLICE,
    version: VERSION,
    schema: core.schema,
    capacity: CAPACITY,
    persistent: false,
    durableWrite: false,
    masteryClaim: false,
    recordFoundationCheck,
    recordTransferCheck,
    snapshot,
    clear,
    size,
    installSourceObservers
  });
});