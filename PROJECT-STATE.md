# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting. Repository reality wins over stale wording.

## Current checkpoint

- Reconciled: **2026-08-17**.
- Repository: `shinobione/tran-french-teacher`.
- Default branch: `main`.
- Current runtime-bearing product commit: **`8c5c83e94113eeced0110447ffb60202ff377a5b`** — PR **#189**, Build **38.3 · deterministic affirmation → negation transfer core**.
- GitHub Pages **#252 / run `31979484134` — SUCCESS** on that exact SHA.
- Post-merge matrix on `8c5c83e…`: **exactly the 4 inherited historical failures**, **0 queued**, **0 in-progress**.
- One extra `Field reliability V2 — router + lesson audio` red appeared on first post-merge attempt; its static contracts/sanctuaries were green and the first Chrome dump occurred before field-audio decoration. The **same job rerun unchanged** completed fully SUCCESS, proving a harness/timing flake. No product patch was made.
- Visible application runtime metadata remains **v2.4.0 · Build 36**.
- Pedagogy baseline: **v2.3.0 · Build 34**.
- Curriculum: **52 lessons / 313 items**.
- Recovery: **7 durable stores / backup v3**.
- Evidence v2: **derived shadow only; original six stores remain product truth**.
- Premium V5.10: **CLOSED / physical FIELD PASS**; issue **#114 CLOSED**.
- **Build 35 CLOSED. Build 36 CLOSED. Build 37 CLOSED.**
- **Build 38 ACTIVE — Generalization & Transfer.**
- **Build 38.1 CLOSED / CERTIFIED / MERGED.**
- **Build 38.2 CLOSED / CERTIFIED / MERGED / DEPLOYED.**
- **Build 38.3 CLOSED / CERTIFIED / MERGED.**
- **Build 38.4 NEXT — narrow deterministic present → futur proche transfer core.**

## Build 38.3 — certified negation transfer core

Family:

```text
affirmation-negation-regular-er-je
```

Exact deterministic matrix:

```text
Je travaille. → Je ne travaille pas.
J'habite ici. → Je n'habite pas ici.
J'aime ça. → Je n'aime pas ça.
```

Implementation:

```text
src/pedagogy/generalization-negation-core.js
status = pure-non-wired
persistence = ephemeral-only
masteryClaim = false
```

38.3 deliberately does **not** wire another learner-facing card. It preserves the 38.2 lesson-33 UI unchanged.

### 38.3 proof / closeout

Candidate:

```text
PR #189
head 92d581eed175a7cca87ad93555783485181a3dee
```

Dedicated candidate workflow:

```text
Build 38.3 Generalization negation transfer
run 31979223610 — SUCCESS
```

Dedicated proof certifies:

```text
F11 predecessor PASS
38.1 predecessor PASS
38.3 pure contract PASS
VI × 1280×900 PASS
FR × 1280×900 PASS
VI × 390×844 PASS
FR × 390×844 PASS
3 deterministic negation transformations through real clicks
localStorage byte-identical
no horizontal overflow
choice targets >=44 px
```

PR matrix settled at exactly the four inherited historical failures before merge.

Final merge/deployment:

```text
PR #189 MERGED
main 8c5c83e94113eeced0110447ffb60202ff377a5b
Pages #252 / run 31979484134 — SUCCESS
post-merge after unchanged Field reliability rerun = exactly 4 inherited failures
0 queued / 0 in-progress
```

No physical smoke is required for 38.3 because the slice is pure/non-wired.

## Build 38.2 — locked learner-facing integration

Placement remains:

```text
lesson 33 normal content
→ existing F08 optional card
→ optional subject-substitution Transfer card
→ 3 deterministic exercises
→ return to lesson / normal Continue
```

Certified learner-facing exercises remain:

```text
Je travaille. → Tu travailles.
J'habite ici. → Tu habites ici.
Tu aimes ça. → Elle aime ça.
```

Do not stack another learner-facing transfer card into lesson 33 without a fresh placement/interaction decision.

## Build 38.1 — locked predecessor semantics

Family:

```text
subject-substitution-regular-er
subjects je / tu / il / elle
verbs    travailler / habiter / aimer
```

Canonical catalog remains unchanged.

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
```

## NEXT — Build 38.4

Fresh audit after 38.3 selects **present → futur proche** as the cleanest next pure transfer family.

The strongest narrow matrix uses **one already-known regular verb** and the four already-certified singular subjects:

```text
Je travaille.   → Je vais travailler.
Tu travailles.  → Tu vas travailler.
Il travaille.   → Il va travailler.
Elle travaille. → Elle va travailler.
```

Why this is clean:

```text
lesson 32 already owns tu travailles / tu vas
lesson 33 already owns il/elle travaille and il/elle va patterns
lesson 35 explicitly teaches futur proche = aller + infinitif
lesson 35 contains Je vais travailler.
38.1 already certifies je / tu / il / elle + travailler source forms
```

38.4 must remain **pure / non-wired**. It should prove only the structure:

```text
present regular-er sentence
→ same subject + correct present of aller + infinitive travailler
```

Explicit exclusions for the first slice:

```text
nous / vous / ils / elles
other infinitives
negation + futur proche combination
questions
past tense
new vocabulary
random/adaptive generation
learner-facing wiring
durable writes
Evidence product reads
mastery claims
```

Canonical execution order:

```text
→ create one pure deterministic future-transfer core
→ reuse 38.1 subject/travailler sources
→ anchor exact aller/futur-proche forms to lessons 32–35
→ replay 38.1 + 38.3 predecessors
→ VI / DEBUG FR × desktop / 390×844 browser tribunal
→ learner stores byte-identical
→ one candidate PR
→ control review / merge after dedicated proof
```

Do **not** start Build 39 inside Build 38.
