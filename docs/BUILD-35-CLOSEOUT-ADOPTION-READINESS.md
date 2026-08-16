# Build 35 Closeout — Memory Evidence v2 Adoption Readiness

**Status:** closeout candidate. **No durable Evidence v2 adoption in Build 35.**

## 1. Decision

Build 35 has now produced both required migration-readiness proofs:

```text
35.1 — deterministic Evidence v2 projection
35.2 — isolated transactional write / reread / compare / rollback simulation
```

Certified checkpoints before this closeout candidate:

```text
PR #164 / main 68b24c8a…
→ 30/30 push workflows complete
→ 0 failure
→ Pages #217 SUCCESS

PR #165 / main c972bdc44…
→ 45/45 PR workflows complete
→ 0 failure
→ 31/31 push workflows complete
→ 0 failure
→ Pages #218 SUCCESS
```

The Build 35 Definition of Done is therefore satisfied **without adopting a seventh durable store**:

- evidence model useful;
- ownership clear;
- bounded history clear;
- compatibility strategy clear;
- migration simulable and reversible;
- no new durable schema adopted yet.

Build 36 may become the next candidate only after this closeout is merged/certified.

## 2. Locked Build 36 role: derived shadow store first

The safest first adoption of:

```text
french-tranquille:memory-evidence:v2
```

is a **derived shadow store**, not an immediate replacement for any current pedagogy source.

During the Build 36 adoption candidate:

```text
learner + memory + errors + scenarios + listening + milestones
                    ↓
          deterministic projector
                    ↓
       memory-evidence:v2 shadow store
```

The existing six stores remain canonical for current product behaviour.

Consequences:

- no lesson/review/scenario/listening decision may depend exclusively on Evidence v2 during initial adoption;
- reverting Build 36 code leaves the six historical stores intact;
- an older runtime may safely ignore the extra Evidence v2 key;
- Build 36 must rebuild/verify the shadow store from current canonical sources rather than trust an orphaned/stale value after rollback/redeploy;
- product read-path cutover is a separate future decision, not an implicit side effect of persistence.

## 3. Build 36 Recovery contract — seven stores

Build 36 is explicitly allowed to modify Recovery because durable adoption cannot bypass it.

The future Recovery store set should become:

```text
learner
memory
errors
scenarios
listening
milestones
evidence
```

with Evidence bound to:

```text
french-tranquille:memory-evidence:v2
```

The Evidence validator must require at minimum:

- object value;
- `schemaVersion === 2`;
- bounded `items` object;
- per-item bounded history;
- supported dimensions/states only;
- no malformed history/event containers;
- shadow/adoption metadata consistent with the Build 36 contract.

Recovery must remain the authority for invalid-write blocking, boot corruption handling, last-good snapshots, pre-restore/pre-migration snapshots, restore verification, rollback, reset and quarantine.

## 4. Backup format must become v3

Adding a seventh durable store changes the semantic store set. Build 36 must therefore **bump the backup envelope from v2 to v3** instead of silently redefining what a v2 backup means.

Canonical target:

```text
french-tranquille-backup / version 3
stores:
  learner
  memory
  errors
  scenarios
  listening
  milestones
  evidence
```

A new v3 backup must contain a validated Evidence v2 shadow snapshot coherent with the six canonical sources used to build that backup.

## 5. Old-backup migration matrix

### Backup v3

```text
seven stores present/valid
→ restore target directly
→ verify seven-store raw map
```

If Evidence is missing/corrupt, the restore must fail validation or deliberately enter the documented rebuild path; it must never silently trust malformed Evidence.

### Backup v2

A historical v2 backup owns all six current stores and predates Evidence v2.

Required semantic migration:

```text
restore six v2 stores exactly
→ Evidence marked rebuild-required
→ project Evidence v2 from those six restored stores
→ include derived Evidence in the same verified restore transaction
```

Do **not** preserve a newer device's existing Evidence shadow when restoring a v2 backup. That would mix evidence from two different source timelines.

### Backup v1

Current Build 28 semantics for v1 must remain respected:

```text
v1 owns learner + memory
errors/scenarios/listening/milestones are historically absent
```

Those absent v1-era stores currently use preserve-missing compatibility. Build 36 must make this ownership explicit rather than using one global boolean for all seven stores.

Target migration plan:

```text
restore learner + memory from v1
preserve current errors + scenarios + listening + milestones
DO NOT preserve current Evidence
→ rebuild Evidence from the resulting combined six-store target
→ verify seven-store transaction
```

