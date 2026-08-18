# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-18

## Canonical accepted main

- Repository: `shinobione/tran-french-teacher`
- Accepted `main`: **`52152b0cfc3833a9a030c04a66a3970637a9dd31`**
- Commit: `Docs: close Build 39.3`
- PR **#213 — MERGED** from exact head **`bc6721a20c1cf301177cf591ca01a69caf09b870`** with expected-head squash protection.
- Parent runtime/internal checkpoint: **`c809790453a40ae5e2da3a497e3b64b7a51e5d87`** — PR #212 / Build 39.3 decision pipeline.
- `main` verification after #213: exact SHA `52152b0c…`, signed / verified, and **0 open PRs** before this governance audit slice.
- Public runtime release remains **v2.5.0 · Build 38 — ACCEPTED / DEPLOYED**.
- Pedagogy baseline remains **v2.3.0 · Build 34**.
- Latest exact public release deployment proof remains **GitHub Pages #272 / run `32072053127` — SUCCESS** on release SHA `2abe20511d6265d12643276f18041812fec3e715`, with `github-pages` deployment `5951805479 — SUCCESS` on that same release SHA.
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

- milestone: **PEDAGOGICALLY COMPLETE / CLOSED / RELEASED**
- Build 38.11: **NOT AUTHORIZED**
- public release: **v2.5.0 · Build 38**

## Build 39 — Learner Intelligence 3 — OPEN

Target action families:

```text
phrase-retrieval
concept-review
foundation-capsule
listening
scenario
transfer-construction
```

Permanent Build39 rule: consume reliable evidence from existing owners; never invent mastery from recognition failures, decorative activity counts or unsupported inference.

## Build 39.1 — learner action arbitration core — CLOSED / CERTIFIED

- PR **#208 — merged**
- final candidate head **`719a838456156f9df3f7602b1beea0af1df322ab`**
- squash merge **`246338a9ef11eb430f59fc6ccf494688904cf883`**
- dedicated run **`32169633637` — SUCCESS**
- docs closeout PR **#209 — merged**
- owner: `src/pedagogy/learner-action-arbitration-core.js`
- export: `FrenchTranquilleLearnerIntelligenceV3Core`
- state: **PURE / NON-WIRED / CERTIFIED**

39.1 requires observed need, confidence and independent evidence. Transfer/construction requires >=2 independent evidence items. Recognition-failure-only candidates are ineligible. Decorative activity totals are ignored. Explicit abstention is allowed.

## Build 39.2 — learner evidence adapter — CLOSED / CERTIFIED

- PR **#210 — merged**
- final candidate head **`6fe014358fcdf39f262de5928e2705efbb964cd9`**
- squash merge **`9af287417d1fbb502837bea4aa80886cca2ffb2e`**
- dedicated run **`32173436063` — SUCCESS**
- docs closeout PR **#211 — merged** as `9a60e316e7a75bd5b6e0ce8f42bd20475f7785b7`
- owner: `src/pedagogy/learner-evidence-adapter.js`
- export: `FrenchTranquilleActionEvidenceAdapter`
- state: **PURE ADAPTER / NON-WIRED / CERTIFIED**

Reliable sources accepted by 39.2:

```text
Learning Memory.summary()
→ due / fragile / item-level review state

Error Intelligence.summary()
→ observed item-level errors / priorities / recent events

Listening
→ only through explicit listening-* Error events

Scenario
→ only through scenario-miss / scenario-assisted observable events
```

Deliberately unavailable because no trustworthy durable owner exists:

```text
concept-review
foundation-capsule
transfer-construction
```

Absence of evidence means **unavailable / abstain**, not inferred weakness.

## Build 39.3 — learner action decision pipeline — CLOSED / CERTIFIED

- PR **#212 — merged**
- final candidate head **`70983da67a1f3c4703175ed5eaf4fa2c139cef68`**
- squash merge **`c809790453a40ae5e2da3a497e3b64b7a51e5d87`**
- dedicated run **`32174906010` — SUCCESS**
- docs closeout PR **#213 — merged** as **`52152b0cfc3833a9a030c04a66a3970637a9dd31`**
- owner: `src/pedagogy/learner-action-decision-pipeline.js`
- export: `FrenchTranquilleLearnerActionDecisionPipeline`
- state: **PURE COMPOSITION / NON-WIRED / CERTIFIED**

Certified composition:

```text
caller-supplied snapshots
→ certified 39.2 evidence adapter
→ normalized six-family candidates
→ certified 39.1 arbitration core
→ selected reliable action OR explicit abstention
```

39.3 adds no evidence semantics, no direct owner reads, no storage access, no Evidence cutover, no UI/runtime wiring and no public version change.

### #213 CI classification

