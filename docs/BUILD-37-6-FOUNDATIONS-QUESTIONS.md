# Build 37.6 — Foundations F12 · Practical Question System

Status: **candidate slice**

## Why F12 is the next narrow slice

Build 37.5 closed F05 subject-pronoun consolidation. Before selecting 37.6, the remaining partial concepts were re-audited against the real 52-lesson curriculum rather than rolled out from the registry list.

### F08 · regular `-er` present — mature, but deferred

F08 now has strong real anchors:

```text
lesson 24 → je + verb in a daily routine
lesson 32 → je travaille → tu travailles
lesson 33 → il/elle travaille; il/elle habite
lesson 34 → nous travaillons; regular -ons cue
```

Pedagogically this is ready for later consolidation. However its cleanest injection area overlaps the already-certified F05 lesson 34–36 route. The current Foundations renderer deliberately exposes one optional capsule owner per lesson. 37.6 therefore does not create competing capsule ownership merely to ship F08 sooner.

### F13 · adjective agreement — later core

The curriculum already contains useful feminine anchors such as `prête`, `française`, `contente`, `inquiète`, `stressée`, `fatiguée`. Lesson 38 also contains feminine written passé-composé forms. A narrow adjective-agreement capsule should avoid confusing adjective agreement with past-participle agreement, so F13 remains deferred.

### F16 · `à/de` contractions — later core

The curriculum distributes `au`, `à la`, `du`, `de la`, `de l’`, quantities with `de`, and partitives across practical lessons. That distribution is useful but semantically mixed. F16 needs a later audit that cleanly separates location/contraction behaviour from partitive and quantity patterns.

### F12 · questions — selected

F12 is registered as `partial-system-weak / teach-core`, and the curriculum now provides a clean progression without colliding with existing Foundations routes:

```text
lesson 25 → Où ? Quand ? Pourquoi ? Avec qui ? Quoi ?
lesson 32 → Tu travailles ? / Tu habites où ? / Tu veux manger ?
lesson 39 → Pouvez-vous m'expliquer ? / Quelle est l'adresse ?
lesson 41 → Qu'est-ce que ça veut dire ? / Pouvez-vous reformuler ?
lesson 42 → Combien il vous faut ?
lesson 43 → Lequel est mieux ?
```

The new optional capsule is therefore routed only to **lessons 41–43**. At that point Trân has already encountered question words, oral intonation questions and polite `Pouvez-vous… ?` requests in context.

## Teaching contract

The capsule systematizes three already-encountered beginner tools:

1. **ordinary sentence + question intonation** with a close person — `Tu travailles ?`;
2. **question word** to target missing information — `Tu habites où ?`, `Pourquoi ?`;
3. **polite request/question block** — `Pouvez-vous reformuler ?`.

It also reconnects the clarification block:

```text
Qu'est-ce que ça veut dire ?
```

### Explicit non-goals

37.6 does **not**:

- teach subject-verb inversion;
- introduce a broad interrogative grammar table;
- add a new `Est-ce que…` system not yet grounded by the selected curriculum anchors;
- rewrite lessons 25/32/39/41–43;
- add curriculum items;
- add or mutate durable learner data;
- claim question mastery from one mini-session.

## Ownership

Historical ownership remains explicit:

```text
37.2 → generic pure capsule engine
37.3 → shared adapter / renderer
37.4 → F11 expansion
37.5 → F05 consolidation
37.6 → F12 systematization
```

Renderer metadata:

```text
adapter: '37.3'
expansion: '37.4'
expansionConcepts: ['F11']
consolidation: '37.5'
consolidationConcepts: ['F05']
systematization: '37.6'
systematizationConcepts: ['F12']
```

Routes remain disjoint:

```text
F01–F04 → lessons 8–13
F11     → lessons 17–20
F05     → lessons 34–36
F12     → lessons 41–43
```

## Data / architecture safety

The slice remains inside the existing Foundations lane:

- same Build 37.2 pure engine;
- same Build 37.3 DOM adapter;
- optional / ephemeral only;
- no localStorage/sessionStorage/IndexedDB write from Foundations;
- no Evidence product read;
- no Recovery ownership change;
- no new durable store;
- no loader / `index.html` / Service Worker change;
- no curriculum mutation;
- no voice/audio owner change;
- no Premium V5.10 change.

Protected owners remain outside the diff, including `app.js`, `voice-ios.js`, `free-voice.js`, Recovery v3, Evidence runtime/core, curriculum Stage2/3/4, learner intelligence, Listening, Scenario and branding.

## QA gate

The dedicated 37.6 tribunal must replay the certified predecessor chain before accepting F12:

```text
F01–F04 parity
→ F11 parity
→ F05 parity
→ F12
```

F12 is tested in:

```text
VI × desktop
DEBUG FR × desktop
VI × 390×844
DEBUG FR × 390×844
```

Required assertions:

- exact lesson 41–43 routing;
- exactly one capsule entry;
- exact examples/questions/answers;
- focus returns to the lesson CTA;
- lesson content survives the round trip;
- no horizontal overflow;
- entry target ≥44 px;
- localStorage byte-identical;
- no Evidence product read;
- F08/F13/F16 remain uncompiled/unrouted.

## Merge policy

The certified base before this candidate is current `main` `e017f7a041d147569ee0d47c93586b2c17f97a83`, where the push matrix settled at **33 SUCCESS + exactly the four inherited historical failures**, with zero queued/in-progress, and GitHub Pages #233 succeeded.

37.6 may merge only if it introduces **no new failure beyond that inherited baseline**.

Per `AGENTS.md`, the implementation session ends after the candidate is materialized in git, the dedicated candidate proof is obtained, the PR is opened and the volatile checkpoint is updated. Full CI review, unrelated flake classification, merge and Pages certification belong to the next control step unless explicitly delegated.
