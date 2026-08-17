# Build 38.8 — learner-facing negation transfer

Status: **IMPLEMENTED / PR CANDIDATE / NOT MERGED**

## Goal

Expose the already-certified Build 38.3 affirmation → negation core through the existing shared Transfer renderer, without changing the certified core and without disturbing the learner-facing routes already deployed in lessons 13, 33 and 35.

## Placement — lesson 34

The negation core is deliberately **not** mounted in lessons 17–20 just because F11 lives there. At that point the regular `-er` source scaffold is not yet mature.

Lesson 34 is the first clean point after the full predecessor chain:

```text
F11 / lessons 17–20
→ complete ne / n’ ... pas pattern already taught

F08 / lessons 32–33
→ travailler / habiter / aimer regular-present forms consolidated

38.1 / 38.2
→ deterministic sentence reconstruction from the same verb family certified
```

It also keeps exactly one Transfer card per learner lesson:

```text
lesson 13 → nominal plural
lesson 33 → subject substitution
lesson 34 → negation
lesson 35 → futur proche
```

## Learner flow

```text
lesson 34 normal content
→ existing F05 Foundation card
→ ONE optional negation Transfer card
→ 3 deterministic transformations
→ return focus to the Transfer CTA
→ normal lesson Continue remains available
```

Exact reused Build 38.3 catalog:

```text
Je travaille. → Je ne travaille pas.
J'habite ici. → Je n'habite pas ici.
J'aime ça. → Je n'aime pas ça.
```

No new vocabulary is introduced.

## Shared renderer contract

There is still exactly one learner-facing Transfer renderer:

```text
src/pedagogy/generalization-transfer-lesson.js
```

Build 38.8 adds only an additive route:

```text
negationIntegration = 38.8
negationLesson = 34
negationFamily = affirmation-negation-regular-er-je
negationExerciseIndexes = [0,1,2]
```

Historical routes remain explicit and unchanged:

```text
38.2 → lesson 33 / subject-substitution / [0,2,5]
38.5 → lesson 35 / futur-proche / [0,1,3]
38.7 → lesson 13 / nominal plural / [0,2,3]
```

The Build 38.3 core remains byte-for-byte unchanged, with its original `pure-non-wired` core status describing the core itself. Build 38.8 merely loads and consumes that certified API at runtime.

## Runtime / installed PWA

Runtime order becomes:

```text
Foundations
→ 38.1 subject core
→ 38.3 negation core
→ 38.4 futur-proche core
→ 38.6 number core
→ shared Transfer adapter
```

`sw.js` adds only the explicit Build 38.8 version token and precache entry for `generalization-negation-core.js`. The existing PWA cache namespace/identity contract is not renamed.

## Successor-safe 38.3 guard

The historical Build 38.3 workflow originally rejected *all* runtime/adapter changes because 38.3 was intentionally non-wired at creation time. That restriction would incorrectly classify the intended 38.8 successor as a regression.

Build 38.8 therefore narrows that guard to the durable invariant that matters now:

```text
38.3 core semantics stay certified, narrow, deterministic and pure
AND
src/pedagogy/generalization-negation-core.js itself must not change in successor slices
```

No product code is weakened to satisfy CI.

## Dedicated proof

New deterministic Node contract:

```text
tools/test-build38-8-negation-integration.cjs
```

New browser tribunal:

```text
tests/browser/build38-8-negation-integration.html
```

New GitHub Actions gate:

```text
.github/workflows/build38-8-negation-integration.yml
```

The gate proves:

```text
38.2 / 38.3 / 38.5 / 38.7 Node predecessors
F05 browser predecessor
lesson 34 VI / DEBUG FR × desktop / 390×844
exact 3-answer deterministic path
F05 before Transfer
return focus + normal Continue
lesson 13 / 33 / 35 route identities unchanged
lesson 36 has no negation Transfer
localStorage byte-identical
no horizontal overflow
>=44px targets
explicit installed-PWA negation-core precache
```

## Hard exclusions

Build 38.8 does **not** add:

- another Transfer renderer;
- another negation family;
- irregular verbs;
- spoken `ne` dropping;
- plural/future/question negation;
- new curriculum content;
- random/adaptive generation;
- durable learner writes;
- Evidence product reads;
- mastery claims;
- voice changes;
- Recovery changes;
- Premium changes.

## Candidate boundary

Per `AGENTS.md`, this is one implementation slice. The candidate must stop at the PR boundary. CI classification / merge is the next control action; no Build 38.9 family is selected or started here.
