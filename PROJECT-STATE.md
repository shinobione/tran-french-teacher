# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting. Repository reality wins over stale historical wording.

## Last reconciliation

- Reconciled: **2026-08-16**
- Repository: `shinobione/tran-french-teacher`
- Default branch: `main`
- Current runtime-bearing `main`: **`9acce0b2b644fe5a14135085c4de0f7a64ec16b3`** — PR **#178**, Build **37.5 · F05 Subject-Pronoun Consolidation**.
- GitHub Pages **#231** on that exact SHA: **SUCCESS**.
- Runtime push matrix on that exact SHA: **32 SUCCESS + exactly the four inherited failures**, **0 queued / 0 in-progress**.
- Visible application runtime metadata: **v2.4.0 · Build 36**.
- Pedagogy baseline: **v2.3.0 · Build 34**.
- Premium V5.10: **CLOSED / physical FIELD PASS**; issue **#114 CLOSED**.
- **Build 35 CLOSED — Memory Evidence v2 / Migration Readiness.**
- **Build 36 CLOSED — Memory Evidence v2 derived-shadow adoption.**
- **Build 37 ACTIVE — Foundations Core.**
- **37.1 MERGED / CERTIFIED** — pure F01–F18 ownership registry.
- **37.2 MERGED / CERTIFIED** — pure generic capsule engine + exact F01–F04 mirror spec.
- **37.3 MERGED / CERTIFIED** — F01–F04 pilot converged onto the generic engine with strict learner-facing parity.
- **37.4 MERGED / CERTIFIED** — F11 negation narrow learner expansion in lessons 17–20.
- **37.5 MERGED / CERTIFIED / DEPLOYED** — F05 subject-pronoun consolidation in lessons 34–36.

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

## Build 37 certified chain

```text
37.1 registry F01–F18
→ 37.2 generic pure capsule engine
→ 37.3 F01–F04 pilot adapter parity
→ 37.4 F11 negation narrow expansion
→ 37.5 F05 subject-pronoun consolidation
```

### Shared Foundations ownership — LOCKED

```text
37.2 → generic pure capsule engine
37.3 → shared learner-facing adapter / renderer
37.4 → F11 expansion ownership
37.5 → F05 consolidation ownership
```

Current adapter metadata intentionally preserves historical ownership instead of overwriting it:

```text
adapter: '37.3'
expansion: '37.4'
expansionConcepts: ['F11']
consolidation: '37.5'
consolidationConcepts: ['F05']
```

### F01–F04 predecessor contract

```text
lessons 8–13
→ F01–F04 optional capsule
→ same texts / choices / answers / feedback
→ same VI / DEBUG FR behavior
→ same visible progress rhythm
→ same return-to-lesson focus behavior
→ NO durable write
→ NO Evidence product read
```

### 37.4 — F11 negation

```text
lessons 17–20 only
→ Je n'ai pas de monnaie.
→ Je ne peux pas.
→ Il n'y a pas d'eau chaude.
→ Mon téléphone ne marche pas.
→ reconnect earlier Je ne comprends pas.
```

Teaching key:

```text
ne / n’ + verb + pas
```

The capsule explains `ne → n’` before a vowel / silent h and notes that natural spoken French may omit `ne`, while the full form remains the safe beginner/writing baseline.

### 37.5 — F05 subject pronouns

Build 33 classified F05 as **PARTIAL / distributed / consolidate**. Exact curriculum anchors were inspected before implementation:

```text
je       → already widespread earlier
tu       → explicit lesson 32 ownership
il/elle  → explicit lesson 33 ownership
nous     → explicit lesson 34 ownership
vous     → already present in polite survival language
on       → remains owned by F18 / lesson 52
```

Therefore the capsule is deliberately offered only in **lessons 34–36**, after Trân has already encountered the main perspectives needed for consolidation.

Pedagogical key:

```text
Who is doing the action / who is in the state?
```

Examples reuse curriculum language:

```text
Je suis prête.
Tu veux manger ?
Elle travaille.
Nous avons le temps.
Vous pouvez m’aider ?
```

It does **not** teach a full conjugation table and does not steal `on` from F18.

Architecture remains narrow:

```text
same Build 37.2 pure engine
→ compiled F05 capsule in foundations-capsules.js
→ same Build 37.3 renderer routes by lesson context
→ F01–F04 stays on lessons 8–13
→ F11 stays on lessons 17–20
→ F05 stays on lessons 34–36
→ no loader / index / SW change
→ no durable write
→ no Evidence product read
```

PR #178 final matrix completed with all non-inherited workflows green. `Premium V5.3 Pedagogical Islands` initially failed only during its screenshot-capture loop after static/functional/reduced-motion tribunals passed; strict unchanged rerun completed **SUCCESS**, including the visual artifact. No product patch was made for that flake.

Post-merge runtime `9acce0b2…` is fully settled at **32 SUCCESS + exactly the four inherited failures**, with Pages **#231 SUCCESS**, 0 queued and 0 in-progress.

## Current inherited CI debt

The four pre-Build37 failures remain baseline debt unless separately repaired:

1. `Build 36.2 Evidence shadow adoption`;
2. `V2.0.0 Freeze tribunal`;
3. `Build 36.3 Recovery v3 durability tribunal`;
4. `Build 28 Data recovery smoke`.

Do not hide these failures, but do not misclassify them as a new Foundations regression either.

## Remaining Foundations candidates

Build 33 + the 37.1 registry still classify these partial Core candidates as unresolved:

```text
F08 regular -er present       — PARTIAL / consolidate
F12 questions                 — PARTIAL / system weak
F13 adjective agreement       — PARTIAL / later core
F16 à/de contractions         — PARTIAL / later core
```

**Do not infer the next slice from this list alone.** Before 37.6, inspect the exact curriculum anchors and choose one narrow concept only. Do not mass-rollout F08/F12/F13/F16 together.

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
```

## NEXT

```text
Build 37.5 is CLOSED / CERTIFIED
→ do NOT reopen F05 without a concrete regression
→ fresh audit of exact curriculum anchors for ONE remaining partial concept
→ choose the smallest pedagogically justified 37.6 slice
→ dedicated tribunal must replay F01–F04 + F11 + F05 before testing the new concept
→ VI / DEBUG FR × desktop / iPhone-size
→ storage byte-identical
→ NO Evidence product read
→ do NOT mass-rollout remaining Foundations concepts
```

**Build 36 is CLOSED. Do not reopen it without a concrete regression.**
