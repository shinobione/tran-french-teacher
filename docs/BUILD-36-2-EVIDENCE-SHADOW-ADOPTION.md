# Build 36.2 — Memory Evidence v2 Derived-shadow Adoption

**Status:** candidate runtime slice. This is the first deliberate live adoption of the seventh Evidence store.

## Goal

Build 36.1 proved the seven-store / backup-v3 contract without wiring it into the app.

Build 36.2 wires that contract while preserving one critical rule:

> **The existing six stores remain canonical for product behaviour. Evidence v2 is a derived shadow only.**

No lesson, review, Listening, Scenario, Mastery or Learner Intelligence read path is moved to Evidence v2 in this slice.

## Boot order

The runtime boot order is intentionally synchronous:

```text
legacy Build 28 Recovery source validators
→ Build 35 Evidence projector
→ Build 36.1 Recovery v3 contract
→ Build 36.2 Recovery v3 runtime adapter
→ live Recovery runtime
→ Evidence shadow runtime
→ app / pedagogy writers
```

This ensures Recovery validates/repairs existing durable data before Evidence adoption and ensures later source writes pass through Recovery before the shadow observer sees them.

## First adoption transaction

The first time a device has at least one canonical source store but no Evidence shadow:

```text
source snapshot
→ Recovery pre-migration snapshot with Evidence = missing
→ deterministic six-source projection
→ Recovery-validated Evidence write
→ reread
→ exact Evidence/source coherence check
→ source-byte stability check
→ seven-store last-good snapshot
```

The pre-migration snapshot is required whether first adoption happens during boot **or after the first source store appears on a fresh device**.

If adoption verification fails, the pre-migration snapshot is restored. A failed first adoption must not leave a partial Evidence key behind.

## Ongoing freshness

The Evidence runtime wraps Storage only after Recovery has installed its validation wrapper.

For writes/removals affecting one of the six canonical source keys:

```text
Recovery validates source write
→ source write commits
→ shadow refresh is microtask-coalesced
→ deterministic reproject
→ write only if canonical Evidence bytes changed
→ reread/coherence verify
```

Evidence writes are not source writes and therefore do not recursively trigger another Evidence refresh.

## Last-good freshness race

Recovery already schedules `last-good` after valid durable writes. That microtask may run before the Evidence runtime's own refresh microtask.

Build 36.2 therefore makes Recovery itself call `ensureEvidenceFresh(createIfMissing:false)` before:

- Recovery snapshots;
- last-good snapshots;
- backup export.

If Evidence already exists, Recovery refreshes it through its native writer before capturing durable state. This prevents a last-good snapshot from containing:

```text
new source bytes + stale Evidence bytes
```

If Evidence does not yet exist, Recovery never creates it implicitly; first creation remains owned by the explicit adoption transaction and its pre-migration snapshot.

## Recovery v3 runtime

`src/core/data-recovery-v3-runtime-core.js` adapts the certified Build 36.1 pure contract to Storage operations.

Live Recovery becomes:

```text
BACKUP_VERSION = 3
STORE_SPECS     = 7
```

while retaining the untouched Build 28 core as the canonical validator for the original six source stores.

The runtime adapter owns:

- seven-store raw collection;
- Evidence shape validation;
- optional exact Evidence/source coherence validation;
- v3 backup generation;
- v1/v2/v3 restore planning;
- seven-store write/reread/compare/rollback;
- Evidence rebuild from current canonical source stores.

## Backup v3

Live backup export now uses the Build 36.1 v3 contract.

It never trusts the currently stored shadow. Instead:

```text
read six canonical sources
→ validate
→ derive fresh Evidence
→ serialize coherent seven-store backup v3
```

The learner-facing Settings card becomes `COFFRE V3` and mentions learning evidence in its backup contents.

## Restore compatibility

Runtime restore uses the already-certified 36.1 matrix:

```text
v3
→ seven owned stores
→ Evidence/source coherence mandatory

v2
→ restore historical six
→ rebuild Evidence

v1
→ restore learner + memory
→ preserve errors/scenarios/listening/milestones
→ rebuild Evidence from resulting six-store target
```

