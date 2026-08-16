'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const base = require('../src/pedagogy/generalization-transfer-core.js');
const negation = require('../src/pedagogy/generalization-negation-core.js');

assert.equal(negation.schema, 'french-tranquille-generalization-negation/v1');
assert.equal(negation.build, 38);
assert.equal(negation.slice, '38.3');
assert.equal(negation.status, 'pure-non-wired');
assert.equal(negation.family.id, 'affirmation-negation-regular-er-je');
assert.equal(negation.family.subject, 'je');
assert.deepEqual(negation.family.verbs, ['travailler','habiter','aimer']);
assert.equal(negation.family.persistence, 'ephemeral-only');
assert.equal(negation.family.masteryClaim, false);
assert.ok(negation.family.excluded.includes('avoir'));
assert.ok(negation.family.excluded.includes('il-y-a'));
assert.ok(negation.family.excluded.includes('spoken-ne-drop'));
assert.ok(negation.family.excluded.includes('plural'));
assert.ok(negation.family.excluded.includes('futur-proche'));

assert.deepEqual(negation.catalog.map(item => [item.source,item.target]), [
  ['Je travaille.','Je ne travaille pas.'],
  ["J'habite ici.","Je n'habite pas ici."],
  ["J'aime ça.","Je n'aime pas ça."]
]);

for (const exercise of negation.catalog) {
  assert.equal(exercise.schema, 'french-tranquille-negation-transfer-exercise/v1');
  assert.equal(exercise.subject, 'je');
  assert.equal(exercise.durableWrite, false);
  assert.equal(exercise.masteryClaim, false);
  assert.ok(exercise.anchors.includes('F11'));
  assert.ok(exercise.anchors.includes('38.1'));
  assert.equal(base.buildSentence('je', exercise.verb), exercise.source);
  assert.equal(negation.verify(exercise, exercise.target), true);
  assert.equal(negation.verify(exercise, exercise.source), false);
  const choices = negation.distractors(exercise);
  assert.equal(choices.length, 3);
  assert.ok(choices.includes(exercise.target));
  assert.ok(choices.includes(exercise.source));
}

assert.equal(negation.createExercise('travailler').target, 'Je ne travaille pas.');
assert.equal(negation.createExercise('habiter').target, "Je n'habite pas ici.");
assert.equal(negation.createExercise('aimer').target, "Je n'aime pas ça.");
assert.throws(() => negation.createExercise('avoir'), /unsupported verb avoir/);
assert.throws(() => negation.createExercise('aller'), /unsupported verb aller/);

const vi = negation.view('habiter','vi');
const fr = negation.view('habiter','fr');
assert.equal(vi.title, 'Từ khẳng định sang phủ định');
assert.equal(fr.title, 'Passer de l’affirmation à la négation');
assert.equal(vi.source, "J'habite ici.");
assert.equal(fr.target, "Je n'habite pas ici.");
assert.equal(vi.persistence, 'ephemeral-only');
assert.equal(fr.durableWrite, false);

const source = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'generalization-negation-core.js'), 'utf8');
for (const forbidden of [
  'localStorage','sessionStorage','indexedDB','FrenchTranquilleRecovery',
  'french-tranquille:memory-evidence:v2','Math.random'
]) assert.equal(source.includes(forbidden), false, `38.3 pure negation core must not reference ${forbidden}`);

for (const forbiddenSemantic of [
  'Nous ne','Vous ne','Ils ne','Elles ne','Je vais','passé composé'
]) assert.equal(source.includes(forbiddenSemantic), false, `38.3 broadened unexpectedly: ${forbiddenSemantic}`);

const capsules = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'foundations-capsules.js'), 'utf8');
for (const anchor of [
  "id:'negation-core',concepts:['F11']",
  'Je ne comprends pas.',
  "Je n'ai pas de monnaie.",
  'Je ne peux pas.',
  "Il n'y a pas d'eau chaude."
]) assert.ok(capsules.includes(anchor), `missing F11 predecessor anchor ${anchor}`);

const stage2 = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'curriculum-stage2.js'), 'utf8');
for (const anchor of ["id:'l17'","Je n'ai pas de monnaie.","id:'l18'",'Je ne peux pas.',"id:'l19'","Il n'y a pas d'eau chaude.","id:'l20'",'Mon téléphone ne marche pas.']) {
  assert.ok(stage2.includes(anchor), `missing curriculum negation anchor ${anchor}`);
}

console.log('Build 38.3 affirmation -> negation core: PASS');
