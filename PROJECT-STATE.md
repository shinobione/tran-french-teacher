# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting. Repository reality wins over stale wording.

## Current checkpoint

- Reconciled: **2026-08-17**.
- Repository: `shinobione/tran-french-teacher`.
- Default branch: `main`.
- Current runtime-bearing `main`: **`25d09fa44d5cf1efff9f8529bb2e54cb67b7bc48`** — PR **#186**, Build **38.1 · deterministic subject substitution transfer core**.
- GitHub Pages **#239 / run `31976241382` — SUCCESS** on that exact SHA.
- Post-merge matrix on `25d09fa…`: **exactly the 4 inherited historical failures**, **0 queued**, **0 in-progress**; all other workflows including Build 38.1 are SUCCESS.
- Visible application runtime metadata remains **v2.4.0 · Build 36** because 38.1 is deliberately **pure / non-wired** and does not change the learner-facing PWA.
- Pedagogy baseline: **v2.3.0 · Build 34**.
- Curriculum: **52 lessons / 313 items**.
- Recovery: **7 durable stores / backup v3**.
- Evidence v2: **derived shadow only; original six stores remain product truth**.
- Premium V5.10: **CLOSED / physical FIELD PASS**; issue **#114 CLOSED**.
- **Build 35 CLOSED. Build 36 CLOSED. Build 37 CLOSED.**
- **Build 38 ACTIVE — Generalization & Transfer.**
- **Build 38.1 CLOSED / CERTIFIED / MERGED.**
- **Build 38.2 NEXT — learner-facing integration of the certified subject-substitution core.**
- Current closeout branch: **`docs/build38-1-closeout`** — documentation/governance only.

## Build 38.1 — certified contract

Purpose:

> Prove one deterministic transfer primitive: change who performs a known regular `-er` action, then reconstruct the whole sentence.

Family:

```text
subject-substitution-regular-er
```

Allowed subjects:

```text
je / tu / il / elle
```

Allowed verbs:

```text
travailler
habiter
aimer
```

Certified deterministic examples:

```text
Je travaille.  → Tu travailles.
Tu travailles. → Elle travaille.
J'habite ici.  → Tu habites ici.
Il habite ici. → Elle habite ici.
J'aime ça.     → Tu aimes ça.
Tu aimes ça.   → Elle aime ça.
```

Pedagogical action:

> keep the meaning and verb → change the person → rebuild the sentence.

This is transfer, not another conjugation table.

## 38.1 implementation / proof

Merged files:

```text
src/pedagogy/generalization-transfer-core.js
tools/test-build38-1-subject-substitution.cjs
tests/browser/build38-1-subject-substitution.html
.github/workflows/build38-1-subject-substitution.yml
docs/BUILD-38-1-SUBJECT-SUBSTITUTION.md
PROJECT-STATE.md
```

Final PR candidate head:

```text
4bc46dab110e70398d64671f0583fad2d3107b95
```

Dedicated candidate run:

```text
Build 38.1 Generalization subject substitution
31976081852 — SUCCESS
```

PR matrix:

```text
PR #186
Build 38.1 dedicated PR workflow — SUCCESS
all non-baseline workflows — SUCCESS
exactly 4 inherited historical failures
0 queued
0 in-progress
```

Post-merge:

```text
main 25d09fa44d5cf1efff9f8529bb2e54cb67b7bc48
Pages #239 / 31976241382 — SUCCESS
exactly 4 inherited historical failures
0 queued
0 in-progress
```

38.1 browser proof certifies:

```text
Build 37.8 predecessor PASS
VI × 1280×900 PASS
FR × 1280×900 PASS
VI × 390×844 PASS
FR × 390×844 PASS
6 deterministic transfer exercises
real button clicks
localStorage byte-identical
no horizontal overflow
choice targets >=44 px
```

## 38.1 explicit exclusions — still locked

```text
nous / vous / ils / elles
questions as a separate transformation family
negation transformation
futur proche
agreement transformation
plural transformation
aller / vouloir / pouvoir / devoir
random generation
new vocabulary
runtime/PWA wiring
durable writes
Evidence product reads
mastery claims
```

The pure core contains no learner persistence, Recovery or Evidence dependency.

## Build 37 ownership — LOCKED

```text
F01–F04 → lessons 8–13
F11     → lessons 17–20
F08     → lessons 32–33
F05     → lessons 34–36
F13     → lesson 40 only
F12     → lessons 41–43
```

Build 38 must not overwrite those owners.

F16 remains **deferred / not completed**; Build 37 stays closed.

## Inherited CI debt

Exactly four historical failures remain baseline debt unless separately repaired:

1. `Build 36.2 Evidence shadow adoption`;
2. `V2.0.0 Freeze tribunal`;
3. `Build 36.3 Recovery v3 durability tribunal`;
4. `Build 28 Data recovery smoke`.

A future 38.x failure is **not** baseline merely because these four exist.

## Protected boundaries

Do not silently change:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
Recovery v3 seven-store ownership
Evidence derived-shadow role
52 / 313 curriculum semantics
Listening / Scenario / Mastery / Learner Intelligence owners
V5.10 field-accepted navigation / visual identities
Build 37 Foundations ownership/routes
38.1 deterministic transfer semantics
```

## NEXT — Build 38.2 · learner-facing integration

38.2 owns **placement and interaction**, not expansion of the 38.1 verb/subject matrix.

First action:

```text
→ audit existing learner-facing lesson surfaces for the smallest contextual insertion point
→ prefer reuse of the existing lesson flow / Foundations-adjacent surface over a new permanent navigation tab
→ expose only the certified 38.1 subject-substitution family
→ keep the exercise optional/contextual and short
→ no new vocabulary
→ no irregular verbs
→ no durable write / Evidence product read unless separately justified
→ preserve 52/313 curriculum IDs and Build 37 owners
→ test VI / DEBUG FR × desktop / 390×844
→ test real lesson entry → transfer → return/continue
→ keep learner stores byte-identical
→ materialize one 38.2 candidate PR and stop for control review
```

Do **not** simultaneously add negation, plural, futur proche or agreement transfer in 38.2.
Do **not** start Build 39 inside Build 38.

**38.1 is CLOSED. 38.2 is NEXT.**
