'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const engine = require('../src/pedagogy/foundations-capsule-engine.js');
const capsules = require('../src/pedagogy/foundations-capsules.js');

const capsule = capsules.F05;
assert.ok(capsule, 'F05 capsule missing');
assert.equal(capsule.schema, 'french-tranquille-foundations-capsule/v1');
assert.deepEqual(capsule.concepts, ['F05']);
assert.equal(capsule.id, 'subject-pronouns-core');
assert.equal(capsule.optional, true);
assert.equal(capsule.persistence, 'ephemeral-only');
assert.equal(capsule.masteryClaim, false);
assert.deepEqual(capsule.sequence, ['observe','explain','construct','contrast','transfer']);
assert.deepEqual(capsule.examples, ['Je suis prête.','Tu veux manger ?','Elle travaille.','Nous avons le temps.','Vous pouvez m’aider ?']);
assert.equal(capsule.checks.length, 5);
assert.deepEqual(capsule.checks.map(check => check.answer), ['Je','Tu','Elle','Nous','Vous']);

let state = engine.initialState(capsule);
state = engine.reduce(capsule, state, {type:'NEXT'});
for (const check of capsule.checks) {
  state = engine.reduce(capsule, state, {type:'ANSWER', choice:check.answer});
  assert.equal(state.answered, true);
  state = engine.reduce(capsule, state, {type:'NEXT'});
}
assert.equal(state.phase, 'done');
assert.equal(state.finished, true);
assert.deepEqual(engine.view(capsule, state, 'vi').summary, {answered:5, correct:5, masteryClaim:false, durableWrite:false});

const pilot = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'foundations-pilot.js'), 'utf8');
assert.ok(pilot.includes("adapter:'37.3'"), '37.3 adapter ownership changed');
assert.ok(pilot.includes("expansion:'37.4'"), 'F11 37.4 expansion ownership changed');
assert.ok(pilot.includes("consolidation:'37.5'"), '37.5 consolidation marker missing');
assert.ok(pilot.includes("id:'F01_F04',capsule:primaryCapsule,min:8,max:13"), 'F01–F04 route changed');
assert.ok(pilot.includes("id:'F11',capsule:negationCapsule,min:17,max:20"), 'F11 route changed');
assert.ok(pilot.includes("id:'F05',capsule:subjectPronounsCapsule,min:34,max:36"), 'F05 must stay scoped to lessons 34–36');
assert.ok(pilot.includes("expansionConcepts:['F11']"), 'F11 expansion ownership missing');
assert.ok(pilot.includes("consolidationConcepts:['F05']"), 'F05 consolidation ownership missing');
assert.equal(pilot.includes('localStorage.setItem'), false, 'Foundations renderer must remain non-persistent');
assert.equal(pilot.includes('french-tranquille:memory-evidence:v2'), false, 'Foundations must not read Evidence as product truth');

for (const relative of ['../src/pedagogy/foundations-capsules.js','../src/pedagogy/foundations-pilot.js']) {
  const source = fs.readFileSync(path.join(__dirname, relative), 'utf8');
  for (const forbidden of ['sessionStorage.setItem','indexedDB','FrenchTranquilleRecovery']) {
    assert.equal(source.includes(forbidden), false, `${relative} must not reference ${forbidden}`);
  }
}

console.log('Build 37.5 F05 subject-pronoun capsule: PASS');
