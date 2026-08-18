# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-18

## Canonical accepted main

- Repository: `shinobione/tran-french-teacher`
- Accepted `main`: **`7739418fd97a01df4bd1b67c27ccadb8fd3cd14a`**
- Commit: `Build 41.1: select recent-past productive family`
- PR **#220 — MERGED** from exact head `8d8e8275a412944a9f9b24da42d333d8e25577d2` with expected-head squash protection.
- Parent: `7fb5b66ab992852cd4f73aa4d05fa01b1a9b5b25` — Build40 audit.
- Merge commit is GitHub verified / valid.
- `main` was re-read at exact SHA `7739418f...`; **0 open PRs before Build41.2 branch creation**.
- Public runtime metadata remains **v2.5.0 · Build 38**.
- Pedagogy baseline remains **v2.3.0 · Build 34**.
- Latest exact public release deployment proof remains GitHub Pages #272 / run `32072053127` on release SHA `2abe20511d6265d12643276f18041812fec3e715`.

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
Build41.2 ACTIVE / PURE CORE CANDIDATE
A2       NOT AUTHORIZED
```

## Build41.1 accepted verdict

Canonical audit:

```text
docs/BUILD-41.1-PRODUCTIVE-FAMILY-AUDIT.md
```

Candidate classification:

```text
questions                         REJECT — TOO SEMANTIC / AMBIGUOUS
past-time recombination           IMPLEMENTABLE — SELECTED NARROW RECENT-PAST FAMILY
articles / quantities / F16       DEFER — NEEDS BETTER SOURCES
possessives                       ALREADY COVERED / DUPLICATE
adjective agreement               DEFER — NEEDS BETTER SOURCES
short narration                   REJECT — TOO SEMANTIC / AMBIGUOUS
opinion clauses                   REJECT — TOO SEMANTIC / AMBIGUOUS
```

Selected family:

```text
present-je-regular-action
→ recent-past-je-venir-de
```

## Build41.2 — recent-past deterministic transfer core — ACTIVE CANDIDATE

Branch:

```text
build41/recent-past-transfer-core
```

Base:

```text
7739418fd97a01df4bd1b67c27ccadb8fd3cd14a
```

New pure owner:

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

Certified catalog candidate exactly:

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

Unknown source returns `null` from `transform()`; the core never tries to conjugate an unseen French verb.

Explicit exclusions:

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

## 41.2 intended scope

```text
.github/workflows/build41-2-recent-past-transfer.yml
PROJECT-STATE.md
docs/BUILD-41.2-RECENT-PAST-TRANSFER-CORE.md
src/pedagogy/generalization-recent-past-core.js
tests/unit/build41-2-recent-past-transfer.test.cjs
```

No Build38, Build39, curriculum, Foundations, loader, SW, UI, voice, Recovery, Evidence or Premium owner may change.

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
materialize Build41.2 candidate PR
→ dedicated pure-core tribunal
→ exact-head full matrix classification
→ merge only at five-failure baseline
→ verify main
→ audit learner placement separately
```
