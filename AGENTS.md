# French Trân’quille — Agent Operating Contract

This repository is a long-lived product. **Do not use chat history, an old README snapshot, or memory as the source of truth.** Reconstruct the current state from the repository before making implementation or roadmap decisions.

## Mandatory startup sequence

Before changing code, CSS, assets, tests, data, roadmap, or release state:

1. Read **`PROJECT-STATE.md`** first for the short current checkpoint.
2. Read **`MASTER-ROADMAP.md`** for the canonical execution order, locked product decisions, field verdicts, and future build gates.
3. Verify the real GitHub/git state: current branch/HEAD, recent commits, open PRs, relevant issue(s), CI/workflow status, and deployment/Pages status when the task can affect runtime.
4. If repository reality disagrees with documentation, **repository reality wins**. Repair the stale checkpoint/documentation in the same work unit instead of silently trusting old text.
5. Only then implement the requested work.

## Source-of-truth priority

When information conflicts, use this order:

1. actual git/GitHub state, deployed runtime evidence, CI and field verdicts;
2. `PROJECT-STATE.md` — volatile handoff/checkpoint;
3. `MASTER-ROADMAP.md` — durable roadmap and product contracts;
4. build/architecture documents in `docs/`;
5. `ROADMAP.md`, `CHANGELOG.md`, `README.md` and historical notes;
6. old conversations, pasted summaries, model memory.

`README.md` is useful product documentation but **must never override `PROJECT-STATE.md` or `MASTER-ROADMAP.md` for current execution state**.

## Mandatory closeout / checkpoint duty

Every meaningful work unit that changes project state must leave the repository resumable by a fresh agent with no conversation history.

Before declaring work closed:

- update `PROJECT-STATE.md` whenever any volatile fact changed: `main` SHA, runtime SHA, active branch/PR, current phase, next exact action, blockers, CI/deployment state, or field gate;
- update `MASTER-ROADMAP.md` only when the durable roadmap, a locked decision, a phase gate, or execution order changed;
- update `CHANGELOG.md` / release docs when a shipped product change requires them;
- keep issue state and PR state aligned with the checkpoint;
- record exact SHAs/run IDs only when verified; never invent them;
- distinguish **merged**, **deployed**, **CI green**, **artifact-reviewed**, and **physical-device/user PASS** — they are not interchangeable;
- do not close a phase that requires human/iPhone validation until that validation is explicitly reported.

A fresh agent should be able to answer, from the repo alone:

- What is live?
- What is the latest canonical checkpoint?
- What is currently open?
- What is blocked?
- What is the next exact slice?
- Which behaviours/files are protected?
- Which tests/field gates still matter?

If it cannot, the closeout is incomplete.

## Current permanent project constraints

Unless `MASTER-ROADMAP.md` explicitly changes them:

- primary field target: iPhone / Safari / installed PWA;
- no route/page crossfade that exposes competing app facades;
- learner data must never be silently reset;
- no fake pronunciation score or phonetic diagnosis from recognition failure;
- local replay audio does not enter learner progress, Memory, or backups;
- migrations require snapshot + validation + rollback proof;
- visual Premium work must not steal the reserved Build 35 pedagogical/memory milestone;
- protected sanctuaries remain protected unless a build explicitly justifies touching them.

## Working style for coding agents

- Prefer the **smallest coherent slice** that advances the current canonical phase.
- Inspect existing implementation and tests before replacing architecture.
- Preserve proven field behaviour while polishing visuals.
- Run the relevant existing tests after changes; when a browser/field regression is involved, exercise the actual action that broke, not only DOM existence.
- Do not rewrite historical baselines merely to make tests green.
- If a CI failure is clearly a known harness flake, prove that from logs/state before rerunning it unchanged; do not mutate product code to appease a flaky test.
- Keep the repository in a clean, documented, resumable state.

## Codex / coding-agent budget contract — one slice per session

This rule is mandatory after the V5.8 quota incident.

**One canonical implementation slice = one coding-agent session.**

A coding agent must not turn one prompt into an autonomous marathon across several roadmap phases.

For an implementation slice:

1. reconstruct state from `AGENTS.md` → `PROJECT-STATE.md` → relevant `MASTER-ROADMAP.md` sections → real GitHub state;
2. implement **only the named active slice**;
3. run the relevant local/browser tests needed to establish a candidate;
4. materialize the work in git and open/update the slice PR;
5. update the checkpoint/documents required for that candidate;
6. **STOP and return control.**

Unless the user explicitly asks otherwise in the same turn, the coding agent must **not**:

- sit on GitHub Actions waiting for every workflow to finish;
- spend model quota polling CI;
- diagnose/rerun unrelated historical flakes after the candidate PR is already published;
- merge the PR;
- monitor Pages after merge;
- perform documentation closeout for a later phase;
- automatically begin the next roadmap slice.

CI review, flake classification/reruns, merge, Pages verification, issue/checkpoint reconciliation and the decision to start the next slice should be handled in a fresh control session / GitHub review step unless explicitly delegated.

Before starting any next slice, the previous slice must be **materialized in git**. Never rely on an ephemeral review panel, hidden worktree state or uncommitted agent workspace as project memory.

## Premium V5.9 shared-system rule

The active post-V5.8 Premium work is a **shared-system coherence pass**, not a theme-by-theme patch march.

Agents must treat the following as cross-theme system problems:

- lesson-card structure and decoration ownership;
- button/card visual language;
- icon family consistency;
- whole-card hit targets;
- DEBUG/admin access;
- interaction feel and motion rules.

Agents must not:

- fix Aurora, Sunset, Nocturne and Original as four disconnected implementations when one shared layout contract can solve the problem;
- hand-place the lesson identity cluster independently per theme;
- reintroduce a theme-specific DEBUG dependency;
- expose a large learner-facing DEBUG button just because the admin feature exists;
- regenerate locked Premium backgrounds to solve layout problems;
- start Build 35 while #114 remains open.

The theme may change **palette, background artwork, lesson Eiffel artwork and restrained accents**. The shared component/layout grammar should stay common unless there is a documented product reason to diverge.

## Fast resume rule

For a new Codex/AI session, the minimal safe boot is:

```text
read AGENTS.md
→ read PROJECT-STATE.md
→ read MASTER-ROADMAP.md sections relevant to NEXT
→ verify current git/GitHub state
→ continue from NEXT, not from chat history
```
