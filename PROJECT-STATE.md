# PROJECT-STATE — French Trân’quille

Last reconciled: 2026-08-19

## Canonical checkpoint

- Repository: `shinobione/tran-french-teacher`.
- Accepted product state remains the Build42.2 F16 learner-facing teach-core merge **`8b462fae236c00b902a9312fe8e1b103412b8694`**.
- Accepted docs closeout before this candidate: **`79992e6acfce4d0913ae84838f93f47abc77c8c7`**.
- Public runtime metadata remains **v2.5.0 · Build 38**.
- Pedagogy baseline remains **v2.3.0 · Build 34**.
- Current candidate: **PR #232 — `Docs · audit Build 42 milestone closure`**, branch `docs/build42-milestone-closure-audit`.
- Candidate verdict: **CLOSE Build42** as successful F16 Foundations debt resolution.
- Live PR/GitHub is authoritative for the exact candidate head; this document intentionally avoids self-referential head-SHA chasing.
- Candidate scope is exactly four files: `MASTER-ROADMAP.md`, `PROJECT-STATE.md`, `docs/BUILD-42-MILESTONE-CLOSURE-AUDIT.md`, and `.github/workflows/build42-2-foundations-f16-contractions.yml`.
- The sole workflow change makes only the historical 42.2 *slice scope* guard branch-specific; F16 syntax/contract/predecessor/browser evidence still runs on successor PRs.
- Build26.1 produced one headless-Chrome timeout on the first #232 head; rerun of the exact same job unchanged returned **SUCCESS**, so it is classified as a runner/browser flake and no product code was changed.
- Push-triggered GitHub Pages for the Build42.2 product SHA was not independently proven through the available connector; do not infer deployment from merge alone.

## Accepted product state

```text
Public runtime metadata v2.5.0 · Build 38
Pedagogy baseline       v2.3.0 · Build 34
Curriculum              52 lessons / 313 items
Scenario                44 situations / 132 turns
Listening               17 contrast families / 18 contextual dialogues
Listening speed         0.88 normal / 0.65 slow
Speaking Loop           52/52 · max 2 moments / lesson
Recovery                7 durable stores / backup v3
Evidence v2             derived shadow only
Original six stores     product truth
Premium V5.10           CLOSED / physical field pass
```

## Historical learner continuity — LOCKED

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

No future work may reset, renumber or reinterpret this state.

## Milestone state — candidate decision

```text
Build38   CLOSED / RELEASED
Build39   CLOSED / CERTIFIED
Build40   CLOSED — A1 Productive Consolidation selected
Build41   CLOSED / SUCCESSFUL NARROW CONSOLIDATION
Build42.1 CLOSED / AUDITED
Build42.2 CLOSED / MERGED / EXACT-HEAD CI-CERTIFIED
Build42   CLOSURE CANDIDATE — recommendation: CLOSE
Build42.3 NOT AUTHORIZED
F16 Transfer NOT AUTHORIZED
A2        NOT AUTHORIZED
```

## Build42 closure rationale

Build42 existed to resolve the explicit F16 structural Foundations debt identified by Build40.

Build42.1 established:

- F16 is the mechanical contraction system after `à` or `de` + definite article is already intended;
- enough real learner material exists to justify coherent teaching;
- lesson38 is the earliest clean placement;
- lesson22 `Du pain / Du lait / Des œufs` are partitives and must not be misclassified as contraction ownership;
- no clean learner-facing `aux` item and no clean contraction-`des` pair exist, so productive F16 Transfer is not justified.

Build42.2 implemented the accepted teaching obligation through the existing Foundations owner:

```text
à + le   → au
à + les  → aux
de + le  → du
de + les → des

à la / à l’ / de la / de l’ remain uncontracted
```

The learner-facing capsule is lesson38-only, optional, deterministic, ephemeral-only and `masteryClaim=false`. It labels `aux` and contraction-`des` as teaching recombinations rather than prior learner mastery and keeps partitive `du/des` separate.

Therefore no remaining implementation is independently justified inside the Build42 mission.

## Productive F16 Transfer gate — STILL CLOSED

Still insufficient:

- no clean learner-facing `aux` contraction source item;
- no equally clean learner-facing contraction-`des` source pair;
- no trustworthy durable Foundation/Transfer construction evidence owner.

Therefore:

```text
productive F16 Transfer    NOT AUTHORIZED
durable Foundation mastery NOT CLAIMED
Build42.3                   NOT AUTHORIZED
```

## Evidence gate

Reliable LI3 families remain:

```text
phrase-retrieval
listening
scenario
```

Still unavailable as trustworthy durable intelligence evidence:

```text
concept-review
foundation-capsule
transfer-construction
```

Closing Build42 does not alter this boundary.

## CI baseline

Known persistent inherited failures:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Build26.4 remains a classified runner/harness flake, not standing debt. Any other failure is NEW until classified.

### #232 CI maintenance classification

The first #232 head exposed two reds beyond baseline:

- Build26.1 Voice replay: Chrome timed out after static/wiring/sanctuary checks passed; unchanged rerun returned SUCCESS → runner/browser flake, no product mutation.
- Build42.2 F16: all F16 contract/product checks passed; only the historical slice-scope guard rejected the new Build42 milestone audit document. The guard is now branch-scoped to the original `build42/f16-teach-core` slice. F16 unit/browser tribunals continue to run on successor PRs.

This is CI successor-safety maintenance, not a runtime/pedagogy change.

## NEXT if PR #232 is accepted

Follow the remaining Build40 sequence without inventing an implementation number:

```text
P3 — evidence-owner design audit — READ-ONLY
→ inventory actual observable success / miss / assistance events from Foundation and Transfer/productive activities
→ decide whether a trustworthy owner/event model is justified
→ no persistence-first architecture
→ no Build43 implementation number until the audit proves one

then

P4 — fresh A1 readiness audit
→ reconsider A2 only from the new productive/evidence reality
```

Until #232 is accepted:

- do not start the P3 audit;
- do not implement productive F16 Transfer;
- do not claim durable Foundation mastery;
- do not start A2;
- do not add a durable store merely to make intelligence look smarter.
