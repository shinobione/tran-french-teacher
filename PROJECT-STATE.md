# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> This file is intentionally a checkpoint, not a second roadmap. **Always verify current git/GitHub reality before acting.**

## Last reconciliation

- Reconciled: **2026-08-15**
- Repository: `shinobione/tran-french-teacher`
- Default branch: `main`
- Latest runtime-bearing checkpoint: **`deecd20c95e0552302e68548125ccb538c5bad32`** — PR **#159**, V5.10 canonical lesson identity + Tyffany action alignment field closeout.
- Previous field checkpoint: **`69833c50f1c83ddb03a1df05471f89b759cd30c3`** — PR **#158**, Listening parity + canonical FTQ/Tyffany identity cleanup.
- Earlier V5.10 headers: PR **#151/#152** established shared Premium Feature Headers and screenshot-driven Listening brand correction.
- Repository layout checkpoint underneath: PR **#149**, `src/` + `tests/` reorganization.
- PR #159 final head passed **44/44** pull-request workflows after the historical Build 26.4 Chrome Progress timeout was rerun **strictly unchanged** and passed; no product patch was made for that flake.
- Runtime checkpoint `deecd20c…` passed **29/29** push workflows with **0 failure / 0 queued / 0 in-progress**.
- **GitHub Pages #212 SUCCESS** on exact runtime SHA `deecd20c95e0552302e68548125ccb538c5bad32`.
- Premium gate issue: **#114 OPEN**.
- **V5.10 remains the active human/physical installed-PWA visual field gate.**
- Build 35 remains **BLOCKED / RESERVED** until explicit user field PASS and #114 closure.

A later docs-only reconciliation commit may advance `main` without changing the runtime-bearing SHA above. Always distinguish current Git HEAD from the latest runtime-bearing checkpoint.

## Current product state

| Area | State |
|---|---|
| Product pedagogy | **V2.3.0 · Build 34** |
| Visual line | **Premium V5.10 · field-polished · physical verdict still required** |
| Curriculum | **52 lessons / 313 items** |
| Scenario | **44 situations / 132 turns** |
| Speaking Loop | **52/52 · max 2 moments / lesson** |
| Listening | **0.88 normal / 0.65 slow** |
| Durable pedagogical stores | **6** |
| Foundations | **F01–F04 pilot** |
| Primary field target | **installed mobile PWA / Safari or Chromium mobile** |
| Premium gate | issue **#114 OPEN** |
| Build 35 | **BLOCKED / RESERVED** |

## V5.10 canonical identity rules

### Practice artwork

```text
Parler            → assets/premium/practice/speak-premium.webp
Écouter           → assets/premium/practice/listen-premium.webp
Réviser           → assets/premium/practice/review-premium.webp
Dans la vraie vie → assets/premium/practice/real-life-premium.webp
```

Permanent rules:

- use the approved files directly;
- do not redraw them as SVG or emoji;
- do not recolor/filter them by theme;
- Aujourd’hui reuses the exact same Listen and Review source files as Pratiquer;
- all four remain available offline.

### Destination Feature Headers

```text
Écouter
→ listen-premium.webp
→ Compréhension orale / Luyện nghe

Réviser
→ review-premium.webp
→ Révision / Ôn tập

Dans la vraie vie / Real-Life
→ real-life-premium.webp
→ Conversation / Tình huống thực tế

Parler → explicit oral-training mode only
→ speak-premium.webp
→ Répondre à l’oral / Trả lời bằng giọng nói
```

**Critical semantic rule:** `Conversation` is the Real-Life destination here. It is **not** the Speak header.

## V5.10 physical-field fixes now locked

### Listening / destination parity — PR #158

- mobile Listening is a real two-column Feature Header;
- Settings is removed from grid ownership while remaining usable;
- redundant `0/0 phiên` no longer squeezes the identity line on mobile;
- Progress brandline uses the canonical FTQ goat asset instead of the protected historical favicon;
- generic Tyffany surfaces use `assets/premium/brand/tyffany-memory.svg` instead of legacy favicon paint.

### Lesson identity + Tyffany action alignment — PR #159

Physical Android screenshots exposed three final ownership defects:

1. the mobile Today lesson card hid the real curriculum icon and painted a hard-coded `▤` pseudo icon;
2. lesson detail was being captured by the global Tyffany avatar decorator and showed a generic brain where the current lesson identity belongs;
3. `Nghe Tyffany / Écouter Tyffany` had no explicit icon+label centering contract.

The Premium layer now fixes these without changing curriculum or voice engines:

- Home uses the exact canonical **`lesson.icon`** from `FrenchTranquilleCurriculum`;
- lesson detail uses that same canonical **`lesson.icon`** plus the current lesson title;
- the historical `.luc` node stays in the DOM for compatibility but is hidden only in that lesson-identity row;
- the global Tyffany decorator deliberately skips the lesson identity row;
- Tyffany remains the tutor/voice identity everywhere it actually owns the surface;
- model/replay actions use an explicit centered flex contract.

Example certified synthetic lesson 8:

```text
Home lesson identity   → 📍
Lesson detail identity → 📍 Hỏi đường & tìm địa điểm
Legacy Tyffany brain   → hidden on this lesson-identity row
```

This contract generalizes from the curriculum data, so restaurant (`🍽️`), pharmacy (`🩺`) and the other lessons reuse their existing canonical icons automatically rather than adding a second icon map.

## Permanent V5.10 field QA

`V5.10 Field Identity Closeout` now verifies in real Chrome:

- Home canonical lesson icon is visible and the generic `▤` pseudo icon is gone;
- lesson detail uses the same curriculum lesson icon;
- the lesson identity row is not owned by the Tyffany-brain decorator;
- `Nghe Tyffany / Écouter Tyffany` is flex-centered;
- Listening Feature Header parity remains intact;
- Real-Life mapping remains intact;
- Progress FTQ brand identity remains canonical;
- pure Premium visual decorators leave all **6 durable learner stores byte-identical**.

The workflow also emits six **430×932** captures:

```text
Home
Listening
Real-Life
Progress
Lesson detail
Speaking / Tyffany model action
```

The latest PR #159 captures were manually reviewed before merge.

## PWA/cache choice

- V5.10 targeted runtime URL version: **`2.3.35-v510lessonidentity1`**.
- Global Service Worker cache identity remains deliberately unchanged.
- `src/premium/premium-v510-lesson-identity.css` is precached offline.
- No global cache nuke was used for this visual correction.

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
- lesson IDs and curriculum semantics;
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
- **Lesson surfaces use curriculum lesson identity; Tyffany owns tutor/voice surfaces, not generic lesson identity.**
- Build 35 remains unavailable for CSS/assets/animation/cache/DEBUG/visual QA work.

## Canonical next action — physical field verdict

**Do not start Build 35. Do not close #114 from automation alone.**

The runtime/automation side is currently green:

```text
PR #159                       44/44 SUCCESS
main runtime deecd20c…        29/29 SUCCESS
V5.10 Field Identity #7       SUCCESS
GitHub Pages #212             SUCCESS on deecd20c…
```

Next action is physical installed-PWA review:

```text
→ reopen PWA without deleting data
→ Home: verify current lesson uses its lesson-specific icon
→ open a lesson: verify same lesson icon + lesson title, no generic Tyffany brain in lesson identity row
→ verify Tyffany still appears correctly on actual tutor / voice actions
→ verify “Nghe Tyffany” icon+label is visually centered
→ spot-check Listening / Real-Life / Progress
→ verify ZERO flash/remanence regression
→ explicit user FIELD PASS
→ close #114 / governance closeout
→ only then Build 35
```
