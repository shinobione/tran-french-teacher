# Build 40 P3 — Evidence-owner Design Audit

Status: **AUDIT CANDIDATE / READ-ONLY**

Date: 2026-08-20

Audited base:

```text
22f4d5d5e3c111c14255b4e8a80a320cfa2c9469
```

This audit changes no runtime, curriculum, learner data, Recovery, Evidence schema, voice, Premium, PWA or public runtime metadata.

## 1. Question

Build40 deliberately postponed evidence-owner design until learner-facing productive/structural activities existed.

Build41 and Build42 now provide that missing activity surface:

- six learner-facing deterministic Transfer families in total;
- learner-facing Foundations capsules, including the completed F16 teach-core;
- real per-question success/miss decisions inside those activities.

The P3 question is therefore:

> Do current Foundations and Transfer activities emit observations trustworthy enough to justify a semantic evidence owner, and if so what is the smallest honest ownership model before any persistence decision?

This is **not** an authorization to create a store, claim mastery, cut over Evidence v2, or open A2.

## 2. Sources audited

Current owners and contracts inspected on the audited base:

```text
src/pedagogy/foundations-capsule-engine.js
src/pedagogy/foundations-pilot.js
src/pedagogy/generalization-transfer-lesson.js
src/pedagogy/learning-memory.js
src/pedagogy/error-intelligence.js
src/pedagogy/memory-evidence-v2-core.js
src/pedagogy/learner-evidence-adapter.js

docs/BUILD-35-CLOSEOUT-ADOPTION-READINESS.md
docs/BUILD-36-2-EVIDENCE-SHADOW-ADOPTION.md
docs/BUILD-39.2-LEARNER-EVIDENCE-ADAPTER.md
docs/BUILD-40-A1-CONSOLIDATION-AUDIT.md
docs/BUILD-42-MILESTONE-CLOSURE-AUDIT.md
```

## 3. Observable source-time events now exist

### Foundations

The Foundations engine already computes a deterministic result at answer time.

For every answered check the ephemeral session contains:

```text
capsuleId
checkId
choice
correct
correctAnswer
```

The capsule definition also carries stable semantic provenance:

```text
capsule id
concept ids (F01…F18 namespace)
check ids
```

This is a genuine learner action and a genuine success/miss observation. It is currently discarded with the session and `masteryClaim` remains false.

### Transfer

The shared learner-facing Transfer renderer likewise has stable route/family provenance and computes, for each selected transformation:

```text
lesson
family id
exercise identity/index
choice
correct
source/target transformation owned by the deterministic family core
```

The result currently lives only in the Transfer session.

Accepted learner-facing family IDs already include stable semantic namespaces such as:

```text
subject-substitution-regular-er
present-futur-proche-travailler-singular
singular-plural-regular-noun-phrases
affirmation-negation-regular-er-je
nous-on-spoken-equivalence
present-je-regular-action-to-recent-past-je-venir-de
```

### What is *not* observable

The current activities are deterministic **choice/check activities**. A correct answer proves that the learner selected the correct transformation/check result in that context.

It does **not** prove:

```text
free production
novel sentence generation without choices
long-term mastery
CEFR attainment
pronunciation quality
independent transfer to an unseen lexical context
```

The project must not rename a multiple-choice success into `novel-construction-transfer` merely because the UI asks the learner to “build” or “transform” a phrase.

## 4. Assistance semantics

A miss in the current activities exposes corrective feedback / the correct target before moving on.

That supports an honest event such as:

```text
outcome = miss
modelShownAfterMiss = true
```

It does **not** support:

```text
assisted-success = true
```

because there is no second certified assisted attempt that the learner then succeeds at.

Likewise, opening a capsule, reaching its end, or completing a lesson is not concept evidence by itself.

## 5. Why existing durable owners cannot own these observations honestly

### Learning Memory — reject as concept/Transfer owner

Learning Memory is curriculum-item-centric. Practice/review writes are accepted only for IDs present in the 313-item curriculum.

Mapping `F16` or a Transfer family onto an arbitrary phrase item would change the meaning of that phrase's attempts/successes/misses and would reinterpret learner history.

Verdict:

```text
phrase/item evidence owner  YES
Foundation concept owner    NO
Transfer family owner       NO
```

### Error Intelligence — reject as concept/Transfer owner

Error Intelligence likewise rejects IDs that are not curriculum items. Its current event model correctly owns phrase/listening/scenario observations that have item provenance.

A miss on `affirmation-negation-regular-er-je` is not automatically an error on one particular source phrase. Using a curriculum item as a proxy would manufacture ownership.

Verdict:

```text
item-level observed need    YES
Foundation concept owner    NO
Transfer family owner       NO
```

### Evidence v2 — reject direct-write reuse under the current contract

Evidence v2 is already the seventh Recovery store, but Build35/36 deliberately adopted it as a **derived shadow of the six canonical source stores**.

