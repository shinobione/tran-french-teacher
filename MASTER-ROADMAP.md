# French Trân’quille — MASTER ROADMAP

> **Canonical project handoff / source of truth for future work.**
>
> This document consolidates the current runtime state, pending field gates, Premium V4 proposals, and the pedagogical Build 35→40 sequence. Any future AI/chat/session should read this file before making roadmap or implementation decisions.
>
> Current runtime baseline when this roadmap was written: `main` = `8051e580990fa3f3a6c44aadc543cfcba9b66f3d` after PR #93.

---

# 0. Frozen starting point

| Item | Current state |
|---|---|
| Product pedagogy | **V2.3.0 · Build 34** |
| Curriculum | **52 lessons / 313 items** |
| Scenario | **44 situations / 132 turns** |
| Speaking Loop | **52/52 · max 2 / lesson** |
| Listening | **0.88 normal / 0.65 slow** |
| Durable pedagogical stores | **6** |
| Foundations | **F01–F04 pilot**, lessons 8–13 |
| Frozen architecture | **2.0.0 · Build 30** |
| Runtime baseline | **8051e580990fa3f3a6c44aadc543cfcba9b66f3d** |
| Primary target | **iPhone / Safari / PWA iOS** |
| Recurring cost | **0 €** |

Protected sanctuaries remain unchanged unless a future build explicitly justifies touching them:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

Non-negotiable product rules continue to apply: one-tap deterministic navigation, explicit overlay closure before routing, no silent learner-data reset, no fake pronunciation score, local replay audio never enters learner progress/Memory/backups, and migrations require snapshot + validation + rollback proof.

---

# 1. P0 Stabilization after Premium work

**Must happen before any further visual polish.**

A new field regression has been observed:

```text
Progress → Settings
→ main content disappears
→ only the bottom navigation remains visible
```

This is a **P0 UX/navigation bug** because the application loses its usable screen.

## 1.1 Global Settings Shell

Settings must become a truly global app surface and must not depend on one page owning the DOM.

### Definition of Done

- [ ] Settings opens correctly from Home.
- [ ] Settings opens correctly from Practice.
- [ ] Settings opens correctly from Progress.
- [ ] Settings opens correctly from Listening where the control is available.
- [ ] Closing Settings returns to the exact previous screen.
- [ ] No blank background / empty-body state.
- [ ] No recovery second tap.
- [ ] Theme changes preserve the current screen.
- [ ] Close via `X`, back/navigation and intended gestures is deterministic.
- [ ] Learner data remains byte-safe.
- [ ] Protected sanctuaries remain untouched unless absolutely necessary.

## 1.2 Global navigation transaction tests

Exercise the **actual action that previously failed**, not merely button presence.

Mandatory repeated path:

```text
Home → Practice → Progress → Settings → close → Listening → Home
```

The browser tribunal must click the real controls and assert computed visible ownership after each step.

## 1.3 Bottom navigation hardening

PR #93 repaired the major geometry regression. The next guard must lock:

- [ ] desktop centering;
- [ ] mobile width and side margins;
- [ ] correct z-index with Listening and Settings;
- [ ] no clipped item;
- [ ] active tab correctness;
- [ ] no stale transform inheritance;
- [ ] iPhone safe-area support.

**Phase gate:** no blank screen and deterministic navigation on the first gesture.

---

# 2. Premium Polish V4 — Mockup Fidelity

This is the next major visual milestone after P0 stabilization.

## Source of truth

The three approved visual mockups are the **visual reference**, not merely palette inspiration.

The implementation must reproduce their overall qualities:

- strong visual hierarchy;
- dense but calm mobile composition;
- controlled glass/depth;
- premium iconography;
- theme-specific surfaces and contrast;
- subtle Paris/French motifs;
- polished CTAs;
- coherent cards;
- app-like bottom navigation;
- clean typography and spacing.

The goal is a **professional product UI**, not a generic responsive website with gradients.

## 2.1 Responsive Composition System

Three deliberate layouts:

| Viewport family | Direction |
|---|---|
| iPhone ~390–430 px | native-feeling dense primary experience |
| Tablet 700–1000 px | centered app composition with controlled breathing room |
| Desktop ≥1100 px | true premium desktop composition, not enlarged mobile |

Desktop may use **main column + secondary rail** while keeping a constrained overall width.

No component should simply scale proportionally with viewport width.

## 2.2 Home Premium Reconstruction

### Branding

- [ ] preserve the approved French Trân’quille logo as the hero brand;
- [ ] recalibrate size per viewport;
- [ ] subtle theme-dependent halo;
- [ ] improve relationship between brand header, logo and Settings entry.

### Welcome Hero

Rebuild the current `Xin chào Trân 👋` block as a true editorial card:

