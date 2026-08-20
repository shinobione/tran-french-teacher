# Build40 P3b — Source observation + ephemeral collector

Status: **CANDIDATE / EPHEMERAL SOURCE-OBSERVATION PROOF**

Audited implementation base: `7bb9d4ab52d6402121d75c63a8c1042030c1c856`

## Mission

P3b connects the already learner-facing deterministic Foundation and Transfer check surfaces to the accepted P3a Pedagogical Observation Contract without creating durable learner evidence.

This slice answers one narrow question: can the runtime capture honest source-time check observations from the existing learner-facing activities while preserving the current epistemic and durability boundaries?

## Decision

**Yes, as a bounded ephemeral runtime collector only.**

P3b does **not** authorize durable persistence, Evidence v2 writes, Memory/Error reuse, an eighth Recovery store, mastery, CEFR inference, Build43, A2, or a Build39.2 availability change.

## Runtime owner

```text
src/pedagogy/pedagogical-observation-runtime.js
```

The runtime depends on the accepted P3a core:

```text
src/pedagogy/pedagogical-observation-core.js
schema = french-tranquille-pedagogical-observation/v1
```

`src/core/build32-loader.js` loads the accepted P3a contract and then the P3b ephemeral runtime before the existing learner-facing Foundation and Transfer sources.

The existing source owners themselves remain byte-identical:

```text
src/pedagogy/foundations-capsule-engine.js
src/pedagogy/foundations-pilot.js
src/pedagogy/generalization-transfer-lesson.js
```

## Observation boundary

P3b observes the existing multiple-choice learner-facing source surfaces at the choice event boundary.

For both activity families:

1. the source-time timestamp is captured when the learner chooses an answer;
2. P3b waits for the existing synchronous source renderer to finish;
3. the observation is recorded only if that renderer exposes the actual selected result as `ok` or `bad`;
4. if the source result cannot be confirmed, P3b abstains and records nothing.

This deliberately avoids a second correctness calculation and avoids changing the accepted Foundation engine or Transfer renderer.

### Foundation mapping

The observer uses the active Foundation capsule already rendered by `foundations-pilot.js` and the canonical compiled capsule metadata already present at runtime.

```text
activityKind  foundation-check
target.kind   foundation-concept
target.ids    active compiled capsule concepts
activityId    compiled capsule id
exerciseId    canonical capsule check id
outcome       success | miss from rendered source result
response      multiple-choice + selected choice
sourceOwner   foundations
sourceSlice   foundations:<active capsule key>
```

A miss immediately reveals corrective feedback and the correct option in the existing source UI, therefore:

```text
outcome = miss
modelShownAfterMiss = true
```

A success records `modelShownAfterMiss = false`.

### Transfer mapping

The observer uses the active Transfer family/lesson already stamped by `generalization-transfer-lesson.js` plus the route's existing source catalog index.

```text
activityKind  transfer-check
target.kind   transfer-family
target.ids    [active family id]
activityId    active family id
exerciseId    <family-id>:<1-based source catalog index>
outcome       success | miss from rendered source result
response      multiple-choice + selected choice
sourceOwner   transfer
sourceSlice   transfer:<accepted route slice>
```

The same assistance rule applies: the current Transfer renderer shows the target sentence after a miss, so only a miss carries `modelShownAfterMiss = true`.

## Ephemeral collector contract

The P3b runtime keeps at most **64** accepted normalized observations in a FIFO in-memory buffer.

```text
capacity      64
persistent    false
durableWrite  false
masteryClaim  false
```

Properties:

- observations are normalized through the accepted P3a core before collection;
- invalid inputs fail closed and are not collected;
- source `correct` must be a real boolean before mapping;
- the oldest observation is discarded when capacity is exceeded;
- `snapshot()` returns a frozen array of the already detached/frozen P3a observations;
- `clear()` only clears current page memory;
- reload/page loss clears the collector naturally;
- there is no storage or network API in the runtime.

The 64-entry bound is a runtime inspection window, **not learner history** and not a proposed durable retention policy.

## Explicit non-ownership

P3b writes to none of the following:

```text
Learning Memory
Error Intelligence
Evidence v2
Recovery / backup v3
localStorage
sessionStorage
IndexedDB
network endpoints
```

Recovery therefore remains **7 durable stores / backup v3** and Evidence v2 remains **derived shadow only**.

## Epistemic boundary

A P3b observation certifies only what occurred in that deterministic learner-facing multiple-choice check at that moment.

It does **not** prove:

- free production;
- unseen-context construction;
- long-term retention;
- durable concept mastery;
- pronunciation quality;
- CEFR attainment;
- `assisted-success` after a miss.

Build39.2 abstention therefore remains unchanged through P3b:

```text
concept-review        unavailable
foundation-capsule    unavailable
transfer-construction unavailable
```

## Candidate tests

```text
tests/unit/p3b-pedagogical-observation-runtime.test.cjs
.github/workflows/p3b-pedagogical-observation-runtime.yml
```

The candidate proves:

- accepted P3a normalization is still the only observation schema boundary;
- Foundation success/miss maps honestly;
- Transfer success/miss maps honestly;
- miss assistance semantics are preserved;
- invalid source shape is not collected;
- the FIFO is bounded to 64 and drops oldest first;
- loader order is P3a contract → P3b runtime → existing source activities;
- accepted P3a core and learner-facing Foundation/Transfer source owners remain byte-identical;
- no durable/network APIs are introduced;
- permanent sanctuaries remain byte-identical.

## Gate after candidate acceptance

Only after exact-head CI/review/control accepts this P3b candidate may the roadmap proceed to:

```text
P3c — durability decision
```

P3c must decide whether these real observations are useful enough to justify any durable architecture. P3b itself provides **no** such authorization.