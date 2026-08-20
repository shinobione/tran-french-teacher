# Build 42 — Milestone Closure Audit

Status: **CLOSED / ACCEPTED**

Audit date: 2026-08-19  
Accepted: 2026-08-20

Accepted closure evidence:

```text
PR                    #232 — Docs · audit Build 42 milestone closure
accepted head         5fd9a19cc2f601186decd7fe9e100ab4b62cc89a
squash merge          8c2787d203d6089850856652f288f10a4fd53b32
Build42.2 workflow    run 32298213215 — SUCCESS
Premium V5 Coherence  first Chrome failure → unchanged rerun job 96347081676 — SUCCESS
final exact-head CI   exactly five inherited failures, no new red
```

The closeout changes no runtime, curriculum, learner data, Foundation implementation, Transfer implementation, Recovery, Evidence, voice, Premium, PWA or public version metadata. The only non-Markdown change carried by #232 is CI successor-safety maintenance in the historical Build42.2 workflow: its slice-specific allowlist now runs only on the original `build42/f16-teach-core` branch, while all F16 contract/browser tests continue to run on successor PRs.

## 1. Question

Build42 was opened to resolve the explicit F16 Foundations debt identified by Build40:

```text
F16 — à / de contractions
classification before Build42: partial-distributed / teach-core / later-core
```

The closure question was deliberately narrow:

> Did Build42.1 + Build42.2 resolve the authorized F16 **teaching debt** well enough to close the milestone without inventing a Build42.3?

This is not the same question as whether F16 has durable mastery evidence or whether productive F16 Transfer is ready.

## 2. Evidence reviewed

Canonical sources:

```text
docs/BUILD-40-A1-CONSOLIDATION-AUDIT.md
docs/BUILD-42.1-F16-SOURCE-PLACEMENT-AUDIT.md
docs/BUILD-42.2-F16-TEACH-CORE.md
PROJECT-STATE.md
MASTER-ROADMAP.md
```

Accepted Build42.2 product merge:

```text
8b462fae236c00b902a9312fe8e1b103412b8694
```

Public runtime metadata remains:

```text
v2.5.0 · Build 38
```

Pedagogy baseline remains:

```text
v2.3.0 · Build 34
```

## 3. What Build42.1 established

### Teaching readiness — YES

The audit found enough real learner-facing anchors to justify one coherent Foundation capsule:

```text
lesson 3   Je viens du Vietnam.
lesson 13  J'ai mal à la tête.
lesson 24  Je rentre à la maison.
lesson 38  Je suis allée au restaurant.
lesson 38  Je suis rentrée à la maison.
lesson 45  J'ai mal à la tête.
lesson 45  J'ai mal au ventre.
```

Lesson38 was accepted as the earliest clean placement because it provides a same-lesson `au restaurant` / `à la maison` contrast after article/gender foundations and after lesson22 partitives have already been taught.

### Productive Transfer readiness — NO

Build42.1 explicitly found:

- no clean learner-facing `aux` contraction source item;
- no equally clean learner-facing contraction-`des` source pair;
- surface `du/des` in lesson22 belongs to partitive teaching and must not be misclassified as contraction mastery.

That boundary was accepted before implementation.

## 4. What Build42.2 delivered

Build42.2 implemented exactly the authorized teaching slice at lesson38 using the existing Foundations infrastructure.

Accepted mechanical system:

```text
à + le   → au
à + les  → aux
de + le  → du
de + les → des

à la / à l’ / de la / de l’ remain uncontracted
```

F16 owns only the **mechanical contraction after `à` or `de` + definite article is already intended**. It does not choose lexical prepositions.

Real anchors and teaching recombinations remain visibly distinct:

```text
real learner anchors     au restaurant / à la maison / du Vietnam
teaching recombinations  à + les → aux / de + les → des
```

The anti-confusion contract is explicit:

```text
lesson22 Du pain. / Du lait. / Des œufs.
= partitive article territory
≠ proof of de + le / de + les contraction mastery
```

Build42.2 remains:

```text
optional          true
persistence       ephemeral-only
masteryClaim      false
new durable store none
curriculum change none
productive Transfer none
```

## 5. Debt resolution matrix

| Question | Before Build42 | After 42.1 + 42.2 | Closure verdict |
|---|---|---|---|
| Is F16 explicitly defined? | partial/distributed | complete accepted mechanical table | resolved |
| Is placement known? | deferred | lesson38 accepted | resolved |
| Is learner-facing teaching present? | no coherent owner | optional lesson38 capsule | resolved |
| Are partitives confused with contractions? | structural risk | explicit anti-confusion teaching + tests | resolved |
| Is new UI required? | unknown | existing Foundation engine reused | resolved |
| Is learner data changed? | must not be | no durable writes | preserved |
| Is F16 mastery durably evidenced? | no | still no | intentionally unresolved outside Build42 scope |
| Is productive F16 Transfer justified? | no | still no | intentionally blocked outside Build42 scope |

