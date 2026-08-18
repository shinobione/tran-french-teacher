# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-18

## Canonical accepted main

- Repository: `shinobione/tran-french-teacher`
- Accepted `main`: **`246338a9ef11eb430f59fc6ccf494688904cf883`**
- Commit: `Build 39.1: learner action arbitration core (#208)`
- PR: **#208 — merged**
- Public runtime release: **v2.5.0 · Build 38 — ACCEPTED / DEPLOYED**
- Pedagogy baseline: **v2.3.0 · Build 34**
- #208 is a **pure-core, non-wired Build39 slice**. It does not change public runtime metadata, learner-facing routes, durable learner state, Recovery, Evidence ownership, voice, Premium, PWA identity/cache, curriculum semantics, logo or favicon.
- Latest exact release deployment proof remains **GitHub Pages #272 / run `32072053127` — SUCCESS** on release SHA `2abe20511d6265d12643276f18041812fec3e715`, with `github-pages` deployment `5951805479 — SUCCESS` on that same release SHA.

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

- latest learner-facing roadmap checkpoint: **38.10**
- Build 38 milestone: **PEDAGOGICALLY COMPLETE / CLOSED / RELEASED**
- Build 38.11: **NOT AUTHORIZED**
- public release representing the milestone: **v2.5.0 · Build 38**

## Build 39 — Learner Intelligence 3 — OPEN

Build39 roadmap mandate: Tyffany should eventually choose the next useful action among:

```text
phrase retrieval
concept review
Foundation capsule
listening
scenario
transfer / construction
```

Build39 must consume reliable evidence from prior systems. It must not invent mastery from recognition failures, decorative activity counts or unsupported inference.

## Build 39.1 — learner action arbitration core — MERGED / CERTIFIED

- PR: **#208 — merged**
- Final candidate head: **`719a838456156f9df3f7602b1beea0af1df322ab`**
- Squash merge / accepted `main`: **`246338a9ef11eb430f59fc6ccf494688904cf883`**
- Dedicated workflow: `Build 39.1 Learner action arbitration core`
- Dedicated final-head run: **`32169633637` — SUCCESS**
- State: **PURE CORE / NON-WIRED / MERGED / CERTIFIED**

39.1 introduced the deterministic owner:

```text
src/pedagogy/learner-action-arbitration-core.js
```

The exported API remains:

```text
FrenchTranquilleLearnerIntelligenceV3Core
```

Canonical action IDs:

```text
phrase-retrieval
concept-review
foundation-capsule
listening
scenario
transfer-construction
```

The core accepts already-normalized candidate evidence and either:

- selects one reliable next action; or
- explicitly abstains with `insufficient-reliable-evidence`.

Reliability boundary:

- observed need required;
- minimum confidence required;
- independent evidence required;
- transfer/construction requires two independent pieces of evidence;
- blocked/unavailable candidates are ineligible;
- `recognition-failure-only` candidates are explicitly ineligible;
- decorative activity totals do not affect arbitration;
- ties are deterministic and input-order independent.

## 39.1 predecessor-CI naming collision — CLOSED

The first owner path was:

```text
src/pedagogy/learner-intelligence-v3-core.js
```

Historical Build37/38 predecessor ownership guards broadly protect:

```text
src/pedagogy/learner-intelligence.*\.js
```

The first candidate therefore triggered predecessor ownership reds even though the new core itself was pure and non-wired.

Classification: **historical predecessor ownership-guard naming collision, not a Build39.1 product/runtime regression**.

Resolution: preserve the historical guards and rename the new Build39 owner to:

```text
src/pedagogy/learner-action-arbitration-core.js
```

No predecessor workflow was weakened. Core semantics/API stayed unchanged.

Final-head proof after the rename included:

```text
Build 39.1 Learner action arbitration core     run 32169633637  SUCCESS
Release v2.5.0 Build 38 certification          run 32169633712  SUCCESS
Runtime version metadata                       run 32169633800  SUCCESS
Build 38.10 Learner-facing spoken on transfer  run 32169632536  SUCCESS
Build 32 Practical A1 Expansion                 run 32169633412  SUCCESS
Build 31 Learner Intelligence compatibility    run 32169633896  SUCCESS
Build 37.7 Foundations F12 practical questions run 32169633494  SUCCESS
Build 26.4 Progress single-scroll + Tyffany    run 32169633668  SUCCESS
```

Former predecessor reds including Build37.2 / 37.4 / 37.5 / 37.6 / 37.7 / 37.8 and Build38 learner-facing predecessors returned to SUCCESS on the final exact head.

`Premium V5.3 Pedagogical Islands` run **`32169633601`** failed only during the multi-screenshot Chrome capture step after static contracts and both functional tribunals had passed. The same job was rerun unchanged and finished **SUCCESS**. Classification: **runner/browser capture flake**, with no product or workflow mutation.

Final drained matrix: **exactly the five inherited failures below and no other failure / pending / in-progress run**.

## 39.1 explicit non-wiring contract — LOCKED

39.1 does not:

```text
read or write localStorage / sessionStorage / IndexedDB
make Evidence v2 product truth
change Learner Intelligence V1/V2
change curriculum
change Foundations ownership or routes
change Listening / Scenario / Transfer behavior
change voice
change Recovery / backup
change Premium UI
change PWA identity / cache
change public runtime version metadata
```

Evidence v2 remains a seventh **derived shadow**. 39.1 is not an Evidence read-path cutover.

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

Final #208 inherited-failure run IDs on head `719a838456156f9df3f7602b1beea0af1df322ab`:

```text
French Trân'quille quality                  32169632796  FAILURE / inherited
Build 36.2 Evidence shadow adoption         32169633743  FAILURE / inherited
V2.0.0 Freeze tribunal                      32169632645  FAILURE / inherited
Build 36.3 Recovery v3 durability tribunal  32169633861  FAILURE / inherited
Build 28 Data recovery smoke                32169633563  FAILURE / inherited
```

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
52 / 313 curriculum semantics
Premium V5.10 field-approved UI/navigation
Build 37 Foundations ownership/routes
Build 38 deterministic core semantics
Build 38 learner-facing placements
shared Transfer renderer ownership
Learner Intelligence V1/V2 historical compatibility
Build 39.1 deterministic arbitration semantics
```

## Active control slice — Build 39.1 closeout

- Branch: **`docs/build39-1-closeout`**
- Base: exact accepted main **`246338a9ef11eb430f59fc6ccf494688904cf883`**
- Scope: **documentation/governance only**
- Runtime/product change: **none**
- Goal: reconcile this checkpoint and `MASTER-ROADMAP.md` to the accepted #208 merge before any 39.2 implementation begins.

## NEXT

Finish the docs-only 39.1 closeout, then open 39.2 as a **separate** canonical implementation slice:

```text
39.2 — evidence adapter audit / implementation
→ inventory reliable existing product evidence sources
→ normalize only evidence already justified by current owners
→ preserve original six stores as product truth
→ keep Evidence v2 derived-shadow only
→ reject recognition-failure-only and decorative activity counts
→ feed normalized candidates into the certified 39.1 arbitration core
→ no learner-facing UI wiring yet unless a later explicit slice authorizes it
→ no durable schema migration
→ no mastery invention
→ preserve historical learner continuity
```

Do **not** start 39.2 inside this closeout branch.
