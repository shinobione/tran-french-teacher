(() => {
  'use strict';

  const params = new URLSearchParams(location.search);
  const mode = params.get('b36RecoveryTribunal');
  if (!mode) return;

  const root = document.documentElement;
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const clone = value => JSON.parse(JSON.stringify(value));
  const canonical = value => window.FrenchTranquilleMemoryEvidenceV2?.canonicalStringify?.(value) || JSON.stringify(value);

  const mark = (name, value) => { root.dataset[`b36t${name}`] = String(value); };

  const waitFor = async (predicate, timeout = 12000) => {
    const started = performance.now();
    while (performance.now() - started < timeout) {
      try { if (predicate()) return true; } catch {}
      await wait(50);
    }
    return false;
  };

  async function api() {
    const ready = await waitFor(() => (
      window.FrenchTranquilleRecovery &&
      window.FrenchTranquilleRecoveryV3Core &&
      window.FrenchTranquilleRecoveryV3Contract &&
      window.FrenchTranquilleMemoryEvidenceV2 &&
      window.FrenchTranquilleEvidenceShadow
    ));
    if (!ready) throw new Error('b36t-api-missing');
    return {
      recovery: window.FrenchTranquilleRecovery,
      core: window.FrenchTranquilleRecoveryV3Core,
      contract: window.FrenchTranquilleRecoveryV3Contract,
      evidence: window.FrenchTranquilleMemoryEvidenceV2,
      shadow: window.FrenchTranquilleEvidenceShadow
    };
  }

  function sourceObjects(core) {
    const raw = core.collectRaw(localStorage);
    const stores = {};
    core.SOURCE_STORE_SPECS.forEach(spec => {
      const value = raw[spec.key];
      stores[spec.id] = value === null ? null : JSON.parse(value);
    });
    return stores;
  }

  function sourceBytes(core) {
    return Object.fromEntries(core.SOURCE_STORE_SPECS.map(spec => [spec.key, localStorage.getItem(spec.key)]));
  }

  function sourceEqual(core, a, b) {
    return core.SOURCE_STORE_SPECS.every(spec => (a?.[spec.key] ?? null) === (b?.[spec.key] ?? null));
  }

  function evidenceCoherent(core) {
    return core.validateRawMap(core.collectRaw(localStorage), { allowMissing:true, requireEvidenceCoherence:true }).ok;
  }

  function expectedIds(core) {
    return core.STORE_SPECS.map(spec => spec.id).sort().join(',');
  }

  function legacyV2Backup(recovery, sourceStores) {
    return recovery.legacyCore.buildBackup({
      getItem(key) {
        const spec = recovery.legacyCore.specForKey(key);
        const value = spec ? sourceStores[spec.id] : null;
        return value === null || value === undefined ? null : JSON.stringify(value);
      }
    }, { version:'2.3.0', build:34 });
  }

  function semanticStoreEqual(a, b) {
    return canonical(a) === canonical(b);
  }

  async function runAdopt({ reopen = false } = {}) {
    const { recovery, core, shadow } = await api();
    await wait(120);
    const raw = core.collectRaw(localStorage);
    const status = shadow.status();
    const preMigration = recovery.preMigration();
    const evidenceRaw = localStorage.getItem(core.EVIDENCE_STORE_KEY);
    const backup = recovery.backupObject();
    const allSeven = Object.keys(backup.stores || {}).sort().join(',') === expectedIds(core);
    const lifecycle = reopen
      ? status.existingAtBoot === true && status.adoptedThisBoot === false
      : status.existingAtBoot === false && status.adoptedThisBoot === true;
    const snapshotSafe = reopen
      ? true
      : Boolean(preMigration) && (preMigration.values?.[core.EVIDENCE_STORE_KEY] ?? null) === null;

    mark('Mode', reopen ? 'reopen' : 'adopt');
    mark('Done', 1);
    mark('SevenStores', core.STORE_SPECS.length === 7 ? 1 : 0);
    mark('BackupV3', backup.version === 3 && allSeven ? 1 : 0);
    mark('EvidencePresent', evidenceRaw ? 1 : 0);
    mark('Coherent', evidenceCoherent(core) ? 1 : 0);
    mark('Lifecycle', lifecycle ? 1 : 0);
    mark('PreMigration', snapshotSafe ? 1 : 0);
    mark('SourceCount', core.SOURCE_STORE_SPECS.length);
    mark('RawValid', core.validateRawMap(raw,{allowMissing:true,requireEvidenceCoherence:true}).ok ? 1 : 0);
  }

  async function runCorruptBoot() {
    const { recovery, core, shadow } = await api();
    await wait(150);
    const status = recovery.status();
    const repairedEvidence = (status.repairedAtBoot || []).some(entry => entry.key === core.EVIDENCE_STORE_KEY);
    const quarantine = Number(status.quarantineCount || 0) >= 1;
    mark('Mode','corrupt');
    mark('Done',1);
    mark('RepairedEvidence',repairedEvidence ? 1 : 0);
    mark('Quarantined',quarantine ? 1 : 0);
    mark('Coherent',evidenceCoherent(core) && shadow.coherent() ? 1 : 0);
    mark('EvidencePresent',localStorage.getItem(core.EVIDENCE_STORE_KEY) ? 1 : 0);
  }

  async function runRestoreSuite() {
    const { recovery, core, contract, shadow } = await api();
    await wait(120);
    if (!evidenceCoherent(core)) throw new Error('baseline-not-coherent');

    // Canonical v3 baseline used to restore the synthetic profile between subtests.
    const baselineBackup = recovery.backupObject();
    const baselinePlan = core.planRestore(baselineBackup, core.collectRaw(localStorage));
    const baselineSources = clone(baselineBackup.stores);
    delete baselineSources.evidence;

    // v3 round-trip: mutate source truth, then restore the exact seven-store backup.
    const learnerKey = core.SOURCE_STORE_SPECS.find(spec => spec.id === 'learner').key;
    const learnerMutated = JSON.parse(localStorage.getItem(learnerKey));
    learnerMutated.conversationWins = 999;
    localStorage.setItem(learnerKey, JSON.stringify(learnerMutated));
    await wait(120);
    const v3Result = recovery.restoreObject(baselineBackup,{reload:false});
    await wait(80);
    const v3Exact = v3Result.ok && core.rawMapsEqual(core.collectRaw(localStorage), baselinePlan.targetRaw) && evidenceCoherent(core);

    // v2 restore owns the six historical stores and must rebuild Evidence.
    const v2Payload = legacyV2Backup(recovery, baselineSources);
    const foreignLearner = JSON.parse(localStorage.getItem(learnerKey));
    foreignLearner.conversationWins = 321;
    localStorage.setItem(learnerKey, JSON.stringify(foreignLearner));
    await wait(100);
    const foreignEvidence = localStorage.getItem(core.EVIDENCE_STORE_KEY);
    const v2Result = recovery.restoreObject(v2Payload,{reload:false});
    await wait(80);
    const v2Stores = sourceObjects(core);
    const v2SourcesExact = core.SOURCE_STORE_SPECS.every(spec => semanticStoreEqual(v2Stores[spec.id], baselineSources[spec.id]));
    const v2Rebuilt = v2Result.ok && v2Result.migratedFrom === 2 && (v2Result.rebuildDerivedIds || []).includes('evidence') && localStorage.getItem(core.EVIDENCE_STORE_KEY) !== foreignEvidence && v2SourcesExact && evidenceCoherent(core);

    // v1 owns learner+memory only; later historical stores survive, Evidence never does.
    const current = sourceObjects(core);
    current.errors = clone(current.errors); current.errors.totals.errors = Number(current.errors.totals.errors || 0) + 41;
    current.scenarios = clone(current.scenarios); current.scenarios.totalCompletions = Number(current.scenarios.totalCompletions || 0) + 7;
    current.listening = clone(current.listening); current.listening.totals.attempts = Number(current.listening.totals.attempts || 0) + 13;
    current.milestones = clone(current.milestones); current.milestones.seen['v1-preserve-probe'] = true;
    for (const id of ['errors','scenarios','listening','milestones']) {
      const spec = core.SOURCE_STORE_SPECS.find(entry => entry.id === id);
      localStorage.setItem(spec.key, JSON.stringify(current[id]));
    }
    await wait(120);
    const preserved = Object.fromEntries(['errors','scenarios','listening','milestones'].map(id => [id, clone(current[id])]));
    const evidenceBeforeV1 = localStorage.getItem(core.EVIDENCE_STORE_KEY);
    const v1Payload = {
      format:'french-tranquille-backup',
      version:1,
      exportedAt:'2026-08-12T00:00:00.000Z',
      learner:clone(baselineSources.learner),
      memory:clone(baselineSources.memory)
    };
    const v1Result = recovery.restoreObject(v1Payload,{reload:false});
    await wait(80);
    const afterV1 = sourceObjects(core);
    const v1Preserved = ['errors','scenarios','listening','milestones'].every(id => semanticStoreEqual(afterV1[id], preserved[id]));
    const v1Owned = semanticStoreEqual(afterV1.learner, baselineSources.learner) && semanticStoreEqual(afterV1.memory, baselineSources.memory);
    const expectedPreserve = ['errors','scenarios','listening','milestones'].sort().join(',');
    const actualPreserve = [...(v1Result.preserveMissingIds || [])].sort().join(',');
    const v1Rebuilt = v1Result.ok && v1Result.migratedFrom === 1 && actualPreserve === expectedPreserve && (v1Result.rebuildDerivedIds || []).includes('evidence') && localStorage.getItem(core.EVIDENCE_STORE_KEY) !== evidenceBeforeV1 && v1Preserved && v1Owned && evidenceCoherent(core);

    // Return to exact baseline before fault/reset tests.
    const baselineRestore = recovery.restoreObject(baselineBackup,{reload:false});
    await wait(80);
    if (!baselineRestore.ok || !evidenceCoherent(core)) throw new Error('baseline-restore-failed');

    // Inject one write failure mid-restore. Same writer becomes healthy for rollback.
    const targetSources = clone(baselineSources);
    targetSources.learner.conversationWins = 777;
    const targetBackup = contract.buildBackupV3(targetSources,{version:'2.4.0',build:36},{exportedAt:'2026-08-16T02:00:00.000Z'});
    const beforeFault = core.collectRaw(localStorage);
    let writes = 0;
    let injected = false;
    const faultWriter = {
      set(key,value) {
        writes += 1;
        if (!injected && writes === 3) { injected = true; throw new Error('b36-injected-write-failure'); }
        localStorage.setItem(key,value);
      },
      remove(key) { localStorage.removeItem(key); }
    };
    const faultResult = core.restore(localStorage,targetBackup,faultWriter);
    await wait(140);
    shadow.refresh('b36-tribunal-post-fault');
    await wait(80);
    const faultRollback = faultResult.ok === false && faultResult.rolledBack === true && core.rawMapsEqual(core.collectRaw(localStorage), beforeFault) && evidenceCoherent(core);

    // Reset must remove all seven, own a pre-reset snapshot, then restore cleanly.
    const beforeResetBackup = recovery.backupObject();
    const beforeResetEvidence = localStorage.getItem(core.EVIDENCE_STORE_KEY);
    localStorage.removeItem(learnerKey);
    await wait(80);
    const allSevenCleared = core.STORE_SPECS.every(spec => localStorage.getItem(spec.key) === null);
    const preReset = recovery.preReset();
    const resetSnapshotHasEvidence = Boolean(preReset?.values?.[core.EVIDENCE_STORE_KEY] || beforeResetEvidence === null);
    const resetRestore = recovery.restoreObject(beforeResetBackup,{reload:false});
    await wait(100);
    const resetRoundTrip = allSevenCleared && resetSnapshotHasEvidence && resetRestore.ok && evidenceCoherent(core);

    // Final semantic source truth must match baseline again.
    const finalRestore = recovery.restoreObject(baselineBackup,{reload:false});
    await wait(80);
    const finalSources = sourceObjects(core);
    const finalBaseline = core.SOURCE_STORE_SPECS.every(spec => semanticStoreEqual(finalSources[spec.id], baselineSources[spec.id])) && evidenceCoherent(core);

    mark('Mode','restore');
    mark('Done',1);
    mark('V3RoundTrip',v3Exact ? 1 : 0);
    mark('V2Rebuild',v2Rebuilt ? 1 : 0);
    mark('V1PreserveRebuild',v1Rebuilt ? 1 : 0);
    mark('FaultRollback',faultRollback ? 1 : 0);
    mark('ResetSeven',resetRoundTrip ? 1 : 0);
    mark('FinalBaseline',finalBaseline ? 1 : 0);
    mark('Coherent',evidenceCoherent(core) ? 1 : 0);
  }

  async function runPwa({ offline = false } = {}) {
    const { recovery, core, shadow } = await api();
    await wait(150);
    if (!offline) localStorage.setItem('french-tranquille:b36:pwa-persist','persisted');
    const persisted = localStorage.getItem('french-tranquille:b36:pwa-persist') === 'persisted';
    const swControlled = Boolean(navigator.serviceWorker?.controller || (await navigator.serviceWorker?.getRegistration?.()));
    mark('Mode',offline ? 'pwa-offline' : 'pwa-online');
    mark('Done',1);
    mark('Persisted',persisted ? 1 : 0);
    mark('Coherent',evidenceCoherent(core) && shadow.coherent() ? 1 : 0);
    mark('BackupV3',recovery.backupObject().version === 3 ? 1 : 0);
    mark('ServiceWorker',swControlled ? 1 : 0);
  }

  const fail = error => {
    mark('Done',0);
    mark('Error',error?.message || String(error));
  };

  const dispatch = async () => {
    if (mode === 'adopt') return runAdopt({reopen:false});
    if (mode === 'reopen') return runAdopt({reopen:true});
    if (mode === 'corrupt') return runCorruptBoot();
    if (mode === 'restore') return runRestoreSuite();
    if (mode === 'pwa') return runPwa({offline:false});
    if (mode === 'pwa-offline') return runPwa({offline:true});
    throw new Error(`unknown-tribunal-mode:${mode}`);
  };

  if (document.readyState === 'complete') dispatch().catch(fail);
  else window.addEventListener('load',() => dispatch().catch(fail),{once:true});
})();
