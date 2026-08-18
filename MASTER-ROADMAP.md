# French Trân’quille — MASTER ROADMAP

> **Canonical current roadmap / durable handoff.**
>
> Every future AI/chat/session working on `shinobione/tran-french-teacher` must read `AGENTS.md`, then `PROJECT-STATE.md`, then this file before roadmap or implementation decisions.
>
> The previous long-form MASTER has been preserved byte-for-byte at `docs/archive/MASTER-ROADMAP-pre-39.4-closeout.md`. Historical build documents, PRs, README/changelog entries and archived roadmap versions remain evidence. This file now owns the **current durable state, execution order, locked contracts and next authorized boundaries**.

---

# 0. Canonical checkpoint — 2026-08-18

| Item | Canonical state |
|---|---|
| Accepted runtime/internal `main` | **`f662d96d55e385f3d6baa946bde8f22fd1d25f0e`** — PR #215 / Build 39.4 |
| Public application runtime metadata | **v2.5.0 · Build 38** |
| Product pedagogy baseline | **v2.3.0 · Build 34** |
| Build 38 milestone | **CLOSED / RELEASED** |
| Build 39 | **OPEN** |
| Build 39.1 | **CLOSED / CERTIFIED** — deterministic learner-action arbitration core |
| Build 39.2 | **CLOSED / CERTIFIED** — reliable Memory/Error evidence adapter |
| Build 39.3 | **CLOSED / CERTIFIED** — pure decision pipeline |
| Build 39.4 | **CLOSED / CERTIFIED** — read-only runtime snapshot collector |
| Next Build39 boundary | **39.5 audit-selected advisory-only Practice recommendation; implementation must be separate** |
| Curriculum | **52 lessons / 313 items** |
| Scenario | **44 situations / 132 turns** |
| Speaking Loop | **52/52 · max 2 moments / lesson** |
| Listening | **0.88 normal / 0.65 slow** |
| Recovery | **7 durable stores / backup v3** |
| Evidence v2 | **derived shadow only; original six source stores remain product truth** |
| Premium V5.10 | **CLOSED / physical field pass** |
| Primary field target | **iPhone / Safari / installed PWA** |

Latest exact public release proof remains GitHub Pages #272 / run `32072053127` on release SHA `2abe20511d6265d12643276f18041812fec3e715`. Build39 internal slices do not silently change public SemVer/Build metadata.

## Historical learner continuity — LOCKED

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

No future work may reset, renumber or reinterpret this state.

---

# 1. Permanent source-of-truth and workflow rules

Priority:

1. live GitHub/git, deployed runtime, CI and physical field verdicts;
2. `PROJECT-STATE.md`;
3. this `MASTER-ROADMAP.md`;
4. focused build/architecture docs;
5. README/changelog/history;
6. chat memory.

Implementation discipline:

```text
audit real owners
→ choose ONE coherent slice
→ branch from accepted main
→ implementation + dedicated tribunal
→ candidate PR
→ exact-head review
→ classify every new red
→ expected-head merge only when justified
→ verify accepted main
→ docs/governance closeout
→ only then open the next slice
```

A suspected flake is rerun **unchanged** before product mutation. Historical baselines are not rewritten merely to make CI green.

---

# 2. Permanent learner/product safety contracts

## 2.1 Voice

- no fake pronunciation score;
- speech-recognition failure is recognition-system evidence, not proof of poor pronunciation;
- own-voice replay remains local/temporary and never enters learner Memory/backups;
- automatic capture of the exact first Siri attempt remains separately field-gated.

## 2.2 Data / Recovery / Evidence

- Recovery owns **7 durable stores / backup v3**;
- Evidence v2 remains a **derived shadow**;
- original six source stores remain product truth;
- no Evidence product read-path cutover without an explicit later migration decision;
- no new durable store/schema merely to make Learner Intelligence appear smarter;
- recognition-only evidence never implies mastery/weakness.

## 2.3 Curriculum / pedagogy

- preserve 52 lesson IDs / 313 item semantics;
- Build37 Foundations ownership/routes remain historical contracts;
- Build38 deterministic core semantics and learner placements remain historical contracts;
- one shared Transfer renderer remains the owner of learner-facing Build38 construction cards;
- no hidden curriculum renumbering for convenience.

## 2.4 Navigation / Premium field contract

- ZERO competing route facades / route flash;
- atomic route ownership switch;
- stable Back/Settings ownership;
- no learner-facing diagnostic cockpit;
- Premium V5.10 field-approved navigation/identities remain protected.

## 2.5 Protected sanctuaries

