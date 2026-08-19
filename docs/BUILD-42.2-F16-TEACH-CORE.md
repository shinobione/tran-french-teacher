# Build 42.2 — F16 learner-facing teach-core capsule

Status: **CLOSED / MERGED / EXACT-HEAD CI-CERTIFIED**

Date: 2026-08-19

Accepted GitHub state:

```text
PR             #230 — Build 42.2 · F16 learner-facing contractions capsule
base           cfced413ce74e78712a62776641993c4de8551c1
accepted head  1c11f253ce6841289f619252bfc077c7e657219a
merge          8b462fae236c00b902a9312fe8e1b103412b8694
```

GitHub was re-read after merge and `main` pointed exactly to `8b462fae...`; the merge commit was verified. Push-triggered Pages for this SHA was not independently proven through the available connector, so this document does not equate merge with deployment.

## Authorized scope

Build42.1 accepted one narrow slice:

```text
F16 — à / de contractions
placement: lesson 38 only
owner: existing Foundations capsule engine + overlay
```

The accepted implementation preserves the boundaries:

- no curriculum item mutation;
- no new top-level navigation;
- no new store/schema/Recovery/Evidence owner;
- no mastery claim;
- no productive F16 Transfer;
- public runtime metadata remains `v2.5.0 · Build 38`;
- 52 lessons / 313 item semantics remain unchanged.

## Implementation

### Capsule owner

`src/pedagogy/foundations-capsules.js` adds exactly one compiled capsule:

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
de + le   → du
de + les → des

à la / à l’ / de la / de l’ stay uncontracted
```

The rule starts only after the phrase already requires `à` or `de` + definite article; the capsule does not choose the lexical preposition.

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

The `aux` and contraction-`des` forms are teaching recombinations only. They are not described as previously acquired learner phrases.

### Lesson placement

`src/pedagogy/foundations-pilot.js` adds one route only:

```text
F16 → lesson 38 → lesson 38
```

The existing shared overlay, focus-return behavior and ephemeral state remain the owner. Historical F01–F04, F11, F08, F05, F13 and F12 routes remain intact.

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

Contract test:

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

Browser tribunal:

```text
tests/browser/build42-2-foundations-f16-contractions.html
```

It exercises VI + DEBUG FR on desktop and 390×844 iPhone geometry, all six real answer interactions, exact copy/examples, routing, focus return, localStorage immutability and horizontal-overflow safety.

Dedicated workflow:

```text
.github/workflows/build42-2-foundations-f16-contractions.yml
```

The workflow reruns predecessor Foundation unit contracts through Build37.8, reruns the F13 browser predecessor, runs the F16 contract, and runs F16 browser parity in four locale/viewport combinations.

## CI successor-safety maintenance

The first exact-head candidate matrix found seven new reds in:

```text
Build38.2
Build38.5
Build38.7
Build38.8
Build38.9
Build38.10
Build41.3
```

The dedicated Build42.2 workflow was already **SUCCESS**. Investigation showed the seven jobs failed only because their historical path guards treated `foundations-capsules.js` and/or `foundations-pilot.js` as permanently immutable for every future slice.

Those guards were corrected narrowly for later **explicitly authorized Foundations work**. Protection remains for:

- certified Transfer cores;
- curriculum owners;
- `app.js`, voice owners and PWA sanctuaries;
- learner stores;
- Recovery/Evidence owners;
- Premium/UI owners;
- protected assets.

No historical browser/product tribunal was removed, bypassed or skipped.

Final exact-head **`1c11f253ce6841289f619252bfc077c7e657219a`** returned all seven jobs to SUCCESS, kept Build42.2 SUCCESS, and left only the five inherited CI debts:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

No review submission or unresolved review thread blocked acceptance.

## Accepted boundary

Build42.2 is **closed** as a learner-facing F16 teaching slice.

It does **not** authorize productive F16 Transfer because the teaching capsule does not create missing learner-source ownership or durable construction evidence.

Still locked:

```text
productive F16 Transfer  NOT AUTHORIZED
durable Foundation mastery NOT CLAIMED
Build42.3 implementation  NOT AUTHORIZED
A2                        NOT AUTHORIZED
```

## NEXT

```text
Build42 milestone closure audit — docs/read-only
→ decide whether 42.1 + 42.2 are sufficient to close the F16 debt milestone
→ do not assume a further implementation slice
```
