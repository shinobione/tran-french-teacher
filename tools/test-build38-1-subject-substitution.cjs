'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const transfer = require('../src/pedagogy/generalization-transfer-core.js');

assert.equal(transfer.schema, 'french-tranquille-generalization-transfer/v1');
assert.equal(transfer.build, 38);
assert.equal(transfer.slice, '38.1');
assert.equal(transfer.status, 'pure-non-wired');
assert.equal(transfer.family.id, 'subject-substitution-regular-er');
assert.equal(transfer.family.persistence, 'ephemeral-only');
assert.equal(transfer.family.masteryClaim, false);
assert.deepEqual(transfer.family.subjects, ['je','tu','il','elle']);
assert.deepEqual(transfer.family.verbs, ['travailler','habiter','aimer']);
assert.deepEqual(transfer.family.excluded, ['aller','vouloir','pouvoir','devoir']);

assert.equal(transfer.buildSentence('je','travailler'), 'Je travaille.');
assert.equal(transfer.buildSentence('tu','travailler'), 'Tu travailles.');
assert.equal(transfer.buildSentence('elle','travailler'), 'Elle travaille.');
assert.equal(transfer.buildSentence('je','habiter'), "J'habite ici.");
assert.equal(transfer.buildSentence('tu','habiter'), 'Tu habites ici.');
assert.equal(transfer.buildSentence('il','habiter'), 'Il habite ici.');
assert.equal(transfer.buildSentence('je','aimer'), "J'aime ça.");
assert.equal(transfer.buildSentence('tu','aimer'), 'Tu aimes ça.');
assert.equal(transfer.buildSentence('elle','aimer'), 'Elle aime ça.');

const exercise = transfer.createExercise({verb:'travailler',from:'je',to:'tu'});
assert.equal(exercise.schema, 'french-tranquille-transfer-exercise/v1');
assert.equal(exercise.source, 'Je travaille.');
assert.equal(exercise.target, 'Tu travailles.');
assert.deepEqual(exercise.anchors, ['F08','l32','l33']);
assert.equal(exercise.durableWrite, false);
assert.equal(exercise.masteryClaim, false);
assert.equal(transfer.verify(exercise, 'Tu travailles.'), true);
assert.equal(transfer.verify(exercise, 'Tu travaille.'), false);
assert.deepEqual(transfer.distractors(exercise), ['Tu travailles.','Tu travaille.','Je travaille.']);

const viewVi = transfer.view(exercise, 'vi');
const viewFr = transfer.view(exercise, 'fr');
assert.equal(viewVi.title, 'Đổi người, xây lại câu');
assert.equal(viewFr.title, 'Changer la personne, reconstruire la phrase');
assert.equal(viewVi.source, 'Je travaille.');
assert.equal(viewFr.target, 'Tu travailles.');
assert.equal(viewVi.persistence, 'ephemeral-only');
assert.equal(viewFr.durableWrite, false);

assert.throws(() => transfer.createExercise({verb:'aller',from:'je',to:'tu'}), /unsupported verb aller/);
assert.throws(() => transfer.createExercise({verb:'travailler',from:'je',to:'je'}), /must differ/);
assert.throws(() => transfer.createExercise({verb:'travailler',from:'nous',to:'tu'}), /unsupported source subject nous/);

assert.equal(transfer.catalog.length, 6);
assert.deepEqual(transfer.catalog.map(item => item.target), [
  'Tu travailles.',
  'Elle travaille.',
  'Tu habites ici.',
  'Elle habite ici.',
  'Tu aimes ça.',
  'Elle aime ça.'
]);

const source = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'generalization-transfer-core.js'), 'utf8');
for (const forbidden of ['localStorage','sessionStorage','indexedDB','FrenchTranquilleRecovery','french-tranquille:memory-evidence:v2','Math.random']) {
  assert.equal(source.includes(forbidden), false, `38.1 pure transfer core must not reference ${forbidden}`);
}

const pilot = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'foundations-pilot.js'), 'utf8');
for (const owner of ["adapter:'37.3'","expansion:'37.4'","consolidation:'37.5'","verbPattern:'37.6'","systematization:'37.7'","agreement:'37.8'"]) {
  assert.ok(pilot.includes(owner), `Build 37 ownership changed: ${owner}`);
}

const capsules = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'foundations-capsules.js'), 'utf8');
for (const anchor of ['Je travaille.','Tu travailles ?','Elle travaille.','J’habite ici.','Tu habites où ?']) {
  assert.ok(capsules.includes(anchor), `missing F08 anchor ${anchor}`);
}

const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
assert.ok(app.includes("id:'jhabite-hcm',fr:\"J'habite à Hô Chi Minh-Ville.\""), 'missing historical habiter anchor');
assert.ok(app.includes("id:'jaime',fr:\"J'aime…\""), 'missing historical aimer anchor');

const stage3 = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'curriculum-stage3.js'), 'utf8');
for (const anchor of [
  "id:'l32'",'Tu travailles ?','Tu habites où ?','Tu aimes ça ?',
  "id:'l33'",'Il travaille.','Elle travaille.','Il habite ici.','Elle habite ici.'
]) assert.ok(stage3.includes(anchor), `missing curriculum transfer anchor ${anchor}`);

console.log('Build 38.1 subject substitution core: PASS');
