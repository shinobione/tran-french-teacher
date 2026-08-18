# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-18

## Canonical accepted main

- Repository: `shinobione/tran-french-teacher`
- Accepted runtime/internal `main`: **`f662d96d55e385f3d6baa946bde8f22fd1d25f0e`**
- Commit: `Build 39.4: read-only runtime snapshot collector`
- PR **#215 — MERGED** from exact final head **`92f5f76e97cb833df4d827fa7808ff368276148c`** with expected-head squash protection.
- Parent: `9c5c75c4adf7c35eaf4b4c8331af24e1efb79d7c` — PR #214 docs/governance reconciliation.
- Merge commit is GitHub **verified / valid**.
- Immediately after merge, `main` was re-read and matched exactly `f662d96d...`; open PR search returned **0 open PRs** before this docs closeout branch.
- Public runtime release remains **v2.5.0 · Build 38**.
- Pedagogy baseline remains **v2.3.0 · Build 34**.
- Latest exact public release deployment proof remains **GitHub Pages #272 / run `32072053127` — SUCCESS** on release SHA `2abe20511d6265d12643276f18041812fec3e715`, deployment `5951805479 — SUCCESS` on that same SHA.

## Accepted product state

```text
Public runtime          v2.5.0 · Build 38
Pedagogy baseline       v2.3.0 · Build 34
Curriculum              52 lessons / 313 items
Scenario                44 situations / 132 turns
Speaking Loop           52/52 · max 2 moments / lesson
Listening               0.88 normal / 0.65 slow
Recovery                7 durable stores / backup v3
Evidence v2             derived shadow only
Original six stores     product truth
Premium V5.10           CLOSED / physical field pass
Primary field target    iPhone / Safari / installed PWA
```

## Historical learner continuity — LOCKED

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

No Build39 work may reset, renumber or reinterpret this state.

## Build 38 — CLOSED / RELEASED

```text
38.1 → 38.2   subject substitution       → lesson 33
38.3 → 38.8   affirmation → negation     → lesson 34
38.4 → 38.5   present → futur proche     → lesson 35
38.6 → 38.7   singular → plural nominal  → lesson 13
38.9 → 38.10  nous → spoken on           → lesson 52
```

- Build38 milestone: **PEDAGOGICALLY COMPLETE / CLOSED / RELEASED**
- Build38.11: **NOT AUTHORIZED**
- public release: **v2.5.0 · Build 38**

## Build 39 — Learner Intelligence 3 — OPEN

Target families:

```text
phrase-retrieval
concept-review
foundation-capsule
listening
scenario
transfer-construction
```

Permanent rule: consume reliable observable evidence only. Absence of evidence means unavailable / abstain. Recognition-only failures and decorative activity totals do not become mastery/weakness.

### 39.1 — arbitration core — CLOSED / CERTIFIED

- merge: `246338a9ef11eb430f59fc6ccf494688904cf883`
- owner: `src/pedagogy/learner-action-arbitration-core.js`
- API: `FrenchTranquilleLearnerIntelligenceV3Core`
- pure, deterministic, no storage.

### 39.2 — evidence adapter — CLOSED / CERTIFIED

- merge: `9af287417d1fbb502837bea4aa80886cca2ffb2e`
- owner: `src/pedagogy/learner-evidence-adapter.js`
- reliable supported needs today:
  - phrase retrieval via Memory due/fragile + trustworthy retrieval errors;
  - listening via explicit `listening-*` Error events;
  - scenario via `scenario-miss` / `scenario-assisted` Error events.
- deliberately unavailable:
  - `concept-review` — no durable concept-understanding owner;
  - `foundation-capsule` — Foundations remains ephemeral/no need evidence owner;
  - `transfer-construction` — Transfer remains ephemeral/no durable evidence owner.

### 39.3 — decision pipeline — CLOSED / CERTIFIED

- merge: `c809790453a40ae5e2da3a497e3b64b7a51e5d87`
- owner: `src/pedagogy/learner-action-decision-pipeline.js`
- composition: caller snapshots → 39.2 → 39.1 → reliable decision or abstention.
- no storage, no Evidence cutover, no learner-facing execution.

### 39.4 — read-only runtime snapshot collector — CLOSED / CERTIFIED

Accepted merge: **`f662d96d55e385f3d6baa946bde8f22fd1d25f0e`**.

Owner/API:

```text
src/pedagogy/learner-action-runtime-snapshot.js
FrenchTranquilleLearnerActionRuntimeSnapshot

status()
collect()
decide()
```

Certified runtime flow:

```text
FrenchTranquilleMemory.summary()
+
FrenchTranquilleErrors.summary()
        ↓
narrow detached immutable snapshot
        ↓
39.3 pipeline
        ↓
reliable decision OR abstention
```

Narrow copied fields only:

```text
Memory.entries[] → id / attempts
Memory.due[]     → id
Memory.fragile[] → id

Errors.top[]     → item.id / score / dominant / entry.id / lastType / events(type,source)
Errors.recent[]  → id / type / source / repeated
```

39.4 loads 39.1→39.4 in current non-historical runtime order and pre-caches the chain for PWA use, but:

