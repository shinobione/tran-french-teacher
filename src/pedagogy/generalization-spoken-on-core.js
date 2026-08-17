(() => {
  'use strict';

  const freeze=value=>{
    if(!value||typeof value!=='object'||Object.isFrozen(value))return value;
    Object.values(value).forEach(freeze);
    return Object.freeze(value);
  };
  const fail=message=>{throw new TypeError(`Spoken on transfer: ${message}`)};
  const text=(value,label)=>{
    if(typeof value!=='string'||!value.trim())fail(`${label} must be a non-empty string`);
    return value.trim();
  };

  const PHRASES=freeze({
    travailler:freeze({
      source:'Nous travaillons.',target:'On travaille.',wrongOn:'On travaillons.',wrongNous:'Nous travaille.',
      anchors:freeze(['F05','F08','F18','l34','l52'])
    }),
    rentrer:freeze({
      source:'Nous rentrons.',target:'On rentre.',wrongOn:'On rentrons.',wrongNous:'Nous rentre.',
      anchors:freeze(['F05','F08','F18','l34','l52'])
    }),
    'aller-a':freeze({
      source:'Nous allons à…',target:'On va à…',wrongOn:'On allons à…',wrongNous:'Nous va à…',
      anchors:freeze(['F05','F09','F18','l34','l52'])
    })
  });

  const FAMILY=freeze({
    id:'nous-on-spoken-equivalence',
    build:38,
    slice:'38.9',
    schema:'french-tranquille-transfer-family/v1',
    title:freeze({vi:'Từ « nous » sang « on » khi nói',fr:'Passer de « nous » à « on » à l’oral'}),
    instruction:freeze({
      vi:'Giữ cùng nhóm người và cùng hành động. Trong tiếng Pháp nói, « on » rất thường thay cho « nous »; động từ đi với « on » dùng dạng như il/elle.',
      fr:'Garde le même groupe et la même action. À l’oral, « on » remplace très souvent « nous » ; le verbe avec « on » prend la forme de il/elle.'
    }),
    phrases:freeze(Object.keys(PHRASES)),
    transformations:freeze(['nous→on','verb→il/elle-form','same-group-meaning']),
    excluded:freeze([
      'generic-on','indefinite-on','passive-on','adjective-agreement','object-pronouns',
      'negation','questions','new-vocabulary','random-generation'
    ]),
    persistence:'ephemeral-only',
    masteryClaim:false
  });

  const locale=value=>value==='fr'?'fr':'vi';
  const localize=(value,lang='vi')=>value?.[locale(lang)]||'';

  function createExercise(phraseInput){
    const phrase=text(typeof phraseInput==='string'?phraseInput:phraseInput?.phrase,'phrase');
    const spec=PHRASES[phrase];
    if(!spec)fail(`unsupported phrase ${phrase}`);
    return freeze({
      schema:'french-tranquille-spoken-on-transfer-exercise/v1',
      family:FAMILY.id,
      phrase,
      source:spec.source,
      target:spec.target,
      anchors:spec.anchors,
      durableWrite:false,
      masteryClaim:false
    });
  }

  function distractors(exerciseInput){
    const exercise=exerciseInput?.schema==='french-tranquille-spoken-on-transfer-exercise/v1'
      ?exerciseInput
      :createExercise(exerciseInput);
    const spec=PHRASES[exercise.phrase];
    return freeze([...new Set([exercise.target,spec.wrongOn,spec.wrongNous])]);
  }

  function view(exerciseInput,lang='vi'){
    const exercise=exerciseInput?.schema==='french-tranquille-spoken-on-transfer-exercise/v1'
      ?exerciseInput
      :createExercise(exerciseInput);
    const language=locale(lang);
    const cue=language==='fr'
      ?`Reformule « ${exercise.source} » comme on le dirait souvent à l’oral avec « on ».`
      :`Đổi “${exercise.source}” sang cách nói rất thường gặp với “on”, giữ cùng ý “chúng ta”.`;
    return freeze({
      schema:'french-tranquille-spoken-on-transfer-view/v1',
      family:FAMILY.id,
      title:localize(FAMILY.title,language),
      instruction:localize(FAMILY.instruction,language),
      cue,
      source:exercise.source,
      target:exercise.target,
      choices:distractors(exercise),
      persistence:'ephemeral-only',
      masteryClaim:false,
      durableWrite:false
    });
  }

  function verify(exerciseInput,answer){
    const exercise=exerciseInput?.schema==='french-tranquille-spoken-on-transfer-exercise/v1'
      ?exerciseInput
      :createExercise(exerciseInput);
    return text(answer,'answer')===exercise.target;
  }

  const CATALOG=freeze(FAMILY.phrases.map(phrase=>createExercise(phrase)));

  const API=freeze({
    schema:'french-tranquille-generalization-spoken-on/v1',
    build:38,
    slice:'38.9',
    status:'pure-non-wired',
    family:FAMILY,
    phrases:PHRASES,
    catalog:CATALOG,
    createExercise,
    distractors,
    view,
    verify
  });

  if(typeof module==='object'&&module.exports)module.exports=API;
  if(typeof window!=='undefined')window.FrenchTranquilleGeneralizationSpokenOn=API;
})();
