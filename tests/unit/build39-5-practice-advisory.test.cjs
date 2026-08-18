'use strict';

const assert = require('node:assert/strict');
const advisory = require('../../src/pedagogy/learner-action-practice-advisory.js');

assert.equal(advisory.roadmapSlice, '39.5');
assert.equal(advisory.version, '3.0.0-practice-advisory');
assert.equal(advisory.installed, false);

assert.equal(advisory.actionForDecision({ selected:{ type:'phrase-retrieval' } }), 'review');
assert.equal(advisory.actionForDecision({ selected:{ type:'listening' } }), 'listening');
assert.equal(advisory.actionForDecision({ selected:{ type:'scenario' } }), 'real-life');

assert.equal(advisory.actionForDecision({ selected:{ type:'concept-review' } }), null);
assert.equal(advisory.actionForDecision({ selected:{ type:'foundation-capsule' } }), null);
assert.equal(advisory.actionForDecision({ selected:{ type:'transfer-construction' } }), null);
assert.equal(advisory.actionForDecision({ selected:null, abstained:true }), null);
assert.equal(advisory.actionForDecision(null), null);

const frozenDecision = Object.freeze({ selected:Object.freeze({ type:'scenario', targetId:'bonjour' }) });
assert.equal(advisory.actionForDecision(frozenDecision), 'real-life');
assert.deepEqual(frozenDecision, { selected:{ type:'scenario', targetId:'bonjour' } });

console.log('Build 39.5 Practice advisory mapping: PASS');
