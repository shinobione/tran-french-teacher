# A2 Bridge Design Audit — P2 fact-identity amendment

Status: **NORMATIVE REVIEW FIX FOR PR #249**

Date: 2026-08-24

This amendment is part of the A2 Bridge Design Audit candidate and **supersedes the weaker question-identity/evidence uniqueness wording in sections 8 and 15 of `docs/A2-BRIDGE-DESIGN-AUDIT.md`**.

## Why this amendment exists

Codex correctly identified that unique question IDs alone do not prove a **multi-fact** task. Two differently named questions could still test the same explicit fact/evidence item and would therefore be merely multi-question, not A2-R1 multi-fact reception.

The R1 contract must represent fact identity explicitly and reject repeated-fact activities.

## Amended future `bridgeQuestions` shape

```text
bridgeQuestions: [
  {
    id,
    factId,
    questionVi,
    questionFr,
    options,
    answer,
    evidenceItems
  }
]
```

## Normative fact rules

For the first A2-R1 pure contract proof:

```text
2–4 questions per bridge activity
question IDs stable and unique
factId mandatory on every question
factId stable and unique across the bridge activity
factId must be an accepted existing curriculum item ID
factId must belong to the dialogue accepted prerequisite source set
for the first proof, evidenceItems must equal [factId] exactly
normalized question prompt must not duplicate another question prompt
exactly one deterministic correct option per question
no inferred fact absent from the source dialogue
```

Therefore these cases MUST be rejected:

```text
two questions with different question IDs but the same factId
two questions whose evidenceItems target the same single fact
a factId outside the dialogue prerequisite source set
evidenceItems that do not equal [factId] in the first proof
duplicate normalized question prompts under different IDs
```

## Canonical pilot fact identities

For `doctor-appointment`, the three canonical fact identities are exactly:

```text
jai-mal-ventre
  → J'ai mal au ventre.

depuis-hier
  → Depuis hier.

rendez-vous-medecin
  → Je voudrais un rendez-vous avec un médecin.
```

A valid three-question pilot therefore uses **three distinct `factId` values** and proves three explicit facts from one short input.

## Amended minimum unit coverage

The later pure proof must include at least:

1. accepts the valid 3-question `doctor-appointment` fixture with three distinct fact IDs;
2. rejects fewer than 2 or more than 4 bridge questions;
3. rejects duplicate question IDs;
4. **rejects duplicate `factId` values across questions**;
5. **rejects duplicate single-fact evidence targets even when question IDs differ**;
6. **rejects duplicate normalized prompts under different IDs**;
7. rejects missing/invalid answer index;
8. rejects empty options or non-deterministic answer shape;
9. rejects empty evidence IDs;
10. rejects `factId` / evidence IDs outside accepted prerequisite source IDs;
11. rejects `evidenceItems !== [factId]` for the first proof;
12. rejects mutation/aliasing by returning detached frozen output;
13. proves existing single-question dialogue fields are not rewritten;
14. proves no storage/network/DOM API is used by the pure core.

## Boundary unchanged

This review fix does **not** authorize implementation or learner-facing A2. It changes only the design contract so that a future pure proof cannot falsely certify a repeated-single-fact task as multi-fact reception.

Still unchanged:

```text
learner-facing R1        NOT AUTHORIZED
Build43                  NOT AUTHORIZED
new lesson/item IDs      NOT AUTHORIZED
Recovery                 7 durable stores / backup v3
Evidence v2              derived shadow only
P3b durability           NOT AUTHORIZED
CEFR/A2 mastery claims   NOT AUTHORIZED
```
