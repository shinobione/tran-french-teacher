# A2-R1 Integration Decision Audit — French Trân’quille

Status: **AUDIT CANDIDATE / DOCS-READ-ONLY**

Date: 2026-08-25

Audited base:

```text
a4cdc146267a88ccef9c7cde928bc2f1010ef10b
```

That base is the accepted squash merge of PR #251, **A2-R1 Pure Multi-Fact Reception Contract Proof**.

Public runtime remains **v2.5.0 · Build 38**. Pedagogy baseline remains **v2.3.0 · Build 34**. Curriculum remains **52 lessons / 313 items**. This audit changes no runtime, learner route, curriculum, storage, Recovery, Evidence, voice, Premium or PWA behaviour.

---

## 1. Mission

The pure A2-R1 contract now proves that French Trân’quille can validate a bounded deterministic 2–4 question reception activity over several distinct explicit facts from one source.

This audit decides whether that proof should become a later learner-facing Listening capability and, if yes, defines the **smallest safe integration contract** before any runtime code is authorized.

The decision criterion is:

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
```

Canonical pilot remains:

```text
dialogue                  doctor-appointment
prerequisite lesson       l45 — Santé & rendez-vous médical
facts                     jai-mal-ventre / depuis-hier / rendez-vous-medecin
```

---

## 3. Current Listening reality

`doctor-appointment` already exists in `listening-data-2.js` and already owns the exact source audio/text facts required by R1:

```text
A: Qu’est-ce qui vous arrive ?
B: J'ai mal au ventre.
A: Depuis quand ?
B: Depuis hier. Je voudrais un rendez-vous avec un médecin.
```

Its current learner-facing contract remains intentionally simple:

```text
one dialogue
→ one deterministic question
→ one answer
→ feedback
→ transcript reveal
→ next exercise
```

The current question tests only:

```text
depuis-hier
```

The current dialogue must stay backward-compatible. Existing single-question fields are **not** to be reinterpreted as an R1 sequence.

---

## 4. Integration decision

**YES — A2-R1 should be integrated into Listening as a later narrow learner-facing capability.**

But the integration must be **additive**, not a rewrite of the current dialogue schema or Listening state machine.

Decision:

```text
existing dialogue source                 KEEP UNCHANGED
existing single-question Listening       KEEP UNCHANGED
pure A2-R1 core                          REUSE
R1 question definitions                  ADD AS SEPARATE BRIDGE DATA/MAPPING
learner-facing surface                   REUSE LISTENING OVERLAY
new route/tab                            NO
new lesson/item                          NO
new durable store                        NO
Build43                                  NOT AUTHORIZED BY THIS AUDIT
```

The purpose is to add a new task shape over accepted language, not to create a parallel A2 application.

---

## 5. Data ownership decision

Do **not** add `bridgeQuestions` directly to the historical dialogue object in `listening-data-2.js` for the first integration.

Instead, a later implementation candidate should add one narrow static bridge owner, for example:

```text
src/pedagogy/a2-reception-bridge-data.js
```

Conceptual shape:

```text
{
  'doctor-appointment': {
    id: 'doctor-appointment-multi-fact',
    lane: 'A2-R1',
    authority: {
      dialogueId: 'doctor-appointment',
      prerequisiteLessonId: 'l45',
      allowedFactIds: [
        'jai-mal-ventre',
        'depuis-hier',
        'rendez-vous-medecin'
      ]
    },
    questions: [...]
  }
}
```

The existing dialogue remains the audio/text source of truth. The bridge data only describes the extra reception questions and external authority required by the accepted pure core.

Why separate ownership is preferred:

1. zero reinterpretation of historical dialogue fields;
2. old Listening behavior remains available and testable unchanged;
3. bridge data can be validated through the pure core before rendering;
4. future R1 pilots can be added without expanding the base Listening schema prematurely;
5. rollback is simple: remove bridge wiring/data, not migrate dialogue records.

---

## 6. Unlock / availability semantics

R1 availability must reuse the current Listening prerequisite logic and add **no A2 readiness claim**.

For the first pilot, the bridge is available only when:

```text
existing doctor-appointment dialogue is available
AND prerequisite lesson identity is l45
AND all authoritative fact IDs are currently valid curriculum items
AND the pure core accepts the bridge activity
```

The learner-facing wording must be capability-neutral, e.g.:

```text
VI: Nghe và nhớ nhiều thông tin
FR DEBUG: Écouter et retenir plusieurs informations
```

Do not display:

```text
A2 débloqué
Niveau A2
Tu es prête pour A2
Compétence A2 maîtrisée
```

Availability means only: **the accepted source language is present and this activity can be attempted**.

---

## 7. Sequence interaction contract

The first learner-facing R1 pilot should be a **single bounded sequence of 3 questions** over one short dialogue.

Recommended flow:

```text
open R1 activity
→ play / replay full dialogue
→ question 1
→ local success/miss feedback
→ question 2
→ local success/miss feedback
→ question 3
→ local success/miss feedback
→ full transcript reveal
→ bounded sequence summary
→ return to Listening / next activity
```

Important: the full transcript stays hidden until all R1 questions have been answered.

Reason: revealing the transcript after question 1 would expose facts needed for questions 2 and 3 and destroy the multi-fact reception demand.

---

## 8. Correction semantics

For each question:

```text
correct first selection → success
wrong first selection   → miss
```

After a miss:

- the correct option may be identified immediately;
- the miss remains a miss;
- moving to the next question is allowed;
- replay before the next question is allowed;
- no later correction rewrites the first outcome as success.

The sequence summary may say, descriptively:

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

## 9. Replay / slow playback semantics

Reuse existing Listening audio behavior:

```text
normal 0.88
slow   0.65 effective floor/current accepted runtime behavior
```

Replay may be used:

- before question 1;
- between questions;
- after a miss;
- before transcript reveal if desired.

Replay/slow use is support metadata, not failure evidence.

The same full dialogue is replayed; do not play isolated answer-bearing lines for the first R1 pilot because that would reduce the retention demand.

---

## 10. Memory / Error Intelligence decision

A new evidence owner is **NOT required** for the first learner-facing R1 integration.

Question-level outcomes can honestly reuse the existing reliable Listening family because every accepted R1 question targets exactly one authoritative existing curriculum fact.

Later runtime semantics should be:

```text
question factId → existing Memory.recordPractice(factId, ok, 'listening-r1')
question factId → existing Errors.recordAttempt(... source: 'listening-r1')
```

One question writes only its own `factId`.

Do **not** write all three facts for every question.

Do **not** manufacture a durable bridge-level capability record.

Do **not** write directly to Evidence v2 or P3b durability.

Allowed durable meaning remains only:

> this existing curriculum item was answered correctly or missed in a deterministic listening question.

Not allowed:

```text
multi-fact mastery
A2 reception mastery
independent listening competence
A2 readiness
```

This keeps the existing evidence boundary intact.

---

## 11. Session/history state decision

The first R1 integration does **not** justify a new durable store or schema migration.

Existing Listening totals/recent may record the activity at a coarse session level if that can be done backward-compatibly, but this is optional for the first candidate.

Preferred first-candidate rule:

```text
no Listening schema migration
no new persistent R1 sequence object
item-level Memory/Error writes only after answers
all sequence cursor/UI state ephemeral
```

Opening or abandoning an R1 activity before answering must not mutate learner durable data.

---

## 12. Backward compatibility decision

The later implementation must preserve all existing Listening behavior:

```text
meaning exercises unchanged
contrast exercises unchanged
18 existing dialogue records unchanged
single-question doctor-appointment unchanged
normal/slow playback unchanged
current close/settings/navigation unchanged
current Listening state schema remains readable
```

R1 is an optional additive activity over `doctor-appointment`, not a replacement for the current dialogue exercise.

No migration is required for the first pilot.

---

## 13. UI placement decision

Do not create a new global A2 route or bottom-navigation destination.

The first pilot should live inside the existing Listening surface as a **small optional activity affordance** when the source is available.

Recommended learner-facing placement:

```text
Listening / Luyện nghe
→ contextual dialogue doctor-appointment
→ optional “Nghe 3 thông tin” / “3 informations” activity
```

The exact visual component may be a compact mode/pill/card within Listening, but must not expose architecture terms such as `A2-R1`, `bridge`, `factId` or `evidence` to Trân.

---

## 14. Mobile / iPhone interaction contract

The first R1 learner-facing candidate must be tested at least on:

```text
390 × 844
VI learner mode
DEBUG FR
```

Requirements:

- touch targets >= 44 px;
- no horizontal overflow;
- question progress always visible (`1/3`, `2/3`, `3/3`);
- one primary action at a time;
- no full transcript before sequence completion;
- normal and slow playback reachable without layout jump;
- close/back behavior returns to Listening reliably;
- Settings remains usable;
- no route/page crossfade that exposes competing app facades;
- `prefers-reduced-motion` respected;
- screen-reader labels distinguish playback, choices, next question and close actions.

---

## 15. Later integration architecture

A later runtime candidate should remain narrow and reuse existing owners.

Expected files, subject to exact implementation audit:

```text
src/pedagogy/a2-reception-bridge-data.js       NEW static pilot mapping
src/pedagogy/a2-reception-bridge-runtime.js    NEW thin adapter/controller if needed
src/pedagogy/listening-engine.js               MINIMAL integration hook only
src/pedagogy/build32-loader.js                 loader wiring only if required
sw.js                                          precache only if new runtime files load offline
```

Existing pure owner remains:

```text
src/pedagogy/a2-reception-bridge-core.js
```

The candidate should avoid modifying `listening-data-2.js` unless a later exact implementation review proves separate mapping impossible. The default decision is **do not modify it**.

No changes are expected in:

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

## 16. Required runtime tests for a later candidate

A future learner-facing R1 candidate must not be merged without a dedicated browser tribunal covering:

### Static / ownership

1. bridge data validates through the accepted pure core;
2. authority binds `doctor-appointment` + `l45` + the three fact IDs;
3. historical `listening-data-2.js` doctor source remains unchanged;
4. no new durable store/schema;
5. sanctuaries unchanged.

### Real browser — VI + DEBUG FR

6. existing doctor single-question exercise still works;
7. R1 affordance is hidden when prerequisites are unavailable;
8. R1 affordance appears when prerequisites are available;
9. full dialogue plays at normal speed;
10. slow replay remains audibly/effectively slower;
11. three questions appear in deterministic order;
12. progress indicator moves 1/3 → 2/3 → 3/3;
13. miss stays miss after correction;
14. transcript is absent before question 3 completion;
15. transcript appears after sequence completion;
16. close/back returns to Listening;
17. no horizontal overflow at 390×844;
18. targets >=44 px.

### Data truth

19. opening/closing without answer leaves durable learner stores byte-identical;
20. answering question 1 writes only `jai-mal-ventre` Listening practice/error truth;
21. answering question 2 writes only `depuis-hier` truth;
22. answering question 3 writes only `rendez-vous-medecin` truth;
23. no Evidence v2 direct write;
24. no P3b durability;
25. no aggregate R1/A2 mastery record.

### Regression

26. current Listening meaning/contrast/dialogue tests remain green;
27. field navigation remains green;
28. iPhone/PWA/offline guard remains green;
29. baseline five historical CI failures remain the only accepted inherited failures.

---

## 17. Field gate

A later learner-facing integration may be CI-certified on desktop/iPhone viewport, but the capability should not be called **field closed** until a real iPhone/PWA check confirms:

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

Field pass must verify no blank screen, no stuck overlay, no duplicate audio/control, and no loss of existing learner data.

This field gate does not certify A2 level; it certifies only the interaction/runtime integration.

---

## 18. Explicit exclusions that remain locked

This audit does **not** authorize:

```text
Build43
new lesson IDs
new curriculum items
full A2 curriculum
A2 learner level badge/unlock
A2 readiness/mastery claim
CEFR certification
new eighth durable store
Evidence v2 cutover
P3b durability
semantic/free-text grading
AI evaluator
productive F16 Transfer
```

Other A2 lanes remain deferred:

```text
A2-P1 short-series oral production          DEFER
A2-I1 stateful routine information exchange DEFER
A2-W1 short functional writing              DEFER
```

---

## 19. Candidate verdict

```text
integrate A2-R1 into Listening later        YES
integration style                           ADDITIVE / BACKWARD-COMPATIBLE
historical dialogue source mutation         NO
separate bridge data owner                  YES
pure core reuse                             YES
new global route                            NO
new lesson/item                             NO
new durable store                           NO
per-question Memory/Error reuse             YES / listening-r1 only
aggregate A2/R1 mastery                     NO
transcript before sequence completion       NO
normal/slow replay                          YES
real iPhone field gate                      REQUIRED FOR FIELD CLOSE
Build43                                     NOT AUTHORIZED
```

---

## 20. Next authorized candidate if this audit is accepted

Authorize only a narrow **A2-R1 Learner Integration Pilot** candidate implementing the single `doctor-appointment` bridge sequence defined above.

It must remain one pilot, one existing dialogue, three existing facts, one existing Listening surface.

Expected STOP boundary:

```text
implementation
→ deterministic/unit/browser tests
→ PR candidate
→ CI review
→ merge only if no new failures
→ Pages / real iPhone field gate
→ only then decide whether a second R1 dialogue or another A2 lane is justified
```

No second R1 dialogue and no other A2 lane should be started in the same integration slice.
