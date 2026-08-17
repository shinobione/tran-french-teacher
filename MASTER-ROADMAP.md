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
| Public application runtime metadata | **V2.4.0 · Build 36** |
| Product pedagogy baseline | **V2.3.0 · Build 34** |
| Current governance main before PR #201 | **`0d7b8a31d4731024ff9e86d97e3128bad572efb3`** — PR #200 / Build 38.9 docs closeout |
| Latest accepted Build 38 product/core checkpoint | **`a33e504cdc20438c454fc365371af545ef747f0c`** — PR #199 / Build 38.9 |
| Latest learner-facing Transfer runtime checkpoint | **`3fae502dba8faee003b44c5a1b9a9cffd9affec7`** — PR #197 / Build 38.8 |
| GitHub Pages 38.9 product/core proof | **#265 / run `32059362998` SUCCESS** on exact `a33e504c…` SHA |
| GitHub Pages 38.9 docs-closeout proof | **#266 / run `32059893554` SUCCESS** on exact `0d7b8a31…` SHA |
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
| Build 38.2 | **CLOSED · learner-facing subject-substitution integration** |
| Build 38.3 | **CLOSED · deterministic affirmation → negation core** |
| Build 38.4 | **CLOSED · deterministic present → futur proche core** |
| Build 38.5 | **CLOSED · learner-facing futur-proche integration** |
| Build 38.6 | **CLOSED · deterministic singular → plural nominal core** |
| Build 38.7 | **CLOSED · learner-facing nominal-plural integration** |
| Build 38.8 | **CLOSED · learner-facing negation integration** |
| Build 38.9 | **CLOSED / CERTIFIED / NON-WIRED · deterministic nous → on spoken-French core** |
| Next Build 38 action | **learner-placement audit for 38.9; no automatic 38.10** |
| Primary field target | **iPhone / Safari / installed PWA** |

## Current interpretation

- Premium V5.10 is closed after explicit installed-PWA field validation.
- Build 35 proved deterministic Evidence v2 projection and reversible migration planning.
- Build 36 adopted Evidence as a seventh **derived shadow** under Recovery v3 / backup v3; the original six stores remain canonical product truth.
- Build 37 industrialized the Foundations system without renumbering the 52 lessons, without persistent Foundations state, and without treating Evidence as product truth.
- F16 (`à/de` contractions) remains **deferred / not completed**; Build 37 stays closed.
- Build 38 owns **generalization and construction of unseen phrases**.
- 38.1 / 38.3 / 38.4 / 38.6 / 38.9 remain certified deterministic transfer cores.
- 38.2 / 38.5 / 38.7 / 38.8 expose certified cores contextually in lessons 33 / 35 / 13 / 34 through the **same shared Transfer renderer**.
- Build 38.9 is merged/certified at `a33e504c…`; Pages #265 is green on that exact SHA. It is intentionally **pure/non-wired**, so the current learner-facing Transfer runtime remains 38.8.
- PR #200 closed the Build 38.9 documentation checkpoint at `0d7b8a31…`; Pages #266 is green on that exact SHA.
- PR #197 merged under a documented **controlled CI-infrastructure exception** after sequential workflow-only successor-safety fixes saturated GitHub Actions. Do not rewrite that event as “the entire final-head matrix drained green before merge.” Product/runtime proof was green; new reds were classified as stale historical ownership guards; the maintenance was isolated to workflow YAML.
- The next Build 38 action is a **separate learner-placement audit for the certified 38.9 core**. Do not assign 38.10 automatically.
- Public Settings metadata remains **v2.4.0 · Build 36** by explicit runtime-version ownership; roadmap slices are not SemVer patch numbers.

## Release/version metadata policy — LOCKED

French Trân’quille must keep these concepts separate:

```text
PUBLIC RUNTIME RELEASE
  learner/admin Settings identity
  current = v2.4.0 · Build 36

PEDAGOGY BASELINE
  historical pedagogy compatibility/ownership anchor
  current = v2.3.0 · Build 34

ROADMAP CHECKPOINT
  internal implementation/certification sequence
  current accepted checkpoint = Build 38.9
```

Permanent rules:

