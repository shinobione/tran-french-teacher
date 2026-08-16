# French Trân’quille — CURRENT PROJECT STATE

> **Short volatile handoff. Read this before `MASTER-ROADMAP.md`.**
>
> Always verify current GitHub / CI reality before acting. Repository reality wins over stale historical wording.

## Last reconciliation

- Reconciled: **2026-08-16**.
- Repository: `shinobione/tran-french-teacher`.
- Default branch: `main`.
- Runtime-bearing `main`: **`d4d0436cfc86019de1e5e8a378c97829414b4656`** — PR **#183**, Build **37.7 · F12 Practical Question System**.
- GitHub Pages **#235 / run `31973980389`** on that exact SHA: **SUCCESS**.
- PR #183 matrix closed with **all non-inherited workflows green + exactly the four inherited historical failures**.
- Current PR: **#184 — Build 37.8 · F13 adjective agreement**.
- Current branch: **`build37/f13-adjective-agreement`**.
- Last fully code-bearing candidate tree before this handoff-only commit: **`820f9fb49cbc7bd833323f79750b4065c6c6ee61`**.
- Dedicated Build 37.8 run **`31974879612`** on `820f9fb…`: **SUCCESS complete**.
- Hardened Real Life III run **`31974879487`** on `820f9fb…`: **SUCCESS complete**, including lesson 35.
- Visible application runtime metadata: **v2.4.0 · Build 36**.
- Pedagogy baseline: **v2.3.0 · Build 34**.
- Premium V5.10: **CLOSED / physical FIELD PASS**; issue **#114 CLOSED**.
- **Build 35 CLOSED — Memory Evidence v2 / Migration Readiness.**
- **Build 36 CLOSED — Memory Evidence v2 derived-shadow adoption.**
- **Build 37 ACTIVE — Foundations Core.**

## Build 37 chain

```text
37.1 registry F01–F18                         ✅ MERGED / CERTIFIED
37.2 generic pure capsule engine              ✅ MERGED / CERTIFIED
37.3 F01–F04 pilot adapter parity             ✅ MERGED / CERTIFIED
37.4 F11 negation narrow expansion            ✅ MERGED / CERTIFIED
37.5 F05 subject-pronoun consolidation        ✅ MERGED / CERTIFIED / DEPLOYED
37.6 F08 regular -er present consolidation    ✅ MERGED / CERTIFIED / DEPLOYED
37.7 F12 practical question system            ✅ MERGED / CERTIFIED / DEPLOYED
37.8 F13 adjective agreement                  🚧 PR #184 / CANDIDATE / CODE TRIBUNALS GREEN
```

## Shared Foundations ownership — LOCKED

Ownership is additive; successors must not overwrite predecessors.

```text
37.2 → generic pure capsule engine
37.3 → shared learner-facing adapter / renderer
37.4 → F11 expansion
37.5 → F05 subject-pronoun consolidation
37.6 → F08 regular -er verb-pattern consolidation
37.7 → F12 practical-question systematization
37.8 → F13 adjective-agreement candidate
```

Candidate metadata:

```text
adapter: '37.3'
expansion: '37.4'
expansionConcepts: ['F11']
consolidation: '37.5'
consolidationConcepts: ['F05']
verbPattern: '37.6'
verbPatternConcepts: ['F08']
systematization: '37.7'
systematizationConcepts: ['F12']
agreement: '37.8'
agreementConcepts: ['F13']
```

Candidate routes:

```text
F01–F04 → lessons 8–13
F11     → lessons 17–20
F08     → lessons 32–33
F05     → lessons 34–36
F13     → lesson 40 only
F12     → lessons 41–43
```

## Durable data contract — LOCKED

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

Recognition failure remains recognition-system evidence, never a pronunciation diagnosis.

## Build 37.8 — F13 candidate contract

Build 33 / 37.1 classify F13 as **PARTIAL / later core / teach-core**.

Exact anchors:

