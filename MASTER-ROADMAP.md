# French Trân’quille — MASTER ROADMAP

> **Canonical project handoff / source of truth.**
>
> Any future AI/chat/session working on `shinobione/tran-french-teacher` **must read this file before making roadmap or implementation decisions**.
>
> This document supersedes stale V5.1/V5.4 “in progress” wording from older docs and conversations. Historical build documents remain useful evidence, but this file owns the execution order.

---

# 0. Canonical checkpoint — 2026-08-15

## Runtime currently served

| Item | Canonical state |
|---|---|
| Product pedagogy | **V2.3.0 · Build 34** |
| Live visual maintenance line | **Premium V5.5 · Build 34 maintenance** |
| Live `main` checkpoint | **`2bba5bd06ba14be7286e16a6a9a417fa04ce642a`** |
| Curriculum | **52 lessons / 313 items** |
| Scenario | **44 situations / 132 turns** |
| Speaking Loop | **52/52 · max 2 moments / lesson** |
| Listening | **0.88 normal / 0.65 slow** |
| Durable pedagogical stores | **6** |
| Foundations | **F01–F04 pilot**, integrated without renumbering the 52 lessons |
| Frozen architecture baseline | **2.0.0 · Build 30** |
| Primary target | **iPhone / Safari / installed PWA** |
| Recurring backend/API cost | **0 €** |
| Final Premium issue | **#114 — OPEN** |
| Build 35 | **BLOCKED / RESERVED** |

## User field verdict on V5.5

V5.5 is **technically stable and visibly much better**, but **NOT visually closed**.

The user’s canonical verdict is:

> **“c’est beaucoup mieux, mais il manque encore cette touche de Premium Feel.”**

This explicitly means:

- V5.5 is a good structural/visual base;
- the zero-flash navigation result must be preserved;
- the current Paris/Tour Eiffel visuals are still below mockup quality;
- the Original theme is still visibly weaker than Aurora / Sunset / Nocturne;
- the Premium phase remains open;
- **issue #114 must remain open**;
- **Build 35 must not start yet**.

---

# 1. What V5.5 already solved — LOCKED BEHAVIOUR

Do not reopen these problems while polishing visuals.

## 1.1 Atomic navigation / zero flash

Physical field result remains the most important navigation contract:

**ZERO route flash / ZERO remanence / ZERO competing facades.**

Permanent rule:

> **No route/page crossfade may ever show two competing app facades at the same time.**

A future “fluidity” pass is allowed to animate controls and the entering settled owner, but it must never animate an old route and a new route simultaneously.

## 1.2 Global chrome coherence

V5.5 established the baseline to preserve:

- Back control in the **top-left**;
- Settings gear in the **top-right**;
- same 46×46 control family;
- Review / Speak / Listen / Real Life all expose coherent Back behaviour;
- Scenario exit remains semantically correct: scenario → scenario list → Practice;
- Settings return restores the correct source context.

## 1.3 Progress logic

The visible progression must remain logically ordered:

```text
A0 → progress line → A1
```

Never return to the older vertical/stacked A0/A1 presentation where the current level appears visually above a line whose target is elsewhere.

## 1.4 Settings hierarchy

Learner-facing Settings must stay human:

1. Appearance / Themes
2. About / Privacy / Rights
3. Data & Recovery, available but compact / progressive disclosure

Technical diagnostic cards belong to DEBUG FR, not to Trân’s normal learner experience.

## 1.5 Home composition

V5.5 already moved Home away from “old app recoloured” toward a real app composition:

- brand/hero;
- current lesson;
- Practice block;
- supporting progress context;
- coherent Premium chrome.

The next pass upgrades its **art direction and feel**, not its pedagogical meaning.

---

# 2. Canonical Premium plan after V5.5

The following sequence is the new canonical order.

