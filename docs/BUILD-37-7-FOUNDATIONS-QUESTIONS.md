# Build 37.7 — Foundations F12 · Practical Question System

Status: **CANDIDATE SLICE**

## Baseline

37.7 starts from merged Build 37.6 main:

```text
main    b7b8690e9684d90955c8c78933fae3ba1778ccc9
PR      #181 — Build 37.6 F08 regular -er present consolidation
Pages   #234 / run 31972823389 — SUCCESS
```

Build 37.6 preserved the Foundations durability contract: no Foundations persistence, no Evidence product read, no curriculum renumbering, and no voice/PWA ownership change.

## Why F12 is the next narrow slice

After F08 closed, the unresolved partial Core candidates are:

```text
F12 questions                 — PARTIAL / system weak
F13 adjective agreement       — PARTIAL / later core
F16 à/de contractions         — PARTIAL / later core
```

F12 has the cleanest already-taught progression and does not need a new grammar system invented for the capsule:

```text
lesson 25 → Où ? Quand ? Pourquoi ? Avec qui ? Quoi ?
lesson 32 → Tu travailles ? / Tu habites où ? / Tu veux manger ?
lesson 39 → Pouvez-vous m'expliquer ? / Quelle est l'adresse ?
lesson 41 → Qu'est-ce que ça veut dire ? / Pouvez-vous reformuler ?
lesson 42 → Combien il vous faut ?
lesson 43 → Lequel est mieux ?
```

The capsule is therefore routed only to **lessons 41–43**, after Trân has already met intonation questions, question words and polite `Pouvez-vous… ?` blocks in real curriculum context.

## Teaching contract

37.7 systematizes three beginner tools already encountered:

1. **ordinary sentence + question intonation** with a close person — `Tu travailles ?`;
2. **question word** to target missing information — `Tu habites où ?`, `Pourquoi ?`;
3. **polite request/question block** — `Pouvez-vous reformuler ?`.

It also reconnects the clarification block:

```text
Qu'est-ce que ça veut dire ?
```

The learner goal is recognition and practical selection of a question strategy, not a formal interrogative grammar course.

### Explicit non-goals

37.7 does **not**:

- teach subject-verb inversion;
- introduce a broad interrogative grammar table;
- add a new `Est-ce que…` system not grounded by the selected anchors;
- rewrite lessons 25/32/39/41–43;
- add curriculum items;
- add or mutate durable learner data;
- claim question mastery from one mini-session;
- start F13 or F16;
- start Build 38 transfer/generalization.

## Ownership

Historical Foundations ownership remains explicit and additive:

```text
37.2 → generic pure capsule engine
37.3 → shared adapter / renderer
37.4 → F11 expansion
37.5 → F05 consolidation
37.6 → F08 verb-pattern consolidation
37.7 → F12 question systematization
```

Renderer metadata:

```text
adapter: '37.3'
expansion: '37.4'
expansionConcepts: ['F11']
consolidation: '37.5'
consolidationConcepts: ['F05']
verbPattern: '37.6'
verbPatternConcepts: ['F08']
systematization: '37.7'
systematizationConcepts: ['F12']
```

Routes stay disjoint:

```text
F01–F04 → lessons 8–13
F11     → lessons 17–20
F08     → lessons 32–33
F05     → lessons 34–36
F12     → lessons 41–43
```

## Data / architecture safety

The slice stays inside the existing Foundations lane:

- same Build 37.2 pure engine;
- same Build 37.3 DOM adapter;
- optional / ephemeral only;
- no localStorage/sessionStorage/IndexedDB write from Foundations;
- no Evidence product read;
- no Recovery ownership change;
- no new durable store;
- no loader / `index.html` / Service Worker / manifest change;
- no curriculum mutation;
- no voice/audio owner change;
- no Premium V5.10 change.

Protected owners remain outside the diff, including `app.js`, `voice-ios.js`, `free-voice.js`, Recovery v3, Evidence runtime/core, curriculum Stage2/3/4, Learner Intelligence, Listening, Scenario and branding.

## QA gate

The dedicated 37.7 tribunal replays the certified predecessor chain before accepting F12:

```text
F01–F04 parity
→ F11 parity
→ F08 parity
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

- exact lessons 41–43 routing;
- lesson 40 and lesson 44 do not expose F12;
- lesson 32 remains F08;
- lesson 34 remains F05;
- exactly one capsule entry;
- exact examples/questions/answers;
- focus returns to the lesson CTA;
- lesson content survives the round trip;
- no horizontal overflow;
- entry target ≥44 px;
- localStorage byte-identical;
- no Evidence product read;
- F13/F16 remain uncompiled and unrouted.

## Merge policy

37.7 may merge only if:

- the dedicated tribunal is green;
- predecessor ownership remains green;
- the PR diff stays inside the Foundations/test/doc lane;
- it introduces no new failure beyond the inherited historical baseline.

The four inherited CI debts remain separate:

1. Build 36.2 Evidence shadow adoption;
2. V2.0.0 Freeze tribunal;
3. Build 36.3 Recovery v3 durability tribunal;
4. Build 28 Data recovery smoke.
