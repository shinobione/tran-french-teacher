# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-24

## Canonical checkpoint

- Repository: `shinobione/tran-french-teacher`.
- Current verified `main` before this candidate: **`e1bfcea1e2e3a51c8a0efb97aa8791bcde31117d`**.
- `main` commit message: **`Docs · finalize accepted P4 checkpoint (#246)`**.
- GitHub verification on that commit: **verified=true / reason=valid**.
- Accepted P4 readiness audit: PR **#245 — `P4 · fresh A1 readiness audit`**, accepted exact head **`dbdd7df1290f32873e04b0ebb85abae62230d918`**, squash merge **`5f8fffd6b13ed30750446d2ffc02b5cb9d8b524f`**.
- Accepted P4 final alignment: PR **#246 — `Docs · finalize accepted P4 checkpoint`**, accepted exact head **`e626940e8baee4d2f64d7d3cf2ca845297327b75`**, squash merge **`e1bfcea1e2e3a51c8a0efb97aa8791bcde31117d`**.
- Published A2 Entry Scope Audit candidate: PR **#247 — `A2 · audit entry scope and bridge boundary`**, branch **`docs/a2-entry-scope-audit`**. Its moving head and live PR state are intentionally delegated to GitHub metadata.
- Canonical candidate audit: `docs/A2-ENTRY-SCOPE-AUDIT.md`.

Public/runtime facts remain:

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

This continuity is not proof of A1 completion, A2 readiness or CEFR attainment.

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
A2 Entry Scope Audit       ACTIVE CANDIDATE — PR #247
A2 Bridge Design Audit     NOT STARTED / candidate next only if #247 accepted
Build42.3                  NOT AUTHORIZED
productive F16 Transfer    NOT AUTHORIZED
Build43                    NOT AUTHORIZED
A2 learner-facing delivery NOT AUTHORIZED
```

## Accepted P3 evidence boundary

Canonical source documents:

```text
docs/BUILD-40-P3-EVIDENCE-OWNER-DESIGN-AUDIT.md
docs/BUILD-40-P3A-PEDAGOGICAL-OBSERVATION-CONTRACT.md
docs/BUILD-40-P3B-SOURCE-OBSERVATION-EPHEMERAL.md
docs/BUILD-40-P3C-DURABILITY-DECISION-AUDIT.md
```

Accepted result:

```text
semantic source-time event owner      JUSTIFIED
P3a normalization contract            ACCEPTED
P3b source observation                ACCEPTED / EPHEMERAL ONLY
raw P3b event truth                    TRUSTWORTHY AT EVENT LEVEL
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

P3a schema remains:

```text
french-tranquille-pedagogical-observation/v1
```

Authorized semantic pairs remain:

```text
foundation-check → foundation-concept → foundations
transfer-check   → transfer-family     → transfer
```

P3b runtime remains bounded to an in-memory FIFO of 64 normalized observations with:

```text
persistent=false
durableWrite=false
masteryClaim=false
```

Build39.2 reliable durable families remain:

```text
phrase-retrieval
listening
scenario
```

Still unavailable as trustworthy durable evidence:

```text
concept-review
foundation-capsule
transfer-construction
```

## Accepted Build41 / Build42 boundary

Current learner-facing deterministic Transfer families total **6**:

```text
subject substitution
affirmation → negation
present → futur proche
singular → plural nominal phrase
nous → spoken on
present action → recent past with venir de
```

Build41 audited the prioritized next-family set. Existing classifications remain binding unless new real source evidence changes their premise:

```text
questions              REJECT — TOO SEMANTIC / AMBIGUOUS
articles/quantities/F16 DEFER — NEEDS BETTER SOURCES
possessives            ALREADY COVERED / DUPLICATE
adjective agreement    DEFER — NEEDS BETTER SOURCES
short narration        REJECT — TOO SEMANTIC / AMBIGUOUS
opinion clauses        REJECT — TOO SEMANTIC / AMBIGUOUS
```

Build42 resolved F16 as a Foundation teach-core:

```text
à + le   → au
à + les  → aux
de + le  → du
de + les → des
```

with `à la / à l’ / de la / de l’` uncontracted and partitive distinction protected.

```text
F16 teaching debt       RESOLVED
F16 productive Transfer NOT AUTHORIZED
F16 mastery             NOT CLAIMED
```

## Accepted P4 verdict

Canonical document:

```text
docs/BUILD-40-P4-A1-READINESS-AUDIT.md
```

Accepted chain:

