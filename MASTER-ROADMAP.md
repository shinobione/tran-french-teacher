# French Trân’quille — MASTER ROADMAP

> **Canonical project handoff / source of truth.**
>
> Any future AI/chat/session working on `shinobione/tran-french-teacher` **must read `AGENTS.md`, then `PROJECT-STATE.md`, then this file before making roadmap or implementation decisions**.
>
> Historical build documents, PRs and prior roadmap revisions remain evidence. This file owns the **durable current execution order, locked product decisions, phase gates and future build boundaries**.

---

# 0. Canonical checkpoint — 2026-08-17

## Current line

| Item | Canonical state |
|---|---|
| Application runtime metadata | **V2.4.0 · Build 36** |
| Product pedagogy baseline | **V2.3.0 · Build 34** |
| Current runtime-bearing `main` | **`25d09fa44d5cf1efff9f8529bb2e54cb67b7bc48`** — PR #186 / Build 38.1 |
| GitHub Pages | **#239 / run `31976241382` SUCCESS** on exact runtime SHA |
| Curriculum | **52 lessons / 313 items** |
| Scenario | **44 situations / 132 turns** |
| Speaking Loop | **52/52 · max 2 moments / lesson** |
| Listening | **0.88 normal / 0.65 slow** |
| Recovery durable stores | **7** |
| Backup envelope | **v3** |
| Evidence v2 | **derived shadow only; original six source stores remain product truth** |
| Premium V5.10 | **CLOSED · physical FIELD PASS** |
| Issue #114 | **CLOSED / completed** |
| Build 35 | **CLOSED · Memory Evidence v2 migration readiness** |
| Build 36 | **CLOSED · seven-store derived-shadow adoption** |
| Build 37 | **CLOSED · Foundations Core** |
| Build 38.1 | **CLOSED · deterministic subject-substitution transfer core** |
| Build 38.2 | **NEXT · learner-facing integration of certified 38.1 core** |
| Primary field target | **iPhone / Safari / installed PWA** |

## Current interpretation

- Premium V5.10 is closed after explicit installed-PWA field validation.
- Build 35 proved deterministic Evidence v2 projection and reversible migration planning.
- Build 36 adopted Evidence as a seventh **derived shadow** under Recovery v3 / backup v3; the original six stores remain canonical product truth.
- Build 37 industrialized the Foundations system without renumbering the 52 lessons, without persistent Foundations state, and without treating Evidence as product truth.
- F16 (`à/de` contractions) remains **deferred / not completed**; Build 37 stays closed.
- Build 38 owns **generalization and construction of unseen phrases**.
- Build 38.1 proved the first transfer primitive as a **pure / non-wired** core; it deliberately changed no learner-facing PWA surface.
- Build 38.2 now owns the smallest safe learner-facing placement for that certified core. It does **not** own expansion to new transfer families.
- Post-38.1 `main` is closed with **exactly the four inherited historical failures**, **0 queued**, **0 in-progress**; all other workflows including Build 38.1 are SUCCESS.

---

# 1. Permanent non-regression contracts

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

## 1.4 Settings / DEBUG ownership

Learner-facing Settings stays human and compact.

Canonical state model:

```text
theme = visual preference
debugFr = admin/debug preference

theme must never own debugFr
debugFr must never force theme
```

Technical diagnostics belong to DEBUG/admin surfaces, not Trân’s normal learner UI.

## 1.5 Learner / pedagogy safety

Do not silently alter:

- learner-store semantics;
- lesson IDs;
- Scenario/Listening/Memory ownership;
- voice/audio semantics;
- migration contracts;
- historical learner progression.

Historical continuity remains a release contract:

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

Future curriculum growth must not rewrite historical IDs merely for neatness.

## 1.6 Voice rules

- no fake pronunciation score;
- speech-recognition miss is recognition-system evidence, not proof of poor pronunciation;
- own-voice replay remains temporary/local;
- replay audio never enters learner Memory/backups;
- automatic capture of the exact first Siri attempt remains gated by real iPhone validation.

---

# 2. Protected sanctuaries

Unless an explicitly scoped future build justifies otherwise:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

Also preserve unless a dedicated migration/build explicitly changes them:

```text
manifest / SW PWA identity contract from PR #180
Recovery v3 seven-store ownership
backup envelope v3
Evidence derived-shadow role
original six source stores as product truth
52 / 313 curriculum semantics
Listening / Scenario / Mastery / Learner Intelligence owners
V5.10 field-accepted navigation / visual identities
Build 37 Foundations ownership/routes
Build 38.1 deterministic transfer semantics
```

