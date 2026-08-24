# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-24

## Canonical checkpoint

- Repository: `shinobione/tran-french-teacher`.
- Last verified `main` before publication of the A2-R1 pure-proof candidate: **`6e78789f6f63b87a2b0c0d4acd62de4701b5083d`**.
- That commit is PR **#250 — `Docs · close accepted A2 bridge design audit`**, GitHub **verified=true / reason=valid**.
- PR #250 accepted exact head: **`23ce352b42a123adf276cc7ea379b5c309142542`**.
- Published implementation candidate: PR **#251 — `A2-R1 · prove pure multi-fact reception contract`**, branch **`a2/r1-multi-fact-contract-proof`**.
- **GitHub live metadata owns #251's moving head/open-or-merged state and the current `main` tip.** This file records the last verified pre-publication `main` rather than predicting a future merge SHA.
- Canonical accepted bridge design: `docs/A2-BRIDGE-DESIGN-AUDIT.md` plus `docs/A2-BRIDGE-DESIGN-AUDIT-P2-FACT-IDENTITY-AMENDMENT.md`.
- Candidate pure-proof document: `docs/A2-R1-MULTI-FACT-RECEPTION-CONTRACT-PROOF.md`.

## Accepted product state

```text
Public runtime metadata v2.5.0 · Build 38
Pedagogy baseline       v2.3.0 · Build 34
Curriculum              52 lessons / 313 items
Scenario                44 situations / 132 turns
Listening               17 contrast families / 18 contextual dialogues
Listening speed         0.88 normal / 0.65 slow
Speaking Loop           52/52 · max 2 moments / lesson
Recovery                7 durable stores / backup v3
Evidence v2             derived shadow only
Premium V5.10           CLOSED / physical field pass
```

## Historical learner continuity — LOCKED

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

This is not proof of A1 completion, A2 readiness, mastery or CEFR attainment.

## Current milestone state

```text
Build38                    CLOSED / RELEASED
Build39                    CLOSED / CERTIFIED
Build40                    CLOSED — A1 Productive Consolidation selected
Build41                    CLOSED / SUCCESSFUL NARROW CONSOLIDATION
Build42                    CLOSED / SUCCESSFUL FOUNDATIONS DEBT RESOLUTION
Build40 P3                 CLOSED / ACCEPTED
P3a                        CLOSED / ACCEPTED PURE CONTRACT PROOF
P3b                        CLOSED / ACCEPTED EPHEMERAL SOURCE-OBSERVATION PROOF
P3c                        CLOSED / ACCEPTED DURABILITY DECISION — NO DURABILITY YET
P4                         CLOSED / ACCEPTED FRESH A1 READINESS GATE
A2 Entry Scope Audit       CLOSED / ACCEPTED
A2 Entry closeout          CLOSED / ACCEPTED via PR #248
A2 Bridge Design Audit     CLOSED / ACCEPTED via PR #249
A2 Bridge Design closeout  CLOSED / ACCEPTED via PR #250
A2-R1 pure contract proof  PUBLISHED AS PR #251 / IMPLEMENTATION CANDIDATE
A2-R1 integration decision NEXT ONLY AFTER PURE-PROOF ACCEPTANCE / NOT STARTED / DOCS-READ-ONLY
Build42.3                  NOT AUTHORIZED
productive F16 Transfer    NOT AUTHORIZED
Build43                    NOT AUTHORIZED
A2 learner-facing delivery NOT AUTHORIZED
```

## Accepted evidence/storage boundary

```text
P3a normalization contract            ACCEPTED
P3b source observation                ACCEPTED / EPHEMERAL ONLY
raw P3b event truth                   TRUSTWORTHY AT EVENT LEVEL
cross-session durability              NOT JUSTIFIED
Learning Memory semantic reuse        REJECTED
Error Intelligence semantic reuse     REJECTED
Evidence v2 direct source-event write REJECTED under current shadow contract
Evidence v2 read cutover              NOT AUTHORIZED
new eighth durable store              NOT JUSTIFIED
aggregation / independence inference  NOT AUTHORIZED
mastery / CEFR / score / confidence   NOT AUTHORIZED
Build39.2 availability promotion      NOT AUTHORIZED
```

Build39 reliable durable action families remain `phrase-retrieval`, `listening`, `scenario`. `concept-review`, `foundation-capsule`, and `transfer-construction` remain unavailable as trustworthy durable evidence.

## Accepted A1 boundary

Learner-facing deterministic Transfer families remain exactly **6**:

```text
subject substitution
affirmation → negation
present → futur proche
singular → plural nominal phrase
nous → spoken on
present action → recent past with venir de
```

Build42 F16 remains Foundation-only:

```text
à + le   → au
à + les  → aux
de + le  → du
de + les → des
F16 teaching debt       RESOLVED
F16 productive Transfer NOT AUTHORIZED
F16 mastery             NOT CLAIMED
```

P4 accepted the A1 product as a rational roadmap stopping boundary; it did not certify learner A1 completion.

## Accepted A2 Entry / Bridge Design boundary

Accepted chains:

