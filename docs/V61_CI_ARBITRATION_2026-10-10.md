# V6.1 CI arbitration — PR #258 / 2026-10-10

## Exact evidence and strict scope

- Accepted main `6b08edda98bd09520ed83c49682ebd2443202a23`. Candidate before this narrow repair `6d8a1d93b3b4eb47b6ed5237f246c61a57aefb13`.
- Main: **45 checked, 38 PASS, 7 FAIL** (2026-09-02 GitHub check runs). Candidate: **85 checked, 62 PASS, 23 FAIL** (2026-10-10). The denominator differs because the PR runs additional workflows: **do not subtract 7 from 23 and call all 16 introduced regressions.**
- V6.1 live visual workflow `38040234801` succeeded; it captured 12 screens, validated 52 real lessons and lower Practice hit targets. This is **not** an iPhone/PWA field PASS.
- Current PR remains **DRAFT**. Nothing is merged, deployed or released by this audit.
- The categories below are failure-mechanism classifications, **not** blanket permission to change predecessor contracts or waive CI.

## All 23 failing jobs — reviewed against actual logs/workflows

### A. 6 present already in main's check results (inherited / not introduced by V6.1)

| Job | Evidence at candidate | Interpretation / next action |
|---|---|---|
| `data-recovery` | Chrome `data-b28-restore-ok="0"` | Already FAIL on main; investigate a reproducible Recovery round-trip separately, keep safety guard |
| `recovery-v3-tribunal` | Node `AssertionError [ERR_ASSERTION]` | Already FAIL on main; independent Recovery proof needed |
| `evidence-shadow-adoption` | Node `AssertionError [ERR_ASSERTION]` | Already FAIL on main; independent Evidence v2 investigation |
| `v2-freeze` | `KeyError: 'architectureFrozen'` | Already FAIL on main; validate v2 metadata contract, do not fake field |
| `quality` | Build24 static/document contract exits 1 | Already FAIL on main; exact failed grep to isolate separately |
| `p3b-observation-runtime` | Unit P3b PASS then pinned-hash stage FAIL | Already FAIL on main; verify predecessor hash contract vs accepted source; no relaxation without proof |

The seventh main failure `build26-1-ux` was **PASS** on this PR; that does **not** prove its historical flake permanently fixed.

### B. 9 additional failures at a protected-owner diff guard

The following jobs fail when `git diff --name-only origin/main...HEAD` includes `index.html` or another forbidden predecessor-owned file. These are not observed functional regressions, but they are **real governance blockers**, not harmless flakes.

1. `nominal-plural-learner-integration`
2. `foundations-f11-negation`
3. `futur-proche-learner-integration`
4. `foundations-f08-regular-er`
5. `foundations-f05-subject-pronouns`
6. `foundations-f13-adjective-agreement`
7. `negation-learner-integration`
8. `foundations-f12-questions`
9. `learner-facing-transfer`

**Required next decision:** establish a reviewed successor-safe UI/PWA integration contract, analogous in philosophy (not necessarily code) to accepted PR #255 for Listening ownership. Preserve byte-identical pedagogical engines; do not edit historical workflows merely to paint green.

### C. 7 additional failures at a frozen-version/cache or predecessor-wiring check

1. `foundations-core-contract` — exact historical `CACHE` expected after `sw.js` changed.
2. `foundations-capsule-engine` — Python asserts exact historical `CACHE` after order checks.
3. `foundations-pilot-adapter` — Python asserts exact historical `CACHE` / predecessor wiring.
4. `theme-art-integration` — static V5.7 contract, exact old `CACHE`.
5. `v59d-brand` — old exact `CACHE` required in brand static contract.
6. `mockup-fidelity-reset` — old exact `CACHE` required in V5.5 static contract.
7. `iphone-pwa-a11y` — Build29 static wiring demands the old cache string in `index.html sw.js`; there is no reported Chrome iPhone accessibility failure from this run.

