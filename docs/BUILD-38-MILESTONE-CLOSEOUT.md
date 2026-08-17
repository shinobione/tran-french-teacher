# Build 38 — Generalization & Transfer milestone closeout

Status: **AUDITED / CLOSEOUT CANDIDATE / DOCS-GOVERNANCE ONLY**

Date: 2026-08-17

## Scope

This closeout audits the complete Build 38 chain after Build 38.10 was merged and deployed. It does not add a new transfer family and does not change runtime code, curriculum, learner data, voice, Recovery, Evidence, Premium or PWA behaviour.

Runtime-bearing Build 38.10 checkpoint:

```text
PR #203
candidate head 21d20a30af276e975e3055d6bacc7d9d32eb4e91
squash merge 2c7bf79a61d0cacd21f9345ed661cc3ac156e604
Build 38.10 dedicated run 32064765660 SUCCESS
Pages #269 / run 32065682064 SUCCESS on exact runtime merge SHA
```

Build 38.10 docs handoff checkpoint:

```text
PR #204
merge 143beca0f45e5c71d9b72f5f3cb49f9b5b0877b1
Pages #270 / run 32066217001 SUCCESS on exact docs SHA
```

## Certified Build 38 chain

Build 38 now contains five narrow deterministic transfer families, each with a certified core/placement relationship:

```text
38.1 → 38.2  subject substitution
               lesson 33 / [0,2,5]

38.3 → 38.8  affirmation → negation
               lesson 34 / [0,1,2]

38.4 → 38.5  present → futur proche
               lesson 35 / [0,1,3]

38.6 → 38.7  singular → plural nominal
               lesson 13 / [0,2,3]

38.9 → 38.10 nous → spoken on
               lesson 52 / [0,1,2]
```

There remains exactly **one shared learner-facing Transfer renderer**. All Build 38 learner-facing transfer remains optional/ephemeral, with no durable write, no Evidence product read and no mastery claim.

## Milestone audit question

The closeout audit asked one narrow question:

> Is there still one high-value deterministic transfer family that is sufficiently scaffolded by the existing 52 lessons / 313 items to justify a Build 38.11?

The answer is **no**.

## Rejected successor candidates

### 1. Adjective agreement — reject for Build 38.11

F13 / lesson 40 consolidates learner-known feminine forms for Trân, including:

```text
prête
contente
fatiguée
stressée
inquiète
française
```

The corresponding masculine source forms are not an equally solid learner-facing acquisition set. A deterministic `masculine → feminine` transfer would therefore introduce source material that the learner has not acquired with comparable confidence.

This was already identified during the 38.9 audit and the live curriculum has not changed in a way that repairs that scaffold.

Decision:

```text
agreement transformation = DEFER / NOT A BUILD 38.11
reason = weak source-side acquisition parity
```

### 2. Generic question transformation — reject for Build 38.11

F12 deliberately teaches several different question strategies rather than one transformation rule:

```text
Tu travailles ?                 → statement order + intonation
Tu habites où ?                 → interrogative word at the end
Pourquoi ?                      → short question block
Qu'est-ce que ça veut dire ?    → fixed clarification block
Pouvez-vous reformuler ?        → polite request block
```

F12 explicitly says that inversion does not need to be learned now.

A generic `affirmation → question` engine would therefore be one of three bad things:

- merely punctuation/intonation and too weak to justify a family;
- semantically underspecified because the desired information is unknown;
- or an inversion lesson that contradicts the current Foundation boundary.

Decision:

```text
generic question transformation = REJECT
reason = no single deterministic family consistent with F12 ownership
```

### 3. Comparatives / explicit lesson chunks — reject as duplicate teaching

Lesson 43 already directly owns forms such as:

```text
C'est plus cher.
C'est moins cher.
C'est plus grand.
```

Turning those already-explicit chunks into a new Transfer family would mostly duplicate lesson content rather than unlock a new construction ability.

### 4. Broad recombination generator — defer beyond Build 38

Build 38 already demonstrates recombination through subject substitution, futur proche and `nous → on` reconstruction.

A generic combinatorial generator would cross the current Build 38 safety boundary by requiring wider lexical compatibility rules, adaptive/random selection or more complex semantic validation.

Decision:

```text
broad adaptive/random recombination = OUTSIDE BUILD 38
```

### 5. F16 contractions — remains deferred Foundation work

F16 remains intentionally deferred because the existing curriculum does not provide a clean enough full `à / au / à la / aux / de / du / de la / des` scaffold. Its best current anchor remains lesson 45 (`à la tête` ↔ `au ventre`) and does not justify reopening Build 38.

## Milestone verdict

Build 38 has reached its intended pedagogical boundary:

- deterministic transfer from already-known material;
- multiple high-value transformation families;
- learner-facing construction practice at appropriate lesson anchors;
- one shared UI owner;
- no fake mastery;
- no persistent transfer state;
- no curriculum renumbering;
- no random/adaptive generalization engine smuggled into a deterministic milestone.

Therefore the milestone audit verdict is:

```text
Build 38 = PEDAGOGICALLY COMPLETE
Build 38.11 = NOT AUTHORIZED
milestone closeout = APPROVED AS GOVERNANCE CANDIDATE
```

## Release-version boundary

Closing the roadmap milestone does **not** change the public application identity in this slice.

Public runtime metadata remains:

```text
v2.4.0 · Build 36
```

The natural coherent release candidate after Build 38 closeout remains:

```text
v2.5.0 · Build 38
```

but that value is **not assigned, written or shipped here**. It requires a separate explicit release-version decision/certification slice with dedicated runtime/version assertions and deployment proof.

## Next control boundary

After this docs/governance closeout is accepted and merged:

```text
explicit release-version decision/certification
→ decide whether to publish v2.5.0 · Build 38
→ if approved, change public metadata in a dedicated slice and certify it
→ only then open Build 39 Learner Intelligence 3
```

Do not start Build 39 from this closeout PR itself.

## CI baseline at milestone closeout

Persistent inherited failures at the Build 38.10 checkpoint are:

```text
French Trân'quille quality
Build 36.2 Evidence shadow adoption
V2.0.0 Freeze tribunal
Build 36.3 Recovery v3 durability tribunal
Build 28 Data recovery smoke
```

`Build 26.4 Progress single-scroll + Tyffany smoke` passed unchanged during the 38.10 candidate and remains classified as a runner/harness flake rather than durable baseline debt.

Any failure outside the five persistent inherited items remains new until classified.

## Learner continuity

The milestone closeout does not touch learner data. Historical continuity remains a release contract:

```text
7 completed lessons
l8 progress = 4
40 known historical items
```
