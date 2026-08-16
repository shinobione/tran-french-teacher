# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting. Repository reality wins over stale historical wording.

## Last reconciliation

- Reconciled: **2026-08-16**.
- Repository: `shinobione/tran-french-teacher`.
- Default branch: `main`.
- Current runtime-bearing `main`: **`b7b8690e9684d90955c8c78933fae3ba1778ccc9`** — PR **#181**, Build **37.6 · F08 regular `-er` present consolidation**.
- GitHub Pages **#234 / run `31972823389`** on `b7b8690…`: **SUCCESS**.
- Build 37.6 PR matrix settled with all non-inherited checks green; the four historical failures remain baseline debt.
- Visible application runtime metadata: **v2.4.0 · Build 36**.
- Pedagogy baseline: **v2.3.0 · Build 34**.
- Premium V5.10: **CLOSED / physical FIELD PASS**; issue **#114 CLOSED**.
- **Build 35 CLOSED — Memory Evidence v2 / Migration Readiness.**
- **Build 36 CLOSED — Memory Evidence v2 derived-shadow adoption.**
- **Build 37 ACTIVE — Foundations Core.**
- Current implementation branch: **`build37/f12-questions-core-v2`** — Build **37.7 · F12 Practical Question System**, **candidate in validation**.

## Build 37 certified chain

```text
37.1 registry F01–F18                         ✅ MERGED / CERTIFIED
37.2 generic pure capsule engine              ✅ MERGED / CERTIFIED
37.3 F01–F04 pilot adapter parity             ✅ MERGED / CERTIFIED
37.4 F11 negation narrow expansion            ✅ MERGED / CERTIFIED
37.5 F05 subject-pronoun consolidation        ✅ MERGED / CERTIFIED / DEPLOYED
37.6 F08 regular -er present consolidation    ✅ MERGED / CERTIFIED / DEPLOYED
37.7 F12 practical question system            🚧 CURRENT CANDIDATE / VALIDATION
```

## Shared Foundations ownership — LOCKED

Historical ownership is additive. Later slices must not overwrite earlier owners.

```text
37.2 → generic pure capsule engine
37.3 → shared learner-facing adapter / renderer
37.4 → F11 expansion
37.5 → F05 subject-pronoun consolidation
37.6 → F08 regular -er verb-pattern consolidation
37.7 → F12 practical-question systematization candidate
```

Current candidate metadata:

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

Current routes:

```text
F01–F04 → lessons 8–13
F11     → lessons 17–20
F08     → lessons 32–33
F05     → lessons 34–36
F12     → lessons 41–43   # candidate until 37.7 merges
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

## Build 37.6 — F08 certified contract

Route: **lessons 32–33 only**.

```text
many regular -er verbs, written present:
je       → -e
tu       → -es
il/elle  → -e
```

The capsule notes that these forms often sound identical in speech, so the subject pronoun matters. It reconnects frequent exceptions such as `aller → tu vas` instead of implying that every `-er` verb follows the same pattern.

F05 remains owner of lessons 34–36; no six-person conjugation table was introduced.

### F08 Chrome harness note

The historical Build 37.6 browser tribunal has a known headless timing flake at its final lesson-34 routing check: Chrome can dump the DOM after F05 is already mounted but before two final `requestAnimationFrame` callbacks write the `data-b376-*` completion markers.

This was diagnosed twice without changing F08 product code. A diagnostic run showed:

```text
FR 390×844 → full F08 markers PASS
VI desktop → final F05 route visibly mounted, no b376 error, completion markers not yet written
```

Treat this as old harness timing, not a product regression. Do **not** patch F08 to satisfy that marker race.

## Build 37.7 candidate — F12 practical questions

Build 33 / the 37.1 registry classify F12 as **PARTIAL / system weak / teach-core**.

Exact curriculum anchors already exist:

```text
lesson 25 → Où ? Quand ? Pourquoi ? Avec qui ? Quoi ?
lesson 32 → Tu travailles ? / Tu habites où ? / Tu veux manger ?
lesson 39 → Pouvez-vous m'expliquer ? / Quelle est l'adresse ?
lesson 41 → Qu'est-ce que ça veut dire ? / Pouvez-vous reformuler ?
lesson 42 → Combien il vous faut ?
lesson 43 → Lequel est mieux ?
```

37.7 therefore routes F12 only to **lessons 41–43**, after these strategies have already been encountered in real curriculum context.

Teaching key:

```text
close person → ordinary sentence + question intonation
missing info → question word
polite stranger/context → Pouvez-vous… ?
clarification → Qu'est-ce que ça veut dire ?
```

Explicitly out of scope:

```text
subject-verb inversion
new broad Est-ce que system
large interrogative grammar table
curriculum rewrites / new items
persistent Foundations mastery
Evidence product read
F13 adjective agreement
F16 à/de contractions
Build 38 transfer/generalization
A2
```

37.7 dedicated evidence must replay:

```text
F01–F04 predecessor parity
→ F11 predecessor parity
→ F05 predecessor parity
→ F08 semantic contract via Build 37.6 Node test
→ F08 real route + dialog open inside the deterministic 37.7 browser tribunal
→ F12 VI / DEBUG FR × desktop / 390×844
```

Required routing boundaries:

```text
40 → no F12
41–43 → F12
44 → no F12
32 → still F08
34 → still F05
```

Storage must remain byte-identical, with no Evidence product read and no horizontal overflow.

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
37.7 branch: build37/f12-questions-core-v2
→ finish clean dedicated 37.7 validation
→ remove all temporary diagnostics before PR
→ inspect final diff against main b7b8690…
→ open ONE PR only after the dedicated guard is green
→ PR matrix may retain exactly the four inherited historical failures
→ any new non-baseline failure must be fixed or proven flaky without product appeasement
→ if merged, verify Pages on the exact merge SHA
→ then fresh-audit F13 versus F16; choose at most ONE next narrow concept or close Build 37 if the roadmap evidence supports it
→ do not mass-rollout F13 + F16
→ do not begin Build 38 transfer/generalization inside Build 37
```

**Build 36 is CLOSED. Do not reopen it without a concrete regression.**
