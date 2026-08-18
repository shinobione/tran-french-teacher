'use strict';

const assert = require('node:assert/strict');
const pure = require('../../src/pedagogy/generalization-recent-past-core.js');
const adapter = require('../../src/pedagogy/generalization-recent-past-renderer-adapter.js');

assert.equal(adapter.schema, 'french-tranquille-recent-past-renderer-adapter/v1');
assert.equal(adapter.build, 41);
assert.equal(adapter.slice, '41.3');
assert.equal(adapter.sourceSlice, '41.2');
assert.equal(adapter.status, 'read-only-renderer-compatibility');
assert.equal(adapter.family.id, pure.familyId);
assert.equal(adapter.family.persistence, 'ephemeral-only');
assert.equal(adapter.family.masteryClaim, false);
assert.equal(adapter.durableWrite, false);
assert.equal(adapter.masteryClaim, false);
assert.equal(adapter.catalog.length, 3);
assert.equal(Object.isFrozen(adapter), true);
assert.equal(Object.isFrozen(adapter.catalog), true);

const expected = [
  ['work','Je travaille.','Je viens de travailler.',['Je viens de travailler.','Je viens travailler.','Je viens de travaille.']],
  ['eat','Je mange.','Je viens de manger.',['Je viens de manger.','Je viens manger.','Je viens de mange.']],
  ['return-home','Je rentre à la maison.','Je viens de rentrer à la maison.',['Je viens de rentrer à la maison.','Je viens rentrer à la maison.','Je viens de rentre à la maison.']]
];

expected.forEach(([id,source,target,choices],index)=>{
  const exercise=adapter.catalog[index];
  assert.equal(exercise.id,id);
  assert.equal(exercise.source,source);
  assert.equal(exercise.target,target);
  assert.equal(exercise.sourceLesson,24);
  assert.equal(exercise.anchorLesson,36);
  assert.equal(exercise.durableWrite,false);
  assert.equal(exercise.masteryClaim,false);
  assert.deepEqual(adapter.view(exercise,'vi').choices,choices);
  assert.deepEqual(adapter.view(exercise,'fr').choices,choices);
  assert.equal(adapter.view(exercise,'vi').source,source);
  assert.equal(adapter.view(exercise,'fr').target,target);
  assert.equal(adapter.verify(exercise,target),true);
  assert.equal(adapter.verify(exercise,choices[1]),false);
  assert.equal(pure.verify(id,target).ok,true);
});

assert.equal(adapter.family.title.vi,'Từ hiện tại sang “vừa mới”');
assert.equal(adapter.family.title.fr,'Passer du présent au passé récent');
assert.match(adapter.view(adapter.catalog[0],'vi').cue,/vừa mới/);
assert.match(adapter.view(adapter.catalog[0],'fr').cue,/vient juste/);
assert.ok(!JSON.stringify(adapter).includes("J'ai travaillé."));
assert.ok(!JSON.stringify(adapter).includes('Je regarde un film.'));
assert.deepEqual(pure.catalog().map(item=>[item.id,item.source,item.target]),[
  ['work','Je travaille.','Je viens de travailler.'],
  ['eat','Je mange.','Je viens de manger.'],
  ['return-home','Je rentre à la maison.','Je viens de rentrer à la maison.']
]);

console.log('Build 41.3 recent-past renderer compatibility adapter: PASS');
