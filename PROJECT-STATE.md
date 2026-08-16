# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting. Repository reality wins over stale historical wording.

## Last reconciliation

- Reconciled: **2026-08-16**.
- Repository: `shinobione/tran-french-teacher`.
- Default branch: `main`.
- Current runtime-bearing `main`: **`e017f7a041d147569ee0d47c93586b2c17f97a83`** — PR **#180**, PWA identity/cache isolation maintenance.
- Last pedagogy-bearing runtime: **`9acce0b2b644fe5a14135085c4de0f7a64ec16b3`** — PR **#178**, Build **37.5 · F05 Subject-Pronoun Consolidation**.
- Build 37.5 closeout checkpoint: **`02f70a2964eafdfa3e87aa22c22d25aa235a16cb`**.
- GitHub Pages **#233** on current `main` `e017f7a…`: **SUCCESS**.
- Current `main` matrix after one strict unchanged rerun of the legacy Build 26.1 Chrome job: **33 SUCCESS + exactly the four inherited failures**, **0 new regression**.
- Visible application runtime metadata: **v2.4.0 · Build 36**.
- Pedagogy baseline: **v2.3.0 · Build 34**.
- Premium V5.10: **CLOSED / physical FIELD PASS**; issue **#114 CLOSED**.
- **Build 35 CLOSED — Memory Evidence v2 / Migration Readiness.**
- **Build 36 CLOSED — Memory Evidence v2 derived-shadow adoption.**
- **Build 37 ACTIVE — Foundations Core.**

## Current maintenance checkpoint — PWA identity isolation

PR #180 changed only the PWA identity/cache lane after Build 37.5.

Locked maintenance contract:

```text
scope / identity → /tran-french-teacher/
cache cleanup    → only cache names prefixed tran-french-teacher-
sibling caches   → must never be deleted
pedagogy         → unchanged
learner data     → unchanged
voice            → unchanged
Premium field UX→ unchanged
```

A post-merge `Build 26.1 Voice replay + Details dashboard smoke` initially timed out in Chrome headless before its dashboard assertions. Static wiring/sanctuary checks had passed. The exact same job was rerun unchanged and completed **SUCCESS**, including Learning Details, Real Life III and Voice Replay. Treat this as a harness flake, not a PWA regression; no product patch was made.

## Build 37 certified chain

```text
37.1 registry F01–F18                         ✅ MERGED / CERTIFIED
37.2 generic pure capsule engine              ✅ MERGED / CERTIFIED
37.3 F01–F04 pilot adapter parity             ✅ MERGED / CERTIFIED
37.4 F11 negation narrow expansion            ✅ MERGED / CERTIFIED
37.5 F05 subject-pronoun consolidation        ✅ MERGED / CERTIFIED / DEPLOYED
37.6 F08 regular -er present consolidation    🚧 CURRENT CANDIDATE
```

### Shared Foundations ownership — LOCKED

```text
37.2 → generic pure capsule engine
37.3 → shared learner-facing adapter / renderer
37.4 → F11 expansion ownership
37.5 → F05 consolidation ownership
37.6 → F08 narrow verb-pattern consolidation candidate
```

Historical ownership markers must not be overwritten by later slices.

Current/candidate metadata:

```text
adapter: '37.3'
expansion: '37.4'
expansionConcepts: ['F11']
consolidation: '37.5'
consolidationConcepts: ['F05']
verbPattern: '37.6'                    # candidate branch only until merge
verbPatternConcepts: ['F08']           # candidate branch only until merge
```

## Current durable data contract — LOCKED

| Area | State |
|---|---|
| Curriculum | **52 lessons / 313 items** |
| Recovery durable stores | **7** |
| Backup envelope | **v3** |
| Evidence key | `french-tranquille:memory-evidence:v2` |
| Evidence role | **derived shadow only** |
| Product truth | **original six source stores remain canonical** |
| Product read-path cutover to Evidence | **NONE** |
| Foundations persistence | **NONE / ephemeral only** |

