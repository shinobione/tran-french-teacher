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
Build 26.9 Focus Content Reliability
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

# Runtime production — v1.19.9 Build 26.9

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
build26-9-ux.js
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
build26-9-ux.css
```

Production runtime : `0b31eedb78daebd58dd9bdcb0a472d56250c8fff` — PR #58 — **15/15 workflows fonctionnels SUCCESS** — Pages **#114 SUCCESS**.

---

# Build 26.9 — Focus Content Reliability

## Problème révélé par la vidéo terrain

Build 26.8 mesurait correctement la surface du wrapper Focus, mais pas encore suffisamment ses **vrais enfants moteurs**.

Deux états pouvaient donc passer sous le radar :

```text
wrapper Focus ≈ 920 px
+ carte unique ≈ demi-largeur
```

ou :

```text
toolbar famille visible
+ famille active logique correcte
+ vraie carte moteur visuellement absente
```

Un resize/re-render pouvait ensuite faire réapparaître le contenu, ce qui confirmait que les données n’étaient pas perdues.

## Propriété d’état

`progress-details-dashboard.js` reste le propriétaire canonique de :

```text
activeKey = memory | mastery | listening | real-life | path | other | ''
```

Build 26.9 **ne crée pas un deuxième état métier**. Il observe le propriétaire et rend sa conséquence visuelle déterministe :

```text
activeKey
→ panel correspondant hidden=false
→ autres panels hidden=true
→ mesure du panel
→ mesure des vraies .card visibles
→ content-ready seulement si contenu réel rendu
```

Aucune carte Memory / Mastery / Listening / Scenario n’est reparentée par Build 26.9.

## Mesure de contenu réel

Le marqueur interne `data-b269-content-ready="1"` exige notamment :

- panneau actif réellement visible ;
- au moins une vraie `.card` visible ;
- largeur du panneau non nulle ;
- hauteur du panneau non nulle ;
- largeur de carte au-dessus du seuil utile ;
- une carte unique utilise réellement la surface au lieu de rester dans un seul track d’une grille 2 colonnes.

Les retries de stabilisation sont **bornés**. Ils ne modifient aucun état learner et ne fabriquent aucune carte.

## Géométrie Focus 26.9

Sur le viewport Chrome `1640×900` certifié :

```text
Memory      3 cartes  panel 918 px  carte max 452 px
Mastery     2 cartes  panel 918 px  carte max 452 px
Listening   1 carte   panel 918 px  carte     918 px
Real Life   1 carte   panel 918 px  carte     918 px
Path/A1     4 cartes  panel 918 px  carte max 452 px
```

Le CSS 26.9 garde donc une grille efficace pour les familles multi-cartes, mais force une carte unique à `grid-column: 1 / -1`.

À `<=1100 px`, les cartes Focus passent en une colonne.

## Tribunal 26.9

Le workflow dédié fait de vrais clics successifs :

```text
Mémoire → retour
Maîtrise → retour
Compréhension orale → retour
Français réel → retour
A1 & rythme → retour
```

Il exige pour chaque famille :

- focus Details actif ;
- famille propriétaire cohérente ;
- >= 1 vraie carte visible ;
- panneau >= 850 px sur desktop de certification ;
- hauteur réelle > 0 ;
- carte réelle >= 300 px ;
- si une seule carte : >= 700 px ;
- overflow horizontal = 0.

Un Chrome mobile `390×844` vérifie séparément une vraie carte Memory visible, une colonne et aucun overflow horizontal.

---

# Build 26.8 — Progress Focus Flow conservé

Le modèle d’état 26.8 reste canonique :

```text
progressDetailActive != vide
→ focus = details

curriculumExpanded == 1
→ focus = curriculum

sinon
→ focus = overview
```

### Focus Details

```text
.progress-layout
└── .progress-ux-composition        ← frontière DOM conservée
    ├── .progress-ux-left-flow      ← masqué pendant focus
    └── .progress-ux-details        ← surface Focus
        └── dashboard
            ├── grille familles     ← masquée
            └── panneau actif       ← visible
```

### Focus Curriculum

```text
.progress-layout
└── .progress-ux-composition
    ├── .progress-ux-left-flow
    │   ├── Overview               ← masqué
    │   └── Curriculum             ← visible pleine surface
    └── Details                    ← masqué
```

Sorties propriétaires :

```text
Retour Details
→ FrenchTranquilleProgressDetailsDashboard.close()
→ decorate()

Retour Curriculum
→ FrenchTranquilleProgressionUX.setCurriculumExpanded(false)
→ decorate()
```

Le round-trip `compact → Memory → retour → Curriculum → retour → 5 lesson rows` reste sous Chrome.

L’animation reste cosmétique : l’état logique est appliqué avant la fin du fade. `prefers-reduced-motion` retire le mouvement sans modifier le flux.

---

# Build 26.7 — garde géométrique toujours actif

Build 26.7 reste responsable de la géométrie sûre lorsque Détails est simplement ouvert dans la vue normale :

```text
1640×900 → flow 452 px / Details 452 px / lesson row min 410 px
980×900  → pile verticale / flow 906 px / lesson row min 864 px
```

Build 26.8/26.9 supersèdent seulement la présentation pendant un Focus actif.

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

Cette structure reste une **frontière de propriété**, pas seulement un choix visuel.

Contrat anti-prolifération :

```text
après quiescence = 12 cartes
3 secondes après = 12 cartes
engine cards      = uniques
forbidden cards   = 0
```

Build 26.9 ne modifie pas cette propriété DOM.

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

Baseline historique protégée : `real-life-data-2.js` correspond à **v1.17.0 — Build 24 — Real Life French II**, où Scenario comptait **28 situations / 84 tours** avant Pack III.

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

Build 26.9 ne crée aucune migration.

Sanctuaires byte-identiques :

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

---

# CI production Build 26.9

Le tribunal fonctionnel comporte **15 workflows**.

Build 26.9 ajoute la mesure du **vrai contenu rendu** de plusieurs familles, tout en conservant les anciens tribunaux 26.6, 26.7 et 26.8.

Preuves :

```text
PR #58 / head 0fcb2803...     15/15 SUCCESS
main 0b31eedb...             15/15 SUCCESS
GitHub Pages #114             SUCCESS
```

Sur le premier passage `main`, le smoke historique Build 26.3 a manqué uniquement sa destination Lesson dans sa fenêtre de temps. Le **même job, sans modification**, a été rerun et a passé Today + Progress desktop + Progress mobile. Aucun autre tribunal n’a échoué.

# Dette / suite

Build 26.9 est **PROD / CLOS**. Le gate iPhone Voice Replay Build 26.1 reste ouvert. Les prochains gros jalons restent Data & Recovery Hardening, iPhone/PWA/Accessibility Hardening, puis Architecture Hardening avant V2.0.0.
