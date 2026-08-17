# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
> Repository/GitHub reality wins over stale wording. Always verify live `main`, PRs, CI and Pages before acting.

## Current checkpoint — 2026-08-17

- Repository: `shinobione/tran-french-teacher`.
- Default branch: `main`.
- Latest substantive governance/versioning merge: **`f1dd921acb3c95180aa849d40e1ba3795b4498db`** — PR **#201**, roadmap/README/version-policy reconciliation through Build 38.9.
- GitHub Pages proof for PR #201: **#267 / run `32061546370` — SUCCESS** on exact SHA `f1dd921acb3c95180aa849d40e1ba3795b4498db`.
- PR #201 was merged under an explicit **docs-only queue exception** while its full workflow fan-out was still queued. Do **not** rewrite this as “full matrix green before merge”. No runtime/product file changed in #201.
- Current accepted Build 38 product/core checkpoint: **`a33e504cdc20438c454fc365371af545ef747f0c`** — PR **#199**, Build **38.9 · deterministic nous→on spoken transfer core**.
- Current learner-facing Transfer runtime remains Build **38.8** from **`3fae502dba8faee003b44c5a1b9a9cffd9affec7`**; Build 38.9 is intentionally **pure/non-wired**, so it adds no learner-facing route yet.
- GitHub Pages Build 38.9 product/core proof: **#265 / run `32059362998` — SUCCESS** on exact `a33e504c…` merge SHA.
- GitHub Pages Build 38.9 docs-closeout proof: **#266 / run `32059893554` — SUCCESS** on exact `0d7b8a31…` merge SHA.
- Post-merge Actions on accepted 38.9 product/core: exactly **4 inherited historical failures**, **0 queued**, **0 in-progress**. No new red.
- Public application runtime metadata remains intentionally **v2.4.0 · Build 36**.
- Pedagogy baseline remains **v2.3.0 · Build 34**.
- Internal roadmap checkpoint is independently **Build 38.9**.
- Curriculum: **52 lessons / 313 items**.
- Scenario: **44 situations / 132 turns**.
- Listening: **0.88 normal / 0.65 slow**.
- Speaking Loop: **52/52 · max 2 moments / lesson**.
- Recovery: **7 durable stores / backup v3**.
- Evidence v2: **derived shadow only; original six stores remain product truth**.
- Premium V5.10: **CLOSED / physical FIELD PASS**.
- **Build 35 CLOSED. Build 36 CLOSED. Build 37 CLOSED.**
- **Build 38 ACTIVE — Generalization & Transfer.**
- 38.1 CLOSED — deterministic subject-substitution core.
- 38.2 CLOSED / DEPLOYED — subject Transfer in lesson 33.
- 38.3 CLOSED — deterministic affirmation→negation core.
- 38.4 CLOSED — deterministic present→futur proche core.
- 38.5 CLOSED / DEPLOYED — futur proche Transfer in lesson 35.
- 38.6 CLOSED — deterministic singular→plural nominal core.
- 38.7 CLOSED / DEPLOYED — nominal plural Transfer in lesson 13.
- 38.8 CLOSED / DEPLOYED — negation Transfer in lesson 34.
- **38.9 CLOSED / CERTIFIED / NON-WIRED** — deterministic `nous → on` spoken-French transfer core.
- Versioning governance is **CLOSED**. `MASTER-ROADMAP.md`, current `README.md` and `docs/RELEASE-VERSIONING-POLICY.md` are reconciled through 38.9; the previous Build 34 README is preserved as historical evidence in `docs/HISTORICAL-README-BUILD34.md`.

## Version metadata rule — LOCKED

The Settings value is **not derived from the latest roadmap slice number**.

```text
Public runtime release = v2.4.0 · Build 36
Pedagogy baseline      = v2.3.0 · Build 34
Roadmap checkpoint     = Build 38.9
```

Rules:

- Build 37.x / 38.x are roadmap slices, not SemVer patch numbers;
- public runtime metadata changes only through an explicit release-version slice with dedicated tests and documentation;
- the public `Build` beside SemVer is the release-build anchor, not the latest internal roadmap checkpoint;
- a future DEBUG/admin surface may expose the roadmap checkpoint separately, but must not overwrite the public release field;
- after an explicit future Build 38 closure, **`v2.5.0 · Build 38` is the natural candidate**, not a release already assigned.

Canonical policy: `docs/RELEASE-VERSIONING-POLICY.md`.

## Build 38.9 — certified core

Family:

