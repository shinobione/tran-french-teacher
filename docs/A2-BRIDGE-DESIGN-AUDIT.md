# A2 Bridge Design Audit — French Trân’quille

Status: **AUDIT CANDIDATE / DOCS-READ-ONLY**

Date: 2026-08-24

Audited base:

```text
37d3250205759f7b4127a57024d2d4575b191dfe
```

Public runtime remains **v2.5.0 · Build 38**. Pedagogy baseline remains **v2.3.0 · Build 34**. Curriculum remains **52 lessons / 313 items**.

This audit changes no runtime, curriculum, lesson numbering, learner data, storage, Recovery, Evidence, voice, Premium, PWA or public metadata. It does not authorize learner-facing A2, Build43, a learner A2 unlock, CEFR certification, P3b durability or a new durable store.

---

## 1. Mission

The accepted A2 Entry Scope Audit identified four genuinely new capability lanes:

```text
A2-P1  short-series oral production
A2-I1  stateful routine information exchange
A2-R1  multi-fact short reception
A2-W1  short functional writing
```

This design audit must choose the **first** lane and define a concrete later implementation boundary before any learner-facing A2 work can exist.

The decision criterion is not “which capability sounds most A2”. It is:

> Which lane can create a genuinely new task demand while reusing accepted language, keeping evaluation honest, minimizing architecture/storage expansion and preserving the current learner route?

---

## 2. Sources reviewed

Canonical state / prior audit:

```text
AGENTS.md
PROJECT-STATE.md
MASTER-ROADMAP.md
docs/A2-ENTRY-SCOPE-AUDIT.md
```

Current capability owners inspected:

```text
src/pedagogy/curriculum-stage4.js
src/pedagogy/listening-data.js
src/pedagogy/listening-data-2.js
src/pedagogy/listening-engine.js
src/pedagogy/scenario-engine.js
src/pedagogy/speaking-loop-content.js
src/pedagogy/learner-evidence-adapter.js
```

This audit uses the already accepted A2 scope boundary from `docs/A2-ENTRY-SCOPE-AUDIT.md`. It does not reopen or expand the external CEFR interpretation in this slice.

---

## 3. First-lane comparison

### A2-P1 — short-series oral production

Current strengths:

```text
Speaking Loop already covers 52/52 lessons
recording is local and replayable
existing lesson/item phrases can seed prompts
no pronunciation score is claimed
```

Current architectural gap:

```text
current owner selects one useful phrase at a time
recording is ephemeral/self-comparison oriented
no deterministic content-correctness owner exists for a 2–5 sentence free series
```

A first P1 slice would therefore need either:

- self/rubric completion only, with deliberately weak evidence semantics; or
- a semantic evaluator, which is outside the current honesty boundary for objective mastery.

Verdict for first lane: **VALID LATER / NOT FIRST**.

### A2-I1 — stateful routine information exchange

Current strengths:

```text
Scenario already owns short structured exchanges
44 situations / 132 turns exist
turn completion, assistance and durable scenario state already exist
```

Current architectural gap:

```text
accepted answers are static per turn
a later turn does not currently depend on a learner-selected/received fact carried from an earlier turn
```

A true I1 implementation therefore needs a state contract for carried facts, validation of state transitions and clear handling of branching/assistance. That is genuinely new and justified, but wider than the smallest first bridge.

Verdict for first lane: **VALID LATER / NOT FIRST**.

### A2-R1 — multi-fact short reception

Current strengths:

```text
Listening already owns short contextual dialogues
answering is deterministic multiple choice
normal/slow replay already exists
transcript reveal already exists
listening is already a reliable durable action family in Build39
several current dialogues already contain multiple explicit facts
```

Current gap:

```text
one dialogue currently resolves one bounded question
multi-fact retention is not a distinct current task shape
```

This is the narrowest genuine capability increase because the language and dialogue surface already exist. The new demand is primarily **information retention across several explicit facts from one short input**.

Verdict for first lane: **SELECTED**.

### A2-W1 — short functional writing

Current strengths:

```text
accepted curriculum already supplies enough familiar practical language for short notes/messages
```

Current architectural gap:

```text
no dedicated writing owner exists
no accepted free-text evaluation policy exists
no current writing-specific route/data surface exists
```

W1 is probably the clearest missing modality, but it is not the smallest safe first implementation because it immediately opens owner, surface, correction and evidence questions that R1 can avoid.

Verdict for first lane: **HIGH-VALUE LATER / NOT FIRST**.

---

## 4. Decision

**A2-R1 — multi-fact short reception is the first A2 Bridge lane.**

Reason:

1. it is genuinely new relative to the current one-dialogue/one-question shape;
2. it can reuse accepted language and existing listening dialogues;
3. it can remain fully deterministic;
4. it does not require AI semantic grading;
5. it does not require a new durable store;
6. it does not require new lesson IDs;
7. it can be proven first as a pure contract before any learner-facing integration.

