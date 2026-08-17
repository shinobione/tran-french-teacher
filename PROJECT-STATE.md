# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
> Repository/GitHub reality wins over stale wording. Always verify live `main`, PRs, CI and Pages before acting.

## Current checkpoint — 2026-08-17

- Repository: `shinobione/tran-french-teacher`.
- Default branch: `main`.
- Current governance `main`: **`ec0c2d9eddba72f5385d23005d203d72c34ca571`** — docs-only Build 38.8 closeout / next-family handoff.
- Current runtime-bearing product: **`3fae502dba8faee003b44c5a1b9a9cffd9affec7`** — squash merge of PR **#197**, Build **38.8 · learner-facing negation transfer**.
- GitHub Pages runtime proof: **#263 / run `32056843564` — SUCCESS** on exact runtime SHA `3fae502dba8faee003b44c5a1b9a9cffd9affec7`.
- GitHub Pages closeout proof: **#264 / run `32057646904` — SUCCESS** on exact governance SHA `ec0c2d9eddba72f5385d23005d203d72c34ca571`.
- Build 38.8 dedicated tribunal on the final candidate head was **SUCCESS**. Merge used a documented **controlled CI-infrastructure exception** because sequential workflow-only successor-safety fixes saturated GitHub Actions with superseded queued runs; this is **not** a claim that the complete final-head matrix had drained before merge.
- Visible application metadata remains **v2.4.0 · Build 36**.
- Pedagogy baseline: **v2.3.0 · Build 34**.
- Curriculum: **52 lessons / 313 items**.
- Recovery: **7 durable stores / backup v3**.
- Evidence v2: **derived shadow only; original six stores remain product truth**.
- Premium V5.10: **CLOSED / physical FIELD PASS**.
- **Build 35 CLOSED. Build 36 CLOSED. Build 37 CLOSED.**
- **Build 38 ACTIVE — Generalization & Transfer.**
- **38.1 CLOSED** — deterministic subject-substitution core.
- **38.2 CLOSED / DEPLOYED** — subject Transfer in lesson 33.
- **38.3 CLOSED** — deterministic affirmation → negation core; core semantics remain pure/ephemeral and are now consumed by the learner-facing 38.8 route.
- **38.4 CLOSED** — deterministic present → futur proche core.
- **38.5 CLOSED / DEPLOYED** — futur proche Transfer in lesson 35.
- **38.6 CLOSED** — deterministic singular → plural nominal core.
- **38.7 CLOSED / DEPLOYED** — nominal plural Transfer in lesson 13.
- **38.8 CLOSED / DEPLOYED** — negation Transfer in lesson 34.
- **38.9 CANDIDATE / NON-WIRED** — deterministic `nous → on` spoken-French transfer core on PR **#199**.
- Active candidate branch: **`build38/spoken-on-transfer-core`**.
- Initial 38.9 candidate commit: **`57293ada3267fe5899752e0c8b424a8b092e4d39`**.
- **NEXT: review/certify PR #199 only. Do not wire a learner-facing 38.10 route automatically.**

## Build 38.9 — current candidate / audit winner

The post-38.8 next-family audit selected a narrow recombination already scaffolded by the live curriculum:

```text
family = nous-on-spoken-equivalence
status = pure-non-wired
lesson 34 source scaffold = nous
lesson 52 / F18 target scaffold = spoken on meaning nous
```

Exact candidate catalog:

```text
Nous travaillons. → On travaille.
Nous rentrons.    → On rentre.
Nous allons à…    → On va à…
```

Why this family won:

- lesson 34 already teaches `Nous travaillons.`, `Nous rentrons.` and `Nous allons à…`;
- lesson 52 explicitly says `on` very often replaces `nous` in spoken French and takes the verb form used with `il/elle`;
- Foundations F18 already owns `spoken-on` as `explicit / reuse-existing / lesson 52`;
- therefore 38.9 recombines known structures instead of inventing a new Foundation concept or new vocabulary.

Agreement transformation was audited but **not selected** for this slice: F13 gives Trân several feminine forms, while the corresponding masculine source forms are mostly distractors rather than equally solid learner-facing acquisitions. A masculine→feminine transfer would therefore smuggle new source material into a supposed generalization exercise.

