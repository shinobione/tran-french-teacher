# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
> Repository/GitHub reality wins over stale wording. Always verify live `main`, PRs, CI and Pages before acting.

## Current checkpoint — 2026-08-17

- Repository: `shinobione/tran-french-teacher`.
- Default branch: `main`.
- Current runtime-bearing `main`: **`2c7bf79a61d0cacd21f9345ed661cc3ac156e604`** — PR **#203**, Build **38.10** learner-facing spoken-`on` Transfer.
- GitHub Pages proof: **#269 / run `32065682064` — SUCCESS** on exact `2c7bf79a…` SHA.
- Build 38.10 dedicated final-head proof: **run `32064765660` — SUCCESS** on exact candidate head `21d20a30af276e975e3055d6bacc7d9d32eb4e91`.
- Build 38.9 core checkpoint remains **PR #199 / `a33e504cdc20438c454fc365371af545ef747f0c`** and remains the certified deterministic core owner.
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
- There is currently **no active product implementation candidate** after #203.

## Build 38.10 — CLOSED / MERGED / DEPLOYED

PR:

```text
#203 — Build 38.10 · learner-facing spoken-on transfer
candidate head = 21d20a30af276e975e3055d6bacc7d9d32eb4e91
squash merge   = 2c7bf79a61d0cacd21f9345ed661cc3ac156e604
status         = MERGED / DEPLOYED
Pages          = #269 / run 32065682064 SUCCESS
```

The required post-38.9 placement audit resolved in favor of **lesson 52**, but only as active reconstruction through the existing Transfer renderer.

Exact learner-facing Transfer:

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

This is not a second F18/Foundation capsule and not another grammar explanation. Lesson 52 remains the explanation/recognition owner; Transfer adds retrieval/recombination.

Build 38.9 core ownership remains unchanged:

```text
src/pedagogy/generalization-spoken-on-core.js
slice = 38.9
status = pure-non-wired
persistence = ephemeral-only
masteryClaim = false
```

The 38.9 core stayed byte-identical in 38.10. Build 38.10 only loads and consumes that certified API through the existing shared Transfer adapter.

## Shared Transfer routes — LOCKED

```text
38.7  → lesson 13 / nominal plural / [0,2,3]
38.2  → lesson 33 / subject substitution / [0,2,5]
38.8  → lesson 34 / affirmation→negation / [0,1,2]
38.5  → lesson 35 / futur proche / [0,1,3]
38.10 → lesson 52 / nous→spoken-on / [0,1,2]
```

There is exactly **one shared learner-facing Transfer renderer**.

## CI classification at 38.10 closeout

The live pre-38.10 base (`c2fa5f22…`) actually had **six failed push runs**, so the older four-item handoff list was incomplete.

Pre-38.10 failures observed on that exact base:

```text
French Trân'quille quality
Build 36.2 Evidence shadow adoption
V2.0.0 Freeze tribunal
Build 36.3 Recovery v3 durability tribunal
Build 28 Data recovery smoke
Build 26.4 Progress single-scroll + Tyffany smoke
```

Classification after #203:

- `Build 26.4 Progress single-scroll + Tyffany smoke` passed on the #203 candidate and is therefore treated as a **runner/harness flake**, not durable baseline debt.
- `French Trân'quille quality` is inherited stale CI: it still contains literal Build-24 wiring/version assertions and fails before its Chrome stage.
- The four previously documented failures remain inherited historical debt.
- The resulting persistent inherited failure set at the 38.10 checkpoint is therefore **five**, not four.

Persistent inherited set:

```text
French Trân'quille quality
Build 36.2 Evidence shadow adoption
V2.0.0 Freeze tribunal
Build 36.3 Recovery v3 durability tribunal
Build 28 Data recovery smoke
```

Any other failure is new until classified. Historical red debt is never permission to ignore a new regression.

### PR #203 controlled queue note

The final-head Build 38.10 tribunal completed **SUCCESS** on `21d20a30…`, and the completed final-head matrix introduced no failure outside the inherited set.

One unrelated `Premium V5.7 Theme Art Integration` final-head run remained queued behind the Actions fan-out at merge time. Its immediately preceding run on head `6e854224…` was **SUCCESS**, and the only subsequent code change was the shared Transfer HTML `&quot;` escaping correction, outside Theme Art ownership.

PR #203 therefore merged under an explicit **controlled queue exception**. Do not rewrite this as “every final-head workflow had drained before merge.”

Post-merge Pages then completed **SUCCESS** on the exact squash merge SHA.

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
Roadmap checkpoint     = Build 38.10
```

Build 38.x slices do not auto-bump public Settings metadata. A public version change requires a dedicated release-version slice.

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

## NEXT — Build 38 milestone audit, not an automatic 38.11

There is no authorized 38.11 candidate.

Next canonical control decision:

```text
verify Build 38.1→38.10 ownership and deployed learner-facing coverage
→ identify whether any high-value deterministic transfer family remains genuinely unresolved
→ reject duplicates / weakly scaffolded families
→ if Build 38 is pedagogically complete, prepare a dedicated Build-38 milestone closeout / release-version decision
→ only if one clearly justified family remains, audit and authorize ONE narrow successor slice
```

Do **not** start Build 39 while Build 38 remains open.
Do **not** change Settings to `v2.5.0 · Build 38` without an explicit release-version slice and dedicated certification.

`MASTER-ROADMAP.md` still contains the pre-38.10 Build-38 placement wording at this docs-closeout branch point. Treat this `PROJECT-STATE.md` plus `docs/BUILD-38.10-SPOKEN-ON-INTEGRATION.md` as the current volatile handoff until the next deliberate MASTER consolidation; do not delete or compress historical roadmap evidence to force a cosmetic reconciliation.
