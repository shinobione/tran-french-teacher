# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
> Repository/GitHub reality wins over stale wording. Always verify live `main`, PRs, CI and Pages before acting.

## Current checkpoint — 2026-08-17

- Repository: `shinobione/tran-french-teacher`.
- Default branch: `main`.
- Current runtime-bearing product commit: **`1f65aa163c74f35e445a1d994346193a87a2658b`** — PR **#193**, Build **38.7 · learner-facing nominal plural transfer**.
- GitHub Pages **#260 / run `31981783564` — SUCCESS** on that exact SHA.
- Post-merge matrix: **33 SUCCESS + exactly 4 inherited historical failures**, **0 queued**, **0 in-progress**.
- Visible application metadata remains **v2.4.0 · Build 36**.
- Pedagogy baseline: **v2.3.0 · Build 34**.
- Curriculum: **52 lessons / 313 items**.
- Recovery: **7 durable stores / backup v3**.
- Evidence v2: **derived shadow only; original six stores remain product truth**.
- Premium V5.10: **CLOSED / physical FIELD PASS**.
- **Build 35 CLOSED. Build 36 CLOSED. Build 37 CLOSED.**
- **Build 38 ACTIVE — Generalization & Transfer.**
- **38.1 CLOSED** — deterministic subject-substitution core.
- **38.2 CLOSED / DEPLOYED** — subject Transfer in lesson 33.
- **38.3 CLOSED** — deterministic affirmation → negation core, still pure/non-wired.
- **38.4 CLOSED** — deterministic present → futur proche core.
- **38.5 CLOSED / DEPLOYED** — futur proche Transfer in lesson 35.
- **38.6 CLOSED** — deterministic singular → plural nominal core.
- **38.7 CLOSED / DEPLOYED** — nominal plural Transfer in lesson 13.
- **38.8 NEXT** — learner-facing integration of the already-certified 38.3 negation core, candidate placement **lesson 34**.

## Build 38.7 — certified learner-facing nominal plural transfer

Placement:

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

Contract:

```text
numberIntegration = 38.7
numberLesson = 13
numberFamily = singular-plural-regular-noun-phrases
numberExerciseIndexes = [0,2,3]
```

The shared Transfer renderer keeps all historical routes explicit:

```text
38.2 → lesson 33 / subject-substitution / [0,2,5]
38.5 → lesson 35 / futur-proche / [0,1,3]
38.7 → lesson 13 / nominal plural / [0,2,3]
```

Runtime dependency order now includes the certified nominal-number core before the shared adapter:

```text
Foundations
→ 38.1 subject core
→ 38.4 future core
→ 38.6 number core
→ shared Transfer adapter
```

Installed-PWA parity is preserved by explicit precache of the number core. The PWA cache identity/namespace contract from PR #180 remains unchanged.

### 38.7 proof / closeout

```text
PR #193
candidate head 95d86bd6a7e1e6a423b32e2cc1f2279b6cf34d02
merge 1f65aa163c74f35e445a1d994346193a87a2658b
Pages #260 / run 31981783564 — SUCCESS
post-merge = 33 SUCCESS + exactly 4 inherited failures
0 queued / 0 in-progress
```

The 38.7 gate replays and certifies:

```text
38.2 / 38.5 / 38.6 predecessor contracts
F01–F04 browser predecessor
lesson 13 VI / DEBUG FR × desktop / 390×844
3 real nominal-plural answer clicks
lesson 12 / 14 route boundaries
lesson 33 subject route unchanged
lesson 35 future route unchanged
localStorage byte-identical
no horizontal overflow
>=44px targets
installed-PWA number-core precache
```

No physical smoke is required specifically for 38.7 because it is a deterministic optional lesson integration built on already field-approved navigation and PWA contracts, with no new device API.

## Locked Build 38 predecessors

### 38.1 subject substitution

```text
family = subject-substitution-regular-er
subjects = je / tu / il / elle
verbs = travailler / habiter / aimer
```

### 38.2 learner placement

