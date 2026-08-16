(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.FrenchTranquilleMemoryEvidenceV2MigrationSim = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const SIM_QUARANTINE_KEY = 'french-tranquille:recovery:quarantine:v1';
  const MAX_QUARANTINE_RAW = 100000;
  const SANDBOX_MARKER = '__ftEvidenceMigrationSandbox';

  function createSandboxStorage(seed = {}) {
    const values = new Map();
    Object.entries(seed || {}).forEach(([key, value]) => {
      if (value !== null && value !== undefined) values.set(String(key), String(value));
    });
    const storage = {
      getItem(key) { return values.has(String(key)) ? values.get(String(key)) : null; },
      setItem(key, value) { values.set(String(key), String(value)); },
      removeItem(key) { values.delete(String(key)); },
      clear() { values.clear(); },
      key(index) { return [...values.keys()][Number(index)] ?? null; },
      get length() { return values.size; },
      dump() { return Object.fromEntries([...values.entries()].sort(([a], [b]) => a.localeCompare(b))); }
    };
    Object.defineProperty(storage, SANDBOX_MARKER, { value: true, enumerable: false });
    return storage;
  }

  function requireApis(recovery, evidence) {
    if (!recovery || !Array.isArray(recovery.STORE_SPECS) || typeof recovery.collectRaw !== 'function' ||
        typeof recovery.validateRawMap !== 'function' || typeof recovery.objectsFromRawMap !== 'function' ||
        typeof recovery.rawMapsEqual !== 'function' || typeof recovery.normalizeBackup !== 'function') {
      throw new Error('recovery-core-required');
    }
    if (!evidence || !evidence.PROPOSED_STORE_KEY || typeof evidence.simulate !== 'function' ||
        typeof evidence.canonicalStringify !== 'function') {
      throw new Error('evidence-v2-core-required');
    }
  }

  function requireSandbox(storage) {
    if (!storage || storage[SANDBOX_MARKER] !== true || typeof storage.getItem !== 'function' ||
        typeof storage.setItem !== 'function' || typeof storage.removeItem !== 'function') {
      throw new Error('sandbox-required');
    }
  }

  function capture(storage, recovery, evidence) {
    return {
      sources: recovery.collectRaw(storage),
      targetRaw: storage.getItem(evidence.PROPOSED_STORE_KEY),
      quarantineRaw: storage.getItem(SIM_QUARANTINE_KEY)
    };
  }

  function restore(storage, recovery, evidence, snapshot) {
    recovery.STORE_SPECS.forEach(spec => {
      const raw = snapshot.sources?.[spec.key] ?? null;
      if (raw === null) storage.removeItem(spec.key);
      else storage.setItem(spec.key, raw);
    });
    if (snapshot.targetRaw === null || snapshot.targetRaw === undefined) storage.removeItem(evidence.PROPOSED_STORE_KEY);
    else storage.setItem(evidence.PROPOSED_STORE_KEY, snapshot.targetRaw);
    if (snapshot.quarantineRaw === null || snapshot.quarantineRaw === undefined) storage.removeItem(SIM_QUARANTINE_KEY);
    else storage.setItem(SIM_QUARANTINE_KEY, snapshot.quarantineRaw);
  }

  function snapshotEqual(storage, recovery, evidence, snapshot) {
    return recovery.rawMapsEqual(recovery.collectRaw(storage), snapshot.sources) &&
      storage.getItem(evidence.PROPOSED_STORE_KEY) === (snapshot.targetRaw ?? null) &&
      storage.getItem(SIM_QUARANTINE_KEY) === (snapshot.quarantineRaw ?? null);
  }

  function quarantineRecords(validation, rawMap) {
    return (validation?.issues || []).map(issue => ({
      sourceStore: issue.id || null,
      key: issue.key || null,
      reason: issue.reason || 'invalid-source',
      raw: String(rawMap?.[issue.key] ?? '').slice(0, MAX_QUARANTINE_RAW),
      simulation: true
    }));
  }

  function writeQuarantine(storage, records) {
    let existing = [];
    try {
      const parsed = JSON.parse(storage.getItem(SIM_QUARANTINE_KEY) || '[]');
      if (Array.isArray(parsed)) existing = parsed;
    } catch {}
    storage.setItem(SIM_QUARANTINE_KEY, JSON.stringify([...existing, ...records]));
    return records.length > 0;
  }

  function projectionQuarantineRecords(projection, recovery, rawMap) {
    const byId = Object.fromEntries(recovery.STORE_SPECS.map(spec => [spec.id, spec]));
    return (projection?.diagnostics?.quarantineCandidates || []).map(issue => {
      const spec = byId[issue.sourceStore];
      return {
        sourceStore: issue.sourceStore || null,
        key: spec?.key || null,
        reason: issue.code || 'projection-rejected-source',
        raw: String(spec ? rawMap?.[spec.key] ?? '' : '').slice(0, MAX_QUARANTINE_RAW),
        simulation: true
      };
    });
  }

  function simulateTransaction({ storage, recovery, evidence, projectionOptions = {}, fault = null } = {}) {
    requireApis(recovery, evidence);
    requireSandbox(storage);
    const before = capture(storage, recovery, evidence);
    const resultBase = {
      mode: 'isolated-transaction-simulation',
      targetKey: evidence.PROPOSED_STORE_KEY,
      fault: fault || null,
      committedInSandbox: false,
      verified: false,
      rolledBack: false,
      sourceUntouched: false,
      targetRestored: false,
      quarantined: false,
      quarantineRecords: []
    };

    try {
      const validation = recovery.validateRawMap(before.sources, { allowMissing: true });
      if (!validation.ok) {
        const records = quarantineRecords(validation, before.sources);
        writeQuarantine(storage, records);
        restore(storage, recovery, evidence, before);
        const rolledBack = snapshotEqual(storage, recovery, evidence, before);
        return {
          ...resultBase,
          ok: false,
          stage: 'source-validation',
          rolledBack,
          sourceUntouched: recovery.rawMapsEqual(recovery.collectRaw(storage), before.sources),
          targetRestored: storage.getItem(evidence.PROPOSED_STORE_KEY) === (before.targetRaw ?? null),
          quarantined: records.length > 0,
          quarantineRecords: records,
          validation
        };
      }

      const stores = recovery.objectsFromRawMap(before.sources);
      const projection = evidence.simulate(stores, projectionOptions);
      if (!projection.ok || !projection.proposal) {
        const records = projectionQuarantineRecords(projection, recovery, before.sources);
        if (records.length) writeQuarantine(storage, records);
        restore(storage, recovery, evidence, before);
        const rolledBack = snapshotEqual(storage, recovery, evidence, before);
        return {
          ...resultBase,
          ok: false,
          stage: 'projection',
          rolledBack,
          sourceUntouched: recovery.rawMapsEqual(recovery.collectRaw(storage), before.sources),
          targetRestored: storage.getItem(evidence.PROPOSED_STORE_KEY) === (before.targetRaw ?? null),
          quarantined: records.length > 0,
          quarantineRecords: records,
          projection
        };
      }

      const targetRaw = evidence.canonicalStringify(projection.proposal);
      storage.setItem(evidence.PROPOSED_STORE_KEY, targetRaw);
      resultBase.committedInSandbox = true;

      if (fault === 'after-write') throw new Error('injected-after-write');
      if (fault === 'corrupt-target') storage.setItem(evidence.PROPOSED_STORE_KEY, '{broken-json');
      if (fault === 'source-drift') {
        const first = recovery.STORE_SPECS[0];
        storage.setItem(first.key, '{"schemaVersion":999}');
      }

      const rereadRaw = storage.getItem(evidence.PROPOSED_STORE_KEY);
      let reread;
      try { reread = JSON.parse(rereadRaw || 'null'); }
      catch { throw new Error('target-reread-invalid-json'); }
      const targetMatches = evidence.canonicalStringify(reread) === targetRaw;
      const sourcesStillMatch = recovery.rawMapsEqual(recovery.collectRaw(storage), before.sources);
      if (!targetMatches || !sourcesStillMatch) throw new Error('transaction-verification-failed');
      resultBase.verified = true;

      restore(storage, recovery, evidence, before);
      const rolledBack = snapshotEqual(storage, recovery, evidence, before);
      return {
        ...resultBase,
        ok: Boolean(rolledBack),
        stage: rolledBack ? 'rolled-back' : 'rollback-verification',
        rolledBack,
        sourceUntouched: recovery.rawMapsEqual(recovery.collectRaw(storage), before.sources),
        targetRestored: storage.getItem(evidence.PROPOSED_STORE_KEY) === (before.targetRaw ?? null),
        projection,
        rereadMatched: targetMatches
      };
    } catch (error) {
      try { restore(storage, recovery, evidence, before); } catch {}
      const rolledBack = snapshotEqual(storage, recovery, evidence, before);
      return {
        ...resultBase,
        ok: false,
        stage: 'transaction-error',
        error: String(error?.message || error),
        rolledBack,
        sourceUntouched: recovery.rawMapsEqual(recovery.collectRaw(storage), before.sources),
        targetRestored: storage.getItem(evidence.PROPOSED_STORE_KEY) === (before.targetRaw ?? null)
      };
    }
  }

  function rawMapFromNormalizedBackup(normalized, recovery) {
    const rawMap = {};
    recovery.STORE_SPECS.forEach(spec => {
      const value = normalized.backup.stores?.[spec.id] ?? null;
      rawMap[spec.key] = value === null ? null : JSON.stringify(value);
    });
    return rawMap;
  }

  function simulateBackupTransaction(payload, { recovery, evidence, projectionOptions = {}, fault = null } = {}) {
    requireApis(recovery, evidence);
    let normalized;
    try { normalized = recovery.normalizeBackup(payload); }
    catch (error) {
      return {
        ok: false,
        stage: 'backup-normalization',
        error: String(error?.message || error),
        migratedFrom: null,
        rolledBack: true
      };
    }
    const rawMap = rawMapFromNormalizedBackup(normalized, recovery);
    const storage = createSandboxStorage(rawMap);
    const result = simulateTransaction({ storage, recovery, evidence, projectionOptions, fault });
    return {
      ...result,
      migratedFrom: normalized.migratedFrom ?? null,
      backupVersion: normalized.backup.version,
      preserveMissing: Boolean(normalized.preserveMissing)
    };
  }

  return Object.freeze({
    SIM_QUARANTINE_KEY,
    SANDBOX_MARKER,
    createSandboxStorage,
    simulateTransaction,
    simulateBackupTransaction
  });
});
