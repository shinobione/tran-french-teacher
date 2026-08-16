'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Recovery = require('../../src/core/data-recovery-core.js');
const Evidence = require('../../src/pedagogy/memory-evidence-v2-core.js');
const MigrationSim = require('../../src/pedagogy/memory-evidence-v2-migration-sim.js');

const root = path.resolve(__dirname, '../..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

assert.equal(Recovery.BACKUP_VERSION, 2, 'Build 35 must close before backup v3 adoption');
assert.equal(Recovery.STORE_SPECS.length, 6, 'Build 35 must close with exactly six durable Recovery stores');
assert.equal(Recovery.specForKey(Evidence.PROPOSED_STORE_KEY), null, 'Evidence v2 must not be a Recovery store during Build 35');

const ids = Recovery.STORE_SPECS.map(spec => spec.id).sort();
assert.deepEqual(ids, ['errors', 'learner', 'listening', 'memory', 'milestones', 'scenarios']);

const index = read('index.html');
const sw = read('sw.js');
for (const forbidden of [
  'src/pedagogy/memory-evidence-v2-core.js',
  'src/pedagogy/memory-evidence-v2-migration-sim.js'
]) {
  assert(!index.includes(forbidden), `${forbidden} must not be runtime-wired in Build 35`);
  assert(!sw.includes(forbidden), `${forbidden} must not be Service Worker wired in Build 35`);
}
assert(!index.includes(Evidence.PROPOSED_STORE_KEY));
assert(!sw.includes(Evidence.PROPOSED_STORE_KEY));

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

console.log('Build 35 closeout / Build 36 readiness smoke: PASS');
