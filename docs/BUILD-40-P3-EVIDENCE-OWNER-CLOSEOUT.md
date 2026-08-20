# Build 40 P3 — Evidence-owner Design Closeout

Status: **CLOSED / ACCEPTED / READ-ONLY AUDIT**

Date: 2026-08-20

## Acceptance

```text
audit document         docs/BUILD-40-P3-EVIDENCE-OWNER-DESIGN-AUDIT.md
PR #234                Docs · audit P3 evidence-owner design
accepted head          980a0afd3eaaf5ee15e07bcbf0403ba675691817
audit squash merge     cb4bb8fc1ddbdf8c6694dd5597ada86b202e2eac
PR #235                Docs · close accepted P3 evidence-owner audit
closeout head          0db28ba63f93d38f2fc6f823c4b9e98a6e392c35
closeout squash merge  5cde5d3c4d91d63aa50b98ff6b6c6d904f12f29c
scope                  docs-only
```

For PR #234, the exact-head workflow matrix completed with exactly the known five inherited failures and no new red. Codex left one P2 handoff comment; it was addressed and resolved without moving the candidate head.

For PR #235, exact-head control again returned to exactly the same five inherited baseline failures. `Build 26.1 Voice replay + Details dashboard smoke` first failed only in its Chrome dashboard step after three bounded headless-Chrome timeouts. The PR touched Markdown only, all static/sanctuary checks passed, and the unchanged failed job was rerun. Rerun job **`96423901394`** completed **SUCCESS**, including all three Chrome checks. No product patch was made.

Known inherited failures remain:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

## Accepted P3 decision

Foundations and learner-facing Transfer already compute trustworthy **source-time deterministic check observations** with stable semantic provenance.

Accepted semantic boundary:

```text
Foundations
→ capsule / concept / check identity
→ selected choice
→ success | miss

Transfer
→ lesson / family / exercise identity
→ selected choice
→ success | miss
```

A correct result proves only that the learner selected the correct answer/transformation in that deterministic activity. It does not prove free production, novel construction, long-term mastery, CEFR attainment or pronunciation quality.

A miss followed by corrective reveal may support:

```text
outcome = miss
modelShownAfterMiss = true
```

It does not support `assisted-success` without a certified assisted retry.

## Ownership verdict

```text
source-time semantic event owner      JUSTIFIED
durable persistence now               NOT JUSTIFIED
Learning Memory as concept owner      REJECTED
Error Intelligence as concept owner   REJECTED
Evidence v2 direct event writes       REJECTED under current shadow contract
new eighth durable store              REJECTED
mastery claim                         NOT AUTHORIZED
Build43 implementation number         NOT AUTHORIZED
A2                                    NOT AUTHORIZED
```

Learning Memory and Error Intelligence remain curriculum-item-oriented owners. Using a phrase item as a proxy for an Fxx concept or Transfer family would reinterpret learner history.

Evidence v2 remains the seventh Recovery store and a deterministic derived shadow of the six canonical source stores. Direct source-event writes would be an explicit Evidence contract/cutover redesign, not a harmless reuse.

No new durable store is justified before a pure event contract and source instrumentation are proven.

## Accepted next gate

P3 is closed. The next authorized proof boundary is:

```text
P3a — pure pedagogical-observation contract proof
→ schema / normalizer only
→ Foundation + Transfer unit fixtures
→ stable semantic target namespaces
→ outcome = success | miss
→ honest modelShownAfterMiss flag
→ bounded / detached / immutable output
→ no mastery / score / CEFR field
→ zero durable write
→ zero Recovery / Evidence change
→ zero learner-facing behaviour change
→ still no Build43 number
```

Only after P3a may P3b decide source instrumentation / ephemeral collection.

Only after real source observations are proven useful may P3c reconsider durability.

P4 fresh A1 readiness remains after that evidence work. A2 remains NOT AUTHORIZED.

## Product impact

None.

P3 and its closeout changed no runtime, curriculum, learner data, Recovery, Evidence schema, voice, Premium, PWA or public runtime metadata.
