# Build 40 P4 — Fresh A1 Readiness Audit

Status: **AUDIT CANDIDATE / READ-ONLY**

Date: 2026-08-24

Audited base:

```text
83cf5ed5f859f3f07e6b5037a94794bf0cdb3be3
```

Public runtime remains:

```text
v2.5.0 · Build 38
```

Pedagogy baseline remains:

```text
v2.3.0 · Build 34
```

This audit changes no runtime, curriculum, learner data, storage, Recovery, Evidence, voice, Premium, PWA or public metadata. It makes no CEFR certification claim and does not claim that Trân is learner-level A2-ready.

---

## 1. Question

Build40 originally rejected opening A2 because French Trân’quille already had broad practical A1 content while productive generalization and trustworthy evidence were much narrower.

It selected the following audit-first sequence:

```text
P1 productive-family audit
P2 F16 à/de contractions audit
P3 evidence-owner design
P3a pure observation contract proof
P3b source instrumentation / ephemeral collector decision
P3c durability decision if justified
P4 fresh A1 readiness audit
```

P4 now asks:

> After the actual accepted Build41, Build42 and P3a/P3b/P3c work, is further A1 implementation still the smallest honest roadmap move, or is the product mature enough to open a bounded A2 **scope/design audit** without pretending A1 mastery or learner A2 readiness?

This is a product-roadmap gate, not a learner certification gate.

---

## 2. Sources reviewed

Canonical product and audit sources include:

```text
AGENTS.md
PROJECT-STATE.md
MASTER-ROADMAP.md

docs/BUILD-40-A1-CONSOLIDATION-AUDIT.md
docs/BUILD-41.1-PRODUCTIVE-FAMILY-AUDIT.md
docs/BUILD-41-MILESTONE-CLOSURE-AUDIT.md
docs/BUILD-42-MILESTONE-CLOSURE-AUDIT.md
docs/BUILD-39.2-LEARNER-EVIDENCE-ADAPTER.md
docs/BUILD-39.5-PRACTICE-ADVISORY-CLOSEOUT.md
docs/BUILD-40-P3C-DURABILITY-DECISION-AUDIT.md

src/pedagogy/generalization-transfer-lesson.js
src/pedagogy/foundations-pilot.js
```

P4 also preserves the repository’s locked historical learner continuity:

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

That continuity is important because product-roadmap permission must not be confused with a claim that the current learner has completed A1.

---

## 3. What changed since the original Build40 audit

### 3.1 Productive construction widened from five to six certified families

Build40 audited five learner-facing deterministic Transfer families:

```text
subject substitution
affirmation → negation
present → futur proche
singular → plural nominal phrase
nous → spoken on
```

Build41 then audited seven candidate areas under strict admission criteria. Exactly one additional family passed honestly:

```text
present-je-regular-action
→ recent-past-je-venir-de
```

Accepted learner-facing catalog:

```text
Je travaille.          → Je viens de travailler.
Je mange.              → Je viens de manger.
Je rentre à la maison. → Je viens de rentrer à la maison.
```

The current Transfer renderer therefore exposes **six** deterministic learner-facing families.

This is a real improvement in productive depth, but still deliberately narrow. It is not broad free production and it is not mastery evidence.

### 3.2 The prioritized candidate set was actually exhausted, not abandoned

Build41.1 did not merely implement one convenient family and ignore the rest. It audited all seven Build40 priorities:

| Candidate | Accepted audit result |
|---|---|
| Questions | **REJECT — TOO SEMANTIC / AMBIGUOUS** |
| Past-time recombination | **IMPLEMENTABLE — narrow recent-past selected** |
| Articles / quantities / F16 | **DEFER — NEEDS BETTER SOURCES** |
| Possessives | **ALREADY COVERED / DUPLICATE** |
| Adjective agreement | **DEFER — NEEDS BETTER SOURCES** |
| Short narration | **REJECT — TOO SEMANTIC / AMBIGUOUS** |
| Opinion clauses | **REJECT — TOO SEMANTIC / AMBIGUOUS** |

Therefore “add another Transfer family” is not an automatically justified continuation. Reopening a rejected candidate without new source evidence would either disguise semantic choice as a mechanical transform, duplicate an existing lesson, or invent untaught forms.

### 3.3 F16 teaching debt is resolved

At Build40, F16 `à / de contractions` was the clearest explicit Foundations debt.

Build42.1 mapped the real curriculum and selected lesson38 as a safe teaching placement. Build42.2 now teaches the complete mechanical system:

