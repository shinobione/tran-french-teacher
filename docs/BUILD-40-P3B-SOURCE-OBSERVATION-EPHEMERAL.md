# Build40 P3b — Source observation + ephemeral collector

Status: **CLOSED / ACCEPTED EPHEMERAL SOURCE-OBSERVATION PROOF**

Audited implementation base: `7bb9d4ab52d6402121d75c63a8c1042030c1c856`

Accepted exact head: `a641481d647510c41855c144149c2adccfde333c`

Accepted squash merge: `5a658f8ac288e5d5cd091dc0a16fa3683f6064fe`

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

The accepted P3b control also changed `sw.js` so those exact versioned P3a/P3b boot-time scripts are precached for installed-PWA offline startup.

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

## Installed-PWA review fix

The original candidate head `39710405b19c801feb30a451be513c26b66a3d55` received one Codex **P1**: the two new boot-time observation scripts were not yet in the service-worker `CORE` precache.

That review was correct. The accepted control fixed it before merge:

```text
sw.js
→ precache exact versioned P3a contract URL
→ precache exact versioned P3b runtime URL
→ keep loader/service-worker observation versions aligned
```

The dedicated P3b workflow now guards those entries explicitly. This preserves installed-PWA first-offline-launch bootability without changing the P3b persistence or evidence semantics.

The P1 thread was resolved after evidence was posted on PR #240.

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

## Accepted tests and control evidence

```text
tests/unit/p3b-pedagogical-observation-runtime.test.cjs
.github/workflows/p3b-pedagogical-observation-runtime.yml
```

The accepted candidate proves:

- accepted P3a normalization is still the only observation schema boundary;
- Foundation success/miss maps honestly;
- Transfer success/miss maps honestly;
- miss assistance semantics are preserved;
- invalid source shape is not collected;
- the FIFO is bounded to 64 and drops oldest first;
- loader order is P3a contract → P3b runtime → existing source activities;
- installed-PWA offline precache includes both observation boot scripts;
- accepted P3a core and learner-facing Foundation/Transfer source owners remain byte-identical;
- no durable/network APIs are introduced;
- permanent sanctuaries remain byte-identical.

Control record:

```text
PR #240 original candidate head   39710405b19c801feb30a451be513c26b66a3d55
PR #240 accepted exact head       a641481d647510c41855c144149c2adccfde333c
PR #240 accepted scope            exactly 7 paths after justified sw.js review fix
PR #240 review                    1×P1, fixed and resolved before merge
P3b workflow run                  32429870917 SUCCESS
PR #240 exact-head CI             exactly five inherited baseline failures; no new red
PR #240 squash merge              5a658f8ac288e5d5cd091dc0a16fa3683f6064fe
```

The five inherited failures remain:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

## Next gate

P3b is now accepted. The roadmap may proceed only to:

```text
P3c — durability decision
```

P3c must decide whether these real observations are useful enough to justify any durable architecture. P3b itself provides **no** such authorization.

Until P3c explicitly decides otherwise:

```text
Recovery     7 stores / backup v3
Evidence v2  derived shadow only
Build39.2    concept-review / foundation-capsule / transfer-construction unavailable
Build43      NOT AUTHORIZED
A2           NOT AUTHORIZED
```