This decision does **not** authorize learner-facing R1 yet.

---

## 5. Canonical first pilot fixture

The cleanest existing source is:

```text
listening dialogue id: doctor-appointment
source file: src/pedagogy/listening-data-2.js
```

Current dialogue:

```text
A: Qu’est-ce qui vous arrive ?
B: J'ai mal au ventre.
A: Depuis quand ?
B: Depuis hier. Je voudrais un rendez-vous avec un médecin.
```

Current dialogue already requires exactly:

```text
jai-mal-ventre
Depuis source item: depuis-hier
rendez-vous-medecin
```

Canonical IDs are:

```text
jai-mal-ventre
depuis-hier
rendez-vous-medecin
```

All three are owned by **L45 — Santé & rendez-vous médical**.

Current L45 item mapping:

```text
jai-mal-ventre       → J'ai mal au ventre.
depuis-hier          → Depuis hier.
rendez-vous-medecin  → Je voudrais un rendez-vous avec un médecin.
```

Therefore a three-fact pilot can ask only about already accepted source language:

1. What is the problem? → stomach pain;
2. Since when? → since yesterday;
3. What does the person request? → a medical appointment.

No new lexical or grammatical source is required for this pilot.

---

## 6. Prerequisite contract

For the first pilot, prerequisite ownership stays exactly with existing curriculum items.

Required canonical items:

```text
l45 / jai-mal-ventre
l45 / depuis-hier
l45 / rendez-vous-medecin
```

The existing Listening availability rule already requires every `requiredItems` ID to be present in learner `knownItems` before a dialogue is available.

A later R1 pilot must not weaken this rule.

For the pure contract proof proposed after this audit, no learner state is read at all; tests will validate only that every R1 question’s evidence ID is contained in the dialogue’s accepted prerequisite/evidence source set.

---

## 7. New-language decision

For first R1 pilot:

```text
new vocabulary        NOT REQUIRED
new grammar           NOT REQUIRED
new curriculum item   NOT REQUIRED
new lesson ID         NOT REQUIRED
existing item meaning MUST NOT CHANGE
```

This is important: the first bridge should increase **task demand**, not manufacture a new A2 theme.

---

## 8. Proposed future data contract

The current dialogue schema has one top-level:

```text
questionVi
questionFr
options
answer
evidenceItems
```

A later R1 proof should be additive and backward-compatible. It must not reinterpret the existing single-question fields.

Proposed optional design shape:

```text
bridgeQuestions: [
  {
    id,
    questionVi,
    questionFr,
    options,
    answer,
    evidenceItems
  }
]
```

Contract rules:

```text
2–4 questions per bridge activity
question IDs stable and unique inside the dialogue
exactly one deterministic correct option per question
evidenceItems non-empty
evidenceItems must reference accepted existing curriculum IDs
for the first pilot, evidenceItems must be a subset of dialogue.requiredItems
no semantic free-text grading
no inferred fact that is absent from the short input
no new curriculum item created merely for task metadata
```

The existing single-question dialogue fields remain canonical for the current learner-facing Listening surface until a later integration slice explicitly changes that surface.

---

## 9. Proposed future activity owner

The first implementation candidate after this audit should be a **pure R1 contract proof**, not a UI feature.

Recommended future core owner:

```text
src/pedagogy/a2-reception-bridge-core.js
```

Recommended responsibility:

```text
input: existing dialogue + optional bridgeQuestions
validate bounded R1 schema
validate prerequisite/evidence relationships
emit a detached/frozen deterministic activity plan
no DOM
no localStorage
no IndexedDB
no network
no learner route
no Memory/Error/Evidence writes
```

This isolates the new semantics before touching `listening-engine.js`.

`listening-engine.js` remains the likely later integration owner because the capability is still Listening/reception, but runtime integration is **not authorized by this audit candidate**.

---

## 10. Evaluation boundary

Question-level outcome is deterministic:

```text
success = selected option index equals canonical answer index
miss    = selected option index differs
```

Sequence-level language must stay descriptive rather than psychometric:

```text
completed      = all R1 questions answered
clean sequence = every question answered correctly on its first attempt
```

Neither means:

```text
A2 mastery
A2 readiness
CEFR attainment
listening mastery
independent unseen transfer
```

A miss is never rewritten as a later success merely because the learner saw the correction.

---

## 11. Assistance / correction semantics

Existing Listening support can inform later integration, but the pure contract proof will not render UI.

Future learner-facing semantics, if separately authorized, should preserve:

```text
normal replay allowed
slow replay allowed
replay count is support metadata, not failure
question remains deterministic multiple choice
wrong selection remains a miss
correct option may be shown after the miss
full transcript should remain hidden until the multi-question sequence is complete
```

