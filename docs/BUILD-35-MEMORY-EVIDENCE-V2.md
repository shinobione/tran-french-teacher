# Build 35 — Memory Evidence v2 / Migration Readiness

## Slice 35.1 — Evidence v2 Contract + Projection Simulator

**Status:** candidate slice. **No durable schema adoption in this slice.**

Build 35 starts from the physically accepted Premium V5.10 runtime and the existing Build 28 Recovery contract. The goal is not to replace Recovery or immediately rewrite Trân's learner data. The first step is to define what richer evidence can be reconstructed honestly from the six current durable stores, prove that transform deterministic, and make unsupported claims explicit.

## Hard boundary

This slice adds a pure projector:

```text
six current durable stores
→ source validation
→ deterministic Evidence v2 proposal
→ bounded per-item history
→ diagnostics / provenance
→ NO localStorage write
→ NO new durable key
```

The proposed future key is named only as a contract marker:

```text
french-tranquille:memory-evidence:v2
```

It is **not** wired into `index.html`, `sw.js`, Recovery, Learning Memory, Tyffany, or any runtime producer in Slice 35.1.

## Existing owners remain authoritative

Build 28 Recovery already owns:

- the exact six durable store identities;
- raw/source validation;
- backup v1 → v2 normalization;
- snapshots;
- transactional writes;
- reread + compare;
- rollback;
- corruption quarantine.

Build 35 layers on that contract instead of reimplementing it.

Current source stores:

| Recovery id | Durable source |
|---|---|
| learner | `francais-avec-luc:learner:v1` |
| memory | `french-tranquille:learning-memory:v1` |
| errors | `french-tranquille:error-intelligence:v1` |
| scenarios | `french-tranquille:scenarios:v1` |
| listening | `french-tranquille:listening:v1` |
| milestones | `french-tranquille:milestones:v1` |

## Evidence v2 dimensions

The proposal has eleven explicit dimensions:

```text
retrieval
listening
scenario
text
recognition
construction
transfer
assistance
recency
repetition
recovery
```

Each dimension records whether it is reconstructable from current data, observation counts, success/miss/assistance/recognition counts where meaningful, last timestamp, and strongest supported state.

## Evidence states

The target vocabulary is:

```text
exposure
assisted-success
autonomous-recall
contextual-reuse
concept-understanding
novel-construction-transfer
```

Slice 35.1 deliberately does **not** manufacture states that the v1 stores cannot prove.

### Safe mappings available now

- learner `knownItems` → exposure exists;
- successful explicit review evidence → autonomous recall;
- durable `scenario-success` memory evidence → contextual reuse;
- Listening meaning/contrast events → Listening success/miss evidence when the durable event contains an attributable item id;
- Error Intelligence text mismatch / partial → text miss evidence;
- Error Intelligence retrieval difficulty → retrieval miss evidence;
- Error Intelligence recovery timestamp/count → recovery evidence;
- replays/repeated misses → repetition evidence;
- model use → assistance observed.

### Claims intentionally NOT reconstructed

Current v1 durable history cannot safely recreate:

- construction evidence;
- transfer evidence;
- concept-understanding evidence;
- a complete historical sequence of every practice attempt;
- per-item ownership for old Listening dialogue events;
- per-item ownership for Scenario aggregate counters;
- item-level meaning from Milestone flags.

Those gaps are emitted as diagnostics rather than silently filled.

## Voice / recognition safety rule

`voice-unrecognized` is **recognition-system evidence only**.

It must never be converted into:

- a pronunciation failure;
- proof that Trân pronounced the phrase badly;
- a negative speech mastery score.

The v2 proposal therefore maps it to:

```text
dimension = recognition
outcome   = unrecognized
```

with `recognitionOnly: true` provenance.

## Assistance safety rule

Using a model in Scenario is durable evidence that assistance was needed. It is **not by itself proof of an assisted success**.

Therefore old `scenario-assisted` / `assisted` evidence projects as:

```text
dimension = assistance
outcome   = assisted
state     = exposure
```

A future runtime may record a genuine `assisted-success` only when the successful outcome itself is explicitly observed.

## Bounded history

The proposed item history is capped at:

```text
24 events / item
```

The transform deduplicates by deterministic source identity, sorts stably, and retains only the newest bounded tail. Tests also exercise a smaller custom limit to prove the bound is enforced.

This keeps the future model finite before any adoption decision.

## Determinism

`simulate(stores)`:

1. canonicalizes the source;
2. projects twice;
3. compares both projections byte-for-byte in canonical form;
4. verifies the input object is unchanged;
5. returns a proposal only — never writes storage.

No `Date.now()` or random id participates in the projected payload.

## Old backup compatibility boundary

The projector accepts a normalized Recovery **backup v2** payload. A raw backup v1 is rejected with `backup-normalization-required` rather than implementing a second migration path.

The browser proof exercises the intended chain:

```text
old backup v1
→ Build 28 Recovery normalizeBackup()
→ normalized backup v2
→ Evidence v2 projection
```

That preserves one canonical backup migration owner.

## Invalid source handling

Unsupported source schemas do not get coerced. The dry-run returns:

```text
ok: false
issues: [...]
quarantineCandidates: [...]
```

No quarantine is physically written in Slice 35.1. Transactional simulation in a later Build 35 slice will reuse Recovery's real snapshot/quarantine/rollback mechanisms.

## Proof in this slice

### Node contract smoke

`tests/smoke/build35-memory-evidence-v2-smoke.js` verifies:

- deterministic projection;
- source object byte-equivalence before/after;
- all 11 dimensions;
- bounded item history;
- retrieval / Listening / Scenario / assistance / recovery mappings;
- recognition miss is not pronunciation failure;
- model use does not fabricate assisted success;
- unsupported source schema is rejected and proposed for quarantine;
- normalized backup v2 projects;
- raw backup v1 requires Recovery normalization.

### Real-browser dry run

`tests/browser/build35-memory-evidence-v2-projection.html` seeds all six Recovery stores, runs the projector in Chrome, then requires:

- deterministic projection;
- exact six-store raw map unchanged;
- proposed v2 durable key absent;
- all dimensions present;
- recognition safety intact;
- backup v1 → Recovery normalization → v2 projection works.

## What this slice does NOT do

- no change to `app.js`;
- no change to `learning-memory.js`;
- no change to Error / Listening / Scenario writers;
- no change to Recovery code;
- no `index.html` runtime wiring;
- no Service Worker/cache change;
- no new durable localStorage key;
- no learner migration;
- no Build 36 adoption.

## Next Build 35 slice after this candidate is certified

The next slice should use this pure contract with Build 28 Recovery to implement **transactional migration simulation only**:

```text
pre-migration snapshot
→ source validation
→ Evidence v2 deterministic transform
→ simulated transactional write to isolated storage
→ reread
→ compare
→ rollback
→ invalid-source quarantine proof
→ historical learner fixture proof
```

Even that next slice must still stop short of durable production adoption. Build 36 remains the earliest adoption candidate.
