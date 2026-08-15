# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> This file is intentionally a checkpoint, not a second roadmap. It records the smallest set of facts needed to resume safely after a dead chat/session. **Always verify current git/GitHub reality before acting.**

## Last reconciliation

- Reconciled: **2026-08-15**
- Repository: `shinobione/tran-french-teacher`
- Default branch: `main`
- Verified `main` HEAD at reconciliation: **`6477e980ea21f087a9d30a260dbe4630484e4b36`**.
- That commit is the merge of PR **#141 — V5.9E global technical QA**.
- Premium gate issue: **#114 OPEN**.
- **Premium V5.9 is technically closed by automated QA.**
- **Premium V5.10 is the active human/physical installed-iPhone/PWA field gate.**
- Build 35 remains **BLOCKED / RESERVED** until #114 receives the explicit final user field PASS and is closed.

**Important:** fresh agents must still verify current HEAD, open PRs, CI and Pages before runtime-affecting work.

## Current product state

| Area | State |
|---|---|
| Product pedagogy | **V2.3.0 · Build 34** |
| Visual line | **Premium V5.9 technically closed · V5.10 physical field gate active** |
| Curriculum | **52 lessons / 313 items** |
| Scenario | **44 situations / 132 turns** |
| Speaking Loop | **52/52 · max 2 moments / lesson** |
| Listening | **0.88 normal / 0.65 slow** |
| Durable pedagogical stores | **6** |
| Foundations | **F01–F04 pilot** |
| Primary field target | **iPhone / Safari / installed PWA** |
| Premium gate | issue **#114 OPEN** |
| Build 35 | **BLOCKED / RESERVED** |

## V5.9 real rollback chain

The real V5.9 implementation was deliberately split into independently revertable checkpoints:

```text
V5.9A interactions / ownership
PR #137 → 7176b8e53808a6178ac935ddba6da372b26b37f6

V5.9B shared Lesson/Eiffel layout
PR #138 → 89a5a4892a2ab3f89524f18cd4aa0ee0f6a56e6e

V5.9C shared Premium system + hidden DEBUG
PR #139 → 2a2e845ea4fe144aae3a62a98f301539a8d2d989

V5.9D goat brand icons + PWA wiring
PR #140 → ef0449b704b2eb130a3550d162433b27e248a86f

V5.9E global technical QA
PR #141 → 6477e980ea21f087a9d30a260dbe4630484e4b36
```

A previous false/scaffold V5.9 attempt was rolled back before this real chain. **Do not use PRs #130–#134 as product checkpoints.**

## V5.9 resolved field findings

The user screenshots from 2026-08-15 remain canonical evidence. V5.9 resolved them as shared-system problems rather than four theme-specific patches:

1. **Speaking Loop duplicate CTA / note**
   - Speaking Loop owns self-replay inside an active lesson step;
   - stale duplicate Speaking cards / record CTA / local-device note are collapsed;
   - voice engines remain untouched.

2. **Settings `Giới thiệu` / About hit target**
   - the whole card is the mouse/touch/keyboard hit target;
   - chevron remains an affordance only.

3. **Real Life / `Tình huống thực tế` icon**
   - standardized to a shared Premium line-map-pin treatment.

4. **Lesson identity / Eiffel collision**
   - one cross-theme Today/Lesson hero contract now owns the geometry;
   - identity cluster is left/stable;
   - Eiffel art owns the opposite/right decorative zone;
   - certified by V5.9B/V5.9E at mobile, tablet and desktop viewports.

5. **Shared Premium card/button feel**
   - V5.9C adds shared semantic component roles, touch targets, radii, depth/border language, icon circles, hover/press/focus-visible states and reduced-motion behaviour;
   - no route/page crossfade was introduced.

6. **App/fav/PWA brand**
   - new goat-derived family lives under `assets/premium/brand/`;
   - browser favicon, Apple Touch and PWA any/maskable icons are wired to that family;
   - protected historical `assets/LOGO.png` and `assets/Favicon.png` remain byte-identical.

