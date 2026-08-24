# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-25

## Canonical checkpoint

- Repository: `shinobione/tran-french-teacher`.
- Current verified `main`: **`a4cdc146267a88ccef9c7cde928bc2f1010ef10b`**.
- That commit is the accepted squash merge of PR **#251 — `A2-R1 · prove pure multi-fact reception contract`**.
- PR #251 accepted exact head: **`766fe4c0f9d92074b2c1bb034a0acbcfe3d0b7b2`**.
- Exact-head #251 CI returned **only the five inherited baseline failures**; the dedicated A2-R1 contract workflow was SUCCESS.
- Both valid Codex P2 review threads were fixed and resolved before merge: authoritative dialogue/lesson binding and duplicate displayed-option rejection.
- Active candidate branch: **`docs/a2-r1-integration-decision-audit`**.
- Candidate document: `docs/A2-R1-INTEGRATION-DECISION-AUDIT.md`.
- GitHub live metadata owns the branch/PR moving head and current `main` tip. Do not infer a future merge SHA from this file.

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

No runtime-bearing file changed in the active integration-decision audit candidate.

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
Build40                    CLOSED
Build41                    CLOSED / SUCCESSFUL NARROW CONSOLIDATION
Build42                    CLOSED / SUCCESSFUL FOUNDATIONS DEBT RESOLUTION
Build40 P3                 CLOSED / ACCEPTED
P3a / P3b / P3c            CLOSED / ACCEPTED boundaries preserved
P4                         CLOSED / ACCEPTED FRESH A1 READINESS GATE
A2 Entry Scope Audit       CLOSED / ACCEPTED
A2 Bridge Design Audit     CLOSED / ACCEPTED
A2-R1 pure contract proof  CLOSED / ACCEPTED via PR #251
A2-R1 integration decision ACTIVE CANDIDATE / DOCS-READ-ONLY
A2-R1 learner integration  NOT AUTHORIZED until audit acceptance
Build42.3                  NOT AUTHORIZED
productive F16 Transfer    NOT AUTHORIZED
Build43                    NOT AUTHORIZED
full A2 curriculum         NOT AUTHORIZED
```

## Accepted A2-R1 pure contract

Canonical pilot:

```text
dialogue                  doctor-appointment
prerequisite lesson       l45 — Santé & rendez-vous médical
facts                     jai-mal-ventre / depuis-hier / rendez-vous-medecin
```

Accepted pure contract guarantees:

```text
2–4 deterministic questions
stable unique question IDs
stable distinct factId per question
external authority binds dialogueId + prerequisiteLessonId + allowedFactIds
fact IDs must belong to authoritative source/prerequisite set
first proof evidenceItems == [factId]
duplicate normalized prompts rejected
duplicate displayed (vi, fr) option pairs rejected
one deterministic answer index per question
detached / deeply frozen normalized output
question result = success | miss only
```

The pure core is `src/pedagogy/a2-reception-bridge-core.js`. It is not loaded into the learner runtime on accepted main.

## Active A2-R1 Integration Decision Audit

The docs/read-only audit candidate concludes, subject to PR acceptance:

```text
integrate R1 into Listening later            YES
integration style                             additive / backward-compatible
historical listening-data-2 dialogue mutation NO
separate bridge data owner                    YES
reuse accepted pure core                      YES
new global route                              NO
new lesson/item                               NO
new durable store                             NO
existing single-question doctor exercise      PRESERVE
3-question pilot over same full dialogue      YES
full transcript before sequence complete      NO
normal/slow replay                            YES
per-question Memory/Error reuse               YES, source listening-r1 only
one question writes only its own factId        REQUIRED
aggregate R1/A2 mastery                       FORBIDDEN
Evidence v2 direct write                      FORBIDDEN
P3b durability                                FORBIDDEN
real iPhone/PWA field gate                    REQUIRED for field close
```

Recommended future runtime shape **only if this audit is accepted**:

```text
src/pedagogy/a2-reception-bridge-data.js       new static pilot mapping
src/pedagogy/a2-reception-bridge-runtime.js    thin adapter/controller if needed
src/pedagogy/a2-reception-bridge-core.js       reuse accepted pure owner
src/pedagogy/listening-engine.js               minimal integration hook
loader + sw.js                                 only if required for runtime/offline loading
```

The default decision is to leave `src/pedagogy/listening-data-2.js` unchanged.

## Evidence / storage boundary — LOCKED

```text
reliable durable action families: phrase-retrieval / listening / scenario
P3b source observation: ephemeral only
cross-session P3b durability: not justified
Evidence v2: derived shadow only
Evidence v2 direct source-event write: not authorized
Evidence v2 read cutover: not authorized
new eighth durable store: not justified
mastery / CEFR / score / confidence inference: not authorized
```

For a later R1 pilot, an individual deterministic Listening question may reuse current Memory/Error item truth for **that one fact only**. No bridge-level capability record is authorized.

## Permanent safety boundaries

- no fake pronunciation score;
- recognition failure is not mastery evidence;
- no learner-data reset, renumbering or reinterpretation;
- preserve current 52 lesson IDs / 313 item semantics;
- Recovery remains 7 durable stores / backup v3;
- Evidence v2 remains derived shadow;
- productive F16 Transfer remains not authorized;
- no A2 level badge/unlock/readiness claim;
- Build43 remains not authorized;
- `app.js`, `voice-ios.js`, `free-voice.js`, `assets/LOGO.png`, `assets/Favicon.png` and Build30 runtime bridge/contracts remain sanctuaries unless an explicit later slice justifies otherwise.

## CI baseline

Known persistent inherited failures:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Any other failure is NEW until classified from exact logs.

## Next control action

```text
1. Publish/review the docs-only A2-R1 Integration Decision Audit candidate.
2. Verify candidate scope is docs/checkpoint only.
3. Inspect exact-head CI/reviews/threads/comments.
4. Accept only if no new non-baseline failure or unresolved review blocker exists.
5. If accepted, merge and verify actual main SHA.
6. Only then authorize one narrow A2-R1 Learner Integration Pilot over doctor-appointment.
7. Do not start a second R1 dialogue, another A2 lane, Build43 or full A2 curriculum in that same pilot slice.
```
