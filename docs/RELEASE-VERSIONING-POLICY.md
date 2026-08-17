# French Trân’quille — Release & Versioning Policy

Status: **CANONICAL GOVERNANCE POLICY**

Last reconciled: 2026-08-18

## Problem this policy solves

French Trân’quille historically reused the words `version`, `build` and `current` for several different concepts:

- the version displayed in Settings;
- historical architecture baselines;
- pedagogy baselines;
- roadmap phases such as Build 37 and Build 38;
- implementation slices such as 38.8 and 38.10.

That made a correct Settings value look stale and made stale README wording look authoritative.

This policy separates those concepts permanently.

## 1. Public runtime release

The public runtime release is the application identity shown in Settings and used by release-facing diagnostics.

Current accepted value:

```text
v2.5.0 · Build 38
```

Accepted release proof:

- PR #206 merged;
- accepted `main` = `2abe20511d6265d12643276f18041812fec3e715`;
- GitHub Pages #272 / run `32072053127` = SUCCESS on that exact SHA;
- `github-pages` deployment `5951805479` = SUCCESS on that exact SHA.

The public release is intentionally **not derived from the latest roadmap slice**.

Changing this value is a release action. It requires a dedicated governance/runtime slice, targeted tests and documentation.

## 2. Pedagogy baseline

The pedagogy baseline is a historical compatibility/ownership anchor used by pedagogy contracts.

Current accepted value:

```text
v2.3.0 · Build 34
```

It is not the public app release and must not reclaim Settings ownership.

## 3. Roadmap phase and slice

Roadmap numbering describes project execution and certification:

```text
Build 37
Build 38
38.1
38.8
38.10
```

These values are **not SemVer**.

Examples:

```text
38.8  ≠ v2.4.8
38.10 ≠ v2.4.10
```

A roadmap slice can be pure/non-wired, docs-only, CI-maintenance or learner-facing. None of those properties alone authorizes a public version bump.

The latest accepted learner-facing roadmap checkpoint represented by the current release is **38.10**.

## 4. Bump rules

### Patch version

Use a SemVer patch bump only for a meaningful shipped correction that should identify a new public runtime release without changing the product milestone.

A patch bump is **not automatic per PR**.

### Minor version

Use a SemVer minor bump for a meaningful completed product milestone that materially expands the shipped capability while remaining backward-compatible with learner data and product contracts.

Build 38 followed this rule and was published as **v2.5.0 · Build 38**.

### Major version

Use a major bump only for a deliberate major product contract change. Never use it merely because the roadmap reached a high internal build number.

## 5. Public Build label

The `Build` displayed beside SemVer is the **release build anchor**.

Therefore:

```text
v2.5.0 · Build 38
```

can remain correct while the project later certifies internal Build 39.x slices, until another explicit release action changes the public identity.

If this distinction becomes confusing in DEBUG/admin, add a separate field such as:

```text
Roadmap checkpoint: 38.10
```

Do not overload or mutate the release Build field.

## 6. Build 38 release decision — fulfilled

Build 38 closed as one coherent shipped Generalization & Transfer milestone and its natural candidate convention was intentionally assigned as:

```text
v2.5.0 · Build 38
```

The assignment was accepted only after all release-boundary requirements were satisfied:

1. Build 38 was explicitly closed;
2. learner-facing scope was known and locked;
3. relevant runtime/browser/PWA tribunals passed or failures were classified;
4. historical learner continuity remained intact;
5. Settings metadata ownership tests were updated intentionally;
6. README / release contract / release notes were aligned for the candidate;
7. PR #206 merged to exact SHA `2abe20511d6265d12643276f18041812fec3e715`;
8. Pages #272 / run `32072053127` deployed that exact SHA successfully.

This precedent does **not** make later milestone bumps automatic. Every future public release still requires its own explicit decision and certification.

## 7. Documentation vocabulary

Use these phrases consistently:

```text
public runtime release
pedagogy baseline
roadmap phase
roadmap slice
learner-facing runtime checkpoint
pure/non-wired core checkpoint
governance main
```

Avoid unqualified phrases such as `current version` when they could mean more than one of the above.

## 8. Safety

A versioning change must never reset or migrate learner data merely to make metadata look neat.

Historical continuity remains mandatory:

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

No version bump may silently alter:

- learner stores;
- Recovery ownership;
- Evidence role;
- curriculum IDs;
- voice semantics;
- PWA identity/cache contract;
- certified Foundation/Transfer semantics.

## 9. Current accepted state

```text
Public runtime release = v2.5.0 · Build 38
Pedagogy baseline      = v2.3.0 · Build 34
Roadmap phase          = Build 38 CLOSED / RELEASED
Latest accepted slice  = 38.10 CLOSED / DEPLOYED
Build 38.11            = NOT AUTHORIZED
```

The release documentation closeout must finish before opening Build 39 as a separate product slice.

Once that governance boundary is closed, **Build 39 — Learner Intelligence 3** is the next product milestone. Its implementation must not be smuggled into the release closeout and does not itself imply a new public SemVer value.
