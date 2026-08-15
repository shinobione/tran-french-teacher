# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> This file is intentionally a checkpoint, not a second roadmap. It records the smallest set of facts needed to resume safely after a dead chat/session. **Always verify current git/GitHub reality before acting.**

## Last reconciliation

- Reconciled: **2026-08-15**
- Repository: `shinobione/tran-french-teacher`
- Default branch: `main`
- Git state used as the basis of this checkpoint: **`4f78729cf36402da275e6dcfdab85e32fc08bdcc`**
- That basis commit is the merge of PR **#123**, which persisted the post-V5.5 canonical roadmap and Premium visual asset archive.
- Product/runtime-bearing checkpoint immediately before those docs/assets: **`2bba5bd06ba14be7286e16a6a9a417fa04ce642a`**.
- PR #123 explicitly introduced **no runtime wiring**.
- Open implementation PRs at that reconciliation point: **none**.

**Important:** this document does not claim that its own commit is the latest `main` SHA. A checkpoint cannot safely self-embed its final commit SHA. Fresh agents must verify current HEAD first.

## Current product state

| Area | State |
|---|---|
| Product pedagogy | **V2.3.0 · Build 34** |
| Visual line | **Premium V5.5 structural base** |
| Curriculum | **52 lessons / 313 items** |
| Scenario | **44 situations / 132 turns** |
| Speaking Loop | **52/52 · max 2 moments / lesson** |
| Listening | **0.88 normal / 0.65 slow** |
| Durable pedagogical stores | **6** |
| Foundations | **F01–F04 pilot** |
| Primary field target | **iPhone / Safari / installed PWA** |
| Premium gate | issue **#114 OPEN** |
| Build 35 | **BLOCKED / RESERVED** |

## What is already locked / must not regress

- V5.5 is technically stable and materially better, but **not visually closed**.
- Physical navigation contract: **ZERO route flash / ZERO remanence / ZERO competing facades**.
- No route/page crossfade may expose old and new facades simultaneously.
- Global chrome baseline: Back top-left, Settings top-right, coherent 46×46 control family.
- Progress visual grammar: **A0 → progress line → A1**.
- Learner-facing Settings stays human; technical diagnostics belong to DEBUG FR.
- Visual work must not alter pedagogy, learner stores, voice/audio semantics, lesson IDs, or migration contracts.
- Build 35 remains unavailable for CSS/assets/animation/cache/DEBUG/visual QA work.

## Current Premium asset state

PR #123 preserved the canonical local candidates under:

```text
assets/premium/themes/aurora/background.webp
assets/premium/themes/sunset/background.webp
assets/premium/themes/nocturne/background.webp
assets/premium/themes/original/background.webp
assets/premium/themes/aurora/lesson-eiffel.webp
assets/premium/themes/sunset/lesson-eiffel.webp
assets/premium/themes/nocturne/lesson-eiffel.webp
assets/premium/themes/original/lesson-eiffel.webp
```

V5.6 status from `MASTER-ROADMAP.md`:

- 3 user-approved Premium backgrounds preserved ✅
- Original background candidate preserved ✅
- 4 lesson-card Eiffel candidates preserved ✅
- asset manifest/ownership preserved ✅
- **human approval of Original background candidate pending**
- **human approval of the 4 lesson-card Eiffel candidates pending**
- runtime integration deliberately deferred to **V5.7**

Do not silently regenerate/replace user-locked Aurora, Sunset, or Nocturne backgrounds.

## CI / deployment evidence at last reconciliation

For docs/assets merge basis `4f78729cf36402da275e6dcfdab85e32fc08bdcc`, GitHub returned **27 workflow runs** for that exact SHA. The fetched snapshot showed no failure, in-progress, or queued marker.

For the previous runtime-bearing `main` checkpoint `2bba5bd06ba14be7286e16a6a9a417fa04ce642a`, issue #114 records:

- Pages **#174 SUCCESS**;
- Field reliability V2 success;
- prior Build 26.5 Chrome-headless progress smoke timeout succeeded unchanged on rerun;
- query at that checkpoint: **0 failures / 0 in-progress / 0 queued**.

Fresh agents must re-check CI after any newer commit instead of inheriting these claims blindly.

## OPEN / BLOCKED / NEXT

### OPEN

- issue **#114 — Premium Fidelity V5 — final post-V5.5 polish gate before Build 35**.

### BLOCKED

- **Build 35 — Memory Evidence v2 / Migration Readiness** remains blocked until the complete Premium closure sequence and explicit user PASS.

### NEXT exact slice

1. **Human-review the archived V5.6 candidates** still awaiting approval: Original background + four `lesson-eiffel.webp` assets.
2. After approval, execute **V5.7 — Original Theme Parity + Theme Art Integration**:
   - wire all four local background assets;
   - wire all four lesson Eiffel assets;
   - remove the visible legacy/CSS “Paint Eiffel” treatment;
   - preserve offline/PWA asset availability;
   - preserve zero-flash navigation and learner-state safety;
   - generate the required multi-viewport/theme visual matrix.
3. Then follow the canonical sequence only:

```text
V5.7 Theme Art Integration
→ V5.8 DEBUG FR / Theme Decoupling
→ V5.9 Fluidity + Premium Feel
→ V5.10 Global Visual QA + physical iPhone verdict
→ Build 34 governance/docs closure
→ close #114 only after explicit user PASS
→ Build 35
```

## Resume checklist for a fresh session

```text
1. Read AGENTS.md.
2. Read this PROJECT-STATE.md.
3. Verify current main HEAD + recent commits.
4. Check open PRs and issue #114.
5. Check CI/Pages for the current candidate SHA if runtime-affecting work is involved.
6. Read the relevant V5.x section of MASTER-ROADMAP.md.
7. Continue from NEXT; do not reconstruct the project from old chat history.
8. Before closing the work unit, update this checkpoint if volatile state changed.
```

## Protected sanctuaries

Do not touch without an explicitly justified build/task:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

For exact historical hashes, migration rules, build gates, theme directions, and long-term pedagogy sequence, use **`MASTER-ROADMAP.md`**.
