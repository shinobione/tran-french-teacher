# French Trân’quille — MASTER ROADMAP

> **Canonical project handoff / source of truth.**
>
> Any future AI/chat/session working on `shinobione/tran-french-teacher` **must read `AGENTS.md`, then `PROJECT-STATE.md`, then this file before making roadmap or implementation decisions**.
>
> Historical build documents remain useful evidence. This file owns durable execution order, locked product decisions, human field verdicts and future build gates.

---

# 0. Canonical checkpoint — 2026-08-15

## Current line

| Item | Canonical state |
|---|---|
| Product pedagogy | **V2.3.0 · Build 34** |
| Visual maintenance line | **Premium V5.9 technically closed · V5.10 physical field gate next** |
| Verified `main` checkpoint at reconciliation | **`4019c1b6cb41fee9c36bdb223e255455a0da4b5f`** |
| Curriculum | **52 lessons / 313 items** |
| Scenario | **44 situations / 132 turns** |
| Speaking Loop | **52/52 · max 2 moments / lesson** |
| Listening | **0.88 normal / 0.65 slow** |
| Durable pedagogical stores | **6** |
| Foundations | **F01–F04 pilot**, without renumbering the 52 lessons |
| Frozen architecture baseline | **2.0.0 · Build 30** |
| Primary target | **iPhone / Safari / installed PWA** |
| Recurring backend/API cost | **0 €** |
| Final Premium issue | **#114 — OPEN** |
| Build 35 | **BLOCKED / RESERVED** |

## Current interpretation

- V5.6 asset candidates were produced and user-approved.
- V5.7 four-theme Premium artwork integration was user-approved, merged and delivered.
- V5.8 DEBUG FR / theme decoupling was merged as PR #128.
- V5.9 shared UI coherence was delivered as independently revertable PRs **#130–#134**.
- V5.9 technical work is closed at `4019c1b6cb41fee9c36bdb223e255455a0da4b5f`.
- The next active gate is **V5.10 — physical installed-iPhone/PWA Premium verdict**.
- Build 35 remains blocked until #114 is explicitly closed after final user PASS.

---

# 1. Locked behaviour — do not regress while polishing

## 1.1 Atomic navigation / zero flash

Physical field contract:

**ZERO route flash / ZERO remanence / ZERO competing facades.**

Permanent rule:

> **No route/page crossfade may ever show two competing app facades at the same time.**

Allowed motion model:

```text
atomic ownership switch
→ old owner gone
→ new owner is the only facade
→ short local polish may animate the settled new owner
```

No animation may be required for route correctness.

## 1.2 Global chrome

Preserve:

- Back top-left;
- Settings top-right;
- coherent ~46×46 control family;
- correct semantic Back behaviour across Review / Speak / Listen / Real Life / Settings;
- no tap-again requirement;
- no body-empty period.

## 1.3 Progress grammar

Visible progression remains:

```text
A0 → progress line → A1
```

Do not return to older confusing stacked A0/A1 layouts.

## 1.4 Settings hierarchy

Learner-facing Settings stays human and compact.

Priority:

1. Theme / appearance;
2. About / privacy / rights;
3. Data & Recovery via progressive disclosure.

Technical diagnostics belong to DEBUG/admin surfaces, not Trân’s normal learner UI.

## 1.5 Learner / pedagogy safety

Visual work must not silently alter:

- learner stores;
- lesson IDs;
- pedagogy;
- Scenario/Listening/Memory semantics;
- voice/audio semantics;
- migration contracts.

---

# 2. Canonical Premium sequence