Unless a later explicitly scoped build justifies otherwise:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
PWA identity/cache contract from PR #180
Build30 runtime-contracts.js / runtime-bridge.js architecture boundary
Recovery v3 seven-store ownership
backup envelope v3
Evidence derived-shadow role
original six stores as product truth
52 / 313 curriculum semantics
Premium V5.10 field-approved UI/navigation
Build37 Foundations ownership/routes
Build38 deterministic core semantics
Build38 learner-facing placements
shared Transfer renderer ownership
Learner Intelligence V1/V2 historical compatibility
Build39.1 arbitration semantics
Build39.2 evidence-source reliability boundaries
Build39.3 decision-pipeline composition contract
Build39.4 runtime-snapshot read-only contract
```

---

# 3. Closed milestone summary

## Build 35 — Memory Evidence v2 readiness — CLOSED

Deterministic Evidence projection and reversible migration planning were proved. This did **not** make Evidence product truth.

## Build 36 — Recovery v3 / Evidence derived-shadow adoption — CLOSED

Seven-store Recovery / backup v3 established while retaining the original six source stores as product truth.

## Build 37 — Foundations Core — CLOSED

Foundations were industrialized without renumbering the curriculum and without a new persistent Foundations mastery store. F16 contractions remain deferred; that does not reopen Build37.

## Build 38 — Generalization & Transfer — CLOSED / RELEASED

Certified chain:

```text
38.1 → 38.2   subject substitution       → lesson 33
38.3 → 38.8   affirmation → negation     → lesson 34
38.4 → 38.5   present → futur proche     → lesson 35
38.6 → 38.7   singular → plural nominal  → lesson 13
38.9 → 38.10  nous → spoken on           → lesson 52
```

Build38 is pedagogically complete. **38.11 is NOT AUTHORIZED.** Public release is **v2.5.0 · Build 38**.

---

# 4. Build 39 — Learner Intelligence 3 — OPEN

Goal: Tyffany chooses the most useful next action using **reliable observable evidence**, not decorative activity counts or invented mastery.

Target action families:

```text
phrase-retrieval
concept-review
foundation-capsule
listening
scenario
transfer-construction
```

Permanent rule: **absence of reliable evidence means unavailable / abstain.**

## 39.1 — learner action arbitration core — CLOSED / CERTIFIED

Owner:

```text
src/pedagogy/learner-action-arbitration-core.js
FrenchTranquilleLearnerIntelligenceV3Core
```

Properties:

- deterministic ranking;
- observed need + confidence + independent evidence required;
- recognition-failure-only candidates rejected;
- decorative activity totals ignored;
- transfer/construction needs stronger independent support;
- explicit abstention is valid.

Accepted merge: `246338a9ef11eb430f59fc6ccf494688904cf883`.

## 39.2 — learner evidence adapter — CLOSED / CERTIFIED

Owner:

```text
src/pedagogy/learner-evidence-adapter.js
FrenchTranquilleActionEvidenceAdapter
```

Reliable supported families:

```text
phrase-retrieval ← Learning Memory due/fragile + non-recognition retrieval errors
listening        ← explicit listening-* Error events
scenario         ← scenario-miss / scenario-assisted observable Error events
```

Deliberately unavailable:

```text
concept-review      → no durable concept-understanding owner
foundation-capsule  → Foundations remains ephemeral/no need evidence owner
transfer-construction → Transfer remains ephemeral/no durable evidence owner
```

Accepted merge: `9af287417d1fbb502837bea4aa80886cca2ffb2e`.

## 39.3 — learner action decision pipeline — CLOSED / CERTIFIED

Owner:

```text
src/pedagogy/learner-action-decision-pipeline.js
FrenchTranquilleLearnerActionDecisionPipeline
```

Certified composition:

```text
caller snapshots
→ 39.2 adapter
→ 39.1 arbitration
→ reliable selected action OR explicit abstention
```

No storage reads/writes, no Evidence cutover and no learner-facing action execution.

Accepted merge: `c809790453a40ae5e2da3a497e3b64b7a51e5d87`.

## 39.4 — read-only runtime snapshot collector — CLOSED / CERTIFIED

Accepted merge:

```text
f662d96d55e385f3d6baa946bde8f22fd1d25f0e
```

Owner/API:

```text
src/pedagogy/learner-action-runtime-snapshot.js
FrenchTranquilleLearnerActionRuntimeSnapshot

status()
collect()
decide()
```

Runtime flow:

```text
FrenchTranquilleMemory.summary()
+
FrenchTranquilleErrors.summary()
        ↓
narrow detached deeply-frozen snapshot
        ↓
39.3 decision pipeline
        ↓
reliable decision OR abstention
```

Narrow copied data only:

```text
Memory.entries[] → id / attempts
Memory.due[]     → id
Memory.fragile[] → id