7. **DEBUG/admin access across themes**
   - V5.8 state decoupling remains intact;
   - V5.9C adds a discreet Settings-title long-press maintainer entry plus desktop `Alt+Shift+D` fallback;
   - theme state and DEBUG state remain independent.

## V5.9 technical proof

The clean V5.9E candidate SHA passed the **complete historical workflow suite** plus the V5.9 global tribunal before merge.

V5.9E specifically proves:

- A+B+C+D tribunals together;
- real app boot with all V5.9 runtime markers;
- all four themes through the real theme API;
- six learner stores unchanged during pure UI/theme travel;
- shared Lesson/Eiffel geometry at 390×844, 430×932, 768×1024, 1280×800 and 1440×900;
- reduced-motion functionality;
- real learner shell boot without boot error;
- deterministic same-browser PWA offline proof using Chrome DevTools Protocol:
  warm app → active Service Worker → controlled navigation → HTTP server killed → complete cached app boot offline in the same browser.

This is an **automated technical PASS**, not the V5.10 human field verdict.

## Locked / must not regress

- Physical navigation contract: **ZERO route flash / ZERO remanence / ZERO competing facades**.
- No route/page crossfade may expose old and new facades simultaneously.
- Global chrome baseline: Back top-left, Settings top-right, coherent 46×46 control family.
- Progress visual grammar: **A0 → progress line → A1**.
- Learner-facing Settings stays human; technical diagnostics belong to DEBUG/admin surfaces.
- DEBUG FR remains logically independent from visual theme.
- V5.9 shared Lesson/Eiffel geometry is a cross-theme system contract; do not resume per-theme hand positioning.
- Visual work must not alter pedagogy, learner stores, lesson IDs, voice/audio semantics or migration contracts.
- Build 35 remains unavailable for CSS/assets/animation/cache/DEBUG/visual QA work.
- Locked Aurora / Sunset / Nocturne backgrounds must not be silently regenerated.

## Canonical next action — V5.10 field gate

**Do not start Build 35. Do not claim Premium closure from automation alone.**

Next action is the real installed-iPhone/PWA review:

```text
V5.9 automated technical closeout ✅
→ V5.10 physical installed-iPhone/PWA field review
→ inspect all four themes and the field findings on the real device
→ fix only reproduced defects, if any
→ explicit user FIELD PASS
→ Build 34 governance/docs closure
→ close issue #114
→ only then Build 35
```

V5.10 must verify at minimum on the physical target:

- Original / Aurora / Sunset / Nocturne;
- Home / Progress / Practice / Listening / Settings;
- lesson hero identity vs Eiffel art;
- Speaking self-record block (one CTA / one note);
- Real Life icon;
- whole-card `Giới thiệu` hit target;
- discreet DEBUG access and theme independence;
- favicon / installed PWA goat identity;
- offline launch after a warm online launch;
- no route flash / remanence / double facade.

## Runtime / asset policy for this checkpoint

This closeout is **docs-only**. V5.9 runtime/assets are already merged.

- no new JS/CSS/HTML/service-worker change belongs in this closeout;
- no learner-data/store change;
- no voice/audio change;
- no Premium background regeneration;
- no new Eiffel artwork;
- any new product change found during V5.10 must be a separate explicit field-fix slice/checkpoint.

## Protected sanctuaries

Do not touch without an explicitly justified build/task:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

## Resume checklist for a fresh session

```text
1. Read AGENTS.md.
2. Read this PROJECT-STATE.md.
3. Verify current main HEAD + recent commits.
4. Check open PRs and issue #114.
5. Verify CI/Pages for the current main/candidate SHA when relevant.
6. Read V5.10 in MASTER-ROADMAP.md; V5.9 is technical history unless a field defect reproduces.
7. Do NOT start Build 35 before explicit V5.10 field PASS and #114 closure.
8. For a reproduced V5.10 defect, create one small checkpointed field-fix slice and re-run the relevant tribunals.
9. Keep the learner stores / voice / navigation sanctuaries intact.
10. Update this checkpoint before declaring Premium fully closed.
```