- `37.x`, `38.x`, etc. are roadmap slices, **not SemVer patch numbers**;
- a narrow implementation slice must not silently bump public runtime metadata;
- public runtime metadata changes only in an explicit release-version slice with dedicated tests and documentation;
- the public `Build` displayed beside SemVer is the **release build anchor**, not the latest internal roadmap checkpoint;
- a DEBUG/admin surface may later expose `Roadmap checkpoint: 38.9` separately, but must not overload the public release field;
- if Build 38 eventually closes as one coherent shipped Generalization & Transfer milestone, **`v2.5.0 · Build 38` is the natural candidate**, but it is not assigned until an explicit release decision and certification.

Canonical policy document: `docs/RELEASE-VERSIONING-POLICY.md`.

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

Public runtime metadata is explicitly owned as **v2.4.0 · Build 36** until a dedicated release-version change replaces it. Build 37.x / 38.x roadmap slices do not auto-bump this value.

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

F18 remains `spoken-on = explicit / reuse-existing / lesson 52`; Build 38.9 does not create a second Foundation route for it.

---

# 7. Build 38 — Generalization & Transfer — ACTIVE

## Goal

Move from “recognize/recall known phrases and understand selected Foundations” toward **constructing unseen but valid phrases from already-known material**.

Prioritized transfer families remain directions to audit, not automatic implementation authorization:

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
status = deterministic core
persistence = ephemeral-only
masteryClaim = false
```

38.1 semantics remain locked: no hidden subject/verb expansion, no random generation and no durable/Evidence adoption.

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
```

## 38.2 — learner-facing subject substitution — CLOSED / DEPLOYED

38.2 owns placement and interaction only; it does not broaden the 38.1 matrix.

Canonical placement:

```text
lesson 33 normal content
→ existing F08 optional card
→ ONE optional subject-substitution Transfer card
→ 3 deterministic exercises
→ no mastery claim
→ return to lesson
→ normal Continue remains available
```

Learner-facing exercises:

```text
Je travaille. → Tu travailles.
J'habite ici. → Tu habites ici.
Tu aimes ça. → Elle aime ça.
```

Closeout:

```text
PR #188 MERGED
runtime commit 694988e6299c7d25ca9e019f275c473422fd983e
Pages #241 / run 31978687464 SUCCESS
post-merge: 33 SUCCESS + exactly 4 inherited failures
0 queued / 0 in-progress
```

## 38.3 — affirmation → negation core — CLOSED

Certified family:

```text
affirmation-negation-regular-er-je
```

Exact deterministic catalog:

```text
Je travaille. → Je ne travaille pas.
J'habite ici. → Je n'habite pas ici.
J'aime ça. → Je n'aime pas ça.
```

Explicit exclusions remain locked:

```text
avoir and de-after-negation article changes
pouvoir / aller / être or other irregular verbs
il y a special case
questions
spoken ne-dropping
plural transfer
futur proche transfer
agreement transfer
new vocabulary
random/adaptive generation
new learner store
durable writes
Evidence product reads
mastery claims
```

38.3 remains a pure deterministic core with no durable ownership. **Build 38.8 now consumes this certified core learner-facing; that wiring does not broaden 38.3 semantics.**

## 38.4 — present → futur proche core — CLOSED

Certified family:

```text
present-futur-proche-travailler-singular
```

Exact deterministic catalog:

```text
Je travaille.   → Je vais travailler.
Tu travailles.  → Tu vas travailler.
Il travaille.   → Il va travailler.
Elle travaille. → Elle va travailler.
```

## 38.5 — learner-facing futur proche — CLOSED / DEPLOYED

Canonical placement:

```text
lesson 35 normal content
→ existing F05 Foundation card
→ ONE optional futur-proche Transfer card
→ 3 deterministic transformations
→ return to lesson
→ normal Continue
```

Learner subset:

```text
Je travaille.   → Je vais travailler.
Tu travailles.  → Tu vas travailler.
Elle travaille. → Elle va travailler.
```

38.2 lesson-33 ownership remains unchanged; 38.5 reuses the same shared renderer rather than adding another Transfer UI.

## 38.6 — deterministic singular → plural nominal core — CLOSED

Certified family:

```text
singular-plural-regular-noun-phrases
```

Exact deterministic catalog:

```text
la gare       → les gares
la pharmacie  → les pharmacies
un billet     → des billets
une table     → des tables
```

38.6 remains deterministic/pure and uses only learner-known nouns plus the certified F01–F04 article system.

## 38.7 — learner-facing nominal plural — CLOSED / DEPLOYED

Canonical placement:

