# French Trân’quille — Premium Visual Assets

> **Canonical Premium asset archive introduced after V5.5.**
>
> Read `MASTER-ROADMAP.md` before replacing, wiring or regenerating anything in this directory.

## Status vocabulary

- **LOCKED** — visual source identity explicitly selected by the user. Do not silently regenerate or replace it.
- **REJECTED** — preserved only as historical/rejection evidence; never wire it as a final asset.
- **CANDIDATE** — generated and preserved in the repository, pending human visual approval.
- **APPROVED** — explicitly accepted by the user for the next integration phase; not yet wired or field-tested.
- **WIRED** — the runtime actually references this asset.
- **FIELD PASS** — physically validated on the installed iPhone/PWA.

## Important staging note

The first-generation WebP files committed with this manifest are **compact durable staging/reference derivatives**. The V2 human-gate candidates use PNG because the lesson assets must preserve genuine alpha transparency.

The approved V2 files are wired on the V5.7 candidate branch, but are not yet merged, deployed or field-approved.

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
| Aurora | **LOCKED · WIRED in V5.7 candidate** | 320×569 | `f5a9945614dac98076bec0e25dd106d2b98a5612ebc1b58933c450fb715e94f6` | Blue/cyan/violet/pink luminous Paris night |
| Sunset | **LOCKED · WIRED in V5.7 candidate** | 240×426 | `0dbbaa5334a79fb5e15cce2fee1526ddfe75606106bad24723b6c4cff0c1414c` | Orange/coral/violet Paris sunset |
| Nocturne | **LOCKED · WIRED in V5.7 candidate** | 320×569 | `71bed3c1df77c7bd23ea6cbc46f25a948b67750cead56298301b6184c41a4303` | Dark jade/teal/gold Paris night |
| Original V1 (`background.webp`) | **REJECTED** | 240×426 | `6cfe0a3fc3c8f2fe23da84cc9dd20590ba4322f78a6f7a855b5967da337f6372` | Too bright, too blue/pink and too close to Aurora |
| Original V2 (`background-v2.png`) | **APPROVED · WIRED in V5.7 candidate** | 864×1821 | `9e221bb6be7d879937226725c0ca9732ab932216092e70e23eec56f6df9d1305` | Near-black midnight navy, cold cyan/silver, restrained accents, dark flagship Paris night |

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
- cobalt / cold cyan light;
- silver / blue-white highlights;
- pink / violet / soft magenta only as extremely restrained accents;
- elegant Paris night;
- Eiffel Tower + Seine / city reflections;
- calm flagship identity;
- darker negative space for readable UI;
- **predominantly dark sky**;
- **no large pink sky or pastel wash**;
- **no dramatic Aurora ribbons**;
- **no Sunset orange dominance**;
- **no Nocturne jade/gold dominance**.

The first `background.webp` image is explicitly **REJECTED**. The corrected `background-v2.png` received the user’s **global PASS on 2026-08-15** and is approved for V5.7 integration.

---

# 2. Lesson-card Eiffel artwork

The first-generation `lesson-eiffel.webp` files are explicitly **REJECTED** because they are opaque Paris scenes that read as rectangular thumbnails. They remain only as rejection evidence.

The V2 candidates exist specifically to replace the small legacy/CSS **“Paint Eiffel”** motif inside the current lesson card.

```text
assets/premium/themes/aurora/lesson-eiffel.webp
assets/premium/themes/sunset/lesson-eiffel.webp
assets/premium/themes/nocturne/lesson-eiffel.webp
assets/premium/themes/original/lesson-eiffel.webp
```

```text
assets/premium/themes/aurora/lesson-eiffel-v2.png
assets/premium/themes/sunset/lesson-eiffel-v2.png
assets/premium/themes/nocturne/lesson-eiffel-v2.png
assets/premium/themes/original/lesson-eiffel-v2.png
```

| Theme / generation | Status | Staging size | SHA-256 |
|---|---|---:|---|
| Aurora V1 WebP | **REJECTED** | 320×240 | `21b9e3c5023f5da6e824926a4937deff80c0bed1c4ebd0eefe4b2740d0c0c91d` |
| Sunset V1 WebP | **REJECTED** | 320×240 | `e62b14f58ab33828181e6c1e1e68f963f8818a81fa28d8d481d078b3da99d312` |
| Nocturne V1 WebP | **REJECTED** | 320×240 | `9a514af23cdb1aa325ccd32a9b10c31b6bf3a80a0d059fb821ee042fb0141a7f` |
| Original V1 WebP | **REJECTED** | 320×240 | `a2e5170d06b157ba6916e79b77ca981ea3b034bc19238c63bea6c744ad70254f` |
| Aurora V2 PNG | **APPROVED · WIRED in V5.7 candidate** | 1254×1254 RGBA | `fd58d88a750149e19a0c690677ade88edb2e6d842e751d3de1306fa234210256` |
| Sunset V2 PNG | **APPROVED · WIRED in V5.7 candidate** | 1254×1254 RGBA | `c8984e8b6be34dd46e6eade2b7726b43266f1fbf21e42be98a3ac68d68482787` |
| Nocturne V2 PNG | **APPROVED · WIRED in V5.7 candidate** | 1254×1254 RGBA | `64c295e207d4de164edec27153c6c2b2d42051186f560639f6a8de343d46cd24` |
| Original V2 PNG | **APPROVED · WIRED in V5.7 candidate** | 1254×1254 RGBA | `b067b85e208bb3bda16196376982beae731ddd1bb52bfa7e8ae2a17e33fd6831` |

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

All four V2 files have genuine alpha transparency (`RGBA`, alpha range `0..255`), large transparent margins, no opaque sky, no baked card and no visible rectangular border. The user gave a **global PASS on 2026-08-15**; they are wired in the V5.7 candidate but are not yet merged or **FIELD PASS**.

Human-review boards:

```text
assets/premium/v5.6-background-review.png
assets/premium/v5.6-lesson-eiffel-review.png
```

---

# 3. Runtime integration contract — V5.7

The V5.7 runtime candidate wires these assets under the following contract. Any follow-up must first read current `main`, this manifest and `MASTER-ROADMAP.md`.

Required rules:

1. Artwork is presentation-only; it does not own pedagogical data.
2. Lesson art must never obscure title, progress or CTA.
3. Crop/position must be explicitly tuned for 390×844, 430×932, tablet and desktop.
4. No asset may create layout shift or horizontal overflow.
5. Original receives the same Premium design depth as Aurora/Sunset/Nocturne.
6. The rejected V1 images and old CSS/placeholder Eiffel must disappear from the rendered product when the approved V2 card art is wired.
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
│   ├── lesson-eiffel.webp          # REJECTED evidence
│   └── lesson-eiffel-v2.png        # APPROVED, alpha
├── sunset/
│   ├── background.webp
│   ├── lesson-eiffel.webp          # REJECTED evidence
│   └── lesson-eiffel-v2.png        # APPROVED, alpha
├── nocturne/
│   ├── background.webp
│   ├── lesson-eiffel.webp          # REJECTED evidence
│   └── lesson-eiffel-v2.png        # APPROVED, alpha
└── original/
    ├── background.webp             # REJECTED evidence
    ├── background-v2.png           # APPROVED
    ├── lesson-eiffel.webp          # REJECTED evidence
    └── lesson-eiffel-v2.png        # APPROVED, alpha
```

---

# 5. Next visual sequence

```text
assets preserved in repo
→ rejected V1 candidates classified durably
→ human-review Original V2 + four transparent lesson V2 candidates
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
