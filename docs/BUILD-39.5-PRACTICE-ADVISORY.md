# Build 39.5 — LI3 Practice Advisory

Status: **IMPLEMENTATION CANDIDATE**

## Mission

Expose the first learner-facing Learner Intelligence 3 signal without giving LI3 control of navigation or learner actions.

Existing Build27 Practice choices remain the owner of routes and interaction:

```text
Parler
Écouter
Réviser
Dans la vraie vie
```

39.5 only owns which, if any, receives the already-existing learner-facing badge:

```text
Gợi ý lúc này / Conseillé maintenant
```

## Runtime flow

```text
learner explicitly opens Pratiquer
        ↓
Build27 creates its historical Practice overlay
        ↓
39.5 decorator observes that overlay
        ↓
39.4 runtime snapshot decide()
        ↓
reliable LI3 family mapped to an existing Practice action
        ↓
at most one advisory badge
        ↓
learner still chooses and clicks manually
```

No decision is made at app boot by 39.5.

## Mapping

```text
phrase-retrieval → review
listening        → listening
scenario         → real-life
null / abstain   → no advisory
unsupported      → no advisory
```

There is deliberately no `Parler` mapping. LI3 currently has no reliable conversation/free-voice need family.

If LI3 selects an action that is not currently available in the Practice overlay, 39.5 shows no fallback recommendation.

## Ownership strategy

New owner:

```text
src/pedagogy/learner-action-practice-advisory.js
FrenchTranquilleLearnerActionPracticeAdvisory
```

The module loads after the certified 39.4 runtime snapshot collector. It does **not** modify `src/ui/build27-app-shell.js`; the field-approved Build27 route handlers, labels, controls and geometry remain byte-identical.

The legacy Build27 heuristic badge is removed from the just-created Practice overlay and replaced, in the same DOM turn before learner interaction, by the LI3 advisory. When LI3 abstains, no badge remains.

## No-go boundaries

- no auto-navigation;
- no auto-click / auto-start;
- no change to Build27 route ownership;
- no Daily Coach rewrite;
- no direct localStorage/sessionStorage/IndexedDB access in 39.5;
- no durable write/new store/schema/migration;
- no Evidence v2 product read-path cutover;
- no concept/Foundation/Transfer evidence invention;
- no recognition-only recommendation;
- no fake conversation recommendation on abstention;
- no public runtime metadata bump;
- no learner-data reset or reinterpretation.

## Dedicated proof

Unit tribunal verifies the narrow family→Practice mapping and explicit null handling.

Real browser tribunal boots the actual application with the locked historical profile and requires:

```text
retrieval evidence   → only Réviser advised
listening evidence   → only Écouter advised
scenario evidence    → only Dans la vraie vie advised
recognition-only     → no advisory
empty evidence       → no advisory

opening Practice     → no automatic route
manual Réviser click → historical route still works
seven durable stores → byte-identical while only advice is rendered
historical learner   → 7 completed / l8=4 / 40 known preserved
Practice buttons     → existing touch geometry preserved
horizontal overflow  → none
```

The browser matrix covers VI and DEBUG FR at desktop and iPhone-sized viewports.

## Public release metadata

Unchanged:

```text
v2.5.0 · Build 38
```

Build39.5 remains an internal roadmap checkpoint until a separately authorized public release decision.