```text
à + le   → au
à + les  → aux
de + le   → du
de + les → des

à la / à l’ / de la / de l’ remain uncontracted
```

The capsule explicitly protects the distinction between contraction `du/des` and lesson22 partitives.

Accepted current state:

```text
F16 teaching debt      RESOLVED
F16 mastery evidence   NOT CLAIMED
F16 productive Transfer NOT AUTHORIZED
```

Build42 correctly found no clean learner-facing `aux` source item and no equally clean contraction-`des` source pair. Build42.2 teaching recombinations do not retroactively become source evidence for productive Transfer.

### 3.4 Evidence reality is better understood, but not durably widened

Build39.2 still has reliable durable support for:

```text
phrase-retrieval
listening
scenario
```

and must still abstain for:

```text
concept-review
foundation-capsule
transfer-construction
```

P3a proved a bounded semantic observation contract. P3b wired actual Foundation/Transfer check outcomes into a bounded in-memory FIFO. P3c then audited the real events and concluded:

```text
raw event truth                trustworthy at event level
cross-session durability       not justified
independence aggregation       not authorized
concept attribution            not yet sufficient
new eighth store               not justified
Evidence-v2 direct source write rejected under shadow contract
```

This means the project’s epistemic position improved materially: it can now observe what happened in a deterministic check honestly during the session, and it can explain exactly why that observation is **not** durable mastery evidence.

The correct conclusion is not “evidence work failed”. The correct conclusion is that the uncertainty has been bounded without persistence-first architecture.

---

## 4. Fresh A1 capability verdict

### Content breadth

**STRONG / SUFFICIENT FOR CURRENT PRODUCT ROADMAP GATE.**

The 52-lesson / 313-item curriculum already spans the practical A1 territory identified by Build40: survival, politeness, food, shopping, directions, transport, time, health, social exchange, housing, telephone, administration, work, present systems, futur proche, recent past, starter passé composé, questions, negation, quantities, comparison, invitations/refusal, service problems, narration seed, opinion and spoken `on`.

No current source audit identifies a major thematic hole whose absence blocks an A2 **design audit**.

### Foundations

**STRONGER / EXPLICIT TEACH-CORE DEBT RESOLVED.**

The current learner-facing Foundation adapter includes F16 at lesson38 in addition to the previously accepted F01–F04, F11, F08, F05, F13 and F12 placements.

Foundation completion remains optional and ephemeral, so this is teaching readiness rather than concept-mastery proof.

### Productive construction

**MATERIALLY IMPROVED, STILL NARROW.**

Six certified deterministic families are meaningfully better than the original five. More importantly, the prioritized next-family set has been audited and no second safe Build41 family remains authorized from current sources.

P4 therefore rejects the idea that A1 must accumulate arbitrary additional deterministic transforms merely to satisfy a numeric breadth target.

### Contextual production and comprehension

**STRONG FOR CURRENT A1 PRODUCT.**

Scenario remains a guided contextual-production layer with 44 situations / 132 turns and reliable miss/assistance evidence. Listening remains 17 contrast families / 18 contextual dialogues with reliable observed-need evidence. Speaking Loop covers 52/52 lessons as oral rehearsal without fake pronunciation/mastery scoring.

### Adaptive evidence

**RELIABLE IN THREE FAMILIES; DELIBERATELY LIMITED ELSEWHERE.**

Current LI3 advice remains valid for phrase retrieval, listening and scenario. Foundation/Transfer observations are useful event truth but are not durable adaptive evidence.

That limitation must remain visible. It does not require inventing a storage implementation before A2 curriculum scope can even be studied.

---

## 5. Important distinction: product A2 scope vs learner A2 readiness

P4 separates two questions that must not be collapsed.

### Product-roadmap question

> Is the current A1 product mature enough that the next **design/audit** may study A2 scope rather than forcing more A1 implementation?

**YES.**

The current A1 implementation is broad, the highest-priority explicit Foundation debt is resolved, productive construction has widened, the candidate backlog has been honestly exhausted under the deterministic contract, and evidence limitations are now explicit rather than unknown.

### Learner-readiness question

> Does this prove that Trân has mastered A1 or should automatically enter A2?

**NO.**

The repository preserves only the locked historical continuity:

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

No repository evidence proves end-of-A1 learner mastery. LI3 deliberately cannot infer concept/Transfer mastery. P3b events are ephemeral. Therefore P4 authorizes **no learner unlock, no CEFR claim, no mastery badge and no automatic A2 routing**.

Product design may plan ahead without pretending the learner has arrived there.

---

## 6. P4 decision

