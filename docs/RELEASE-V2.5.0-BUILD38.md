# Release v2.5.0 · Build 38 — accepted release

Status: **ACCEPTED / DEPLOYED**

Date accepted: 2026-08-17

## Why this is a minor release

Build 38 is a coherent, closed product milestone: deterministic Generalization & Transfer. Its internal roadmap slices are not SemVer patches. The public release therefore moved from `v2.4.0 · Build 36` to **`v2.5.0 · Build 38`** in one explicit release-version slice.

The pedagogy baseline remains **`v2.3.0 · Build 34`**.

## Accepted release proof

- release PR: **#206 — Release · v2.5.0 Build 38 certification**
- final candidate head: **`78768ff26dcc64c090535163a10af8e019fdb4a1`**
- squash merge / accepted `main`: **`2abe20511d6265d12643276f18041812fec3e715`**
- GitHub Pages: **#272 / run `32072053127` — SUCCESS** on that exact SHA
- `github-pages` deployment: **5951805479 — SUCCESS** on that exact SHA
- Build 38.11: **NOT AUTHORIZED**

Before #206, the accepted base was:

- `main`: `8790eb059f47bcde0ea399962f7b42a3b9501714`
- Build 38 milestone closeout: PR #205
- GitHub Pages: #271 / run `32068419523` — SUCCESS on that exact SHA

## Product represented by this release

- Curriculum: 52 lessons / 313 items
- Scenario: 44 situations / 132 turns
- Speaking Loop: 52/52, maximum 2 moments per lesson
- Listening: 0.88 normal / 0.65 slow
- Recovery: 7 durable stores / backup v3
- Evidence: derived shadow only; original six stores remain product truth
- Premium V5.10: closed / physical field pass

Build 38 certified chain:

1. 38.1 → 38.2 — subject substitution → lesson 33
2. 38.3 → 38.8 — affirmation → negation → lesson 34
3. 38.4 → 38.5 — present → futur proche → lesson 35
4. 38.6 → 38.7 — singular → plural nominal → lesson 13
5. 38.9 → 38.10 — `nous` → spoken `on` → lesson 52

## Release-only implementation scope

The release slice changed only release ownership, certification, and handoff material:

- `src/core/build31-loader.js` — successor-loader cache-bust while preserving historical Build31 identity;
- `src/core/build32-loader.js` — public `RUNTIME_META` only: `2.5.0 / 38`; historical Build32 loader identity stayed unchanged;
- runtime-version tribunal/workflow;
- `release-v2.5.json`;
- dedicated release contract test/workflow;
- release documentation / README / PROJECT-STATE.

It did **not** modify curriculum, Foundations, Transfer semantics, learner stores, Recovery schema, Evidence role, voices, Premium UI, `index.html`, `sw.js`, manifest, logo, or favicon.

## Historical learner continuity — release invariant

The machine-readable release contract preserves the historical continuity checkpoint:

- 7 completed lessons;
- `l8` progress = 4;
- 40 known historical items.

A version label is never authority to reset learner data.

## Certification result

The final #206 head passed the dedicated release gates:

- release certification — run `32071642717` — SUCCESS;
- runtime version metadata — run `32071642472` — SUCCESS;
- Build 38.10 predecessor — run `32071642921` — SUCCESS;
- Build 32 Practical A1 — run `32071642675` — SUCCESS after preserving the historical Build32 URL contract while keeping a separate release cache-bust;
- Build 26.4 initially flaked, then passed on an unchanged rerun, confirming runner/harness flake classification.

The final PR matrix introduced **no new persistent failure** beyond the documented inherited baseline:

1. `French Trân'quille quality`;
2. `Build 36.2 Evidence shadow adoption`;
3. `V2.0.0 Freeze tribunal`;
4. `Build 36.3 Recovery v3 durability tribunal`;
5. `Build 28 Data recovery smoke`.

## Public release identity

```text
Public runtime release = v2.5.0 · Build 38
Pedagogy baseline      = v2.3.0 · Build 34
Roadmap checkpoint     = Build 38.10
Build 38 milestone     = CLOSED / RELEASED
```

The public `Build` beside SemVer remains a release anchor. Internal slices such as `38.10` are roadmap checkpoints, not SemVer patch numbers.

## Explicit non-claims

This release did not add pedagogy. It did not upgrade Trân's CEFR level, modify mastery, migrate storage, alter speech recognition, change Tyffany, or touch the field-approved Premium shell. It certified and published the coherent Build 38 milestone that was already implemented and closed.

## Next boundary

A separate docs-only closeout reconciles `MASTER-ROADMAP.md`, `PROJECT-STATE.md`, `CHANGELOG.md`, `README.md` and release-versioning policy with this accepted release.

Only after that closeout is merged may Build 39 be opened as the next **separate** product milestone.
