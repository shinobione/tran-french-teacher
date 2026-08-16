# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting. Repository reality wins over stale wording.

## Current checkpoint

- Reconciled: **2026-08-17**.
- Repository: `shinobione/tran-french-teacher`.
- Default branch: `main`.
- Current runtime-bearing product commit: **`fcee9f1c02003ddc3313901055ef137f7a53b25f`** — PR **#190**, Build **38.4 · deterministic present → futur proche transfer core**.
- GitHub Pages **#254 / run `31979926239` — SUCCESS** on that exact SHA.
- Post-merge matrix on `fcee9f1c…`: **exactly the 4 inherited historical failures**, **0 queued**, **0 in-progress**.
- `Build 26.1 Voice replay + Details dashboard smoke` timed out on all 3 first-attempt Chrome dumps while static/sanctuary steps stayed green; the **same job rerun unchanged** (`95245279349`) completed fully SUCCESS, proving another harness/timing flake. No product patch was made.
- Visible application runtime metadata remains **v2.4.0 · Build 36**.
- Pedagogy baseline: **v2.3.0 · Build 34**.
- Curriculum: **52 lessons / 313 items**.
- Recovery: **7 durable stores / backup v3**.
- Evidence v2: **derived shadow only; original six stores remain product truth**.
- Premium V5.10: **CLOSED / physical FIELD PASS**; issue **#114 CLOSED**.
- **Build 35 CLOSED. Build 36 CLOSED. Build 37 CLOSED.**
- **Build 38 ACTIVE — Generalization & Transfer.**
- **38.1 CLOSED** — deterministic subject substitution core.
- **38.2 CLOSED / DEPLOYED** — learner-facing subject substitution in lesson 33.
- **38.3 CLOSED** — deterministic affirmation → negation core.
- **38.4 CLOSED** — deterministic present → futur proche core.
- **38.5 NEXT — learner-facing futur proche integration in lesson 35 using the shared Transfer renderer.**

## Build 38.4 — certified futur proche transfer core

Family:

```text
present-futur-proche-travailler-singular
```

Exact deterministic matrix:

```text
Je travaille.   → Je vais travailler.
Tu travailles.  → Tu vas travailler.
Il travaille.   → Il va travailler.
Elle travaille. → Elle va travailler.
```

Implementation:

```text
src/pedagogy/generalization-futur-proche-core.js
status = pure-non-wired
persistence = ephemeral-only
masteryClaim = false
```

Candidate / proof:

```text
PR #190
head 8c7c8c1efc24fbd76a24c988e74342318b382837
Build 38.4 dedicated final-PR run 31979787765 — SUCCESS
```

Dedicated proof certifies:

```text
38.1 predecessor PASS
38.3 predecessor PASS
38.4 pure contract PASS
VI × 1280×900 PASS
FR × 1280×900 PASS
VI × 390×844 PASS
FR × 390×844 PASS
4 deterministic future transformations through real clicks
localStorage byte-identical
no horizontal overflow
choice targets >=44 px
```

Final merge/deployment:

```text
PR #190 MERGED
main fcee9f1c02003ddc3313901055ef137f7a53b25f
Pages #254 / run 31979926239 — SUCCESS
post-merge after unchanged Build26.1 rerun = exactly 4 inherited failures
0 queued / 0 in-progress
```

No physical smoke is required for 38.4 because it is pure/non-wired.

## Locked Build 38 predecessors

### 38.1 subject substitution core

```text
family subject-substitution-regular-er
subjects je / tu / il / elle
verbs travailler / habiter / aimer
```

### 38.2 learner-facing placement

```text
lesson 33 normal content
→ F08
→ ONE optional subject-substitution Transfer card
→ 3 deterministic exercises
→ return / normal Continue
```

Lesson 33 must remain behaviorally identical during 38.5. Do **not** stack another Transfer card there.

### 38.3 negation core

```text
Je travaille. → Je ne travaille pas.
J'habite ici. → Je n'habite pas ici.
J'aime ça. → Je n'aime pas ça.
```

38.3 remains pure/non-wired for now.

## Build 37 ownership — LOCKED

```text
F01–F04 → lessons 8–13
F11     → lessons 17–20
F08     → lessons 32–33
F05     → lessons 34–36
F13     → lesson 40 only
F12     → lessons 41–43
```

F16 remains **deferred / not completed**; Build 37 stays closed.

## Inherited CI debt

Exactly four historical failures remain baseline debt unless separately repaired:

1. `Build 36.2 Evidence shadow adoption`;
2. `V2.0.0 Freeze tribunal`;
3. `Build 36.3 Recovery v3 durability tribunal`;
4. `Build 28 Data recovery smoke`.

A future Build 38 failure is **not** baseline merely because these four exist.

## Protected boundaries

Do not silently change:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
manifest / service-worker PWA identity contract from PR #180
Recovery v3 seven-store ownership
backup envelope v3
Evidence derived-shadow role
original six stores as product truth
52 / 313 curriculum semantics
Listening / Scenario / Mastery / Learner Intelligence owners
V5.10 field-accepted navigation / visual identities
Build 37 Foundations ownership/routes
38.1 deterministic subject-substitution semantics
38.2 lesson-33 placement/round-trip contract
38.3 deterministic negation semantics
38.4 deterministic futur-proche semantics
```

## NEXT — Build 38.5

38.5 owns **learner-facing placement and shared-renderer generalization only**, not a new transfer family.

Chosen placement:

```text
lesson 35 — Futur proche
→ existing F05 optional Foundation card remains owner
→ ONE optional Transfer card for futur proche
→ reuse certified 38.4 core
→ return to lesson / normal Continue
```

Why lesson 35:

```text
lesson 35 explicitly teaches futur proche = aller + infinitif
lesson 35 contains Je vais travailler.
F05 already owns lessons 34–36
lesson 33 is already occupied by the 38.2 subject-substitution Transfer card
```

Preferred learner subset stays short:

```text
Je travaille.   → Je vais travailler.
Tu travailles.  → Tu vas travailler.
Elle travaille. → Elle va travailler.
```

This gives one direct anchor plus two recombinations while keeping the practice ≈2 minutes.

Implementation direction:

```text
→ generalize existing `generalization-transfer-lesson.js` into a tiny route table
→ preserve the legacy 38.2 API/lesson33/exerciseIndexes contract for backwards tests
→ add lesson35 route using 38.4 future core
→ load future core before the shared adapter
→ pre-cache future core for installed-PWA offline parity
→ do NOT load/wire 38.3 negation yet
→ no new permanent nav
→ no durable write / Evidence read / mastery claim
→ test exact 38.2 lesson33 regression
→ test F05 + Future Transfer coexistence/order in lesson35
→ test lesson34/36 boundaries
→ VI / DEBUG FR × desktop / 390×844
→ localStorage byte-identical
→ one PR / automated closeout
```

Do **not** start Build 39 inside Build 38.
