# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-20

## Canonical checkpoint

- Repository: `shinobione/tran-french-teacher`.
- Current verified `main`: **`7bb9d4ab52d6402121d75c63a8c1042030c1c856`** — accepted P3a final-alignment squash merge from PR **#239**.
- Active implementation candidate: **PR #240 — `P3b · observe source checks in bounded ephemeral memory`**, branch **`p3b/source-observation-ephemeral`**.
- The exact moving P3b candidate head is intentionally kept in live PR metadata to avoid a self-referential checkpoint SHA loop.
- Accepted product state remains Build42.2 product merge **`8b462fae236c00b902a9312fe8e1b103412b8694`**.
- Build42 closure merge: **`8c2787d203d6089850856652f288f10a4fd53b32`**.
- Build40 P3 evidence-owner audit PR **#234** squash merge: **`cb4bb8fc1ddbdf8c6694dd5597ada86b202e2eac`**.
- P3 closeout PR **#235** squash merge: **`5cde5d3c4d91d63aa50b98ff6b6c6d904f12f29c`**.
- P3 final alignment PR **#236** accepted exact head **`f76e7d92d4cd88c8ad802dbedcc50821f894b135`**, squash merge **`653aa3a3fe358c7036cca661d339b82b7073cc38`**.
- P3a PR **#237** accepted exact head **`fd5c4643c3701dfb37d42789a0409c849cb97324`**, squash merge **`ef720b760db1108d98ee0090cc87f929d75676a1`**.
- P3a closeout PR **#238** accepted exact head **`a3814d5560c25d7cedaceaa57ff508db05a52de0`**, squash merge **`ba2225cfb5e8864bd757620d22cfed333c757d82`**.
- P3a final-alignment PR **#239** accepted exact head **`659b820e0ba06691a93f463f8061855b182a87ed`**, squash merge **`7bb9d4ab52d6402121d75c63a8c1042030c1c856`**.
- Live GitHub remains authoritative for branch tips and the current open/merged state of temporary candidate/control PRs.
- Public runtime metadata remains **v2.5.0 · Build 38**; pedagogy baseline remains **v2.3.0 · Build 34**.
- Build40 P3 is **CLOSED / ACCEPTED**.
- P3a is **CLOSED / ACCEPTED PURE CONTRACT PROOF**.
- P3b is **ACTIVE CANDIDATE / EPHEMERAL SOURCE-OBSERVATION PROOF**.
- **NEXT only after PR #240 acceptance = P3c — durability decision.**

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
P3b        ACTIVE CANDIDATE / EPHEMERAL SOURCE-OBSERVATION PROOF
P3c        NOT STARTED / NOT AUTHORIZED BEFORE P3b ACCEPTANCE
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

P3a does **not** itself wire Foundations or Transfer to emit observations. It proves the pure normalization boundary consumed by P3b.

### P3a acceptance and closeout evidence

```text
PR #237 base             653aa3a3fe358c7036cca661d339b82b7073cc38
PR #237 accepted head    fd5c4643c3701dfb37d42789a0409c849cb97324
PR #237 squash merge     ef720b760db1108d98ee0090cc87f929d75676a1
P3a workflow run         32399825235 SUCCESS
PR #237 scope            exactly 6 authorized paths
PR #237 review           1×P1 + 2×P2 on original candidate, all addressed
PR #237 threads          3/3 resolved
PR #238 accepted head    a3814d5560c25d7cedaceaa57ff508db05a52de0
PR #238 squash merge     ba2225cfb5e8864bd757620d22cfed333c757d82
PR #238 scope            exactly 2 Markdown files
PR #238 review           1×P2 resolved: LI3 abstention stays locked through P3b
PR #238 exact-head CI    only five inherited baseline failures after two unchanged flake reruns
PR #239 accepted head    659b820e0ba06691a93f463f8061855b182a87ed
PR #239 squash merge     7bb9d4ab52d6402121d75c63a8c1042030c1c856
PR #239 review           1×P2 resolved; resumable volatile checkpoint retained without self-SHA loop
PR #239 exact-head CI    only five inherited baseline failures after unchanged Build26.1 Chrome rerun
```

Recovery remains **7 stores / backup v3**. Evidence v2 remains **derived shadow only**. No learner-facing public version metadata changed.

## P3b — ACTIVE CANDIDATE / EPHEMERAL SOURCE-OBSERVATION PROOF

Canonical candidate document:

```text
docs/BUILD-40-P3B-SOURCE-OBSERVATION-EPHEMERAL.md
```

Candidate runtime owner:

```text
src/pedagogy/pedagogical-observation-runtime.js
```

Candidate behavior:

```text
source-time timestamp captured at learner choice
wait for existing synchronous source renderer
record only when selected source result is rendered ok | bad
Foundation → foundation-check / foundation-concept / foundations
Transfer   → transfer-check / transfer-family / transfer
miss       → modelShownAfterMiss=true
success    → modelShownAfterMiss=false
capacity   → 64 accepted normalized observations FIFO
persistence=false
durableWrite=false
masteryClaim=false
```

The collector normalizes through the accepted P3a core. Invalid source shape is rejected and not collected. When the existing source renderer does not confirm a result, P3b abstains and records nothing.

The candidate deliberately leaves these accepted source owners byte-identical:

```text
src/pedagogy/pedagogical-observation-core.js
src/pedagogy/foundations-capsule-engine.js
src/pedagogy/foundations-pilot.js
src/pedagogy/generalization-transfer-lesson.js
```

`src/core/build32-loader.js` is the only existing runtime file changed: it loads P3a contract → P3b runtime before the existing Foundation/Transfer sources. Public runtime metadata remains v2.5.0 · Build 38.

Explicit P3b non-ownership remains locked:

```text
ZERO Learning Memory write
ZERO Error Intelligence write
ZERO Evidence v2 write
ZERO Recovery/backup mutation
ZERO localStorage/sessionStorage/IndexedDB persistence
ZERO network persistence
ZERO mastery/score/CEFR claim
ZERO Build39.2 availability promotion
```

Build39.2 abstention therefore remains correct **through P3b**:

```text
concept-review        unavailable
foundation-capsule    unavailable
transfer-construction unavailable
```

### P3b candidate control boundary

PR **#240** is the active candidate. This implementation session publishes the candidate and stops. Full exact-head CI/review arbitration, any flake classification/rerun, merge, and canonical closeout belong to the next control session.

Only if PR #240 is accepted:

```text
NEXT = P3c — durability decision
```

P3c must decide from actual observation usefulness whether any durable architecture is justified. P3b itself does not authorize persistence.

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
