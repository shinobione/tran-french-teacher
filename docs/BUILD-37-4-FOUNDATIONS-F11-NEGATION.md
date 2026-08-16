# Build 37.4 — Foundations Core · F11 Negation

Status: **CANDIDATE / learner-facing narrow expansion**

Base: Build 37.3 certified main `f40ea317803a1ab2398b6855340c74977d7cc619`.

## Goal

Industrialize one additional high-value Foundation concept after the F01–F04 pilot, without mass-rolling F05–F18 and without changing the durable learner contract.

Selected concept: **F11 — negation**.

Build 33 classifies F11 as `PARTIAL / recurrent but fragmented`: Trân already meets negative forms across the curriculum, but the app does not yet give one short transferable key connecting them.

## Learner scope

F11 is offered contextually only in **lessons 17–20**, after several useful negative forms are already known:

- `Je n'ai pas de monnaie.`
- `Je ne peux pas.`
- `Il n'y a pas d'eau chaude.`
- `Mon téléphone ne marche pas.`

The capsule also reconnects the earlier survival phrase `Je ne comprends pas.`.

It does **not** create a Grammar tab and does **not** alter lesson IDs, lesson order or curriculum items.

## Teaching contract

Core beginner rule:

```text
ne / n’ + verb + pas
```

The capsule explains:

1. `ne ... pas` around the verb;
2. elision `ne → n’` before a vowel / silent h;
3. `pas` after the verb;
4. one transfer case with `Il n'y a pas ...`;
5. spoken French may omit `ne`, while the full form remains the safe learning/writing baseline.

No mastery claim is made from one mini-check.

## Architecture

Build 37.4 reuses the existing chain:

```text
Build 37.2 pure capsule engine
→ canonical capsule definitions
→ Build 37.3 learner renderer/adapter
→ lesson-context routing
```

No new runtime file is introduced.

Runtime changes are limited to:

- `src/pedagogy/foundations-capsules.js` — adds compiled `F11` capsule;
- `src/pedagogy/foundations-pilot.js` — routes F01–F04 to lessons 8–13 and F11 to lessons 17–20 while keeping the Build 37.3 adapter owner.

The Build 37.3 compatibility marker remains `adapter:'37.3'`. Build 37.4 is exposed separately as `expansion:'37.4'`.

## Persistence and product truth

Locked:

- `persistence:'ephemeral-only'`;
- no `localStorage.setItem` from Foundations;
- no new durable store;
- no Recovery ownership change;
- no Evidence product read-path;
- no mastery certification;
- original six source stores remain product truth;
- Evidence v2 remains derived shadow only.

## PWA / cache scope

37.4 adds no new runtime file and does not alter `sw.js`, `index.html` or `src/core/build32-loader.js`.

The existing service worker remains network-first for GET requests and updates cached responses after an online load. This slice therefore does not reopen the historically pinned cache identity.

## QA

Permanent contract test:

- `tools/test-build37-4-foundations-negation.cjs`

Browser tribunal:

- `tests/browser/build37-4-foundations-negation.html`

Workflow:

- `.github/workflows/build37-4-foundations-negation.yml`

The guard verifies:

- generic engine contract still passes;
- exact F01–F04 predecessor content still passes its existing parity tribunal;
- F11 appears only in lessons 17–20;
- F11 is optional and ephemeral;
- VI and DEBUG FR render correctly;
- desktop and 390×844 mobile pass;
- 0/20/40/60/80/100 capsule progress rhythm remains coherent;
- focus returns to the lesson CTA;
- no horizontal overflow;
- localStorage remains byte-identical;
- protected product/storage/voice/curriculum/PWA owners remain untouched.

## Explicitly out of scope

- F05–F10 and F12–F18 learner rollout;
- curriculum renumbering;
- durable Foundations evidence;
- Evidence product truth / read cutover;
- voice, Listening, Scenario or Mastery changes;
- Recovery changes;
- new top-level navigation.

## Candidate verdict

**GO to PR only if the final branch head keeps Build 37.4 green and the full PR matrix introduces no failure beyond the four inherited main failures.**