```text
lesson 13 normal content
→ existing F01–F04 Foundation card
→ ONE optional nominal-number Transfer card
→ 3 deterministic transformations
→ return to lesson
→ normal Continue
```

Learner subset:

```text
la gare    → les gares
un billet  → des billets
une table  → des tables
```

Shared-renderer contract:

```text
numberIntegration = 38.7
numberLesson = 13
numberFamily = singular-plural-regular-noun-phrases
numberExerciseIndexes = [0,2,3]
```

Closeout:

```text
PR #193 MERGED
runtime commit 1f65aa163c74f35e445a1d994346193a87a2658b
Pages #260 / run 31981783564 SUCCESS
post-merge: 33 SUCCESS + exactly 4 inherited failures
0 queued / 0 in-progress
```

38.7 preserves 38.2 lesson 33 and 38.5 lesson 35 exactly, keeps learner localStorage byte-identical, preserves installed-PWA offline parity and adds no new vocabulary or mastery claim.

## 38.8 — learner-facing negation transfer — CLOSED / DEPLOYED

38.8 exposes **only** the already-certified 38.3 core. It does not broaden negation semantics.

### Placement — lesson 34

Lessons 17–20 were deliberately rejected for this Transfer merely because F11 lives there: at that point the full regular-`-er` source scaffold used by 38.3 is not yet mature.

By the end of lesson 33, the scaffold is complete:

```text
F11 / lessons 17–20 → ne / n’ ... pas
F08 / lessons 32–33 → regular -er present consolidation
historical anchors   → J'habite... / J'aime...
38.1 / 38.2          → sentence reconstruction already certified
```

Lesson 34 is therefore the first clean learner point after that scaffold and preserves one Transfer card per lesson:

```text
lesson 13 → nominal plural Transfer
lesson 33 → subject substitution Transfer
lesson 34 → negation Transfer
lesson 35 → futur proche Transfer
```

Canonical flow:

```text
lesson 34 normal content
→ existing F05 Foundation card
→ ONE optional negation Transfer card
→ 3 deterministic 38.3 transformations
→ return focus to Transfer CTA / lesson
→ normal Continue
```

Exact learner subset:

```text
Je travaille. → Je ne travaille pas.
J'habite ici. → Je n'habite pas ici.
J'aime ça. → Je n'aime pas ça.
```

Shared-renderer contract:

```text
negationIntegration = 38.8
negationLesson = 34
negationFamily = affirmation-negation-regular-er-je
negationExerciseIndexes = [0,1,2]
```

Runtime dependency order after 38.8:

```text
Foundations
→ 38.1 subject core
→ 38.3 negation core
→ 38.4 future core
→ 38.6 number core
→ shared Transfer adapter
```

Installed-PWA precache explicitly includes the certified negation core. No PWA identity/cache-namespace migration was introduced.

38.8 exclusions remain locked:

```text
no second Transfer UI
no new negation family
no irregular verbs
no spoken ne-dropping
no new vocabulary
no random/adaptive generation
no durable write
no Evidence product read
no mastery claim
no curriculum edit
no Foundation-route change
no voice / Recovery / Premium change
```

Closeout:

```text
PR #197 MERGED
final candidate head 06fcb745edb86018294f6369fd4922abe69687f3
squash merge 3fae502dba8faee003b44c5a1b9a9cffd9affec7
Pages #263 / run 32056843564 SUCCESS on exact merge SHA
```

The final Build 38.8 tribunal certified:

```text
38.3 certified core reused unchanged
F05 predecessor/coexistence
lesson34 VI / DEBUG FR × desktop / 390×844
3 real answer clicks
return focus + normal Continue
lesson13 / 33 / 35 route identities unchanged
lesson36 no negation-route leak
localStorage byte-identical
no horizontal overflow
>=44px targets
installed-PWA negation-core precache
```

### PR #197 CI-infrastructure note

The first full PR matrix exposed eight stale predecessor **ownership guards**. Their functional/contract checks passed and they failed only because old workflows broadly prohibited successor runtime delivery changes.

Successor-safe fixes were workflow-only. They preserved each certified owner while allowing later runtime wiring outside that owner.

Before merge, actual green successor-safe executions included F11, F05, F08, F12, F13, Build 38.1 and the final-head Build 38.8 tribunal. Updated 38.4 and 38.6 workflow reruns remained queued behind the Actions fan-out; their certified core files were unchanged, previous full browser tribunals were green, and their initial #197 contract steps had passed before the obsolete guard failure.

