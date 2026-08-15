# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> This file is intentionally a checkpoint, not a second roadmap. **Always verify current git/GitHub reality before acting.**

## Last reconciliation

- Reconciled: **2026-08-15**
- Repository: `shinobione/tran-french-teacher`
- Default branch: `main`
- Latest runtime-bearing checkpoint at reconciliation: **`a23dcfa3704802f6f26d8eb5451cabb77847a6cb`** — PR **#151**, V5.10 shared Premium Feature Header System.
- Immediately previous runtime checkpoint: **`4c4e22470fe976ea604ff672963b132abd34fcee`** — single-visible-record-control field fix.
- Repository layout checkpoint underneath: **`88ca5f32a67d2989fcfb81684079848e67bffad5`** — PR **#149**, `src/` + `tests/` reorganization.
- PR #151 final head passed **43/43** pull-request workflows.
- Runtime checkpoint `a23dcfa…` passed **28/28** push workflows with **0 failure / 0 queued / 0 in-progress**.
- **GitHub Pages #204 SUCCESS** on exact runtime SHA `a23dcfa3704802f6f26d8eb5451cabb77847a6cb`.
- Premium gate issue: **#114 OPEN**.
- **V5.10 remains the active human/physical installed-iPhone/PWA visual field gate.**
- Build 35 remains **BLOCKED / RESERVED** until explicit user field PASS and #114 closure.

A later docs/test-only reconciliation commit may advance `main` without changing the runtime-bearing SHA above. Always verify GitHub HEAD before acting.

## Current product state

| Area | State |
|---|---|
| Product pedagogy | **V2.3.0 · Build 34** |
| Visual line | **Premium V5.10 · Feature Header System integrated · physical field verdict still required** |
| Curriculum | **52 lessons / 313 items** |
| Scenario | **44 situations / 132 turns** |
| Speaking Loop | **52/52 · max 2 moments / lesson** |
| Listening | **0.88 normal / 0.65 slow** |
| Durable pedagogical stores | **6** |
| Foundations | **F01–F04 pilot** |
| Primary field target | **iPhone / Safari / installed PWA** |
| Premium gate | issue **#114 OPEN** |
| Build 35 | **BLOCKED / RESERVED** |

## Repository layout — canonical

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

Do not flatten the organized `src/` / `tests/` layout back into repository root.

## V5.10 approved Premium Practice artwork

Runtime assets:

```text
assets/premium/practice/speak-premium.webp
assets/premium/practice/listen-premium.webp
assets/premium/practice/review-premium.webp
assets/premium/practice/real-life-premium.webp
```

Practice mapping:

```text
Parler            → speak-premium.webp
Écouter           → listen-premium.webp
Réviser           → review-premium.webp
Dans la vraie vie → real-life-premium.webp
```

Permanent artwork rules:

- use the approved files directly;
- do not redraw them as SVG or emoji;
- do not recolor/filter the artwork by theme;
- Original / Aurora / Sunset / Jade may change only the surrounding glass host treatment;
- Aujourd’hui reuses the **exact same** Listen and Review source files as Pratiquer;
- all four assets remain in the Service Worker offline core.

## V5.10 shared Premium Feature Header System — PR #151

The approved Practice identity now continues into the destination surfaces through one shared compact header contract:

```text
[ APPROVED ARTWORK ]   FRENCH TRÂN’QUILLE
                       CANONICAL FEATURE TITLE
```

Canonical destination mapping:

```text
Écouter
→ listen-premium.webp
→ Compréhension orale

Réviser
→ review-premium.webp
→ Révision

Dans la vraie vie / Real-Life
→ real-life-premium.webp
→ Conversation

Parler → explicit oral-training mode only
→ speak-premium.webp
→ Répondre à l’oral
```

### Critical semantic rule

**`Conversation` is the Real-Life destination here. It is NOT the Speak header.**

Speak ownership begins only after the user explicitly opens the oral-training mode **`Répondre à l’oral`** from Parler. The V5.10 runtime preserves that distinction across Session UX mode switches so a stale voice-mode flag cannot leak the Speak artwork/title into Real-Life.

Header owners are deliberately adapted through the Premium layer rather than by rewriting protected historical engines:

- Listening existing header: `.listening-top`;
- Review existing header: `.screen-review .topbar`;
- shared Conversation/Practice host: `.screen-conversation .topbar`, with runtime semantic ownership between Real-Life and explicit Speak mode.

