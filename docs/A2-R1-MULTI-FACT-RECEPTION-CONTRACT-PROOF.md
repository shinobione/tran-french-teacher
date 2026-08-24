# A2-R1 Pure Multi-Fact Reception Contract Proof — French Trân’quille

Status: **IMPLEMENTATION CANDIDATE / PURE CONTRACT ONLY**

Date: 2026-08-24

Audited/implementation base:

```text
6e78789f6f63b87a2b0c0d4acd62de4701b5083d
```

That base is the verified squash merge of PR #250, closing the accepted A2 Bridge Design Audit.

Public runtime remains **v2.5.0 · Build 38**. Pedagogy baseline remains **v2.3.0 · Build 34**. Curriculum remains **52 lessons / 313 items**.

This proof does **not** load into the learner runtime. It adds no learner-facing A2, no lesson, no item, no navigation, no storage and no evidence write.

---

## 1. Mission

Prove the narrow deterministic contract required before any later learner-facing A2-R1 integration decision:

> Can one short existing Listening dialogue be represented as a validated 2–4 question activity that genuinely tests several distinct explicit facts, without semantic grading, source mutation, runtime integration or persistence?

The proof must distinguish **multi-fact** from merely **multi-question**.

---

## 2. Accepted predecessor design

PR #249 selected **A2-R1 — multi-fact short reception** as the first bridge lane.

Canonical pilot:

```text
dialogue                doctor-appointment
prerequisite lesson     l45 — Santé & rendez-vous médical
fact/source item IDs    jai-mal-ventre / depuis-hier / rendez-vous-medecin
```

Codex review on #249 established the normative fact-identity rule:

```text
question.factId mandatory
factId unique across activity
factId must belong to accepted prerequisite/source set
first proof evidenceItems MUST equal [factId] exactly
duplicate normalized prompts rejected
```

This proof implements exactly that boundary and nothing learner-facing beyond it.

---

## 3. New pure owner

```text
src/pedagogy/a2-reception-bridge-core.js
```

Browser/CommonJS API:

```text
FrenchTranquilleA2ReceptionBridgeCore
```

Metadata:

```text
roadmapSlice  A2-R1-pure-contract-proof
version       1.0.0-contract
schema        french-tranquille-a2-r1-reception/v1
lane          A2-R1
```

Primary pure operations:

```text
normalizeActivity(activity, authority)
evaluateQuestion(plan, questionId, choiceIndex)
```

The `authority.allowedFactIds` input is deliberately separate from the candidate activity. An activity therefore cannot self-authorize an arbitrary fact ID merely by placing it in its own prerequisite list.

---

## 4. Normalized activity contract

A valid normalized plan has this conceptual shape:

```text
{
  schema,
  lane: 'A2-R1',
  id,
  source: {
    kind: 'listening-dialogue',
    dialogueId,
    prerequisiteLessonId,
    prerequisiteItemIds
  },
  questions: [
    {
      id,
      factId,
      questionVi,
      questionFr,
      options: [{ vi, fr }, ...],
      answer,
      evidenceItems: [factId]
    }
  ]
}
```

Question count:

```text
minimum 2
maximum 4
```

Option count per question:

```text
minimum 2
maximum 4
```

---

## 5. Multi-fact invariants

The pure owner rejects:

```text
duplicate question IDs
duplicate factId values
duplicate normalized French prompts
duplicate normalized Vietnamese prompts
fact IDs outside explicit contract authority
fact IDs outside the activity prerequisite source set
prerequisite IDs outside explicit contract authority
missing / multiple evidence IDs for the first proof
evidenceItems not exactly equal to [factId]
invalid answer indexes
empty or malformed options
invalid stable IDs
fewer than 2 or more than 4 questions
```

This is the critical distinction:

```text
3 differently named questions → NOT ENOUGH
3 distinct authorized factId values → REQUIRED
```

---

## 6. Canonical doctor-appointment fixture

The valid proof fixture contains three questions, one per explicit existing fact:

```text
factId: jai-mal-ventre
→ symptom / body location

factId: depuis-hier
→ duration / start time

factId: rendez-vous-medecin
→ requested next action
```

No new vocabulary or grammar is introduced.

The existing Listening source remains single-question and unchanged. This pure fixture proves only that a future integration **could** carry several deterministic questions over one short source; it does not mutate the source today.

---

## 7. Evaluation boundary

`evaluateQuestion(...)` returns only:

```text
questionId
factId
choiceIndex
answerIndex
outcome = success | miss
```

It does **not** return or infer:

```text
mastery
A2 readiness
CEFR level
score
confidence
listening mastery
unseen transfer
independent durable evidence
```

