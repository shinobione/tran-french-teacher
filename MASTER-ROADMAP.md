# French Trân’quille — MASTER ROADMAP

> **Canonical project handoff / source of truth.**
>
> Any future AI/chat/session working on `shinobione/tran-french-teacher` **must read `AGENTS.md`, then `PROJECT-STATE.md`, then this file before making roadmap or implementation decisions**.
>
> Historical build documents remain useful evidence. This file owns durable execution order, locked product decisions, human field verdicts and future build gates.

---

# 0. Canonical checkpoint — 2026-08-16

## Current line

| Item | Canonical state |
|---|---|
| Product pedagogy | **V2.3.0 · Build 34** |
| Visual maintenance line | **Premium V5.10 CLOSED · physical FIELD PASS** |
| Verified final V5.10 runtime checkpoint | **`54209392d3a349a1aefab14615dcecf24a59fcea`** — PR #161 |
| Curriculum | **52 lessons / 313 items** |
| Scenario | **44 situations / 132 turns** |
| Speaking Loop | **52/52 · max 2 moments / lesson** |
| Listening | **0.88 normal / 0.65 slow** |
| Durable pedagogical stores | **6 current runtime stores** |
| Foundations | **F01–F04 pilot**, without renumbering the 52 lessons |
| Frozen architecture baseline | **2.0.0 · Build 30** |
| Primary target | **iPhone / Safari / installed PWA** |
| Recurring backend/API cost | **0 €** |
| Final Premium issue | **#114 — CLOSED / completed** |
| Build 35 | **CLOSED · migration readiness proven** |
| Build 36 | **UNBLOCKED · NEXT CANONICAL BUILD — Memory Evidence v2 Adoption Candidate** |

## Current interpretation

- V5.6 asset candidates were produced and user-approved.
- V5.7 four-theme Premium artwork integration was user-approved, merged and delivered.
- V5.8 DEBUG FR / theme decoupling was merged as PR #128.
- V5.9 shared-system coherence was implemented as real rollback checkpoints **#137 → #141** and is technically closed.
- V5.10 completed the full global/physical Premium gate, including later field fixes for destination identity, lesson/Tyffany ownership and the Settings Theme interaction.
- Final runtime-bearing Premium checkpoint is **PR #161 / `54209392d3a349a1aefab14615dcecf24a59fcea`**.
- PR #161 passed **44/44** pull-request workflows; the runtime passed **29/29** push workflows; **GitHub Pages #214** succeeded on the exact runtime SHA.
- On **2026-08-16**, the user gave the explicit physical verdict: **`ça a l'air OK, TEST SMOKED`**.
- That verdict is the canonical V5.10 **FIELD PASS**. Issue **#114 is CLOSED**.
- Build 35 then completed its reserved **Memory Evidence v2 / Migration Readiness** scope without adopting a new durable schema: deterministic projection in PR #164, isolated transactional migration proof in PR #165, and closeout/adoption-readiness contract in PR #166.
- Build 35 closeout is certified on **`1e3209d70cd9eebc3eb7dd4bb8df6047d9d029a7`** with **32/32 push workflows**, **0 failure**, and **GitHub Pages #219 SUCCESS**.
- **Build 36 is now the next canonical build**, beginning with **36.1 — Recovery v3 + seventh-store contract**. Initial Evidence v2 adoption must be a derived shadow store; no product read-path cutover is allowed in 36.1.

---

# 1. Locked behaviour — do not regress while polishing

## 1.1 Atomic navigation / zero flash

Physical field contract:

**ZERO route flash / ZERO remANENCE / ZERO competing facades.**

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

## 1.4 Settings hierarchy

Learner-facing Settings stays human and compact.

Priority:

1. Theme / appearance;
2. About / privacy / rights;
3. Data & Recovery via progressive disclosure.

Technical diagnostics belong to DEBUG/admin surfaces, not Trân’s normal learner UI.

## 1.5 Learner / pedagogy safety

Visual work must not silently alter:

