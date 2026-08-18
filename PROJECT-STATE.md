# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-18

## Canonical accepted main

- Repository: `shinobione/tran-french-teacher`
- Accepted `main`: **`fe439de166ddb20c036d7253671e104eaa0eb5d5`**
- Commit: `Docs: close v2.5.0 Build 38 release`
- PR: **#207 — merged**
- #207 was documentation/governance plus predecessor-CI successor-safety maintenance; it did not change learner runtime/product semantics.
- Public runtime release: **v2.5.0 · Build 38 — ACCEPTED / DEPLOYED**
- Pedagogy baseline: **v2.3.0 · Build 34**
- Latest exact release deployment proof remains **GitHub Pages #272 / run `32072053127` — SUCCESS** on release SHA `2abe20511d6265d12643276f18041812fec3e715`, with `github-pages` deployment `5951805479 — SUCCESS` on that same release SHA.
- The GitHub connector used for #207 closeout could verify `main == fe439de...` but could not enumerate the later push-triggered Pages run by SHA. Do not invent a run ID for it.

## Accepted product state

- Curriculum: **52 lessons / 313 items**
- Scenario: **44 situations / 132 turns**
- Speaking Loop: **52/52 · max 2 moments / lesson**
- Listening: **0.88 normal / 0.65 slow**
- Recovery: **7 durable stores / backup v3**
- Evidence v2: **derived shadow only**; original six stores remain product truth
- Premium V5.10: **CLOSED / physical field pass**
- Primary field target: **iPhone / Safari / installed PWA**

## Build 38 — CLOSED / RELEASED

Certified learner-facing chain:

```text
38.1 → 38.2   subject substitution       → lesson 33
38.3 → 38.8   affirmation → negation     → lesson 34
38.4 → 38.5   present → futur proche     → lesson 35
38.6 → 38.7   singular → plural nominal  → lesson 13
38.9 → 38.10  nous → spoken on           → lesson 52
```

- latest learner-facing roadmap checkpoint: **38.10**
- Build 38 milestone: **PEDAGOGICALLY COMPLETE / CLOSED / RELEASED**
- Build 38.11: **NOT AUTHORIZED**
- public release representing the milestone: **v2.5.0 · Build 38**

## Active slice — Build 39.1 Learner action arbitration core

- Milestone: **Build 39 — Learner Intelligence 3**
- Branch: **`build39/learner-action-arbitration-core`**
- Base: exact accepted main **`fe439de166ddb20c036d7253671e104eaa0eb5d5`**
- PR: **#208 — `Build 39.1 · learner action arbitration core` — OPEN**
- Implementation head before this checkpoint commit: **`4549b14bba6100b352b35c1318bb38e5d5be9382`**
- Status: **CANDIDATE / PURE CORE / NOT WIRED / NOT MERGED**

Build39 roadmap mandate: Tyffany should eventually choose the next useful action among:

```text
phrase retrieval
concept review
Foundation capsule
listening
scenario
transfer / construction
```

39.1 introduces the pure deterministic owner:

```text
src/pedagogy/learner-intelligence-v3-core.js
```

Canonical action IDs:

```text
phrase-retrieval
concept-review
foundation-capsule
listening
scenario
transfer-construction
```

The core accepts already-normalized candidate evidence and either:

- selects one reliable next action; or
- explicitly abstains with `insufficient-reliable-evidence`.

Reliability boundary:

- observed need required;
- minimum confidence required;
- independent evidence required;
- transfer/construction requires two independent pieces of evidence;
- blocked/unavailable candidates are ineligible;
- `recognition-failure-only` candidates are explicitly ineligible;
- decorative activity totals do not affect arbitration;
- ties are deterministic and input-order independent.

## 39.1 explicit non-wiring contract

This slice must not:

```text
read or write localStorage / sessionStorage / IndexedDB
make Evidence v2 product truth
change Learner Intelligence V1/V2
change curriculum
change Foundations ownership or routes
change Listening / Scenario / Transfer behavior
change voice
change Recovery / backup
change Premium UI
change PWA identity / cache
change public runtime version metadata
```

Evidence v2 remains a seventh **derived shadow**. 39.1 is not an Evidence read-path cutover.

## 39.1 candidate paths

```text
src/pedagogy/learner-intelligence-v3-core.js
tests/unit/build39-1-learner-action-core.test.cjs
.github/workflows/build39-1-learner-action-core.yml
docs/BUILD-39.1-LEARNER-ACTION-ARBITRATION.md
PROJECT-STATE.md
```

`MASTER-ROADMAP.md` already contains the durable Build39 mandate and ordering. Its top current-line checkpoint still predates the #207 merge; that volatile summary is known stale and must be reconciled at the next documentation/control closeout if not repaired inside #208. Repository reality and this `PROJECT-STATE.md` take priority in the meantime.

## Historical learner continuity — LOCKED

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

No Build39 work may reset, renumber or reinterpret this state.

## CI baseline

Known persistent inherited failure baseline:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Build26.4 is a classified runner/harness flake, not standing debt. Any other failure is **NEW until classified**. Suspected flakes must be rerun unchanged before product mutation.

## Protected boundaries

Preserve unless a future explicitly scoped build justifies otherwise:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
PWA identity/cache contract from PR #180
Recovery v3 seven-store ownership
backup envelope v3
Evidence derived-shadow role
52 / 313 curriculum semantics
Premium V5.10 field-approved UI/navigation
Build 37 Foundations ownership/routes
Build 38 deterministic core semantics
Build 38 learner-facing placements
shared Transfer renderer ownership
Learner Intelligence V1/V2 historical compatibility
```

## NEXT

Fresh control step only:

```text
re-read PR #208 and its exact current head
→ verify changed filenames stay inside the 39.1 candidate scope
→ require Build 39.1 Learner action arbitration core to pass on that exact head
→ require existing v2.5.0 / Build38 release and Build38.10 predecessor certification to remain green
→ classify the full CI matrix against the five inherited failures
→ rerun only proven flakes unchanged if needed
→ if no new regression, merge #208 with expected-head protection
→ verify main equals the merge SHA
→ reconcile any remaining stale MASTER-ROADMAP current-line metadata
→ then open 39.2 as a separate evidence-adapter audit/implementation slice
```

Do **not** wire 39.1 into learner UI and do **not** start 39.2 while #208 remains open.
