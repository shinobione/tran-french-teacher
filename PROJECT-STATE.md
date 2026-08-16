# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting.

## Last reconciliation

- Reconciled: **2026-08-16**
- Repository: `shinobione/tran-french-teacher`
- Default branch: `main`
- Current certified `main`: **`9ea91e3cc03a7c4c1f2cd617b4485420debc5f86`** — PR **#168**, Build **36.1 Recovery v3 + seventh-store contract**.
- PR #168: **47/47 pull-request workflows completed, 0 failure**.
- Post-merge on exact SHA `9ea91e3c…`: **33/33 push workflows completed, 0 failure**.
- GitHub Pages **#221 SUCCESS** on exact SHA `9ea91e3c…`.
- Latest pre-Build36 product/runtime-bearing Premium checkpoint remains **`54209392d3a349a1aefab14615dcecf24a59fcea`** — PR #161 / V5.10 FIELD PASS.
- Premium V5.10: **CLOSED**. Issue **#114 CLOSED**.
- Build 35: **CLOSED / migration readiness proven**.
- Build 36: **ACTIVE / Memory Evidence v2 Adoption Candidate**.
- Active slice: **36.2 — Evidence v2 derived-shadow runtime adoption**.
- Active PR: **#169 — `Build 36.2 · Evidence v2 derived-shadow runtime adoption`**.
- Candidate branch: `build36/evidence-shadow-adoption`.
- **Build 36.3 remains BLOCKED until #169 is merged and post-merge certified.**

## Product / data baseline

| Area | State |
|---|---|
| Production pedagogy | **V2.3.0 · Build 34** |
| Build 35 | **CLOSED** |
| Build 36.1 | **CERTIFIED** |
| Build 36.2 | **ACTIVE · PR #169** |
| Current certified live stores on main | **6 / backup v2** |
| 36.2 candidate live stores | **7 / backup v3** |
| Seventh store | `french-tranquille:memory-evidence:v2` |
| Seventh-store role | **derived-shadow only** |
| Product read-path cutover | **NONE / forbidden in 36.2** |
| Premium visual line | **V5.10 CLOSED · physical FIELD PASS** |

## Certified chain before 36.2

```text
Build 35.1 · PR #164
→ deterministic Evidence v2 projection
→ main 68b24c8a541992085309bc4a53f46e3a0f21eb97
→ 30/30 push · Pages #217 SUCCESS

Build 35.2 · PR #165
→ isolated transactional migration simulation
→ PR 45/45 · main 31/31 · Pages #218 SUCCESS

Build 35 closeout · PR #166
→ Build 36 adoption-readiness contract
→ PR 46/46 · main 32/32 · Pages #219 SUCCESS

Roadmap gate · PR #167
→ Build 35 CLOSED / Build 36 NEXT
→ main 20915545022fea92b08d364d99545078286fcbbc
→ 32/32 push · Pages #220 SUCCESS

Build 36.1 · PR #168
→ pure seven-store / backup-v3 Recovery contract
→ PR 47/47 · 0 failure
→ main 9ea91e3cc03a7c4c1f2cd617b4485420debc5f86
→ 33/33 push · 0 failure
→ Pages #221 SUCCESS
```

## Evidence v2 permanent semantics

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

Evidence states:

```text
exposure
assisted-success
autonomous-recall
contextual-reuse
concept-understanding
novel-construction-transfer
```

Safety rules:

- `voice-unrecognized` = recognition-system evidence only, never a pronunciation failure;
- model use proves assistance, not successful production by itself;
- construction/transfer/concept-understanding are never fabricated from insufficient history;
- history remains bounded/deterministic;
- historical unattributable aggregates remain explicit diagnostics.

## Build 36 adoption model — LOCKED

Evidence enters first as a **derived shadow store**:

```text
learner + memory + errors + scenarios + listening + milestones
                         ↓
               deterministic projection
                         ↓
             evidence derived-shadow
```

The original six stores remain canonical for product behaviour. Code rollback may ignore the extra Evidence key without losing learner history.

Build 36 sequence:

```text
36.1 Recovery v3 + seventh-store contract ✅ CERTIFIED
→ 36.2 Evidence shadow adoption runtime ← ACTIVE
→ 36.3 backup / restore / reset / rollback browser tribunal
```

## Build 36.2 candidate — PR #169

### Intentional runtime changes

New runtime owners:

```text
src/core/data-recovery-v3-runtime-core.js
src/core/memory-evidence-v2-runtime.js
```

Existing runtime owners deliberately changed:

```text
src/core/data-recovery.js
index.html
sw.js
```

Historical Recovery/Build35/Build36.1 tests/workflows are made successor-aware without removing their original proof semantics.

### Boot order

```text
Build 28 source validators
→ Build 35 Evidence projector
→ Build 36.1 Recovery v3 contract
→ Build 36.2 Recovery v3 runtime adapter
→ live Recovery
→ Evidence shadow runtime
→ app / pedagogy writers
```

### First shadow adoption

Any **first Evidence creation** with non-empty source data — at boot or after the first source write on a fresh device — requires:

```text
pre-migration snapshot (Evidence missing)
→ deterministic projection
→ Recovery-validated Evidence write
→ reread
→ exact source/coherence compare
→ seven-store last-good
```

A failed adoption restores the pre-migration state.

### Ongoing freshness

Valid writes/removals to one of the six source stores schedule a microtask-coalesced shadow refresh.

Recovery itself refreshes an **existing** shadow before snapshot / last-good / backup so durable metadata cannot contain:

```text
new source bytes + stale Evidence bytes
```

Recovery never implicitly creates a missing Evidence key; first creation remains owned by the explicit migration transaction.

### Live Recovery v3 candidate

```text
STORE_SPECS = 7
BACKUP_VERSION = 3
```

Backup v3 always rebuilds Evidence from the six canonical sources rather than trusting stored shadow bytes.

Restore semantics remain the certified 36.1 matrix:

```text
v3 → seven owned stores + Evidence/source coherence mandatory
v2 → six historical stores + rebuild Evidence
v1 → learner/memory from backup + preserve four later source stores + rebuild Evidence
```

Malformed Evidence writes are blocked/quarantined through the existing Recovery guard.

Learner reset clears all seven candidate stores through the generic Recovery store set.

### Same-profile browser proof

The dedicated 36.2 workflow uses the same Chrome profile twice:

```text
first boot
→ adopt Evidence
→ require pre-migration snapshot
→ source refresh + exact restore
→ corrupt write blocked/quarantined
→ coherent backup v3 + last-good

second boot / same profile
→ Evidence exists at boot
→ no remigration / no new adoption
→ still coherent
→ same source refresh/restore guarantees
```

### Product owners that MUST remain byte-identical

```text
app.js
learning-memory.js
error-intelligence.js
listening-engine.js
scenario-engine.js
voice-ios.js
free-voice.js
```

Mastery / Learner Intelligence are additionally scanned to ensure they do not read Evidence in 36.2.

### PWA/cache

The new runtime files are precached with targeted `2.4.0-b36.2` URLs.

Global cache identity remains deliberately unchanged:

```text
tran-french-teacher-v2.3.22-b34.14-v58debug1
```

No global cache nuke. Network-first Service Worker behaviour remains unchanged.

## Canonical next action

```text
1. certify PR #169 dedicated Build 36.2 workflow
2. inspect/fix any migration or historical-CI failure
3. require full PR matrix green
4. merge only if full green
5. certify exact merge SHA + Pages
6. only then open Build 36.3
```

**Do not move product read ownership to Evidence v2 in Build 36.2. Build 36 is not closed until 36.3 passes.**
