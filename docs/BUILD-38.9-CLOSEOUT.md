# Build 38.9 — deterministic `nous → on` spoken transfer core — CLOSEOUT

Date: 2026-08-17

## Status

**CLOSED / CERTIFIED / NON-WIRED**

Build 38.9 adds one narrow deterministic Generalization & Transfer core. It does not add a learner-facing lesson route.

## Accepted family

```text
family = nous-on-spoken-equivalence
schema = french-tranquille-generalization-spoken-on/v1
status = pure-non-wired
persistence = ephemeral-only
masteryClaim = false
```

Exact certified catalog:

```text
Nous travaillons. → On travaille.
Nous rentrons.    → On rentre.
Nous allons à…    → On va à…
```

The source scaffold is already learner-known from lesson 34. The target rule is already taught by lesson 52 / F18: spoken `on` often replaces `nous` and takes the verb form used with `il/elle`.

Agreement transfer was audited and rejected for this slice because the corresponding masculine source forms are not equally solid learner-facing acquisitions.

## Explicit exclusions

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
learner-facing lesson wiring
```

## Git / CI proof

```text
PR #199
candidate head e066baa3d4c481f65bb361a4406d2a861b7563f3
squash merge a33e504cdc20438c454fc365371af545ef747f0c
```

Before merge:

- dedicated Build 38.9 run `32058789584` — SUCCESS;
- Node contract — SUCCESS;
- pure/successor-safe ownership guard — SUCCESS;
- Chrome VI/FR × desktop/iPhone-size — SUCCESS;
- exactly three real answer clicks;
- localStorage unchanged;
- no horizontal overflow;
- no new failure beyond the four inherited historical CI debts.

After merge on exact SHA `a33e504c…`:

- Actions failure count = exactly 4, matching the inherited baseline;
- queued = 0;
- in-progress = 0;
- GitHub Pages **#265 / run `32059362998` — SUCCESS**.

The inherited failures remain:

1. Build 36.2 Evidence shadow adoption;
2. V2.0.0 Freeze tribunal;
3. Build 36.3 Recovery v3 durability tribunal;
4. Build 28 Data recovery smoke.

## Learner-facing placement is NOT authorized yet

Build 38.9 is deliberately non-wired. Lesson 52 is the obvious placement candidate, but it already teaches the F18 `on` concept. A future integration slice must first prove that an optional Transfer card adds useful construction practice rather than duplicating the lesson.

Canonical next decision:

```text
inspect lesson 52 density + F18 ownership + shared Transfer renderer
→ judge whether 3 deterministic nous→on constructions add value
→ if yes: assign one separate learner-facing integration slice
→ if no: keep 38.9 as certified reusable core and audit another narrow family
```

## Version metadata note

Settings currently remains **`v2.4.0 · Build 36` by design**. PR #172 separated current runtime metadata from the pedagogical baseline and historical audit metadata, then locked runtime ownership in `src/core/build32-loader.js`.

Build 37.x and Build 38.x are roadmap/pedagogy slices; they do not automatically mutate the public runtime version. Do not use `38.9` as a user-facing version number. A future release-version update should be an explicit, separately tested decision (for example at a phase/release closeout), not an incidental side effect of adding a pure Transfer core.
