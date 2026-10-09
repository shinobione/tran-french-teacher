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
