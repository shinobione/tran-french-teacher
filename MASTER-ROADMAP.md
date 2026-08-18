# French Trân’quille — MASTER ROADMAP

> Canonical current roadmap. Future sessions must read `AGENTS.md` → `PROJECT-STATE.md` → this file → live GitHub.
>
> Historical long-form roadmap state remains preserved under `docs/archive/`.

## Canonical checkpoint — 2026-08-19

```text
accepted main                 8d56b8d3b3bc727570d456ec43d90ed7f31c3b62
public runtime                v2.5.0 · Build 38
pedagogy baseline             v2.3.0 · Build 34
curriculum                    52 lessons / 313 items
scenario                      44 situations / 132 turns
listening                     17 contrast families / 18 contextual dialogues
speaking loop                 52/52 · max 2 moments / lesson
recovery                      7 durable stores / backup v3
evidence v2                   derived shadow only; original six stores product truth
Build38                       CLOSED / RELEASED
Build39 LI3                   CLOSED / CERTIFIED
Build40 A1 audit              CLOSED / PRODUCTIVE CONSOLIDATION SELECTED
Build41                       OPEN
Build41.1                     CLOSED / AUDITED
Build41.2                     CLOSED / CERTIFIED PURE CORE
Build41 placement audit       COMPLETE
Build41.3                     AUTHORIZED / NOT STARTED
A2                            NOT AUTHORIZED
```

Historical learner continuity remains LOCKED:

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

## Permanent workflow

```text
audit real owners
→ one coherent slice
→ branch from accepted main
→ implementation + dedicated tribunal when runtime changes
→ candidate PR
→ exact-head review
→ classify every new red
→ expected-head merge
→ verify main
→ closeout docs
→ next slice
```

A suspected flake is rerun unchanged before product mutation. Repo/live GitHub wins over stale docs/chat.

## Permanent safety boundaries

- no fake pronunciation score;
- recognition failure is not mastery evidence;
- no learner-data reset/renumber/reinterpretation;
- Recovery remains 7 stores / backup v3;
- Evidence v2 remains derived shadow until an explicit future cutover decision;
- no durable store/schema merely to make intelligence look smarter;
- preserve 52 lesson IDs / 313 item semantics;
- Build27 App Shell remains learner route/action owner;
- Premium V5.10 field-approved navigation remains protected;
- Build37 Foundations ownership/routes remain historical contracts;
- Build38 deterministic cores/placements/shared Transfer renderer remain historical contracts;
- Build39.1→39.5 semantics remain protected;
- `app.js`, `voice-ios.js`, `free-voice.js`, `assets/LOGO.png`, `assets/Favicon.png`, Build30 runtime bridge/contracts remain sanctuaries unless explicitly justified.

## Closed milestone summary

### Build37 — Foundations — CLOSED

F01→F18 registry established without a persistent Foundations mastery store. F16 `à / de` contractions remains deferred teach-core debt.

### Build38 — Generalization & Transfer — CLOSED / RELEASED

```text
38.1→38.2 subject substitution       lesson 33
38.3→38.8 affirmation → negation     lesson 34
38.4→38.5 present → futur proche     lesson 35
38.6→38.7 singular → plural nominal  lesson 13
38.9→38.10 nous → spoken on          lesson 52
```

Build38.11 is NOT AUTHORIZED. Public runtime release is `v2.5.0 · Build 38`.

### Build39 — Learner Intelligence 3 — CLOSED / CERTIFIED

```text
39.1 arbitration
→ 39.2 reliable evidence adapter
→ 39.3 decision pipeline
→ 39.4 read-only runtime snapshot
→ 39.5 advisory-only Practice recommendation
```

Reliable families: `phrase-retrieval`, `listening`, `scenario`.
Unavailable without trustworthy durable owner: `concept-review`, `foundation-capsule`, `transfer-construction`.
No auto-route, no `Parler` fallback, no invented mastery.

### Build40 — A1 Consolidation Audit — CLOSED

Canonical audit: `docs/BUILD-40-A1-CONSOLIDATION-AUDIT.md`.

Verdict:
- A1 thematic/content breadth is already strong;
- main weakness = productive generalization depth + trustworthy construction evidence;
- A2 now = REJECTED;
- broad A1+ phrase expansion = not selected;
- **A1 Productive Consolidation = selected direction**.

## Build41 — A1 Productive Consolidation — OPEN

