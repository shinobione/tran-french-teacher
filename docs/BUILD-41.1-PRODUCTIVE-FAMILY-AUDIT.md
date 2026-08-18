# Build 41.1 — A1 Productive Family Audit

Status: **AUDIT CANDIDATE / READ-ONLY**

Base audited:

```text
7fb5b66ab992852cd4f73aa4d05fa01b1a9b5b25
```

Build40 selected **A1 Productive Consolidation** because French Trân’quille already has broad A1 thematic coverage, while active construction/generalization remains much narrower.

41.1 audits seven candidate productive families and selects **at most one** implementation family.

No runtime, learner data, curriculum, Evidence, Recovery, voice, Premium or public metadata change is part of this slice.

---

# 1. Admission criteria

A candidate can become the next implementation family only if all of these are true:

1. source forms are genuinely taught in the current 52/313 curriculum;
2. target transformation is deterministic enough to test exactly;
3. no new vocabulary is required;
4. no hidden semantic choice is disguised as a mechanical transform;
5. the exercise adds active construction rather than merely repeating the lesson;
6. it can remain ephemeral with no mastery claim or new durable store.

Classification vocabulary:

```text
IMPLEMENTABLE DETERMINISTIC FAMILY
DEFER — NEEDS BETTER SOURCES
REJECT — TOO SEMANTIC / AMBIGUOUS
ALREADY COVERED / DUPLICATE
```

---

# 2. Candidate A — question construction / reformulation

## Existing teaching

Lesson 25 already teaches simple question continuation without requiring inversion, including short oral question words such as `Pourquoi ?`, `Quand ?`, `Avec qui ?`.

Foundation F12 then consolidates a **multi-strategy** practical question system across lessons 41–43:

```text
intonation
question word
polite request
```

with examples such as:

```text
Tu veux… ?
Où… ?
Pouvez-vous… ?
```

## Audit result

A generic statement → question transform would need to choose among several legitimate strategies. That is exactly the ambiguity already identified when Build38 rejected generic affirmation→question transfer.

A trivial “add a question mark” exercise would be pedagogically weak; a fixed `est-ce que` or inversion transform would privilege a strategy the current learner curriculum intentionally does not require.

### Classification

**REJECT — TOO SEMANTIC / AMBIGUOUS**

Do not reopen questions as a generic mechanical family.

---

# 3. Candidate B — past-time recombination

This candidate contains two very different subfamilies and must not be treated as one generic “past tense” transform.

## 3.1 Passé composé generic transformation

Lessons 37–38 introduce starter blocks such as:

```text
J'ai mangé.
J'ai travaillé.
J'ai regardé un film.
J'ai appelé Jerry.
J'ai acheté ça.
J'ai pris le train.

Je suis allée / arrivée / rentrée…
```

A generic present → passé composé generator would immediately require:

- auxiliary choice `avoir` / `être`;
- irregular participles such as `pris`;
- agreement rules for selected movement verbs;
- lexical verb metadata broader than the current deterministic Transfer contract.

Therefore **generic passé composé transfer is not authorized** in 41.1.

## 3.2 Recent past `venir de + infinitif`

Lesson 36 explicitly describes `venir de + infinitif` as a **very regular structure** and teaches:

```text
Je viens d'arriver.
Je viens de manger.
Je viens de finir.
Je viens de rentrer.
Il vient de partir.
Elle vient d'appeler.
```

Lesson 24 already teaches a coherent set of first-person present actions:

```text
Je travaille.
Je mange.
Je rentre à la maison.
Je regarde un film.
```

This yields a safe static productive family using already-taught vocabulary:

```text
Je travaille.          → Je viens de travailler.
Je mange.              → Je viens de manger.
Je rentre à la maison. → Je viens de rentrer à la maison.
```

Optional fourth audit-safe pair exists:

```text
Je regarde un film.    → Je viens de regarder un film.
```

41.1 selects **exactly three** exercises for the first core candidate; the fourth remains a spare audit anchor.

Why this passes:

- same subject: `je`;
- same action semantics;
- no new vocabulary;
- all selected infinitives are known regular `-er` forms;
- no auxiliary-choice problem;
- no participle irregularity;
- no agreement decision;
- learner must actively rebuild a new temporal meaning instead of selecting the stored present phrase;
- no durable mastery claim is needed.

### Classification

**IMPLEMENTABLE DETERMINISTIC FAMILY — SELECTED**

Canonical first implementation target:

```text
present-je-regular-action → recent-past-je-venir-de
```

Recommended implementation boundary: **pure non-wired core first**, with no learner placement until separately audited.

---

# 4. Candidate C — articles / quantities / F16 contractions

## Existing teaching

Current product already teaches:

- F01–F04: gender, articles, singular/plural;
- lesson 22: `du pain`, `du lait`, `des œufs`;
- lesson 42: quantity + `de`, e.g. `une bouteille d'eau`, `un paquet de riz`;
- distributed lexical contractions such as `Je viens du Vietnam`, `J'ai mal au ventre`, while `J'ai mal à la tête` demonstrates a non-contracted feminine form.

## F16 state

The canonical Foundations registry still marks F16 `à / de contractions` as:

```text
partial-distributed
teach-core
later-core
```

There is no dedicated learner-facing F16 teaching owner yet.

## Audit result

A productive transfer should not test a structural rule **before the product has actually taught that rule coherently**. Current examples are distributed across lexical phrases and several semantic/prepositional contexts.

Quantities themselves are already well represented in lessons 22/42, but combining them into a single “articles/quantities/contractions” transform would blur distinct grammatical phenomena.

