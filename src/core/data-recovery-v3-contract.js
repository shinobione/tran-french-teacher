(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory(
      require('./data-recovery-core.js'),
      require('../pedagogy/memory-evidence-v2-core.js')
    );
    return;
  }
  if (root?.FrenchTranquilleRecoveryCore && root?.FrenchTranquilleMemoryEvidenceV2) {
    root.FrenchTranquilleRecoveryV3Contract = factory(
      root.FrenchTranquilleRecoveryCore,
      root.FrenchTranquilleMemoryEvidenceV2
    );
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function (RecoveryV2, Evidence) {
  'use strict';

  if (!RecoveryV2 || !Evidence) throw new Error('recovery-v3-contract-dependencies-missing');

  const FORMAT = RecoveryV2.FORMAT;
  const BACKUP_VERSION = 3;
  const EVIDENCE_STORE_ID = 'evidence';
  const EVIDENCE_STORE_KEY = Evidence.PROPOSED_STORE_KEY;
  const SHADOW_ROLE = 'derived-shadow';
  const SOURCE_STORE_SPECS = Object.freeze([...RecoveryV2.STORE_SPECS]);
  const SOURCE_STORE_IDS = Object.freeze(SOURCE_STORE_SPECS.map(spec => spec.id));
  const SOURCE_STORE_KEYS = Object.freeze(SOURCE_STORE_SPECS.map(spec => spec.key));
  const SOURCE_ID_SET = new Set(SOURCE_STORE_IDS);
  const DIMENSION_SET = new Set(Evidence.DIMENSIONS);
  const STATE_SET = new Set(Evidence.EVIDENCE_STATES);
  const OUTCOME_SET = new Set(['success', 'miss', 'assisted', 'unrecognized', 'exposure']);

  const isObject = value => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
  const isArray = Array.isArray;
  const clone = value => value === undefined ? undefined : JSON.parse(JSON.stringify(value));
  const canonicalStringify = Evidence.canonicalStringify;

  function finiteNonNegative(value) {
    return Number.isFinite(Number(value)) && Number(value) >= 0;
  }

  function validIsoOrNull(value) {
    if (value === null || value === undefined) return true;
    return Number.isFinite(Date.parse(String(value)));
  }

  function fnv1a32(value) {
    const text = String(value);
    let hash = 0x811c9dc5;
    for (let index = 0; index < text.length; index += 1) {
      hash ^= text.charCodeAt(index);
      hash = Math.imul(hash, 0x01000193) >>> 0;
    }
    return hash.toString(16).padStart(8, '0');
  }

  function sourceStoresOnly(stores = {}) {
    return Object.fromEntries(SOURCE_STORE_SPECS.map(spec => [
      spec.id,
      Object.prototype.hasOwnProperty.call(stores || {}, spec.id) ? clone(stores[spec.id]) : null
    ]));
  }

  function sourceFingerprint(stores = {}) {
    return `fnv1a32:${fnv1a32(canonicalStringify(sourceStoresOnly(stores)))}`;
  }

  function validateSourceStores(stores = {}, { allowMissing = true } = {}) {
    const issues = [];
    SOURCE_STORE_SPECS.forEach(spec => {
      const value = Object.prototype.hasOwnProperty.call(stores || {}, spec.id) ? stores[spec.id] : null;
      if (value === null || value === undefined) {
        if (!allowMissing) issues.push({ id: spec.id, key: spec.key, reason: 'missing' });
        return;
      }
      const result = RecoveryV2.validateValue(spec, value);
      if (!result.ok) issues.push({ id: spec.id, key: spec.key, reason: result.reason });
    });
    return { ok: issues.length === 0, issues };
  }

  function validateDimensionBucket(bucket, dimension, issues, itemId) {
    if (!isObject(bucket)) {
      issues.push({ reason: 'invalid-dimension-bucket', itemId, dimension });
      return;
    }
    if (typeof bucket.reconstructable !== 'boolean') issues.push({ reason: 'invalid-reconstructable', itemId, dimension });
    ['observations', 'successes', 'misses', 'assisted', 'unrecognized'].forEach(field => {
      if (!finiteNonNegative(bucket[field])) issues.push({ reason: 'invalid-dimension-count', itemId, dimension, field });
    });
    if (!validIsoOrNull(bucket.lastAt)) issues.push({ reason: 'invalid-dimension-last-at', itemId, dimension });
    if (Object.prototype.hasOwnProperty.call(bucket, 'firstAt') && !validIsoOrNull(bucket.firstAt)) {
      issues.push({ reason: 'invalid-dimension-first-at', itemId, dimension });
    }
    if (bucket.strongestState !== null && bucket.strongestState !== undefined && !STATE_SET.has(bucket.strongestState)) {
      issues.push({ reason: 'unsupported-dimension-state', itemId, dimension, state: bucket.strongestState });
    }
  }

  function validateHistoryEvent(event, itemId, index, issues) {
    if (!isObject(event)) {
      issues.push({ reason: 'invalid-history-event', itemId, index });
      return;
    }
    if (String(event.itemId || '') !== itemId) issues.push({ reason: 'history-item-mismatch', itemId, index });
    if (!DIMENSION_SET.has(event.dimension)) issues.push({ reason: 'unsupported-history-dimension', itemId, index, dimension: event.dimension });
    if (!OUTCOME_SET.has(event.outcome)) issues.push({ reason: 'unsupported-history-outcome', itemId, index, outcome: event.outcome });
    if (!STATE_SET.has(event.state)) issues.push({ reason: 'unsupported-history-state', itemId, index, state: event.state });
    if (!SOURCE_ID_SET.has(event.sourceStore)) issues.push({ reason: 'unsupported-history-source-store', itemId, index, sourceStore: event.sourceStore });
    if (!String(event.source || '')) issues.push({ reason: 'missing-history-source', itemId, index });
    if (!String(event.id || '')) issues.push({ reason: 'missing-history-id', itemId, index });
    if (!validIsoOrNull(event.at)) issues.push({ reason: 'invalid-history-at', itemId, index });
    if (event.meta !== undefined && event.meta !== null && !isObject(event.meta)) issues.push({ reason: 'invalid-history-meta', itemId, index });
  }

  function validateEvidenceShadow(value, { sources = null, requireCoherence = false } = {}) {
    const issues = [];
    if (!isObject(value)) return { ok: false, issues: [{ reason: 'invalid-evidence-shape' }] };
    if (Number(value.schemaVersion) !== Number(Evidence.SCHEMA_VERSION)) issues.push({ reason: 'invalid-evidence-schema-version' });
    if (value.role !== SHADOW_ROLE) issues.push({ reason: 'invalid-evidence-role' });

    const source = value.source;
    if (!isObject(source)) {
      issues.push({ reason: 'invalid-evidence-source' });
    } else {
      if (!/^fnv1a32:[0-9a-f]{8}$/.test(String(source.fingerprint || ''))) issues.push({ reason: 'invalid-source-fingerprint' });
      if (!isArray(source.derivedFrom) || canonicalStringify(source.derivedFrom) !== canonicalStringify(SOURCE_STORE_IDS)) {
        issues.push({ reason: 'invalid-derived-from' });
      }
      if (!isObject(source.storeSchemas)) issues.push({ reason: 'invalid-source-store-schemas' });
      else {
        SOURCE_STORE_IDS.forEach(id => {
          const meta = source.storeSchemas[id];
          if (!isObject(meta) || typeof meta.present !== 'boolean') issues.push({ reason: 'invalid-source-store-meta', sourceStore: id });
          else if (meta.schemaVersion !== null && meta.schemaVersion !== undefined && !Number.isFinite(Number(meta.schemaVersion))) {
            issues.push({ reason: 'invalid-source-store-schema-version', sourceStore: id });
          }
        });
      }
    }

    const maxItemHistory = Number(value.limits?.maxItemHistory);
    if (!Number.isInteger(maxItemHistory) || maxItemHistory < 1 || maxItemHistory > Evidence.MAX_ITEM_HISTORY) {
      issues.push({ reason: 'invalid-history-limit' });
    }

    if (!isObject(value.items)) {
      issues.push({ reason: 'invalid-evidence-items' });
    } else {
      Object.entries(value.items).forEach(([itemId, item]) => {
        if (!isObject(item)) {
          issues.push({ reason: 'invalid-evidence-item', itemId });
          return;
        }
        if (String(item.itemId || '') !== itemId) issues.push({ reason: 'evidence-item-id-mismatch', itemId });
        if (typeof item.known !== 'boolean') issues.push({ reason: 'invalid-evidence-known', itemId });
        if (item.state !== null && item.state !== undefined && !STATE_SET.has(item.state)) issues.push({ reason: 'unsupported-evidence-state', itemId, state: item.state });
        if (!isObject(item.dimensions)) {
          issues.push({ reason: 'invalid-evidence-dimensions', itemId });
        } else {
          const dimensionKeys = Object.keys(item.dimensions);
          dimensionKeys.filter(key => !DIMENSION_SET.has(key)).forEach(dimension => issues.push({ reason: 'unsupported-evidence-dimension', itemId, dimension }));
          Evidence.DIMENSIONS.forEach(dimension => validateDimensionBucket(item.dimensions[dimension], dimension, issues, itemId));
        }
        if (!isArray(item.history)) {
          issues.push({ reason: 'invalid-evidence-history', itemId });
        } else {
          if (Number.isInteger(maxItemHistory) && item.history.length > maxItemHistory) issues.push({ reason: 'history-limit-exceeded', itemId });
          const eventIds = new Set();
          item.history.forEach((event, index) => {
            validateHistoryEvent(event, itemId, index, issues);
            if (event?.id) {
              if (eventIds.has(event.id)) issues.push({ reason: 'duplicate-history-event', itemId, index, eventId: event.id });
              eventIds.add(event.id);
            }
          });
        }
        if (!isObject(item.provenance)) issues.push({ reason: 'invalid-evidence-provenance', itemId });
      });
    }

    if (!isObject(value.diagnostics) || !isArray(value.diagnostics.issues) || !isArray(value.diagnostics.warnings) || !isArray(value.diagnostics.quarantineCandidates)) {
      issues.push({ reason: 'invalid-evidence-diagnostics' });
    }

    if (issues.length === 0 && sources && requireCoherence) {
      const expected = deriveEvidenceShadow(sources, { maxItemHistory });
      if (!expected.ok) issues.push({ reason: 'evidence-coherence-source-invalid' });
      else if (canonicalStringify(expected.shadow) !== canonicalStringify(value)) issues.push({ reason: 'evidence-source-mismatch' });
    }

    return { ok: issues.length === 0, issues, value };
  }

  const EVIDENCE_SPEC = Object.freeze({
    id: EVIDENCE_STORE_ID,
    key: EVIDENCE_STORE_KEY,
    validate: value => validateEvidenceShadow(value).ok
  });

  const STORE_SPECS = Object.freeze([...SOURCE_STORE_SPECS, EVIDENCE_SPEC]);
  const SPEC_BY_ID = Object.freeze(Object.fromEntries(STORE_SPECS.map(spec => [spec.id, spec])));
  const SPEC_BY_KEY = Object.freeze(Object.fromEntries(STORE_SPECS.map(spec => [spec.key, spec])));

  function specForKey(key) {
    return SPEC_BY_KEY[key] || null;
  }

  function validateValue(specOrKey, value) {
    const spec = typeof specOrKey === 'string' ? SPEC_BY_KEY[specOrKey] || SPEC_BY_ID[specOrKey] : specOrKey;
    if (!spec) return { ok: false, reason: 'unknown-store' };
    if (spec.id === EVIDENCE_STORE_ID) {
      const result = validateEvidenceShadow(value);
      return result.ok ? { ok: true, value } : { ok: false, reason: result.issues[0]?.reason || 'invalid-evidence-schema', issues: result.issues };
    }
    return RecoveryV2.validateValue(spec, value);
  }

  function deriveEvidenceShadow(stores = {}, options = {}) {
    const sources = sourceStoresOnly(stores);
    const validation = validateSourceStores(sources, { allowMissing: true });
    if (!validation.ok) return { ok: false, stage: 'source-validation', issues: validation.issues };
    const maxItemHistory = Math.min(Evidence.MAX_ITEM_HISTORY, Math.max(1, Number(options.maxItemHistory) || Evidence.MAX_ITEM_HISTORY));
    const projected = Evidence.project(sources, { ...options, maxItemHistory, backupVersion: null });
    if (!projected.ok || !projected.proposal) return { ok: false, stage: 'projection', diagnostics: projected.diagnostics || null };
    const proposal = projected.proposal;
    const shadow = {
      schemaVersion: Evidence.SCHEMA_VERSION,
      role: SHADOW_ROLE,
      source: {
        derivedFrom: [...SOURCE_STORE_IDS],
        fingerprint: sourceFingerprint(sources),
        storeSchemas: clone(proposal.source?.storeSchemas || {})
      },
      limits: { maxItemHistory },
      items: clone(proposal.items || {}),
      diagnostics: clone(proposal.diagnostics || { issues: [], warnings: [], quarantineCandidates: [] })
    };
    const shape = validateEvidenceShadow(shadow);
    if (!shape.ok) return { ok: false, stage: 'shadow-validation', issues: shape.issues };
    return { ok: true, shadow, sources };
  }

  function requireSourceStores(stores) {
    const sources = sourceStoresOnly(stores);
    const validation = validateSourceStores(sources, { allowMissing: true });
    if (!validation.ok) throw new Error(`invalid-source-stores:${validation.issues.map(issue => `${issue.id}:${issue.reason}`).join(',')}`);
    return sources;
  }

  function buildBackupV3(stores = {}, app = {}, options = {}) {
    const sources = requireSourceStores(stores);
    const derived = deriveEvidenceShadow(sources, options);
    if (!derived.ok) throw new Error(`evidence-derivation-failed:${derived.stage || 'unknown'}`);
    return {
      format: FORMAT,
      version: BACKUP_VERSION,
      exportedAt: options.exportedAt || new Date().toISOString(),
      app: { version: app?.version || null, build: app?.build || null },
      stores: { ...clone(sources), evidence: derived.shadow }
    };
  }

  function requireBackupEnvelope(payload) {
    if (!isObject(payload) || payload.format !== FORMAT) throw new Error('invalid-backup-format');
    const version = Number(payload.version);
    if (![1, 2, 3].includes(version)) throw new Error(`unsupported-backup-version:${payload.version}`);
    return version;
  }

  function normalizeV3Direct(payload) {
    if (!isObject(payload.stores)) throw new Error('invalid-backup-stores');
    STORE_SPECS.forEach(spec => {
      if (!Object.prototype.hasOwnProperty.call(payload.stores, spec.id)) throw new Error(`missing-backup-store:${spec.id}`);
    });
    const sources = requireSourceStores(payload.stores);
    const evidence = payload.stores.evidence;
    const validation = validateEvidenceShadow(evidence, { sources, requireCoherence: true });
    if (!validation.ok) {
      const mismatch = validation.issues.some(issue => issue.reason === 'evidence-source-mismatch');
      throw new Error(mismatch ? 'evidence-source-mismatch' : `invalid-backup-store:evidence:${validation.issues[0]?.reason || 'invalid-schema'}`);
    }
    return {
      migratedFrom: null,
      sourceVersion: 3,
      preserveMissingIds: [],
      rebuildDerivedIds: [],
      backup: {
        format: FORMAT,
        version: BACKUP_VERSION,
        exportedAt: payload.exportedAt || null,
        app: isObject(payload.app) ? clone(payload.app) : { version: null, build: null },
        stores: { ...clone(sources), evidence: clone(evidence) }
      }
    };
  }

  function normalizedSixFromLegacy(payload) {
    const normalized = RecoveryV2.normalizeBackup(payload);
    return sourceStoresOnly(normalized.backup.stores || {});
  }

  function currentPreservableSources(currentStores = {}) {
    return sourceStoresOnly(currentStores);
  }

  function normalizeLegacy(payload, currentStores = {}, options = {}) {
    const version = Number(payload.version);
    const legacySources = normalizedSixFromLegacy(payload);
    let sources;
    let preserveMissingIds;
    if (version === 1) {
      const current = currentPreservableSources(currentStores);
      const preservedIds = ['errors', 'scenarios', 'listening', 'milestones'];
      sources = { ...legacySources };
      preservedIds.forEach(id => { sources[id] = clone(current[id]); });
      preserveMissingIds = preservedIds;
    } else {
      sources = legacySources;
      preserveMissingIds = [];
    }
    const sourceValidation = validateSourceStores(sources, { allowMissing: true });
    if (!sourceValidation.ok) throw new Error(`invalid-restore-source:${sourceValidation.issues.map(issue => `${issue.id}:${issue.reason}`).join(',')}`);
    const derived = deriveEvidenceShadow(sources, options);
    if (!derived.ok) throw new Error(`evidence-rebuild-failed:${derived.stage || 'unknown'}`);
    return {
      migratedFrom: version,
      sourceVersion: version,
      preserveMissingIds,
      rebuildDerivedIds: [EVIDENCE_STORE_ID],
      backup: {
        format: FORMAT,
        version: BACKUP_VERSION,
        exportedAt: payload.exportedAt || null,
        app: isObject(payload.app) ? clone(payload.app) : { version: null, build: null },
        stores: { ...clone(sources), evidence: derived.shadow }
      }
    };
  }

  function normalizeBackup(payload, { currentStores = {}, maxItemHistory = Evidence.MAX_ITEM_HISTORY } = {}) {
    const version = requireBackupEnvelope(payload);
    if (version === 3) return normalizeV3Direct(payload);
    return normalizeLegacy(payload, currentStores, { maxItemHistory });
  }

  function storesToRawMap(stores = {}) {
    const raw = {};
    STORE_SPECS.forEach(spec => {
      const value = Object.prototype.hasOwnProperty.call(stores || {}, spec.id) ? stores[spec.id] : null;
      raw[spec.key] = value === null || value === undefined ? null : canonicalStringify(value);
    });
    return raw;
  }

  function planRestore(payload, currentStores = {}, options = {}) {
    const normalized = normalizeBackup(payload, { currentStores, maxItemHistory: options.maxItemHistory });
    return {
      ...normalized,
      targetStores: clone(normalized.backup.stores),
      targetRaw: storesToRawMap(normalized.backup.stores)
    };
  }

  function validateBackupV3(payload) {
    try {
      const normalized = normalizeV3Direct(payload);
      return { ok: true, backup: normalized.backup };
    } catch (error) {
      return { ok: false, reason: String(error?.message || error) };
    }
  }

  return Object.freeze({
    FORMAT,
    BACKUP_VERSION,
    EVIDENCE_STORE_ID,
    EVIDENCE_STORE_KEY,
    SHADOW_ROLE,
    SOURCE_STORE_IDS,
    SOURCE_STORE_KEYS,
    SOURCE_STORE_SPECS,
    STORE_SPECS,
    specForKey,
    validateValue,
    validateSourceStores,
    validateEvidenceShadow,
    sourceStoresOnly,
    sourceFingerprint,
    deriveEvidenceShadow,
    buildBackupV3,
    normalizeBackup,
    planRestore,
    storesToRawMap,
    validateBackupV3
  });
});
