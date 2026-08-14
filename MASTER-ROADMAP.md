# French Trân’quille — MASTER ROADMAP

> **Canonical project handoff / source of truth for future work.**
>
> This document consolidates the current runtime state, field gates, Premium V4 work, and the pedagogical Build 35→40 sequence. Any future AI/chat/session should read this file before making roadmap or implementation decisions.
>
> Product pedagogy remains **V2.3.0 · Build 34**. Build 35 is still reserved for **Memory Evidence v2 / Migration Readiness**. All current visual/reliability work stays in the **V2.3.x / Build 34 maintenance line**.

## CURRENT EXECUTION CHECKPOINT — 2026-08-14

This checkpoint is authoritative and supersedes older “in progress” wording in the historical detail below.

- **P0 Settings/navigation:** automated certification closed by PR #94 + #95; real-device Safari/PWA tests 1→8 closed through issue #97.
- **Premium V4 primary surfaces:** Home, Progress, Practice, Listening and Settings are implemented through PRs #99–#104.
- **Surface compositor P0:** field-clean after PR #107 + #108. Issue #106 is CLOSED after the physical iPhone/PWA retest reported **“plus de flash”**. Hard rule: **no route/page crossfade may ever reintroduce competing visible facades**.
- **Field Navigation maintenance runtime:** **2.3.6 · Build 34.6**. Build 35 remains untouched/reserved.
- **Premium micro-interactions:** PR #111 merged at `3457fe577ecd6277042329955975dcc86f5b77ab`; GitHub Pages #167 succeeded on that exact SHA. Motion is local to settled controls only and respects `prefers-reduced-motion`.
- **Global Visual QA:** PR #112 is the current closure candidate. Its tribunal covers **100 combinations** (5 viewports × 4 themes × 5 primary screens) in normal mode and the same **100 combinations under reduced-motion**, plus **40 PNG human-review captures** (390×844 and 1440×900 × 4 themes × 5 screens).
- **Global QA found real visual debt:** bright Aurora/Sunset primary CTA gradients used white text with insufficient contrast; human review of the 40 captures also found Jade Listening’s white label on a light mint/gold CTA. A dedicated `premium-v4-contrast.css` layer corrects Aurora (`#071531` ink), Sunset (`#140b28`) and Jade Listening (`#041511`) while leaving Original untouched.
- **PWA/cache line for the Visual QA candidate:** `2.3.15-b34.6-v4contrast1`; route coherence remains `2.3.12-v4coherence1`; micro-interactions remain `2.3.14-v4motion1`; the navigation geometry hotfix remains the final CSS import.
- **Original:** remains the visual witness; Premium V4 markers/styles must not silently leak into it.
- **Issue #98 (Aurora hero):** intentionally remains open until the final Premium V4 real-device visual verdict; earlier direction was accepted as “pas mal” but not formally closed.

### Canonical next order from this checkpoint

```text
Global Visual QA / PR #112 closure 🚧
→ final Premium V4 real-device visual validation with Trân
→ V2.3.x / Build 34 governance + documentation closure
→ Build 35 Memory Evidence v2 / Migration Readiness
→ Build 36 only if migration proof is complete
→ Build 37 Foundations Core
→ Build 38 Transfer
→ Build 39 Learner Intelligence 3
→ Build 40 A1 Audit
→ A2 only after Build 40 decision
```

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
| Pre-P0 visual baseline | **8051e580990fa3f3a6c44aadc543cfcba9b66f3d · PR #93** |
| Automated P0 runtime | **118b0e6d86f26763c52665dda2cafdf8789e5d7f · PR #95** |
| P0 real-device field certification | **PASS 1→8 · issue #97 · 2026-08-14 · deployed main a8d58274e976d70642889b6abe37ff814c7f0767** |
| P0 compositor field certification | **PASS · issue #106 · PR #107 + #108 · user field verdict “plus de flash” · 2026-08-14** |
| Micro-interactions deployed | **PR #111 · main 3457fe577ecd6277042329955975dcc86f5b77ab · Pages #167 SUCCESS** |
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