- learner stores;
- lesson IDs;
- pedagogy;
- Scenario/Listening/Memory semantics;
- voice/audio semantics;
- migration contracts.

---

# 2. Canonical Premium sequence

```text
V5.5 stable structural base ✅
→ V5.6 Premium Visual Identity Assets ✅
→ V5.7 Original Theme Parity + Theme Art Integration ✅
→ V5.8 DEBUG FR / Theme Decoupling ✅
→ V5.9 Shared UI Coherence + Fluidity / Premium Feel ✅
→ V5.10 Global Visual QA + Physical installed-PWA verdict ✅ FIELD PASS
→ V2.3.x / Build 34 governance + documentation closure ✅
→ issue #114 CLOSED after explicit user PASS ✅
→ Build 35 Memory Evidence v2 / Migration Readiness ✅ CLOSED
→ Build 36 Memory Evidence v2 Adoption Candidate **← NEXT CANONICAL BUILD**
→ Build 37 Foundations Core
→ Build 38 Generalization & Transfer
→ Build 39 Learner Intelligence 3
→ Build 40 A1 Consolidation Audit
→ A2 only after Build 40 decision
```

All V5.6→V5.10 work remains part of the **Build 34 maintenance line** historically.

**Do not steal Build 35 for CSS, imagery, animation, cache work, DEBUG FR, icon work or visual QA.** Concrete visual regressions remain maintenance defects and do not redefine the Build 35 scope.

---

# 3. V5.6 — Premium Visual Identity Assets — CLOSED

## Canonical full-background assets

```text
assets/premium/themes/aurora/background.webp
assets/premium/themes/sunset/background.webp
assets/premium/themes/nocturne/background.webp
assets/premium/themes/original/background-v2.png
```

User-locked directions:

- **Aurora** — blue / cyan / violet / pink Paris night;
- **Sunset** — orange / coral / violet Paris sunset;
- **Nocturne** — dark jade / teal / gold Paris night.

Do not silently regenerate those three backgrounds.

Original direction:

- deep midnight navy / indigo;
- cold cyan / cobalt light;
- silver/blue-white highlights;
- violet/magenta only as restrained accents;
- elegant dark Paris night;
- premium depth from light/material/contrast, not brightness;
- no Aurora-like pink wash.

The first Original candidate was rejected as too bright / too Aurora-like. The corrected dark V2 candidate was user-approved.

## Lesson-card Eiffel assets

First-generation opaque rectangular `lesson-eiffel.webp` files are rejection evidence only.

Approved V2 assets:

```text
assets/premium/themes/aurora/lesson-eiffel-v2.png
assets/premium/themes/sunset/lesson-eiffel-v2.png
assets/premium/themes/nocturne/lesson-eiffel-v2.png
assets/premium/themes/original/lesson-eiffel-v2.png
```

Contract:

- genuine alpha transparency;
- no opaque rectangular sky;
- no baked card/UI/text;
- generous transparent margins;
- Eiffel as primary silhouette;
- theme-specific lighting;
- suitable for absolute decorative placement, cropping and masking.

V5.6 user PASS: **2026-08-15**.

---

# 4. V5.7 — Four-theme Premium Art Integration — CLOSED

New permanent rule:

> **Original must reach the same Premium quality level as Aurora, Sunset and Nocturne.**

All four themes are first-class identities.

## Shared integration contract

For each theme:

- use its canonical background asset;
- preserve readable card/text contrast;
- no aggressive blur that destroys artwork;
- no giant dead zones;
- desktop must be composed, not simply stretched mobile;
- correct lesson Eiffel asset must appear where the lesson hero expects it;
- art remains decorative and must never obscure lesson title, progress, badge or CTA;
- service-worker/offline asset generation stays coherent.

V5.7 user visual PASS: **2026-08-15**.

The complete installed-PWA Premium package later received its final V5.10 FIELD PASS on **2026-08-16**.

---

# 5. V5.8 — DEBUG FR / Theme Decoupling — CLOSED

## Canonical model

```text
theme = visual preference
debugFr = admin/debug preference

theme must never own debugFr
debugFr must never force theme
```

