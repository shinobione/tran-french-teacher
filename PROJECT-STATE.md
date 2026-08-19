# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-19

## Canonical checkpoint

- Repository: `shinobione/tran-french-teacher`.
- Accepted `main` at the start of the current audit slice: **`79992e6acfce4d0913ae84838f93f47abc77c8c7`** (`Docs: close Build 42.2`), GitHub-verified.
- Build42.2 F16 learner-facing teach-core is **accepted / merged / exact-head CI-certified**.
- Product PR: **#230 — `Build 42.2 · F16 learner-facing contractions capsule`**.
- Candidate head accepted: **`1c11f253ce6841289f619252bfc077c7e657219a`**.
- Product merge: **`8b462fae236c00b902a9312fe8e1b103412b8694`**.
- Docs closeout merge: **`79992e6acfce4d0913ae84838f93f47abc77c8c7`**.
- Push-triggered GitHub Pages for the Build42.2 product/docs merges was **not independently proven through the available connector**; do not infer deployed/Pages-green from merge alone.
- Public runtime metadata remains **v2.5.0 · Build 38**.
- Pedagogy baseline remains **v2.3.0 · Build 34**.
- Current active slice: **Build42 milestone closure audit — docs/read-only candidate** on branch `docs/build42-milestone-closure-audit`.

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
Build42   ACTIVE — closure audit candidate recommends CLOSE
Build42.3 NOT AUTHORIZED
F16 Transfer NOT AUTHORIZED
P3 evidence-owner design NOT AUTHORIZED until Build42 closure acceptance
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

The only failures remaining were exactly the five inherited CI debts documented below.

## Build42 milestone closure audit — ACTIVE CANDIDATE

Canonical candidate audit:

```text
docs/BUILD-42-MILESTONE-CLOSURE-AUDIT.md
```

The audit distinguishes two questions:

```text
F16 teaching debt resolved?          YES
F16 durable mastery / Transfer ready? NO
```

Candidate closure verdict:

```text
Build42 should CLOSE
```

Reason:

- Build42.1 mapped real sources, the correct grammatical boundary and lesson38 placement;
- Build42.2 now teaches the complete mechanical system coherently;
- lesson22 partitive confusion is explicitly protected;
- the shared Foundations owner is reused with ephemeral-only state and no mastery claim;
- no separately justified F16 implementation remains inside the Build42 mission.

The continuing lack of durable Foundation/Transfer evidence is **not** treated as unfinished F16 teaching. It belongs to the later evidence-owner/readiness problem already identified by Build40.

Until this closure audit is accepted/merged, Build42 remains formally ACTIVE and no next implementation is authorized.

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

A future Transfer slice would require a separate source/readiness audit and explicit authorization.

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

Build42 does not change this boundary.

## Post-Build42 order — CANDIDATE DECISION

Build40 defined:

```text
P1 productive-family audit
P2 F16 à/de contractions audit
P3 evidence-owner design only after productive events exist
P4 re-run A1 readiness before A2
```

P1 is now complete through Build41: learner-facing deterministic Transfer widened from five Build38 families to six total.

P2 is complete through Build42.1 + Build42.2.

If the Build42 closure audit is accepted, the next canonical work becomes:

```text
P3 — evidence-owner design audit
READ-ONLY FIRST
→ inspect actual observable success/miss/assistance events
→ decide whether a minimal trustworthy Foundation/Transfer evidence owner is justified
→ no persistence-first architecture
```

Do **not** assign/authorize a Build43 implementation number until that audit proves a real owner/event model.

P4 / A2 remains blocked because durable construction/concept evidence has not changed yet.

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
Review Build42 milestone closure audit candidate
→ verify docs-only exact head / reviews / CI
→ if accepted, merge with expected-head protection
→ reconcile main as Build42 CLOSED
→ only then authorize P3 evidence-owner design audit
```

Until that acceptance:

- do not implement Build42.3;
- do not implement productive F16 Transfer;
- do not claim durable Foundation mastery;
- do not start P3 implementation;
- do not start A2;
- do not add a new durable store merely to make intelligence look smarter.
