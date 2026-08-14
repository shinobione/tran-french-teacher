# French Trân’quille — Premium Visual Assets

> **Canonical Premium asset archive introduced after V5.5.**
>
> Read `MASTER-ROADMAP.md` before replacing, wiring or regenerating anything in this directory.

## Status vocabulary

- **LOCKED** — visual source identity explicitly selected by the user. Do not silently regenerate or replace it.
- **CANDIDATE** — generated and preserved in the repository, pending human visual approval.
- **WIRED** — the runtime actually references this asset.
- **FIELD PASS** — physically validated on the installed iPhone/PWA.

## Important staging note

The WebP files committed with this manifest are **compact durable staging/reference derivatives**, intentionally stored now so the current chat is no longer the only place the visual work exists.

They are **not yet the final Retina/runtime delivery sizes**.

When V5.7 integrates the artwork, higher-resolution WebP/AVIF derivatives may replace these compact files **only if they preserve the same LOCKED source visual identity**. A higher-resolution derivative is not permission to invent a different scene or palette.

This asset-storage commit changes **no JS, CSS, HTML, service worker, cache generation or learner data**.

---

# 1. Full theme backgrounds

Repository tree:

```text
assets/premium/themes/aurora/background.webp
assets/premium/themes/sunset/background.webp
assets/premium/themes/nocturne/background.webp
assets/premium/themes/original/background.webp
```

| Theme | Status | Staging size | SHA-256 | Canonical direction |
|---|---|---:|---|---|
| Aurora | **LOCKED** | 320×569 | `f5a9945614dac98076bec0e25dd106d2b98a5612ebc1b58933c450fb715e94f6` | Blue/cyan/violet/pink luminous Paris night |
| Sunset | **LOCKED** | 320×569 | `c6f8f020f099cc873e4f36284671da3ea6715f39c5562caea786cc9c23e66d2e` | Orange/coral/violet Paris sunset |
| Nocturne | **LOCKED** | 320×569 | `71bed3c1df77c7bd23ea6cbc46f25a948b67750cead56298301b6184c41a4303` | Dark jade/teal/gold Paris night |
| Original | **CANDIDATE** | 320×569 | `837522fcd2ca8d6aa60420c119052c1de7f90b2c6b9f3cccc1c44a7118a4c57a` | Midnight blue/indigo, cyan/cobalt, restrained pink-magenta flagship Paris night |

## 1.1 The three user-locked sources

The user explicitly supplied and ordered the three approved source images on **2026-08-15** as:

1. **Aurora**
2. **Sunset**
3. **Nocturne**

Those three visual identities are locked. Future work may optimize crop/resolution/compression, but must not silently replace the scene with a fresh generation.

## 1.2 Original candidate

The Original theme must no longer look like a legacy skin next to the Premium themes.

Canonical Original direction:

- deep midnight blue / indigo base;
- cobalt / electric cyan light;
- restrained pink / violet / soft magenta accents;
- elegant Paris night;
- Eiffel Tower + Seine / city reflections;
- calm flagship identity;
- darker negative space for readable UI;
- **no dramatic Aurora ribbons**;
- **no Sunset orange dominance**;
- **no Nocturne jade/gold dominance**.

The currently archived Original image is a **CANDIDATE** until the user approves it in context.

---

# 2. Lesson-card Eiffel artwork

These candidates exist specifically to replace the small legacy/CSS **“Paint Eiffel”** motif inside the current lesson card.

```text
assets/premium/themes/aurora/lesson-eiffel.webp
assets/premium/themes/sunset/lesson-eiffel.webp
assets/premium/themes/nocturne/lesson-eiffel.webp
assets/premium/themes/original/lesson-eiffel.webp
```

| Theme | Status | Staging size | SHA-256 |
|---|---|---:|---|
| Aurora | **CANDIDATE** | 320×240 | `21b9e3c5023f5da6e824926a4937deff80c0bed1c4ebd0eefe4b2740d0c0c91d` |
| Sunset | **CANDIDATE** | 320×240 | `e62b14f58ab33828181e6c1e1e68f963f8818a81fa28d8d481d078b3da99d312` |
| Nocturne | **CANDIDATE** | 320×240 | `9a514af23cdb1aa325ccd32a9b10c31b6bf3a80a0d059fb821ee042fb0141a7f` |
| Original | **CANDIDATE** | 320×240 | `a2e5170d06b157ba6916e79b77ca981ea3b034bc19238c63bea6c744ad70254f` |

Theme directions:

### Aurora
- deep blue/violet;
- cyan + pink luminous atmosphere;
- premium Paris night;
- Eiffel Tower must remain readable at small card size.

### Sunset
- warm gold Eiffel Tower;
- orange/coral/pink/violet dusk;
- warm Paris/Seine reflections.

### Nocturne
- dark teal/jade;
- controlled emerald atmosphere;
- refined gold Eiffel lighting;
- calm luxury mood.

### Original
- midnight blue/indigo;
- cool cyan/cobalt light;
- restrained pink-magenta;
- calmer flagship identity clearly distinct from Aurora.

All four lesson images are **CANDIDATES** until visually approved in the real card composition.

---

# 3. Runtime integration contract — V5.7

A later runtime PR may wire these assets only after reading the current `main`, this manifest and `MASTER-ROADMAP.md`.

Required rules:

1. Artwork is presentation-only; it does not own pedagogical data.
2. Lesson art must never obscure title, progress or CTA.
3. Crop/position must be explicitly tuned for 390×844, 430×932, tablet and desktop.
4. No asset may create layout shift or horizontal overflow.
5. Original receives the same Premium design depth as Aurora/Sunset/Nocturne.
6. The old CSS/placeholder Eiffel must disappear when the new card art is wired.
7. Service-worker/cache generation changes only in the runtime integration PR, not this archive commit.
8. Installed/offline PWA must resolve the same active theme asset set.
9. **No route/page crossfade may be reintroduced.**
10. Learner stores must remain byte-safe through purely visual navigation.
11. Human screenshot review + physical iPhone validation are required before any asset becomes **FIELD PASS**.

---

# 4. Canonical asset tree

```text
assets/premium/themes/
├── aurora/
│   ├── background.webp
│   └── lesson-eiffel.webp
├── sunset/
│   ├── background.webp
│   └── lesson-eiffel.webp
├── nocturne/
│   ├── background.webp
│   └── lesson-eiffel.webp
└── original/
    ├── background.webp
    └── lesson-eiffel.webp
```

---

# 5. Next visual sequence

```text
assets preserved in repo
→ human-review Original + lesson candidates
→ integrate all four Premium identities
→ eliminate legacy Eiffel placeholder
→ elevate Original to full Premium parity
→ decouple DEBUG FR from theme
→ fluidity / local micro-interactions without route crossfades
→ global visual QA
→ physical iPhone Premium PASS
→ close #114
→ governance closure
→ Build35
```

The full project roadmap and Build35→40 preservation contract live in `MASTER-ROADMAP.md`.
