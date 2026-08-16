# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting.

## Last reconciliation

- Reconciled: **2026-08-16**
- Repository: `shinobione/tran-french-teacher`
- Default branch: `main`
- Current certified `main`: **`68b24c8a541992085309bc4a53f46e3a0f21eb97`** — PR **#164**, Build **35.1** Memory Evidence v2 projection contract.
- PR #164: **MERGED**.
- Post-merge certification on exact SHA `68b24c8…`: **30/30 push workflows completed, 0 failure**.
- GitHub Pages **#217 SUCCESS** on exact SHA `68b24c8…`.
- Latest product/runtime-bearing checkpoint remains **`54209392d3a349a1aefab14615dcecf24a59fcea`** — PR **#161**, V5.10 Theme-picker physical-field repair.
- Premium V5.10: **CLOSED / physical FIELD PASS**.
- Premium gate issue **#114 CLOSED**.
- **Build 35 is ACTIVE** for Memory Evidence v2 / Migration Readiness.
- Active candidate: **PR #165 OPEN** — `Build 35.2 · Memory Evidence v2 transactional migration simulation`.
- Candidate branch: `build35/transaction-simulation`.
- Candidate head at opening: **`9bfea97f6682ee4da8152814605c51672059ba71`**.
- **Build 36 remains BLOCKED.**

## Product baseline

| Area | State |
|---|---|
| Production pedagogy | **V2.3.0 · Build 34** |
| Active engineering line | **Build 35 · Memory Evidence v2 / Migration Readiness** |
| Certified Build 35 slice | **35.1 · Evidence v2 Contract + Projection Simulator** |
| Active Build 35 slice | **35.2 · Transactional Migration Simulation · PR #165** |
| Durable pedagogical stores | **6 — unchanged** |
| Premium visual line | **V5.10 CLOSED · FIELD PASS** |
| Build 36 | **BLOCKED until Build 35 closeout/readiness decision** |

## Build 35.1 — certified

Slice 35.1 added a pure Evidence v2 projector over the six current Recovery stores.

Proposed future key:

```text
french-tranquille:memory-evidence:v2
```

It is still **not** a durable runtime store.

Evidence dimensions:

```text
retrieval
listening
scenario
text
recognition
construction
transfer
assistance
recency
repetition
recovery
```

Evidence-state vocabulary:

```text
exposure
assisted-success
autonomous-recall
contextual-reuse
concept-understanding
novel-construction-transfer
```

Locked semantics:

- `voice-unrecognized` = recognition-system evidence only; never a pronunciation failure;
- model use / `assisted` proves assistance, not a successful outcome by itself;
- construction, transfer and concept-understanding are not fabricated from v1 history;
- unattributable old Listening dialogue / Scenario aggregate evidence remains explicitly unattributed;
- history is bounded and deterministic.

Certified proof:

```text
PR #164 head CI           FULL GREEN
main 68b24c8…             30/30 push workflows, 0 failure
GitHub Pages #217         SUCCESS on 68b24c8…
production wiring         NONE
new durable key           NONE
```

## Build 35.2 — active candidate

PR **#165** adds only migration-readiness simulation infrastructure:

```text
src/pedagogy/memory-evidence-v2-migration-sim.js
tests/smoke/build35-memory-evidence-v2-transaction-smoke.js
tests/browser/build35-memory-evidence-v2-transaction.html
docs/BUILD-35-2-MIGRATION-SIMULATION.md
.github/workflows/build35-memory-evidence-v2-transaction.yml
```

The candidate is additive relative to certified `main`: **5 added files, 0 deletions, no existing runtime owner modified**.

### Transaction contract

```text
six-source snapshot
→ canonical Build 28 validation
→ deterministic Evidence v2 transform
→ isolated sandbox write
→ reread
→ canonical compare
→ verify six sources unchanged
→ rollback
→ byte-equivalence check
```

### Hard sandbox guard

The migration simulator accepts only storage created by its own `createSandboxStorage()` helper.

Passing real `window.localStorage` must fail with:

```text
sandbox-required
```

This prevents Slice 35.2 from accidentally becoming a production migration path.

### Failure proofs

Dedicated test-only faults:

```text
after-write
corrupt-target
source-drift
```

Each must fail and restore the tracked sandbox exactly.

### Invalid-source / quarantine proof

Invalid raw source data:

```text
Recovery validation reject
→ preserve raw in simulation quarantine record
→ no projection coercion
→ rollback sandbox
→ source remains byte-identical
```

No production quarantine write occurs.

### Old backup compatibility

Backup migration remains owned by Build 28 Recovery:

```text
backup v1
→ Recovery.normalizeBackup()
→ backup v2
→ isolated Evidence v2 transaction simulation
```

No second backup migration implementation is introduced.

## Durable source ownership — unchanged

```text
learner     → francais-avec-luc:learner:v1
memory      → french-tranquille:learning-memory:v1
errors      → french-tranquille:error-intelligence:v1
scenarios   → french-tranquille:scenarios:v1
listening   → french-tranquille:listening:v1
milestones  → french-tranquille:milestones:v1
```

Build 28 Recovery remains authoritative for validation, backup normalization, snapshots, writes, reread/compare, rollback and corruption quarantine.

## Protected sanctuaries

Do not silently change during Build 35:

```text
app.js
src/core/data-recovery-core.js
src/core/data-recovery.js
src/pedagogy/learning-memory.js
src/pedagogy/error-intelligence.js
src/pedagogy/listening-engine.js
src/pedagogy/scenario-engine.js
voice-ios.js
free-voice.js
index.html
sw.js
assets/LOGO.png
assets/Favicon.png
```

Also preserve:

- six current durable stores;
- learner progression continuity;
- V5.10 FIELD PASS contracts;
- Recovery / backup compatibility;
- recognition-vs-pronunciation semantic separation.

## Canonical next action

Certify **PR #165** before any further Build 35 step:

```text
1. dedicated Node transaction smoke
2. Chrome sandbox/live-storage proof
3. Build 35.1 projection regression
4. Build 28 Recovery regression
5. historical workflow suite / sanctuaries
6. if full green → merge #165
7. verify exact main SHA + Pages
8. reconcile Build 35 migration-readiness status
9. decide Build 35 closeout / Build 36 readiness separately
```

Even if #165 is fully green, **do not adopt `french-tranquille:memory-evidence:v2` durably inside Build 35**.

Before Build 36 can adopt a seventh durable store, there must be an explicit plan for Recovery validation, backup/export/import, restore, reset, corruption handling and rollback for that store.
