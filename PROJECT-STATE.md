# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-18

## Canonical accepted main

- Repository: `shinobione/tran-french-teacher`
- Accepted `main`: **`2abe20511d6265d12643276f18041812fec3e715`**
- Commit: `Release: v2.5.0 Build 38 (#206)`
- PR: **#206 — merged**
- GitHub Pages: **#272 / run `32072053127` — SUCCESS** on exact accepted main SHA
- `github-pages` deployment: **5951805479 — SUCCESS** on exact accepted main SHA
- Public runtime release: **v2.5.0 · Build 38 — ACCEPTED / DEPLOYED**
- Pedagogy baseline: **v2.3.0 · Build 34**

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

## Release #206 certification result

Final candidate head before merge:

`78768ff26dcc64c090535163a10af8e019fdb4a1`

Dedicated final-head gates:

- `Release v2.5.0 Build 38 certification` — run `32071642717` — SUCCESS
- `Runtime version metadata` — run `32071642472` — SUCCESS
- `Build 38.10 Learner-facing spoken on transfer` — run `32071642921` — SUCCESS
- `Build 32 Practical A1 Expansion` — run `32071642675` — SUCCESS
- `Build 26.4 Progress single-scroll + Tyffany smoke` — initial flake, unchanged rerun SUCCESS

The final #206 matrix introduced no new persistent failure beyond the inherited baseline.

## Active slice — v2.5.0 release documentation closeout

- Branch: **`docs/v2.5.0-build38-release-closeout`**
- Base: exact accepted release main **`2abe20511d6265d12643276f18041812fec3e715`**
- PR: **#207 — `Docs · close v2.5.0 Build 38 release`**
- Candidate head before this handoff update: **`97cdbcd5eedce240e513ce7d8dd948c77af3912b`**
- Status: **OPEN / DOCS-GOVERNANCE ONLY / NOT MERGED**

Intended changed paths only:

```text
README.md
MASTER-ROADMAP.md
CHANGELOG.md
PROJECT-STATE.md
docs/RELEASE-VERSIONING-POLICY.md
docs/RELEASE-V2.5.0-BUILD38.md
```

This closeout must not change runtime, JS/CSS, workflows, curriculum, pedagogy, learner data, voice, Recovery/Evidence, Premium, PWA identity, logo or favicon.

## Historical learner continuity — LOCKED

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

No release, version, closeout or future Build39 work may reset or reinterpret this state.

## CI baseline

Known persistent inherited failure baseline:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Build26.4 is a classified runner/harness flake, not standing debt. Any other failure is **NEW until classified** and suspected flakes must be rerun unchanged before product mutation.

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
Build 38.1 / 38.3 / 38.4 / 38.6 / 38.9 deterministic core semantics
Build 38.2 / 38.5 / 38.7 / 38.8 / 38.10 learner placements
shared Transfer renderer ownership
```

## NEXT

Fresh control step only:

```text
re-read live PR #207 and its exact current head
→ verify changed filenames are exactly the six Markdown docs above
→ classify docs-only CI against the five inherited failures
→ rerun only proven flakes unchanged if needed
→ if no new regression, merge #207 with expected-head protection
→ verify main equals the merge SHA
→ verify GitHub Pages on that exact merge SHA
→ only then close the v2.5.0 documentation boundary
→ then Build 39 may be opened as a separate product slice
```

Do **not** start Build39 while #207 remains open.
