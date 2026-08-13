# Build 34 — Foundations Pilot · F01–F04

Status: **RUNTIME CANDIDATE**

Depends on: `docs/BUILD-33-FOUNDATIONS-AUDIT.md`.

## Intent

Validate one small, useful grammar foundation with Trân before industrializing the full F01–F18 roadmap.

The pilot covers only:

- **F01** noun gender;
- **F02** `un / une / des`;
- **F03** `le / la / l’ / les`;
- **F04** singular / plural.

It does not add lessons 53+, does not renumber any historical content and does not create a Grammar tab.

## Why this pilot

The Build 33 audit found that lessons 1–15 contain 88 useful items but no dedicated grammar-note layer. Trân therefore encounters forms such as `la gare`, `un billet`, `une table`, `les toilettes` before the application ever gives her the transferable rule behind them.

Later conjugation and tense content is already substantially more explicit, so duplicating `être`, `avoir` or passé composé first would add less value.

## Entry point

A compact `🧩 Nền tảng nhỏ / Petite base utile` card can appear contextually while Trân is inside lessons **8–13**.

It is deliberately optional and does not block the lesson.

No new top-level navigation is added.

## Capsule

The focused overlay teaches with this order:

1. short Vietnamese-heavy explanation;
2. examples already present in the curriculum;
3. four mini questions;
4. one plural transfer;
5. explicit reminder that one successful mini-check is **not mastery**;
6. return to the exact lesson.

Real anchors:

- `la gare`;
- `un billet`;
- `une table`;
- `les toilettes`;
- `la pharmacie → les pharmacies`.

## Data

The pilot is **non-persistent**.

- no `localStorage.setItem`;
- no new durable store;
- no migration;
- no concept-mastery score;
- no modification of learner progress;
- no change to Memory Evidence.

Answers exist only in the currently open UI/runtime.

## Release metadata

For normal current runtime, the pilot promotes the visible product metadata to:

**v2.3.0 • Build 34**

Historical audit routes are excluded so Build 30 / Build 31 / Build 32 replay contracts retain their historical identities.

## Safety contracts

Must preserve:

- current 52 lessons / 313 items;
- historical V2 40 / 241;
- Scenario 44 / 132;
- Listening 0.88 / 0.65;
- Speaking Loop max 2 moments;
- six durable stores;
- old learner 7 completed / `l8=4` / 40 known;
- `app.js` sanctuary;
- `voice-ios.js` sanctuary;
- `free-voice.js` sanctuary;
- logo / favicon sanctuaries;
- post-Build32 navigation/replay reliability hotfix.

## Pilot decision after field use

Do not immediately build F05–F18 after merge.

Observe whether Trân:

- understands why `la gare` differs from `un billet`;
- can choose `une table` without memorizing only the whole phrase;
- understands `la pharmacie → les pharmacies`;
- finds the Vietnamese explanation clear and short;
- finds the optional capsule useful rather than intrusive.

Then refine the full Foundations Core and only later connect concept/transfer evidence to Memory Evidence v2.