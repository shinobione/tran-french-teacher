# Build 38.7 — learner-facing nominal plural transfer

Status: **IMPLEMENTED / PR CANDIDATE / NOT MERGED**

## Goal

Expose the certified 38.6 nominal-number core through the existing shared Transfer renderer, without teaching unseen vocabulary and without disturbing the already-deployed lesson33 and lesson35 routes.

## Placement decision — lesson 13, not lesson 12

The first candidate was lesson 12 because F01–F04 owns the window and `une table` appears there. It was deliberately moved to **lesson 13** because the Transfer card mounts when the lesson opens: at the beginning of lesson12, `table` may not yet have been encountered inside the learner flow.

By lesson13, all source nouns are already learner-known:

```text
lesson 8  → gare / pharmacie
lesson 9  → billet
lesson 12 → table
lesson 13 → pharmacie is reused in directions
```

Therefore lesson13 satisfies the Build38 rule: **transfer from known material, not hidden vocabulary acquisition**.

## Learner-facing subset

The 38.6 pure core remains four items. 38.7 selects three:

```text
la gare    → les gares
un billet  → des billets
une table  → des tables
```

This covers:

```text
la → les
un → des
une → des
regular noun +s
```

The omitted `la pharmacie → les pharmacies` stays available in the pure core but is not needed for this ≈2-minute learner route.

## Shared renderer ownership

There is still exactly one learner-facing Transfer renderer:

```text
src/pedagogy/generalization-transfer-lesson.js
```

Historical contracts remain explicit:

```text
38.2
lesson = 33
family = subject-substitution-regular-er
exerciseIndexes = [0,2,5]

38.5
integration = 38.5
futureLesson = 35
futureFamily = present-futur-proche-travailler-singular
futureExerciseIndexes = [0,1,3]
```

38.7 adds:

```text
numberIntegration = 38.7
numberLesson = 13
numberFamily = singular-plural-regular-noun-phrases
numberExerciseIndexes = [0,2,3]
```

The number dependency is additive: if a historical harness does not load the number core, lesson33/35 behavior still boots normally and no lesson13 number route is registered.

## Runtime / PWA

Build32 loader order becomes:

```text
Foundations
→ 38.1 subject core
→ 38.4 futur-proche core
→ 38.6 nominal-number core
→ shared Transfer adapter
```

`sw.js` precaches the number core as `B387='2.4.0-b38.7'` while preserving the existing cache namespace / PR #180 identity contract.

## Route contract

```text
lesson 12 → F01–F04 only; no number Transfer
lesson 13 → F01–F04 → ONE number Transfer card
lesson 14 → no number Transfer
lesson 33 → F08 → ONE legacy subject Transfer
lesson 35 → F05 → ONE legacy future Transfer
```

## Explicit non-scope

38.7 does not:

- modify the 38.6 core;
- expose the 38.3 negation core;
- add a transfer family;
- add vocabulary;
- add navigation;
- change curriculum IDs/content;
- change Foundation routes;
- write learner state;
- read Evidence as product truth;
- claim mastery;
- alter voice, Recovery, Premium or other product owners.

## Dedicated proof

Node/static:

```text
tools/test-build38-7-nominal-plural-integration.cjs
```

Browser:

```text
tests/browser/build38-7-nominal-plural-integration.html
```

Dedicated workflow additionally replays the existing 38.2 and 38.5 browser tribunals **without modifying those browser tests**.

Required proof:

- 38.2 / 38.5 / 38.6 Node predecessor contracts;
- F01–F04 browser predecessor;
- exact lesson33 subject route in VI/FR × desktop/iPhone geometry;
- exact lesson35 future route in VI/FR × desktop/iPhone geometry;
- lesson13 number route in VI/FR × desktop/iPhone geometry;
- F01–F04 then number Transfer order;
- exact 3-item number subset and deterministic choice ordering;
- 3 real answer clicks;
- return focus + normal Continue;
- lesson12/14 number-route boundaries;
- lesson33/35 route regression checks;
- localStorage byte-identical;
- no horizontal overflow;
- >=44px targets;
- installed-PWA number-core precache.

## Completion gate

38.7 may merge after the dedicated workflow is green and the full matrix is classified with no new product regression beyond accepted historical debt / predecessor scope-gate false positives.

This uses the already-deployed shared learner surface. A concrete installed-PWA/iPhone defect would still be a real maintenance issue, but no new physical smoke is required merely to certify this bounded route addition when automated browser + PWA dependency proof is green.
