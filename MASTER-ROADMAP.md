# French Trân’quille — MASTER ROADMAP

> **Canonical current roadmap / durable handoff.**
>
> Every future AI/chat/session working on `shinobione/tran-french-teacher` must read `AGENTS.md`, then `PROJECT-STATE.md`, then this file before roadmap or implementation decisions.
>
> Historical long-form roadmap state remains archived under `docs/archive/`. This file owns the **current durable state, locked contracts and next authorized boundary**.

---

# 0. Canonical checkpoint — 2026-08-18

| Item | Canonical state |
|---|---|
| Accepted `main` before this audit | **`eff12111d31f57779d09e6c3d9fc42b3e59d0dbf`** — Build39 closeout |
| Public runtime metadata | **v2.5.0 · Build 38** |
| Product pedagogy baseline | **v2.3.0 · Build 34** |
| Curriculum | **52 lessons / 313 items** |
| Scenario | **44 situations / 132 turns** |
| Listening | **17 contrast families / 18 contextual dialogues / 0.88 normal / 0.65 slow** |
| Speaking Loop | **52/52 · max 2 moments / lesson** |
| Recovery | **7 durable stores / backup v3** |
| Evidence v2 | **derived shadow only; original six source stores remain product truth** |
| Build38 | **CLOSED / RELEASED** |
| Build39 — Learner Intelligence 3 | **CLOSED / CERTIFIED** |
| Build40 — A1 Consolidation Audit | **AUDIT COMPLETE / CLOSEOUT CANDIDATE** |
| Selected post-audit direction | **Build41 — A1 Productive Consolidation** |
| First authorized Build41 boundary | **41.1 productive-family audit — read-only** |

Latest exact public release proof remains GitHub Pages #272 / run `32072053127` on release SHA `2abe20511d6265d12643276f18041812fec3e715`.

## Historical learner continuity — LOCKED

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

No future work may reset, renumber or reinterpret this state.

---

# 1. Permanent source-of-truth / workflow rules

Priority:

1. live GitHub/git, deployed runtime, CI and physical field verdicts;
2. `PROJECT-STATE.md`;
3. this `MASTER-ROADMAP.md`;
4. focused build/architecture docs;
5. README/changelog/history;
6. chat memory.

Implementation discipline:

```text
audit real owners
→ choose ONE coherent slice
→ branch from accepted main
→ implementation + dedicated tribunal when runtime changes
→ candidate PR
→ exact-head review
→ classify every new red
→ expected-head merge only when justified
→ verify accepted main
→ docs/governance closeout
→ only then open the next slice
```

A suspected flake is rerun **unchanged** before product mutation. Historical baselines are never rewritten merely to make CI green.

---

# 2. Permanent learner/product safety contracts

## Voice

- no fake pronunciation score;
- speech-recognition failure is recognition-system evidence, not proof of poor pronunciation;
- own-voice replay remains local/temporary and never enters learner Memory/backups;
- automatic capture of the exact first Siri attempt remains separately field-gated.

## Data / Recovery / Evidence

- Recovery owns **7 durable stores / backup v3**;
- Evidence v2 remains a **derived shadow**;
- original six source stores remain product truth;
- no Evidence product read-path cutover without an explicit migration decision;
- no new durable store/schema merely to make intelligence appear smarter;
- recognition-only evidence never implies mastery/weakness.

## Curriculum / pedagogy

- preserve 52 lesson IDs / 313 item semantics;
- Build37 Foundations ownership/routes remain historical contracts;
- Build38 deterministic core semantics and learner placements remain historical contracts;
- one shared Transfer renderer remains the Build38 learner-facing owner;
- no hidden curriculum renumbering for convenience.

## Navigation / Premium

- zero competing route facades / route flash;
- stable Back/Settings ownership;
- no learner-facing diagnostic cockpit;
- Premium V5.10 field-approved navigation/identities remain protected;
- Build27 App Shell remains owner of learner Practice routes/actions.

