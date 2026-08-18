# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-18

## Canonical accepted main

- Repository: `shinobione/tran-french-teacher`
- Accepted `main`: **`b3b7a14bb080ecfc0228d7edd24ab97d261eaa0f`**
- Commit: `Docs: close Build 39.1`
- PR **#209 — merged** from exact head `ebaaa6b51ca5063f7897e09222969aa96d1a89b8`.
- #209 final PR matrix completed with **exactly the five inherited failures** and no new failure/pending run.
- Public runtime release: **v2.5.0 · Build 38 — ACCEPTED / DEPLOYED**
- Pedagogy baseline: **v2.3.0 · Build 34**
- Latest exact release deployment proof remains **GitHub Pages #272 / run `32072053127` — SUCCESS** on release SHA `2abe20511d6265d12643276f18041812fec3e715`, with `github-pages` deployment `5951805479 — SUCCESS` on that same release SHA.
- The #209 merge is documentation/governance only; it does not change learner runtime semantics or public version metadata.

## Accepted product state

- Curriculum: **52 lessons / 313 items**
- Scenario: **44 situations / 132 turns**
- Speaking Loop: **52/52 · max 2 moments / lesson**
- Listening: **0.88 normal / 0.65 slow**
- Recovery: **7 durable stores / backup v3**
- Evidence v2: **derived shadow only**; original six stores remain product truth
- Premium V5.10: **CLOSED / physical field pass**
- Primary field target: **iPhone / Safari / installed PWA**

## Build 38 — CLOSED / RELEASED

Certified learner-facing chain:

```text
38.1 → 38.2   subject substitution       → lesson 33
38.3 → 38.8   affirmation → negation     → lesson 34
38.4 → 38.5   present → futur proche     → lesson 35
38.6 → 38.7   singular → plural nominal  → lesson 13
38.9 → 38.10  nous → spoken on           → lesson 52
```

- Build 38 milestone: **PEDAGOGICALLY COMPLETE / CLOSED / RELEASED**
- Build 38.11: **NOT AUTHORIZED**
- public release: **v2.5.0 · Build 38**

## Build 39 — Learner Intelligence 3 — OPEN

Tyffany should eventually choose the next useful action among:

```text
phrase retrieval
concept review
Foundation capsule
listening
scenario
transfer / construction
```

Build39 must consume reliable evidence from existing owners and must not invent mastery from recognition failures, decorative activity counts or unsupported inference.

## Build 39.1 — learner action arbitration core — CLOSED / CERTIFIED

- PR **#208 — merged**
- final candidate head **`719a838456156f9df3f7602b1beea0af1df322ab`**
- squash merge **`246338a9ef11eb430f59fc6ccf494688904cf883`**
- dedicated run **`32169633637` — SUCCESS**
- docs/governance closeout PR **#209 — merged** as `b3b7a14bb080ecfc0228d7edd24ab97d261eaa0f`

Certified owner:

```text
src/pedagogy/learner-action-arbitration-core.js
export = FrenchTranquilleLearnerIntelligenceV3Core
```

39.1 is pure and non-wired. It requires observed need, confidence and independent evidence; Transfer requires two independent evidence items. Recognition-failure-only candidates are ineligible. Decorative activity totals are ignored. The core can explicitly abstain with `insufficient-reliable-evidence`.

Detailed 39.1 contract and predecessor naming-collision closeout remain in:

```text
docs/BUILD-39.1-LEARNER-ACTION-ARBITRATION.md
MASTER-ROADMAP.md
```

## Active slice — Build 39.2 Learner Evidence Adapter

- Branch: **`build39/evidence-adapter`**
- Base: exact accepted main **`b3b7a14bb080ecfc0228d7edd24ab97d261eaa0f`**
- State: **CANDIDATE / PURE ADAPTER / NOT WIRED / NOT MERGED**
- Runtime UI wiring: **none**
- Durable writes: **none**
- Evidence v2 read-path cutover: **none**

39.2 owner:

```text
src/pedagogy/learner-evidence-adapter.js
export = FrenchTranquilleActionEvidenceAdapter
```

### 39.2 source audit verdict

Reliable current sources accepted for this first adapter:

```text
Learning Memory
→ item-level due / fragile / review state

Error Intelligence
→ item-level observed errors, priority, assistance and source labels

Listening
→ reliable need only through Error Intelligence events sourced as listening-*

Scenario
→ reliable need through scenario-miss / scenario-assisted item events
```

Deliberately unavailable in 39.2:

```text
concept-review
→ no durable concept-understanding evidence exists

foundation-capsule
→ Foundations remains optional / ephemeral with no mastery evidence

transfer-construction
→ Build38 Transfer remains ephemeral with no durable evidence
```

Absence of a reliable source means **unavailable / abstain**, not inferred weakness.

### 39.2 evidence rules

- phrase retrieval may use Memory `due` / `fragile` plus non-recognition-only Error Intelligence priority;
- Memory and Errors count as separate evidence owners; multiple signals inside one store do not pretend to be independent owners;
- explicit `listening-*` error sources can create a Listening candidate;
- explicit `scenario-miss` / `scenario-assisted` sources can create a Scenario candidate;
- a `voice-unrecognized` event alone creates **no learner need**;
- global activity totals, accuracy counters, completions or decorative counts do not manufacture recommendations;
- adapter input is caller-supplied snapshots and remains unmodified;
- adapter output is the exact candidate shape consumed by certified 39.1.

Canonical documentation:

```text
docs/BUILD-39.2-LEARNER-EVIDENCE-ADAPTER.md
```

Candidate paths:

```text
src/pedagogy/learner-evidence-adapter.js
tests/unit/build39-2-evidence-adapter.test.cjs
.github/workflows/build39-2-evidence-adapter.yml
docs/BUILD-39.2-LEARNER-EVIDENCE-ADAPTER.md
PROJECT-STATE.md
```

## Historical learner continuity — LOCKED

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

No Build39 work may reset, renumber or reinterpret this state.

## CI baseline

Known persistent inherited failure baseline:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Build26.4 is a classified runner/harness flake, not standing debt. Any other failure is **NEW until classified**. Suspected flakes must be rerun unchanged before product mutation.

## Protected boundaries

Preserve unless a future explicitly scoped build justifies otherwise:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
PWA identity/cache contract from PR #180
Recovery v3 seven-store ownership
backup envelope v3
Evidence derived-shadow role
original six stores as product truth
52 / 313 curriculum semantics
Premium V5.10 field-approved UI/navigation
Build 37 Foundations ownership/routes
Build 38 deterministic core semantics
Build 38 learner-facing placements
shared Transfer renderer ownership
Learner Intelligence V1/V2 historical compatibility
Build 39.1 deterministic arbitration semantics
```

## NEXT

Fresh control step only after the 39.2 PR is materialized:

```text
re-read the exact 39.2 PR head and changed filenames
→ require Build 39.2 Learner evidence adapter on that exact head
→ require Build39.1 + v2.5.0 / Build38 predecessor contracts to remain green
→ classify the full matrix against the five inherited failures
→ rerun only proven flakes unchanged if needed
→ if no new regression, merge with expected-head protection
→ verify main equals the merge SHA
→ only then decide the next separate Build39 slice
```

Do **not** wire 39.2 into learner-facing UI and do **not** create a durable Evidence read path inside this slice.
