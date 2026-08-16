# Build 36.1 — Recovery v3 + Seventh-store Contract

**Status:** candidate engineering slice. **Pure contract only — no live Evidence persistence.**

## Goal

Build 35 proved that Memory Evidence v2 can be projected honestly and migrated transactionally in isolation.

Build 36.1 defines the Recovery/backup contract required before the proposed Evidence store can be adopted by the runtime.

The live app is deliberately unchanged in this slice:

```text
current runtime Recovery
→ 6 stores
→ backup v2
→ unchanged

Build 36.1 pure contract
→ 7-store target model
→ backup v3
→ not loaded by index.html
→ not loaded / precached by sw.js
```

The first runtime adoption remains reserved for Build 36.2.

## Target seventh store

```text
id   = evidence
key  = french-tranquille:memory-evidence:v2
role = derived-shadow
```

Evidence remains **derived from the six current canonical stores**:

```text
learner
memory
errors
scenarios
listening
milestones
   ↓
deterministic Build 35 projector
   ↓
Evidence v2 shadow
```

The shadow is not an independent learner timeline and must never override the six source stores during initial adoption.

## Durable shadow envelope

Build 35's dry-run proposal intentionally contained:

```text
adoption: dry-run-only
proposedStoreKey: ...
```

Those fields are not persisted by the Build 36 durable contract.

The target shadow envelope is instead:

```text
schemaVersion: 2
role: derived-shadow
source:
  derivedFrom: [six canonical store ids]
  fingerprint: fnv1a32:<8 hex>
  storeSchemas: ...
limits:
  maxItemHistory: <= 24
items: ...
diagnostics: ...
```

The source fingerprint is deterministic over the canonical six-store object and exists to make stale-source detection explicit. It is not a security hash.

## Evidence validator

The pure v3 contract rejects at minimum:

- wrong Evidence schema version;
- role other than `derived-shadow`;
- malformed/missing source fingerprint;
- wrong `derivedFrom` ownership;
- unsupported dimensions;
- unsupported evidence states;
- unsupported outcomes;
- history entries attributed to unknown source stores;
- malformed timestamps;
- duplicate history event ids;
- history exceeding the declared bound;
- configured history bound above the canonical Build 35 maximum;
- malformed diagnostics/provenance containers.

When source stores are supplied with `requireCoherence`, structural validity is not enough: the shadow must be byte-canonically equal to a fresh deterministic projection from those sources.

## Backup v3 rule: rebuild on export

A v3 backup must never trust a caller-supplied Evidence shadow.

Canonical export behaviour:

```text
six source stores
→ validate using current Build 28 source validators
→ rebuild Evidence deterministically
→ validate shadow
→ serialize 7-store backup v3
```

Even if the caller passes a stale `stores.evidence`, it is ignored and replaced by the fresh derivation.

This guarantees that a newly produced v3 backup cannot package a stale shadow merely because it looks structurally valid.

## Backup v3 rule: verify on restore

A v3 backup owns seven stores directly.

Before it can become a restore target:

```text
validate six source stores
→ validate Evidence shape
→ rederive expected Evidence from the six backup sources
→ canonical compare
```

A structurally valid but incoherent shadow fails with:

```text
evidence-source-mismatch
```

Build 36.1 does not silently repair a v3 backup mismatch because a v3 backup claims to own the seven-store state. Silent replacement would hide corruption or incoherent backup generation.

## Backup v2 migration

Historical backup v2 owns exactly the current six stores.

Build 36 target plan:

```text
v2 stores
→ canonical Recovery v2 normalization
→ restore all six owned stores
→ ignore any current-device Evidence shadow
→ rebuild Evidence from the restored six
→ produce coherent seven-store target
```

Metadata:

```text
preserveMissingIds = []
rebuildDerivedIds  = [evidence]
```

A newer device's Evidence shadow must never survive a v2 restore because it represents a different source timeline.

## Backup v1 migration

Historical backup v1 owns learner + memory only.

Current Build 28 compatibility semantics preserve the later stores that did not exist in that backup generation. Build 36.1 makes the ownership explicit:

```text
from v1:
  learner      = backup
  memory       = backup

preserve current device:
  errors
  scenarios
  listening
  milestones

never preserve:
  evidence

then:
  rebuild Evidence from the resulting six-store target
```

Metadata:

```text
preserveMissingIds = [errors, scenarios, listening, milestones]
rebuildDerivedIds  = [evidence]
```

This preserves the established old-backup compatibility contract without mixing in a stale derived shadow.

## Pure API

`src/core/data-recovery-v3-contract.js` exposes planning/validation only:

```text
STORE_SPECS               seven-store target specs
BACKUP_VERSION            3
validateEvidenceShadow()
deriveEvidenceShadow()
buildBackupV3()
normalizeBackup()
planRestore()
validateBackupV3()
```

No function in this module writes `localStorage`.

## Runtime boundary

Build 36.1 must remain true at merge:

```text
src/core/data-recovery-core.js     unchanged
src/core/data-recovery.js          unchanged
index.html                         does not load data-recovery-v3-contract.js
sw.js                              does not load/precache data-recovery-v3-contract.js
live Recovery STORE_SPECS          6
live Recovery BACKUP_VERSION       2
live Recovery Evidence spec        absent
product writers                    unchanged
```

The new v3 contract may be required by Node tests and future Build 36 code only.

## Proof matrix

The dedicated smoke requires:

- deterministic derived shadow with seven-store contract metadata;
- source fingerprint changes when source truth changes;
- stale structurally-valid shadow fails source coherence;
- unsupported dimensions are rejected;
- history bounds are enforced;
- v3 export rebuilds Evidence and ignores supplied stale Evidence;
- valid v3 round-trip plan succeeds;
- stale Evidence inside a v3 backup is rejected;
- v2 restore rebuilds Evidence and never preserves current-device Evidence;
- v1 restore preserves the four historically absent source stores and rebuilds Evidence;
- invalid/unsupported backup envelope rejection;
- current live Build 28 Recovery remains six-store / backup v2.

Historical Build 28, Build 35 projection and Build 35 transaction tests also rerun in CI.

## Exit condition for 36.1

Build 36.1 is complete when the pure v3 contract is fully certified on PR and post-merge main while live Recovery remains untouched.

Only then may Build 36.2 wire:

```text
Recovery boot repair
→ pre-migration snapshot
→ initial six→seven shadow adoption
→ Recovery-controlled write
→ reread / compare
→ rollback
→ coalesced shadow freshness after valid source writes
```

Build 36.2 still must not silently move product read-path ownership to Evidence v2.
