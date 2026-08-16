'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const engine = require('../src/pedagogy/foundations-capsule-engine.js');
const capsules = require('../src/pedagogy/foundations-capsules.js');

const capsule = capsules.F11;
assert.ok(capsule, 'F11 capsule missing');
assert.equal(capsule.schema, 'french-tranquille-foundations-capsule/v1');
assert.deepEqual(capsule.concepts, ['F11']);
assert.equal(capsule.id, 'negation-core');
assert.equal(capsule.optional, true);
assert.equal(capsule.persistence, 'ephemeral-only');
assert.equal(capsule.masteryClaim, false);
assert.deepEqual(capsule.sequence, ['observe','explain','construct','contrast','transfer']);
assert.deepEqual(capsule.examples, ['Je ne comprends pas.',"Je n\'ai pas de monnaie.",'Je ne peux pas.',"Il n\'y a pas d\'eau chaude."]);
assert.equal(capsule.checks.length, 4);
assert.deepEqual(capsule.checks.map(check => check.answer), ['ne','n’','pas',"Il n'y a pas d'eau chaude."]);

let state = engine.initialState(capsule);
state = engine.reduce(capsule, state, {type:'NEXT'});
for (const check of capsule.checks) {
  state = engine.reduce(capsule, state, {type:'ANSWER', choice:check.answer});
  assert.equal(state.answered, true);
  state = engine.reduce(capsule, state, {type:'NEXT'});
}
assert.equal(state.phase, 'done');
assert.equal(state.finished, true);
const done = engine.view(capsule, state, 'vi');
assert.deepEqual(done.summary, {answered:4, correct:4, masteryClaim:false, durableWrite:false});
assert.match(done.conclusion, /chưa có nghĩa là đã “thành thạo”/);

const pilot = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'foundations-pilot.js'), 'utf8');
assert.ok(pilot.includes("expansion:'37.4'") || pilot.includes("expansion:'37.5'"), '37.4 or certified successor expansion marker missing');
assert.ok(pilot.includes("id:'F11',capsule:negationCapsule,min:17,max:20"), 'F11 must stay scoped to lessons 17–20');
assert.ok(pilot.includes('FrenchTranquilleFoundationsCapsules?.F01_F04'), 'F01–F04 predecessor capsule must remain wired');
assert.ok(pilot.includes('FrenchTranquilleFoundationsCapsules?.F11'), 'F11 capsule must remain wired');
assert.equal(pilot.includes('localStorage.setItem'), false, 'Foundations renderer must remain non-persistent');
assert.equal(pilot.includes('french-tranquille:memory-evidence:v2'), false, 'Foundations must not read Evidence as product truth');

for (const relative of ['../src/pedagogy/foundations-capsules.js','../src/pedagogy/foundations-pilot.js']) {
  const source = fs.readFileSync(path.join(__dirname, relative), 'utf8');
  for (const forbidden of ['sessionStorage.setItem','indexedDB','FrenchTranquilleRecovery']) {
    assert.equal(source.includes(forbidden), false, `${relative} must not reference ${forbidden}`);
  }
}

console.log('Build 37.4 F11 negation capsule: PASS');