---

# 3. Premium visual line — CLOSED

Canonical sequence:

```text
V5.5 stable structural base ✅
→ V5.6 Premium Visual Identity Assets ✅
→ V5.7 Four-theme Premium Art Integration ✅
→ V5.8 DEBUG FR / Theme Decoupling ✅
→ V5.9 Shared UI Coherence + Fluidity ✅
→ V5.10 Global Visual QA + installed-PWA physical verdict ✅ FIELD PASS
→ Build 34 governance/documentation closure ✅
→ issue #114 CLOSED ✅
```

All V5.6→V5.10 work remains part of the **Build 34 maintenance line** historically.

## 3.1 First-class themes

All four themes remain first-class identities:

- Original;
- Aurora;
- Sunset;
- Nocturne.

Original must never regress into a poorer/debug/fallback theme.

Canonical full-background assets:

```text
assets/premium/themes/aurora/background.webp
assets/premium/themes/sunset/background.webp
assets/premium/themes/nocturne/background.webp
assets/premium/themes/original/background-v2.png
```

Approved lesson Eiffel assets:

```text
assets/premium/themes/aurora/lesson-eiffel-v2.png
assets/premium/themes/sunset/lesson-eiffel-v2.png
assets/premium/themes/nocturne/lesson-eiffel-v2.png
assets/premium/themes/original/lesson-eiffel-v2.png
```

The first-generation opaque rectangular Eiffel assets are rejection evidence only.

Canonical Premium asset manifest:

```text
assets/premium/README.md
```

Do not silently regenerate user-locked backgrounds/assets to solve layout defects.

## 3.2 Shared Premium grammar

Theme may change:

- palette;
- background artwork;
- lesson Eiffel artwork;
- restrained accent/glow.

Theme should not change without a documented reason:

- semantic component placement;
- lesson content hierarchy;
- CTA family;
- hit targets;
- Back/Settings ownership;
- responsive breakpoints;
- DEBUG state semantics.

Permanent Premium QA targets include:

```text
390×844
430×932
768×1024
1280×800
1440×900
```

Preserve:

- whole-card hit targets where established;
- one Speaking self-record CTA + one explanatory note;
- canonical Practice/Feature Header icon ownership;
- `Conversation` = Real-Life, never Speak;
- Tyffany tutor/voice identity ownership;
- Theme selection through real user-style clicks after route churn/remount;
- online/offline PWA asset parity;
- reduced-motion functionality.

Final physical Premium verdict remains the 2026-08-16 installed-PWA user PASS. Future visual defects are maintenance regressions; they do not reopen V5.10 by default.

---

# 4. Build 35 — Memory Evidence v2 / Migration Readiness — CLOSED

Build 35 designed and simulated Evidence v2 without live durable adoption.

Evidence dimensions include:

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

Evidence states distinguish:

- exposure;
- assisted success;
- autonomous recall;
- contextual reuse;
- concept understanding;
- novel construction / transfer.

Certified sequence:

```text
35.1 · PR #164 → deterministic Evidence v2 projection
35.2 · PR #165 → isolated transactional write/reread/compare/rollback simulation
closeout · PR #166 → explicit Build 36 adoption-readiness contract
```

Mandatory migration principle remains:

```text
pre-migration snapshot
→ source validation
→ deterministic transform
→ transactional write/simulation
→ reread
→ compare
→ rollback
→ quarantine invalid data
→ old backup compatibility
→ historical learner smoke
→ real browser proof
```

---

# 5. Build 36 — Memory Evidence v2 derived-shadow adoption — CLOSED

Canonical adopted model:

> **Evidence v2 is a seventh derived shadow store. The existing six stores remain canonical for current product behaviour until a later explicit read-path decision.**

Recovery/backup contract:

```text
7 durable stores
backup envelope v3
Evidence role = derived shadow
six original stores = product truth
product read-path cutover to Evidence = NONE
```

Historical backup semantics remain locked:

```text
v3 → owns seven stores directly

v2 → owns historical six → rebuild Evidence from restored six

v1 → owns learner + memory → preserve historically absent stores → rebuild Evidence from resulting six
```

Build 36.3 / PR #170 certified backup / restore / reset / rollback with the derived shadow. PR #171 closed Build 36 and opened Build 37.

---

# 6. Build 37 — Foundations Core — CLOSED