```text
V5.5 stable structural base ✅
→ V5.6 Premium Visual Identity Assets
→ V5.7 Original Theme Parity + Theme Art Integration
→ V5.8 DEBUG FR / Theme Decoupling
→ V5.9 Fluidity + Premium Feel
→ V5.10 Global Visual QA + Physical iPhone verdict
→ V2.3.x / Build 34 governance + documentation closure
→ close #114 only after explicit user PASS
→ Build 35 Memory Evidence v2 / Migration Readiness
→ Build 36 Adoption Candidate only if migration proof is complete
→ Build 37 Foundations Core
→ Build 38 Generalization & Transfer
→ Build 39 Learner Intelligence 3
→ Build 40 A1 Consolidation Audit
→ A2 only after Build 40 decision
```

All V5.6→V5.10 work stays in the **Build 34 maintenance line**.

**Do not steal Build 35 for CSS, imagery, animation, cache work, DEBUG FR, or visual QA.**

---

# 3. V5.6 — Premium Visual Identity Assets

## Goal

Replace the remaining “Paint / placeholder / CSS-art” Paris imagery with **real premium artwork** matching the approved mockup family.

The user explicitly rejected the existing Tour Eiffel graphic as:

> “graph Paint”

The solution is not another CSS silhouette. The solution is a proper asset system.

## 3.1 Canonical full-background assets

Repository destination:

```text
assets/premium/themes/aurora/background.webp
assets/premium/themes/sunset/background.webp
assets/premium/themes/nocturne/background.webp
assets/premium/themes/original/background.webp
```

### User-locked backgrounds

These three are **LOCKED visual source choices** from the user on 2026-08-15:

- **Aurora** — blue / cyan / violet / pink Paris night;
- **Sunset** — orange / coral / violet Paris sunset;
- **Nocturne** — dark jade / teal / gold Paris night.

They must not be silently regenerated or replaced during implementation.

### Original background direction

The Original theme must no longer be the weak legacy witness.

Its canonical visual direction is:

- deep midnight blue / indigo base;
- refined cobalt / electric cyan light;
- restrained pink / violet / soft magenta highlights;
- elegant Paris night;
- Eiffel Tower as premium photographic/illustrative focal point;
- subtle stars and Seine reflections;
- calm flagship identity;
- **no dramatic Aurora ribbons**;
- **no Sunset orange dominance**;
- **no Nocturne jade/gold dominance**;
- generous darker negative space for readable app UI.

A generated candidate is stored in the repository and must be human-reviewed before runtime wiring is considered final.

## 3.2 Lesson-card Eiffel assets

The current small Eiffel motif inside the **Leçon** card must also be replaced.

Repository destination:

```text
assets/premium/themes/aurora/lesson-eiffel.webp
assets/premium/themes/sunset/lesson-eiffel.webp
assets/premium/themes/nocturne/lesson-eiffel.webp
assets/premium/themes/original/lesson-eiffel.webp
```

Each asset must be coherent with its theme:

### Aurora lesson Eiffel
- deep blue/violet;
- cyan + pink luminous atmosphere;
- premium Paris night;
- recognisable Eiffel Tower;
- readable at small card size.

### Sunset lesson Eiffel
- golden/orange tower;
- coral/pink/violet sky;
- warm river/city reflections;
- romantic premium dusk.

### Nocturne lesson Eiffel
- dark teal/jade night;
- controlled emerald atmosphere;
- warm gold Eiffel Tower;
- optional subtle crescent/night detail;
- luxury editorial mood.

### Original lesson Eiffel
- midnight blue / indigo;
- cool cyan highlights;
- restrained pink-magenta;
- flagship calm Paris night;
- clearly distinct from Aurora.

Generated candidates are stored now so this chat is no longer the only place they exist.

## 3.3 Asset rules

- Artwork belongs in `/assets`, not inline base64 CSS.
- Runtime should prefer WebP assets from the repo.
- Theme-specific readability overlays may be CSS gradients, but must not flatten the artwork into generic colour soup.
- Background art must not create layout shift.
- No image may change learner data, lesson IDs or navigation semantics.
- When runtime wiring happens, PWA cache/preload versioning must include the new asset generation.
- Offline mode must retain the active theme artwork after the app has been installed/warmed.

## V5.6 Definition of Done

