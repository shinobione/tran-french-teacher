# French Trân’quille — MASTER ROADMAP

> **Canonical current roadmap / durable handoff.**
>
> Every future AI/chat/session working on `shinobione/tran-french-teacher` must read `AGENTS.md`, then `PROJECT-STATE.md`, then this file before roadmap or implementation decisions.
>
> The previous long-form MASTER is preserved byte-for-byte at `docs/archive/MASTER-ROADMAP-pre-39.4-closeout.md`. Historical build documents, PRs, README/changelog entries and archived roadmap versions remain evidence. This file owns the **current durable state, execution order, locked contracts and next authorized boundary**.

---

# 0. Canonical checkpoint — 2026-08-18

| Item | Canonical state |
|---|---|
| Accepted runtime/internal `main` | **`3d3a6259b7b86ef7f7511832368c6d1eb549be44`** — PR #217 / Build 39.5 |
| Public application runtime metadata | **v2.5.0 · Build 38** |
| Product pedagogy baseline | **v2.3.0 · Build 34** |
| Build 38 milestone | **CLOSED / RELEASED** |
| Build 39 — Learner Intelligence 3 | **CLOSED / CERTIFIED** |
| Build 39.1 | **CLOSED / CERTIFIED** — deterministic learner-action arbitration core |
| Build 39.2 | **CLOSED / CERTIFIED** — reliable Memory/Error evidence adapter |
| Build 39.3 | **CLOSED / CERTIFIED** — pure decision pipeline |
| Build 39.4 | **CLOSED / CERTIFIED** — read-only runtime snapshot collector |
| Build 39.5 | **CLOSED / CERTIFIED** — advisory-only Practice recommendation |
| Next milestone | **Build 40 — A1 Consolidation Audit** |
| Curriculum | **52 lessons / 313 items** |
| Scenario | **44 situations / 132 turns** |
| Speaking Loop | **52/52 · max 2 moments / lesson** |
| Listening | **0.88 normal / 0.65 slow** |
| Recovery | **7 durable stores / backup v3** |
| Evidence v2 | **derived shadow only; original six source stores remain product truth** |
| Premium V5.10 | **CLOSED / physical field pass** |
| Primary field target | **iPhone / Safari / installed PWA** |

Latest exact public release proof remains GitHub Pages #272 / run `32072053127` on release SHA `2abe20511d6265d12643276f18041812fec3e715`. Build39 internal slices do not silently change public SemVer/Build metadata.

## Historical learner continuity — LOCKED

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

No future work may reset, renumber or reinterpret this state.

---

# 1. Permanent source-of-truth and workflow rules

Priority:

1. live GitHub/git, deployed runtime, CI and physical field verdicts;
2. `PROJECT-STATE.md`;
3. this `MASTER-ROADMAP.md`;
4. focused build/architecture docs;
5. README/changelog/history;
6. chat memory.

Implementation discipline:

```text
audit real owners
→ choose ONE coherent slice
→ branch from accepted main
→ implementation + dedicated tribunal
→ candidate PR
→ exact-head review
→ classify every new red
→ expected-head merge only when justified
→ verify accepted main
→ docs/governance closeout
→ only then open the next slice
```

A suspected flake is rerun **unchanged** before product mutation. Historical baselines are not rewritten merely to make CI green.

---

# 2. Permanent learner/product safety contracts

## Voice

- no fake pronunciation score;
- speech-recognition failure is recognition-system evidence, not proof of poor pronunciation;
- own-voice replay remains local/temporary and never enters learner Memory/backups;
- automatic capture of the exact first Siri attempt remains separately field-gated.

## Data / Recovery / Evidence

- Recovery owns **7 durable stores / backup v3**;
- Evidence v2 remains a **derived shadow**;
- original six source stores remain product truth;
- no Evidence product read-path cutover without an explicit later migration decision;
- no new durable store/schema merely to make Learner Intelligence appear smarter;
- recognition-only evidence never implies mastery/weakness.

## Curriculum / pedagogy

- preserve 52 lesson IDs / 313 item semantics;
- Build37 Foundations ownership/routes remain historical contracts;
- Build38 deterministic core semantics and learner placements remain historical contracts;
- one shared Transfer renderer remains the owner of learner-facing Build38 construction cards;
- no hidden curriculum renumbering for convenience.

## Navigation / Premium field contract

- ZERO competing route facades / route flash;
- atomic route ownership switch;
- stable Back/Settings ownership;
- no learner-facing diagnostic cockpit;
- Premium V5.10 field-approved navigation/identities remain protected.

