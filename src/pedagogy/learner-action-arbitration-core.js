(function attachLearnerIntelligenceV3Core(root, factory) {
  'use strict';

  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.FrenchTranquilleLearnerIntelligenceV3Core = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createLearnerIntelligenceV3Core() {
  'use strict';

  const ROADMAP_SLICE = '39.1';
  const API_VERSION = '3.0.0-core';

  const ACTIONS = Object.freeze([
    'phrase-retrieval',
    'concept-review',
    'foundation-capsule',
    'listening',
    'scenario',
    'transfer-construction'
  ]);

  const MIN_CONFIDENCE = Object.freeze({
    'phrase-retrieval': 0.35,
    'concept-review': 0.35,
    'foundation-capsule': 0.35,
    listening: 0.35,
    scenario: 0.40,
    'transfer-construction': 0.55
  });

  const MIN_INDEPENDENT_EVIDENCE = Object.freeze({
    'phrase-retrieval': 1,
    'concept-review': 1,
    'foundation-capsule': 1,
    listening: 1,
    scenario: 1,
    'transfer-construction': 2
  });

  function clamp(value, min = 0, max = 1) {
    const n = Number(value);
    if (!Number.isFinite(n)) return min;
    return Math.max(min, Math.min(max, n));
  }

  function asCount(value) {
    const n = Number(value);
    return Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
  }

  function uniqueStrings(values) {
    return [...new Set((Array.isArray(values) ? values : [])
      .map(value => String(value || '').trim().toLowerCase())
      .filter(Boolean))];
  }

  function normalizeCandidate(type, raw = {}) {
    const channels = uniqueStrings(raw.channels);
    const recognitionFailureOnly = Boolean(raw.recognitionFailureOnly)
      || (channels.length > 0 && channels.every(channel => channel === 'recognition-failure'));

    const evidenceCount = asCount(raw.evidenceCount);
    const independentEvidenceCount = asCount(
      raw.independentEvidenceCount === undefined ? evidenceCount : raw.independentEvidenceCount
    );

    return Object.freeze({
      type,
      available: raw.available !== false,
      blocked: Boolean(raw.blocked),
      need: clamp(raw.need),
      urgency: clamp(raw.urgency),
      confidence: clamp(raw.confidence),
      support: clamp(raw.support),
      evidenceCount,
      independentEvidenceCount,
      channels: Object.freeze(channels),
      recognitionFailureOnly,
      targetId: raw.targetId == null ? null : String(raw.targetId),
      reasonCode: raw.reasonCode == null ? null : String(raw.reasonCode)
    });
  }

  function eligibility(candidate) {
    if (!candidate.available) return Object.freeze({ eligible:false, reason:'unavailable' });
    if (candidate.blocked) return Object.freeze({ eligible:false, reason:'blocked' });
    if (candidate.need <= 0) return Object.freeze({ eligible:false, reason:'no-observed-need' });
    if (candidate.recognitionFailureOnly) {
      return Object.freeze({ eligible:false, reason:'recognition-failure-only' });
    }
    if (candidate.confidence < MIN_CONFIDENCE[candidate.type]) {
      return Object.freeze({ eligible:false, reason:'insufficient-confidence' });
    }
    if (candidate.independentEvidenceCount < MIN_INDEPENDENT_EVIDENCE[candidate.type]) {
      return Object.freeze({ eligible:false, reason:'insufficient-independent-evidence' });
    }
    return Object.freeze({ eligible:true, reason:'eligible' });
  }

  function scoreCandidate(candidate) {
    // Deliberately ignores decorative activity totals. The score only uses
    // observed need, urgency and reliability/support of the supplied evidence.
    const raw = (
      candidate.need * 0.50
      + candidate.urgency * 0.25
      + candidate.confidence * 0.15
      + candidate.support * 0.10
    );
    return Math.round(raw * 1000) / 10;
  }

  function materializeCandidates(input = {}) {
    if (Array.isArray(input)) {
      const byType = new Map();
      input.forEach(raw => {
        const type = String(raw?.type || '');
        if (ACTIONS.includes(type) && !byType.has(type)) byType.set(type, raw);
      });
      return ACTIONS.map(type => normalizeCandidate(type, byType.get(type) || {}));
    }
    return ACTIONS.map(type => normalizeCandidate(type, input?.[type] || {}));
  }

  function rank(input = {}) {
    const candidates = materializeCandidates(input);
    const ranked = [];
    const rejected = [];

    candidates.forEach(candidate => {
      const gate = eligibility(candidate);
      const row = Object.freeze({
        ...candidate,
        eligible: gate.eligible,
        eligibilityReason: gate.reason,
        score: gate.eligible ? scoreCandidate(candidate) : null
      });
      if (gate.eligible) ranked.push(row);
      else rejected.push(row);
    });

    ranked.sort((a, b) => {
      const scoreDelta = b.score - a.score;
      if (Math.abs(scoreDelta) > Number.EPSILON) return scoreDelta;
      return ACTIONS.indexOf(a.type) - ACTIONS.indexOf(b.type);
    });

    return Object.freeze({
      ranking: Object.freeze(ranked),
      rejected: Object.freeze(rejected)
    });
  }

  function decide(input = {}) {
    const result = rank(input);
    const selected = result.ranking[0] || null;
    return Object.freeze({
      roadmapSlice: ROADMAP_SLICE,
      version: API_VERSION,
      selected,
      ranking: result.ranking,
      rejected: result.rejected,
      abstained: !selected,
      reason: selected ? 'highest-reliable-need' : 'insufficient-reliable-evidence'
    });
  }

  return Object.freeze({
    roadmapSlice: ROADMAP_SLICE,
    version: API_VERSION,
    actions: ACTIONS,
    minConfidence: MIN_CONFIDENCE,
    minIndependentEvidence: MIN_INDEPENDENT_EVIDENCE,
    normalizeCandidate,
    eligibility,
    scoreCandidate,
    rank,
    decide
  });
});
