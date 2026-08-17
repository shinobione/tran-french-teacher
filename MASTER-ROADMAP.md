# French Trân’quille — MASTER ROADMAP

> **Canonical durable project roadmap / source of truth.**
>
> Every fresh AI/session working on `shinobione/tran-french-teacher` must read `AGENTS.md`, then `PROJECT-STATE.md`, then this file before changing roadmap, release state or implementation.
>
> Live GitHub / deployed runtime evidence wins over documentation when they disagree. Historical build documents remain evidence; this file owns current durable execution order, locked product decisions, phase gates and future build boundaries.

---

# 0. Canonical checkpoint — 2026-08-17

| Item | Canonical state |
|---|---|
| Public application runtime metadata | **v2.4.0 · Build 36** |
| Product pedagogy baseline | **v2.3.0 · Build 34** |
| Current governance `main` before this reconciliation slice | **`0d7b8a31d4731024ff9e86d97e3128bad572efb3`** — PR #200 / Build 38.9 docs closeout |
| Latest accepted Build 38 product/core checkpoint | **`a33e504cdc20438c454fc365371af545ef747f0c`** — PR #199 / Build 38.9 |
| Latest learner-facing Transfer runtime checkpoint | **`3fae502dba8faee003b44c5a1b9a9cffd9affec7`** — PR #197 / Build 38.8 |
| GitHub Pages product/core proof | **#265 / run `32059362998` SUCCESS** on exact 38.9 merge SHA |
| GitHub Pages 38.9 docs-closeout proof | **#266 / run `32059893554` SUCCESS** on exact PR #200 merge SHA |
| Curriculum | **52 lessons / 313 items** |
| Scenario | **44 situations / 132 turns** |
| Speaking Loop | **52/52 · max 2 moments / lesson** |
| Listening | **0.88 normal / 0.65 slow** |
| Recovery durable stores | **7** |
| Backup envelope | **v3** |
| Evidence v2 | **derived shadow only; original six source stores remain product truth** |
| Premium V5.10 | **CLOSED · physical FIELD PASS** |
| Build 35 | **CLOSED · Memory Evidence v2 migration readiness** |
| Build 36 | **CLOSED · seven-store derived-shadow adoption** |
| Build 37 | **CLOSED · Foundations Core** |
| Build 38 | **ACTIVE · Generalization & Transfer** |
| Build 38.1–38.8 | **CLOSED** |
| Build 38.9 | **CLOSED / CERTIFIED / NON-WIRED** |
| Next canonical action | **learner-placement audit for 38.9; no automatic 38.10** |
| Primary field target | **iPhone / Safari / installed PWA** |

## 0.1 Release/version metadata policy — LOCKED

French Trân’quille has three distinct version concepts and they must not be conflated again:

```text
PUBLIC RUNTIME RELEASE
  what Settings shows to the learner/admin
  current = v2.4.0 · Build 36

PEDAGOGY BASELINE
  historical baseline used by pedagogy ownership/contracts
  current = v2.3.0 · Build 34

ROADMAP CHECKPOINT
  internal implementation / certification slices
  current accepted checkpoint = Build 38.9
```

Rules:

1. `37.x`, `38.x`, etc. are **roadmap slices**, not SemVer patch numbers.
2. A narrow slice must **not** silently rewrite public runtime metadata merely because its internal build number is newer.
3. Public runtime metadata changes only through an explicit **release-version governance slice** with dedicated tests and documentation.
4. Public SemVer should represent a meaningful shipped product milestone, not every PR.
5. The public `Build` displayed beside SemVer is the **release build anchor**, not the latest internal roadmap checkpoint.
6. If a future DEBUG/admin surface shows roadmap progress, it must label it separately, e.g. `Roadmap checkpoint: 38.9`; it must not overwrite `v2.4.0 · Build 36` by accident.
7. When Build 38 is eventually closed, **`v2.5.0 · Build 38` is the natural candidate release line**, but it is **not assigned yet**. It requires an explicit release decision and runtime certification.
8. README, PROJECT-STATE and MASTER-ROADMAP must distinguish these concepts instead of calling all of them “current version”.

See `docs/RELEASE-VERSIONING-POLICY.md`.

---

# 1. Permanent non-regression contracts

## 1.1 Atomic navigation / zero flash

Physical field contract:

**ZERO route flash / ZERO remanence / ZERO competing facades.**

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
- correct Back semantics across Review / Speak / Listen / Real Life / Settings;
- no tap-again requirement;
- no body-empty period.

## 1.3 Progress grammar

Visible progression remains:

```text
A0 → progress line → A1
```

Do not return to older stacked/confusing A0/A1 layouts.

## 1.4 Settings / DEBUG ownership

Canonical state model:

```text
theme = visual preference
debugFr = admin/debug preference

theme must never own debugFr
debugFr must never force theme
```

Learner-facing Settings stays compact. Technical diagnostics belong to DEBUG/admin surfaces.

## 1.5 Learner / pedagogy safety

Do not silently alter:

- learner-store semantics;
- lesson IDs;
- Scenario / Listening / Memory ownership;
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

