# French Trân’quille — Release & Versioning Policy

Status: **CANONICAL GOVERNANCE POLICY**

Date: 2026-08-17

## Problem this policy solves

French Trân’quille historically reused the words `version`, `build` and `current` for several different concepts:

- the version displayed in Settings;
- historical architecture baselines;
- pedagogy baselines;
- roadmap phases such as Build 37 and Build 38;
- implementation slices such as 38.8 and 38.9.

That made a correct Settings value look stale and made stale README wording look authoritative.

This policy separates those concepts permanently.

## 1. Public runtime release

The public runtime release is the application identity shown in Settings and used by release-facing diagnostics.

Current accepted value:

```text
v2.4.0 · Build 36
```

It is intentionally **not derived from the latest roadmap slice**.

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
38.9
```

These values are **not SemVer**.

Examples:

```text
38.8 ≠ v2.4.8
38.9 ≠ v2.4.9
```

A roadmap slice can be pure/non-wired, docs-only, CI-maintenance or learner-facing. None of those properties alone authorizes a public version bump.

## 4. Bump rules

### Patch version

Use a SemVer patch bump only for a meaningful shipped correction that should identify a new public runtime release without changing the product milestone.

A patch bump is **not automatic per PR**.

### Minor version

Use a SemVer minor bump for a meaningful completed product milestone that materially expands the shipped capability while remaining backward-compatible with learner data and product contracts.

### Major version

Use a major bump only for a deliberate major product contract change. Never use it merely because the roadmap reached a high internal build number.

## 5. Public Build label

The `Build` displayed beside SemVer is the **release build anchor**.

Therefore:

```text
v2.4.0 · Build 36
```

can remain correct while the project internally certifies Build 37.x and 38.x slices.

If this distinction becomes confusing in DEBUG/admin, add a separate field such as:

```text
Roadmap checkpoint: 38.9
```

Do not overload or mutate the release Build field.

## 6. Candidate after Build 38

If Build 38 closes as a coherent shipped Generalization & Transfer milestone, the natural next public release candidate is:

```text
v2.5.0 · Build 38
```

This is a **candidate convention, not a current release assignment**.

Before assigning it:

1. Build 38 must be explicitly closed;
2. learner-facing scope must be known;
3. relevant runtime/browser/PWA tribunals must pass or have documented classified exceptions;
4. historical learner continuity must remain intact;
5. Settings metadata ownership tests must be updated intentionally;
6. README / PROJECT-STATE / MASTER-ROADMAP / release notes must agree;
7. Pages must deploy the exact release SHA.

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

## 9. Current state at policy adoption

```text
Public runtime release = v2.4.0 · Build 36
Pedagogy baseline      = v2.3.0 · Build 34
Roadmap phase          = Build 38 ACTIVE
Latest accepted slice  = 38.9 CLOSED / CERTIFIED / NON-WIRED
```

The next canonical work is still the 38.9 learner-placement audit. This policy does not create a new product slice by itself.
