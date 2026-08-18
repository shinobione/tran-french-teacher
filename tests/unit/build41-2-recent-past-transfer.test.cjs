'use strict';

const assert = require('node:assert/strict');
const core = require('../../src/pedagogy/generalization-recent-past-core.js');

assert.equal(core.roadmapSlice, '41.2');
assert.equal(core.version, '1.0.0-recent-past-core');
assert.equal(core.familyId, 'present-je-regular-action-to-recent-past-je-venir-de');
assert.equal(core.status, 'pure-non-wired');
assert.equal(core.subject, 'je');
assert.equal(core.structure, 'venir-de-infinitive');
assert.equal(core.masteryClaim, false);
assert.equal(core.durableWrite, false);
assert.equal(core.runtimeWiring, false);
assert.deepEqual(core.sourceLessons, [24]);
assert.deepEqual(core.anchorLessons, [36]);

const expected = [
  ['work', 'Je travaille.', 'Je viens de travailler.', 'travailler'],
  ['eat', 'Je mange.', 'Je viens de manger.', 'manger'],
  ['return-home', 'Je rentre à la maison.', 'Je viens de rentrer à la maison.', 'rentrer']
];

const catalog = core.catalog();
assert.equal(catalog.length, 3);
assert.equal(Object.isFrozen(catalog), true);

expected.forEach(([id, source, target, infinitive], index) => {
  const entry = catalog[index];
  assert.equal(Object.isFrozen(entry), true);
  assert.equal(entry.id, id);
  assert.equal(entry.source, source);
  assert.equal(entry.target, target);
  assert.equal(entry.infinitive, infinitive);
  assert.equal(entry.sourceLesson, 24);
  assert.equal(entry.anchorLesson, 36);
  assert.equal(core.view(id), entry);
  assert.equal(core.transform(source), target);
  assert.equal(core.verify(id, target).ok, true);
  assert.equal(core.verify(source, target).ok, true);
});

assert.equal(core.transform('Je travaille'), null);
assert.equal(core.transform('Tu travailles.'), null);
assert.equal(core.transform('Je me lève.'), null);
assert.equal(core.transform("J'ai travaillé."), null);
assert.equal(core.view('unknown'), null);
assert.deepEqual(core.verify('unknown', 'anything'), {
  ok:false,
  reason:'unknown-source',
  expected:null
});

assert.equal(core.verify('work', 'Je vais travailler.').ok, false);
assert.equal(core.verify('work', "J'ai travaillé.").ok, false);
assert.equal(core.verify('eat', 'Je viens de manger').ok, false);
assert.equal(core.verify('return-home', 'Je viens de rentrer.').ok, false);

const before = JSON.stringify(catalog);
try { catalog[0].target = 'mutated'; } catch {}
assert.equal(JSON.stringify(core.catalog()), before);

console.log('Build 41.2 recent-past deterministic transfer core: PASS');
