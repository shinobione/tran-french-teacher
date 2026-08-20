# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-20

## Canonical checkpoint

- Repository: `shinobione/tran-french-teacher`.
- Accepted product state remains Build42.2 product merge **`8b462fae236c00b902a9312fe8e1b103412b8694`**.
- Build42 closure merge: **`8c2787d203d6089850856652f288f10a4fd53b32`**.
- Build40 P3 evidence-owner audit PR **#234** was accepted from exact head **`980a0afd3eaaf5ee15e07bcbf0403ba675691817`** and squash-merged as **`cb4bb8fc1ddbdf8c6694dd5597ada86b202e2eac`**.
- Public runtime metadata remains **v2.5.0 · Build 38**; pedagogy baseline remains **v2.3.0 · Build 34**.
- Build42 is **CLOSED / SUCCESSFUL FOUNDATIONS DEBT RESOLUTION**.
- Build40 P3 is **CLOSED / ACCEPTED READ-ONLY EVIDENCE-OWNER DESIGN AUDIT**.
- Current docs-only closeout candidate: **PR #235 — `Docs · close accepted P3 evidence-owner audit`**, branch `docs/p3-evidence-owner-closeout`.
- **Do not start P3a until PR #235 is accepted.** Live PR/GitHub is authoritative for its exact candidate head and CI/review status.

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
Build40 P3 CLOSED / ACCEPTED
Build42.3 NOT AUTHORIZED
F16 Transfer NOT AUTHORIZED
Build43   NOT AUTHORIZED
A2        NOT AUTHORIZED
```

## Build40 P3 accepted decision

Canonical audit:

```text
docs/BUILD-40-P3-EVIDENCE-OWNER-DESIGN-AUDIT.md
```

Accepted conclusion:

```text
source-time semantic event owner      JUSTIFIED
durable persistence now               NOT JUSTIFIED
Memory/Error semantic hijack          REJECTED
Evidence v2 direct source-event write REJECTED under current shadow contract
new durable store now                 REJECTED
mastery claim                         NOT AUTHORIZED
Build43 implementation number         NOT AUTHORIZED
A2                                    NOT AUTHORIZED
```

Foundations and learner-facing Transfer already compute honest deterministic success/miss observations with stable concept/family provenance. Those observations are currently ephemeral. A correct multiple-choice/check result is evidence only of that deterministic check; it is not free-production, novel-construction, long-term mastery or CEFR evidence.

A miss followed by corrective reveal may be represented as:

```text
outcome = miss
modelShownAfterMiss = true
```

It must not be promoted to `assisted-success` without a real certified retry.

Learning Memory and Error Intelligence remain curriculum-item owners and must not be repurposed for Foundation concept IDs or Transfer family IDs. Evidence v2 remains a derived shadow of the six canonical source stores; direct source-event writes would be a separate contract/cutover change.

## #234 acceptance evidence

```text
accepted head  980a0afd3eaaf5ee15e07bcbf0403ba675691817
merge          cb4bb8fc1ddbdf8c6694dd5597ada86b202e2eac
scope          3 Markdown files only
review         Codex P2 addressed/resolved without moving candidate head
CI             exact-head matrix complete; only the five inherited baseline failures remained
```

No runtime, curriculum, learner data, Recovery, Evidence schema, voice, Premium, PWA or public runtime metadata changed in P3.

## NEXT — after PR #235 acceptance

```text
P3a — pure pedagogical-observation contract proof
→ schema/normalizer + unit fixtures only
→ stable target namespaces: foundation-concept | transfer-family
→ activity kinds: foundation-check | transfer-check
→ outcome = success | miss
→ honest modelShownAfterMiss semantics
→ bounded + detached + immutable output
→ no mastery/score/CEFR field
→ zero localStorage/sessionStorage/IndexedDB write
→ zero Recovery/Evidence change
→ zero learner-facing behaviour change
→ still no Build43 number

then
P3b — source instrumentation / ephemeral collector decision

then
P3c — durability decision only after real source observations are proven useful

then
P4 — fresh A1 readiness audit
→ reconsider A2 only from the re-audited evidence reality
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
