# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-18

## Canonical accepted main

- Repository: `shinobione/tran-french-teacher`
- Accepted `main`: **`9af287417d1fbb502837bea4aa80886cca2ffb2e`**
- Commit: `Build 39.2: learner evidence adapter`
- PR **#210 — merged** from exact head `6fe014358fcdf39f262de5928e2705efbb964cd9` with expected-head squash protection.
- Public runtime release remains **v2.5.0 · Build 38 — ACCEPTED / DEPLOYED**.
- Pedagogy baseline remains **v2.3.0 · Build 34**.
- Latest exact release deployment proof remains **GitHub Pages #272 / run `32072053127` — SUCCESS** on release SHA `2abe20511d6265d12643276f18041812fec3e715`, with `github-pages` deployment `5951805479 — SUCCESS` on that same release SHA.
- Build39.2 is a **pure, non-wired adapter slice**. It does not change public runtime metadata, learner-facing UI/routes, service worker, curriculum semantics, voice, Recovery, Premium, PWA identity/cache, durable learner state or Evidence ownership.

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
- base **`b3b7a14bb080ecfc0228d7edd24ab97d261eaa0f`**
- final candidate head **`6fe014358fcdf39f262de5928e2705efbb964cd9`**
- squash merge / accepted main **`9af287417d1fbb502837bea4aa80886cca2ffb2e`**
- dedicated workflow **`Build 39.2 Learner evidence adapter`**
- dedicated final-head run **`32173436063` — SUCCESS**
- state: **PURE ADAPTER / NON-WIRED / MERGED / CERTIFIED**

Certified owner:

```text
src/pedagogy/learner-evidence-adapter.js
export = FrenchTranquilleActionEvidenceAdapter
```

### 39.2 source audit verdict

Reliable current sources accepted for the first adapter:

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

### 39.2 final CI classification

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

`Build 37.4 Foundations F11 negation` run **`32173436307`** initially failed only in the Chrome VI desktop parity step after its syntax/contracts, ownership guards, real-app owner check and predecessor parity had already passed. The same workflow was SUCCESS on the immediately preceding certified #209 head (`32171636777`). The failed job was rerun **unchanged**; rerun job **`95831058266`** finished **SUCCESS**, including `Chrome — F11 VI/FR desktop + iPhone parity`.

Classification: **runner/Chrome flake, no Build39.2 product regression, no product/workflow mutation required**.

After that unchanged rerun, the matrix returned to exactly the five inherited failures below and no additional failure/pending/in-progress run.

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

Build26.4 is a classified runner/harness flake, not standing debt. The Build37.4 #210 event above is also classified as a runner/Chrome flake after unchanged rerun success. Any other failure is **NEW until classified**. Suspected flakes must be rerun unchanged before product mutation.

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

## Active control slice — Build 39.2 closeout

- Branch: **`docs/build39-2-closeout`**
- Base: exact accepted main **`9af287417d1fbb502837bea4aa80886cca2ffb2e`**
- Scope: **`PROJECT-STATE.md` only**
- Runtime/product change: **none**
- Goal: make the durable handoff reflect accepted Build39.2 before any 39.3 implementation begins.

## NEXT

Fresh control step for the Build39.2 docs closeout only:

```text
open/re-read the docs-only closeout PR
→ confirm PROJECT-STATE.md is the only changed path
→ classify CI against the five inherited failures
→ if no new regression, merge with expected-head protection
→ verify main equals the closeout merge SHA
→ then perform a separate Build39.3 audit before choosing any new implementation
```

### 39.3 audit boundary — NOT YET IMPLEMENTED

The next product slice must first decide what reliable evidence gap to close next. Audit candidates include:

```text
concept-review evidence
Foundation-capsule eligibility evidence
transfer/construction evidence
runtime composition of 39.2 adapter + 39.1 arbitration
```

Do **not** create durable concept/mastery evidence merely to make all six action families available. Do **not** cut over Evidence v2 as product truth. Do **not** wire learner-facing UI until a later explicit slice proves the composition and safety contract.
