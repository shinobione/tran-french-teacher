# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-25

## Canonical checkpoint

- Repository: `shinobione/tran-french-teacher`.
- Verified accepted `main`: **`a4cdc146267a88ccef9c7cde928bc2f1010ef10b`**.
- That commit is the squash merge of PR **#251 — `A2-R1 · prove pure multi-fact reception contract`**.
- PR #251 accepted exact head: **`766fe4c0f9d92074b2c1bb034a0acbcfe3d0b7b2`**.
- #251 exact-head CI: dedicated A2-R1 contract SUCCESS; full matrix returned only the five inherited baseline failures.
- #251 Codex P2s were fixed/resolved before merge: authoritative dialogue/lesson binding + rejection of duplicate displayed option pairs.
- Active candidate: PR **#252 — `Docs · decide A2-R1 learner integration boundary`** on branch `docs/a2-r1-integration-decision-audit`.
- #252 started docs/read-only. Exact logs exposed one legitimate **successor-safety CI debt** in `.github/workflows/a2-r1-reception-contract.yml`; the branch now repairs that guard without changing learner runtime.
- GitHub live metadata owns #252's moving head/state and the current `main` tip. Never predict a future merge SHA from this file.

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

No runtime-bearing file is changed by #252.

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
A2-R1 integration decision ACTIVE CANDIDATE via #252
A2-R1 learner integration  NOT AUTHORIZED until #252 acceptance
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

Accepted guarantees:

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

Pure owner: `src/pedagogy/a2-reception-bridge-core.js`. It is not learner-runtime-loaded on accepted main.

## #252 candidate decision — docs/read-only

Canonical document: `docs/A2-R1-INTEGRATION-DECISION-AUDIT.md`.

Subject to acceptance, the decision is:

```text
integrate R1 into Listening later             YES
integration style                              additive / backward-compatible
historical doctor single-question source       PRESERVE
mutate listening-data-2.js for first pilot     NO by default
separate static bridge-data owner              YES
reuse accepted pure core                       YES
new global route                               NO
new lesson/item                                NO
new durable store                              NO
pilot sequence                                 3 questions / same full dialogue
transcript before sequence completion          NO
normal/slow replay                             YES
per-question Memory/Error reuse                YES, source listening-r1 only
one question writes only its own factId         REQUIRED
aggregate R1/A2 mastery                        FORBIDDEN
Evidence v2 direct write                       FORBIDDEN
P3b durability                                 FORBIDDEN
real iPhone/PWA field gate                     REQUIRED for field close
```

Recommended later pilot architecture, only after #252 acceptance:

```text
src/pedagogy/a2-reception-bridge-data.js       NEW static pilot mapping
src/pedagogy/a2-reception-bridge-runtime.js    thin adapter/controller if needed
src/pedagogy/a2-reception-bridge-core.js       reuse accepted pure owner
src/pedagogy/listening-engine.js               minimal integration hook only
loader + sw.js                                 only if required for offline loading
```

## #252 successor-safety CI repair

The accepted #251 workflow originally enforced its five-file candidate scope, Listening-source immutability and “no runtime integration ever” on every future PR. On #252 that produced a new failure at `Narrow candidate scope guard` solely because `docs/A2-R1-INTEGRATION-DECISION-AUDIT.md` existed.

The candidate repair keeps these checks **always active**:

```text
pure-core syntax/unit contract
pure-core forbidden API guard
permanent sanctuary guard
```

The original pure-proof-only restrictions now activate only when the pure core, its unit test or its proof document is modified. Therefore a future explicitly authorized successor may integrate the already accepted core without weakening the core itself.

This is CI maintenance, not a learner-runtime change.

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

A later R1 pilot may write deterministic Listening truth for **the one fact tested by that question only**. No bridge-level capability record is authorized.

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
1. Read live #252 head/state first.
2. Require successor-safe A2-R1 contract workflow SUCCESS on the exact final head.
3. Inspect full exact-head CI + reviews/threads/comments.
4. Accept only if no new non-baseline failure or unresolved blocker remains.
5. If accepted, merge #252 and verify actual main SHA.
6. Reconcile durable roadmap only if the accepted decision changes its execution gate.
7. Then authorize exactly one A2-R1 Learner Integration Pilot over doctor-appointment.
8. Do not start a second R1 dialogue, another A2 lane, Build43 or full A2 curriculum before the first pilot's CI + iPhone/PWA field gate.
```
