# A2-R1 Integration Decision Audit — French Trân’quille

Status: **AUDIT CANDIDATE / DOCS + SUCCESSOR-SAFE CI ONLY**

Date: 2026-08-25

Audited base:

```text
a4cdc146267a88ccef9c7cde928bc2f1010ef10b
```

That base is the accepted squash merge of PR #251, **A2-R1 Pure Multi-Fact Reception Contract Proof**.

Public runtime remains **v2.5.0 · Build 38**. Pedagogy baseline remains **v2.3.0 · Build 34**. Curriculum remains **52 lessons / 313 items**.

This audit changes no learner runtime, route, curriculum, storage schema, Recovery, Evidence, voice, Premium or PWA behavior.

---

## 1. Mission

The accepted pure A2-R1 contract proves that French Trân’quille can validate a bounded deterministic 2–4 question reception activity over several distinct explicit facts from one source.

This audit decides whether that proof should become a later learner-facing Listening capability and, if yes, defines the smallest safe integration contract before runtime code is authorized.

Decision criterion:

> Can the new multi-fact reception demand be added as a backward-compatible Listening activity, with honest item-level outcomes, no new durable owner and no claim that the learner has reached A2?

---

## 2. Sources inspected

Canonical decisions:

```text
AGENTS.md
PROJECT-STATE.md
MASTER-ROADMAP.md
docs/A2-BRIDGE-DESIGN-AUDIT.md
docs/A2-BRIDGE-DESIGN-AUDIT-P2-FACT-IDENTITY-AMENDMENT.md
docs/A2-R1-MULTI-FACT-RECEPTION-CONTRACT-PROOF.md
```

Current runtime owners:

```text
src/pedagogy/listening-data-2.js
src/pedagogy/listening-engine.js
src/pedagogy/learner-evidence-adapter.js
src/pedagogy/a2-reception-bridge-core.js
src/core/build32-loader.js
```

Canonical pilot:

```text
dialogue                  doctor-appointment
prerequisite lesson       l45 — Santé & rendez-vous médical
facts                     jai-mal-ventre / depuis-hier / rendez-vous-medecin
```

---

## 3. Current Listening reality

`doctor-appointment` already owns the exact source facts required by R1:

```text
A: Qu’est-ce qui vous arrive ?
B: J'ai mal au ventre.
A: Depuis quand ?
B: Depuis hier. Je voudrais un rendez-vous avec un médecin.
```

Its current learner-facing contract is deliberately simple:

```text
one dialogue
→ one deterministic question
→ one answer
→ feedback
→ transcript reveal
→ next exercise
```

The current question tests only `depuis-hier`.

Existing Listening also persists playback telemetry immediately when the learner listens:

```text
plays
replays
slowPlays
```

That telemetry is historical Listening behavior and must be distinguished from pedagogical Memory/Error/Evidence truth.

The historical dialogue and single-question flow must stay backward-compatible.

---

## 4. Integration decision

**YES — A2-R1 should be integrated into Listening later as one narrow pilot.**

But integration must be additive, not a rewrite of the current dialogue schema or state machine.

```text
existing dialogue source                  KEEP UNCHANGED
existing single-question Listening        KEEP UNCHANGED
accepted pure A2-R1 core                  REUSE
trusted R1 authority                      SEPARATE OWNER/RECORD
R1 activity/questions                     SEPARATE OWNER/RECORD
learner-facing surface                    REUSE LISTENING OVERLAY
new route/tab                             NO
new lesson/item                           NO
new durable store                        NO
Build43                                  NOT AUTHORIZED
```

The purpose is to add a harder task shape over already accepted language, not to create a parallel A2 app.

---

## 5. Data ownership — authority MUST remain external

The first integration must **not** put trusted authority inside the activity record itself.

The accepted pure core contract is:

```text
normalizeActivity(activity, authority)
```

Therefore the later static bridge owner must expose **two independently addressed records**.

### Trusted authority record

```text
R1_AUTHORITIES = {
  'doctor-appointment-multi-fact': {
    dialogueId: 'doctor-appointment',
    prerequisiteLessonId: 'l45',
    allowedFactIds: [
      'jai-mal-ventre',
      'depuis-hier',
      'rendez-vous-medecin'
    ]
  }
}
```

### Candidate activity record

