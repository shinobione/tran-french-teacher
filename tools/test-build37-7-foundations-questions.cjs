'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const engine = require('../src/pedagogy/foundations-capsule-engine.js');
const capsules = require('../src/pedagogy/foundations-capsules.js');

const capsule = capsules.F12;
assert.ok(capsule, 'F12 capsule missing');
assert.equal(capsule.schema, 'french-tranquille-foundations-capsule/v1');
assert.deepEqual(capsule.concepts, ['F12']);
assert.equal(capsule.id, 'questions-core');
assert.equal(capsule.optional, true);
assert.equal(capsule.persistence, 'ephemeral-only');
assert.equal(capsule.masteryClaim, false);
assert.deepEqual(capsule.sequence, ['observe','explain','construct','contrast','transfer']);
assert.deepEqual(capsule.examples, ['Tu travailles ?','Tu habites où ?','Pourquoi ?',"Qu'est-ce que ça veut dire ?",'Pouvez-vous reformuler ?']);
assert.equal(capsule.checks.length, 5);
assert.deepEqual(capsule.checks.map(check => check.answer), ['Tu travailles ?','Tu habites où ?','Pourquoi ?',"Qu'est-ce que ça veut dire ?",'Pouvez-vous reformuler ?']);

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
assert.ok(pilot.includes("verbPattern:'37.6'"), 'F08 37.6 ownership changed');
assert.ok(pilot.includes("systematization:'37.7'"), '37.7 systematization marker missing');
assert.ok(pilot.includes("id:'F01_F04',capsule:primaryCapsule,min:8,max:13"), 'F01–F04 route changed');
assert.ok(pilot.includes("id:'F11',capsule:negationCapsule,min:17,max:20"), 'F11 route changed');
assert.ok(pilot.includes("id:'F08',capsule:regularErCapsule,min:32,max:33"), 'F08 route changed');
assert.ok(pilot.includes("id:'F05',capsule:subjectPronounsCapsule,min:34,max:36"), 'F05 route changed');
assert.ok(pilot.includes("id:'F12',capsule:questionsCapsule,min:41,max:43"), 'F12 must stay scoped to lessons 41–43');
assert.ok(pilot.includes("verbPatternConcepts:['F08']"), 'F08 ownership metadata missing');
assert.ok(pilot.includes("systematizationConcepts:['F12']"), 'F12 systematization ownership missing');
assert.equal(pilot.includes('localStorage.setItem'), false, 'Foundations renderer must remain non-persistent');
assert.equal(pilot.includes('french-tranquille:memory-evidence:v2'), false, 'Foundations must not read Evidence as product truth');

const core = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'foundations-core.js'), 'utf8');
assert.ok(core.includes("{ id:'F12', key:'questions', audit:'partial-system-weak', strategy:'teach-core'"), 'F12 core registry contract changed');

const stage2 = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'curriculum-stage2.js'), 'utf8');
const stage3 = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'curriculum-stage3.js'), 'utf8');
const stage4 = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'curriculum-stage4.js'), 'utf8');
for (const anchor of ["id:'l25'",'Pourquoi ?']) assert.ok(stage2.includes(anchor), `missing Stage2 F12 anchor ${anchor}`);
for (const anchor of ["id:'l32'",'Tu travailles ?',"id:'l39'","Pouvez-vous m'expliquer ?"]) assert.ok(stage3.includes(anchor), `missing Stage3 F12 anchor ${anchor}`);
for (const anchor of ["id:'l41'","Qu'est-ce que ça veut dire ?",'Pouvez-vous reformuler ?',"id:'l42'",'Combien il vous faut ?',"id:'l43'",'Lequel est mieux ?']) assert.ok(stage4.includes(anchor), `missing Stage4 F12 anchor ${anchor}`);

const capsuleSource = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'foundations-capsules.js'), 'utf8');
assert.ok(capsuleSource.includes('F08:engine.compile(REGULAR_ER_RAW)'), '37.6 F08 capsule must remain compiled');
assert.ok(capsuleSource.includes('F12:engine.compile(QUESTIONS_RAW)'), '37.7 F12 capsule must be compiled');
for (const forbidden of ['F13:engine.compile','F16:engine.compile']) {
  assert.equal(capsuleSource.includes(forbidden), false, `37.7 must not mass-rollout ${forbidden.split(':')[0]}`);
}
for (const relative of ['../src/pedagogy/foundations-capsules.js','../src/pedagogy/foundations-pilot.js']) {
  const source = fs.readFileSync(path.join(__dirname, relative), 'utf8');
  for (const forbidden of ['sessionStorage.setItem','indexedDB','FrenchTranquilleRecovery']) {
    assert.equal(source.includes(forbidden), false, `${relative} must not reference ${forbidden}`);
  }
}

console.log('Build 37.7 F12 practical-question capsule: PASS');