Errors.top[]     → item.id / score / dominant / entry.id / lastType / events(type,source)
Errors.recent[]  → id / type / source / repeated
```

39.4 loads 39.1→39.4 in current runtime order and pre-caches the chain for PWA use, but:

- no `decide()` at boot;
- no direct storage access in collector;
- no durable write;
- no new schema/store/migration;
- no direct Listening/Scenario/Foundation/Transfer owner reads;
- no Evidence product read cutover;
- no learner-facing route/action execution;
- public metadata remains `v2.5.0 · Build 38`.

Final exact-head PR matrix returned to **exactly the five inherited failures**, with dedicated 39.4, runtime metadata, Release v2.5, Build38.10, Build31/32 and 39.1/39.2/39.3 green. Build26.4 also passed unchanged on the final head.

The runtime-version metadata workflow exposed one historical successor-safety bug during #215: its old release guard globally forbade any future `sw.js` diff. The guard is now scoped to the historical release branch while all static `v2.5.0 · Build 38` assertions and the real Chrome Settings/version tribunal remain active.

---

# 5. Build 39.5 — advisory-only Practice recommendation — AUDITED / NEXT IMPLEMENTATION SLICE

## Audit verdict

The existing learner Practice overlay already has four stable actions and an existing **“Conseillé maintenant”** presentation slot:

```text
Parler
Écouter
Réviser
Dans la vraie vie
```

Current Build27 logic still chooses that badge with a coarse local heuristic:

```text
review due > 0  → Réviser conseillé
otherwise       → Parler conseillé
```

That heuristic predates LI3 and ignores the certified listening/scenario evidence now available through 39.1→39.4.

The safest first learner-facing LI3 slice is therefore **advisory only**:

```text
user explicitly opens Pratiquer
→ 39.4 decide()
→ map supported action family to an EXISTING Practice action
→ show at most one existing “Conseillé maintenant” badge
→ user still chooses/clicks manually
```

Canonical mapping:

```text
phrase-retrieval → review
listening        → listening
scenario         → real-life
selected = null  → no LI3 recommendation badge
unsupported family → no recommendation badge
```

There is deliberately **no mapping to Parler/conversation** yet because 39.2 exposes no reliable conversation/free-voice need family.

## 39.5 mandatory boundaries

- recommendation is computed only after the learner explicitly opens Practice; no decision at app boot;
- no automatic navigation or action execution;
- no replacement of the learner’s manual choice;
- no new durable write/store/schema;
- no Evidence read cutover;
- no new concept/Foundation/Transfer evidence;
- no recommendation from recognition-only failures;
- no fallback “Parler” recommendation when LI3 abstains;
- no Daily Coach rewrite in the same slice;
- preserve existing Practice action labels, routes, accessibility and Premium geometry;
- preserve all seven durable stores byte-identical across opening Practice and rendering the advisory;
- preserve historical learner continuity;
- public runtime metadata remains `v2.5.0 · Build 38`.

## Required 39.5 tribunal

Real browser, desktop + iPhone-size, VI + DEBUG FR as appropriate:

```text
retrieval evidence → only Réviser has “Conseillé maintenant”
listening evidence → only Écouter has the badge
scenario evidence → only Dans la vraie vie has the badge
recognition-only evidence → no badge
empty/unsupported evidence → no badge
opening Practice does not navigate automatically
manual click still reaches the same historical route
7 durable stores unchanged
7 completed / l8=4 / 40 known preserved
no horizontal overflow / existing touch targets preserved
```

Implementation should remain one separately reviewed slice. Do **not** bundle Daily Coach/home recommendation changes into 39.5.

---

# 6. Later Build39 work — NOT YET AUTHORIZED

After 39.5 is closed, audit separately before implementation:

- whether Home/Daily Coach should consume LI3 advice;
- whether any reliable evidence owner can support `concept-review`;
- whether Foundations should ever gain a trustworthy need signal without creating fake mastery;
- whether Transfer/construction evidence deserves a durable owner and what that would imply for Recovery/backup migrations;
- whether a future conversation/free-voice need family is justified by observable evidence.

Do not create persistence merely to make all six target families available.

---

# 7. Build 40 — A1 Consolidation Audit — FUTURE GATE

Build40 remains the milestone audit after Build39 is coherently closed.

It must answer from real product evidence:

- what A1 coverage is solid;
- what is phrase recognition vs reusable construction;
- where listening/scenario/retrieval weaknesses remain;
- whether Foundations/Transfer need more work;
- whether the product should consolidate A1, move to internal A1+, or open an A2 phase.

**No A2 roadmap is authorized before Build40.**

---

# 8. CI baseline

Known persistent inherited failures:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Build26.4 is a classified runner/harness flake, not standing debt. Build37.4 and Premium V5.9C also have documented historical Chrome/runner flake classifications after unchanged rerun success.

Any other failure is **NEW until classified**.

---

# 9. NEXT

```text
finish Build39.4 docs/governance closeout
→ verify main + 0 open PRs
→ open Build39.5 as a separate advisory-only Practice recommendation slice
→ dedicated exact-head tribunal
→ no auto-route, no persistence, no invented evidence
→ close 39.5 before considering Home/Daily Coach or new evidence families
```
