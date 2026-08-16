# Build 37.2 — Foundations Generic Capsule Engine

**Status:** candidate slice. Pure / non-wired / ephemeral.

## Why this slice exists

Build 33 audited the 313-item curriculum and identified the first transferable Foundations gap. Build 34 proved one learner-facing pilot for F01–F04. Build 37.1 then established the F01–F18 ownership registry without changing runtime.

Build 37.2 extracts the **reusable capsule contract** from that validated pilot before any wider Foundations rollout.

The objective is not to add more grammar to Trân today. It is to stop encoding each future capsule as a one-off DOM state machine.

## New pure owners

```text
src/pedagogy/foundations-capsule-engine.js
src/pedagogy/foundations-capsules.js
```

The engine owns only deterministic ephemeral session mechanics:

```text
intro
→ question
→ answer feedback
→ next question
→ done
→ reset
```

It also exposes a localized read model for Vietnamese / DEBUG-FR renderers.

It does **not** own:

- DOM;
- navigation;
- lesson routing;
- storage;
- Recovery;
- Evidence;
- mastery;
- voice;
- curriculum progression.

## Exact F01–F04 mirror

`foundations-capsules.js` contains one capsule only: the already validated Build 34 pilot content.

It preserves:

- concepts `F01`, `F02`, `F03`, `F04`;
- title `Mạo từ, giống & số nhiều / Articles, genre & pluriel`;
- the same three explanatory blocks;
- the same examples:
  - `la gare`;
  - `un billet`;
  - `une table`;
  - `les toilettes`;
- the same four checks and answer keys:
  - `___ gare` → `la`;
  - `___ billet` → `un`;
  - `___ table` → `une`;
  - `la pharmacie → ___ pharmacies` → `les`;
- the same conclusion that explicitly says a successful mini-check is **not mastery**.

This mirror is evidence for the extraction. It is **not wired into the current Build 34 UI in 37.2**.

## State contract

A session is immutable and ephemeral:

```js
{
  capsuleId,
  phase: 'intro' | 'question' | 'done',
  questionIndex,
  answered,
  answers: [
    { checkId, choice, correct, correctAnswer }
  ],
  finished
}
```

The reducer accepts only valid transitions. It throws instead of guessing when:

- a question is answered twice;
- `NEXT` is requested before an answer;
- a choice is not one of the available choices;
- a session belongs to another capsule;
- a capsule asks for persistence or a mastery claim.

No clock, random value or browser API participates in the result.

## Safety boundary

Build 37.2 must remain:

```text
no index.html wiring
no sw.js wiring
no localStorage/sessionStorage write
no Recovery dependency
no Evidence product read
no eighth durable store
no F05–F18 learner rollout
no learner-visible behavior change
```

The original six source stores remain product truth. Evidence remains a seventh derived shadow under Recovery v3 / backup v3.

## Protected owners

This slice must not modify:

```text
app.js
voice-ios.js
free-voice.js
index.html
sw.js
src/core/data-recovery*
src/core/memory-evidence-v2-runtime.js
src/pedagogy/foundations-pilot.js
src/pedagogy/foundations-core.js
src/pedagogy/learning-memory.js
src/pedagogy/error-intelligence.js
src/pedagogy/listening-engine.js
src/pedagogy/scenario-engine.js
src/pedagogy/mastery-engine.js
src/pedagogy/learner-intelligence*.js
```

## QA

The dedicated Node tribunal verifies:

- schema validation;
- immutable compiled capsule definitions;
- deterministic intro → 4 checks → done state travel;
- correct/incorrect feedback behavior;
- reset determinism;
- exact F01–F04 prompts / choices / answers / examples;
- explicit no-mastery / no-durable-write semantics;
- rejection of illegal persistence/mastery definitions;
- absence of browser/storage/Recovery/Evidence dependencies.

The workflow additionally verifies that the Build 34 pilot and Build 37.1 registry are unchanged and that no protected product/durability owner moved.

## Exit gate

Build 37.2 is complete only after:

```text
dedicated 37.2 guard green
→ PR matrix classified against the four inherited main failures
→ no new regression
→ merge
→ exact-main certification + Pages
```

## Next slice if certified

**37.3 — Pilot adapter / renderer convergence** may rewire the existing F01–F04 learner UI to consume the generic engine **without changing learner-visible content, lesson range, optionality or persistence semantics**.

Only after that parity is proved should a separate slice consider learner-facing F05+ capsules.
