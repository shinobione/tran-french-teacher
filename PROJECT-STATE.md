# PROJECT-STATE — French Trân’quille

## V6.1 Review9 — compact 320/375px Home density candidate, 2026-10-11

- **Current visual candidate:** PR #258 HEAD `51d029895dc22a599b109f8c6fcb608e16a9811c` (CSS-only follow-up; not merged/deployed). Reduced header/welcome gaps and lesson-card min-height to 284px **only when width <=375px and height <=700px**; primary lesson CTA remains the same real button, no data changes, no route crossfade or art replacement. Purpose: increase first-viewport discoverability of the primary lesson at compact viewport size, after Review8 showed it below the fixed tabbar but available after scroll.
- **Evidence status:** previous source HEAD `8b281a4a623b07b8128a829572672a2a7bad1fcc` passed 23/23 real Chrome captures in run `38098536760`. The **new compact CSS head has NOT yet passed the dedicated visual capture** (run `38098855013` queued at checkpoint). Build29 iPhone Chrome/PWA and strict V6.1 successor tests already PASS on the CSS candidate; final visual screenshot review and full CI verdict are still required.
- **Remaining gates:** compare actual compact screenshots before/after without falsifying acceptance, confirm 320/375 primary-CTA scroll/hit, keep locked Practice states and 52-lesson real progress, then collect installed iPhone Safari/PWA verdict and approved Stitch reference comparison. Independent Draft #265 has integrated Recovery/Evidence/Build28 Chrome tribunals PASS; no merge authorized.
- **NEXT:** inspect exact-head run `38098855013`; if red, isolate the failing geometry, not broad style resets. No publication, no learner-data reset.

---

## V6.1 mobile Review8 — 2026-10-11 (23 real Chrome screenshots PASS; no release)

