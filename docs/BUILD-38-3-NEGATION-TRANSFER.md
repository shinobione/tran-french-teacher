# Build 38.3 — deterministic affirmation → negation transfer

Status: **IMPLEMENTED / PR CANDIDATE / NOT MERGED**

## Why this family now

After the first subject-substitution family reached the learner surface in Build 38.2, the remaining transfer candidates were re-audited against the real 52-lesson curriculum and certified Foundations.

Negation is the cleanest next family because it already has a strong scaffold:

- F11 explicitly owns `ne / n’ ... pas`;
- lesson 17 includes `Je n'ai pas de monnaie.`;
- lesson 18 includes `Je ne peux pas.`;
- lesson 19 includes `Il n'y a pas d'eau chaude.`;
- lesson 20 includes `Mon téléphone ne marche pas.`;
- F08 / Build 38.1 already certify `travailler`, `habiter`, `aimer` with `je`.

Singular → plural remains broader because it immediately mixes article, possessive, noun and agreement transformations.

## Narrow 38.3 contract

38.3 does **not** implement the whole French negation system. It owns exactly three deterministic transformations:

```text
Je travaille. → Je ne travaille pas.
J'habite ici. → Je n'habite pas ici.
J'aime ça. → Je n'aime pas ça.
```

This proves two already-taught negation shapes:

```text
consonant start → ne ... pas
vowel start     → n’ ... pas
```

without introducing another grammatical transformation at the same time.

## Architecture

New pure core:

```text
src/pedagogy/generalization-negation-core.js
schema      french-tranquille-generalization-negation/v1
build       38
slice       38.3
status      pure-non-wired
family      affirmation-negation-regular-er-je
persistence ephemeral-only
mastery     false
```

The core depends on the certified 38.1 transfer core for the already-owned affirmative source sentences. It does not modify 38.1.

## Explicit exclusions

38.3 deliberately excludes:

- `avoir` and the separate `un/une/des → de` issue after negation;
- `pouvoir`, `aller`, `être` and other irregular verbs;
- `il y a` special-case transformation;
- questions;
- spoken omission of `ne`;
- plural transfer;
- present → futur proche;
- agreement transformations;
- new vocabulary;
- random/adaptive generation;
- learner-facing placement;
- durable writes;
- Evidence product reads;
- mastery claims.

## Protected predecessors

38.3 must preserve:

- F11 / Build 37.4 negation ownership;
- F08 and all other Build 37 routes;
- Build 38.1 subject-substitution semantics and its six-item catalog;
- Build 38.2 lesson-33 learner placement;
- curriculum 52/313;
- Recovery v3 / seven durable stores;
- Evidence derived-shadow role;
- Premium / voice / navigation / PWA owners.

## Dedicated tribunal

Node:

```text
tools/test-build38-3-negation-transfer.cjs
```

Browser:

```text
tests/browser/build38-3-negation-transfer.html
```

The dedicated workflow replays:

1. F11 Node predecessor;
2. 38.1 Node predecessor;
3. 38.3 Node contract;
4. F11 browser predecessor;
5. 38.1 browser predecessor;
6. 38.3 VI / DEBUG FR × 1280×900 / 390×844.

38.3 browser proof requires:

- all three deterministic exercises through real button clicks;
- exact source/target catalog;
- choice targets >=44 px;
- no horizontal overflow;
- localStorage byte-identical.

## Completion gate

Build 38.3 may merge only after the dedicated workflow is green and the PR matrix contains no new product regression beyond the four inherited historical CI failures.

No physical-device smoke is required for this **pure/non-wired** slice because it changes no learner-facing runtime. A later learner-facing negation integration must earn its own placement and interaction proof.
