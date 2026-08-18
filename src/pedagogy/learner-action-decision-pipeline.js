(function attachLearnerActionDecisionPipeline(root, factory) {
  'use strict';

  let adapter = null;
  let core = null;

  if (typeof module === 'object' && module.exports) {
    adapter = require('./learner-evidence-adapter.js');
    core = require('./learner-action-arbitration-core.js');
  } else if (root) {
    adapter = root.FrenchTranquilleActionEvidenceAdapter || null;
    core = root.FrenchTranquilleLearnerIntelligenceV3Core || null;
  }

  const api = factory(adapter, core);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.FrenchTranquilleLearnerActionDecisionPipeline = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createLearnerActionDecisionPipeline(adapter, core) {
  'use strict';

  const ROADMAP_SLICE = '39.3';
  const API_VERSION = '3.0.0-decision-pipeline';
  const READY = Boolean(adapter?.adapt && core?.decide);

  function frozenArray(values) {
    return Object.freeze(Array.isArray(values) ? [...values] : []);
  }

  function missingDependencyDecision() {
    return Object.freeze({
      roadmapSlice: ROADMAP_SLICE,
      version: API_VERSION,
      ready: false,
      selected: null,
      ranking: Object.freeze([]),
      rejected: Object.freeze([]),
      candidates: Object.freeze({}),
      abstained: true,
      reason: 'pipeline-dependencies-missing',
      diagnostics: Object.freeze({
        adapterReady: Boolean(adapter?.adapt),
        arbitrationReady: Boolean(core?.decide),
        evidenceV2ReadCutover: false,
        durableWrite: false,
        runtimeWiring: false
      })
    });
  }

  function decide(input = {}) {
    if (!READY) return missingDependencyDecision();

    const adapted = adapter.adapt(input);
    const decision = core.decide(adapted.candidates);

    return Object.freeze({
      roadmapSlice: ROADMAP_SLICE,
      version: API_VERSION,
      ready: true,
      selected: decision.selected,
      ranking: frozenArray(decision.ranking),
      rejected: frozenArray(decision.rejected),
      candidates: adapted.candidates,
      abstained: decision.abstained,
      reason: decision.reason,
      diagnostics: Object.freeze({
        adapterVersion: adapted.version,
        arbitrationVersion: decision.version,
        trustedOwners: frozenArray(adapted.diagnostics?.trustedOwners),
        deliberatelyUnavailable: frozenArray(adapted.diagnostics?.deliberatelyUnavailable),
        evidenceV2ReadCutover: false,
        durableWrite: false,
        runtimeWiring: false
      })
    });
  }

  return Object.freeze({
    roadmapSlice: ROADMAP_SLICE,
    version: API_VERSION,
    ready: READY,
    decide
  });
});
