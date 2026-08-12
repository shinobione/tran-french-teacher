# French Trân’quille — ARCHITECTURE

## Vue générale

```text
iPhone / Safari / PWA
        ↓
UX Shell simple
        ↓
Progression UX + Session UX
        ↓
Build 26.3 interactions stables
        ↓
Build 26.4 single-scroll + Tyffany
        ↓
Build 26.5 Conversation Exit
        ↓
Build 26.6 Progress containment + curriculum par étapes
        ↓
Build 26.7 garde géométrique open-Details
        ↓
Build 26.8 Progress Focus Flow
        ↓
Details Dashboard + Voice Replay
        ↓
moteurs pédagogiques locaux
        ↓
localStorage + Web APIs navigateur
```

PWA statique GitHub Pages, sans backend obligatoire ni API payante.

Principe produit : **la complexité appartient aux moteurs ; l’utilisatrice voit seulement le contexte nécessaire à l’action en cours.**

---

# Runtime production — v1.19.8 Build 26.8

Runtime principal :

```text
progress-safety.js
app.js
curriculum-stage2.js
curriculum-stage3.js
stage2-boot.js
debug-fr.js
voice-ios.js
free-voice.js
learning-memory.js
error-intelligence.js
language-ratio-core.js
language-ratio.js
daily-coach.js
mastery-engine.js
mastery-stage3.js
scenario-data.js
real-life-data.js
real-life-data-2.js
real-life-data-3.js
scenario-host.js
scenario-engine.js
real-life-ux.js
real-life-coach.js
listening-data.js
listening-engine.js
ux-shell.js
interaction-ux.js
progression-ux.js
session-ux.js
session-ux-adapter.js
voice-replay.js
progress-details-dashboard.js
build26-3-ux.js
build26-4-ux.js
build26-5-ux.js
build26-6-ux.js
build26-7-ux.js
build26-8-ux.js
build-meta.js
```

CSS additif Progress :

```text
progression-ux.css
progress-details-dashboard.css
build26-3-ux.css
build26-4-ux.css
build26-5-ux.css
build26-6-ux.css
build26-7-ux.css
build26-8-ux.css
```

Production runtime : `1084e1d71a7aebbf6d7dcea9dfa0cabb44f6cbe1` — PR #56 — **14/14 workflows fonctionnels SUCCESS** — Pages **#112 SUCCESS**.

---

# Build 26.8 — Progress Focus Flow

## Problème terrain

Build 26.7 garantissait des colonnes lisibles, mais une famille Details ouverte laissait encore trop de contexte dans le document :

```text
Résumé
+ Curriculum
+ grille des familles
+ famille active
+ cartes moteur
```

La page restait donc longue même si sa géométrie était saine.

## Contrat d’état

Build 26.8 ajoute une couche de présentation qui observe les **états propriétaires existants** :

```text
progressDetailActive != vide
→ focus = details

curriculumExpanded == 1
→ focus = curriculum

sinon
→ focus = overview
```

Le focus n’est pas un nouveau moteur pédagogique et ne crée aucune donnée learner.

### Focus Details

```text
.progress-layout
└── .progress-ux-composition        ← frontière DOM conservée
    ├── .progress-ux-left-flow      ← display:none pendant focus
    └── .progress-ux-details        ← pleine surface
        └── dashboard
            ├── grille familles     ← masquée
            └── panneau actif       ← visible pleine surface
```

Les nœuds Memory / Mastery / Listening / Scenario restent exactement dans le même ancêtre. **Aucun reparenting Build 26.8.**

### Focus Curriculum

```text
.progress-layout
└── .progress-ux-composition
    ├── .progress-ux-left-flow      ← pleine surface
    │   ├── Overview               ← masqué
    │   └── Curriculum             ← visible
    └── Details                    ← masqué
```

Le curriculum conserve le modèle Build 26.6 : cinq étapes, une seule étape ouverte.

## Sorties pilotées par les propriétaires

Les boutons Retour ne simulent pas de clic sur un contrôle caché.

```text
Retour Details
→ FrenchTranquilleProgressDetailsDashboard.close()
→ decorate()

Retour Curriculum
→ FrenchTranquilleProgressionUX.setCurriculumExpanded(false)
→ decorate()
```

Cela réduit les races entre couches `MutationObserver` et garde un seul propriétaire de chaque état métier.

## Transition logique vs animation

La transition visuelle est courte : fade / léger déplacement.

Architecture importante :

```text
fade-out
→ applyFocus(nouveau mode)
→ état logique considéré terminé
→ fade-in cosmétique
```

L’animation ne garde donc pas un verrou fonctionnel jusqu’à son dernier frame. Une nouvelle interaction peut être traitée même si le fade finit encore visuellement.

Les demandes répétées vers la même destination sont idempotentes : un `MutationObserver` ne peut plus redémarrer indéfiniment le même timer.

`prefers-reduced-motion: reduce` retire le mouvement, pas le modèle d’état.

## Utilisation responsive de l’espace

Hors focus, shell historique inchangé.

Pendant un focus Progress :

```css
.app-shell { width:min(1420px,100%); }
```

Grand desktop :

