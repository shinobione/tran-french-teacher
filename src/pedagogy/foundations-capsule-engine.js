(() => {
  'use strict';

  const freeze = value => {
    if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
    Object.values(value).forEach(freeze);
    return Object.freeze(value);
  };

  const fail = message => { throw new TypeError(`Foundations capsule: ${message}`); };
  const text = (value, label) => {
    if (typeof value !== 'string' || !value.trim()) fail(`${label} must be a non-empty string`);
    return value.trim();
  };
  const localized = (value, label) => {
    if (!value || typeof value !== 'object' || Array.isArray(value)) fail(`${label} must be localized`);
    return freeze({ vi:text(value.vi, `${label}.vi`), fr:text(value.fr, `${label}.fr`) });
  };
  const stringList = (value, label) => {
    if (!Array.isArray(value) || !value.length) fail(`${label} must be a non-empty array`);
    return freeze(value.map((item, index) => text(item, `${label}[${index}]`)));
  };

  function compile(raw){
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) fail('definition must be an object');
    const id = text(raw.id, 'id');
    const concepts = stringList(raw.concepts, 'concepts');
    const intro = Array.isArray(raw.intro) ? raw.intro.map((block, index) => localized(block, `intro[${index}]`)) : fail('intro must be an array');
    if (!intro.length) fail('intro must not be empty');
    const examples = stringList(raw.examples, 'examples');
    if (!Array.isArray(raw.checks) || !raw.checks.length) fail('checks must be a non-empty array');
    const checks = raw.checks.map((check, index) => {
      if (!check || typeof check !== 'object') fail(`checks[${index}] must be an object`);
      const choices = stringList(check.choices, `checks[${index}].choices`);
      const answer = text(check.answer, `checks[${index}].answer`);
      if (!choices.includes(answer)) fail(`checks[${index}].answer must exist in choices`);
      return freeze({
        id:text(check.id || `q${index+1}`, `checks[${index}].id`),
        prompt:localized(check.prompt, `checks[${index}].prompt`),
        choices,
        answer,
        feedback:localized(check.feedback, `checks[${index}].feedback`)
      });
    });
    const optional = raw.optional !== false;
    const persistence = raw.persistence || 'ephemeral-only';
    if (persistence !== 'ephemeral-only') fail('persistence must remain ephemeral-only in Build 37.2');
    if (raw.masteryClaim === true) fail('masteryClaim must remain false in Build 37.2');

    return freeze({
      schema:'french-tranquille-foundations-capsule/v1',
      id,
      concepts,
      title:localized(raw.title, 'title'),
      intro:freeze(intro),
      examples,
      checks:freeze(checks),
      conclusion:localized(raw.conclusion, 'conclusion'),
      optional,
      persistence:'ephemeral-only',
      masteryClaim:false,
      sequence:freeze(['observe','explain','construct','contrast','transfer'])
    });
  }

  const isCompiled = capsule => capsule?.schema === 'french-tranquille-foundations-capsule/v1';
  const ensureCapsule = capsule => isCompiled(capsule) ? capsule : compile(capsule);
  const lang = value => value === 'fr' ? 'fr' : 'vi';
  const localize = (value, locale='vi') => value?.[lang(locale)] || '';

  function initialState(capsule){
    const definition = ensureCapsule(capsule);
    return freeze({
      schema:'french-tranquille-foundations-session/v1',
      capsuleId:definition.id,
      phase:'intro',
      questionIndex:0,
      answered:false,
      answers:freeze([]),
      finished:false
    });
  }

  function assertState(capsule, state){
    if (!state || state.schema !== 'french-tranquille-foundations-session/v1') fail('invalid session state');
    if (state.capsuleId !== capsule.id) fail('session/capsule mismatch');
  }

  function reduce(capsuleInput, stateInput, action){
    const capsule = ensureCapsule(capsuleInput);
    const state = stateInput || initialState(capsule);
    assertState(capsule, state);
    if (!action || typeof action.type !== 'string') fail('action.type is required');

    if (action.type === 'RESET') return initialState(capsule);

    if (state.phase === 'intro') {
      if (action.type !== 'NEXT') fail('intro accepts NEXT only');
      return freeze({ ...state, phase:'question', questionIndex:0, answered:false });
    }

    if (state.phase === 'question') {
      const check = capsule.checks[state.questionIndex];
      if (action.type === 'ANSWER') {
        if (state.answered) fail('question already answered');
        const choice = text(action.choice, 'action.choice');
        if (!check.choices.includes(choice)) fail('answer choice is not available');
        const result = freeze({
          checkId:check.id,
          choice,
          correct:choice === check.answer,
          correctAnswer:check.answer
        });
        return freeze({ ...state, answered:true, answers:freeze([...state.answers, result]) });
      }
      if (action.type === 'NEXT') {
        if (!state.answered) fail('question requires an answer before NEXT');
        const last = state.questionIndex >= capsule.checks.length - 1;
        if (last) return freeze({ ...state, phase:'done', finished:true, answered:false });
        return freeze({ ...state, questionIndex:state.questionIndex + 1, answered:false });
      }
      fail('question accepts ANSWER or NEXT only');
    }

    if (state.phase === 'done') {
      fail('done accepts RESET only');
    }

    fail(`unknown phase ${state.phase}`);
  }

  function view(capsuleInput, stateInput, locale='vi'){
    const capsule = ensureCapsule(capsuleInput);
    const state = stateInput || initialState(capsule);
    assertState(capsule, state);
    const language = lang(locale);
    const base = {
      capsuleId:capsule.id,
      phase:state.phase,
      title:localize(capsule.title, language),
      optional:capsule.optional,
      persistence:capsule.persistence,
      masteryClaim:false,
      progress: state.phase === 'intro' ? 0 : state.phase === 'done' ? 1 : (state.questionIndex + 1) / capsule.checks.length
    };
    if (state.phase === 'intro') return freeze({ ...base, intro:capsule.intro.map(block => localize(block, language)), examples:capsule.examples });
    if (state.phase === 'question') {
      const check = capsule.checks[state.questionIndex];
      const answer = state.answers[state.answers.length - 1];
      return freeze({
        ...base,
        questionNumber:state.questionIndex + 1,
        questionTotal:capsule.checks.length,
        prompt:localize(check.prompt, language),
        choices:check.choices,
        answered:state.answered,
        feedback:state.answered ? localize(check.feedback, language) : '',
        correct:state.answered ? answer.correct : null,
        correctAnswer:state.answered ? check.answer : null
      });
    }
    return freeze({
      ...base,
      conclusion:localize(capsule.conclusion, language),
      summary:freeze({
        answered:state.answers.length,
        correct:state.answers.filter(answer => answer.correct).length,
        masteryClaim:false,
        durableWrite:false
      })
    });
  }

  const API = freeze({
    schema:'french-tranquille-foundations-capsule-engine/v1',
    build:37,
    slice:'37.2',
    status:'pure-non-wired',
    compile,
    initialState,
    reduce,
    view,
    localize
  });

  if (typeof module === 'object' && module.exports) module.exports = API;
  if (typeof window !== 'undefined') window.FrenchTranquilleFoundationsCapsuleEngine = API;
})();
