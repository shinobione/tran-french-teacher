# Build 38.9 — deterministic `nous → on` spoken transfer core

Status in this branch: **CANDIDATE / pure non-wired core**.

## Audit winner

Build 38.8 closed the previously certified negation transfer. The next-family audit compared the remaining Build 38 directions against the live 52-lesson / 313-item curriculum.

The cleanest next family is:

```text
nous → on in spoken French
```

This wins as **recombination across already-known structures**, not as a new Foundation lesson.

### Source scaffold — lesson 34

Lesson 34 already installs `nous` with learner-facing phrases including:

```text
Nous travaillons.
Nous rentrons.
Nous allons à…
```

It also explains that regular `-er` verbs often use `-ons` with `nous`, while forms such as `nous allons` are learned as useful blocks.

### Target scaffold — lesson 52 / F18

Lesson 52 explicitly teaches that francophones very often use `on` to mean `nous` in everyday speech and that `on` takes the verb form used with `il/elle`.

Foundations Core already classifies F18 `spoken-on` as:

```text
audit = explicit
strategy = reuse-existing
canonical lesson = 52
```

Therefore Build 38.9 does not need a new Foundation owner and does not broaden F18.

## Exact deterministic catalog

Only these three transformations are certified in this slice:

```text
Nous travaillons. → On travaille.
Nous rentrons.    → On rentre.
Nous allons à…    → On va à…
```

Why only three:

- both source and target structures are supported by the existing curriculum;
- they demonstrate the real `nous → on` transfer without introducing new vocabulary;
- `travailler` / `rentrer` reuse the already-established regular-`er` subject pattern;
- `allons → va` uses an explicitly known irregular block on both sides.

## Explicit exclusions

This slice does **not** certify:

```text
On est prêts.
On a le temps.
generic / indefinite on
passive on
object-pronoun rewrites
negation
questions
adjective agreement
random/adaptive generation
new vocabulary
mastery claims
durable writes
Evidence product reads
learner-facing lesson wiring
```

`On est prêts` is deliberately excluded because semantic-plural adjective agreement would make this slice depend on a broader agreement contract. `On a le temps` is also deferred rather than expanding the first family unnecessarily.

## Runtime ownership

New pure core:

```text
src/pedagogy/generalization-spoken-on-core.js
```

Contract:

```text
build = 38
slice = 38.9
family = nous-on-spoken-equivalence
status = pure-non-wired
persistence = ephemeral-only
masteryClaim = false
```

No loader, `index.html`, service worker, curriculum, shared Transfer renderer, voice, Recovery, Evidence, Premium, or learner store is wired by 38.9.

## Proof gate

The dedicated tribunal must prove:

- exact three-item catalog;
- VI / DEBUG FR views;
- deterministic three-choice verification;
- desktop and 390×844 browser execution;
- >=44px choice targets;
- no horizontal overflow;
- localStorage byte-identical during the browser tribunal;
- no storage / Recovery / Evidence / randomness dependency in the core;
- lesson 34 `nous` anchors still exist;
- lesson 52 / F18 `on` anchors still exist;
- all previously certified Build 38 owners remain untouched.

## What comes after review

Do **not** infer a learner-facing Build 38.10 automatically from this candidate.

If 38.9 is accepted and merged, the next control step is a separate placement audit. Lesson 52 is the obvious area to inspect because it owns `on`, but a learner-facing Transfer route must still prove that it adds useful construction practice without duplicating the lesson itself or stacking competing pedagogy.