```text
PR #245 accepted head   dbdd7df1290f32873e04b0ebb85abae62230d918
PR #245 squash merge    5f8fffd6b13ed30750446d2ffc02b5cb9d8b524f
PR #245 scope           exactly 3 Markdown files
PR #245 review          no published review/thread/comment blockers
PR #245 exact-head CI   exactly five inherited baseline failures; all other workflows SUCCESS
PR #246 accepted head   e626940e8baee4d2f64d7d3cf2ca845297327b75
PR #246 squash merge    e1bfcea1e2e3a51c8a0efb97aa8791bcde31117d
PR #246 scope           exactly 2 Markdown files
PR #246 review          0 reviews / 0 threads / 0 comments
PR #246 exact-head CI   exactly five inherited baseline failures; all other workflows SUCCESS
```

Accepted P4 decision:

```text
A1 thematic breadth                    SUFFICIENT FOR CURRENT ROADMAP GATE
A1 Productive Consolidation            SUFFICIENT / RATIONAL STOP BOUNDARY
F16 explicit teaching debt             RESOLVED
Foundation/Transfer durable evidence   UNAVAILABLE
cross-session observation durability   NOT JUSTIFIED
A2 scope / entry audit                 AUTHORIZED NEXT
A2 learner-facing implementation       NOT AUTHORIZED
Build43                                NOT AUTHORIZED
A2 learner readiness/mastery           NOT CLAIMED
CEFR A1 certification                  NOT CLAIMED
```

## A2 Entry Scope Audit — ACTIVE CANDIDATE

Canonical candidate:

```text
docs/A2-ENTRY-SCOPE-AUDIT.md
PR #247 — docs/a2-entry-scope-audit
```

The candidate uses the Council of Europe A2 reference as a **scope boundary**, not as a certification engine.

### Candidate overlap finding

Late-A1 stage4 already covers large A2-adjacent thematic territory:

```text
L41 clarification / reformulation
L42 quantities / packaging
L43 comparison / choosing
L44 invitations / accept / refuse
L45 health / medical appointment
L46 medicine / pharmacy
L47 work / instructions
L48 housing problem / repair request
L49 transport disruption / alternatives
L50 narration ordering connectors
L51 simple opinion
L52 spoken on for shared plans
```

Therefore theme-only “A2” duplication is **NOT JUSTIFIED**.

### Candidate capability-gap finding

The smallest genuinely new A2 bridge is framed as task demand, not topic count:

```text
A2-P1  short-series oral production
A2-I1  stateful routine information exchange
A2-R1  multi-fact short reception
A2-W1  short functional writing
```

Current evidence behind that classification:

```text
Scenario 44/132                     strong context, mostly bounded prompt→answer turns
Listening 17/18                     contextual, mostly one bounded target per dialogue
Speaking Loop 52/52                 phrase rehearsal/self-listening, not short-series production
Dedicated short functional writing  no distinct current owner found
```

### Candidate decision

```text
late-A1 thematic A2 adjacency       STRONG / ALREADY COVERED
more theme-only A2 lessons          NOT JUSTIFIED
bounded A2 Bridge                   JUSTIFIED IN PRINCIPLE
full A2 curriculum                  NOT JUSTIFIED NOW
A2 Bridge Design Audit              candidate NEXT only if #247 accepted
A2 learner-facing implementation    NOT AUTHORIZED
Build43                             NOT AUTHORIZED
learner A2 readiness/mastery        NOT CLAIMED
CEFR certification                  NOT CLAIMED
```

No lesson numbers are assigned. No current item semantics change.

## Candidate next only after #247 acceptance

If PR #247 is controlled and accepted, authorize only a **docs/read-only A2 Bridge Design Audit**.

It must decide:

1. which of A2-P1 / A2-I1 / A2-R1 / A2-W1 is the first concrete slice;
2. exact existing lesson/item prerequisites;
3. whether any genuinely new language source is required;
4. the activity/data owner;
5. deterministic versus semantic evaluation boundary;
6. assistance/correction semantics;
7. honest evidence semantics;
8. route/learner gating;
9. whether any new lesson IDs are needed at all;
10. acceptance tests and sanctuary checks for any later implementation candidate.

It does **not** authorize:

```text
learner-facing A2
Build43
new lessons / renumbering
reinterpretation of the 313 existing items
learner A2 unlock
CEFR certification
P3b durability
Foundation/Transfer LI3 promotion
Evidence v2 cutover
new durable store
```

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

## Exact next control action

```text
Control PR #247 on its exact published head
→ verify main/base/head and exact docs-only scope
→ inspect CI/reviews/threads/comments
→ classify every non-baseline red from exact logs
→ rerun only proven Chrome/harness flakes unchanged
→ fix only legitimate review blockers inside A2 Entry Scope Audit boundaries
→ merge only if exact final head is clean apart from the five inherited failures
→ verify main after merge
→ create docs-only closeout/alignment only if canonical state is stale
→ do NOT begin the A2 Bridge Design Audit until a later explicit user command starts it
```
