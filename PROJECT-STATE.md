# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-24

## Canonical checkpoint

- Repository: `shinobione/tran-french-teacher`.
- Current verified `main`: **`37d3250205759f7b4127a57024d2d4575b191dfe`**.
- That commit is PR **#248 — `Docs · close accepted A2 entry scope audit`**, GitHub **verified=true / reason=valid**.
- PR #248 accepted exact head: **`9f6dd71c06e13eeb6080c5f391f47ffe4abbf706`**.
- A2 Entry Scope Audit and its closeout are **CLOSED / ACCEPTED**.
- Published A2 Bridge Design Audit candidate: PR **#249 — `A2 · design first bridge lane as R1 reception`**, branch **`audit/a2-bridge-r1-design`**.
- **GitHub live metadata owns #249's current head, open/merged state and the current `main` tip after publication.** This file intentionally avoids embedding a self-referential candidate head.
- Canonical accepted scope audit: `docs/A2-ENTRY-SCOPE-AUDIT.md`.
- Canonical bridge-design candidate: `docs/A2-BRIDGE-DESIGN-AUDIT.md`.

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

This continuity is not proof of A1 completion, A2 readiness, mastery or CEFR attainment.

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
A2 Bridge Design Audit     CANDIDATE PR #249 / A2-R1 SELECTED / DOCS-READ-ONLY
A2-R1 pure contract proof  NEXT ONLY IF #249 ACCEPTED / NOT STARTED
Build42.3                  NOT AUTHORIZED
productive F16 Transfer    NOT AUTHORIZED
Build43                    NOT AUTHORIZED
A2 learner-facing delivery NOT AUTHORIZED
```

## Accepted P3 evidence boundary

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

Build39.2 reliable durable families remain `phrase-retrieval`, `listening`, `scenario`. `concept-review`, `foundation-capsule`, and `transfer-construction` remain unavailable as trustworthy durable evidence.

## Accepted A1 consolidation boundary

Learner-facing deterministic Transfer families total **6**:

```text
subject substitution
affirmation → negation
present → futur proche
singular → plural nominal phrase
nous → spoken on
present action → recent past with venir de
```

Build41 classifications remain binding absent new source evidence:

```text
questions              REJECT — TOO SEMANTIC / AMBIGUOUS
articles/quantities/F16 DEFER — NEEDS BETTER SOURCES
possessives            ALREADY COVERED / DUPLICATE
adjective agreement    DEFER — NEEDS BETTER SOURCES
short narration        REJECT — TOO SEMANTIC / AMBIGUOUS
opinion clauses        REJECT — TOO SEMANTIC / AMBIGUOUS
```

Build42 F16 remains a Foundation teach-core: `à + le → au`, `à + les → aux`, `de + le → du`, `de + les → des`, with uncontracted `à la / à l’ / de la / de l’` and protected partitive distinction.

```text
F16 teaching debt       RESOLVED
F16 productive Transfer NOT AUTHORIZED
F16 mastery             NOT CLAIMED
```

P4 accepted the current A1 product as a rational roadmap stopping boundary. It did **not** certify learner A1 completion.

## A2 Entry Scope Audit — CLOSED / ACCEPTED

Accepted chain:

```text
PR #247 base             e1bfcea1e2e3a51c8a0efb97aa8791bcde31117d
PR #247 accepted head    898798f15cfeb2d046913c7110ee137c96b4c7eb
PR #247 squash merge     c1bded1a08113753c719adeed2cfa05e6aa165af
PR #247 scope            exactly 3 Markdown files
PR #247 review           0 reviews / 0 threads / 0 comments
PR #247 exact-head CI    exactly five inherited baseline failures; all other workflows SUCCESS
PR #248 accepted head    9f6dd71c06e13eeb6080c5f391f47ffe4abbf706
PR #248 squash merge     37d3250205759f7b4127a57024d2d4575b191dfe
PR #248 scope            exactly 2 Markdown files
```

Accepted result:

```text
late-A1 thematic A2 adjacency       STRONG / ALREADY COVERED
more theme-only A2 lessons          NOT JUSTIFIED
A2-P1 short-series oral production  GENUINELY NEW CANDIDATE
A2-I1 stateful routine exchange     PARTIAL TODAY / NEW FORM JUSTIFIED
A2-R1 multi-fact short reception    PARTIAL TODAY / NEW FORM JUSTIFIED
A2-W1 short functional writing      GENUINELY NEW MODALITY
bounded A2 Bridge                   JUSTIFIED IN PRINCIPLE
full A2 curriculum                  NOT JUSTIFIED NOW
A2 learner-facing implementation    NOT AUTHORIZED
Build43                             NOT AUTHORIZED
learner A2 readiness/mastery        NOT CLAIMED
CEFR certification                  NOT CLAIMED
```

No new lesson number or item is authorized by this audit.

## A2 Bridge Design Audit — CANDIDATE PR #249

Candidate decision from repository evidence:

```text
first A2 Bridge lane            A2-R1 — multi-fact short reception
pilot source                    existing Listening dialogue `doctor-appointment`
pilot prerequisite lesson       L45 — Santé & rendez-vous médical
pilot prerequisite item IDs     jai-mal-ventre / depuis-hier / rendez-vous-medecin
new vocabulary                  NOT REQUIRED
new grammar                     NOT REQUIRED
new curriculum item             NOT REQUIRED
new lesson ID                   NOT REQUIRED
learner-facing integration      NOT AUTHORIZED
Build43                         NOT AUTHORIZED
```

Why R1 is first:

- current Listening already owns short contextual dialogues, deterministic multiple-choice evaluation, normal/slow replay and transcript reveal;
- several dialogues already contain multiple explicit facts while the current task shape asks only one question;
- `doctor-appointment` contains three clean explicit facts whose sources are exactly three accepted L45 items;
- R1 therefore raises the information-retention demand without inventing a new theme, semantic AI grading, new storage or new learner-route semantics.

Deferred but still valid lanes:

```text
A2-P1  DEFER — needs an honest short-series completion/evidence policy
A2-I1  DEFER — needs carried-fact state contract and transition semantics
A2-W1  DEFER — needs a dedicated writing owner and non-fake free-text evaluation policy
```

Candidate design proposes an additive optional `bridgeQuestions` schema and a later **pure contract proof** only. The current single-question Listening fields remain untouched until a separately authorized integration slice.

## NEXT IF #249 IS ACCEPTED — A2-R1 Pure Multi-Fact Reception Contract Proof

Only after #249 is accepted may the next slice create a pure deterministic R1 contract proof.

Expected narrow scope:

```text
new pure core module
new deterministic unit tests
one dedicated CI workflow if needed
candidate/checkpoint documentation
```

Expected exclusions:

```text
no learner-facing UI
no listening-engine integration
no listening-data mutation
no curriculum mutation
no lesson additions
no route/navigation changes
no localStorage / IndexedDB / network
no Memory / Error Intelligence / Evidence writes
no Build43
```

The proof must validate bounded 2–4 question plans, stable unique question IDs, deterministic answer indexes, accepted evidence/prerequisite references, detached/frozen output and absence of runtime side effects. It must not claim A2 mastery, readiness or CEFR attainment.

## Permanent safety boundaries

- no fake pronunciation score;
- recognition failure is not mastery evidence;
- no learner-data reset, renumbering or reinterpretation;
- preserve current 52 lesson IDs / 313 item semantics until explicit later authorization;
- Recovery remains 7 durable stores / backup v3;
- Evidence v2 remains derived shadow until explicit future cutover;
- no durable store/schema merely to manufacture intelligence;
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
Read live GitHub state for PR #249 and main first.

IF #249 is still OPEN:
→ verify base/head and exact docs-only scope
→ inspect exact-head CI/reviews/threads/comments
→ classify every non-baseline red from exact logs
→ rerun only proven Chrome/harness flakes unchanged
→ fix only legitimate documentation blockers inside audit scope
→ merge only if exact final head is clean apart from the five inherited failures
→ verify the actual main SHA/signature after merge
→ STOP; do not start the A2-R1 pure contract proof in that same control session

IF #249 is already MERGED:
→ verify the actual main SHA/signature from GitHub live state
→ treat A2 Bridge Design Audit as accepted
→ A2-R1 Pure Multi-Fact Reception Contract Proof is NEXT / NOT STARTED
→ start that proof only on an explicit new user command
```
