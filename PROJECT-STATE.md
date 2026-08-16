# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting. Repository reality wins over stale wording.

## Current checkpoint

- Reconciled: **2026-08-17**.
- Repository: `shinobione/tran-french-teacher`.
- Default branch: `main`.
- Current closeout/docs line before Build 38 branch: **`4731dd1c7dba77714739b0fd58784acac3bfbc7a`**.
- Runtime-bearing checkpoint: **`cb37b4a6bdd9451a07e83deeae2544a407d78844`** — PR **#184**, Build **37.8 · F13 adjective agreement**.
- Runtime Pages: **#236 / `31975143562` SUCCESS**.
- Build 37 closeout: **PR #185 MERGED** → **`56895589fed9922f3beb7d05910b1ec9791a3362`**.
- Closeout Pages: **#237 / `31975848626` SUCCESS**.
- Runtime post-37.8 signature: **32 SUCCESS + exactly 4 inherited historical failures**, 0 queued / 0 in-progress.
- Visible application runtime metadata: **v2.4.0 · Build 36**.
- Pedagogy baseline: **v2.3.0 · Build 34**.
- Curriculum: **52 lessons / 313 items**.
- Recovery: **7 durable stores / backup v3**.
- Evidence v2: **derived shadow only; original six stores remain product truth**.
- Premium V5.10: **CLOSED / physical FIELD PASS**; issue **#114 CLOSED**.
- **Build 35 CLOSED. Build 36 CLOSED. Build 37 CLOSED.**
- **Build 38 ACTIVE — Generalization & Transfer.**

## Active slice — Build 38.1

Branch:

```text
build38/subject-substitution
```

Goal:

> Prove one deterministic transfer primitive: change who performs a known regular `-er` action, then reconstruct the whole sentence.

Family:

```text
subject-substitution-regular-er
```

Allowed subjects:

```text
je / tu / il / elle
```

Allowed verbs:

```text
travailler
habiter
aimer
```

Explicitly excluded:

```text
nous / vous / ils / elles
questions as a separate family
negation transformation
futur proche
agreement transformation
plural transformation
aller / vouloir / pouvoir / devoir
random generation
new vocabulary
runtime/PWA wiring
durable writes
Evidence product reads
mastery claims
```

Current implementation files:

```text
src/pedagogy/generalization-transfer-core.js
tools/test-build38-1-subject-substitution.cjs
tests/browser/build38-1-subject-substitution.html
.github/workflows/build38-1-subject-substitution.yml
docs/BUILD-38-1-SUBJECT-SUBSTITUTION.md
PROJECT-STATE.md
```

## 38.1 certified code-bearing checkpoint

Code/test head before documentation-only follow-up:

```text
065d035e1ee7b9b6bfa4e1037136d8fe4862be54
```

Dedicated workflow:

```text
Build 38.1 Generalization subject substitution
run 31976022804
SUCCESS
```

That run certifies:

```text
Node contract PASS
Build 37.8 predecessor Node PASS
Build 37.8 F13 browser predecessor PASS
38.1 VI × 1280×900 PASS
38.1 FR × 1280×900 PASS
38.1 VI × 390×844 PASS
38.1 FR × 390×844 PASS
6 deterministic transfer exercises
localStorage byte-identical
no horizontal overflow
choice targets >=44 px
```

The branch is still **pure / non-wired**. Trân does not see 38.1 in the PWA yet.

## Transfer anchors already verified

Build 38.1 is grounded in existing material rather than invented vocabulary:

```text
F05 → identify who acts
F08 → regular -er je / tu / il-elle pattern
lesson 3 → J'habite à Hô Chi Minh-Ville.
lesson 5 → J'aime…
lesson 32 → Tu travailles ? / Tu habites où ? / Tu aimes ça ?
lesson 33 → Il/Elle travaille. / Il/Elle habite ici.
```

Deterministic candidate transformations include:

```text
Je travaille.  → Tu travailles.
Tu travailles. → Elle travaille.
J'habite ici.  → Tu habites ici.
Il habite ici. → Elle habite ici.
J'aime ça.     → Tu aimes ça.
Tu aimes ça.   → Elle aime ça.
```

Pedagogical action:

> keep the meaning and verb → change the person → rebuild the sentence.

This is transfer, not another conjugation table.

## Build 37 ownership — LOCKED

```text
F01–F04 → lessons 8–13
F11     → lessons 17–20
F08     → lessons 32–33
F05     → lessons 34–36
F13     → lesson 40 only
F12     → lessons 41–43
```

Build 38 must not overwrite those owners.

F16 remains **deferred / not completed**; Build 37 does not reopen merely to complete an F01→F18 checklist.

## Protected boundaries

Do not silently change:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
index.html / sw.js / manifest during pure 38.1
Recovery v3 seven-store ownership
Evidence derived-shadow role
52 / 313 curriculum semantics
Listening / Scenario / Mastery / Learner Intelligence owners
V5.10 field-accepted navigation / visual identities
Build 37 Foundations ownership/routes
```

## Inherited CI debt

Exactly four historical failures remain baseline debt unless separately repaired:

1. `Build 36.2 Evidence shadow adoption`;
2. `V2.0.0 Freeze tribunal`;
3. `Build 36.3 Recovery v3 durability tribunal`;
4. `Build 28 Data recovery smoke`.

Do not classify a new 38.1 failure as baseline merely because these exist.

## NEXT

```text
→ verify latest 38.1 branch head / dedicated run
→ inspect final diff against main
→ open ONE candidate PR for 38.1
→ require the dedicated 38.1 tribunal green
→ let full PR matrix classify any new red against the four historical failures
→ do not wire 38.1 into the PWA inside this slice
→ do not start 38.2 or Build 39 inside the candidate PR
```

If 38.1 is accepted, the likely next slice is **38.2 learner-facing integration** using this certified core with no new permanent navigation tab.