- [x] 3 user-approved background assets preserved in repo.
- [x] Original background candidate preserved in repo.
- [x] 4 lesson-card Eiffel candidates preserved in repo.
- [x] Asset manifest documents ownership/status.
- [ ] Human approval of Original background candidate.
- [ ] Human approval of the 4 lesson-card Eiffel candidates.
- [ ] Runtime integration — intentionally deferred to V5.7.

---

# 4. V5.7 — Original Theme Parity + Theme Art Integration

## Goal

Make all **four** themes feel like deliberate first-class themes.

The previous rule:

> “Original remains the visual witness”

is **SUPERSEDED by explicit user direction on 2026-08-15**.

New rule:

> **Original must reach the same Premium quality level as Aurora, Sunset and Nocturne.**

Original may remain the default theme, but it may not remain the visibly poorer fallback.

## 4.1 Background integration

For each theme:

- use its own canonical background asset;
- tune `background-size`, `background-position` and overlay per viewport;
- preserve readable text/card contrast;
- avoid aggressive blur that destroys image quality;
- avoid giant empty dead zones;
- preserve mockup-style Paris atmosphere;
- ensure desktop is composed, not merely a stretched mobile crop.

Target viewports:

```text
390×844
430×932
768×1024
1280×800
1440×900
```

## 4.2 Lesson-card art integration

The current Leçon-card “Paint Eiffel” must disappear completely.

The correct theme-specific `lesson-eiffel.webp` must be visible in:

- Today / current lesson card;
- any reused lesson hero card that currently owns the old placeholder;
- responsive mobile/desktop compositions where the mockup language expects the Paris motif.

The art must remain decorative and must never obscure lesson title, progress or CTA.

## 4.3 Theme parity

All four themes need equivalent design depth:

- background art;
- glass/material hierarchy;
- card edge treatment;
- glow restraint;
- icon/control contrast;
- CTA hierarchy;
- lesson art;
- Settings appearance;
- bottom navigation;
- progress surfaces;
- Listening;
- Practice.

No theme may look like “Premium themes + one old skin”.

## V5.7 Definition of Done

- [ ] 4 backgrounds actually wired.
- [ ] 4 lesson Eiffel assets actually wired.
- [ ] Original reaches Premium parity.
- [ ] No legacy CSS Eiffel remains visible.
- [ ] No broken/missing asset online or offline.
- [ ] No route flash regression.
- [ ] No learner-store mutation.
- [ ] 5-viewport screenshot matrix generated for all 4 themes.

---

# 5. V5.8 — DEBUG FR must be independent from theme

## Problem

The user found DEBUG FR effectively tied to the **Original** theme.

That is not a valid final product model.

DEBUG FR is an **admin/debug state**, not an appearance theme.

## Canonical rule

```text
theme = visual preference
debugFr = admin/debug preference

theme must never own debugFr
debugFr must never force theme
```

## Required behaviour

- DEBUG FR can be active while **Original, Aurora, Sunset or Nocturne** is active.
- Switching theme must preserve DEBUG FR state on Jerry’s browser.
- Switching DEBUG FR must preserve the selected theme.
- Trân’s normal learner mode must not be polluted with developer/diagnostic cards.
- The existing URL/debug mechanism may remain the emergency entry path.
- The DEBUG rail/diagnostic affordance may appear only when debug mode is active.
- No learner progress, Memory, Scenario, Listening or Error store may be modified by toggling DEBUG FR.

## V5.8 Definition of Done

- [ ] Theme and debug state independently persisted.
- [ ] DEBUG FR usable on all four themes.
- [ ] No theme switch exits debug.
- [ ] No debug switch resets theme.
- [ ] Trân normal mode remains clean.
- [ ] Chrome tests cover the full 4-theme matrix.
- [ ] Existing protected learner profile remains byte-safe.

---

# 6. V5.9 — Fluidity + Premium Feel

## Goal

After visual parity is established, improve the **feel of interaction** without reopening the zero-flash disaster.

The user explicitly said mobile is already “plutôt OK”, but the app then needs to be **fluidified**.

This phase is not permission to add generic page fades.

## 6.1 Permanent motion rule

### Forbidden

```text
old page fades out
while
new page fades in
```

