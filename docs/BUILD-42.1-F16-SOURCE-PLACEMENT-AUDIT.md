# Build 42.1 — F16 `à / de` contractions source + learner-placement audit

Status: **CLOSED / AUDITED / ACCEPTED**

Date: 2026-08-19

Accepted evidence:

```text
base audited    e04fc556f2c17d3254d862ba03cf60a3437d7aeb
candidate head  910db22d252f28ee325635499f3e0084451ccb67
PR              #228
merge           1481e4de07b01a0e644138f062685a800e342b12
```

This slice was evidence/audit only. It changed no runtime, curriculum, learner data, Foundations wiring, Transfer, Recovery, Evidence, voice, Premium, PWA or public version metadata.

## 1. Starting contract

The certified Foundations registry classified F16 as:

```text
F16
key      a-de-contractions
audit    partial-distributed
strategy teach-core
priority later-core
```

Build40 requested a dedicated F16 decision audit. Build41.1 deferred articles / quantities / F16 as productive Transfer input because the contraction system was not yet taught coherently enough.

Build42.1 answered two separate questions:

1. is there enough already-taught material to justify one coherent learner-facing Foundation capsule? **YES**;
2. is there enough source evidence to justify productive Transfer now? **NO**.

## 2. Target distinction — ACCEPTED

F16 concerns the mechanical combination of a preposition with the definite article once the phrase has already selected `à` or `de`:

```text
à + le   → au
à + les  → aux
de + le  → du
de + les → des
```

Non-contracted comparison forms:

```text
à la
à l’
de la
de l’
```

F16 does **not** decide which lexical/prepositional construction a noun or verb requires. It explains contraction only after `à` / `de` + definite article is the intended structure.

It must also distinguish spelling overlap from grammatical ownership: `du`, `des` and `de l’` occur elsewhere as partitives or quantity constructions. Those occurrences are not automatically F16 contraction evidence.

## 3. Real curriculum evidence

### Lessons 1–15

- lesson 3: `Je viens du Vietnam.` — real learner-facing `du` form;
- lesson 4: `De l'eau.` — surface form taught as a drink/partitive block, not F16 proof;
- lesson 8: `Les toilettes.`, `La gare.`, `La pharmacie.` plus `À gauche.` / `À droite.` — article/preposition vocabulary, no `aux` construction;
- lesson 9: `Je vais à…` — destination frame, no article contrast;
- lesson 13: `J'ai mal à la tête.` — clean non-contracted `à la` anchor.

No learner-facing `aux` item was found in this block.

### Lessons 16–25

Lesson22 is an important anti-confusion anchor:

```text
Du pain.
Du lait.
Des œufs.
```

The lesson explicitly teaches these as **partitive articles** for unspecified quantity. They must not be counted as evidence that the learner already knows `de + le / de + les` contraction.

Lesson24 adds:

```text
Je rentre à la maison.
```

Again, no learner-facing `aux` contraction appears.

### Lessons 26–40

Lesson38 is the first point where the curriculum provides a clean same-lesson contrast suitable for explaining F16 without inventing a new context:

```text
Je suis allée au restaurant.
Je suis rentrée à la maison.
```

By then article/gender/number Foundations are established; `du Vietnam` is already familiar; and lesson22 partitives have already been taught, so the teaching can explicitly separate the two grammatical jobs.

No learner-facing `aux` item was found in this block.

### Lessons 41–52

Lesson45 provides the strongest minimal reinforcement pair:

```text
J'ai mal à la tête.
J'ai mal au ventre.
```

The lexical frame and semantic role are the same; only article/gender changes. This is strong reinforcement for `à la` versus `au`.

Lesson42 uses quantity syntax:

```text
Une bouteille d'eau.
Un paquet de riz.
Un peu de…
```

That is not F16 ownership.

No learner-facing `aux` item was found here either.

## 4. Source map verdict — ACCEPTED

| Form | Real source status | Accepted verdict |
|---|---|---|
| `au` | strong | lesson38 `au restaurant`; lesson45 `au ventre` |
| `à la` | strong | lesson13/45 `à la tête`; lesson24/38 `à la maison` |
| `du` | present but distributed | lesson3 `du Vietnam`; distinguish from lesson22 partitive `du` |
| `des` as `de + les` | not safely owned | existing `des` is mainly indefinite/partitive; no clean contraction pair |
| `aux` | missing learner-facing anchor | no clean learner item found |
| `à l’` | no clean F16 learner pair | no mastery inference from unrelated elisions |
| `de la` | surface examples exist | not a clean F16 preposition+article source |
| `de l’` | surface examples exist | mostly partitive/quantity territory |