- panneau Détails actif : 2 colonnes de cartes ;
- Curriculum : 5 étapes horizontales + leçons 2 colonnes.

Responsive :

- <=1100 px : Détails 1 colonne, étapes Curriculum 2 colonnes ;
- <=860 px : focus mobile 1 colonne ;
- aucun overflow horizontal contractuel.

## Tribunal 26.8

Chrome réel vérifie quatre scénarios :

1. Details focus desktop 1640×900 ;
2. Curriculum focus desktop 1640×900 ;
3. round-trip complet ;
4. Details focus mobile 390×844.

Round-trip contractuel :

```text
compact
→ Memory focus
→ Retour aux détails
→ Curriculum focus
→ Retour au résumé
→ compact = 5 lesson rows
```

Sur le viewport desktop de CI, Details focus et Curriculum focus mesurent **920 px** et l’overflow horizontal vaut 0.

---

# Build 26.7 — garde géométrique toujours actif

Build 26.7 reste responsable de la géométrie sûre quand Details est simplement ouvert dans la vue normale.

Contrats historiques :

```text
1640×900 → flow 452 px / Details 452 px / lesson row min 410 px
980×900  → pile verticale / flow 906 px / lesson row min 864 px
```

Build 26.8 supersède seulement la présentation **quand une intention Focus est active**. Le workflow 26.7 est version-forward et garde ses mesures Chrome.

---

# Build 26.6 — frontière de propriété DOM

Composition canonique :

```text
.progress-layout
└── .progress-ux-composition
    ├── .progress-ux-left-flow
    │   ├── .progress-ux-overview
    │   └── .progress-ux-curriculum
    └── .progress-ux-details
```

Cette structure reste essentielle parce que plusieurs moteurs historiques recherchent leur carte dans le premier descendant de `.progress-layout`.

Contrat anti-prolifération :

```text
après quiescence = 12 cartes
3 secondes après = 12 cartes
engine cards      = uniques
forbidden cards   = 0
```

Build 26.8 ne modifie jamais cette propriété DOM.

---

# Learning Details Dashboard

Familles :

```text
🧠 memory    → Learning Memory + Error + Éléments appris
🎯 mastery   → Mastery + A1 Mastery
🎧 listening → Listening
🎭 real-life → Scenario / Real Life
🧩 path      → Stage2 / Stage3 / Adaptive / Daily / A1
⋯ other      → contenu non classifié
```

`data-progress-detail-family` reste stable. Une seule famille est active. Les cartes sont les vraies cartes historiques, jamais des clones décoratifs.

---

# Curriculum Progress

Curriculum : **40 leçons / 241 éléments**.

Vue compacte : **5 lesson rows** autour de la position actuelle.

Vue complète :

```text
1. Survie A0          1–7
2. Vie quotidienne    8–15
3. Fondations A1      16–20
4. Premiers échanges  21–25
5. A1 Core            26–40
```

Une seule étape expose ses leçons. Les 40 restent accessibles sans mur de 40 lignes.

---

# Listening

Contrat final :

```text
normal request 0.88 → effectif 0.88
slow request   0.68 → bridge 0.65 → effectif 0.65
```

`voice-ios.js` reste byte-identique.

---

# Voice Self-Playback — Build 26.1

```text
réponse reconnue par free-voice.js
→ voice-replay.js
→ seconde prise volontaire locale
→ MediaRecorder / Blob URL / Audio
```

Pas d’upload ni persistance audio. Gate réel iPhone toujours ouvert : `reconnaissance → seconde prise → lecture → reconnaissance suivante`.

---

# Real Life French

Ordre historique important :

```text
scenario-data.js
real-life-data.js
real-life-data-2.js
real-life-data-3.js
scenario-host.js
scenario-engine.js
real-life-ux.js
real-life-coach.js
```

Production : **36 situations / 108 tours**.

Baseline historique protégée : `real-life-data-2.js` correspond à **v1.17.0 — Build 24 — Real Life French II**, avec **28 situations / 84 tours** avant Pack III.

---

# État et sécurité

Clés pédagogiques existantes inchangées :

```text
francais-avec-luc:learner:v1
french-tranquille:scenarios:v1
french-tranquille:listening:v1
french-tranquille:learning-memory:v1
french-tranquille:safety:pre-build22:v1
```

Build 26.8 ne crée aucune migration.

Sanctuaires byte-identiques :

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

---

# CI production Build 26.8

Le tribunal fonctionnel comporte **14 workflows**.

Build 26.8 ajoute :

- focus Details desktop ;
- focus Curriculum desktop ;
- round-trip avec restauration de 5 lignes ;
- focus mobile sans overflow ;
- containment 26.6 obligatoire.

Preuves :

```text
PR #56 / head c919262...     14/14 SUCCESS
main 1084e1d7...             14/14 SUCCESS
GitHub Pages #112             SUCCESS
```

# Dette / suite

Build 26.8 est **PROD / CLOS**. Le gate iPhone Voice Replay Build 26.1 reste ouvert. Les prochains gros jalons restent Data & Recovery Hardening, iPhone/PWA/Accessibility Hardening, puis Architecture Hardening avant V2.0.0.
