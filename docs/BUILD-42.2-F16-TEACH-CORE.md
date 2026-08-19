# Build 42.2 — F16 learner-facing teach-core capsule

Status: **IMPLEMENTATION CANDIDATE / NOT MERGED**

Date: 2026-08-19

Base:

```text
cfced413ce74e78712a62776641993c4de8551c1
```

## Authorized scope

Build42.1 accepted one narrow next slice:

```text
F16 — à / de contractions
placement: lesson 38 only
owner: existing Foundations capsule engine + overlay
```

This implementation preserves the accepted boundaries:

- no curriculum item mutation;
- no new top-level navigation;
- no new store/schema/Recovery/Evidence owner;
- no mastery claim;
- no productive F16 Transfer;
- public runtime metadata remains `v2.5.0 · Build 38`;
- 52 lessons / 313 item semantics remain unchanged.

## Implementation

### Capsule owner

`src/pedagogy/foundations-capsules.js` now adds exactly one compiled capsule:

```text
F16
id       a-de-contractions-core
concepts [F16]
optional true
persistence ephemeral-only
masteryClaim false
```

The capsule teaches the complete mechanical table:

```text
à + le   → au
à + les  → aux
de + le  → du
de + les → des

à la / à l’ / de la / de l’ stay uncontracted
```

It explicitly says the rule starts only after the phrase already requires `à` or `de` + definite article; it does not choose the lexical preposition.

### Evidence provenance

Real existing anchors are labelled separately from teaching-only recombinations:

```text
✓ au restaurant
✓ à la maison
✓ du Vietnam
→ à + les = aux
→ de + les = des
```

The capsule explicitly protects the Build42.1 anti-confusion boundary:

```text
lesson 22 Du pain. / Du lait. / Des œufs.
= partitive article territory
≠ proof of de + le / de + les contraction mastery
```

The `aux` and contraction-`des` forms are taught as mechanical recombinations only. They are not described as previously acquired learner phrases.

### Lesson placement

`src/pedagogy/foundations-pilot.js` adds one route only:

```text
F16 → lesson 38 → lesson 38
```

The existing shared overlay, focus-return behavior and ephemeral state remain the owner. Historical F01–F04, F11, F08, F05, F13 and F12 routes are unchanged.

Ownership metadata is additive:

```text
contractions: 42.2
contractionConcepts: [F16]
```

## Deterministic checks

The F16 capsule contains six fixed checks:

1. lesson38 `au restaurant`;
2. lesson38 `à la maison`;
3. mechanical `à + les → aux`;
4. mechanical `de + le → du`;
5. mechanical `de + les → des`;
6. anti-confusion: lesson22 `Du pain.` is an `article partitif`.

No random/adaptive generation is introduced.

## Dedicated evidence

New contract test:

```text
tools/test-build42-2-foundations-f16-contractions.cjs
```

It checks:

- F16 schema/identity/sequence;
- exact six deterministic answers;
- ephemeral-only / no mastery / no durable write;
- all historical Foundations ownership markers/routes;
- unchanged F16 registry contract;
- lesson22 partitive anti-confusion anchors;
- lesson38 real source anchors;
- no Recovery/Evidence/storage ownership leak.

New browser tribunal:

```text
tests/browser/build42-2-foundations-f16-contractions.html
```

It exercises VI + DEBUG FR on desktop and 390×844 iPhone geometry, all six real answer interactions, exact copy/examples, routing, focus return, localStorage immutability and horizontal-overflow safety.

Dedicated workflow:

```text
.github/workflows/build42-2-foundations-f16-contractions.yml
```

The workflow reruns predecessor Foundation unit contracts through Build37.8, reruns the F13 browser predecessor, runs the F16 contract, and runs F16 browser parity in four locale/viewport combinations. It also enforces an explicit changed-file allowlist for this slice.

## Current boundary

This document describes a **candidate**, not an accepted product merge.

Until separate control review accepts the candidate:

- Build42.2 is not CLOSED;
- productive F16 Transfer remains NOT AUTHORIZED;
- durable Foundation mastery remains unavailable;
- A2 remains NOT AUTHORIZED.

## NEXT

```text
open candidate PR
→ dedicated Build42.2 workflow evidence
→ exact-head review / classify any red
→ STOP for control decision
```
