# French Trân’quille — MASTER ROADMAP

> **Canonical project handoff / source of truth for future work.**
>
> This document consolidates the current runtime state, field gates, Premium work, and the pedagogical Build 35→40 sequence. Any future AI/chat/session should read this file before making roadmap or implementation decisions.
>
> Product pedagogy remains **V2.3.0 · Build 34**. Build 35 is still reserved for **Memory Evidence v2 / Migration Readiness**. All current visual/reliability work stays in the **V2.3.x / Build 34 maintenance line**.

## CURRENT EXECUTION CHECKPOINT — 2026-08-14

This checkpoint is authoritative and supersedes older “in progress” wording in the historical detail below.

- **P0 Settings/navigation:** automated certification closed by PR #94 + #95; real-device Safari/PWA tests 1→8 closed through issue #97.
- **Premium V4 primary surfaces:** Home, Progress, Practice, Listening and Settings implemented through PRs #99–#104.
- **Surface compositor P0:** field-clean after PR #107 + #108. Issue #106 is CLOSED after physical iPhone/PWA retest reported **“plus de flash”**. Permanent rule: **no route/page crossfade may ever reintroduce competing visible facades**.
- **Premium micro-interactions:** PR #111 merged at `3457fe577ecd6277042329955975dcc86f5b77ab`; GitHub Pages #167 succeeded on that exact SHA. Motion is local to settled controls only and respects `prefers-reduced-motion`.
- **Global Visual QA:** PR #112 merged into `main` as **`68638129ac34cfe5af275643f73527f0f4007d23`**. GitHub Pages **#168 SUCCESS** on that exact SHA. Final PR head passed **29/29 workflows**. Global tribunal covers **100 combinations** (5 viewports × 4 themes × 5 primary screens) in normal mode + the same **100 under reduced-motion**, plus **40 verified PNG captures**; every capture must prove `capture-ready=1` with the exact requested theme and screen.
- **Global QA found and fixed real visual debt:** Aurora/Sunset bright CTA contrast and Jade Listening CTA contrast. Dedicated `premium-v4-contrast.css` uses Aurora `#071531`, Sunset `#140b28`, Jade Listening `#041511`, with Original untouched.
- **V4 PWA/cache line deployed:** `2.3.15-b34.6-v4contrast1`; route coherence remains `2.3.12-v4coherence1`; micro-interactions remain `2.3.14-v4motion1`; navigation geometry hotfix remains the final CSS import.
- **Premium V4 physical-device verdict:** **PASS — user explicitly reported “V4 PASSED” and “ZERO Flashs enfin” on 2026-08-14.** Issue #113 closed completed. Issue #98 Aurora hero also closed completed.
- **Important product decision:** V4 PASS means the Premium foundation is stable and field-certified; it **does not mean visual work is finished**. The user explicitly requires another **3–4 visible polish levels** and final visual convergence toward the approved Aurora / Sunset / Jade mockups.
- **New canonical visual phase:** issue **#114 — Premium Fidelity V5 · System Coherence & Mockup Convergence**. This stays in Build 34 maintenance. Build 35 remains untouched/reserved.
- **V5.1 active branch:** `agent/premium-v5-coherence-kickoff`. Candidate maintenance runtime **2.3.7 · Build 34.7**, cache line **2.3.16-b34.7-v5coherence1**. First targets: Progress A0 badge collision, fuller utility controls, real Listening Settings roundtrip, Foundations/pedagogical overlay coherence.
- **Original:** remains the visual witness unless an explicit future product decision changes that contract.

### Canonical next order from this checkpoint

