# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-18

## Canonical accepted main

- Repository: `shinobione/tran-french-teacher`
- Accepted `main`: **`15cd59be579f546b44946f6e31046d3a66cf21f5`**
- Commit: `Docs: close Build 39.4 and hand off 39.5`
- PR **#216 — MERGED** from exact head `6738cebe2246c1813d7c7baa7be779f172eb32d9` with expected-head squash protection.
- Parent runtime/internal checkpoint: **`f662d96d55e385f3d6baa946bde8f22fd1d25f0e`** — PR #215 / Build39.4.
- `main` verification after #216: exact SHA `15cd59be...`, GitHub verified / valid, and **0 open PRs before Build39.5 branch creation**.
- Public runtime metadata remains **v2.5.0 · Build 38**.
- Pedagogy baseline remains **v2.3.0 · Build 34**.
- Latest exact public release deployment proof remains GitHub Pages #272 / run `32072053127` on release SHA `2abe20511d6265d12643276f18041812fec3e715`.

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

Build38 is pedagogically complete, public release is `v2.5.0 · Build 38`, and Build38.11 is not authorized.

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

- merge `246338a9ef11eb430f59fc6ccf494688904cf883`
- owner `src/pedagogy/learner-action-arbitration-core.js`
- pure deterministic arbitration, no storage.

### 39.2 — evidence adapter — CLOSED / CERTIFIED

- merge `9af287417d1fbb502837bea4aa80886cca2ffb2e`
- owner `src/pedagogy/learner-evidence-adapter.js`
- reliable families today:
  - phrase retrieval via Memory due/fragile + trustworthy retrieval errors;
  - listening via explicit `listening-*` Error events;
  - scenario via `scenario-miss` / `scenario-assisted` Error events.
- deliberately unavailable:
  - concept-review;
  - foundation-capsule;
  - transfer-construction.

### 39.3 — decision pipeline — CLOSED / CERTIFIED

- merge `c809790453a40ae5e2da3a497e3b64b7a51e5d87`
- owner `src/pedagogy/learner-action-decision-pipeline.js`
- caller snapshots → 39.2 → 39.1 → reliable decision or abstention.

### 39.4 — runtime snapshot collector — CLOSED / CERTIFIED

- PR #215 final head `92f5f76e97cb833df4d827fa7808ff368276148c`
- accepted merge **`f662d96d55e385f3d6baa946bde8f22fd1d25f0e`**
- owner `src/pedagogy/learner-action-runtime-snapshot.js`
- API `FrenchTranquilleLearnerActionRuntimeSnapshot.status()/collect()/decide()`.

Certified flow:

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

39.4 loads 39.1→39.4 in the current runtime and precaches the chain, but performs no decision at boot, no direct collector storage access, no durable write, no Evidence cutover and no learner-facing action execution.

Final exact-head important SUCCESS runs:

```text
Build39.4            32179692906
Runtime metadata     32179693060
Release v2.5         32179692997
Build38.10           32179693123
Build39.1            32179692834
Build39.2            32179693212
Build39.3            32179692784
Build31              32179693098
Build32              32179693208
Build26.4            32179693043
```

Final matrix returned to exactly the five inherited standing failures and no pending jobs.

### #216 governance closeout

#216 preserved the old 1321-line MASTER byte-for-byte at:

```text
docs/archive/MASTER-ROADMAP-pre-39.4-closeout.md
```

and replaced the canonical `MASTER-ROADMAP.md` with a compact current-state handoff. #216 was docs-only and its matrix also drained to exactly the five inherited failures.

## Build 39.5 — LI3 Practice advisory — ACTIVE IMPLEMENTATION SLICE

Branch:

```text
build39/practice-advisory
```

Base:

```text
15cd59be579f546b44946f6e31046d3a66cf21f5
```

### Selected learner-facing boundary

The Build27 Practice overlay already owns stable actions and routes:

```text
Parler
Écouter
Réviser
Dans la vraie vie
```

Its historical heuristic marked `Réviser` when reviews were due and otherwise marked `Parler` as `Conseillé maintenant`.

39.5 does **not** edit `src/ui/build27-app-shell.js`. A new decorator loads after 39.4 and replaces only that advisory badge when Practice is explicitly opened.

New owner candidate:

```text
src/pedagogy/learner-action-practice-advisory.js
FrenchTranquilleLearnerActionPracticeAdvisory
version = 3.0.0-practice-advisory
```

Mapping:

```text
phrase-retrieval → review
listening        → listening
scenario         → real-life
null / abstain   → no advisory
unsupported      → no advisory
```

There is deliberately no `Parler` mapping because LI3 has no reliable conversation/free-voice need family.

If a reliably selected action is currently unavailable/disabled, no fallback recommendation is shown.

### Runtime behavior

```text
learner explicitly opens Pratiquer
→ Build27 creates historical overlay
→ 39.5 MutationObserver decorates new Practice page
→ 39.4 decide()
→ legacy heuristic badge removed
→ at most one LI3 advisory badge added
→ learner still chooses/clicks manually
```

The decorator contains no route calls, `.click()`, storage access, fetch, Evidence read or durable write.

`src/core/build32-loader.js` loads 39.5 only after 39.4 in the current non-historical runtime.

`sw.js` pre-caches 39.5 with `B395='3.0.0-b39.5'` while preserving the existing PWA cache namespace.

Public runtime metadata remains `v2.5.0 · Build 38`.

### Dedicated tribunal candidate

Unit mapping tribunal covers:

```text
phrase-retrieval → review
listening → listening
scenario → real-life
unsupported / abstain → null
```

Real application tribunal seeds the locked historical learner and boots actual runtime for five cases:

```text
retrieval       → only Réviser advised
listening       → only Écouter advised
scenario        → only Dans la vraie vie advised
recognition-only→ no advisory
empty evidence  → no advisory
```

It also requires:

```text
opening Practice does not auto-route
manual Réviser route still works
seven durable stores unchanged while only advice renders
7 completed / l8=4 / 40 known preserved
4 historical Practice buttons remain >=44px
no horizontal overflow
VI + DEBUG FR
1280x900 + 390x844
```

### 39.5 intended scope

```text
.github/workflows/build39-5-practice-advisory.yml
PROJECT-STATE.md
docs/BUILD-39.5-PRACTICE-ADVISORY.md
src/core/build32-loader.js
src/pedagogy/learner-action-practice-advisory.js
sw.js
tests/browser/build39-5-practice-advisory.html
tests/unit/build39-5-practice-advisory.test.cjs
```

Protected owners explicitly byte-identical in this slice include Build27 App Shell, Daily Coach, 39.1→39.4 owners, Memory, Errors, Listening, Scenario, Foundations, Transfer, Premium, Build30 bridge/contracts, voice sanctuaries and curriculum.

## CI baseline

Known persistent inherited failures:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Build26.4 is a classified runner/harness flake, not standing debt. Build37.4 and Premium V5.9C have historical runner/Chrome flake classifications after unchanged rerun success.

Any other failure is NEW until classified.

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
Build27 App Shell route/action ownership
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
materialize Build39.5 candidate PR
→ run dedicated real-browser tribunal
→ classify every red outside five inherited failures
→ merge only if exact-head matrix returns to baseline
→ verify accepted main
→ docs/governance closeout
→ only then audit next Build39 learner-facing boundary
```

Do not bundle Home/Daily Coach changes or new evidence persistence into 39.5.
