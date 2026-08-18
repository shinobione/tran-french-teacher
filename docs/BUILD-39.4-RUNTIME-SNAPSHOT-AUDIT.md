# Build 39.4 — Runtime Snapshot Collector Audit

Status: **AUDIT COMPLETE / IMPLEMENTATION NOT STARTED**

Date: 2026-08-18

## Why this audit exists

Build39.1 certified deterministic action arbitration. Build39.2 certified normalization of reliable existing product evidence. Build39.3 certified their pure composition when caller-supplied snapshots are provided.

The next question is not “how do we invent evidence for all six action families?” The next question is narrower:

> How can the certified 39.3 pipeline receive the real current product evidence safely, without changing storage ownership, Evidence truth, learner UI or historical behaviour?

## Audited runtime owners

### Learning Memory

`src/pedagogy/learning-memory.js` exposes:

```text
window.FrenchTranquilleMemory.summary()
```

Its summary already provides the exact useful high-level sets needed by 39.2:

```text
entries
due
fragile
learning
solid
tomorrow
```

The Memory owner remains responsible for its own storage semantics. Build39.4 must not read the Memory localStorage key directly.

### Error Intelligence

`src/pedagogy/error-intelligence.js` exposes:

```text
window.FrenchTranquilleErrors.summary()
```

Its summary provides:

```text
recent
recurring
assisted
voice
top
totalItems
totals
session
```

The 39.2 adapter already knows how to use `top` plus `recent` while rejecting recognition-only evidence.

### Listening and Scenario

No direct Build39.4 read is required.

Current product behaviour already records reliable Listening/Scenario need into Error Intelligence using explicit source/type labels such as:

```text
listening-*
scenario-miss
scenario-assisted
```

Adding separate direct Listening/Scenario reads in 39.4 would create duplicate ownership rather than better evidence.

## Build30 Runtime Bridge audit

`src/core/runtime-bridge.js` and `src/core/runtime-contracts.js` are the frozen Build30 architecture boundary. `src/core/build-meta.js` imports both in the live runtime.

The Runtime Bridge is intentionally architecture-oriented:

```text
API readiness
store presence / JSON validity
learner continuity diagnostics
curriculum counts
navigation / route checks
```

It also performs direct localStorage reads for those diagnostics.

That makes it the wrong owner for Build39.4’s narrow pedagogical snapshot. Modifying the frozen Build30 bridge would couple Learner Intelligence 3 to an older architecture diagnostic contract and would blur storage ownership.

Verdict: **reuse the existing Memory/Error public read APIs; do not mutate Build30 Runtime Bridge.**

## Selected 39.4 design

Create a separate read-only runtime snapshot collector.

Target composition:

```text
FrenchTranquilleMemory.summary()
+ FrenchTranquilleErrors.summary()
→ narrow detached immutable snapshot
→ FrenchTranquilleLearnerActionDecisionPipeline.decide(snapshot)
→ decision OR explicit abstention
```

The collector should copy only fields actually consumed by 39.2.

### Memory snapshot minimum

```text
entries[]
  id
  attempts

due[]
  id

fragile[]
  id
```

Additional copied Memory fields are allowed only if the certified 39.2 contract actually needs them.

### Error snapshot minimum

```text
top[]
  item.id and/or entry.id
  score
  dominant
  entry.lastType
  entry.events[]
    type
    source

recent[]
  id
  type
  source
  repeated
```

The collector should return detached/frozen plain data. Downstream mutation attempts must not modify Memory or Error Intelligence internal objects.

## Non-goals

39.4 does not:

- create concept mastery;
- persist Foundation capsule results;
- persist Transfer mastery;
- make Evidence v2 product truth;
- execute a recommendation in the learner UI;
- add a new tab/card/router action;
- modify public release metadata;
- change Memory/Error/Listening/Scenario semantics;
- change Build30 Runtime Contracts / Runtime Bridge;
- add a new durable store.

The deliberately unavailable 39.2 families remain unavailable:

```text
concept-review
foundation-capsule
transfer-construction
```

## Safety requirements

The implementation candidate must prove:

1. the new collector contains no direct `localStorage`, `sessionStorage` or IndexedDB access;
2. it calls only the canonical read APIs needed for this slice;
3. it creates a detached immutable input for 39.3;
4. Memory/Error owner state is unchanged if a caller attempts to mutate the returned snapshot;
5. all seven durable stores are byte-identical before/after collection + decision;
6. `voice-unrecognized` alone still cannot create learner need;
7. unsupported action families remain unavailable;
8. 39.1 / 39.2 / 39.3 certified owners are not modified;
9. LI V1/V2 compatibility remains intact;
10. historical learner continuity stays `7 completed / l8=4 / 40 known`.

## Browser tribunal target

Use the real app runtime, not only synthetic Node fixtures.

The tribunal should establish actual Memory/Error owner availability, collect the detached snapshot, invoke 39.3, and assert the storage/continuity contract before and after.

No learner-facing recommendation rendering is required or authorized in this slice.

## Recommended ownership name

A suitable separate owner is conceptually:

```text
src/pedagogy/learner-action-runtime-snapshot.js
```

The exact public API name may be selected during implementation, but it must remain distinct from the frozen Build30 Runtime Bridge and from LI V1/V2.

## Verdict

**Build39.4 = read-only runtime snapshot collector / composition-safety slice.**

Implementation may begin only after the governance reconciliation carrying this audit is controlled and merged.
