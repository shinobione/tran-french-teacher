(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.FrenchTranquilleMemoryEvidenceV2 = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const SCHEMA_VERSION = 2;
  const PROPOSED_STORE_KEY = 'french-tranquille:memory-evidence:v2';
  const MAX_ITEM_HISTORY = 24;
  const DIMENSIONS = Object.freeze([
    'retrieval', 'listening', 'scenario', 'text', 'recognition',
    'construction', 'transfer', 'assistance', 'recency', 'repetition', 'recovery'
  ]);
  const EVIDENCE_STATES = Object.freeze([
    'exposure', 'assisted-success', 'autonomous-recall', 'contextual-reuse',
    'concept-understanding', 'novel-construction-transfer'
  ]);
  const SOURCE_SCHEMAS = Object.freeze({
    learner: [1, 2], memory: [1], errors: [1], scenarios: [1], listening: [1], milestones: [1]
  });
  const NOT_RECONSTRUCTABLE = Object.freeze(new Set(['construction', 'transfer']));

  const isObject = value => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
  const asArray = value => Array.isArray(value) ? value : [];
  const asObject = value => isObject(value) ? value : {};
  const asNumber = value => Number.isFinite(Number(value)) ? Number(value) : 0;

  function validIso(value) {
    if (!value) return null;
    const ms = Date.parse(String(value));
    return Number.isFinite(ms) ? new Date(ms).toISOString() : null;
  }

  function clone(value) {
    return value === undefined ? undefined : JSON.parse(JSON.stringify(value));
  }

  function stableSortObject(value) {
    if (Array.isArray(value)) return value.map(stableSortObject);
    if (!isObject(value)) return value;
    return Object.fromEntries(Object.keys(value).sort().map(key => [key, stableSortObject(value[key])]));
  }

  function canonicalStringify(value) {
    return JSON.stringify(stableSortObject(value));
  }

  function schemaOf(store) {
    if (!isObject(store)) return null;
    return Number.isFinite(Number(store.schemaVersion)) ? Number(store.schemaVersion) : null;
  }

  function validateSources(stores, { curriculumItemIds = null } = {}) {
    const source = asObject(stores);
    const issues = [];
    const warnings = [];
    const quarantineCandidates = [];

    Object.entries(SOURCE_SCHEMAS).forEach(([id, allowed]) => {
      const value = source[id];
      if (value === null || value === undefined) {
        warnings.push({ code: 'source-missing', sourceStore: id });
        return;
      }
      if (!isObject(value)) {
        const issue = { code: 'invalid-source-shape', sourceStore: id };
        issues.push(issue);
        quarantineCandidates.push(issue);
        return;
      }
      const schema = schemaOf(value);
      if (id === 'learner' && schema === null) return;
      if (!allowed.includes(schema)) {
        const issue = { code: 'unsupported-source-schema', sourceStore: id, schemaVersion: schema };
        issues.push(issue);
        quarantineCandidates.push(issue);
      }
    });

    const knownIds = new Set(asArray(source.learner?.knownItems).map(String));
    const memoryIds = new Set(Object.keys(asObject(source.memory?.items)));
    const errorIds = new Set(Object.keys(asObject(source.errors?.items)));
    const observedIds = new Set([...knownIds, ...memoryIds, ...errorIds]);
    if (curriculumItemIds) {
      const allowed = new Set(asArray(curriculumItemIds).map(String));
      [...observedIds].sort().forEach(itemId => {
        if (!allowed.has(itemId)) warnings.push({ code: 'unknown-curriculum-item', itemId });
      });
    }

    return {
      ok: issues.length === 0,
      issues,
      warnings,
      quarantineCandidates,
      observedItemIds: [...observedIds].sort()
    };
  }

  function eventId(event) {
    return [
      event.sourceStore || 'unknown', event.sourceRef || '-', event.itemId || '-', event.at || '-',
      event.dimension || '-', event.outcome || '-', event.state || '-'
    ].join('|');
  }

  function makeEvent({ itemId, at = null, dimension, outcome, state = 'exposure', sourceStore, source, sourceRef = null, meta = null }) {
    const event = {
      itemId: String(itemId),
      at: validIso(at),
      dimension,
      outcome,
      state: EVIDENCE_STATES.includes(state) ? state : 'exposure',
      sourceStore,
      source: String(source || sourceStore || 'unknown'),
      sourceRef: sourceRef == null ? null : String(sourceRef)
    };
    if (meta && isObject(meta) && Object.keys(meta).length) event.meta = stableSortObject(meta);
    event.id = eventId(event);
    return event;
  }

  function sourceDimension(source = '') {
    const value = String(source).toLowerCase();
    if (value.includes('listening')) return 'listening';
    if (value.includes('scenario')) return 'scenario';
    if (value.includes('voice')) return 'recognition';
    if (value.includes('text')) return 'text';
    if (value.includes('review')) return 'retrieval';
    return 'repetition';
  }

  function stateForSource(source, ok) {
    const dimension = sourceDimension(source);
    if (!ok) return 'exposure';
    if (dimension === 'retrieval') return 'autonomous-recall';
    if (dimension === 'scenario') return 'contextual-reuse';
    return 'exposure';
  }

  function memoryEvents(memoryEntry) {
    if (!isObject(memoryEntry) || !memoryEntry.id) return [];
    const events = [];
    const source = String(memoryEntry.lastSource || 'learning-memory');
    const attempts = asNumber(memoryEntry.attempts);
    if (attempts > 0) {
      const successes = asNumber(memoryEntry.successes);
      const misses = asNumber(memoryEntry.misses);
      const ok = successes >= misses && Number(memoryEntry.lastRating) !== 0;
      events.push(makeEvent({
        itemId: memoryEntry.id,
        at: memoryEntry.lastReviewed || memoryEntry.lastSeen || memoryEntry.firstSeen,
        dimension: sourceDimension(source),
        outcome: ok ? 'success' : 'miss',
        state: stateForSource(source, ok),
        sourceStore: 'memory',
        source,
        sourceRef: memoryEntry.id,
        meta: {
          aggregate: true,
          attempts,
          successes,
          misses,
          lastRating: memoryEntry.lastRating ?? null,
          strength: asNumber(memoryEntry.strength),
          streak: asNumber(memoryEntry.streak)
        }
      }));
    }
    return events;
  }

  function errorTypeMap(type) {
    return {
      'retrieval-difficult': ['retrieval', 'miss'],
      'text-mismatch': ['text', 'miss'],
      'partial': ['text', 'miss'],
      'scenario-miss': ['scenario', 'miss'],
      'assisted': ['assistance', 'assisted'],
      'voice-unrecognized': ['recognition', 'unrecognized'],
      'practice-miss': ['repetition', 'miss'],
      'repeated-miss': ['repetition', 'miss']
    }[type] || ['repetition', 'miss'];
  }

  function errorEvents(itemId, entry) {
    if (!isObject(entry)) return [];
    const events = [];
    asArray(entry.events).forEach((raw, index) => {
      if (!isObject(raw)) return;
      const [dimension, outcome] = errorTypeMap(raw.type);
      events.push(makeEvent({
        itemId,
        at: raw.at,
        dimension,
        outcome,
        state: 'exposure',
        sourceStore: 'errors',
        source: raw.source || raw.type || 'error-intelligence',
        sourceRef: `${itemId}:error:${index}`,
        meta: {
          errorType: raw.type || null,
          repeated: Boolean(raw.repeated),
          recognitionOnly: raw.type === 'voice-unrecognized'
        }
      }));
    });
    if (asNumber(entry.recoveries) > 0 && entry.lastRecoveryAt) {
      events.push(makeEvent({
        itemId,
        at: entry.lastRecoveryAt,
        dimension: 'recovery',
        outcome: 'success',
        state: 'exposure',
        sourceStore: 'errors',
        source: entry.lastSource || 'error-recovery',
        sourceRef: `${itemId}:recovery`,
        meta: { aggregate: true, recoveries: asNumber(entry.recoveries) }
      }));
    }
    return events;
  }

  function itemIdFromListeningEvent(event) {
    const id = String(event?.id || '');
    if (event?.family === 'meaning' && id.startsWith('meaning:')) return id.slice('meaning:'.length) || null;
    if (event?.family === 'contrast' && id.startsWith('contrast:')) {
      const parts = id.split(':');
      return parts.length >= 3 ? parts[parts.length - 1] : null;
    }
    return null;
  }

  function listeningEvents(listening, knownItemIds, diagnostics) {
    const byItem = {};
    let dialogueUnattributed = 0;
    asArray(listening?.recent).forEach((raw, index) => {
      if (!isObject(raw)) return;
      const itemId = itemIdFromListeningEvent(raw);
      if (!itemId) {
        if (raw.family === 'dialogue') dialogueUnattributed += 1;
        return;
      }
      if (knownItemIds && !knownItemIds.has(itemId)) {
        diagnostics.warnings.push({ code: 'listening-item-not-observed-elsewhere', itemId, sourceRef: raw.id || null });
      }
      const event = makeEvent({
        itemId,
        at: raw.at,
        dimension: 'listening',
        outcome: raw.ok ? 'success' : 'miss',
        state: 'exposure',
        sourceStore: 'listening',
        source: `listening-${raw.family || 'unknown'}`,
        sourceRef: raw.id || `listening:${index}`,
        meta: {
          family: raw.family || null,
          replays: Math.max(0, asNumber(raw.replays)),
          slow: Boolean(raw.slow)
        }
      });
      (byItem[itemId] ||= []).push(event);
    });
    if (dialogueUnattributed) diagnostics.warnings.push({ code: 'listening-dialogue-unattributed', count: dialogueUnattributed });
    return byItem;
  }

  function emptyDimension(dimension) {
    return {
      reconstructable: !NOT_RECONSTRUCTABLE.has(dimension),
      observations: 0,
      successes: 0,
      misses: 0,
      assisted: 0,
      unrecognized: 0,
      lastAt: null,
      strongestState: null
    };
  }

  function stateRank(state) {
    return {
      exposure: 1,
      'assisted-success': 2,
      'concept-understanding': 3,
      'autonomous-recall': 4,
      'contextual-reuse': 5,
      'novel-construction-transfer': 6
    }[state] || 0;
  }

  function aggregateDimensions(events, firstSeen = null, lastSeen = null) {
    const dimensions = Object.fromEntries(DIMENSIONS.map(dimension => [dimension, emptyDimension(dimension)]));
    events.forEach(event => {
      const bucket = dimensions[event.dimension];
      if (!bucket) return;
      bucket.observations += 1;
      if (event.outcome === 'success') bucket.successes += 1;
      else if (event.outcome === 'miss') bucket.misses += 1;
      else if (event.outcome === 'assisted') bucket.assisted += 1;
      else if (event.outcome === 'unrecognized') bucket.unrecognized += 1;
      if (event.at && (!bucket.lastAt || event.at > bucket.lastAt)) bucket.lastAt = event.at;
      if (!bucket.strongestState || stateRank(event.state) > stateRank(bucket.strongestState)) bucket.strongestState = event.state;
    });
    const times = events.map(event => event.at).filter(Boolean).sort();
    const firstAt = validIso(firstSeen) || times[0] || null;
    const lastAt = validIso(lastSeen) || times[times.length - 1] || null;
    dimensions.recency.observations = firstAt || lastAt ? 1 : 0;
    dimensions.recency.lastAt = lastAt;
    dimensions.recency.firstAt = firstAt;
    dimensions.repetition.observations += events.reduce((sum, event) => sum + Math.max(0, asNumber(event.meta?.replays)), 0);
    return dimensions;
  }

  function dedupeAndBound(events, limit = MAX_ITEM_HISTORY) {
    const map = new Map();
    events.forEach(event => { if (event?.id) map.set(event.id, event); });
    return [...map.values()].sort((a, b) => {
      const atA = a.at || '';
      const atB = b.at || '';
      if (atA !== atB) return atA.localeCompare(atB);
      return a.id.localeCompare(b.id);
    }).slice(-Math.max(1, Number(limit) || MAX_ITEM_HISTORY));
  }

  function strongestItemState(events, known) {
    let strongest = known ? 'exposure' : null;
    events.forEach(event => {
      if (!strongest || stateRank(event.state) > stateRank(strongest)) strongest = event.state;
    });
    return strongest;
  }

  function projectionSourceMeta(stores) {
    return Object.fromEntries(Object.keys(SOURCE_SCHEMAS).map(id => {
      const value = stores?.[id];
      return [id, { present: value !== null && value !== undefined, schemaVersion: schemaOf(value) }];
    }));
  }

  function project(stores, options = {}) {
    const input = clone(asObject(stores));
    const validation = validateSources(input, options);
    if (!validation.ok) {
      return {
        ok: false,
        schemaVersion: SCHEMA_VERSION,
        proposedStoreKey: PROPOSED_STORE_KEY,
        diagnostics: {
          issues: validation.issues,
          warnings: validation.warnings,
          quarantineCandidates: validation.quarantineCandidates
        }
      };
    }

    const diagnostics = { issues: [], warnings: [...validation.warnings], quarantineCandidates: [] };
    const learner = asObject(input.learner);
    const memory = asObject(input.memory);
    const errors = asObject(input.errors);
    const knownIds = new Set(asArray(learner.knownItems).map(String));
    const itemIds = new Set(validation.observedItemIds);
    const listeningByItem = listeningEvents(input.listening, itemIds, diagnostics);
    Object.keys(listeningByItem).forEach(id => itemIds.add(id));

    const scenarioStats = asObject(input.scenarios?.scenarios);
    const scenarioAggregateCount = Object.values(scenarioStats).reduce((sum, entry) => sum + asNumber(entry?.plays) + asNumber(entry?.completions), 0);
    if (scenarioAggregateCount) diagnostics.warnings.push({ code: 'scenario-aggregate-unattributed', count: scenarioAggregateCount });
    if (input.milestones && Object.keys(asObject(input.milestones.seen)).length) {
      diagnostics.warnings.push({ code: 'milestones-not-item-evidence', count: Object.keys(asObject(input.milestones.seen)).length });
    }
    diagnostics.warnings.push({ code: 'dimension-not-reconstructable', dimensions: ['construction', 'transfer', 'concept-understanding'] });

    const items = {};
    [...itemIds].sort().forEach(itemId => {
      const mem = asObject(memory.items)?.[itemId];
      const err = asObject(errors.items)?.[itemId];
      const events = [];
      if (knownIds.has(itemId)) {
        events.push(makeEvent({
          itemId,
          at: mem?.firstSeen || null,
          dimension: 'recency',
          outcome: 'exposure',
          state: 'exposure',
          sourceStore: 'learner',
          source: 'knownItems',
          sourceRef: itemId
        }));
      }
      events.push(...memoryEvents(mem));
      events.push(...errorEvents(itemId, err));
      events.push(...asArray(listeningByItem[itemId]));
      const history = dedupeAndBound(events, options.maxItemHistory || MAX_ITEM_HISTORY);
      const dimensions = aggregateDimensions(history, mem?.firstSeen, mem?.lastSeen || mem?.lastReviewed);
      items[itemId] = {
        itemId,
        known: knownIds.has(itemId),
        state: strongestItemState(history, knownIds.has(itemId)),
        dimensions,
        history,
        provenance: {
          memory: Boolean(mem),
          errors: Boolean(err),
          listening: Boolean(listeningByItem[itemId]?.length),
          learnerKnown: knownIds.has(itemId)
        }
      };
    });

    const proposal = {
      schemaVersion: SCHEMA_VERSION,
      proposedStoreKey: PROPOSED_STORE_KEY,
      adoption: 'dry-run-only',
      source: {
        backupVersion: options.backupVersion ?? null,
        storeSchemas: projectionSourceMeta(input)
      },
      limits: { maxItemHistory: Math.max(1, Number(options.maxItemHistory) || MAX_ITEM_HISTORY) },
      items,
      diagnostics
    };
    return { ok: true, proposal: stableSortObject(proposal), diagnostics };
  }

  function projectBackup(payload, options = {}) {
    if (!isObject(payload) || payload.format !== 'french-tranquille-backup') {
      return {
        ok: false,
        schemaVersion: SCHEMA_VERSION,
        proposedStoreKey: PROPOSED_STORE_KEY,
        diagnostics: { issues: [{ code: 'invalid-backup-format' }], warnings: [], quarantineCandidates: [] }
      };
    }
    if (Number(payload.version) !== 2 || !isObject(payload.stores)) {
      return {
        ok: false,
        schemaVersion: SCHEMA_VERSION,
        proposedStoreKey: PROPOSED_STORE_KEY,
        diagnostics: {
          issues: [{ code: 'backup-normalization-required', version: payload.version ?? null }],
          warnings: [],
          quarantineCandidates: []
        }
      };
    }
    return project(payload.stores, { ...options, backupVersion: 2 });
  }

  function simulate(stores, options = {}) {
    const before = canonicalStringify(stores);
    const first = project(stores, options);
    const second = project(stores, options);
    const after = canonicalStringify(stores);
    const deterministic = canonicalStringify(first) === canonicalStringify(second);
    const sourceUntouched = before === after;
    return {
      ok: Boolean(first.ok && second.ok && deterministic && sourceUntouched),
      deterministic,
      sourceUntouched,
      proposal: first.proposal || null,
      diagnostics: first.diagnostics || null
    };
  }

  return Object.freeze({
    SCHEMA_VERSION,
    PROPOSED_STORE_KEY,
    MAX_ITEM_HISTORY,
    DIMENSIONS,
    EVIDENCE_STATES,
    SOURCE_SCHEMAS,
    canonicalStringify,
    validateSources,
    project,
    projectBackup,
    simulate
  });
});
