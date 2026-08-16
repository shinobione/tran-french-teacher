# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting. Repository reality wins over stale historical wording.

## Last reconciliation

- Reconciled: **2026-08-17**.
- Repository: `shinobione/tran-french-teacher`.
- Default branch: `main`.
- Runtime-bearing `main`: **`cb37b4a6bdd9451a07e83deeae2544a407d78844`** — PR **#184**, Build **37.8 · F13 adjective agreement**.
- GitHub Pages **#236 / run `31975143562`** on that exact SHA: **SUCCESS**.
- Post-merge matrix on `cb37b4a6…`: **32 SUCCESS + exactly 4 inherited historical failures**, **0 queued**, **0 in-progress**.
- Visible application runtime metadata: **v2.4.0 · Build 36**.
- Pedagogy baseline: **v2.3.0 · Build 34**.
- Premium V5.10: **CLOSED / physical FIELD PASS**; issue **#114 CLOSED**.
- **Build 35 CLOSED — Memory Evidence v2 / Migration Readiness.**
- **Build 36 CLOSED — Memory Evidence v2 derived-shadow adoption.**
- **Build 37 CLOSED — Foundations Core.**
- **Build 38 NEXT / UNBLOCKED — Generalization & Transfer.**
- Current closeout branch: **`docs/build37-closeout`** — documentation/governance only; no runtime change.

## Build 37 closeout — certified chain

```text
37.1 registry F01–F18                         ✅ MERGED / CERTIFIED
37.2 generic pure capsule engine              ✅ MERGED / CERTIFIED
37.3 F01–F04 pilot adapter parity             ✅ MERGED / CERTIFIED
37.4 F11 negation narrow expansion            ✅ MERGED / CERTIFIED / DEPLOYED
37.5 F05 subject-pronoun consolidation        ✅ MERGED / CERTIFIED / DEPLOYED
37.6 F08 regular -er present consolidation    ✅ MERGED / CERTIFIED / DEPLOYED
37.7 F12 practical question system            ✅ MERGED / CERTIFIED / DEPLOYED
37.8 F13 adjective agreement                  ✅ MERGED / CERTIFIED / DEPLOYED
```

Build 37 satisfied its mandate by industrializing the validated Foundations system and a deliberately selected set of transferable Core concepts. It did **not** require implementing every registry concept merely to complete F01→F18 as a checklist.

## Shared Foundations ownership — LOCKED

Ownership is additive; successors must not overwrite predecessors.

```text
37.2 → generic pure capsule engine
37.3 → shared learner-facing adapter / renderer
37.4 → F11 negation expansion
37.5 → F05 subject-pronoun consolidation
37.6 → F08 regular -er verb-pattern consolidation
37.7 → F12 practical-question systematization
37.8 → F13 adjective-agreement consolidation
```

Runtime metadata:

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
agreement: '37.8'
agreementConcepts: ['F13']
```

Runtime routes:

```text
F01–F04 → lessons 8–13
F11     → lessons 17–20
F08     → lessons 32–33
F05     → lessons 34–36
F13     → lesson 40 only
F12     → lessons 41–43
```

## Durable data contract — LOCKED

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

## Build 37.8 — F13 certified contract

Build 33 / 37.1 classify F13 as **PARTIAL / later core / teach-core**.

Exact anchors:

```text
lesson 16 → Je suis prête. / Il est français. / Elle est française.
lesson 38 → feminine written forms already noticed: allée / arrivée / rentrée…
lesson 40 → Je suis contente. / inquiète. / stressée. / très fatiguée.
```

Runtime route is deliberately **lesson 40 only**. Lesson 38 is only a prior visual bridge; lesson 39 is administrative and remains outside F13.

Teaching reflex:

```text
Who does the adjective describe?
→ when Trân speaks about herself, use the familiar feminine form
→ common patterns, not a fake universal “just add -e” rule
```

Known examples:

```text
prêt → prête
content → contente
fatigué → fatiguée
stressé → stressée
français → française
inquiet → inquiète
```

Critical boundary: 37.8 does **not** merge adjective agreement with passé-composé / past-participle agreement. Lesson 38 is context only.

Dedicated 37.8 tribunal certified:

```text
F01–F04 → F11 → F08 → F05 → F12 → F13
VI / DEBUG FR × desktop / 390×844
39 ≠ F13
40 = F13
41 = F12
32 = F08
34 = F05
localStorage byte-identical
no Evidence product read
no horizontal overflow
touch target ≥44 px
```

## Build 37 closeout decision — F16 intentionally deferred

F16 is **not marked complete** and is **not required for Build 37 closeout**.

Its cleanest current anchor remains:

```text
lesson 45 → à la tête ↔ au ventre
```

But a broad `à / au / à la / aux / de / du / de la / des` capsule would currently mix multiple meanings already encountered through articles/partitives, while the curriculum does not expose an equally clean `aux` scaffold.

Canonical decision:

- do **not** implement F16 merely to complete a registry checklist;
- keep F16 available for a later pedagogy slice if future curriculum/evidence gives it a clean transferable need;
- Build 38 begins from the already certified Foundations owners above.

## Historical harness hardening retained

PR #184 also left two useful CI reliability fixes without weakening assertions:

- Build 26.4 / Details scroll flake classified by strict unchanged reruns; no product patch.
- Real Life III Chrome commands are bounded/retryable with the same URLs, virtual-time budgets and assertions; no Real Life product source changed.

## Current inherited CI debt

The four pre-Build37 failures remain baseline debt unless separately repaired:

1. `Build 36.2 Evidence shadow adoption`;
2. `V2.0.0 Freeze tribunal`;
3. `Build 36.3 Recovery v3 durability tribunal`;
4. `Build 28 Data recovery smoke`.

These same four failures are present on the post-37.8 `main` matrix; there is no new Build 37 failure.

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
Build 37 Foundations ownership/routes above
```

## NEXT — Build 38 · Generalization & Transfer

Build 38 owns **construction of unseen phrases**, not another round of Foundation-card accumulation.

Canonical transfer families from `MASTER-ROADMAP.md`:

```text
singular → plural
subject substitution
affirmation → negation
present → futur proche
agreement transformations
recombination across known vocabulary / structures
```

First Build 38 action:

```text
→ audit the existing 52 lessons / 313 items for clean transfer pairs
→ choose ONE narrow transformation family for 38.1
→ define deterministic source/target generation using only already-known vocabulary/structures
→ keep Foundations owners unchanged
→ keep learner stores byte-identical unless a later Build 38 slice explicitly earns persistence
→ add a real VI/DEBUG FR desktop+iPhone tribunal
→ materialize one candidate PR, then stop for control review
```

Do **not** start Build 39 inside Build 38.
Do **not** reopen Build 37 merely because a registry concept remains unimplemented.

**Build 37 is CLOSED. Build 38 is NEXT / UNBLOCKED.**
