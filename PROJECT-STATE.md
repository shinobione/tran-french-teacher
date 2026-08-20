# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-20

## Canonical checkpoint

- Repository: `shinobione/tran-french-teacher`.
- Accepted product state remains Build42.2 product merge **`8b462fae236c00b902a9312fe8e1b103412b8694`**.
- Build42 closure merge: **`8c2787d203d6089850856652f288f10a4fd53b32`**.
- Accepted final Build42 docs checkpoint / audited P3 base: **`22f4d5d5e3c111c14255b4e8a80a320cfa2c9469`**.
- Public runtime metadata remains **v2.5.0 · Build 38**; pedagogy baseline remains **v2.3.0 · Build 34**.
- Build42 is **CLOSED / SUCCESSFUL FOUNDATIONS DEBT RESOLUTION**.
- Current candidate: **PR #234 — `Docs · audit P3 evidence-owner design`**, branch `docs/p3-evidence-owner-audit`.
- P3 remains read-only/docs-only; live PR/GitHub is authoritative for the exact candidate head.

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

## Historical learner continuity — LOCKED

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

## Milestone state

```text
Build38   CLOSED / RELEASED
Build39   CLOSED / CERTIFIED
Build40   CLOSED — A1 Productive Consolidation selected
Build41   CLOSED / SUCCESSFUL NARROW CONSOLIDATION
Build42   CLOSED / SUCCESSFUL FOUNDATIONS DEBT RESOLUTION
Build42.3 NOT AUTHORIZED
F16 Transfer NOT AUTHORIZED
A2        NOT AUTHORIZED
```

## P3 evidence-owner audit — candidate verdict

Canonical candidate audit:

```text
docs/BUILD-40-P3-EVIDENCE-OWNER-DESIGN-AUDIT.md
```

### What is now genuinely observable

Foundations and learner-facing Transfer already compute real source-time deterministic outcomes.

Foundations ephemeral session:

```text
capsuleId
concept ids
checkId
choice
correct
correctAnswer
```

Transfer ephemeral session/route:

```text
lesson
family id
exercise identity
choice
correct
source/target transformation provenance
```

These are honest **success/miss observations for deterministic choice/check activities**. They are not proof of free production, novel construction, long-term mastery or CEFR level.

A miss that reveals corrective feedback supports `miss + modelShownAfterMiss`; it does not support `assisted-success` because there is no certified assisted retry.

### Current durable owners are not semantically suitable

```text
Learning Memory
→ curriculum-item IDs only
→ trustworthy phrase/item owner
→ NOT a Foundation concept or Transfer family owner

Error Intelligence
→ curriculum-item IDs only
→ trustworthy item/listening/scenario observed-need owner
→ NOT a Foundation concept or Transfer family owner

Evidence v2
→ seventh Recovery store
→ derived shadow of the original six canonical stores
→ construction / transfer / concept-understanding not reconstructable from current sources
→ direct source-event writes would violate the accepted shadow contract
```

### Candidate P3 decision

```text
source-time semantic event owner     JUSTIFIED
durable persistence now              NOT JUSTIFIED
direct Memory/Error reuse            REJECTED
direct Evidence v2 event writes       REJECTED under current shadow contract
new eighth store now                  REJECTED
mastery claim                         NOT AUTHORIZED
Build43 implementation number         NOT AUTHORIZED
A2                                     NOT AUTHORIZED
```

The missing abstraction is a bounded **pedagogical observation contract** with non-item semantic targets such as `foundation-concept` and `transfer-family`.

## NEXT if PR #234 is accepted

```text
P3a — pure pedagogical-observation contract proof
→ schema/normalizer + fixtures/tests only
→ stable Foundation concept / Transfer family target namespaces
→ success | miss + honest model-shown-after-miss semantics
→ immutable/bounded output
→ zero durable write
→ zero Recovery/Evidence change
→ zero learner-facing behaviour change
→ still no Build43 number

then, only after P3a proof
P3b — source instrumentation / ephemeral collector decision

then, only after actual source observations are proven
P3c — durability decision
→ explicit Evidence contract/cutover redesign OR separately justified durable owner
→ neither authorized yet

P4 — fresh A1 readiness audit
→ only after trustworthy concept/Transfer evidence actually exists
```

## Locked boundaries

- no fake pronunciation score;
- recognition failure is not mastery evidence;
- no learner-data reset/renumber/reinterpretation;
- Recovery remains 7 stores / backup v3;
- Evidence v2 remains derived shadow until explicit future cutover;
- no durable store/schema merely to manufacture intelligence;
- preserve 52 lesson IDs / 313 item semantics;
- productive F16 Transfer remains NOT AUTHORIZED;
- durable Foundation/Transfer mastery remains NOT CLAIMED;
- Build43 and A2 remain NOT AUTHORIZED.

## CI baseline

Known persistent inherited failures:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Any other failure is NEW until classified.
