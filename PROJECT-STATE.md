# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-25

## Canonical checkpoint

- Repository: `shinobione/tran-french-teacher`.
- Verified accepted `main`: **`acae4dac142404dda394501e952e44e6dc846129`**.
- That commit is the squash merge of PR **#255 — `CI · make historical Listening ownership successor-safe`**.
- PR #255 is **CLOSED / MERGED** and removed only obsolete permanent Listening-owner locks from certified predecessor workflows while preserving their functional tribunals.
- Active learner-runtime candidate: PR **#254 — `A2-R1 · integrate doctor multi-fact Listening pilot`**.
- #254 was rebased exactly onto accepted main `acae4dac142404dda394501e952e44e6dc846129`; the rebase candidate commit was **`73d56bafc148f705e472e6c01c8ffa9f81f46a5e`**.
- On that exact rebased candidate, dedicated workflow **`A2-R1 Learner Listening pilot`** run **`32829801561`** passed syntax, deterministic contract, sanctuary/scope, and the real 390×844 Chrome learner-flow tribunal.
- The Chrome tribunal uses a Recovery-valid schema-v2 clean learner seed; the earlier false failures were caused by a test harness writing an invalid `{ knownItems }`-only learner object that Recovery correctly rejected.
- #254 remains **OPEN / NOT ACCEPTED** until the final exact-head full matrix and review arbitration are complete.
- This checkpoint commit advances the PR head beyond `73d56baf...`; GitHub live metadata owns the moving exact head after this reconciliation.

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

PR #255 changed CI/governance only. PR #254 is the only active learner-runtime candidate.

## Historical learner continuity — LOCKED

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

This is not proof of A1 completion, A2 readiness, mastery or CEFR attainment.

## Milestone state

```text
Build38                    CLOSED / RELEASED
Build39                    CLOSED / CERTIFIED
Build40                    CLOSED
Build41                    CLOSED / SUCCESSFUL NARROW CONSOLIDATION
Build42                    CLOSED / SUCCESSFUL FOUNDATIONS DEBT RESOLUTION
P3a / P3b / P3c            CLOSED / ACCEPTED boundaries preserved
P4                         CLOSED / ACCEPTED FRESH A1 READINESS GATE
A2 Entry Scope Audit       CLOSED / ACCEPTED
A2 Bridge Design Audit     CLOSED / ACCEPTED
A2-R1 pure contract proof  CLOSED / ACCEPTED via #251
A2-R1 integration decision CLOSED / ACCEPTED via #252/#253 closeout
A2-R1 CI remediation       CLOSED / MERGED via #255
A2-R1 learner pilot        ACTIVE FINAL CANDIDATE via #254 / NOT MERGED
Build42.3                  NOT AUTHORIZED
productive F16 Transfer    NOT AUTHORIZED
Build43                    NOT AUTHORIZED
full A2 curriculum         NOT AUTHORIZED
```

## Accepted A2-R1 chain

```text
PR #251 accepted head  766fe4c0f9d92074b2c1bb034a0acbcfe3d0b7b2
PR #251 squash merge   a4cdc146267a88ccef9c7cde928bc2f1010ef10b
PR #252 accepted head  9efa564fac991091d7422b66d0864215fe43dd3b
PR #252 squash merge   bb4cd1317936594820a9458ddbfe0e367a8386ac
PR #253 squash merge   b3cf1f3f3fbb6891ffd6f8b8be1f7957f356d903
PR #255 squash merge   acae4dac142404dda394501e952e44e6dc846129
```

Canonical first pilot:

```text
dialogue                  doctor-appointment
prerequisite lesson       l45 — Santé & rendez-vous médical
facts                     jai-mal-ventre / depuis-hier / rendez-vous-medecin
questions                 exactly 3
```

Accepted pure contract guarantees:

```text
2–4 deterministic questions
stable unique question IDs
stable distinct factId per question
external authority binds dialogueId + prerequisiteLessonId + allowedFactIds
first proof evidenceItems == [factId]
duplicate fact targets / normalized prompts rejected
duplicate displayed (vi, fr) option pairs rejected
one deterministic answer index per question
detached / deeply frozen normalized output
question result = success | miss only
```

Pure owner: `src/pedagogy/a2-reception-bridge-core.js`.

## Active learner pilot candidate — PR #254

The authorized implementation candidate remains intentionally narrow:

```text
existing Listening surface only
same doctor-appointment dialogue
same l45 prerequisite
same three accepted facts
exactly three deterministic questions
separate trusted authority + activity records
historical doctor single-question source preserved
no new route / lesson / item / durable store
no schema migration
normal + slow full-dialogue playback preserved
transcript hidden until q3 is answered
per-question Memory/Error only, source listening-r1
no aggregate R1/A2 mastery/readiness/CEFR claim
no direct Evidence v2 write
```

Verified dedicated proof on rebased candidate `73d56bafc148f705e472e6c01c8ffa9f81f46a5e`:

```text
syntax + deterministic contract          PASS
pilot sanctuary/scope guard              PASS
A2-R1 pure multi-fact contract           PASS
Chrome 390×844 bounded learner flow      PASS
entry + R1 activation                    PASS
open/close no Listening-state mutation   PASS
q1/q2 transcript hidden                  PASS
q3 transcript reveal                     PASS
3/3 results recorded                     PASS
return to Listening                      PASS
```

