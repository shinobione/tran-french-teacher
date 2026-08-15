# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> This file is intentionally a checkpoint, not a second roadmap. **Always verify current git/GitHub reality before acting.**

## Last reconciliation

- Reconciled: **2026-08-15**
- Repository: `shinobione/tran-french-teacher`
- Default branch: `main`
- Current structural/runtime main checkpoint: **`88ca5f32a67d2989fcfb81684079848e67bffad5`** — PR **#149**, repository layout reorganization, squash-merged.
- Previous feature-bearing runtime checkpoint: **`e3d434b48913bd6adf421b5445266c49944160b3`** — PR **#148**, approved Premium Practice artwork.
- Rollback immediately before repository reorganization: **`2267f8f868b517e6f37a17f5e73394249eb40500`**.
- PR #149 final head passed **43/43** pull-request workflows. Build26.5 hit its known bounded Chrome timeout once and passed unchanged on rerun; no product patch was made for that flake.
- Merged structural checkpoint passed **28/28** push workflows.
- **GitHub Pages #201 SUCCESS** on exact SHA `88ca5f32a67d2989fcfb81684079848e67bffad5`.
- Premium gate issue: **#114 OPEN**.
- **V5.10 remains the active human/physical installed-iPhone/PWA visual field gate.**
- Build 35 remains **BLOCKED / RESERVED** until the explicit user field PASS and #114 closure.

## Repository layout — canonical after PR #149

The root-file sprawl was reorganized without intended product/pedagogy/store/voice behavior changes.

```text
src/
  core/       platform/runtime, Recovery, loaders, debug/theme, contracts
  pedagogy/   curriculum, Memory, Listening, Scenario, Real Life, Speaking, learner intelligence
  ui/         app shell, responsive/interaction and historical UX compatibility layers
  premium/    Premium V4/V5/V5.9/V5.10 runtime layers

tests/
  browser/    browser tribunals, visual captures, fixtures and field harnesses
  smoke/      JavaScript smoke/guard harnesses
```

Root intentionally keeps canonical docs, PWA entrypoints and protected sanctuaries, including:

```text
AGENTS.md
PROJECT-STATE.md
MASTER-ROADMAP.md
index.html
sw.js
manifest.webmanifest
styles.css
app.js
voice-ios.js
free-voice.js
```

PR #149 moved **169 former root files** and rewired `index.html`, Service Worker paths, CSS-relative URLs, loaders, tools, browser harnesses and historical GitHub Actions contracts. Temporary migration helpers/scratch workflow staging were removed before merge and are not part of `main`.

Important path rule for future work:

- repository/root URLs should use `./src/...` or `./tests/...` as appropriate;
- ES-module imports between files already inside the same folder remain module-relative, e.g. `./runtime-contracts.js` inside `src/core/`;
- CSS imports inside `src/premium/` remain stylesheet-relative, e.g. `./premium-v5-utility.css`, not `./src/premium/...`;
- browser harness URLs must be resolved relative to `tests/browser/`, while assertions comparing literal app-owned `src` attributes must preserve the app document's own path semantics.

## Current product state

| Area | State |
|---|---|
| Product pedagogy | **V2.3.0 · Build 34** |
| Visual line | **Premium V5.10 · approved Practice artwork integrated · physical field verdict still required** |
| Curriculum | **52 lessons / 313 items** |
| Scenario | **44 situations / 132 turns** |
| Speaking Loop | **52/52 · max 2 moments / lesson** |
| Listening | **0.88 normal / 0.65 slow** |
| Durable pedagogical stores | **6** |
| Foundations | **F01–F04 pilot** |
| Primary field target | **iPhone / Safari / installed PWA** |
| Premium gate | issue **#114 OPEN** |
| Build 35 | **BLOCKED / RESERVED** |

## V5.10 approved Practice artwork slice

The previous V5.10 generated/inline SVG Practice-icon iterations are **superseded** by the user-approved Premium raster artwork family.

Runtime assets:

```text
assets/premium/practice/speak-premium.webp
assets/premium/practice/listen-premium.webp
assets/premium/practice/review-premium.webp
assets/premium/practice/real-life-premium.webp
```

Semantic mapping:

