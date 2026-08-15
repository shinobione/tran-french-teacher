# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> This file is intentionally a checkpoint, not a second roadmap. It records the smallest set of facts needed to resume safely after a dead chat/session. **Always verify current git/GitHub reality before acting.**

## Last reconciliation

- Reconciled: **2026-08-15**
- Repository: `shinobione/tran-french-teacher`
- Default branch: `main`
- Verified `main` HEAD at reconciliation: **`bf196a101e9d444650390e94a9ba8adf5f19009c`**.
- That commit is the merge of PR **#128 — V5.8 decouple DEBUG FR from visual themes**.
- Premium gate issue: **#114 OPEN**.
- No V5.9 runtime implementation is considered started or durable at this checkpoint.
- The Codex review panel seen after V5.8 contained V5.8-era changes already merged; do **not** treat that panel as durable V5.9 project state.

**Important:** fresh agents must still verify current HEAD, open PRs, CI and Pages before runtime-affecting work.

## Current product state

| Area | State |
|---|---|
| Product pedagogy | **V2.3.0 · Build 34** |
| Visual line | **Premium V5.8 merged · V5.9 field-coherence specification active** |
| Curriculum | **52 lessons / 313 items** |
| Scenario | **44 situations / 132 turns** |
| Speaking Loop | **52/52 · max 2 moments / lesson** |
| Listening | **0.88 normal / 0.65 slow** |
| Durable pedagogical stores | **6** |
| Foundations | **F01–F04 pilot** |
| Primary field target | **iPhone / Safari / installed PWA** |
| Premium gate | issue **#114 OPEN** |
| Build 35 | **BLOCKED / RESERVED** |

## Locked / must not regress

- Physical navigation contract: **ZERO route flash / ZERO remanence / ZERO competing facades**.
- No route/page crossfade may expose old and new facades simultaneously.
- Global chrome baseline: Back top-left, Settings top-right, coherent 46×46 control family.
- Progress visual grammar: **A0 → progress line → A1**.
- Learner-facing Settings stays human; technical diagnostics belong to DEBUG/admin surfaces.
- DEBUG FR is logically independent from visual theme as of V5.8.
- Visual work must not alter pedagogy, learner stores, lesson IDs, voice/audio semantics or migration contracts.
- Build 35 remains unavailable for CSS/assets/animation/cache/DEBUG/visual QA work.
- Locked Aurora / Sunset / Nocturne backgrounds must not be silently regenerated.

## Premium V5.9 field findings — user screenshots 2026-08-15

These are the canonical next-field issues. Treat them as **shared-system problems**, not four separate theme patches.

### Confirmed interaction / UI defects

1. **Speaking Loop duplicate CTA**
   - the lesson speaking block shows the same self-record button twice;
   - the local-device explanatory note is also duplicated;
   - final contract: **one self-record CTA + one explanatory note**.

2. **Settings `Giới thiệu` / About hit target**
   - the card does not respond across its full surface;
   - the user must currently hit the chevron/arrow;
   - final contract: **the whole navigation card is clickable/tappable; the chevron is only an affordance**.

3. **Real Life / `Tình huống thực tế` icon quality**
   - current icon is visually inconsistent with the Premium icon family;
   - replace with a cleaner, more coherent Premium symbol rather than a one-off clipart-like treatment.

### Shared visual-system issues

4. **Lesson identity cluster overlaps Eiffel artwork on some themes**
   - icon/badge placement must not cover the theme Eiffel decoration;
   - the stronger Sunset composition is the structural reference: lesson identity lives in its own predictable zone, Eiffel remains decorative on the opposite/right side;
   - fix through **one cross-theme lesson-card layout contract**, not per-theme hand positioning.

5. **Buttons/cards are still below approved mockup quality**
   - V5.9 must consolidate the shared design grammar: CTA heights, radii, borders, glass/material hierarchy, icon circles, spacing, depth, restrained glow, press/hover/focus/active states;
   - goal is mockup-family coherence, not isolated CSS cosmetics.

6. **App/fav icon is off-brand**
   - current favicon/PWA identity clashes with the Premium UI;
   - replacement direction: a simplified Premium French Trân’quille / goat-derived mark, readable at favicon/PWA sizes and coherent with Home branding;
   - do not touch the current protected `assets/Favicon.png` in a docs-only pass; any replacement requires an explicit asset/runtime slice and cache/PWA validation.

7. **DEBUG access needs a better admin entry pattern**
   - V5.8 already makes DEBUG FR independent from theme;
   - the remaining UX requirement is access under **all four themes** while keeping it out of Trân’s normal learner UI;
   - prefer a discreet admin affordance/gesture or hidden entry rather than a large visible learner-facing DEBUG control;
   - theme changes must never alter DEBUG state and DEBUG changes must never alter theme.

## Canonical next action

**Do not start Build 35. Do not auto-chain phases.**

The next runtime slice is:

### Premium V5.9 — Shared UI Coherence + Fluidity

Order inside the slice:

1. remove duplicate Speaking Loop CTA/note;
2. make `Giới thiệu` whole-card clickable;
3. replace/standardize the Real Life icon treatment;
4. establish one shared Today/Lesson hero layout contract across Original/Aurora/Sunset/Nocturne;
5. keep Eiffel art decorative and non-overlapping;
6. define/implement the shared Premium card/button grammar closer to approved mockups;
7. provide discreet cross-theme DEBUG/admin access;
8. define the future app/fav icon replacement asset contract if not safely included in the same coherent slice;
9. run relevant local/browser tests and create the **V5.9 candidate PR**;
10. **STOP at candidate PR and return control.**

Do not spend a coding-agent session polling all CI, merging, watching Pages, then automatically starting V5.10.

```text
V5.8 merged
→ V5.9 shared-system coherence + local Premium feel
→ STOP at candidate PR
→ separate CI/review/merge/Pages checkpoint
→ V5.10 global visual QA + physical iPhone verdict
→ Build 34 governance/docs closure
→ close #114 only after explicit final user PASS
→ Build 35
```

## Runtime / asset policy for this checkpoint

This reconciliation is **docs-only**.

- no JS/CSS/HTML/service-worker change;
- no learner-data/store change;
- no voice/audio change;
- no Premium background regeneration;
- no new Eiffel artwork required before the shared lesson-card layout contract is settled;
- future favicon/PWA icon work must be handled as an explicit asset/runtime change, not silently folded into documentation.

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
5. Check CI/Pages for the current candidate SHA if runtime-affecting work is involved.
6. Read V5.9 + V5.10 in MASTER-ROADMAP.md.
7. Implement only the named active slice.
8. Materialize work in git / candidate PR.
9. STOP before CI-marathon / merge / next-slice auto-chaining unless explicitly instructed.
10. Update this checkpoint before declaring the work unit closed.
```
