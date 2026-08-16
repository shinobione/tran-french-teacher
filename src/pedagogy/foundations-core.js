(() => {
  'use strict';

  const freeze = value => {
    if (!value || typeof value !== 'object' || Object.isFrozen(value)) return value;
    Object.values(value).forEach(freeze);
    return Object.freeze(value);
  };

  const CONCEPTS = [
    { id:'F01', key:'noun-gender', audit:'missing-foundation', strategy:'teach-core', priority:'very-high', anchors:['la gare','la pharmacie','un billet','une table'] },
    { id:'F02', key:'indefinite-articles', audit:'missing-foundation', strategy:'teach-core', priority:'very-high', forms:['un','une','des'] },
    { id:'F03', key:'definite-articles', audit:'missing-foundation', strategy:'teach-core', priority:'very-high', forms:['le','la','l’','les'] },
    { id:'F04', key:'singular-plural', audit:'missing-foundation', strategy:'teach-core', priority:'very-high', anchors:['la pharmacie → les pharmacies'] },
    { id:'F05', key:'subject-pronouns', audit:'partial', strategy:'consolidate', priority:'medium' },
    { id:'F06', key:'etre-present', audit:'explicit', strategy:'reuse-existing', canonicalLessons:[16] },
    { id:'F07', key:'avoir-present', audit:'explicit-practical-subset', strategy:'reuse-existing', canonicalLessons:[17] },
    { id:'F08', key:'regular-er-present', audit:'partial', strategy:'consolidate', canonicalReference:'lesson 32+ subject/conjugation expansion' },
    { id:'F09', key:'aller-futur-proche', audit:'explicit-later', strategy:'reuse-existing', canonicalReference:'Stage 3 future proche' },
    { id:'F10', key:'vouloir-pouvoir-devoir', audit:'explicit-distributed', strategy:'reuse-existing', canonicalLessons:[18,47] },
    { id:'F11', key:'negation', audit:'partial-fragmented', strategy:'teach-core', priority:'high-after-F01-F04' },
    { id:'F12', key:'questions', audit:'partial-system-weak', strategy:'teach-core', priority:'later-core' },
    { id:'F13', key:'adjective-agreement', audit:'partial', strategy:'teach-core', priority:'later-core', canonicalLessons:[38] },
    { id:'F14', key:'possessives', audit:'explicit', strategy:'reuse-existing', canonicalLessons:[31] },
    { id:'F15', key:'partitives-quantities', audit:'explicit-practical', strategy:'consolidate', canonicalLessons:[22,42] },
    { id:'F16', key:'a-de-contractions', audit:'partial-distributed', strategy:'teach-core', priority:'later-core' },
    { id:'F17', key:'recent-past-passe-compose', audit:'explicit-later', strategy:'reuse-existing', canonicalReference:'Stage 3 recent past / passé composé', canonicalLessons:[38] },
    { id:'F18', key:'spoken-on', audit:'explicit', strategy:'reuse-existing', canonicalLessons:[52] }
  ];

  const PILOT = {
    id:'articles-gender-number',
    concepts:['F01','F02','F03','F04'],
    lessonRange:[8,13],
    optional:true,
    topLevelNavigation:false,
    persistence:'ephemeral-only',
    durableWrites:false,
    masteryClaim:false,
    anchors:['la gare','un billet','une table','les toilettes','la pharmacie → les pharmacies'],
    sequence:['observe','explain','construct','contrast','transfer'],
    sourceOwner:'src/pedagogy/foundations-pilot.js'
  };

  const SAFETY = {
    curriculumLessons:52,
    curriculumItems:313,
    evidenceRole:'derived-shadow-only',
    productTruth:'six-source-stores',
    productReadCutover:false,
    recoveryStores:7,
    backupEnvelope:3,
    noNewDurableStore:true,
    noRuntimeWiringInSlice:'37.1'
  };

  const byId = Object.fromEntries(CONCEPTS.map(concept => [concept.id, concept]));
  const API = freeze({
    schema:'french-tranquille-foundations-core/v1',
    build:37,
    slice:'37.1',
    status:'contract-only',
    concepts:CONCEPTS,
    byId,
    pilot:PILOT,
    safety:SAFETY
  });

  if (typeof module === 'object' && module.exports) module.exports = API;
  if (typeof window !== 'undefined') window.FrenchTranquilleFoundationsCore = API;
})();