- no decision at boot;
- no direct collector storage read;
- no durable write;
- no new store/schema/migration;
- no Evidence product read-path cutover;
- no direct Listening/Scenario/Foundation/Transfer owner reads;
- no learner-facing route/action execution;
- public Settings metadata remains `v2.5.0 · Build 38`.

## #215 final CI certification

Final exact head: **`92f5f76e97cb833df4d827fa7808ff368276148c`**.

Important SUCCESS runs:

```text
Build 39.4 Runtime snapshot collector        32179692906 ✅
Runtime version metadata                     32179693060 ✅
Release v2.5.0 Build 38 certification        32179692997 ✅
Build 38.10 spoken-on                        32179693123 ✅
Build 39.1 arbitration                       32179692834 ✅
Build 39.2 evidence adapter                  32179693212 ✅
Build 39.3 decision pipeline                 32179692784 ✅
Build 31 LI compatibility                    32179693098 ✅
Build 32 Practical A1                        32179693208 ✅
Build 26.4 single-scroll/Tyffany             32179693043 ✅
```

The final matrix drained with **exactly the five inherited failures, no additional failure, no queued, no in-progress**:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

### Runtime metadata successor-safety repair

The first #215 candidate head exposed a historical CI ownership bug: `Runtime version metadata` globally rejected every future `sw.js` change before its Chrome tribunal. 39.4 legitimately needs SW precache entries.

The workflow now keeps all static `v2.5.0 · Build 38` ownership assertions and the real Chrome Settings/version tribunal on current PRs, while the old no-SW-diff guard is scoped back to its own historical `release/v2.5.0-build38-certification` branch.

Final-head `Runtime version metadata` run **`32179693060`** passed:

```text
Static ownership contract ✅
Release-local historical scope guard skipped as intended ✅
Chrome Settings/version tribunal ✅
visible metadata = v2.5.0 • Build 38 ✅
```

### Build26.4 classification

Initial #215 head had three bounded Chrome timeouts in Build26.4 after static/sanctuary/Tyffany steps passed. No product mutation was made. On the final exact head, run **`32179693043`** passed directly, including the same desktop single-scroll Chrome step. Existing runner/harness flake classification remains valid.

## Build39.5 audit — advisory-only Practice recommendation — SELECTED NEXT

Actual runtime audit after #215 inspected the existing learner Practice owner `src/ui/build27-app-shell.js` and the older `src/pedagogy/daily-coach.js`.

### Existing Practice surface

Build27 already owns four stable learner choices:

```text
Parler
Écouter
Réviser
Dans la vraie vie
```

It already renders an optional `Conseillé maintenant` badge. Its current recommendation heuristic is coarse and predates LI3:

```text
reviewDue > 0 → Réviser
otherwise      → Parler
```

### Existing Daily Coach

The older Daily Coach independently reads learner/local Memory state and proposes Review → lesson → conversation. It predates 39.x and is **not** the safe first LI3 learner-facing integration point. Do not rewrite Daily Coach in 39.5.

### Selected 39.5 boundary

Use LI3 only as an **advisory marker inside Practice**, after the learner explicitly opens the Practice overlay:

```text
user opens Pratiquer
→ FrenchTranquilleLearnerActionRuntimeSnapshot.decide()
→ at most one existing Practice action receives the existing “Conseillé maintenant” badge
→ learner still clicks manually
```

Canonical mapping:

```text
phrase-retrieval → review
listening        → listening
scenario         → real-life
null/abstain     → no recommendation
unsupported      → no recommendation
```

No mapping to `Parler` yet: LI3 currently has no reliable conversation/free-voice need family.

39.5 must not auto-route, auto-execute, persist anything, unlock unsupported families, rewrite Daily Coach, change public version metadata, or change learner data.

Required real-browser proof:

```text
retrieval evidence → only Réviser advised
listening evidence → only Écouter advised
scenario evidence → only Dans la vraie vie advised
recognition-only → no advice
empty/unsupported → no advice
opening Practice itself never navigates
manual action routes remain historical
7 durable stores unchanged
7 completed / l8=4 / 40 known preserved
desktop+iPhone geometry/touch targets preserved
```

## Governance closeout branch

- branch: `docs/build39-4-closeout`
- base: exact accepted main `f662d96d55e385f3d6baa946bde8f22fd1d25f0e`
- docs-only intent.
- The previous long-form `MASTER-ROADMAP.md` is preserved byte-for-byte at `docs/archive/MASTER-ROADMAP-pre-39.4-closeout.md` before the canonical MASTER was compacted/refreshed.

## Protected boundaries

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
PWA identity/cache contract from PR #180
Build30 runtime contracts/runtime bridge
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
Build39.2 evidence reliability boundaries
Build39.3 pipeline composition
Build39.4 read-only runtime snapshot contract
```

## NEXT

```text
merge this docs-only Build39.4 closeout
→ verify main + 0 open PRs
→ open Build39.5 separately
→ advisory-only Practice recommendation
→ exact-head tribunal before merge
```

Do not bundle Home/Daily Coach changes or new evidence persistence into 39.5.
