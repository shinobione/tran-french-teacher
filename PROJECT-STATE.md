# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-18

## Canonical accepted main

- Repository: `shinobione/tran-french-teacher`
- Accepted runtime/internal `main`: **`3d3a6259b7b86ef7f7511832368c6d1eb549be44`**
- Commit: `Build 39.5: LI3 advisory-only Practice recommendation`
- PR **#217 — MERGED** from exact final head **`c171b0e65194289257a5e30763965f9f6ef6c03a`** with expected-head squash protection.
- Parent: `15cd59be579f546b44946f6e31046d3a66cf21f5` — Build39.4 docs/governance closeout.
- Merge commit is GitHub verified / valid.
- Immediately after merge, `main` was re-read and matched exactly `3d3a6259...`; open PR search returned **0 open PRs** before this docs closeout branch.
- Public runtime metadata remains **v2.5.0 · Build 38**.
- Pedagogy baseline remains **v2.3.0 · Build 34**.
- Latest exact public release deployment proof remains GitHub Pages #272 / run `32072053127` on release SHA `2abe20511d6265d12643276f18041812fec3e715`.

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

No future work may reset, renumber or reinterpret this state.

## Build 38 — CLOSED / RELEASED

```text
38.1 → 38.2   subject substitution       → lesson 33
38.3 → 38.8   affirmation → negation     → lesson 34
38.4 → 38.5   present → futur proche     → lesson 35
38.6 → 38.7   singular → plural nominal  → lesson 13
38.9 → 38.10  nous → spoken on           → lesson 52
```

Build38 is pedagogically complete, public release is `v2.5.0 · Build 38`, and Build38.11 is not authorized.

## Build 39 — Learner Intelligence 3 — CLOSED / CERTIFIED

Milestone contract: choose a useful next action only from trustworthy observable evidence; otherwise explicitly abstain. Never invent mastery from speech-recognition failure, decorative counts, exposure or unsupported inference.

Target vocabulary remains:

```text
phrase-retrieval
concept-review
foundation-capsule
listening
scenario
transfer-construction
```

Current trustworthy availability:

```text
phrase-retrieval ✅
listening        ✅
scenario         ✅
concept-review         unavailable — no durable concept-understanding owner
foundation-capsule     unavailable — Foundations has no trustworthy need owner
transfer-construction  unavailable — Transfer has no durable evidence owner
```

### 39.1 — arbitration core — CLOSED / CERTIFIED

- merge `246338a9ef11eb430f59fc6ccf494688904cf883`
- owner `src/pedagogy/learner-action-arbitration-core.js`
- deterministic ranking, independent-evidence thresholds, recognition-only rejection, explicit abstention.

### 39.2 — evidence adapter — CLOSED / CERTIFIED

- merge `9af287417d1fbb502837bea4aa80886cca2ffb2e`
- owner `src/pedagogy/learner-evidence-adapter.js`
- trustworthy inputs: Memory due/fragile and explicit Error Intelligence item events.
- Listening/Scenario are consumed only through their explicit Error source/type events.

### 39.3 — decision pipeline — CLOSED / CERTIFIED

- merge `c809790453a40ae5e2da3a497e3b64b7a51e5d87`
- owner `src/pedagogy/learner-action-decision-pipeline.js`
- caller snapshots → 39.2 → 39.1 → decision/abstention.

### 39.4 — runtime snapshot collector — CLOSED / CERTIFIED

- merge `f662d96d55e385f3d6baa946bde8f22fd1d25f0e`
- owner `src/pedagogy/learner-action-runtime-snapshot.js`
- API `FrenchTranquilleLearnerActionRuntimeSnapshot.status()/collect()/decide()`.

Certified runtime flow:

```text
FrenchTranquilleMemory.summary()
+
FrenchTranquilleErrors.summary()
→ narrow detached immutable snapshot
→ 39.3 pipeline
→ reliable decision OR abstention
```

No decision at boot, no direct collector storage access, no durable write, no Evidence cutover and no learner-facing action execution.

### 39.5 — advisory-only Practice recommendation — CLOSED / CERTIFIED

- PR #217 final head **`c171b0e65194289257a5e30763965f9f6ef6c03a`**
- accepted merge **`3d3a6259b7b86ef7f7511832368c6d1eb549be44`**
- owner `src/pedagogy/learner-action-practice-advisory.js`
- API `FrenchTranquilleLearnerActionPracticeAdvisory`.

Build27 App Shell remains byte-identical and keeps route/action ownership.

When the learner explicitly opens Practice:

```text
39.4 decide()
→ phrase-retrieval → Réviser
→ listening        → Écouter
→ scenario         → Dans la vraie vie
→ abstain/unsupported → no advisory
```

