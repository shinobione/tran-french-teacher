'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const engine = require('../src/pedagogy/foundations-capsule-engine.js');
const capsules = require('../src/pedagogy/foundations-capsules.js');

const capsule = capsules.F13;
assert.ok(capsule, 'F13 capsule missing');
assert.equal(capsule.schema, 'french-tranquille-foundations-capsule/v1');
assert.deepEqual(capsule.concepts, ['F13']);
assert.equal(capsule.id, 'adjective-agreement-core');
assert.equal(capsule.optional, true);
assert.equal(capsule.persistence, 'ephemeral-only');
assert.equal(capsule.masteryClaim, false);
assert.deepEqual(capsule.sequence, ['observe','explain','construct','contrast','transfer']);
assert.deepEqual(capsule.examples, ['Je suis prête.','Je suis contente.','Je suis très fatiguée.','Je suis stressée.','Elle est française.']);
assert.equal(capsule.checks.length, 5);
assert.deepEqual(capsule.checks.map(check => check.answer), ['prête','contente','fatiguée','française','Je suis inquiète.']);

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
for (const marker of ["adapter:'37.3'","expansion:'37.4'","consolidation:'37.5'","verbPattern:'37.6'","systematization:'37.7'","agreement:'37.8'"]) {
  assert.ok(pilot.includes(marker), `missing ownership marker ${marker}`);
}
for (const route of [
  "id:'F01_F04',capsule:primaryCapsule,min:8,max:13",
  "id:'F11',capsule:negationCapsule,min:17,max:20",
  "id:'F08',capsule:regularErCapsule,min:32,max:33",
  "id:'F05',capsule:subjectPronounsCapsule,min:34,max:36",
  "id:'F13',capsule:adjectiveAgreementCapsule,min:40,max:40",
  "id:'F12',capsule:questionsCapsule,min:41,max:43"
]) assert.ok(pilot.includes(route), `route changed or missing: ${route}`);
assert.ok(pilot.includes("agreementConcepts:['F13']"), 'F13 ownership metadata missing');
assert.ok(pilot.includes("systematizationConcepts:['F12']"), 'F12 predecessor ownership missing');
assert.equal(pilot.includes('localStorage.setItem'), false, 'Foundations renderer must remain non-persistent');
assert.equal(pilot.includes('french-tranquille:memory-evidence:v2'), false, 'Foundations must not read Evidence as product truth');

const core = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'foundations-core.js'), 'utf8');
assert.ok(core.includes("{ id:'F13', key:'adjective-agreement', audit:'partial', strategy:'teach-core'"), 'F13 core registry contract changed');

const stage2 = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'curriculum-stage2.js'), 'utf8');
const stage3 = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'curriculum-stage3.js'), 'utf8');
for (const anchor of ["id:'l16'",'Je suis prête.','Elle est française.']) assert.ok(stage2.includes(anchor), `missing Stage2 F13 anchor ${anchor}`);
for (const anchor of ["id:'l38'",'Je suis allée au restaurant.',"id:'l40'",'Je suis contente.','Je suis inquiète.','Je suis stressée.','Je suis très fatiguée.']) {
  assert.ok(stage3.includes(anchor), `missing Stage3 F13 anchor ${anchor}`);
}

const capsuleSource = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'foundations-capsules.js'), 'utf8');
assert.ok(capsuleSource.includes('F12:engine.compile(QUESTIONS_RAW)'), '37.7 F12 capsule must remain compiled');
assert.ok(capsuleSource.includes('F13:engine.compile(ADJECTIVE_AGREEMENT_RAW)'), '37.8 F13 capsule must be compiled');

for (const relative of ['../src/pedagogy/foundations-capsules.js','../src/pedagogy/foundations-pilot.js']) {
  const source = fs.readFileSync(path.join(__dirname, relative), 'utf8');
  for (const forbidden of ['sessionStorage.setItem','indexedDB','FrenchTranquilleRecovery']) {
    assert.equal(source.includes(forbidden), false, `${relative} must not reference ${forbidden}`);
  }
}

console.log('Build 37.8 F13 adjective-agreement capsule: PASS');
