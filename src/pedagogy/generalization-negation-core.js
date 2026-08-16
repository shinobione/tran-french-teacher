(() => {
  'use strict';

  const base = typeof module === 'object' && module.exports
    ? require('./generalization-transfer-core.js')
    : window.FrenchTranquilleGeneralizationTransfer;

  const freeze = value => {
    if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
    Object.values(value).forEach(freeze);
    return Object.freeze(value);
  };
  const fail = message => { throw new TypeError(`Negation transfer: ${message}`); };
  const text = (value, label) => {
    if (typeof value !== 'string' || !value.trim()) fail(`${label} must be a non-empty string`);
    return value.trim();
  };

  if (!base || base.schema !== 'french-tranquille-generalization-transfer/v1' || base.slice !== '38.1') {
    fail('certified Build 38.1 transfer core is required');
  }

  const TARGETS = freeze({
    travailler:freeze({target:'Je ne travaille pas.',anchors:freeze(['F11','F08','l17','l18','l32','l33','38.1'])}),
    habiter:freeze({target:"Je n'habite pas ici.",anchors:freeze(['F11','F08','l3','l17','l32','l33','38.1'])}),
    aimer:freeze({target:"Je n'aime pas ça.",anchors:freeze(['F11','F08','l5','l17','l32','38.1'])})
  });

  const FAMILY = freeze({
    id:'affirmation-negation-regular-er-je',
    build:38,
    slice:'38.3',
    schema:'french-tranquille-transfer-family/v1',
    title:freeze({
      vi:'Từ khẳng định sang phủ định',
      fr:'Passer de l’affirmation à la négation'
    }),
    instruction:freeze({
      vi:'Giữ cùng người, động từ và ý chính. Chỉ biến câu khẳng định thành câu phủ định đầy đủ với ne / n’ ... pas.',
      fr:'Garde la même personne, le même verbe et la même idée. Transforme seulement la phrase affirmative en négation complète avec ne / n’ ... pas.'
    }),
    subject:'je',
    verbs:freeze(Object.keys(TARGETS)),
    pattern:'ne-or-n-apostrophe + conjugated verb + pas',
    excluded:freeze([
      'avoir','pouvoir','aller','etre','il-y-a','questions','spoken-ne-drop',
      'plural','futur-proche','agreement','new-vocabulary','random-generation'
    ]),
    persistence:'ephemeral-only',
    masteryClaim:false
  });

  const locale = value => value === 'fr' ? 'fr' : 'vi';
  const localize = (value, lang='vi') => value?.[locale(lang)] || '';

  function createExercise(verbInput){
    const verb = text(typeof verbInput === 'string' ? verbInput : verbInput?.verb, 'verb');
    const spec = TARGETS[verb];
    if (!spec) fail(`unsupported verb ${verb}`);
    const source = base.buildSentence('je', verb);
    return freeze({
      schema:'french-tranquille-negation-transfer-exercise/v1',
      family:FAMILY.id,
      verb,
      subject:'je',
      source,
      target:spec.target,
      anchors:spec.anchors,
      durableWrite:false,
      masteryClaim:false
    });
  }

  function distractors(exerciseInput){
    const exercise = exerciseInput?.schema === 'french-tranquille-negation-transfer-exercise/v1'
      ? exerciseInput
      : createExercise(exerciseInput);
    const wrong = exercise.verb === 'travailler'
      ? 'Je ne travaille.'
      : exercise.verb === 'habiter'
        ? 'Je ne habite pas ici.'
        : 'Je ne aime pas ça.';
    return freeze([...new Set([exercise.target, wrong, exercise.source])]);
  }

  function view(exerciseInput, lang='vi'){
    const exercise = exerciseInput?.schema === 'french-tranquille-negation-transfer-exercise/v1'
      ? exerciseInput
      : createExercise(exerciseInput);
    const language = locale(lang);
    const cue = language === 'fr'
      ? `Mets « ${exercise.source} » à la forme négative.`
      : `Đổi “${exercise.source}” sang câu phủ định.`;
    return freeze({
      schema:'french-tranquille-negation-transfer-view/v1',
      family:FAMILY.id,
      title:localize(FAMILY.title, language),
      instruction:localize(FAMILY.instruction, language),
      cue,
      source:exercise.source,
      target:exercise.target,
      choices:distractors(exercise),
      persistence:'ephemeral-only',
      masteryClaim:false,
      durableWrite:false
    });
  }

  function verify(exerciseInput, answer){
    const exercise = exerciseInput?.schema === 'french-tranquille-negation-transfer-exercise/v1'
      ? exerciseInput
      : createExercise(exerciseInput);
    return text(answer, 'answer') === exercise.target;
  }

  const CATALOG = freeze(FAMILY.verbs.map(verb => createExercise(verb)));

  const API = freeze({
    schema:'french-tranquille-generalization-negation/v1',
    build:38,
    slice:'38.3',
    status:'pure-non-wired',
    family:FAMILY,
    catalog:CATALOG,
    createExercise,
    distractors,
    view,
    verify
  });

  if (typeof module === 'object' && module.exports) module.exports = API;
  if (typeof window !== 'undefined') window.FrenchTranquilleGeneralizationNegation = API;
})();
