'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const engine = require('../src/pedagogy/foundations-capsule-engine.js');
const capsules = require('../src/pedagogy/foundations-capsules.js');

const capsule = capsules.F01_F04;

assert.equal(engine.schema, 'french-tranquille-foundations-capsule-engine/v1');
assert.equal(engine.slice, '37.2');
assert.equal(engine.status, 'pure-non-wired');
assert.equal(capsule.schema, 'french-tranquille-foundations-capsule/v1');
assert.deepEqual(capsule.concepts, ['F01','F02','F03','F04']);
assert.equal(capsule.optional, true);
assert.equal(capsule.persistence, 'ephemeral-only');
assert.equal(capsule.masteryClaim, false);
assert.deepEqual(capsule.sequence, ['observe','explain','construct','contrast','transfer']);
assert.deepEqual(capsule.examples, ['🚉 la gare','🎫 un billet','🍽️ une table','🚻 les toilettes']);
assert.equal(capsule.checks.length, 4);
assert.deepEqual(capsule.checks.map(q => q.choices), [
  ['le','la','les'],
  ['un','une','des'],
  ['un','une','des'],
  ['le','la','les']
]);
assert.deepEqual(capsule.checks.map(q => q.answer), ['la','un','une','les']);
assert.deepEqual(capsule.checks.map(q => q.prompt.fr), [
  'Choisis : ___ gare',
  'Tu parles d’un billet non encore identifié : ___ billet',
  'Tu demandes une table : ___ table',
  'Au pluriel : la pharmacie → ___ pharmacies'
]);
assert.deepEqual(capsule.checks.map(q => q.prompt.vi), [
  'Chọn từ đúng: ___ gare',
  'Bạn nói về một vé chưa xác định: ___ billet',
  'Bạn xin một cái bàn: ___ table',
  'Số nhiều: la pharmacie → ___ pharmacies'
]);

// Pure state machine: intro → 4 answered checks → done.
let state = engine.initialState(capsule);
assert.equal(state.phase, 'intro');
assert.equal(engine.view(capsule, state, 'vi').progress, 0);
assert.ok(Object.isFrozen(state));
state = engine.reduce(capsule, state, {type:'NEXT'});
assert.equal(state.phase, 'question');

const chosen = ['le','un','une','les']; // first answer deliberately wrong
for (let index = 0; index < chosen.length; index += 1) {
  const before = state;
  const viewBefore = engine.view(capsule, state, 'fr');
  assert.equal(viewBefore.questionNumber, index + 1);
  assert.equal(viewBefore.answered, false);
  state = engine.reduce(capsule, state, {type:'ANSWER', choice:chosen[index]});
  assert.notStrictEqual(state, before);
  assert.equal(state.answered, true);
  assert.equal(state.answers.length, index + 1);
  const viewAfter = engine.view(capsule, state, 'vi');
  assert.equal(viewAfter.correct, index !== 0);
  assert.equal(viewAfter.correctAnswer, capsule.checks[index].answer);
  assert.ok(viewAfter.feedback.length > 0);
  state = engine.reduce(capsule, state, {type:'NEXT'});
}
assert.equal(state.phase, 'done');
assert.equal(state.finished, true);
const done = engine.view(capsule, state, 'fr');
assert.equal(done.progress, 1);
assert.deepEqual(done.summary, {answered:4, correct:3, masteryClaim:false, durableWrite:false});
assert.match(done.conclusion, /ne signifie pas que la règle est « maîtrisée »/);

// Deterministic reset and immutable compiled data.
const reset = engine.reduce(capsule, state, {type:'RESET'});
assert.deepEqual(reset, engine.initialState(capsule));
assert.ok(Object.isFrozen(capsule));
assert.ok(Object.isFrozen(capsule.checks));
assert.ok(Object.isFrozen(capsule.checks[0]));
assert.throws(() => { capsule.checks[0].answer = 'le'; }, TypeError);

// Invalid schemas/actions are rejected rather than guessed.
assert.throws(() => engine.compile({...capsule, persistence:'localStorage'}), /ephemeral-only/);
assert.throws(() => engine.compile({...capsule, masteryClaim:true}), /masteryClaim/);
assert.throws(() => engine.compile({...capsule, checks:[{prompt:{vi:'x',fr:'x'},choices:['a'],answer:'b',feedback:{vi:'x',fr:'x'}}]}), /answer must exist in choices/);
assert.throws(() => engine.reduce(capsule, engine.initialState(capsule), {type:'ANSWER',choice:'la'}), /intro accepts NEXT only/);

// Exact Build 34 mirror evidence remains mandatory across the 37.3 successor adapter.
const pilotPath = path.join(__dirname, '..', 'src', 'pedagogy', 'foundations-pilot.js');
const capsulesPath = path.join(__dirname, '..', 'src', 'pedagogy', 'foundations-capsules.js');
const pilot = fs.readFileSync(pilotPath, 'utf8');
const capsuleSource = fs.readFileSync(capsulesPath, 'utf8');
const adapter37 = pilot.includes("adapter:'37.3'");
const parityTokens = [
  "concepts:['F01','F02','F03','F04']",
  "choices:['le','la','les']",
  "answer:'la'",
  "choices:['un','une','des']",
  "answer:'un'",
  "answer:'une'",
  "answer:'les'",
  'la gare', 'un billet', 'une table', 'les toilettes',
  'Một bài kiểm tra đúng chưa có nghĩa là đã “thành thạo”',
  'Une bonne réponse ne signifie pas que la règle est « maîtrisée »'
];
if (adapter37) {
  assert.equal(pilot.includes('const questions='), false, '37.3 adapter must not keep the hardcoded question table');
  assert.ok(pilot.includes('FrenchTranquilleFoundationsCapsules?.F01_F04'), '37.3 adapter must consume the canonical capsule');
  for (const token of parityTokens) assert.ok(capsuleSource.includes(token), `Build 34 parity token missing from successor capsule: ${token}`);
} else {
  for (const token of [
    "concepts:['F01','F02','F03','F04']",
    "choices:['le','la','les'],answer:'la'",
    "choices:['un','une','des'],answer:'un'",
    "choices:['un','une','des'],answer:'une'",
    "choices:['le','la','les'],answer:'les'",
    'la gare', 'un billet', 'une table', 'les toilettes',
    'Một bài kiểm tra đúng chưa có nghĩa là đã “thành thạo”',
    'Une bonne réponse ne signifie pas que la règle est « maîtrisée »'
  ]) assert.ok(pilot.includes(token), `Build 34 parity token missing: ${token}`);
}

// Hard purity boundary: no browser/storage/runtime owner is referenced by the engine/spec.
for (const relative of [
  '../src/pedagogy/foundations-capsule-engine.js',
  '../src/pedagogy/foundations-capsules.js'
]) {
  const source = fs.readFileSync(path.join(__dirname, relative), 'utf8');
  for (const forbidden of [
    'localStorage.setItem','sessionStorage.setItem','indexedDB','FrenchTranquilleRecovery',
    'french-tranquille:memory-evidence:v2','document.','MutationObserver','navigator.mediaDevices'
  ]) assert.equal(source.includes(forbidden), false, `${relative} must not reference ${forbidden}`);
}

console.log('Build 37.2 Foundations capsule engine: PASS');
