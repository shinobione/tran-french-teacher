# Build 26.3 — Interaction Stability + Progress Layout

Status: **CANDIDATE / field-fix gate**

Version target: **v1.19.3 — Build 26.3**

## Field feedback

A real-use video showed a coherent split between controls:

- `Révision mémoire` and `Continuer le parcours` could receive visual press feedback, but `Révision mémoire` could still fail to navigate;
- `Écouter 3 minutes` and `Voir les autres activités` were less coherent visually and could fail to react;
- the desktop `Progrès` screen still did not use the available width logically.

## Root cause

The Today surface was being composed by several independent runtime layers:

1. `daily-coach.js` creates the canonical Daily buttons.
2. `listening-engine.js` injects a Listening button into `.daily-steps`.
3. `session-ux.js` moved Daily buttons into a native `<details>`, then on every decoration moved them back out, removed the disclosure, and rebuilt it again.
4. Both Listening and Session UX observe DOM child-list changes.

This meant a visible control could be replaced between pointer feedback and the final click event. It also made the native `<summary>` disclosure inconsistent with the global Interaction UX, which primarily decorates actual buttons.

`Continuer le parcours` was structurally safer because it resolves and clicks the real lesson button directly. `Révision mémoire` still depended on the compatibility navigation bus and therefore needed a stable initiating node.

## Runtime fix

Build 26.3 adds an isolated `build26-3-ux.js` / `build26-3-ux.css` orchestration layer.

### Stable Today controls

- The Daily Coach plan remains the source of truth.
- Exactly two primary `.daily-step` nodes are rendered and kept stable.
- Extra activities live outside `.daily-steps`, so legacy Session UX no longer moves them around.
- A hidden Listening proxy keeps the Listening injector satisfied without becoming a Session UX Daily button.
- `Voir les autres activités` becomes a real `<button>` with deterministic `aria-expanded` state instead of a native `<summary>` rebuilt by observers.
- Routes are explicit from a capture-phase handler:
  - Review → canonical legacy review screen bus;
  - Lesson → real lesson button;
  - Conversation → canonical conversation screen bus;
  - Listening → `FrenchTranquilleListening.open()`.
- No learner, Memory, Scenario or Listening state is written by this layer.

### Progress desktop layout

The existing pedagogical DOM is preserved.

On desktop / wide tablet:

```text
┌──────────────────────────┬─────────────────────────────┐
│ Summary / next step      │ Learning details            │
│                          │ dashboard + active group     │
├──────────────────────────┤                             │
│ A0 → A1 curriculum      │ sticky / internal scroll    │
└──────────────────────────┴─────────────────────────────┘
```

Implementation uses `display: contents` on the historical first Progress wrapper so the existing overview, curriculum and details nodes can be placed with CSS Grid without cloning or migrating them.

On mobile:

1. summary;
2. compact curriculum;
3. collapsed Learning Details.

The Build 26.1 dashboard and all underlying engine cards remain the same DOM nodes.

## Sanctuaries

Build 26.3 must not change:

- `francais-avec-luc:learner:v1`;
- Learning Memory / Scenario / Listening storage schemas;
- curriculum **40 lessons / 241 items**;
- Scenario **36 situations / 108 turns**;
- Listening **0.88 normal / 0.65 slow**;
- `voice-ios.js`;
- `free-voice.js`;
- `assets/LOGO.png`;
- `assets/Favicon.png`;
- Build 25.2 bounded-session behavior;
- Build 26.1 local self-playback behavior.

## CI gate

A dedicated Build 26.3 Chrome workflow must physically exercise the field-reported paths:

### Today

- open `Voir les autres activités`;
- prove the toggle DOM node remains the same node;
- click `Écouter 3 minutes` and see the Listening overlay;
- click `Révision mémoire` and reach Review;
- return Home;
- click `Continuer le parcours` and reach the Lesson screen.

### Progress desktop

- lesson-8 synthetic state is preserved;
- overview + curriculum + details all remain present;
- historical wrapper computes to `display: contents`;
- Details is open by default on wide screens;
- Details computes to `position: sticky`;
- the Build 26.1 details dashboard remains present.

### Progress mobile

- lesson-8 state is preserved;
- compact curriculum remains 5 / 40 by default;
- Details is collapsed by default;
- the same DOM remains available on demand.

Build 26.3 is not production until the full existing tribunal plus this new field-specific smoke is green on the PR, `main`, and GitHub Pages.
