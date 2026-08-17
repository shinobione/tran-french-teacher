# Build 38.10 — learner-facing `nous → on` spoken transfer

Status: **CLOSED / MERGED / DEPLOYED**

## Closeout proof

```text
PR #203 MERGED
candidate head = 21d20a30af276e975e3055d6bacc7d9d32eb4e91
squash merge   = 2c7bf79a61d0cacd21f9345ed661cc3ac156e604
Build 38.10 dedicated run = 32064765660 SUCCESS on exact candidate head
GitHub Pages #269 / run 32065682064 = SUCCESS on exact squash merge SHA
```

Public Settings metadata remains intentionally **v2.4.0 · Build 36**. Build 38.10 is a roadmap slice, not a public SemVer release.

## Audit decision

Build 38.9 certified a pure, non-wired `nous → on` transfer core. The required learner-placement audit resolved that **lesson 52 is useful if and only if the added surface is active reconstruction, not another explanation of the rule.**

Lesson 52 already teaches:

```text
« on » often means « nous » in everyday spoken French
« on » takes the verb form used with il/elle
```

It already contains learner items with `on` and a recognition challenge. Therefore Build 38.10 adds **no** second grammar capsule, explanation card or Foundation route.

What lesson 52 lacked was this retrieval/recombination step:

```text
known source with nous
→ preserve the same group + action
→ rebuild the sentence with on
→ choose the correct il/elle-like verb form
```

That is distinct from recognition and belongs to Generalization & Transfer.

## Placement — lesson 52

The predecessor chain is complete:

```text
lesson 34 / F05
→ Nous travaillons.
→ Nous rentrons.
→ Nous allons à…

lesson 52 / F18 reuse-existing teaching
→ on often means nous in spoken French
→ on conjugates like il/elle

Build 38.9
→ deterministic pure core certified

Build 38.10
→ one optional learner-facing Transfer card in lesson 52
```

No new vocabulary is introduced.

## Exact learner transfer

```text
Nous travaillons. → On travaille.
Nous rentrons.    → On rentre.
Nous allons à…    → On va à…
```

The second sentence deliberately uses declarative `On rentre.` while lesson 52 also exposes `On rentre ?`; the exercise is about subject/verb reconstruction, not intonation or question formation.

## Why this is not duplicate teaching

The existing lesson remains the explanation/recognition owner. Build 38.10 adds only active construction.

Two exact targets are not existing lesson-52 items:

```text
On travaille.
On va à…
```

The third reuses a known verb in a declarative transformation:

```text
Nous rentrons. → On rentre.
```

The learner must retrieve the source relation and change both subject and verb form. That is a real transfer operation rather than repetition of the lesson text.

## Shared renderer contract

There is still exactly one learner-facing Transfer renderer:

```text
src/pedagogy/generalization-transfer-lesson.js
```

Build 38.10 owns one additive route:

```text
spokenOnIntegration = 38.10
spokenOnLesson = 52
spokenOnFamily = nous-on-spoken-equivalence
spokenOnExerciseIndexes = [0,1,2]
```

Historical routes remain unchanged:

```text
38.7 → lesson 13 / nominal plural / [0,2,3]
38.2 → lesson 33 / subject substitution / [0,2,5]
38.8 → lesson 34 / negation / [0,1,2]
38.5 → lesson 35 / futur proche / [0,1,3]
```

## Certified core ownership

`src/pedagogy/generalization-spoken-on-core.js` remains **byte-for-byte unchanged** from Build 38.9 and keeps its own core status:

```text
slice = 38.9
status = pure-non-wired
persistence = ephemeral-only
masteryClaim = false
```

Build 38.10 only loads and consumes that certified API through the existing adapter.

The Build 38.9 workflow was narrowed to the durable invariant: the certified 38.9 core itself must not change in successor slices. It no longer treats all future shared-adapter wiring as a 38.9 regression.