Recognition failure remains recognition-system evidence, never a pronunciation diagnosis.

## Certified predecessor contracts

### F01–F04

```text
lessons 8–13
→ optional article / gender / number capsule
→ same VI / DEBUG FR behavior
→ same return-to-lesson focus behavior
→ NO durable write
→ NO Evidence product read
```

### F11

```text
lessons 17–20 only
→ ne / n’ + verb + pas
→ reconnects already-known negative chunks
→ natural spoken-French note without making dropped ne the beginner baseline
```

### F05

```text
lessons 34–36 only
→ who is doing the action / who is in the state?
→ je / tu / il-elle / nous / vous
→ on remains owned by F18 / lesson 52
→ no full conjugation table
```

## Build 37.6 candidate — F08 regular `-er` present

A fresh anchor audit was performed before implementation, as required after 37.5.

Remaining partial candidates were:

```text
F08 regular -er present       — PARTIAL / consolidate
F12 questions                 — PARTIAL / system weak
F13 adjective agreement       — PARTIAL / later core
F16 à/de contractions         — PARTIAL / later core
```

F08 was selected because it has the smallest contiguous explicit curriculum scaffold:

```text
lesson 32 → je travaille → tu travailles
            Tu travailles ? / Tu habites où ? / Tu aimes ça ?
lesson 33 → Il travaille. / Elle travaille.
            Il habite ici. / Elle habite ici.
lesson 34 → nous / -ons exists, BUT remains outside 37.6 to preserve F05 ownership
```

### 37.6 learner scope

Route **lessons 32–33 only**.

Teaching key:

```text
many regular -er verbs, written present:
je       → -e
tu       → -es
il/elle  → -e
```

The capsule explicitly says these three forms often sound identical in speech, so the subject pronoun matters. It also prevents overgeneralization by reconnecting the known exception `aller → tu vas` and mentioning `vouloir / pouvoir` as frequent verbs with their own forms.

Out of scope for 37.6:

```text
nous / vous / ils full table
F12 questions
F13 adjective agreement
F16 à/de contractions
persistent mastery
Evidence product read
Build 38 transfer/generalization
A2
```

Candidate architecture:

```text
same Build 37.2 pure engine
→ compiled F08 capsule in foundations-capsules.js
→ same Build 37.3 renderer routes by lesson context
→ F08 lessons 32–33
→ F05 still lessons 34–36
→ no loader / index / SW / manifest change
→ no durable write
→ no Evidence product read
```

Dedicated 37.6 tribunal must replay **F01–F04 + F11 + F05** before F08, then certify F08 in **VI / DEBUG FR × desktop / iPhone-size**, storage byte-identical, no horizontal overflow and the lesson 33 → lesson 34 routing boundary.

## Current inherited CI debt

The four pre-Build37 failures remain baseline debt unless separately repaired:

1. `Build 36.2 Evidence shadow adoption`;
2. `V2.0.0 Freeze tribunal`;
3. `Build 36.3 Recovery v3 durability tribunal`;
4. `Build 28 Data recovery smoke`.

Do not hide these failures, but do not misclassify them as a new Foundations or PWA regression either.

## Protected boundaries

Do not silently change:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
manifest / SW PWA identity contract from PR #180
Recovery v3 seven-store ownership
Evidence derived-shadow role
52 / 313 curriculum semantics
Listening / Scenario / Mastery / Learner Intelligence owners
V5.10 field-accepted navigation / visual identities
```

## NEXT

```text
37.6 candidate branch: build37/f08-regular-er
→ finish dedicated guard + docs
→ open ONE PR
→ inspect PR diff and CI against current main e017f7a…
→ exactly four inherited failures may remain baseline
→ any new non-baseline failure must be explained/fixed or proven flaky by unchanged rerun
→ do NOT merge silently in an implementation session
→ do NOT begin F12/F13/F16 in the same slice
```

**Build 36 is CLOSED. Do not reopen it without a concrete regression.**