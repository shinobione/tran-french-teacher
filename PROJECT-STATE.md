# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting. Repository reality wins over stale wording.

## Current checkpoint

- Reconciled: **2026-08-17**.
- Repository: `shinobione/tran-french-teacher`.
- Default branch: `main`.
- Current runtime-bearing product commit: **`14b1ff58b49b1fab37ca71daee90bb8d7638221e`** — PR **#191**, Build **38.5 · learner-facing futur proche transfer**.
- GitHub Pages **#256 / run `31980705976` — SUCCESS** on that exact SHA.
- Post-merge matrix on `14b1ff58…`: **exactly the 4 inherited historical failures**, **0 queued**, **0 in-progress**.
- Visible application runtime metadata remains **v2.4.0 · Build 36**.
- Pedagogy baseline: **v2.3.0 · Build 34**.
- Curriculum: **52 lessons / 313 items**.
- Recovery: **7 durable stores / backup v3**.
- Evidence v2: **derived shadow only; original six stores remain product truth**.
- Premium V5.10: **CLOSED / physical FIELD PASS**; issue **#114 CLOSED**.
- **Build 35 CLOSED. Build 36 CLOSED. Build 37 CLOSED.**
- **Build 38 ACTIVE — Generalization & Transfer.**
- **38.1 CLOSED** — deterministic subject substitution core.
- **38.2 CLOSED / DEPLOYED** — learner-facing subject substitution in lesson 33.
- **38.3 CLOSED** — deterministic affirmation → negation core.
- **38.4 CLOSED** — deterministic present → futur proche core.
- **38.5 CLOSED / DEPLOYED** — learner-facing futur proche in lesson 35 using shared Transfer renderer.
- **38.6 NEXT — narrow deterministic singular → plural nominal transfer core.**

## Build 38.5 — certified learner-facing futur proche integration

Canonical route:

```text
lesson 35 normal content
→ existing F05 optional Foundation card
→ ONE optional futur-proche Transfer card
→ 3 deterministic exercises
→ return to lesson
→ normal Continue remains available
```

Learner-facing subset:

```text
Je travaille.   → Je vais travailler.
Tu travailles.  → Tu vas travailler.
Elle travaille. → Elle va travailler.
```

The shared renderer remains single-owner. Historical 38.2 compatibility is preserved:

```text
slice = 38.2
lesson = 33
exerciseIndexes = [0,2,5]
family = subject-substitution-regular-er
```

38.5 adds only:

```text
integration = 38.5
futureLesson = 35
futureExerciseIndexes = [0,1,3]
futureFamily = present-futur-proche-travailler-singular
```

Runtime order is explicit:

```text
Foundations
→ 38.1 subject core
→ 38.4 futur-proche core
→ shared Transfer adapter
```

The 38.4 future core is precached by `sw.js` for installed-PWA offline parity.

### 38.5 proof / closeout

```text
PR #191
candidate head 2cfa7a8426f11b778192552764723cf8c5931edc
Build 38.5 dedicated run 31980416374 — SUCCESS
merge 14b1ff58b49b1fab37ca71daee90bb8d7638221e
Pages #256 / run 31980705976 — SUCCESS
post-merge = exactly 4 inherited failures
0 queued / 0 in-progress
```

Dedicated proof certifies:

```text
38.2 legacy Node/browser predecessor PASS
38.4 pure core predecessor PASS
F05 predecessor PASS
exact lesson33 38.2 behavior in VI/FR × desktop/390×844 PASS
lesson35 future route in VI/FR × desktop/390×844 PASS
F05 + future Transfer order PASS
lesson34/36 no-Transfer boundaries PASS
lesson33 still selects legacy subject family PASS
3 real future answer clicks
return focus + normal Continue PASS
localStorage byte-identical
no horizontal overflow
>=44px targets
loader order + SW offline dependency PASS
```

