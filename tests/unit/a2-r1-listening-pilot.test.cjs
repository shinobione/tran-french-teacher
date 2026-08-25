'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const read = path => fs.readFileSync(path, 'utf8');

const context = { console };
context.globalThis = context;
context.window = context;
vm.createContext(context);
vm.runInContext(read('src/pedagogy/a2-reception-bridge-core.js'), context);
vm.runInContext(read('src/pedagogy/a2-reception-bridge-data.js'), context);

const core = context.FrenchTranquilleA2ReceptionBridgeCore;
const data = context.FrenchTranquilleA2ReceptionBridgeData;
assert.ok(core, 'pure R1 core must load');
assert.ok(data, 'pilot data must load');
assert.equal(data.pilotId, 'doctor-appointment-r1');

const authority = data.authorities[data.pilotId];
const activity = data.activities[data.pilotId];
assert.ok(authority && activity, 'authority and activity must be separate exports');
assert.notEqual(authority, activity);
assert.equal(authority.dialogueId, 'doctor-appointment');
assert.equal(authority.prerequisiteLessonId, 'l45');
assert.deepEqual(Array.from(authority.allowedFactIds), ['jai-mal-ventre','depuis-hier','rendez-vous-medecin']);

const plan = core.normalizeActivity(activity, authority);
assert.equal(plan.questions.length, 3);
assert.deepEqual(Array.from(plan.questions, q => q.factId), ['jai-mal-ventre','depuis-hier','rendez-vous-medecin']);
assert.deepEqual(Array.from(plan.source.prerequisiteItemIds), ['jai-mal-ventre','depuis-hier','rendez-vous-medecin']);
assert.ok(Object.isFrozen(plan));
assert.ok(Object.isFrozen(plan.questions));
plan.questions.forEach(question => {
  assert.deepEqual(Array.from(question.evidenceItems), [question.factId]);
  assert.equal(core.evaluateQuestion(plan, question.id, question.answer).outcome, 'success');
  assert.equal(core.evaluateQuestion(plan, question.id, (question.answer + 1) % question.options.length).outcome, 'miss');
});

const data2 = read('src/pedagogy/listening-data-2.js');
for (const needle of [
  "id:'doctor-appointment'",
  "questionFr:'Depuis quand le problème a-t-il commencé ?'",
  "evidenceItems:['depuis-hier']",
  "fr:\"J'ai mal au ventre.\"",
  "fr:'Depuis hier. Je voudrais un rendez-vous avec un médecin.'"
]) assert.ok(data2.includes(needle), `historical doctor dialogue contract missing: ${needle}`);

const engine = read('src/pedagogy/listening-engine.js');
assert.ok(engine.includes("const source='listening-r1'"), 'R1 evidence source must be explicit');
assert.ok(engine.includes('result.factId'), 'R1 evidence must be fact-bound');
assert.ok(engine.includes('if(r1Active){renderR1Overlay();return}'), 'Listening remains the single interaction owner');
assert.ok(engine.includes("overlay.dataset.listeningRevealed=finalAnswered?'1':'0'"), 'transcript reveal must be final-question bounded');
assert.ok(engine.includes("r1Results.length!==r1Plan.questions.length"), 'transcript requires all three outcomes');
assert.ok(engine.includes('r1Availability'), 'pilot must be prerequisite gated');
assert.ok(engine.includes("if(r1Active){answerR1(index);return}"), 'R1 answers must stay out of historical aggregate answer path');
assert.ok(engine.includes('let playbackEpoch=0;'), 'R1 playback must have an invalidation token');
assert.ok(engine.includes('function cancelPlayback()'), 'R1 playback cancellation helper must exist');
assert.ok(engine.includes('epoch!==playbackEpoch||(startedInR1&&!r1Active)'), 'dialogue loop must stop after R1 exit');

const answerR1Body = engine.slice(engine.indexOf('function answerR1'), engine.indexOf('function answer(index)'));
for (const forbidden of ['state.totals', 'state.families', 'state.recent', 'persist()']) {
  assert.ok(!answerR1Body.includes(forbidden), `R1 answer path must not mutate Listening aggregate via ${forbidden}`);
}
const exitR1Body = engine.slice(engine.indexOf('function exitR1'), engine.indexOf('function nextR1'));
assert.ok(exitR1Body.includes('cancelPlayback()'), 'leaving R1 must cancel and invalidate active playback');
assert.ok(!engine.includes('FrenchTranquilleEvidence'), 'R1 runtime must not write Evidence v2 directly');
assert.ok(!engine.includes('localStorage.setItem(\'french-tranquille:a2'), 'R1 must not create a durable A2 store');

const loader = read('src/core/build32-loader.js');
for (const needle of [
  'a2-reception-bridge.css',
  'a2-reception-bridge-core.js',
  'a2-reception-bridge-data.js'
]) assert.ok(loader.includes(needle), `Build32 loader must load ${needle}`);

const sw = read('sw.js');
assert.ok(sw.includes("const A2R1='1.0.0-pilot'"), 'service worker must own an explicit R1 pilot asset version');
for (const needle of [
  'a2-reception-bridge.css',
  'a2-reception-bridge-core.js',
  'a2-reception-bridge-data.js'
]) assert.ok(sw.includes(needle), `PWA precache must contain ${needle}`);

const css = read('src/pedagogy/a2-reception-bridge.css');
assert.ok(/min-height:(44|4[5-9]|[5-9][0-9])px/.test(css), 'R1 UI must preserve >=44px touch targets');

console.log('A2-R1 learner Listening pilot contract: PASS');