That previously created ghosting/remanence and competing visual owners.

### Allowed

```text
atomic ownership switch
→ old owner is gone
→ new owner is the only facade
→ new settled owner may use a short enter polish
```

The same principle applies to sheets and overlays: never keep two competing route owners visible.

## 6.2 Motion targets

Premium feel should come from local interaction:

- tactile press compression;
- button highlight/glow response;
- coherent active-nav motion;
- card hover on desktop;
- tiny chevron/arrow movement;
- Settings sheet open/close;
- About / Recovery progressive disclosure;
- success check/pulse;
- progress bar movement;
- theme selection feedback;
- optional background/theme transition only if it cannot expose stale app content;
- coherent focus-visible states.

Motion must be short, restrained and reversible.

## 6.3 Performance / stability

- no animation may hold navigation hostage;
- no MutationObserver may continuously rewrite an already-correct state;
- animation completion must never be required for route correctness;
- `prefers-reduced-motion` must preserve all functionality;
- no body-empty period;
- no “tap again to make it work” behaviour;
- no service-worker hybrid generation.

## V5.9 Definition of Done

- [ ] App feels visibly smoother without route crossfades.
- [ ] Local controls respond consistently.
- [ ] Settings/About/Recovery motion coherent.
- [ ] Success/progress feedback polished.
- [ ] Reduced-motion matrix passes.
- [ ] Navigation reliability and field audio guards remain green.
- [ ] Physical iPhone test confirms no flash/remanence returned.

---

# 7. V5.10 — Final Premium QA / Physical gate

This is the **actual closure gate for #114**.

Automation alone cannot close this phase.

## 7.1 Automated matrix

Minimum:

```text
5 viewports
× 4 themes
× Home / Progress / Practice / Listening / Settings
```

Plus targeted captures/tests for:

- Review;
- Speak;
- Listen sub-practice;
- Real Life;
- lesson view with theme-specific Eiffel asset;
- About;
- Data & Recovery compact/expanded;
- DEBUG FR on all 4 themes;
- reduced-motion.

## 7.2 Assertions

- exact requested theme active;
- correct background asset loaded;
- correct lesson asset loaded;
- no horizontal overflow;
- Back/Settings geometry consistent;
- A0 → line → A1 geometry intact;
- no legacy Eiffel placeholder;
- no technical cards in learner mode;
- Original is not visually downgraded;
- no learner-store mutations during pure UI travel;
- all protected sanctuaries remain intact unless an explicitly approved later change says otherwise;
- online and offline PWA generations resolve the same asset set.

## 7.3 Human / physical gate

Required on installed iPhone/PWA:

```text
close app
→ reopen without deleting data
→ Original
→ Aurora
→ Sunset
→ Nocturne
→ Today
→ Practice
→ Review
→ Speak
→ Listen
→ Real Life
→ Progress
→ Listening
→ Settings
→ About
→ Recovery open/close
→ return Home
```

Human checks:

- ZERO flash/remanence;
- artwork actually looks Premium;
- Original belongs to the same quality family;
- Eiffel imagery no longer looks like placeholder/Paint;
- buttons/chrome feel coherent;
- screens feel fluid rather than abrupt;
- no unreadable text over imagery;
- no awkward crop on real iPhone.

## Closure rule

**Do not close issue #114 until the user gives an explicit final Premium PASS.**

Only after that:

1. record exact runtime SHA + Pages run;
2. record physical verdict;
3. synchronize README / ROADMAP / CHANGELOG / ARCHITECTURE / MASTER;
4. close #114;
5. then and only then unblock Build 35.

---

# 8. Protected sanctuaries and non-regression contracts

Unless an explicitly scoped future build justifies otherwise:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

Historical learner continuity remains a release contract:

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

Future curriculum growth must not rewrite historical IDs merely for neatness.

Voice rules remain:

- no fake pronunciation score;
- speech-recognition miss is recognition-system evidence, not proof of poor pronunciation;
- own-voice replay remains temporary/local;
- replay audio never enters learner Memory/backups;
- automatic capture of the exact first Siri attempt remains gated by real iPhone validation.

---

