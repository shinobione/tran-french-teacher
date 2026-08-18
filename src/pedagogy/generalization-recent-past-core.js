(function attachRecentPastCore(root, factory) {
  'use strict';
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.FrenchTranquilleRecentPastTransferCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createRecentPastCore() {
  'use strict';

  const ROADMAP_SLICE = '41.2';
  const VERSION = '1.0.0-recent-past-core';
  const FAMILY_ID = 'present-je-regular-action-to-recent-past-je-venir-de';

  const RAW = [
    {
      id: 'work',
      source: 'Je travaille.',
      target: 'Je viens de travailler.',
      sourceLesson: 24,
      anchorLesson: 36,
      infinitive: 'travailler'
    },
    {
      id: 'eat',
      source: 'Je mange.',
      target: 'Je viens de manger.',
      sourceLesson: 24,
      anchorLesson: 36,
      infinitive: 'manger'
    },
    {
      id: 'return-home',
      source: 'Je rentre à la maison.',
      target: 'Je viens de rentrer à la maison.',
      sourceLesson: 24,
      anchorLesson: 36,
      infinitive: 'rentrer'
    }
  ];

  const normalize = value => String(value ?? '')
    .trim()
    .replace(/[’]/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/\s+([.!?])/g, '$1');

  const freezeEntry = entry => Object.freeze({ ...entry });
  const CATALOG = Object.freeze(RAW.map(freezeEntry));
  const BY_SOURCE = new Map(CATALOG.map(entry => [normalize(entry.source), entry]));
  const BY_ID = new Map(CATALOG.map(entry => [entry.id, entry]));

  function catalog() {
    return CATALOG;
  }

  function view(id) {
    return BY_ID.get(String(id || '')) || null;
  }

  function transform(source) {
    return BY_SOURCE.get(normalize(source))?.target || null;
  }

  function verify(idOrSource, answer) {
    const key = String(idOrSource || '');
    const entry = BY_ID.get(key) || BY_SOURCE.get(normalize(idOrSource));
    if (!entry) return Object.freeze({ ok:false, reason:'unknown-source', expected:null });
    const ok = normalize(answer) === normalize(entry.target);
    return Object.freeze({
      ok,
      reason: ok ? 'exact-known-transformation' : 'target-mismatch',
      expected: entry.target,
      id: entry.id
    });
  }

  return Object.freeze({
    roadmapSlice: ROADMAP_SLICE,
    version: VERSION,
    familyId: FAMILY_ID,
    status: 'pure-non-wired',
    sourceLessons: Object.freeze([24]),
    anchorLessons: Object.freeze([36]),
    subject: 'je',
    structure: 'venir-de-infinitive',
    masteryClaim: false,
    durableWrite: false,
    runtimeWiring: false,
    catalog,
    view,
    transform,
    verify
  });
});
