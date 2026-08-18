# Build 39.1 — Learner action arbitration core

Status: **candidate slice**

## Mission

Open Build 39 — Learner Intelligence 3 with the smallest safe product-independent core.

The Build 39 roadmap mandate is for Tyffany to choose the next useful action among:

1. phrase retrieval;
2. concept review;
3. Foundation capsule;
4. listening;
5. scenario;
6. transfer / construction.

Build 39.1 does **not** wire those actions into the learner UI. It certifies the deterministic decision boundary first.

## New owner

```text
src/pedagogy/learner-action-arbitration-core.js
```

The filename deliberately stays outside the historical `learner-intelligence*.js` ownership family. Several Build 37/38 predecessor guards protect that older family broadly; Build 39.1 is a new pure arbitration owner and must not masquerade as a mutation of Learner Intelligence V1/V2.

The core is pure and read-free. It receives already-normalized candidates and returns either:

- one selected action; or
- an explicit abstention when reliable evidence is insufficient.

Canonical action IDs:

```text
phrase-retrieval
concept-review
foundation-capsule
listening
scenario
transfer-construction
```

## Reliability contract

A candidate is not eligible unless it has:

- an observed need;
- enough confidence;
- at least one independent piece of evidence;
- two independent pieces of evidence for transfer / construction;
- no explicit block;
- no `recognition-failure-only` basis.

A speech-recognition failure alone must therefore never drive the next-action choice.

The arbitration score uses only:

```text
observed need
urgency
confidence
support strength
```

Decorative activity totals are intentionally ignored.

Tie-breaking is deterministic and independent from input order.

## Explicit non-wiring boundary

Build 39.1 must not:

```text
read localStorage / sessionStorage / IndexedDB
read Evidence v2 as product truth
write any learner store
change Learner Intelligence V1/V2
change Foundations
change Listening / Scenario / Transfer behaviour
change curriculum
change voice
change Recovery / backup
change Premium UI
change PWA identity / cache
change public runtime version metadata
```

Evidence v2 remains a **derived shadow**. Build 39.1 is not an Evidence read-path cutover.

## Why 39.1 is pure

Learner Intelligence V2 currently chooses broad recommendations such as `review`, `lesson`, `practice` and `maintain`. Build 39 requires a richer decision vocabulary across six real learning modes.

Separating arbitration from evidence collection lets the project certify:

- which actions exist;
- what minimum reliability each action needs;
- how ties are resolved;
- when the model must abstain;
- that recognition failure cannot masquerade as pedagogical evidence.

Only after this is stable should a later adapter map existing reliable product signals into the six candidates.

## Candidate certification

Dedicated test:

```text
tests/unit/build39-1-learner-action-core.test.cjs
```

Dedicated workflow:

```text
.github/workflows/build39-1-learner-action-core.yml
```

The tribunal covers:

- all six action families selectable;
- recognition-failure-only exclusion;
- stronger evidence requirement for transfer / construction;
- explicit abstention;
- deterministic input-order-independent tie-break;
- decorative activity counts ignored;
- frozen input accepted without mutation;
- v2.5.0 / Build 38 release predecessor still certified;
- Build 38.10 predecessor still certified;
- protected sanctuaries byte-identical.

## Classified predecessor-CI naming collision

The first candidate head `4332156fae8b7e8e374ebea5a1362cf4a6e9add6` had a green dedicated Build 39.1 tribunal, green v2.5 release certification, green runtime metadata, green Build38.10, green Build32 and green Build31 compatibility, but several older Build37/38 workflows rejected the path `src/pedagogy/learner-intelligence-v3-core.js` through broad historical ownership regexes such as:

```text
src/pedagogy/learner-intelligence.*\.js
```

Classification: **predecessor ownership-guard naming collision, not a product/runtime regression**.

Resolution: keep the core/API semantics unchanged and move the new Build39 owner to `src/pedagogy/learner-action-arbitration-core.js`, rather than weakening a chain of certified predecessor workflows.

## Next slice if 39.1 is accepted

**39.2 should be an evidence adapter audit / implementation**, not UI polish.

It should inspect the reliable read surfaces already owned by:

- learner progress;
- Memory / Error Intelligence;
- Foundations;
- Listening;
- Scenario;
- certified Transfer;

and map those into the six 39.1 candidate inputs without silently making Evidence v2 product truth.
