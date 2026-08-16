# Build 36.3 — Recovery v3 Durability Tribunal

**Status:** candidate QA/closeout slice. **No runtime or pedagogy changes are allowed here.**

## Purpose

Build 36.1 defined the seven-store / backup-v3 contract. Build 36.2 adopted `french-tranquille:memory-evidence:v2` as a live **derived shadow store**, while the original six stores remained canonical product truth.

Build 36.3 adds no feature. It tries to break that adoption contract in a real persistent browser profile.

## Hard boundary

The dedicated workflow fails if this branch changes Recovery runtime, Evidence runtime/core, product pedagogy owners, `app.js`, voice files, `index.html` or `sw.js`.

A green 36.3 therefore certifies the already-merged 36.2 runtime rather than hiding a fix inside the tribunal.

## Controlled historical seed

`tests/browser/build36-recovery-v3-seed.html` writes six valid source stores directly, before Recovery wrappers exist. The learner fixture preserves the historical continuity shape:

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

It also seeds valid Memory, Error, Scenario, Listening and Milestone stores, clears Recovery metadata, and leaves Evidence absent.

## Real-app host

`tests/browser/build36-recovery-v3-tribunal.html` opens the unmodified real app in a same-origin iframe and injects the test-only tribunal script into that app document.

The production entry point is not changed to load Build 36.3 tests.

## Required cases

### 1. Fresh six → seven adoption

```text
six historical stores
→ real boot
→ pre-migration snapshot with Evidence missing
→ deterministic Evidence derivation
→ Recovery-validated write
→ reread/coherence
→ seven-store backup v3
```

### 2. Existing seven-store reopen

Same Chrome profile, second boot:

```text
existingAtBoot = true
adoptedThisBoot = false
```

No remigration; Evidence remains coherent.

### 3. Corrupt Evidence at boot

A seed page writes invalid JSON to the Evidence key while the app is closed. Next boot must quarantine and repair it, then finish with coherent Evidence.

### 4. v3 round-trip

Mutate source truth, restore a canonical v3 backup, require the exact canonical seven-store target and coherence.

### 5. v2 restore

Historical v2 owns all six source stores. Current-device Evidence must not survive; it is rebuilt from the restored six.

Required metadata:

```text
migratedFrom = 2
rebuildDerivedIds includes evidence
```

### 6. v1 restore

Before restore, learner and the four post-v1 source stores are moved to distinguishable valid values.

Expected ownership:

```text
learner + memory      ← v1 backup
errors                ← current device preserved
scenarios             ← current device preserved
listening             ← current device preserved
milestones            ← current device preserved
Evidence              ← rebuilt from resulting six
```

Required metadata:

```text
migratedFrom = 1
preserveMissingIds = errors, scenarios, listening, milestones
rebuildDerivedIds includes evidence
```

### 7. Injected mid-restore failure

A valid alternate v3 target is restored through a writer that throws **once on the third write**. Some writes therefore happen before the fault, but the same writer becomes healthy for rollback.

Required result:

```text
restore ok = false
rolledBack = true
exact pre-fault seven raw bytes restored
Evidence coherent after queued refresh settles
```

### 8. Reset all seven

The normal learner reset trigger must capture pre-reset state, clear all seven keys, avoid orphan-Evidence recreation, then restore a coherent v3 backup.

### 9. Browser/PWA persistence with origin offline

The same Chrome user-data profile is used throughout.

The exact tribunal URL is opened once online after the Service Worker is active. Network-first caching stores that successful host request, the app request and injected tribunal script.

Then the static HTTP server is **stopped completely**. Chrome is relaunched with the same profile and the exact same URL.

A successful second render proves:

```text
Service Worker survives browser restart
→ cached app serves with origin offline
→ localStorage Evidence survives browser restart
→ Recovery v3 boots offline
→ backup v3 works
→ Evidence/source coherence still holds
```

Build 36.3 does not change the Service Worker cache identity or production wiring to make this pass.

## Historical chain

The dedicated workflow reruns the pure Build 28 Recovery tests, Build 35 projection/transaction/closeout proofs, Build 36.1 contract smoke and Build 36.2 runtime-core smoke. The full repository PR matrix remains mandatory as well.

## Definition of Done

Build 36.3 is complete only after:

```text
candidate dedicated tribunal green
→ full PR matrix green
→ merge
→ exact main merge SHA full push matrix green
→ Pages success on same SHA
```

Then **Build 36 is technically CLOSED** and the canonical next build becomes **Build 37 — Foundations Core**, after `PROJECT-STATE.md` and `MASTER-ROADMAP.md` are reconciled.

Build 36 does **not** authorize any product read-path cutover to Evidence v2.
