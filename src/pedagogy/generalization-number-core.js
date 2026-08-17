(() => {
  'use strict';

  const freeze=value=>{
    if(!value||typeof value!=='object'||Object.isFrozen(value))return value;
    Object.values(value).forEach(freeze);
    return Object.freeze(value);
  };
  const fail=message=>{throw new TypeError(`Nominal number transfer: ${message}`)};
  const text=(value,label)=>{
    if(typeof value!=='string'||!value.trim())fail(`${label} must be a non-empty string`);
    return value.trim();
  };

  const NOUNS=freeze({
    gare:freeze({source:'la gare',target:'les gares',article:'definite',anchors:freeze(['F01','F02','F04','l8'])}),
    pharmacie:freeze({source:'la pharmacie',target:'les pharmacies',article:'definite',anchors:freeze(['F01','F02','F04','l8'])}),
    billet:freeze({source:'un billet',target:'des billets',article:'indefinite',anchors:freeze(['F01','F03','F04','l9'])}),
    table:freeze({source:'une table',target:'des tables',article:'indefinite',anchors:freeze(['F01','F03','F04','l12'])})
  });

  const FAMILY=freeze({
    id:'singular-plural-regular-noun-phrases',
    build:38,
    slice:'38.6',
    schema:'french-tranquille-transfer-family/v1',
    title:freeze({vi:'Từ một sang nhiều',fr:'Passer du singulier au pluriel'}),
    instruction:freeze({
      vi:'Giữ cùng đồ vật hoặc địa điểm. Đổi nhóm từ sang số nhiều: le/la → les, un/une → des, rồi thêm -s cho danh từ thường.',
      fr:'Garde le même objet ou lieu. Passe le groupe au pluriel : le/la → les, un/une → des, puis ajoute -s au nom régulier.'
    }),
    nouns:freeze(Object.keys(NOUNS)),
    transformations:freeze(['le/la→les','un/une→des','regular-noun→+s']),
    excluded:freeze([
      'irregular-plurals','x-plurals','aux-plurals','adjective-agreement','possessives',
      'full-sentence-agreement','new-vocabulary','random-generation'
    ]),
    persistence:'ephemeral-only',
    masteryClaim:false
  });

  const locale=value=>value==='fr'?'fr':'vi';
  const localize=(value,lang='vi')=>value?.[locale(lang)]||'';

  function createExercise(nounInput){
    const noun=text(typeof nounInput==='string'?nounInput:nounInput?.noun,'noun');
    const spec=NOUNS[noun];
    if(!spec)fail(`unsupported noun ${noun}`);
    return freeze({
      schema:'french-tranquille-number-transfer-exercise/v1',
      family:FAMILY.id,
      noun,
      article:spec.article,
      source:spec.source,
      target:spec.target,
      anchors:spec.anchors,
      durableWrite:false,
      masteryClaim:false
    });
  }

  function distractors(exerciseInput){
    const exercise=exerciseInput?.schema==='french-tranquille-number-transfer-exercise/v1'
      ? exerciseInput
      : createExercise(exerciseInput);
    const [sourceArticle,sourceNoun]=exercise.source.split(' ');
    const [targetArticle,targetNoun]=exercise.target.split(' ');
    const articleOnly=`${targetArticle} ${sourceNoun}`;
    const nounOnly=`${sourceArticle} ${targetNoun}`;
    return freeze([...new Set([exercise.target,articleOnly,nounOnly])]);
  }

  function view(exerciseInput,lang='vi'){
    const exercise=exerciseInput?.schema==='french-tranquille-number-transfer-exercise/v1'
      ? exerciseInput
      : createExercise(exerciseInput);
    const language=locale(lang);
    const cue=language==='fr'
      ? `Mets « ${exercise.source} » au pluriel.`
      : `Đổi “${exercise.source}” sang số nhiều.`;
    return freeze({
      schema:'french-tranquille-number-transfer-view/v1',
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
    const exercise=exerciseInput?.schema==='french-tranquille-number-transfer-exercise/v1'
      ? exerciseInput
      : createExercise(exerciseInput);
    return text(answer,'answer')===exercise.target;
  }

  const CATALOG=freeze(FAMILY.nouns.map(noun=>createExercise(noun)));

  const API=freeze({
    schema:'french-tranquille-generalization-number/v1',
    build:38,
    slice:'38.6',
    status:'pure-non-wired',
    family:FAMILY,
    nouns:NOUNS,
    catalog:CATALOG,
    createExercise,
    distractors,
    view,
    verify
  });

  if(typeof module==='object'&&module.exports)module.exports=API;
  if(typeof window!=='undefined')window.FrenchTranquilleGeneralizationNumber=API;
})();
