(function attachRecentPastRendererAdapter(root, factory) {
  'use strict';
  const pureCore = typeof module === 'object' && module.exports
    ? require('./generalization-recent-past-core.js')
    : root?.FrenchTranquilleRecentPastTransferCore;
  const api = factory(pureCore);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.FrenchTranquilleRecentPastTransferAdapter = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createRecentPastRendererAdapter(core) {
  'use strict';

  const fail = message => { throw new TypeError(`Recent-past renderer adapter: ${message}`); };
  const freeze = value => {
    if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
    Object.values(value).forEach(freeze);
    return Object.freeze(value);
  };

  if (!core || core.roadmapSlice !== '41.2' || core.familyId !== 'present-je-regular-action-to-recent-past-je-venir-de') {
    fail('certified Build 41.2 core is required');
  }

  const SOURCE = core.catalog();
  if (!Array.isArray(SOURCE) || SOURCE.length !== 3) fail('Build 41.2 catalog must contain exactly three exercises');

  const FAMILY = freeze({
    id: core.familyId,
    build:41,
    slice:'41.3',
    title:freeze({
      vi:'Từ hiện tại sang “vừa mới”',
      fr:'Passer du présent au passé récent'
    }),
    instruction:freeze({
      vi:'Giữ “je” và cùng hành động. Dùng “je viens de + động từ nguyên mẫu” để nói việc vừa mới xảy ra.',
      fr:'Garde « je » et la même action. Utilise « je viens de + infinitif » pour dire ce qui vient de se passer.'
    }),
    persistence:'ephemeral-only',
    masteryClaim:false
  });

  const DISTRACTORS = freeze({
    work:freeze(['Je viens de travailler.','Je viens travailler.','Je viens de travaille.']),
    eat:freeze(['Je viens de manger.','Je viens manger.','Je viens de mange.']),
    'return-home':freeze(['Je viens de rentrer à la maison.','Je viens rentrer à la maison.','Je viens de rentre à la maison.'])
  });

  const CATALOG = freeze(SOURCE.map(entry => freeze({
    schema:'french-tranquille-recent-past-renderer-exercise/v1',
    family:FAMILY.id,
    id:entry.id,
    source:entry.source,
    target:entry.target,
    infinitive:entry.infinitive,
    sourceLesson:entry.sourceLesson,
    anchorLesson:entry.anchorLesson,
    durableWrite:false,
    masteryClaim:false
  })));

  const resolveExercise = input => {
    if (input?.schema === 'french-tranquille-recent-past-renderer-exercise/v1') return input;
    const id = typeof input === 'string' ? input : input?.id;
    const exercise = CATALOG.find(item => item.id === id);
    if (!exercise) fail(`unknown exercise ${String(id || '')}`);
    return exercise;
  };
  const language = value => value === 'fr' ? 'fr' : 'vi';

  function view(exerciseInput, lang='vi') {
    const exercise = resolveExercise(exerciseInput);
    const locale = language(lang);
    const cue = locale === 'fr'
      ? `Transforme « ${exercise.source} » pour dire que l’action vient juste d’avoir lieu.`
      : `Đổi “${exercise.source}” để nói hành động vừa mới xảy ra.`;
    return freeze({
      schema:'french-tranquille-recent-past-renderer-view/v1',
      family:FAMILY.id,
      title:FAMILY.title[locale],
      instruction:FAMILY.instruction[locale],
      cue,
      source:exercise.source,
      target:exercise.target,
      choices:DISTRACTORS[exercise.id],
      persistence:'ephemeral-only',
      masteryClaim:false,
      durableWrite:false
    });
  }

  function verify(exerciseInput, answer) {
    const exercise = resolveExercise(exerciseInput);
    return core.verify(exercise.id, answer).ok === true;
  }

  return freeze({
    schema:'french-tranquille-recent-past-renderer-adapter/v1',
    build:41,
    slice:'41.3',
    sourceSlice:'41.2',
    status:'read-only-renderer-compatibility',
    family:FAMILY,
    catalog:CATALOG,
    view,
    verify,
    durableWrite:false,
    masteryClaim:false
  });
});
