(function attachActionEvidenceAdapter(root, factory) {
  'use strict';

  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.FrenchTranquilleActionEvidenceAdapter = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createActionEvidenceAdapter() {
  'use strict';

  const ROADMAP_SLICE = '39.2';
  const API_VERSION = '3.0.0-evidence-adapter';

  const ACTIONS = Object.freeze([
    'phrase-retrieval',
    'concept-review',
    'foundation-capsule',
    'listening',
    'scenario',
    'transfer-construction'
  ]);

  const clamp = value => Math.max(0, Math.min(1, Number(value) || 0));
  const count = value => Math.max(0, Math.floor(Number(value) || 0));
  const idOf = value => value == null ? null : String(value);
  const sourceText = value => String(value || '').toLowerCase();

  function unique(values) {
    return [...new Set((values || []).filter(Boolean).map(value => String(value)))];
  }

  function freezeCandidate(candidate) {
    return Object.freeze({
      type: candidate.type,
      available: candidate.available !== false,
      blocked: Boolean(candidate.blocked),
      need: clamp(candidate.need),
      urgency: clamp(candidate.urgency),
      confidence: clamp(candidate.confidence),
      support: clamp(candidate.support),
      evidenceCount: count(candidate.evidenceCount),
      independentEvidenceCount: count(candidate.independentEvidenceCount),
      channels: Object.freeze(unique(candidate.channels)),
      recognitionFailureOnly: Boolean(candidate.recognitionFailureOnly),
      targetId: idOf(candidate.targetId),
      reasonCode: candidate.reasonCode == null ? null : String(candidate.reasonCode)
    });
  }

  function unavailable(type, reasonCode) {
    return freezeCandidate({
      type,
      available: false,
      need: 0,
      urgency: 0,
      confidence: 0,
      support: 0,
      evidenceCount: 0,
      independentEvidenceCount: 0,
      channels: [],
      recognitionFailureOnly: false,
      targetId: null,
      reasonCode
    });
  }

  function mapById(rows) {
    return new Map((Array.isArray(rows) ? rows : [])
      .map(row => [idOf(row?.id), row])
      .filter(([id]) => Boolean(id)));
  }

  function itemIdFromTop(row) {
    return idOf(row?.item?.id || row?.entry?.id);
  }

  function isRecognitionOnlyError(row) {
    const dominant = String(row?.dominant || row?.entry?.lastType || '').toLowerCase();
    const events = Array.isArray(row?.entry?.events) ? row.entry.events : [];
    if (dominant && dominant !== 'voice-unrecognized') return false;
    if (!events.length) return dominant === 'voice-unrecognized';
    return events.every(event => String(event?.type || '').toLowerCase() === 'voice-unrecognized');
  }

  function isListeningEvent(event) {
    return sourceText(event?.source).startsWith('listening-')
      && String(event?.type || '').toLowerCase() !== 'voice-unrecognized';
  }

  function isScenarioEvent(event) {
    const source = sourceText(event?.source);
    const type = String(event?.type || '').toLowerCase();
    return source.includes('scenario') && (type === 'scenario-miss' || type === 'assisted' || type === 'practice-miss');
  }

  function selectBest(rows) {
    return [...rows].sort((a, b) => {
      if (b.need !== a.need) return b.need - a.need;
      if (b.urgency !== a.urgency) return b.urgency - a.urgency;
      if (b.confidence !== a.confidence) return b.confidence - a.confidence;
      return String(a.targetId || '').localeCompare(String(b.targetId || ''), 'fr');
    })[0] || null;
  }

  function phraseCandidate(memory = {}, errors = {}) {
    const entries = Array.isArray(memory.entries) ? memory.entries : [];
    const byId = mapById(entries);
    const due = new Set((Array.isArray(memory.due) ? memory.due : []).map(row => idOf(row?.id)).filter(Boolean));
    const fragile = new Set((Array.isArray(memory.fragile) ? memory.fragile : []).map(row => idOf(row?.id)).filter(Boolean));
    const topRows = (Array.isArray(errors.top) ? errors.top : []).filter(row => !isRecognitionOnlyError(row));
    const topById = new Map(topRows.map(row => [itemIdFromTop(row), row]).filter(([id]) => Boolean(id)));
    const ids = unique([...due, ...fragile, ...topById.keys()]);

    const rows = ids.map(id => {
      const mem = byId.get(id) || null;
      const err = topById.get(id) || null;
      const channels = [];
      const owners = new Set();
      let need = 0;
      let urgency = 0;
      let support = 0;

      if (fragile.has(id)) {
        need += 0.55;
        support += 0.35;
        channels.push('memory-fragile');
        owners.add('memory');
      }
      if (due.has(id)) {
        need += 0.25;
        urgency += 0.60;
        support += 0.20;
        channels.push('memory-due');
        owners.add('memory');
      }
      if (err) {
        const pressure = clamp(Number(err.score || 0) / 14);
        need += 0.35 * Math.max(0.35, pressure);
        urgency += 0.35 * Math.max(0.35, pressure);
        support += 0.35;
        channels.push('error-observed');
        if (String(err.dominant || '').toLowerCase() === 'retrieval-difficult') channels.push('retrieval-difficult');
        owners.add('errors');
      }

      const reviewed = Number(mem?.attempts || 0) > 0;
      const confidence = clamp(0.42 + (owners.has('memory') ? 0.18 : 0) + (owners.has('errors') ? 0.20 : 0) + (reviewed ? 0.08 : 0));
      return {
        targetId: id,
        need: clamp(need),
        urgency: clamp(urgency),
        confidence,
        support: clamp(support),
        evidenceCount: channels.length,
        independentEvidenceCount: owners.size,
        channels
      };
    });

    const best = selectBest(rows);
    return freezeCandidate({
      type: 'phrase-retrieval',
      available: true,
      ...(best || {}),
      recognitionFailureOnly: false,
      reasonCode: best ? 'memory-or-error-retrieval-need' : 'no-reliable-phrase-need'
    });
  }

  function eventCandidate(type, events, predicate, reasonCode) {
    const grouped = new Map();
    (Array.isArray(events) ? events : []).filter(predicate).forEach(event => {
      const id = idOf(event?.id);
      if (!id) return;
      const row = grouped.get(id) || { count: 0, assisted: 0, repeated: 0 };
      row.count += 1;
      if (String(event?.type || '').toLowerCase() === 'assisted') row.assisted += 1;
      if (event?.repeated) row.repeated += 1;
      grouped.set(id, row);
    });

    const rows = [...grouped.entries()].map(([targetId, row]) => {
      const channels = [type === 'listening' ? 'listening-error' : 'scenario-error'];
      if (row.assisted) channels.push('scenario-assisted');
      if (row.repeated) channels.push('repeated-observed-need');
      const baseNeed = type === 'scenario' && row.assisted ? 0.62 : 0.50;
      return {
        targetId,
        need: clamp(baseNeed + Math.min(0.28, (row.count - 1) * 0.09) + Math.min(0.10, row.repeated * 0.05)),
        urgency: clamp(0.58 + Math.min(0.24, (row.count - 1) * 0.08)),
        confidence: type === 'scenario' ? 0.78 : 0.72,
        support: clamp(0.55 + Math.min(0.25, (row.count - 1) * 0.08)),
        evidenceCount: row.count,
        independentEvidenceCount: 1,
        channels
      };
    });

    const best = selectBest(rows);
    return freezeCandidate({
      type,
      available: true,
      ...(best || {}),
      recognitionFailureOnly: false,
      reasonCode: best ? reasonCode : `no-reliable-${type}-need`
    });
  }

  function adapt(input = {}) {
    const memory = input?.memory || {};
    const errors = input?.errors || {};
    const recent = Array.isArray(errors.recent) ? errors.recent : [];

    const candidates = Object.freeze({
      'phrase-retrieval': phraseCandidate(memory, errors),
      'concept-review': unavailable('concept-review', 'no-durable-concept-evidence'),
      'foundation-capsule': unavailable('foundation-capsule', 'foundations-ephemeral-no-need-evidence'),
      listening: eventCandidate('listening', recent, isListeningEvent, 'observed-listening-miss'),
      scenario: eventCandidate('scenario', recent, isScenarioEvent, 'observed-scenario-miss-or-assistance'),
      'transfer-construction': unavailable('transfer-construction', 'transfer-ephemeral-no-durable-evidence')
    });

    return Object.freeze({
      roadmapSlice: ROADMAP_SLICE,
      version: API_VERSION,
      candidates,
      diagnostics: Object.freeze({
        trustedOwners: Object.freeze(['learning-memory', 'error-intelligence']),
        deliberatelyUnavailable: Object.freeze(['concept-review', 'foundation-capsule', 'transfer-construction']),
        evidenceV2ReadCutover: false,
        durableWrite: false
      })
    });
  }

  return Object.freeze({
    roadmapSlice: ROADMAP_SLICE,
    version: API_VERSION,
    actions: ACTIONS,
    adapt,
    phraseCandidate,
    isListeningEvent,
    isScenarioEvent
  });
});