```text
V5.5 stable structural base ✅
→ V5.6 Premium Visual Identity Assets ✅
→ V5.7 Original Theme Parity + Theme Art Integration ✅
→ V5.8 DEBUG FR / Theme Decoupling ✅
→ V5.9 Shared UI Coherence + Fluidity / Premium Feel ✅
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

**Do not steal Build 35 for CSS, imagery, animation, cache work, DEBUG FR, icon work or visual QA.**

---

# 3. V5.6 — Premium Visual Identity Assets — CLOSED

## Canonical full-background assets

```text
assets/premium/themes/aurora/background.webp
assets/premium/themes/sunset/background.webp
assets/premium/themes/nocturne/background.webp
assets/premium/themes/original/background-v2.png
```

User-locked directions:

- **Aurora** — blue / cyan / violet / pink Paris night;
- **Sunset** — orange / coral / violet Paris sunset;
- **Nocturne** — dark jade / teal / gold Paris night.

Do not silently regenerate those three backgrounds.

Original direction:

- deep midnight navy / indigo;
- cold cyan / cobalt light;
- silver/blue-white highlights;
- violet/magenta only as restrained accents;
- elegant dark Paris night;
- premium depth from light/material/contrast, not brightness;
- no Aurora-like pink wash.

The first Original candidate was rejected as too bright / too Aurora-like. The corrected dark V2 candidate was user-approved.

## Lesson-card Eiffel assets

First-generation opaque rectangular `lesson-eiffel.webp` files are rejection evidence only.

Approved V2 assets:

```text
assets/premium/themes/aurora/lesson-eiffel-v2.png
assets/premium/themes/sunset/lesson-eiffel-v2.png
assets/premium/themes/nocturne/lesson-eiffel-v2.png
assets/premium/themes/original/lesson-eiffel-v2.png
```

Contract:

- genuine alpha transparency;
- no opaque rectangular sky;
- no baked card/UI/text;
- generous transparent margins;
- Eiffel as primary silhouette;
- theme-specific lighting;
- suitable for absolute decorative placement, cropping and masking.

V5.6 user PASS: **2026-08-15**.

---

# 4. V5.7 — Four-theme Premium Art Integration — CLOSED

New permanent rule:

> **Original must reach the same Premium quality level as Aurora, Sunset and Nocturne.**

All four themes are first-class identities.

## Shared integration contract

For each theme:

- use its canonical background asset;
- preserve readable card/text contrast;
- no aggressive blur that destroys artwork;
- no giant dead zones;
- desktop must be composed, not simply stretched mobile;
- correct lesson Eiffel asset must appear where the lesson hero expects it;
- art remains decorative and must never obscure lesson title, progress, badge or CTA;
- service-worker/offline asset generation stays coherent.

V5.7 user visual PASS: **2026-08-15**.

Physical installed-iPhone FIELD PASS is still reserved for V5.10.

---

# 5. V5.8 — DEBUG FR / Theme Decoupling — CLOSED

## Canonical model

```text
theme = visual preference
debugFr = admin/debug preference

theme must never own debugFr
debugFr must never force theme
```

Permanent behaviour:

- DEBUG FR can coexist with Original, Aurora, Sunset or Nocturne;
- switching theme preserves DEBUG state;
- switching DEBUG preserves theme;
- normal learner mode hides diagnostics;
- toggling DEBUG must not modify learner progress, Memory, Scenario, Listening, Error or other durable learner stores.

PR #128 merged at verified checkpoint:

**`bf196a101e9d444650390e94a9ba8adf5f19009c`**.

V5.8 solved the **state ownership** problem. V5.9 still owns the quality of the **admin entry/access affordance**.

---

# 6. V5.9 — Shared UI Coherence + Fluidity / Premium Feel — TECHNICALLY CLOSED

## Goal reached

V5.9 converted the user-reported Premium defects into shared, cross-theme contracts instead of adding four stacks of per-theme patches.

## Rollback checkpoints

- **V5.9A / PR #130** — interaction coherence — merge `5d25b6079dd8115149356bdf3dcb3133fee606e0`;
- **V5.9B / PR #131** — shared Lesson/Eiffel layout — merge `45e7d2a62a635b4448ea16250c53e092390e5464`;
- **V5.9C / PR #132** — shared Premium controls + hidden DEBUG entry — merge `3c6ecce404efa62723bfb0b10c85da6bbbfda1ed`;
- **V5.9D / PR #133** — Premium goat favicon/PWA icon family — merge `48aed8e2fca0b6dacec8f9a4a5e257b16bad67ef`;
- **V5.9E / PR #134** — aggregate technical QA checkpoint — merge `4019c1b6cb41fee9c36bdb223e255455a0da4b5f`.

Each merge is intentionally isolated enough to revert without throwing away the full V5.9 line.

## Delivered contract

- one Speaking Loop self-record CTA + one local-only note per speaking card;
- whole-card `Giới thiệu` / About hit target;
- shared Premium Real Life icon treatment;
- one cross-theme Lesson/Today identity/Eiffel layout contract;
- shared Premium card/button/icon interaction language;
- local-only motion/press/focus polish with **no route crossfade ownership**;
- discreet DEBUG/admin access under all four themes while V5.8 state decoupling stays intact;
- goat-derived favicon/Apple Touch/PWA family under `assets/premium/brand/`, without overwriting historical protected `assets/Favicon.png`;
- aggregate technical QA checkpoint separated from product runtime slices.

## Technical closure vs final product closure

V5.9 is **technically closed**, but the Premium programme is **not yet user-closed**.

The following remain V5.10-only physical checks:

- installed iPhone / Safari / PWA composition;
- real tap ergonomics and hidden DEBUG long-press;
- home-screen/PWA icon appearance;
- route flash/remanence under physical use;
- user visual verdict across Original/Aurora/Sunset/Nocturne.

Therefore issue **#114 remains OPEN** and Build 35 remains **BLOCKED / RESERVED**.

# 7. V5.10 — Final Premium QA / Physical gate

This is the **actual closure gate for #114**.

Automation alone cannot close this phase.

## Automated matrix

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
- lesson view with theme-specific Eiffel art;
- About;
- Data & Recovery compact/expanded;
- DEBUG/admin entry on all 4 themes;
- reduced-motion;
- app/fav/PWA icon if replaced in V5.9.

Assertions:

- exact requested theme active;
- correct background asset loaded;
- correct lesson asset loaded;
- no horizontal overflow;
- Back/Settings geometry consistent;
- A0 → line → A1 intact;
- no legacy Eiffel placeholder;
- no technical cards in learner mode;
- Original is not visually downgraded;
- no learner-store mutations during pure UI travel;
- online/offline PWA generations resolve the same asset set;
- whole-card hit targets behave consistently;
- no duplicate Speaking CTA;
- no lesson identity / Eiffel overlap.

## Human / physical gate

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
→ DEBUG/admin access verification
→ return Home
```

