# Build 42.1 — F16 `à / de` contractions source + learner-placement audit

Status: **AUDIT CANDIDATE / READ-ONLY**

Date: 2026-08-19

Base audited:

```text
e04fc556f2c17d3254d862ba03cf60a3437d7aeb
```

This slice is evidence/audit only. It does not change runtime, curriculum, learner data, Foundations wiring, Transfer, Recovery, Evidence, voice, Premium, PWA or public version metadata.

## 1. Starting contract

The certified Foundations registry still classifies F16 as:

```text
F16
key      a-de-contractions
audit    partial-distributed
strategy teach-core
priority later-core
```

Build40 explicitly asked for a dedicated F16 decision audit. Build41.1 then deferred articles / quantities / F16 as productive Transfer input because the contraction system was not yet taught coherently enough.

Build42.1 therefore asks two separate questions:

1. is there enough already-taught material to justify one coherent learner-facing Foundation capsule?
2. is there enough source evidence to justify productive Transfer now?

Those answers do not have to be the same.

## 2. Target distinction

F16 concerns the mechanical combination of a preposition with the definite article once the phrase has already selected `à` or `de`:

```text
à + le   → au
à + les  → aux
de + le  → du
de + les → des
```

The non-contracted comparison forms are:

```text
à la
à l’
de la
de l’
```

F16 must **not** pretend to decide which lexical/prepositional construction a noun or verb requires. It explains contraction only after `à` / `de` + definite article is already the intended structure.

It must also distinguish spelling overlap from grammatical ownership: `du`, `des` and `de l’` already occur elsewhere in the curriculum as partitives or quantity constructions. Those occurrences are not automatically F16 contraction evidence.

## 3. Real curriculum evidence

### Lessons 1–15

Useful anchors already exist, but they are distributed:

- lesson 3: `Je viens du Vietnam.` — real learner-facing `du` form;
- lesson 4: `De l'eau.` — useful surface form, but taught as a drink/partitive block, not as F16 proof;
- lesson 8: `Les toilettes.`, `La gare.`, `La pharmacie.` plus `À gauche.` / `À droite.` — useful known article/preposition vocabulary, but no `aux` construction;
- lesson 9: `Je vais à…` — `à` is known as a destination frame, but no article contrast;
- lesson 13: `J'ai mal à la tête.` — clean non-contracted `à la` anchor.

No learner-facing `aux` item was found in this block.

### Lessons 16–25

Lesson 22 is an important **anti-confusion** anchor:

```text
Du pain.
Du lait.
Des œufs.
```

The lesson explicitly teaches these as **articles partitifs** for an unspecified quantity. They must not be counted as if the learner had already learned `de + le / de + les` contraction.

Lesson 24 adds another clear non-contracted anchor:

```text
Je rentre à la maison.
```

Again, no learner-facing `aux` contraction appears.

### Lessons 26–40

Lesson 38 is the first point where the curriculum provides a clean same-lesson contrast suitable for explaining F16 without inventing a new context:

```text
Je suis allée au restaurant.
Je suis rentrée à la maison.
```

At this point Trân has long since encountered article gender/number through F01–F04 and has already seen `du Vietnam` in lesson 3 and partitives in lesson 22. Lesson 38 can therefore explain why `à + le` contracts while `à + la` does not, while also explicitly warning that identical-looking `du/des` can belong to other grammatical jobs.

No learner-facing `aux` item was found in this block.

### Lessons 41–52

Lesson 45 supplies the strongest minimal reinforcement pair in the whole curriculum:

```text
J'ai mal à la tête.
J'ai mal au ventre.
```

The lexical frame and semantic role are the same; only the article/gender changes. This is excellent reinforcement evidence for `à la` versus `au`.

Lesson 42, however, again uses `de` after quantities:

```text
Une bouteille d'eau.
Un paquet de riz.
Un peu de…
```

That is quantity syntax, not F16 source ownership.

No learner-facing `aux` item was found in this block either.

## 4. Source map verdict

| Form | Real source status | Audit verdict |
|---|---|---|
| `au` | strong | lesson 38 `au restaurant`; lesson 45 `au ventre` |
| `à la` | strong | lesson 13/45 `à la tête`; lesson 24/38 `à la maison` |
| `du` | present but distributed | lesson 3 `du Vietnam`; must be distinguished from lesson22 partitive `du` |
| `des` as `de + les` | not safely owned | existing `des` is mainly indefinite/partitive; no clean contraction source pair found |
| `aux` | missing learner-facing anchor | no clean learner item found |
| `à l’` | no clean F16 learner pair found | do not invent mastery from unrelated elisions |
| `de la` | surface examples exist | lesson45 `de la fièvre` is not a clean F16 preposition+article source |
| `de l’` | surface examples exist | lesson4 `de l'eau` / lesson42 `d'eau` are partitive/quantity territory |

