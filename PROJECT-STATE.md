# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> This file is intentionally a checkpoint, not a second roadmap. **Always verify current git/GitHub reality before acting.**

## Last reconciliation

- Reconciled: **2026-08-16**
- Repository: `shinobione/tran-french-teacher`
- Default branch: `main`
- Latest runtime-bearing checkpoint: **`54209392d3a349a1aefab14615dcecf24a59fcea`** — PR **#161**, V5.10 Settings Theme-picker physical-field interaction repair.
- Previous runtime-bearing checkpoint: **`deecd20c95e0552302e68548125ccb538c5bad32`** — PR **#159**, canonical lesson identity + Tyffany action alignment field closeout.
- Earlier field checkpoint: **`69833c50f1c83ddb03a1df05471f89b759cd30c3`** — PR **#158**, Listening parity + canonical FTQ/Tyffany identity cleanup.
- PR #161 final head passed **44/44** pull-request workflows with no rerun required.
- Runtime checkpoint `54209392…` passed **29/29** push workflows with **0 failure / 0 queued / 0 in-progress**.
- **GitHub Pages #214 SUCCESS** on exact runtime SHA `54209392d3a349a1aefab14615dcecf24a59fcea`.
- **Physical V5.10 FIELD PASS received 2026-08-16**: user verdict — `ça a l'air OK, TEST SMOKED`.
- Premium gate issue **#114 CLOSED / completed** after explicit user PASS.
- **Premium V5.10 is CLOSED / physically accepted.**
- **Build 35 is UNBLOCKED** for its canonical scope only: **Memory Evidence v2 / Migration Readiness**.

A later docs-only reconciliation commit may advance `main` without changing the runtime-bearing SHA above. Always distinguish current Git HEAD from the latest runtime-bearing checkpoint.

## Current product state

| Area | State |
|---|---|
| Product pedagogy | **V2.3.0 · Build 34** |
| Visual line | **Premium V5.10 · CLOSED · physical FIELD PASS** |
| Curriculum | **52 lessons / 313 items** |
| Scenario | **44 situations / 132 turns** |
| Speaking Loop | **52/52 · max 2 moments / lesson** |
| Listening | **0.88 normal / 0.65 slow** |
| Durable pedagogical stores | **6** |
| Foundations | **F01–F04 pilot** |
| Primary field target | **installed mobile PWA / Safari or Chromium mobile** |
| Premium gate | issue **#114 CLOSED** |
| Build 35 | **UNBLOCKED · NEXT CANONICAL BUILD** |

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

Physical Android screenshots exposed three ownership defects:

1. the mobile Today lesson card hid the real curriculum icon and painted a hard-coded `▤` pseudo icon;
2. lesson detail was being captured by the global Tyffany avatar decorator and showed a generic brain where the current lesson identity belongs;
3. `Nghe Tyffany / Écouter Tyffany` had no explicit icon+label centering contract.

The Premium layer fixes these without changing curriculum or voice engines:

- Home uses the exact canonical **`lesson.icon`** from `FrenchTranquilleCurriculum`;
- lesson detail uses that same canonical **`lesson.icon`** plus the current lesson title;
- the historical `.luc` node stays in the DOM for compatibility but is hidden only in that lesson-identity row;
- the global Tyffany decorator deliberately skips the lesson identity row;
- Tyffany remains the tutor/voice identity everywhere it actually owns the surface;
- model/replay actions use an explicit centered flex contract.

### Settings Theme picker after navigation churn — PR #161

Physical installed-PWA review exposed a real interaction failure after several navigations and a completed lesson: the Settings **Theme** card could remain visually present but tapping its collapsed header produced no visible action.

The investigation found a QA/ownership gap rather than a theme-engine failure:

- the existing Appearance smoke changed themes through `FrenchTranquilleThemes.apply(...)` directly;
- the historical Settings tribunal could click theme-option DOM programmatically without first verifying the real collapsed Theme header;
- therefore CI certified theme application while the actual user gesture that opens the card was not covered;
- Settings also retained a historical fixed `#ft-theme-settings` source template while mounting the newer inline owner, leaving two potential Theme surfaces/hit targets.

PR #161 fixes the real interaction owner in `src/core/theme-controller.js`:

