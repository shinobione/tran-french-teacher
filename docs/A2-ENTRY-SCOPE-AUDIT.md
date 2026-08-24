# A2 Entry Scope Audit — French Trân’quille

Status: **AUDIT CANDIDATE / READ-ONLY**

Date: 2026-08-24

Audited base:

```text
e1bfcea1e2e3a51c8a0efb97aa8791bcde31117d
```

Public runtime remains **v2.5.0 · Build 38**. Pedagogy baseline remains **v2.3.0 · Build 34**. Curriculum remains **52 lessons / 313 items**.

This audit changes no runtime, curriculum, lesson numbering, learner data, storage, Recovery, Evidence, voice, Premium, PWA or public metadata. It does not claim CEFR A1 completion, learner A2 readiness or learner A2 mastery.

---

## 1. Question

Accepted P4 closed the A1 Productive Consolidation gate at a rational product boundary and authorized only this docs/read-only audit.

Question:

> What is the smallest genuinely new A2 scope that extends the current 52/313 product without duplicating late-A1 content, disguising unresolved A1 work as A2, or confusing product-roadmap permission with learner readiness?

The audit must also decide whether any extension is justified at all.

---

## 2. Sources reviewed

Repository:

```text
AGENTS.md
PROJECT-STATE.md
MASTER-ROADMAP.md
docs/BUILD-40-P4-A1-READINESS-AUDIT.md
src/pedagogy/curriculum-stage2.js
src/pedagogy/curriculum-stage3.js
src/pedagogy/curriculum-stage4.js
src/pedagogy/scenario-data.js
src/pedagogy/real-life-data-3.js
src/pedagogy/real-life-data-4.js
src/pedagogy/listening-data.js
src/pedagogy/listening-data-2.js
src/pedagogy/speaking-loop-content.js
```

External scope reference:

- Council of Europe — CEFR Global Scale, A2;
- Council of Europe — CEFR Companion Volume (2020), especially overall oral interaction, overall oral production, written production and goal-oriented co-operation.

The CEFR is used as a **scope reference**, not as a certification engine and not as a requirement to implement every descriptor scale.

---

## 3. A2 boundary used here

The official A2 reference centers on:

```text
frequent language in areas of immediate relevance
simple/routine tasks requiring simple direct information exchange
simple description of background, immediate environment and immediate needs
structured situations and short conversations
short series of simple phrases/sentences
simple written series linked with basic connectors
```

Important upper boundary:

```text
B1, not A2, is where the global scale expects broader connected text,
linear sequencing with reasons/explanations and more independent discourse.
```

Therefore this audit does **not** define A2 as long connected discourse, free debate, detailed narration or sustained argument.

---

## 4. Late-A1 content already occupies much A2-adjacent thematic space

Stage4 already teaches:

```text
L41 clarification / reformulation
L42 quantities / packaging
L43 comparison / choosing
L44 invitations / accepting / refusing
L45 health / medical appointment
L46 medicine / pharmacy
L47 work / instructions
L48 housing failure / repair request
L49 transport disruption / alternatives
L50 narration ordering connectors
L51 simple opinion
L52 spoken on for shared plans
```

Earlier stages already provide personal information, family/social exchange, shopping, food, time, directions, transport, telephone, administration, daily routine, futur proche, recent past and starter passé composé sources.

So these are **not genuinely new A2 scope merely by topic name**:

```text
more shopping / restaurant / transport / health themes
more invitations/refusals
more clarification phrases
more simple opinions
more simple narration connectors
more routine work/housing problem vocabulary
another lesson whose only novelty is on / futur proche / starter past
```

A future A2 extension that only re-labels those themes would be duplication, not progression.

---

## 5. Interaction: broad context, strongly guided task shape

Scenario exposes **44 situations / 132 turns** and already covers service reformulation, compare-and-choose, invitation/refusal, medical appointment, work instruction clarification, housing repair, train disruption and plans with Jerry.

That is strong contextual production coverage.

However, the current scenario data is predominantly:

```text
prompt → bounded accepted answer(s) → next turn
```

Even `openResponse:true` turns still carry explicit accepted answers, model and hint. A later turn normally does not need to retain a learner-selected fact from an earlier turn as task state.

Verdict:

```text
thematic A2-adjacent interaction       STRONG
structured short exchange exposure    STRONG
stateful information exchange          PARTIAL / NOT DISTINCT CURRENT CAPABILITY
open conversational autonomy           NOT CLAIMED
```

---

## 6. Listening: contextual, mostly single-target extraction

Current listening contains **17 contrast families / 18 contextual dialogues**. Dialogues already include practical multi-line contexts, but each dialogue resolves one bounded multiple-choice question with a small evidence-item set.

Current reliable shape:

```text
short contextual input
→ one explicit target fact/meaning
→ one bounded choice
```