```text
Parler            → speak-premium.webp
Écouter           → listen-premium.webp
Réviser           → review-premium.webp
Dans la vraie vie → real-life-premium.webp
```

Contracts now locked by the V5.10 tribunal:

- the approved artwork itself is not redrawn as SVG and is not recolored by CSS;
- theme adaptation belongs only to the surrounding glass host;
- Home / Aujourd’hui reuses the **exact same** `listen-premium.webp` and `review-premium.webp` files as Pratiquer;
- the four artworks decode in real Chrome;
- Original / Aurora / Sunset / Jade are exercised;
- iPhone-size **390×844** and desktop **1280×800** are exercised;
- no horizontal overflow and no surviving legacy SVG/emoji inside the owned icon hosts;
- artwork is centered and remains unfiltered;
- the six durable learner stores remain byte-identical during pure icon/theme travel;
- all four artwork files are included in the Service Worker offline core.

PWA/cache choice:

- targeted icon/runtime version: **`2.3.31-v510png1`**;
- global Service Worker cache identity deliberately remains **`tran-french-teacher-v2.3.22-b34.14-v58debug1`**;
- this avoids an unrelated global cache bump while still invalidating the V5.10 icon JS/CSS URLs and caching the four new artwork files.

## Protected sanctuaries

The V5.10 Practice-art slice and repository reorganization did **not** change the protected sanctuary contents:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

They also did not intentionally change curriculum semantics, learner progression, Scenario, Listening semantics, voice/replay behavior, migration contracts or durable-store schemas.

## Locked / must not regress

- Physical navigation contract: **ZERO route flash / ZERO remanence / ZERO competing facades**.
- No route/page crossfade may expose old and new facades simultaneously.
- Global chrome baseline: Back top-left, Settings top-right, coherent control family.
- Progress visual grammar: **A0 → progress line → A1**.
- DEBUG FR remains logically independent from visual theme.
- Visual work must not alter pedagogy, learner stores, lesson IDs, voice/audio semantics or migration contracts.
- Build 35 remains unavailable for CSS/assets/animation/cache/DEBUG/visual QA work.
- Locked Aurora / Sunset / Nocturne backgrounds must not be silently regenerated.
- Approved Practice artwork must not silently fall back to the superseded generated SVG family.
- Do not flatten the organized `src/` / `tests/` layout back into repository root.

## Canonical next action — V5.10 physical field gate

**Do not start Build 35. Do not close #114 from automation alone.**

Next action is the real installed-iPhone/PWA review of the newly integrated artwork plus the existing V5.10 field matrix:

```text
V5.10 automated Practice-art certification ✅
repository structure migration certification ✅
→ physical installed-iPhone/PWA review
→ verify the four approved Practice artworks by eye
→ verify exact Home reuse for Écouter / Réviser
→ verify all four themes without recoloring the artwork
→ verify warm-online → offline reopen
→ verify ZERO flash/remanence regression
→ explicit user FIELD PASS
→ close #114 / governance closeout
→ only then Build 35
```

For the Practice-art field review specifically, inspect:

- **Pratiquer**: Parler / Écouter / Réviser / Dans la vraie vie all use the approved 3D artwork;
- **Aujourd’hui**: Écouter and Réviser visibly match the exact Practice artwork family;
- artwork is crisp, optically centered and not buried in an excessive CSS halo;
- Original / Aurora / Sunset / Nocturne change the host treatment only, not the artwork colors;
- iPhone has no horizontal overflow;
- after one warm online launch, the same artwork remains available offline.

## Resume checklist for a fresh session

```text
1. Read AGENTS.md.
2. Read this PROJECT-STATE.md.
3. Verify current main HEAD + recent commits.
4. Check open PRs and issue #114.
5. Verify CI/Pages for the current main/candidate SHA when relevant.
6. Read V5.10 in MASTER-ROADMAP.md.
7. Respect the organized src/ and tests/ layout; do not assume historical files still live at root.
8. Do NOT start Build 35 before explicit V5.10 field PASS and #114 closure.
9. For a reproduced V5.10 defect, create one small checkpointed field-fix slice and rerun the relevant tribunals.
10. Keep learner stores / voice / navigation sanctuaries intact and update this checkpoint before declaring Premium fully closed.
```
