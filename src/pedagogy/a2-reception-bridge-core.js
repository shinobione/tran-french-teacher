(function attachA2ReceptionBridgeCore(root, factory) {
  'use strict';

  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.FrenchTranquilleA2ReceptionBridgeCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createA2ReceptionBridgeCore() {
  'use strict';

  const ROADMAP_SLICE = 'A2-R1-pure-contract-proof';
  const API_VERSION = '1.0.0-contract';
  const LANE = 'A2-R1';
  const MIN_QUESTIONS = 2;
  const MAX_QUESTIONS = 4;
  const MIN_OPTIONS = 2;
  const MAX_OPTIONS = 4;
  const ID_RE = /^[a-z0-9][a-z0-9-]{0,79}$/;

  class R1ContractError extends Error {
    constructor(code, message) {
      super(message);
      this.name = 'R1ContractError';
      this.code = code;
    }
  }

  function fail(code, message) {
    throw new R1ContractError(code, message);
  }

  function boundedText(value, field, max = 240) {
    if (typeof value !== 'string') fail('invalid-text', `${field} must be a string`);
    const text = value.trim();
    if (!text || text.length > max) fail('invalid-text', `${field} must be non-empty and <= ${max} chars`);
    return text;
  }

  function stableId(value, field) {
    const id = boundedText(value, field, 80);
    if (!ID_RE.test(id)) fail('invalid-id', `${field} must be a stable lowercase kebab id`);
    return id;
  }

  function normalizePrompt(value) {
    return String(value || '')
      .toLocaleLowerCase('fr-FR')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[’']/g, ' ')
      .replace(/[^a-z0-9\s-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function uniqueStableIds(values, field, { min = 1, max = 32 } = {}) {
    if (!Array.isArray(values) || values.length < min || values.length > max) {
      fail('invalid-id-list', `${field} must contain ${min}-${max} ids`);
    }
    const ids = values.map((value, index) => stableId(value, `${field}[${index}]`));
    if (new Set(ids).size !== ids.length) fail('duplicate-id', `${field} must not contain duplicates`);
    return ids;
  }

  function normalizeAllowedFactIds(contract) {
    if (!contract || typeof contract !== 'object') fail('missing-authority', 'contract authority is required');
    return uniqueStableIds(contract.allowedFactIds, 'contract.allowedFactIds', { min: 2, max: 32 });
  }

  function normalizeOptions(options, questionIndex) {
    if (!Array.isArray(options) || options.length < MIN_OPTIONS || options.length > MAX_OPTIONS) {
      fail('invalid-options', `questions[${questionIndex}].options must contain ${MIN_OPTIONS}-${MAX_OPTIONS} options`);
    }
    return options.map((option, optionIndex) => {
      if (!option || typeof option !== 'object' || Array.isArray(option)) {
        fail('invalid-option', `questions[${questionIndex}].options[${optionIndex}] must be an object`);
      }
      return {
        vi: boundedText(option.vi, `questions[${questionIndex}].options[${optionIndex}].vi`, 160),
        fr: boundedText(option.fr, `questions[${questionIndex}].options[${optionIndex}].fr`, 160)
      };
    });
  }

  function deepFreeze(value) {
    if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
    Object.getOwnPropertyNames(value).forEach(key => deepFreeze(value[key]));
    return Object.freeze(value);
  }

  function normalizeActivity(input, contract) {
    if (!input || typeof input !== 'object' || Array.isArray(input)) {
      fail('invalid-activity', 'activity must be an object');
    }

    const allowedFactIds = normalizeAllowedFactIds(contract);
    const allowedFacts = new Set(allowedFactIds);
    const id = stableId(input.id, 'activity.id');
    const lane = boundedText(input.lane, 'activity.lane', 16);
    if (lane !== LANE) fail('invalid-lane', `activity.lane must be ${LANE}`);

    const source = input.source;
    if (!source || typeof source !== 'object' || Array.isArray(source)) {
      fail('invalid-source', 'activity.source must be an object');
    }
    const kind = boundedText(source.kind, 'activity.source.kind', 40);
    if (kind !== 'listening-dialogue') fail('invalid-source-kind', 'activity.source.kind must be listening-dialogue');
    const dialogueId = stableId(source.dialogueId, 'activity.source.dialogueId');
    const prerequisiteLessonId = stableId(source.prerequisiteLessonId, 'activity.source.prerequisiteLessonId');
    const prerequisiteItemIds = uniqueStableIds(source.prerequisiteItemIds, 'activity.source.prerequisiteItemIds', { min: 2, max: 32 });
    prerequisiteItemIds.forEach(factId => {
      if (!allowedFacts.has(factId)) fail('unauthorized-prerequisite', `prerequisite item ${factId} is outside contract authority`);
    });
    const prerequisiteFacts = new Set(prerequisiteItemIds);

    if (!Array.isArray(input.questions) || input.questions.length < MIN_QUESTIONS || input.questions.length > MAX_QUESTIONS) {
      fail('invalid-question-count', `activity.questions must contain ${MIN_QUESTIONS}-${MAX_QUESTIONS} questions`);
    }

    const questionIds = new Set();
    const factIds = new Set();
    const frPrompts = new Set();
    const viPrompts = new Set();

    const questions = input.questions.map((question, questionIndex) => {
      if (!question || typeof question !== 'object' || Array.isArray(question)) {
        fail('invalid-question', `questions[${questionIndex}] must be an object`);
      }

      const questionId = stableId(question.id, `questions[${questionIndex}].id`);
      if (questionIds.has(questionId)) fail('duplicate-question-id', `duplicate question id ${questionId}`);
      questionIds.add(questionId);

      const factId = stableId(question.factId, `questions[${questionIndex}].factId`);
      if (factIds.has(factId)) fail('duplicate-fact-id', `duplicate factId ${factId}`);
      if (!allowedFacts.has(factId) || !prerequisiteFacts.has(factId)) {
        fail('unauthorized-fact', `factId ${factId} is outside the accepted source/prerequisite set`);
      }
      factIds.add(factId);

      const questionVi = boundedText(question.questionVi, `questions[${questionIndex}].questionVi`, 240);
      const questionFr = boundedText(question.questionFr, `questions[${questionIndex}].questionFr`, 240);
      const frKey = normalizePrompt(questionFr);
      const viKey = normalizePrompt(questionVi);
      if (!frKey || !viKey) fail('invalid-prompt', `questions[${questionIndex}] has an empty normalized prompt`);
      if (frPrompts.has(frKey) || viPrompts.has(viKey)) {
        fail('duplicate-prompt', `questions[${questionIndex}] duplicates an existing normalized prompt`);
      }
      frPrompts.add(frKey);
      viPrompts.add(viKey);

      const options = normalizeOptions(question.options, questionIndex);
      if (!Number.isInteger(question.answer) || question.answer < 0 || question.answer >= options.length) {
        fail('invalid-answer', `questions[${questionIndex}].answer must index one option`);
      }

      if (!Array.isArray(question.evidenceItems) || question.evidenceItems.length !== 1) {
        fail('invalid-evidence-shape', `questions[${questionIndex}].evidenceItems must equal [factId]`);
      }
      const evidenceId = stableId(question.evidenceItems[0], `questions[${questionIndex}].evidenceItems[0]`);
      if (evidenceId !== factId) {
        fail('fact-evidence-mismatch', `questions[${questionIndex}].evidenceItems must equal [factId]`);
      }

      return {
        id: questionId,
        factId,
        questionVi,
        questionFr,
        options,
        answer: question.answer,
        evidenceItems: [evidenceId]
      };
    });

    return deepFreeze({
      schema: 'french-tranquille-a2-r1-reception/v1',
      lane: LANE,
      id,
      source: {
        kind,
        dialogueId,
        prerequisiteLessonId,
        prerequisiteItemIds: [...prerequisiteItemIds]
      },
      questions
    });
  }

  function evaluateQuestion(plan, questionId, choiceIndex) {
    if (!plan || typeof plan !== 'object' || !Array.isArray(plan.questions)) {
      fail('invalid-plan', 'normalized plan is required');
    }
    const id = stableId(questionId, 'questionId');
    const question = plan.questions.find(entry => entry.id === id);
    if (!question) fail('unknown-question', `unknown question ${id}`);
    if (!Number.isInteger(choiceIndex) || choiceIndex < 0 || choiceIndex >= question.options.length) {
      fail('invalid-choice', 'choiceIndex must index one option');
    }
    return deepFreeze({
      questionId: question.id,
      factId: question.factId,
      choiceIndex,
      answerIndex: question.answer,
      outcome: choiceIndex === question.answer ? 'success' : 'miss'
    });
  }

  return Object.freeze({
    roadmapSlice: ROADMAP_SLICE,
    version: API_VERSION,
    lane: LANE,
    schema: 'french-tranquille-a2-r1-reception/v1',
    limits: Object.freeze({ questions: Object.freeze([MIN_QUESTIONS, MAX_QUESTIONS]), options: Object.freeze([MIN_OPTIONS, MAX_OPTIONS]) }),
    normalizePrompt,
    normalizeActivity,
    evaluateQuestion,
    R1ContractError
  });
});