## Protected sanctuaries

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
PWA identity/cache contract from PR #180
Build30 runtime-contracts.js / runtime-bridge.js
Recovery v3 seven-store ownership
backup envelope v3
Evidence derived-shadow role
original six stores as product truth
52 / 313 curriculum semantics
Premium V5.10 field-approved UI/navigation
Build27 App Shell route/action ownership
Build37 Foundations ownership/routes
Build38 deterministic core semantics
Build38 learner-facing placements
shared Transfer renderer ownership
Learner Intelligence V1/V2 historical compatibility
Build39.1 arbitration semantics
Build39.2 evidence-source reliability boundaries
Build39.3 decision-pipeline composition
Build39.4 runtime-snapshot read-only contract
Build39.5 advisory-only Practice contract
```

---

# 3. Closed milestone summary

## Build35 — Memory Evidence v2 readiness — CLOSED

Deterministic Evidence projection and reversible migration planning were proved. Evidence did not become product truth.

## Build36 — Recovery v3 / Evidence derived shadow — CLOSED

Seven-store Recovery / backup v3 established while original six source stores remained product truth.

## Build37 — Foundations Core — CLOSED

Foundations F01→F18 were industrialized without renumbering curriculum or creating a persistent Foundations mastery store. F16 remains explicit deferred structural debt.

## Build38 — Generalization & Transfer — CLOSED / RELEASED

```text
38.1 → 38.2   subject substitution       → lesson 33
38.3 → 38.8   affirmation → negation     → lesson 34
38.4 → 38.5   present → futur proche     → lesson 35
38.6 → 38.7   singular → plural nominal  → lesson 13
38.9 → 38.10  nous → spoken on           → lesson 52
```

Build38 is pedagogically complete. **38.11 is NOT AUTHORIZED.** Public release is `v2.5.0 · Build 38`.

## Build39 — Learner Intelligence 3 — CLOSED / CERTIFIED

Certified chain:

```text
39.1 arbitration
→ 39.2 reliable evidence adapter
→ 39.3 decision pipeline
→ 39.4 read-only runtime snapshot
→ 39.5 advisory-only Practice recommendation
```

Reliable action families today:

```text
phrase-retrieval ✅
listening        ✅
scenario         ✅
```

Deliberately unavailable because no trustworthy durable owner exists:

```text
concept-review
foundation-capsule
transfer-construction
```

Learner-facing Practice mapping:

```text
phrase-retrieval → Réviser
listening        → Écouter
scenario         → Dans la vraie vie
abstain          → no recommendation
```

No auto-route, no `Parler` fallback, no invented mastery.

---

# 4. Build40 — A1 Consolidation Audit — AUDIT COMPLETE / CLOSEOUT CANDIDATE

Canonical audit document:

```text
docs/BUILD-40-A1-CONSOLIDATION-AUDIT.md
```

## 4.1 Main finding

French Trân’quille does **not** have an A1 content-volume problem.

The 52-lesson curriculum already covers a broad practical A1 range: survival, transactions, transport/time, health, home/phone, social interaction, present subject expansion, negation/questions, future, recent past/passé composé starters, administration, work, service problems, narration, opinion and spoken `on`.

The primary limitation is:

> **productive generalization depth + trustworthy evidence of construction**, not thematic breadth.

## 4.2 Evidence hierarchy

```text
lesson content/challenge
→ taught / recognized in narrow context

Speaking Loop
→ oral rehearsal / self-comparison
→ no durable mastery claim

Listening
→ contextual comprehension / contrast recognition
→ reliable listening need evidence

Scenario
→ guided contextual production against finite accepted answer sets
→ reliable scenario success/miss/assistance evidence

Build38 Transfer
→ explicit deterministic reconstruction
→ strongest direct construction exercise
→ ephemeral / no durable transfer evidence owner

