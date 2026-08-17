'use strict';

const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');

const ROOT=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(ROOT,file),'utf8');
const spoken=require(path.join(ROOT,'src/pedagogy/generalization-spoken-on-core.js'));

assert.equal(spoken.family.id,'nous-on-spoken-equivalence');
assert.equal(spoken.slice,'38.9');
assert.equal(spoken.status,'pure-non-wired');
assert.equal(spoken.family.persistence,'ephemeral-only');
assert.equal(spoken.family.masteryClaim,false);
assert.deepEqual(spoken.catalog.map(item=>[item.source,item.target]),[
  ['Nous travaillons.','On travaille.'],
  ['Nous rentrons.','On rentre.'],
  ['Nous allons à…','On va à…']
]);

const adapter=read('src/pedagogy/generalization-transfer-lesson.js');
const loader=read('src/core/build32-loader.js');
const sw=read('sw.js');
const stage3=read('src/pedagogy/curriculum-stage3.js');
const stage4=read('src/pedagogy/curriculum-stage4.js');

for(const marker of [
  "const SPOKEN_ON_LESSON=52;",
  "const SPOKEN_ON_EXERCISE_INDEXES=Object.freeze([0,1,2]);",
  "const spokenOnCore=window.FrenchTranquilleGeneralizationSpokenOn;",
  "spokenOnCore?.family?.id==='nous-on-spoken-equivalence'",
  "slice:'38.10'",
  "lesson:SPOKEN_ON_LESSON",
  "family:spokenOnCore.family.id",
  "spokenOnIntegration:hasSpokenOnCore?'38.10':null",
  "spokenOnLesson:hasSpokenOnCore?SPOKEN_ON_LESSON:null",
  "persistent:false",
  "masteryClaim:false"
]) assert.ok(adapter.includes(marker),`missing adapter marker: ${marker}`);

for(const predecessor of [
  "lesson:LESSON,\n      slice:'38.2'",
  "lesson:FUTURE_LESSON,\n      slice:'38.5'",
  "lesson:NUMBER_LESSON,\n      slice:'38.7'",
  "lesson:NEGATION_LESSON,\n      slice:'38.8'"
]) assert.ok(adapter.includes(predecessor),`predecessor route missing: ${predecessor}`);

assert.ok(loader.includes("const TRANSFER_SPOKEN_ON='2.4.0-b38.10';"),'loader 38.10 spoken-on token missing');
assert.ok(loader.includes("const TRANSFER_LESSON='2.4.0-b38.10';"),'loader 38.10 adapter token missing');
const spokenLoad=loader.indexOf('generalization-spoken-on-core.js');
const adapterLoad=loader.indexOf('generalization-transfer-lesson.js');
assert.ok(spokenLoad>=0&&adapterLoad>spokenLoad,'spoken-on core must load before shared Transfer adapter');

assert.ok(sw.includes("const B3810='2.4.0-b38.10';"),'SW 38.10 token missing');
assert.ok(sw.includes('generalization-spoken-on-core.js?v=${B3810}'),'SW spoken-on core precache missing');
assert.ok(sw.includes('generalization-transfer-lesson.js?v=${B3810}'),'SW shared adapter 38.10 precache missing');
assert.equal((sw.match(/generalization-spoken-on-core\.js/g)||[]).length,1,'spoken-on core should be precached exactly once');

for(const source of ['Nous travaillons.','Nous rentrons.','Nous allons à…']) assert.ok(stage3.includes(source),`lesson34 source scaffold missing: ${source}`);
for(const lesson52Marker of [
  "id:'l52',number:52",
  'Tu connais « nous ». Dans la conversation quotidienne',
  '« on » se conjugue comme « il/elle »',
  "fr:'On va manger ?'",
  "fr:'On rentre ?'"
]) assert.ok(stage4.includes(lesson52Marker),`lesson52 spoken-on scaffold missing: ${lesson52Marker}`);

assert.ok(!adapter.includes('localStorage.setItem('),'Transfer adapter must not write learner state');
assert.ok(!adapter.includes('indexedDB'),'Transfer adapter must not write IndexedDB');
assert.ok(!adapter.includes('masteryClaim:true'),'Transfer adapter must not claim mastery');

console.log('Build 38.10 spoken-on learner integration contract: PASS');