## Mandate

Industrialize the validated Foundations syllabus without renumbering the 52 core lessons, duplicating explicit grammar teaching or turning Foundations into durable learner truth.

## Certified chain

```text
37.1 registry F01–F18                         ✅
37.2 generic pure capsule engine              ✅
37.3 F01–F04 pilot adapter parity             ✅
37.4 F11 negation narrow expansion            ✅
37.5 F05 subject-pronoun consolidation        ✅
37.6 F08 regular -er present consolidation    ✅
37.7 F12 practical question system            ✅
37.8 F13 adjective agreement                  ✅
```

Final runtime-bearing closeout checkpoint:

```text
PR #184
main cb37b4a6bdd9451a07e83deeae2544a407d78844
Pages #236 / run 31975143562 SUCCESS
post-merge: 32 SUCCESS + exactly 4 inherited failures
0 queued / 0 in-progress
```

## Shared Foundations ownership — LOCKED

```text
37.2 → generic pure capsule engine
37.3 → shared learner-facing adapter / renderer
37.4 → F11 negation
37.5 → F05 subject pronouns
37.6 → F08 regular -er present
37.7 → F12 practical questions
37.8 → F13 adjective agreement
```

Runtime routes:

```text
F01–F04 → lessons 8–13
F11     → lessons 17–20
F08     → lessons 32–33
F05     → lessons 34–36
F13     → lesson 40 only
F12     → lessons 41–43
```

Foundations remain optional/ephemeral, additive, VI/DEBUG-FR compatible, with no durable write and no Evidence product read.

## F16 decision — deferred, not completed

F16’s cleanest current anchor is:

```text
lesson 45 → à la tête ↔ au ventre
```

A broad `à / au / à la / aux / de / du / de la / des` capsule currently risks mixing contractions with already-taught article/partitive meanings and lacks an equally clean `aux` scaffold.

Therefore F16 is not required for Build 37 closeout and may return only if future curriculum/evidence establishes a clean transferable need.

---

# 7. Build 38 — Generalization & Transfer — ACTIVE

## Goal

Move from “recognize/recall known phrases and understand selected Foundations” toward **constructing unseen but valid phrases from already-known material**.

Prioritized transfer families:

```text
singular → plural
subject substitution
affirmation → negation
present → futur proche
agreement transformations
recombination across known vocabulary / structures
```

## Build 38 principles

- begin from existing 52 lessons / 313 items;
- generate only from vocabulary/structures already known to the learner at that point;
- deterministic source/target ownership before adaptive/random variation;
- one narrow transformation family per implementation slice;
- preserve Build 37 Foundation owners;
- no new permanent navigation tab merely for “Transfer”;
- avoid school-like grammar tables;
- learner-facing explanations remain primarily Vietnamese when needed;
- no fake mastery score;
- no durable transfer/evidence adoption until explicitly justified and migration-safe;
- recognition misses remain recognition-system signals, not pronunciation diagnosis.

## 38.1 — deterministic subject substitution — CLOSED

Audit winner:

```text
family   subject-substitution-regular-er
subjects je / tu / il / elle
verbs    travailler / habiter / aimer
```

Certified examples:

```text
Je travaille.  → Tu travailles.
Tu travailles. → Elle travaille.
J'habite ici.  → Tu habites ici.
Il habite ici. → Elle habite ici.
J'aime ça.     → Tu aimes ça.
Tu aimes ça.   → Elle aime ça.
```

Implementation:

```text
src/pedagogy/generalization-transfer-core.js
status = pure-non-wired
persistence = ephemeral-only
masteryClaim = false
```

Explicit exclusions remain locked for 38.1:

```text
nous / vous / ils / elles
questions as a separate family
negation
futur proche
agreement/plural transforms
aller / vouloir / pouvoir / devoir
random generation
new vocabulary
durable writes
Evidence product reads
```

Certification:

```text
PR #186
candidate head 4bc46dab110e70398d64671f0583fad2d3107b95
merge 25d09fa44d5cf1efff9f8529bb2e54cb67b7bc48
Pages #239 / run 31976241382 SUCCESS
Build 38.1 Node + browser tribunal SUCCESS
VI / DEBUG FR × 1280×900 / 390×844
6 deterministic exercises through real clicks
localStorage byte-identical
no horizontal overflow
touch targets >=44 px
Build 37.8 predecessor PASS
post-merge = exactly 4 inherited failures, 0 queued, 0 in-progress
```