Permanent behaviour:

- DEBUG FR can coexist with Original, Aurora, Sunset or Nocturne;
- switching theme preserves DEBUG state;
- switching DEBUG preserves theme;
- normal learner mode hides diagnostics;
- toggling DEBUG must not modify learner progress, Memory, Scenario, Listening, Error or other durable learner stores.

PR #128 merged at verified checkpoint:

**`bf196a101e9d444650390e94a9ba8adf5f19009c`**.

V5.8 solved the **state ownership** problem. V5.9 later owned the quality of the **admin entry/access affordance**.

---

# 6. V5.9 — Shared UI Coherence + Fluidity / Premium Feel — TECHNICALLY CLOSED

## 6.0 Technical closeout — 2026-08-15

V5.9 is **technically closed by automated QA**. Its successor V5.10 later received the required physical installed-PWA user verdict on 2026-08-16.

Real independently revertable checkpoint chain:

```text
V5.9A interactions / ownership
PR #137 → 7176b8e53808a6178ac935ddba6da372b26b37f6

V5.9B shared Lesson/Eiffel layout
PR #138 → 89a5a4892a2ab3f89524f18cd4aa0ee0f6a56e6e

V5.9C shared Premium system + hidden DEBUG
PR #139 → 2a2e845ea4fe144aae3a62a98f301539a8d2d989

V5.9D goat brand icons + PWA wiring
PR #140 → ef0449b704b2eb130a3550d162433b27e248a86f

V5.9E global technical QA
PR #141 → 6477e980ea21f087a9d30a260dbe4630484e4b36
```

The earlier scaffold-only PRs **#130–#134 are not product checkpoints**; that false attempt was tree-rolled back before the real chain above.

V5.9E clean candidate passed the complete historical workflow suite. Its global proof covers A+B+C+D together, real-app four-theme travel, six learner stores unchanged, the shared Lesson/Eiffel geometry at all five target viewports, reduced-motion, no learner-shell boot error, and deterministic same-browser Service-Worker-controlled offline PWA boot via Chrome DevTools Protocol.

Resolved implementation map:

- duplicate Speaking self-record ownership → **V5.9A**;
- whole-card `Giới thiệu` hit target → **V5.9A**;
- shared Premium Real Life icon → **V5.9A**;
- one cross-theme Lesson/Eiffel geometry → **V5.9B**;
- shared button/card/interaction grammar + discreet cross-theme DEBUG entry → **V5.9C**;
- goat favicon / Apple Touch / PWA any + maskable identity and offline wiring → **V5.9D**;
- aggregate technical tribunal + deterministic PWA offline harness → **V5.9E**.

Historical next step from V5.9 was V5.10 physical validation. That gate is complete; Build 35 migration readiness is also now closed, and the current next build is Build 36.

## Goal

Move from “good themed app” to a coherent mockup-family product system.

This phase combines:

- concrete field defects found on real screens;
- shared component/layout coherence;
- premium button/card/icon language;
- restrained local interaction feel;
- cleaner DEBUG/admin access.

**It must solve shared-system causes first. Do not patch four themes independently unless a true art-direction difference requires it.**

## 6.1 Field defects to resolve

### A. Speaking Loop duplicate CTA

Observed in lesson speaking UI on the real app:

- same self-record CTA displayed twice;
- local-device/non-progress note duplicated.

Final contract:

```text
one model phrase
→ one self-record CTA
→ one local-device explanatory note
```

No duplicate control or explanatory copy.

### B. Settings `Giới thiệu` / About hit target

Observed behaviour:

- card itself does not navigate reliably;
- user must tap the chevron/arrow.

Final contract:

> **The entire navigation card is clickable/tappable. The chevron is a visual affordance only.**

Apply this rule consistently to same-family navigation cards.

### C. `Tình huống thực tế` / Real Life icon quality

Current icon is visually inconsistent with the Premium icon family.

Required direction:

