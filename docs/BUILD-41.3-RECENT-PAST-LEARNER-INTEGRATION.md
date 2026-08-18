# Build 41.3 — Learner-facing recent-past transfer

Status: **CANDIDATE / NOT MERGED**

Base: `701cee6b7a0434fb2beb515a9030532dd78b3c46`

Build41.3 implements the learner placement authorized by `docs/BUILD-41-RECENT-PAST-PLACEMENT-AUDIT.md`.

## Pedagogical placement

The activity exists **only in lesson 36**, after the normal lesson has taught `venir de + infinitif` and before lesson 37 begins starter passé composé.

Flow:

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

Build41.2 remains the certified source of truth and is not modified.

```text
Build41.2 pure core
        ↓
Build41.3 read-only renderer compatibility adapter
        ↓
existing shared Build38 Transfer renderer
        ↓
lesson 36 optional activity
```

New presentation adapter:

```text
src/pedagogy/generalization-recent-past-renderer-adapter.js
FrenchTranquilleRecentPastTransferAdapter
```

The adapter provides only the historical renderer shape (`family`, `catalog`, localized `view()`, boolean `verify()`). Correctness delegates to `FrenchTranquilleRecentPastTransferCore.verify()`.

Distractors test only the already-taught structure:

- missing `de`;
- finite verb after `de` instead of the infinitive.

No passé composé distractor is introduced.

## Runtime delivery

`src/core/build32-loader.js` loads in this order:

```text
Build41.2 recent-past pure core
→ Build41.3 compatibility adapter
→ existing shared generalization-transfer-lesson.js
```

The historical shared renderer keeps its existing Build38 cache/version identity so predecessor tribunals remain successor-safe.

`sw.js` pre-caches the Build41.2 core and Build41.3 adapter for offline delivery. Public runtime metadata remains intentionally:

```text
v2.5.0 · Build 38
```

Pedagogy baseline remains `v2.3.0 · Build 34`.

## Hard boundaries

Build41.3 does not:

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
- open A2.

## Dedicated tribunal

`Build 41.3 Learner-facing recent-past transfer` verifies:

- Build41.2 unit/purity predecessor;
- Build41.3 adapter contract;
- Build38 learner-facing routes 13 / 33 / 34 / 35 / 52;
- release v2.5 Build38 predecessor;
- exact three recent-past exercises;
- lesson36-only placement;
- real click-through of all three answers;
- VI + DEBUG FR;
- desktop + 390×844 parity;
- minimum 44 px controls;
- focus return after closing;
- no localStorage mutation;
- no horizontal overflow;
- public runtime metadata unchanged;
- Build41.2 core byte-identical to `main`.

CI review and merge are a separate session boundary under `AGENTS.md`.
