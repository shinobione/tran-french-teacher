# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-19

## Canonical accepted main

- Repository: `shinobione/tran-french-teacher`
- Accepted `main`: **`701cee6b7a0434fb2beb515a9030532dd78b3c46`**
- Commit: `Docs: audit Build 41 recent-past learner placement`
- Parent: `8d56b8d3b3bc727570d456ec43d90ed7f31c3b62` — Build41.2 closeout checkpoint.
- PR **#221 — MERGED** — Build41.2 pure recent-past core.
- PR **#222 — MERGED** — Build41.2 closeout docs.
- PR **#223 — MERGED** — learner-placement audit authorizing Build41.3.
- `main` was re-read at exact SHA `701cee6b...`; GitHub commit is verified / valid.
- **0 open PRs** existed immediately before Build41.3 materialization.
- Public runtime metadata remains **v2.5.0 · Build 38**.
- Pedagogy baseline remains **v2.3.0 · Build 34**.

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
Build41.3 CANDIDATE / NOT MERGED — PR #224
A2       NOT AUTHORIZED
```

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

The Build41.2 core must remain byte-identical in Build41.3.

## Build41.3 — active candidate

PR:

```text
#224 — Build 41.3 · learner-facing recent-past transfer
branch: build41/recent-past-learner-integration
base:   701cee6b7a0434fb2beb515a9030532dd78b3c46
state:  OPEN / CANDIDATE / NOT MERGED
```

Canonical implementation document:

```text
docs/BUILD-41.3-RECENT-PAST-LEARNER-INTEGRATION.md
```

Architecture:

```text
Build41.2 pure core unchanged
        ↓
Build41.3 read-only renderer compatibility adapter
        ↓
existing shared Build38 Transfer renderer
        ↓
lesson 36 optional three-item Transfer entry
```

New adapter owner:

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

Runtime delivery:

- Build32 loader loads Build41.2 core then Build41.3 adapter before the historical shared Transfer renderer;
- SW pre-caches core + adapter for offline/PWA;
- the historical shared renderer keeps its Build38 identity/version token;
- public runtime metadata remains `v2.5.0 · Build 38`.

Hard boundaries:

- exact three certified Build41.2 exercises only;
- no fourth `Je regarde un film` pair;
- no generic recent-past or passé composé generator;
- no subject expansion beyond `je`;
- no curriculum item/lesson change;
- no new durable store or Recovery migration;
- no Evidence write;
- no Foundation/Transfer mastery claim;
- no `app.js`, voice, Premium or branding change;
- A2 remains blocked.

Dedicated candidate tribunal:

```text
Build 41.3 Learner-facing recent-past transfer
```

It is designed to verify Build41.2 purity, adapter determinism, all historical Build38 Transfer routes, VI/DEBUG FR, desktop + 390×844, three real answer clicks, focus return, storage byte-identity, offline delivery and no horizontal overflow.

A local replay from this ChatGPT environment could not be executed because the local container has no DNS/network route to GitHub. No local PASS is claimed. PR Actions is the executable candidate gate.

## CI baseline

Known persistent inherited failures:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Build26.4 remains a classified runner/harness flake, not standing debt. Any other failure is NEW until classified.

## NEXT

Per `AGENTS.md`, stop at the candidate boundary:

```text
review PR #224 exact-head CI
→ classify every new red
→ merge only if Build41.3 dedicated tribunal is green and matrix returns to inherited baseline
→ verify main / Pages
→ closeout Build41.3
```

Do not start Build41.4, a second productive family or A2 before that boundary is closed.
