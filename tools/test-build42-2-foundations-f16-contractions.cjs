'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const engine = require('../src/pedagogy/foundations-capsule-engine.js');
const capsules = require('../src/pedagogy/foundations-capsules.js');

const capsule = capsules.F16;
assert.ok(capsule, 'F16 capsule missing');
assert.equal(capsule.schema, 'french-tranquille-foundations-capsule/v1');
assert.deepEqual(capsule.concepts, ['F16']);
assert.equal(capsule.id, 'a-de-contractions-core');
assert.equal(capsule.optional, true);
assert.equal(capsule.persistence, 'ephemeral-only');
assert.equal(capsule.masteryClaim, false);
assert.deepEqual(capsule.sequence, ['observe','explain','construct','contrast','transfer']);
assert.deepEqual(capsule.examples, ['✓ au restaurant','✓ à la maison','✓ du Vietnam','→ à + les = aux','→ de + les = des']);
assert.equal(capsule.checks.length, 6);
assert.deepEqual(capsule.checks.map(check => check.answer), ['au','à la','aux','du','des','article partitif']);

let state = engine.initialState(capsule);
state = engine.reduce(capsule, state, {type:'NEXT'});
for (const check of capsule.checks) {
  state = engine.reduce(capsule, state, {type:'ANSWER', choice:check.answer});
  assert.equal(state.answered, true);
  state = engine.reduce(capsule, state, {type:'NEXT'});
}
assert.equal(state.phase, 'done');
assert.equal(state.finished, true);
assert.deepEqual(engine.view(capsule, state, 'vi').summary, {answered:6, correct:6, masteryClaim:false, durableWrite:false});
assert.deepEqual(engine.view(capsule, state, 'fr').summary, {answered:6, correct:6, masteryClaim:false, durableWrite:false});

const pilot = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'foundations-pilot.js'), 'utf8');
for (const marker of ["adapter:'37.3'","expansion:'37.4'","consolidation:'37.5'","verbPattern:'37.6'","systematization:'37.7'","agreement:'37.8'","contractions:'42.2'"]) {
  assert.ok(pilot.includes(marker), `missing ownership marker ${marker}`);
}
for (const route of [
  "id:'F01_F04',capsule:primaryCapsule,min:8,max:13",
  "id:'F11',capsule:negationCapsule,min:17,max:20",
  "id:'F08',capsule:regularErCapsule,min:32,max:33",
  "id:'F05',capsule:subjectPronounsCapsule,min:34,max:36",
  "id:'F16',capsule:contractionsCapsule,min:38,max:38",
  "id:'F13',capsule:adjectiveAgreementCapsule,min:40,max:40",
  "id:'F12',capsule:questionsCapsule,min:41,max:43"
]) assert.ok(pilot.includes(route), `route changed or missing: ${route}`);
assert.ok(pilot.includes("contractionConcepts:['F16']"), 'F16 ownership metadata missing');
assert.equal(pilot.includes('localStorage.setItem'), false, 'Foundations renderer must remain non-persistent');
assert.equal(pilot.includes('french-tranquille:memory-evidence:v2'), false, 'Foundations must not read Evidence as product truth');

const core = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'foundations-core.js'), 'utf8');
assert.ok(core.includes("{ id:'F16', key:'a-de-contractions', audit:'partial-distributed', strategy:'teach-core', priority:'later-core' }"), 'F16 core registry contract changed');

const stage2 = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'curriculum-stage2.js'), 'utf8');
for (const anchor of ["id:'l22'",'du pain • du lait • des œufs','Du pain, s’il vous plaît.','Des œufs.']) {
  assert.ok(stage2.includes(anchor), `missing partitive anti-confusion anchor ${anchor}`);
}
const stage3 = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'curriculum-stage3.js'), 'utf8');
for (const anchor of ["id:'l38'",'Je suis allée au restaurant.','Je suis rentrée à la maison.']) {
  assert.ok(stage3.includes(anchor), `missing lesson38 F16 source anchor ${anchor}`);
}

const capsuleSource = fs.readFileSync(path.join(__dirname, '..', 'src', 'pedagogy', 'foundations-capsules.js'), 'utf8');
for (const predecessor of [
  'F01_F04:engine.compile(RAW)',
  'F11:engine.compile(NEGATION_RAW)',
  'F05:engine.compile(SUBJECT_PRONOUNS_RAW)',
  'F08:engine.compile(REGULAR_ER_RAW)',
  'F12:engine.compile(QUESTIONS_RAW)',
  'F13:engine.compile(ADJECTIVE_AGREEMENT_RAW)'
]) assert.ok(capsuleSource.includes(predecessor), `predecessor capsule missing: ${predecessor}`);
assert.ok(capsuleSource.includes('F16:engine.compile(CONTRACTIONS_RAW)'), 'Build42.2 F16 capsule must be compiled');
assert.ok(capsuleSource.includes('Du pain. / Des œufs.'), 'F16 must explicitly distinguish lesson22 partitives');
assert.ok(capsuleSource.includes('recombinaison d’enseignement'), 'F16 must label teaching-only recombinations honestly');

for (const relative of ['../src/pedagogy/foundations-capsules.js','../src/pedagogy/foundations-pilot.js']) {
  const source = fs.readFileSync(path.join(__dirname, relative), 'utf8');
  for (const forbidden of ['sessionStorage.setItem','indexedDB','FrenchTranquilleRecovery']) {
    assert.equal(source.includes(forbidden), false, `${relative} must not reference ${forbidden}`);
  }
}

console.log('Build 42.2 F16 contractions capsule: PASS');