```text
R1_ACTIVITIES = {
  'doctor-appointment-multi-fact': {
    id: 'doctor-appointment-multi-fact',
    lane: 'A2-R1',
    source: {
      kind: 'listening-dialogue',
      dialogueId: 'doctor-appointment',
      prerequisiteLessonId: 'l45',
      prerequisiteItemIds: [
        'jai-mal-ventre',
        'depuis-hier',
        'rendez-vous-medecin'
      ]
    },
    questions: [/* exactly 3 canonical questions */]
  }
}
```

Runtime validation must obtain them separately:

```text
authority = R1_AUTHORITIES[id]
activity  = R1_ACTIVITIES[id]
plan      = FrenchTranquilleA2ReceptionBridgeCore.normalizeActivity(activity, authority)
```

The activity must never derive or manufacture its own trusted authority.

Why this separation is mandatory:

1. preserves the #251 anti-self-authorization guarantee;
2. prevents valid fact IDs from being rebound to an unrelated dialogue/lesson;
3. lets tests forge the activity independently and prove rejection;
4. keeps trust ownership explicit and reviewable.

The recommended owner may still be one physical file such as `src/pedagogy/a2-reception-bridge-data.js`, but exported authority and activity records must remain logically separate.

---

## 6. Existing dialogue ownership

Do **not** add R1 question arrays directly into `src/pedagogy/listening-data-2.js` for the first pilot.

The historical dialogue remains audio/text source-of-truth. The separate R1 data owner only describes the extra multi-fact task.

Benefits:

- zero reinterpretation of historical dialogue fields;
- current single-question exercise remains testable unchanged;
- pure core validates the R1 activity before rendering;
- rollback removes bridge wiring/data rather than migrating old records;
- future R1 pilots, if ever authorized, do not prematurely enlarge the base Listening schema.

---

## 7. Availability semantics

R1 availability must reuse current Listening prerequisites and add **no A2 readiness claim**.

First pilot is available only when:

```text
existing doctor-appointment dialogue is available
AND authoritative dialogueId == doctor-appointment
AND authoritative prerequisiteLessonId == l45
AND authoritative fact IDs still exist as valid curriculum items
AND the pure core accepts activity + external authority
```

Learner wording should be capability-neutral, e.g.:

```text
VI: Nghe và nhớ nhiều thông tin
FR DEBUG: Écouter et retenir plusieurs informations
```

Forbidden wording:

```text
A2 débloqué
Niveau A2
Tu es prête pour A2
Compétence A2 maîtrisée
```

Availability means only that this bounded activity can honestly be attempted.

---

## 8. Sequence interaction contract

First learner-facing pilot = **one bounded sequence of exactly 3 questions** over the same full short dialogue.

Recommended flow:

```text
open R1 activity
→ play/replay full dialogue
→ question 1
→ local success/miss feedback
→ question 2
→ local success/miss feedback
→ question 3
→ local success/miss feedback
→ full transcript reveal
→ bounded descriptive summary
→ return to Listening
```

The full transcript stays hidden until all three questions are answered.

Reason: revealing it after question 1 would expose facts required by questions 2 and 3 and destroy the multi-fact retention demand.

---

## 9. Question/correction semantics

For each question:

```text
correct first selection → success
wrong first selection   → miss
```

After a miss:

- identify the correct option if helpful;
- keep the first outcome as `miss`;
- allow moving to the next question;
- allow replay before the next question;
- never rewrite the first miss into success because correction was shown.

Descriptive summary may say:

```text
3 informations écoutées
2 comprises du premier coup
1 à revoir
```

It must not say:

```text
score A2 67%
mastery 2/3
niveau validé
```

---

## 10. Replay / slow playback semantics

Reuse existing Listening audio behavior and accepted product boundaries:

```text
normal 0.88
slow   accepted effective current slow behavior 0.65
```

Replay may be used before question 1, between questions, after a miss and before final transcript reveal.

Replay/slow use is **support telemetry**, not failure evidence.

The same full dialogue is replayed. The first pilot must not play isolated answer-bearing lines because that would reduce the retention demand.

---

## 11. Durable-data truth and abandonment semantics

A new evidence owner or durable store is **NOT required**.

### Pedagogical truth

Each answered R1 question targets exactly one authoritative existing curriculum fact.

Later semantics may reuse current Memory/Error item truth:

