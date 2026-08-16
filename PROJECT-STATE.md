# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting. Repository reality wins over stale historical wording.

## Last reconciliation

- Reconciled: **2026-08-16**
- Repository: `shinobione/tran-french-teacher`
- Default branch: `main`
- Current deployed `main`: **`f40ea317803a1ab2398b6855340c74977d7cc619`** — PR **#175**, Build 37.3 Foundations Pilot Adapter / Renderer Convergence.
- GitHub Pages deployment on that exact SHA: **SUCCESS**.
- Post-merge main matrix on `f40ea317…`: **33 SUCCESS / 4 inherited failures / 0 queued / 0 in-progress**.
- Visible application runtime metadata: **v2.4.0 · Build 36**.
- Pedagogy baseline: **v2.3.0 · Build 34**.
- Premium V5.10: **CLOSED / physical FIELD PASS**; issue **#114 CLOSED**.
- **Build 35 CLOSED — Memory Evidence v2 / Migration Readiness.**
- **Build 36 CLOSED — Memory Evidence v2 derived-shadow adoption.**
- **Build 37 ACTIVE — Foundations Core.**
- **37.1 MERGED / CERTIFIED** — pure F01–F18 ownership registry.
- **37.2 MERGED / CERTIFIED** — pure generic capsule engine + exact F01–F04 mirror spec.
- **37.3 MERGED / CERTIFIED** — existing F01–F04 learner pilot converged onto the generic engine with strict visual/behavior/storage parity.
- Active implementation slice: **37.4 · F11 Negation narrow learner expansion**.
- Active branch: `build37/f11-negation-capsule`.

## Current durable data contract — LOCKED

| Area | State |
|---|---|
| Curriculum | **52 lessons / 313 items** |
| Recovery durable stores | **7** |
| Backup envelope | **v3** |
| Evidence key | `french-tranquille:memory-evidence:v2` |
| Evidence role | **derived shadow only** |
| Product truth | **original six source stores remain canonical** |
| Product read-path cutover to Evidence | **NONE** |
| Foundations persistence | **NONE / ephemeral only** |

Build 36.3 merged as PR #170 and closed durability/adoption. PR #171 opened Build 37. PR #172 corrected runtime-version ownership only. PR #173 established the F01–F18 registry. PR #174 merged the pure capsule engine/spec. PR #175 then migrated the existing F01–F04 learner pilot onto that engine without changing its learner-facing contract.

## Current main CI baseline

Current deployed `main` `f40ea317…` completed **37 push workflows**:

- **33 SUCCESS**;
- **4 inherited failures**;
- **0 queued**;
- **0 in-progress**.

Inherited failures still present:

1. `Build 36.2 Evidence shadow adoption`;
2. `V2.0.0 Freeze tribunal`;
3. `Build 36.3 Recovery v3 durability tribunal`;
4. `Build 28 Data recovery smoke`.

These failures predate Build 37 and are baseline CI debt, not evidence of a Foundations regression by themselves.

## Build 37.3 certified contract

```text
Build 37.2 engine + exact F01–F04 spec
→ build32 loader loads engine → spec → renderer
→ lessons 8–13 keep the existing optional F01–F04 entry
→ same texts / choices / answers / feedback
→ same VI / DEBUG FR behavior
→ same 0/20/40/60/80/100 progress rhythm
→ same return-to-lesson focus behavior
→ NO durable write
→ NO Evidence product read
```

PR #175 merged at **`f40ea317803a1ab2398b6855340c74977d7cc619`**. Its PR matrix introduced no new failure beyond the inherited four. Two isolated Chrome flakes passed on strict unchanged reruns. Post-merge Build 26.4 later completed successfully, leaving the final 33/4/0/0 main baseline above.

## Build 37.4 candidate scope

37.4 is the first **new** learner-facing Foundations content after the validated F01–F04 pilot.

Selected concept:

```text
F11 — negation
```

Why F11:

- Build 33 classifies it as **PARTIAL / recurrent but fragmented**;
- Trân already sees negative forms in real curriculum chunks;
- the missing piece is one short transferable key, not another vocabulary lesson.

Contextual learner scope:

```text
lessons 17–20 only
→ Je n'ai pas de monnaie.
→ Je ne peux pas.
→ Il n'y a pas d'eau chaude.
→ Mon téléphone ne marche pas.
→ reconnect earlier Je ne comprends pas.
```

Teaching key:

```text
ne / n’ + verb + pas
```

37.4 also explains the `ne → n’` elision and notes that spoken French may omit `ne`, while the full form remains the safe beginner/writing baseline.

Architecture:

```text
same Build 37.2 pure engine
→ add compiled F11 capsule to foundations-capsules.js
→ same Build 37.3 renderer/adapter routes by lesson context
→ F01–F04 stays on lessons 8–13
→ F11 stays on lessons 17–20
→ no new runtime file
→ no sw.js / loader / index change
→ no durable write
```

Dedicated Build 37.4 guard already passed its first branch run on the code candidate:

- generic engine contract PASS;
- existing F01–F04 browser parity PASS;
- F11 VI/FR desktop PASS;
- F11 VI/FR 390×844 PASS;
- storage unchanged;
- protected owners untouched.

Final branch-head guard must pass again after documentation checkpoint before PR opening.

## Protected boundaries

Do not silently change:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
Recovery v3 seven-store ownership
Evidence derived-shadow role
52 / 313 curriculum semantics
Listening / Scenario / Mastery / Learner Intelligence owners
V5.10 field-accepted navigation / visual identities
```

Recognition failure remains recognition-system evidence, never a pronunciation diagnosis.

## NEXT

```text
finish Build 37.4 final branch checkpoint
→ dedicated 37.4 tribunal must remain green on final head
→ open PR
→ classify full PR matrix against the four inherited main failures
→ merge only if there is no new regression
→ certify exact merged main + Pages
→ then choose the next smallest Foundations concept from Build 33 + 37.1 registry
→ do NOT mass-rollout F05–F18
→ do NOT use Evidence as product truth without a separate explicit gate
```

**Build 36 is CLOSED. Do not reopen it without a concrete regression.**