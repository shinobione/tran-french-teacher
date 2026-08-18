# Build 39.2 — Learner Evidence Adapter

Status: **CANDIDATE / PURE ADAPTER / NOT WIRED**

## Goal

Build 39.1 certifies how Learner Intelligence 3 arbitrates already-normalized candidates. Build 39.2 defines the first safe adapter from **existing reliable product evidence** into that 39.1 candidate shape.

This slice does **not** turn Evidence v2 into product truth and does not create a new learner store.

## Source audit

### Learning Memory — trusted phrase evidence

Current owner: `src/pedagogy/learning-memory.js`.

Useful exported snapshot:

```text
FrenchTranquilleMemory.summary()
→ entries
→ due
→ fragile
→ learning
→ solid
```

The durable Memory owner already knows item-level review attempts, misses/successes, source, due date and status (`new / fragile / learning / solid`). Build 39.2 consumes only supplied snapshot data; the adapter itself does not read storage or call the runtime owner.

### Error Intelligence — trusted observed-need evidence

Current owner: `src/pedagogy/error-intelligence.js`.

Useful exported snapshots:

```text
FrenchTranquilleErrors.summary()
→ recent observable events
→ top priorities
→ assisted events
→ voice-unrecognized events

FrenchTranquilleErrors.priorityItems()
→ item-level priority rows
```

Error Intelligence deliberately distinguishes observable event types including retrieval difficulty, text mismatch, scenario miss, assistance, voice-unrecognized, partial and repeated miss. Build39.2 keeps the same epistemic boundary: a recognition failure alone is not a learner deficiency.

### Listening — reliable source labels, no direct score adoption

Current owner: `src/pedagogy/listening-engine.js`.

Listening records item-level attempts into Memory / Error Intelligence with explicit sources such as:

```text
listening-meaning
listening-contrast
listening-dialogue
```

Build39.2 therefore recognizes **observed listening misses** from Error Intelligence events. It does not treat global Listening accuracy/activity totals as mastery or need by themselves.

### Scenario — reliable miss / assistance source labels

Current owner: `src/pedagogy/scenario-engine.js`.

Scenario records item-level practice with explicit sources:

```text
scenario-success
scenario-miss
scenario-assisted
```

Build39.2 recognizes scenario misses and use of a model as reliable observed need. Scenario completion totals alone do not create a recommendation.

### Foundations — deliberately unavailable for adaptive need in 39.2

Foundations remain optional / ephemeral and explicitly claim no mastery. The current Foundations Core and Capsule Engine provide concept definitions and session mechanics, but **no durable concept-understanding evidence**.

Therefore:

```text
concept-review      → unavailable / no-durable-concept-evidence
foundation-capsule  → unavailable / foundations-ephemeral-no-need-evidence
```

The adapter must abstain rather than infer concept weakness from phrase errors without a certified mapping/evidence contract.

### Transfer / construction — deliberately unavailable for adaptive need in 39.2

Build38 Transfer is intentionally ephemeral and performs no durable write or mastery claim. There is no reliable durable Transfer/Construction evidence source yet.

Therefore:

```text
transfer-construction → unavailable / transfer-ephemeral-no-durable-evidence
```

This is preferable to fabricating the two independent evidence items required by the 39.1 arbitration core.

## Adapter contract

Owner:

```text
src/pedagogy/learner-evidence-adapter.js
export = FrenchTranquilleActionEvidenceAdapter
slice = 39.2
persistence = none
runtime wiring = none
Evidence v2 read cutover = false
```

Input is a **caller-supplied snapshot**, shaped from already-exported current-owner data:

```js
{
  memory: FrenchTranquilleMemory.summary(),
  errors: FrenchTranquilleErrors.summary()
}
```

The pure adapter returns:

```js
{
  candidates: {
    'phrase-retrieval': {...},
    'concept-review': {...},
    'foundation-capsule': {...},
    listening: {...},
    scenario: {...},
    'transfer-construction': {...}
  },
  diagnostics: {...}
}
```

Those candidates match the certified Build39.1 shape and can be passed to:

```js
FrenchTranquilleLearnerIntelligenceV3Core.decide(result.candidates)
```

## Reliability rules

### Phrase retrieval

May be driven by:

- Memory `fragile`;
- Memory `due`;
- non-recognition-only Error Intelligence priority.

Independent owner count distinguishes `Memory` from `Errors`; multiple signals inside one owner do not pretend to be independent owners.

### Listening

Requires an explicit recent Error Intelligence event whose source begins with `listening-`.

Global attempts, accuracy, plays, replays or slow-play totals do not create need by themselves.

### Scenario

Requires an explicit recent scenario event such as:

- `scenario-miss`;
- `scenario-assisted` / model used.

Global completion/session totals do not create need by themselves.

### Recognition failures

A `voice-unrecognized` event alone is ignored for phrase retrieval and is never converted into pronunciation or mastery evidence.

## Explicit non-wiring contract

39.2 must not:

```text
read or write localStorage / sessionStorage / IndexedDB
call Evidence v2 as product truth
change Evidence v2 read paths
change the six original product-truth stores
change Recovery / backup schema
change Learner Intelligence V1/V2
change Build39.1 arbitration semantics
change curriculum / Foundations / Listening / Scenario / Transfer behavior
change voice
change learner-facing UI
change PWA identity/cache
change public runtime metadata
```

## Test contract

The unit tribunal proves:

- empty snapshots → arbitration abstains;
- Memory due + fragile + retrieval error → phrase retrieval candidate;
- recognition-only failure → no retrieval need;
- explicit `listening-*` miss → Listening candidate;
- explicit scenario miss + assistance → Scenario candidate;
- decorative totals do not manufacture a candidate;
- concept / Foundation / Transfer remain explicitly unavailable;
- input snapshots remain unchanged;
- target choice remains deterministic and input-order independent;
- Build39.1 arbitration core consumes 39.2 output without modification.

## Next boundary

39.2 does **not** authorize learner-facing wiring.

After 39.2 is certified, a later separate slice may decide how runtime owner snapshots are assembled and when Tyffany is allowed to consume the 39.1 + 39.2 pipeline. Any additional evidence family must first prove a reliable current-owner source; absence of evidence continues to mean **abstain**, not infer.
