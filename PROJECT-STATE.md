# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting.

## Last reconciliation

- Reconciled: **2026-08-16**
- Repository: `shinobione/tran-french-teacher`
- Default branch: `main`
- Current certified `main`: **`c972bdc44d272c30601d73509c6e8a39c72f57cf`** — PR **#165**, Build **35.2** transactional Memory Evidence v2 migration simulation.
- PR #165: **MERGED**.
- PR #165 candidate: **45/45 pull-request workflows completed, 0 failure**.
- Post-merge certification on exact SHA `c972bdc44…`: **31/31 push workflows completed, 0 failure**.
- GitHub Pages **#218 SUCCESS** on exact SHA `c972bdc44…`.
- Previous Build 35 checkpoint: **`68b24c8a541992085309bc4a53f46e3a0f21eb97`** — PR **#164**, deterministic Evidence v2 projection contract; **30/30 push workflows, 0 failure, Pages #217 SUCCESS**.
- Latest product/runtime-bearing checkpoint remains **`54209392d3a349a1aefab14615dcecf24a59fcea`** — PR **#161**, V5.10 Theme-picker physical-field repair.
- Premium V5.10: **CLOSED / physical FIELD PASS**.
- Premium gate issue **#114 CLOSED**.
- **Build 35 implementation proof is complete.**
- Active candidate: **Build 35 closeout / Build 36 adoption-readiness contract** on branch `build35/closeout-readiness`.
- **Build 36 remains BLOCKED until that closeout is merged and certified.**

## Product baseline

| Area | State |
|---|---|
| Production pedagogy | **V2.3.0 · Build 34** |
| Active engineering line | **Build 35 · closeout / migration readiness** |
| Certified Build 35 slice | **35.1 · Evidence v2 deterministic projection** |
| Certified Build 35 slice | **35.2 · transactional migration simulation** |
| Durable pedagogical stores | **6 — unchanged** |
| Proposed future store | `french-tranquille:memory-evidence:v2` — **NOT ADOPTED** |
| Backup envelope | **v2 — unchanged** |
| Premium visual line | **V5.10 CLOSED · FIELD PASS** |
| Build 36 | **BLOCKED pending Build 35 closeout certification** |

## Build 35.1 — certified

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

## Build 35.2 — certified

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

No production Evidence key, runtime loader, Service Worker entry or Recovery seventh-store adoption exists yet.

## Build 35 Definition of Done status

Canonical Build 35 requirements are now technically met:

```text
evidence model useful            ✅
ownership clear                  ✅
bounded history clear            ✅
compatibility strategy clear     ✅
migration simulable/reversible   ✅
new durable schema not adopted   ✅
```

The remaining Build 35 work unit is **closeout governance**, not another migration implementation slice.

## Build 36 adoption-readiness contract — closeout candidate

`docs/BUILD-35-CLOSEOUT-ADOPTION-READINESS.md` defines the required next-build contract.

### Initial adoption role

Evidence v2 must enter Build 36 first as a **derived shadow store**, not an immediate replacement for the six current pedagogy sources.

```text
six current canonical stores
→ deterministic Evidence v2 projection
→ seventh shadow store
```

This preserves safe code rollback: older code ignores the extra key while the six canonical stores retain all current semantics.

### Recovery / backup changes reserved for Build 36

Build 36 must deliberately provide:

- seventh Recovery store validator;
- backup envelope **v3** rather than silently redefining v2;
- explicit v1/v2/v3 restore matrix;
- per-store missing ownership (`preserveMissingIds`);
- derived-store rebuild ownership (`rebuildDerivedIds`);
- pre-migration snapshot;
- initial six→seven write/reread/compare/rollback;
- source-write shadow refresh ownership centralized through Recovery;
- reset / last-good / quarantine coverage for Evidence;
- v1, v2 and v3 backup browser tribunals;
- no product read-path cutover in the first adoption slice.

Recommended Build 36 sequence:

```text
36.1 Recovery v3 + seventh-store contract
36.2 Evidence shadow adoption runtime
36.3 backup / restore / reset / rollback browser tribunal
```

## Durable source ownership — still unchanged in Build 35

```text
learner     → francais-avec-luc:learner:v1
memory      → french-tranquille:learning-memory:v1
errors      → french-tranquille:error-intelligence:v1
scenarios   → french-tranquille:scenarios:v1
listening   → french-tranquille:listening:v1
milestones  → french-tranquille:milestones:v1
```

Build 28 Recovery remains authoritative for current validation, backup normalization, snapshots, writes, reread/compare, rollback and corruption quarantine.

## Protected Build 35 closeout boundary

Until the closeout candidate is certified/merged:

```text
Recovery STORE_SPECS == 6
Recovery BACKUP_VERSION == 2
Evidence key absent from Recovery STORE_SPECS
Evidence core absent from index.html
Evidence simulator absent from index.html
Evidence files absent from sw.js
current six product source owners unchanged
```

## Canonical next action

```text
1. certify Build 35 closeout candidate
2. verify no-adoption guard + historical CI
3. merge closeout if green
4. verify exact main SHA + Pages
5. reconcile MASTER-ROADMAP durable gate:
      Build 35 → CLOSED
      Build 36 → NEXT / Adoption Candidate
6. only then start Build 36.1
```

**Do not adopt `french-tranquille:memory-evidence:v2` durably inside Build 35.**
