'use strict';

const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const number=require('../src/pedagogy/generalization-number-core.js');

assert.equal(number.schema,'french-tranquille-generalization-number/v1');
assert.equal(number.build,38);
assert.equal(number.slice,'38.6');
assert.equal(number.status,'pure-non-wired');
assert.equal(number.family.id,'singular-plural-regular-noun-phrases');
assert.deepEqual(number.family.nouns,['gare','pharmacie','billet','table']);
assert.deepEqual(number.family.transformations,['le/la→les','un/une→des','regular-noun→+s']);
assert.equal(number.family.persistence,'ephemeral-only');
assert.equal(number.family.masteryClaim,false);
for(const excluded of ['irregular-plurals','x-plurals','aux-plurals','adjective-agreement','possessives','full-sentence-agreement','new-vocabulary','random-generation']){
  assert.ok(number.family.excluded.includes(excluded),`missing exclusion ${excluded}`);
}

assert.deepEqual(number.catalog.map(item=>[item.noun,item.source,item.target]),[
  ['gare','la gare','les gares'],
  ['pharmacie','la pharmacie','les pharmacies'],
  ['billet','un billet','des billets'],
  ['table','une table','des tables']
]);

for(const exercise of number.catalog){
  assert.equal(exercise.schema,'french-tranquille-number-transfer-exercise/v1');
  assert.equal(exercise.durableWrite,false);
  assert.equal(exercise.masteryClaim,false);
  assert.ok(exercise.anchors.some(anchor=>/^F0[1-4]$/.test(anchor)));
  assert.ok(exercise.anchors.some(anchor=>/^l(8|9|12)$/.test(anchor)));
  assert.equal(number.verify(exercise,exercise.target),true);
  assert.equal(number.verify(exercise,exercise.source),false);
  const choices=number.distractors(exercise);
  assert.equal(choices.length,3);
  assert.ok(choices.includes(exercise.target));
  const [sourceArticle,sourceNoun]=exercise.source.split(' ');
  const [targetArticle,targetNoun]=exercise.target.split(' ');
  assert.ok(choices.includes(`${targetArticle} ${sourceNoun}`));
  assert.ok(choices.includes(`${sourceArticle} ${targetNoun}`));
}

assert.equal(number.createExercise('gare').target,'les gares');
assert.equal(number.createExercise('billet').target,'des billets');
assert.throws(()=>number.createExercise('cheval'),/unsupported noun cheval/);

const vi=number.view('pharmacie','vi');
const fr=number.view('table','fr');
assert.equal(vi.title,'Từ một sang nhiều');
assert.equal(fr.title,'Passer du singulier au pluriel');
assert.equal(vi.target,'les pharmacies');
assert.equal(fr.target,'des tables');
assert.equal(vi.persistence,'ephemeral-only');
assert.equal(fr.durableWrite,false);

const root=path.join(__dirname,'..');
const source=fs.readFileSync(path.join(root,'src/pedagogy/generalization-number-core.js'),'utf8');
for(const forbidden of ['localStorage','sessionStorage','indexedDB','FrenchTranquilleRecovery','french-tranquille:memory-evidence:v2','Math.random']){
  assert.equal(source.includes(forbidden),false,`38.6 pure number core must not reference ${forbidden}`);
}
for(const forbiddenSemantic of ['chevaux','journaux','aux ','nos ','vos ','leurs ']){
  assert.equal(source.includes(forbiddenSemantic),false,`38.6 broadened unexpectedly: ${forbiddenSemantic}`);
}

const foundations=fs.readFileSync(path.join(root,'src/pedagogy/foundations-capsules.js'),'utf8');
for(const anchor of [
  "id:'articles-gender-number'",
  "concepts:['F01','F02','F03','F04']",
  "examples:['🚉 la gare','🎫 un billet','🍽️ une table','🚻 les toilettes']",
  'le/la → les',
  'un (đực), une (cái), des (số nhiều)'
]) assert.ok(foundations.includes(anchor),`missing Foundation plural anchor ${anchor}`);

const app=fs.readFileSync(path.join(root,'app.js'),'utf8');
for(const anchor of [
  "id:'l8'","{id:'gare',fr:'La gare.'","{id:'pharmacie',fr:'La pharmacie.'",
  "id:'l9'","fr:'Je voudrais un billet.'",
  "id:'l12'","fr:'Une table pour deux, s’il vous plaît.'"
]) assert.ok(app.includes(anchor),`missing learner-known nominal anchor ${anchor}`);

console.log('Build 38.6 singular -> plural nominal core: PASS');
