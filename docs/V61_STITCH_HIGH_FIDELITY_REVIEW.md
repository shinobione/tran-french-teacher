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
