'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const engine = require('../src/pedagogy/foundations-capsule-engine.js');
const capsules = require('../src/pedagogy/foundations-capsules.js');

const capsule = capsules.F08;
assert.ok(capsule, 'F08 capsule missing');
assert.equal(capsule.schema, 'french-tranquille-foundations-capsule/v1');
assert.deepEqual(capsule.concepts, ['F08']);
assert.equal(capsule.id, 'regular-er-present-core');
assert.equal(capsule.optional, true);
assert.equal(capsule.persistence, 'ephemeral-only');
assert.equal(capsule.masteryClaim, false);
assert.deepEqual(capsule.sequence, ['observe','explain','construct','contrast','transfer']);
assert.deepEqual(capsule.examples, ['Je travaille.','Tu travailles ?','Elle travaille.','J’habite ici.','Tu habites où ?']);
assert.equal(capsule.checks.length, 5);
assert.deepEqual(capsule.checks.map(check => check.answer), ['e','es','e','Tu habites où ?','Tu vas où ?']);

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
assert.ok(pilot.includes("consolidation:'37.5'"), 'F05 37.5 consolidation ownership changed');
assert.ok(pilot.includes("verbPattern:'37.6'"), '37.6 verb-pattern marker missing');
assert.ok(pilot.includes("id:'F01_F04',capsule:primaryCapsule,min:8,max:13"), 'F01–F04 route changed');
assert.ok(pilot.includes("id:'F11',capsule:negationCapsule,min:17,max:20"), 'F11 route changed');
assert.ok(pilot.includes("id:'F08',capsule:regularErCapsule,min:32,max:33"), 'F08 must stay scoped to lessons 32–33');
assert.ok(pilot.includes("id:'F05',capsule:subjectPronounsCapsule,min:34,max:36"), 'F05 must stay scoped to lessons 34–36');
assert.ok(pilot.includes("verbPatternConcepts:['F08']"), 'F08 ownership missing');
assert.equal(pilot.includes('localStorage.setItem'), false, 'Foundations renderer must remain non-persistent');
assert.equal(pilot.includes('french-tranquille:memory-evidence:v2'), false, 'Foundations must not read Evidence as product truth');

for (const relative of ['../src/pedagogy/foundations-capsules.js','../src/pedagogy/foundations-pilot.js']) {
  const source = fs.readFileSync(path.join(__dirname, relative), 'utf8');
  for (const forbidden of ['sessionStorage.setItem','indexedDB','FrenchTranquilleRecovery']) {
    assert.equal(source.includes(forbidden), false, `${relative} must not reference ${forbidden}`);
  }
}

console.log('Build 37.6 F08 regular -er capsule: PASS');