Non-negotiable product rules continue to apply: one-tap deterministic navigation, explicit overlay closure before routing, **atomic surface ownership with no route-level crossfade**, no silent learner-data reset, no fake pronunciation score, local replay audio never enters learner progress/Memory/backups, and migrations require snapshot + validation + rollback proof.

---

# 1. P0 Stabilization after Premium work

**Automated P0 status: CLOSED on `main` by PR #94 + PR #95.**

**Real-device P0 status: CLOSED — tests 1→8 passed on the installed iPhone/Safari PWA on 2026-08-14; issue #97 closed as completed.**

**Premium compositor field regression status: CLOSED — issue #106, PR #107 + #108, physical iPhone/PWA confirmation “plus de flash”.**

The field regression that triggered the first phase was:

```text
Progress → Settings
→ main content disappears
→ only the bottom navigation remains visible
```

Root cause was the Build 27 Settings helper depending on `.screen-home`; from Progress the helper became a no-op after the active facade had already been faded out. PR #94 moved Settings open/return ownership into the field-navigation runtime. PR #95 completed Practice ownership, bottom-navigation hardening and the full browser tribunal.

A later Premium V4 field video exposed a second class of failures: transient ghosting/superposition, black legacy slabs and a residual Practice-entry flash. PR #107 introduced the atomic Premium surface compositor + legacy visual bridge, and PR #108 fixed the final transaction ordering so Practice owns the viewport before any technical host normalization. This contract is now permanent.

## 1.1 Global Settings Shell

Settings is now treated as a global navigation transaction rather than as a Home-owned action.

### Definition of Done

- [x] Settings opens correctly from Home.
- [x] Settings opens correctly from Practice.
- [x] Settings opens correctly from Progress.
- [x] Settings from Listening is N/A in the current runtime because Listening exposes no Settings control; no hidden fake entry was added merely to satisfy CI.
- [x] Closing Settings returns to the exact previous supported screen: Home, Practice or Progress.
- [x] No blank background / empty-body state in the browser tribunal.
- [x] No recovery second tap.
- [x] Theme changes preserve the Settings screen and return context.
- [x] App Back control is deterministic in automated navigation tests.
- [x] Real-device return/back behavior exposed by the installed PWA certified through issue #97; browser-only gestures not exposed by the installed PWA are N/A for this gate.
- [x] Learner data remains byte-safe.
- [x] Protected sanctuaries remain untouched and are hash-guarded in CI.

## 1.2 Global navigation transaction tests

The actual failing actions are exercised, not merely button presence.

Certified browser path:

```text
Home → Practice → Progress → Settings → close → Listening → Home
```

Additional certified transaction:

```text
Practice → Settings → Practice
```

The compositor tribunal additionally samples transition states and deterministically protects Practice entry ordering. Premium routes must never expose two competing visual owners. Original remains a historical witness and is not silently converted to the Premium compositor model.

## 1.3 Bottom navigation hardening

PR #93 repaired the major geometry regression. PR #95 and later V4/P0 guards lock the following contracts:

- [x] desktop centering;
- [x] mobile width and side margins;
- [x] correct z-index with Listening and Settings;
- [x] no clipped item;
- [x] active tab correctness;
- [x] no stale transform inheritance;
- [x] iPhone safe-area CSS support;
- [x] 44 px+ contained navigation targets;
- [x] geometry across Original / Aurora / Sunset / Jade at 390×844, 430×932, 768×1024, 1280×800 and 1440×900.

**Automated phase gate:** PASS — no blank screen and deterministic visible ownership on the first app gesture.

**Field phase gate:** PASS — issue #97, tests 1→8 on the installed iPhone/PWA, 2026-08-14.

**Premium compositor field gate:** PASS — issue #106, 2026-08-14.

---

# 2. Premium Polish V4 — Mockup Fidelity

