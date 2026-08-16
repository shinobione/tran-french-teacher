# Build 36 — Memory Evidence v2 Adoption — Certified Closeout

**Status:** CLOSED after certified Build 36.1 → 36.2 → 36.3 chain.

## What Build 36 changed

Build 36 moved the Build 35 Evidence v2 design from migration-readiness proof into a live, recoverable **derived shadow store**:

```text
learner
memory
errors
scenarios
listening
milestones
   ↓ deterministic projection
french-tranquille:memory-evidence:v2
   role = derived-shadow
```

Recovery now owns **seven durable stores** and exports **backup v3**.

The six historical source stores remain canonical for product behaviour. Build 36 does **not** move lesson, review, Listening, Scenario, Mastery, Learner Intelligence or voice read paths to Evidence v2.

## 36.1 — Recovery v3 + seventh-store contract

Certified before runtime adoption:

- strict Evidence shadow validator;
- deterministic six-source fingerprint;
- seven-store target contract;
- backup v3 export rebuilding Evidence from source truth;
- v3 restore coherence check;
- v2 restore → rebuild Evidence;
- v1 restore → preserve post-v1 stores + rebuild Evidence;
- explicit `preserveMissingIds` / `rebuildDerivedIds` ownership.

## 36.2 — Live derived-shadow adoption

The runtime then adopted Evidence with a migration-safe order:

```text
legacy source validators
→ Evidence projector
→ Recovery v3 contract/runtime
→ live Recovery
→ Evidence shadow observer
→ product/pedagogy writers
```

First shadow creation requires:

```text
pre-migration snapshot
→ derive
→ Recovery-validated write
→ reread
→ exact source/coherence comparison
→ seven-store last-good
```

An existing shadow is refreshed before Recovery snapshots, last-good and backup export so durable state cannot contain new source bytes paired with stale Evidence bytes.

Malformed Evidence writes are blocked/quarantined. Generic learner reset clears all seven stores.

## 36.3 — Durability tribunal

The final slice changed no runtime owner. It tested the already-merged 36.2 runtime in a persistent synthetic Chrome profile.

Certified scenarios:

- controlled historical six-store seed;
- fresh six→seven adoption with Evidence absent in pre-migration snapshot;
- second boot on the same seven-store profile with no remigration;
- corrupt Evidence JSON written while the app is closed → quarantine + boot repair;
- exact v3 seven-store round-trip;
- v2 restore replacing historical six and rebuilding Evidence;
- v1 restore owning learner+memory, preserving errors/scenarios/listening/milestones and rebuilding Evidence;
- one-shot mid-restore write failure after partial writes → exact rollback;
- learner reset clearing all seven and restoring coherently;
- same Chrome profile reopened from Service Worker cache after the origin HTTP server was stopped.

The dedicated tribunal also hard-failed if the candidate changed Recovery/Evidence runtime, product pedagogy owners, `app.js`, voice files, `index.html` or `sw.js`.

## Permanent safety semantics

Build 36 preserves these rules:

- `voice-unrecognized` is recognition-system evidence, not a pronunciation score;
- assistance proves assistance, not successful production;
- unsupported construction/transfer/concept evidence is not fabricated;
- per-item history remains bounded/deterministic;
- historical unattributable data remains diagnostic rather than invented history;
- Evidence can be rebuilt from the six canonical stores;
- old backup v1/v2 compatibility remains explicit under Recovery v3.

## Rollback model

The seventh store is derived. Therefore a code rollback that ignores Evidence does not lose the learner's canonical history stored in the six source stores.

Recovery snapshots and old-backup migration remain the data rollback path for durable operations.

## Next gate

**Build 37 — Foundations Core** is the next canonical build.

Build 37 must begin by rereading the Build 33 foundations audit and Build 34 F01–F04 pilot against the now-certified seven-store Recovery boundary.

Evidence v2 remains shadow-only unless a later, separately approved build explicitly authorizes product read ownership.
