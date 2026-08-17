# Build 38.5 — learner-facing futur proche transfer

Status: **IMPLEMENTED / PR CANDIDATE / NOT MERGED**

## Goal

Expose the already-certified Build 38.4 futur-proche family to Trân without creating another navigation destination or stacking another transfer card into lesson 33.

## Placement

38.5 uses the existing shared Transfer renderer and adds one route:

```text
lesson 35 — Futur proche
→ existing F05 Foundation card
→ ONE optional Transfer card
→ 3 deterministic future transformations
→ return to lesson
→ normal Continue remains available
```

Lesson 33 remains the exact Build 38.2 route and still owns only the subject-substitution Transfer family.

## Learner subset

The four-item 38.4 core remains unchanged. The learner-facing route selects three exercises:

```text
Je travaille.   → Je vais travailler.
Tu travailles.  → Tu vas travailler.
Elle travaille. → Elle va travailler.
```

This gives:

- one direct lesson-35 anchor (`Je vais travailler.`);
- one recombination with the already-known `tu vas` pattern;
- one novel but fully scaffolded `elle va travailler` construction.

The practice stays short: **3 phrases / ≈2 minutes**.

## Shared renderer strategy

`src/pedagogy/generalization-transfer-lesson.js` remains the single learner-facing Transfer renderer.

Historical 38.2 compatibility stays explicit:

```text
slice = 38.2
lesson = 33
exerciseIndexes = [0,2,5]
family = subject-substitution-regular-er
```

38.5 adds:

```text
integration = 38.5
futureLesson = 35
futureExerciseIndexes = [0,1,3]
futureFamily = present-futur-proche-travailler-singular
```

No second adapter/style/overlay implementation is created.

## Runtime wiring

`src/core/build32-loader.js` loads:

```text
Foundations
→ 38.1 subject-substitution core
→ 38.4 futur-proche core
→ shared Transfer adapter
```

`sw.js` explicitly precaches the futur-proche core under the 38.5 asset version so the installed PWA does not depend on a prior online fetch before using lesson 35.

The historical 38.2 adapter asset version remains stable; the updated service worker re-caches its current contents on install.

## Explicit non-scope

38.5 does not:

- expose the 38.3 negation core learner-facing;
- add a second Transfer card to lesson 33;
- add any new transfer family;
- expand 38.4 beyond `je / tu / il / elle + travailler`;
- add vocabulary;
- add permanent navigation;
- write learner state;
- read Evidence as product truth;
- claim mastery;
- alter curriculum IDs or lesson semantics;
- alter Foundations ownership.

## Protected routes

```text
lesson 33 → F08 + legacy 38.2 subject Transfer
lesson 34 → F05 only, no Transfer
lesson 35 → F05 + 38.5 future Transfer
lesson 36 → F05 only, no Transfer
```

## Tribunal

Node/static:

```text
tools/test-build38-5-futur-proche-integration.cjs
```

Browser:

```text
tests/browser/build38-5-futur-proche-integration.html
```

The historical `build38-2-learner-integration.html` assertions remain unchanged; only the new additive runtime dependency is included in its bootstrap.

Dedicated CI certifies:

- 38.2 Node predecessor;
- 38.4 Node predecessor;
- 38.5 static/loader/SW contract;
- F05 browser predecessor;
- exact 38.2 lesson-33 regression in VI/FR × desktop/iPhone;
- lesson-35 future integration in VI/FR × desktop/iPhone;
- real answer clicks;
- return focus + normal Continue;
- lesson 34 / 36 boundaries;
- lesson 33 legacy route still selected;
- localStorage byte-identical;
- no horizontal overflow;
- >=44px entry/choice targets.

## Completion gate

38.5 may merge when the dedicated workflow is green and the full PR matrix contains no new product regression beyond the four inherited historical failures.

This is learner-facing but uses the already-field-accepted lesson surface and shared overlay. Automated desktop/iPhone-geometry proof can close the slice unless a concrete installed-PWA/iPhone regression appears. It does **not** create a new physical-device verdict for unrelated systems.
