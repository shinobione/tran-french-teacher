# Build 40 P3c — Pedagogical Observation Durability Decision Audit

Status: **AUDIT CANDIDATE / READ-ONLY**

Date: 2026-08-24

Audited base:

```text
b72d9c2cd84783c03ae73b627773b896d2378702
```

This audit changes no runtime, storage, curriculum, learner data, Recovery, Evidence schema, UI, voice, Premium, PWA or public runtime metadata.

## 1. Question

P3a proved a bounded semantic observation contract. P3b then wired the existing learner-facing Foundation and Transfer checks into a bounded in-memory FIFO without durable writes.

P3c answers the deliberately postponed question:

> Are the real P3b observations now sufficient and useful enough to justify cross-session durability, and if so can an existing durable owner hold them without semantic hijack or Recovery/Evidence contract breakage?

This is a durability **decision/audit**, not an authorization to persist.

## 2. Sources audited

```text
src/pedagogy/pedagogical-observation-core.js
src/pedagogy/pedagogical-observation-runtime.js
src/pedagogy/foundations-capsule-engine.js
src/pedagogy/foundations-pilot.js
src/pedagogy/generalization-transfer-lesson.js
src/pedagogy/learning-memory.js
src/pedagogy/error-intelligence.js
src/pedagogy/memory-evidence-v2-core.js
src/pedagogy/learner-evidence-adapter.js

docs/BUILD-40-P3-EVIDENCE-OWNER-DESIGN-AUDIT.md
docs/BUILD-40-P3A-PEDAGOGICAL-OBSERVATION-CONTRACT.md
docs/BUILD-40-P3B-SOURCE-OBSERVATION-EPHEMERAL.md
docs/BUILD-36-2-EVIDENCE-SHADOW-ADOPTION.md
PROJECT-STATE.md
MASTER-ROADMAP.md
```

## 3. What P3b now proves

The accepted P3b runtime produces honest **source-time event observations** from the existing learner-facing result surfaces.

For each accepted event it preserves:

```text
at
lessonId
activityKind
semantic target kind + ids
activityId
exerciseId
outcome = success | miss
selected multiple-choice response
modelShownAfterMiss
sourceOwner
sourceSlice
```

The runtime does not independently recalculate correctness. It waits for the existing renderer and records only when the selected answer is rendered `ok` or `bad`.

The collector remains:

```text
capacity       64
persistent     false
durableWrite   false
masteryClaim   false
```

This is enough to trust an individual record as a statement of **what happened in that deterministic check at that source time**.

## 4. What P3b still does not prove

P3b does not turn a deterministic multiple-choice check into:

```text
free production
novel unseen transfer
long-term mastery
CEFR attainment
pronunciation quality
independent evidence merely because another event exists
```

The current learner-facing activities intentionally use fixed check/exercise sets.

### Foundation replay semantics

A Foundation question can be answered only once inside one open capsule session: the engine rejects a second answer and the rendered choices are disabled after the first response.

However reopening the capsule creates a new ephemeral session and replays the same stable checks. P3b has no durable session identity or attempt-group identity.

Therefore two events with the same `checkId` at different timestamps are two real attempts, but they must **not automatically be counted as two independent pieces of learning evidence**.

### Transfer replay semantics

Transfer behaves similarly: one answer per displayed question, then disabled choices, but reopening the activity resets the session and replays the same three fixed exercises for the route.

The stable `exerciseId` makes the repeated exercise detectable, but P3b has no certified rule saying when replay of the same fixed exercise becomes independent evidence.

## 5. Independence is not yet a durable contract

Build39.2 already distinguishes total evidence from `independentEvidenceCount`. P3/P3b also explicitly warned that one owner producing several events is not several independent owners.

P3c finds no accepted policy today for:

```text
same exercise replay across sessions
minimum temporal spacing
same-session vs later-session grouping
multiple events from one source owner
when distinct exercise IDs count as independent
when repeated success after answer exposure remains contaminated by model familiarity
```

The timestamp makes future recency/spacing analysis possible; it does not itself define a spacing threshold.

P3c therefore does **not** invent an arbitrary hour/day/session threshold.

## 6. Foundation concept attribution is still wider than one check

The P3a contract correctly allows a Foundation observation to target multiple concept IDs because accepted capsules may group concepts, notably F01–F04.

That preserves honest capsule provenance, but it creates an aggregation question:

> Does success on one check support every concept listed by the capsule equally?

The current contract does not include a per-check concept-coverage map. Persisting the raw event is semantically possible, but turning it into per-concept durable need/mastery evidence would require a separate attribution policy that does not exist today.

P3c therefore rejects equal automatic credit/debit across every concept in a multi-concept capsule.

## 7. Existing durable owners remain incompatible

### Learning Memory

Learning Memory remains curriculum-item-centric. Foundation concepts and Transfer families are semantic non-item targets.

Using an arbitrary curriculum phrase as proxy would reinterpret existing attempts/successes/misses and learner history.