## Successor-safe predecessor maintenance

Historical 38.2 / 38.5 / 38.7 / 38.8 guards had incorrectly treated the shared renderer's old cache token as permanently owned by the predecessor slice.

38.10 changes only that stale assumption:

- predecessor route/core/content assertions remain exact;
- certified lesson placement remains exact;
- deterministic exercise indexes remain exact;
- persistence/mastery exclusions remain exact;
- the shared renderer must still be explicitly loaded and precached;
- a successor may advance only the renderer cache token without being falsely classified as a predecessor regression.

No predecessor pedagogy semantics were weakened.

## Runtime / installed PWA

Runtime order is now:

```text
Foundations
→ 38.1 subject core
→ 38.3 negation core
→ 38.4 futur-proche core
→ 38.6 number core
→ 38.9 spoken-on core
→ shared Transfer adapter
```

`sw.js` uses the 38.10 token for the spoken-on core and updated shared adapter. The existing PWA cache namespace/identity contract is not renamed.

## Dedicated proof

Node contract:

```text
tools/test-build38-10-spoken-on-integration.cjs
```

Browser tribunal:

```text
tests/browser/build38-10-spoken-on-integration.html
```

GitHub Actions gate:

```text
.github/workflows/build38-10-spoken-on-integration.yml
run 32064765660 = SUCCESS
```

The gate proves:

```text
38.9 core stays byte-identical and pure
38.2 / 38.5 / 38.7 / 38.8 learner routes remain intact
lesson 52 exposes exactly one spoken-on Transfer route
exact 3-answer deterministic path
VI / DEBUG FR × desktop / 390×844
return focus + normal Continue survives
localStorage byte-identical
no horizontal overflow
>=44px targets
installed-PWA precache for spoken-on core + updated shared adapter
no curriculum changes
no durable learner writes
no mastery claim
```

## CI classification / controlled queue exception

The pre-38.10 `main` (`c2fa5f22…`) had six failed push runs. One of them, Build26.4, passed on the #203 candidate and is classified as a flake. The persistent inherited failure set at closeout is therefore five:

```text
French Trân'quille quality
Build 36.2 Evidence shadow adoption
V2.0.0 Freeze tribunal
Build 36.3 Recovery v3 durability tribunal
Build 28 Data recovery smoke
```

`French Trân'quille quality` is inherited stale CI: its static Build-24 wiring/version assertions fail before Chrome and were already red on the exact pre-38.10 base.

The dedicated 38.10 final-head run was green and no completed final-head workflow introduced a new failure. One unrelated `Premium V5.7 Theme Art Integration` run remained queued at merge time. Its immediately preceding run on head `6e854224…` was SUCCESS; the only subsequent code change was the shared Transfer HTML `&quot;` escaping correction, outside Theme Art ownership.

PR #203 therefore merged under a documented **controlled queue exception**. This must not be restated as “every final-head workflow drained before merge.”

GitHub Pages subsequently deployed the exact squash merge SHA successfully.

## Hard exclusions

Build 38.10 does **not** add:

- another Transfer renderer;
- another Foundation/F18 capsule;
- new curriculum items;
- `On est prêts.` or `On a le temps.`;
- generic/indefinite/passive `on`;
- object-pronoun rewrites;
- negation or questions inside the spoken-on family;
- adjective agreement;
- new vocabulary;
- random/adaptive generation;
- durable learner writes;
- Evidence product reads;
- mastery claims;
- voice changes;
- Recovery changes;
- Premium changes;
- public runtime version bump.

## Next boundary

38.10 is closed. There is **no automatic 38.11**.

The next action is a Build-38 milestone audit: determine whether another narrow, genuinely scaffolded deterministic transfer family remains worth shipping or whether Build 38 is complete enough for a dedicated milestone/release-version closeout decision.

Do not start Build 39 while Build 38 remains open. Do not change public Settings metadata without an explicit release-version slice.
