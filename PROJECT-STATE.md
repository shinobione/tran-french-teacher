# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
> Repository/GitHub reality wins over stale wording. Always verify live `main`, PRs, CI and Pages before acting.

## Current checkpoint — 2026-08-17

- Repository: `shinobione/tran-french-teacher`.
- Default branch: `main`.
- Current runtime-bearing product commit: **`a61629b531d4922d7d5c06fcb3e5c0212aa0e685`** — PR **#192**, Build **38.6 · deterministic singular → plural nominal transfer core**.
- GitHub Pages **#258 / run `31981106987` — SUCCESS** on that exact SHA.
- Post-merge matrix: **exactly 4 inherited historical failures**, **0 queued**, **0 in-progress**.
- Visible application metadata remains **v2.4.0 · Build 36**.
- Pedagogy baseline: **v2.3.0 · Build 34**.
- Curriculum: **52 lessons / 313 items**.
- Recovery: **7 durable stores / backup v3**.
- Evidence v2: **derived shadow only; original six stores remain product truth**.
- Premium V5.10: **CLOSED / physical FIELD PASS**.
- **Build 35 CLOSED. Build 36 CLOSED. Build 37 CLOSED.**
- **Build 38 ACTIVE — Generalization & Transfer.**
- **38.1 CLOSED** — subject substitution core.
- **38.2 CLOSED / DEPLOYED** — subject Transfer in lesson 33.
- **38.3 CLOSED** — negation core.
- **38.4 CLOSED** — futur proche core.
- **38.5 CLOSED / DEPLOYED** — futur proche Transfer in lesson 35.
- **38.6 CLOSED** — singular → plural nominal core.
- **38.7 NEXT** — learner-facing nominal plural integration in **lesson 13** using the shared Transfer renderer.

## Build 38.6 — certified nominal-number core

Family:

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

Implementation:

```text
src/pedagogy/generalization-number-core.js
status = pure-non-wired
persistence = ephemeral-only
masteryClaim = false
```

Anchors are learner-known and explicit:

```text
lesson 8  → La gare. / La pharmacie.
lesson 9  → Je voudrais un billet.
lesson 12 → Une table pour deux, s’il vous plaît.
F01–F04   → la gare / un billet / une table / les toilettes
F01–F04   → le/la → les ; un/une → des
```

### 38.6 proof / closeout

```text
PR #192
candidate head 74b074f5fe9b10ca5326412dd57294e2e8db2542
Build 38.6 dedicated run 31980934442 — SUCCESS
merge a61629b531d4922d7d5c06fcb3e5c0212aa0e685
Pages #258 / run 31981106987 — SUCCESS
post-merge = exactly 4 inherited failures
0 queued / 0 in-progress
```

Dedicated proof certifies:

```text
F01–F04 predecessor PASS
38.6 pure contract PASS
VI × 1280×900 PASS
FR × 1280×900 PASS
VI × 390×844 PASS
FR × 390×844 PASS
4 deterministic plural transformations through real clicks
article-only vs noun-only distractors
localStorage byte-identical
no horizontal overflow
>=44px targets
```

No physical smoke is required for 38.6 because it is pure/non-wired.

## Locked Build 38 predecessors

### 38.1 subject substitution

```text
subject-substitution-regular-er
je / tu / il / elle
travailler / habiter / aimer
```

### 38.2 learner placement

```text
lesson 33 → F08 → ONE subject-substitution Transfer card
```

### 38.3 negation core

```text
Je travaille. → Je ne travaille pas.
J'habite ici. → Je n'habite pas ici.
J'aime ça. → Je n'aime pas ça.
```

38.3 remains pure/non-wired. Do not force it into lessons 17–20: F11 is present there, but the full source scaffold is not yet mature.

### 38.4 futur proche core

```text
Je travaille.   → Je vais travailler.
Tu travailles.  → Tu vas travailler.
Il travaille.   → Il va travailler.
Elle travaille. → Elle va travailler.
```

### 38.5 learner placement

```text
lesson 35 → F05 → ONE futur-proche Transfer card
```

Historical shared-renderer contracts must remain readable:

```text
38.2: slice=38.2, lesson=33, exerciseIndexes=[0,2,5]
38.5: integration=38.5, futureLesson=35, futureExerciseIndexes=[0,1,3]
```

## Build 37 ownership — LOCKED

```text
F01–F04 → lessons 8–13
F11     → lessons 17–20
F08     → lessons 32–33
F05     → lessons 34–36
F13     → lesson 40 only
F12     → lessons 41–43
```

F16 remains deferred / not completed.

## Inherited CI debt

Exactly four historical failures remain baseline debt:

1. `Build 36.2 Evidence shadow adoption`;
2. `V2.0.0 Freeze tribunal`;
3. `Build 36.3 Recovery v3 durability tribunal`;
4. `Build 28 Data recovery smoke`.

Any other failure must be classified; prove flakes with unchanged reruns before patching anything.

## Protected boundaries

Do not silently change:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
PWA identity/cache contract from PR #180
Recovery v3 / backup v3 / seven-store ownership
Evidence derived-shadow role
original six stores as product truth
52/313 curriculum semantics
Listening / Scenario / Mastery / Learner Intelligence owners
V5.10 field-approved navigation/visual identity
Build 37 Foundation routes
38.1 / 38.3 / 38.4 / 38.6 pure-core semantics
38.2 lesson-33 Transfer placement
38.5 lesson-35 Transfer placement
```

## NEXT — Build 38.7 · learner-facing nominal plural integration

Chosen placement is **lesson 13**, not lesson 12.

Why l13:

```text
by lesson 13, gare/pharmacie/billet/table have all already been encountered
lesson 13 itself reuses pharmacie in direction phrases
F01–F04 already owns lessons 8–13
mounting the Transfer card at lesson start therefore introduces no unseen vocabulary
```

Preferred learner subset:

```text
la gare    → les gares
un billet  → des billets
une table  → des tables
```

This covers:

```text
la → les
un → des
une → des
regular noun +s
```

Canonical 38.7 direction:

```text
→ reuse the single shared Transfer renderer
→ keep exact 38.2 lesson33 route/API intact
→ keep exact 38.5 lesson35 route/API intact
→ add number core before shared adapter in Build32 loader
→ add lesson13 number route after F01–F04 card
→ pre-cache number core for installed-PWA offline parity
→ lesson12: F01–F04 only, no number Transfer
→ lesson13: F01–F04 + ONE number Transfer
→ lesson14: no number Transfer
→ replay exact 38.2 and 38.5 browser tribunals
→ VI / DEBUG FR × desktop / 390×844 for l13
→ localStorage byte-identical
→ no new nav / store / Evidence read / mastery claim
→ one candidate PR, automated control and merge after classification
```

Do **not** wire 38.3 negation in the same slice. Do **not** start Build 39 inside Build 38.