Recommended Recovery planning vocabulary for Build 36:

```text
preserveMissingIds
rebuildDerivedIds
```

instead of treating every null/missing store identically.

## 6. Initial device adoption transaction

On a device with six valid historical stores and no Evidence v2 key:

```text
Recovery boot repair/validation first
→ pre-migration snapshot including Evidence = missing
→ collect six canonical sources
→ deterministic Evidence projection
→ validate proposed Evidence
→ write Evidence through Recovery-controlled path
→ reread
→ canonical compare
→ verify six source bytes unchanged
→ save last-good seven-store snapshot
```

Any failure after the write begins must restore the pre-migration snapshot.

Invalid source data must be repaired/quarantined by Recovery before Evidence adoption. Build 36 must not create a second corruption-repair system.

## 7. Shadow freshness / source-write ownership

An adopted shadow store cannot be allowed to become silently stale.

Build 36 should centralize freshness ownership through Recovery rather than patching every pedagogy writer independently.

Preferred contract:

```text
valid write to one of the six canonical source stores
→ Recovery emits/schedules one durable-source-change notification
→ Evidence shadow refresh is coalesced in a microtask
→ deterministic reproject from current six sources
→ write only if canonical Evidence bytes changed
```

The Evidence write itself must not recursively trigger another source refresh.

This avoids separate hooks in Memory, Error Intelligence, Listening and Scenario and keeps durable-store ownership centralized.

At minimum, backup/export must force or verify an up-to-date shadow projection before serializing v3.

## 8. Reset / last-good / quarantine

Once Evidence becomes a Recovery store, existing generic Recovery operations must include it deliberately:

### Reset

Reset triggered from learner-data reset must remove all seven stores atomically after the pre-reset snapshot.

### Last-good

Last-good snapshots must include Evidence when valid. A last-good snapshot from before adoption may legitimately have Evidence missing and should trigger deterministic rebuild rather than invented history.

### Quarantine

Malformed Evidence raw data must be quarantined under the existing Recovery quarantine mechanism with the same bounded raw-size policy as other stores.

If valid six-source data exists, Build 36 may rebuild a missing/quarantined Evidence shadow after Recovery has completed repair. The corrupted Evidence raw value remains diagnostic evidence; it is not interpreted as pedagogy.

## 9. Code rollback safety

Build 36 must stay additive from the learner's perspective.

A code rollback to the Build 35 runtime must remain safe because:

- all six existing stores keep their current schemas and semantics;
- current product behaviour continues to read those six stores;
- the extra Evidence v2 key is ignored by the older runtime;
- no destructive back-migration of learner progress is necessary.

On a later Build 36 re-entry, the Evidence shadow must be reprojected/compared from the six canonical sources before use, so an orphaned shadow can never silently override newer source truth.

## 10. Build 36 minimum slices

Build 36 should remain independently revertible and should not attempt read-path cutover in the same first commit.

Recommended sequence:

### 36.1 — Recovery v3 + seventh-store contract

- Evidence validator;
- seven-store Recovery specification;
- backup v3 envelope;
- v1/v2/v3 normalization matrix;
- explicit preserve/rebuild planning;
- pure tests only until migration plan is proven.

### 36.2 — Shadow adoption runtime

- load after Recovery boot repair;
- pre-migration snapshot;
- initial six→seven projection/write/reread/compare;
- source-write refresh ownership;
- rollback proof;
- no product read-path cutover.

### 36.3 — Backup/restore/reset browser tribunal

- fresh six-store device adoption;
- existing seven-store boot;
- corrupt Evidence boot;
- v1 restore;
- v2 restore;
- v3 round-trip;
- reset all seven;
- injected write failure rollback;
- installed/browser persistence proof.

Only after all three are green may Build 36 be considered technically adopted.

## 11. Build 35 closeout guard

This closeout must remain true at merge time:

```text
Recovery STORE_SPECS == 6
Recovery BACKUP_VERSION == 2
Evidence proposed key absent from Recovery STORE_SPECS
Evidence core absent from index.html
Evidence migration simulator absent from index.html
Evidence files absent from sw.js precache/runtime wiring
current six source owners unchanged
```

If any of those statements is false, Build 35 has crossed its no-adoption boundary and the closeout must fail.

## 12. Build 35 final decision

When this closeout candidate passes CI and is merged:

```text
Build 35 = CLOSED / migration readiness proven
Build 36 = NEXT / Memory Evidence v2 Adoption Candidate
```

That status authorizes Build 36 engineering. It does **not** itself authorize an untested production read-path cutover.
