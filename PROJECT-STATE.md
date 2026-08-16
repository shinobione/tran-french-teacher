# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> This file intentionally records only the current checkpoint and immediate next action. **Always verify current git/GitHub/CI reality before acting.**

## Last reconciliation

- Reconciled: **2026-08-16**
- Repository: `shinobione/tran-french-teacher`
- Default branch: `main`
- Certified `main` before the active Build 35 candidate: **`7e07efbc2233903f0df5d4b217bd6042849977b5`** — V5.10 governance closeout / Build 35 unblocked.
- Latest runtime-bearing checkpoint remains **`54209392d3a349a1aefab14615dcecf24a59fcea`** — PR **#161**, Settings Theme-picker physical-field repair.
- V5.10 physical FIELD PASS: **2026-08-16**, user verdict `ça a l'air OK, TEST SMOKED`.
- Premium gate **#114 CLOSED / completed**.
- **Build 35 is ACTIVE** for its reserved scope: **Memory Evidence v2 / Migration Readiness**.
- Active candidate: **PR #164 OPEN** — `Build 35.1 · Memory Evidence v2 contract + projection simulator`.
- Candidate branch: `build35/evidence-v2-projection`.
- **No durable Evidence v2 schema is adopted or runtime-wired in Slice 35.1.**

## Product baseline

| Area | State |
|---|---|
| Production pedagogy | **V2.3.0 · Build 34** |
| Active engineering line | **Build 35 · Memory Evidence v2 / Migration Readiness** |
| Current Build 35 slice | **35.1 · Evidence v2 Contract + Projection Simulator · candidate PR #164** |
| Premium visual line | **V5.10 CLOSED · physical FIELD PASS** |
| Curriculum | **52 lessons / 313 items** |
| Scenario | **44 situations / 132 turns** |
| Speaking Loop | **52/52 · max 2 moments / lesson** |
| Listening | **0.88 normal / 0.65 slow** |
| Durable pedagogical stores | **6 — unchanged** |
| Primary field target | **installed mobile PWA / Safari or Chromium mobile** |
| Build 36 | **BLOCKED until Build 35 migration proof is complete** |

## Build 35.1 — Evidence v2 Contract + Projection Simulator

The current candidate is deliberately **design/simulation only**.

New candidate files:

```text
src/pedagogy/memory-evidence-v2-core.js
tests/smoke/build35-memory-evidence-v2-smoke.js
tests/browser/build35-memory-evidence-v2-projection.html
docs/BUILD-35-MEMORY-EVIDENCE-V2.md
.github/workflows/build35-memory-evidence-v2.yml
```

The branch is additive relative to its `main` base: no existing runtime owner was modified to create the candidate.

### Proposed Evidence v2 dimensions

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

Target evidence-state vocabulary:

```text
exposure
assisted-success
autonomous-recall
contextual-reuse
concept-understanding
novel-construction-transfer
```

The projector only emits states supported by current durable evidence. It does **not** invent historical evidence that v1 did not store.

### Bounded model

- default proposed item history: **24 events max / item**;
- deterministic event identity + stable sort;
- duplicate evidence collapsed before the bounded tail is retained;
- projection contains provenance/diagnostics for lossy or unattributable source evidence.

### Safety semantics locked in 35.1

- `voice-unrecognized` = **speech-recognition-system evidence only**;
- it must **never** become proof of bad pronunciation or a pronunciation failure;
- Scenario model use / `assisted` proves **assistance was required**, but does **not** alone prove an `assisted-success`;
- construction, transfer and concept-understanding are **not backfilled** when the current stores cannot prove them;
- historical Listening dialogue events without durable item ownership remain explicitly **unattributed**;
- Scenario aggregate counters remain explicitly **unattributed** rather than being fabricated into per-item history;
- Milestone flags are not silently reinterpreted as item evidence.

## Durable source ownership — unchanged

Build 28 Recovery remains the canonical owner of the six durable stores and migration safety mechanics:

```text
learner     → francais-avec-luc:learner:v1
memory      → french-tranquille:learning-memory:v1
errors      → french-tranquille:error-intelligence:v1
scenarios   → french-tranquille:scenarios:v1
listening   → french-tranquille:listening:v1
milestones  → french-tranquille:milestones:v1
```

Recovery continues to own:

```text
source validation
backup normalization
snapshots
transactional writes
reread + compare
rollback
quarantine
```

Build 35 must layer on this contract rather than creating a second Recovery system.

## No-adoption boundary

The future key is currently only a contract marker:

```text
french-tranquille:memory-evidence:v2
```

Slice 35.1 must leave it absent from learner storage and absent from production wiring.

Specifically, the candidate does **not** modify or wire:

```text
app.js
src/pedagogy/learning-memory.js
src/pedagogy/error-intelligence.js
src/pedagogy/listening-engine.js
src/pedagogy/scenario-engine.js
src/core/data-recovery-core.js
src/core/data-recovery.js
index.html
sw.js
voice-ios.js
free-voice.js
```

No new durable learner key, no schema migration, no runtime producer adoption, no Build 36 behavior.

## Candidate proof status

Already proved before opening PR #164:

- `node --check` on the new pure projector ✅
- Node Evidence v2 projection smoke ✅
- deterministic double projection ✅
- input source object unchanged ✅
- all **11 dimensions** present ✅
- bounded history behavior ✅
- recognition safety rule ✅
- assistance safety rule ✅
- invalid/unsupported source schema rejected with dry-run quarantine candidate ✅
- normalized Recovery backup-v2 projection ✅
- raw backup-v1 deliberately requires canonical Recovery normalization ✅

Not yet certified at this checkpoint:

- **PR #164 full GitHub Actions suite — PENDING**;
- dedicated Chrome six-store dry-run — defined in CI, **not yet claimed green**;
- historical full-suite compatibility — **not yet claimed green**;
- merge / Pages — **not performed in this coding slice**.

## Locked non-regression contracts

- Keep the six current durable stores unchanged during Build 35 design/simulation work.
- Preserve historical learner continuity and Recovery/backup compatibility.
- Preserve `app.js`, `voice-ios.js`, `free-voice.js`, `assets/LOGO.png`, `assets/Favicon.png` unless a later explicitly scoped build proves a required change.
- Preserve V5.10 FIELD PASS contracts; do not reopen Premium work without a concrete regression.
- Do not treat speech recognition failure as pronunciation scoring evidence.
- Do not adopt `french-tranquille:memory-evidence:v2` durably in Build 35.
- **Build 36 is the earliest adoption candidate, and only after complete Build 35 migration proof.**

## Canonical next action — separate control step

**Do not start Slice 35.2 before certifying PR #164.**

Next control sequence:

```text
1. inspect PR #164 exact head
2. certify dedicated Build 35 Node + Chrome dry-run
3. certify the historical workflow suite / sanctuaries
4. if green, merge PR #164
5. verify main and deployment/repository state
6. reconcile this checkpoint
7. only then start Build 35.2
```

Expected Build 35.2 scope — still **simulation only**:

```text
pre-migration snapshot
→ source validation
→ deterministic Evidence v2 transform
→ simulated transactional write to isolated storage
→ reread
→ compare
→ rollback
→ invalid-source quarantine proof
→ old-backup compatibility proof
→ historical learner fixture + real-browser proof
```

Even after a successful 35.2, **production durable adoption remains forbidden in Build 35**. Build 36 may open only if the complete migration proof is deterministic, reversible and compatible.
