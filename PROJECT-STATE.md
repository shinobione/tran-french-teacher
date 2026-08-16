# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting. Repository reality wins over stale wording.

## Current checkpoint

- Reconciled: **2026-08-17**.
- Repository: `shinobione/tran-french-teacher`.
- Default branch: `main`.
- Current governance `main`: **`f0a0df73a249e2c2014120e8a8e39ee0a30f53c1`** — documentation closeout after Build 38.2.
- Current runtime-bearing product commit: **`694988e6299c7d25ca9e019f275c473422fd983e`** — PR **#188**, Build **38.2 · learner-facing subject substitution**.
- GitHub Pages **#241 / run `31978687464` — SUCCESS** on runtime commit `694988e…`.
- Post-merge product matrix on `694988e…`: **37 runs = 33 SUCCESS + exactly the 4 inherited historical failures**, **0 queued**, **0 in-progress**.
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
- **Build 38.3 NEXT — narrow deterministic affirmation → negation transfer core.**

## Build 38.2 — certified learner-facing integration

Placement is intentionally narrow:

```text
lesson 33 normal content
→ existing F08 optional card
→ optional “build a sentence” transfer card
→ 3 deterministic exercises
→ no mastery claim
→ return to lesson
→ normal Continue remains available
```

Certified learner-facing exercises:

```text
Je travaille. → Tu travailles.
J'habite ici. → Tu habites ici.
Tu aimes ça. → Elle aime ça.
```

38.2 reuses the 38.1 `subject-substitution-regular-er` core. It adds no new transfer family, vocabulary, irregular verb or permanent navigation route.

### 38.2 proof

Final candidate head:

```text
0e3e0e58e244faec4394d915f1bc2b937e9c5064
```

Dedicated proof passed on the code-bearing candidate and final candidate head. The code-bearing run was:

```text
Build 38.2 Learner-facing subject substitution
run 31977464288 — SUCCESS
```

PR-matrix review classified temporary Build 37 / 38.1 reds as predecessor implementation-slice scope guards, not product regressions: their semantic contracts passed and their guard rejected successor wiring such as `sw.js`. Post-merge on `main`, those successor-scope false positives disappeared.

Final deployment:

```text
PR #188 MERGED
runtime commit 694988e6299c7d25ca9e019f275c473422fd983e
Pages #241 / run 31978687464 — SUCCESS
post-merge: 33 SUCCESS + exactly 4 inherited failures
0 queued / 0 in-progress
```

Automated browser proof certifies:

```text
F08 predecessor PASS
38.1 pure predecessor PASS
VI × 1280×900 PASS
FR × 1280×900 PASS
VI × 390×844 PASS
FR × 390×844 PASS
F08 + Transfer coexist in lesson 33 in that order
3 real transfer answer clicks
return focus + normal lesson Continue survives
lesson 32 remains F08-only
lesson 34 remains F05-only
localStorage byte-identical
no horizontal overflow
entry/choice targets >=44 px
```

No new physical-device gate is required merely to close this bounded 38.2 integration; future iPhone defects remain real maintenance regressions if observed.

## Build 38.1 — locked predecessor semantics

Family:

```text
subject-substitution-regular-er
subjects je / tu / il / elle
verbs    travailler / habiter / aimer
```

Canonical catalog:

```text
Je travaille.  → Tu travailles.
Tu travailles. → Elle travaille.
J'habite ici.  → Tu habites ici.
Il habite ici. → Elle habite ici.
J'aime ça.     → Tu aimes ça.
Tu aimes ça.   → Elle aime ça.
```

Core remains deterministic and ephemeral. 38.2 wires it learner-facing but does not broaden its certified matrix.

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
```

## NEXT — Build 38.3

Fresh audit after 38.2 identifies **affirmation → negation** as the cleanest next transfer candidate, ahead of singular → plural.

Why:

```text
F11 already teaches ne / n’ ... pas
lesson 17 → Je n'ai pas de monnaie.
lesson 18 → Je ne peux pas.
lesson 19 → Il n'y a pas d'eau chaude.
lesson 20 → Mon téléphone ne marche pas.
38.1/F08 already owns travailler / habiter / aimer regular-er forms
```

The first implementation slice must stay narrower than the full negation system:

```text
Je travaille. → Je ne travaille pas.
J'habite ici. → Je n'habite pas ici.
J'aime ça. → Je n'aime pas ça.
```

This deliberately avoids:

```text
avoir / article de-after-negation changes
pouvoir / aller / être / irregular verbs
il y a special case
questions
spoken ne-dropping
plural
futur proche
agreement transformations
new vocabulary
learner-facing wiring
durable writes
Evidence product reads
mastery claims
```

Canonical execution order:

```text
→ create one pure/non-wired deterministic 38.3 negation-transfer core
→ reuse only already-known regular-er material
→ replay F11 + 38.1 predecessors
→ VI / DEBUG FR × desktop / 390×844 browser tribunal
→ learner stores byte-identical
→ one candidate PR
→ control review / merge after dedicated proof
```

Do **not** start Build 39 inside Build 38.
