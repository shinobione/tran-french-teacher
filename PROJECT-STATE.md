# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-19

## Canonical accepted main

- Repository: `shinobione/tran-french-teacher`
- Accepted `main`: **`74e8b8038a35c50ee828ee4dfcff6dedd4472e22`**
- Commit: `Build 41.2: recent-past deterministic transfer core`
- PR **#221 — MERGED** from exact head `9d6606cc305aa42b8db8750bf720a5a143a69c6d`.
- Parent: `7739418fd97a01df4bd1b67c27ccadb8fd3cd14a` — Build41.1 productive-family audit.
- Merge commit is GitHub verified / valid.
- PR #221 exact-head dedicated Build41.2 tribunal: **SUCCESS**.
- PR #221 full matrix completed at the exact inherited five-failure baseline; no new red remained.
- **0 open PRs** immediately after #221 merge and before this docs closeout branch.
- Public runtime metadata remains **v2.5.0 · Build 38**.
- Pedagogy baseline remains **v2.3.0 · Build 34**.
- Build41.2 is pure/non-wired: no runtime loader, SW, UI, curriculum, Recovery, Evidence or learner-store change.

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
A2       NOT AUTHORIZED
```

## Build41.2 — accepted pure core

Owner:

```text
src/pedagogy/generalization-recent-past-core.js
FrenchTranquilleRecentPastTransferCore
```

Metadata:

```text
roadmapSlice = 41.2
version = 1.0.0-recent-past-core
familyId = present-je-regular-action-to-recent-past-je-venir-de
status = pure-non-wired
sourceLessons = [24]
anchorLessons = [36]
subject = je
structure = venir-de-infinitive
masteryClaim = false
durableWrite = false
runtimeWiring = false
```

Certified catalog exactly:

```text
Je travaille.          → Je viens de travailler.
Je mange.              → Je viens de manger.
Je rentre à la maison. → Je viens de rentrer à la maison.
```

API:

```text
catalog()
view(id)
transform(source)
verify(idOrSource, answer)
```

Unknown sources return `null`; this is not a generic French conjugation engine.

Explicit exclusions remain:

```text
generic passé composé
subject expansion beyond je
reflexive recent-past transformation
negation / questions
random/adaptive generation
new vocabulary
learner-facing placement
loader / service-worker wiring
storage / Evidence / durable write / mastery claim
```

The fourth 41.1 audit anchor `Je regarde un film. → Je viens de regarder un film.` remains deliberately outside the first core.

## CI baseline

Known persistent inherited failures:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Build26.4 remains a classified runner/harness flake, not standing debt. Any other failure is NEW until classified.

## NEXT

Do **not** wire Build41.2 automatically.

```text
audit learner-facing placement separately
→ inspect real lesson 24 and lesson 36 ownership/content
→ inspect shared Build38 Transfer renderer/placement patterns without mutating them
→ decide whether a recent-past exercise is pedagogically additive rather than duplicate teaching
→ select exact placement and interaction only if justified
→ only then assign/materialize the next Build41 slice
```

No A2 work is authorized.