```text
question factId → Memory.recordPractice(factId, ok, 'listening-r1')
question factId → Errors.recordAttempt(... source: 'listening-r1')
```

One question writes only its own `factId`.

Forbidden:

```text
write all 3 facts for every question
bridge-level mastery record
A2 reception mastery
Evidence v2 direct write
P3b durability
new store/schema
```

### Opening/abandoning before answers

The correct guarantee is **not** “all durable bytes are identical after any playback”. Existing Listening already persists playback telemetry immediately.

Required guarantee:

```text
open then close without playback/answer
→ no durable mutation attributable to R1

play/replay/slow then close before answer
→ ONLY pre-existing Listening playback telemetry may change
→ Memory unchanged
→ Error Intelligence unchanged
→ Evidence v2 unchanged
→ P3b durability unchanged
→ learner/curriculum stores unchanged
→ no new R1 store or sequence record
```

Allowed Listening telemetry mutations before any answer are limited to the existing fields already owned by Listening playback behavior:

```text
totals.plays
totals.replays
totals.slowPlays
updatedAt
```

No pedagogical success/miss/attempt truth is written until an answer is actually selected.

This distinction must be tested explicitly.

---

## 12. Listening history/session state

The first R1 integration does not justify a schema migration.

Preferred first-pilot rule:

```text
no Listening schema migration
no persistent R1 sequence object
question cursor/UI state ephemeral
existing playback telemetry preserved
item-level Memory/Error truth only on answered questions
```

If later implementation chooses to record coarse sequence completion in existing Listening history, that would require separate review and must remain backward-compatible. It is not required for the first pilot.

---

## 13. Backward compatibility

Later implementation must preserve:

```text
meaning exercises unchanged
contrast exercises unchanged
18 existing dialogue records unchanged
single-question doctor-appointment unchanged
normal/slow playback unchanged
current close/settings/navigation unchanged
current Listening schema readable without migration
```

R1 is an optional additive activity over `doctor-appointment`, not a replacement.

---

## 14. UI placement

Do not create a new global A2 route or bottom-navigation destination.

First pilot lives inside existing Listening as a compact optional activity affordance when prerequisites are available.

Conceptually:

```text
Listening / Luyện nghe
→ doctor-appointment context
→ optional “Nghe 3 thông tin” / “3 informations” activity
```

Do not expose `A2-R1`, `bridge`, `factId` or `evidence` to Trân.

Existing Listening CSS/layout should be reused rather than creating a parallel screen system.

---

## 15. Mobile / iPhone contract

Candidate must be tested at least on:

```text
390 × 844
VI learner mode
DEBUG FR
```

Requirements:

- targets >=44 px;
- no horizontal overflow;
- progress visible: `1/3`, `2/3`, `3/3`;
- one primary action at a time;
- transcript hidden until sequence completion;
- normal and slow playback reachable without layout jump;
- close/back reliably returns to Listening;
- Settings remains usable;
- no route/page crossfade exposing competing facades;
- `prefers-reduced-motion` respected;
- accessible labels distinguish playback, choices, next question and close.

---

## 16. Later runtime architecture

A later candidate should remain narrow and reuse existing owners.

Expected files, subject to exact implementation review:

```text
src/pedagogy/a2-reception-bridge-data.js       NEW / separate authority + activity exports
src/pedagogy/a2-reception-bridge-runtime.js    NEW / thin controller if needed
src/pedagogy/a2-reception-bridge-core.js       REUSE / do not weaken
src/pedagogy/listening-engine.js               MINIMAL hook only if required
src/pedagogy/listening-engine.css              minimal R1 states if required
src/core/build32-loader.js                     loader wiring only if required
sw.js                                          precache only if new runtime files load offline
```

Default decision: **do not modify `listening-data-2.js`**.

No expected changes in:

```text
app.js
voice-ios.js
free-voice.js
curriculum files
Recovery schemas
Evidence v2 contracts
learner route definitions
```

---

## 17. Required runtime tests for later pilot

### Static / authority

1. trusted authority and activity are separate exports/records;
2. bridge activity validates only when passed the external accepted authority;
3. forged activity dialogueId is rejected;
4. forged prerequisiteLessonId is rejected;
5. unauthorized fact is rejected;
6. historical `listening-data-2.js` doctor source remains unchanged;
7. no new durable store/schema;
8. sanctuaries unchanged.