- [ ] eyebrow `HÔM NAY`;
- [ ] strong greeting hierarchy;
- [ ] refined secondary copy;
- [ ] controlled depth;
- [ ] one subtle decorative French/Paris accent;
- [ ] theme-specific illustration treatment.

Allowed motifs, used sparingly:

```text
small Eiffel Tower
Paris skyline
stars
moon
subtle tricolour line
small landscape silhouette
```

Avoid decorative overload.

## 2.3 Lesson-of-the-day Hero Card

Make the daily lesson the primary actionable object:

- [ ] premium dedicated lesson icon;
- [ ] lesson number;
- [ ] title;
- [ ] context/subtitle;
- [ ] readable progress;
- [ ] strong primary CTA;
- [ ] controlled glass/depth;
- [ ] optional subtle illustration accent.

Desktop must feel intentional and desirable to click, not like a large functional rectangle.

## 2.4 Quick Actions

Unify `Ôn lại`, `Luyện nghe`, daily duration and related cards:

- [ ] refined circular icon treatment;
- [ ] clear title + micro-description;
- [ ] consistent chevron;
- [ ] desktop hover state;
- [ ] mobile press feedback;
- [ ] correct contrast;
- [ ] consistent vertical rhythm.

## 2.5 Icon System

Reduce dependence on OS emoji for premium interface controls.

Create one coherent local icon language for:

```text
lesson / book
review
listening / headphones
practice
progress
settings
theme
streak
time
success
Foundations
```

Preferred implementation: local SVG/CSS/assets, 0 € recurring cost.

Emoji remain acceptable inside pedagogical content where they add meaning.

## 2.6 Complete theme identities

### Aurora Bleu/Rose

Reference: approved mockup 1.

Direction:

- deep navy;
- cyan + magenta accents;
- luminous but controlled glass;
- clean cyan functional accents;
- pink emphasis;
- optional subtle Paris-night motif;
- strong contrast.

Avoid simply applying blue gradients everywhere.

### Sunset Orange/Violet

Reference: approved mockup 2.

Direction:

- warm orange;
- coral;
- deep violet;
- slightly more cinematic hero;
- orange→pink CTA language;
- warm layered cards;
- subtle Paris-at-dusk decorative motif.

### Nocturne Jade/Or

Reference: approved mockup 3.

Direction:

- black/deep emerald;
- champagne gold;
- restrained glow;
- fine gold hairlines;
- carefully scoped serif display typography;
- jade/gold controls;
- subtle moon/Eiffel motifs.

It must feel editorial/luxury, not like a green overlay.

### Original

Original remains the visual witness/baseline.

Do not silently convert Original into a fourth Premium theme.

## 2.7 Progress V4

Current Progress works functionally but still reads too much like a generic dashboard.

Rework:

- [ ] compact premium header;
- [ ] more visual A0→A1 progression;
- [ ] stronger next-lesson card;
- [ ] cleaner stage/step groups;
- [ ] clearly distinct completed/current/locked states;
- [ ] Learner Intelligence remains progressive disclosure;
- [ ] no long “parchment” screen feeling.

## 2.8 Practice V4

Apply the same design system to:

- quick session;
- vocabulary;
- scenarios;
- Listening;
- Tyffany recommendations.

Maintain **one main intention + a few secondary choices**, not a wall of buttons.

## 2.9 Listening V4

Pedagogical behavior remains unchanged.

Visual polish targets:

- [ ] coherent header;
- [ ] refined session counter/progress;
- [ ] premium Normal/Slow controls;
- [ ] clearer answer cards;
- [ ] polished correct/incorrect feedback;
- [ ] clearer `Ý nghĩa / Phân biệt / Hội thoại` segmentation;
- [ ] bottom navigation integrated without ownership regressions.

## 2.10 Settings V4

After the P0 functional fix, rebuild Settings as a real premium global drawer/modal.

Candidate sections:

```text
Profile
Language
Sound
Notifications (only if genuinely used)
Appearance
Themes
Privacy
About
Recovery via progressive disclosure when relevant
```

The theme picker should directly inherit mockup-level treatment:

- glossy orbs;
- theme names;
- concise descriptions;
- visual preview;
- clear current state.

---

# 3. Micro-interactions / Premium Feel

After V4 structure is stable, add restrained premium interactions:

- [ ] press scale;
- [ ] localized glow;
- [ ] desktop hover;
- [ ] card transitions;
- [ ] Settings enter/exit transition;
- [ ] theme transition;
- [ ] subtle success micro-animation;
- [ ] tactile CTA feedback;
- [ ] bottom-nav active transition;
- [ ] restrained screen transitions.

All motion must respect:

```css
prefers-reduced-motion
```

No animation may delay an exercise or prevent a click.

---

# 4. Visual QA Tribunal

Functional green CI is not enough. Previous regressions proved that a page can be technically “present” while visibly broken.

