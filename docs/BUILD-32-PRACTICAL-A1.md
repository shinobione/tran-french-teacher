# Build 32 — Practical A1 Expansion

Status: **CANDIDAT** until PR, `main` and GitHub Pages certification are complete.

Target release: **French Trân’quille v2.2.0 • Build 32**.

## Intent

Build 32 is a content and learner-intelligence release above the frozen V2 architecture baseline. It does not rewrite the historical core, migrate learner data or touch the iPhone voice sanctuaries.

The goal is not to increase the lesson counter for its own sake. The existing 40 lessons were audited first. They already cover survival French, directions, transport basics, time, shopping, restaurant, health basics, family, housing, phone, weather, present, futur proche, passé récent, passé composé, administration and emotions.

The remaining high-value A1 gaps are mostly about **autonomy and interaction**: keeping a conversation alive when something is unclear, quantities, comparison and choice, invitations and refusals, structured health/pharmacy exchanges, work instructions, reporting a housing problem, transport disruption, sequencing a short story, giving an opinion and understanding the very common oral pronoun `on`.

## Curriculum successor

Historical V2 / Build31 core remains reproducible as:

```text
40 lessons / 241 items
```

Current Build32 successor becomes:

```text
52 lessons / 313 items
```

Stage 4 adds exactly **12 lessons / 72 items**:

### Autonomie A1 — lessons 41–46

41. Clarifier & demander de reformuler
42. Quantités & emballages
43. Comparer & choisir
44. Proposer, inviter & refuser poliment
45. Santé & rendez-vous médical
46. Médicaments & pharmacie

### Interaction A1 — lessons 47–52

47. Travail & consignes
48. Signaler une panne & demander une intervention
49. Retard, annulation & correspondance
50. Raconter dans l’ordre
51. Donner son avis simplement
52. Le `on` du français oral

The original first 40 lesson IDs and first 241 item IDs must stay in the same order. Stage 4 is appended; it does not edit those records.

## Reuse instead of isolated content

### Real Life Pack IV

`real-life-data-4.js` adds **8 situations / 24 turns**. Candidate current Scenario total:

```text
44 situations / 132 turns
```

The new situations exercise clarification at a service desk, comparing a purchase, an invitation with Jerry, a doctor appointment, work instructions, an apartment repair call, a delayed train and a natural conversation using `on`.

Every Pack IV evidence item must resolve to a real curriculum item ID.

### Listening Pack II

`listening-data-2.js` adds:

- 4 contrasts;
- 8 mini-dialogues.

The extension reuses the existing local speech-synthesis Listening engine. It does not change the validated **0.88 normal / 0.65 slow** final rates.

### Speaking Loop

Speaking Loop remains max **2 moments per lesson**. Its existing planner reads the live curriculum dynamically, so Build32 requires browser proof that coverage expands from 40 to **52/52** without a new speaking subsystem.

No automatic pronunciation score is introduced.

## Learner Intelligence 2.2

The current learner model adds two evidence bands:

```text
41–46  Autonomie A1
47–52  Interaction A1
```

The model therefore reasons across **7 bands / 52 lessons / 313 items**.

`A1+` may appear only as an **internal adaptive label** when practical A1 evidence is strong. It is not a CEFR/CECRL certification or exam result.

Voice recognition remains neutral evidence: a non-recognition is classified as a recognition-system signal, never as an automatic pronunciation judgment.

Learner Intelligence 2.2 remains read-only with respect to durable learner stores.

## Historical tribunal replay

Build32 deliberately keeps historical tests meaningful:

- Build31 audit loads the exact 2.1 learner model over 40/241;
- Build30 and older `*Smoke` routes do not automatically inject Stage 4;
- the frozen `release-v2.json` remains **2.0.0 / Architecture Build 30 / 40–241**;
- V2 compatibility now distinguishes the frozen product contract from the current V2.x successor and requires the current curriculum to be a superset.

This avoids rewriting history just because the live product grows.

## Data safety

No new durable store is added.

No migration is required for Stage 4. A learner at lesson 8 remains at lesson 8. A learner who completed lessons 1–40 simply receives lesson 41 as the next lesson.

The six Recovery stores remain the complete durable pedagogical set.

## Sanctuaries

Build32 must keep exact hashes for:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

The exact-first-attempt iPhone voice gate remains parallel and outside this build.

## Build32 tribunal

The dedicated workflow must prove:

- historical core without Stage 4 = 40/241;
- current successor = 52/313;
- Stage 4 = 12/72;
- 313 unique item IDs;
- first 40 lesson IDs and 241 item IDs unchanged and ordered;
- Learner Intelligence = 7 bands covering 52/313;
- Scenario = 44/132, Pack IV = 8/24, zero invalid evidence IDs;
- Listening II = 4 contrasts + 8 dialogues, zero invalid evidence IDs;
- Speaking Loop = 52/52, max 2;
- clean learner → lesson 1;
- historical old learner → 7 completed, `l8=4`, 40 known, next lesson 8;
- learner who completed the historical 40 lessons → next lesson 41;
- full journey exposes 7 stages and 6 lessons in each new stage;
- six durable stores byte-identical through the browser audit;
- zero horizontal overflow at desktop and 390×844 mobile size;
- frozen V2, Build31 replay, voice and branding sanctuaries remain valid.

## Definition of Done

Build 32 becomes **PROD / CLOS** only after:

```text
candidate docs
→ PR all functional workflows green
→ exact head merge
→ all workflows green on exact main SHA
→ GitHub Pages success on exact main SHA
→ docs-only release closure
→ final main + Pages certification
```

Until then this document intentionally says **CANDIDAT**.