These failures have an identifiable historical version-contract cause. Nevertheless the change in `sw.js` is substantive and must be proven offline-safe. A successor test must explicitly check: new cache generation, all previous offline resources retained, new V6.1 CSS/JS available offline, and no learner storage or voice changes. Merely replacing the expected string across all historic workflows is **not** sufficient.

### D. 1 newly identified V6.1 behavior/DOM contract failure

- `practice-advisory`: real Chrome Build39.5 `retrieval:practice-geometry`. The existing suite counts `page.querySelectorAll('.b27-practice-action')` and requires **exactly four** viable Practice action owners. In V6.1 a real-life recommendation displayed a **fifth** button carrying that same CSS class.
- **Narrow fix in this work unit:** use a distinct visual class `v61-recommendation-action` for that additional button, retaining its real `data-b27-practice-action="real-life"` route and existing `.v61-practice-recommendation button` styling. The four canonical activities stay intact and the recommendation is not nested inside their buttons.
- V6.1 visual fixture additionally asserts that the whole Practice overlay contains exactly four `.b27-practice-action` owners (not merely four inside the grid).
- **Status:** candidate source fix only until the exact-head `practice-advisory` Chrome run passes. Do not declare functional PASS early.

## Decision and next exact actions

1. Wait for the *new commit's* exact-head `practice-advisory` workflow. If red, inspect which geometry element failed and fix that rather than guessing.
2. Classify remaining CI conditions as governance-version successor work, historical baselines, or true regressions; **do not merge PR #258** with unresolved mandatory checks.
3. Prepare a focused successor-safe PWA/CI proposal for legacy `index.html`/`sw.js` protections, with non-regression proof rather than mass workflow edits. This is a separate authorized slice.
4. Preserve V6.1 visual captures, Chrome themes, accessibility, offline and real installed-iPhone gate; move to high-fidelity Quiz only after Home/Practice acceptance.

**Protected:** `app.js`, `voice-ios.js`, `free-voice.js`, curriculum IDs/items, 7 Recovery stores, Memory/Evidence, base Premium art and theme backgrounds. No direct mutations were made here.

## CI successor pilot — 2026-10-10

A new fail-closed Node attestation `tools/test-v61-pwa-successor.cjs` compares candidate `index.html`, `sw.js` and `src/core/build32-loader.js` to exact expected transformations of accepted main `6b08edda98bd09520ed83c49682ebd2443202a23`. All historical SW CORE entries stay byte-identical; only V6.1 CSS and JS are appended, and the PWA cache/boot version advances together. Selected protected owners remain byte-identical; three negative mutation examples are asserted. The independently running workflow `v61-pwa-successor-ownership` and three old Premium jobs retain their original functional and hash checks, replacing only the frozen cache-name literal with an either-legacy-or-positive-successor assertion. This is a **three-job pilot**; it does not waive or solve the other 13 additional governance blockers. Exact-head CI results and real offline/iPhone evidence are still pending.

## Strict proof follow-up — expected newline repair

The run for commit `06f9a4e0409cce7c31b74db1b10bb7c653a15ec3` showed `AssertionError: sw.js: unapproved source change` in `v61-pwa-successor-ownership` and each of the three pilot predecessor jobs. GitHub's actual/expected diff identifies **a single surplus blank line in the proof-generated expectation** between the new V6.1 CORE entries and the historical first CORE item. Candidate `sw.js` is not modified here. The expected-string constructor now lets the original newline from `const CORE=[` supply the separator. Re-run the full positive and negative proof; do not infer green ahead of CI.

## Binary sanctuary follow-up

The first retest passed the byte-for-byte JS/SW/HTML expected-source comparisons; the attestation then stopped at `assets/LOGO.png` with `spawnSync git ENOBUFS` because `git show` exceeded Node's default output buffer. The binary sanctuary now compares Git object hashes (`git rev-parse BASE:path` versus `git hash-object path`), which proves byte identity without materializing multi-megabyte blobs in stdout. This does not change the acceptance standard. Exact-head rerun required.
