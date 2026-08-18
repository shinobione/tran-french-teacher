(function attachLearnerActionRuntimeSnapshot(root, factory) {
  'use strict';

  let nodePipeline = null;
  if (typeof module === 'object' && module.exports) {
    nodePipeline = require('./learner-action-decision-pipeline.js');
  }

  const api = factory(root, nodePipeline);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.FrenchTranquilleLearnerActionRuntimeSnapshot = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createLearnerActionRuntimeSnapshot(root, nodePipeline) {
  'use strict';

  const ROADMAP_SLICE = '39.4';
  const API_VERSION = '3.0.0-runtime-snapshot';

  const emptyMemory = () => Object.freeze({
    entries: Object.freeze([]),
    due: Object.freeze([]),
    fragile: Object.freeze([])
  });

  const emptyErrors = () => Object.freeze({
    top: Object.freeze([]),
    recent: Object.freeze([])
  });

  const textOrNull = value => value === null || value === undefined ? null : String(value);
  const finiteNumber = value => Number.isFinite(Number(value)) ? Number(value) : 0;
  const count = value => Math.max(0, Math.floor(finiteNumber(value)));

  function memoryOwner() {
    return root?.FrenchTranquilleMemory || null;
  }

  function errorOwner() {
    return root?.FrenchTranquilleErrors || null;
  }

  function decisionPipeline() {
    return nodePipeline || root?.FrenchTranquilleLearnerActionDecisionPipeline || null;
  }

  function freezeMemory(summary = {}) {
    const entries = Object.freeze((Array.isArray(summary.entries) ? summary.entries : [])
      .map(entry => Object.freeze({ id: textOrNull(entry?.id), attempts: count(entry?.attempts) }))
      .filter(entry => Boolean(entry.id)));
    const due = Object.freeze((Array.isArray(summary.due) ? summary.due : [])
      .map(entry => Object.freeze({ id: textOrNull(entry?.id) }))
      .filter(entry => Boolean(entry.id)));
    const fragile = Object.freeze((Array.isArray(summary.fragile) ? summary.fragile : [])
      .map(entry => Object.freeze({ id: textOrNull(entry?.id) }))
      .filter(entry => Boolean(entry.id)));
    return Object.freeze({ entries, due, fragile });
  }

  function freezeErrorEvents(events) {
    return Object.freeze((Array.isArray(events) ? events : []).map(event => Object.freeze({
      type: textOrNull(event?.type),
      source: textOrNull(event?.source)
    })));
  }

  function freezeErrors(summary = {}) {
    const top = Object.freeze((Array.isArray(summary.top) ? summary.top : []).map(row => {
      const itemId = textOrNull(row?.item?.id);
      const entryId = textOrNull(row?.entry?.id);
      return Object.freeze({
        item: itemId ? Object.freeze({ id: itemId }) : null,
        score: finiteNumber(row?.score),
        dominant: textOrNull(row?.dominant),
        entry: Object.freeze({
          id: entryId,
          lastType: textOrNull(row?.entry?.lastType),
          events: freezeErrorEvents(row?.entry?.events)
        })
      });
    }));
    const recent = Object.freeze((Array.isArray(summary.recent) ? summary.recent : [])
      .map(event => Object.freeze({
        id: textOrNull(event?.id),
        type: textOrNull(event?.type),
        source: textOrNull(event?.source),
        repeated: Boolean(event?.repeated)
      }))
      .filter(event => Boolean(event.id)));
    return Object.freeze({ top, recent });
  }

  function collectInternal() {
    const memory = memoryOwner();
    const errors = errorOwner();
    let memoryRead = false;
    let errorsRead = false;
    let memorySnapshot = emptyMemory();
    let errorSnapshot = emptyErrors();

    if (typeof memory?.summary === 'function') {
      try {
        memorySnapshot = freezeMemory(memory.summary() || {});
        memoryRead = true;
      } catch {}
    }

    if (typeof errors?.summary === 'function') {
      try {
        errorSnapshot = freezeErrors(errors.summary() || {});
        errorsRead = true;
      } catch {}
    }

    return Object.freeze({
      snapshot: Object.freeze({ memory: memorySnapshot, errors: errorSnapshot }),
      memoryRead,
      errorsRead
    });
  }

  function status() {
    const memoryReady = typeof memoryOwner()?.summary === 'function';
    const errorsReady = typeof errorOwner()?.summary === 'function';
    const pipelineReady = typeof decisionPipeline()?.decide === 'function';
    return Object.freeze({
      roadmapSlice: ROADMAP_SLICE,
      version: API_VERSION,
      ready: memoryReady && errorsReady && pipelineReady,
      memoryReady,
      errorsReady,
      pipelineReady,
      runtimeReadWiring: true,
      learnerFacingWiring: false,
      evidenceV2ReadCutover: false,
      durableWrite: false
    });
  }

  function collect() {
    return collectInternal().snapshot;
  }

  function missingDependencyDecision(current, read) {
    return Object.freeze({
      roadmapSlice: ROADMAP_SLICE,
      version: API_VERSION,
      ready: false,
      selected: null,
      ranking: Object.freeze([]),
      rejected: Object.freeze([]),
      candidates: Object.freeze({}),
      abstained: true,
      reason: 'runtime-snapshot-dependencies-missing',
      diagnostics: Object.freeze({
        memoryReady: current.memoryReady && read.memoryRead,
        errorsReady: current.errorsReady && read.errorsRead,
        pipelineReady: current.pipelineReady,
        runtimeReadWiring: true,
        learnerFacingWiring: false,
        evidenceV2ReadCutover: false,
        durableWrite: false
      })
    });
  }

  function decide() {
    const current = status();
    const read = collectInternal();
    if (!current.pipelineReady || !read.memoryRead || !read.errorsRead) {
      return missingDependencyDecision(current, read);
    }
    return decisionPipeline().decide(read.snapshot);
  }

  return Object.freeze({
    roadmapSlice: ROADMAP_SLICE,
    version: API_VERSION,
    status,
    collect,
    decide
  });
});