```text
Premium V4 final field certification ✅ · V4 PASSED · ZERO flashs
→ V5.1 coherence primitives + first field defects 🚧 · issue #114
→ V5.2 global utility controls + Listening Settings parity
→ V5.3 legacy/pedagogical overlay reconstruction
→ V5.4 mockup-convergence / premium-density pass
→ V5 global visual QA + physical iPhone/PWA verdict
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
| P0 real-device field certification | **PASS 1→8 · issue #97 · 2026-08-14** |
| P0 compositor field certification | **PASS · issue #106 · PR #107 + #108 · “plus de flash”** |
| Micro-interactions deployed | **PR #111 · `3457fe577ecd6277042329955975dcc86f5b77ab` · Pages #167 SUCCESS** |
| V4 global visual QA deployed | **PR #112 · `68638129ac34cfe5af275643f73527f0f4007d23` · Pages #168 SUCCESS · 29/29 PR workflows** |
| V4 final physical-device certification | **PASS · issue #113 · “V4 PASSED” / “ZERO Flashs enfin” · 2026-08-14** |
| Active visual successor | **Premium Fidelity V5 · issue #114 · Build 34 maintenance** |
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

Settings is treated as a global navigation transaction rather than as a Home-owned action.

### Certified V4 contract

- [x] Settings opens correctly from Home.
- [x] Settings opens correctly from Practice.
- [x] Settings opens correctly from Progress.
- [x] Closing Settings returns to exact previous supported V4 source: Home, Practice or Progress.
- [x] No blank background / empty-body state in browser tribunal.
- [x] No recovery second tap.
- [x] Theme changes preserve Settings screen and return context.
- [x] App Back control deterministic in automated navigation tests.
- [x] Learner data remains byte-safe.
- [x] Protected sanctuaries remain hash-guarded.

### V5 successor requirement — Listening Settings parity

Field review after V4 certification identified that Listening was the last primary surface without a Settings control. V5 must add **the real global Settings transaction**, not a duplicate/fake settings screen.

Required contract:

```text
Listening active session
→ Settings gear
→ Settings owns viewport atomically
→ Back
→ exact same Listening session/question restored
```

No route crossfade, no new learner store, no reset of the Listening question simply because Settings was opened. V5.1 owns this contract.

## 1.2 Global navigation transaction tests

Certified V4 browser path:

```text
Home → Practice → Progress → Settings → close → Listening → Home
```

Additional certified transaction:

```text
Practice → Settings → Practice
```

V5 adds:

```text
Listening → Settings → same Listening session/question
```

The compositor tribunal additionally samples transition states and deterministically protects Practice entry ordering. Premium routes must never expose two competing visual owners. Original remains a historical witness and is not silently converted to the Premium compositor model.

## 1.3 Bottom navigation hardening

PR #93 repaired the major geometry regression. PR #95 and later V4/P0 guards lock:

- [x] desktop centering;
- [x] mobile width and side margins;
- [x] correct z-index with Listening and Settings;
- [x] no clipped item;
- [x] active tab correctness;
- [x] no stale transform inheritance;
- [x] iPhone safe-area CSS support;
- [x] 44 px+ contained navigation targets;
- [x] geometry across Original / Aurora / Sunset / Jade at 390×844, 430×932, 768×1024, 1280×800 and 1440×900.

**Automated phase gate:** PASS.

**Field phase gate:** PASS — issue #97.

**Premium compositor field gate:** PASS — issue #106.

---

# 2. Premium Polish V4 — Stable Premium Foundation

**STATUS: CLOSED / FIELD-CERTIFIED.** PR #112 deployed on `main` `68638129ac34cfe5af275643f73527f0f4007d23`, Pages #168 SUCCESS, final V4 physical-device verdict **PASS** through issue #113.

V4 is now the stable Premium foundation, not the final visual ceiling.

## Source of truth

The three approved visual mockups are the **visual reference**, not merely palette inspiration.

Implementation must reproduce their overall qualities:

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

The goal remains a **professional product UI**, not a generic responsive website with gradients. V5 continues this objective because V4 field review confirmed that several component families remain inconsistent even though the primary surfaces are stable.

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

Implemented through PR #99/#100.

### Branding

- [x] preserve approved French Trân’quille logo as hero brand;
- [x] recalibrate size per viewport;
- [x] subtle theme-dependent halo;
- [x] improve relationship between brand header, logo and Settings entry.

### Welcome Hero

- [x] eyebrow `HÔM NAY`;
- [x] strong greeting hierarchy;
- [x] refined secondary copy;
- [x] controlled depth;
- [x] theme-specific atmospheric treatment.

**Aurora V4 correction (#98):** oversized rounded/glass welcome frame removed. Aurora identity now comes from controlled cyan/magenta atmosphere, restrained accent line and typography. Issue #98 closed completed after final V4 field PASS.

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

V4 reduced dependence on raw OS emoji through surface layers/CSS icon treatment. Emoji remain acceptable inside pedagogical content where they add meaning.

**V5 correction:** utility controls (Settings gear / Back / Close) need one stronger component language. Field review explicitly found Premium controls too thin/hollow compared with Original. V5 therefore treats utility-control weight, fill, radius, depth and icon weight as a system concern.

## 2.6 Complete theme identities

### Aurora Bleu/Rose

Deep navy + cyan/magenta controlled glow. V4 QA fixed bright-gradient CTA contrast via dark navy ink `#071531`.

