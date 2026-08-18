# Build 41.3 — Learner-facing recent-past transfer

Status: **CLOSED / MERGED / CI-CERTIFIED**

Accepted PR: **#224 — Build 41.3 · learner-facing recent-past transfer**

```text
base accepted before merge  701cee6b7a0434fb2beb515a9030532dd78b3c46
candidate head              bf91b6fb6325c86cf1728b8c0c4c08f68f6f6fdd
merge commit                39ea5fe5d51b272fcdcbfb3a8c66dfdea2b03d42
```

Build41.3 implements the learner placement authorized by `docs/BUILD-41-RECENT-PAST-PLACEMENT-AUDIT.md`.

## Pedagogical placement

The activity exists **only in lesson 36**, after the normal lesson has taught `venir de + infinitif` and before lesson 37 begins starter passé composé.

```text
lesson 36 normal content
→ optional Transfer card
→ exactly 3 deterministic reconstructions
→ return to lesson
```

The three certified transformations are exactly:

```text
Je travaille.          → Je viens de travailler.
Je mange.              → Je viens de manger.
Je rentre à la maison. → Je viens de rentrer à la maison.
```

The fourth audit anchor `Je regarde un film. → Je viens de regarder un film.` remains excluded.

## Architecture

Build41.2 remains the certified source of truth and was not modified by Build41.3.

```text
Build41.2 pure core
        ↓
Build41.3 read-only renderer compatibility adapter
        ↓
existing shared Build38 Transfer renderer
        ↓
lesson 36 optional activity
```

Presentation adapter:

```text
src/pedagogy/generalization-recent-past-renderer-adapter.js
FrenchTranquilleRecentPastTransferAdapter
```

The adapter supplies only the historical renderer shape (`family`, `catalog`, localized `view()`, boolean `verify()`). Correctness delegates to `FrenchTranquilleRecentPastTransferCore.verify()`.

Distractors test only the already-taught `venir de + infinitif` structure: missing `de`, or a finite verb after `de` instead of the infinitive. No passé composé distractor was introduced.

## Runtime delivery

`src/core/build32-loader.js` loads in this order:

```text
Build41.2 recent-past pure core
→ Build41.3 compatibility adapter
→ existing shared generalization-transfer-lesson.js
```

`sw.js` pre-caches the Build41.2 core and Build41.3 adapter for offline/PWA delivery.

The historical shared renderer keeps its Build38 identity/version token so predecessor tribunals stay successor-safe.

Public metadata intentionally remains:

```text
runtime            v2.5.0 · Build 38
pedagogy baseline  v2.3.0 · Build 34
```

## Hard boundaries preserved

Build41.3 did not:

- modify the Build41.2 pure core;
- add generic recent-past conjugation;
- add passé composé generation;
- expand beyond subject `je`;
- add reflexive/negative/question transformations;
- add the fourth audit example;
- modify curriculum lesson/item semantics;
- create or migrate durable stores;
- write Evidence;
- claim Foundation/Transfer mastery;
- modify `app.js`, `voice-ios.js`, `free-voice.js`, branding, Premium or Recovery owners;
- authorize A2.

## Exact-head certification

Candidate exact head:

```text
bf91b6fb6325c86cf1728b8c0c4c08f68f6f6fdd
```

Dedicated workflow:

```text
Build 41.3 Learner-facing recent-past transfer
run 32198077009  SUCCESS
job 95906031546 SUCCESS
```

The job passed all dedicated steps, including:

- syntax + certified predecessor contracts;
- Build41.3 adapter unit tribunal;
- Build41.2 purity / byte-identity guard;
- Build38 historical learner-facing route contracts;
- Build41.3 scope guard;
- real Chrome VI + DEBUG FR desktop;
- real Chrome VI + DEBUG FR at 390×844;
- three real answer clicks;
- minimum target geometry;
- focus return;
- unchanged localStorage sentinel;
- no horizontal overflow.

The exact-head full matrix returned to the inherited five-red baseline and introduced no new failure.

## Merge verification

PR #224 was squash-merged with expected-head protection.

`main` was re-read after merge and pointed exactly to:

```text
39ea5fe5d51b272fcdcbfb3a8c66dfdea2b03d42
```

The GitHub commit is verified/valid and has parent `701cee6b7a0434fb2beb515a9030532dd78b3c46`.

## Deployment distinction

This closeout certifies **merged + exact-head CI green for the new slice**. The connector session did not expose a reliable push-triggered Pages run listing for the merge SHA, so no separate Pages-green run ID is claimed here.

A future control session may record deployment proof when it is independently retrievable. Do not reinterpret the merge itself as deployment evidence.