## 6. Closure decision

### Build42 is CLOSED.

The authorized milestone objective was **F16 Foundations debt resolution**, not construction-evidence architecture and not broad F16 Transfer.

That objective is satisfied:

```text
42.1 source + placement audit
→ coherent teaching justified

42.2 learner-facing teach-core
→ complete mechanical system taught
→ correct provenance labels
→ partitive boundary protected
→ existing Foundation infrastructure reused
→ exact-head CI-certified
```

Keeping Build42 open solely because durable mastery or productive Transfer is still unavailable would blur milestone ownership. Those are separate evidence/readiness problems already governed by Build39/Build40 constraints.

Accepted state:

```text
Build42      CLOSED / SUCCESSFUL FOUNDATIONS DEBT RESOLUTION
Build42.3    NOT AUTHORIZED
F16 Transfer NOT AUTHORIZED
A2           NOT AUTHORIZED
```

## 7. CI classification at acceptance

The final accepted #232 head was `5fd9a19cc2f601186decd7fe9e100ab4b62cc89a`.

- Build42.2 dedicated workflow `32298213215` completed **SUCCESS**.
- Build26.1 had previously timed out in Chrome on an earlier #232 head; exact unchanged rerun passed, so no product patch was made.
- Premium V5 Coherence initially failed only in Chrome on `original-practice:practice-underlay-not-restored`; the exact same job was rerun unchanged and job `96347081676` completed **SUCCESS**, including field-defect Chrome, reduced-motion and visual capture steps.
- No review submission or unresolved review thread blocked #232.
- Final exact-head matrix returned to the known baseline only:

```text
French Trân'quille quality                    inherited failure
Build 36.2 Evidence shadow adoption           inherited failure
V2.0.0 Freeze tribunal                        inherited failure
Build 36.3 Recovery v3 durability tribunal    inherited failure
Build 28 Data recovery smoke                  inherited failure
```

No additional failure remained after classification.

## 8. Why there is no Build42.3

No independently justified F16 implementation slice remains inside the Build42 mission.

A Build42.3 that adds more examples, another UI surface, a durable Foundation store or a Transfer family merely to make the milestone look more complete would violate the accepted evidence boundary.

Future F16 Transfer can only be reconsidered after a **fresh source/readiness audit** demonstrates new learner-facing source ownership and trustworthy construction evidence. Build42.2 itself does not create that evidence.

## 9. Post-Build42 roadmap decision

Build40 defined the order:

```text
P1 productive-family audit
P2 F16 à/de contractions audit
P3 evidence-owner design only after productive events exist
P4 re-run A1 readiness before A2
```

P1 is complete through Build41 and widened learner-facing deterministic Transfer from five Build38 families to six total.

P2 is complete through Build42.1 + Build42.2.

The next justified work is therefore **P3 — evidence-owner design audit**, not another F16 implementation and not A2.

The P3 audit must inspect the actual observable success/miss/assistance events emitted by current Productive/Transfer/Foundation activities and decide whether a minimal trustworthy evidence owner is justified.

Constraints:

- audit first, no persistence-first architecture;
- do not infer concept mastery from lesson completion or Foundation opening;
- do not infer transfer mastery from ephemeral UI success unless an explicit trustworthy owner exists;
- reuse existing Memory/Error/Evidence boundaries where possible;
- no new durable store merely to manufacture intelligence;
- do not number or authorize a Build43 implementation until the audit proves a real owner/event model.

Immediate post-Build42 state:

```text
NEXT
→ P3 evidence-owner design audit
→ read-only / architecture + source ownership decision first

Build43 implementation  NOT AUTHORIZED
A2                      NOT AUTHORIZED
```

## 10. Final verdict

```text
Build42.1  CLOSED / AUDITED
Build42.2  CLOSED / MERGED / EXACT-HEAD CI-CERTIFIED
Build42    CLOSED / SUCCESSFUL FOUNDATIONS DEBT RESOLUTION
Build42.3  NOT AUTHORIZED
F16 Transfer NOT AUTHORIZED
A2         NOT AUTHORIZED

NEXT
P3 evidence-owner design audit
```

This closure keeps the project honest: F16 is now taught coherently, but neither mastery nor Transfer is claimed without evidence.
