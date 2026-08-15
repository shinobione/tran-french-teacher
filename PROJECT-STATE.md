# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> This file is intentionally a checkpoint, not a second roadmap. It records the smallest set of facts needed to resume safely after a dead chat/session. **Always verify current git/GitHub reality before acting.**

## Last reconciliation

- Reconciled: **2026-08-15**
- Repository: `shinobione/tran-french-teacher`
- Default branch: `main`
- Git state used as the basis of this checkpoint: **`1b404b58bd87cad4eb7860c004d48292e550732e`**.
- That basis commit is the squash merge of PR **#127 — V5.7 integrate four-theme Premium artwork** after the explicit user PASS.
- Active V5.8 branch: **`codex/v5.8-debug-theme-decoupling`**.
- Active V5.8 PR: **pending creation at this checkpoint commit**.
- V5.7 is merged, deployed by Pages and technically green; its visual PASS remains distinct from the later V5.10 physical-device FIELD PASS.

**Important:** this document does not claim that its own commit is the latest `main` SHA. A checkpoint cannot safely self-embed its final commit SHA. Fresh agents must verify current HEAD first.

## Current product state

| Area | State |
|---|---|
| Product pedagogy | **V2.3.0 · Build 34** |
| Visual line | **Premium V5.7 merged · V5.8 DEBUG/theme decoupling active** |
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

PR #123 preserved the first-generation archive under:

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
- first-generation Original `background.webp` explicitly rejected as too bright / too Aurora-like ✅
- 4 first-generation `lesson-eiffel.webp` files explicitly rejected as opaque rectangular scenes ✅
- corrected dark Original `background-v2.png` candidate generated ✅
- 4 genuine-alpha `lesson-eiffel-v2.png` candidates generated ✅
- comparison boards generated under `assets/premium/v5.6-*-review.png` ✅
- asset manifest/ownership preserved ✅
- corrected dark Original V2 candidate: **USER PASS 2026-08-15** ✅
- four transparent lesson-card Eiffel V2 candidates: **USER PASS 2026-08-15** ✅
- V5.7 runtime integration merged to `main` by PR #127 ✅
- V5.7 screenshot matrix: **USER PASS 2026-08-15** ✅
- physical installed-iPhone/PWA validation remains reserved for the later global V5.10 gate; none of the assets is yet **FIELD PASS**

Do not silently regenerate/replace user-locked Aurora, Sunset, or Nocturne backgrounds.

## CI / deployment evidence at last reconciliation

For current verified `main` basis `1b404b58bd87cad4eb7860c004d48292e550732e`, GitHub returned **27 workflow runs** for that exact SHA.

- GitHub Pages run **`31859562112`**: **SUCCESS** on that exact SHA.
- Current exact-HEAD result: **27 / 27 SUCCESS**.

Field reliability V2 run **`31859562186`** initially observed the known headless audio-rerender timing flake: the recording was complete with a non-empty Blob, but the playback button missed the observer deadline. The failed job was rerun strictly unchanged and completed **SUCCESS** on attempt 2. No voice/audio product code changed.

For PR #127 verified candidate `f17f275d0dbc557b0c8a5234ec867baac9c3a179`, GitHub returned **35 / 35 SUCCESS**:

- V5.7 Theme Art Integration run **`31858785495`**: **SUCCESS**;
- V5.7 Fidelity + Theme Art run **`31858785378`**: **SUCCESS**;
- Build 29 iPhone PWA accessibility/offline run **`31858785461`**: **SUCCESS**;
- Field navigation V3 run **`31858785640`**: **SUCCESS**;
- Build 25.2 Session UX run **`31858785398`**: **SUCCESS** with bounded Chrome retries;
- visual artifact **`premium-v57-theme-art-visual-review`**, ID **`9239868706`**, contains the 20-shot review matrix.

An earlier docs-only candidate head failed Build 29 before browser execution because its workflow asserted a literal cache value where `sw.js` correctly used `${V5F}`. Only the stale assertion was repaired; no product code changed for that failure.

On `f17f275…`, Premium V5 Coherence run **`31858785483`** first observed the already-known underlay-settle timing flake (`original-practice:practice-underlay-not-restored`). The failed job was rerun strictly unchanged and completed **SUCCESS** on attempt 2. No product mutation was made for that flake.

For the previous runtime-bearing `main` checkpoint `2bba5bd06ba14be7286e16a6a9a417fa04ce642a`, issue #114 records:

- Pages **#174 SUCCESS**;
- Field reliability V2 success;
- prior Build 26.5 Chrome-headless progress smoke timeout succeeded unchanged on rerun;
- query at that checkpoint: **0 failures / 0 in-progress / 0 queued**.

Fresh agents must re-check CI after any newer commit instead of inheriting these claims blindly.

## OPEN / BLOCKED / NEXT

### OPEN

- issue **#114 — Premium Fidelity V5 — final post-V5.5 polish gate before Build 35**.
- branch **`codex/v5.8-debug-theme-decoupling`** — independent DEBUG FR/theme state and 4-theme × OFF/ON matrix.

### BLOCKED

- **Build 35 — Memory Evidence v2 / Migration Readiness** remains blocked until the complete Premium closure sequence and explicit user PASS.

### NEXT exact slice

1. Complete **V5.8 — DEBUG FR / Theme Decoupling** on the active branch.
2. Prove four themes × DEBUG OFF/ON, normal-mode cleanliness and six-store byte safety.
3. Open one V5.8 PR, obtain exact-head CI, merge, then verify exact `main` + Pages.
4. Continue automatically with **V5.9 — Fluidity + Premium Feel**.

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