What is not yet a distinct capability is retaining **several explicit facts from one short input** to complete a multi-part task.

Verdict:

```text
single explicit fact extraction        RELIABLE / ALREADY COVERED
short contextual dialogue exposure     ALREADY COVERED
multi-fact short-input handling         PARTIAL / GENUINELY NEW CANDIDATE
```

---

## 7. Speaking Loop: phrase rehearsal, not short-series production

Speaking Loop covers 52/52 lessons with at most two moments per lesson. It selects an existing useful phrase, plays the model, records locally and lets the learner compare their own voice. It explicitly does not persist the recording in progression.

That is valuable oral rehearsal, but it does not ask the learner to assemble a short series of independently selected sentences and does not score pronunciation/mastery.

Verdict:

```text
phrase-level oral rehearsal            STRONG / ALREADY COVERED
self-listening                          STRONG / ALREADY COVERED
short-series oral production task       GENUINELY NEW CANDIDATE
pronunciation score                      NOT AUTHORIZED
```

---

## 8. Written A2 production is the clearest missing surface

No dedicated current curriculum/runtime surface reviewed here owns A2-style written production or written interaction as a distinct activity.

Typed responses inside guided exercises/scenarios are not equivalent to composing a short note/message or a small series of simple sentences for a communicative purpose.

Candidate boundary:

```text
2–5 simple sentences
familiar concrete topic
message / note / confirmation / basic description
simple linking only from accepted/taught sources
no essay
no free-form mastery score
no AI semantic grade presented as objective truth
```

Verdict:

```text
A2 short functional writing             GENUINELY NEW CANDIDATE
current dedicated owner                  NONE FOUND
implementation                           NOT AUTHORIZED BY THIS AUDIT
```

---

## 9. Smallest genuinely new A2 Bridge

The honest extension is a bounded **A2 Bridge** across capability formats, not a list of new themes.

### A2-P1 — Short-series oral production

Produce a short list/series of simple phrases and sentences about a familiar concrete subject instead of only one prompted phrase.

Reusable current sources already exist for self/background, routine, living conditions, work, likes/dislikes, recent action, near-future plan and simple immediate problems.

Boundary:

```text
short series, not B1 connected discourse
no sustained argument
no detailed free narration
no mastery inference from completion
```

Classification: **GENUINELY NEW CAPABILITY FORMAT**.

### A2-I1 — Stateful routine information exchange

Complete a simple routine task in a short structured exchange where facts chosen/received earlier must be used later.

Design examples only:

```text
choose a time, then confirm it later
receive price/quantity, compare, then act on the selected option
report delay, receive alternative, then confirm new plan
arrange appointment using carried-forward day/time information
```

Classification: **PARTIAL TODAY / GENUINELY NEW STATEFUL FORM**.

### A2-R1 — Multi-fact short reception

Understand a short, clear, simple dialogue or text containing several explicit facts and extract more than one relevant piece of information.

Boundary:

```text
short concrete input
high-frequency language
explicit facts, not subtle inference
multiple independent questions or one goal requiring several facts
no B1-style long-text claim
```

Classification: **PARTIAL TODAY / GENUINELY NEW TASK SHAPE**.

### A2-W1 — Short functional writing

Write a short practical message/note or a small series of simple sentences on a familiar immediate topic.

Possible contexts:

```text
confirm appointment
say where/when to meet
explain a simple delay/problem
write a short personal update
give a few simple facts about routine/background
```

Classification: **GENUINELY NEW MODALITY**.

---

## 10. Not an A2 entry blocker

### Mediation

The Companion Volume includes A2 mediation descriptors, but this audit does not make mediation mandatory in the first bridge. The CEFR is a profiling framework, not a requirement to implement every descriptor scale before any A2 work may exist.

```text
simple mediation / relaying information FUTURE OPTIONAL AUDIT
A2 entry blocker                        NO
implementation                          NOT AUTHORIZED
```

### More deterministic Transfer families

A2 does not justify reopening rejected Build41 families without new source evidence.

```text
more mechanical Transfer families       NOT AN A2 ENTRY REQUIREMENT
productive F16 Transfer                  STILL NOT AUTHORIZED
```

### Durable Foundation/Transfer evidence

P3c remains binding.

```text
P3b durability                           NOT REQUIRED TO DESIGN A2 SCOPE
P3b durability                           STILL NOT JUSTIFIED
Evidence v2 cutover                      NOT AUTHORIZED
new eighth store                         NOT AUTHORIZED
```

---

## 11. Extension verdict

### Bounded extension

**YES — JUSTIFIED IN PRINCIPLE AS AN A2 BRIDGE.**

Reason:

- late-A1 thematic breadth is already strong, so more theme duplication is not justified;
- clear capability-format gaps remain relative to the A2 reference boundary;
- those gaps can be designed without pretending the learner is A2-ready;
- the first bridge can reuse much of the current 313-item vocabulary/grammar as prerequisite material;
- storage expansion is not needed to define the bridge.