### A1 Productive Consolidation

```text
SUFFICIENT FOR CURRENT PRODUCT ROADMAP GATE
NO FURTHER A1 IMPLEMENTATION AUTO-AUTHORIZED
```

This does not mean “A1 is complete in every linguistic sense”. It means the currently identified A1 debts have reached a rational stopping boundary:

- the one admissible new deterministic family was implemented;
- F16 teaching debt was resolved;
- rejected/deferred candidates remain blocked by real source/semantic constraints rather than unfinished coding;
- evidence architecture was explored to the honest no-durability boundary;
- no fresh source evidence currently justifies reopening those rejected/deferred candidates.

### A2

P4 distinguishes **audit permission** from **implementation permission**:

```text
A2 scope / entry audit          AUTHORIZED NEXT
A2 learner-facing implementation NOT AUTHORIZED
Build43 implementation number  NOT AUTHORIZED
A2 learner mastery/readiness    NOT CLAIMED
```

This is the smallest non-circular next move. Blocking even an A2 scope audit until durable concept/Transfer evidence exists would create an artificial deadlock after P3c already proved that persistence is not currently justified.

### Storage / evidence

Unchanged:

```text
Recovery             7 durable stores / backup v3
Evidence v2          derived shadow only
P3b observation FIFO ephemeral only
new durable store    NOT AUTHORIZED
Evidence read cutover NOT AUTHORIZED
```

---

## 7. Next authorized slice

After P4 is accepted, the next slice should be a **docs/read-only A2 Entry Scope Audit**.

Purpose:

- define the first genuinely A2 capabilities that are not simply missing A1 repairs;
- identify prerequisites already present in the current 52/313 curriculum;
- prevent duplication of existing late-A1 content;
- define what belongs to A2 scope versus future A1 refinement;
- decide whether a new curriculum extension is justified at all;
- decide sequencing and gating without renumbering/reinterpreting the existing 52 lessons;
- keep learner-facing delivery separate from product roadmap design;
- keep Build43 unnumbered/unimplemented until that audit proves a concrete implementation slice.

The A2 Entry Scope Audit must **not**:

```text
add lessons
renumber current lessons
change 313 item semantics
unlock A2 for Trân
claim CEFR A1 completion
claim A2 readiness
persist P3b observations
promote Foundation/Transfer into LI3
cut Evidence v2 over to product truth
create Build43 merely because P4 opened design work
```

---

## 8. Reopening A1 work later

P4 does not permanently forbid future A1 refinement.

A rejected/deferred A1 family may be reopened only if new real product/learner sources change its original audit premise, for example:

- new already-taught source forms make a previously deferred transform deterministic without new vocabulary;
- field use exposes a concrete recurring A1 gap not handled by current Review/Listening/Scenario/Foundations/Transfer;
- a future evidence consumer justifies revisiting P3c durability prerequisites.

No arbitrary numeric lesson-progress or time threshold is invented here.

---

## 9. P4 candidate verdict

```text
A1 thematic breadth                    SUFFICIENT FOR CURRENT ROADMAP GATE
A1 Productive Consolidation            SUFFICIENT / RATIONAL STOP BOUNDARY
Transfer families                      6 learner-facing deterministic families
F16 explicit teaching debt             RESOLVED
rejected/deferred A1 candidates        REMAIN HONESTLY BLOCKED FROM CURRENT SOURCES
phrase/listening/scenario evidence     RELIABLE AS BEFORE
Foundation/Transfer event truth        TRUSTWORTHY EPHEMERAL OBSERVATION
Foundation/Transfer durable evidence   UNAVAILABLE
cross-session observation durability   NOT JUSTIFIED
A2 scope / entry audit                 AUTHORIZED NEXT
A2 learner-facing implementation       NOT AUTHORIZED
Build43                                NOT AUTHORIZED
A2 learner readiness/mastery           NOT CLAIMED
Recovery                               7 durable stores / backup v3
Evidence v2                            DERIVED SHADOW ONLY
```

---

## 10. Final recommendation

**Close the A1 Productive Consolidation roadmap gate at its current honest boundary and authorize only an A2 Entry Scope Audit next.**

Do not force another A1 transform merely to make the family count larger. Do not turn ephemeral Foundation/Transfer events into durability merely to manufacture a stronger readiness signal. Do not interpret product-roadmap permission as learner readiness.

The next question is now architectural/curricular:

> What is the smallest genuinely new A2 scope that extends the current 52-lesson A1 product without duplicating it or weakening its evidence boundaries?

That question belongs to the next audit, not to P4 implementation.