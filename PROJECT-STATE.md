# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> This file is intentionally a checkpoint, not a second roadmap. It records the smallest set of facts needed to resume safely after a dead chat/session. **Always verify current git/GitHub reality before acting.**

## Last reconciliation

- Reconciled: **2026-08-15**
- Repository: `shinobione/tran-french-teacher`
- Default branch: `main`
- Verified `main` HEAD at reconciliation: **`4019c1b6cb41fee9c36bdb223e255455a0da4b5f`**.
- That commit is the merge of PR **#134 — V5.9E global Premium QA checkpoint**.
- Premium gate issue: **#114 OPEN**.
- **V5.9 is technically closed in git**, split into five independently revertable checkpoints (#130→#134).
- **V5.10 physical iPhone / Safari / installed-PWA verdict is now the active gate.**
- Build 35 remains blocked/reserved until that field gate is explicitly passed and #114 is closed.

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

## Premium V5.9 technical closeout — merged 2026-08-15

The V5.9 field findings were resolved as **shared-system changes**, not four independent theme patch stacks.

### Rollback chain

- **V5.9A / PR #130** — interaction coherence — merge `5d25b6079dd8115149356bdf3dcb3133fee606e0`;
- **V5.9B / PR #131** — shared Lesson/Eiffel layout — merge `45e7d2a62a635b4448ea16250c53e092390e5464`;
- **V5.9C / PR #132** — shared Premium controls + hidden DEBUG entry — merge `3c6ecce404efa62723bfb0b10c85da6bbbfda1ed`;
- **V5.9D / PR #133** — Premium goat favicon/PWA icon family — merge `48aed8e2fca0b6dacec8f9a4a5e257b16bad67ef`;
- **V5.9E / PR #134** — aggregate technical QA checkpoint — merge `4019c1b6cb41fee9c36bdb223e255455a0da4b5f`.

### Technically delivered

- Speaking Loop duplicate self-record CTA / local-only note guarded to one instance per speaking card;
- Settings `Giới thiệu` / About promoted to a whole-card hit target while preserving its underlying action;
- Real Life receives one shared Premium line-icon treatment;
- Lesson/Today card identity cluster and Eiffel decoration now share one cross-theme geometry contract;
- shared Premium card / CTA / icon-circle / focus / press grammar added without route crossfade ownership;
- DEBUG FR remains theme-independent and gains a discreet admin entry (long-press Settings title + desktop fallback), with no permanent learner-facing DEBUG button;
- new goat-derived favicon / Apple Touch / PWA icon family is stored under `assets/premium/brand/`; historical `assets/Favicon.png` remains intact;
- aggregate V5.9 QA checkpoint exists separately from the product slices.

### What this does **not** certify

Automation does **not** certify the final installed-iPhone visual/gesture experience. V5.9 technical closure is therefore **not** the final Premium user PASS and does not close issue #114.

## Canonical next action

**Do not start Build 35. Do not auto-chain beyond the field gate.**

The next phase is:

### Premium V5.10 — Global Visual QA + Physical iPhone Verdict

Required next action is a **real-device validation**, not another speculative CSS pass:

1. deploy/refresh current `main` at the V5.9 technical checkpoint;
2. validate Original / Aurora / Sunset / Nocturne on the installed iPhone/PWA;
3. verify one self-record CTA + one note in Speaking Loop;
4. verify full-card `Giới thiệu` tap target;
5. verify Real Life icon quality;
6. verify Lesson identity never overlaps Eiffel art;
7. verify hidden DEBUG entry under every theme without leaking into learner UI;
8. verify new favicon / home-screen / PWA icon family on-device;
9. recheck ZERO route flash / ZERO competing facades and reduced-motion functionality;
10. only after explicit user PASS: close #114, finish Build 34 governance/docs closure, then unlock Build 35.

```text
V5.8 merged
→ V5.9 technical slices #130→#134 merged
→ V5.10 physical iPhone / PWA verdict  ← ACTIVE NEXT
→ explicit user PASS
→ close #114
→ Build 34 governance/docs closure
→ Build 35
```

## Runtime / asset policy for this checkpoint

This closeout is **docs-only**. The V5.9 runtime already lives on `main` through PRs #130–#134.

- do not reopen V5.9 with speculative visual patches before the physical V5.10 verdict;
- no learner-data/store migration;
- no voice/audio semantic change;
- no Premium background regeneration;
- keep locked Eiffel/background assets stable unless V5.10 produces a concrete field defect;
- Build 35 remains unavailable for CSS/assets/animation/cache/DEBUG/visual QA work.

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
6. Read the V5.9 closeout + V5.10 field gate in MASTER-ROADMAP.md.
7. Implement only the named active slice.
8. Materialize work in git / candidate PR.
9. STOP before CI-marathon / merge / next-slice auto-chaining unless explicitly instructed.
10. Update this checkpoint before declaring the work unit closed.
```
