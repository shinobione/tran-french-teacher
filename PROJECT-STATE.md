# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-19

## Canonical checkpoint

- Repository: `shinobione/tran-french-teacher`.
- Build42.2 F16 learner-facing teach-core is **accepted / merged / exact-head CI-certified**.
- Product PR: **#230 — `Build 42.2 · F16 learner-facing contractions capsule`**.
- Candidate head accepted: **`1c11f253ce6841289f619252bfc077c7e657219a`**.
- Product merge: **`8b462fae236c00b902a9312fe8e1b103412b8694`** (`Build 42.2: add F16 contractions foundation`).
- Product merge parent: `cfced413ce74e78712a62776641993c4de8551c1` — Build42.1 final closeout.
- GitHub was re-read after merge and `main` pointed exactly to `8b462fae...`; commit verification was valid.
- A later docs-only closeout commit may advance `main` beyond `8b462fae...` without changing product/runtime state; live GitHub remains authoritative for exact HEAD.
- Push-triggered GitHub Pages for `8b462fae...` was **not independently proven through the available connector**; do not infer deployed/Pages-green from merge alone.
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
Build42.2 CLOSED / MERGED / EXACT-HEAD CI-CERTIFIED
Build42   ACTIVE — milestone closure audit NEXT
Build42.3 NOT AUTHORIZED
F16 Transfer NOT AUTHORIZED
A2        NOT AUTHORIZED
```

## Build42.1 accepted evidence

Canonical audit:

```text
docs/BUILD-42.1-F16-SOURCE-PLACEMENT-AUDIT.md
```

Build42.1 established that F16 was sufficiently sourced for **coherent teaching**, but not for productive Transfer.

Strong learner-facing anchors included:

```text
lesson 3   Je viens du Vietnam.
lesson 13  J'ai mal à la tête.
lesson 24  Je rentre à la maison.
lesson 38  Je suis allée au restaurant.
lesson 38  Je suis rentrée à la maison.
lesson 45  J'ai mal à la tête.
lesson 45  J'ai mal au ventre.
```

The strongest same-context contrasts remain:

```text
lesson 38  au restaurant  ↔ à la maison
lesson 45  au ventre      ↔ à la tête
```

### Anti-confusion boundary — LOCKED

Lesson22 explicitly teaches `Du pain. / Du lait. / Des œufs.` as **partitives**. Lesson42 quantity constructions (`une bouteille d'eau`, `un paquet de riz`, `un peu de…`) are also not F16 ownership.

Identical surface forms must never be used to pretend that `de + le / de + les` contraction has already been mastered.

## Build42.2 — ACCEPTED PRODUCT SLICE

Canonical implementation document:

```text
docs/BUILD-42.2-F16-TEACH-CORE.md
```

Accepted product flow:

```text
lesson 38 normal content
→ optional F16 Foundation capsule
→ return to lesson
```

The implementation reuses:

```text
src/pedagogy/foundations-capsule-engine.js
src/pedagogy/foundations-capsules.js
src/pedagogy/foundations-pilot.js
```

No parallel grammar UI was introduced.

### Accepted F16 teaching contract

The capsule teaches the complete mechanical system:

```text
à + le   → au
à + les  → aux
de + le  → du
de + les → des

à la / à l’ / de la / de l’ remain uncontracted
```

It explicitly keeps lexical preposition choice outside F16 ownership.

Real curriculum anchors and teaching-only recombinations are labelled separately:

```text
real anchors            au restaurant / à la maison / du Vietnam
teaching recombination  à + les → aux / de + les → des
```

The capsule contains exactly six deterministic checks, including an explicit lesson22 partitive anti-confusion check. It remains optional, ephemeral-only and `masteryClaim=false`.

### Build42.2 exact-head CI evidence

The first candidate head showed:

- dedicated Build42.2 tribunal **SUCCESS**;
- the five known inherited failures;
- seven additional Build38/41 failures caused only by historical successor guards that permanently forbade later authorized changes to `foundations-capsules.js` / `foundations-pilot.js`.

The candidate was corrected narrowly: exactly those seven historical guards were made successor-safe for later authorized Foundations work while retaining their certified Transfer core, curriculum, voice, learner-store, Recovery/Evidence, Premium/UI and asset protections. No historical browser tribunal was removed or skipped.

Final exact-head **`1c11f253...`** returned:

```text
Build42.2 dedicated tribunal   SUCCESS
Build38.2                      SUCCESS
Build38.5                      SUCCESS
Build38.7                      SUCCESS
Build38.8                      SUCCESS
Build38.9                      SUCCESS
Build38.10                     SUCCESS
Build41.3                      SUCCESS
all other non-baseline checks  SUCCESS
```

The only failures remaining were exactly the five inherited CI debts documented below. No review submission or unresolved review thread blocked merge.

## Productive F16 Transfer gate — STILL CLOSED

Build42.2 teaches the missing system but does **not** manufacture learner source ownership.

Still missing as trustworthy source evidence:

- no clean learner-facing `aux` contraction item;
- no equally clean learner-facing contraction-`des` source pair;
- no durable Foundation construction evidence owner.

Therefore:

```text
productive F16 Transfer  NOT AUTHORIZED
durable F16 mastery      NOT CLAIMED
Build42.3                 NOT AUTHORIZED
```

A future Transfer slice would require a separate source/readiness audit and explicit authorization. Build42.2 itself is not sufficient evidence.

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

Build42.2 does not change this boundary.

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
Build42 milestone closure audit — docs/read-only decision
→ verify whether F16 structural debt is sufficiently resolved by 42.1 + 42.2
→ decide CLOSE Build42 or identify a separately justified future audit
→ do NOT assume a Build42.3 implementation
```

Until that closure audit is accepted:

- do not implement productive F16 Transfer;
- do not claim durable Foundation mastery;
- do not start A2;
- do not add a new durable store merely to make intelligence look smarter.
