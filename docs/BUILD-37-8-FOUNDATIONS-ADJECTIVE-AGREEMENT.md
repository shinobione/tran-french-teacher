# Build 37.8 — Foundations F13 · Adjective Agreement

Status: **CANDIDATE SLICE**

## Baseline

37.8 starts from merged and deployed Build 37.7:

```text
main    d4d0436cfc86019de1e5e8a378c97829414b4656
PR      #183 — Build 37.7 F12 Practical Question System
Pages   #235 / run 31973980389 — SUCCESS
```

The 37.7 PR matrix closed with all non-inherited workflows green and exactly the four inherited historical failures.

## Why F13 now

After F12, the remaining partial Core candidates include F13 adjective agreement and F16 `à / de` contractions.

F13 has the cleaner learner-facing evidence:

```text
lesson 16 → Je suis prête. / Il est français. / Elle est française.
lesson 38 → feminine written forms already noticed: allée / arrivée / rentrée…
lesson 40 → Je suis contente. / inquiète. / stressée. / très fatiguée.
```

Lesson 40 already owns the useful structure:

```text
je suis + adjectif
```

Therefore 37.8 exposes the capsule **only in lesson 40**. Lesson 38 remains contextual prior evidence, not part of the runtime route; lesson 39 is deliberately skipped because its administrative content is unrelated.

## Teaching contract

Learner reflex:

> **L’adjectif décrit qui ? / Tính từ đang mô tả ai?**

When Trân speaks about herself, use the familiar feminine form already encountered.

Examples stay inside known vocabulary:

```text
Je suis prête.
Je suis contente.
Je suis très fatiguée.
Je suis stressée.
Elle est française.
Je suis inquiète.
```

The capsule explicitly avoids the false beginner rule “always just add `-e`”. It presents familiar patterns instead:

```text
content → contente
fatigué → fatiguée
français → française
inquiet → inquiète
```

It also notes that oral differences vary: some masculine/feminine pairs sound different; others do not.

## Critical boundary: adjective vs passé composé

Lesson 38 has already shown feminine written forms with movement verbs (`allée`, `arrivée`, `rentrée`), but 37.8 does **not** merge past-participle agreement and adjective agreement into one grammar rule.

Lesson 38 is only a bridge:

> Trân has already seen that a feminine written form may change.

The actual F13 teaching target remains common **adjectives describing a person/state**.

## Route ownership

```text
F01–F04 → lessons 8–13
F11     → lessons 17–20
F08     → lessons 32–33
F05     → lessons 34–36
F13     → lesson 40 only
F12     → lessons 41–43
```

Historical ownership stays additive:

```text
adapter: '37.3'
expansion: '37.4'
consolidation: '37.5'
verbPattern: '37.6'
systematization: '37.7'
agreement: '37.8'
agreementConcepts: ['F13']
```

## 37.7 composability maintenance

37.7 originally certified that lesson 40 and lesson 44 had no Foundations entry because those boundaries were empty at the time. That would incorrectly freeze future additive ownership.

37.8 updates the predecessor contract so it now certifies the durable statement:

```text
lesson 40 is not owned by F12
lesson 44 is not owned by F12
```

rather than requiring those lessons to remain empty forever.

The 37.7 Node/workflow guards similarly keep certifying F12 itself without banning future successor concepts.

## Safety

No change to:

- curriculum 52 / 313;
- lesson definitions;
- `app.js`, `voice-ios.js`, `free-voice.js`;
- Recovery v3 / seven-store ownership;
- Evidence derived-shadow role / product read path;
- learner durable stores;
- `index.html`, manifest or Service Worker;
- Premium V5.10 ownership;
- Listening / Scenario / Mastery / Learner Intelligence;
- F16;
- Build 38 transfer/generalization.

Foundations remain optional and ephemeral, with no durable write and no Evidence product read.

## Dedicated tribunal

37.8 replays all certified Foundations owners before accepting F13:

```text
F01–F04
→ F11
→ F08
→ F05
→ F12
→ F13
```

F13 must pass:

```text
VI × desktop
DEBUG FR × desktop
VI × 390×844
DEBUG FR × 390×844
```

Required boundaries:

```text
39 → not F13
40 → F13
41 → F12
32 → F08
34 → F05
```

Required safety evidence:

- exact learner-facing copy/options/answers;
- focus returns to the lesson CTA;
- lesson content survives round trip;
- localStorage byte-identical;
- no Evidence product read;
- no horizontal overflow;
- entry target ≥44 px;
- protected runtime/data/PWA/voice owners outside the diff.

## F16 decision

F16 is intentionally not bundled into 37.8.

The curriculum has a useful lesson-45 contrast:

```text
à la tête ↔ au ventre
```

but a full `à / de` contraction capsule risks colliding with already-taught `du / des` article/partitive meanings, and the inspected curriculum does not provide an equally clean `aux` scaffold.

After 37.8, reassess whether F16 has enough evidence to justify one more Build 37 slice. **Do not add F16 merely to complete a checklist.** Build 37 may close after F13 if the pedagogical evidence does not support another narrow capsule.
