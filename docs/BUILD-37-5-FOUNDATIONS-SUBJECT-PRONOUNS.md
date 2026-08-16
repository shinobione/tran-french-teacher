# Build 37.5 — Foundations F05 Subject-Pronoun Consolidation

Status: **CANDIDATE / learner-facing but ephemeral**

## Goal

Add one narrow Foundations consolidation for **F05 — subject pronouns** without creating a pronoun-table course, changing curriculum ownership, or adding durable evidence.

Build 33 classifies F05 as **PARTIAL / distributed / consolidate**. The curriculum already teaches the perspectives progressively:

- `je` throughout the earlier curriculum;
- `tu` explicitly in lesson 32;
- `il / elle` explicitly in lesson 33;
- `nous` explicitly in lesson 34;
- `vous` already appears in polite survival language;
- spoken `on` has its own explicit owner in lesson 52 / F18 and is deliberately **not re-taught here**.

## Route

The capsule is offered only in **lessons 34–36**, after Trân has encountered the main perspectives needed for the consolidation.

```text
F01–F04 → lessons 8–13
F11      → lessons 17–20
F05      → lessons 34–36
```

## Pedagogical key

The capsule asks one simple question first:

> **Who is doing the action / who is in the state?**

It consolidates:

```text
je      → myself
tu      → a close person I speak to
il/elle → another person
nous    → my group including me
vous    → polite singular or plural
```

It does **not** attempt to teach a full conjugation table. Verb forms in examples are all anchored in phrases already present in the curriculum:

- `Je suis prête.`
- `Tu veux manger ?`
- `Elle travaille.`
- `Nous avons le temps.`
- `Vous pouvez m’aider ?`

`on` is only mentioned as an important later spoken form whose explicit teaching remains owned by F18 / lesson 52.

## Runtime architecture

Build 37 ownership remains explicit:

```text
37.2 → pure generic capsule engine
37.3 → shared learner-facing adapter / renderer
37.4 → F11 expansion ownership
37.5 → F05 consolidation ownership
```

The adapter therefore keeps:

```text
adapter: '37.3'
expansion: '37.4'
expansionConcepts: ['F11']
consolidation: '37.5'
consolidationConcepts: ['F05']
```

This avoids rewriting historical ownership markers each time a new narrow concept is added.

## Safety

Build 37.5 must remain:

- optional;
- ephemeral-only;
- no `localStorage.setItem`;
- no new durable store;
- no Evidence product read;
- no Recovery ownership change;
- no curriculum rewrite;
- no voice changes;
- no `app.js` / `index.html` / `sw.js` / loader change;
- no F12+ rollout hidden in the slice.

## QA contract

The dedicated tribunal must first replay predecessors, then F05:

1. F01–F04 predecessor parity;
2. F11 predecessor parity;
3. F05 VI desktop;
4. F05 DEBUG FR desktop;
5. F05 VI 390×844;
6. F05 DEBUG FR 390×844;
7. storage byte-identical before/after;
8. no horizontal overflow;
9. entry target ≥44 px;
10. return focus to the exact lesson CTA.

A successful mini-check is **not a mastery claim**.