### 41.1 productive-family audit — CLOSED / AUDITED

Canonical audit: `docs/BUILD-41.1-PRODUCTIVE-FAMILY-AUDIT.md`.

Selected narrow family:

```text
present-je-regular-action
→ recent-past-je-venir-de
```

Generic passé composé transformation is NOT authorized.

### 41.2 recent-past deterministic transfer core — CLOSED / CERTIFIED

Accepted PR: **#221**.
Accepted merge commit:

```text
74e8b8038a35c50ee828ee4dfcff6dedd4472e22
```

Pure owner:

```text
src/pedagogy/generalization-recent-past-core.js
FrenchTranquilleRecentPastTransferCore
```

Certified catalog:

```text
Je travaille.          → Je viens de travailler.
Je mange.              → Je viens de manger.
Je rentre à la maison. → Je viens de rentrer à la maison.
```

Contract:
- pure static deterministic core;
- unknown sources return `null`;
- no generic passé composé;
- no subject expansion beyond `je`;
- no reflexive/negation/question expansion;
- no random/adaptive generation;
- no new vocabulary;
- no learner-facing wiring;
- no loader/SW wiring;
- no storage / Evidence / durable write / mastery claim;
- Build38/Build39 owners untouched.

### Learner-placement audit — COMPLETE

Canonical audit:

```text
docs/BUILD-41-RECENT-PAST-PLACEMENT-AUDIT.md
```

Verified prerequisite chain:

```text
lesson 24
→ teaches all 3 certified present sources

lesson 36
→ explicitly teaches venir de + infinitif
→ first valid target-structure anchor

lesson 37
→ begins passé composé starter blocks
```

Therefore placement before lesson 36 is invalid, and delaying beyond lesson 36 would mix the first recent-past consolidation with a second past-time system unnecessarily.

Selected placement:

```text
lesson 36 normal content
→ optional recent-past Transfer
→ exactly 3 deterministic transformations
→ return to lesson
```

Why this is additive rather than duplicate:
- lesson 36 teaches rule + model phrases + narrow challenge;
- the Transfer asks the learner to start from known lesson-24 present actions and reconstruct a new temporal meaning;
- `Je viens de travailler.` is a genuinely new combination of already-known pieces;
- the activity remains optional, ephemeral and non-mastery-claiming.

#### Existing UI owner

Reuse:

```text
src/pedagogy/generalization-transfer-lesson.js
```

Do not create a second learner-facing Transfer engine.

Existing renderer already owns optional three-item reconstruction UX on lessons 13 / 33 / 34 / 35 / 52.

#### Compatibility finding

Build41.2 intentionally exposes a pure API that is not identical to the historical Build38 renderer API.

Therefore direct wiring is NOT authorized and the certified 41.2 core must remain byte-identical.

## Next authorized implementation — Build41.3

**Build41.3 = learner-facing recent-past transfer.**

Architecture:

```text
Build41.2 pure core (unchanged)
        ↓
new narrow read-only renderer compatibility adapter
        ↓
existing shared generalization-transfer-lesson.js
        ↓
lesson 36 optional Transfer entry
```

Mandatory Build41.3 boundaries:
- exact three certified Build41.2 exercises only;
- no fourth `Je regarde un film` pair;
- adapter only supplies presentation data / deterministic choices and delegates verification to Build41.2;
- additive route in the shared renderer; do not copy/fork overlay UI;
- Build41.2 core remains byte-identical;
- load core + adapter before the shared renderer;
- update SW only as required for offline delivery;
- preserve all historical Build38 routes and tribunals;
- no curriculum item/lesson ID change;
- no store/schema/Recovery change;
- no Evidence write and no LI3 `transfer-construction` mastery claim;
- public metadata remains `v2.5.0 · Build 38`;
- one implementation slice only, stop at candidate PR.

Recommended distractors should test the taught `venir de + infinitif` structure without introducing lesson-37 passé composé prematurely, e.g. target / missing `de` / finite verb after `de`.

A2 remains NOT AUTHORIZED.

## CI baseline

Known persistent inherited failures:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Build26.4 is a classified runner/harness flake, not standing debt. Any other red is NEW until classified.

## NEXT

```text
close learner-placement audit docs
→ verify canonical main + 0 open PRs
→ materialize Build41.3 learner-facing recent-past transfer
→ dedicated contracts + real Chrome VI/FR desktop/iPhone tribunal
→ stop at candidate PR for separate CI control
```