Pre-restore and, for older backup versions, pre-migration snapshots are captured before writes.

Any failed seven-store restore rolls back the exact pre-restore raw map.

## Corruption handling

Evidence is now a real Recovery store and therefore uses the existing Recovery protection path.

Malformed direct writes such as invalid JSON are:

```text
blocked
→ counted in blockedWrites
→ bounded raw value quarantined
→ existing valid Evidence remains unchanged
```

Boot-time malformed Evidence is likewise handled by Recovery's existing corruption repair/quarantine flow.

A structurally valid but stale shadow is refreshed from the six canonical stores before last-good/backup and during Evidence-runtime boot adoption.

## Reset behaviour

Because live Recovery `STORE_SPECS` now contains seven stores, the existing learner reset path clears all seven stores after the pre-reset snapshot.

The Evidence observer explicitly avoids recreating the shadow when all six canonical sources and Evidence are absent.

## Reopen behaviour

The dedicated browser proof uses the same Chrome profile twice:

### First run

```text
seed historical learner data
→ boot
→ adopt Evidence
→ require pre-migration snapshot
→ verify source refresh/restore
→ verify backup v3 + last-good
```

### Second run

```text
same browser profile
→ existing Evidence present at boot
→ no new adoption transaction
→ no remigration
→ Evidence remains coherent
→ source refresh/restore still works
```

This mirrors the installed-PWA/device continuity case more closely than a fresh browser profile alone.

## Historical test evolution

Build 35 and Build 36.1 guards originally asserted that Evidence was not runtime-wired. Those assertions were correct at their certified checkpoints.

Build 36.2 does **not** delete that history. The historical tests now have two explicit modes:

```text
pre-successor
→ require no Evidence runtime adoption

explicit Build 36 successor
→ require v3/runtime wiring
→ still require legacy Build 35 simulator to remain test-only
→ still require six canonical product writers byte-identical
```

This prevents CI from being weakened merely to accommodate intentional phase progression.

## Service Worker / cache

The new runtime files and updated Recovery smoke are precached with targeted `2.4.0-b36.2` URL versions.

The global Service Worker cache identity remains deliberately unchanged:

```text
tran-french-teacher-v2.3.22-b34.14-v58debug1
```

No global cache nuke is used. Existing network-first semantics remain intact.

## Product-read boundary

The following current product owners remain byte-identical and must not reference the Evidence shadow in this slice:

```text
app.js
learning-memory.js
error-intelligence.js
listening-engine.js
scenario-engine.js
voice-ios.js
free-voice.js
```

The dedicated CI additionally scans Mastery/Learner Intelligence read owners to ensure Evidence has not silently become product truth.

## Proof files

```text
src/core/data-recovery-v3-runtime-core.js
src/core/memory-evidence-v2-runtime.js
tests/smoke/build36-shadow-runtime-core-smoke.js
tests/smoke/build36-shadow-adoption-smoke.js
.github/workflows/build36-2-evidence-shadow.yml
```

The browser tribunal requires:

- Recovery live v3 / seven stores;
- initial Evidence coherence;
- first adoption lifecycle + pre-migration snapshot;
- source-write refresh;
- exact source/shadow restoration after probe;
- corrupt Evidence write blocked + quarantined;
- coherent seven-store backup v3;
- coherent seven-store last-good;
- six product source bytes unchanged after the smoke;
- same-profile reopen with `existingAtBoot=true` and no remigration.

## Exit condition

Build 36.2 is complete only after:

```text
candidate PR full green
→ merge
→ exact main SHA full green
→ Pages success
```

Then Build 36.3 becomes the required full browser tribunal for:

```text
fresh six-store adoption
existing seven-store boot
corrupt Evidence boot
v1 restore
v2 restore
v3 round-trip
reset all seven
injected restore/write failure rollback
installed/browser persistence
```

Build 36 remains **not complete** until 36.3 passes. Product read-path cutover remains out of scope.