- cleaner premium symbol;
- coherent stroke/shape/weight with other Practice icons;
- no isolated clipart-like treatment;
- clear at mobile size;
- one shared component treatment across themes.

### D. Lesson identity cluster overlaps Eiffel art

Observed on some themes: the lesson icon/identity area conflicts with the Eiffel artwork.

Canonical structural reference is the stronger Sunset-style composition:

```text
lesson identity cluster / badge
→ predictable shared zone

lesson title / copy / progress / CTA
→ protected content zone

Eiffel artwork
→ opposite/right decorative zone
→ may crop at card edge
→ never owns the identity cluster
→ never obscures CTA/title/progress
```

**One cross-theme Today/Lesson hero layout contract must solve this.**

Do not hand-position the cluster separately for Original, Aurora, Sunset and Nocturne.

## 6.2 Shared lesson-card layout contract

Theme may change:

- background artwork;
- Eiffel artwork;
- palette;
- restrained glow/accent treatment.

Theme should not change without reason:

- semantic placement of lesson identity;
- content hierarchy;
- CTA location family;
- badge/identity ownership;
- hit targets;
- responsive breakpoints;
- basic component geometry.

The layout must be certified at least at:

```text
390×844
430×932
768×1024
1280×800
1440×900
```

## 6.3 Buttons / cards — mockup-level design grammar

The remaining gap is not one bad button. It is the **shared visual language**.

V5.9 must consolidate:

- CTA heights and touch targets;
- radii;
- borders / inner highlights;
- glass/material hierarchy;
- card depth;
- icon circles;
- spacing / rhythm;
- chevrons;
- restrained glow;
- press / hover / focus-visible / active states;
- contrast across all four themes;
- same component family across Home / Practice / Progress / Listening / Settings.

“Glassmorphism” alone is not Premium. Mockup fidelity includes composition, proportion, density, hierarchy and interaction feel.

## 6.4 App / favicon / PWA icon direction

Current favicon/app icon is visually off-brand against the Premium UI.

Future replacement direction:

- simplified French Trân’quille / goat-derived brand mark;
- readable at favicon size;
- works as Apple Touch / PWA icon;
- high contrast and simple silhouette;
- visually related to Home branding;
- no tiny illustration detail that collapses at 16–32 px.

Current protected `assets/Favicon.png` must not be replaced silently.

If this replacement is included in V5.9, it must be an explicit asset/runtime change with:

- source/master recorded under assets;
- favicon + Apple Touch + PWA sizes derived coherently;
- manifest/index references verified;
- service-worker/cache generation updated;
- installed-PWA/offline checks included.

If the asset is not ready, document the contract and defer the actual replacement rather than inventing a rushed icon.

## 6.5 DEBUG/admin entry after V5.8

State ownership is already solved by V5.8.

Remaining UX requirement:

- access DEBUG/admin under **all four themes**;
- keep it out of Trân’s normal learner experience;
- avoid a large obvious learner-facing DEBUG control;
- prefer a discreet admin-only affordance/gesture/hidden entry;
- emergency URL/debug entry may remain;
- entry method must be documented and discoverable to maintainers;
- no change of DEBUG state may change theme and vice versa.

## 6.6 Motion / fluidity

### Forbidden

```text
old page fades out
while
new page fades in
```

### Allowed

```text
atomic owner switch
→ one facade only
→ local settled-owner polish
```

Premium feel may come from:

- tactile press compression;
- button highlight/glow response;
- coherent active-nav motion;
- card hover on desktop;
- tiny chevron movement;
- sheet / About / Recovery open-close polish;
- success check/pulse;
- progress movement;
- theme selection feedback;
- coherent focus-visible states.

Motion must be short, restrained, interruptible and optional under `prefers-reduced-motion`.

## 6.7 V5.9 Definition of Done

