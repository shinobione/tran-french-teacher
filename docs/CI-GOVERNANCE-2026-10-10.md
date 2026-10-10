# GitHub Actions governance — Issue #259, 10 October 2026

Source: accepted `main` at `6b08edda98bd09520ed83c49682ebd2443202a23`. This change is separate from visual design PR #258.

## Evidence from the live repository

- 89 original workflow YAML files; 84 subscribe to `pull_request` and only 2 contain `paths` filters.
- None of those 84 had a workflow-level concurrency policy. Pages alone already had a concurrency policy.
- Four consecutive commits to PR #258 produced 86 checks each (344 checks total), although they included small targeted CI edits.
- The latest verified #258 commit `724a52d1` finished 69 PASS / 17 FAIL; the F08 Chrome tests passed.
- GitHub's branch protection API returned 403 to this integration. Empty ruleset-list output does NOT prove there are zero required checks.

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

## Phase 2 — trigger fan-out reduction remains gated

Do not add workflow-level `on.pull_request.paths` to old workflows until the required-check inventory from GitHub Settings > Branches / Rules is known. GitHub may leave skipped REQUIRED checks permanently Pending. A return of 403 from GitHub API prevents safe automatic classification of required versus optional checks.

Next controlled slice: user or repository administrator supplies the exact required check names; retain always-present mandatory coverage (PWA/offline, Recovery, Voice, learner data, curriculum integrity, integration), classify specialized suites by owned paths, add stable required gate(s) where needed, and measure actual start count/runner minutes before merging.

## Rollback and acceptance

- Governance contract CI PASS on its exact PR head; all historic workflow job/status names remain available.
- Pages and four push-only workflow SHA1 Git blob identities must be unchanged versus accepted main.
- Premium Chrome functional tribunals still run; optional screenshot artifact work skips ONLY for docs-only PRs.
- No merge/deployment or physical iPhone PASS is inferred from check completion.
- A rollback of this independent governance PR (if merged later) restores the prior workflow configuration without changing the application.

Official GitHub references:
- https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax#concurrency
- https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