```text
PR #247 accepted head    898798f15cfeb2d046913c7110ee137c96b4c7eb
PR #247 squash merge     c1bded1a08113753c719adeed2cfa05e6aa165af
PR #248 accepted head    9f6dd71c06e13eeb6080c5f391f47ffe4abbf706
PR #248 squash merge     37d3250205759f7b4127a57024d2d4575b191dfe
PR #249 accepted head    52ba8e8b94e94493f143d8430aee83dff829efb1
PR #249 squash merge     448d5e5876aecda67e4b75f987f058751cc7ca2e
PR #250 accepted head    23ce352b42a123adf276cc7ea379b5c309142542
PR #250 squash merge     6e78789f6f63b87a2b0c0d4acd62de4701b5083d
```

Accepted A2 lanes:

```text
A2-P1 short-series oral production          DEFER
A2-I1 stateful routine information exchange DEFER
A2-R1 multi-fact short reception            SELECTED FIRST
A2-W1 short functional writing              DEFER
```

Canonical R1 pilot:

```text
dialogue                  doctor-appointment
prerequisite lesson       l45 — Santé & rendez-vous médical
accepted fact/source IDs  jai-mal-ventre / depuis-hier / rendez-vous-medecin
new vocabulary            NOT REQUIRED
new grammar               NOT REQUIRED
new curriculum item       NOT REQUIRED
new lesson ID             NOT REQUIRED
```

Accepted Codex P2 fact-identity rule:

```text
2–4 deterministic questions per activity
question.id stable + unique
question.factId mandatory + stable
factId unique across activity
factId must belong to accepted source/prerequisite authority
first proof evidenceItems MUST equal [factId]
duplicate fact targets MUST be rejected
duplicate normalized prompts MUST be rejected
one deterministic answer index per question
explicit source facts only
```

## PR #251 — A2-R1 Pure Multi-Fact Reception Contract Proof

Candidate base:

```text
6e78789f6f63b87a2b0c0d4acd62de4701b5083d
```

Candidate scope is intentionally narrow:

```text
src/pedagogy/a2-reception-bridge-core.js
  pure validation/normalization owner
  browser/CommonJS API FrenchTranquilleA2ReceptionBridgeCore
  no runtime loading/integration

tests/unit/a2-r1-reception-bridge-core.test.cjs
  canonical doctor fixture
  invalid-shape / duplicate-fact / immutability / evaluation tests

.github/workflows/a2-r1-reception-contract.yml
  dedicated deterministic contract + purity/scope/sanctuary guards

docs/A2-R1-MULTI-FACT-RECEPTION-CONTRACT-PROOF.md
  candidate proof record

PROJECT-STATE.md
  merge-stable handoff
```

Pure contract metadata:

```text
roadmapSlice  A2-R1-pure-contract-proof
version       1.0.0-contract
schema        french-tranquille-a2-r1-reception/v1
lane          A2-R1
```

The core accepts explicit contract authority separately from the activity. An activity cannot self-authorize arbitrary fact IDs by inserting them into its own prerequisite list.

Deterministic evaluator output is limited to:

```text
questionId
factId
choiceIndex
answerIndex
outcome = success | miss
```

It makes no mastery, CEFR, confidence, score, unseen-transfer or learner-readiness claim.

### Explicit candidate exclusions

```text
NO learner-facing UI
NO Listening engine integration
NO listening-data mutation
NO curriculum mutation
NO new lessons / renumbering
NO route/navigation change
NO localStorage / IndexedDB / network
NO Memory / Error Intelligence / Evidence writes
NO P3b durability
NO new durable store
NO Build43
NO learner A2 unlock/readiness/mastery
NO CEFR certification
```

## Permanent safety boundaries

- no fake pronunciation score;
- recognition failure is not mastery evidence;
- no learner-data reset, renumbering or reinterpretation;
- preserve current 52 lesson IDs / 313 item semantics until explicit later authorization;
- Recovery remains 7 durable stores / backup v3;
- Evidence v2 remains derived shadow until explicit future cutover;
- Foundations remain optional/ephemeral with no mastery claim;
- productive F16 Transfer remains NOT AUTHORIZED;
- A2 learner-facing implementation remains NOT AUTHORIZED;
- Build43 remains NOT AUTHORIZED;
- `app.js`, `voice-ios.js`, `free-voice.js`, `assets/LOGO.png`, `assets/Favicon.png` and Build30 runtime bridge/contracts remain sanctuaries unless explicitly justified.

## CI baseline

Known persistent inherited failures:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Any other failure is NEW until classified from exact logs.

## Merge-stable next control action

```text
Read live GitHub state for PR #251 and main first.

IF #251 is OPEN:
→ verify exact final head/base and candidate scope
→ require dedicated `A2-R1 Pure multi-fact reception contract` SUCCESS
→ inspect full exact-head CI/reviews/threads/comments
→ classify every non-baseline red from exact logs
→ rerun only proven Chrome/harness flakes unchanged
→ fix legitimate contract/review blockers on the same candidate branch
→ merge only if exact final head is clean apart from the five inherited failures
→ verify actual main SHA/signature after merge
→ STOP before any learner-facing R1 integration

IF #251 is MERGED:
→ verify actual main SHA/signature from live GitHub
→ pure A2-R1 contract proof = ACCEPTED
→ A2-R1 Integration Decision Audit = NEXT / NOT STARTED / DOCS-READ-ONLY
→ do not implement learner-facing R1 without that later explicit decision
```