Human checks:

- ZERO flash/remanence;
- artwork actually looks Premium;
- Original belongs to the same quality family;
- Eiffel art reads as integrated decoration, not a pasted image;
- buttons/cards/chrome feel coherent with mockups;
- screens feel fluid rather than abrupt;
- no unreadable text over imagery;
- no awkward real-iPhone crop;
- no duplicated speaking control;
- admin access is available but not intrusive.

## Closure rule

**Do not close issue #114 until the user gives an explicit final Premium PASS.**

Only after that:

1. record exact runtime SHA + Pages evidence;
2. record physical verdict;
3. synchronize README / ROADMAP / CHANGELOG / ARCHITECTURE / MASTER / PROJECT-STATE;
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

Evidence dimensions:

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

# 10. Parallel maintenance tracks — no build-number theft

These continue when needed:

- iPhone/Safari/PWA compatibility;
- accessibility;
- safe-area and target sizing;
- offline/service-worker correctness;
- performance;
- Recovery/backup reliability;
- CI flake hardening that does not weaken assertions;
- documentation/governance.

These tracks must not become excuses to rewrite pedagogical architecture or consume reserved build numbers.

---

# 11. Premium asset inventory / status semantics

Canonical Premium asset manifest:

```text
assets/premium/README.md
```

Status semantics:

- **LOCKED** = explicitly selected by the user; do not regenerate silently.
- **CANDIDATE** = generated and preserved; can be replaced only after human comparison.
- **APPROVED** = explicitly accepted for integration; not yet necessarily wired/field-tested.
- **WIRED** = runtime actually uses the asset.
- **FIELD PASS** = physically validated on the installed iPhone/PWA.

Future sessions must inspect the asset manifest before generating replacements.

---

# 12. Next-agent checklist

Before touching runtime:

1. read `AGENTS.md`;
2. read `PROJECT-STATE.md`;
3. read V5.9 and V5.10 here;
4. inspect current `main`, open PRs and issue #114;
5. verify the currently deployed Pages SHA when runtime work is involved;
6. do not assume an old chat checkpoint is current;
7. do not start Build35 while #114 is open;
8. do not regenerate locked backgrounds;
9. preserve zero-flash atomic ownership;
10. keep DEBUG independent from theme;
11. solve shared layout/component problems before per-theme tweaks;
12. materialize work in git before treating it as project state;
13. stop the coding-agent session at the V5.9 candidate PR unless the user explicitly asks for further actions;
14. perform CI/merge/Pages/next-slice control as a separate step;
15. never declare physical visual completion from automation alone.

---

# Canonical one-line order

> **V5.8 merged → solve V5.9 as one shared-system coherence slice → stop at candidate PR → separately certify/merge → V5.10 global QA + physical iPhone Premium PASS → governance closure → Build35.**