### Full A2 curriculum

**NOT JUSTIFIED NOW.**

No dozens of new lessons, wholesale CEFR syllabus, learner unlock or renumbering is authorized.

### Build43

**NOT JUSTIFIED NOW.**

A Build number belongs only after a later design audit proves one concrete implementation slice with owners, contracts, acceptance criteria and safety boundaries.

---

## 12. Proposed bridge boundary

```text
A2-P1  short-series oral production
A2-I1  stateful routine information exchange
A2-R1  multi-fact short reception
A2-W1  short functional writing
```

Not first-bridge scope by default:

```text
long connected discourse
argumentation/debate
detailed free narration
complex grammar inventory expansion
B1-style reasons/explanations as a general capability
CEFR certification
learner A2 unlock
pronunciation scoring
AI semantic grading presented as objective mastery
```

No lesson numbers are assigned by this audit.

---

## 13. Prerequisite strategy

The next design audit should first try to compose bridge tasks from already accepted curriculum sources:

```text
reuse known A1 vocabulary/structures
→ change task demand / information structure
→ add language only where the A2 task demonstrably requires it
```

Any new lexical or grammatical source must have an explicit owner and must not reinterpret the existing 313 item semantics.

---

## 14. Learner-readiness boundary

Historical continuity remains locked:

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

Therefore:

```text
product may design A2 bridge             YES
learner A2 unlock                        NO
learner A2 readiness                     NOT CLAIMED
CEFR A1 certification                    NOT CLAIMED
CEFR A2 certification                    NOT CLAIMED
```

A future bridge implementation, if ever authorized, must remain separately gated from the current learner route until an explicit learner-routing decision exists from trustworthy evidence.

---

## 15. Storage / evidence / Recovery boundary

Unchanged:

```text
Recovery                       7 durable stores / backup v3
Evidence v2                    derived shadow only
P3b observation collector      ephemeral only
Foundation/Transfer LI3        unavailable as durable action families
new durable store              NOT AUTHORIZED
Evidence v2 direct event write NOT AUTHORIZED
Evidence v2 read cutover       NOT AUTHORIZED
```

No A2 design need may use storage expansion as a shortcut around P3c.

---

## 16. Next authorized slice if accepted

Authorize only a **docs/read-only A2 Bridge Design Audit**.

It must decide before implementation:

1. which of A2-P1 / A2-I1 / A2-R1 / A2-W1 belongs in the first concrete slice;
2. exact prerequisite lesson/item sources already present;
3. whether any new language source is truly necessary;
4. activity/data owner for each selected lane;
5. deterministic versus semantic evaluation boundary;
6. assistance/correction semantics;
7. what evidence can be stated honestly from completion;
8. how the bridge stays outside the current learner route until separately authorized;
9. whether any new lesson IDs are actually needed at all;
10. concrete tests and sanctuary checks for any future implementation candidate.

It must **not**:

```text
implement learner-facing A2
create Build43
add/renumber lessons
change existing 313 item semantics
unlock A2 for Trân
claim learner A2 readiness/mastery
persist P3b observations
promote Foundation/Transfer into LI3
cut Evidence v2 over to product truth
create an eighth store
```

---

## 17. Candidate verdict

```text
late-A1 thematic A2 adjacency              STRONG / ALREADY COVERED
more theme-only A2 lessons                  NOT JUSTIFIED
short-series oral production                GENUINELY NEW CANDIDATE
stateful routine information exchange       PARTIAL TODAY / NEW FORM JUSTIFIED
multi-fact short reception                  PARTIAL TODAY / NEW FORM JUSTIFIED
short functional writing                    GENUINELY NEW MODALITY
simple mediation                            OPTIONAL FUTURE AUDIT / NOT ENTRY BLOCKER
bounded A2 Bridge                           JUSTIFIED IN PRINCIPLE
full A2 curriculum                          NOT JUSTIFIED NOW
A2 Bridge Design Audit                      AUTHORIZED NEXT if this audit is accepted
A2 learner-facing implementation            NOT AUTHORIZED
Build43                                     NOT AUTHORIZED
learner A2 readiness/mastery                NOT CLAIMED
CEFR certification                          NOT CLAIMED
Recovery                                    7 durable stores / backup v3
Evidence v2                                 DERIVED SHADOW ONLY
```

---

## 18. Recommendation

**Do not build “more A2 themes”. Design the smallest A2 Bridge around genuinely new task demands.**

The current product already teaches many everyday situations that a superficial A2 expansion would repeat. The honest progression is to ask the learner to do slightly more with familiar language: produce a short series, carry information across a routine exchange, retain several explicit facts from a short input, and write a short functional message.

That is meaningful A2 product progression while preserving the project’s strongest rule: never manufacture mastery, evidence or complexity merely to make the roadmap move.