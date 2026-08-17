# 🇫🇷 French Trân’quille

> **Release candidate: v2.5.0 · Build 38** — Generalization & Transfer milestone.
>
> Until this candidate is merged and GitHub Pages succeeds on the exact merge SHA, the accepted public release on `main` remains **v2.4.0 · Build 36**.

French Trân’quille is a mobile-first French-learning PWA built for Trân, with Vietnamese learner support, guided speaking, listening, real-life scenarios, durable local progress, recovery, and deterministic pedagogy layers.

## Version identities

| Identity | Value |
|---|---|
| Public runtime candidate | **v2.5.0 · Build 38** |
| Accepted public runtime before candidate | **v2.4.0 · Build 36** |
| Pedagogy baseline | **v2.3.0 · Build 34** |
| Current roadmap milestone | **Build 38 — CLOSED / pedagogically complete** |
| Build 38.11 | **NOT AUTHORIZED** |

Roadmap sub-slices such as 38.2 or 38.10 are internal implementation/certification checkpoints, not SemVer patch releases.

## Current product

- **52 lessons / 313 curriculum items**
- **44 real-life situations / 132 turns**
- Speaking Loop on **52/52 lessons**, max 2 moments per lesson
- Listening: **0.88 normal / 0.65 slow**
- Recovery: **7 durable stores / backup v3**
- Evidence v2: **derived shadow only**; original six stores remain product truth
- Premium V5.10: **closed / physical field pass**
- PWA / iPhone-first field target
- no server account required for learner progress

## Build 38 — Generalization & Transfer

Build 38 is a deterministic transfer layer that asks Trân to reconstruct known language rather than memorize a second copy of the same rule.

| Core → placement | Family | Learner route |
|---|---|---|
| 38.1 → 38.2 | subject substitution | lesson 33 |
| 38.3 → 38.8 | affirmation → negation | lesson 34 |
| 38.4 → 38.5 | present → futur proche | lesson 35 |
| 38.6 → 38.7 | singular → plural nominal | lesson 13 |
| 38.9 → 38.10 | `nous` → spoken `on` | lesson 52 |

The shared Transfer layer is optional and ephemeral: **no durable write, no Evidence product read, no mastery claim**.

## Release candidate v2.5.0 · Build 38

The release slice changes **release ownership and certification only**. It does not add or alter pedagogy.

The candidate must prove:

- Settings displays exactly **`v2.5.0 • Build 38`**;
- pedagogy baseline remains exactly **`v2.3.0 · Build 34`**;
- historical lower-layer metadata cannot reclaim the public version;
- VI/FR × desktop/iPhone runtime tribunal passes;
- Build 38.10 predecessor semantics remain certified;
- protected product/voice/storage/Premium files are absent from the release diff;
- full CI introduces no new failure beyond the documented inherited baseline;
- GitHub Pages succeeds on the exact post-merge SHA before the release is called accepted.

Machine-readable release contract: [`release-v2.5.json`](release-v2.5.json)  
Certification rationale: [`docs/RELEASE-V2.5.0-BUILD38.md`](docs/RELEASE-V2.5.0-BUILD38.md)

## Learner continuity — locked

Historical compatibility checkpoint:

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

No release/version change is allowed to reset or reinterpret that continuity contract.

## Canonical project control

Future work must start with:

1. [`AGENTS.md`](AGENTS.md)
2. [`PROJECT-STATE.md`](PROJECT-STATE.md)
3. [`MASTER-ROADMAP.md`](MASTER-ROADMAP.md)
4. live GitHub / CI / Pages reality

The repository state wins over stale chat summaries.

## Local / static use

The app is static and deployable on GitHub Pages. For local browser testing, serve the repository over HTTP rather than opening `index.html` directly, for example:

```bash
python3 -m http.server 4173
```

Then open `http://127.0.0.1:4173/`.

## Historical documentation

Older release/build details remain in `docs/`, including the archived Build 34 README and the V2.0 freeze contract. They are historical evidence, not current public-version authority.

© 2026 ShinoBiWan — French Trân’quille. Tous droits réservés.
