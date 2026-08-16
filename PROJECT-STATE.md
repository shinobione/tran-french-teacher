# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting. Repository reality wins over stale historical wording.

## Last reconciliation

- Reconciled: **2026-08-16**
- Repository: `shinobione/tran-french-teacher`
- Default branch: `main`
- Current deployed `main`: **`bac91ad285b5f1950ed43db67283ceb42ebb3374`** — PR **#172**, runtime metadata maintenance.
- GitHub Pages **#225 SUCCESS** on that exact SHA.
- Visible application runtime metadata: **v2.4.0 · Build 36**.
- Pedagogy baseline: **v2.3.0 · Build 34**.
- Premium V5.10: **CLOSED / physical FIELD PASS**; issue **#114 CLOSED**.
- **Build 35 CLOSED — Memory Evidence v2 / Migration Readiness.**
- **Build 36 CLOSED — Memory Evidence v2 derived-shadow adoption.**
- **Build 37 ACTIVE — Foundations Core.**
- Active implementation slice: **37.1 · Foundations Core Contract / Registry**.
- Active branch: `build37/foundations-core-contract`.
- Active candidate PR: **#173 — `Build 37.1 · Foundations Core contract and registry`**.

## Current durable data contract — LOCKED

| Area | State |
|---|---|
| Curriculum | **52 lessons / 313 items** |
| Recovery durable stores | **7** |
| Backup envelope | **v3** |
| Evidence key | `french-tranquille:memory-evidence:v2` |
| Evidence role | **derived shadow only** |
| Product truth | **original six source stores remain canonical** |
| Product read-path cutover to Evidence | **NONE** |
| F01–F04 pilot persistence | **NONE / ephemeral only** |

Build 36.3 merged as PR #170 at `f37561f46016918fffc750e69a6e728c27b9144a` and closed the durability/adoption phase. PR #171 then formally opened Build 37. PR #172 only corrected runtime version ownership; it did not reopen Build 36.

## Current main CI debt

Current deployed main `bac91ad…` has **37 push workflow runs, including 5 inherited failures**:

1. `Build 36.2 Evidence shadow adoption`;
2. `V2.0.0 Freeze tribunal`;
3. `Build 36.3 Recovery v3 durability tribunal`;
4. `Build 28 Data recovery smoke`;
5. stale `.github/workflows/tmp-build36-closeout-reconcile.yml`.

These failures predate Build 37.1 and must not be misclassified as regressions caused by the Foundations candidate. The stale temporary Build 36 reconciler is removed in PR #173.

## Build 37.1 candidate scope

The first Foundations Core slice is deliberately **contract-only / non-wired**:

```text
Build 33 F01–F18 audit
+ Build 34 validated F01–F04 pilot
+ Build 36 seven-store durability boundary
→ pure Foundations registry
→ explicit teach / consolidate / reuse ownership
→ no runtime wiring
→ no durable write
→ no Evidence product read
```

Candidate files:

- `src/pedagogy/foundations-core.js` — pure F01–F18 registry;
- `tools/test-build37-foundations-core.cjs` — pure contract test;
- `.github/workflows/build37-1-foundations-core.yml` — dedicated guard;
- `docs/BUILD-37-1-FOUNDATIONS-CORE-CONTRACT.md` — slice contract.

`src/pedagogy/foundations-pilot.js` remains byte-identical in 37.1.

## Protected boundaries

Do not silently change:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
Recovery v3 seven-store ownership
Evidence derived-shadow role
V5.10 field-accepted navigation / visual identities
```

Recognition failure remains recognition-system evidence, never a pronunciation diagnosis.

## NEXT

```text
PR #173 is the active Build 37.1 candidate
→ run/classify its dedicated guard and PR matrix
→ merge only in a separate control step if it introduces no new regressions
→ after 37.1 certification, design 37.2 generic capsule engine from the registry
→ do NOT start learner-facing F05–F18 rollout yet
→ do NOT use Evidence as product truth without a separate explicit gate
```

**Build 36 is CLOSED. Do not reopen it without a concrete regression.**