No `app.js`, `voice-ios.js`, `free-voice.js`, curriculum, pedagogy, durable-store schema or migration contract was changed for this slice.

## V5.10 permanent QA after PR #151

The V5.10 Chrome tribunal now performs real navigation and asserts exact semantic ownership:

```text
Pratiquer → Réviser
Pratiquer → Écouter
Pratiquer → Parler → Répondre à l’oral
Pratiquer → Dans la vraie vie → Conversation
```

It verifies:

- exact approved artwork source per destination;
- `Conversation` never receives the Speak artwork;
- canonical FR titles under DEBUG FR;
- `FRENCH TRÂN’QUILLE` identity line;
- Original / Aurora / Sunset / Jade;
- **390×844**, **430×932**, **1280×800**;
- no horizontal overflow;
- no header collision with Back / Settings / session score;
- artwork remains centered and unfiltered;
- exact Home ↔ Practice reuse remains locked;
- six durable learner stores remain byte-identical during pure visual travel.

A dedicated capture harness also produces visual field-review screenshots for the four destination headers at mobile and desktop sizes when the V5.10 workflow is exercised.

## PWA/cache choice

- Existing targeted artwork/runtime URL version remains **`2.3.31-v510png1`** in `index.html` / `sw.js`.
- Existing global Service Worker cache identity deliberately remains unchanged.
- No new artwork file was introduced by Feature Headers; they reuse the four already-pre-cached approved Practice assets.
- Therefore PR #151 required **no global cache bump and no asset duplication**.

## Protected sanctuaries

Current Premium field fixes must not silently change:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

Also preserve:

- learner progression;
- six durable stores;
- lesson IDs;
- curriculum semantics;
- Scenario / Listening / Memory semantics;
- voice / replay semantics;
- Recovery / migration contracts.

## Locked / must not regress

- **ZERO route flash / ZERO remanence / ZERO competing facades.**
- No route/page crossfade may expose old and new facades simultaneously.
- Global chrome baseline: Back top-left, Settings top-right, coherent control family.
- Progress visual grammar: **A0 → progress line → A1**.
- DEBUG FR remains logically independent from visual theme.
- Approved Practice artwork must not silently fall back to superseded generated SVG/emoji families.
- Feature Header artwork must remain the exact same approved source file used on Practice.
- `Conversation` remains Real-Life; Speak remains explicit `Répondre à l’oral` only.
- Build 35 remains unavailable for CSS/assets/animation/cache/DEBUG/visual QA work.

## Canonical next action — V5.10 physical field gate

**Do not start Build 35. Do not close #114 from automation alone.**

Next action is the real installed-iPhone/PWA field review of the current V5.10 package:

```text
approved Practice artwork certification ✅
repository structure migration certification ✅
shared Feature Header certification ✅
→ physical installed-iPhone/PWA review
→ verify Practice + Home artwork identity
→ verify destination Feature Headers
→ verify Conversation = Real-Life artwork/title
→ verify Parler → Répondre à l’oral = Speak artwork/title
→ verify all four themes
→ verify warm-online → offline reopen
→ verify ZERO flash/remanence regression
→ explicit user FIELD PASS
→ close #114 / governance closeout
→ only then Build 35
```

For the new Feature Header field review specifically inspect:

- **Compréhension orale**: Listen artwork on the left, French Trân’quille identity, no old headphone glyph/header gap;
- **Révision**: Review artwork on the left, same geometry;
- **Dans la vraie vie → Conversation**: Real-Life artwork, **never Speak**;
- **Parler → Répondre à l’oral**: Speak artwork only after selecting the real oral-training mode;
- compact proportions and alignment on iPhone;
- no Back/Settings/score overlap;
- no new horizontal overflow;
- theme changes affect the host, not artwork colors.

## Resume checklist for a fresh session

```text
1. Read AGENTS.md.
2. Read this PROJECT-STATE.md.
3. Verify current main HEAD + recent commits.
4. Check open PRs and issue #114.
5. Verify CI/Pages for current main/candidate SHA.
6. Read V5.10 in MASTER-ROADMAP.md.
7. Respect src/ and tests/ layout.
8. Do NOT start Build 35 before explicit V5.10 field PASS and #114 closure.
9. For a reproduced V5.10 defect, create one small checkpointed field-fix slice and rerun relevant tribunals.
10. Keep learner stores / voice / navigation sanctuaries intact.
```
