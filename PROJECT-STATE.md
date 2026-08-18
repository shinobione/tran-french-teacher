# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-19

## Canonical accepted main

- Repository: `shinobione/tran-french-teacher`
- Accepted `main`: **`8d56b8d3b3bc727570d456ec43d90ed7f31c3b62`**
- Commit: `Docs: close Build 41.2`
- Parent: `74e8b8038a35c50ee828ee4dfcff6dedd4472e22` — accepted Build41.2 pure core runtime/product checkpoint.
- PR **#221 — MERGED** from exact head `9d6606cc305aa42b8db8750bf720a5a143a69c6d`.
- PR **#222 — MERGED** from exact head `a34e5bd9cde2559e4b697c6c1f6adc5b0469ae5c`.
- `main` re-read at exact SHA `8d56b8d3...`; GitHub commit verified / valid.
- Public runtime metadata remains **v2.5.0 · Build 38**.
- Pedagogy baseline remains **v2.3.0 · Build 34**.
- Build41.2 remains pure/non-wired: no runtime loader, SW, UI, curriculum, Recovery, Evidence or learner-store change.

## Accepted product state

```text
Public runtime          v2.5.0 · Build 38
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
Build41  OPEN
Build41.1 CLOSED / AUDITED — recent-past family selected
Build41.2 CLOSED / CERTIFIED — pure recent-past transfer core
Build41 learner-placement audit COMPLETE
Build41.3 AUTHORIZED / NOT STARTED
A2       NOT AUTHORIZED
```

## Build41.2 — accepted pure core

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

No generic passé composé, no subject expansion beyond `je`, no reflexive/negation/question expansion, no random/adaptive generation and no new vocabulary.

## Learner-placement audit — COMPLETE

Canonical audit:

```text
docs/BUILD-41-RECENT-PAST-PLACEMENT-AUDIT.md
```

Evidence inspected:

- lesson 24 genuinely teaches all three source forms;
- lesson 36 explicitly teaches `venir de + infinitif` and is the first valid target-structure anchor;
- lesson 37 immediately opens starter passé composé, so delaying the activity would mix two past-time systems unnecessarily;
- the existing shared `generalization-transfer-lesson.js` renderer already owns optional, ephemeral, three-item Transfer UX on lessons 13 / 33 / 34 / 35 / 52.

Final placement verdict:

```text
learner-facing recent-past transfer  JUSTIFIED
placement                            lesson 36
timing                               after normal lesson teaching, optional
exercise count                       exactly 3
UI owner                              existing shared Transfer renderer
Build41.2 core                        byte-identical
storage/mastery                      none
public metadata                      unchanged
```

Important compatibility finding:

Build41.2 deliberately exposes a pure API (`catalog()`, `view(id)`, `transform()`, `verify()` returning a result object), while the historical shared Transfer renderer expects a Build38-style presentation API (`family`, array catalog, localized `view()`, boolean `verify()`).

Therefore direct wiring is NOT authorized.

## Next authorized implementation — Build41.3

```text
Build41.2 pure core unchanged
        ↓
new narrow read-only renderer compatibility adapter
        ↓
existing shared generalization-transfer-lesson.js
        ↓
lesson 36 optional three-item Transfer entry
```

Build41.3 boundaries:

- exact three certified Build41.2 exercises only;
- no fourth `Je regarde un film` pair;
- no generic conjugation or passé composé generator;
- adapter provides only localized UI/presentation data and delegates correctness to Build41.2;
- additive route in the existing shared Transfer renderer; no copied/forked overlay engine;
- load certified Build41.2 core + adapter before shared renderer;
- SW precache only as required for offline delivery;
- existing Build38 routes/tests must stay green;
- 52 lessons / 313 items unchanged;
- 7 durable stores / Recovery v3 unchanged;
- no Evidence write and no `transfer-construction` mastery claim;
- public runtime metadata remains `v2.5.0 · Build 38`;
- A2 remains blocked.

## CI baseline

Known persistent inherited failures:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Build26.4 remains a classified runner/harness flake, not standing debt. Any other failure is NEW until classified.

## NEXT

```text
close learner-placement audit docs
→ verify canonical main + 0 open PRs
→ materialize ONE implementation slice: Build41.3 learner-facing recent-past transfer
→ dedicated contract + real Chrome VI/FR desktop/iPhone tribunal
→ stop at candidate PR for CI control
```

No second productive family and no A2 work are authorized in Build41.3.
