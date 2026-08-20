(function attachPedagogicalObservationCore(root, factory) {
  'use strict';

  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.FrenchTranquillePedagogicalObservationCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createPedagogicalObservationCore() {
  'use strict';

  const ROADMAP_SLICE = 'P3a';
  const VERSION = '1.0.0-contract';
  const SCHEMA = 'french-tranquille-pedagogical-observation/v1';
  const ACTIVITY_KINDS = Object.freeze(['foundation-check', 'transfer-check']);
  const TARGET_KINDS = Object.freeze(['foundation-concept', 'transfer-family']);
  const OUTCOMES = Object.freeze(['success', 'miss']);
  const SOURCE_OWNERS = Object.freeze(['foundations', 'transfer']);
  const ACTIVITY_CONTRACT = Object.freeze({
    'foundation-check': Object.freeze({ targetKind: 'foundation-concept', sourceOwner: 'foundations' }),
    'transfer-check': Object.freeze({ targetKind: 'transfer-family', sourceOwner: 'transfer' })
  });
  const LIMITS = Object.freeze({
    maxTargetIds: 8,
    maxSemanticIdLength: 120,
    maxActivityIdLength: 120,
    maxExerciseIdLength: 160,
    maxChoiceLength: 280,
    maxSourceSliceLength: 48
  });
  const FORBIDDEN_INPUT_KEYS = Object.freeze([
    'itemId', 'mastery', 'masteryClaim', 'score', 'confidence', 'strength',
    'cefr', 'CEFR', 'state', 'assistedSuccess', 'assisted-success'
  ]);

  const hasOwn = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
  const isObject = value => Boolean(value) && typeof value === 'object' && !Array.isArray(value);

  function deepFreeze(value) {
    if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
    Object.values(value).forEach(deepFreeze);
    return Object.freeze(value);
  }

  function issue(issues, code) {
    if (!issues.includes(code)) issues.push(code);
  }

  function boundedText(value, field, max, issues, { pattern = null, transform = null } = {}) {
    if (typeof value !== 'string' || !value.trim()) {
      issue(issues, `${field}:required-string`);
      return null;
    }
    let text = value.trim();
    if (transform) text = transform(text);
    if (text.length > max) {
      issue(issues, `${field}:too-long`);
      return null;
    }
    if (pattern && !pattern.test(text)) {
      issue(issues, `${field}:invalid-format`);
      return null;
    }
    return text;
  }

  function normalizedIso(value, issues) {
    if (typeof value !== 'string' || !value.trim()) {
      issue(issues, 'at:required-iso');
      return null;
    }
    const parsed = Date.parse(value);
    if (!Number.isFinite(parsed)) {
      issue(issues, 'at:invalid-iso');
      return null;
    }
    return new Date(parsed).toISOString();
  }

  function normalizedLessonId(value, issues) {
    const number = Number(value);
    if (!Number.isInteger(number) || number <= 0) {
      issue(issues, 'lessonId:positive-integer-required');
      return null;
    }
    return number;
  }

  function normalizedTarget(rawTarget, activityKind, issues) {
    if (!isObject(rawTarget)) {
      issue(issues, 'target:object-required');
      return null;
    }
    const contract = ACTIVITY_CONTRACT[activityKind] || null;
    const kind = boundedText(rawTarget.kind, 'target.kind', 40, issues);
    if (kind && !TARGET_KINDS.includes(kind)) issue(issues, 'target.kind:unsupported');
    if (kind && contract && kind !== contract.targetKind) issue(issues, 'target.kind:activity-mismatch');

    if (!Array.isArray(rawTarget.ids) || rawTarget.ids.length === 0) {
      issue(issues, 'target.ids:non-empty-array-required');
      return null;
    }
    if (rawTarget.ids.length > LIMITS.maxTargetIds) issue(issues, 'target.ids:too-many');

    const ids = [];
    rawTarget.ids.forEach(value => {
      const raw = typeof value === 'string' ? value.trim() : '';
      if (!raw) {
        issue(issues, 'target.ids:invalid-id');
        return;
      }
      let id = raw;
      if (kind === 'foundation-concept') id = raw.toUpperCase();
      if (id.length > LIMITS.maxSemanticIdLength) {
        issue(issues, 'target.ids:id-too-long');
        return;
      }
      if (kind === 'foundation-concept' && !/^F(?:0[1-9]|1[0-8])$/.test(id)) {
        issue(issues, 'target.ids:invalid-foundation-concept');
        return;
      }
      if (kind === 'transfer-family' && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) {
        issue(issues, 'target.ids:invalid-transfer-family');
        return;
      }
      if (ids.includes(id)) issue(issues, 'target.ids:duplicate');
      else ids.push(id);
    });

    if (kind === 'transfer-family' && rawTarget.ids.length !== 1) issue(issues, 'target.ids:transfer-family-requires-one');
    return kind && ids.length ? { kind, ids } : null;
  }

  function normalizeObservation(raw = {}) {
    const issues = [];
    if (!isObject(raw)) {
      return deepFreeze({ ok: false, observation: null, issues: ['input:object-required'] });
    }

    FORBIDDEN_INPUT_KEYS.forEach(key => {
      if (hasOwn(raw, key)) issue(issues, `input:forbidden-field:${key}`);
    });
    if (raw.schema != null && raw.schema !== SCHEMA) issue(issues, 'schema:unsupported');

    const at = normalizedIso(raw.at, issues);
    const activityKind = boundedText(raw.activityKind, 'activityKind', 40, issues);
    if (activityKind && !ACTIVITY_KINDS.includes(activityKind)) issue(issues, 'activityKind:unsupported');
    const lessonId = normalizedLessonId(raw.lessonId, issues);
    const target = normalizedTarget(raw.target, activityKind, issues);

    const activityId = boundedText(
      raw.activityId,
      'activityId',
      LIMITS.maxActivityIdLength,
      issues,
      { pattern: /^[A-Za-z0-9]+(?:[._:-][A-Za-z0-9]+)*$/ }
    );
    const exerciseId = boundedText(
      raw.exerciseId,
      'exerciseId',
      LIMITS.maxExerciseIdLength,
      issues,
      { pattern: /^[A-Za-z0-9]+(?:[._:-][A-Za-z0-9]+)*$/ }
    );
    const outcome = boundedText(raw.outcome, 'outcome', 16, issues);
    if (outcome && !OUTCOMES.includes(outcome)) issue(issues, 'outcome:unsupported');

    if (!isObject(raw.response)) issue(issues, 'response:object-required');
    const responseMode = isObject(raw.response)
      ? boundedText(raw.response.mode, 'response.mode', 32, issues)
      : null;
    if (responseMode && responseMode !== 'multiple-choice') issue(issues, 'response.mode:unsupported');
    const responseChoice = isObject(raw.response)
      ? boundedText(raw.response.choice, 'response.choice', LIMITS.maxChoiceLength, issues)
      : null;

    if (raw.assistance != null && !isObject(raw.assistance)) issue(issues, 'assistance:object-required');
    const modelShownAfterMiss = isObject(raw.assistance) && hasOwn(raw.assistance, 'modelShownAfterMiss')
      ? raw.assistance.modelShownAfterMiss
      : false;
    if (typeof modelShownAfterMiss !== 'boolean') issue(issues, 'assistance.modelShownAfterMiss:boolean-required');
    if (outcome === 'success' && modelShownAfterMiss === true) issue(issues, 'assistance:model-after-success-forbidden');

    const sourceOwner = boundedText(raw.sourceOwner, 'sourceOwner', 32, issues);
    if (sourceOwner && !SOURCE_OWNERS.includes(sourceOwner)) issue(issues, 'sourceOwner:unsupported');
    const expected = ACTIVITY_CONTRACT[activityKind] || null;
    if (sourceOwner && expected && sourceOwner !== expected.sourceOwner) issue(issues, 'sourceOwner:activity-mismatch');

    const sourceSlice = boundedText(
      raw.sourceSlice,
      'sourceSlice',
      LIMITS.maxSourceSliceLength,
      issues,
      { pattern: /^[A-Za-z0-9]+(?:[._:-][A-Za-z0-9]+)*$/ }
    );

    if (activityKind === 'transfer-check' && target?.kind === 'transfer-family' && activityId && target.ids[0] !== activityId) {
      issue(issues, 'activityId:transfer-family-mismatch');
    }

    if (issues.length) return deepFreeze({ ok: false, observation: null, issues });

    const observation = {
      schema: SCHEMA,
      at,
      activityKind,
      lessonId,
      target: {
        kind: target.kind,
        ids: [...target.ids]
      },
      activityId,
      exerciseId,
      outcome,
      response: {
        mode: responseMode,
        choice: responseChoice
      },
      assistance: {
        modelShownAfterMiss
      },
      sourceOwner,
      sourceSlice
    };

    return deepFreeze({ ok: true, observation, issues: [] });
  }

  function validateObservationInput(raw = {}) {
    const result = normalizeObservation(raw);
    return deepFreeze({ ok: result.ok, issues: [...result.issues] });
  }

  return deepFreeze({
    roadmapSlice: ROADMAP_SLICE,
    version: VERSION,
    schema: SCHEMA,
    activityKinds: ACTIVITY_KINDS,
    targetKinds: TARGET_KINDS,
    outcomes: OUTCOMES,
    sourceOwners: SOURCE_OWNERS,
    limits: LIMITS,
    validateObservationInput,
    normalizeObservation
  });
});
