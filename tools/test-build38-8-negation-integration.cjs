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
const negation=require('../src/pedagogy/generalization-negation-core.js');
const future=require('../src/pedagogy/generalization-futur-proche-core.js');
const number=require('../src/pedagogy/generalization-number-core.js');

assert.equal(base.slice,'38.1');
assert.equal(negation.slice,'38.3');
assert.equal(negation.status,'pure-non-wired');
assert.equal(negation.family.id,'affirmation-negation-regular-er-je');
assert.equal(future.slice,'38.4');
assert.equal(number.slice,'38.6');

// Historical shared-renderer routes remain explicit and unchanged.
assert.match(adapter,/const LESSON=33;/);
assert.match(adapter,/const EXERCISE_INDEXES=Object\.freeze\(\[0,2,5\]\);/);
assert.match(adapter,/const FUTURE_LESSON=35;/);
assert.match(adapter,/const FUTURE_EXERCISE_INDEXES=Object\.freeze\(\[0,1,3\]\);/);
assert.match(adapter,/const NUMBER_LESSON=13;/);
assert.match(adapter,/const NUMBER_EXERCISE_INDEXES=Object\.freeze\(\[0,2,3\]\);/);
assert.match(adapter,/integration:'38\.5'/);
assert.match(adapter,/numberIntegration:hasNumberCore\?'38\.7':null/);

// 38.8 adds one optional lesson-34 negation route through the same renderer.
assert.match(adapter,/const NEGATION_LESSON=34;/);
assert.match(adapter,/const NEGATION_EXERCISE_INDEXES=Object\.freeze\(\[0,1,2\]\);/);
assert.match(adapter,/negationCore=window\.FrenchTranquilleGeneralizationNegation/);
assert.match(adapter,/hasNegationCore=negationCore\?\.family\?\.id==='affirmation-negation-regular-er-je'/);
assert.match(adapter,/lesson:NEGATION_LESSON/);
assert.match(adapter,/slice:'38\.8'/);
assert.match(adapter,/family:negationCore\.family\.id/);
assert.match(adapter,/negationIntegration:hasNegationCore\?'38\.8':null/);
assert.match(adapter,/negationLesson:hasNegationCore\?NEGATION_LESSON:null/);
assert.match(adapter,/negationExerciseIndexes:hasNegationCore\?NEGATION_EXERCISE_INDEXES:Object\.freeze\(\[\]\)/);
assert.match(adapter,/persistent:false/);
assert.match(adapter,/masteryClaim:false/);
assert.match(adapter,/activeCore\.verify\(exercise,choice\)/);

for(const forbidden of ['localStorage.setItem','sessionStorage.setItem','indexedDB','Math.random','french-tranquille:memory-evidence:v2']){
  assert.equal(adapter.includes(forbidden),false,`shared adapter must not contain ${forbidden}`);
}

// Exact certified 38.3 learner subset is reused without broadening.
const chosen=[0,1,2].map(index=>negation.catalog[index]);
assert.deepEqual(chosen.map(x=>[x.source,x.target]),[
  ['Je travaille.','Je ne travaille pas.'],
  ["J'habite ici.","Je n'habite pas ici."],
  ["J'aime ça.","Je n'aime pas ça."]
]);
assert(chosen.every(x=>x.durableWrite===false&&x.masteryClaim===false));

// Runtime order: Foundations -> subject core -> negation core -> future -> number -> shared adapter.
assert.match(loader,/const TRANSFER='2\.4\.0-b38\.2';/);
assert.match(loader,/const TRANSFER_NEGATION='2\.4\.0-b38\.8';/);
assert.match(loader,/const TRANSFER_FUTURE='2\.4\.0-b38\.5';/);
assert.match(loader,/const TRANSFER_NUMBER='2\.4\.0-b38\.7';/);
const foundationsPos=loader.indexOf('foundations-pilot.js?v=${FOUNDATIONS}');
const subjectPos=loader.indexOf('generalization-transfer-core.js?v=${TRANSFER}');
const negationPos=loader.indexOf('generalization-negation-core.js?v=${TRANSFER_NEGATION}');
const futurePos=loader.indexOf('generalization-futur-proche-core.js?v=${TRANSFER_FUTURE}');
const numberPos=loader.indexOf('generalization-number-core.js?v=${TRANSFER_NUMBER}');
const adapterPos=loader.indexOf('generalization-transfer-lesson.js?v=${TRANSFER}');
const order=[foundationsPos,subjectPos,negationPos,futurePos,numberPos,adapterPos];
assert(order.every(pos=>pos>=0)&&order.join(',')===[...order].sort((a,b)=>a-b).join(','),`38.8 loader order wrong: ${order}`);

// Installed PWA precaches all four learner-facing transfer dependencies.
assert.match(sw,/const B382='2\.4\.0-b38\.2';/);
assert.match(sw,/const B385='2\.4\.0-b38\.5';/);
assert.match(sw,/const B387='2\.4\.0-b38\.7';/);
assert.match(sw,/const B388='2\.4\.0-b38\.8';/);
assert.match(sw,/generalization-transfer-core\.js\?v=\$\{B382\}/);
assert.match(sw,/generalization-negation-core\.js\?v=\$\{B388\}/);
assert.match(sw,/generalization-futur-proche-core\.js\?v=\$\{B385\}/);
assert.match(sw,/generalization-number-core\.js\?v=\$\{B387\}/);
assert.match(sw,/generalization-transfer-lesson\.js\?v=\$\{B382\}/);

console.log('Build 38.8 contract OK: certified 38.3 negation is exposed only in lesson34 through the shared ephemeral Transfer renderer');