### Sunset Orange/Violet

Orange/coral/deep violet cinematic surfaces. V4 QA fixed CTA contrast via dark violet ink `#140b28`.

### Nocturne Jade/Or

Dark emerald/champagne-gold editorial treatment. V4 human QA found Jade Listening CTA contrast issue; fixed with dark jade `#041511`.

### Original

Original remains the visual witness/baseline. Premium readiness markers/styles must not silently leak into it.

## 2.7 Progress V4

Implemented through PR #101:

- [x] compact premium header;
- [x] more visual A0→A1 progression;
- [x] stronger next-lesson card;
- [x] cleaner stage/step groups;
- [x] clearly distinct completed/current/locked states;
- [x] Learner Intelligence remains progressive disclosure;
- [x] no long “parchment” screen feeling.

**V5 field debt:** the decorative circular `A0` marker overlaps the `PARCOURS A0 → A1` pill on both desktop and mobile. This is not accepted as a harmless cosmetic quirk. V5.1 must fix geometry responsively and guard it in CI.

## 2.8 Practice V4

Implemented through PR #102 with one recommended primary intention and secondary choices. PR #105/#107/#108 subsequently hardened visual ownership and eliminated Home bleed / Practice-entry flash.

## 2.9 Listening V4

Implemented through PR #103; pedagogical behavior and rates unchanged.

- [x] coherent header;
- [x] refined session counter/progress;
- [x] premium Normal/Slow controls;
- [x] clearer answer cards;
- [x] polished correct/incorrect feedback;
- [x] clearer segmentation/transcript treatment;
- [x] bottom navigation integrated without ownership regressions;
- [x] primary CTA contrast covered by V4 contrast pass/global QA.

**V5 field debt:** no Settings entry exists in deployed V4 Listening. V5.1/V5.2 adds real global Settings parity with exact same-session return.

## 2.10 Settings V4

Implemented through PR #104 using real existing Settings sections only. Diagnostics/recovery remain progressive disclosure; no destructive reset is surfaced merely for visual symmetry.

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

The route-level motion prohibition is permanent. No animation may delay an exercise or prevent a click.

---

# 4. Visual QA Tribunal

Functional green CI is not enough. Previous regressions proved that a page can be technically “present” while visibly broken.

**STATUS: V4 GLOBAL TRIBUNAL MERGED / DEPLOYED / FIELD-CERTIFIED through PR #112.** It remains a permanent regression gate during V5.

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

## Automated V4 matrix

```text
5 viewports × 4 themes × 5 screens = 100 settled-layout cases
same 100 cases under prefers-reduced-motion
40 verified PNG captures = 2 representative viewports × 4 themes × 5 screens
```

## Visual assertions

- [x] no horizontal overflow;
- [x] critical owner/header/CTA clipping guarded;
- [x] Home logo not cropped;
- [x] bottom nav centered and 44 px+ targets guarded;
- [x] no blank content surface in automated paths;
- [x] Settings ownership/visibility guarded;
- [x] Premium text contrast proxy guarded;
- [x] actual primary CTA gradient contrast guarded against worst opaque gradient stop;
- [x] parser covers `rgb/rgba` and modern `color(srgb …)` computed colors;
- [x] route motion remains zero for Premium owners;
- [x] legacy Conversation hub remains themed, not a foreign black slab;
- [x] learner stores remain unchanged;
- [x] iPhone safe-area contracts remain protected;
- [x] each human-review capture proves exact requested theme/screen and `capture-ready=1` before artifact acceptance.

