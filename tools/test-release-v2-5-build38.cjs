'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');

const read = path => fs.readFileSync(path, 'utf8');
const contract = JSON.parse(read('release-v2.5.json'));

assert.equal(contract.format, 'french-tranquille-release-contract');
assert.deepEqual(contract.release, {
  version:'2.5.0',
  codename:'Build 38 Generalization & Transfer',
  build:38,
  status:'release'
});
assert.deepEqual(contract.pedagogyBaseline, { version:'2.3.0', build:34 });
assert.deepEqual(contract.product, {
  lessons:52,
  items:313,
  scenarioSituations:44,
  scenarioTurns:132,
  listeningNormalRate:0.88,
  listeningSlowRate:0.65,
  speakingMaxMomentsPerLesson:2,
  durableStores:7,
  backupEnvelope:'v3',
  evidenceRole:'derived-shadow'
});
assert.deepEqual(contract.historicalLearner, {
  completedLessons:7,
  partialLesson:'l8',
  partialStep:4,
  knownItems:40
});
assert.equal(contract.build38.milestone, 'closed');
assert.equal(contract.build38.nextSliceAuthorized, false);
assert.deepEqual(contract.build38.families, [
  'subject-substitution',
  'affirmation-negation',
  'present-futur-proche',
  'singular-plural-nominal',
  'nous-spoken-on'
]);
assert.deepEqual(contract.constraints, {
  pedagogyChangedByRelease:false,
  durableSchemaChangedByRelease:false,
  voiceChangedByRelease:false,
  curriculumChangedByRelease:false,
  premiumChangedByRelease:false
});

const loader32 = read('src/core/build32-loader.js');
assert.match(loader32, /version:'2\.5\.0'/);
assert.match(loader32, /build:'38'/);
assert.match(loader32, /pedagogyBaseline:Object\.freeze\(\{ version:'2\.3\.0', build:'34' \}\)/);
assert.match(loader32, /TRANSFER_SPOKEN_ON='2\.4\.0-b38\.10'/);
assert.match(loader32, /TRANSFER_LESSON='2\.4\.0-b38\.10'/);

const loader31 = read('src/core/build31-loader.js');
assert.match(loader31, /const VERSION = '2\.1\.0-b31'/);
assert.match(loader31, /const RUNTIME_RELEASE = '2\.5\.0-b38-release1'/);
assert.match(loader31, /build32-loader\.js\?v=\$\{RUNTIME_RELEASE\}/);

const historicalMeta = read('src/core/build-meta.js');
assert.match(historicalMeta, /const CURRENT_META = \{ version: '2\.2\.0', build: '32'/);
assert.match(historicalMeta, /const META = \{ version: '2\.2\.0', build: '32'/);

const transferLesson = read('src/pedagogy/generalization-transfer-lesson.js');
assert.match(transferLesson, /SPOKEN_ON_LESSON=52/);
assert.match(transferLesson, /SPOKEN_ON_EXERCISE_INDEXES=Object\.freeze\(\[0,1,2\]\)/);
assert.match(transferLesson, /persistent:false/);
assert.match(transferLesson, /masteryClaim:false/);

const spokenOnCore = read('src/pedagogy/generalization-spoken-on-core.js');
assert.match(spokenOnCore, /nous-on-spoken-equivalence/);
assert.match(spokenOnCore, /Nous travaillons\./);
assert.match(spokenOnCore, /On travaille\./);
assert.match(spokenOnCore, /Nous rentrons\./);
assert.match(spokenOnCore, /On rentre\./);
assert.match(spokenOnCore, /Nous allons à…/);
assert.match(spokenOnCore, /On va à…/);

console.log('PASS: v2.5.0 · Build 38 release contract and invariants');
