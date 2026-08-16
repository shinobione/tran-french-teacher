# Build 35.2 — Memory Evidence v2 Transactional Migration Simulation

**Status:** candidate engineering slice. **Simulation only — no durable adoption.**

## Purpose

Slice 35.1 proved that the current six durable pedagogical stores can be projected deterministically into an honest, bounded Memory Evidence v2 proposal.

Slice 35.2 proves the migration mechanics around that proposal without touching production storage:

```text
six-source snapshot
→ Build 28 source validation
→ deterministic Evidence v2 transform
→ isolated sandbox write
→ reread
→ canonical compare
→ rollback
→ byte-equivalence verification
```

The production key remains only a proposal:

```text
french-tranquille:memory-evidence:v2
```

It is never written to real `localStorage` by this slice.

## Hard safety boundary

`src/pedagogy/memory-evidence-v2-migration-sim.js` accepts only a storage object created by its own `createSandboxStorage()` helper.

A direct call with `window.localStorage`, or any unmarked storage-like object, fails immediately with:

```text
sandbox-required
```

This is intentional. The Build 35 migration proof must be mechanically incapable of becoming an accidental production migration.

The simulator is not loaded by `index.html`, not precached by `sw.js`, and does not modify Recovery, Learning Memory, Error Intelligence, Listening, Scenario, learner progression or voice owners.

## Transaction proof

A valid simulation performs the following steps:

1. Capture all six Recovery raw stores, any pre-existing proposed target, and the Recovery quarantine metadata value.
2. Validate the six source stores using the canonical Build 28 Recovery validators.
3. Convert validated raw values through `Recovery.objectsFromRawMap()`.
4. Run the Build 35.1 deterministic Evidence v2 projector.
5. Canonically serialize the proposal.
6. Write it only into the isolated sandbox under the proposed v2 key.
7. Reread and parse the sandbox target.
8. Compare the reread object against the canonical proposal.
9. Verify that all six source raw stores are still byte-identical.
10. Roll back the proposed target and all tracked values to the exact pre-simulation snapshot.
11. Verify the whole tracked sandbox is byte-equivalent to its initial state.

A normal successful proof therefore ends with **no v2 target left behind**.

## Injected failure proof

The simulator includes explicit test-only fault points:

```text
after-write
corrupt-target
source-drift
```

They prove that rollback restores the initial sandbox even when:

- execution aborts immediately after the proposed write;
- the proposed target becomes unreadable JSON;
- one of the six source stores changes during verification.

All three cases must finish with:

```text
ok = false
rolledBack = true
sourceUntouched = true
targetRestored = true
```

## Invalid source / quarantine proof

Invalid raw source data is never coerced into Evidence v2.

The canonical Recovery validator rejects it first. The simulator then constructs a bounded quarantine record containing:

- source store id;
- durable key;
- validation reason;
- preserved raw value;
- `simulation: true` marker.

The quarantine write itself occurs only inside the sandbox and is then rolled back with everything else. The returned result retains the quarantine evidence for the test assertion.

This proves the future migration can preserve bad source material for diagnosis without destructively clearing it during the readiness phase.

## Old backup compatibility

Legacy backup compatibility remains owned by Build 28 Recovery.

Slice 35.2 does not implement a second backup migrator. Instead:

```text
backup v1
→ Recovery.normalizeBackup()
→ canonical backup v2
→ isolated six-store sandbox
→ Evidence v2 transaction simulation
```

The tests require `migratedFrom === 1`, backup version `2`, successful reread verification, and exact rollback.

Invalid backup formats fail at the Recovery normalization boundary before any simulated write.

## Historical learner fixture

The Node and browser proofs include a representative legacy learner/memory backup carrying already-known items and review state.

The goal is not to claim that this fixture reproduces every historical learner state. It proves the compatibility path that matters for Build 35 readiness:

- old backup format remains accepted through Recovery;
- missing newer stores remain missing rather than fabricated;
- the resulting Evidence v2 proposal is still deterministic;
- the transaction still verifies and rolls back cleanly.

## Proof files

```text
src/pedagogy/memory-evidence-v2-migration-sim.js
tests/smoke/build35-memory-evidence-v2-transaction-smoke.js
tests/browser/build35-memory-evidence-v2-transaction.html
.github/workflows/build35-memory-evidence-v2-transaction.yml
```

The dedicated workflow also reruns:

- the Slice 35.1 projection smoke;
- the Build 28 pure Recovery test;
- byte-identity guards for Recovery, Learning Memory, app.js, voice code and the already-certified Evidence 35.1 core.

## Browser proof

The browser test intentionally keeps actual page-origin `localStorage` separate from the migration sandbox.

It records a live-storage snapshot before simulation and requires the exact same snapshot afterward. It also directly attempts to pass real `localStorage` into the simulator and requires `sandbox-required`.

Required browser assertions include:

```text
normal sandbox write/reread/compare/rollback PASS
all injected failures rollback PASS
invalid source quarantine proof PASS
backup v1 → Recovery v2 → transaction PASS
real localStorage byte-equivalent PASS
proposed v2 durable key absent from real localStorage PASS
sandbox guard PASS
```

## What Slice 35.2 still does NOT do

- no new production localStorage key;
- no runtime loader;
- no Service Worker/cache entry;
- no producer dual-write;
- no read-path cutover;
- no Recovery store expansion;
- no mutation of the six current stores;
- no learner migration;
- no Build 36 adoption.

## Readiness decision after certification

If Slice 35.2 is fully green on PR and post-merge `main`, Build 35 has proved both halves of migration readiness:

```text
35.1 = honest deterministic transform
35.2 = isolated transactional migration + rollback mechanics
```

The next step must be a deliberate Build 35 closeout/adoption-readiness decision. It must not silently turn the proposed schema into production state.

Build 36 remains the earliest place where durable Evidence v2 adoption may be considered, and only after explicit verification that backup/export/import/recovery semantics have a complete plan for the seventh store.
