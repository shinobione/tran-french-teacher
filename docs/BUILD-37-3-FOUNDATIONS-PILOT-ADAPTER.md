# Build 37.3 — Foundations Pilot Adapter / Renderer Convergence

**Status:** candidate learner-facing internal refactor. Strict visual/semantic parity required.

## Purpose

Build 37.2 created a pure generic Foundations capsule engine and an exact F01–F04 mirror specification, but the live Build 34 pilot still owned a second hardcoded state machine and question table.

Build 37.3 removes that duplicate behavioral source of truth.

The learner-facing pilot remains the same capsule. Only its internal session mechanics now come from the generic engine.

## Runtime load order

`src/core/build32-loader.js` now loads, in order:

```text
foundations-capsule-engine.js
→ foundations-capsules.js
→ foundations-pilot.js
```

The adapter does not silently fall back to a second hardcoded question engine. If its required dependencies are missing, it marks the adapter missing and does not mount the capsule.

The Service Worker precaches all three Build 37.3 dependencies under the existing global cache identity, using a targeted `2.4.0-b37.3` URL version.

No global cache nuke is introduced.

## Learner-visible parity — LOCKED

Build 37.3 must preserve the Build 34 experience exactly:

- contextual lessons: **8–13 only**;
- optional entry card;
- no top-level Grammar navigation;
- title:
  - VI `Mạo từ, giống & số nhiều`;
  - FR `Articles, genre & pluriel`;
- same three explanation blocks;
- same examples:
  - `la gare`;
  - `un billet`;
  - `une table`;
  - `les toilettes`;
- same four questions;
- same choice ordering;
- same answer keys;
- same positive/negative feedback;
- same completion wording;
- same return to the current lesson;
- same CSS classes and layout rules;
- same progress rhythm: **0 → 20 → 40 → 60 → 80 → 100 %**;
- same Vietnamese / DEBUG FR switch;
- same optional / non-blocking behavior.

The adapter intentionally computes the legacy progress-bar rhythm in the renderer rather than exposing the generic engine's internal progress ratio. This keeps the refactor invisible.

## Internal ownership after 37.3

```text
Foundations registry (37.1)
        ↓
Capsule engine + F01–F04 spec (37.2)
        ↓
Build 34-compatible learner renderer (37.3)
```

`foundations-pilot.js` no longer contains:

```text
const questions = [...]
stepIndex
answered as a second state machine
answer-key ownership
```

Instead it owns only learner-facing concerns:

- contextual mount in lessons 8–13;
- overlay DOM;
- established Build 34 styling;
- focus return;
- language selection;
- rendering of the engine/session read model.

## Data boundary

Still unchanged:

```text
no capsule localStorage write
no new durable store
no Recovery write
no Evidence product read
no concept mastery score
no learner progression mutation
```

The seven-store Recovery v3 / backup-v3 durability contract remains unchanged. Evidence v2 remains a derived shadow. The original six stores remain product truth.

## QA tribunal

The dedicated Build 37.3 browser tribunal performs:

1. real application boot and checks the dependency chain is loaded;
2. Vietnamese desktop round trip;
3. DEBUG FR desktop round trip;
4. Vietnamese 390×844 round trip;
5. DEBUG FR 390×844 round trip.

Each capsule round trip verifies:

- entry-card exact copy;
- dialog title;
- intro copy;
- four exact examples;
- 0/20/40/60/80/100 progress rhythm;
- all four prompts and choice orders;
- one deliberately wrong answer and its red/correct marking;
- three correct answers and feedback;
- exact completion copy;
- return CTA closes the overlay;
- keyboard focus returns to the entry CTA;
- underlying lesson DOM survives;
- no horizontal overflow;
- entry target remains at least 44 px;
- localStorage remains byte-identical during the capsule session.

The Build 37.2 Node guard was made successor-aware without weakening its proof: before 37.3 it expects the mirror tokens in the old pilot; with the 37.3 adapter it requires those tokens in `foundations-capsules.js` and explicitly rejects a surviving hardcoded question table in the pilot.

## Protected owners

Build 37.3 does not modify:

```text
app.js
voice-ios.js
free-voice.js
index.html
Recovery / Evidence runtime
Learning Memory
Error Intelligence
Listening
Scenario
Mastery
Learner Intelligence
Build 37.1 registry
logo / favicon
```

The intentional existing-runtime modifications are limited to:

```text
src/pedagogy/foundations-pilot.js
src/core/build32-loader.js
sw.js
```

plus QA/docs.

## Exit gate

```text
dedicated 37.3 parity tribunal green
→ full PR matrix classified against inherited main failures
→ no new regression
→ merge
→ exact-main certification
→ Pages success
```

## What 37.3 does NOT authorize

This slice does **not** authorize learner-facing F05–F18 rollout.

The next Foundations expansion must be chosen from the Build 33 audit + Build 37.1 ownership registry, remain small, and get its own learner-facing gate. Evidence must not become product truth as a side effect of Foundations work.