The PR matrix contained eight additional reds from historical implementation-slice scope guards (Build 37.4→37.8 and 38.1/38.3/38.4). Their semantic contract steps passed and only their old “owners stay untouched” branch guards failed on legitimate successor wiring. The dedicated 38.5 workflow explicitly replayed the relevant predecessors. After merge these scope-gate false positives disappeared and `main` returned to the canonical four historical failures.

No new physical smoke gate is required merely to close 38.5; a concrete installed-PWA/iPhone regression, if observed, remains a maintenance defect.

## Locked Build 38 predecessors

### 38.1 subject substitution

```text
subject-substitution-regular-er
je / tu / il / elle
travailler / habiter / aimer
```

### 38.2 learner placement

```text
lesson 33 → F08 → ONE subject-substitution Transfer card
```

### 38.3 negation core

```text
Je travaille. → Je ne travaille pas.
J'habite ici. → Je n'habite pas ici.
J'aime ça. → Je n'aime pas ça.
```

38.3 remains pure/non-wired. Do not force it into lessons 17–20: F11 is present there, but the full `travailler/habiter/aimer` source scaffold is not yet mature.

### 38.4 futur proche core

```text
Je travaille.   → Je vais travailler.
Tu travailles.  → Tu vas travailler.
Il travaille.   → Il va travailler.
Elle travaille. → Elle va travailler.
```

### 38.5 future placement

```text
lesson 35 → F05 → ONE future Transfer card
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

F16 remains deferred / not completed; Build 37 stays closed.

## Inherited CI debt

Exactly four historical failures remain baseline debt unless separately repaired:

1. `Build 36.2 Evidence shadow adoption`;
2. `V2.0.0 Freeze tribunal`;
3. `Build 36.3 Recovery v3 durability tribunal`;
4. `Build 28 Data recovery smoke`.

A future Build 38 failure is **not** baseline merely because these four exist.

## Protected boundaries

Do not silently change:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
manifest / service-worker PWA identity contract from PR #180
Recovery v3 seven-store ownership
backup envelope v3
Evidence derived-shadow role
original six stores as product truth
52 / 313 curriculum semantics
Listening / Scenario / Mastery / Learner Intelligence owners
V5.10 field-accepted navigation / visual identities
Build 37 Foundations ownership/routes
38.1 deterministic subject-substitution semantics
38.2 lesson-33 placement/round-trip contract
38.3 deterministic negation semantics
38.4 deterministic futur-proche semantics
38.5 lesson-35 shared-renderer placement contract
```

## NEXT — Build 38.6

Fresh audit selects **singular → plural nominal phrases** as the cleanest next pure transfer family and as an originally-prioritized Build 38 gap.

Existing anchors are strong and learner-known:

```text
lesson 8  → La gare. / La pharmacie.
lesson 9  → Je voudrais un billet.
lesson 12 → Une table pour deux, s’il vous plaît.
F01–F04   → la gare / un billet / une table / les toilettes
F01–F04   → le/la → les ; un/une → des
```

Preferred pure matrix:

```text
la gare       → les gares
la pharmacie  → les pharmacies
un billet     → des billets
une table     → des tables
```

38.6 must remain **pure / non-wired** and cover only regular noun plurals where the article transformation is already certified by F01–F04.

Explicit exclusions:

```text
irregular plurals
x / aux spelling families
adjective agreement
possessives
determiners beyond le/la/un/une → les/des
full-sentence plural agreement
new vocabulary
random/adaptive generation
learner-facing wiring
durable writes
Evidence product reads
mastery claims
```

Canonical execution order:

```text
→ create deterministic nominal-number core
→ anchor to app lessons 8/9/12 + F01–F04
→ replay Foundations article core
→ VI / DEBUG FR × desktop / 390×844 browser tribunal
→ localStorage byte-identical
→ one candidate PR
→ automated control/merge after clean classification
```

If 38.6 is certified, the natural later learner-facing placement to audit is **lesson 12**, because by then gare/pharmacie/billet/table have all been encountered and F01–F04 already owns that lesson window.

Do **not** start Build 39 inside Build 38.
