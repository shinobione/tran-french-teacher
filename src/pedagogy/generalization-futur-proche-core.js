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
  const fail = message => { throw new TypeError(`Futur proche transfer: ${message}`); };
  const text = (value, label) => {
    if (typeof value !== 'string' || !value.trim()) fail(`${label} must be a non-empty string`);
    return value.trim();
  };

  if (!base || base.schema !== 'french-tranquille-generalization-transfer/v1' || base.slice !== '38.1') {
    fail('certified Build 38.1 transfer core is required');
  }

  const SUBJECTS = freeze({
    je:freeze({label:'Je',aller:'vais',wrongAller:'va',anchors:freeze(['F08','l35','38.1'])}),
    tu:freeze({label:'Tu',aller:'vas',wrongAller:'vais',anchors:freeze(['F08','l32','l35','38.1'])}),
    il:freeze({label:'Il',aller:'va',wrongAller:'vais',anchors:freeze(['F08','l33','l35','38.1'])}),
    elle:freeze({label:'Elle',aller:'va',wrongAller:'vais',anchors:freeze(['F08','l33','l35','38.1'])})
  });

  const FAMILY = freeze({
    id:'present-futur-proche-travailler-singular',
    build:38,
    slice:'38.4',
    schema:'french-tranquille-transfer-family/v1',
    title:freeze({
      vi:'Từ hiện tại sang tương lai gần',
      fr:'Passer du présent au futur proche'
    }),
    instruction:freeze({
      vi:'Giữ cùng người và cùng hành động. Dùng aller ở hiện tại rồi thêm travailler ở dạng nguyên mẫu.',
      fr:'Garde la même personne et la même action. Utilise aller au présent puis travailler à l’infinitif.'
    }),
    subjects:freeze(Object.keys(SUBJECTS)),
    verb:'travailler',
    pattern:'subject + present aller + infinitive travailler',
    excluded:freeze([
      'nous','vous','ils','elles','other-infinitives','negation','questions',
      'past-tense','new-vocabulary','random-generation'
    ]),
    persistence:'ephemeral-only',
    masteryClaim:false
  });

  const locale = value => value === 'fr' ? 'fr' : 'vi';
  const localize = (value, lang='vi') => value?.[locale(lang)] || '';

  function createExercise(subjectInput){
    const subject = text(typeof subjectInput === 'string' ? subjectInput : subjectInput?.subject, 'subject');
    const spec = SUBJECTS[subject];
    if (!spec) fail(`unsupported subject ${subject}`);
    const source = base.buildSentence(subject, 'travailler');
    const target = `${spec.label} ${spec.aller} travailler.`;
    return freeze({
      schema:'french-tranquille-futur-proche-transfer-exercise/v1',
      family:FAMILY.id,
      subject,
      verb:'travailler',
      source,
      target,
      anchors:spec.anchors,
      durableWrite:false,
      masteryClaim:false
    });
  }

  function distractors(exerciseInput){
    const exercise = exerciseInput?.schema === 'french-tranquille-futur-proche-transfer-exercise/v1'
      ? exerciseInput
      : createExercise(exerciseInput);
    const spec = SUBJECTS[exercise.subject];
    const wrongAuxiliary = `${spec.label} ${spec.wrongAller} travailler.`;
    const wrongInfinitive = `${spec.label} ${spec.aller} travaille.`;
    return freeze([...new Set([exercise.target, wrongAuxiliary, wrongInfinitive])]);
  }

  function view(exerciseInput, lang='vi'){
    const exercise = exerciseInput?.schema === 'french-tranquille-futur-proche-transfer-exercise/v1'
      ? exerciseInput
      : createExercise(exerciseInput);
    const language = locale(lang);
    const cue = language === 'fr'
      ? `Transforme « ${exercise.source} » pour dire que l’action va arriver bientôt.`
      : `Đổi “${exercise.source}” để nói hành động sắp xảy ra.`;
    return freeze({
      schema:'french-tranquille-futur-proche-transfer-view/v1',
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
    const exercise = exerciseInput?.schema === 'french-tranquille-futur-proche-transfer-exercise/v1'
      ? exerciseInput
      : createExercise(exerciseInput);
    return text(answer, 'answer') === exercise.target;
  }

  const CATALOG = freeze(FAMILY.subjects.map(subject => createExercise(subject)));

  const API = freeze({
    schema:'french-tranquille-generalization-futur-proche/v1',
    build:38,
    slice:'38.4',
    status:'pure-non-wired',
    family:FAMILY,
    subjects:SUBJECTS,
    catalog:CATALOG,
    createExercise,
    distractors,
    view,
    verify
  });

  if (typeof module === 'object' && module.exports) module.exports = API;
  if (typeof window !== 'undefined') window.FrenchTranquilleGeneralizationFuturProche = API;
})();
