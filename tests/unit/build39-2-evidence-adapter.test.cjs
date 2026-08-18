'use strict';

const assert = require('node:assert/strict');
const adapter = require('../../src/pedagogy/learner-evidence-adapter.js');
const core = require('../../src/pedagogy/learner-action-arbitration-core.js');

const clone = value => JSON.parse(JSON.stringify(value));

{
  const input = { memory:{entries:[],due:[],fragile:[]}, errors:{recent:[],top:[]} };
  const before = clone(input);
  const out = adapter.adapt(input);
  assert.deepEqual(input, before, 'adapter must not mutate source snapshots');
  assert.equal(core.decide(out.candidates).abstained, true, 'no reliable evidence must abstain');
  assert.equal(out.candidates['concept-review'].available, false);
  assert.equal(out.candidates['foundation-capsule'].available, false);
  assert.equal(out.candidates['transfer-construction'].available, false);
}

{
  const entry = { id:'bonjour', attempts:3, lastSource:'smart-review' };
  const out = adapter.adapt({
    memory:{ entries:[entry], due:[entry], fragile:[entry] },
    errors:{
      recent:[],
      top:[{
        item:{id:'bonjour'},
        entry:{id:'bonjour',lastType:'retrieval-difficult',events:[{type:'retrieval-difficult',source:'smart-review'}]},
        score:10,
        dominant:'retrieval-difficult'
      }]
    }
  });
  const candidate = out.candidates['phrase-retrieval'];
  assert.equal(candidate.targetId, 'bonjour');
  assert.equal(candidate.independentEvidenceCount, 2, 'Memory + Errors are two independent owners');
  assert.ok(candidate.channels.includes('memory-fragile'));
  assert.ok(candidate.channels.includes('retrieval-difficult'));
  assert.equal(core.decide(out.candidates).selected.type, 'phrase-retrieval');
}

{
  const out = adapter.adapt({
    memory:{ entries:[], due:[], fragile:[] },
    errors:{
      recent:[{id:'merci',type:'voice-unrecognized',source:'free-voice-voice'}],
      top:[{
        item:{id:'merci'},
        entry:{id:'merci',lastType:'voice-unrecognized',events:[{type:'voice-unrecognized',source:'free-voice-voice'}]},
        score:12,
        dominant:'voice-unrecognized'
      }]
    }
  });
  assert.equal(out.candidates['phrase-retrieval'].need, 0, 'recognition-only failures cannot create retrieval need');
  assert.equal(core.decide(out.candidates).abstained, true);
}

{
  const out = adapter.adapt({
    memory:{ entries:[], due:[], fragile:[] },
    errors:{ recent:[
      {id:'eau',type:'practice-miss',source:'listening-meaning',repeated:false},
      {id:'eau',type:'practice-miss',source:'listening-contrast',repeated:true}
    ], top:[] }
  });
  const candidate = out.candidates.listening;
  assert.equal(candidate.targetId, 'eau');
  assert.equal(candidate.evidenceCount, 2);
  assert.equal(candidate.independentEvidenceCount, 1);
  assert.ok(candidate.channels.includes('listening-error'));
  assert.equal(core.decide(out.candidates).selected.type, 'listening');
}

{
  const out = adapter.adapt({
    memory:{ entries:[], due:[], fragile:[] },
    errors:{ recent:[
      {id:'cafe',type:'scenario-miss',source:'scenario-miss'},
      {id:'cafe',type:'assisted',source:'scenario-assisted',repeated:true}
    ], top:[] }
  });
  const candidate = out.candidates.scenario;
  assert.equal(candidate.targetId, 'cafe');
  assert.ok(candidate.channels.includes('scenario-assisted'));
  assert.equal(core.decide(out.candidates).selected.type, 'scenario');
}

{
  const input = {
    memory:{ entries:[], due:[], fragile:[], totals:{reviews:999999} },
    errors:{ recent:[], top:[], totals:{errors:999999} },
    activityCount:999999,
    evidenceV2:{anything:'ignored'}
  };
  const out = adapter.adapt(input);
  assert.equal(core.decide(out.candidates).abstained, true, 'decorative totals must not create a candidate');
  assert.equal(out.diagnostics.evidenceV2ReadCutover, false);
}

{
  const a = adapter.adapt({
    memory:{entries:[],due:[],fragile:[]},
    errors:{recent:[
      {id:'z',type:'scenario-miss',source:'scenario-miss'},
      {id:'a',type:'scenario-miss',source:'scenario-miss'}
    ],top:[]}
  });
  const b = adapter.adapt({
    memory:{entries:[],due:[],fragile:[]},
    errors:{recent:[
      {id:'a',type:'scenario-miss',source:'scenario-miss'},
      {id:'z',type:'scenario-miss',source:'scenario-miss'}
    ],top:[]}
  });
  assert.equal(a.candidates.scenario.targetId, b.candidates.scenario.targetId, 'input order must not change target selection');
}

console.log('Build 39.2 evidence adapter tests: PASS');
