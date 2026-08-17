# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
> Repository/GitHub reality wins over stale wording. Always verify live `main`, PRs, CI and Pages before acting.

## Current checkpoint — 2026-08-17

- Repository: `shinobione/tran-french-teacher`.
- Default branch: `main`.
- Current accepted `main`: **`c2fa5f22bd695bbadea9239b8bdcc408a82c92fe`** — PR **#202**, versioning-governance handoff closeout.
- GitHub Pages proof for that handoff: **#268 / run `32062172506` — SUCCESS** on exact `c2fa5f22…` SHA.
- Current accepted Build 38 core checkpoint: **38.9**, PR **#199**, merge **`a33e504cdc20438c454fc365371af545ef747f0c`**.
- Current accepted learner-facing Transfer runtime on `main`: **38.8**, merge **`3fae502dba8faee003b44c5a1b9a9cffd9affec7`**.
- Public runtime metadata remains intentionally **v2.4.0 · Build 36**.
- Pedagogy baseline remains **v2.3.0 · Build 34**.
- Curriculum: **52 lessons / 313 items**.
- Scenario: **44 situations / 132 turns**.
- Speaking Loop: **52/52 · max 2 moments / lesson**.
- Recovery: **7 durable stores / backup v3**.
- Evidence v2: **derived shadow only; original six stores remain product truth**.
- Premium V5.10: **CLOSED / physical FIELD PASS**.
- **Build 35 CLOSED. Build 36 CLOSED. Build 37 CLOSED.**
- **Build 38 ACTIVE — Generalization & Transfer.**

## Active implementation candidate — Build 38.10

PR:

```text
#203 — Build 38.10 · learner-facing spoken-on transfer
branch = build38/spoken-on-learner-integration
base = c2fa5f22bd695bbadea9239b8bdcc408a82c92fe
status = OPEN / PR CANDIDATE / NOT MERGED
```

The required post-38.9 placement audit is resolved in favor of **lesson 52**, but only as active reconstruction through the existing Transfer renderer.

Audit result:

```text
lesson 52 already owns explanation + recognition of spoken on
lesson 34 already owns the exact nous source scaffold
38.9 already owns the deterministic pure core

missing learner action = actively rebuild known nous sentences with on
```

Therefore 38.10 adds exactly one optional lesson-52 Transfer route:

```text
Nous travaillons. → On travaille.
Nous rentrons.    → On rentre.
Nous allons à…    → On va à…
```

This is not another F18/Foundation capsule and not another grammar explanation. The lesson remains the teaching owner; Transfer adds retrieval/recombination.

Runtime route candidate:

```text
spokenOnIntegration = 38.10
spokenOnLesson = 52
spokenOnFamily = nous-on-spoken-equivalence
spokenOnExerciseIndexes = [0,1,2]
persistence = ephemeral-only
masteryClaim = false
```

Build 38.9 core ownership remains unchanged:

```text
src/pedagogy/generalization-spoken-on-core.js
slice = 38.9
status = pure-non-wired
byte-for-byte unchanged in 38.10
```

38.10 only loads and consumes that core through the existing shared renderer.

Dedicated candidate proof:

```text
tools/test-build38-10-spoken-on-integration.cjs
tests/browser/build38-10-spoken-on-integration.html
.github/workflows/build38-10-spoken-on-integration.yml
docs/BUILD-38.10-SPOKEN-ON-INTEGRATION.md
```

The Build 38.9 workflow is made successor-safe: the certified 38.9 core itself remains immutable, while future shared-adapter integration is no longer incorrectly banned.

## Existing learner-facing Transfer routes — LOCKED

```text
38.7 → lesson 13 / nominal plural / [0,2,3]
38.2 → lesson 33 / subject substitution / [0,2,5]
38.8 → lesson 34 / affirmation→negation / [0,1,2]
38.5 → lesson 35 / futur proche / [0,1,3]
```

Build 38.10 must preserve all four and keep exactly **one shared Transfer renderer**.

## Build 38.9 certified core — LOCKED

```text
family = nous-on-spoken-equivalence
status = pure-non-wired
persistence = ephemeral-only
masteryClaim = false

Nous travaillons. → On travaille.
Nous rentrons.    → On rentre.
Nous allons à…    → On va à…
```

Excluded from this family:

```text
On est prêts.
On a le temps.
generic / indefinite on
passive on
object-pronoun rewrites
negation
questions
adjective agreement
new vocabulary
random/adaptive generation
durable writes
Evidence product reads
mastery claims
```

## Build 37 Foundation ownership — LOCKED

```text
F01–F04 → lessons 8–13
F11     → lessons 17–20
F08     → lessons 32–33
F05     → lessons 34–36
F13     → lesson 40 only
F12     → lessons 41–43
```

F16 remains deferred / not completed.
F18 remains `spoken-on = explicit / reuse-existing / lesson 52`; 38.10 does not create a second Foundation route.

## Version metadata rule — LOCKED

```text
Public runtime release = v2.4.0 · Build 36
Pedagogy baseline      = v2.3.0 · Build 34
Roadmap checkpoint     = Build 38.10 candidate
```

Build 38.x slices do not auto-bump public Settings metadata. A public version change requires a dedicated release-version slice.

## Inherited CI debt

Exactly four historical failures remain baseline debt:

1. `Build 36.2 Evidence shadow adoption`;
2. `V2.0.0 Freeze tribunal`;
3. `Build 36.3 Recovery v3 durability tribunal`;
4. `Build 28 Data recovery smoke`.

Any other failure must be classified. Historical red debt is not permission to ignore new failures.

## Protected boundaries

Do not silently change:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
PWA identity/cache contract from PR #180
Recovery v3 / backup v3 / seven-store ownership
Evidence derived-shadow role
original six stores as product truth
52/313 curriculum semantics
Listening / Scenario / Mastery / Learner Intelligence owners
V5.10 field-approved navigation/visual identity
Build 37 Foundation routes
38.1 / 38.3 / 38.4 / 38.6 / 38.9 pure-core semantics
38.2 lesson-33 Transfer placement
38.5 lesson-35 Transfer placement
38.7 lesson-13 Transfer placement
38.8 lesson-34 Transfer placement
shared Transfer renderer ownership
```

Historical learner continuity remains a release contract:

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

## NEXT — control step for PR #203

Per `AGENTS.md`, implementation stops at the PR candidate boundary.

Next control action:

```text
review exact PR #203 diff
→ run/classify dedicated 38.10 gate + predecessor workflows
→ rerun suspected flakes unchanged
→ reject any new product regression
→ merge only after evidence is acceptable
→ verify exact main SHA + Pages if merged
→ durable closeout / next-family decision only afterward
```

Do **not** start another Build 38 family while PR #203 is open.
Do **not** start Build 39 while Build 38 remains active.

See `docs/BUILD-38.10-SPOKEN-ON-INTEGRATION.md`, `MASTER-ROADMAP.md` and `docs/RELEASE-VERSIONING-POLICY.md`.