```text
lesson 16 → Je suis prête. / Il est français. / Elle est française.
lesson 38 → feminine written forms already noticed: allée / arrivée / rentrée…
lesson 40 → Je suis contente. / inquiète. / stressée. / très fatiguée.
```

Runtime route is deliberately **lesson 40 only**. Lesson 38 is only a prior visual bridge; lesson 39 is administrative and remains outside F13.

Teaching reflex:

```text
Who does the adjective describe?
→ when Trân speaks about herself, use the familiar feminine form
→ common patterns, not a fake universal “just add -e” rule
```

Known examples:

```text
prêt → prête
content → contente
fatigué → fatiguée
stressé → stressée
français → française
inquiet → inquiète
```

Critical boundary: 37.8 does **not** merge adjective agreement with passé-composé / past-participle agreement. Lesson 38 is context only.

37.7 predecessor tests were made successor-safe: lesson 40/44 are asserted **not owned by F12**, rather than required to remain empty forever.

Dedicated 37.8 tribunal certifies:

```text
F01–F04 → F11 → F08 → F05 → F12 → F13
VI / DEBUG FR × desktop / 390×844
39 ≠ F13
40 = F13
41 = F12
32 = F08
34 = F05
localStorage byte-identical
no Evidence product read
no horizontal overflow
touch target ≥44 px
```

## Historical harness hardening inside PR #184

### Build 26.4 Progress / Details

The legacy `Details uses page scroll` Chrome step has now demonstrated the same timeout flake multiple times on unchanged product trees. On both the post-37.7 merge and the first PR #184 matrix, strict unchanged reruns completed **SUCCESS** through the exact previously timed-out step.

Classification: **Chrome harness flake; no product patch**.

### Real Life III

The old `.github/workflows/real-life-3-smoke.yml` used raw headless Chrome commands without shell-level timeouts. On the first PR #184 matrix it became stuck indefinitely in the lesson-35 futur-proche Chrome launch while lesson 20 had already passed. The same workflow had been SUCCESS in about one minute on PR #183.

PR #184 hardens **the harness only**:

```text
same URLs
same virtual-time budgets
same assertions
+ bounded Chrome timeout
+ up to 2 isolated-profile attempts
+ job timeout-minutes: 10
```

No Real Life product/runtime source changed. Hardened run **`31974879487`** on code tree `820f9fb…` completed **SUCCESS**, including lessons 20, 35 and 40.

## F16 decision

F16 remains unresolved and **out of scope for 37.8**.

Its cleanest anchor is:

```text
lesson 45 → à la tête ↔ au ventre
```

But `du / des` collide with already-taught article/partitive meanings and the inspected curriculum lacks an equally clean `aux` scaffold. After 37.8, reassess whether F16 genuinely deserves another narrow slice or whether **Build 37 should close**. Do not implement F16 merely to complete a checklist.

## Current inherited CI debt

The four pre-Build37 failures remain baseline debt unless separately repaired:

1. `Build 36.2 Evidence shadow adoption`;
2. `V2.0.0 Freeze tribunal`;
3. `Build 36.3 Recovery v3 durability tribunal`;
4. `Build 28 Data recovery smoke`.

## Protected boundaries

Do not silently change:

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
manifest / SW PWA identity contract from PR #180
Recovery v3 seven-store ownership
Evidence derived-shadow role
52 / 313 curriculum semantics
Listening / Scenario / Mastery / Learner Intelligence owners
V5.10 field-accepted navigation / visual identities
```

## NEXT

```text
PR #184 is the only active F13 candidate
→ no more product/test code changes unless a concrete final-head regression appears
→ certify final handoff-only head
→ require all non-baseline PR workflows green
→ exactly the four inherited historical failures may remain
→ merge only if no new red survives strict unchanged rerun / diagnosis
→ verify Pages on exact merge SHA
→ reassess F16 versus Build 37 closeout
→ do not start Build 38 inside Build 37
```

**Build 36 is CLOSED. Do not reopen it without a concrete regression.**