39.5 only replaces the historical coarse `Conseillé maintenant` badge. No automatic route, click, persistent write, Evidence read-path change or fallback `Parler` recommendation occurs.

Dedicated final-head run:

```text
Build 39.5 Practice advisory — 32182481929 ✅ SUCCESS
```

The real-app Chrome tribunal passed VI/DEBUG FR × desktop/iPhone and proved retrieval/listening/scenario mapping, recognition-only + empty abstention, no auto-route, historical manual Review route, seven-store byte identity while advice renders, `7 completed / l8=4 / 40 known`, touch geometry and no overflow.

The first dedicated run `32182214772` failed only because the test iframe used HTML `hidden` while asserting 44px geometry, necessarily producing 0×0 rects. Only the harness changed to a layoutable off-screen iframe; no product logic changed for this classification.

Final exact-head matrix drained with **exactly the five inherited standing failures, no other failure, no queued, no in-progress**. Important green predecessors included Runtime metadata, Build27, Build31/32, Build39.1→39.4, Release v2.5, Build38.10, navigation/PWA/Premium, Build26.1 and Build26.4.

## Build39 milestone closeout audit

No 39.6 learner-facing wiring is authorized.

Actual owner audit after #217:

- canonical Home is the Build27 Home, not the old Daily Coach surface;
- Build27 Home intentionally gives the current lesson the one primary CTA, with Review/Listening as secondary quick actions;
- Practice is the dedicated learner surface for choosing what to work on now, and 39.5 already provides LI3 advice there;
- adding a second LI3 recommendation system to Home would duplicate Practice or require a new Scenario CTA and weaken the one-primary-action Home contract;
- `src/pedagogy/daily-coach.js` is a legacy layer relative to the Build27 Home and directly reads learner/Memory storage, so rewriting it for LI3 would move architecture backwards;
- unsupported concept/Foundation/Transfer families still lack trustworthy evidence owners. No new durable evidence is justified merely to fill the vocabulary.

Verdict: **Build39 closes here** with reliable recommendation where evidence exists and explicit abstention where it does not.

## Build 40 — A1 Consolidation Audit — NEXT / AUDIT ONLY

Build40 starts as a read-only analysis/documentation milestone. No learner-facing runtime mutation is authorized until its verdict is closed.

Required audit dimensions:

```text
52 lessons / 313 items curriculum capability coverage
Foundations registry + actual placements
Build38 Transfer families + learner placements
Scenario 44 / 132 contextual reuse
Listening datasets / contrast families
Learning Memory + Error Intelligence semantics
LI3 supported vs unavailable evidence families
current learner-facing Home / Practice / Progress surfaces
```

Build40 must classify each meaningful A1 capability as something like:

```text
taught / exposed
practiced / recalled
contextually reused
constructed / transferred
reliably evidenced
under-evidenced
missing / deferred
```

It must then choose one defensible direction:

```text
A1 consolidation
or internal A1+ expansion
or A2 roadmap opening
```

No CEFR certification claim and no A2 implementation before the audit closes.

## CI baseline

Known persistent inherited failures:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Build26.4 is a classified runner/harness flake, not standing debt. Build37.4 and Premium V5.9C have historical runner/Chrome flake classifications after unchanged rerun success.

Any other failure is NEW until classified.

## Protected boundaries

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
PWA identity/cache contract from PR #180
Build30 runtime contracts/runtime bridge
Recovery v3 seven-store ownership
backup envelope v3
Evidence derived-shadow role
original six stores as product truth
52 / 313 curriculum semantics
Premium V5.10 field-approved UI/navigation
Build27 App Shell route/action ownership
Build37 Foundations ownership/routes
Build38 deterministic core semantics
Build38 learner-facing placements
shared Transfer renderer ownership
Learner Intelligence V1/V2 historical compatibility
Build39.1 arbitration semantics
Build39.2 evidence reliability boundaries
Build39.3 pipeline composition
Build39.4 read-only runtime snapshot contract
Build39.5 advisory-only Practice contract
```

## Active docs closeout

Branch:

```text
docs/build39-5-closeout
```

Base: exact accepted runtime/internal main `3d3a6259b7b86ef7f7511832368c6d1eb549be44`.

Intent: docs/governance only; close 39.5 + Build39 milestone and hand off Build40 audit.

## NEXT

```text
merge Build39 docs closeout
→ verify main + 0 open PRs
→ open Build40 audit-only branch
→ inspect real curriculum / Foundations / Transfer / Scenario / Listening / LI3 evidence
→ materialize durable capability/evidence/gap audit
→ choose one post-audit direction
→ no A2 implementation before Build40 closes
```