- [x] Speaking block exposes one self-record CTA and one note only.
- [x] `Giới thiệu` / About whole-card hit target works.
- [x] Real Life icon belongs to the shared Premium icon family.
- [x] One shared cross-theme lesson-card layout contract is implemented.
- [x] No lesson identity / Eiffel overlap in any theme at target viewports.
- [x] Buttons/cards visibly converge toward the approved mockup family.
- [x] DEBUG/admin entry works on all themes and remains discreet in learner mode.
- [x] Local interaction feel is smoother without route crossfades.
- [x] Reduced-motion keeps full functionality.
- [x] Navigation/audio/learner-store guards remain green.
- [x] V5.9 candidate is materialized in git and a PR is opened.
- [x] **Coding agent STOPS at candidate PR unless explicitly instructed otherwise.**

## 6.8 V5.9 execution policy

The coding-agent session must end at the candidate PR.

```text
read canonical state
→ implement V5.9 only
→ local/browser proof
→ materialize commit(s)
→ open candidate PR
→ update candidate checkpoint
→ STOP
```

Do not spend coding-model quota:

- polling all GitHub Actions;
- waiting for unrelated historical Chrome smokes;
- rerunning known flakes;
- merging;
- watching Pages;
- automatically starting V5.10.

Those are a separate control/review step unless explicitly delegated.

---

# 7. V5.10 — Final Premium QA / Physical gate — CLOSED · FIELD PASS

V5.10 is the completed closure gate for Premium issue #114.

The phase combined automated global QA with physical installed-PWA human validation. Automation alone was never sufficient; the final field verdict was supplied by the user on **2026-08-16**.

## Automated matrix

Minimum:

```text
5 viewports
× 4 themes
× Home / Progress / Practice / Listening / Settings
```

Plus targeted captures/tests for:

- Review;
- Speak;
- Listen sub-practice;
- Real Life;
- lesson view with theme-specific Eiffel art;
- About;
- Data & Recovery compact/expanded;
- DEBUG/admin entry on all 4 themes;
- reduced-motion;
- app/fav/PWA icon if replaced in V5.9.

Assertions:

- exact requested theme active;
- correct background asset loaded;
- correct lesson asset loaded;
- no horizontal overflow;
- Back/Settings geometry consistent;
- A0 → line → A1 intact;
- no legacy Eiffel placeholder;
- no technical cards in learner mode;
- Original is not visually downgraded;
- no learner-store mutations during pure UI travel;
- online/offline PWA generations resolve the same asset set;
- whole-card hit targets behave consistently;
- no duplicate Speaking CTA;
- no lesson identity / Eiffel overlap.

Later V5.10 field closeout also permanently guards:

- approved Practice artwork propagation into destination Feature Headers;
- `Conversation` = Real-Life, never Speak;
- canonical lesson icon ownership versus Tyffany tutor/voice ownership;
- Settings Theme disclosure through **real user-style clicks after route churn/remount**;
- zero competing Theme owners/hit targets.

## Human / physical gate — PASSED

The canonical installed-PWA review path included:

```text
close app
→ reopen without deleting data
→ theme travel
→ Today / lesson
→ Practice / Review / Speak / Listen / Real Life
→ Progress / Listening
→ Settings / Theme / About / Recovery
→ normal navigation churn
→ return Home
```

Human checks included:

- ZERO flash/remanence;
- artwork actually looks Premium;
- Original belongs to the same quality family;
- Eiffel art reads as integrated decoration, not a pasted image;
- buttons/cards/chrome feel coherent with mockups;
- screens feel fluid rather than abrupt;
- no unreadable text over imagery;
- no awkward real-device crop;
- no duplicated speaking control;
- admin access is available but not intrusive;
- Theme remains tappable after navigation / lesson usage.

Final physical verdict:

```text
2026-08-16
user → “ça a l'air OK, TEST SMOKED”
```

This is the explicit final Premium **FIELD PASS** required by the gate.

## Closure evidence — SATISFIED

1. final runtime-bearing checkpoint recorded: **PR #161 / `54209392d3a349a1aefab14615dcecf24a59fcea`**;
2. PR #161: **44/44 SUCCESS**;
3. main runtime: **29/29 SUCCESS**, zero failure/queued/in-progress at closeout;
4. GitHub Pages **#214 SUCCESS** on exact runtime SHA;
5. physical verdict recorded above;
6. PROJECT-STATE / MASTER ROADMAP reconciled;
7. issue **#114 CLOSED / completed**;
8. Build 35 was unblocked by this field PASS and has since completed/closed its migration-readiness scope.

