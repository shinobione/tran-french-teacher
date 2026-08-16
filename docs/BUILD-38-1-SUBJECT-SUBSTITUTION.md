# Build 38.1 — Subject Substitution on Known Regular `-er` Verbs

Status: **CANDIDATE · PURE / NON-WIRED**

## Why this is the first Build 38 slice

Build 38 owns **Generalization & Transfer**: constructing unseen but valid French from material Trân already knows.

The cleanest first transfer family is subject substitution on regular `-er` verbs because the existing curriculum and Foundations already provide both halves of the skill:

- F05: identify who does the action (`je / tu / il / elle / nous / vous`);
- F08: regular present pattern for `je / tu / il/elle`;
- lesson 3: `J'habite à Hô Chi Minh-Ville.`;
- lesson 5: `J'aime…`;
- lesson 32: `Tu travailles ?`, `Tu habites où ?`, `Tu aimes ça ?`;
- lesson 33: `Il travaille.`, `Elle travaille.`, `Il habite ici.`, `Elle habite ici.`.

This gives real transfer without introducing new vocabulary or a new grammar table.

## 38.1 exact scope

Family:

```text
subject-substitution-regular-er
```

Allowed subjects:

```text
je
→ tu
→ il
→ elle
```

Allowed verbs:

```text
travailler
habiter
aimer
```

Examples:

```text
Je travaille.  → Tu travailles.
Tu travailles. → Elle travaille.
J'habite ici.  → Tu habites ici.
Il habite ici. → Elle habite ici.
J'aime ça.     → Tu aimes ça.
Tu aimes ça.   → Elle aime ça.
```

The important pedagogical action is not “choose `-e` or `-es`”. It is:

> keep the meaning and verb, change who does the action, then reconstruct the whole sentence.

## Explicit exclusions

38.1 does **not** include:

- `nous` / `vous` / `ils` / `elles`;
- questions as a separate transformation family;
- negation transformation;
- futur proche;
- agreement transformation;
- plural noun transformation;
- random generation;
- free-form vocabulary recombination;
- irregular verbs such as `aller`, `vouloir`, `pouvoir`, `devoir`;
- durable learner writes;
- Evidence product reads;
- mastery claims;
- PWA/runtime wiring.

The exclusions are deliberate. They keep the first transfer engine deterministic and auditable.

## Implementation contract

`src/pedagogy/generalization-transfer-core.js` is a pure module usable in Node and the browser.

It owns:

- the 38.1 family definition;
- supported subjects and regular verb stems;
- deterministic present-tense sentence construction;
- `je` elision for `habiter` / `aimer`;
- explicit source→target exercise creation;
- deterministic distractors;
- VI / DEBUG FR learner-facing cues;
- answer verification.

It does **not** own route/render integration.

Runtime status must remain:

```text
status: pure-non-wired
persistence: ephemeral-only
masteryClaim: false
```

## Safety contract

38.1 must not modify:

```text
app.js
voice-ios.js
free-voice.js
index.html
sw.js
manifest.webmanifest
curriculum-stage2/3/4
Foundations Core / capsule engine / capsules / pilot
Recovery v3
Evidence v2
learner stores
Premium V5.10 accepted UI
```

No `localStorage`, `sessionStorage`, IndexedDB, Recovery or Evidence access is allowed inside the pure transfer core.

## Tribunal

Node proof verifies:

- exact family / verbs / subjects;
- exact generated sentences;
- elision (`J'habite`, `J'aime`);
- deterministic six-exercise catalog;
- rejection of same-subject and unsupported/irregular transformations;
- no persistence/runtime dependencies;
- Build 37 ownership markers remain intact;
- source anchors still exist in curriculum/Foundations.

Browser proof runs:

```text
VI / DEBUG FR
× 1280×900 / 390×844
```

It performs real button clicks through all six deterministic exercises and requires:

- correct localized title/instruction/cue;
- correct source/target reconstruction;
- 6/6 exercises completed;
- `localStorage` byte-identical;
- no horizontal overflow;
- choice targets ≥44 px.

It also replays the Build 37.8 F13 browser tribunal before 38.1.

## What 38.1 is not

This is **not yet a learner-facing PWA feature**.

The purpose of 38.1 is to prove the first transfer primitive before attaching it to lesson/runtime ownership. A later Build 38 slice may expose it to Trân only after this contract is certified.

## Candidate next step after 38.1 certification

If 38.1 is accepted:

```text
38.2
→ choose the smallest learner-facing placement
→ reuse the certified 38.1 core
→ no new permanent navigation tab
→ keep transfer optional and contextual
→ browser-test real lesson integration
```

Do not extend the verb/subject matrix merely because the core can technically do so.
