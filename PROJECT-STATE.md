# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-19

## Canonical accepted main

- Repository: `shinobione/tran-french-teacher`
- Live `main` verified before this slice: **`e04fc556f2c17d3254d862ba03cf60a3437d7aeb`**.
- Commit: `Docs: finalize Build 41 closeout`.
- Parent: `e2467cf886cee748a66c38374f56c6e7278d56a7` — accepted Build41 milestone-closure decision.
- GitHub commit verification: valid / verified.
- **0 open PRs** existed before the Build42.1 branch was created.
- Public runtime metadata remains **v2.5.0 · Build 38**.
- Pedagogy baseline remains **v2.3.0 · Build 34**.

## Accepted product state

```text
Public runtime metadata v2.5.0 · Build 38
Pedagogy baseline       v2.3.0 · Build 34
Curriculum              52 lessons / 313 items
Scenario                44 situations / 132 turns
Listening               17 contrast families / 18 contextual dialogues
Listening speed         0.88 normal / 0.65 slow
Speaking Loop           52/52 · max 2 moments / lesson
Recovery                7 durable stores / backup v3
Evidence v2             derived shadow only
Original six stores     product truth
Premium V5.10           CLOSED / physical field pass
```

## Historical learner continuity — LOCKED

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

No future work may reset, renumber or reinterpret this state.

## Milestone state

```text
Build38   CLOSED / RELEASED
Build39   CLOSED / CERTIFIED
Build40   CLOSED — A1 Productive Consolidation selected
Build41   CLOSED / SUCCESSFUL NARROW CONSOLIDATION
Build42.1 AUDIT CANDIDATE — PR #228
Build42.2 NOT AUTHORIZED pending review of #228
A2        NOT AUTHORIZED
```

There is no Build41.4 and no second Build41 productive family.

## Active candidate

```text
PR      #228 — Docs · Build 42.1 F16 source + placement audit
branch  docs/build42-1-f16-source-placement-audit
base    e04fc556f2c17d3254d862ba03cf60a3437d7aeb
scope   docs/read-only audit only
state   OPEN / CANDIDATE / NOT MERGED
```

Canonical candidate document:

```text
docs/BUILD-42.1-F16-SOURCE-PLACEMENT-AUDIT.md
```

No runtime, curriculum, store, Recovery, Evidence, voice, Premium, PWA or public-version file belongs in this slice.

## Build41 closure — accepted predecessor

Build41 completed one full productive-family lifecycle:

```text
41.1 audit seven candidate families
→ exactly one deterministic family passes
→ 41.2 pure recent-past core
→ separate learner-placement audit
→ 41.3 learner-facing integration
→ milestone closure
```

Accepted family:

```text
present-je-regular-action
→ recent-past-je-venir-de
```

Certified catalog:

```text
Je travaille.          → Je viens de travailler.
Je mange.              → Je viens de manger.
Je rentre à la maison. → Je viens de rentrer à la maison.
```

Build41 closure did not authorize A2 or a second productive family. It explicitly left F16 as the next structural audit dependency.

## F16 registry state

The certified Foundations core still records:

```text
F16
key      a-de-contractions
audit    partial-distributed
strategy teach-core
priority later-core
```

Build42.1 confirms that this classification remains accurate.

## Build42.1 source audit — candidate findings

### Strong learner-facing anchors

```text
lesson 3   Je viens du Vietnam.
lesson 13  J'ai mal à la tête.
lesson 24  Je rentre à la maison.
lesson 38  Je suis allée au restaurant.
lesson 38  Je suis rentrée à la maison.
lesson 45  J'ai mal à la tête.
lesson 45  J'ai mal au ventre.
```

The strongest same-context contrasts are:

```text
lesson 38  au restaurant  ↔ à la maison
lesson 45  au ventre      ↔ à la tête
```

### Important anti-confusion evidence

Lesson 22 explicitly teaches:

```text
Du pain.
Du lait.
Des œufs.
```

