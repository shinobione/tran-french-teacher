# V6.1 Stitch high-fidelity — first visual slice

Candidate branch: `design/v61-stitch-high-fidelity-home-practice` / PR DRAFT until evidence review.

## Scope
- Restyle the existing Build27 Home + Practice owners in one late Premium CSS layer.
- Add three-step **generic learning rhythm** (not streak, XP or progress) and the real conversation shortcut.
- Present the four *existing* live Practice actions as a glossy illustrated grid.
- Show recommendation **only** for an actually unlocked real-life scenario, using its currently rendered label.
- Existing actions are routed through original Build27 handler, never a duplicate app router.
- Existing 4 theme palettes, theme-locked Paris backgrounds and Premium 3D assets remain authoritative.
- Preserve real learner progress, phonetic caution, DEBUG FR, voice and Recovery; no new stores or migrations.

## Visual acceptance gate (NOT YET PASSED)
- Compare 390×844 and 430×932 against three V6.1 visual references (Home, Practice, Quiz).
- Home headline, real lesson title/summary/progress and CTA legible without Eiffel or icon overlap.
- Practice images, two-column thumb targets and disabled modes correctly rendered; native action route works.
- Four themes retain independent palettes; Original is restrained, Sunset warm, Jade gold/green, Aurora cyan/pink.
- No horizontal overflow; safe-area / PWA tabbar; Voice, Listening, Review, Real Life and back navigation retain continuity.
- Offline install/cache test must see the new CSS/JS with appropriate service-worker cache version, without touching user data.
- Browser visual QA and physical installed iPhone verdict are mandatory before merge/release.

## Known limitation
Visual mockups include a composited goat-in-cafe hero scene. Shipping screenshot fragments would embed text in images and introduce inaccessible fake UI. First candidate uses source-locked Eiffel art and existing 3D café asset instead; if more exact hero artwork is required, commission/review **isolated transparent artwork** in a later asset-only PR, without silently replacing locked backgrounds.

## V6.1 real visual QA — new candidate gate

Dedicated .github/workflows/v61-live-visual-review.yml launches the real PR runtime (no legacy uxSmoke bypass), captures live Home + Practice for four themes at 390×844 and Aurora at 430×932, asserts four real activity buttons with existing Premium 3D images and checks horizontal overflow. It uploads a ten-PNG artifact for human visual comparison.

This is an automated browser review gate. It is NOT physical iPhone validation and not proof of mockup fidelity until images are inspected. Legacy baseline CI is reviewed separately.

## Visual review 2 — target correction

Against Chrome 430×932 captured artifacts, the first draft lacked a café scene in its home hero, exposed too little logo identity and had sparse Practice cards with small arrow-only targets. Review 2 renders a *decorative* existing approved café 3D image and branded goat thumbnail in the hero while retaining the locked Eiffel artwork, shows the approved goat icon in the Home header, makes all four Practice action cards richer with native bilingual kicker / full-width CTA treatment **inside the existing buttons**, and keeps disabled modules readable while still disabled.

The new labels are purely descriptive and the existing button owns every action. No score, streak, XP, time estimates or CEFR state is fabricated. Assets used are existing runtime-approved files; no theme background replacement. Review 2 must pass the dedicated visual workflow and human capture comparison; screenshot-only pass does not permit merging.

## Visual review 3 — exact lesson denominator

Live visual screenshots revealed `BÀI 1 / 40` although the canonical curriculum has 52 lessons. Root cause: historical Build 27 initially paints the 40-lesson catalog, then Build 32 appends 12 lessons asynchronously; the Build 27 home render signature does not include lesson count and can cache an obsolete denominator. V6.1 now reconciles **only the displayed badge** to the actual live `FrenchTranquilleCurriculum.lessons.length` during its decoration. No curriculum, learner progress or storage is touched. Dedicated live Chrome capture requires 52 loaded lessons and a matching badge before accepting Home captures.

## Review4 — Lower Practice scroll gate
The existing two-column Practice layout needs scrolling on 390×844. A new live-browser capture enters the real Practice overlay, scrolls to its bottom, and confirms the lower Review and Real-Life CTA labels are within the unobstructed viewport and point to their original button via elementFromPoint. This is a visual/interaction check, not a learner-state change. The decorative goat also moves slightly inboard on small viewports. No merge or iPhone field PASS is claimed.

