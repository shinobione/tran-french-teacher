# A2-R1 Integration Decision Closeout — French Trân’quille

Status: **CLOSED / ACCEPTED**

Date: 2026-08-25

## Accepted chain

```text
A2-R1 pure contract proof
PR #251 accepted head  766fe4c0f9d92074b2c1bb034a0acbcfe3d0b7b2
PR #251 squash merge   a4cdc146267a88ccef9c7cde928bc2f1010ef10b

A2-R1 integration decision audit
PR #252 accepted head  9efa564fac991091d7422b66d0864215fe43dd3b
PR #252 squash merge   bb4cd1317936594820a9458ddbfe0e367a8386ac
```

PR #252 exact-head CI completed with exactly the five inherited baseline failures and no additional failure. The successor-safe A2-R1 pure-contract workflow was SUCCESS. Two valid Codex review findings were corrected and resolved before merge.

## Accepted integration decision

One learner-facing **A2-R1 pilot is authorized** as the next runtime candidate, but only under this narrow contract:

```text
source dialogue          doctor-appointment
prerequisite lesson      l45 — Santé & rendez-vous médical
facts                    jai-mal-ventre / depuis-hier / rendez-vous-medecin
questions                exactly 3
surface                  existing Listening overlay
integration              additive / backward-compatible
historical doctor flow   preserved unchanged
new route                NO
new lesson/item          NO
new durable store        NO
schema migration         NO
Build43                  NOT AUTHORIZED
full A2 curriculum       NOT AUTHORIZED
```

## Authority boundary — LOCKED

Trusted authority and activity data remain separate.

Conceptually:

```text
R1_AUTHORITIES[id]
→ dialogueId
→ prerequisiteLessonId
→ allowedFactIds

R1_ACTIVITIES[id]
→ id
→ lane
→ complete source
→ questions
```

Runtime must call:

```text
normalizeActivity(R1_ACTIVITIES[id], R1_AUTHORITIES[id])
```

The activity must never self-authorize.

## Learner-data boundary — LOCKED

Before an answer, only existing Listening playback telemetry may change:

```text
totals.plays
totals.replays
totals.slowPlays
updatedAt
```

Memory, Error Intelligence, Evidence v2, learner/curriculum state and any hypothetical R1 sequence/store remain unchanged until an answer.

After an answer, one question may write deterministic Listening truth for **its one factId only**, with source `listening-r1`.

Forbidden:

```text
aggregate R1 mastery
A2 reception mastery
A2 readiness/unlock badge
Evidence v2 direct write
P3b durability
new eighth durable store
CEFR certification
```

## UX / interaction boundary

First pilot:

```text
full dialogue play/replay
→ q1
→ q2
→ q3
→ transcript reveal only after q3
→ bounded descriptive summary
→ return to Listening
```

Normal/slow playback remains owned by Listening. Existing `doctor-appointment` single-question behavior remains available and unchanged.

No `A2-R1`, `bridge`, `factId` or `evidence` architecture language is shown to Trân.

## Required next candidate

The next authorized candidate is exactly:

**A2-R1 Learner Integration Pilot — doctor-appointment only**

Expected narrow architecture:

```text
src/pedagogy/a2-reception-bridge-data.js
src/pedagogy/a2-reception-bridge-core.js      reuse accepted core
src/pedagogy/listening-engine.js              minimal owned integration
src/pedagogy/listening-engine.css             minimal R1 states if required
src/core/build32-loader.js                     load bridge pieces
sw.js                                          offline precache/version bump
unit/browser tests + dedicated CI + docs
```

A separate thin runtime/controller file is allowed only if it clearly reduces Listening complexity without creating a second engine or DOM monkeypatch owner.

Default protection remains:

```text
src/pedagogy/listening-data-2.js  unchanged
curriculum files                  unchanged
app.js                            unchanged
voice-ios.js                      unchanged
free-voice.js                     unchanged
Recovery/Evidence schemas         unchanged
routes                            unchanged
```

## Required field gate after candidate acceptance

Real installed iPhone/PWA:

```text
Listening
→ launch R1 pilot
→ normal play
→ answer q1
→ slow replay
→ answer q2
→ answer q3
→ transcript reveal
→ return to Listening
```

Must show:

- no blank screen;
- no stuck overlay;
- no duplicate audio/control;
- no learner-data loss;
- no horizontal overflow / broken touch targets.

This field gate certifies only the integration behavior. It does not certify A2 level.

## Expansion boundary

Until the first pilot has passed CI, deployment and the real iPhone field gate:

```text
second R1 dialogue  NOT AUTHORIZED
A2-P1               DEFER
A2-I1               DEFER
A2-W1               DEFER
Build43             NOT AUTHORIZED
full A2 curriculum  NOT AUTHORIZED
```
