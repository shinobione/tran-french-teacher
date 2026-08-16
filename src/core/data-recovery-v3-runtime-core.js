(function (root, factory) {
  const api = factory(
    root?.FrenchTranquilleRecoveryCore,
    root?.FrenchTranquilleRecoveryV3Contract,
    root?.FrenchTranquilleMemoryEvidenceV2
  );
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root && api) root.FrenchTranquilleRecoveryV3Core = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function (RecoveryV2, Contract, Evidence) {
  'use strict';

  if (!RecoveryV2 || !Contract || !Evidence) return null;

  const FORMAT = Contract.FORMAT;
  const BACKUP_VERSION = Contract.BACKUP_VERSION;
  const STORE_SPECS = Contract.STORE_SPECS;
  const EVIDENCE_KEY = Contract.EVIDENCE_STORE_KEY;
  const SOURCE_SPECS = Contract.SOURCE_STORE_SPECS;
  const SOURCE_KEYS = new Set(Contract.SOURCE_STORE_KEYS);
  const SPEC_BY_ID = Object.fromEntries(STORE_SPECS.map(spec => [spec.id, spec]));
  const SPEC_BY_KEY = Object.fromEntries(STORE_SPECS.map(spec => [spec.key, spec]));

  function specForKey(key) {
    return SPEC_BY_KEY[key] || null;
  }

  function safeParse(raw) {
    return RecoveryV2.safeParse(raw);
  }

  function validateValue(specOrKey, value) {
    const spec = typeof specOrKey === 'string' ? SPEC_BY_KEY[specOrKey] || SPEC_BY_ID[specOrKey] : specOrKey;
    if (!spec) return { ok: false, reason: 'unknown-store' };
    return Contract.validateValue(spec, value);
  }

  function validateRaw(specOrKey, raw, { allowMissing = true } = {}) {
    const spec = typeof specOrKey === 'string' ? SPEC_BY_KEY[specOrKey] || SPEC_BY_ID[specOrKey] : specOrKey;
    if (!spec) return { ok: false, reason: 'unknown-store' };
    if (raw === null || raw === undefined) return allowMissing ? { ok: true, missing: true, value: null } : { ok: false, reason: 'missing' };
    const parsed = safeParse(String(raw));
    if (!parsed.ok) return parsed;
    return validateValue(spec, parsed.value);
  }

  function collectRaw(storage) {
    const values = {};
    STORE_SPECS.forEach(spec => { values[spec.key] = storage.getItem(spec.key); });
    return values;
  }

  function sourceRawMap(rawMap = {}) {
    return Object.fromEntries(SOURCE_SPECS.map(spec => [spec.key, rawMap?.[spec.key] ?? null]));
  }

  function objectsFromRawMap(rawMap, { allowMissing = true } = {}) {
    const stores = {};
    STORE_SPECS.forEach(spec => {
      const raw = rawMap?.[spec.key] ?? null;
      if (raw === null) {
        if (!allowMissing) throw new Error(`invalid-store:${spec.id}:missing`);
        stores[spec.id] = null;
        return;
      }
      const result = validateRaw(spec, raw, { allowMissing: false });
      if (!result.ok) throw new Error(`invalid-store:${spec.id}:${result.reason}`);
      stores[spec.id] = result.value;
    });
    return stores;
  }

  function sourceStoresFromRaw(rawMap = {}) {
    const stores = {};
    SOURCE_SPECS.forEach(spec => {
      const raw = rawMap?.[spec.key] ?? null;
      if (raw === null) {
        stores[spec.id] = null;
        return;
      }
      const result = RecoveryV2.validateRaw(spec, raw, { allowMissing: false });
      if (!result.ok) throw new Error(`invalid-source:${spec.id}:${result.reason}`);
      stores[spec.id] = result.value;
    });
    return stores;
  }

  function validateRawMap(rawMap, { allowMissing = true, requireEvidenceCoherence = false } = {}) {
    const issues = [];
    STORE_SPECS.forEach(spec => {
      const raw = Object.prototype.hasOwnProperty.call(rawMap || {}, spec.key) ? rawMap[spec.key] : null;
      const result = validateRaw(spec, raw, { allowMissing });
      if (!result.ok) issues.push({ id: spec.id, key: spec.key, reason: result.reason });
    });

    if (!issues.length && requireEvidenceCoherence) {
      const evidenceRaw = rawMap?.[EVIDENCE_KEY] ?? null;
      if (evidenceRaw !== null) {
        try {
          const stores = objectsFromRawMap(rawMap, { allowMissing: true });
          const coherence = Contract.validateEvidenceShadow(stores.evidence, { sources: stores, requireCoherence: true });
          if (!coherence.ok) coherence.issues.forEach(issue => issues.push({ id: 'evidence', key: EVIDENCE_KEY, reason: issue.reason }));
        } catch (error) {
          issues.push({ id: 'evidence', key: EVIDENCE_KEY, reason: String(error?.message || error) });
        }
      }
    }

    return { ok: issues.length === 0, issues };
  }

  function buildBackup(storage, app = {}) {
    const raw = collectRaw(storage);
    const sources = sourceStoresFromRaw(sourceRawMap(raw));
    return Contract.buildBackupV3(sources, app);
  }

  function normalizeBackup(payload, options = {}) {
    return Contract.normalizeBackup(payload, options);
  }

  function planRestore(payload, currentRaw = {}, options = {}) {
    const currentStores = sourceStoresFromRaw(sourceRawMap(currentRaw));
    return Contract.planRestore(payload, currentStores, options);
  }

  function defaultWriter(storage) {
    return {
      set: (key, value) => storage.setItem(key, value),
      remove: key => storage.removeItem(key)
    };
  }

  function writeRawMap(storage, rawMap, writer = defaultWriter(storage)) {
    STORE_SPECS.forEach(spec => {
      const value = Object.prototype.hasOwnProperty.call(rawMap || {}, spec.key) ? rawMap[spec.key] : null;
      if (value === null || value === undefined) writer.remove(spec.key);
      else writer.set(spec.key, String(value));
    });
  }

  function rawMapsEqual(a, b) {
    return STORE_SPECS.every(spec => (a?.[spec.key] ?? null) === (b?.[spec.key] ?? null));
  }

  function sourceRawMapsEqual(a, b) {
    return SOURCE_SPECS.every(spec => (a?.[spec.key] ?? null) === (b?.[spec.key] ?? null));
  }

  function deriveEvidenceFromStorage(storage) {
    const raw = collectRaw(storage);
    const sources = sourceStoresFromRaw(sourceRawMap(raw));
    const derived = Contract.deriveEvidenceShadow(sources);
    if (!derived.ok) return { ...derived, raw, sources };
    const evidenceRaw = Evidence.canonicalStringify(derived.shadow);
    return { ok: true, raw, sources, shadow: derived.shadow, evidenceRaw };
  }

  function ensureEvidenceFresh(storage, writer = defaultWriter(storage), { createIfMissing = false } = {}) {
    const before = storage.getItem(EVIDENCE_KEY);
    if (before === null && !createIfMissing) return { ok: true, missing: true, changed: false, before: null, after: null };

    const derived = deriveEvidenceFromStorage(storage);
    if (!derived.ok) return { ok: false, stage: derived.stage || 'derive', issues: derived.issues || null, before };
    if (before === derived.evidenceRaw) return { ok: true, changed: false, coherent: true, before, after: before, shadow: derived.shadow };

    try {
      writer.set(EVIDENCE_KEY, derived.evidenceRaw);
      const after = storage.getItem(EVIDENCE_KEY);
      if (after !== derived.evidenceRaw) throw new Error('evidence-write-mismatch');
      const validation = validateRawMap(collectRaw(storage), { allowMissing: true, requireEvidenceCoherence: true });
      if (!validation.ok) throw new Error(`evidence-reread-invalid:${validation.issues.map(issue => issue.reason).join(',')}`);
      return { ok: true, changed: true, coherent: true, before, after, shadow: derived.shadow };
    } catch (error) {
      try {
        if (before === null) writer.remove(EVIDENCE_KEY);
        else writer.set(EVIDENCE_KEY, before);
      } catch {}
      return { ok: false, stage: 'write', error, before, rolledBack: storage.getItem(EVIDENCE_KEY) === before };
    }
  }

  function restore(storage, payload, writer = defaultWriter(storage)) {
    const before = collectRaw(storage);
    let plan;
    try { plan = planRestore(payload, before); }
    catch (error) { return { ok: false, error, before, rolledBack: true, migratedFrom: null }; }

    try {
      writeRawMap(storage, plan.targetRaw, writer);
      const after = collectRaw(storage);
      const validation = validateRawMap(after, { allowMissing: true, requireEvidenceCoherence: true });
      if (!validation.ok || !rawMapsEqual(after, plan.targetRaw)) throw new Error('restore-verification-failed');
      return {
        ok: true,
        before,
        after,
        migratedFrom: plan.migratedFrom,
        sourceVersion: plan.sourceVersion,
        preserveMissingIds: plan.preserveMissingIds,
        rebuildDerivedIds: plan.rebuildDerivedIds,
        backup: plan.backup
      };
    } catch (error) {
      try { writeRawMap(storage, before, writer); } catch {}
      return { ok: false, error, before, rolledBack: rawMapsEqual(collectRaw(storage), before), migratedFrom: plan.migratedFrom };
    }
  }

  return Object.freeze({
    FORMAT,
    BACKUP_VERSION,
    STORE_SPECS,
    SOURCE_STORE_SPECS: SOURCE_SPECS,
    SOURCE_STORE_KEYS: Contract.SOURCE_STORE_KEYS,
    EVIDENCE_STORE_KEY: EVIDENCE_KEY,
    specForKey,
    safeParse,
    validateValue,
    validateRaw,
    collectRaw,
    validateRawMap,
    objectsFromRawMap,
    buildBackup,
    normalizeBackup,
    planRestore,
    writeRawMap,
    rawMapsEqual,
    sourceRawMapsEqual,
    deriveEvidenceFromStorage,
    ensureEvidenceFresh,
    restore
  });
});