```text
lesson 33 → F08 → ONE subject-substitution Transfer card
```

### 38.3 negation core

Certified deterministic catalog:

```text
Je travaille. → Je ne travaille pas.
J'habite ici. → Je n'habite pas ici.
J'aime ça. → Je n'aime pas ça.
```

Family:

```text
affirmation-negation-regular-er-je
```

38.3 remains pure/non-wired until 38.8.

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

### 38.6 nominal plural core

```text
la gare       → les gares
la pharmacie  → les pharmacies
un billet     → des billets
une table     → des tables
```

### 38.7 learner placement

```text
lesson 13 → F01–F04 → ONE nominal-plural Transfer card
```

## 38.8 audit — learner-facing negation integration

The old warning remains valid for lessons 17–20: **do not mount the 38.3 transfer there merely because F11 teaches negation there.** At that point, the full regular-`-er` source scaffold is not yet mature.

By the end of lesson 33, however, all required evidence exists:

```text
F11 / lessons 17–20
→ ne / n’ ... pas is already taught in real sentences

F08 / lessons 32–33
→ travailler / habiter / aimer regular-present forms are consolidated

historical lesson anchors
→ J'habite... already encountered earlier
→ J'aime... already encountered earlier

38.1 / 38.2
→ deterministic sentence reconstruction from the same verb family is already certified
```

### Preferred placement — lesson 34

Lesson 34 is the first clean learner point **after** the complete F11 + F08 + 38.1/38.2 scaffold.

It also preserves the one-Transfer-per-lesson rhythm:

```text
lesson 13 → nominal plural Transfer
lesson 33 → subject-substitution Transfer
lesson 34 → negation Transfer candidate
lesson 35 → futur-proche Transfer
```

Candidate 38.8 sequence:

```text
lesson 34 normal content
→ existing F05 Foundation card
→ ONE optional negation Transfer card
→ 3 deterministic transformations from certified 38.3
→ return to lesson
→ normal Continue
```

Exact proposed learner subset remains the certified 38.3 catalog:

```text
Je travaille. → Je ne travaille pas.
J'habite ici. → Je n'habite pas ici.
J'aime ça. → Je n'aime pas ça.
```

38.8 must **reuse the existing shared Transfer renderer**. No second Transfer UI, no random generation, no new vocabulary, no learner write, no Evidence product read, no mastery claim.

Before implementation, verify the live lesson-34/F05 DOM placement and replay lessons 13/33/35 as predecessor contracts.

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

Any other failure must be classified. Prove harness flakes with unchanged reruns before patching product code.

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
38.7 lesson-13 Transfer placement
```

## NEXT — Build 38.8 · learner-facing negation transfer

Canonical candidate direction:

```text
reuse certified 38.3 core
→ candidate lesson 34
→ mount after existing F05 Foundation card
→ reuse shared Transfer renderer
→ 3 deterministic exercises only
→ no new vocabulary / no persistence / no mastery claim
→ preserve lessons 13 / 33 / 35 exactly
```

Implementation slice must prove at minimum:

```text
38.3 Node predecessor PASS
F05 predecessor PASS
38.2 lesson33 browser predecessor PASS
38.5 lesson35 browser predecessor PASS
38.7 lesson13 browser predecessor PASS
lesson34 VI / DEBUG FR × desktop / 390×844
3 real answer clicks
return focus + normal Continue
lesson33/35/13 route identities unchanged
localStorage byte-identical
no horizontal overflow
>=44px targets
installed-PWA precache for the negation core if wired at runtime
```

Per `AGENTS.md`, 38.8 is **one implementation slice**. Materialize it in a PR and stop; do not start another transfer family in the same coding-agent session.

## Documentation note

`MASTER-ROADMAP.md` still contains an older volatile checkpoint block from early Build 38. Its **permanent product contracts remain authoritative**, but its current Build-38 status markers must be reconciled with this verified checkpoint before any future roadmap decision that depends on those markers. Repository reality and this `PROJECT-STATE.md` take precedence until that reconciliation is merged.
