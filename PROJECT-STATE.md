# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-18

## Canonical accepted main

- Repository: `shinobione/tran-french-teacher`
- Accepted `main`: **`9c5c75c4adf7c35eaf4b4c8331af24e1efb79d7c`**
- Commit: `Docs: reconcile Build 39.3 closeout + 39.4 audit`
- PR **#214 — MERGED** from exact head **`4feb69242ead12c563bb3a2ccb1ac043af2cd475`** with expected-head squash protection.
- Parent accepted checkpoint: **`52152b0cfc3833a9a030c04a66a3970637a9dd31`** — PR #213 / Build39.3 docs closeout.
- #214 final-head matrix: **exactly the five inherited failures, no additional failure, no queued / no in-progress**.
- `main` verification after #214: exact SHA `9c5c75c…`, signed / verified, and **0 open PRs before the Build39.4 implementation branch was opened**.
- Public runtime release remains **v2.5.0 · Build 38 — ACCEPTED / DEPLOYED**.
- Pedagogy baseline remains **v2.3.0 · Build 34**.
- Latest exact public release deployment proof remains **GitHub Pages #272 / run `32072053127` — SUCCESS** on release SHA `2abe20511d6265d12643276f18041812fec3e715`, with deployment `5951805479 — SUCCESS` on that same release SHA.

## Accepted product state

```text
Public runtime          v2.5.0 · Build 38
Pedagogy baseline       v2.3.0 · Build 34
Curriculum              52 lessons / 313 items
Scenario                44 situations / 132 turns
Speaking Loop           52/52 · max 2 moments / lesson
Listening               0.88 normal / 0.65 slow
Recovery                7 durable stores / backup v3
Evidence v2             derived shadow only
Original six stores     product truth
Premium V5.10           CLOSED / physical field pass
Primary field target    iPhone / Safari / installed PWA
```

## Historical learner continuity — LOCKED

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

No Build39 work may reset, renumber or reinterpret this state.

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

- PR #208 merged; squash **`246338a9ef11eb430f59fc6ccf494688904cf883`**
- final candidate head `719a838456156f9df3f7602b1beea0af1df322ab`
- dedicated run `32169633637` — SUCCESS
- owner: `src/pedagogy/learner-action-arbitration-core.js`
- export: `FrenchTranquilleLearnerIntelligenceV3Core`
- pure / deterministic / no storage / no learner-facing wiring.

39.1 requires observed need, confidence and independent evidence. Transfer/construction requires >=2 independent evidence items. Recognition-failure-only candidates are ineligible. Decorative activity totals are ignored. Explicit abstention is allowed.

## Build 39.2 — learner evidence adapter — CLOSED / CERTIFIED

- PR #210 merged; squash **`9af287417d1fbb502837bea4aa80886cca2ffb2e`**
- final candidate head `6fe014358fcdf39f262de5928e2705efbb964cd9`
- dedicated run `32173436063` — SUCCESS
- docs closeout #211 merged as `9a60e316e7a75bd5b6e0ce8f42bd20475f7785b7`
- owner: `src/pedagogy/learner-evidence-adapter.js`
- export: `FrenchTranquilleActionEvidenceAdapter`

Reliable sources accepted by 39.2:

```text
Learning Memory.summary() → due / fragile / item-level review state
Error Intelligence.summary() → observed priorities / recent item events
Listening → only through explicit listening-* Error events
Scenario → only through scenario-miss / scenario-assisted Error events
```

Deliberately unavailable because no trustworthy durable owner exists:

```text
concept-review
foundation-capsule
transfer-construction
```

Absence of evidence means **unavailable / abstain**, not inferred weakness.

## Build 39.3 — learner action decision pipeline — CLOSED / CERTIFIED

- PR #212 merged; squash **`c809790453a40ae5e2da3a497e3b64b7a51e5d87`**
- final candidate head `70983da67a1f3c4703175ed5eaf4fa2c139cef68`
- dedicated run `32174906010` — SUCCESS
- docs closeout #213 merged as `52152b0cfc3833a9a030c04a66a3970637a9dd31`
- owner: `src/pedagogy/learner-action-decision-pipeline.js`
- export: `FrenchTranquilleLearnerActionDecisionPipeline`

Certified composition:

```text
caller-supplied snapshots
→ certified 39.2 evidence adapter
→ normalized six-family candidates
→ certified 39.1 arbitration core
→ selected reliable action OR explicit abstention
```

39.3 adds no evidence semantics, no direct owner reads, no storage access, no Evidence cutover and no learner-facing wiring.

## Build 39.4 — read-only runtime snapshot collector — ACTIVE / CANDIDATE BRANCH

