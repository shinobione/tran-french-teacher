(() => {
  'use strict';

  const SNAPSHOT_KEY = 'french-tranquille:safety:pre-build22:v1';
  const KEYS = [
    'francais-avec-luc:learner:v1',
    'french-tranquille:learning-memory:v1',
    'french-tranquille:error-intelligence:v1',
    'french-tranquille:scenarios:v1',
    'french-tranquille:listening:v1'
  ];

  function capture() {
    if (localStorage.getItem(SNAPSHOT_KEY)) return;
    const values = {};
    for (const key of KEYS) {
      const raw = localStorage.getItem(key);
      if (raw !== null) values[key] = raw;
    }
    if (!Object.keys(values).length) return;
    try {
      localStorage.setItem(SNAPSHOT_KEY, JSON.stringify({
        format: 'french-tranquille-safety-snapshot',
        version: 1,
        build: 22,
        capturedAt: new Date().toISOString(),
        values
      }));
    } catch {}
  }

  function snapshot() {
    try {
      const parsed = JSON.parse(localStorage.getItem(SNAPSHOT_KEY) || 'null');
      return parsed?.format === 'french-tranquille-safety-snapshot' ? parsed : null;
    } catch { return null; }
  }

  capture();

  window.FrenchTranquilleSafety = {
    version: '1.15.0',
    build: 22,
    key: SNAPSHOT_KEY,
    snapshot,
    hasSnapshot: () => Boolean(snapshot())
  };
})();
