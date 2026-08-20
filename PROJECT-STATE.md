# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-20

## Canonical checkpoint

- Repository: `shinobione/tran-french-teacher`.
- Current `main`: **`ef720b760db1108d98ee0090cc87f929d75676a1`** — verified GitHub squash merge of P3a PR #237.
- Accepted product state remains Build42.2 product merge **`8b462fae236c00b902a9312fe8e1b103412b8694`**.
- Build42 closure merge: **`8c2787d203d6089850856652f288f10a4fd53b32`**.
- Build40 P3 evidence-owner audit PR **#234** squash merge: **`cb4bb8fc1ddbdf8c6694dd5597ada86b202e2eac`**.
- P3 closeout PR **#235** squash merge: **`5cde5d3c4d91d63aa50b98ff6b6c6d904f12f29c`**.
- P3 final alignment PR **#236** accepted exact head **`f76e7d92d4cd88c8ad802dbedcc50821f894b135`**, squash merge **`653aa3a3fe358c7036cca661d339b82b7073cc38`**.
- P3a PR **#237** accepted exact head **`fd5c4643c3701dfb37d42789a0409c849cb97324`**, squash merge **`ef720b760db1108d98ee0090cc87f929d75676a1`**.
- Active docs-only closeout candidate: **PR #238 — `Docs · close P3a and hand off P3b`**, branch `docs/p3a-closeout`.
- Public runtime metadata remains **v2.5.0 · Build 38**; pedagogy baseline remains **v2.3.0 · Build 34**.
- Build40 P3 is **CLOSED / ACCEPTED**.
- P3a is **CLOSED / ACCEPTED PURE CONTRACT PROOF**.
- **NEXT after closeout acceptance = P3b — source instrumentation / ephemeral collector decision.**

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
Build38    CLOSED / RELEASED
Build39    CLOSED / CERTIFIED
Build40    CLOSED — A1 Productive Consolidation selected
Build41    CLOSED / SUCCESSFUL NARROW CONSOLIDATION
Build42    CLOSED / SUCCESSFUL FOUNDATIONS DEBT RESOLUTION
Build40 P3 CLOSED / ACCEPTED
P3a        CLOSED / ACCEPTED PURE CONTRACT PROOF
P3b        NEXT / NOT STARTED
Build42.3  NOT AUTHORIZED
F16 Transfer NOT AUTHORIZED
Build43    NOT AUTHORIZED
A2         NOT AUTHORIZED
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

Foundations and learner-facing Transfer already compute honest deterministic success/miss observations with stable concept/family provenance. Those observations remain trustworthy only as the result of that deterministic check; they are not free-production, novel-construction, long-term mastery or CEFR evidence.

## P3 closure evidence

```text
PR #234 audit head       980a0afd3eaaf5ee15e07bcbf0403ba675691817
PR #234 audit merge      cb4bb8fc1ddbdf8c6694dd5597ada86b202e2eac
PR #235 closeout head    0db28ba63f93d38f2fc6f823c4b9e98a6e392c35
PR #235 closeout merge   5cde5d3c4d91d63aa50b98ff6b6c6d904f12f29c
PR #236 alignment head   f76e7d92d4cd88c8ad802dbedcc50821f894b135
PR #236 alignment merge  653aa3a3fe358c7036cca661d339b82b7073cc38
#236 CI                  exactly five inherited baseline failures; no new red
#236 review              Codex P2 resolved without moving exact head
```

No runtime, curriculum, learner data, Recovery, Evidence schema, voice, Premium, PWA or public runtime metadata changed in P3 or its closeout/alignment.

## P3a — CLOSED / ACCEPTED PURE CONTRACT PROOF

Canonical contract document:

```text
docs/BUILD-40-P3A-PEDAGOGICAL-OBSERVATION-CONTRACT.md
```

Accepted owners:

```text
src/pedagogy/pedagogical-observation-core.js
tests/unit/p3a-pedagogical-observation-core.test.cjs
.github/workflows/p3a-pedagogical-observation-contract.yml
```

Contract identity:

```text
schema       french-tranquille-pedagogical-observation/v1
roadmapSlice P3a
version      1.0.0-contract
```

Authorized semantic pairs:

```text
foundation-check → foundation-concept → foundations
transfer-check   → transfer-family     → transfer
```

Accepted normalized source-time observation is limited to:

```text
at + lessonId
activityKind
target.kind + target.ids
activityId + exerciseId
outcome = success | miss
response.mode = multiple-choice
response.choice
assistance.modelShownAfterMiss
sourceOwner + sourceSlice
```

Accepted fail-closed properties:

```text
caller supplies a full timestamp with time + timezone
calendar-impossible timestamps are rejected before Date.parse
lessonId is a strict numeric integer in current 1..52 namespace
F01…F18 current Foundation namespace only
one stable Transfer family per Transfer observation
transfer activityId must equal target family
bounded fields
output detached from caller objects
recursive immutable/frozen result
no item proxy
no mastery / score / confidence / strength / CEFR state
no assisted-success
no storage/network write
```

P3a does **not** wire Foundations or Transfer to emit observations. It proves only the pure normalization boundary.

### P3a acceptance evidence

```text
PR #237 base             653aa3a3fe358c7036cca661d339b82b7073cc38
PR #237 accepted head    fd5c4643c3701dfb37d42789a0409c849cb97324
PR #237 squash merge     ef720b760db1108d98ee0090cc87f929d75676a1
P3a workflow run         32399825235 SUCCESS
scope                    exactly 6 authorized paths
review                   1×P1 + 2×P2 on original candidate, all addressed
review threads           3/3 resolved
exact-head CI            only five inherited baseline failures; no new red
Build26.1                SUCCESS
Premium V5 Coherence     SUCCESS
Real Life French III     SUCCESS
```

The three review fixes strengthened provenance without widening scope:

- malformed timestamp test aligned with fail-closed shape semantics;
- nonexistent calendar dates are rejected rather than normalized by V8;
- `lessonId` is no longer coerced and is bounded to the current 52-lesson namespace.

Recovery remains **7 stores / backup v3**. Evidence v2 remains **derived shadow only**. No learner-facing runtime behavior or public version metadata changed.

## NEXT — P3b source instrumentation / ephemeral collector decision

```text
P3b
→ map existing Foundations + Transfer source-time results into the accepted P3a contract
→ decide a bounded ephemeral runtime sink/collector
→ ZERO durable write
→ ZERO Recovery/Evidence mutation
→ ZERO mastery claim
→ still NO Build43 number

then
P3c — durability decision only after actual source observations are certified useful

then
P4 — fresh A1 readiness audit
→ reconsider A2 only from the re-audited evidence reality
```

Build39.2 abstention for `concept-review`, `foundation-capsule` and `transfer-construction` remains correct until P3b actually wires trustworthy source-time observations.

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