Unless an explicitly scoped future build justifies otherwise, protect:

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
Build 38.1 deterministic subject-substitution semantics
Build 38.2 lesson-33 placement / round-trip contract
Build 38.3 deterministic negation semantics
Build 38.4 deterministic futur-proche semantics
Build 38.5 lesson-35 placement / round-trip contract
Build 38.6 deterministic nominal-plural semantics
Build 38.7 lesson-13 placement / round-trip contract
Build 38.8 lesson-34 placement / round-trip contract
Build 38.9 deterministic nous→on core semantics
shared Transfer renderer ownership
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

All V5.6→V5.10 work remains part of the historical Build 34 maintenance line.

First-class themes remain:

- Original;
- Aurora;
- Sunset;
- Nocturne.

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

Preserve whole-card hit targets, coherent button/card language, Tyffany tutor identity, correct Conversation=Real-Life ownership, online/offline PWA parity and reduced-motion functionality.

Final physical Premium verdict remains the 2026-08-16 installed-PWA user PASS. Future visual defects are maintenance regressions; they do not reopen V5.10 by default.

---

# 4. Build 35 — Memory Evidence v2 / Migration Readiness — CLOSED

Build 35 designed and simulated Evidence v2 without live durable adoption.

Certified sequence:

```text
35.1 · PR #164 → deterministic Evidence v2 projection
35.2 · PR #165 → isolated transactional write/reread/compare/rollback simulation
closeout · PR #166 → explicit Build 36 adoption-readiness contract
```

Mandatory migration principle:

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

Historical backup semantics:

```text
v3 → owns seven stores directly
v2 → owns historical six → rebuild Evidence from restored six
v1 → owns learner + memory → preserve historically absent stores → rebuild Evidence from resulting six
```

Build 36.3 / PR #170 certified backup / restore / reset / rollback with the derived shadow. PR #171 closed Build 36 and opened Build 37.

Public runtime metadata was explicitly locked to **v2.4.0 · Build 36** by the later runtime-version maintenance contract. That value remains valid until an explicit release-version slice replaces it.

---

# 6. Build 37 — Foundations Core — CLOSED

## Mandate

Industrialize the validated Foundations syllabus without renumbering the 52 core lessons, duplicating explicit grammar teaching or turning Foundations into durable learner truth.

Certified chain:

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

Final closeout checkpoint:

```text
PR #184
main cb37b4a6bdd9451a07e83deeae2544a407d78844
Pages #236 / run 31975143562 SUCCESS
post-merge: 32 SUCCESS + exactly 4 inherited failures
0 queued / 0 in-progress
```

Shared Foundations ownership — LOCKED:

```text
37.2 → generic pure capsule engine
37.3 → shared learner-facing adapter / renderer
37.4 → F11 negation
37.5 → F05 subject pronouns
37.6 → F08 regular -er present
37.7 → F12 practical questions
37.8 → F13 adjective agreement
```

Runtime routes — LOCKED:

```text
F01–F04 → lessons 8–13
F11     → lessons 17–20
F08     → lessons 32–33
F05     → lessons 34–36
F13     → lesson 40 only
F12     → lessons 41–43
```

Foundations remain optional/ephemeral, additive, VI/DEBUG-FR compatible, with no durable write and no Evidence product read.

F16 (`à/de` contractions) remains **deferred / not completed**.

F18 (`spoken-on`) remains **explicit / reuse-existing / lesson 52**. It is not a new Foundation route.

---

# 7. Build 38 — Generalization & Transfer — ACTIVE

## Goal

Move from recognizing/recalling known phrases and understanding selected Foundations toward **constructing unseen but valid phrases from already-known material**.

Principles:

- begin from the existing 52 lessons / 313 items;
- generate only from vocabulary/structures already known at the candidate learner point;
- deterministic source/target ownership before adaptive/random variation;
- one narrow transformation family per implementation slice;
- preserve Build 37 Foundation owners;
- no new permanent navigation tab merely for Transfer;
- avoid school-like grammar tables;
- learner-facing explanations remain primarily Vietnamese when needed;
- no fake mastery score;
- no durable Transfer/Evidence adoption until explicitly justified and migration-safe;
- recognition misses remain recognition-system signals, not pronunciation diagnosis.

## 38.1 — deterministic subject substitution — CLOSED

```text
family = subject-substitution-regular-er
subjects = je / tu / il / elle
verbs = travailler / habiter / aimer
status = pure deterministic core
```

## 38.2 — learner-facing subject substitution — CLOSED / DEPLOYED

```text
lesson 33 normal content
→ existing F08
→ ONE subject-substitution Transfer card
→ 3 deterministic exercises
→ return to lesson
→ normal Continue
```

Learner subset:

```text
Je travaille. → Tu travailles.
J'habite ici. → Tu habites ici.
Tu aimes ça. → Elle aime ça.
```

## 38.3 — affirmation → negation core — CLOSED

```text
Je travaille. → Je ne travaille pas.
J'habite ici. → Je n'habite pas ici.
J'aime ça. → Je n'aime pas ça.
```

