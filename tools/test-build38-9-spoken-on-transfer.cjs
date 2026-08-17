'use strict';

const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const spokenOn=require('../src/pedagogy/generalization-spoken-on-core.js');

assert.equal(spokenOn.schema,'french-tranquille-generalization-spoken-on/v1');
assert.equal(spokenOn.build,38);
assert.equal(spokenOn.slice,'38.9');
assert.equal(spokenOn.status,'pure-non-wired');
assert.equal(spokenOn.family.id,'nous-on-spoken-equivalence');
assert.deepEqual(spokenOn.family.phrases,['travailler','rentrer','aller-a']);
assert.deepEqual(spokenOn.family.transformations,['nous→on','verb→il/elle-form','same-group-meaning']);
assert.equal(spokenOn.family.persistence,'ephemeral-only');
assert.equal(spokenOn.family.masteryClaim,false);
assert.ok(Object.isFrozen(spokenOn));
assert.ok(Object.isFrozen(spokenOn.catalog));
for(const excluded of ['generic-on','indefinite-on','passive-on','adjective-agreement','object-pronouns','negation','questions','new-vocabulary','random-generation']){
  assert.ok(spokenOn.family.excluded.includes(excluded),`missing exclusion ${excluded}`);
}

assert.deepEqual(spokenOn.catalog.map(item=>[item.phrase,item.source,item.target]),[
  ['travailler','Nous travaillons.','On travaille.'],
  ['rentrer','Nous rentrons.','On rentre.'],
  ['aller-a','Nous allons à…','On va à…']
]);

for(const exercise of spokenOn.catalog){
  assert.equal(exercise.schema,'french-tranquille-spoken-on-transfer-exercise/v1');
  assert.equal(exercise.durableWrite,false);
  assert.equal(exercise.masteryClaim,false);
  for(const anchor of ['F05','F18','l34','l52']) assert.ok(exercise.anchors.includes(anchor),`${exercise.phrase} missing anchor ${anchor}`);
  assert.equal(spokenOn.verify(exercise,exercise.target),true);
  assert.equal(spokenOn.verify(exercise,exercise.source),false);
  const choices=spokenOn.distractors(exercise);
  assert.equal(choices.length,3);
  assert.ok(choices.includes(exercise.target));
  assert.ok(choices.every(choice=>typeof choice==='string'&&choice.length>0));
}

assert.equal(spokenOn.createExercise('travailler').target,'On travaille.');
assert.equal(spokenOn.createExercise('rentrer').target,'On rentre.');
assert.equal(spokenOn.createExercise('aller-a').target,'On va à…');
assert.throws(()=>spokenOn.createExercise('avoir'),/unsupported phrase avoir/);

const vi=spokenOn.view('travailler','vi');
const fr=spokenOn.view('aller-a','fr');
assert.equal(vi.title,'Từ « nous » sang « on » khi nói');
assert.equal(fr.title,'Passer de « nous » à « on » à l’oral');
assert.equal(vi.target,'On travaille.');
assert.equal(fr.target,'On va à…');
assert.equal(vi.persistence,'ephemeral-only');
assert.equal(fr.durableWrite,false);

const root=path.join(__dirname,'..');
const source=fs.readFileSync(path.join(root,'src/pedagogy/generalization-spoken-on-core.js'),'utf8');
for(const forbidden of ['localStorage','sessionStorage','indexedDB','FrenchTranquilleRecovery','french-tranquille:memory-evidence:v2','Math.random']){
  assert.equal(source.includes(forbidden),false,`38.9 pure spoken-on core must not reference ${forbidden}`);
}
for(const forbiddenSemantic of ['On est prêts.','On a le temps.','On travaille ?','On rentre ?','On se retrouve','On doit','On peut']){
  assert.equal(source.includes(forbiddenSemantic),false,`38.9 broadened unexpectedly: ${forbiddenSemantic}`);
}

const stage3=fs.readFileSync(path.join(root,'src/pedagogy/curriculum-stage3.js'),'utf8');
for(const anchor of [
  "id:'l34'",
  "fr:'Nous travaillons.'",
  "fr:'Nous rentrons.'",
  "fr:'Nous allons à…'",
  'Les verbes en -er prennent souvent -ons'
]) assert.ok(stage3.includes(anchor),`missing lesson 34 nous anchor ${anchor}`);

const stage4=fs.readFileSync(path.join(root,'src/pedagogy/curriculum-stage4.js'),'utf8');
for(const anchor of [
  "id:'l52'",
  'Tu connais « nous »',
  '« on » se conjugue comme « il/elle »',
  "fr:'On va manger ?'",
  "fr:'On rentre ?'"
]) assert.ok(stage4.includes(anchor),`missing lesson 52 on anchor ${anchor}`);

const foundations=fs.readFileSync(path.join(root,'src/pedagogy/foundations-core.js'),'utf8');
for(const anchor of [
  "{ id:'F18', key:'spoken-on'",
  "strategy:'reuse-existing'",
  'canonicalLessons:[52]'
]) assert.ok(foundations.includes(anchor),`missing F18 spoken-on anchor ${anchor}`);

console.log('Build 38.9 nous -> spoken on transfer core: PASS');