38.9 deliberately excludes:

```text
On est prêts.
On a le temps.
generic / indefinite on
passive on
object-pronoun rewrites
negation
questions
adjective agreement
new vocabulary
random/adaptive generation
durable writes
Evidence product reads
mastery claims
learner-facing lesson wiring
```

Candidate files are documented in `docs/BUILD-38.9-SPOKEN-ON-TRANSFER.md`.

A future learner-facing placement is **not assigned** by this candidate. Lesson 52 is the obvious area to audit later, but it must first prove useful construction practice without duplicating the existing lesson or stacking competing pedagogy.

## Build 38.8 — certified learner-facing negation transfer

Placement:

```text
lesson 34 normal content
→ existing F05 Foundation card
→ ONE optional negation Transfer card
→ 3 deterministic transformations
→ return focus to Transfer CTA / lesson
→ normal Continue
```

Exact learner subset, reused unchanged from certified 38.3:

```text
Je travaille. → Je ne travaille pas.
J'habite ici. → Je n'habite pas ici.
J'aime ça. → Je n'aime pas ça.
```

Contract:

```text
negationIntegration = 38.8
negationLesson = 34
negationFamily = affirmation-negation-regular-er-je
negationExerciseIndexes = [0,1,2]
```

The shared Transfer renderer now owns exactly these learner-facing routes:

```text
38.7 → lesson 13 / nominal plural / [0,2,3]
38.2 → lesson 33 / subject substitution / [0,2,5]
38.8 → lesson 34 / affirmation → negation / [0,1,2]
38.5 → lesson 35 / futur proche / [0,1,3]
```

There is still **one shared Transfer renderer**. Build 38.8 did not add a second Transfer UI or a new family.

Runtime dependency order:

```text
Foundations
→ 38.1 subject core
→ 38.3 negation core
→ 38.4 future core
→ 38.6 number core
→ shared Transfer adapter
```

Installed-PWA parity is preserved by explicit precache of the certified negation core. The PWA identity/cache-namespace contract from PR #180 remains unchanged.

### 38.8 proof / closeout

```text
PR #197
final candidate head 06fcb745edb86018294f6369fd4922abe69687f3
squash merge 3fae502dba8faee003b44c5a1b9a9cffd9affec7
Pages #263 / run 32056843564 — SUCCESS on exact merge SHA
```

The final 38.8 tribunal proved:

```text
certified 38.3 core reused unchanged
F05 coexistence in lesson 34
ONE Transfer card after F05
VI / DEBUG FR × desktop / 390×844
3 deterministic learner answer clicks
lesson 13 nominal route unchanged
lesson 33 subject route unchanged
lesson 35 future route unchanged
lesson 36 no negation route leak
return focus + normal Continue
localStorage byte-identical
no horizontal overflow
>=44px targets
installed-PWA negation-core precache
no durable learner write
no Evidence product read
no mastery claim
```

### CI-infrastructure classification — permanent note

The first PR #197 full matrix exposed eight stale predecessor ownership guards. Their functional/contract checks passed; they failed only because historical workflows broadly forbade later delivery wiring such as `src/core/build32-loader.js`, `sw.js` or the shared Transfer adapter.

The fix was **workflow-only successor-safety maintenance**. No certified core or product owner was changed to appease CI.

Executed green after those fixes before merge included:

```text
Build 37.4 F11 — SUCCESS
Build 37.5 F05 — SUCCESS
Build 37.6 F08 — SUCCESS
Build 37.7 F12 — SUCCESS
Build 37.8 F13 — SUCCESS
Build 38.1 subject-substitution successor-safe guard — SUCCESS
Build 38.8 final-head tribunal — SUCCESS
```

At merge time, the updated 38.4 and 38.6 workflow reruns were still queued behind the Actions fan-out. Their certified core files were unchanged, their earlier full browser tribunals were green, and their first #197 executions had passed contract checks before failing only at the obsolete broad guard. PR #197 records the exact controlled-infrastructure exception.