Original’s historical route fade is timing-neutralized **only inside settled-layout QA/capture harnesses** because Chrome virtual-time can freeze that compositor transition. Premium real route behavior is not neutralized and remains independently protected by the atomic transition tribunal.

No fragile full-page pixel-diff baseline is introduced. PNG artifacts are for human review and targeted follow-up.

### V5 QA extension

V5 must add targeted assertions for the field defects V4’s broad matrix did not catch:

- no `A0` marker / `PARCOURS A0 → A1` overlap;
- utility controls visibly filled/depthful, not 1px wire circles;
- Listening Settings exists and roundtrips to the exact same Listening question/session;
- Foundations / pedagogical overlays inherit the active Premium component language;
- Original remains visual witness;
- durable pedagogical stores remain unchanged.

---

# 5. Real-device Field Validation with Trân

Several field gates are grouped here so they are never forgotten.

## 5.1 P0 navigation certification — CLOSED

Issue #97 closed on 2026-08-14 after user reported **1→8 OK** on installed Safari/PWA runtime:

- [x] Home → Settings → back → Home immediately visible.
- [x] Progress → Settings → back → Progress immediately visible.
- [x] Practice → Settings → back → Practice immediately visible.
- [x] Change Aurora / Sunset / Jade while Settings is open → Settings remains visible → back returns to source screen.
- [x] Listening → one tap `Aujourd’hui` → Home immediately visible.
- [x] Listening overlay + bottom navigation ownership looks correct and remains tappable.
- [x] Bottom navigation centered, unclipped and clear of iPhone safe area.
- [x] Close/reopen installed PWA → no stale blank surface or stale navigation state.

## 5.2 Premium compositor field certification — CLOSED

After field video exposed flashes/remanence/superposition/black legacy slabs, PR #107 + #108 were deployed and retested on physical iPhone/PWA. Final verdict: **“plus de flash”**. Issue #106 closed completed.

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
- [ ] `la gare / un billet / une table` understood as reusable patterns, not only memorized phrases;
- [ ] `la pharmacie → les pharmacies` plural concept understood;
- [ ] duration feels reasonable;
- [ ] capsule feels useful;
- [ ] capsule is not intrusive.

**Do not industrialize F05–F18 before this pedagogical return.**

Visual note from V4 field review: the current F01–F04 modal looks like a foreign/legacy island compared with the polished Premium shell. V5 may reconstruct its visual shell, controls and depth **without changing its pedagogical content or persistence semantics**.

## 5.5 Premium V4 final real-device visual gate — CLOSED / PASS

Issue #113 closed completed on 2026-08-14. User verdict:

```text
V4 PASSED
ZERO Flashs enfin
```

Certified observations:

- [x] Home / Progress / Practice / Listening / Settings broadly coherent and usable;
- [x] Aurora / Sunset / Jade switch correctly;
- [x] route flash/remanence/superposition eliminated;
- [x] bright CTA labels readable after contrast pass;
- [x] installed PWA remains operational after cache generation 2.3.15.

This PASS closes V4 reliability/field certification. It **does not waive the visual-debt list captured below in V5**.

---

# 6. Premium Fidelity V5 — System Coherence & Mockup Convergence

**STATUS: ACTIVE · issue #114 · Build 34 maintenance.**

V5 exists because the V4 field verdict is simultaneously positive and demanding: the app is now “plutôt polished” and stable, but visual coherence still breaks across component families. The user explicitly wants the product pushed **3 or 4 visible levels further**, with final output visually equivalent in quality/hierarchy/density to the approved mockups.

## 6.1 Field debt captured from V4 PASS

### Progress A0 badge collision

Observed on **desktop and mobile**:

```text
circular A0 marker
→ overlaps PARCOURS A0 → A1 pill
```

V5.1 must repair the actual responsive geometry and add a computed no-overlap assertion.

### Utility controls too hollow in Premium themes