## Protected sanctuaries

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
PWA identity/cache contract from PR #180
Build30 runtime-contracts.js / runtime-bridge.js architecture boundary
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
Build39.2 evidence-source reliability boundaries
Build39.3 decision-pipeline composition contract
Build39.4 runtime-snapshot read-only contract
Build39.5 advisory-only Practice contract
```

---

# 3. Closed milestone summary

## Build 35 — Memory Evidence v2 readiness — CLOSED

Deterministic Evidence projection and reversible migration planning were proved. This did **not** make Evidence product truth.

## Build 36 — Recovery v3 / Evidence derived-shadow adoption — CLOSED

Seven-store Recovery / backup v3 established while retaining the original six source stores as product truth.

## Build 37 — Foundations Core — CLOSED

Foundations were industrialized without renumbering the curriculum and without a new persistent Foundations mastery store. F16 contractions remain deferred; that does not reopen Build37.

## Build 38 — Generalization & Transfer — CLOSED / RELEASED

Certified chain:

```text
38.1 → 38.2   subject substitution       → lesson 33
38.3 → 38.8   affirmation → negation     → lesson 34
38.4 → 38.5   present → futur proche     → lesson 35
38.6 → 38.7   singular → plural nominal  → lesson 13
38.9 → 38.10  nous → spoken on           → lesson 52
```

Build38 is pedagogically complete. **38.11 is NOT AUTHORIZED.** Public release is **v2.5.0 · Build 38**.

---

# 4. Build 39 — Learner Intelligence 3 — CLOSED / CERTIFIED

Goal achieved: Tyffany can select the most useful next Practice action when **reliable observable evidence exists**, and can explicitly abstain rather than inventing a recommendation.

Target family vocabulary remains:

```text
phrase-retrieval
concept-review
foundation-capsule
listening
scenario
transfer-construction
```

The milestone does **not** require all six families to fabricate availability. Three are currently supported by trustworthy product evidence; three remain deliberately unavailable.

Permanent rule: **absence of reliable evidence means unavailable / abstain.**

## 39.1 — learner action arbitration core — CLOSED / CERTIFIED

Owner:

```text
src/pedagogy/learner-action-arbitration-core.js
FrenchTranquilleLearnerIntelligenceV3Core
```

Properties:
- deterministic ranking;
- observed need + confidence + independent evidence required;
- recognition-failure-only candidates rejected;
- decorative activity totals ignored;
- explicit abstention is valid.

Accepted merge: `246338a9ef11eb430f59fc6ccf494688904cf883`.

## 39.2 — learner evidence adapter — CLOSED / CERTIFIED

Owner:

```text
src/pedagogy/learner-evidence-adapter.js
FrenchTranquilleActionEvidenceAdapter
```

Reliable supported families:

```text
phrase-retrieval ← Learning Memory due/fragile + non-recognition retrieval errors
listening        ← explicit listening-* Error events
scenario         ← scenario-miss / scenario-assisted observable Error events
```

Deliberately unavailable:

```text
concept-review         → no durable concept-understanding owner
foundation-capsule     → Foundations remains ephemeral / no reliable need owner
transfer-construction  → Transfer remains ephemeral / no durable evidence owner
```

Accepted merge: `9af287417d1fbb502837bea4aa80886cca2ffb2e`.

## 39.3 — learner action decision pipeline — CLOSED / CERTIFIED

Owner:

```text
src/pedagogy/learner-action-decision-pipeline.js
FrenchTranquilleLearnerActionDecisionPipeline
```

```text
caller snapshots
→ 39.2 adapter
→ 39.1 arbitration
→ reliable selected action OR explicit abstention
```

Accepted merge: `c809790453a40ae5e2da3a497e3b64b7a51e5d87`.

## 39.4 — read-only runtime snapshot collector — CLOSED / CERTIFIED

Owner/API:

```text
src/pedagogy/learner-action-runtime-snapshot.js
FrenchTranquilleLearnerActionRuntimeSnapshot

status()
collect()
decide()
```

```text
FrenchTranquilleMemory.summary()
+
FrenchTranquilleErrors.summary()
        ↓
narrow detached deeply-frozen snapshot
        ↓
39.3 pipeline
        ↓
