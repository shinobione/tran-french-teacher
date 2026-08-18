# Build 41.2 — Recent-past deterministic transfer core

Status: **IMPLEMENTATION CANDIDATE / PURE / NON-WIRED**

Base:

```text
7739418fd97a01df4bd1b67c27ccadb8fd3cd14a
```

41.1 selected exactly one productive family from the Build40 A1 consolidation audit:

```text
present-je-regular-action
→ recent-past-je-venir-de
```

## Core owner

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

## Certified catalog candidate

Exactly three pairs:

```text
Je travaille.          → Je viens de travailler.
Je mange.              → Je viens de manger.
Je rentre à la maison. → Je viens de rentrer à la maison.
```

These sources are taught in lesson 24. Lesson 36 explicitly teaches the recent-past structure `venir de + infinitif` and its regularity.

## Deliberate implementation strategy

41.2 is **not a French conjugation generator**.

It stores a static immutable source→target catalog. Public API:

```text
catalog()
view(id)
transform(source)
verify(idOrSource, answer)
```

Unknown source → `null` from `transform()`.

`verify()` only certifies the exact known target after narrow whitespace/apostrophe normalization. It does not derive unseen verbs or subjects.

## Explicit exclusions

41.2 does not support:

```text
generic passé composé
tu / il / elle / nous / vous / ils
reflexive verbs
negation
questions
random/adaptive generation
new vocabulary
learner-facing placement
loader wiring
service-worker wiring
storage
Evidence
mastery scoring
```

The fourth audit-safe pair `Je regarde un film. → Je viens de regarder un film.` is intentionally not in the first catalog.

## Relationship to Build38

Build41.2 adds a new post-Build40 productive-consolidation core. It does not modify or replace any Build38 core, route or shared Transfer renderer.

Build38 remains frozen/released.

## Next boundary

After 41.2 is certified and merged, **learner placement must be audited separately**. No assumption is made in this slice that lesson 36 is automatically the correct learner-facing placement merely because it is the grammar anchor.
