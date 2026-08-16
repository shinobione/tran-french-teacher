(() => {
  'use strict';

  const Recovery = window.FrenchTranquilleRecovery;
  const Core = window.FrenchTranquilleRecoveryV3Core;
  if (!Recovery || !Core || typeof Storage === 'undefined' || !window.localStorage) return;

  const EVIDENCE_KEY = Core.EVIDENCE_STORE_KEY;
  const SOURCE_KEYS = new Set(Core.SOURCE_STORE_KEYS || []);
  const previousSetItem = Storage.prototype.setItem;
  const previousRemoveItem = Storage.prototype.removeItem;
  const params = new URLSearchParams(location.search);

  const runtimeStatus = {
    version: '2.4.0-b36.2',
    role: 'derived-shadow',
    adoptedThisBoot: false,
    existingAtBoot: localStorage.getItem(EVIDENCE_KEY) !== null,
    refreshes: 0,
    writes: 0,
    lastReason: null,
    lastError: null,
    lastFingerprint: null
  };

  let refreshScheduled = false;
  let refreshing = false;
  let refreshAgain = false;

  function sourceSnapshot() {
    return Object.fromEntries((Core.SOURCE_STORE_SPECS || []).map(spec => [spec.key, localStorage.getItem(spec.key)]));
  }

  function sourcesEqual(a, b) {
    return (Core.SOURCE_STORE_SPECS || []).every(spec => (a?.[spec.key] ?? null) === (b?.[spec.key] ?? null));
  }

  function allSourcesMissing() {
    return (Core.SOURCE_STORE_SPECS || []).every(spec => localStorage.getItem(spec.key) === null);
  }

  function restoreEvidenceRaw(raw) {
    try {
      if (raw === null) previousRemoveItem.call(localStorage, EVIDENCE_KEY);
      else previousSetItem.call(localStorage, EVIDENCE_KEY, raw);
      return localStorage.getItem(EVIDENCE_KEY) === raw;
    } catch {
      return false;
    }
  }

  function markSmoke(result) {
    if (!params.has('b36ShadowSmoke')) return;
    const root = document.documentElement;
    root.dataset.b36ShadowRuntime = '1';
    root.dataset.b36ShadowAdopted = localStorage.getItem(EVIDENCE_KEY) ? '1' : '0';
    root.dataset.b36ShadowCoherent = result?.ok && result?.coherent ? '1' : '0';
    root.dataset.b36ShadowSourcesStable = result?.sourceStable === false ? '0' : '1';
    root.dataset.b36ShadowError = runtimeStatus.lastError || '';
  }

  function refresh(reason = 'source-change', { initial = false } = {}) {
    if (refreshing) {
      refreshAgain = true;
      return { ok: true, deferred: true };
    }

    refreshing = true;
    runtimeStatus.lastReason = reason;
    runtimeStatus.lastError = null;
    const beforeSources = sourceSnapshot();
    const beforeEvidence = localStorage.getItem(EVIDENCE_KEY);
    const needsInitialAdoption = initial && beforeEvidence === null;

    try {
      if (allSourcesMissing()) {
        if (beforeEvidence !== null) previousRemoveItem.call(localStorage, EVIDENCE_KEY);
        const emptyResult = { ok: true, changed: beforeEvidence !== null, coherent: true, sourceStable: true, empty: true };
        markSmoke(emptyResult);
        return emptyResult;
      }

      if (needsInitialAdoption) {
        Recovery.capturePreMigration?.({
          reason: 'memory-evidence-v2-shadow-adoption',
          targetBackupVersion: Core.BACKUP_VERSION,
          proposedStoreKey: EVIDENCE_KEY
        });
      }

      const result = Core.ensureEvidenceFresh(localStorage, undefined, { createIfMissing: true });
      const afterSources = sourceSnapshot();
      const sourceStable = sourcesEqual(beforeSources, afterSources);
      if (!result.ok || !sourceStable) {
        if (needsInitialAdoption && Recovery.keys?.preMigration) {
          const rollback = Recovery.restoreSnapshot?.(Recovery.keys.preMigration, { reload: false });
          if (!rollback?.ok) restoreEvidenceRaw(beforeEvidence);
        } else {
          restoreEvidenceRaw(beforeEvidence);
        }
        throw new Error(!result.ok ? `evidence-refresh-failed:${result.stage || 'unknown'}` : 'evidence-source-drift');
      }

      const raw = Core.collectRaw(localStorage);
      const validation = Core.validateRawMap(raw, { allowMissing: true, requireEvidenceCoherence: true });
      if (!validation.ok) {
        if (needsInitialAdoption && Recovery.keys?.preMigration) {
          const rollback = Recovery.restoreSnapshot?.(Recovery.keys.preMigration, { reload: false });
          if (!rollback?.ok) restoreEvidenceRaw(beforeEvidence);
        } else {
          restoreEvidenceRaw(beforeEvidence);
        }
        throw new Error(`evidence-coherence-failed:${validation.issues.map(issue => issue.reason).join(',')}`);
      }

      runtimeStatus.refreshes += 1;
      if (result.changed) runtimeStatus.writes += 1;
      runtimeStatus.adoptedThisBoot = runtimeStatus.adoptedThisBoot || needsInitialAdoption;
      runtimeStatus.lastFingerprint = result.shadow?.source?.fingerprint || null;
      if (needsInitialAdoption) Recovery.saveLastGood?.('evidence-v2-shadow-adopted');
      const success = { ...result, sourceStable: true };
      markSmoke(success);
      return success;
    } catch (error) {
      runtimeStatus.lastError = String(error?.message || error);
      const failed = { ok: false, error, sourceStable: sourcesEqual(beforeSources, sourceSnapshot()) };
      markSmoke(failed);
      console.warn(`[French Trân'quille] Evidence shadow refresh failed: ${runtimeStatus.lastError}`);
      return failed;
    } finally {
      refreshing = false;
      if (refreshAgain) {
        refreshAgain = false;
        scheduleRefresh('coalesced-follow-up');
      }
    }
  }

  function scheduleRefresh(reason = 'source-change') {
    runtimeStatus.lastReason = reason;
    if (refreshScheduled) return;
    refreshScheduled = true;
    queueMicrotask(() => {
      refreshScheduled = false;
      refresh(reason);
    });
  }

  Storage.prototype.setItem = function (key, value) {
    const watchesSource = this === localStorage && SOURCE_KEYS.has(String(key));
    const before = watchesSource ? localStorage.getItem(key) : null;
    const result = previousSetItem.call(this, key, value);
    if (watchesSource && localStorage.getItem(key) !== before) scheduleRefresh(`set:${key}`);
    return result;
  };

  Storage.prototype.removeItem = function (key) {
    const watchesSource = this === localStorage && SOURCE_KEYS.has(String(key));
    const before = watchesSource ? localStorage.getItem(key) : null;
    const result = previousRemoveItem.call(this, key);
    if (watchesSource && localStorage.getItem(key) !== before) {
      if (allSourcesMissing() && localStorage.getItem(EVIDENCE_KEY) === null) return result;
      scheduleRefresh(`remove:${key}`);
    }
    return result;
  };

  const initialResult = refresh('boot-adoption', { initial: true });

  window.FrenchTranquilleEvidenceShadow = Object.freeze({
    version: runtimeStatus.version,
    key: EVIDENCE_KEY,
    role: runtimeStatus.role,
    refresh: reason => refresh(reason || 'manual'),
    status: () => ({ ...runtimeStatus }),
    coherent: () => Core.validateRawMap(Core.collectRaw(localStorage), { allowMissing: true, requireEvidenceCoherence: true }).ok,
    initialResult: () => ({ ...initialResult })
  });
})();