Therefore `partial-distributed` was an accurate pre-implementation classification.

## 5. Earliest pedagogically valid placement — ACCEPTED

### Lesson 38

Lesson13 is too early: it supplies `à la tête` but no contrasting contracted target.

Lesson22 should not own F16 because it explicitly teaches `du/des` as partitives. Putting F16 there would blur two grammatical jobs sharing the same surface words.

Lesson38 is the first clean point where all conditions are met:

- article/gender foundations already taught;
- `à` and `de` repeatedly encountered in real phrases;
- direct `au restaurant` / `à la maison` contrast exists in learner-facing items;
- `du Vietnam` is already an older lexical anchor;
- the partitive `du/des` system is already established and can be contrasted explicitly;
- no existing Foundation capsule owns lesson38.

Lesson45 is reinforcement, not first placement.

Accepted future learner flow:

```text
lesson 38 normal content
→ optional F16 Foundation capsule
→ return to lesson
```

No new top-level navigation is needed.

## 6. Existing Foundation infrastructure verdict — ACCEPTED

A new teaching UI is unnecessary.

Reuse:

```text
src/pedagogy/foundations-capsule-engine.js
src/pedagogy/foundations-capsules.js
src/pedagogy/foundations-pilot.js
```

The existing engine already provides localized VI/FR, deterministic checks, ephemeral-only state and `masteryClaim=false`; the learner adapter already mounts optional capsules and restores focus.

## 7. Build42.1 decision — ACCEPTED

### F16 teaching

**JUSTIFIED.**

One narrow F16 teach-core capsule at lesson38 is authorized as the next implementation slice.

The teaching may explain the complete mechanical table:

```text
à + le   → au
à + les  → aux
de + le  → du
de + les → des
```

against:

```text
à la / à l’ / de la / de l’
```

but must be explicit about provenance:

- `au restaurant`, `à la maison`, `du Vietnam` are real existing anchors;
- `aux` and contraction-`des` lack equally clean learner-facing source phrases;
- teaching-only examples must not be claimed as already acquired learner items;
- partitive/quantity `du/des/de l’` must be separated from F16 contraction.

### Productive Transfer

**NOT AUTHORIZED.**

The curriculum does not yet provide sufficient paired learner-facing evidence, especially for `aux` and contraction-`des`. Productive F16 Transfer must be re-audited only after coherent teaching is implemented and certified.

### A2

**REMAINS NOT AUTHORIZED.**

This audit changes neither durable concept/Transfer evidence nor the later A1-readiness gate.

## 8. Exact-head review evidence

PR #228 exact head `910db22d252f28ee325635499f3e0084451ccb67` was reviewed before merge.

- scope remained exactly three docs files;
- PR was mergeable;
- no review submissions or unresolved review threads existed;
- workflow review returned no new failure;
- the only red workflows were the five inherited baseline failures already documented;
- relevant Foundations 37.1→37.8, Build41.2/41.3, Runtime metadata and Release v2.5.0 guards were green.

PR #228 was then merged by squash with expected-head protection to `1481e4de07b01a0e644138f062685a800e342b12`, and `main` was re-read at that exact verified commit.

## 9. Authorized next slice

```text
Build42.2 — F16 learner-facing teach-core capsule
```

Scope:

- one F16 capsule definition in the existing Foundations collection;
- existing engine + learner adapter only;
- lesson38 only;
- VI + DEBUG FR;
- deterministic checks only;
- no curriculum item mutation;
- no new store/schema/Recovery/Evidence owner;
- no mastery claim;
- no productive Transfer implementation;
- public runtime metadata remains `v2.5.0 · Build 38` unless separately changed;
- dedicated predecessor + desktop/iPhone browser parity tribunal before candidate acceptance.

## 10. Canonical dependency chain

```text
Build42.1 source + placement audit — CLOSED / ACCEPTED
→ Build42.2 narrow F16 teach-core capsule — AUTHORIZED NEXT
→ certify learner-facing teaching
→ re-audit deterministic F16 Transfer eligibility
→ later re-run A1 readiness
→ A2 only if a separate audit explicitly authorizes it
```
