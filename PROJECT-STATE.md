# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-19

## Canonical checkpoint

- Repository: `shinobione/tran-french-teacher`.
- Build42.1 audit decision is **accepted** at **`1481e4de07b01a0e644138f062685a800e342b12`** (`Docs: accept Build 42.1 F16 source and placement audit`).
- Parent: `e04fc556f2c17d3254d862ba03cf60a3437d7aeb` — final Build41 closeout checkpoint.
- PR **#228** was merged by squash from exact head **`910db22d252f28ee325635499f3e0084451ccb67`** with expected-head protection.
- GitHub was re-read after merge and `main` pointed exactly to `1481e4de...`; commit verification was valid.
- This closeout is docs-only. A containing closeout commit may advance `main` beyond `1481e4de...` without changing product/runtime state; live GitHub remains authoritative for exact HEAD.
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
Build42.1 CLOSED / AUDITED — F16 teaching + lesson38 placement accepted
Build42.2 AUTHORIZED NEXT — narrow F16 teach-core implementation
F16 Transfer NOT AUTHORIZED
A2        NOT AUTHORIZED
```

## Build42.1 accepted evidence

Canonical audit:

```text
docs/BUILD-42.1-F16-SOURCE-PLACEMENT-AUDIT.md
```

Accepted PR:

```text
PR             #228 — Docs · Build 42.1 F16 source + placement audit
candidate head 910db22d252f28ee325635499f3e0084451ccb67
base           e04fc556f2c17d3254d862ba03cf60a3437d7aeb
merge          1481e4de07b01a0e644138f062685a800e342b12
scope          MASTER-ROADMAP.md / PROJECT-STATE.md / Build42.1 audit only
```

Exact-head workflow review returned **no new failure**: only the five known inherited reds remained. Relevant predecessor/product guards were green, including Foundations 37.1→37.8, Build41.2, Build41.3, Runtime metadata and Release v2.5.0.

No review submissions or unresolved review threads existed on #228 at acceptance.

## F16 decision — ACCEPTED

The certified Foundations registry remains conceptually accurate before implementation:

```text
F16
key      a-de-contractions
audit    partial-distributed
strategy teach-core
priority later-core
```

Build42.1 established that F16 is sufficiently sourced for **coherent teaching**, but not yet for productive Transfer.

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

### Anti-confusion boundary — LOCKED

Lesson22 explicitly teaches `Du pain. / Du lait. / Des œufs.` as **partitives**. Lesson42 quantity constructions (`une bouteille d'eau`, `un paquet de riz`, `un peu de…`) are also not F16 ownership.

Therefore identical surface forms must never be used to pretend that `de + le / de + les` contraction has already been mastered.

### Missing source ownership

- no clean learner-facing `aux` contraction item was found across the 52 lessons;
- no clean learner-facing contraction-`des` source pair equivalent to `au ↔ à la` was found;
- `de la / de l’` examples often belong to idiomatic, partitive or quantity contexts.

This is why productive F16 Transfer remains blocked.

## Build42.1 placement — ACCEPTED

**Earliest pedagogically valid placement: lesson 38.**

Accepted learner flow for the next implementation slice:

```text
lesson 38 normal content
→ optional F16 Foundation capsule
→ return to lesson
```

Why lesson38:

- article/gender/number Foundations already exist;
- `à` and `de` have appeared repeatedly;
- partitives have already been introduced, allowing explicit contrast rather than confusion;
- lesson38 is the first clean same-lesson `au` versus `à la` learner-item contrast;
- lesson38 has no competing Foundation capsule owner;
- lesson45 remains a later reinforcement anchor.

## Existing infrastructure — REUSE REQUIRED

Build42.2 must reuse:

```text
src/pedagogy/foundations-capsule-engine.js
src/pedagogy/foundations-capsules.js
src/pedagogy/foundations-pilot.js
```

The shared Foundations flow already provides VI/FR, deterministic checks, ephemeral-only session state, focus return and `masteryClaim=false`. No parallel grammar UI is justified.

## Build42.2 — AUTHORIZED NEXT

Exact authorized implementation scope:

```text
Build42.2 — F16 learner-facing teach-core capsule
placement: lesson 38 only
owner: existing Foundations engine/overlay
```

The capsule may teach the complete mechanical system:

```text
à + le   → au
à + les  → aux
de + le  → du
de + les → des

à la / à l’ / de la / de l’ remain uncontracted
```

Hard boundaries:

- reuse existing Foundations engine/overlay;
- lesson38 only unless a later audit explicitly changes placement;
- VI + DEBUG FR;
- deterministic checks only;
- distinguish real curriculum anchors from teaching-only recombinations;
- explicitly distinguish contraction `du/des` from partitive/quantity `du/des/de l’`;
- no curriculum item mutation;
- no new top-level navigation;
- no new store/schema/Recovery/Evidence owner;
- no mastery claim;
- no F16 Transfer implementation;
- preserve 52 lessons / 313 item semantics;
- preserve Build37/38/39/41 contracts and Premium V5.10 navigation;
- public runtime metadata stays `v2.5.0 · Build 38` unless a separate release decision changes it;
- dedicated predecessor + desktop/iPhone browser tribunal required before candidate acceptance.

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

Build42.1 does not change this boundary.

## CI baseline

Known persistent inherited failures:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Build26.4 remains a classified runner/harness flake, not standing debt. Any other failure is NEW until classified.

## NEXT

```text
Build42.2 — implement one narrow F16 teach-core capsule at lesson38
→ existing Foundations infrastructure only
→ dedicated unit/predecessor/browser parity evidence
→ materialize candidate PR
→ STOP for control review
```

Until Build42.2 is separately implemented and certified:

- do not implement productive F16 Transfer;
- do not claim durable Foundation mastery;
- do not start A2;
- do not add a new durable store merely to make intelligence look smarter.