### Classification

**DEFER — NEEDS BETTER SOURCES**

F16 deserves its own later Foundation audit before it can become productive transfer input.

---

# 5. Candidate D — possessive recombination

## Existing teaching

Lesson 31 explicitly teaches the full first practical contrast:

```text
mon / ma / mes
ton / ta / tes
```

with examples:

```text
Mon prénom
Ma famille
Mes affaires
Ton téléphone
Ta carte
Tes clés
```

and explicitly explains that possessive choice depends on the possessed noun’s gender/number.

## Audit result

A minimal deterministic family such as `mon → ton`, `ma → ta`, `mes → tes` is mechanically possible, but with the currently explicit six-item set it would mostly replay the exact contrast lesson 31 already owns.

A broader useful family would require a larger certified noun gender/number source set and placement audit so that the exercise becomes recombination rather than duplicate flashcard substitution.

### Classification

**ALREADY COVERED / DUPLICATE**

Do not select as the next implementation family. Revisit only if a future audit can prove genuinely new noun-possessive combinations from already-secure nouns.

---

# 6. Candidate E — adjective agreement

## Existing teaching

Foundation F13 and lesson 40 teach useful agreement/state forms. The product deliberately avoids a universal “just add `-e`” rule.

Build38 already audited adjective agreement as a possible Transfer family and rejected it because the learner-facing curriculum did not provide a sufficiently strong paired masculine source set for the feminine forms actually taught to Trân.

## Audit result

Nothing in Build40/41.1 changes that source-quality problem. Creating novel adjective pairs now would either:

- introduce untaught masculine forms;
- over-generalize `+e`;
- or hardcode a tiny duplicate set rather than test generalization.

### Classification

**DEFER — NEEDS BETTER SOURCES**

---

# 7. Candidate F — short narrative assembly

## Existing teaching

Lesson 50 teaches sequencing connectors:

```text
D'abord…
Ensuite…
Après…
Puis…
Finalement…
```

and explicitly says the connectors structure an already-known story rather than changing verb forms.

## Audit result

Choosing a valid order for several independent events is fundamentally semantic. A mechanical generator cannot know whether “work → eat → go home” or another order is the intended real story unless the exercise supplies the whole event sequence in advance.

At that point the task becomes ordered assembly / discourse planning, which can be pedagogically useful but is **not the same deterministic transformation contract** as Build38-style transfer.

### Classification

**REJECT — TOO SEMANTIC / AMBIGUOUS** for the next deterministic Transfer family.

Narrative assembly may deserve a separate future exercise architecture, not a mechanical transform.

---

# 8. Candidate G — opinion + proposition recombination

## Existing teaching

Lesson 51 teaches:

```text
Je pense que…
Je trouve que…
Je suis d'accord.
Je ne suis pas d'accord.
Ça dépend.
Pour moi…
```

and says a simple known proposition can follow `Je pense que… / Je trouve que…`.

## Audit result

Syntactically prefixing a proposition is easy, but pedagogically the resulting statement makes a **semantic commitment**. The system cannot mechanically decide that Trân thinks a given proposition without either asking her opinion or supplying a context.

A static set could be authored, but that would be new content/context design rather than deterministic transformation of an already-known meaning.

### Classification

**REJECT — TOO SEMANTIC / AMBIGUOUS**

---

# 9. Final classification matrix

| Candidate | Classification | Reason |
|---|---|---|
| Questions | **REJECT — TOO SEMANTIC / AMBIGUOUS** | multiple legitimate taught strategies |
| Past-time recombination | **IMPLEMENTABLE DETERMINISTIC FAMILY — SELECTED** | narrow recent-past `je + venir de + infinitive` is regular and source-safe |
| Articles / quantities / F16 | **DEFER — NEEDS BETTER SOURCES** | F16 not coherently taught yet; phenomena should not be conflated |
| Possessives | **ALREADY COVERED / DUPLICATE** | l31 already owns the explicit mon/ma/mes ↔ ton/ta/tes contrast |
| Adjective agreement | **DEFER — NEEDS BETTER SOURCES** | paired source forms still insufficient; avoid fake `+e` rule |
| Short narration | **REJECT — TOO SEMANTIC / AMBIGUOUS** | event ordering is discourse semantics, not mechanical morphology |
| Opinion clauses | **REJECT — TOO SEMANTIC / AMBIGUOUS** | proposition truth/stance cannot be inferred mechanically |

Exactly **one** family passes 41.1.

---

# 10. Selected next implementation boundary

The next authorized implementation slice is a **pure non-wired recent-past transfer core**.

Canonical first catalog:

```text
Je travaille.          → Je viens de travailler.
Je mange.              → Je viens de manger.
Je rentre à la maison. → Je viens de rentrer à la maison.
```

Mandatory implementation constraints:

- static deterministic catalog, no random generation;
- source/target text must be exact and frozen;
- no new vocabulary;
- no generic passé composé support;
- no `tu / il / elle / nous / vous / ils` in first core;
- no reflexive transformation (`Je me lève`) in first core;
- no negation/questions;
- no storage / Evidence / mastery claim;
- no loader/SW/learner-facing wiring in the pure-core slice;
- Build38 owners stay byte-identical;
- later learner placement requires a separate audit after the core is certified.

Recommended next slice name:

```text
Build 41.2 — recent-past deterministic transfer core
```

---

# 11. A2 gate

A2 remains **NOT AUTHORIZED**.

41.1 selects one A1 productive consolidation family. It does not prove that A1 productive depth is complete and does not justify an A2 content roadmap.
