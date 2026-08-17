'use strict';

const fs=require('fs');
const path=require('path');
const assert=require('assert');

const root=path.resolve(__dirname,'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const adapter=read('src/pedagogy/generalization-transfer-lesson.js');
const loader=read('src/core/build32-loader.js');
const sw=read('sw.js');

const core=require('../src/pedagogy/generalization-transfer-core.js');

assert.equal(core.family.id,'subject-substitution-regular-er');
assert.equal(core.slice,'38.1');
assert.equal(core.status,'pure-non-wired');
assert.equal(core.catalog.length,6);
assert.deepEqual(core.family.subjects,['je','tu','il','elle']);
assert.deepEqual(core.family.verbs,['travailler','habiter','aimer']);

assert.match(adapter,/const LESSON=33;/);
assert.match(adapter,/const EXERCISE_INDEXES=Object\.freeze\(\[0,2,5\]\);/);
assert.match(adapter,/status:'learner-facing-contextual'/);
assert.match(adapter,/persistent:false/);
assert.match(adapter,/masteryClaim:false/);
assert.match(adapter,/data-transfer-entry/);
assert.match(adapter,/data-transfer-open/);
assert.match(adapter,/data-transfer-choice/);
assert.match(adapter,/slice:'38\.2',[\s\S]*?\n\s*core,[\s\S]*?family:core\.family\.id/);
assert.match(adapter,/activeCore=route\.core/);
assert.match(adapter,/activeCore\.verify\(exercise,session\.choice\)/);
assert.match(adapter,/const shift=\(index\+1\)%choices\.length/);

for(const forbidden of ['localStorage.setItem','sessionStorage.setItem','indexedDB','Math.random','french-tranquille:memory-evidence:v2']){
  assert.equal(adapter.includes(forbidden),false,`adapter must not contain ${forbidden}`);
}
for(const forbidden of ['aller','vouloir','pouvoir','devoir']){
  assert.equal(adapter.includes(`verb:'${forbidden}'`),false,`adapter must not add irregular ${forbidden}`);
}

assert.match(loader,/const TRANSFER='2\.4\.0-b38\.2';/);
assert.match(loader,/generalization-transfer-core\.js\?v=\$\{TRANSFER\}/);
assert.match(loader,/generalization-transfer-lesson\.js\?v=\$\{[^}]+\}/);
const foundationsPos=loader.indexOf("foundations-pilot.js?v=${FOUNDATIONS}");
const corePos=loader.indexOf("generalization-transfer-core.js?v=${TRANSFER}");
const adapterPos=loader.indexOf('generalization-transfer-lesson.js?v=');
assert(foundationsPos>=0&&corePos>foundationsPos&&adapterPos>corePos,'38.2 must load after Foundations and core before adapter');

assert.match(sw,/const B382='2\.4\.0-b38\.2';/);
assert.match(sw,/generalization-transfer-core\.js\?v=\$\{B382\}/);
assert.match(sw,/generalization-transfer-lesson\.js\?v=\$\{[^}]+\}/);

const chosen=[0,2,5].map(index=>core.catalog[index]);
assert.deepEqual(chosen.map(x=>x.target),['Tu travailles.','Tu habites ici.','Elle aime ça.']);
assert(chosen.every(x=>x.durableWrite===false&&x.masteryClaim===false));

console.log('Build 38.2 contract OK: lesson 33 contextual integration, 3 certified exercises, ephemeral only; shared-renderer cache token may advance in successor slices');