```text
nous-on-spoken-equivalence
status = pure-non-wired
persistence = ephemeral-only
masteryClaim = false
```

Exact catalog:

```text
Nous travaillons. → On travaille.
Nous rentrons.    → On rentre.
Nous allons à…    → On va à…
```

Curriculum anchors:

```text
lesson 34 → learner-known nous scaffold
lesson 52 / F18 → spoken on often means nous + il/elle verb form
```

Explicit exclusions remain locked:

```text
On est prêts.
On a le temps.
generic / indefinite on
passive on
object-pronoun rewrites
negation
questions
adjective agreement
new vocabulary
random/adaptive generation
durable writes
Evidence product reads
mastery claims
learner-facing lesson wiring
```

Certification / closeout:

```text
PR #199 MERGED
candidate head e066baa3d4c481f65bb361a4406d2a861b7563f3
squash merge a33e504cdc20438c454fc365371af545ef747f0c
Build 38.9 dedicated run 32058789584 SUCCESS
full PR matrix: only the four inherited historical failures
post-merge: only the same four inherited failures
0 queued / 0 in-progress
Pages #265 / run 32059362998 SUCCESS on exact merge SHA

PR #200 MERGED — Build 38.9 documentation closeout
merge 0d7b8a31d4731024ff9e86d97e3128bad572efb3
Pages #266 / run 32059893554 SUCCESS

PR #201 MERGED — roadmap / README / release-versioning reconciliation
merge f1dd921acb3c95180aa849d40e1ba3795b4498db
Pages #267 / run 32061546370 SUCCESS
merge used docs-only queue exception; no runtime/product change
```

Build 38.9 does **not** authorize a lesson-52 Transfer card automatically. A learner-facing placement must be audited separately for usefulness, density and non-duplication with the existing lesson/F18 teaching.

## Existing learner-facing Transfer routes — LOCKED

```text
38.7 → lesson 13 / nominal plural / [0,2,3]
38.2 → lesson 33 / subject substitution / [0,2,5]
38.8 → lesson 34 / affirmation→negation / [0,1,2]
38.5 → lesson 35 / futur proche / [0,1,3]
```

There is still exactly **one shared Transfer renderer**.

## Build 37 Foundation ownership — LOCKED

```text
F01–F04 → lessons 8–13
F11     → lessons 17–20
F08     → lessons 32–33
F05     → lessons 34–36
F13     → lesson 40 only
F12     → lessons 41–43
```

F16 remains deferred / not completed. F18 remains `reuse-existing` and is canonically taught by lesson 52.

## Inherited CI debt

Exactly four historical failures remain baseline debt:

1. `Build 36.2 Evidence shadow adoption`;
2. `V2.0.0 Freeze tribunal`;
3. `Build 36.3 Recovery v3 durability tribunal`;
4. `Build 28 Data recovery smoke`.

Any other failure must be classified. Historical red debt is not permission to ignore new failures.

## Protected boundaries

Do not silently change:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
PWA identity/cache contract from PR #180
Recovery v3 / backup v3 / seven-store ownership
Evidence derived-shadow role
original six stores as product truth
52/313 curriculum semantics
Listening / Scenario / Mastery / Learner Intelligence owners
V5.10 field-approved navigation/visual identity
Build 37 Foundation routes
38.1 / 38.3 / 38.4 / 38.6 / 38.9 pure-core semantics
38.2 lesson-33 Transfer placement
38.5 lesson-35 Transfer placement
38.7 lesson-13 Transfer placement
38.8 lesson-34 Transfer placement
shared Transfer renderer ownership
```

Historical learner continuity remains a release contract:

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

## NEXT — Build 38.9 learner-placement audit

There is **no active implementation candidate** after the versioning-governance closeout.

Next product control step:

```text
read live lesson 52 + F18 learner-facing teaching
→ test whether the certified 38.9 construction exercise adds genuine retrieval/recombination value
→ reject placement if it merely repeats existing F18 / lesson-52 explanation or examples
→ check lesson density and round-trip UX
→ preserve all existing Transfer routes
→ if useful, assign ONE separate learner-facing integration slice
→ otherwise audit at most ONE other narrow Build 38 family
```

Do **not** pre-assign `38.10` merely because 38.9 exists.
Do **not** start Build 39 while Build 38 still has unresolved transfer/placement decisions.

See `MASTER-ROADMAP.md`, `docs/BUILD-38.9-CLOSEOUT.md` and `docs/RELEASE-VERSIONING-POLICY.md`.