# 9. Build 35 → Build 40 — pedagogical roadmap preserved

Premium work must not erase the post-Build34 pedagogy sequence.

## Build 35 — Memory Evidence v2 / Migration Readiness

**Design and simulation first. No durable adoption yet.**

Evidence dimensions to model:

- retrieval;
- listening;
- scenario;
- text;
- recognition;
- construction;
- transfer;
- assistance;
- recency;
- repetition;
- recovery.

Evidence states to distinguish:

- exposure;
- assisted success;
- autonomous recall;
- contextual reuse;
- concept understanding;
- novel construction / transfer.

Mandatory migration proof:

```text
pre-migration snapshot
→ source validation
→ deterministic transform
→ simulated transactional write
→ reread
→ compare
→ rollback
→ quarantine invalid data
→ old backup compatibility
→ historical learner smoke
→ real browser proof
```

Build 35 Definition of Done:

- evidence model useful;
- ownership clear;
- bounded history clear;
- compatibility strategy clear;
- migration simulable and reversible;
- **no new durable schema adopted yet**.

## Build 36 — Memory Evidence v2 Adoption Candidate

Only allowed if Build35 migration proof is complete.

Requires transactional migration through Recovery and explicit rollback.

## Build 37 — Foundations Core

Industrialize the validated Foundations syllabus without renumbering the 52 core lessons.

## Build 38 — Generalization & Transfer

Prioritize construction of unseen phrases:

- singular → plural;
- subject substitution;
- affirmation → negation;
- present → futur proche;
- agreement transformations;
- recombination across known vocabulary/structures.

## Build 39 — Learner Intelligence 3

Tyffany chooses whether the next useful action is:

- phrase retrieval;
- concept review;
- foundation capsule;
- listening;
- scenario;
- transfer/construction.

## Build 40 — A1 Consolidation Audit

Audit real evidence before any A2 expansion.

Outcome may be:

- reinforce A1;
- internal A1+ consolidation;
- or open A2.

**A2 is not automatic.**

---

# 10. Parallel tracks that never steal build numbers

These continue as maintenance tracks when needed:

- iPhone/Safari/PWA compatibility;
- accessibility;
- safe-area and target sizing;
- offline/service-worker correctness;
- performance;
- Recovery/backup reliability;
- CI flake hardening that does not weaken assertions;
- documentation/governance.

These tracks must not become excuses to rewrite pedagogical architecture.

---

# 11. Repository asset inventory for the next session

The canonical Premium asset manifest lives at:

```text
assets/premium/README.md
```

Future sessions must inspect that manifest before generating replacements.

Expected asset tree:

```text
assets/premium/themes/
├── aurora/
│   ├── background.webp
│   └── lesson-eiffel.webp
├── sunset/
│   ├── background.webp
│   └── lesson-eiffel.webp
├── nocturne/
│   ├── background.webp
│   └── lesson-eiffel.webp
└── original/
    ├── background.webp
    └── lesson-eiffel.webp
```

Status semantics:

- **LOCKED** = explicitly selected by the user; do not regenerate silently.
- **CANDIDATE** = generated and preserved; can be replaced only after human comparison.
- **WIRED** = runtime actually uses the asset.
- **FIELD PASS** = physically validated on the installed iPhone/PWA.

---

# 12. Next-agent checklist

Before touching code:

1. read `MASTER-ROADMAP.md`;
2. read `assets/premium/README.md`;
3. inspect current `main`, open PRs and issue #114;
4. verify the exact currently deployed Pages SHA;
5. do not assume an old chat checkpoint is current;
6. do not start Build35 while #114 is open;
7. do not regenerate the three locked backgrounds;
8. preserve zero-flash atomic ownership;
9. keep DEBUG FR independent from theme;
10. remember that Original now requires Premium parity;
11. inspect screenshots/real-device result before declaring visual completion;
12. merge only after the relevant CI and human gate are satisfied.

---

# Canonical one-line order

> **Lock assets → integrate four Premium identities → elevate Original → decouple DEBUG FR from theme → fluidify locally without route crossfades → global QA → physical iPhone Premium PASS → governance closure → Build35.**