as **partitive articles / unspecified quantity**. These strings must not be treated as proof that Trân already understands `de + le → du` or `de + les → des` contraction.

Likewise quantity constructions such as lesson42 `une bouteille d'eau`, `un paquet de riz`, `un peu de…` are not F16 ownership.

### Missing / weak learner-facing anchors

- no clean learner-facing `aux` contraction item was found across the 52 lessons;
- no clean learner-facing contraction-`des` source pair equivalent to the `au ↔ à la` evidence was found;
- `de la` / `de l’` surface forms exist in idiomatic, partitive or quantity contexts, so spelling alone is not safe F16 evidence.

Therefore F16 remains **partial-distributed**, not already taught.

## Build42.1 placement verdict — CANDIDATE

### Earliest pedagogically valid placement: lesson 38

Reasoning:

- F01–F04 article/gender/number Foundations are already established long before lesson38;
- `à` and `de` have already appeared repeatedly in real learner phrases;
- lesson22 partitives have already been taught, so F16 can explicitly distinguish contraction from partitive lookalikes;
- lesson38 is the first clean same-lesson `au` versus `à la` contrast in actual learner items;
- lesson38 currently has no competing Foundation capsule owner;
- lesson45 provides a strong later reinforcement pair but is not the earliest valid teaching point.

Proposed future flow if implementation is later authorized:

```text
lesson 38 normal content
→ optional F16 Foundation capsule
→ return to lesson
```

## Existing Foundation infrastructure verdict

A parallel teaching UI is unnecessary.

Existing owners are suitable:

```text
src/pedagogy/foundations-capsule-engine.js
src/pedagogy/foundations-capsules.js
src/pedagogy/foundations-pilot.js
```

The capsule engine already provides localized VI/FR, deterministic checks, ephemeral-only state, `masteryClaim=false` and the sequence:

```text
observe → explain → construct → contrast → transfer
```

The existing learner adapter already mounts optional Foundations capsules and returns focus to the lesson.

## Candidate decision

### Teach-core

**JUSTIFIED, pending review of PR #228.**

If #228 is accepted, the proposed next implementation slice is:

```text
Build42.2 — F16 learner-facing teach-core capsule
placement: lesson 38 only
owner: existing Foundations engine/overlay
```

The teaching content may explain the complete mechanical system:

```text
à + le   → au
à + les  → aux
de + le  → du
de + les → des

à la / à l’ / de la / de l’ remain uncontracted
```

but must distinguish actual existing anchors from examples constructed only to demonstrate the rule, and must explicitly separate partitive/quantity `du/des/de l’` from F16 contraction.

### Productive Transfer

**NOT AUTHORIZED.**

The current curriculum does not yet provide equally clean learner-facing source ownership for all four contraction targets, especially `aux` and contraction-`des`. A deterministic F16 Transfer family must be re-audited only after coherent teaching exists.

### A2

**NOT AUTHORIZED.**

This audit changes neither durable concept evidence nor the later A1-readiness gate.

## Evidence gate

Reliable LI3 families remain:

```text
phrase-retrieval
listening
scenario
```

Still unavailable as trustworthy durable intelligence evidence:

```text
concept-review
foundation-capsule
transfer-construction
```

No new store or mastery claim is authorized by Build42.1.

## CI baseline

Known persistent inherited failures:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Build26.4 remains a classified runner/harness flake, not standing debt. Any other failure is NEW until classified.

## NEXT

Per `AGENTS.md`, stop at the audit candidate boundary:

```text
review PR #228 exact-head / docs-only scope
→ accept or reject the Build42.1 evidence
→ only if accepted: authorize Build42.2 F16 teach-core capsule
→ certify teaching before any productive F16 Transfer audit
→ later re-run A1 readiness before any A2 decision
```

Until PR #228 is accepted:

- do not implement F16;
- do not create/start Build42.2;
- do not implement F16 Transfer;
- do not start A2;
- do not add durable Foundation/Transfer mastery merely to make intelligence look smarter.
