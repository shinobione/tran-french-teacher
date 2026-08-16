(() => {
  'use strict';
  const params = new URLSearchParams(location.search);
  if (params.get('b28Smoke') !== 'recovery') return;

  const root = document.documentElement;
  const LEARNER_KEY = 'francais-avec-luc:learner:v1';
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function run() {
    await wait(900);
    const recovery = window.FrenchTranquilleRecovery;
    if (!recovery) {
      root.dataset.b28SmokeDone = '0';
      root.dataset.b28Error = 'recovery-api-missing';
      return;
    }

    const originalLearner = localStorage.getItem(LEARNER_KEY);
    const originalStatus = recovery.status();

    localStorage.setItem(LEARNER_KEY, '{broken-json');
    const guardPreserved = localStorage.getItem(LEARNER_KEY) === originalLearner;
    const blockedDelta = Number(recovery.status().blockedWrites || 0) - Number(originalStatus.blockedWrites || 0);

    const backup = recovery.backupObject();
    const backupIds = Object.keys(backup.stores || {}).sort().join(',');
    const expectedIds = recovery.core.STORE_SPECS.map(spec => spec.id).sort().join(',');

    const mutated = JSON.parse(originalLearner || '{}');
    mutated.conversationWins = 999;
    localStorage.setItem(LEARNER_KEY, JSON.stringify(mutated));
    const restoreResult = recovery.restoreObject(backup, { reload: false });
    const restoredLearner = localStorage.getItem(LEARNER_KEY);

    const legacyPayload = {
      format: 'french-tranquille-backup',
      version: 1,
      exportedAt: '2026-08-12T00:00:00.000Z',
      learner: backup.stores.learner,
      memory: backup.stores.memory
    };
    const migrated = recovery.core.normalizeBackup(legacyPayload);
    const legacyVersionOk = migrated.migratedFrom === 1 && migrated.backup.version === recovery.core.BACKUP_VERSION;
    const successorDerivedOk = recovery.core.BACKUP_VERSION < 3 || (migrated.rebuildDerivedIds || []).includes('evidence');

    const beforeReset = recovery.backupObject();
    localStorage.removeItem(LEARNER_KEY);
    const allCleared = recovery.core.STORE_SPECS.every(spec => localStorage.getItem(spec.key) === null);
    const resetSnapshotPresent = Boolean(recovery.preReset());
    const resetRestore = recovery.restoreObject(beforeReset, { reload: false });

    const learner = JSON.parse(localStorage.getItem(LEARNER_KEY) || '{}');
    const lesson8Preserved = (learner.completedLessons || []).length === 7 && Number(learner.lessonProgress?.l8 || 0) === 4;

    root.dataset.b28SmokeDone = '1';
    root.dataset.b28GuardPreserved = guardPreserved ? '1' : '0';
    root.dataset.b28BlockedWrite = blockedDelta >= 1 ? '1' : '0';
    root.dataset.b28BackupComplete = backupIds === expectedIds ? '1' : '0';
    root.dataset.b28RestoreOk = restoreResult.ok && restoredLearner === originalLearner ? '1' : '0';
    root.dataset.b28LegacyMigration = legacyVersionOk && successorDerivedOk ? '1' : '0';
    root.dataset.b28ResetAtomic = allCleared && resetSnapshotPresent ? '1' : '0';
    root.dataset.b28ResetRestore = resetRestore.ok && lesson8Preserved ? '1' : '0';
    root.dataset.b28Quarantine = recovery.status().quarantineCount >= 1 ? '1' : '0';
    root.dataset.b28RecoveryVersion = String(recovery.core.BACKUP_VERSION || '');
  }

  if (document.readyState === 'complete') run().catch(error => {
    root.dataset.b28SmokeDone = '0';
    root.dataset.b28Error = String(error?.message || error);
  });
  else window.addEventListener('load', () => run().catch(error => {
    root.dataset.b28SmokeDone = '0';
    root.dataset.b28Error = String(error?.message || error);
  }), { once: true });
})();