Therefore the old registry label **`partial-distributed` remains accurate**.

## 5. Earliest pedagogically valid placement

### Selected placement: lesson 38

Lesson 13 is too early for a coherent F16 capsule: it supplies `à la tête` but no contrasting contracted target.

Lesson 22 should not own F16 because it explicitly teaches `du/des` as partitives. Putting F16 there would blur two grammatical jobs that happen to share the same surface words.

Lesson 38 is the first clean point where all of the following are true:

- article/gender foundations have already been taught;
- `à` and `de` have already appeared repeatedly in real phrases;
- a direct `au restaurant` / `à la maison` contrast exists in learner-facing items;
- `du Vietnam` is already familiar as an older lexical anchor;
- the partitive `du/des` system from lesson 22 is already established and can be contrasted explicitly instead of confused;
- no existing Foundation capsule owns lesson 38.

Lesson 45 should be treated as a **reinforcement anchor**, not the first placement.

Proposed future learner flow, if implementation is later authorized:

```text
lesson 38 normal content
→ optional F16 Foundation capsule
→ return to lesson
```

No new top-level navigation is needed.

## 6. Existing Foundation infrastructure verdict

A new teaching UI is unnecessary.

The existing `FrenchTranquilleFoundationsCapsuleEngine` already provides the required pure flow:

```text
observe
→ explain
→ construct
→ contrast
→ transfer
```

with localized VI/FR content, deterministic checks, ephemeral-only session state and `masteryClaim=false`.

The existing Foundations learner adapter already mounts multiple concepts through one shared optional overlay and returns focus to the lesson. F16 can therefore reuse that owner instead of creating a parallel system.

## 7. Build42.1 verdict

### F16 teaching

**JUSTIFIED.**

The audit proposes that a later, separately reviewed slice may implement one narrow F16 teach-core capsule at lesson 38 using the existing Foundations engine/overlay.

The capsule must explain the complete mechanical table:

```text
à + le   → au
à + les  → aux
de + le  → du
de + les → des
```

and contrast it with:

```text
à la / à l’ / de la / de l’
```

but it must be honest about evidence provenance:

- `au restaurant`, `à la maison`, `du Vietnam` are real existing anchors;
- `aux` and contraction-`des` currently lack equally clean learner-facing source phrases;
- any example created only to demonstrate the rule must be labelled as a teaching recombination, not claimed as an existing acquired item;
- partitive/quantity `du/des/de l’` must be explicitly separated from F16 contraction.

### Productive Transfer

**NOT YET AUTHORIZED.**

Build42.1 does not find enough paired learner-facing evidence for a deterministic `à/de` Transfer family. In particular, `aux` and contraction-`des` do not have clean source ownership equivalent to `au ↔ à la`.

Teaching the rule may therefore proceed before productive Transfer, but productive Transfer must be re-audited only after coherent F16 teaching exists.

### A2

**REMAINS NOT AUTHORIZED.**

Nothing in this audit changes durable concept/Transfer evidence or satisfies the later A1-readiness gate.

## 8. Proposed next slice

If this audit is reviewed and accepted, authorize exactly:

```text
Build42.2 — F16 learner-facing teach-core capsule
```

Expected scope:

- add one F16 capsule definition to the existing Foundations capsule collection;
- reuse the existing capsule engine and learner adapter;
- place it at lesson 38 only;
- use VI + DEBUG FR copy;
- deterministic checks only;
- no curriculum item mutation;
- no new store/schema/Recovery/Evidence owner;
- no mastery claim;
- no Transfer implementation;
- public runtime metadata remains `v2.5.0 · Build 38` unless a separate release decision says otherwise;
- dedicated predecessor + browser parity tribunal before candidate merge.

Build42.2 is **not authorized merely by this candidate document**. It becomes authorized only if the Build42.1 audit PR is reviewed and accepted.

## 9. Canonical dependency chain

```text
Build42.1 source + placement audit
→ review / accept audit
→ Build42.2 narrow F16 teach-core capsule, if accepted
→ certify learner-facing teaching
→ re-audit deterministic F16 Transfer eligibility
→ later re-run A1 readiness
→ A2 only if a separate audit explicitly authorizes it
```