```text
Foundation concept owner  NO
Transfer family owner     NO
```

### Error Intelligence

Error Intelligence is likewise item-centric. A miss on a Transfer family or Foundation concept cannot honestly be assigned to one curriculum item merely to obtain durability.

```text
Foundation concept owner  NO
Transfer family owner     NO
```

### Evidence v2

Evidence v2 is already Recovery's seventh durable store, but its accepted role is **derived shadow only**.

Build36.2 preserves the six original stores as canonical product truth. Backup v3 reads those six sources, derives fresh Evidence, and serializes the coherent seven-store backup. The current Evidence projection is item-centric and marks construction/transfer as not historically reconstructable.

Directly writing P3b source events into Evidence v2 would silently change its role from:

```text
derived projection of six canonical source stores
```

into:

```text
mixed projection + primary source-event store
```

That is a storage contract redesign and cutover, not a harmless reuse.

Verdict:

```text
direct Evidence-v2 source writes  REJECTED under current shadow contract
Evidence-v2 read cutover          NOT AUTHORIZED
```

## 8. A new eighth store is not justified now

A separate durable observation store would avoid item semantic hijack, but it is not a small local change.

It would require explicit Recovery/backup evolution covering at least:

```text
store schema + validation
backup version/serialization contract
restore planning for old/new backups
snapshot + last-good behavior
corruption quarantine
reset semantics
write/reread/rollback proof
installed-PWA reopen continuity
migration compatibility
```

More importantly, there is no certified consumer today that requires this durability. Build39.2 still deliberately leaves `concept-review`, `foundation-capsule` and `transfer-construction` unavailable.

Creating an eighth store now would therefore persist data **before** the project has defined the independent-evidence, concept-attribution and recency semantics needed to consume it honestly.

That is persistence-first architecture and is rejected.

## 9. Durability prerequisites before this decision may be reopened

A future durability proposal must begin with a concrete consumer/use-case, for example a bounded practice-need signal. It must not begin with “store everything now and decide later”.

Before a durable implementation is authorized, a later audit/design must define all of:

1. **consumer semantics** — what exact decision needs cross-session history;
2. **attempt/session identity** — enough provenance to group attempts without pretending every replay is independent;
3. **independence rules** — distinct checks, repeated fixed checks, source-owner independence and exposure contamination;
4. **Foundation attribution** — which checks support which concept IDs in multi-concept capsules;
5. **recency/spacing policy** — explicit derived policy rather than an invented threshold in the raw event owner;
6. **dedupe/retention semantics** — bounded durable history and idempotence expectations;
7. **storage ownership** — either an explicit Evidence role redesign/cutover or a separately justified new source store;
8. **Recovery migration proof** — backup/restore/reset/rollback/reopen compatibility before any durable write reaches learners.

These prerequisites are not implementation work authorized by P3c.

## 10. Effect on Build39.2

P3b materially improves the evidence reality because honest source-time Foundation/Transfer observations now exist during the live session.

But they remain ephemeral and lack certified cross-session independence/aggregation semantics.

Therefore Build39.2 remains correct:

```text
phrase-retrieval      reliable
listening             reliable
scenario              reliable
concept-review        unavailable
foundation-capsule    unavailable
transfer-construction unavailable
```

No auto-route or recommendation expansion is authorized by P3c.

## 11. P3c verdict

```text
raw P3b event truth                    TRUSTWORTHY AT EVENT LEVEL
cross-session durability now           NOT JUSTIFIED
Learning Memory reuse                   REJECTED
Error Intelligence reuse                REJECTED
direct Evidence-v2 source writes        REJECTED under current shadow contract
Evidence-v2 read cutover                NOT AUTHORIZED
new eighth durable store now            NOT JUSTIFIED
aggregation / independence inference    NOT AUTHORIZED
mastery / CEFR / score / confidence     NOT AUTHORIZED
Build39.2 availability promotion        NOT AUTHORIZED
Build43                                 NOT AUTHORIZED
A2                                      NOT AUTHORIZED
```

Recovery remains:

```text
7 durable stores / backup v3
```

Evidence v2 remains:

```text
derived shadow only
```

The accepted P3a contract and P3b ephemeral runtime should remain unchanged by this audit.

## 12. Next gate

P3c does not need a persistence implementation successor.

After this audit candidate is accepted, the canonical sequence moves to:

```text
P4 — fresh A1 readiness audit

→ reassess A1 from the actual post-P3b evidence reality
→ distinguish event-level ephemeral observation from reliable durable evidence
→ decide whether current A1/productive consolidation is sufficient
→ reconsider A2 only from that fresh audit
```

P4 is an audit gate. It does not automatically authorize A2, Build43, durable observation storage, Evidence read cutover or a new store.

## 13. Final decision

**Do not persist P3b observations yet.**

The project now knows how to observe the deterministic Foundation/Transfer checks honestly. It does not yet have enough semantics or a justified consumer to turn those observations into a new durable learner-history contract.

The smallest honest next move is therefore **P4**, not a durability implementation.