The docs-only #213 head was `bc6721a20c1cf301177cf591ca01a69caf09b870`.

Its first fully drained matrix contained one failure outside the inherited five:

```text
Premium V5.9C Real Shared System
run 32175440403
job 95836178989
```

Static contracts and sanctuaries passed. The failure occurred only in the Chrome shared-surfaces tribunal when headless Chrome hit the workflow timeout (`exit 124`) with runner/DBus noise and no product assertion failure. The **same job was rerun unchanged**; rerun job `95837031577` finished **SUCCESS**, including the previously timed-out Chrome tribunal, reduced-motion and real-app A+B+C steps.

Final #213 classification: **exactly the five inherited failures, no additional failure, no queued / no in-progress**. No product or workflow mutation was used.

## Build 39.4 audit — READ-ONLY VERDICT / IMPLEMENTATION NOT YET STARTED

The audit after #213 inspected the real runtime owners rather than inventing a new evidence store.

### Existing trustworthy runtime APIs

`src/pedagogy/learning-memory.js` already exposes:

```text
window.FrenchTranquilleMemory.summary()
→ entries / due / fragile / learning / solid / tomorrow
```

`src/pedagogy/error-intelligence.js` already exposes:

```text
window.FrenchTranquilleErrors.summary()
→ recent / recurring / assisted / voice / top / totals / session
```

39.2 already consumes exactly the relevant shapes from these two owners. Listening and Scenario evidence already reaches Error Intelligence through explicit source/type events, so Build39.4 does **not** need to read Listening or Scenario directly.

### Existing Build30 Runtime Bridge is not the 39.4 owner

`src/core/runtime-bridge.js` is a frozen Build30 architecture/diagnostic boundary. It imports `runtime-contracts.js`, verifies APIs/routes/stores and creates architecture snapshots; it also reads store presence/learner state directly for diagnostics.

It does **not** expose the item-level Memory/Error snapshot shape required by 39.2. Build39.4 must therefore **not mutate or overload the frozen Build30 bridge** merely to add pedagogical decision input.

`src/core/build-meta.js` imports the Build30 runtime contracts + bridge, so that architecture boundary remains live and protected.

### 39.4 selected direction

**Audit winner: a separate read-only learner-action runtime snapshot collector.**

Target flow:

```text
FrenchTranquilleMemory.summary()
+ FrenchTranquilleErrors.summary()
→ detached narrow immutable snapshot
→ certified 39.3 decision pipeline
→ decision / abstention
```

The collector should copy only the fields needed by 39.2, so downstream code never receives mutable references to Memory/Error internal state.

Mandatory 39.4 boundaries:

- no direct `localStorage` / `sessionStorage` / IndexedDB reads in the new collector;
- no durable write;
- no new store / schema / migration;
- no Evidence v2 product read-path cutover;
- no mutation of Build30 `runtime-bridge.js` / `runtime-contracts.js`;
- no mutation of Memory / Error / Listening / Scenario owner semantics;
- no new evidence semantics and no attempt to unlock unsupported action families;
- no learner-facing UI/action execution yet;
- no public runtime version bump;
- preserve LI V1/V2 compatibility and historical learner continuity;
- browser tribunal must prove owner summaries → detached snapshot → 39.3 decision/abstention while all seven durable stores remain byte-identical.

This is a **runtime-read/composition safety slice**, not learner-facing Learner Intelligence 3 wiring.

## Historical learner continuity — LOCKED

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

No Build39 work may reset, renumber or reinterpret this state.

## CI baseline

Known persistent inherited failures:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Build26.4 is a classified runner/harness flake, not standing debt. Build37.4 #210 and Premium V5.9C #213 are classified runner/Chrome flakes after unchanged rerun success. Any other failure is **NEW until classified**.

## Protected boundaries

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
Build30 runtime contracts / runtime bridge frozen architecture boundary
```

## Active slice — governance reconciliation before Build39.4 implementation

- Branch: **`docs/build39-4-audit-reconcile`**
- Base: **`52152b0cfc3833a9a030c04a66a3970637a9dd31`**
- Runtime/product change: **none**
- Goal: reconcile `PROJECT-STATE.md` + `MASTER-ROADMAP.md` with accepted 39.1→39.3 reality and persist the read-only 39.4 audit verdict.

## NEXT

```text
finish governance reconciliation PR
→ verify docs-only scope
→ control / merge it separately
→ then open Build39.4 as one implementation slice
→ implement only the read-only runtime snapshot collector + dedicated tribunal
→ STOP at candidate PR
```

Do **not** wire a learner-facing recommendation/action executor inside 39.4. Do **not** create concept/Foundation/Transfer mastery evidence merely to fill the remaining three families.
