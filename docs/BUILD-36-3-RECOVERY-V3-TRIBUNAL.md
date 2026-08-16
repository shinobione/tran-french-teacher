# Build 36.3 — Recovery v3 Durability Tribunal

**Status:** candidate QA/closeout slice. **No runtime or pedagogy changes are allowed in this slice.**

## Purpose

Build 36.1 defined the pure seven-store / backup-v3 contract.

Build 36.2 adopted `french-tranquille:memory-evidence:v2` as a live **derived shadow store** while preserving the original six stores as canonical product truth.

Build 36.3 does not add another feature. It attempts to break that adoption contract in a real browser profile and proves that data remains recoverable.

## Hard boundary

The dedicated workflow fails if this branch changes any of:

```text
src/core/data-recovery-core.js
src/core/data-recovery-v3-contract.js
src/core/data-recovery-v3-runtime-core.js
src/core/data-recovery.js
src/core/memory-evidence-v2-runtime.js
src/pedagogy/memory-evidence-v2-core.js
src/pedagogy/learning-memory.js
src/pedagogy/error-intelligence.js
src/pedagogy/listening-engine.js
src/pedagogy/scenario-engine.js
src/pedagogy/mastery-engine.js
src/pedagogy/learner-intelligence.js
src/pedagogy/learner-intelligence-v2.js
app.js
voice-ios.js
free-voice.js
index.html
sw.js
```

Therefore a green 36.3 certifies the already-merged 36.2 runtime; it cannot hide a product fix inside the tribunal.

## Synthetic historical profile

`tests/browser/build36-recovery-v3-seed.html` writes a controlled six-store timeline directly, before Recovery wrappers exist.

It deliberately resembles the frozen historical continuity fixture:

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

It also seeds valid Memory, Error, Scenario, Listening and Milestone stores and leaves Evidence absent.

Recovery metadata snapshots/quarantine are removed for the initial six-store migration case.

## Tribunal host

`tests/browser/build36-recovery-v3-tribunal.html` loads the real app in a same-origin iframe and injects the test-only tribunal script into that real app document.

The app itself is not modified to load the tribunal.

This is important for Build 36.3: the tested runtime remains the exact Build 36.2 runtime.

## Case 1 — fresh six→seven adoption

From the synthetic six-store profile:

```text
boot real app
→ Recovery v3 runtime
→ Evidence absent
→ pre-migration snapshot
→ derive Evidence
→ write/reread/compare
→ seven-store state
```

Required assertions:

- `STORE_SPECS.length === 7`;
- backup v3 contains all seven stores;
- Evidence exists;
- Evidence/source coherence passes;
- `existingAtBoot === false`;
- `adoptedThisBoot === true`;
- pre-migration snapshot contains Evidence as missing;
- all seven raw stores validate.

## Case 2 — existing seven-store reopen

The same Chrome profile boots again.

Required lifecycle:

```text
existingAtBoot === true
adoptedThisBoot === false
```

No second migration is permitted. Evidence remains coherent and backup remains v3/seven-store.

## Case 3 — corrupt Evidence before boot

A same-origin seed page writes invalid JSON directly to the Evidence key while the app is not running.

The next real app boot must:

```text
validate Evidence
→ quarantine corrupt raw
→ repair from valid Recovery evidence if available
→ rederive/refresh coherence
→ continue boot
```

Required assertions:

- Recovery reports Evidence in `repairedAtBoot`;
- quarantine count increases;
- valid Evidence exists after boot;
- source/Evidence coherence passes.

## Case 4 — v3 round-trip

A canonical live v3 backup is captured.

The learner source is mutated, then `restoreObject(v3)` must restore the exact canonical seven-store target and Evidence coherence.

This proves current-format round-trip rather than only old-backup migration.

## Case 5 — v2 restore

A real Build-28-style v2 backup is built from the baseline six stores.

Before restore, the current learner source and current Evidence are moved to a foreign timeline.

Expected restore ownership:

```text
v2 owns all historical six stores
→ all six restored from v2
→ current-device Evidence never preserved
→ Evidence rebuilt from restored six
```

Required metadata:

```text
migratedFrom = 2
rebuildDerivedIds includes evidence
```

## Case 6 — v1 restore

The four stores absent from backup v1 are deliberately changed to valid, distinguishable values:

```text
errors
scenarios
listening
milestones
```

A v1 backup containing only learner + memory is restored.

Expected ownership:

```text
learner + memory      ← v1 backup
errors/scenarios/
listening/milestones  ← current device preserved
Evidence              ← never preserved; rebuilt from resulting six
```

Required metadata:

```text
migratedFrom = 1
preserveMissingIds = [errors, scenarios, listening, milestones]
rebuildDerivedIds includes evidence
```

## Case 7 — injected mid-restore write failure

The runtime core receives a valid alternate v3 target and a writer that throws **once on the third write**.

This guarantees partial writes have happened before the fault while allowing the same writer to become healthy for rollback.

Required result:

```text
restore ok = false
rolledBack = true
exact pre-fault seven raw bytes restored
Evidence coherent after queued refreshes settle
```

No artificial “always failing” writer is used because such a writer would make rollback impossible by construction and would not test the intended transactional guarantee.

## Case 8 — reset all seven

The standard learner reset trigger is used:

```text
localStorage.removeItem(learnerKey)
```

Recovery must:

```text
capture pre-reset snapshot
→ clear all seven stores
→ not let Evidence observer recreate an orphan shadow
```

Then the pre-reset v3 backup is restored and coherence must return.

Required assertions:

- all seven keys are absent after reset;
- pre-reset snapshot contains Evidence;
- v3 restore succeeds;
- Evidence is coherent after restore.

## Case 9 — browser/PWA persistence with server offline

The same synthetic Chrome profile is used throughout the tribunal.

After all recovery tests, the tribunal host is opened once online at the exact URL:

```text
/tests/browser/build36-recovery-v3-tribunal.html?mode=pwa
```

Because the Service Worker is already active and network-first, the successful host response, real app root request and injected tribunal script are stored in the existing runtime cache.

Assertions online:

- Service Worker registration/controller exists;
- Evidence remains coherent;
- backup is v3;
- a same-origin persistence marker is stored.

The static HTTP server is then **stopped completely**.

Chrome is relaunched with the **same user-data-dir** and the **exact same URL**.

A successful second render with the same markers proves:

```text
active Service Worker survives browser restart
→ cached app/test request serves with origin server offline
→ localStorage Evidence survives browser restart
→ seven-store Recovery boots offline
→ backup v3 still works
→ Evidence/source coherence still holds
```

No new Service Worker cache identity or test-only production wiring is added by Build 36.3.

## Historical proof chain

The dedicated workflow also reruns:

- Build 28 pure Recovery tests;
- Build 35 deterministic Evidence projection;
- Build 35 transactional simulation;
- Build 35 closeout guard;
- Build 36.1 Recovery-v3 pure contract;
- Build 36.2 runtime-core smoke.

The full repository PR matrix remains required in addition to this dedicated tribunal.

## Definition of Done

Build 36.3 passes only if all cases above are green on the candidate PR, the PR is merged, the exact main merge SHA passes the full push matrix, and Pages succeeds on that same SHA.

If that happens, **Build 36 is technically CLOSED**:

```text
36.1 contract proof      ✅
36.2 live shadow adoption ✅
36.3 durability tribunal  ✅
```

The next canonical build becomes **Build 37 — Foundations Core** after PROJECT-STATE and MASTER-ROADMAP are reconciled.

A later product decision may choose to read Evidence v2 for pedagogy, but Build 36 does **not** authorize that cutover.
