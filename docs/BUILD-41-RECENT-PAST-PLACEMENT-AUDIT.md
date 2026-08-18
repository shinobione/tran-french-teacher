# Build 41 — Recent-past learner-placement audit

Status: **AUDIT COMPLETE / READ-ONLY**

Date: 2026-08-19

Base audited:

```text
8d56b8d3b3bc727570d456ec43d90ed7f31c3b62
```

Accepted pure core:

```text
Build 41.2
PR #221
merge 74e8b8038a35c50ee828ee4dfcff6dedd4472e22
src/pedagogy/generalization-recent-past-core.js
```

This audit changes no runtime, learner data, curriculum, voice, Recovery, Evidence, PWA or public metadata.

---

## 1. Question

Should the certified Build41.2 family become learner-facing, and if so where and through which existing interaction owner?

Certified family:

```text
Je travaille.          → Je viens de travailler.
Je mange.              → Je viens de manger.
Je rentre à la maison. → Je viens de rentrer à la maison.
```

The activity must add active construction rather than duplicate lesson teaching, remain deterministic and ephemeral, and preserve all historical owners/stores.

---

## 2. Source ownership — lesson 24

`src/pedagogy/curriculum-stage2.js` lesson 24 is **Une journée simple au présent**.

It explicitly teaches all three selected source phrases:

```text
Je travaille.
Je mange.
Je rentre à la maison.
```

Lesson 24 also teaches `Je me lève`, `Je regarde un film`, `Je dors`, but Build41.2 deliberately admits only the three certified regular non-reflexive sources above.

Verdict: **source prerequisite is genuine and complete before lesson 36**.

---

## 3. Target structure ownership — lesson 36

`src/pedagogy/curriculum-stage3.js` lesson 36 is **Venir de — ce qu’on vient de faire**.

It explicitly teaches:

```text
je viens de + infinitif
je viens d' + infinitif before a vowel
```

and includes learner-facing items such as:

```text
Je viens d'arriver.
Je viens de manger.
Je viens de finir.
Je viens de rentrer.
Il vient de partir.
Elle vient d'appeler.
```

Its challenge asks the learner to distinguish the recent-past form for returning home.

Verdict: **lesson 36 is the first valid teaching anchor for the transformation rule**.

Earlier placement is rejected because it would test a structure before it is explicitly taught.

---

## 4. Is same-lesson placement duplicate teaching?

Not if the activity is placed after the normal lesson content and framed as transfer.

Lesson 36 currently provides:

```text
rule explanation
→ model phrases
→ recognition / narrow challenge
```

The Build41.2 family adds a different cognitive action:

```text
known present source from lesson 24
→ preserve subject + action meaning
→ rebuild as recent past using lesson 36 structure
```

Two target forms overlap partially with lesson 36 vocabulary (`Je viens de manger`, `Je viens de rentrer`), but the task itself does not ask for recall of the stored item. It asks for a source→target temporal reconstruction.

`Je viens de travailler.` is a genuinely new combination of already-known pieces.

Verdict: **pedagogically additive** when presented as optional construction after the lesson teaching, not as another vocabulary card.

---

## 5. Why lesson 36 is better than a later lesson

Lesson 37 immediately introduces starter passé composé blocks with `avoir`, followed by movement-past forms in lesson 38.

Deferring the recent-past transfer until after lesson 36 would unnecessarily mix competing past-time systems during the first consolidation of `venir de + infinitif`.

Therefore the preferred placement is:

```text
lesson 36 normal content
→ lesson 36 challenge / standard flow
→ optional recent-past Transfer entry
→ 3 deterministic transformations
→ return to lesson
```

This mirrors the established Build38 placement model: teach the rule in the lesson, then offer an optional ephemeral reconstruction exercise in the same lesson.

Verdict: **lesson 36 selected**.

---

## 6. Existing learner-facing Transfer owner

`src/pedagogy/generalization-transfer-lesson.js` is the existing shared learner-facing Transfer renderer.

Current certified routes include:

```text
lesson 13  nominal plural
lesson 33  subject substitution
lesson 34  negation
lesson 35  futur proche
lesson 52  nous → spoken on
```

Its interaction contract already matches the desired learner UX:

- optional entry card appended to the lesson step;
- approximately three short transformations;
- overlay/focus interaction;
- deterministic answer verification;
- explicit return to the lesson;
- no durable write;
- no mastery claim;
- existing VI / DEBUG FR behavior;
- existing desktop/iPhone geometry.