**STATUS: PRIMARY SURFACES IMPLEMENTED; GLOBAL VISUAL QA CLOSURE IN PR #112.** Final physical-device visual validation remains after deployment of the Visual QA/contrast closure.

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

This composition system is now exercised by dedicated per-surface tribunals plus the global 5-viewport matrix.

## 2.2 Home Premium Reconstruction

Implemented through PR #99/#100.

### Branding

- [x] preserve the approved French Trân’quille logo as the hero brand;
- [x] recalibrate size per viewport;
- [x] subtle theme-dependent halo;
- [x] improve relationship between brand header, logo and Settings entry.

### Welcome Hero

- [x] eyebrow `HÔM NAY`;
- [x] strong greeting hierarchy;
- [x] refined secondary copy;
- [x] controlled depth;
- [x] theme-specific atmospheric treatment.

**Aurora V4 correction (#98):** the oversized rounded/glass welcome frame was removed. Aurora identity now comes from controlled cyan/magenta atmosphere, a restrained accent line and typography rather than a second giant panel. Issue #98 stays open until the final real-device V4 verdict.

## 2.3 Lesson-of-the-day Hero Card

- [x] lesson number/title/context hierarchy;
- [x] readable progress;
- [x] strong primary CTA;
- [x] controlled glass/depth;
- [x] desktop composition distinct from enlarged mobile.

## 2.4 Quick Actions

- [x] refined icon treatment;
- [x] clear title + micro-description;
- [x] consistent chevron/action affordance;
- [x] desktop hover state via V4 motion layer;
- [x] mobile press feedback via V4 motion layer;
- [x] contrast guarded by global QA;
- [x] consistent vertical rhythm.

## 2.5 Icon System

Premium controls now reduce dependence on raw OS emoji through the V4 surface layers/CSS icon treatment. Emoji remain acceptable inside pedagogical content where they add meaning. A dedicated asset-wide SVG migration is not required to close V4.

## 2.6 Complete theme identities

### Aurora Bleu/Rose

Implemented as deep navy + cyan/magenta controlled glow. Global QA found and fixed bright-gradient CTA contrast via dark navy ink `#071531`.

### Sunset Orange/Violet

Implemented with orange/coral/deep violet cinematic surfaces. Global QA found and fixed bright-gradient CTA contrast via dark violet ink `#140b28`.

### Nocturne Jade/Or

Implemented as dark emerald/champagne-gold editorial treatment. Human review of Global QA screenshots found the generic Listening primary CTA too light for its white label; V4 contrast pass uses dark jade `#041511` there while preserving the dark/gold Home and Progress CTAs.

### Original

Original remains the visual witness/baseline. Premium V4 readiness markers and visual layers must not leak into it.

## 2.7 Progress V4

Implemented through PR #101:

- [x] compact premium header;
- [x] more visual A0→A1 progression;
- [x] stronger next-lesson card;
- [x] cleaner stage/step groups;
- [x] clearly distinct completed/current/locked states;
- [x] Learner Intelligence remains progressive disclosure;
- [x] no long “parchment” screen feeling.

## 2.8 Practice V4

Implemented through PR #102 with one recommended primary intention and secondary choices. PR #105/#107/#108 subsequently hardened visual ownership and eliminated Home bleed / Practice-entry flash.

## 2.9 Listening V4

Implemented through PR #103; pedagogical behavior and rates remain unchanged.

- [x] coherent header;
- [x] refined session counter/progress;
- [x] premium Normal/Slow controls;
- [x] clearer answer cards;
- [x] polished correct/incorrect feedback;
- [x] clearer segmentation/transcript treatment;
- [x] bottom navigation integrated without ownership regressions;
- [x] primary CTA contrast covered by V4 contrast pass/global QA.

## 2.10 Settings V4

Implemented through PR #104 using the real existing Settings sections only. Diagnostics/recovery remain progressive disclosure; no destructive reset is surfaced merely for visual symmetry.

- [x] Appearance/theme picker first;
- [x] About/diagnostic styling;
- [x] privacy/legal layout;
- [x] data/recovery isolation;
- [x] desktop two-column where useful;
- [x] mobile full-width composition;
- [x] exact Home/Progress/Practice return context preserved.

---

# 3. Micro-interactions / Premium Feel

**STATUS: IMPLEMENTED / DEPLOYED through PR #111, Pages #167.**

- [x] press scale / tactile feedback;
- [x] localized glow;
- [x] desktop hover;
- [x] card/control affordance transitions;
- [x] focus-visible treatment;
- [x] subtle Listening success micro-animation;
- [x] tactile CTA feedback;
- [x] bottom-nav active-control transition;
- [x] theme-picker swatch feedback;
- [x] `prefers-reduced-motion` disables local motion.

Explicitly **not implemented by design**:

```text
route/page crossfades
Home ↔ Practice ↔ Progress ↔ Listening ↔ Settings fades
navigation delays
whole-shell motion
```

The route-level motion prohibition is a permanent reliability contract learned from the physical iPhone/PWA failures. No animation may delay an exercise or prevent a click.

---

# 4. Visual QA Tribunal

Functional green CI is not enough. Previous regressions proved that a page can be technically “present” while visibly broken.

**STATUS: GLOBAL TRIBUNAL IMPLEMENTED IN PR #112; final merge/deployment gate pending at the top checkpoint.**

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

## Automated matrix

```text
5 viewports × 4 themes × 5 screens = 100 settled-layout cases
same 100 cases under prefers-reduced-motion
40 PNG human-review captures = 2 representative viewports × 4 themes × 5 screens
```

## Visual assertions

- [x] no horizontal overflow;
- [x] critical owner/header/CTA clipping guarded;
- [x] Home logo not cropped;
- [x] bottom nav centered and 44 px+ targets guarded;
- [x] no blank content surface in automated paths;
- [x] Settings ownership/visibility guarded;
- [x] Premium text contrast proxy guarded;
- [x] actual primary CTA gradient contrast guarded against the worst opaque gradient stop;
- [x] parser covers `rgb/rgba` and modern `color(srgb …)` computed colors;
- [x] route motion remains zero for Premium owners;
- [x] legacy Conversation hub remains themed, not a foreign black slab;
- [x] learner stores remain unchanged;
- [x] iPhone safe-area contracts remain protected.

Original’s historical route fade is timing-neutralized **only inside the settled-layout QA/capture harness** because Chrome virtual-time can freeze that compositor transition. Premium’s real route behavior is not neutralized and remains independently protected by the atomic transition tribunal.

No fragile full-page pixel-diff baseline is introduced. PNG artifacts are for human review and targeted follow-up.

---

# 5. Real-device Field Validation with Trân

Several field gates are grouped here so they are never forgotten.

## 5.1 P0 navigation certification — CLOSED

Issue #97 closed on 2026-08-14 after the user reported **1→8 OK** on the installed Safari/PWA runtime:

- [x] Home → Settings → back → Home immediately visible.
- [x] Progress → Settings → back → Progress immediately visible.
- [x] Practice → Settings → back → Practice immediately visible.
- [x] Change Aurora / Sunset / Jade while Settings is open → Settings remains visible → back returns to source screen.
- [x] Listening → one tap `Aujourd’hui` → Home immediately visible.
- [x] Listening overlay + bottom navigation ownership looks correct and remains tappable.
- [x] Bottom navigation is centered, unclipped and clear of the iPhone safe area.
- [x] Close and reopen the installed PWA → no stale blank surface or stale navigation state.

## 5.2 Premium compositor field certification — CLOSED

After the field video exposed flashes/remanence/superposition/black legacy slabs, PR #107 + #108 were deployed and retested on the physical iPhone/PWA. Final verdict on 2026-08-14: **“plus de flash”**. Issue #106 closed completed.

## 5.3 Own-voice replay

Bài 11 and Bài 12:

```text
Ghi âm
→ Dừng ghi âm
→ ▶ Giọng của tôi appears
→ replay is audible
→ next speech recognition remains normal
```

No local replay audio becomes durable learner evidence.

## 5.4 Foundations F01–F04

Validate with Trân:

- [ ] Vietnamese explanation is easy to understand;
- [ ] `la gare / un billet / une table` are understood as reusable patterns, not only memorized phrases;
- [ ] `la pharmacie → les pharmacies` plural concept is understood;
- [ ] duration feels reasonable;
- [ ] capsule feels useful;
- [ ] capsule is not intrusive.

**Do not industrialize F05–F18 before this return.**

## 5.5 Premium V4 final real-device visual gate — NEXT AFTER PR #112 DEPLOYMENT

On the real iPhone/PWA, verify the final deployed contrast/global-QA build:

- [ ] Home;
- [ ] Progress;
- [ ] Practice;
- [ ] Listening;
- [ ] Settings;
- [ ] Aurora / Sunset / Jade theme change;
- [ ] tactile press feedback feels restrained;
- [ ] no route flash/remanence/superposition;
- [ ] bright CTA labels remain clearly readable;
- [ ] close/reopen PWA remains clean.

Only after this visual verdict should issue #98 / final Premium V4 field closure be considered complete.

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
- Settings P0 resolution #94;
- P0 navigation/bottom-nav hardening #95;
- P0 field certification #97;
- V4 Home/Progress/Practice/Listening/Settings #99–#104;
- ownership hotfix #105;
- atomic compositor / PWA coherence #107;
- Practice entry final flash fix #108;
- micro-interactions #111;
- Global Visual QA + contrast pass #112;
- final physical-device V4 visual validation;
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
- maintain historical tribunals without rewriting the past;
- Global V4 visual QA must remain a gate after #112.

## GitHub governance

- canonical docs must never trail runtime by many PRs again;
- consider formal tags/releases for major stable milestones;
- record exact runtime SHA + Pages certification for closures.

---

# Canonical execution order

```text
P0 Settings/navigation automated stabilization ✅
→ P0 real-device Safari/PWA certification ✅
→ Premium V4 primary surfaces ✅
→ atomic surface compositor + legacy bridge ✅
→ Practice-entry field flash closure ✅
→ Micro-interactions / Premium Feel ✅ · PR #111 · Pages #167
→ Global Visual QA Tribunal 🚧 · PR #112
→ Premium V4 final real-device visual validation
→ V2.3.x / Build 34 governance/documentation closure
→ Build 35 Memory Evidence v2 / Migration Readiness
→ Build 36 if and only if migration proof is complete
→ Build 37 Foundations Core
→ Build 38 Transfer
→ Build 39 Learner Intelligence 3
→ Build 40 A1 Audit
→ A2 only after Build 40 decision
```

This order is deliberate: first recover **professional product quality and runtime reliability**, certify it on the actual iPhone/PWA target, close the visual/governance layer, then resume deeper pedagogical architecture without stealing Build 35 for maintenance work.

---

# AI / Future-session handoff rule

Any future AI session working on `shinobione/tran-french-teacher` should:

1. read `MASTER-ROADMAP.md` first;
2. read `ROADMAP.md`, `README.md`, `CHANGELOG.md` and `docs/ARCHITECTURE.md` for implementation/history detail;
3. inspect current `main` and open PRs before assuming this snapshot is still current;
4. preserve the Build 35→40 numbering and pedagogical intent;
5. treat the approved Aurora / Sunset / Jade mockups as Premium V4 visual source-of-truth;
6. never mark field gates closed without real-device confirmation where specified;
7. never let visual maintenance silently change learner data, voice semantics or frozen baselines;
8. preserve the atomic compositor rule: **no route/page crossfade between competing app surfaces**;
9. keep Original as visual witness unless an explicit future product decision changes that contract.