Its current projection is item-centric and explicitly cannot reconstruct trustworthy `construction`, `transfer` or `concept-understanding` from historical source data.

Writing new source-time Foundation/Transfer events directly into that shadow would silently change it from:

```text
derived projection
```

into:

```text
mixed source + projection store
```

That would be an Evidence contract/cutover change, not a harmless reuse.

Verdict:

```text
current derived-shadow role       preserve
new direct event source role      NOT AUTHORIZED
product-read cutover              NOT AUTHORIZED
```

### New durable store — not yet justified

A dedicated eighth store would immediately imply new Recovery/backup semantics and a persistence migration before the event contract itself has been field-proven.

That is persistence-first architecture and is rejected by P3.

## 6. P3 verdict

### A semantic event owner is justified.

The code now contains real source-time observations with stable non-item identities. They cannot be represented honestly by the existing item owners.

The missing abstraction is therefore not “another mastery score”; it is a **pedagogical observation contract** whose namespace can describe a concept or Transfer family without pretending it is a curriculum item.

### Durable persistence is NOT yet justified.

P3 authorizes only the next proof boundary: define and test the source-time event contract without changing durable state.

## 7. Minimal candidate event contract

A future pure contract should be able to normalize records equivalent to:

```text
schema        french-tranquille-pedagogical-observation/v1
at            timestamp supplied by caller/runtime sink
activityKind  foundation-check | transfer-check
lessonId      real lesson placement

target.kind   foundation-concept | transfer-family
target.ids    stable semantic ids

activityId    capsule id or Transfer family id
exerciseId    check id or stable Transfer exercise id
outcome       success | miss

response.mode multiple-choice
response.choice selected choice

assistance.modelShownAfterMiss true | false
sourceOwner   foundations | transfer
sourceSlice   provenance only
```

The exact field names remain implementation-detail candidates; the semantic constraints are the important part.

Required properties:

- bounded;
- detached/immutable after normalization;
- no curriculum item ID required for concept/family targets;
- stable semantic IDs only;
- source-time only — no retrospective invention;
- no score, strength or mastery field;
- no automatic CEFR implication;
- no `assisted-success` unless an actual assisted retry exists;
- no learner-data write in the first proof slice.

## 8. Aggregation must remain derived

A raw observation owner must not decide mastery.

Future consumers may eventually derive cautious signals such as:

```text
recent repeated misses on distinct checks
successes across distinct checks/sessions
need for another Foundation capsule
need for another Transfer practice
```

but thresholds, independence rules and recency policy require a later audit/proof.

One owner producing several events must not be misrepresented as several independent owners.

## 9. Recommended next boundary after audit acceptance

Do **not** assign Build43 yet.

The smallest justified next slice is:

```text
P3a — pure pedagogical-observation contract proof

→ schema / normalizer only
→ unit tests with Foundation + Transfer fixtures
→ stable semantic target namespaces
→ explicit success/miss/model-shown semantics
→ immutable bounded output
→ zero localStorage/sessionStorage/IndexedDB write
→ zero Recovery/Evidence change
→ zero learner-facing UI change
```

Only after P3a proves the contract should a separate P3b decide how source owners emit into an ephemeral sink/runtime collector.

Only after real source instrumentation is proven should P3c decide whether cross-session durability is worth its migration cost and whether that means:

- an explicit future Evidence contract/cutover redesign; or
- a separately justified durable event store with corresponding Recovery/backup migration.

Neither durability route is authorized by this audit.

## 10. Effect on Learner Intelligence 3

Build39.2 remains correct today:

```text
phrase-retrieval      reliable
listening             reliable
scenario              reliable
concept-review        unavailable
foundation-capsule    unavailable
transfer-construction unavailable
```

P3 audit acceptance alone does not make the last three reliable. They remain unavailable until a certified source-time owner is actually wired and produces trustworthy observations.

No LI3 auto-route or recommendation expansion is authorized by this audit.

## 11. P4 / A2 gate

P3 design work does not itself change learner evidence.

Therefore:

```text
P4 fresh A1 readiness audit  NOT YET
A2                           NOT AUTHORIZED
```

P4 becomes meaningful only after the project has actual trustworthy concept/Transfer observations, not merely an architecture document.

## 12. Final decision

```text
P3 audit verdict

source-time semantic event owner     JUSTIFIED
direct reuse of Learning Memory      REJECTED
direct reuse of Error Intelligence   REJECTED
direct writes into Evidence v2       REJECTED under current shadow contract
new durable store now                 REJECTED
mastery claim                         NOT AUTHORIZED
Build43 implementation number         NOT AUTHORIZED
A2                                     NOT AUTHORIZED

NEXT if this audit is accepted
→ P3a pure pedagogical-observation contract proof
→ no persistence
→ no product behaviour change
```

This is the smallest design that records what the learner actually did without pretending that a phrase item, a derived shadow or a multiple-choice success means more than it does.