Verdict: **reuse the shared Transfer renderer; do not create a second learner-facing Transfer UI engine**.

---

## 7. Important API incompatibility discovered

Build41.2 intentionally does **not** expose the historical Build38 renderer interface.

Build38-style renderer cores expose roughly:

```text
core.family.title
core.family.instruction
core.catalog              // array
core.view(exercise, lang) // UI view with cue/choices
core.verify(exercise, answer) -> boolean
```

Build41.2 exposes:

```text
familyId
catalog()                 // method
view(id)                  // raw catalog entry
transform(source)
verify(idOrSource, answer) -> result object
```

Therefore **direct wiring is not safe**.

The certified Build41.2 core must not be rewritten merely to fit a UI contract after certification.

Verdict: the learner-facing slice should add a **small read-only compatibility adapter** that consumes the immutable Build41.2 API and presents the shared renderer interface, while keeping the 41.2 core byte-identical.

---

## 8. Recommended Build41.3 architecture

Authorize one narrow learner-facing slice:

```text
Build 41.3 — learner-facing recent-past transfer
```

Recommended flow:

```text
Build41.2 pure core (unchanged)
        ↓
small Build41.3 renderer-compat adapter
        ↓
existing shared generalization-transfer-lesson.js
        ↓
lesson 36 optional Transfer entry
```

The adapter should provide only presentation data required by the existing renderer:

- localized title/instruction;
- exact three certified exercises;
- deterministic cue/source/target;
- deterministic distractors that test `de` + infinitive without introducing untaught grammar;
- boolean verification delegated to Build41.2 `.verify(...).ok`;
- no storage, fetch, Evidence, curriculum mutation or learner-state write.

Suggested distractor principle:

```text
target              Je viens de travailler.
missing de          Je viens travailler.
wrong finite form   Je viens de travaille.
```

Equivalent morphology-safe distractors should be authored for the three frozen catalog entries. Do not use passé composé distractors at lesson 36 because lesson 37 has not yet taught that system.

---

## 9. Shared renderer extension contract

`generalization-transfer-lesson.js` may be **extended additively** only if all five Build38 routes remain behaviorally intact.

The new route should be optional and exact:

```text
lesson = 36
slice  = 41.3
family = present-je-regular-action-to-recent-past-je-venir-de
count  = 3
```

Existing Build38 integration tribunals must remain green. In particular, Build38.10 already replays the earlier transfer integration tests and verifies legacy-route continuity.

Do not fork/copy the overlay CSS/DOM into a new module.

---

## 10. Runtime delivery requirements for a future implementation

Build41.2 is currently non-wired. A learner-facing 41.3 candidate would need, at minimum:

```text
load certified Build41.2 core
load Build41.3 compatibility adapter
then load shared Transfer lesson renderer
```

The current `src/core/build32-loader.js` loads Build38 cores and the shared renderer, but does not load Build41.2.

`sw.js` likewise pre-caches Build38/Build39 runtime modules but not Build41.2.

A future implementation may therefore update loader + SW **only for delivery of the new certified core/adapter**, while keeping:

```text
public runtime metadata = v2.5.0 · Build 38
PWA cache namespace unchanged unless independently required
52 lessons / 313 items unchanged
```

No automatic decision/recommendation wiring is part of this slice.

---

## 11. Data / evidence boundary

The activity remains ephemeral.

Build41.3 must not:

- create a new durable store;
- write Transfer success/failure into Evidence v2;
- reinterpret lesson completion or knownItems as Transfer mastery;
- make Learner Intelligence 3 suddenly claim `transfer-construction` evidence;
- alter Recovery 7-store / backup-v3 semantics.

A future durable construction-evidence owner, if ever justified, is a separate milestone and requires its own migration/evidence audit.

---

## 12. Final verdict

```text
learner-facing recent-past transfer  JUSTIFIED
placement                            lesson 36
timing                               after normal lesson teaching, optional
exercise count                       exactly 3
UI owner                              existing shared Transfer renderer
core                                 Build41.2 byte-identical
compatibility                        new narrow read-only adapter
storage/mastery                      none
public metadata                      unchanged
A2                                   still NOT AUTHORIZED
```

### Authorized next implementation

```text
Build 41.3 — learner-facing recent-past transfer
```

The implementation must remain one narrow slice and stop at a candidate PR. It must not begin a second productive family.