Future visual defects may be fixed as maintenance regressions, but V5.10 must not be silently reopened or Build 35 repurposed for Premium polish.

---

# 8. Protected sanctuaries and non-regression contracts

Unless an explicitly scoped future build justifies otherwise:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

Historical learner continuity remains a release contract:

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

Future curriculum growth must not rewrite historical IDs merely for neatness.

Voice rules remain:

- no fake pronunciation score;
- speech-recognition miss is recognition-system evidence, not proof of poor pronunciation;
- own-voice replay remains temporary/local;
- replay audio never enters learner Memory/backups;
- automatic capture of the exact first Siri attempt remains gated by real iPhone validation.

---

# 9. Build 35 → Build 40 — pedagogical roadmap preserved

Premium work must not erase the post-Build34 pedagogy sequence.

## Build 35 — Memory Evidence v2 / Migration Readiness — CLOSED

**Design and simulation first. No durable adoption inside Build 35.**

Build 35 became eligible only after the explicit V5.10 FIELD PASS and issue #114 closure on **2026-08-16**. Its scope was reserved for Memory Evidence v2 / migration readiness; it was not a continuation of Premium visual polish.

Evidence dimensions:

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

Evidence states to distinguish:

- exposure;
- assisted success;
- autonomous recall;
- contextual reuse;
- concept understanding;
- novel construction / transfer.

Mandatory migration proof:

```text
pre-migration snapshot
→ source validation
→ deterministic transform
→ simulated transactional write
→ reread
→ compare
→ rollback
→ quarantine invalid data
→ old backup compatibility
→ historical learner smoke
→ real browser proof
```

Build 35 Definition of Done:

- evidence model useful;
- ownership clear;
- bounded history clear;
- compatibility strategy clear;
- migration simulable and reversible;
- **no new durable schema adopted yet**.

### Build 35 certified evidence

```text
35.1 · PR #164
→ deterministic Evidence v2 projection
→ main 68b24c8a541992085309bc4a53f46e3a0f21eb97
→ 30/30 push workflows · 0 failure
→ Pages #217 SUCCESS

35.2 · PR #165
→ isolated transactional write/reread/compare/rollback simulation
→ PR 45/45 · 0 failure
→ main c972bdc44d272c30601d73509c6e8a39c72f57cf
→ 31/31 push workflows · 0 failure
→ Pages #218 SUCCESS

closeout · PR #166
→ explicit Build 36 adoption-readiness contract
→ PR 46/46 · 0 failure
→ main 1e3209d70cd9eebc3eb7dd4bb8df6047d9d029a7
→ 32/32 push workflows · 0 failure
→ Pages #219 SUCCESS
```

Build 35 therefore closes with the six existing durable stores and backup envelope v2 still intact. The proposed `french-tranquille:memory-evidence:v2` key is not runtime-wired or persisted by Build 35.

## Build 36 — Memory Evidence v2 Adoption Candidate — NEXT / UNBLOCKED

Build 36 is now allowed because Build 35 migration proof is complete and certified.

Initial adoption contract:

> **Evidence v2 enters first as a derived shadow store. The existing six stores remain canonical for current product behaviour until a later explicit read-path decision.**

Required adoption sequence:

```text
36.1 Recovery v3 + seventh-store contract
→ 36.2 Evidence shadow adoption runtime
→ 36.3 backup / restore / reset / rollback browser tribunal
```

### Build 36.1 — canonical next slice

Recovery/backup design only before live Evidence persistence:

