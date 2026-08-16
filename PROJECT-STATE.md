# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting. Repository reality wins over stale wording.

## Current checkpoint

- Reconciled: **2026-08-17**.
- Repository: `shinobione/tran-french-teacher`.
- Default branch: `main`.
- Current canonical `main`: **`20c7a39f5c72849955aece0c5463cdbd377dd7d6`** — PR **#187**, Build **38.1 closeout / handoff to 38.2**.
- GitHub Pages **#240 / run `31976539443` — SUCCESS** on that exact SHA.
- Visible application runtime metadata remains **v2.4.0 · Build 36**.
- Pedagogy baseline: **v2.3.0 · Build 34**.
- Curriculum: **52 lessons / 313 items**.
- Recovery: **7 durable stores / backup v3**.
- Evidence v2: **derived shadow only; original six stores remain product truth**.
- Premium V5.10: **CLOSED / physical FIELD PASS**; issue **#114 CLOSED**.
- **Build 35 CLOSED. Build 36 CLOSED. Build 37 CLOSED.**
- **Build 38 ACTIVE — Generalization & Transfer.**
- **Build 38.1 CLOSED / CERTIFIED / MERGED.**
- **Build 38.2 ACTIVE / CANDIDATE — learner-facing integration.**

Current candidate:

```text
branch build38/learner-facing-substitution
PR #188 — Build 38.2 · learner-facing subject substitution
base main 20c7a39f5c72849955aece0c5463cdbd377dd7d6
```

Legacy note: PR **#182** is still open from an older Build 37 line and is not part of the current Build 38.2 slice. Do not merge or reuse it without a separate reconciliation.

## Build 38.1 — locked predecessor

Certified family:

```text
subject-substitution-regular-er
subjects je / tu / il / elle
verbs    travailler / habiter / aimer
```

Certified catalog:

```text
Je travaille.  → Tu travailles.
Tu travailles. → Elle travaille.
J'habite ici.  → Tu habites ici.
Il habite ici. → Elle habite ici.
J'aime ça.     → Tu aimes ça.
Tu aimes ça.   → Elle aime ça.
```

38.1 remains:

```text
src/pedagogy/generalization-transfer-core.js
status = pure-non-wired
persistence = ephemeral-only
masteryClaim = false
```

Do not broaden or rewrite the 38.1 matrix inside 38.2.

## Build 38.2 — candidate contract

### Placement

**Lesson 33 only**, after the existing optional F08 Foundations entry.

Reason:

```text
lesson 32 → tu anchors already encountered
lesson 33 → il / elle anchors already encountered
F08       → already owns lessons 32–33
```

38.2 therefore asks Trân to **reconstruct** from known material instead of adding a new conjugation lesson or a permanent Transfer route.

### Fixed learner-facing sequence

```text
normal lesson 33 content
→ existing F08 optional card
→ Build 38.2 optional “build a sentence” card
→ 3 deterministic exercises
→ completion with NO mastery claim
→ return focus to lesson
→ normal Continue remains available
```

The three learner-facing exercises reuse certified 38.1 catalog indexes `[0,2,5]`:

```text
Je travaille. → Tu travailles.
J'habite ici. → Tu habites ici.
Tu aimes ça. → Elle aime ça.
```

Choice order is rotated deterministically per exercise. There is **no random generation** and no new source/target content.

### Runtime files

```text
src/pedagogy/generalization-transfer-lesson.js
src/core/build32-loader.js
sw.js
tools/test-build38-2-learner-integration.cjs
tests/browser/build38-2-learner-integration.html
.github/workflows/build38-2-learner-integration.yml
docs/BUILD-38-2-LEARNER-INTEGRATION.md
PROJECT-STATE.md
```

Wiring order:

```text
Foundations capsule engine / capsules / pilot
→ generalization-transfer-core.js
→ generalization-transfer-lesson.js
```

The service worker pre-cache contains both Transfer scripts for installed-PWA/offline parity.

## 38.2 certified code-bearing checkpoint

Code/test/doc head before this handoff-only follow-up:

```text
4d312c5737e0efa8908e3e70bfe292b33831023e
```

Dedicated workflow:

```text
Build 38.2 Learner-facing subject substitution
run 31977464288
SUCCESS
```

That run certifies:

```text
syntax PASS
38.1 Node predecessor PASS
38.2 Node contract PASS
F08 browser predecessor PASS
38.1 pure browser predecessor PASS
VI × 1280×900 PASS
FR × 1280×900 PASS
VI × 390×844 PASS
FR × 390×844 PASS
F08 + Transfer coexist in lesson 33 in that order
3 certified exercises through real clicks
return focus + existing lesson Continue survives
lesson 32 remains F08-only
lesson 34 remains F05-only
localStorage byte-identical
no horizontal overflow
learner entry target >=44 px
```

## 38.2 explicit exclusions — LOCKED

```text
new vocabulary
random generation
nous / vous / ils / elles
aller / vouloir / pouvoir / devoir
negation transformation
plural transformation
futur proche transformation
agreement transformation
new permanent navigation tab
new learner store
durable writes
Evidence product reads
mastery scoring
curriculum renumbering
```

The adapter may read the existing DEBUG-FR preference only for localization; it performs no learner-state write.

## Build 37 ownership — LOCKED

```text
F01–F04 → lessons 8–13
F11     → lessons 17–20
F08     → lessons 32–33
F05     → lessons 34–36
F13     → lesson 40 only
F12     → lessons 41–43
```

38.2 is additive after F08 in lesson 33; it does not overwrite any Build 37 owner.

F16 remains **deferred / not completed**; Build 37 stays closed.

## Protected boundaries

Untouched by 38.2 and still protected:

```text
index.html
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
curriculum-stage2/3/4 semantics and IDs
Foundations implementation/routes
Recovery v3 seven-store ownership
Evidence derived-shadow role
Listening / Scenario / Mastery / Learner Intelligence owners
V5.10 field-accepted navigation / visual identities
38.1 deterministic transfer semantics
```

## Inherited CI debt

Exactly four historical failures remain the known baseline debt unless separately repaired:

1. `Build 36.2 Evidence shadow adoption`;
2. `V2.0.0 Freeze tribunal`;
3. `Build 36.3 Recovery v3 durability tribunal`;
4. `Build 28 Data recovery smoke`.

A new 38.2 failure is **not** baseline merely because those four exist.

## NEXT — control review only

```text
→ verify PR #188 current head
→ require dedicated Build 38.2 workflow green on that head
→ inspect PR diff against main
→ STOP
```

Per `AGENTS.md`, this implementation slice does **not** merge PR #188, monitor the full PR matrix, certify Pages, expand the transfer family, start 38.3, or start Build 39 unless explicitly delegated in a later user turn.
