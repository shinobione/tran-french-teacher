# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting.

## Last reconciliation

- Reconciled: **2026-08-16**
- Repository: `shinobione/tran-french-teacher`
- Default branch: `main`
- Current certified/reconciled `main`: **`20915545022fea92b08d364d99545078286fcbbc`** — PR **#167**, docs gate closing Build 35 and opening Build 36.1.
- PR #167 candidate: **46/46 pull-request workflows completed, 0 failure**.
- Post-merge on exact SHA `20915545…`: **32/32 push workflows completed, 0 failure**.
- GitHub Pages **#220 SUCCESS** on exact SHA `20915545…`.
- Latest product/runtime-bearing checkpoint remains **`54209392d3a349a1aefab14615dcecf24a59fcea`** — PR **#161**, V5.10 Theme-picker physical-field repair.
- Premium V5.10: **CLOSED / physical FIELD PASS**.
- Premium gate issue **#114 CLOSED**.
- **Build 35 CLOSED / migration readiness proven.**
- **Build 36 ACTIVE / Memory Evidence v2 Adoption Candidate.**
- Active slice: **Build 36.1 — Recovery v3 + seventh-store contract**.
- Active PR: **#168 — `Build 36.1 · Recovery v3 + seventh-store contract`**.
- Candidate branch: `build36/recovery-v3-contract`.
- Candidate is intentionally **pure / non-wired**: no live Evidence persistence and no product read-path cutover.

## Product baseline

| Area | State |
|---|---|
| Production pedagogy | **V2.3.0 · Build 34** |
| Closed migration milestone | **Build 35 · Memory Evidence v2 / Migration Readiness** |
| Active build | **Build 36 · Memory Evidence v2 Adoption Candidate** |
| Active slice | **36.1 · Recovery v3 + seventh-store contract · PR #168** |
| Current live durable stores | **6** |
| Current live backup envelope | **v2** |
| Proposed future store | `french-tranquille:memory-evidence:v2` — **NOT LIVE** |
| 36.1 target contract | **7 stores / backup v3 — pure only** |
| Premium visual line | **V5.10 CLOSED · FIELD PASS** |

## Build 35 — certified closure

Certified chain:

```text
35.1 · PR #164
→ deterministic Evidence v2 projection
→ main 68b24c8a541992085309bc4a53f46e3a0f21eb97
→ 30/30 push workflows · 0 failure
→ Pages #217 SUCCESS

35.2 · PR #165
→ isolated transaction / reread / compare / rollback simulation
→ PR 45/45 · 0 failure
→ main c972bdc44d272c30601d73509c6e8a39c72f57cf
→ 31/31 push workflows · 0 failure
→ Pages #218 SUCCESS

closeout · PR #166
→ explicit Build 36 adoption-readiness contract
→ PR 46/46 · 0 failure
→ main 1e3209d70cd9eebc3eb7dd4bb8df6047d9d029a7
→ 32/32 push workflows · 0 failure
→ Pages #219 SUCCESS

roadmap gate · PR #167
→ Build 35 CLOSED / Build 36 NEXT
→ main 20915545022fea92b08d364d99545078286fcbbc
→ 32/32 push workflows · 0 failure
→ Pages #220 SUCCESS
```

Build 35 closed with:

```text
Recovery STORE_SPECS == 6
Recovery BACKUP_VERSION == 2
Evidence key not owned by live Recovery
Evidence core/simulator not loaded by index.html
Evidence files not wired by sw.js
six current product source owners unchanged
```

## Evidence v2 locked semantics

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

Evidence states:

```text
exposure
assisted-success
autonomous-recall
contextual-reuse
concept-understanding
novel-construction-transfer
```

Permanent safety rules:

- `voice-unrecognized` = recognition-system evidence only, never pronunciation failure;
- model use proves assistance, not success by itself;
- construction/transfer/concept-understanding are not fabricated from evidence that cannot prove them;
- historical unattributable aggregates stay explicit rather than being invented into item history;
- per-item history remains bounded/deterministic.

## Build 36 adoption model — LOCKED

Evidence v2 must enter first as a **derived shadow store**.

```text
learner + memory + errors + scenarios + listening + milestones
                         ↓
               deterministic projection
                         ↓
             evidence derived-shadow
```

The six current stores remain canonical for product behaviour during initial adoption. A code rollback may therefore ignore the extra future Evidence key without losing learner history.

Required Build 36 sequence:

```text
36.1 Recovery v3 + seventh-store contract
→ 36.2 Evidence shadow adoption runtime
→ 36.3 backup / restore / reset / rollback browser tribunal
```

## Build 36.1 — active candidate #168

New files only:

```text
src/core/data-recovery-v3-contract.js
tests/smoke/build36-recovery-v3-smoke.js
docs/BUILD-36-1-RECOVERY-V3-CONTRACT.md
.github/workflows/build36-1-recovery-v3.yml
```

Before this checkpoint the slice was **strictly additive: 4 added files, 0 existing file modified**. `PROJECT-STATE.md` is now the only existing file deliberately updated for candidate handoff.

### Pure target contract

```text
future STORE_SPECS = 7
future BACKUP_VERSION = 3
evidence id/key      = evidence / french-tranquille:memory-evidence:v2
evidence role        = derived-shadow
```

The new contract module is not loaded by `index.html` and is not wired/pre-cached by `sw.js`.

### Evidence coherence

A durable shadow includes a deterministic six-source fingerprint and strict bounded-history/schema validation.

For backup v3:

```text
export
→ validate six source stores
→ REBUILD Evidence from those six
→ never trust caller-supplied shadow
→ serialize coherent 7-store v3 backup

restore
→ validate six source stores
→ validate Evidence shape
→ rederive expected Evidence
→ canonical compare
→ mismatch = evidence-source-mismatch
```

### Old-backup ownership

```text
v3
→ owns seven stores directly
→ Evidence must be coherent with its six source stores

v2
→ owns historical six stores
→ preserve no device-local Evidence
→ rebuild Evidence from restored six
→ preserveMissingIds = []
→ rebuildDerivedIds = [evidence]

v1
→ owns learner + memory
→ preserve current errors/scenarios/listening/milestones
→ never preserve current Evidence
→ rebuild Evidence from resulting six-store target
→ preserveMissingIds = [errors, scenarios, listening, milestones]
→ rebuildDerivedIds = [evidence]
```

### Hard 36.1 boundary

Must remain true through merge/certification:

```text
live src/core/data-recovery-core.js unchanged
live src/core/data-recovery.js unchanged
live Recovery STORE_SPECS == 6
live Recovery BACKUP_VERSION == 2
new v3 contract absent from index.html
new v3 contract absent from sw.js
no localStorage Evidence writer
current Memory/Error/Listening/Scenario writers unchanged
no product read-path cutover
```

## Current durable source ownership — live app

```text
learner     → francais-avec-luc:learner:v1
memory      → french-tranquille:learning-memory:v1
errors      → french-tranquille:error-intelligence:v1
scenarios   → french-tranquille:scenarios:v1
listening   → french-tranquille:listening:v1
milestones  → french-tranquille:milestones:v1
```

Live Build 28 Recovery remains authoritative until Build 36.2 deliberately wires adoption.

## Canonical next action

```text
1. certify PR #168 dedicated Recovery-v3 smoke
2. fix any v1/v2/v3 contract defect found by CI
3. certify full historical PR matrix
4. merge #168 only if full green
5. certify exact merge SHA + Pages
6. only then open Build 36.2
```

Build 36.2 may wire the initial six→seven shadow adoption transaction, but must still keep the existing six stores canonical for product behaviour.
