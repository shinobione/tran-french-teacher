# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting.

## Last reconciliation

- Reconciled: **2026-08-16**
- Repository: `shinobione/tran-french-teacher`
- Default branch: `main`
- Current certified `main`: **`1e3209d70cd9eebc3eb7dd4bb8df6047d9d029a7`** — PR **#166**, Build **35 closeout / Memory Evidence v2 adoption readiness**.
- PR #166 candidate: **46/46 pull-request workflows completed, 0 failure**.
- Post-merge certification on exact SHA `1e3209d7…`: **32/32 push workflows completed, 0 failure**.
- GitHub Pages **#219 SUCCESS** on exact SHA `1e3209d7…`.
- Build 35.2 checkpoint: **`c972bdc44d272c30601d73509c6e8a39c72f57cf`** — PR **#165**, transactional migration simulation; **45/45 PR**, **31/31 push**, Pages **#218**, all green.
- Build 35.1 checkpoint: **`68b24c8a541992085309bc4a53f46e3a0f21eb97`** — PR **#164**, deterministic Evidence v2 projection contract; **30/30 push**, Pages **#217**, all green.
- Latest product/runtime-bearing checkpoint remains **`54209392d3a349a1aefab14615dcecf24a59fcea`** — PR **#161**, V5.10 Theme-picker physical-field repair.
- Premium V5.10: **CLOSED / physical FIELD PASS**.
- Premium gate issue **#114 CLOSED**.
- **Build 35 is CLOSED / migration readiness proven.**
- **Build 36 is NEXT / Memory Evidence v2 Adoption Candidate.**
- Next implementation slice: **Build 36.1 — Recovery v3 + seventh-store contract**.

## Product baseline

| Area | State |
|---|---|
| Production pedagogy | **V2.3.0 · Build 34** |
| Closed engineering milestone | **Build 35 · Memory Evidence v2 / Migration Readiness** |
| Next canonical build | **Build 36 · Memory Evidence v2 Adoption Candidate** |
| Next slice | **36.1 · Recovery v3 + seventh-store contract** |
| Durable pedagogical stores | **6 — current runtime** |
| Proposed future store | `french-tranquille:memory-evidence:v2` — **NOT ADOPTED YET** |
| Current backup envelope | **v2** |
| Build 36 target backup envelope | **v3** |
| Premium visual line | **V5.10 CLOSED · FIELD PASS** |

## Build 35 — CLOSED / certified

### 35.1 — deterministic Evidence v2 projection

Evidence v2 is defined as a deterministic projection over the six current Recovery stores.

Dimensions:

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

- `voice-unrecognized` is recognition-system evidence only, never a pronunciation failure;
- model use proves assistance, not successful production by itself;
- construction/transfer/concept-understanding are not fabricated from history that cannot prove them;
- unattributable historical aggregates remain explicitly unattributed;
- per-item history is bounded and deterministic.

### 35.2 — transactional migration simulation

The migration mechanics are proven in an isolated storage sandbox:

```text
six-source snapshot
→ Build 28 Recovery validation
→ deterministic Evidence transform
→ sandbox write
→ reread
→ canonical compare
→ verify six sources unchanged
→ rollback
→ byte-equivalence verification
```

Hard guard:

```text
real window.localStorage / unmarked storage
→ sandbox-required
```

Injected failures proven to rollback:

```text
after-write
corrupt-target
source-drift
```

Old backup compatibility proof:

```text
backup v1
→ Recovery.normalizeBackup()
→ backup v2
→ isolated Evidence transaction
→ verify
→ rollback
```

### Build 35 Definition of Done — satisfied

```text
evidence model useful            ✅
ownership clear                  ✅
bounded history clear            ✅
compatibility strategy clear     ✅
migration simulable/reversible   ✅
new durable schema not adopted   ✅
```

Closeout proof is permanently guarded by `.github/workflows/build35-closeout.yml` and `tests/smoke/build35-closeout-smoke.js`.

## Build 36 adoption contract — LOCKED

`docs/BUILD-35-CLOSEOUT-ADOPTION-READINESS.md` defines the required adoption model.

### Initial adoption role

Evidence v2 enters first as a **derived shadow store**, not an immediate replacement for the six current pedagogy sources.

```text
six current canonical stores
→ deterministic Evidence v2 projection
→ seventh shadow store
```

This preserves safe rollback: older code ignores the extra key while the six canonical stores retain current learner semantics.

### Build 36 required sequence

```text
36.1 Recovery v3 + seventh-store contract
36.2 Evidence shadow adoption runtime
36.3 backup / restore / reset / rollback browser tribunal
```

### 36.1 required scope

- add Evidence as a seventh Recovery store contract;
- validate Evidence schema v2 + bounded history/dimensions/states;
- bump backup envelope **v2 → v3** instead of silently redefining v2;
- define explicit v1/v2/v3 restore matrix;
- replace global missing semantics with explicit ownership such as `preserveMissingIds` and `rebuildDerivedIds`;
- preserve current six store schemas and product writers;
- prove all migration planning in pure tests before runtime adoption;
- **no Evidence runtime write and no product read-path cutover in 36.1**.

### Old-backup ownership locked for Build 36

```text
v3 → owns seven stores directly

v2 → owns six historical stores
   → Evidence must be rebuilt from the restored six
   → never preserve a newer device's Evidence shadow

v1 → owns learner + memory
   → preserve historically absent errors/scenarios/listening/milestones
   → do not preserve Evidence
   → rebuild Evidence from the resulting six-store target
```

## Durable source ownership — current runtime

```text
learner     → francais-avec-luc:learner:v1
memory      → french-tranquille:learning-memory:v1
errors      → french-tranquille:error-intelligence:v1
scenarios   → french-tranquille:scenarios:v1
listening   → french-tranquille:listening:v1
milestones  → french-tranquille:milestones:v1
```

Build 28 Recovery remains authoritative for current validation, backup normalization, snapshots, writes, reread/compare, rollback and corruption quarantine until Build 36 deliberately extends that contract.

## Protected adoption boundary

At the certified Build 35 closeout:

```text
Recovery STORE_SPECS == 6
Recovery BACKUP_VERSION == 2
Evidence key absent from Recovery STORE_SPECS
Evidence core absent from index.html
Evidence simulator absent from index.html
Evidence files absent from sw.js
current six product source owners unchanged
```

Build 36.1 may intentionally change **Recovery contract/test code only for the seventh-store + backup-v3 design**, but must not yet write the Evidence store in the live app or move product read ownership.

## Canonical next action

```text
Build 36.1 — Recovery v3 + seventh-store contract

1. branch from exact certified/reconciled main
2. extend pure Recovery store/backup planning to seven-store target
3. Evidence validator + backup v3
4. explicit v1/v2/v3 preserve/rebuild semantics
5. pure migration-plan/restore tests including failure cases
6. historical Recovery regression
7. no runtime Evidence persistence
8. materialize candidate PR and certify before 36.2
```

**Do not skip directly to Evidence runtime adoption or product read-path cutover.**
