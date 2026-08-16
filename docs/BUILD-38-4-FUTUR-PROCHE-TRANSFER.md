# Build 38.4 — deterministic present → futur proche transfer

Status: **IMPLEMENTED / PR CANDIDATE / NOT MERGED**

## Why this family now

After Build 38.3 proved a second pure transfer family, the remaining candidates were re-audited against the real curriculum.

The cleanest next transformation is **present → futur proche** because lessons 32–35 already provide the exact structural pieces:

- lesson 32: `Tu travailles ?` and `Tu vas où ?`;
- lesson 33: `Il travaille.`, `Elle travaille.`, `Il va travailler.`;
- lesson 35 explicitly teaches `Futur proche = aller + infinitif`;
- lesson 35 contains `Je vais travailler.`;
- Build 38.1 already certifies the present source forms for `je / tu / il / elle + travailler`.

Using one verb across four subjects isolates the structural transfer instead of mixing structure acquisition with new vocabulary.

## Exact 38.4 matrix

```text
Je travaille.   → Je vais travailler.
Tu travailles.  → Tu vas travailler.
Il travaille.   → Il va travailler.
Elle travaille. → Elle va travailler.
```

Family:

```text
present-futur-proche-travailler-singular
```

Pattern:

```text
same subject
→ correct present form of aller
→ infinitive travailler
```

## Architecture

New pure core:

```text
src/pedagogy/generalization-futur-proche-core.js
schema      french-tranquille-generalization-futur-proche/v1
build       38
slice       38.4
status      pure-non-wired
persistence ephemeral-only
mastery     false
```

The core reuses Build 38.1 only for the already-certified present source sentences. It does not change 38.1, 38.2 or 38.3.

## Explicit exclusions

38.4 deliberately excludes:

- `nous / vous / ils / elles`;
- other infinitives;
- futur proche + negation combination;
- questions;
- past tense;
- new vocabulary;
- random/adaptive generation;
- learner-facing placement;
- durable writes;
- Evidence product reads;
- mastery claims.

## Protected predecessors

38.4 must preserve:

- Build 37 Foundations owners/routes;
- Build 38.1 subject-substitution semantics and six-item catalog;
- Build 38.2 lesson-33 learner placement;
- Build 38.3 negation semantics and three-item catalog;
- curriculum 52/313;
- Recovery v3 / seven durable stores;
- Evidence derived-shadow role;
- Premium / voice / navigation / PWA owners.

## Dedicated tribunal

Node:

```text
tools/test-build38-4-futur-proche-transfer.cjs
```

Browser:

```text
tests/browser/build38-4-futur-proche-transfer.html
```

The dedicated workflow replays 38.1 and 38.3 predecessors, then certifies 38.4 in:

```text
VI × 1280×900
FR × 1280×900
VI × 390×844
FR × 390×844
```

Browser proof requires:

- all four deterministic exercises through real button clicks;
- exact source/target matrix;
- choice targets >=44 px;
- no horizontal overflow;
- localStorage byte-identical.

## Completion gate

Build 38.4 may merge only after the dedicated workflow is green and the PR matrix contains no new product regression beyond the four inherited historical CI failures.

No physical-device smoke is required for this **pure/non-wired** slice because it changes no learner-facing runtime.