User feedback: Premium ⚙ / back controls look like a “bête cercle de 1 pixels”, while Original is fuller and visually stronger.

V5 component rule:

- 44 px+ target;
- tactile but restrained filled glass surface;
- coherent radius, border weight and shadow;
- theme-aware ink/glow;
- same family for Settings / Back / Close where semantically appropriate;
- no gratuitous circles merely because a control is icon-only;
- `prefers-reduced-motion` respected.

### Listening Settings parity

Listening is no longer allowed to be the lone primary surface without Settings.

Required behavior:

```text
Listening active question
→ real global Settings
→ atomic ownership
→ Back
→ exact same Listening question/session
```

No fake Settings copy and no unnecessary reset of session state.

### Legacy / pedagogical islands

Foundations F01–F04 currently exposes a hard-coded modal whose shell, close control, answer buttons and CTA do not match the polished Premium app.

V5 must visually bridge:

```text
Foundations
lesson overlays
practice/session hubs
scenario panels
other legacy downstream panels found by audit
```

without changing pedagogy or durable stores.

### App-wide coherence

Audit and normalize where needed:

```text
cards
buttons
utility controls
radii
border weights
depth / glass
icon weight
typography
spacing
content density
CTA hierarchy
close/back affordances
```

The target is not “same color everywhere”; theme personalities remain distinct. The target is a **shared design grammar**.

## 6.2 Mockup convergence requirement

Approved Aurora / Sunset / Jade mockups remain the final source of truth.

V5 closure requires qualitative convergence in:

- hierarchy;
- density;
- depth;
- iconography;
- component finish;
- premium-feel;
- mobile-native composition;
- desktop composition that is not enlarged mobile;
- coherent theme personality.

Passing CI alone is insufficient. The final human/physical-device verdict must plausibly support the statement: **the implemented product reaches the visual quality level of the approved mockups**.

## 6.3 Execution slices

### V5.1 — Coherence primitives + first field defects — ACTIVE

- [ ] fix A0 route-marker collision PC + mobile;
- [ ] introduce fuller Premium utility-control primitive;
- [ ] add real Listening Settings entry + same-session roundtrip;
- [ ] bridge Foundations pilot visually into Premium component language;
- [ ] add V5 targeted normal + reduced-motion tribunal;
- [ ] propagate PWA cache/version safely;
- [ ] keep Original as witness;
- [ ] keep learner stores and protected sanctuaries unchanged.

Candidate line on active branch:

```text
Field Navigation 2.3.7 · Build 34.7
PWA 2.3.16-b34.7-v5coherence1
```

### V5.2 — Global utility controls + Settings parity

- [ ] audit every ⚙ / ‹ / × / chevron/control surface;
- [ ] normalize visual weight without flattening theme identity;
- [ ] verify Listening Settings on Original + all Premium themes;
- [ ] exact return context and no session reset;
- [ ] iPhone safe-area/touch verification.

### V5.3 — Legacy / pedagogical overlay reconstruction

- [ ] Foundations shell;
- [ ] lesson-local modal/capsule families;
- [ ] practice/session downstream hubs;
- [ ] scenario downstream panels;
- [ ] eliminate remaining “foreign app” visual islands;
- [ ] no pedagogical semantic changes.

### V5.4 — Mockup convergence / premium-density pass

- [ ] compare implementation directly against approved mockups;
- [ ] adjust hierarchy, breathing room, density, depth and iconography;
- [ ] push the product the requested additional 3–4 visible polish levels;
- [ ] retain separate Aurora / Sunset / Jade personalities;
- [ ] no giant framed-card regression;
- [ ] no route animation regression.

## 6.4 V5 closure gate

Before leaving Build 34 visual maintenance:

```text
V5 targeted tribunals
+ inherited V4 100 + 100 global QA
+ verified human-review screenshots
+ iPhone/PWA physical-device pass
+ ZERO route flashes
+ no learner-store mutation
+ mockup-level human visual verdict
```

Only after this gate does governance/docs close and Build 35 resume.

---

# 7. Documentation / Governance Closure

**POSITION IN ROADMAP: AFTER V5 FIELD CLOSURE, BEFORE BUILD 35.**

