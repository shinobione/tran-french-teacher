# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting. Repository reality wins over stale historical wording.

## Last reconciliation

- Reconciled: **2026-08-16**
- Repository: `shinobione/tran-french-teacher`
- Default branch: `main`
- Current deployed `main`: **`5168b3b42d71a059d14e68ddf1c41831b5ef969b`** — PR **#174**, Build 37.2 Generic Foundations Capsule Engine.
- GitHub Pages deployment on that exact SHA: **SUCCESS**.
- Visible application runtime metadata: **v2.4.0 · Build 36**.
- Pedagogy baseline: **v2.3.0 · Build 34**.
- Premium V5.10: **CLOSED / physical FIELD PASS**; issue **#114 CLOSED**.
- **Build 35 CLOSED — Memory Evidence v2 / Migration Readiness.**
- **Build 36 CLOSED — Memory Evidence v2 derived-shadow adoption.**
- **Build 37 ACTIVE — Foundations Core.**
- **37.1 MERGED / CERTIFIED** — pure F01–F18 ownership registry.
- **37.2 MERGED / CERTIFIED** — pure generic capsule engine + exact F01–F04 mirror spec.
- Active implementation slice: **37.3 · F01–F04 Pilot Adapter / Renderer Convergence**.
- Active branch: `build37/foundations-pilot-adapter`.

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
| Foundations persistence | **NONE / ephemeral only** |

Build 36.3 merged as PR #170 and closed durability/adoption. PR #171 opened Build 37. PR #172 corrected runtime-version ownership only. PR #173 established the F01–F18 registry. PR #174 then merged the pure capsule engine/spec without learner-facing wiring.

## Current main CI baseline

Current `main` `5168b3b…` completed **36 push workflows**:

- **32 SUCCESS**;
- **4 inherited failures**;
- **0 queued**;
- **0 in-progress**.

Inherited failures still present:

1. `Build 36.2 Evidence shadow adoption`;
2. `V2.0.0 Freeze tribunal`;
3. `Build 36.3 Recovery v3 durability tribunal`;
4. `Build 28 Data recovery smoke`.

These failures predate Build 37 and are baseline CI debt, not evidence of a Foundations regression by themselves.

## Build 37.3 candidate scope

37.3 is the first learner-facing Build 37 refactor, but it is intentionally a **strict parity migration** rather than new content.

```text
Build 37.2 engine + exact F01–F04 spec
→ build32 loader loads engine → spec → pilot
→ existing Build 34 pilot renderer consumes engine/session state
→ same lessons 8–13
→ same entry card / overlay / texts / choices / answers / feedback
→ same VI / DEBUG FR behavior
→ same 0/20/40/60/80/100 progress rhythm
→ same return-to-lesson focus behavior
→ NO durable write
→ NO Evidence product read
→ NO F05–F18 learner rollout
```

Intentional runtime files in this candidate:

- `src/pedagogy/foundations-pilot.js` — renderer/adapter, no duplicate question state machine;
- `src/core/build32-loader.js` — ordered engine → capsule → pilot dependency loading;
- `sw.js` — targeted precache for the three Foundations dependencies without global cache identity change.

QA/docs files:

- `tests/browser/build37-foundations-pilot-adapter.html`;
- `.github/workflows/build37-3-foundations-pilot-adapter.yml`;
- `tools/test-build37-2-foundations-capsule-engine.cjs` — successor-aware parity proof;
- `docs/BUILD-37-3-FOUNDATIONS-PILOT-ADAPTER.md`.

The dedicated Build 37.3 guard has already passed real-app boot plus VI/FR parity on desktop and 390×844 before PR opening.

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
52 / 313 curriculum semantics
Listening / Scenario / Mastery / Learner Intelligence owners
V5.10 field-accepted navigation / visual identities
```

Recognition failure remains recognition-system evidence, never a pronunciation diagnosis.

## NEXT

```text
finish Build 37.3 candidate PR
→ dedicated 37.3 parity tribunal must remain green
→ classify full PR matrix against the four inherited main failures
→ merge only if there is no new regression
→ certify exact merged main + Pages
→ only then select the next small learner-facing Foundations expansion from Build 33 + the 37.1 registry
→ do NOT mass-rollout F05–F18
→ do NOT use Evidence as product truth without a separate explicit gate
```

**Build 36 is CLOSED. Do not reopen it without a concrete regression.**
