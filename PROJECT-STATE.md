# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-19

## Canonical accepted main

- Repository: `shinobione/tran-french-teacher`
- Accepted `main`: **`39ea5fe5d51b272fcdcbfb3a8c66dfdea2b03d42`**
- Commit: `Build 41.3: learner-facing recent-past transfer`
- Parent: `701cee6b7a0434fb2beb515a9030532dd78b3c46` — learner-placement audit checkpoint.
- PR **#224 — MERGED** from exact head `bf91b6fb6325c86cf1728b8c0c4c08f68f6f6fdd` with expected-head protection.
- `main` was re-read after merge and points exactly to `39ea5fe5...`; GitHub commit is verified / valid.
- Public runtime metadata remains **v2.5.0 · Build 38**.
- Pedagogy baseline remains **v2.3.0 · Build 34**.
- Pages deployment for this merge SHA was **not independently verified in the connector session**; do not equate merge with deployment proof.

## Accepted product state

```text
Public runtime metadata v2.5.0 · Build 38
Pedagogy baseline       v2.3.0 · Build 34
Curriculum              52 lessons / 313 items
Scenario                44 situations / 132 turns
Listening               17 contrast families / 18 contextual dialogues
Listening speed         0.88 normal / 0.65 slow
Speaking Loop           52/52 · max 2 moments / lesson
Recovery                7 durable stores / backup v3
Evidence v2             derived shadow only
Original six stores     product truth
Premium V5.10           CLOSED / physical field pass
```

## Historical learner continuity — LOCKED

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

No future work may reset, renumber or reinterpret this state.

## Milestone state

```text
Build38  CLOSED / RELEASED
Build39  CLOSED / CERTIFIED
Build40  CLOSED — A1 Productive Consolidation selected
Build41  OPEN — closure audit pending
Build41.1 CLOSED / AUDITED — recent-past family selected
Build41.2 CLOSED / CERTIFIED — pure recent-past transfer core
Build41 learner-placement audit COMPLETE
Build41.3 CLOSED / MERGED / CI-CERTIFIED
A2       NOT AUTHORIZED
```

No Build41.4 or second productive family is authorized merely because Build41.3 closed.

## Build41.2 — immutable certified source

Owner:

```text
src/pedagogy/generalization-recent-past-core.js
FrenchTranquilleRecentPastTransferCore
```

Certified catalog exactly:

```text
Je travaille.          → Je viens de travailler.
Je mange.              → Je viens de manger.
Je rentre à la maison. → Je viens de rentrer à la maison.
```

Contract remains:

```text
status = pure-non-wired
masteryClaim = false
durableWrite = false
runtimeWiring = false
```

Build41.3 preserved this core unchanged and consumes it only through a narrow read-only renderer adapter.

## Build41.3 — accepted learner-facing integration

Canonical document:

```text
docs/BUILD-41.3-RECENT-PAST-LEARNER-INTEGRATION.md
```

Accepted chain:

```text
Build41.2 pure core unchanged
        ↓
Build41.3 read-only renderer compatibility adapter
        ↓
existing shared Build38 Transfer renderer
        ↓
lesson 36 optional three-item Transfer entry
```

Adapter owner:

```text
src/pedagogy/generalization-recent-past-renderer-adapter.js
FrenchTranquilleRecentPastTransferAdapter
```

Learner placement:

```text
lesson 36 normal teaching
→ optional recent-past Transfer
→ exactly 3 deterministic exercises
→ return to lesson
```

Exact three exercises only:

```text
Je travaille.          → Je viens de travailler.
Je mange.              → Je viens de manger.
Je rentre à la maison. → Je viens de rentrer à la maison.
```

Hard boundaries remain:

- no fourth `Je regarde un film` pair;
- no generic recent-past or passé composé generator;
- no subject expansion beyond `je`;
- no curriculum item/lesson change;
- no new durable store or Recovery migration;
- no Evidence write;
- no Foundation/Transfer mastery claim;
- no `app.js`, voice, Premium or branding change;
- all historical Build38 Transfer routes remain protected;
- A2 remains blocked.

## Build41.3 exact-head CI evidence

Candidate head:

```text
bf91b6fb6325c86cf1728b8c0c4c08f68f6f6fdd
```

Dedicated gate:

```text
Build 41.3 Learner-facing recent-past transfer
run 32198077009  SUCCESS
job 95906031546 SUCCESS
```

Dedicated job passed:

- syntax + predecessor contracts;
- 41.3 adapter unit tribunal;
- 41.2 purity / byte-identity guard;
- scope guard;
- Chrome VI desktop;
- Chrome DEBUG FR desktop;
- Chrome VI 390×844;
- Chrome DEBUG FR 390×844;
- three real answer interactions;
- storage unchanged;
- focus return;
- no horizontal overflow.

The exact-head full matrix returned to the known inherited five-red baseline with **no new red**.

## CI baseline

Known persistent inherited failures:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Build26.4 remains a classified runner/harness flake, not standing debt. Any other failure is NEW until classified.

## Deployment state

Build41.3 is **merged and CI-certified**.

The current connector could not independently list the push-triggered Pages run for merge SHA `39ea5fe5...`. Therefore this checkpoint intentionally does **not** claim a Pages run ID or physical-device PASS for Build41.3.

## NEXT

No implementation slice is currently authorized.

```text
verify Pages/deployment for 39ea5fe5... when independently retrievable
→ audit Build41 as a milestone after its first complete productive-consolidation family
→ decide from evidence whether Build41 can close or whether another narrow productive family is justified
→ only then authorize a named next slice
```

Until that audit is complete:

- do not invent Build41.4;
- do not start a second productive family;
- do not start A2;
- do not add a durable Transfer mastery store merely to make consolidation look more measurable.
