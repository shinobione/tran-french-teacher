(() => {
  'use strict';

  const Core = window.FrenchTranquilleRecoveryCore;
  if (!Core || typeof Storage === 'undefined' || !window.localStorage) return;

  const VERSION = '1.21.0';
  const BUILD = 28;
  const DEBUG_KEY = 'tran-french-teacher:debug-fr:v1';
  const LAST_GOOD_KEY = 'french-tranquille:recovery:last-good:v1';
  const PRE_RESTORE_KEY = 'french-tranquille:recovery:pre-restore:v1';
  const PRE_MIGRATION_KEY = 'french-tranquille:recovery:pre-migration:v1';
  const PRE_RESET_KEY = 'french-tranquille:recovery:pre-reset:v1';
  const QUARANTINE_KEY = 'french-tranquille:recovery:quarantine:v1';
  const SNAPSHOT_FORMAT = 'french-tranquille-recovery-snapshot';
  const MAX_QUARANTINE = 8;
  const MAX_QUARANTINE_RAW = 100000;

  const nativeSetItem = Storage.prototype.setItem;
  const nativeRemoveItem = Storage.prototype.removeItem;
  const nativeClear = Storage.prototype.clear;
  const isDebug = () => localStorage.getItem(DEBUG_KEY) === '1';
  const T = (vi, fr) => isDebug() ? fr : vi;
  const nowIso = () => new Date().toISOString();

  const runtimeStatus = {
    repairedAtBoot: [],
    blockedWrites: 0,
    quarantineCount: 0,
    lastRestore: null,
    lastSnapshotAt: null
  };

  function nativeWriter() {
    return {
      set: (key, value) => nativeSetItem.call(localStorage, key, value),
      remove: key => nativeRemoveItem.call(localStorage, key)
    };
  }

  function writeMeta(key, value) {
    try { nativeSetItem.call(localStorage, key, JSON.stringify(value)); return true; }
    catch { return false; }
  }

  function readMeta(key) {
    try { return JSON.parse(localStorage.getItem(key) || 'null'); }
    catch { return null; }
  }

  function snapshotEnvelope(kind, values = Core.collectRaw(localStorage), extra = {}) {
    return {
      format: SNAPSHOT_FORMAT,
      version: 1,
      kind,
      capturedAt: nowIso(),
      app: {
        version: window.FrenchTranquilleBuildMeta?.version || VERSION,
        build: window.FrenchTranquilleBuildMeta?.build || BUILD
      },
      values,
      ...extra
    };
  }

  function snapshot(key, kind, extra = {}) {
    const values = Core.collectRaw(localStorage);
    const validation = Core.validateRawMap(values, { allowMissing: true });
    const envelope = snapshotEnvelope(kind, values, { validation, ...extra });
    if (writeMeta(key, envelope)) runtimeStatus.lastSnapshotAt = envelope.capturedAt;
    return envelope;
  }

  function validSnapshot(key) {
    const snap = readMeta(key);
    if (!snap || snap.format !== SNAPSHOT_FORMAT || !snap.values) return null;
    const validation = Core.validateRawMap(snap.values, { allowMissing: true });
    return validation.ok ? snap : null;
  }

  function saveLastGood(reason = 'runtime') {
    const values = Core.collectRaw(localStorage);
    const validation = Core.validateRawMap(values, { allowMissing: true });
    if (!validation.ok) return false;
    return writeMeta(LAST_GOOD_KEY, snapshotEnvelope('last-good', values, { reason }));
  }

  let lastGoodScheduled = false;
  function scheduleLastGood(reason = 'runtime-write') {
    if (lastGoodScheduled) return;
    lastGoodScheduled = true;
    queueMicrotask(() => {
      lastGoodScheduled = false;
      saveLastGood(reason);
    });
  }

  function quarantine(key, raw, reason, source = 'runtime') {
    let list = readMeta(QUARANTINE_KEY);
    if (!Array.isArray(list)) list = [];
    list.push({
      key,
      reason,
      source,
      capturedAt: nowIso(),
      raw: String(raw ?? '').slice(0, MAX_QUARANTINE_RAW)
    });
    list = list.slice(-MAX_QUARANTINE);
    if (writeMeta(QUARANTINE_KEY, list)) runtimeStatus.quarantineCount = list.length;
  }

  function repairCorruptionAtBoot() {
    const lastGood = validSnapshot(LAST_GOOD_KEY);
    Core.STORE_SPECS.forEach(spec => {
      const raw = localStorage.getItem(spec.key);
      if (raw === null) return;
      const validation = Core.validateRaw(spec, raw, { allowMissing: false });
      if (validation.ok) return;

      quarantine(spec.key, raw, validation.reason, 'boot');
      const fallback = lastGood?.values?.[spec.key] ?? null;
      const fallbackValidation = Core.validateRaw(spec, fallback, { allowMissing: true });
      if (fallback !== null && fallbackValidation.ok) {
        nativeSetItem.call(localStorage, spec.key, fallback);
        runtimeStatus.repairedAtBoot.push({ key: spec.key, action: 'restored-last-good' });
      } else {
        nativeRemoveItem.call(localStorage, spec.key);
        runtimeStatus.repairedAtBoot.push({ key: spec.key, action: 'quarantined-and-cleared' });
      }
    });
    saveLastGood(runtimeStatus.repairedAtBoot.length ? 'boot-repair' : 'boot-valid');
  }

  repairCorruptionAtBoot();

  Storage.prototype.setItem = function (key, value) {
    if (this === localStorage) {
      const spec = Core.specForKey(key);
      if (spec) {
        const validation = Core.validateRaw(spec, String(value), { allowMissing: false });
        if (!validation.ok) {
          runtimeStatus.blockedWrites += 1;
          quarantine(key, value, validation.reason, 'blocked-write');
          console.warn(`[French Trân'quille] blocked corrupt write for ${key}: ${validation.reason}`);
          return;
        }
      }
    }

    const result = nativeSetItem.call(this, key, value);
    if (this === localStorage && Core.specForKey(key)) scheduleLastGood('valid-write');
    return result;
  };

  Storage.prototype.removeItem = function (key) {
    if (this === localStorage && key === Core.STORE_SPECS[0].key) {
      snapshot(PRE_RESET_KEY, 'pre-reset');
      Core.STORE_SPECS.forEach(spec => nativeRemoveItem.call(localStorage, spec.key));
      saveLastGood('reset-all');
      return;
    }
    const result = nativeRemoveItem.call(this, key);
    if (this === localStorage && Core.specForKey(key)) scheduleLastGood('remove-store');
    return result;
  };

  function backupObject() {
    return Core.buildBackup(localStorage, {
      version: window.FrenchTranquilleBuildMeta?.version || VERSION,
      build: window.FrenchTranquilleBuildMeta?.build || BUILD
    });
  }

  function downloadBackup() {
    let payload;
    try { payload = backupObject(); }
    catch {
      alert(T('Không thể tạo bản sao lưu vì một dữ liệu cục bộ không hợp lệ. Dữ liệu lỗi đã được giữ lại để phục hồi.', 'Impossible de créer la sauvegarde : une donnée locale est invalide. Elle a été conservée pour récupération.'));
      return false;
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `french-tranquille-backup-v2-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    return true;
  }

  function restoreObject(payload, { reload = true } = {}) {
    if (payload?.version && Number(payload.version) < Core.BACKUP_VERSION) {
      snapshot(PRE_MIGRATION_KEY, 'pre-migration', { incomingBackupVersion: payload.version });
    }
    snapshot(PRE_RESTORE_KEY, 'pre-restore', { incomingBackupVersion: payload?.version ?? null });

    let result;
    try { result = Core.restore(localStorage, payload, nativeWriter()); }
    catch (error) { result = { ok: false, error, rolledBack: true }; }

    runtimeStatus.lastRestore = {
      ok: Boolean(result.ok),
      at: nowIso(),
      migratedFrom: result.migratedFrom ?? null,
      rolledBack: result.rolledBack ?? null,
      error: result.error ? String(result.error.message || result.error) : null
    };

    if (!result.ok) {
      saveLastGood('restore-rollback');
      return result;
    }

    saveLastGood('restore-success');
    if (reload) location.reload();
    return result;
  }

  function importBackup(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      let payload;
      try { payload = JSON.parse(String(reader.result || '')); }
      catch {
        alert(T('Tệp sao lưu không hợp lệ. Không có dữ liệu hiện tại nào bị thay đổi.', 'Fichier de sauvegarde invalide. Aucune donnée actuelle n’a été modifiée.'));
        return;
      }
      const result = restoreObject(payload, { reload: false });
      if (!result.ok) {
        alert(T('Khôi phục thất bại. Dữ liệu trước đó đã được phục hồi tự động.', 'Restauration échouée. Les données précédentes ont été remises automatiquement.'));
        return;
      }
      location.reload();
    };
    reader.readAsText(file);
  }

  function restoreSnapshot(key, { reload = true } = {}) {
    const snap = validSnapshot(key);
    if (!snap) return { ok: false, error: new Error('snapshot-unavailable') };
    snapshot(PRE_RESTORE_KEY, 'pre-snapshot-restore', { sourceSnapshot: key });
    const before = Core.collectRaw(localStorage);
    try {
      Core.writeRawMap(localStorage, snap.values, nativeWriter());
      const after = Core.collectRaw(localStorage);
      if (!Core.rawMapsEqual(after, snap.values) || !Core.validateRawMap(after, { allowMissing: true }).ok) throw new Error('snapshot-verification-failed');
      saveLastGood('snapshot-restore');
      if (reload) location.reload();
      return { ok: true, before, after };
    } catch (error) {
      try { Core.writeRawMap(localStorage, before, nativeWriter()); } catch {}
      return { ok: false, error, rolledBack: Core.rawMapsEqual(Core.collectRaw(localStorage), before) };
    }
  }

  function decorateBackupCard() {
    const card = document.querySelector('.memory-backup-card');
    if (!card || card.dataset.recoveryV2 === '1') return;
    card.dataset.recoveryV2 = '1';
    const pill = card.querySelector('.pill');
    const title = card.querySelector('h2');
    const copy = card.querySelector('p');
    if (pill) pill.textContent = 'COFFRE V2';
    if (title) title.textContent = `💾 ${T('Sao lưu đầy đủ', 'Sauvegarde complète')}`;
    if (copy) copy.textContent = T(
      'Bản sao lưu chứa tiến độ, trí nhớ, lỗi đã quan sát, bài nghe, tình huống thực tế và các cột mốc. Trước khi nhập hoặc di chuyển dữ liệu, ứng dụng tự tạo ảnh chụp để có thể quay lại.',
      'La sauvegarde contient progression, mémoire, erreurs observées, écoute, situations réelles et jalons. Avant tout import ou migration, l’app crée automatiquement un snapshot de retour.'
    );
  }

  document.addEventListener('click', event => {
    if (event.target.closest('[data-memory-export]')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      downloadBackup();
      return;
    }
    if (event.target.closest('[data-memory-import]')) {
      event.preventDefault();
      event.stopImmediatePropagation();
      document.querySelector('[data-memory-file]')?.click();
    }
  }, true);

  document.addEventListener('change', event => {
    const input = event.target.closest?.('[data-memory-file]');
    if (!input) return;
    event.stopImmediatePropagation();
    importBackup(input.files?.[0]);
  }, true);

  const startDecorating = () => {
    decorateBackupCard();
    const root = document.getElementById('app');
    if (root) new MutationObserver(decorateBackupCard).observe(root, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startDecorating, { once: true });
  else startDecorating();

  window.FrenchTranquilleRecovery = {
    version: VERSION,
    build: BUILD,
    core: Core,
    keys: {
      lastGood: LAST_GOOD_KEY,
      preRestore: PRE_RESTORE_KEY,
      preMigration: PRE_MIGRATION_KEY,
      preReset: PRE_RESET_KEY,
      quarantine: QUARANTINE_KEY
    },
    backupObject,
    downloadBackup,
    importBackup,
    restoreObject,
    restoreSnapshot,
    snapshot: () => snapshotEnvelope('manual-preview'),
    status: () => ({ ...runtimeStatus, quarantineCount: Array.isArray(readMeta(QUARANTINE_KEY)) ? readMeta(QUARANTINE_KEY).length : 0 }),
    lastGood: () => validSnapshot(LAST_GOOD_KEY),
    preRestore: () => validSnapshot(PRE_RESTORE_KEY),
    preMigration: () => validSnapshot(PRE_MIGRATION_KEY),
    preReset: () => validSnapshot(PRE_RESET_KEY)
  };
})();
