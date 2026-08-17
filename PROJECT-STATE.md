# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-17

## Canonical accepted main before active release candidate

- Repository: `shinobione/tran-french-teacher`
- Accepted `main`: `8790eb059f47bcde0ea399962f7b42a3b9501714`
- Commit: `Docs: close Build 38 milestone`
- PR: #205 — merged
- GitHub Pages: #271 / run `32068419523` — SUCCESS on exact accepted main SHA
- Open PR count at candidate start: 0

## Accepted product state

- Public runtime release on accepted main: **v2.4.0 · Build 36**
- Pedagogy baseline: **v2.3.0 · Build 34**
- Curriculum: **52 lessons / 313 items**
- Scenario: **44 situations / 132 turns**
- Speaking Loop: **52/52 · max 2 moments / lesson**
- Listening: **0.88 normal / 0.65 slow**
- Recovery: **7 durable stores / backup v3**
- Evidence v2: **derived shadow only**; original six stores remain product truth
- Premium V5.10: **CLOSED / physical field pass**

## Build 38 milestone

**CLOSED / PEDAGOGICALLY COMPLETE.**

Certified chain:

```text
38.1 → 38.2   subject substitution       → lesson 33
38.3 → 38.8   affirmation → negation     → lesson 34
38.4 → 38.5   present → futur proche     → lesson 35
38.6 → 38.7   singular → plural nominal  → lesson 13
38.9 → 38.10  nous → spoken on           → lesson 52
```

Build 38.11 is **NOT AUTHORIZED**.

## Active slice — release-version certification

- Branch: `release/v2.5.0-build38-certification`
- Base: exact accepted main `8790eb059f47bcde0ea399962f7b42a3b9501714`
- Target public release: **v2.5.0 · Build 38**
- Pedagogy baseline remains: **v2.3.0 · Build 34**
- PR: pending creation from this branch in this slice
- Status: **CANDIDATE / NOT MERGED / NOT YET AN ACCEPTED PUBLIC RELEASE**

### Release-only scope

Allowed implementation ownership:

- `src/core/build31-loader.js` — release cache-bust for Build32 successor URL only
- `src/core/build32-loader.js` — public runtime metadata only
- runtime version tribunal/workflow
- `release-v2.5.json`
- dedicated release contract test/workflow
- release documentation / README / this volatile handoff

Explicitly out of scope:

- curriculum / Foundations / Transfer semantics
- learner stores / Recovery schema / Evidence role
- `app.js`
- `voice-ios.js`
- `free-voice.js`
- `index.html`
- `sw.js`
- `manifest.webmanifest`
- `assets/LOGO.png`
- `assets/Favicon.png`
- Premium UI and navigation

## Historical learner continuity — release invariant

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

No version or release operation may reset or reinterpret this state.

## CI baseline

Known inherited failure baseline entering this candidate:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Build 26.4 is a classified runner/harness flake, not a standing baseline debt; unchanged rerun previously passed.

Any other failure is **NEW until classified**. A suspected flake must be rerun unchanged before product changes.

## Release gate

The candidate may merge only if:

- dedicated v2.5.0 / Build38 release certification passes;
- runtime-version metadata tribunal passes;
- Build38.10 predecessor guard passes;
- VI/FR × desktop/iPhone metadata rendering is correct;
- release scope guard proves no product-semantic drift;
- full matrix introduces no new failure beyond the inherited baseline.

After merge:

1. verify exact `main` merge/squash SHA;
2. require GitHub Pages SUCCESS on that exact SHA;
3. only then accept **v2.5.0 · Build 38** as public runtime release;
4. perform a separate docs-only closeout for MASTER-ROADMAP, release-versioning policy, CHANGELOG, and final PROJECT-STATE.

No Build39 work is authorized inside this release slice.