## CI review — 2026-10-10

A 23-job exact-head failure audit and one narrowly reproduced Practice card-owner fix are documented in [`V61_CI_ARBITRATION_2026-10-10.md`](./V61_CI_ARBITRATION_2026-10-10.md). The old `main` 7-failure baseline is not V6.1 QA certification. The separate UI/PWA successor governance gate and real iPhone verification remain mandatory before merge.

## Real-artifact visual inspection — 2026-10-11 (review5 punch list)

**Reviewed evidence:** GitHub Actions [V6.1 live visual review run 38055549514](https://github.com/shinobione/tran-french-teacher/actions/runs/38055549514), artifact `v61-live-visual-review` (12 actual PNGs, captured 2026-10-10; artifact expires 2026-10-24). Images were actually downloaded and visually inspected, not merely inferred from green check names. Coverage: Original/Aurora/Sunset/Jade Home and Practice at 390×844; Aurora Home+Practice at 430×932; Aurora and Jade Practice after bottom scroll at 390×844. **Approved Stitch reference renders were not available as matched files in this checkpoint; this is a candidate-side QC pass, not reference-fidelity signoff.**

### Directly visible
- All four palettes are distinct and internally consistent. Header carries the French Trân’quille goat; Home hero shows Vietnamese greeting `Xin chào Trân`, real lesson `BÀI 1 / 52`, content and full-width `Bắt đầu` CTA. No fabricated score, streak or mastery badge is visible in captured states.
- The hero café asset is a small decorative illustration beside the title; it is **not** yet the reference-style fully composed goat-in-café scene. Do not substitute a screenshot with baked-in typography or replace locked theme backgrounds. If a closer match is desired, scope an isolated transparent artwork review.
- The Home quick-practice section begins near/below the sticky tab bar at 390/430 heights. This is not, by itself, proof that it cannot be scrolled; require a real last-card hit-target and safe-area proof, not a static viewport inference.
- Practice has two illustrated activity columns and one action owner per card; visibly disabled Listening/Real-Life states retain lock + `Chưa mở`. At the 390×844 bottom-capture the Review/Real-Life row is reachable and not covered by the bottom tab bar.
- Practice small captions and disabled headings are notably subdued; the Vietnamese long title `Tình huống thực tế` wraps over multiple lines on 390-wide cards. Readability should be reviewed on a physical iPhone at native text scaling before increasing density or reducing font size.

### Next exact visual slice (separate from issue #261 CI consolidation)
1. **P0 — actual Stitch comparison:** inspect approved Home/Practice references side-by-side with these twelve PNGs. Record measured mismatch locations and the permitted asset/layout treatment. No "pixel-perfect" declaration until a human has approved this.
2. **P1 — Home lower reachability:** add/confirm a real 390×844 and 430×932 scrolling/hit-target check for the quick-practice row above the fixed tab bar, in all four themes. Keep the tabbar usable; no duplicate action router.
3. **P1 — disabled/long-text legibility:** evaluate Practice description/disabled-heading contrast and `Tình huống thực tế` wrapping at 390px with normal and increased iOS text sizing. Only change shared CSS if a measured accessibility or visual-fidelity regression exists; preserve clear disabled states.
4. **P2 — illustration fidelity:** revisit the café/goat hero and card visual hierarchy only after approved references are on hand. Reuse locked art by default; produce a separate asset-only change if genuinely needed.
5. **P0 release:** rerun four-theme Home/Practice Chrome captures, exact-head successor-safe PWA/offline, Voice/Listening/Review navigation, and obtain physical installed-iPhone Safari/PWA verdict. Quiz high-fidelity is **not** covered by these captures and is a later slice.

**Status:** visible candidate quality is promising but **NOT human-accepted, not real-iPhone-certified, not merged/deployed**. CI-only Draft integration [#265](https://github.com/shinobione/tran-french-teacher/pull/265) separately combines the three proven Recovery/Evidence/Build28 tests. No changes to learner runtime are authorized by this review note.

## Review6 — Home lower tap target and mobile bilingual legibility (2026-10-11)

Candidate PR #258, **not** field approved or merged. This narrowly targeted follow-up to review5 adds a real `home-bottom` browser capture: scroll the native Home quick-Conversation action into an unobstructed position, verify a minimum 44×44px hit target, `elementFromPoint` ownership, and a still-tappable fixed Home tab. Run on all four themes at 390×844 and Aurora at 430×932. The visual workflow now expects **17 PNG artifacts** (12 original + five Home-bottom), provided the new exact-head run passes.

CSS changes are limited to a mobile `max-width:520px` shared typography/contrast override: quick-action captions and Practice descriptions use **0.76rem (12.16 CSS px at default 16px root)** rather than the old 0.65–0.70rem; disabled Practice card opacity/heading contrast increases slightly while native `disabled` and `Chưa mở` remain enforced. The Chrome Practice fixture now checks the minimum 12px caption and locked CTA; existing navigation/owner checks stay. The duplicate trailing text after the fixture's first closing HTML was excised as harness-only cleanup.

**Pending:** exact-head visual workflow PASS and inspection of resulting lower-Home screenshots, contrast/long Vietnamese text on physical installed iPhone at ordinary and increased system text scale, side-by-side match against approved Stitch references. If any new browser proof fails, fix the real geometry before further UI expansion. Do not add a new router, store, XP/score, asset replacement or pronunciation shortcut. The CI-only safety integration [#265](https://github.com/shinobione/tran-french-teacher/pull/265) is separate and has all three Recovery/Evidence/Build28 tests green together.

## Review8 — 23/23 real Chrome captures and compact lesson CTA proof (2026-10-11)

Workflow [`38098536760`](https://github.com/shinobione/tran-french-teacher/actions/runs/38098536760) **SUCCESS** on tested source HEAD `8b281a4a623b07b8128a829572672a2a7bad1fcc`; 13/13 job steps successful. The downloaded artifact contains **23 distinct screenshots**. New cases since review6 are Aurora Home/Practice at 320×568, Aurora Home-bottom and Practice at **simulated 125% root-font sizing** (not native iOS Dynamic Type), plus actual scroll-and-hit proofs for the first-lesson `Bắt đầu` button at 320×568 Aurora and 375×667 Original.

**Visual observation:** on the 320×568 *initial* Home screenshot, the hero's bottom CTA is below the fixed tab navigation. Chrome proved that the **real original button** can be scrolled into a visible >=44px target, is above the tabbar, and owns `elementFromPoint` in both compact viewports; the content was not deleted or replaced with fake UI. This remains an **initial-viewport discoverability** consideration, not a proven inability to complete a lesson. Long Vietnamese Practice headings and disabled states remain readable at tested widths, and no horizontal overflow was reported. The text-scaled cases passed; actual iPhone text settings still require human validation.

**CI adjudication:** same tested source has Build29 iPhone browser/PWA, V6.1 strict PWA successor, real visual and Practice advisory PASS; full check matrix is 60 PASS / 8 FAIL (not fully certified). Legacy Recovery/Evidence/Build28 checks need integrated Draft #265; separate historical V2 Freeze/Quality/P3b and intermittent Premium V5 visual jobs remain unresolved. **Do not merge, release or claim Stitch pixel-match** before approved reference comparison and physical installed-iPhone verdict.

**Next visual review:** original Stitch Home/Practice reference side-by-side, specifically café/goat hero scale and compact-viewport discoverability; no speculative theme/background replacement. The high-fidelity Quiz is a later slice after Home/Practice acceptance.

## Review9 — compact-width Home density experiment (2026-10-11)

Latest runtime-style-only commit `51d029895dc22a599b109f8c6fcb608e16a9811c` adjusts vertical rhythm **only** for width <=375px and height <=700px: shorter header/welcome spacing, slightly smaller welcome type/line height, reduced Home-grid gap, 284px minimum lesson hero (formerly 330px at mobile), and a smaller progression margin. No new UI content, scores, navigators, data stores, voice behavior, theme art or learner semantics. **This is a pending visual experiment, not an approved Stitch match**.

The prior 320px first-viewport screenshot showed `Bắt đầu` below the fixed tabbar. Review8's **real post-scroll hit test** proved the original CTA usable at 320×568 and 375×667; the new CSS aims to reveal more of that card earlier without sacrificing the 44px target. **Do not claim improved initial visibility or no overlap until new exact-head Chrome run `38098855013` finishes and its PNGs are compared.** Build29 iPhone-browser/PWA and strict V6.1 successor safety passed the CSS source while the dedicated visual run was queued. Human installed-iPhone and official reference review remain outstanding.
