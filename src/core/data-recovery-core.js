(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.FrenchTranquilleRecoveryCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  const FORMAT = 'french-tranquille-backup';
  const BACKUP_VERSION = 2;

  const isObject = value => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
  const isArray = value => Array.isArray(value);

  const STORE_SPECS = Object.freeze([
    {
      id: 'learner',
      key: 'francais-avec-luc:learner:v1',
      validate(value) {
        if (!isObject(value)) return false;
        if (value.schemaVersion === 2) {
          return isObject(value.lessonProgress || {}) && isArray(value.completedLessons || []) && isArray(value.knownItems || []);
        }
        return value.schemaVersion === 1 || Object.prototype.hasOwnProperty.call(value, 'lesson1Step') || Object.prototype.hasOwnProperty.call(value, 'lesson1Completed');
      }
    },
    {
      id: 'memory',
      key: 'french-tranquille:learning-memory:v1',
      validate: value => isObject(value) && value.schemaVersion === 1 && isObject(value.items || {}) && isObject(value.totals || {})
    },
    {
      id: 'errors',
      key: 'french-tranquille:error-intelligence:v1',
      validate: value => isObject(value) && value.schemaVersion === 1 && isObject(value.items || {}) && isArray(value.recent || []) && isObject(value.totals || {})
    },
    {
      id: 'scenarios',
      key: 'french-tranquille:scenarios:v1',
      validate: value => isObject(value) && value.schemaVersion === 1 && isObject(value.scenarios || {})
    },
    {
      id: 'listening',
      key: 'french-tranquille:listening:v1',
      validate: value => isObject(value) && value.schemaVersion === 1 && isObject(value.totals || {}) && isObject(value.families || {}) && isArray(value.recent || [])
    },
    {
      id: 'milestones',
      key: 'french-tranquille:milestones:v1',
      validate: value => isObject(value) && value.schemaVersion === 1 && isObject(value.seen || {})
    }
  ]);

  const SPEC_BY_KEY = Object.fromEntries(STORE_SPECS.map(spec => [spec.key, spec]));
  const SPEC_BY_ID = Object.fromEntries(STORE_SPECS.map(spec => [spec.id, spec]));

  function specForKey(key) {
    return SPEC_BY_KEY[key] || null;
  }

  function safeParse(raw) {
    try { return { ok: true, value: JSON.parse(raw) }; }
    catch (error) { return { ok: false, reason: 'invalid-json', error }; }
  }

  function validateValue(specOrKey, value) {
    const spec = typeof specOrKey === 'string' ? SPEC_BY_KEY[specOrKey] || SPEC_BY_ID[specOrKey] : specOrKey;
    if (!spec) return { ok: false, reason: 'unknown-store' };
    try { return spec.validate(value) ? { ok: true, value } : { ok: false, reason: 'invalid-schema' }; }
    catch (error) { return { ok: false, reason: 'validator-error', error }; }
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

  function validateRawMap(rawMap, { allowMissing = true } = {}) {
    const issues = [];
    STORE_SPECS.forEach(spec => {
      const result = validateRaw(spec, Object.prototype.hasOwnProperty.call(rawMap || {}, spec.key) ? rawMap[spec.key] : null, { allowMissing });
      if (!result.ok) issues.push({ id: spec.id, key: spec.key, reason: result.reason });
    });
    return { ok: issues.length === 0, issues };
  }

  function objectsFromRawMap(rawMap) {
    const stores = {};
    STORE_SPECS.forEach(spec => {
      const raw = rawMap?.[spec.key] ?? null;
      if (raw === null) stores[spec.id] = null;
      else {
        const result = validateRaw(spec, raw, { allowMissing: false });
        if (!result.ok) throw new Error(`invalid-store:${spec.id}:${result.reason}`);
        stores[spec.id] = result.value;
      }
    });
    return stores;
  }

  function buildBackup(storage, app = {}) {
    const raw = collectRaw(storage);
    const validation = validateRawMap(raw, { allowMissing: true });
    if (!validation.ok) throw new Error(`invalid-current-storage:${validation.issues.map(issue => issue.id).join(',')}`);
    return {
      format: FORMAT,
      version: BACKUP_VERSION,
      exportedAt: new Date().toISOString(),
      app: { version: app.version || null, build: app.build || null },
      stores: objectsFromRawMap(raw)
    };
  }

  function migrateBackup(payload) {
    if (!isObject(payload) || payload.format !== FORMAT) throw new Error('invalid-backup-format');
    if (payload.version === BACKUP_VERSION) return { backup: payload, migratedFrom: null, preserveMissing: false };
    if (payload.version === 1) {
      return {
        migratedFrom: 1,
        preserveMissing: true,
        backup: {
          format: FORMAT,
          version: BACKUP_VERSION,
          exportedAt: payload.exportedAt || new Date().toISOString(),
          migratedAt: new Date().toISOString(),
          migratedFrom: 1,
          app: isObject(payload.app) ? payload.app : { version: null, build: null },
          stores: {
            learner: payload.learner ?? null,
            memory: payload.memory ?? null,
            errors: null,
            scenarios: null,
            listening: null,
            milestones: null
          }
        }
      };
    }
    throw new Error(`unsupported-backup-version:${payload.version}`);
  }

  function normalizeBackup(payload) {
    const migrated = migrateBackup(payload);
    const source = migrated.backup;
    if (!isObject(source.stores)) throw new Error('invalid-backup-stores');
    const stores = {};
    STORE_SPECS.forEach(spec => {
      const value = Object.prototype.hasOwnProperty.call(source.stores, spec.id) ? source.stores[spec.id] : null;
      if (value !== null) {
        const result = validateValue(spec, value);
        if (!result.ok) throw new Error(`invalid-backup-store:${spec.id}:${result.reason}`);
      }
      stores[spec.id] = value;
    });
    return {
      migratedFrom: migrated.migratedFrom,
      preserveMissing: migrated.preserveMissing,
      backup: { ...source, format: FORMAT, version: BACKUP_VERSION, stores }
    };
  }

  function planRestore(payload, currentRaw = {}) {
    const normalized = normalizeBackup(payload);
    const targetRaw = {};
    STORE_SPECS.forEach(spec => {
      const value = normalized.backup.stores[spec.id];
      if (normalized.preserveMissing && value === null) {
        targetRaw[spec.key] = currentRaw?.[spec.key] ?? null;
      } else {
        targetRaw[spec.key] = value === null ? null : JSON.stringify(value);
      }
    });
    return { ...normalized, targetRaw };
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

  function restore(storage, payload, writer = defaultWriter(storage)) {
    const before = collectRaw(storage);
    const plan = planRestore(payload, before);
    try {
      writeRawMap(storage, plan.targetRaw, writer);
      const after = collectRaw(storage);
      const validation = validateRawMap(after, { allowMissing: true });
      if (!validation.ok || !rawMapsEqual(after, plan.targetRaw)) throw new Error('restore-verification-failed');
      return { ok: true, before, after, migratedFrom: plan.migratedFrom, backup: plan.backup };
    } catch (error) {
      try { writeRawMap(storage, before, defaultWriter(storage)); } catch {}
      const rolledBack = rawMapsEqual(collectRaw(storage), before);
      return { ok: false, error, before, rolledBack, migratedFrom: plan.migratedFrom };
    }
  }

  return Object.freeze({
    FORMAT,
    BACKUP_VERSION,
    STORE_SPECS,
    specForKey,
    safeParse,
    validateValue,
    validateRaw,
    collectRaw,
    validateRawMap,
    objectsFromRawMap,
    buildBackup,
    migrateBackup,
    normalizeBackup,
    planRestore,
    writeRawMap,
    rawMapsEqual,
    restore
  });
});
