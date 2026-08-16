# Build 37.1 — Foundations Core Contract / Registry

Status: **CANDIDATE · CONTRACT ONLY · NO RUNTIME WIRING**

Depends on:

- `docs/BUILD-33-FOUNDATIONS-AUDIT.md`;
- `docs/BUILD-34-FOUNDATIONS-PILOT.md`;
- certified Build 36 seven-store / Recovery-v3 boundary.

## Why this is the first Build 37 slice

Build 34 proved one useful F01–F04 capsule, but its implementation is intentionally a bespoke optional pilot. Build 37 must industrialize Foundations without turning that pilot into a second curriculum or duplicating grammar that later lessons already teach explicitly.

The smallest safe first step is therefore a **pure Foundations syllabus contract** before any new learner-facing runtime is wired.

## Contract introduced

`src/pedagogy/foundations-core.js` registers the full audited F01–F18 map with three explicit ownership strategies:

```text
teach-core       → Foundations owns a reusable conceptual capsule
consolidate      → Foundations may later connect/disambiguate distributed teaching
reuse-existing   → the existing lesson remains canonical; Foundations must not duplicate it
```

### Teach-core

Initial validated pilot:

```text
F01 noun gender
F02 un / une / des
F03 le / la / l’ / les
F04 singular / plural
```

Later Core candidates identified by the Build 33 audit:

```text
F11 negation
F12 questions
F13 adjective agreement
F16 à / de contractions
```

Only F01–F04 are validated for the current pilot. Registering a later concept does **not** authorize immediate learner-facing rollout.

### Consolidate

```text
F05 subject pronouns
F08 regular -er present
F15 partitives / quantities
```

These already have distributed or practical teaching and should be consolidated rather than re-taught from zero.

### Reuse existing canonical teaching

```text
F06 être present                   → lesson 16
F07 avoir present                  → lesson 17
F09 aller + futur proche           → Stage 3
F10 vouloir / pouvoir / devoir     → lessons 18 / 47
F14 possessives                    → lesson 31
F17 recent past / passé composé    → Stage 3, including lesson 38 agreement context
F18 spoken on                      → lesson 52
```

## F01–F04 pilot compatibility

The registry freezes the already-validated pilot boundary:

- concepts exactly `F01–F04`;
- contextual entry in lessons `8–13`;
- optional;
- no top-level Grammar navigation;
- ephemeral answers only;
- no durable write;
- no mastery claim;
- sequence: observe → explain → construct → contrast → transfer.

`src/pedagogy/foundations-pilot.js` remains byte-identical in this slice.

## Build 36 storage boundary

Build 37.1 recognizes the certified current durability contract:

```text
Recovery stores = 7
backup envelope = v3
Evidence role   = derived shadow only
product truth   = original six source stores
```

The new Foundations contract:

- does not read or write local/session storage;
- does not call Recovery;
- does not read Evidence as product truth;
- creates no eighth store;
- does not change backup/restore/reset semantics;
- is absent from `index.html` and `sw.js`.

This means 37.1 itself has **zero runtime behavior change**.

## Protected runtime owners

This slice must not change:

```text
app.js
voice-ios.js
free-voice.js
src/core/data-recovery*.js
src/core/memory-evidence-v2-runtime.js
src/pedagogy/learning-memory.js
src/pedagogy/error-intelligence.js
src/pedagogy/listening-engine.js
src/pedagogy/scenario-engine.js
index.html
sw.js
```

Premium V5.10 field-accepted navigation/identity behavior also remains untouched.

## QA

`tools/test-build37-foundations-core.cjs` and the dedicated workflow verify:

- exactly 18 unique F01–F18 concepts;
- exact F01–F04 pilot ownership and lesson range;
- explicit teach / consolidate / reuse strategy;
- Build 36 seven-store safety metadata;
- no storage or Recovery dependency in the new core;
- no index / Service Worker wiring;
- current pilot byte identity;
- protected runtime owners untouched.

## Next slice if 37.1 is certified

**37.2 must be designed from this registry, not from ad-hoc DOM duplication.**

The next candidate should extract a generic capsule engine from the current F01–F04 pilot while preserving its field behavior and keeping persistence disabled unless a separate, explicit Evidence/product-read gate is approved.

Do not begin F05–F18 learner-facing rollout merely because they exist in the registry.
