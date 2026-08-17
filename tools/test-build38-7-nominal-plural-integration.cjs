'use strict';

const fs=require('fs');
const path=require('path');
const assert=require('assert');

const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const adapter=read('src/pedagogy/generalization-transfer-lesson.js');
const loader=read('src/core/build32-loader.js');
const sw=read('sw.js');

const base=require('../src/pedagogy/generalization-transfer-core.js');
const future=require('../src/pedagogy/generalization-futur-proche-core.js');
const number=require('../src/pedagogy/generalization-number-core.js');

assert.equal(base.slice,'38.1');
assert.equal(future.slice,'38.4');
assert.equal(number.slice,'38.6');
assert.equal(number.status,'pure-non-wired');
assert.equal(number.family.id,'singular-plural-regular-noun-phrases');

// Historical shared-renderer contracts stay explicitly readable.
assert.match(adapter,/const LESSON=33;/);
assert.match(adapter,/const EXERCISE_INDEXES=Object\.freeze\(\[0,2,5\]\);/);
assert.match(adapter,/const FUTURE_LESSON=35;/);
assert.match(adapter,/const FUTURE_EXERCISE_INDEXES=Object\.freeze\(\[0,1,3\]\);/);
assert.match(adapter,/slice:'38\.2'[\s\S]*integration:'38\.5'/);
assert.match(adapter,/lesson:LESSON/);
assert.match(adapter,/futureLesson:FUTURE_LESSON/);
assert.match(adapter,/futureExerciseIndexes:FUTURE_EXERCISE_INDEXES/);

// 38.7 is one additive lesson-13 number route.
assert.match(adapter,/const NUMBER_LESSON=13;/);
assert.match(adapter,/const NUMBER_EXERCISE_INDEXES=Object\.freeze\(\[0,2,3\]\);/);
assert.match(adapter,/numberCore=window\.FrenchTranquilleGeneralizationNumber/);
assert.match(adapter,/hasNumberCore=numberCore\?\.family\?\.id==='singular-plural-regular-noun-phrases'/);
assert.match(adapter,/lesson:NUMBER_LESSON/);
assert.match(adapter,/slice:'38\.7'/);
assert.match(adapter,/family:numberCore\.family\.id/);
assert.match(adapter,/numberIntegration:hasNumberCore\?'38\.7':null/);
assert.match(adapter,/numberLesson:hasNumberCore\?NUMBER_LESSON:null/);
assert.match(adapter,/numberExerciseIndexes:hasNumberCore\?NUMBER_EXERCISE_INDEXES:Object\.freeze\(\[\]\)/);
assert.match(adapter,/persistent:false/);
assert.match(adapter,/masteryClaim:false/);
assert.match(adapter,/activeCore\.verify\(exercise,choice\)/);

for(const forbidden of ['localStorage.setItem','sessionStorage.setItem','indexedDB','Math.random','french-tranquille:memory-evidence:v2']){
  assert.equal(adapter.includes(forbidden),false,`shared adapter must not contain ${forbidden}`);
}

// Exact learner subset: gare + billet + table; pharmacie stays core-only.
const chosen=[0,2,3].map(index=>number.catalog[index]);
assert.deepEqual(chosen.map(x=>[x.source,x.target]),[
  ['la gare','les gares'],
  ['un billet','des billets'],
  ['une table','des tables']
]);
assert(chosen.every(x=>x.durableWrite===false&&x.masteryClaim===false));

// Runtime order is monotonic and the number core precedes the shared renderer.
assert.match(loader,/const TRANSFER='2\.4\.0-b38\.2';/);
assert.match(loader,/const TRANSFER_FUTURE='2\.4\.0-b38\.5';/);
assert.match(loader,/const TRANSFER_NUMBER='2\.4\.0-b38\.7';/);
const foundationsPos=loader.indexOf('foundations-pilot.js?v=${FOUNDATIONS}');
const subjectPos=loader.indexOf('generalization-transfer-core.js?v=${TRANSFER}');
const futurePos=loader.indexOf('generalization-futur-proche-core.js?v=${TRANSFER_FUTURE}');
const numberPos=loader.indexOf('generalization-number-core.js?v=${TRANSFER_NUMBER}');
const adapterPos=loader.indexOf('generalization-transfer-lesson.js?v=${TRANSFER}');
const order=[foundationsPos,subjectPos,futurePos,numberPos,adapterPos];
assert(order.every(pos=>pos>=0)&&order.join(',')===[...order].sort((a,b)=>a-b).join(','),`38.7 loader order wrong: ${order}`);

// Installed PWA precaches all three learner-facing transfer dependencies.
assert.match(sw,/const B382='2\.4\.0-b38\.2';/);
assert.match(sw,/const B385='2\.4\.0-b38\.5';/);
assert.match(sw,/const B387='2\.4\.0-b38\.7';/);
assert.match(sw,/generalization-transfer-core\.js\?v=\$\{B382\}/);
assert.match(sw,/generalization-futur-proche-core\.js\?v=\$\{B385\}/);
assert.match(sw,/generalization-number-core\.js\?v=\$\{B387\}/);
assert.match(sw,/generalization-transfer-lesson\.js\?v=\$\{B382\}/);

console.log('Build 38.7 contract OK: lesson13 number route is additive; lesson33/35 contracts and offline dependencies remain explicit');