Family: `affirmation-negation-regular-er-je`.

## 38.4 — present → futur proche core — CLOSED

```text
Je travaille.   → Je vais travailler.
Tu travailles.  → Tu vas travailler.
Il travaille.   → Il va travailler.
Elle travaille. → Elle va travailler.
```

## 38.5 — learner-facing futur proche — CLOSED / DEPLOYED

```text
lesson 35 normal content
→ existing F05
→ ONE futur-proche Transfer card
→ 3 deterministic transformations
→ return to lesson
→ normal Continue
```

## 38.6 — deterministic singular → plural nominal core — CLOSED

```text
la gare       → les gares
la pharmacie  → les pharmacies
un billet     → des billets
une table     → des tables
```

## 38.7 — learner-facing nominal plural — CLOSED / DEPLOYED

```text
lesson 13 normal content
→ existing F01–F04
→ ONE nominal-plural Transfer card
→ 3 deterministic transformations
→ return to lesson
→ normal Continue
```

## 38.8 — learner-facing negation — CLOSED / DEPLOYED

```text
lesson 34 normal content
→ existing F05
→ ONE negation Transfer card
→ 3 deterministic transformations
→ return focus to Transfer CTA / lesson
→ normal Continue
```

Runtime product proof:

```text
PR #197
final candidate head 06fcb745edb86018294f6369fd4922abe69687f3
squash merge 3fae502dba8faee003b44c5a1b9a9cffd9affec7
Pages #263 / run 32056843564 SUCCESS
```

PR #197 used a documented controlled CI-infrastructure exception after stale predecessor ownership guards were made successor-safe. Do not rewrite this as “entire final-head matrix drained green before merge”.

## 38.9 — deterministic `nous → on` spoken-French core — CLOSED / CERTIFIED / NON-WIRED

Family:

```text
nous-on-spoken-equivalence
status = pure-non-wired
persistence = ephemeral-only
masteryClaim = false
```

Exact certified catalog:

```text
Nous travaillons. → On travaille.
Nous rentrons.    → On rentre.
Nous allons à…    → On va à…
```

Curriculum anchors:

```text
lesson 34 → learner-known nous scaffold
lesson 52 / F18 → spoken on often means nous + il/elle verb form
```

Explicit exclusions — LOCKED:

```text
On est prêts.
On a le temps.
generic / indefinite on
passive on
object-pronoun rewrites
negation
questions
adjective agreement
new vocabulary
random/adaptive generation
durable writes
Evidence product reads
mastery claims
learner-facing lesson wiring
```

Certification:

```text
PR #199 MERGED
candidate head e066baa3d4c481f65bb361a4406d2a861b7563f3
squash merge a33e504cdc20438c454fc365371af545ef747f0c
dedicated run 32058789584 SUCCESS
full PR matrix = only four inherited historical failures
post-merge = only the same four inherited failures
Pages #265 / run 32059362998 SUCCESS on exact merge SHA
```

Docs closeout:

```text
PR #200 MERGED
merge 0d7b8a31d4731024ff9e86d97e3128bad572efb3
Pages #266 / run 32059893554 SUCCESS
```

### Current learner-facing Transfer routes — LOCKED

```text
38.7 → lesson 13 / nominal plural / [0,2,3]
38.2 → lesson 33 / subject substitution / [0,2,5]
38.8 → lesson 34 / affirmation→negation / [0,1,2]
38.5 → lesson 35 / futur proche / [0,1,3]
```

There is exactly **one shared Transfer renderer**.

### NEXT — placement audit only

38.9 does **not** automatically authorize a lesson-52 card.

Canonical next control slice:

```text
inspect lesson 52 and F18 learner-facing teaching
→ test whether a construction exercise adds genuine retrieval/recombination value
→ reject placement if it merely repeats the existing explanation/examples
→ check lesson density and round-trip UX
→ preserve all existing Transfer routes
→ if useful, assign ONE separate learner-facing integration slice
→ otherwise audit at most ONE other narrow Build 38 family
```

Do not pre-assign `38.10` merely because `38.9` exists.

---

# 8. Inherited CI debt

Exactly four historical failures remain baseline debt:

1. `Build 36.2 Evidence shadow adoption`;
2. `V2.0.0 Freeze tribunal`;
3. `Build 36.3 Recovery v3 durability tribunal`;
4. `Build 28 Data recovery smoke`.

Any other failure must be classified. Historical red debt is never permission to ignore a new failure.

---

# 9. Build 39 — Learner Intelligence 3 — FUTURE

Tyffany should eventually choose whether the next useful action is:

- phrase retrieval;
- concept review;
- Foundation capsule;
- listening;
- scenario;
- transfer/construction.

Build 39 must consume reliable evidence from completed prior systems. It must not invent mastery from recognition failures or decorative activity counts.

**Do not start Build 39 while Build 38 still has unresolved transfer/placement decisions.**

---

# 10. Build 40 — A1 Consolidation Audit — FUTURE

Audit real evidence before any A2 expansion.

No A2 expansion is authorized merely because implementation volume has increased.
