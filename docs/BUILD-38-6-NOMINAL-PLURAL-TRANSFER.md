# Build 38.6 — deterministic singular → plural nominal transfer

Status: **IMPLEMENTED / PR CANDIDATE / NOT MERGED**

## Why this family now

Build 38 originally prioritised singular → plural, but earlier slices first established safer verbal transformations. After Build 38.5, this nominal-number family is now the cleanest remaining gap because the required article system and vocabulary are already learner-known.

Exact anchors:

```text
lesson 8  → La gare. / La pharmacie.
lesson 9  → Je voudrais un billet.
lesson 12 → Une table pour deux, s’il vous plaît.
F01–F04   → la gare / un billet / une table / les toilettes
F01–F04   → le/la → les ; un/une → des
```

## Exact 38.6 matrix

```text
la gare       → les gares
la pharmacie  → les pharmacies
un billet     → des billets
une table     → des tables
```

Family:

```text
singular-plural-regular-noun-phrases
```

The transformation deliberately requires **both** article number and regular noun `-s`.

## Architecture

New pure core:

```text
src/pedagogy/generalization-number-core.js
schema      french-tranquille-generalization-number/v1
build       38
slice       38.6
status      pure-non-wired
persistence ephemeral-only
mastery     false
```

No existing transfer core or learner-facing renderer is modified.

## Explicit exclusions

38.6 excludes:

- irregular plurals;
- `-x` / `-aux` spelling families;
- adjective agreement;
- possessives;
- determiners beyond `le/la/un/une → les/des`;
- full-sentence plural agreement;
- new vocabulary;
- random/adaptive generation;
- learner-facing placement;
- durable writes;
- Evidence product reads;
- mastery claims.

## Distractor contract

Each exercise separates the two required changes:

```text
target          correct article + plural noun
article-only    plural article + singular noun
noun-only       singular article + plural noun
```

Examples:

```text
les gares / les gare / la gares
des billets / des billet / un billets
```

This tests reconstruction instead of recognition by one superficial cue.

## Protected predecessors

38.6 preserves:

- F01–F04 ownership/routes;
- all other Build 37 Foundations owners;
- 38.1 subject substitution;
- 38.2 lesson-33 Transfer placement;
- 38.3 negation core;
- 38.4 futur-proche core;
- 38.5 lesson-35 Transfer placement;
- curriculum 52/313;
- Recovery v3 / seven stores;
- Evidence derived-shadow role;
- voice / navigation / Premium / PWA owners.

## Dedicated tribunal

Node:

```text
tools/test-build38-6-nominal-plural-transfer.cjs
```

Browser:

```text
tests/browser/build38-6-nominal-plural-transfer.html
```

Dedicated CI replays the F01–F04 Foundation predecessor then certifies 38.6 in:

```text
VI × 1280×900
FR × 1280×900
VI × 390×844
FR × 390×844
```

Proof requires:

- exact 4-item source/target catalog;
- 4 real answer clicks;
- article-only and noun-only distractor shapes;
- localStorage byte-identical;
- no horizontal overflow;
- >=44px choice targets.

## Completion gate

38.6 may merge when the dedicated workflow is green and the PR matrix contains no new product regression beyond the four inherited historical failures.

No physical-device smoke is required because 38.6 is pure/non-wired.

If certified, **lesson 12** is the natural later learner-facing placement to audit: by then `gare`, `pharmacie`, `billet` and `table` have all been encountered and F01–F04 already owns the lesson window.
