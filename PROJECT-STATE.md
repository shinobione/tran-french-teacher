# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-18

## Canonical accepted main

- Repository: `shinobione/tran-french-teacher`
- Accepted `main`: **`c809790453a40ae5e2da3a497e3b64b7a51e5d87`**
- Commit: `Build 39.3 · learner action decision pipeline (#212)`
- PR **#212 — MERGED** from exact candidate head **`70983da67a1f3c4703175ed5eaf4fa2c139cef68`** with expected-head squash protection.
- GitHub merge SHA: **`c809790453a40ae5e2da3a497e3b64b7a51e5d87`**, signed / verified.
- PR #212 changed exactly five paths and remained a **pure, non-wired Build39 composition slice**.
- Public runtime release remains **v2.5.0 · Build 38 — ACCEPTED / DEPLOYED**.
- Pedagogy baseline remains **v2.3.0 · Build 34**.
- Latest exact release deployment proof remains **GitHub Pages #272 / run `32072053127` — SUCCESS** on release SHA `2abe20511d6265d12643276f18041812fec3e715`, with `github-pages` deployment `5951805479 — SUCCESS` on that same release SHA.
- Build39.1 / 39.2 / 39.3 are internal non-wired checkpoints and do **not** change public runtime metadata or learner-facing runtime semantics.

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

Reliable current sources accepted by 39.2:

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

Deliberately unavailable until a trustworthy owner exists:

```text
concept-review
→ no durable concept-understanding evidence

foundation-capsule
→ Foundations remains optional / ephemeral with no mastery evidence

transfer-construction
→ Build38 Transfer remains ephemeral and explicitly not a mastery score
```

Absence of reliable evidence means **unavailable / abstain**, not inferred weakness.

## Build 39.3 — Learner Action Decision Pipeline — CLOSED / CERTIFIED

- PR **#212 — merged**
- base: **`9a60e316e7a75bd5b6e0ce8f42bd20475f7785b7`**
- final candidate head: **`70983da67a1f3c4703175ed5eaf4fa2c139cef68`**
- squash merge / accepted main: **`c809790453a40ae5e2da3a497e3b64b7a51e5d87`**
- dedicated workflow: **`Build 39.3 Learner action decision pipeline`**
- dedicated final-head run: **`32174906010` — SUCCESS**
- state: **PURE COMPOSITION / NON-WIRED / MERGED / CERTIFIED**

Certified owner:

```text
src/pedagogy/learner-action-decision-pipeline.js
export = FrenchTranquilleLearnerActionDecisionPipeline
roadmapSlice = 39.3
```

Certified pipeline:

```text
caller-supplied snapshots
→ certified 39.2 evidence adapter
→ normalized six-family candidates
→ certified 39.1 arbitration core
→ selected reliable action OR explicit abstention
```

39.3 adds **no new evidence semantics**. It composes the already-certified 39.1 and 39.2 owners and preserves their boundaries.

Permanent 39.3 contract:

- caller-supplied snapshots only;
- no direct read from Memory / Errors / Listening / Scenario / Foundations / Transfer runtime owners;
- no `localStorage`, `sessionStorage`, IndexedDB or durable write;
- no Evidence v2 product read-path cutover;
- no UI/runtime wiring, loader, service-worker or public-version change;
- recognition-failure-only input cannot manufacture learner need;
- decorative/global counters cannot alter the decision;
- unsupported `concept-review`, `foundation-capsule`, `transfer-construction` remain unavailable;
- input remains unmodified;
- missing dependencies produce explicit `pipeline-dependencies-missing` abstention instead of guessing.

Exact #212 changed paths:

```text
.github/workflows/build39-3-decision-pipeline.yml
PROJECT-STATE.md
docs/BUILD-39.3-LEARNER-ACTION-DECISION-PIPELINE.md
src/pedagogy/learner-action-decision-pipeline.js
tests/unit/build39-3-decision-pipeline.test.cjs
```

### 39.3 final CI classification

On exact head `70983da67a1f3c4703175ed5eaf4fa2c139cef68`:

```text
Build 39.3 Learner action decision pipeline     32174906010  SUCCESS
Build 39.2 Learner evidence adapter              32174905906  SUCCESS
Build 39.1 Learner action arbitration core       32174905872  SUCCESS
Release v2.5.0 Build 38 certification            32174905955  SUCCESS
Runtime version metadata                         32174905978  SUCCESS
Build 38.10 Learner-facing spoken on transfer    32174906006  SUCCESS
Build 32 Practical A1 Expansion                   32174907478  SUCCESS
Build 31 Learner Intelligence compatibility      32174905874  SUCCESS
```

The dedicated 39.3 job also passed:

```text
Syntax + 39.3 composition contract        SUCCESS
Existing release + Build38 predecessor    SUCCESS
39.3 scope guard — composition only       SUCCESS
Frozen sanctuaries byte-identical         SUCCESS
```

The full PR matrix drained completely with **no queued / no in-progress** run and exactly the five inherited failures below. No flake rerun or product/workflow mutation was required for #212.

## Historical learner continuity — LOCKED

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

No Build39 work may reset, renumber or reinterpret this state.

## CI baseline

Known persistent inherited failure baseline on the final #212 head:

1. `French Trân'quille quality` — run `32174905936`
2. `Build 36.2 Evidence shadow adoption` — run `32174905938`
3. `V2.0.0 Freeze tribunal` — run `32174905838`
4. `Build 36.3 Recovery v3 durability tribunal` — run `32174905965`
5. `Build 28 Data recovery smoke` — run `32174905999`

Everything else in the drained #212 PR matrix completed **SUCCESS**.

Build26.4 is a classified runner/harness flake, not standing debt. The Build37.4 #210 event remains classified as a runner/Chrome flake after unchanged rerun success. Any future failure outside the five-item baseline is **NEW until classified**. Suspected flakes must be rerun unchanged before product mutation.

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
Build 39.3 pure decision-pipeline composition contract
```

## Active control slice — Build 39.3 closeout

- Branch: **`docs/build39-3-closeout`**
- Base: exact accepted main **`c809790453a40ae5e2da3a497e3b64b7a51e5d87`**
- Scope: **`PROJECT-STATE.md` only**
- Runtime/product change: **none**
- Goal: persist the accepted #212 merge + CI classification before any Build39.4 product decision.

## NEXT

Fresh control step for the docs-only 39.3 closeout:

```text
open / re-read the closeout PR
→ confirm PROJECT-STATE.md is the only changed path
→ classify its CI against the five inherited failures
→ if no new regression, merge with expected-head protection
→ verify main exact
→ then perform a separate Build39.4 audit before any new implementation
```

### Build39.4 audit boundary — NOT YET AUTHORIZED

The next product decision must be made by audit, not by numbering momentum.

Primary candidates:

```text
A. read-only runtime snapshot collector
   real Memory.summary() + Errors.summary()
   → caller snapshot shape
   → certified 39.3 pipeline

B. a genuine evidence gap
   concept-review / Foundation / Transfer
   only if an existing trustworthy owner can support it
```

Do **not** create durable concept/mastery state merely to unlock all six families. Do **not** cut over Evidence v2 as product truth. Do **not** wire learner-facing UI until a later explicit slice proves the runtime read/composition safety contract.

`MASTER-ROADMAP.md` keeps the durable Build39 mandate. If its volatile current-line metadata still lags behind this accepted checkpoint, reconcile that metadata in a dedicated governance-safe step before using it to authorize Build39.4 implementation.
