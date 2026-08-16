(() => {
  'use strict';

  const params = new URLSearchParams(location.search);
  if (!params.has('b36ShadowSmoke')) return;

  const root = document.documentElement;
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function run() {
    await wait(1200);

    const recovery = window.FrenchTranquilleRecovery;
    const shadow = window.FrenchTranquilleEvidenceShadow;
    const core = window.FrenchTranquilleRecoveryV3Core;
    const contract = window.FrenchTranquilleRecoveryV3Contract;
    const evidenceCore = window.FrenchTranquilleMemoryEvidenceV2;
    if (!recovery || !shadow || !core || !contract || !evidenceCore) throw new Error('b36-runtime-api-missing');

    const evidenceKey = evidenceCore.PROPOSED_STORE_KEY;
    const learnerKey = 'francais-avec-luc:learner:v1';
    const sourceSpecs = core.SOURCE_STORE_SPECS;
    const sourceSnapshot = () => Object.fromEntries(sourceSpecs.map(spec => [spec.key, localStorage.getItem(spec.key)]));
    const sourceEqual = (a, b) => sourceSpecs.every(spec => (a[spec.key] ?? null) === (b[spec.key] ?? null));

    const initialEvidenceRaw = localStorage.getItem(evidenceKey);
    if (!initialEvidenceRaw) throw new Error('b36-shadow-missing');
    const initialEvidence = JSON.parse(initialEvidenceRaw);
    const initialSources = sourceSnapshot();
    const initialFingerprint = initialEvidence.source?.fingerprint || '';

    const runtimeContract = recovery.core.BACKUP_VERSION === 3 && recovery.core.STORE_SPECS.length === 7;
    const initialCoherent = core.validateRawMap(core.collectRaw(localStorage), { allowMissing:true, requireEvidenceCoherence:true }).ok;
    const adoptionStatus = shadow.status();
    const adoptedAtBoot = adoptionStatus.adoptedThisBoot === true;

    const preMigration = recovery.preMigration();
    const preMigrationSafe = Boolean(preMigration) && (preMigration.values?.[evidenceKey] ?? null) === null && preMigration.kind === 'pre-migration';

    const learnerBeforeRaw = localStorage.getItem(learnerKey);
    const learnerProbe = JSON.parse(learnerBeforeRaw || '{}');
    learnerProbe.b36ShadowProbe = Number(learnerProbe.b36ShadowProbe || 0) + 1;
    localStorage.setItem(learnerKey, JSON.stringify(learnerProbe));
    await wait(80);

    const changedEvidence = JSON.parse(localStorage.getItem(evidenceKey) || 'null');
    const refreshedAfterSourceWrite = Boolean(changedEvidence?.source?.fingerprint) && changedEvidence.source.fingerprint !== initialFingerprint && shadow.coherent();

    localStorage.setItem(learnerKey, learnerBeforeRaw);
    await wait(80);
    const restoredEvidenceRaw = localStorage.getItem(evidenceKey);
    const sourcesRestored = sourceEqual(initialSources, sourceSnapshot());
    const shadowRestored = restoredEvidenceRaw === initialEvidenceRaw && shadow.coherent();

    const blockedBefore = Number(recovery.status().blockedWrites || 0);
    const quarantineBefore = Number(recovery.status().quarantineCount || 0);
    localStorage.setItem(evidenceKey, '{broken-json');
    await wait(20);
    const corruptWriteBlocked = localStorage.getItem(evidenceKey) === initialEvidenceRaw && Number(recovery.status().blockedWrites || 0) > blockedBefore && Number(recovery.status().quarantineCount || 0) > quarantineBefore;

    const backup = recovery.backupObject();
    const backupIds = Object.keys(backup.stores || {}).sort().join(',');
    const expectedIds = core.STORE_SPECS.map(spec => spec.id).sort().join(',');
    const backupCoherent = backup.version === 3 && backupIds === expectedIds && contract.validateEvidenceShadow(backup.stores.evidence, { sources:backup.stores, requireCoherence:true }).ok;

    recovery.saveLastGood('b36-shadow-smoke');
    await wait(20);
    const lastGood = recovery.lastGood();
    const lastGoodHasEvidence = Boolean(lastGood?.values?.[evidenceKey]);
    const lastGoodCoherent = lastGoodHasEvidence && core.validateRawMap(lastGood.values, { allowMissing:true, requireEvidenceCoherence:true }).ok;

    const noProductSourceMutation = sourceEqual(initialSources, sourceSnapshot());

    root.dataset.b36ShadowSmokeDone = '1';
    root.dataset.b36ShadowRuntimeContract = runtimeContract ? '1' : '0';
    root.dataset.b36ShadowInitialCoherent = initialCoherent ? '1' : '0';
    root.dataset.b36ShadowAdoptedAtBoot = adoptedAtBoot ? '1' : '0';
    root.dataset.b36ShadowPreMigration = preMigrationSafe ? '1' : '0';
    root.dataset.b36ShadowRefresh = refreshedAfterSourceWrite ? '1' : '0';
    root.dataset.b36ShadowRestore = sourcesRestored && shadowRestored ? '1' : '0';
    root.dataset.b36ShadowCorruptBlocked = corruptWriteBlocked ? '1' : '0';
    root.dataset.b36ShadowBackupV3 = backupCoherent ? '1' : '0';
    root.dataset.b36ShadowLastGood = lastGoodCoherent ? '1' : '0';
    root.dataset.b36ShadowSourcesUntouched = noProductSourceMutation ? '1' : '0';
  }

  const fail = error => {
    root.dataset.b36ShadowSmokeDone = '0';
    root.dataset.b36ShadowSmokeError = String(error?.message || error);
  };

  if (document.readyState === 'complete') run().catch(fail);
  else window.addEventListener('load', () => run().catch(fail), { once:true });
})();