- **Accepted main unchanged:** `d0b57a96779c643643c77974cab8086f7f4c311a`; this work remains solely in **Draft PR #258**. No runtime release, merge, learner migration, voice or data-store change.
- **Last tested source head:** `8b281a4a623b07b8128a829572672a2a7bad1fcc`. Exact-head [V6.1 live visual workflow `38098536760`](https://github.com/shinobione/tran-french-teacher/actions/runs/38098536760) **SUCCESS** (13 successful steps), 23 screenshots downloaded and visually inspected; archived artifact `v61-live-visual-review`.
- **Visual probes:** 4 themes Home/Practice at 390×844; Aurora 430×932; scrolled Practice (Aurora/Jade), scrolled Home quick Conversation (all themes at 390 + Aurora 430), Aurora Home/Practice at 320×568, Aurora Home-bottom/Practice at simulated 125% root font sizing, **primary lesson CTA after scroll** at 320×568 Aurora and 375×667 Original. Home quick and lesson CTAs satisfy measured hit target / navigation clearance; 320 first-viewport hero CTA requires scrolling, but is reachable/tappable once scrolled. This is not a physical iOS Dynamic Type test.
- **Product/PWA verification on tested source:** Build29 iPhone Chrome/PWA `38098536522`, strict V6.1 successor ownership `38098536708`, practice advisory `38098536763`, and F11 `38098536718` PASS. Complete CI `60 PASS / 8 FAIL` (68 checks); older Recovery/Evidence/Build28 red on this independent visual branch are already **jointly green** in separate Draft integration PR #265 (59/62); others V2 Freeze, Quality, P3b plus Premium V5.3 and V5 Coherence captures remain unadjudicated. Do not portray the visual PR as fully CI-green.
- **NEXT:** preserve current screenshot source and review approved Stitch references; examine original 320 Home first-viewport CTA below fixed nav as a visual/scroll affordance issue, not a lost-action bug. Obtain human mockup acceptance and **real installed iPhone Safari/PWA** on four themes, Voice/Listening/Review and offline backup. No release until merge decision and minimum `main` check protection.

---

## V6.1 mobile review6 — 2026-10-11 (candidate; Chrome verdict pending)

- Accepted main stays `d0b57a96779c643643c77974cab8086f7f4c311a`; V6.1 PR #258 is DRAFT, not merged, not deployed. Canonical current plan lives in `MASTER-ROADMAP.md` on Draft integration #265; that branch's all-three Recovery/Evidence/Build28 tests PASS together (59/62 CI; V2 Freeze, Quality, P3b remain red).
- **This slice:** V6.1-only shared CSS increases mobile Home quick-card captions and Practice descriptions from 0.65–0.70rem to 0.76rem; lifts muted locked-title contrast without enabling any locked action. No theme art, product JS, curriculum, data store or Service Worker touched.
- **Actual Chrome proof added:** `home-bottom` screenshot mode checks scroll/reachability of the existing `v61-quick-conversation` native action and bottom Home tab hit target. Dedicated V6.1 workflow captures this for Original/Aurora/Sunset/Jade at 390×844 and Aurora at 430×932. Practice screenshots now enforce at least 12 CSS px caption text and retained locked CTA, in addition to existing four-owner and bottom-row hit tests. An accidentally duplicated HTML tail after the capture fixture's closing `</html>` was removed; no runtime changes.
- **NEXT (strict):** inspect exact-head V6.1 live-visual Chrome result and all 17 screenshots, adjust only concrete regressions; compare against approved Stitch references, request real installed-iPhone Safari/PWA acceptance (including larger text), maintain all safety checks and keep PR Draft. Human/device approval still missing.

---

Last reconciled (live): 2026-10-10 — V6.1 rebased against CI governance merge `d0b57a96779c643643c77974cab8086f7f4c311a` (Draft, no product acceptance).

## V6.1 new governance CI follow-up — 2026-10-10

- Merge baseline after #260: `d0b57a96779c643643c77974cab8086f7f4c311a`. Branch integration commit `d4716ee3731894781a5fe08378e8e462357ed5d7` passed strict `v61-pwa-successor-ownership`, but the `ci-governance` check initially failed because the **two V6.1-added workflows** were not included in the original 84-workflow concurrency migration.
- **Single scoped fix:** add the exact adopted PR-only concurrency block to `v61-live-visual-review.yml` and `v61-pwa-successor-ownership.yml`; preserve their triggers, all Chrome visual capture steps, and exact PWA attestation. No runtime, pedagogy, voice, data or app modifications.
- **NEXT:** confirm new exact-head `ci-governance` PASS, plus original V6.1 visual/iPhone PWA checks. Other red tests require separate adjudication. No V6.1 merge or physical iPhone PASS.

---

## V6.1 review resumed after CI governance #260 — 2026-10-10

- **Merged** governance PR #260 at `d0b57a96779c643643c77974cab8086f7f4c311a` (infrastructure-only; no app/product change). PR #258 remains DRAFT. This branch adopts the new `concurrency` and PR path-routing policy and retains the exact successor-safe V6.1 Chrome/PWA workflow changes.
- **Candidate only:** No V6.1 merge, deployment or physical installed-iPhone PASS. Latest verified pre-rebase #258 CI: 69/86 PASS; 17 FAIL including six inherited classes. New merged-head CI verdict is PENDING.
- **NEXT:** audit exact-head browser, PWA/offline and 21 scoped workflow expectations; reconcile V6.1 governance test if needed without waiving owner protections, then handle remaining substantive blockers in independent slices. Physical iPhone validation must be performed by the human owner.

---

## CI governance — Issue #259 / 2026-10-10 (candidate only)

- **Accepted main:** `6b08edda98bd09520ed83c49682ebd2443202a23`; the public runtime remains unchanged by this candidate.
- **Active visual PR #258:** DRAFT, last confirmed commit `724a52d18aef01952ee822178db8a4255ebcac1c`, 86 completed checks (69 PASS / 17 FAIL). F08, iPhone PWA/offline, V6.1 visual and strict successor proof PASS. Not merged, not field-certified.
- **Separate governance proposal:** issue #259. Phase 1 adds per-workflow/per-PR `concurrency` to all 84 PR-triggered workflows. Distinct non-PR `run_id` groups avoid canceling push, release, manual or Pages runs. All four legacy push-only workflows and the existing Pages deployment policy remain byte-identical.
- **Phase 2 safe pilot:** two Premium workflows omit only expensive screenshot capture/upload on docs-only PRs (all functional Chrome tests remain); **21 additional specialized Build37/38/41/42 workflows** now have a narrow PR path selector for pedagogy, relevant unit/browser tests, Recovery/Evidence cores and each workflow's own YAML. All existing job names, steps and non-PR triggers stay intact. A pure UI/Premium edit no longer fans out to these 21 specialists.
- **Required checks resolved by owner's GitHub Settings screenshots (2026-10-10):** no classic branch protection rules and no repository Rulesets exist; therefore neither mechanism currently requires any CI job for merging. The GitHub admin API is still 403 to this integration. This removes the pending-required-check concern for the scoped 21, but **also means `main` is not protected by those mechanisms**: configure an always-running minimal safety gate before relying on automatic merges.
- **NEXT:** validate exact-head governance CI for 21 path-scoped specialists, check that core PWA/Recovery/Voice/safety always trigger, measure the check-count reduction on the NEXT purely visual PR (expect up to 21 fewer, not on this governance PR which touches those workflow YAMLs), then establish minimum GitHub `main` protection/always-present required gates before any merge. Both #258 and #260 remain DRAFT. No deployment.

---

## V6.1 Foundations F08 strict index successor — 2026-10-10 (PR #258)

- **Last verified exact head:** `f45a57c0ea5c1a048ff6a57d0079d7a26dfa1858` (commit F11). **69/86 PASS, 17 FAIL**; `foundations-f11-negation`, `iphone-pwa-a11y`, `v61-pwa-successor-ownership`, `v61-live-visual` and `practice-advisory` all PASS on GitHub CI. iPhone result is Chrome/PWA simulation only, **not physical field PASS**.
- **Observed F08 failure:** `foundations-f08-regular-er` on job `114206663660`, failure at **Product, storage, voice and curriculum owners stay untouched** because the only forbidden path output is `index.html`; F08 unit/contract and static steps **PASS**, the four Chrome parity stages were skipped.
- **One bounded change:** adapt only `.github/workflows/build37-6-foundations-regular-er.yml` to accept exactly the `index.html` successor when `tools/test-v61-pwa-successor.cjs` passes. The original forbidden regex, incl. `manifest.webmanifest`, remains; any other forbidden path still fails, alone or together.
- **Next action:** inspect new exact-head `foundations-f08-regular-er` job through F01–F04, F11, F05 and F08 browser parity (VI/FR desktop and 390×844). If a real Chrome failure occurs, diagnose rather than waive. PR stays DRAFT, no merge/deploy, main `6b08edda98bd09520ed83c49682ebd2443202a23` unchanged.

---

## V6.1 Foundations F11 protected-owner successor — 2026-10-10 (PR #258)

- **Verified before this commit:** accepted main `6b08edda98bd09520ed83c49682ebd2443202a23`, exact PR head `aeaa6edb695631db952fb877d41182f71b92ffc7`, **68 PASS / 18 FAIL / 86 complete**. `iphone-pwa-a11y` passed every step, including Chrome accessibility at 320/390/430/reduced-motion **and same-browser CDP offline PWA boot**. This is CI, not physical installed-iPhone PASS.
- **Next narrow slice:** `.github/workflows/build37-4-foundations-negation.yml` protected-owner guard. Logs showed only `index.html` in the forbidden diff; allow it **only if** the existing independently green `tools/test-v61-pwa-successor.cjs` proves the exact successor. Fail closed for any other forbidden path or any additional forbidden path combined with `index.html`.
- **Preserved:** F11 syntax/pure engine, Foundations predecessor parity, storage side-effect restrictions, real app Chrome routing, F01–F04 Chrome, F11 VI/FR desktop and 390×844 Chrome tests. No teaching, app, Recovery, Memory, voice, asset or learner-data edits.
- **NEXT exact action:** review the new exact-head `foundations-f11-negation` job through its real Chrome F11 parity step; if red, diagnose rather than waiving assertions. Other Foundations workflows and inherited main failures remain out of scope. PR #258 stays DRAFT, no merge, release or real-iPhone PASS.

---

## V6.1 Build29 iPhone PWA CI successor — 2026-10-10 (active)

- **Accepted `main`:** `6b08edda98bd09520ed83c49682ebd2443202a23`. Last fully verified candidate `a4fc2eea1705209d8550255b7d48559fef2c6280`: **67/86 PASS, 19 FAIL**; the strict V6.1 PWA proof, three Premium predecessor workflows, live Chrome V6.1 and Practice advisory passed.
- **One bounded CI change:** allow Build29's old cache check to accept the unchanged V5.8 literal **or** demand a positive `tools/test-v61-pwa-successor.cjs` proof. Full checkout history is required to attest Git-object hashes against accepted main.
- **Preserved unchanged:** original iPhone PWA HTML/manifest tests, data/voice/asset sanctuaries, Chrome matrix (320×568 / 390×844 / 430×932 and reduced motion), and Chrome DevTools protocol offline boot.
- **NEXT:** inspect the new exact-head `iphone-pwa-a11y` verdict, including its real mobile Chrome and offline steps. If it fails, diagnose the precise runtime assertion; do not waive it. No further CI phase in this slice. PR #258 stays Draft, no merge, no deployment, no real-iPhone PASS.

---

## V6.1 successor-safe PWA pilot — 2026-10-10

- **Confirmed:** `practice-advisory` and `v61-live-visual` PASSED on commit `c49c045cc75eb7044333e43a35bc55f6fa331f09`. No physical iPhone PASS.
- **Pilot Git binary-check correction:** positive exact source comparison now passes, but `git show` of the original large `assets/LOGO.png` overflowed Node child_process default maxBuffer (`ENOBUFS`). Hash-based verification with `git hash-object` / `git rev-parse BASE:path` replaces only this binary comparison. No app, asset, or test expectation relaxations. Exact-head CI pending.
- **Pilot attestation correction:** the exact-source proof on `06f9a4e0` rejected `sw.js` because its expected-string constructor introduced one duplicate newline after the two added V6.1 entries. Three Premium jobs inherited the same negative gate. Narrow repair removes only the spurious expected newline; **not a product-code or frozen-workflow rule change**. Exact-head result pending.
- **Current pilot:** new strict attestation of *exact* successor deltas in `index.html`, `sw.js`, and Build32 loader, pinned against main `6b08edda98bd09520ed83c49682ebd2443202a23`. The original SW offline CORE is preserved and new CSS/JS are precached; storage, voice, curriculum, Recovery, Evidence and Premium art are protected.
- Three predecessor workflows receive a **conditional positive successor proof**, not a skip: `v59d-brand`, `mockup-fidelity-reset`, `theme-art-integration`.
- **NEXT:** inspect exact-head PWA successor proof and all three unchanged downstream Chrome tribunals. If green, adjudicate the 13 remaining non-inherited governance failures in another bounded slice. PR #258 remains Draft, no merge/deployment.

---

## V6.1 CI triage checkpoint — 2026-10-10 (current moving PR #258)

- Accepted main: `6b08edda98bd09520ed83c49682ebd2443202a23`; **no V6.1 merge, release, Pages deployment or physical iPhone PASS**.
- Candidate analyzed: `6d8a1d93b3b4eb47b6ed5237f246c61a57aefb13` — `85` PR checks: `62` PASS / `23` FAIL. Comparison main: `45` checked: `38` PASS / `7` FAIL; `6` red checks overlap exactly, while `build26-1-ux` passed in candidate.
- Classified 23 failures: `6` inherited, `9` protected-owner guard blocks, `7` old cache/version/predecessor wiring blocks, and `1` real newly observed Practice DOM geometry problem. See `docs/V61_CI_ARBITRATION_2026-10-10.md` for complete per-job evidence.
- Narrow repair: V6.1 real-life recommendation CTA receives its own CSS class; it retains the existing `data-b27-practice-action="real-life"` route, and the Practice live test now checks exactly four canonical buttons.
- **Current PR:** `#258` DRAFT; exact moving head delegated to GitHub. This is a source candidate, **not** an accepted CI verdict yet.
- **NEXT:** review exact-head `practice-advisory` browser run to validate repair; review new V6.1 live visual/12 captures; then design a separately reviewed successor-safe PWA/CI gate for historical `index.html` / `sw.js` protections. Do not bulk-edit predecessor tests, do not merge without CI adjudication, and do not claim iPhone field PASS.

---

## Live checkpoint — 2026-10-10 (supersedes the archived August 25 checkpoint)

- **Verified main:** `6b08edda98bd09520ed83c49682ebd2443202a23` (PR #257, Foundations premature NEXT fix, merged 2026-09-02). This PR's branch is **not merged**, main/public app are unchanged by V6.1.
- **PR #254 A2-R1 Listening pilot:** MERGED 2026-08-25 (not open); first doctor multi-fact learner flow deployed. Real iPhone/PWA pilot field certification remains **unverified**, not PASS.
- **PR #255:** MERGED. **PR #256:** outdated OPEN/DRAFT; **PR #257:** MERGED.
- **Pages:** deployment #324 SUCCESS on `6b08edda98bd09520ed83c49682ebd2443202a23` (historical deployment, unrelated to this V6.1 proposal).
- **CI on accepted main:** 45 checks, 38 success / 7 failure (five inherited: data-recovery, v2-freeze, recovery-v3-tribunal, evidence-shadow-adoption, quality; two need investigation: p3b-observation-runtime and build26-1-ux). Do not conflate this with the V6.1 PR's checks.
- **Active proposal:** `design/v61-stitch-high-fidelity-home-practice` — V6.1 high-fidelity Stitch-inspired **Home + Practice** visual candidate, under human/Chrome/iPhone QA gate. Uses true lesson and scenario content. No merge, no release, no physical-field PASS.
- **Preserved:** four LOCKED theme backgrounds and lesson Eiffel art, canonical 3D Practice assets, real Vietnamese first / DEBUG FR, 52-lesson curriculum, voice, Memory, Recovery and learner data.
- **Next exact action:** inspect V6.1 PR diff and 390×844/430×932 Chrome screenshots across four themes; validate clickable lesson/Practice navigation, no visual collisions/overflow, accessibility, slow/offline cache behavior; fix only evidence-backed findings. After PR acceptance/merge/deployment, request physical installed-iPhone field PASS. Then design a separate learner quiz slice.

---


## Archived checkpoint — 2026-08-25 (superseded)

- Repository: `shinobione/tran-french-teacher`.
- Verified accepted `main`: **`acae4dac142404dda394501e952e44e6dc846129`**.
- That commit is the squash merge of PR **#255 — `CI · make historical Listening ownership successor-safe`**.
- PR #255 is **CLOSED / MERGED** and removed only obsolete permanent Listening-owner locks from certified predecessor workflows while preserving their functional tribunals.
- Active learner-runtime candidate: PR **#254 — `A2-R1 · integrate doctor multi-fact Listening pilot`**.
- #254 was rebased exactly onto accepted main `acae4dac142404dda394501e952e44e6dc846129`; the rebase candidate commit was **`73d56bafc148f705e472e6c01c8ffa9f81f46a5e`**.
- On that exact rebased candidate, dedicated workflow **`A2-R1 Learner Listening pilot`** run **`32829801561`** passed syntax, deterministic contract, sanctuary/scope, and the real 390×844 Chrome learner-flow tribunal.
- The Chrome tribunal uses a Recovery-valid schema-v2 clean learner seed; the earlier false failures were caused by a test harness writing an invalid `{ knownItems }`-only learner object that Recovery correctly rejected.
- #254 remains **OPEN / NOT ACCEPTED** until the final exact-head full matrix and review arbitration are complete.
- This checkpoint commit advances the PR head beyond `73d56baf...`; GitHub live metadata owns the moving exact head after this reconciliation.

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
Premium V5.10           CLOSED / physical field pass
```

PR #255 changed CI/governance only. PR #254 is the only active learner-runtime candidate.

## Historical learner continuity — LOCKED

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

This is not proof of A1 completion, A2 readiness, mastery or CEFR attainment.

## Milestone state

```text
Build38                    CLOSED / RELEASED
Build39                    CLOSED / CERTIFIED
Build40                    CLOSED
Build41                    CLOSED / SUCCESSFUL NARROW CONSOLIDATION
Build42                    CLOSED / SUCCESSFUL FOUNDATIONS DEBT RESOLUTION
P3a / P3b / P3c            CLOSED / ACCEPTED boundaries preserved
P4                         CLOSED / ACCEPTED FRESH A1 READINESS GATE
A2 Entry Scope Audit       CLOSED / ACCEPTED
A2 Bridge Design Audit     CLOSED / ACCEPTED
A2-R1 pure contract proof  CLOSED / ACCEPTED via #251
A2-R1 integration decision CLOSED / ACCEPTED via #252/#253 closeout
A2-R1 CI remediation       CLOSED / MERGED via #255
A2-R1 learner pilot        ACTIVE FINAL CANDIDATE via #254 / NOT MERGED
Build42.3                  NOT AUTHORIZED
productive F16 Transfer    NOT AUTHORIZED
Build43                    NOT AUTHORIZED
full A2 curriculum         NOT AUTHORIZED
```

## Accepted A2-R1 chain

```text
PR #251 accepted head  766fe4c0f9d92074b2c1bb034a0acbcfe3d0b7b2
PR #251 squash merge   a4cdc146267a88ccef9c7cde928bc2f1010ef10b
PR #252 accepted head  9efa564fac991091d7422b66d0864215fe43dd3b
PR #252 squash merge   bb4cd1317936594820a9458ddbfe0e367a8386ac
PR #253 squash merge   b3cf1f3f3fbb6891ffd6f8b8be1f7957f356d903
PR #255 squash merge   acae4dac142404dda394501e952e44e6dc846129
```

Canonical first pilot:

```text
dialogue                  doctor-appointment
prerequisite lesson       l45 — Santé & rendez-vous médical
facts                     jai-mal-ventre / depuis-hier / rendez-vous-medecin
questions                 exactly 3
```

Accepted pure contract guarantees:

```text
2–4 deterministic questions
stable unique question IDs
stable distinct factId per question
external authority binds dialogueId + prerequisiteLessonId + allowedFactIds
first proof evidenceItems == [factId]
duplicate fact targets / normalized prompts rejected
duplicate displayed (vi, fr) option pairs rejected
one deterministic answer index per question
detached / deeply frozen normalized output
question result = success | miss only
```

Pure owner: `src/pedagogy/a2-reception-bridge-core.js`.

## Active learner pilot candidate — PR #254

The authorized implementation candidate remains intentionally narrow:

```text
existing Listening surface only
same doctor-appointment dialogue
same l45 prerequisite
same three accepted facts
exactly three deterministic questions
separate trusted authority + activity records
historical doctor single-question source preserved
no new route / lesson / item / durable store
no schema migration
normal + slow full-dialogue playback preserved
transcript hidden until q3 is answered
per-question Memory/Error only, source listening-r1
no aggregate R1/A2 mastery/readiness/CEFR claim
no direct Evidence v2 write
```

Verified dedicated proof on rebased candidate `73d56bafc148f705e472e6c01c8ffa9f81f46a5e`:

```text
syntax + deterministic contract          PASS
pilot sanctuary/scope guard              PASS
A2-R1 pure multi-fact contract           PASS
Chrome 390×844 bounded learner flow      PASS
entry + R1 activation                    PASS
open/close no Listening-state mutation   PASS
q1/q2 transcript hidden                  PASS
q3 transcript reveal                     PASS
3/3 results recorded                     PASS
return to Listening                      PASS
```

The previous browser-smoke failures are classified as **test harness defects**, not product regressions:

1. `?a2R1Smoke=1` was incorrectly classified by Build31 as a historical smoke and bypassed Build32.
2. `?a2R1Smoke=1&b32Audit=1` triggered an unrelated Build32 audit and was removed.
3. The dedicated iframe tribunal initially seeded only `knownItems` into an otherwise empty learner object; Recovery correctly blocked that invalid schema.
4. The final tribunal seeds a minimal valid schema-v2 learner object and exercises the normal application path.

No Recovery guard was weakened or bypassed.

## CI successor-safety remediation — PR #255 — MERGED

PR #254 exposed certified predecessor workflows that mixed two concerns:

1. replaying their historical functional contract; and
2. permanently forbidding any future change to `src/pedagogy/listening-engine.js`.

PR #255 removed only the obsolete permanent Listening-owner prohibition from:

```text
Build35 closeout
Build36.1 Recovery v3
Build37.1 through Build37.8
Build38.2 / 38.5 / 38.7 / 38.8
```

All historical syntax, unit, browser and predecessor-behavior tribunals remain active. All other protected owners remain protected.

Accepted #255 exact-head CI had only the five inherited baseline failures. One Build26.1 Chrome failure was rerun unchanged and passed, classifying it as a runner/browser flake rather than a product regression.

## Accepted integration decision — LOCKED

```text
integration target                              existing Listening surface
integration style                               additive / backward-compatible
historical doctor single-question source        PRESERVE
mutate listening-data-2.js for first pilot      NO by default
trusted authority                               SEPARATE from activity definition
activity source                                 COMPLETE / independently validated
new global route                                NO
new lesson/item                                 NO
new durable store                               NO
schema migration                                NO
pilot sequence                                  3 questions / same full dialogue
transcript before sequence completion           NO
normal/slow replay                              YES
per-question Memory/Error reuse                 YES, source listening-r1 only
one question writes only its own factId         REQUIRED
aggregate R1/A2 mastery                         FORBIDDEN
Evidence v2 direct write                        FORBIDDEN
P3b durability                                  FORBIDDEN
real iPhone/PWA field gate                      REQUIRED for field close
```

Bridge data must preserve the anti-self-authorization split:

```text
R1_AUTHORITIES[id]
→ dialogueId / prerequisiteLessonId / allowedFactIds

R1_ACTIVITIES[id]
→ id / lane / complete source / questions

normalizeActivity(R1_ACTIVITIES[id], R1_AUTHORITIES[id])
```

## Pre-answer persistence boundary — LOCKED

Existing Listening playback telemetry may persist before an answer:

```text
totals.plays
totals.replays
totals.slowPlays
updatedAt
```

Required truth:

```text
enter + exit R1 without playback/answer
→ no R1-attributable durable mutation

play/replay/slow + exit before answer
→ only existing Listening playback telemetry may change
→ Memory unchanged
→ Error Intelligence unchanged
→ Evidence v2 unchanged
→ learner/curriculum stores unchanged
→ no new R1 store or sequence record
```

Pedagogical success/miss/attempt truth begins only after an answer selection.

## Field gate after pilot merge/deploy

If and only if #254 passes its final exact-head CI/review, merges and deploys, the real installed iPhone/PWA must execute:

```text
Listening
→ launch R1 pilot
→ normal play
→ answer q1
→ slow replay
→ answer q2
→ answer q3
→ transcript reveal
→ return to Listening
```

Pass means no blank screen, stuck overlay, duplicate audio/control, horizontal overflow or learner-data loss.

This gate certifies runtime integration only — not A2 level.

## Expansion boundary

Until the first pilot passes final exact-head CI, merge/deployment and real iPhone field validation:

```text
second R1 dialogue  NOT AUTHORIZED
A2-P1               DEFER
A2-I1               DEFER
A2-W1               DEFER
Build43             NOT AUTHORIZED
full A2 curriculum  NOT AUTHORIZED
```

## Evidence/storage boundary — LOCKED

```text
reliable durable action families: phrase-retrieval / listening / scenario
P3b source observation: ephemeral only
cross-session P3b durability: not justified
Evidence v2: derived shadow only
Evidence v2 direct source-event write: not authorized
Evidence v2 read cutover: not authorized
new eighth durable store: not justified
mastery / CEFR / score / confidence inference: not authorized
```

## Permanent safety boundaries

- no fake pronunciation score;
- recognition failure is not mastery evidence;
- no learner-data reset, renumbering or reinterpretation;
- preserve current 52 lesson IDs / 313 item semantics;
- Recovery remains 7 durable stores / backup v3;
- Evidence v2 remains derived shadow;
- productive F16 Transfer remains not authorized;
- no A2 level badge/unlock/readiness claim;
- Build43 remains not authorized;
- `app.js`, `voice-ios.js`, `free-voice.js`, `assets/LOGO.png`, `assets/Favicon.png` and Build30 runtime bridge/contracts remain sanctuaries unless explicitly justified.

## CI baseline

Known inherited failures:

1. `French Trân'quille quality`
2. `Build 36.2 Evidence shadow adoption`
3. `V2.0.0 Freeze tribunal`
4. `Build 36.3 Recovery v3 durability tribunal`
5. `Build 28 Data recovery smoke`

Any other failure is NEW until exact logs classify it.

## Next control action

```text
1. Treat this checkpoint commit as the final #254 candidate unless a real defect is found.
2. Require the dedicated A2-R1 workflow to remain SUCCESS on the new exact head.
3. Require the full exact-head matrix to contain only the five inherited baseline failures; classify any additional red from exact logs.
4. Re-check reviews/threads and resolve any valid new blocker.
5. Squash-merge #254 only from its verified exact head.
6. Verify actual new main SHA and GitHub Pages deployment on that same runtime-bearing merge.
7. Stop at the real installed iPhone/PWA field sequence.
8. Do not start a second R1 dialogue, another A2 lane, Build43 or full A2 curriculum before the physical field gate passes.
```