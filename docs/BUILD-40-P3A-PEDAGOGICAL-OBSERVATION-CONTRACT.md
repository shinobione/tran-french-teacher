# Build40 P3a — Pure Pedagogical Observation Contract

Status: **CANDIDATE / PURE CONTRACT PROOF**

Date: 2026-08-20

Audited implementation base:

```text
653aa3a3fe358c7036cca661d339b82b7073cc38
```

P3a is deliberately **not Build43**. It does not add product behaviour or persistence. It proves the smallest source-time semantic record that a later P3b source adapter could emit.

## 1. Scope

Added pure contract:

```text
src/pedagogy/pedagogical-observation-core.js
```

Unit proof:

```text
tests/unit/p3a-pedagogical-observation-core.test.cjs
```

Dedicated CI:

```text
.github/workflows/p3a-pedagogical-observation-contract.yml
```

No `index.html`, loader, service-worker or UI wiring is added. The core is CommonJS/browser-global compatible only so it can be unit-tested now and potentially consumed by an explicitly authorized later adapter.

## 2. Contract identity

```text
schema       french-tranquille-pedagogical-observation/v1
roadmapSlice P3a
version      1.0.0-contract
```

Accepted activity / semantic target pairs are intentionally closed:

```text
foundation-check → foundation-concept → foundations
transfer-check   → transfer-family     → transfer
```

A source owner cannot relabel a Foundation check as Transfer evidence or vice versa.

## 3. Normalized observation

A valid normalized observation contains only:

```text
schema
at
activityKind
lessonId

target.kind
target.ids

activityId
exerciseId
outcome

response.mode
response.choice

assistance.modelShownAfterMiss
sourceOwner
sourceSlice
```

Current response mode is deliberately only:

```text
multiple-choice
```

Current outcomes are deliberately only:

```text
success
miss
```

There is no `mastery`, `score`, `confidence`, `strength`, CEFR state or durable evidence state in the output.

## 4. Source-time timestamp rule

`at` must be supplied by the caller as a full ISO source-time timestamp containing a clock time and timezone, for example:

```text
2026-08-20T18:00:00+02:00
2026-08-20T16:00:00Z
```

The normalizer canonicalizes it to ISO UTC.

A date-only value such as `2026-08-20` is not sufficient. The pure core never calls `Date.now()` and never manufactures event chronology.

## 5. Stable semantic IDs

Foundation targets use the already accepted Foundation namespace:

```text
F01 … F18
```

Input Foundation IDs are canonicalized to uppercase, then validated against that closed current namespace.

Transfer targets use stable kebab-case family IDs, for example:

```text
subject-substitution-regular-er
present-futur-proche-travailler-singular
singular-plural-regular-noun-phrases
affirmation-negation-regular-er-je
nous-on-spoken-equivalence
present-je-regular-action-to-recent-past-je-venir-de
```

One Transfer observation owns exactly one Transfer family. For `transfer-check`, `activityId` must equal the target Transfer family ID so the activity cannot silently claim another family.

Foundation capsules may target several concepts because the accepted Foundations pilot already groups F01–F04. Target arrays are bounded, unique and detached from caller input.

## 6. Assistance semantics

The P3 decision remains unchanged:

```text
miss + corrective model reveal
→ outcome = miss
→ modelShownAfterMiss = true
```

The contract rejects:

```text
outcome = success
modelShownAfterMiss = true
```

because that would imply a history that the current deterministic flow cannot certify.

There is no `assisted-success` field. A later retry model would require a separate explicit source observation design.

## 7. Fail-closed boundaries

The contract rejects invalid or semantically inflated inputs rather than silently converting them into evidence.

Examples include:

```text
unsupported activity / target pair
unsupported source owner
invalid Foundation or Transfer family ID
multiple Transfer family IDs in one event
Transfer activityId / family mismatch
invalid or date-only source timestamp
unsupported response mode
oversized bounded fields
success + modelShownAfterMiss
```

Inputs attempting to attach item/mastery/scoring semantics are explicitly rejected at the contract boundary:

```text
itemId
mastery
masteryClaim
score
confidence
strength
cefr / CEFR
state
assistedSuccess / assisted-success
```

This prevents P3a from becoming a back door into Learning Memory, Error Intelligence or a fake mastery model.

## 8. Detached and immutable output

The normalizer reconstructs the accepted primitive/nested structure instead of retaining arbitrary caller objects.

Successful and failed results are recursively frozen. Mutating the original input after normalization cannot mutate the observation.

Unknown decorative input is not copied into the normalized output.

## 9. Persistence boundary

The P3a core contains no:

```text
localStorage
sessionStorage
IndexedDB
fetch / XHR / sendBeacon
Learning Memory write
Error Intelligence write
Evidence v2 write
Recovery write
```

Recovery therefore remains exactly:

```text
7 durable stores / backup v3
```

Evidence v2 remains exactly:

```text
derived shadow only
```

No eighth store exists.

## 10. What P3a proves — and does not prove

P3a can represent an honest source-time statement such as:

```text
At this timestamp, in lesson 38,
Trân selected this answer in this F16 deterministic check,
and the result was success/miss.
```

or:

```text
At this timestamp, in lesson 36,
Trân selected this transformation choice in this recent-past family check,
and the result was success/miss.
```

It still does **not** prove:

```text
free production
novel unseen-context construction
long-term mastery
pronunciation quality
CEFR attainment
cross-session retention
```

It also does not make Build39 `concept-review`, `foundation-capsule` or `transfer-construction` reliable yet because nothing is wired to emit or collect these observations.

## 11. Candidate next gate if P3a is accepted

```text
P3b — source instrumentation / ephemeral collector decision
```

P3b may decide how Foundations and Transfer source owners map their existing session results into this contract and where an ephemeral runtime collector lives.

P3b must still preserve:

```text
zero durable write
zero Recovery/Evidence mutation
zero mastery claim
```

Only after actual source instrumentation is certified may P3c reconsider durability.

Still NOT AUTHORIZED:

```text
Build43 numbering
durable pedagogical-observation store
direct Evidence v2 source-event writes
Evidence read cutover
productive F16 Transfer
A2
```
