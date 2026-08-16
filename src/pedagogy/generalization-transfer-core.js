(() => {
  'use strict';

  const freeze = value => {
    if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
    Object.values(value).forEach(freeze);
    return Object.freeze(value);
  };

  const fail = message => { throw new TypeError(`Generalization transfer: ${message}`); };
  const text = (value, label) => {
    if (typeof value !== 'string' || !value.trim()) fail(`${label} must be a non-empty string`);
    return value.trim();
  };

  const SUBJECTS = freeze({
    je:freeze({id:'je',label:'je',ending:'e'}),
    tu:freeze({id:'tu',label:'tu',ending:'es'}),
    il:freeze({id:'il',label:'il',ending:'e'}),
    elle:freeze({id:'elle',label:'elle',ending:'e'})
  });

  const VERBS = freeze({
    travailler:freeze({id:'travailler',infinitive:'travailler',stem:'travaill',complement:'',elideJe:false,anchors:freeze(['F08','l32','l33'])}),
    habiter:freeze({id:'habiter',infinitive:'habiter',stem:'habit',complement:'ici',elideJe:true,anchors:freeze(['l3','F08','l32','l33'])}),
    aimer:freeze({id:'aimer',infinitive:'aimer',stem:'aim',complement:'ça',elideJe:true,anchors:freeze(['l5','F08','l32'])})
  });

  const FAMILY = freeze({
    id:'subject-substitution-regular-er',
    build:38,
    slice:'38.1',
    schema:'french-tranquille-transfer-family/v1',
    title:freeze({
      vi:'Đổi người, xây lại câu',
      fr:'Changer la personne, reconstruire la phrase'
    }),
    instruction:freeze({
      vi:'Giữ ý chính và động từ. Đổi người làm hành động, rồi xây lại câu.',
      fr:'Garde l’idée et le verbe. Change la personne qui fait l’action, puis reconstruis la phrase.'
    }),
    subjects:freeze(Object.keys(SUBJECTS)),
    verbs:freeze(Object.keys(VERBS)),
    excluded:freeze(['aller','vouloir','pouvoir','devoir']),
    persistence:'ephemeral-only',
    masteryClaim:false
  });

  const locale = value => value === 'fr' ? 'fr' : 'vi';
  const localize = (value, lang='vi') => value?.[locale(lang)] || '';
  const sentenceCase = value => value ? value.charAt(0).toUpperCase() + value.slice(1) : value;

  function subjectText(subject, verb){
    if (subject.id === 'je' && verb.elideJe) return "j'";
    return subject.label;
  }

  function conjugate(subjectId, verbId){
    const subject = SUBJECTS[text(subjectId, 'subject')];
    const verb = VERBS[text(verbId, 'verb')];
    if (!subject) fail(`unsupported subject ${subjectId}`);
    if (!verb) fail(`unsupported verb ${verbId}`);
    return `${verb.stem}${subject.ending}`;
  }

  function buildSentence(subjectId, verbId){
    const subject = SUBJECTS[text(subjectId, 'subject')];
    const verb = VERBS[text(verbId, 'verb')];
    if (!subject) fail(`unsupported subject ${subjectId}`);
    if (!verb) fail(`unsupported verb ${verbId}`);
    const pronoun = subjectText(subject, verb);
    const verbForm = conjugate(subject.id, verb.id);
    const base = pronoun.endsWith("'") ? `${pronoun}${verbForm}` : `${pronoun} ${verbForm}`;
    const full = verb.complement ? `${base} ${verb.complement}` : base;
    return `${sentenceCase(full)}.`;
  }

  function createExercise(input){
    if (!input || typeof input !== 'object' || Array.isArray(input)) fail('exercise input must be an object');
    const verbId = text(input.verb, 'verb');
    const from = text(input.from, 'from');
    const to = text(input.to, 'to');
    if (!VERBS[verbId]) fail(`unsupported verb ${verbId}`);
    if (!SUBJECTS[from]) fail(`unsupported source subject ${from}`);
    if (!SUBJECTS[to]) fail(`unsupported target subject ${to}`);
    if (from === to) fail('source and target subjects must differ');
    const source = buildSentence(from, verbId);
    const target = buildSentence(to, verbId);
    return freeze({
      schema:'french-tranquille-transfer-exercise/v1',
      family:FAMILY.id,
      verb:verbId,
      from,
      to,
      source,
      target,
      anchors:VERBS[verbId].anchors,
      durableWrite:false,
      masteryClaim:false
    });
  }

  function distractors(exerciseInput){
    const exercise = exerciseInput?.schema === 'french-tranquille-transfer-exercise/v1'
      ? exerciseInput
      : createExercise(exerciseInput);
    const verb = VERBS[exercise.verb];
    const targetSubject = SUBJECTS[exercise.to];
    const wrongEnding = targetSubject.id === 'tu' ? 'e' : 'es';
    const pronoun = subjectText(targetSubject, verb);
    const wrongVerb = `${verb.stem}${wrongEnding}`;
    const wrongBase = pronoun.endsWith("'") ? `${pronoun}${wrongVerb}` : `${pronoun} ${wrongVerb}`;
    const wrongAgreement = `${sentenceCase(verb.complement ? `${wrongBase} ${verb.complement}` : wrongBase)}.`;
    const unchanged = exercise.source;
    return freeze([...new Set([exercise.target, wrongAgreement, unchanged])]);
  }

  function view(exerciseInput, lang='vi'){
    const exercise = exerciseInput?.schema === 'french-tranquille-transfer-exercise/v1'
      ? exerciseInput
      : createExercise(exerciseInput);
    const language = locale(lang);
    const cue = language === 'fr'
      ? `Remplace « ${exercise.from} » par « ${exercise.to} » et reconstruis la phrase.`
      : `Đổi « ${exercise.from} » thành « ${exercise.to} », rồi xây lại câu.`;
    return freeze({
      schema:'french-tranquille-transfer-view/v1',
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
    const exercise = exerciseInput?.schema === 'french-tranquille-transfer-exercise/v1'
      ? exerciseInput
      : createExercise(exerciseInput);
    return text(answer, 'answer') === exercise.target;
  }

  const CATALOG = freeze([
    createExercise({verb:'travailler',from:'je',to:'tu'}),
    createExercise({verb:'travailler',from:'tu',to:'elle'}),
    createExercise({verb:'habiter',from:'je',to:'tu'}),
    createExercise({verb:'habiter',from:'il',to:'elle'}),
    createExercise({verb:'aimer',from:'je',to:'tu'}),
    createExercise({verb:'aimer',from:'tu',to:'elle'})
  ]);

  const API = freeze({
    schema:'french-tranquille-generalization-transfer/v1',
    build:38,
    slice:'38.1',
    status:'pure-non-wired',
    family:FAMILY,
    subjects:SUBJECTS,
    verbs:VERBS,
    catalog:CATALOG,
    conjugate,
    buildSentence,
    createExercise,
    distractors,
    view,
    verify
  });

  if (typeof module === 'object' && module.exports) module.exports = API;
  if (typeof window !== 'undefined') window.FrenchTranquilleGeneralizationTransfer = API;
})();