reliable decision OR abstention
```

No decision at boot, direct collector storage access, durable write, Evidence cutover, or direct Listening/Scenario/Foundation/Transfer owner read.

Accepted merge: `f662d96d55e385f3d6baa946bde8f22fd1d25f0e`.

## 39.5 — advisory-only Practice recommendation — CLOSED / CERTIFIED

Accepted merge:

```text
3d3a6259b7b86ef7f7511832368c6d1eb549be44
```

New owner/API:

```text
src/pedagogy/learner-action-practice-advisory.js
FrenchTranquilleLearnerActionPracticeAdvisory
```

The field-approved Build27 Practice owner remains byte-identical and keeps all route/action ownership.

When the learner explicitly opens Practice:

```text
39.4 decide()
→ phrase-retrieval → Réviser
→ listening        → Écouter
→ scenario         → Dans la vraie vie
→ abstain/unsupported → no recommendation
```

39.5 only replaces the historical coarse `Conseillé maintenant` badge. It never auto-routes, auto-clicks, persists data, or falls back to `Parler` when LI3 abstains.

Final exact-head dedicated run `32182481929` is SUCCESS across VI/DEBUG FR × desktop/iPhone. Final matrix drained to exactly the five inherited standing failures, with Runtime metadata, Build27, Build31/32, Build39.1→39.4, Release v2.5, Build38.10, Premium/PWA/navigation, Build26.1 and Build26.4 green.

The initial 39.5 browser failure was a test-harness error only: the iframe used the HTML `hidden` attribute while asserting button geometry, forcing every rect to 0×0. The iframe was changed to remain layoutable off-screen; no product logic changed for that classification.

## Build39 milestone closeout verdict

No 39.6 learner-facing wiring is authorized.

Audit of actual owners found:

- Build27 Home already has a healthy hierarchy: primary current lesson, then Review/Listening quick actions;
- Practice is the canonical learner surface for choosing **what to work on now**, and 39.5 already owns LI3 advice there;
- adding LI3 advice to Home would duplicate Practice or require a new Scenario CTA and weaken the one-primary-action Home contract;
- `src/pedagogy/daily-coach.js` is legacy relative to the Build27 Home and directly reads learner/Memory storage; rewriting it for LI3 would move architecture backwards;
- the three unsupported families still lack trustworthy evidence owners, and creating durable evidence merely to make them appear available would violate the milestone’s reliability rule.

Therefore Build39 closes with **reliable support where evidence exists + explicit abstention where it does not**.

---

# 5. Build 40 — A1 Consolidation Audit — NEXT / AUDIT-ONLY MILESTONE

Build40 is the next authorized milestone. Start with **analysis and documentation**, not learner-facing runtime mutation.

It must answer from real curriculum/runtime evidence:

1. Which A1 communication capabilities are actually taught across 52/313?
2. Which capabilities have active construction/transfer proof versus phrase recognition/rehearsal only?
3. Where do Listening and Scenario provide meaningful contextual reuse?
4. Which Foundations concepts are taught/consolidated and which remain structurally weak or deferred (including F16)?
5. Which gaps are content gaps, evidence gaps, or UX/intelligence gaps?
6. Does the app need A1 consolidation, an internal A1+ phase, or is it defensible to open an A2 roadmap?
7. What must remain untouched to preserve the learner’s historical data and released Build38 semantics?

Build40 must not:

- invent CEFR certification;
- infer mastery from mere exposure, knownItems or speech-recognition success;
- create new learner data while auditing;
- change curriculum IDs/order;
- open A2 before the audit verdict is documented and reviewed.

Required audit sources include:

```text
52 lesson curriculum content / 313 items
Foundations registry + placements
Build38 Transfer cores + placements
Scenario 44/132
Listening datasets/contrast families
Learning Memory / Error Intelligence semantics
Learner Intelligence 3 supported/unavailable evidence families
current learner-facing Home/Practice/Progress surfaces
```

Expected output: one durable Build40 audit document with a capability matrix, evidence-strength classification, concrete gaps, and a single recommended post-audit direction.

**No A2 implementation is authorized before Build40 closes.**

---

# 6. CI baseline

Known persistent inherited failures:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Build26.4 is a classified runner/harness flake, not standing debt. Build37.4 and Premium V5.9C have documented historical Chrome/runner flake classifications after unchanged rerun success.

Any other failure is **NEW until classified**.

---

# 7. NEXT

```text
finish docs/governance closeout of Build39.5 + Build39 milestone
→ verify main + 0 open PRs
→ open Build40 as a separate audit-only slice
→ inspect real curriculum / Foundations / Transfer / Scenario / Listening / LI3 evidence
→ produce capability/evidence/gap matrix
→ select ONE post-audit direction
→ no A2 implementation before Build40 closes
```