## Minimum viewport matrix

```text
390×844   iPhone baseline
430×932   large iPhone
768×1024  tablet
1280×800  laptop
1440×900  desktop
```

## Screens per theme

```text
Home
Practice
Progress
Listening
Settings
```

## Visual assertions

- [ ] no horizontal overflow;
- [ ] no element outside viewport;
- [ ] bottom nav centered;
- [ ] no blank content surface;
- [ ] Settings visible when opened;
- [ ] text contrast acceptable;
- [ ] primary CTA visible;
- [ ] hero layout intact;
- [ ] logo not cropped;
- [ ] iPhone safe areas respected.

Initial strategy: CI screenshots as artifacts for human review, before introducing fragile pixel-diff baselines.

Selective stable visual baselines may be added later.

---

# 5. Real-device Field Validation with Trân

Several existing field gates remain open and are grouped here so they are never forgotten.

## 5.1 Navigation

- [ ] Listening → one tap `Aujourd’hui` → Home immediately visible.

## 5.2 Own-voice replay

Bài 11 and Bài 12:

```text
Ghi âm
→ Dừng ghi âm
→ ▶ Giọng của tôi appears
→ replay is audible
→ next speech recognition remains normal
```

No local replay audio becomes durable learner evidence.

## 5.3 Foundations F01–F04

Validate with Trân:

- [ ] Vietnamese explanation is easy to understand;
- [ ] `la gare / un billet / une table` are understood as reusable patterns, not only memorized phrases;
- [ ] `la pharmacie → les pharmacies` plural concept is understood;
- [ ] duration feels reasonable;
- [ ] capsule feels useful;
- [ ] capsule is not intrusive.

**Do not industrialize F05–F18 before this return.**

## 5.4 Premium V4 real-device visual gate

On the real iPhone/PWA:

- [ ] Home;
- [ ] Progress;
- [ ] Practice;
- [ ] Listening;
- [ ] Settings;
- [ ] theme change;
- [ ] close/reopen PWA.

---

# 6. Documentation / Governance Closure

Before Build 35, synchronize the canonical project documents with the real runtime history.

Update together:

```text
README.md
ROADMAP.md
CHANGELOG.md
docs/ARCHITECTURE.md
MASTER-ROADMAP.md
```

The closure must record:

- reliability PRs #86–#88;
- themes #89;
- Premium Theme Polish #90;
- Premium Depth #91;
- Mockup Fidelity V3 #92;
- nav geometry hotfix #93;
- Settings P0 resolution;
- Premium Polish V4;
- field validation results;
- final certified runtime SHA;
- matching GitHub Pages deployment.

## Versioning rule

Keep **Build 34** as the pedagogical milestone.

Treat current visual/reliability work as a **V2.3.x maintenance/product-quality line**.

Do **not** consume the Build 35 number for CSS/visual work: Build 35 already has a defined pedagogical/architecture meaning.

---

# 7. Build 35 — Memory Evidence v2 / Migration Readiness

Resume the canonical pedagogical roadmap only after the product-quality closure above.

**Design-first. No durable migration yet.**

## 7.1 Evidence model

Must distinguish at minimum:

```text
retrieval
listening
scenario
text
recognition
construction
transfer
assistance
recency
repetition
recovery
```

Evidence states must distinguish:

```text
exposure
assisted success
autonomous recall
contextual reuse
concept understanding
novel construction / transfer
```

A speech-recognition miss remains **recognition-system evidence**, never pronunciation quality.

## 7.2 Storage decision

- [ ] objectively decide in-place vs new store;
- [ ] define history/size bounds;
- [ ] guarantee V1/V2 backup compatibility;
- [ ] explicitly document ownership;
- [ ] no schema adoption merely for cleanliness.

## 7.3 Mandatory migration dry run

1. [ ] `pre-migration` snapshot;
2. [ ] source validation;
3. [ ] deterministic transformation;
4. [ ] simulated transactional write;
5. [ ] reread;
6. [ ] compare;
7. [ ] rollback;
8. [ ] quarantine invalid data;
9. [ ] old backups;
10. [ ] historical profile `7 completed / l8=4 / 40 known`;
11. [ ] real browsers.

**Build 35 DoD:** model is simulable and reversible; no new durable schema adopted yet.

---

# 8. Build 36 — Memory Evidence v2 Adoption Candidate — CONDITIONAL

Build 36 exists only if Build 35 closes every migration gate.

Required proof:

- [ ] deterministic migration;
- [ ] idempotence;
- [ ] proven rollback;
- [ ] backup compatibility;
- [ ] old-user smoke;
- [ ] Recovery `pre-migration` snapshot;
- [ ] bounded storage;
- [ ] no invented fact from absence of evidence.

If this is not solid, **Build 36 does not ship**.

