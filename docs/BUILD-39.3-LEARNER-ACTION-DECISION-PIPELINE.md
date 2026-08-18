# Build 39.3 — Learner Action Decision Pipeline

Status: candidate implementation slice

## Purpose

Build39.1 certified a pure deterministic arbitration core over six normalized action families.

Build39.2 certified a pure evidence adapter that can currently produce reliable candidates for:

- `phrase-retrieval`
- `listening`
- `scenario`

and explicitly marks these families unavailable because the current product does not yet own durable evidence that would justify them:

- `concept-review`
- `foundation-capsule`
- `transfer-construction`

Build39.3 does **not** invent those missing evidence sources. Its job is narrower: prove the complete pure decision chain from caller-supplied snapshots to a final selected action or an explicit abstention.

```text
caller-supplied Learning Memory / Error Intelligence snapshots
→ Build39.2 learner evidence adapter
→ six normalized candidates
→ Build39.1 arbitration core
→ selected next action OR explicit abstention
```

## Certified owner candidate

```text
src/pedagogy/learner-action-decision-pipeline.js
export = FrenchTranquilleLearnerActionDecisionPipeline
roadmapSlice = 39.3
version = 3.0.0-decision-pipeline
```

The pipeline is composition only. It contains no learner-evidence policy beyond the already-certified 39.1 and 39.2 owners.

## Why composition is the correct next slice

The 39.3 audit rejected manufacturing new durable concept/mastery evidence merely to make all six action families appear available.

Current product reality remains:

- Learning Memory already owns item-level due/fragile/review evidence.
- Error Intelligence already owns observable errors, assistance and recent event sources.
- Listening and Scenario already feed explicit observable errors into Error Intelligence.
- Foundations remains optional and ephemeral; completing a Foundation capsule is not durable mastery evidence.
- Build38 Transfer remains ephemeral and explicitly states that its exercises are not mastery scores.
- Evidence v2 remains a seventh derived shadow and is not the product read-path truth.

Therefore the safest useful next step is to certify that the reliable evidence already accepted by 39.2 can actually drive the deterministic arbitration already accepted by 39.1.

## Input contract

39.3 accepts the same caller-supplied snapshot shape as 39.2.

It does not directly call Learning Memory, Error Intelligence, Listening, Scenario, Foundations or Transfer runtime owners.

It does not read storage.

## Output contract

The pipeline returns:

- `selected` — the highest reliable eligible action, or `null`;
- `ranking` — eligible candidates ranked by the certified 39.1 core;
- `rejected` — ineligible/unavailable candidates with their certified reason;
- `candidates` — the normalized 39.2 candidate set;
- `abstained` — true when no reliable action is eligible;
- `reason` — `highest-reliable-need` or `insufficient-reliable-evidence`;
- diagnostics proving no Evidence-v2 read cutover, no durable write and no runtime wiring.

If its two certified dependencies are unavailable, the pipeline abstains with `pipeline-dependencies-missing` rather than guessing.

## Reliability examples

### Phrase retrieval

A fragile/due Memory item, strengthened by an observable non-recognition-only Error Intelligence priority, can become the selected `phrase-retrieval` action.

### Listening

An explicit `listening-*` miss event can select `listening` when no stronger reliable need exists.

### Scenario

An explicit scenario miss/assisted event can select `scenario` when it is the strongest reliable need.

### Recognition failure only

A `voice-unrecognized` event by itself still produces no learner need. The final pipeline must abstain if nothing else is reliable.

### Unsupported families

`concept-review`, `foundation-capsule` and `transfer-construction` remain unavailable with the exact 39.2 reason codes. 39.3 does not weaken those boundaries.

## Explicit exclusions

Build39.3 must not:

- read or write `localStorage`, `sessionStorage` or IndexedDB;
- call current product evidence owners directly;
- make Evidence v2 product truth;
- add a durable store or migrate Recovery/backups;
- change Learner Intelligence V1/V2;
- change Learning Memory or Error Intelligence;
- change Foundations or Transfer semantics;
- change curriculum, voice, Premium, PWA or public version metadata;
- wire any learner-facing UI;
- infer concept mastery, Foundation weakness or Transfer weakness from decorative counts;
- turn recognition failure into pronunciation or mastery evidence.

## Candidate test boundary

`tests/unit/build39-3-decision-pipeline.test.cjs` verifies:

- exact 39.3 metadata and dependency readiness;
- reliable phrase-retrieval selection;
- reliable Listening selection;
- reliable Scenario selection;
- recognition-only abstention;
- continued explicit unavailability of concept/Foundation/Transfer families;
- decorative/global counters do not alter the decision;
- deterministic selection independent of input-event order;
- frozen input remains unchanged;
- returned result/ranking/rejected structures are immutable.

The dedicated GitHub workflow also reruns the 39.1 and 39.2 unit tribunals plus the v2.5/Build38 predecessor tests and protects all historical runtime owners/sanctuaries.

## Public product impact

None.

Public runtime remains:

```text
v2.5.0 · Build 38
```

Build39.3 is intentionally **pure / non-wired**. A later explicit slice must decide how to collect current product snapshots and expose a learner-facing recommendation safely.
