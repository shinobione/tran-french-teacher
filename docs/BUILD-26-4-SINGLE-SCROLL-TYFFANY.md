# Build 26.4 — Single-scroll Progress + Tyffany

Status: **PROD / CLOS**

Version: **v1.19.4 — Build 26.4**

Production evidence:

- runtime PR **#46** ;
- runtime commit `7e74b3727dfefdddb41521a2be92ece8301a32e7` ;
- PR #46 tribunal: **10/10 SUCCESS** ;
- GitHub Pages runtime **#103 SUCCESS** ;
- CI determinism PR **#47** ;
- CI-only commit `4852e95684ad79d0988e05de641b56a8ad0ede22` ;
- final `main`: **10 functional workflows / 10 SUCCESS + Pages #104 SUCCESS**.

## Field feedback

The Build 26.3 two-column Progress layout was directionally correct, but real desktop screenshots revealed an awkward nested-scroll pattern:

```text
browser/page scrollbar
        +
scrollbar inside Détails d’apprentissage
```

The right-hand Details card was both `position: sticky` and constrained to a viewport-based `max-height` with `overflow:auto`. Once a large group such as Mastery was opened, users had to reason about two independent vertical scroll contexts.

The same field pass also renamed the learner-facing teacher from **Lucie** to **Tyffany**.

## UX correction — one vertical scroll owner

Build 26.4 keeps the validated Build 26.3 information architecture:

```text
left                           right
Summary / next step            Learning Details
Curriculum A0 → A1             dashboard + active group
```

But on desktop / wide tablet, `Détails d’apprentissage` no longer owns an inner scroll container.

Build 26.4 overrides the Build 26.3 viewport constraint:

```text
position: relative
max-height: none
overflow: visible
```

The document/browser becomes the only vertical scroll owner. The right card simply grows with its selected detail content.

Production Chrome validated with Mastery active:

```text
overflow-y = visible
max-height = none
nested scroll = 0
page scrollable = 1
single scroll = 1
```

Mobile remains unchanged:

```text
Summary
→ compact curriculum
→ collapsed Learning Details
```

No card is cloned or migrated. Memory, Mastery, Listening, Scenario and A1 cards remain the same historical DOM nodes managed by their original engines.

## Teacher rename — Tyffany

The rename is implemented as an additive compatibility layer in `src/ui/build26-4-ux.js`.

### Learner-facing contract

Rendered occurrences of `Lucie` become `Tyffany`, including dynamically injected UI and safe text-bearing attributes. The public curriculum tutor export is normalized to `Tyffany`.

Speech output containing the old teacher name is normalized before being sent to the existing speech synthesis chain, so legacy preview strings say **Tyffany** without changing the voice-selection engine.

### Compatibility contract

Historical technical identifiers are deliberately preserved:

```text
LucieVoice
luc-rate / luc-pitch / luc-voice localStorage keys
lucie-* DOM ids/classes
francais-avec-luc:learner:v1
```

These identifiers are implementation details, not learner-facing branding. Renaming them would create migration risk with no pedagogical value.

`voice-ios.js` and `free-voice.js` remain byte-identical.

## Data and product sanctuaries

Build 26.4 preserves:

- learner key `francais-avec-luc:learner:v1`;
- Learning Memory / Scenario / Listening schemas;
- curriculum **40 lessons / 241 items**;
- Scenario **36 situations / 108 turns**;
- Listening **0.88 normal / 0.65 slow**;
- Build 25 Progression UX;
- Build 25.2 bounded sessions;
- Build 26 Real Life French III;
- Build 26.1 Details Dashboard + local self-playback;
- Build 26.2 explicit Details click + Listening calibration;
- Build 26.3 stable Today controls + two-column Progress structure;
- `voice-ios.js`;
- `free-voice.js`;
- `assets/LOGO.png`;
- `assets/Favicon.png`.

## CI closure

The dedicated Build 26.4 workflow proves:

### Branding

- rendered learner UI contains `Tyffany` ;
- rendered learner UI contains no visible `Lucie` after the compatibility layer runs ;
- `FrenchTranquilleCurriculum.tutor === 'Tyffany'` ;
- voice and branding sanctuary hashes are unchanged.

### Progress desktop

Using a synthetic lesson-8 profile and an opened Mastery group:

- Progress screen remains present ;
- Details Dashboard opens Mastery ;
- `overflow-y` computes to `visible` ;
- `max-height` computes to `none` ;
- Details owns no nested scrollbar ;
- page itself is scrollable when content exceeds the viewport ;
- learner progress remains l8 / 7 completed / 40 known.

### Harness note

The first `main` run after runtime merge showed every single-scroll product marker correct but the test sometimes attempted to select Mastery before its dashboard tile existed. PR #47 changed only the workflow URL to reuse the existing deterministic Build 26.1 dashboard smoke state (`detailsDashboardSmoke=mastery`). It did **not** modify runtime/PWA code.

Final `main` passed the full quality, Options, navigation, Progression, Listening, Session, Real Life, Voice Replay, Build 26.3 and Build 26.4 tribunal, plus Pages #104.

## Remaining field gate

Build 26.4 itself is closed. The separate Build 26.1 iPhone self-playback field gate remains open:

```text
recognized answer
→ local replay recording
→ playback
→ next recognized answer still works normally
```
