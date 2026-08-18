# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-18

## Canonical accepted main

- Repository: `shinobione/tran-french-teacher`
- Accepted `main`: **`9a60e316e7a75bd5b6e0ce8f42bd20475f7785b7`**
- Commit: `Docs: close Build 39.2`
- PR **#211 — merged** from exact head `a5089147b922f613cd57774c0e2744cfa583c365` with expected-head squash protection.
- PR #211 was **PROJECT-STATE.md only** and its final matrix drained with **exactly the five inherited failures**, no additional failure and no pending/in-progress workflow.
- Public runtime release remains **v2.5.0 · Build 38 — ACCEPTED / DEPLOYED**.
- Pedagogy baseline remains **v2.3.0 · Build 34**.
- Latest exact release deployment proof remains **GitHub Pages #272 / run `32072053127` — SUCCESS** on release SHA `2abe20511d6265d12643276f18041812fec3e715`, with `github-pages` deployment `5951805479 — SUCCESS` on that same release SHA.
- Build39.1 / 39.2 and the 39.2 closeout are non-wired internal checkpoints; they do not change public runtime metadata or learner-facing runtime semantics.

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

Detailed contract:

```text
docs/BUILD-39.1-LEARNER-ACTION-ARBITRATION.md
```

## Build 39.2 — Learner Evidence Adapter — CLOSED / CERTIFIED

- PR **#210 — merged**
- final candidate head **`6fe014358fcdf39f262de5928e2705efbb964cd9`**
- squash merge **`9af287417d1fbb502837bea4aa80886cca2ffb2e`**
- dedicated final-head run **`32173436063` — SUCCESS**
- docs/governance closeout PR **#211 — merged** as **`9a60e316e7a75bd5b6e0ce8f42bd20475f7785b7`**
- state: **PURE ADAPTER / NON-WIRED / MERGED / CERTIFIED**

Certified owner:

```text
src/pedagogy/learner-evidence-adapter.js
export = FrenchTranquilleActionEvidenceAdapter
```

### 39.2 accepted evidence sources

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

Absence of reliable evidence means **unavailable / abstain**, not inferred weakness.

### 39.2 CI classification

On exact head `6fe014358fcdf39f262de5928e2705efbb964cd9`:

```text
Build 39.2 Learner evidence adapter             32173436063  SUCCESS
Build 39.1 Learner action arbitration core      32173436052  SUCCESS
Release v2.5.0 Build 38 certification           32173436096  SUCCESS
Runtime version metadata                        32173436150  SUCCESS
Build 38.10 Learner-facing spoken on transfer   32173436066  SUCCESS
Build 32 Practical A1 Expansion                  32173436040  SUCCESS
Build 31 Learner Intelligence compatibility     32173436101  SUCCESS
```

`Build 37.4 Foundations F11 negation` run `32173436307` initially failed only in Chrome VI desktop parity after all static/contracts/ownership/predecessor checks passed. It was green on the preceding certified #209 head (`32171636777`). Rerun **unchanged** job `95831058266` finished **SUCCESS**, including VI/FR desktop+iPhone parity.

Classification: **runner/Chrome flake; no Build39.2 product regression; no mutation required**.

## Build 39.3 audit verdict — composition before new evidence

The post-39.2 audit rejected creating new durable concept/mastery evidence merely to make all six action families available.

Observed product reality:

```text
Learning Memory.summary()
→ already exposes entries / due / fragile / learning / solid

Error Intelligence.summary()
→ already exposes top priorities + recent observable events

Foundations
→ optional / ephemeral learner capsules
→ no persistent concept-mastery owner

Build38 Transfer
→ ephemeral exercises
→ explicitly not a mastery score

Evidence v2
→ derived shadow only
→ not product read-path truth
```

Therefore the next safe useful slice is **pure composition**:

```text
caller-supplied snapshots
→ 39.2 evidence adapter
→ normalized six-family candidates
→ 39.1 arbitration core
→ selected reliable action OR explicit abstention
```

This does not close the three unavailable evidence families. It proves the currently reliable path end-to-end before any runtime collector or learner-facing wiring is authorized.

## Active slice — Build 39.3 Learner Action Decision Pipeline

- Branch: **`build39/decision-pipeline`**
- Base: exact accepted main **`9a60e316e7a75bd5b6e0ce8f42bd20475f7785b7`**
- State: **CANDIDATE / PURE COMPOSITION / NON-WIRED / NOT MERGED**
- Runtime UI wiring: **none**
- Durable writes: **none**
- Direct product-owner reads: **none**
- Evidence v2 read-path cutover: **none**

Candidate owner:

```text
src/pedagogy/learner-action-decision-pipeline.js
export = FrenchTranquilleLearnerActionDecisionPipeline
roadmapSlice = 39.3
```

Pipeline contract:

- consume caller-supplied snapshots only;
- invoke certified 39.2 adapter unchanged;
- feed its candidate set into certified 39.1 arbitration unchanged;
- expose selected action / ranking / rejected candidates / abstention reason;
- preserve the three 39.2 unavailable families exactly;
- recognition-failure-only input may not manufacture learner need;
- decorative/global totals may not alter the selected action;
- input must remain unmodified;
- missing dependencies must produce explicit `pipeline-dependencies-missing` abstention rather than guessing.

Candidate paths:

```text
src/pedagogy/learner-action-decision-pipeline.js
tests/unit/build39-3-decision-pipeline.test.cjs
.github/workflows/build39-3-decision-pipeline.yml
docs/BUILD-39.3-LEARNER-ACTION-DECISION-PIPELINE.md
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

Build26.4 is a classified runner/harness flake, not standing debt. The Build37.4 #210 event is also classified as a runner/Chrome flake after unchanged rerun success. Any other failure is **NEW until classified**. Suspected flakes must be rerun unchanged before product mutation.

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
Build 39.2 evidence-source reliability boundaries
```

## NEXT

Fresh control step for the Build39.3 candidate only:

```text
open PR for build39/decision-pipeline
→ verify exact five-path scope
→ require Build 39.3 decision-pipeline tribunal
→ require Build39.1 + Build39.2 + v2.5/Build38 predecessors green
→ classify full matrix against five inherited failures
→ rerun only proven flakes unchanged if necessary
→ if no new regression, merge with expected-head protection
→ verify main exact
→ only then decide whether the next slice should collect real runtime snapshots or address another evidence gap
```

Do **not** wire Build39 to learner-facing UI inside 39.3.