Audit authority: `docs/BUILD-39.4-RUNTIME-SNAPSHOT-AUDIT.md`.

### Selected runtime flow

```text
FrenchTranquilleMemory.summary()
+
FrenchTranquilleErrors.summary()
        ↓
narrow detached immutable snapshot
        ↓
certified 39.3 decision pipeline
        ↓
reliable decision OR explicit abstention
```

39.4 is the first Build39 slice that **loads the certified 39.1 → 39.4 chain in the current non-historical runtime**, but it still performs **no automatic decision and no learner-facing action**.

New owner candidate:

```text
src/pedagogy/learner-action-runtime-snapshot.js
window.FrenchTranquilleLearnerActionRuntimeSnapshot
version = 3.0.0-runtime-snapshot
```

Public methods:

```text
status()   → readiness only; no owner read
collect()  → Memory/Error summaries → detached immutable narrow snapshot
decide()   → explicit caller action → collect → certified 39.3 pipeline
```

### Narrow copied fields

Memory:

```text
entries[] → id / attempts
due[]     → id
fragile[] → id
```

Errors:

```text
top[]
  item.id
  score
  dominant
  entry.id
  entry.lastType
  entry.events[] → type / source

recent[]
  id
  type
  source
  repeated
```

No totals, decorative counters, curriculum text, Evidence state or owner object references are copied.

### Runtime delivery

`src/core/build32-loader.js` loads, in exact order inside the current non-historical runtime only:

```text
39.1 arbitration core
→ 39.2 evidence adapter
→ 39.3 decision pipeline
→ 39.4 runtime snapshot collector
```

The loader **does not call `decide()` at boot**. This avoids turning `Memory.summary()` lazy synchronization into an automatic Build39 side effect.

`sw.js` pre-caches the same four Build39 runtime dependencies with distinct 39.1 / 39.2 / 39.3 / 39.4 URL identities. The existing PWA cache namespace is preserved; this is not a cache-identity migration.

Public runtime metadata remains exactly:

```text
v2.5.0 · Build 38
```

### 39.4 tribunals in candidate branch

Unit tribunal proves:

- narrow-field copying only;
- deep frozen output;
- mutation attempts cannot mutate source owner objects;
- real 39.3 selection from normalized retrieval evidence;
- recognition-only evidence abstains;
- missing runtime owners/dependencies produce explicit `runtime-snapshot-dependencies-missing` abstention.

Real-browser tribunal boots the **actual application runtime in same-origin frames**, with historical learner continuity seeded before boot. It requires:

```text
retrieval owner state → phrase-retrieval / bonjour
recognition-only owner state → abstention
unsupported concept/Foundation/Transfer families stay unavailable
returned snapshot is deeply immutable
Memory/Error owner summaries unchanged by collect()+decide()
all seven durable stores byte-identical before/after collect()+decide()
7 completed / l8=4 / 40 known preserved
```

### 39.4 mandatory boundaries

- no direct `localStorage`, `sessionStorage` or IndexedDB read in the collector;
- no durable write;
- no new store / schema / migration;
- no Evidence v2 product read-path cutover;
- no mutation of frozen Build30 `runtime-contracts.js` / `runtime-bridge.js`;
- no mutation of Memory / Error / Listening / Scenario semantics;
- no direct Listening / Scenario / Foundations / Transfer read in the collector;
- no new evidence semantics;
- no attempt to unlock `concept-review`, `foundation-capsule` or `transfer-construction`;
- no learner-facing UI / route / action execution;
- no public runtime version bump;
- preserve LI V1/V2 compatibility and historical learner continuity.

## Active slice

- Branch: **`build39/runtime-snapshot-collector`**
- Base: **`9c5c75c4adf7c35eaf4b4c8331af24e1efb79d7c`**
- Intended changed paths:

```text
.github/workflows/build39-4-runtime-snapshot.yml
PROJECT-STATE.md
src/core/build32-loader.js
src/pedagogy/learner-action-runtime-snapshot.js
sw.js
tests/browser/build39-4-runtime-snapshot.html
tests/unit/build39-4-runtime-snapshot.test.cjs
```

- No 39.1 / 39.2 / 39.3 owner file is modified.
- No learner-facing UI is modified.
- No public release/version metadata is changed.

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

## NEXT

```text
materialize Build39.4 candidate PR from the active branch
→ STOP at PR boundary
→ fresh control of exact PR head / scope / dedicated tribunal
→ classify every red outside the inherited five as NEW
→ merge only after exact-head certification
→ then determine the next Build39 slice from repo reality / MASTER-ROADMAP
```

Do **not** wire a learner-facing recommendation/action executor inside 39.4. Do **not** create concept/Foundation/Transfer mastery evidence merely to fill the remaining three families.
