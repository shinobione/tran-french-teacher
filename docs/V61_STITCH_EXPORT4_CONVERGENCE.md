# V6.1 — Stitch Export #4 Home + Practice visual convergence

**Work unit:** CSS-only design candidate, 2026-10-11. **No product release, merge, field approval or learner-data modification.**

## Source and canonical reference selection

User-supplied archive: `stitch_vietnamese_french_learning_system (4).zip`, SHA-256 `3e18f9714c146bb24c6c56256a154bd91be21c2675d6ab03bbc1ad7422a2da0c`. The source is an *art-direction reference*, not runnable PWA code; its HTML includes network assets, Tailwind CDN/Google Fonts and example learner numbers. Rendered files are taller than a 390×844 actual screenshot.

| Surface | Theme | Canonical Stitch folder | Screenshot size | Screenshot SHA-256 prefix |
|---|---|---|---|---|
| Home | Original | `aujourd_hui_th_me_original_3` | 607×1600 | `e8cc26ff62b1831c61163f81` |
| Home | Aurora | `aujourd_hui_accueil_aurora_2` | 595×1600 | `4728e4dc8b717c2daae77c1d` |
| Home | Sunset | `aujourd_hui_sunset_parisien_2` | 510×1600 | `d4fe58b58e26b06fc8b969da` |
| Home | Jade | `aujourd_hui_luxe_nocturne_jade_or_2` | 560×1600 | `64ba26a93b5c44eecfb5317d` |
| Practice | Original | `v61_practice_original_390` | 429×1600 | `28d82572e5b9bb7d7ef8a312` |
| Practice | Aurora | `v61_practice_aurora_390` | 528×1600 | `8f4310af901d3ae426b9b06a` |
| Practice | Sunset | `v61_practice_sunset_390` | 463×1600 | `cb227fd50afa485a0ad01592` |
| Practice | Jade | `v61_practice_jade_390` | 530×1600 | `95e47ac6e17c1125266a78d3` |

Older duplicate folders in the ZIP are **not** visual sources. Quiz is future scope, not part of this patch. Human-approved reference fidelity is not asserted.

## Exact implementation scope

In `src/premium/v61-stitch-high-fidelity.css`, add a self-contained *Stitch Export4* treatment, downstream of the previously certified Review9 CSS. This alters **presentation only**:

1. Local fallback editorial serif headings on Original, Sunset and Jade; Aurora retains premium sans.
2. The greeting gets a separate tinted/glass surface **only at 376–759 px** so the proven 320/375 compact Home CTA remains unchanged.
3. Four theme-specific highlight tones for borders and small decorative affordances; does not replace existing theme assets or overall backdrops.
4. Practice's four native activity buttons receive distinct per-theme accent/glow, a local radial decoration behind the existing 3D art, and a readable visually muted *true disabled* state. The native button, its `disabled` attribute, single route owner and labels remain authoritative.
5. Home quick-action decorative arrows apply only to **enabled** real buttons. No new interactive element.

The only other code edit is `tests/browser/v61-live-visual-capture.html`: verify the actual three native tab owners, presence of themed CSS and the local editorial font, alongside previous full 52-lesson real badge, 4 native Practice actions, disabled CTA, >=12px descriptions, 320/375 lesson CTA and Home quick-route hit target tests. This fixture does not alter the PWA runtime.

### Hard safety / out of scope

- **No product JS, index.html, Service Worker, cache version, loader, production assets, state schema, Voice, Practice routes, learner progress or backup/restore code change.**
- **No Stitch HTML/remote Google image link**, no Google Fonts fetch and no Tailwind CDN copied to app.
- No fabricated XP, badges, streaks, hearts, lesson index or learning score.
- Keep three tabs, 52 real lessons / 313 items, seven durable stores, audio 0.88 / 0.65 and original owner logic.
- Do not import any Quiz feature now.

## Acceptance gates

1. Exact-head `V6.1 live visual review` PASS: **23 current Chrome PNG captures** including four themes, 320/375/390/430 widths, 125% simulated text, Practice lower routes, compact CTA geometry.
2. Inspect the **new artifact**, compare each Home+Practice scene to canonical Stitch PNG (not direct pixel equality; different screenshot sizes). Record visual mismatch, accessibility and touch-target risks.
3. Full GitHub PR checks for same commit: V2 Freeze, Quality, P3b, Recovery v3, Evidence Shadow, Build28, Build29 PWA, Voice and global navigation. Do not claim pass before exact result.
4. Human Stitch aesthetics/interaction approval, then non-destructive field test **on physical installed iPhone**, separately, using `docs/V61_IPHONE_FIELD_ACCEPTANCE.md`.
5. `main` branch protection + explicit merge and Pages release decision **still required**.

**Candidate must remain Draft and unmerged until these gates close.**