Therefore PR #197 merged under a documented **controlled CI-infrastructure exception**. This is deliberately narrower than saying “full matrix green.” Product/runtime evidence was green and Pages subsequently deployed the exact merge SHA successfully.

## 38.9 — deterministic `nous → on` spoken-French core — CLOSED / CERTIFIED / NON-WIRED

The post-38.8 audit selected a narrow recombination already scaffolded by the live curriculum:

```text
family = nous-on-spoken-equivalence
status = pure-non-wired
persistence = ephemeral-only
masteryClaim = false
lesson 34 source scaffold = nous
lesson 52 / F18 target scaffold = spoken on meaning nous
```

Exact certified catalog:

```text
Nous travaillons. → On travaille.
Nous rentrons.    → On rentre.
Nous allons à…    → On va à…
```

Why this family was accepted:

- lesson 34 already teaches `Nous travaillons.`, `Nous rentrons.` and `Nous allons à…`;
- lesson 52 explicitly says `on` very often replaces `nous` in spoken French and takes the verb form used with `il/elle`;
- Foundations F18 already owns `spoken-on` as `explicit / reuse-existing / lesson 52`;
- therefore 38.9 recombines known structures instead of inventing a new Foundation concept or new vocabulary.

Agreement transformation was audited but not selected for this slice: the corresponding masculine source forms were not equally solid learner-facing acquisitions, so a masculine→feminine transfer risked smuggling new source material into a supposed generalization exercise.

Explicit exclusions remain locked:

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

Certification / closeout:

```text
PR #199 MERGED
candidate head e066baa3d4c481f65bb361a4406d2a861b7563f3
squash merge a33e504cdc20438c454fc365371af545ef747f0c
Build 38.9 dedicated run 32058789584 SUCCESS
full PR matrix: only the four inherited historical failures
post-merge: only the same four inherited failures
0 queued / 0 in-progress
Pages #265 / run 32059362998 SUCCESS on exact merge SHA

PR #200 MERGED — docs closeout
merge 0d7b8a31d4731024ff9e86d97e3128bad572efb3
Pages #266 / run 32059893554 SUCCESS
```

38.9 deliberately added no loader, service-worker, curriculum, shared renderer or learner-store wiring. It does **not** authorize a lesson-52 Transfer card automatically.

A future learner-facing placement must prove useful construction practice without duplicating the existing lesson/F18 teaching or overloading lesson density.

## Current learner-facing Transfer routes — LOCKED

```text
38.7 → lesson 13 / nominal plural / [0,2,3]
38.2 → lesson 33 / subject substitution / [0,2,5]
38.8 → lesson 34 / affirmation→negation / [0,1,2]
38.5 → lesson 35 / futur proche / [0,1,3]
```

There is exactly one shared Transfer renderer.

## NEXT — Build 38.9 learner-placement audit

Canonical next action:

```text
read live lesson 52 + F18 learner-facing teaching
→ test whether a construction exercise adds genuine retrieval/recombination value
→ reject placement if it merely repeats the existing explanation/examples
→ check lesson density and round-trip UX
→ preserve all existing Transfer routes
→ if useful, assign ONE separate learner-facing integration slice
→ otherwise audit at most ONE other narrow Build 38 family
```

Do not infer that lesson 52 automatically needs a new card merely because it owns `on`.

Further Build 38 families remain one-at-a-time. **Do not start Build 39 inside Build 38.**

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

Build 39 remains future work. It is **not** the next implementation slice while Build 38 still has an unresolved transfer/placement decision.

---

# 9. Build 40 — A1 Consolidation Audit

Audit real evidence before any A2 expansion.

Outcome may be:

- reinforce A1;
- internal A1+ consolidation;
- or open A2.

**A2 is not automatic.**

---

# 10. CI baseline / governance note

Exactly four historical failures remain known baseline debt unless separately repaired:

1. `Build 36.2 Evidence shadow adoption`;
2. `V2.0.0 Freeze tribunal`;
3. `Build 36.3 Recovery v3 durability tribunal`;
4. `Build 28 Data recovery smoke`.

They do not authorize ignoring a new red. Any new failure must be classified against the current candidate. Harness/runner flakes should be rerun unchanged before product mutation.

Workflow successor-safety is now a permanent governance requirement: a predecessor workflow should lock its **certified owner/contract**, not prohibit all legitimate future successor delivery elsewhere in the repository.
