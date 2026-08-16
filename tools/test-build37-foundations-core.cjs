const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const corePath = path.join(root, 'src/pedagogy/foundations-core.js');
const pilotPath = path.join(root, 'src/pedagogy/foundations-pilot.js');
const indexPath = path.join(root, 'index.html');
const swPath = path.join(root, 'sw.js');

const coreSource = fs.readFileSync(corePath, 'utf8');
const pilotSource = fs.readFileSync(pilotPath, 'utf8');
const indexSource = fs.readFileSync(indexPath, 'utf8');
const swSource = fs.readFileSync(swPath, 'utf8');
const core = require(corePath);

assert.equal(core.schema, 'french-tranquille-foundations-core/v1');
assert.equal(core.build, 37);
assert.equal(core.slice, '37.1');
assert.equal(core.status, 'contract-only');

assert.equal(core.concepts.length, 18, 'F01–F18 must be fully registered');
assert.deepEqual(core.concepts.map(({id}) => id), Array.from({length:18}, (_,i) => `F${String(i+1).padStart(2,'0')}`));
assert.equal(new Set(core.concepts.map(({id}) => id)).size, 18);
assert.equal(Object.keys(core.byId).length, 18);

for (const id of ['F01','F02','F03','F04']) {
  assert.equal(core.byId[id].strategy, 'teach-core');
  assert.equal(core.byId[id].priority, 'very-high');
}
assert.equal(core.byId.F05.strategy, 'consolidate');
assert.equal(core.byId.F08.strategy, 'consolidate');
assert.equal(core.byId.F15.strategy, 'consolidate');
for (const id of ['F06','F07','F09','F10','F14','F17','F18']) {
  assert.equal(core.byId[id].strategy, 'reuse-existing', `${id} must reuse canonical teaching instead of duplicating it`);
}
for (const id of ['F11','F12','F13','F16']) assert.equal(core.byId[id].strategy, 'teach-core');

assert.deepEqual(core.pilot.concepts, ['F01','F02','F03','F04']);
assert.deepEqual(core.pilot.lessonRange, [8,13]);
assert.equal(core.pilot.optional, true);
assert.equal(core.pilot.topLevelNavigation, false);
assert.equal(core.pilot.persistence, 'ephemeral-only');
assert.equal(core.pilot.durableWrites, false);
assert.equal(core.pilot.masteryClaim, false);
assert.deepEqual(core.pilot.sequence, ['observe','explain','construct','contrast','transfer']);

assert.equal(core.safety.curriculumLessons, 52);
assert.equal(core.safety.curriculumItems, 313);
assert.equal(core.safety.recoveryStores, 7);
assert.equal(core.safety.backupEnvelope, 3);
assert.equal(core.safety.evidenceRole, 'derived-shadow-only');
assert.equal(core.safety.productTruth, 'six-source-stores');
assert.equal(core.safety.productReadCutover, false);
assert.equal(core.safety.noNewDurableStore, true);
assert.equal(core.safety.noRuntimeWiringInSlice, '37.1');

for (const forbidden of ['localStorage.setItem', 'sessionStorage.setItem', 'FrenchTranquilleRecovery', 'french-tranquille:memory-evidence:v2']) {
  assert.equal(coreSource.includes(forbidden), false, `Foundations Core contract must not depend on ${forbidden}`);
}
assert.equal(indexSource.includes('src/pedagogy/foundations-core.js'), false, '37.1 must not wire the new core into index.html');
assert.equal(swSource.includes('src/pedagogy/foundations-core.js'), false, '37.1 must not precache the new core');

assert.equal(pilotSource.includes("concepts:['F01','F02','F03','F04']"), true);
assert.equal(pilotSource.includes('persistent:false'), true);
assert.equal(pilotSource.includes('localStorage.setItem'), false);

if (pilotSource.includes("expansion:'37.4'")) {
  assert.equal(pilotSource.includes("adapter:'37.3'"), true, '37.4 must keep the certified 37.3 adapter owner');
  assert.equal(pilotSource.includes("id:'F01_F04',capsule:primaryCapsule,min:8,max:13"), true, '37.4 must preserve F01–F04 lessons 8–13');
  assert.equal(pilotSource.includes("id:'F11',capsule:negationCapsule,min:17,max:20"), true, '37.4 F11 expansion must stay lessons 17–20');
  assert.equal(pilotSource.includes("expansionConcepts:['F11']"), true, '37.4 must expose only F11 as the new learner expansion');
  assert.equal(fs.existsSync(path.join(root, 'tests/browser/build37-4-foundations-negation.html')), true, '37.4 browser tribunal missing');
  assert.equal(fs.existsSync(path.join(root, '.github/workflows/build37-4-foundations-negation.yml')), true, '37.4 workflow missing');
} else {
  assert.equal(pilotSource.includes('if(n<8||n>13)return'), true, 'pre-37.4 pilot must stay scoped to lessons 8–13');
}

console.log('Build 37.1 Foundations Core contract: PASS');