Synchronize canonical project documents with real runtime history:

```text
README.md
ROADMAP.md
CHANGELOG.md
docs/ARCHITECTURE.md
MASTER-ROADMAP.md
```

Closure must record:

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
- final physical-device V4 visual validation #113 / PASS;
- Premium Fidelity V5 issue #114 and its implementation PRs;
- final V5 physical-device/mockup-convergence verdict;
- final certified runtime SHA;
- matching GitHub Pages deployment.

## Versioning rule

Keep **Build 34** as pedagogical milestone.

Treat current visual/reliability work as **V2.3.x maintenance/product-quality line**.

Do **not** consume Build 35 for CSS/visual work: Build 35 already has a defined pedagogical/architecture meaning.

---

# 8. Build 35 — Memory Evidence v2 / Migration Readiness

Resume canonical pedagogical roadmap only after V5 product-quality + governance closure above.

**Design-first. No durable migration yet.**

## 8.1 Evidence model

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

## 8.2 Storage decision

- [ ] objectively decide in-place vs new store;
- [ ] define history/size bounds;
- [ ] guarantee V1/V2 backup compatibility;
- [ ] explicitly document ownership;
- [ ] no schema adoption merely for cleanliness.

## 8.3 Mandatory migration dry run

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

# 9. Build 36 — Memory Evidence v2 Adoption Candidate — CONDITIONAL

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

# 10. Build 37 — Foundations Core Complete

Only after real F01–F04 pedagogical validation.

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

# 11. Build 38 — Generalization & Transfer

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

# 12. Build 39 — Learner Intelligence 3

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

# 13. Build 40 — A1 Consolidation Audit

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

# 14. A2 — Only after Build 40

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
- inherited Global V4 visual QA remains a gate during V5;
- V5 targeted QA must cover field-reported seams that broad V4 matrix missed.

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
→ Global Visual QA Tribunal ✅ · PR #112 · main 68638129… · Pages #168
→ Premium V4 final real-device visual validation ✅ · issue #113 · V4 PASSED / ZERO flashs
→ Premium Fidelity V5 / System Coherence & Mockup Convergence 🚧 · issue #114
   → V5.1 first field defects + coherence primitives
   → V5.2 utility controls + Listening Settings parity
   → V5.3 legacy/pedagogical overlay reconstruction
   → V5.4 mockup convergence / +3–4 polish levels
→ V5 global QA + physical iPhone/PWA verdict
→ V2.3.x / Build 34 governance/documentation closure
→ Build 35 Memory Evidence v2 / Migration Readiness
→ Build 36 if and only if migration proof is complete
→ Build 37 Foundations Core
→ Build 38 Transfer
→ Build 39 Learner Intelligence 3
→ Build 40 A1 Audit
→ A2 only after Build 40 decision
```

This order is deliberate: first recover **professional product quality and runtime reliability**, then drive visual coherence to the approved mockup quality level on the actual iPhone/PWA target, close governance, and only then resume deeper pedagogical architecture without stealing Build 35 for maintenance work.

---

# AI / Future-session handoff rule

Any future AI session working on `shinobione/tran-french-teacher` should:

1. read `MASTER-ROADMAP.md` first;
2. read `ROADMAP.md`, `README.md`, `CHANGELOG.md` and `docs/ARCHITECTURE.md` for implementation/history detail;
3. inspect current `main` and open PRs before assuming this snapshot is still current;
4. preserve Build 35→40 numbering and pedagogical intent;
5. treat approved Aurora / Sunset / Jade mockups as the Premium visual source-of-truth through V5, not just as palette inspiration;
6. never mark field gates closed without real-device confirmation where specified;
7. never let visual maintenance silently change learner data, voice semantics or frozen baselines;
8. preserve the atomic compositor rule: **no route/page crossfade between competing app surfaces**;
9. keep Original as visual witness unless an explicit future product decision changes that contract;
10. interpret **V4 PASSED** as stable/field-certified Premium foundation, **not** as permission to skip V5 mockup-convergence work;
11. keep issue #114 / V5 ahead of Build 35 until its visual and physical-device closure gates are satisfied.