# Build 38.10 — learner-facing `nous → on` spoken transfer

Status: **IMPLEMENTED / PR CANDIDATE / NOT MERGED**

## Audit decision

Build 38.9 certified a pure, non-wired `nous → on` transfer core. The required learner-placement audit is now resolved: **lesson 52 is useful if and only if the added surface is active reconstruction, not another explanation of the rule.**

Lesson 52 already teaches:

```text
« on » often means « nous » in everyday spoken French
« on » takes the verb form used with il/elle
```

It already contains six learner items with `on` and a recognition challenge. Therefore Build 38.10 does **not** add another grammar capsule, another explanation card or another Foundation route.

What lesson 52 does not currently require is this retrieval/recombination step:

```text
known source with nous
→ preserve the same group + action
→ rebuild the sentence with on
→ choose the correct il/elle-like verb form
```

That is distinct from recognition and is the Generalization & Transfer job.

## Placement — lesson 52

The predecessor chain is complete:

```text
lesson 34 / F05
→ Nous travaillons.
→ Nous rentrons.
→ Nous allons à…

lesson 52 / F18 reuse-existing teaching
→ on often means nous at spoken French
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

Two of the exact targets are not existing lesson-52 items:

```text
On travaille.
On va à…
```

The third reuses a known verb in a declarative transformation:

```text
Nous rentrons. → On rentre.
```

The learner must retrieve the source relation and change both subject and verb form. That is a real transfer operation rather than a repeat of the lesson text.

## Shared renderer contract

There is still exactly one learner-facing Transfer renderer:

```text
src/pedagogy/generalization-transfer-lesson.js
```

Build 38.10 adds one additive route:

```text
spokenOnIntegration = 38.10
spokenOnLesson = 52
spokenOnFamily = nous-on-spoken-equivalence
spokenOnExerciseIndexes = [0,1,2]
```

Historical routes stay unchanged:

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

The Build 38.9 workflow is narrowed to the durable invariant: the certified 38.9 core itself must not change in successor slices. It no longer treats all future shared-adapter wiring as a 38.9 regression.

## Runtime / installed PWA

Runtime order becomes:

```text
Foundations
→ 38.1 subject core
→ 38.3 negation core
→ 38.4 futur-proche core
→ 38.6 number core
→ 38.9 spoken-on core
→ shared Transfer adapter
```

`sw.js` adds a `2.4.0-b38.10` token for the spoken-on core and updated shared adapter. The existing PWA cache namespace/identity contract is not renamed.

Public Settings metadata remains intentionally:

```text
v2.4.0 · Build 36
```

Build 38.10 is a roadmap slice, not a public SemVer release.

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

## Candidate boundary

Per `AGENTS.md`, this is one implementation slice. The candidate stops at the PR boundary. CI classification / merge / Pages proof is a separate control action.
