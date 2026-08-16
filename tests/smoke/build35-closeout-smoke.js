'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Recovery = require('../../src/core/data-recovery-core.js');
const Evidence = require('../../src/pedagogy/memory-evidence-v2-core.js');
const MigrationSim = require('../../src/pedagogy/memory-evidence-v2-migration-sim.js');

const root = path.resolve(__dirname, '../..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const exists = file => fs.existsSync(path.join(root, file));

// The certified Build 35 baseline remains immutable evidence even after a
// later Build 36 successor deliberately adopts the shadow store.
assert.equal(Recovery.BACKUP_VERSION, 2, 'legacy Build 35 Recovery core remains backup v2');
assert.equal(Recovery.STORE_SPECS.length, 6, 'legacy Build 35 Recovery core remains six-store');
assert.equal(Recovery.specForKey(Evidence.PROPOSED_STORE_KEY), null, 'legacy Build 35 Recovery core still does not own Evidence');

const ids = Recovery.STORE_SPECS.map(spec => spec.id).sort();
assert.deepEqual(ids, ['errors', 'learner', 'listening', 'memory', 'milestones', 'scenarios']);

const index = read('index.html');
const sw = read('sw.js');
const successorAdopted = exists('src/core/data-recovery-v3-runtime-core.js') && exists('src/core/memory-evidence-v2-runtime.js');

if (!successorAdopted) {
  for (const forbidden of [
    'src/pedagogy/memory-evidence-v2-core.js',
    'src/pedagogy/memory-evidence-v2-migration-sim.js'
  ]) {
    assert(!index.includes(forbidden), `${forbidden} must not be runtime-wired in Build 35`);
    assert(!sw.includes(forbidden), `${forbidden} must not be Service Worker wired in Build 35`);
  }
  assert(!index.includes(Evidence.PROPOSED_STORE_KEY));
  assert(!sw.includes(Evidence.PROPOSED_STORE_KEY));
} else {
  const Contract = require('../../src/core/data-recovery-v3-contract.js');
  assert.equal(Contract.BACKUP_VERSION, 3, 'Build 36 successor must explicitly own backup v3');
  assert.equal(Contract.STORE_SPECS.length, 7, 'Build 36 successor must explicitly own seven-store target');
  assert.equal(Contract.specForKey(Evidence.PROPOSED_STORE_KEY).id, 'evidence');
  for (const required of [
    'src/pedagogy/memory-evidence-v2-core.js',
    'src/core/data-recovery-v3-contract.js',
    'src/core/data-recovery-v3-runtime-core.js',
    'src/core/memory-evidence-v2-runtime.js'
  ]) {
    assert(index.includes(required), `${required} must be explicit successor runtime wiring`);
    assert(sw.includes(required), `${required} must be explicit successor Service Worker wiring`);
  }
  assert(!index.includes('src/pedagogy/memory-evidence-v2-migration-sim.js'), 'Build 35 migration simulator must stay test-only');
  assert(!sw.includes('src/pedagogy/memory-evidence-v2-migration-sim.js'), 'Build 35 migration simulator must stay out of Service Worker');
}

assert.equal(typeof Evidence.simulate, 'function');
assert.equal(typeof MigrationSim.simulateTransaction, 'function');
assert.equal(typeof MigrationSim.simulateBackupTransaction, 'function');
assert.equal(MigrationSim.SANDBOX_MARKER, '__ftEvidenceMigrationSandbox');

const closeout = read('docs/BUILD-35-CLOSEOUT-ADOPTION-READINESS.md');
for (const contract of [
  'derived shadow store',
  'backup envelope from v2 to v3',
  'preserveMissingIds',
  'rebuildDerivedIds',
  '36.1 — Recovery v3 + seventh-store contract',
  '36.2 — Shadow adoption runtime',
  '36.3 — Backup/restore/reset browser tribunal'
]) {
  assert(closeout.includes(contract), `missing Build 36 readiness contract: ${contract}`);
}

console.log(`Build 35 closeout / Build 36 readiness smoke: PASS (${successorAdopted ? 'successor-adopted' : 'pre-adoption'})`);
