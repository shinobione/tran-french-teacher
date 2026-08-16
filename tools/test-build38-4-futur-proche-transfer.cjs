'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = require('../src/pedagogy/generalization-transfer-core.js');
const future = require('../src/pedagogy/generalization-futur-proche-core.js');

assert.equal(future.schema, 'french-tranquille-generalization-futur-proche/v1');
assert.equal(future.build, 38);
assert.equal(future.slice, '38.4');
assert.equal(future.status, 'pure-non-wired');
assert.equal(future.family.id, 'present-futur-proche-travailler-singular');
assert.deepEqual(future.family.subjects, ['je','tu','il','elle']);
assert.equal(future.family.verb, 'travailler');
assert.equal(future.family.persistence, 'ephemeral-only');
assert.equal(future.family.masteryClaim, false);
for (const excluded of ['nous','vous','ils','elles','other-infinitives','negation','questions','past-tense','new-vocabulary','random-generation']) {
  assert.ok(future.family.excluded.includes(excluded), `missing exclusion ${excluded}`);
}

const expected = [
  ['je','Je travaille.','Je vais travailler.'],
  ['tu','Tu travailles.','Tu vas travailler.'],
  ['il','Il travaille.','Il va travailler.'],
  ['elle','Elle travaille.','Elle va travailler.']
];
assert.deepEqual(future.catalog.map(item => [item.subject,item.source,item.target]), expected);

for (const exercise of future.catalog) {
  assert.equal(exercise.schema, 'french-tranquille-futur-proche-transfer-exercise/v1');
  assert.equal(exercise.verb, 'travailler');
  assert.equal(exercise.durableWrite, false);
  assert.equal(exercise.masteryClaim, false);
  assert.ok(exercise.anchors.includes('38.1'));
  assert.equal(base.buildSentence(exercise.subject, 'travailler'), exercise.source);
  assert.equal(future.verify(exercise, exercise.target), true);
  assert.equal(future.verify(exercise, exercise.source), false);
  const choices = future.distractors(exercise);
  assert.equal(choices.length, 3);
  assert.ok(choices.includes(exercise.target));
  assert.ok(choices.some(choice => / travaille\.$/.test(choice)), 'missing wrong infinitive distractor');
}

assert.equal(future.createExercise('je').target, 'Je vais travailler.');
assert.equal(future.createExercise('tu').target, 'Tu vas travailler.');
assert.equal(future.createExercise('il').target, 'Il va travailler.');
assert.equal(future.createExercise('elle').target, 'Elle va travailler.');
assert.throws(() => future.createExercise('nous'), /unsupported subject nous/);
assert.throws(() => future.createExercise('vous'), /unsupported subject vous/);

const vi = future.view('tu','vi');
const fr = future.view('elle','fr');
assert.equal(vi.title, 'Từ hiện tại sang tương lai gần');
assert.equal(fr.title, 'Passer du présent au futur proche');
assert.equal(vi.source, 'Tu travailles.');
assert.equal(fr.target, 'Elle va travailler.');
assert.equal(vi.persistence, 'ephemeral-only');
assert.equal(fr.durableWrite, false);

const source = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'generalization-futur-proche-core.js'), 'utf8');
for (const forbidden of ['localStorage','sessionStorage','indexedDB','FrenchTranquilleRecovery','french-tranquille:memory-evidence:v2','Math.random']) {
  assert.equal(source.includes(forbidden), false, `38.4 pure future core must not reference ${forbidden}`);
}
for (const forbiddenSemantic of ['Nous allons','Vous allez','Ils vont','Elles vont','ne vais pas','passé composé']) {
  assert.equal(source.includes(forbiddenSemantic), false, `38.4 broadened unexpectedly: ${forbiddenSemantic}`);
}

const stage3 = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'curriculum-stage3.js'), 'utf8');
for (const anchor of [
  "id:'l32'",'Tu travailles ?','Tu vas où ?',
  "id:'l33'",'Il travaille.','Elle travaille.','Il va travailler.',
  "id:'l35'",'Futur proche','Je vais travailler.'
]) assert.ok(stage3.includes(anchor), `missing futur proche curriculum anchor ${anchor}`);

console.log('Build 38.4 present -> futur proche core: PASS');
