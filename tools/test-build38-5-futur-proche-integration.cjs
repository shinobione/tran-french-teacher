'use strict';

const fs=require('fs');
const path=require('path');
const assert=require('assert');

const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const adapter=read('src/pedagogy/generalization-transfer-lesson.js');
const loader=read('src/core/build32-loader.js');
const sw=read('sw.js');
const legacyBrowser=read('tests/browser/build38-2-learner-integration.html');

const base=require('../src/pedagogy/generalization-transfer-core.js');
const future=require('../src/pedagogy/generalization-futur-proche-core.js');

assert.equal(base.slice,'38.1');
assert.equal(base.family.id,'subject-substitution-regular-er');
assert.equal(future.slice,'38.4');
assert.equal(future.family.id,'present-futur-proche-travailler-singular');
assert.equal(future.status,'pure-non-wired');

// Legacy 38.2 ownership stays explicit and backwards-readable.
assert.match(adapter,/const LESSON=33;/);
assert.match(adapter,/const EXERCISE_INDEXES=Object\.freeze\(\[0,2,5\]\);/);
assert.match(adapter,/slice:'38\.2'/);
assert.match(adapter,/lesson:LESSON/);
assert.match(adapter,/exerciseIndexes:EXERCISE_INDEXES/);
assert.match(adapter,/family:core\.family\.id/);
assert.match(adapter,/slice:'38\.2'[\s\S]*integration:'38\.5'/);

// New route is additive and owns lesson 35 only.
assert.match(adapter,/const FUTURE_LESSON=35;/);
assert.match(adapter,/const FUTURE_EXERCISE_INDEXES=Object\.freeze\(\[0,1,3\]\);/);
assert.match(adapter,/lesson:FUTURE_LESSON/);
assert.match(adapter,/slice:'38\.5'/);
assert.match(adapter,/family:futureCore\.family\.id/);
assert.match(adapter,/futureLesson:FUTURE_LESSON/);
assert.match(adapter,/futureExerciseIndexes:FUTURE_EXERCISE_INDEXES/);
assert.match(adapter,/status:'learner-facing-contextual'/);
assert.match(adapter,/persistent:false/);
assert.match(adapter,/masteryClaim:false/);
assert.match(adapter,/data-transfer-lesson/);
assert.match(adapter,/routeForLesson/);
assert.match(adapter,/activeCore===core\?core\.verify\(exercise,choice\):activeCore\.verify\(exercise,choice\)/);
assert.match(adapter,/const shift=\(index\+1\)%choices\.length/);

for(const forbidden of ['localStorage.setItem','sessionStorage.setItem','indexedDB','Math.random','french-tranquille:memory-evidence:v2']){
  assert.equal(adapter.includes(forbidden),false,`shared adapter must not contain ${forbidden}`);
}

// Loader order: Foundations -> 38.1 -> 38.4 future core -> shared adapter.
assert.match(loader,/const TRANSFER='2\.4\.0-b38\.2';/);
assert.match(loader,/const TRANSFER_FUTURE='2\.4\.0-b38\.5';/);
const foundationsPos=loader.indexOf('foundations-pilot.js?v=${FOUNDATIONS}');
const basePos=loader.indexOf('generalization-transfer-core.js?v=${TRANSFER}');
const futurePos=loader.indexOf('generalization-futur-proche-core.js?v=${TRANSFER_FUTURE}');
const adapterPos=loader.indexOf('generalization-transfer-lesson.js?v=${TRANSFER}');
assert(foundationsPos>=0&&basePos>foundationsPos&&futurePos>basePos&&adapterPos>futurePos,'38.5 loader order is wrong');

// Installed PWA gets the new runtime dependency offline.
assert.match(sw,/const B382='2\.4\.0-b38\.2';/);
assert.match(sw,/const B385='2\.4\.0-b38\.5';/);
assert.match(sw,/generalization-transfer-core\.js\?v=\$\{B382\}/);
assert.match(sw,/generalization-futur-proche-core\.js\?v=\$\{B385\}/);
assert.match(sw,/generalization-transfer-lesson\.js\?v=\$\{B382\}/);

const legacy=[0,2,5].map(index=>base.catalog[index]);
assert.deepEqual(legacy.map(x=>x.target),['Tu travailles.','Tu habites ici.','Elle aime ça.']);
const chosen=[0,1,3].map(index=>future.catalog[index]);
assert.deepEqual(chosen.map(x=>[x.source,x.target]),[
  ['Je travaille.','Je vais travailler.'],
  ['Tu travailles.','Tu vas travailler.'],
  ['Elle travaille.','Elle va travailler.']
]);
assert(chosen.every(x=>x.durableWrite===false&&x.masteryClaim===false));

// Historical browser tribunal assertions remain intact; only the additive dependency was added.
assert.match(legacyBrowser,/data-b382-done/);
assert.match(legacyBrowser,/generalization-futur-proche-core\.js\?v=2\.4\.0-b38\.5/);
assert.match(legacyBrowser,/lesson 33 needs exactly one transfer entry/);
assert.match(legacyBrowser,/lesson 32 must not expose 38\.2 transfer/);
assert.match(legacyBrowser,/lesson 34 must not expose 38\.2 transfer/);

console.log('Build 38.5 contract OK: shared renderer keeps lesson 33 exact and adds futur proche only to lesson 35');
