# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting. Repository reality wins over stale historical wording.

## Last reconciliation

- Reconciled: **2026-08-16**
- Repository: `shinobione/tran-french-teacher`
- Default branch: `main`
- Current deployed `main`: **`7cbab4f58d5c5e4212aa81db343fcee0004e5cbb`** — PR **#173**, Build 37.1 Foundations Core contract/registry.
- GitHub Pages deployment on that exact SHA: **SUCCESS**.
- Visible application runtime metadata: **v2.4.0 · Build 36**.
- Pedagogy baseline: **v2.3.0 · Build 34**.
- Premium V5.10: **CLOSED / physical FIELD PASS**; issue **#114 CLOSED**.
- **Build 35 CLOSED — Memory Evidence v2 / Migration Readiness.**
- **Build 36 CLOSED — Memory Evidence v2 derived-shadow adoption.**
- **Build 37 ACTIVE — Foundations Core.**
- **37.1 MERGED / CERTIFIED** — pure F01–F18 registry, no runtime wiring.
- Active implementation slice: **37.2 · Generic Foundations Capsule Engine**.
- Active branch: `build37/foundations-capsule-engine`.

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

Build 36.3 merged as PR #170 at `f37561f46016918fffc750e69a6e728c27b9144a` and closed durability/adoption. PR #171 opened Build 37. PR #172 corrected runtime-version ownership only. PR #173 then established the pure F01–F18 Foundations registry and removed the stale temporary Build 36 reconciler.

## Current main CI baseline

Current `main` `7cbab4f…` completed **36 push workflows**:

- **32 SUCCESS**;
- **4 inherited failures**;
- **0 queued**;
- **0 in-progress**.

Inherited failures still present:

1. `Build 36.2 Evidence shadow adoption`;
2. `V2.0.0 Freeze tribunal`;
3. `Build 36.3 Recovery v3 durability tribunal`;
4. `Build 28 Data recovery smoke`.

These four failures predate Build 37 and are baseline CI debt, not evidence of a Foundations regression by themselves. The former fifth failure from `.github/workflows/tmp-build36-closeout-reconcile.yml` is gone because PR #173 removed that stale workflow.

## Build 37.2 candidate scope

37.2 extracts the deterministic session mechanics from the validated Build 34 F01–F04 pilot into a **pure generic capsule engine**.

```text
Build 34 learner-facing F01–F04 pilot
+ Build 37.1 F01–F18 ownership registry
→ generic immutable capsule definition
→ pure intro / question / feedback / done state machine
→ exact F01–F04 mirror fixture
→ Vietnamese / French localized read model
→ NO DOM wiring
→ NO durable write
→ NO Recovery dependency
→ NO Evidence product read
→ NO F05–F18 learner rollout
```

Candidate files:

- `src/pedagogy/foundations-capsule-engine.js` — pure deterministic engine;
- `src/pedagogy/foundations-capsules.js` — exact F01–F04 mirror capsule only;
- `tools/test-build37-2-foundations-capsule-engine.cjs` — pure state/parity tribunal;
- `.github/workflows/build37-2-foundations-capsule-engine.yml` — dedicated guard;
- `docs/BUILD-37-2-FOUNDATIONS-CAPSULE-ENGINE.md` — slice contract.

The current learner-facing `src/pedagogy/foundations-pilot.js` remains unchanged in 37.2.

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
Build 34 F01–F04 learner-visible pilot semantics
V5.10 field-accepted navigation / visual identities
```

Recognition failure remains recognition-system evidence, never a pronunciation diagnosis.

## NEXT

```text
finish Build 37.2 candidate
→ dedicated 37.2 guard must pass
→ classify full PR matrix against the four inherited main failures
→ merge only if there is no new regression
→ certify exact merged main + Pages
→ then 37.3 may adapt the existing F01–F04 renderer to the generic engine with strict visual/semantic parity
→ do NOT start learner-facing F05–F18 rollout yet
→ do NOT use Evidence as product truth without a separate explicit gate
```

**Build 36 is CLOSED. Do not reopen it without a concrete regression.**