38.1 deliberately does **not** change the learner-facing PWA.

## 38.2 — learner-facing integration — NEXT

38.2 owns **placement and interaction only**, not expansion of the 38.1 matrix.

Canonical execution order:

```text
audit existing lesson surfaces
→ choose the smallest contextual insertion point
→ reuse certified 38.1 core
→ no new permanent navigation tab
→ keep exercise optional/contextual and short
→ no new vocabulary
→ no irregular verbs
→ no durable write / Evidence product read unless separately justified
→ preserve 52/313 IDs and Build 37 owners
→ VI / DEBUG FR × desktop / 390×844
→ real lesson entry → transfer → return/continue
→ learner stores byte-identical
→ one candidate PR
→ STOP for control review
```

38.2 must **not** simultaneously add negation, plural, futur proche or agreement transfer.

Do **not** start Build 39 inside Build 38.

---

# 8. Build 39 — Learner Intelligence 3

Tyffany chooses whether the next useful action is:

- phrase retrieval;
- concept review;
- foundation capsule;
- listening;
- scenario;
- transfer/construction.

Build 39 should consume reliable evidence from prior systems; it must not invent mastery from recognition failures or decorative activity counts.

---

# 9. Build 40 — A1 Consolidation Audit

Audit real evidence before any A2 expansion.

Outcome may be:

- reinforce A1;
- internal A1+ consolidation;
- or open A2.

**A2 is not automatic.**

---

# 10. Parallel maintenance tracks — no build-number theft

Continue as needed:

- iPhone/Safari/PWA compatibility;
- accessibility;
- safe-area and target sizing;
- offline/service-worker correctness;
- performance;
- Recovery/backup reliability;
- CI flake hardening that does not weaken assertions;
- documentation/governance;
- concrete visual regressions against V5.10 field-accepted contracts.

These tracks must not become excuses to rewrite pedagogical architecture or consume reserved build numbers.

Known inherited CI debt after Build 38.1:

1. `Build 36.2 Evidence shadow adoption`;
2. `V2.0.0 Freeze tribunal`;
3. `Build 36.3 Recovery v3 durability tribunal`;
4. `Build 28 Data recovery smoke`.

Classify these separately from any new Build 38 regression.

---

# 11. Agent execution policy

## Mandatory boot

```text
read AGENTS.md
→ read PROJECT-STATE.md
→ read this MASTER-ROADMAP.md
→ verify current main / PRs / issues / CI / Pages
→ continue from NEXT, not chat history
```

Repository/GitHub reality wins over stale documentation.

## One coherent slice

For implementation work:

```text
audit exact current owner
→ implement ONE named slice
→ run relevant deterministic/browser proof
→ materialize in git
→ open/update candidate PR
→ update candidate checkpoint
→ STOP for control review unless user explicitly delegated merge/next work
```

Never rely on hidden workspace state as project memory.

If a CI failure is a known harness flake, prove it from logs/reruns before retrying unchanged. Do not mutate product code to satisfy flaky Chrome timing.

Never declare a physical-device gate complete from automation alone.

---

# 12. Next-agent checklist

Before touching 38.2 runtime:

1. read `AGENTS.md`;
2. read `PROJECT-STATE.md`;
3. read **Build 38.1 CLOSED** and **38.2 NEXT** above;
4. inspect current `main`, open PRs and current Pages SHA;
5. preserve Premium V5.10 field contracts;
6. preserve Recovery v3 / backup v3 / seven-store ownership;
7. preserve Evidence as derived shadow and original six stores as product truth;
8. preserve Build 37 Foundation routes/owners;
9. preserve 38.1 deterministic source/target semantics;
10. preserve zero-flash atomic navigation;
11. keep DEBUG independent from theme;
12. do not regenerate locked Premium assets for a pedagogical task;
13. choose the **smallest learner-facing placement** for 38.1;
14. do not extend verbs/subjects in the same slice;
15. keep learner storage byte-identical unless persistence is explicitly earned;
16. materialize one candidate PR and stop for control review;
17. do not start Build 39 automatically.

---

# Canonical one-line order

> **Premium V5.10 FIELD PASS → Build 35 CLOSED → Build 36 CLOSED → Build 37 Foundations CLOSED → Build 38.1 transfer core CLOSED → Build 38.2 learner-facing integration NEXT → further Build 38 transfer families one-at-a-time → Build 39 Learner Intelligence 3 → Build 40 A1 Consolidation Audit → A2 only after Build 40 decision.**