The delayed full transcript matters because revealing it after question 1 could expose answers for questions 2–3.

Any later sequence summary must distinguish:

```text
first-attempt correct
miss + correction shown
replay/slow support used
```

No assisted-success fiction.

---

## 12. Evidence boundary

Current durable Build39 reliable families remain:

```text
phrase-retrieval
listening
scenario
```

Current Listening writes item-level practice/error evidence through existing Memory/Error owners. The Build39 evidence adapter classifies listening error events by `listening-*` source.

For the **first R1 pure contract proof**:

```text
durable write            NONE
Memory write             NONE
Error Intelligence write NONE
Evidence v2 write        NONE
P3b observation write    NONE
new store                NONE
```

For any later learner-facing integration, a separate gate must decide whether per-question item practice can reuse current Listening Memory/Error semantics.

Even if reused later, **bridge-level multi-fact competence must not be manufactured from item-level writes**. No new durable capability claim is authorized here.

---

## 13. Learner-route semantics

Current historical continuity remains:

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

Therefore:

```text
R1 design                YES
R1 pure contract proof   NEXT CANDIDATE IF THIS AUDIT IS ACCEPTED
R1 learner-facing route  NOT AUTHORIZED
A2 learner unlock        NOT AUTHORIZED
A2 readiness             NOT CLAIMED
```

The first proof must have no navigation entry, no lesson unlock and no progression side effect.

---

## 14. Lesson-number decision

For first R1 pilot:

```text
new lesson ID   NO
renumbering      NO
new curriculum item NO
```

R1 is a capability format layered over accepted source language, not a new theme lesson.

Build43 remains **NOT AUTHORIZED**.

---

## 15. Tests required for the later pure contract proof

Minimum deterministic unit coverage:

1. accepts a valid 3-question `doctor-appointment` fixture;
2. rejects fewer than 2 or more than 4 bridge questions;
3. rejects duplicate question IDs;
4. rejects missing/invalid answer index;
5. rejects empty options or non-deterministic answer shape;
6. rejects empty evidence IDs;
7. rejects evidence IDs outside accepted prerequisite/evidence source IDs;
8. rejects mutation/aliasing by returning detached frozen output;
9. proves no existing single-question fields are rewritten;
10. proves no storage/network/DOM API is used by the pure core.

A later dedicated workflow should also guard scope and source hashes for the pilot fixture if the implementation chooses to consume existing data without modifying it.

---

## 16. Sanctuaries / protected boundaries

The later pure contract proof must not touch:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
Build30 runtime bridge/contracts
Recovery schemas
Evidence v2 read/write contract
learner historical data
existing 52 lesson IDs / 313 item semantics
```

For the first proof, it should also avoid modifying:

```text
src/pedagogy/listening-engine.js
src/pedagogy/listening-data.js
src/pedagogy/listening-data-2.js
src/pedagogy/curriculum-stage4.js
```

Those files are audit sources for the contract proof. Runtime/data integration belongs to a later separately authorized slice.

---

## 17. Deferred lanes

This selection does not reject the other lanes.

```text
A2-P1  DEFER — needs an honest short-series completion/evidence policy
A2-I1  DEFER — needs carried-fact state contract and transition semantics
A2-W1  DEFER — needs a dedicated writing owner and non-fake free-text evaluation policy
```

Recommended order is **not locked beyond R1 first**. The next design choice after an accepted R1 proof must be made from new repository evidence, not assumed now.

---

## 18. Candidate verdict

```text
first A2 Bridge lane                    A2-R1 SELECTED
first pilot source                      doctor-appointment
first pilot source owner                existing Listening data
exact pilot prerequisite lesson         L45
exact pilot prerequisite items          jai-mal-ventre / depuis-hier / rendez-vous-medecin
new language needed                     NO
new lesson ID needed                    NO
new curriculum item needed              NO
first implementation form               PURE CONTRACT PROOF ONLY
learner-facing R1                       NOT AUTHORIZED
Build43                                 NOT AUTHORIZED
new durable store                       NOT AUTHORIZED
P3b durability                          NOT AUTHORIZED
Evidence v2 cutover                     NOT AUTHORIZED
A2 learner readiness/mastery            NOT CLAIMED
CEFR certification                      NOT CLAIMED
```

---

## 19. Next authorized candidate if this audit is accepted

Authorize only one later candidate:

**A2-R1 Pure Multi-Fact Reception Contract Proof**

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
no data-file mutation
no lesson additions
no route/navigation changes
no localStorage/IndexedDB
no Memory/Error/Evidence writes
no Build43
```

That proof must STOP as a candidate PR for a fresh control session. Only after its acceptance may the roadmap decide whether a separate learner-facing integration audit is justified.