---

# 9. Build 37 — Foundations Core Complete

Only after real F01–F04 validation.

Candidate remaining syllabus:

```text
subject pronouns
être / avoir consolidation
-er verbs
futur proche
modals
negation
questions
adjectives
possessives
partitives
contractions
passé récent
passé composé
spoken on
```

Rules:

- [ ] finalize F05–F18 from audit + field feedback;
- [ ] define introduction/reinforcement/review mapping;
- [ ] define `do not trigger` rules;
- [ ] use Listening/Speaking only where pedagogically useful;
- [ ] emit concept evidence compatible with Memory v2;
- [ ] no systematic microphone requirement;
- [ ] reuse structures already explicitly taught in lessons rather than duplicating them.

---

# 10. Build 38 — Generalization & Transfer

Move from memorized-phrase checking toward autonomous construction.

Targets:

```text
singular → plural
masculine/feminine when relevant
subject replacement
affirmative → negative
statement → question
present → futur proche
simple passé récent / passé composé
article + noun
adjective agreement
new sentence using known vocabulary
```

Validation remains local and deterministic.

No vague pseudo-LLM score.

---

# 11. Build 39 — Learner Intelligence 3

Tyffany can choose among:

```text
continue lesson
review phrase
review concept
propose Foundations capsule
Listening
Transfer
maintenance
```

Keep separate:

```text
phrase competence
concept competence
confidence
evidence diversity
```

---

# 12. Build 40 — A1 Consolidation Audit

Before any large A2 expansion, audit:

- [ ] all 52 lessons;
- [ ] Foundations;
- [ ] Listening;
- [ ] scenarios;
- [ ] speaking;
- [ ] local own-voice replay;
- [ ] Transfer;
- [ ] Memory;
- [ ] Learner Intelligence;
- [ ] real-life situations;
- [ ] remaining A1 gaps.

Then explicitly decide:

```text
reinforce A1
internal A1+
or genuine A2 expansion
```

Do not choose A2 merely for roadmap prestige.

---

# 13. A2 — Only after Build 40

Candidate axes:

```text
richer narration
causes / consequences
developed opinion
administration
work
housing / services
daily health
travel incidents
phone calls
simple writing
more natural listening
connectors
frequent object pronouns
imperative
polite conditional
consolidated passé composé
imparfait if needed
future
comparison / superlative
frequency / duration
```

Every new capability should integrate, where relevant, with:

```text
Curriculum
Listening
Scenario
Speaking
Foundations
Memory Evidence
Transfer
```

---

# Parallel Product-Quality Track

Maintain throughout all future phases without stealing pedagogical build numbers.

## Accessibility

- focus states;
- contrast;
- touch target sizes;
- VoiceOver compatibility;
- semantic labels.

## PWA

- offline behavior;
- cache/update correctness;
- avoid stale CSS/JS after deploy;
- iOS safe areas.

## Performance

- avoid excessive blur/glow on iPhone;
- keep animations lightweight;
- watch memory usage on long sessions.

## Recovery / Privacy

- backup/restore before migrations;
- local-first learner state;
- explicit privacy boundaries;
- replay audio remains temporary/local.

## CI

- continue reducing historical Chrome/MediaRecorder flakes;
- test actual failing gestures, not DOM existence only;
- maintain historical tribunals without rewriting the past.

## GitHub governance

- canonical docs must never trail runtime by many PRs again;
- consider formal tags/releases for major stable milestones;
- record exact runtime SHA + Pages certification for closures.

---

# Canonical execution order

```text
P0 Settings/navigation stabilization
→ Premium Polish V4 / Mockup Fidelity
→ Micro-interactions
→ Visual QA Tribunal
→ Real-device Trân validation
→ V2.3.x / Build34 documentation closure
→ Build35 Memory design
→ Build36 if and only if migration proof is complete
→ Build37 Foundations Core
→ Build38 Transfer
→ Build39 Learner Intelligence 3
→ Build40 A1 Audit
→ A2 only after Build40 decision
```

This order is deliberate: first recover **professional product quality and runtime reliability**, then resume the deeper pedagogical architecture without losing any pending field gate.

---

# AI / Future-session handoff rule

Any future AI session working on `shinobione/tran-french-teacher` should:

1. read `MASTER-ROADMAP.md` first;
2. read `ROADMAP.md`, `README.md`, `CHANGELOG.md` and `docs/ARCHITECTURE.md` for implementation/history detail;
3. inspect current `main` and open PRs before assuming this snapshot is still current;
4. preserve the Build 35→40 numbering and pedagogical intent;
5. treat the approved Aurora / Sunset / Jade mockups as Premium V4 visual source-of-truth;
6. never mark field gates closed without real-device confirmation where specified;
7. never let visual maintenance silently change learner data, voice semantics or frozen baselines.