The previous browser-smoke failures are classified as **test harness defects**, not product regressions:

1. `?a2R1Smoke=1` was incorrectly classified by Build31 as a historical smoke and bypassed Build32.
2. `?a2R1Smoke=1&b32Audit=1` triggered an unrelated Build32 audit and was removed.
3. The dedicated iframe tribunal initially seeded only `knownItems` into an otherwise empty learner object; Recovery correctly blocked that invalid schema.
4. The final tribunal seeds a minimal valid schema-v2 learner object and exercises the normal application path.

No Recovery guard was weakened or bypassed.

## CI successor-safety remediation — PR #255 — MERGED

PR #254 exposed certified predecessor workflows that mixed two concerns:

1. replaying their historical functional contract; and
2. permanently forbidding any future change to `src/pedagogy/listening-engine.js`.

PR #255 removed only the obsolete permanent Listening-owner prohibition from:

```text
Build35 closeout
Build36.1 Recovery v3
Build37.1 through Build37.8
Build38.2 / 38.5 / 38.7 / 38.8
```

All historical syntax, unit, browser and predecessor-behavior tribunals remain active. All other protected owners remain protected.

Accepted #255 exact-head CI had only the five inherited baseline failures. One Build26.1 Chrome failure was rerun unchanged and passed, classifying it as a runner/browser flake rather than a product regression.

## Accepted integration decision — LOCKED

```text
integration target                              existing Listening surface
integration style                               additive / backward-compatible
historical doctor single-question source        PRESERVE
mutate listening-data-2.js for first pilot      NO by default
trusted authority                               SEPARATE from activity definition
activity source                                 COMPLETE / independently validated
new global route                                NO
new lesson/item                                 NO
new durable store                               NO
schema migration                                NO
pilot sequence                                  3 questions / same full dialogue
transcript before sequence completion           NO
normal/slow replay                              YES
per-question Memory/Error reuse                 YES, source listening-r1 only
one question writes only its own factId         REQUIRED
aggregate R1/A2 mastery                         FORBIDDEN
Evidence v2 direct write                        FORBIDDEN
P3b durability                                  FORBIDDEN
real iPhone/PWA field gate                      REQUIRED for field close
```

Bridge data must preserve the anti-self-authorization split:

```text
R1_AUTHORITIES[id]
→ dialogueId / prerequisiteLessonId / allowedFactIds

R1_ACTIVITIES[id]
→ id / lane / complete source / questions

normalizeActivity(R1_ACTIVITIES[id], R1_AUTHORITIES[id])
```

## Pre-answer persistence boundary — LOCKED

Existing Listening playback telemetry may persist before an answer:

```text
totals.plays
totals.replays
totals.slowPlays
updatedAt
```

Required truth:

```text
enter + exit R1 without playback/answer
→ no R1-attributable durable mutation

play/replay/slow + exit before answer
→ only existing Listening playback telemetry may change
→ Memory unchanged
→ Error Intelligence unchanged
→ Evidence v2 unchanged
→ learner/curriculum stores unchanged
→ no new R1 store or sequence record
```

Pedagogical success/miss/attempt truth begins only after an answer selection.

## Field gate after pilot merge/deploy

If and only if #254 passes its final exact-head CI/review, merges and deploys, the real installed iPhone/PWA must execute:

```text
Listening
→ launch R1 pilot
→ normal play
→ answer q1
→ slow replay
→ answer q2
→ answer q3
→ transcript reveal
→ return to Listening
```

Pass means no blank screen, stuck overlay, duplicate audio/control, horizontal overflow or learner-data loss.

This gate certifies runtime integration only — not A2 level.

## Expansion boundary

Until the first pilot passes final exact-head CI, merge/deployment and real iPhone field validation:

```text
second R1 dialogue  NOT AUTHORIZED
A2-P1               DEFER
A2-I1               DEFER
A2-W1               DEFER
Build43             NOT AUTHORIZED
full A2 curriculum  NOT AUTHORIZED
```

## Evidence/storage boundary — LOCKED

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
- `app.js`, `voice-ios.js`, `free-voice.js`, `assets/LOGO.png`, `assets/Favicon.png` and Build30 runtime bridge/contracts remain sanctuaries unless explicitly justified.

## CI baseline

Known inherited failures:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Any other failure is NEW until exact logs classify it.

## Next control action

```text
1. Treat this checkpoint commit as the final #254 candidate unless a real defect is found.
2. Require the dedicated A2-R1 workflow to remain SUCCESS on the new exact head.
3. Require the full exact-head matrix to contain only the five inherited baseline failures; classify any additional red from exact logs.
4. Re-check reviews/threads and resolve any valid new blocker.
5. Squash-merge #254 only from its verified exact head.
6. Verify actual new main SHA and GitHub Pages deployment on that same runtime-bearing merge.
7. Stop at the real installed iPhone/PWA field sequence.
8. Do not start a second R1 dialogue, another A2 lane, Build43 or full A2 curriculum before the physical field gate passes.
```