A correct question answer means only that the selected option matched the canonical answer for that deterministic question.

---

## 8. Immutability / purity boundary

`normalizeActivity(...)` builds detached objects and deeply freezes the normalized output.

The proof explicitly checks that mutating the original fixture after normalization does not mutate the returned plan.

The core has no ownership of:

```text
DOM
localStorage
IndexedDB
network
navigator/media APIs
Learning Memory
Error Intelligence
Evidence v2
P3b observations
learner routing
curriculum mutation
Listening source mutation
```

The dedicated workflow guards these exclusions.

---

## 9. Unit coverage

Canonical unit suite:

```text
tests/unit/a2-r1-reception-bridge-core.test.cjs
```

It covers:

1. accepts the valid three-fact doctor fixture;
2. preserves source input and returns detached/deeply frozen output;
3. evaluates deterministic `success` and `miss` only;
4. rejects fewer than 2 / more than 4 questions;
5. rejects duplicate question IDs;
6. rejects duplicate fact IDs;
7. rejects repeated/mismatched fact evidence targets;
8. rejects duplicate normalized FR/VI prompts;
9. rejects invalid answer indexes;
10. rejects invalid/empty options;
11. rejects empty evidence shape;
12. rejects facts outside contract authority;
13. rejects prerequisites outside contract authority;
14. rejects missing contract authority;
15. rejects unknown question / invalid choice / invalid plan evaluation;
16. proves a representative existing single-question source-field object remains unchanged.

---

## 10. Dedicated CI

```text
.github/workflows/a2-r1-reception-contract.yml
```

Workflow name:

```text
A2-R1 Pure multi-fact reception contract
```

Guards:

```text
Node syntax + deterministic unit contract
pure-core forbidden API guard
existing Listening/curriculum source immutability guard
narrow candidate scope guard
permanent sanctuary guard
no learner-facing/runtime integration guard
```

Protected source paths include:

```text
src/pedagogy/listening-data.js
src/pedagogy/listening-data-2.js
src/pedagogy/listening-engine.js
src/pedagogy/curriculum-stage4.js
```

Permanent sanctuaries remain untouched.

---

## 11. Explicit non-goals

This proof does **not** authorize or implement:

```text
learner-facing R1 UI
Listening engine integration
Listening source mutation
new curriculum lesson/item
lesson renumbering
new A2 route or unlock
Build43
localStorage / IndexedDB / network
Memory / Error Intelligence writes
Evidence v2 writes/read cutover
P3b durability
new durable store
CEFR certification
learner A2 readiness/mastery
```

Recovery remains **7 durable stores / backup v3**. Evidence v2 remains **derived shadow only**.

---

## 12. Acceptance meaning

If this candidate is accepted, the only proven statement is:

> French Trân’quille has a pure deterministic contract capable of validating a bounded A2-R1 multi-fact reception activity with distinct authorized fact identities.

It would **not** mean that any learner can see or use A2-R1 yet.

---

## 13. Next gate if accepted

Authorize only a later **A2-R1 Integration Decision Audit — docs/read-only**.

That audit must decide before any learner-facing code:

1. whether the pure R1 contract should actually be integrated into Listening;
2. whether bridge questions should live beside or outside existing dialogue data;
3. exact unlock semantics without claiming learner A2 readiness;
4. correction/transcript reveal flow across multiple questions;
5. replay semantics across a multi-question sequence;
6. whether item-level Memory/Error writes remain honest for individual R1 question outcomes;
7. whether any new observation/evidence owner is needed at all;
8. mobile/iPhone interaction and accessibility constraints;
9. migration/backward-compatibility constraints;
10. exact field/CI gates for a later integration candidate.

Still not authorized after pure-proof acceptance:

```text
learner-facing R1
Build43
new lesson IDs
new durable store
Evidence v2 cutover
learner A2 unlock
CEFR certification
```

---

## 14. Candidate verdict

```text
pure A2-R1 contract owner            IMPLEMENTED AS CANDIDATE
distinct fact identity               ENFORCED
2–4 deterministic questions          ENFORCED
canonical doctor fixture             COVERED
source/prerequisite authority        EXTERNAL / ENFORCED
evidenceItems == [factId]            ENFORCED FOR FIRST PROOF
detached/deeply frozen output        ENFORCED
deterministic success|miss only      ENFORCED
runtime integration                  NOT PRESENT
storage/evidence writes              NOT PRESENT
curriculum mutation                  NOT PRESENT
learner-facing A2                    NOT AUTHORIZED
Build43                              NOT AUTHORIZED
next if accepted                     A2-R1 Integration Decision Audit / DOCS-READ-ONLY
```
