# GitHub Actions governance — Issue #259, 10 October 2026

Source: accepted `main` at `6b08edda98bd09520ed83c49682ebd2443202a23`. This change is separate from visual design PR #258.

## Evidence from the live repository

- 89 original workflow YAML files; 84 subscribe to `pull_request` and only 2 contain `paths` filters.
- None of those 84 had a workflow-level concurrency policy. Pages alone already had a concurrency policy.
- Four consecutive commits to PR #258 produced 86 checks each (344 checks total), although they included small targeted CI edits.
- The latest verified #258 commit `724a52d1` finished 69 PASS / 17 FAIL; the F08 Chrome tests passed.
- GitHub's branch-protection API returned 403 to this integration. The owner subsequently supplied screenshots from **Settings > Branches** and **Settings > Rulesets** explicitly showing **no classic protection rules and no rulesets**. Thus no check is currently mandatory via those mechanisms. This also means `main` lacks their merge safeguards; minimal protections should be created after validating the always-running safety gate.

## Phase 1 — PR supersession (implemented in candidate)

All 84 existing PR workflows receive a workflow-level `concurrency` stanza. Its key is the unique `github.workflow_ref` plus the PR number; any other event uses its unique `github.run_id`. Only `pull_request` runs use `cancel-in-progress: true`. This avoids cross-workflow cancellation and never groups unrelated `push/main`, manual, release or deployment runs.

**Non-PR exceptions protected:** `pages.yml` and the four historical push-only workflow YAMLs are unchanged. Every pre-existing workflow/job/check identifier, step and test remains available. There is no runtime, pedagogy, Voice, Recovery, storage, assets or manifest change.

Expected: if a newer commit lands in the same PR, an older run of the same workflow is canceled. This reduces accumulated overlapping runs, NOT the 84 initial PR-triggered workflows. Already queued runs created before adoption may continue; test with future real commits, not synthetic spam.

## Phase 2 — safest initial saving (implemented pilot)

The two Premium workflows `premium-v5-fidelity-reset.yml` and `premium-v5-theme-art-integration.yml` keep their original static checks and all functional Chrome tribunals. An early fail-open classifier inspects the ENTIRE three-dot PR diff (`git diff --no-renames --name-only origin/main...HEAD`), with full checkout history and fetch of main.

- Only a documentation-only diff (`docs/**`, root `*.md`) may skip the expensive screenshot capture AND its artifact upload.
- Any code, asset, PWA, learner data, test, CI workflow or unknown path triggers the full visual capture matrix.
- Empty diffs, unavailable diffs or non-PR events always trigger full captures.
- Visual job names and trigger configurations are retained, so the required-check identity is preserved.
- A new path-scoped `ci-governance` check verifies all 85 PR-aware workflows (84 original plus itself), the five protected non-PR workflow hashes, and the conservative scope classifier.

This pilot reduces **execution work**, not the initial number of triggered workflows. It does not skip a single functional or security test.

## Phase 2 — safe first reduction of workflow triggers (21 specialized suites)

The owner confirmed that there are no currently configured classic branch protections or repository Rulesets. This removes the possibility of stranding a check required by either mechanism on an untriggered `paths` filter. Because **no merge protection exists**, this is a targeted trial, **not permission to bypass safety or auto-merge**.

Exactly 21 legacy specialized workflows in **Build37 (8), Build38 (10), Build41 (2) and Build42 (1)** now use `pull_request.paths`, while keeping their existing non-PR `push` triggers, all historical steps and original check names. The workflow file itself is included so edits to its policy always run its tribunal.

Permitted PR triggers are changes in `src/pedagogy/**`, relevant `tests/browser/buildNN*`, `tests/unit/buildNN*`, `tools/test-buildNN*`, `src/core/data-recovery*`, `src/core/memory-evidence*`, and the exact `.github/workflows/{name}`. Build38 and later regression suites also include predecessor test families as appropriate.

Crucially, `index.html`, `sw.js` and `src/premium/**` **alone no longer trigger all 21 historical pedagogy workflows**. Changes to common app boot/UI/Voice are still assessed by the existing always-triggered cross-cutting workflows, including iPhone PWA/offline, quality/runtime and Recovery. For any high-risk integration PR, reviewers should additionally invoke the relevant full specialized regressions if there is a cross-layer semantic effect.

**Projected rather than measured:** on a future purely visual PR with no selected specialist paths, up to **21 fewer specialized jobs** should be launched, from the prior ~86 to around ~65 check runs. A PR such as this governance PR, which edits those 21 workflow YAMLs, deliberately launches them all: its count is NOT a valid before/after comparison.

The scope is enforceable in `tools/test-ci-governance.cjs`, which reconstructs each of the 21 expected workflow texts from accepted `main` plus precisely the concurrency and PR path policy inserts, proving historical tests and push triggers were not rewritten.

### Remaining launch-count work

- Keep all core PWA/offline, Recovery, learner integrity, Voice, visual integration and release/deployment checks running until a stable required merge gate and independent risk-based test routing are reviewed.
- Configure protection of `main` with at least one always-triggered meaningful safety check; do **not** make the path-scoped `ci-governance` workflow a blanket required check without making it always appear.
- Measure actual post-merge fresh PR check count, run duration, canceled obsolete jobs and test coverage, then authorize further narrowing of specialized workflows as a separate change.
## Rollback and acceptance

- Governance contract CI PASS on its exact PR head, including byte-equivalent preservation of all 21 specialists' original tests/steps and non-PR triggers; all historic workflow job/status names remain available.
- Pages and four push-only workflow SHA1 Git blob identities must be unchanged versus accepted main.
- Premium Chrome functional tribunals still run; optional screenshot artifact work skips ONLY for docs-only PRs.
- No merge/deployment or physical iPhone PASS is inferred from check completion.
- A rollback of this independent governance PR (if merged later) restores the prior workflow configuration without changing the application.

Official GitHub references:
- https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#concurrency
- https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