- add the Evidence v2 seventh-store validator/contract;
- target Recovery store set: learner, memory, errors, scenarios, listening, milestones, evidence;
- bump backup envelope **v2 → v3** rather than silently redefining v2;
- define v1/v2/v3 migration ownership explicitly;
- distinguish historical missing stores from derived stores requiring rebuild, using semantics such as `preserveMissingIds` and `rebuildDerivedIds`;
- preserve all six current store schemas and current product writers;
- prove planning/normalization/restore semantics in pure tests;
- **no live Evidence store write and no product read-path cutover in 36.1**.

Locked old-backup semantics:

```text
v3
→ owns seven stores directly

v2
→ owns the historical six stores
→ rebuild Evidence from the restored six
→ never preserve a newer device's Evidence shadow

v1
→ owns learner + memory
→ preserve historically absent errors/scenarios/listening/milestones
→ do not preserve Evidence
→ rebuild Evidence from the resulting six-store target
```

Build 36 adoption/rollback details are locked in `docs/BUILD-35-CLOSEOUT-ADOPTION-READINESS.md`.

## Build 37 — Foundations Core

Industrialize the validated Foundations syllabus without renumbering the 52 core lessons.

## Build 38 — Generalization & Transfer

Prioritize construction of unseen phrases:

- singular → plural;
- subject substitution;
- affirmation → negation;
- present → futur proche;
- agreement transformations;
- recombination across known vocabulary/structures.

## Build 39 — Learner Intelligence 3

Tyffany chooses whether the next useful action is:

- phrase retrieval;
- concept review;
- foundation capsule;
- listening;
- scenario;
- transfer/construction.

## Build 40 — A1 Consolidation Audit

Audit real evidence before any A2 expansion.

Outcome may be:

- reinforce A1;
- internal A1+ consolidation;
- or open A2.

**A2 is not automatic.**

---

# 10. Parallel maintenance tracks — no build-number theft

These continue when needed:

- iPhone/Safari/PWA compatibility;
- accessibility;
- safe-area and target sizing;
- offline/service-worker correctness;
- performance;
- Recovery/backup reliability;
- CI flake hardening that does not weaken assertions;
- documentation/governance.

These tracks must not become excuses to rewrite pedagogical architecture or consume reserved build numbers.

---

# 11. Premium asset inventory / status semantics

Canonical Premium asset manifest:

```text
assets/premium/README.md
```

Status semantics:

- **LOCKED** = explicitly selected by the user; do not regenerate silently.
- **CANDIDATE** = generated and preserved; can be replaced only after human comparison.
- **APPROVED** = explicitly accepted for integration; not yet necessarily wired/field-tested.
- **WIRED** = runtime actually uses the asset.
- **FIELD PASS** = physically validated on the installed iPhone/PWA.

Future sessions must inspect the asset manifest before generating replacements.

---

# 12. Next-agent checklist

Before touching runtime:

1. read `AGENTS.md`;
2. read `PROJECT-STATE.md`;
3. read the Build 35 closeout and Build 36 sections here;
4. inspect current `main`, open PRs and confirm issue #114 remains closed;
5. verify the currently deployed Pages SHA when runtime work is involved;
6. do not assume an old chat checkpoint is current;
7. Build 35 is closed; do not reopen or repurpose it for visual maintenance;
8. do not regenerate locked backgrounds;
9. preserve zero-flash atomic ownership;
10. keep DEBUG independent from theme;
11. preserve the accepted Premium identity/Feature Header/lesson/Tyffany/Theme contracts while doing pedagogy work;
12. materialize work in git before treating it as project state;
13. Build 36 must begin with **36.1 Recovery v3 + seventh-store contract**, not direct runtime adoption;
14. Evidence v2 must initially be a derived shadow store and the current six sources remain canonical for product behaviour;
15. backup v3 / v1-v2-v3 restore ownership must be proven before 36.2 runtime persistence;
16. never declare a future physical/device gate complete from automation alone.

---

# Canonical one-line order

> **Premium V5.10 FIELD PASS → #114 CLOSED → Build 35 Memory Evidence v2 / Migration Readiness CLOSED → Build 36 Memory Evidence v2 Adoption Candidate NEXT (36.1 Recovery v3 first) → Builds 37–40 → A2 only after Build 40 decision.**
