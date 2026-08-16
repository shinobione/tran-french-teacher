# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting. Repository reality wins over stale historical wording.

## Last reconciliation

- Reconciled: **2026-08-16**
- Repository: `shinobione/tran-french-teacher`
- Default branch: `main`
- Current `main`: **`e017f7a041d147569ee0d47c93586b2c17f97a83`** — PR **#180**, PWA identity/cache namespace isolation layered on top of the certified Build 37.5 checkpoint.
- GitHub Pages **#233** on that exact SHA: **SUCCESS**.
- Current-main push matrix: **33 SUCCESS + exactly the four inherited historical failures**, **0 queued / 0 in-progress**.
- Last certified Foundations runtime before the PWA-only maintenance layer: **`9acce0b2b644fe5a14135085c4de0f7a64ec16b3`** — PR **#178**, Build **37.5 · F05 Subject-Pronoun Consolidation**.
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
- **37.6 CANDIDATE / PR #182 OPEN** — F12 practical-question systematization in lessons 41–43. Implementation candidate commit **`c54ea540b11e8e40fef0784bb6806e17d5ac575c`** passed its dedicated predecessor + VI/FR desktop/iPhone tribunal before PR opening.

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

## Build 37 certified chain + active candidate

```text
37.1 registry F01–F18
→ 37.2 generic pure capsule engine
→ 37.3 F01–F04 pilot adapter parity
→ 37.4 F11 negation narrow expansion
→ 37.5 F05 subject-pronoun consolidation
→ 37.6 F12 practical-question systematization CANDIDATE
```

### Shared Foundations ownership — LOCKED through 37.5; 37.6 candidate adds one disjoint owner

```text
37.2 → generic pure capsule engine
37.3 → shared learner-facing adapter / renderer
37.4 → F11 expansion ownership
37.5 → F05 consolidation ownership
37.6 → F12 systematization ownership CANDIDATE
```

Candidate adapter metadata preserves every historical owner instead of overwriting it:

```text
adapter: '37.3'
expansion: '37.4'
expansionConcepts: ['F11']
consolidation: '37.5'
consolidationConcepts: ['F05']
systematization: '37.6'
systematizationConcepts: ['F12']
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

Post-merge Foundations runtime `9acce0b2…` settled at **32 SUCCESS + exactly the four inherited failures**, with Pages **#231 SUCCESS**, 0 queued and 0 in-progress. PR #180 later advanced `main` only for PWA identity/cache isolation; current `main` `e017f7a…` is settled at **33 SUCCESS + the same four inherited failures**, with Pages **#233 SUCCESS**.

### 37.6 candidate — F12 practical questions

The remaining partial concepts were re-audited against the real curriculum before selecting 37.6.

F12 was chosen because it has a clean distributed progression and a disjoint learner-facing route:

```text
lesson 25 → Où ? / Quand ? / Pourquoi ? / Avec qui ? / Quoi ?
lesson 32 → Tu travailles ? / Tu habites où ? / Tu veux manger ?
lesson 39 → Pouvez-vous m'expliquer ? / Quelle est l'adresse ?
lesson 41 → Qu'est-ce que ça veut dire ? / Pouvez-vous reformuler ?
lesson 42 → Combien il vous faut ?
lesson 43 → Lequel est mieux ?
```

The candidate capsule is offered only in **lessons 41–43** and systematizes:

```text
ordinary sentence + question intonation
question words
polite Pouvez-vous… ? blocks
```

It deliberately does **not** introduce subject-verb inversion or a broad new `Est-ce que…` system.

Other candidates remain deferred for concrete reasons:

```text
F08 regular -er present → pedagogically mature, but best route overlaps certified F05 around lessons 34–36
F13 adjective agreement → later core; avoid mixing adjective agreement with feminine passé-composé forms
F16 à/de contractions → later core; current anchors mix contraction, partitive and quantity semantics
```

Candidate architecture remains narrow:

```text
same Build 37.2 pure engine
→ compiled F12 capsule in foundations-capsules.js
→ same Build 37.3 renderer
→ F01–F04 stays on lessons 8–13
→ F11 stays on lessons 17–20
→ F05 stays on lessons 34–36
→ F12 candidate on lessons 41–43
→ no curriculum / loader / index / SW / voice / PWA change
→ no durable write
→ no Evidence product read
```

Dedicated branch workflow on implementation commit `c54ea540…` completed **SUCCESS** before PR opening and replayed:

```text
F01–F04 browser parity
→ F11 browser parity
→ F05 browser parity
→ F12 VI/FR × desktop/390×844
→ localStorage byte-identical
→ no horizontal overflow
→ ≥44 px entry target
→ protected owners untouched
```

PR **#182** is now the active candidate. Per `AGENTS.md`, full PR-matrix classification, merge and Pages certification are a separate control step unless explicitly delegated.

## Current inherited CI debt

The four pre-Build37 failures remain baseline debt unless separately repaired:

1. `Build 36.2 Evidence shadow adoption`;
2. `V2.0.0 Freeze tribunal`;
3. `Build 36.3 Recovery v3 durability tribunal`;
4. `Build 28 Data recovery smoke`.

Do not hide these failures, but do not misclassify them as a new Foundations regression either.

## Remaining Foundations candidates after selecting 37.6

```text
F08 regular -er present       — PARTIAL / consolidate — deferred due route overlap with F05
F13 adjective agreement       — PARTIAL / later core
F16 à/de contractions         — PARTIAL / later core
```

Do not mass-rollout these concepts. 37.6 must be certified or rejected before any next Foundations concept is selected.

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
PWA identity/cache isolation from PR #180
```

## NEXT

```text
PR #182 / Build 37.6 F12 is the only active implementation candidate
→ do NOT start F08/F13/F16
→ next control step: inspect full PR #182 matrix against current-main baseline
→ require no new failure beyond the four inherited historical failures
→ classify any isolated Chrome timeout before touching product
→ if certified and explicitly authorized: merge #182
→ certify exact merge SHA + Pages
→ reconcile this checkpoint after merge
```

**Build 36 is CLOSED. Do not reopen it without a concrete regression.**