**Do not rewrite history as “full matrix green before merge.”** The accurate statement is: product/runtime proof was green, new reds were classified as stale CI ownership guards, successor-safe maintenance was isolated to workflow YAML, and the merge exception was explicitly documented.

## Locked Build 38 predecessors

### 38.1 subject substitution

```text
family = subject-substitution-regular-er
subjects = je / tu / il / elle
verbs = travailler / habiter / aimer
```

### 38.2 learner placement

```text
lesson 33 → F08 → ONE subject-substitution Transfer card
```

### 38.3 negation core

Certified deterministic catalog:

```text
Je travaille. → Je ne travaille pas.
J'habite ici. → Je n'habite pas ici.
J'aime ça. → Je n'aime pas ça.
```

Family:

```text
affirmation-negation-regular-er-je
```

38.3 core semantics remain deterministic, narrow and ephemeral. Build 38.8 wires that certified core into lesson 34; it does not broaden the core.

### 38.4 futur proche core

```text
Je travaille.   → Je vais travailler.
Tu travailles.  → Tu vas travailler.
Il travaille.   → Il va travailler.
Elle travaille. → Elle va travailler.
```

### 38.5 learner placement

```text
lesson 35 → F05 → ONE futur-proche Transfer card
```

### 38.6 nominal plural core

```text
la gare       → les gares
la pharmacie  → les pharmacies
un billet     → des billets
une table     → des tables
```

### 38.7 learner placement

```text
lesson 13 → F01–F04 → ONE nominal-plural Transfer card
```

### 38.8 learner placement

```text
lesson 34 → F05 → ONE affirmation→negation Transfer card
```

## Build 37 ownership — LOCKED

```text
F01–F04 → lessons 8–13
F11     → lessons 17–20
F08     → lessons 32–33
F05     → lessons 34–36
F13     → lesson 40 only
F12     → lessons 41–43
```

F16 remains deferred / not completed.

F18 remains `reuse-existing`, canonically taught by lesson 52; Build 38.9 does not turn it into a new Foundation route.

## Inherited CI debt

Exactly four historical failures remain baseline debt:

1. `Build 36.2 Evidence shadow adoption`;
2. `V2.0.0 Freeze tribunal`;
3. `Build 36.3 Recovery v3 durability tribunal`;
4. `Build 28 Data recovery smoke`.

Any other failure must be classified. Prove harness flakes with unchanged reruns before patching product code. Historical red debt is not permission to ignore new failures.

## Protected boundaries

Do not silently change:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
PWA identity/cache contract from PR #180
Recovery v3 / backup v3 / seven-store ownership
Evidence derived-shadow role
original six stores as product truth
52/313 curriculum semantics
Listening / Scenario / Mastery / Learner Intelligence owners
V5.10 field-approved navigation/visual identity
Build 37 Foundation routes
38.1 / 38.3 / 38.4 / 38.6 pure-core semantics
38.2 lesson-33 Transfer placement
38.5 lesson-35 Transfer placement
38.7 lesson-13 Transfer placement
38.8 lesson-34 Transfer placement
shared Transfer renderer ownership
```

## NEXT — review Build 38.9 candidate PR #199

Current control step:

```text
review PR #199 exact diff
→ run/classify dedicated 38.9 tribunal and full matrix
→ allow only the four inherited historical reds
→ do not mutate product for a runner/harness flake without proof
→ merge only if the candidate remains pure/non-wired and predecessor owners stay intact
```

If 38.9 merges, the next action is a **separate learner-placement audit**. Do not assume lesson 52 must receive a Transfer card merely because it teaches `on`.

Do not start Build 39 inside this handoff. Build 39 remains a later Learner Intelligence phase that should consume reliable evidence from completed prior systems.

## Documentation note

`MASTER-ROADMAP.md` on `main` still represents the last accepted closeout through Build 38.8. The 38.9 audit winner is a **candidate decision carried by PR #199 plus `docs/BUILD-38.9-SPOKEN-ON-TRANSFER.md` and this volatile checkpoint**. If the candidate is accepted/merged, reconcile the durable `MASTER-ROADMAP.md` during closeout. Repository/GitHub reality still wins if later commits diverge from this snapshot.