LI3
→ reliable advice for retrieval/listening/scenario
→ cannot infer concept/transfer mastery
```

## 4.3 Strengths

- broad practical A1 thematic coverage;
- explicit Foundations support across core grammar systems;
- **44 scenarios / 132 guided production turns**;
- **17 listening contrast families / 18 contextual dialogue activities**;
- full 52-lesson Speaking Loop rehearsal;
- five high-quality deterministic Build38 Transfer families;
- LI3 now reliably identifies retrieval/listening/scenario need without inventing mastery.

## 4.4 Main debts

### Structural Foundation debt

```text
F16 — à / de contractions
```

remains the clearest explicit teach-core debt.

### Productive/generalization debt

Most important under-proven systems:

1. question construction / reformulation across taught strategies;
2. past-time recombination using known subjects/actions;
3. articles / quantities / contractions in new noun phrases;
4. possessive recombination;
5. adjective agreement beyond memorized Trân-specific feminine forms;
6. short narrative assembly from several known events;
7. opinion + simple proposition recombination.

### Evidence debt

No trustworthy durable owner currently establishes:

```text
concept understanding
Foundation need/mastery
transfer/construction strength
```

Do **not** solve this by creating persistence first. Meaningful observable productive events must exist before evidence-owner design.

## 4.5 Decision

### A2 now

**REJECTED.**

A2 would increase breadth faster than the product can demonstrate reusable A1 competence.

### Broad A1+ phrase/content expansion

**NOT SELECTED as the primary direction.**

The audit does not show a topic shortage.

### A1 Productive Consolidation

**SELECTED.**

Goal:

> widen safe reconstruction/recombination using already-taught vocabulary and structures before another large content layer.

Build40 itself remains docs/audit only and makes no learner-data/runtime change.

---

# 5. Build41 — A1 Productive Consolidation — NEXT MILESTONE

Build41 is authorized **only after Build40 audit/closeout merges**.

## 41.1 — productive-family audit — FIRST AUTHORIZED SLICE / READ-ONLY

No runtime implementation is authorized in 41.1.

Candidate families to audit:

```text
questions
past-time recombination
articles / quantities / F16 contractions
possessives
adjective agreement
short narration
opinion clauses
```

For each family, 41.1 must prove:

- source forms are genuinely taught in current 52/313;
- target transformation is deterministic enough to test;
- no new vocabulary is required;
- no semantic ambiguity is hidden by a mechanical transform;
- learner placement would add construction rather than repeat the lesson;
- no durable mastery claim is needed merely to run the exercise.

Each candidate must end as one of:

```text
IMPLEMENTABLE DETERMINISTIC FAMILY
DEFER — NEEDS BETTER SOURCES
REJECT — TOO SEMANTIC / AMBIGUOUS
ALREADY COVERED / DUPLICATE
```

41.1 must select at most **one next implementation family**.

## F16

F16 gets explicit scrutiny because it is the only canonical Foundation `teach-core` debt still marked partial/distributed. Do not auto-create a capsule; map real curriculum anchors first.

## Evidence

Do not design new durable concept/transfer storage in 41.1. Evidence-owner work can only follow meaningful observable productive events.

---

# 6. A2 gate

A2 remains **NOT AUTHORIZED**.

Reconsider A2 only after A1 Productive Consolidation materially widens construction beyond the current five Build38 families and the project can explain what evidence changed.

No CEFR certification claim is implied by any internal phase label.

---

# 7. CI baseline

Known persistent inherited failures:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Build26.4 is a classified runner/harness flake, not standing debt. Build37.4 and Premium V5.9C have historical runner/Chrome flake classifications after unchanged rerun success.

Any other failure is **NEW until classified**.

---

# 8. NEXT

```text
review / merge Build40 audit-only closeout
→ verify main + 0 open PRs
→ open Build41.1 read-only productive-family audit
→ classify seven candidate construction families
→ select at most ONE deterministic implementation family
→ no A2 implementation
→ no new durable evidence owner yet
```