### Browser VI + DEBUG FR

9. existing doctor single-question exercise still works;
10. R1 affordance hidden when prerequisites unavailable;
11. R1 affordance visible when prerequisites available;
12. full dialogue plays at normal speed;
13. slow replay remains effectively slower;
14. 3 questions appear in deterministic order;
15. progress moves 1/3 → 2/3 → 3/3;
16. miss stays miss after correction;
17. transcript absent before q3 completion;
18. transcript appears only after sequence completion;
19. close/back returns to Listening;
20. no horizontal overflow at 390×844;
21. targets >=44 px.

### Durable-data truth

22. open + close without playback/answer → learner pedagogical stores unchanged;
23. play then close → only existing Listening playback telemetry fields may differ;
24. slow replay then close → same allowed telemetry-only mutation rule;
25. question 1 answer writes only `jai-mal-ventre` Memory/Error truth;
26. question 2 answer writes only `depuis-hier` truth;
27. question 3 answer writes only `rendez-vous-medecin` truth;
28. no direct Evidence v2 write;
29. no P3b durability;
30. no aggregate R1/A2 mastery record.

### Regression

31. current meaning/contrast/dialogue tests remain green;
32. field navigation remains green;
33. iPhone/PWA/offline guard remains green;
34. baseline five historical CI failures remain the only accepted inherited failures.

---

## 18. Field gate

A later learner-facing candidate may be CI-certified, but is not **field closed** until real installed iPhone/PWA confirms:

```text
open Listening
→ launch R1 pilot
→ play normal
→ answer q1
→ replay slow
→ answer q2
→ answer q3
→ transcript reveal
→ return to Listening
```

Field pass checks no blank screen, stuck overlay, duplicate audio/control or learner-data loss.

This gate certifies interaction/runtime integration only — never A2 level.

---

## 19. Explicit exclusions still locked

```text
Build43
new lesson IDs
new curriculum items
full A2 curriculum
A2 level badge/unlock/readiness/mastery
CEFR certification
new eighth durable store
Evidence v2 cutover
P3b durability
semantic/free-text grading
AI evaluator
productive F16 Transfer
second R1 dialogue in same slice
```

Other A2 lanes remain deferred:

```text
A2-P1 short-series oral production          DEFER
A2-I1 stateful routine information exchange DEFER
A2-W1 short functional writing              DEFER
```

---

## 20. Successor-safety CI repair discovered by this audit

The accepted #251 workflow originally enforced the original five-file pure-proof scope and “no runtime integration” restriction on every future PR.

That made any authorized successor impossible by construction.

The candidate repair keeps these always active:

```text
pure-core syntax/unit contract
pure-core forbidden API guard
permanent sanctuary guard
```

The original pure-proof-only scope/source/no-integration restrictions now activate only when the pure core, its unit test or its proof document is modified.

This preserves the accepted core while allowing a future separately authorized integration to consume it.

No learner runtime is changed by this repair.

---

## 21. Candidate verdict

```text
integrate A2-R1 into Listening later         YES
integration style                            ADDITIVE / BACKWARD-COMPATIBLE
trusted authority external to activity       REQUIRED
historical dialogue mutation                 NO
separate bridge-data owner                   YES
pure core reuse                              YES
new global route                             NO
new lesson/item                              NO
new durable store                            NO
3-question same-dialogue sequence            YES
transcript before sequence completion        NO
existing playback telemetry                  PRESERVE
pre-answer pedagogical writes                NO
per-question Memory/Error reuse              YES / listening-r1 only
aggregate A2/R1 mastery                      NO
Evidence/P3b durability                      NO
real iPhone field gate                       REQUIRED FOR FIELD CLOSE
Build43                                      NOT AUTHORIZED
```

---

## 22. Next authorized candidate if this audit is accepted

Authorize only one narrow **A2-R1 Learner Integration Pilot** implementing the single `doctor-appointment` sequence above.

One pilot. One existing dialogue. Three existing facts. One existing Listening surface.

Expected STOP boundary:

```text
implementation
→ deterministic/unit/browser tests
→ PR candidate
→ exact-head CI/review
→ merge only if no new failures
→ Pages deployment
→ real iPhone/PWA field gate
→ only then decide whether any expansion is justified
```

Do not start a second R1 dialogue or another A2 lane in the same integration slice.