- the inline Theme `<details>` open/close state is now controlled deterministically by the theme controller;
- real pointer clicks on the Theme `summary` explicitly toggle the disclosure;
- Enter / Space keyboard activation follows the same path;
- `aria-expanded` and `data-theme-picker-open` stay synchronized;
- once the inline Settings picker owns the surface, the historical fixed template is hidden and removed from interaction ownership;
- theme selection still uses the existing appearance-only store and does **not** touch learner progression, pedagogy or voice.

Permanent field guard: `V5.10 Theme Picker Interaction` / `tests/browser/v510-theme-picker-interaction.html`.

It performs real summary clicks after route churn and after a second Settings remount, changes Sunset → Original through visible theme options, and requires the learner-related stores to remain byte-identical.

## Permanent V5.10 field QA

Current V5.10 field automation now covers both visual ownership and the real Theme interaction path:

- Home canonical lesson icon is visible and the generic `▤` pseudo icon is gone;
- lesson detail uses the same curriculum lesson icon;
- the lesson identity row is not owned by the Tyffany-brain decorator;
- `Nghe Tyffany / Écouter Tyffany` is flex-centered;
- Listening Feature Header parity remains intact;
- Real-Life mapping remains intact;
- Progress FTQ brand identity remains canonical;
- Theme card opens and closes by real user-style click after route churn/remount;
- visible theme options remain interactive inside Settings;
- pure visual/theme travel leaves durable learner data unchanged.

## Physical closure verdict

The V5.10 installed-PWA gate is now closed by explicit human evidence:

```text
2026-08-16
user physical smoke → “ça a l'air OK, TEST SMOKED”
issue #114          → CLOSED / completed
Premium V5.10       → FIELD PASS
Build 35            → UNBLOCKED
```

This field PASS certifies the current Premium package as accepted enough to leave the Build 34 visual-maintenance gate. Future regressions still reopen maintenance as defects, but they do **not** retroactively consume Build 35 or rewrite the V5.10 closeout.

## PWA/cache choice

- V5.10 lesson-identity targeted runtime URL version remains **`2.3.35-v510lessonidentity1`**.
- Theme interaction contract marker: **`2.3.36-v510themeinteraction1`** inside `FrenchTranquilleThemes.interactionVersion`.
- Global Service Worker cache identity remains deliberately unchanged.
- No global cache nuke was used for this interaction correction.
- Service Worker remains network-first for GET requests.

## Protected sanctuaries

Future work must not silently change:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

Also preserve unless an explicitly scoped future build proves otherwise:

- learner progression;
- six durable stores;
- lesson IDs and curriculum semantics;
- Scenario / Listening / Memory semantics;
- voice / replay semantics;
- Recovery / migration contracts.

## Locked / must not regress

- **ZERO route flash / ZERO remanence / ZERO competing facades.**
- **ZERO competing Theme owners/hit targets in Settings.**
- No route/page crossfade may expose old and new facades simultaneously.
- Global chrome baseline: Back top-left, Settings top-right, coherent control family.
- Progress visual grammar: **A0 → progress line → A1**.
- DEBUG FR remains logically independent from visual theme.
- Approved Practice artwork must not silently fall back to superseded generated SVG/emoji families.
- Feature Header artwork must remain the exact same approved source file used on Practice.
- `Conversation` remains Real-Life; Speak remains explicit `Répondre à l’oral` only.
- **Lesson surfaces use curriculum lesson identity; Tyffany owns tutor/voice surfaces, not generic lesson identity.**
- Build 35 remains unavailable for CSS/assets/animation/cache/DEBUG/visual QA work: its scope is Memory Evidence v2 / Migration Readiness.

## Canonical next action — Build 35

Premium V5.10 is closed. **Do not reopen the visual gate without a concrete regression.**

Certified closure evidence:

```text
PR #161                       44/44 SUCCESS
main runtime 54209392…        29/29 SUCCESS
V5.10 Theme Picker #2         SUCCESS
GitHub Pages #214             SUCCESS on 54209392…
physical FIELD PASS           2026-08-16
issue #114                    CLOSED / completed
```

Next canonical build:

```text
Build 35 — Memory Evidence v2 / Migration Readiness

→ audit current Memory evidence ownership and all 6 durable stores
→ design evidence v2 without adopting a new durable schema yet
→ define bounded evidence history + compatibility rules
→ prove deterministic migration in simulation
→ snapshot → transform → simulated write → reread → compare → rollback
→ quarantine invalid data
→ prove old-backup compatibility
→ run historical learner + browser proof
→ stop before durable adoption
→ Build 36 only if migration proof is complete
```
