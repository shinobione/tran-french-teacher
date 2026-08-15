# Build 26.5 — Conversation Exit + Layout Repair

Status: **✅ PROD / CLOS**

Version: **v1.19.5 — Build 26.5**

Production evidence:

- runtime PR **#49** ;
- validated PR head `3f3b1ab80ccfc8142df8e7b9b2288cf4373905d4` ;
- PR tribunal **11/11 workflows functional SUCCESS** ;
- production runtime commit `2cd29f20faa8db850f92c343074809cc91b42c76` ;
- `main` tribunal **11/11 workflows functional SUCCESS** ;
- GitHub Pages runtime **#106 SUCCESS**.

## Field evidence

Real desktop screenshots exposed two regressions after the recent progressive-disclosure and Progress layout passes.

### 1. Conversation could become a cul-de-sac

Inside Guided Practice, the visible `Changer de pratique` control received press feedback but could remain inert. The learner could therefore become trapped in that mode.

The handler was not simply missing: Session UX already had a document-level capture click handler. The risky part was that Conversation is composed by several mutation-driven layers. This is the same class of interaction risk previously observed on Today: a visible control must not depend on a delayed global transition while surrounding DOM may be recomposed.

Build 26.5 makes the transition explicit and synchronous:

```text
Guided / Voice / Scenario
        ↓
setPracticeMode(mode)
        ↓
visible mode rendered immediately

Changer de pratique
        ↓ pointerup OR click
setPracticeMode(null)
        ↓
practice hub rendered immediately
```

The visible back control is also bound directly by the Build 26.5 compatibility layer, so mouse, touch/pointer and keyboard-style click do not depend only on the document delegate.

Production Chrome confirmed both routes:

```text
pointer/touch path → hub ✅
plain click path   → hub ✅
```

## 2. Conversation desktop layout inherited an obsolete two-column grid

Build 14 used a two-column Conversation surface because Free Voice and Guided Practice were shown together:

```text
Free Voice | Guided Practice
```

Build 25.2 later introduced one active practice mode at a time, but the old grid still forced `.conversation-card` into column 2. With all other modes hidden, the field result was:

```text
Changer de pratique             [ large empty canyon ]             Guided Practice
```

Build 26.5 keeps the old CSS as historical baseline but adds a later layout layer:

```text
Conversation active mode
┌──────────────────────────────────────────┐
│ Changer de pratique                      │
│                                          │
│ Guided Practice / Voice / Scenario       │
└──────────────────────────────────────────┘
```

The active working surface is one centered column. On mobile it remains one column naturally.

The Tyffany identity and the mode label are also separated visually instead of rendering as `TyffanyPratique guidée`.

## 3. Progress had independent scrolling but not independent columns

Build 26.3 created the two-column desktop information architecture with two grid rows:

```text
summary     | details
curriculum  | details
```

Details therefore spanned both rows. Build 26.4 correctly removed its nested scrollbar and let the page own vertical scrolling. However, a tall active Details group such as Mastery could then contribute intrinsic height across both rows, stretching them and pushing the left Curriculum far below the Summary.

Build 26.5 changes the DOM composition rather than hiding the symptom with negative margins:

```text
progress-layout
├── left column wrapper
│   ├── Overview
│   └── Curriculum
└── Details
```

Desktop outer grid:

```text
left | details
```

The left wrapper owns its own compact flow, so a tall Details group cannot change the vertical gap between Overview and Curriculum.

Mobile remains:

```text
Overview
↓
compact Curriculum
↓
Details collapsed by default
```

No pedagogical card is cloned or reimplemented. Details Dashboard continues moving the same historical Memory/Mastery/Listening/Scenario/A1 cards.

## Browser gate — CLOSED

The dedicated Build 26.5 Chrome workflow reproduces the field cases and passed on PR and `main`.

### Conversation desktop

Validated:

- [x] Guided Practice is the only visible active mode ;
- [x] back control and active card share the same centered working column ;
- [x] real pointer sequence exits Guided Practice to the hub ;
- [x] plain `.click()` exits Guided Practice to the hub ;
- [x] Session UX state is `hub` after exit.

### Progress desktop

Using lesson-8 synthetic regression state and a long Mastery group:

- [x] Details is a direct right-column child ;
- [x] Curriculum belongs to the left wrapper ;
- [x] Overview → Curriculum gap is between **0 and 48 px** ;
- [x] Details and left column are side-by-side ;
- [x] nested Details scroll remains 0 ;
- [x] the page remains the vertical scroll owner ;
- [x] l8 / 7 completed / 40 known stays intact.

### Progress mobile

Chrome 390×844 validated:

- [x] Overview → Curriculum → Details order ;
- [x] Details collapsed ;
- [x] compact curriculum still **5 / 40**.

## CI durability cleanup

The field repair legitimately upgrades `src/ui/session-ux.js` and `src/ui/progression-ux.js`. Several historical workflows had started treating exact asset query versions as permanent invariants (`src/ui/session-ux.js?v=1.18.2-b25.2`, `src/ui/progression-ux.js?v=1.19.2-b26.2`, global Build 26.4 metadata).

Those guards now protect **historical behavior and subsystem presence**, not the impossibility of future owner-file fixes. Their browser assertions remain active.

Build 26.1 Chrome tests were also wrapped in isolated profiles, retries and bounded timeouts so an orphan Chrome process can no longer block the release indefinitely.

## Sanctuaries — preserved

Build 26.5 did not alter:

```text
francais-avec-luc:learner:v1
Learning Memory state
Scenario state
Listening state
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

Product baselines remain:

- curriculum **40 lessons / 241 items** ;
- Scenario **36 situations / 108 turns** ;
- Listening **0.88 normal / 0.65 slow** ;
- Tyffany = learner-facing teacher name ;
- Build 26.1 self-playback iPhone field gate remains open.

## Production gate — complete

1. [x] PR browser tribunal fully green ;
2. [x] PR merged with validated immutable head ;
3. [x] same functional tribunal green on `main` ;
4. [x] GitHub Pages succeeds on `main` — **#106** ;
5. [x] canonical README / ROADMAP / CHANGELOG / ARCHITECTURE closed against production evidence.

Build 26.5 is therefore **PROD / CLOS**. The next product dependency is still the real-iPhone Build 26.1 self-playback gate before Build 27 Data & Recovery Hardening.
