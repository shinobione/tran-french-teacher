# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting. Repository reality wins over stale historical wording.

## Last reconciliation

- Reconciled: **2026-08-16**.
- Repository: `shinobione/tran-french-teacher`.
- Default branch: `main`.
- Current runtime-bearing `main`: **`d4d0436cfc86019de1e5e8a378c97829414b4656`** — PR **#183**, Build **37.7 · F12 Practical Question System**.
- GitHub Pages **#235 / run `31973980389`** on that exact SHA: **SUCCESS**.
- PR #183 matrix closed with **all non-inherited workflows green + exactly the four inherited historical failures**.
- Post-merge `main` push matrix has exactly those same four failures; at this reconciliation one unrelated Build 26.4 Progress/Tyffany smoke is still finishing its legacy Chrome Details-scroll step and has introduced no new failure.
- Visible application runtime metadata: **v2.4.0 · Build 36**.
- Pedagogy baseline: **v2.3.0 · Build 34**.
- Premium V5.10: **CLOSED / physical FIELD PASS**; issue **#114 CLOSED**.
- **Build 35 CLOSED — Memory Evidence v2 / Migration Readiness.**
- **Build 36 CLOSED — Memory Evidence v2 derived-shadow adoption.**
- **Build 37 ACTIVE — Foundations Core.**
- Current implementation branch: **`build37/f13-adjective-agreement`** — Build **37.8 · F13 adjective agreement**, narrow candidate being prepared from deployed `main d4d0436…`.

## Build 37 certified chain

```text
37.1 registry F01–F18                         ✅ MERGED / CERTIFIED
37.2 generic pure capsule engine              ✅ MERGED / CERTIFIED
37.3 F01–F04 pilot adapter parity             ✅ MERGED / CERTIFIED
37.4 F11 negation narrow expansion            ✅ MERGED / CERTIFIED
37.5 F05 subject-pronoun consolidation        ✅ MERGED / CERTIFIED / DEPLOYED
37.6 F08 regular -er present consolidation    ✅ MERGED / CERTIFIED / DEPLOYED
37.7 F12 practical question system            ✅ MERGED / CERTIFIED / DEPLOYED
37.8 F13 adjective agreement                  🚧 CURRENT NARROW CANDIDATE
```

## Shared Foundations ownership — LOCKED

Historical ownership is additive. Later slices must not overwrite earlier owners.

```text
37.2 → generic pure capsule engine
37.3 → shared learner-facing adapter / renderer
37.4 → F11 expansion
37.5 → F05 subject-pronoun consolidation
37.6 → F08 regular -er verb-pattern consolidation
37.7 → F12 practical-question systematization
37.8 → F13 adjective-agreement candidate
```

Current certified metadata through 37.7:

```text
adapter: '37.3'
expansion: '37.4'
expansionConcepts: ['F11']
consolidation: '37.5'
consolidationConcepts: ['F05']
verbPattern: '37.6'
verbPatternConcepts: ['F08']
systematization: '37.7'
systematizationConcepts: ['F12']
```

Current certified routes:

```text
F01–F04 → lessons 8–13
F11     → lessons 17–20
F08     → lessons 32–33
F05     → lessons 34–36
F12     → lessons 41–43
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

## Build 37.7 — F12 certified contract

Route: **lessons 41–43 only**.

Teaching key:

```text
close person → ordinary sentence + question intonation
missing info → question word
polite context → Pouvez-vous… ?
clarification → Qu'est-ce que ça veut dire ?
```

Exact existing anchors reused:

```text
lesson 25 → Où ? Quand ? Pourquoi ? Avec qui ? Quoi ?
lesson 32 → Tu travailles ? / Tu habites où ? / Tu veux manger ?
lesson 39 → Pouvez-vous m'expliquer ? / Quelle est l'adresse ?
lesson 41 → Qu'est-ce que ça veut dire ? / Pouvez-vous reformuler ?
lesson 42 → Combien il vous faut ?
lesson 43 → Lequel est mieux ?
```

37.7 does not teach inversion, does not add a broad new `Est-ce que…` system, does not rewrite curriculum items and makes no durable write.

### Build 37 predecessor CI composability — repaired in #183

Historical 37.4/37.5/37.6 guards previously contained temporal assertions forbidding selected future concepts. #183 removed only those successor bans while preserving each predecessor's own concept, route, persistence, Evidence and protected-owner contracts.

The historical F08 browser tribunal was also made synchronous to remove a diagnosed headless `requestAnimationFrame` race. F08 product behavior was not changed.

## Build 37.8 candidate — F13 adjective agreement

Build 33 / the 37.1 registry classify F13 as **PARTIAL / later core / teach-core**.

Exact curriculum evidence makes F13 a cleaner next candidate than F16:

```text
lesson 16 → Je suis prête. / Il est français. / Elle est française.
lesson 38 → feminine written forms already introduced in passé composé: allée / arrivée / rentrée…
lesson 40 → Je suis contente. / inquiète. / stressée. / très fatiguée.
```

The strongest learner-facing anchor is lesson 40, whose existing grammar note already says:

```text
je suis + adjectif
```

37.8 must **not** collapse past-participle agreement and adjective agreement into one rule. Lesson 38 is only a prior visual bridge: Trân has already noticed that feminine written forms may change.

Candidate teaching direction:

```text
Who does the adjective describe?
→ for Trân / a feminine subject, the written adjective often changes
→ common familiar patterns, not one universal “just add -e” rule
```

Safe familiar examples include:

```text
prêt → prête
content → contente
fatigué → fatiguée
stressé → stressée
français → française   # familiar special pattern, not universal
```

Likely route should stay **before F12 and not overlap lessons 41–43**. Exact route must be chosen from the smallest justified lesson window around lessons 38–40 before implementation.

### Why F16 is not selected now

F16 has one excellent contrast in lesson 45:

```text
à la tête ↔ au ventre
```

but `du / des` also collide with already-taught partitive/article meanings, and no equally clean `aux` anchor was found in the inspected curriculum. F16 therefore carries more risk of teaching an artificial or ambiguous contraction table. It remains unresolved, not rejected forever.

## Current inherited CI debt

The four pre-Build37 failures remain baseline debt unless separately repaired:

1. `Build 36.2 Evidence shadow adoption`;
2. `V2.0.0 Freeze tribunal`;
3. `Build 36.3 Recovery v3 durability tribunal`;
4. `Build 28 Data recovery smoke`.

Do not hide these failures, but do not misclassify them as a new Foundations regression either.

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
37.7 is MERGED / CERTIFIED / DEPLOYED on main d4d0436…
→ finish exact F13 anchor/routing audit
→ implement ONE narrow F13 capsule only if it remains pedagogically justified
→ dedicated 37.8 tribunal must replay F01–F04 + F11 + F08 + F05 + F12 ownership before F13
→ VI / DEBUG FR × desktop / iPhone-size
→ storage byte-identical
→ NO Evidence product read
→ F16 remains out of scope
→ after 37.8, reassess whether Build 37 should CLOSE instead of forcing F16
→ do not begin Build 38 transfer/generalization inside Build 37
```

**Build 36 is CLOSED. Do not reopen it without a concrete regression.**
