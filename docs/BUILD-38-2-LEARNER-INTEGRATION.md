# Build 38.2 — Learner-facing subject substitution

## Mandate

Expose the already-certified Build 38.1 `subject-substitution-regular-er` family to Trân in the smallest contextual lesson surface, without expanding the transfer matrix or creating durable transfer state.

## Placement decision

**Lesson 33 only.**

Why:

- lesson 32 has already introduced `tu` forms such as `Tu travailles ?`, `Tu habites où ?`, `Tu aimes ça ?`;
- lesson 33 introduces/reuses `il / elle` forms such as `Il/Elle travaille.` and `Il/Elle habite ici.`;
- Build 37 F08 already owns lessons 32–33 and provides the short regular `-er` written-pattern consolidation;
- placing Transfer after the existing F08 card in lesson 33 makes the learner reuse known material immediately, without taking ownership away from Foundations.

No new navigation tab or permanent Transfer page is added.

## Learner-facing sequence

```text
lesson 33 normal content
→ existing F08 optional card
→ Build 38.2 optional “build a sentence” card
→ short intro
→ 3 deterministic subject-substitution exercises
→ completion message with NO mastery claim
→ return focus to the lesson
→ normal lesson continuation remains available
```

Fixed certified exercises are selected from the 38.1 catalog by indexes `[0,2,5]`:

```text
Je travaille. → Tu travailles.
J'habite ici. → Tu habites ici.
Tu aimes ça. → Elle aime ça.
```

Choice order is rotated deterministically per exercise so the correct answer is not always in the same position. The source/target matrix itself remains unchanged.

## Safety contract

38.2 does not add:

```text
new vocabulary
random generation
nous / vous / ils / elles
irregular verbs
negation transfer
plural transfer
futur proche transfer
agreement transfer
mastery scoring
durable writes
Evidence product reads
new learner stores
new navigation ownership
curriculum IDs
```

The adapter may read the existing DEBUG-FR preference to localize itself, but it performs no `localStorage.setItem`, `sessionStorage.setItem` or IndexedDB writes.

## Runtime wiring

The existing Build 32 loader already owns successor runtime loading and loads Foundations dynamically. 38.2 adds only:

```text
Foundations loader chain
→ generalization-transfer-core.js
→ generalization-transfer-lesson.js
```

The service worker pre-cache includes both scripts for installed-PWA/offline parity. `index.html`, `app.js`, voice files, curriculum files, Foundations implementation files, Recovery and Evidence owners remain untouched.

## Dedicated tribunal

`Build 38.2 Learner-facing subject substitution` must prove:

- syntax + Build 38.1 Node predecessor;
- 38.2 Node contract;
- F08 browser predecessor remains healthy;
- Build 38.1 pure browser tribunal remains healthy;
- 38.2 VI / DEBUG FR × 1280×900 / 390×844;
- lesson 33 contains both F08 and Transfer, in that order;
- exactly three certified exercises through real button clicks;
- close returns focus to the Transfer CTA;
- existing lesson content and Continue control survive the round trip;
- lesson 32 remains F08-only;
- lesson 34 remains F05-only;
- localStorage byte-identical;
- no horizontal overflow;
- learner-facing entry target >=44px;
- protected product/storage/voice/curriculum/navigation owners untouched.

## Control boundary

This slice stops after one candidate PR. It does not merge itself, expand the transfer family, start 38.3, or start Build 39.
