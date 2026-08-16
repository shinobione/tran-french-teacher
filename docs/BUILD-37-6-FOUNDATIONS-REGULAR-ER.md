# Build 37.6 — F08 Regular `-er` Present Consolidation

Status: **CANDIDATE / ONE-CONCEPT SLICE**

Parent checkpoint audited before implementation: `main` **e017f7a041d147569ee0d47c93586b2c17f97a83**.

## Why F08 is the next slice

Build 37.5 closed F05 and required a fresh anchor audit before choosing any remaining partial Foundations concept. The unresolved candidates were F08, F12, F13 and F16.

F08 is the smallest justified continuation because the current curriculum already owns a tight contiguous scaffold:

- **lesson 32** explicitly teaches the contrast `je travaille → tu travailles` and uses `Tu travailles ?`, `Tu habites où ?`, `Tu aimes ça ?`;
- **lesson 33** explicitly teaches the same regular `-er` written form for `il / elle`: `Il travaille.`, `Elle travaille.`, `Il habite ici.`, `Elle habite ici.`;
- **lesson 34** introduces `nous` and `-ons`, but it is already inside the F05 consolidation range and also contains spelling behavior such as `nous mangeons` that would widen F08 beyond a narrow first pattern.

Therefore Build 37.6 deliberately routes F08 only to **lessons 32–33**.

F12 questions and F16 contractions remain widely distributed across the curriculum rather than anchored to one compact local sequence. F13 also mixes adjective/state agreement with later past-participle feminine forms. They remain valid later Core candidates but are not bundled into this slice.

## Learner-facing contract

F08 is a short optional consolidation, not a conjugation course.

Teaching key:

```text
many regular -er verbs, written present:
je       → -e
tu       → -es
il/elle  → -e
```

Examples reuse already encountered curriculum language:

```text
Je travaille.
Tu travailles ?
Elle travaille.
J’habite ici.
Tu habites où ?
```

The capsule explicitly tells Trân that these three written forms often sound the same in speech, so the subject pronoun matters for understanding who acts.

It also protects against false generalization by reconnecting one known exception:

```text
aller → tu vas
```

`vouloir` and `pouvoir` are mentioned as other already-known frequent verbs with their own forms. No attempt is made to turn them into regular `-er` verbs.

## Why `nous` is not included here

Build 37.6 intentionally stops before lesson 34.

That preserves two boundaries:

1. **F05 remains the sole Foundations owner of lessons 34–36**;
2. F08 does not expand into a six-person conjugation table or special spelling cases.

A future generalization slice may reuse `nous travaillons` only if the curriculum and transfer design justify it. This slice does not claim that work is complete.

## Architecture

Existing ownership remains intact:

```text
37.2 → pure capsule engine
37.3 → shared learner-facing adapter / renderer
37.4 → F11 expansion
37.5 → F05 consolidation
37.6 → F08 narrow verb-pattern consolidation
```

Routing after this candidate:

```text
lessons 8–13  → F01–F04
lessons 17–20 → F11
lessons 32–33 → F08
lessons 34–36 → F05
```

The adapter keeps historical metadata and adds a separate marker:

```text
verbPattern: '37.6'
verbPatternConcepts: ['F08']
```

It does not overwrite the 37.4 or 37.5 ownership markers.

## Data and safety contract

Unchanged:

- curriculum: **52 lessons / 313 items**;
- Recovery: **7 durable stores**, backup envelope **v3**;
- Evidence: `french-tranquille:memory-evidence:v2`, **derived shadow only**;
- original six source stores remain product truth;
- Foundations remain **ephemeral only**;
- no learner-store write;
- no Evidence product read;
- no curriculum mutation;
- no voice / SpeechRecognition / MediaRecorder change;
- no PWA / manifest / service-worker change;
- no logo or favicon change.

## Tribunal

The dedicated Build 37.6 guard must prove:

1. Node/syntax contracts for the capsule engine, F01–F04, F11, F05 and F08;
2. F01–F04 predecessor browser parity;
3. F11 predecessor browser parity;
4. F05 predecessor browser parity and continued ownership of lesson 34;
5. F08 exact VI / DEBUG FR rendering at desktop and iPhone-size;
6. F08 round trip restores focus to the lesson entry;
7. lesson 32 and lesson 33 route to F08, then lesson 34 routes to F05;
8. localStorage stays byte-identical during the capsule;
9. no horizontal overflow and touch target remains at least 44 px;
10. protected product/data/voice/curriculum/PWA owners are absent from the slice diff.

## Explicitly out of scope

- F12 questions;
- F13 adjective agreement;
- F16 `à / de` contractions;
- `nous / vous / ils` regular-verb table;
- persistent Foundations mastery;
- Memory Evidence product cutover;
- Build 38 transfer/generalization;
- A2.

Build 37.6 should be considered complete only after its PR passes the repository contract and no new non-baseline regression is introduced.