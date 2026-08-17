# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
> Repository/GitHub reality wins over stale wording. Always verify live `main`, PRs, CI and Pages before acting.

## Current checkpoint — 2026-08-17

- Repository: `shinobione/tran-french-teacher`.
- Default branch: `main`.
- Current accepted `main`: **`143beca0f45e5c71d9b72f5f3cb49f9b5b0877b1`** — PR **#204**, Build 38.10 docs handoff closeout.
- Current runtime-bearing checkpoint: **`2c7bf79a61d0cacd21f9345ed661cc3ac156e604`** — PR **#203**, Build **38.10** learner-facing spoken-`on` Transfer.
- Runtime Pages proof: **#269 / run `32065682064` — SUCCESS** on exact `2c7bf79a…` SHA.
- Docs Pages proof: **#270 / run `32066217001` — SUCCESS** on exact `143beca0…` SHA.
- Build 38.10 dedicated final-head proof: **run `32064765660` — SUCCESS** on exact candidate head `21d20a30af276e975e3055d6bacc7d9d32eb4e91`.
- Public runtime metadata remains intentionally **v2.4.0 · Build 36**.
- Pedagogy baseline remains **v2.3.0 · Build 34**.
- Curriculum: **52 lessons / 313 items**.
- Scenario: **44 situations / 132 turns**.
- Speaking Loop: **52/52 · max 2 moments / lesson**.
- Recovery: **7 durable stores / backup v3**.
- Evidence v2: **derived shadow only; original six stores remain product truth**.
- Premium V5.10: **CLOSED / physical FIELD PASS**.
- **Build 35 CLOSED. Build 36 CLOSED. Build 37 CLOSED.**
- **Build 38 = PEDAGOGICALLY COMPLETE / milestone closeout candidate in PR #205.**

## Active governance candidate — PR #205

```text
#205 — Docs · close Build 38 milestone
branch = docs/build38-milestone-closeout
base = 143beca0f45e5c71d9b72f5f3cb49f9b5b0877b1
status = OPEN / DOCS-GOVERNANCE CANDIDATE / NOT MERGED
runtime changes = NONE
```

This candidate reconciles `MASTER-ROADMAP.md`, records the Build 38 milestone audit, and proposes the durable phase-gate decision:

```text
Build 38 = PEDAGOGICALLY COMPLETE
Build 38.11 = NOT AUTHORIZED
next = explicit release-version decision/certification
```

Do **not** treat Build 38 as durably closed on `main` until PR #205 is reviewed and merged. The pedagogical audit verdict is complete; the governance closeout is the active candidate.

## Build 38 certified chain

```text
38.1 → 38.2  subject substitution
               lesson 33 / [0,2,5]

38.3 → 38.8  affirmation → negation
               lesson 34 / [0,1,2]

38.4 → 38.5  present → futur proche
               lesson 35 / [0,1,3]

38.6 → 38.7  singular → plural nominal
               lesson 13 / [0,2,3]

38.9 → 38.10 nous → spoken on
               lesson 52 / [0,1,2]
```

There is exactly **one shared learner-facing Transfer renderer**. All learner-facing Transfer remains optional/ephemeral with no durable write, no Evidence product read and no mastery claim.

## Build 38.10 — CLOSED / MERGED / DEPLOYED

```text
PR #203
candidate head = 21d20a30af276e975e3055d6bacc7d9d32eb4e91
squash merge   = 2c7bf79a61d0cacd21f9345ed661cc3ac156e604
Build 38.10 run = 32064765660 SUCCESS
Pages = #269 / run 32065682064 SUCCESS
```

Exact learner-facing lesson-52 Transfer:

```text
Nous travaillons. → On travaille.
Nous rentrons.    → On rentre.
Nous allons à…    → On va à…
```

Canonical route:

```text
spokenOnIntegration = 38.10
spokenOnLesson = 52
spokenOnFamily = nous-on-spoken-equivalence
spokenOnExerciseIndexes = [0,1,2]
persistence = ephemeral-only
masteryClaim = false
```

Build 38.9 remains the certified deterministic core owner. Its core stayed byte-identical in 38.10.

## Milestone audit verdict — no Build 38.11

The post-38.10 audit tested whether any remaining high-value deterministic transfer family is sufficiently scaffolded by the existing learner curriculum.

### Rejected: adjective agreement

F13 / lesson 40 consolidates feminine forms already used by Trân (`prête`, `contente`, `fatiguée`, `stressée`, `inquiète`, `française`). The matching masculine source forms are not an equally solid learner-facing acquisition set.

A `masculine → feminine` family would therefore smuggle weakly acquired source material into a supposed generalization exercise.

### Rejected: generic question transformation

F12 intentionally teaches several different strategies:

```text
Tu travailles ?
Tu habites où ?
Pourquoi ?
Qu'est-ce que ça veut dire ?
Pouvez-vous reformuler ?
```

It explicitly avoids requiring inversion. There is no single deterministic `affirmation → question` transform that preserves F12 ownership and adds enough value to justify a family.

### Rejected/deferred: other directions

- lesson-43 comparatives are already explicit learner content, so another Transfer family would largely duplicate teaching;
- broad combinatorial recombination would cross into wider lexical/semantic compatibility or adaptive/random generation;
- F16 contractions remain deferred Foundation work because the full scaffold is still not clean enough.

Therefore:

```text
Build 38 pedagogical boundary = REACHED
Build 38.11 = NO
```

See `docs/BUILD-38-MILESTONE-CLOSEOUT.md`.

## Release metadata rule — LOCKED

Closing Build 38 does **not** change public Settings metadata in PR #205.

```text
Public runtime release = v2.4.0 · Build 36
Pedagogy baseline      = v2.3.0 · Build 34
Roadmap runtime checkpoint = Build 38.10
```

The natural coherent release candidate is:

```text
v2.5.0 · Build 38
```

but it is **not assigned or shipped yet**. A separate explicit release-version decision/certification slice must own any change to public metadata.

## CI classification at Build 38 closeout

Persistent inherited failure set is **five**:

```text
French Trân'quille quality
Build 36.2 Evidence shadow adoption
V2.0.0 Freeze tribunal
Build 36.3 Recovery v3 durability tribunal
Build 28 Data recovery smoke
```

`Build 26.4 Progress single-scroll + Tyffany smoke` passed unchanged during the Build 38.10 candidate and remains classified as a runner/harness flake, not durable baseline debt.

Any other failure is new until classified. Historical red debt is never permission to ignore a new regression.

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
38.10 lesson-52 Transfer placement
shared Transfer renderer ownership
```

Historical learner continuity remains a release contract:

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

## NEXT — control step for PR #205

Per `AGENTS.md`, this governance slice stops at the PR candidate boundary.

Next control action:

```text
review exact PR #205 diff
→ verify it is docs/governance only
→ classify CI against the five-item inherited baseline
→ merge only if no new regression / governance contradiction appears
→ verify main + Pages on exact merge SHA
→ then open a separate release-version decision/certification slice
```

Do **not** start Build 38.11.
Do **not** change Settings to `v2.5.0 · Build 38` inside PR #205.
Do **not** start Build 39 until the release-version boundary is explicitly decided/certified.
