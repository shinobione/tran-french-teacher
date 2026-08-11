# French Trân’quille — ARCHITECTURE

## Vue générale

```text
iPhone / Safari / PWA
        ↓
UX Shell simple
        ↓
Progression UX + Session UX + Build 26.3 Interaction layer
        ↓
Details Dashboard + Voice Replay
        ↓
moteurs pédagogiques locaux
        ↓
localStorage + Web APIs navigateur
```

PWA statique GitHub Pages, sans backend obligatoire ni API payante.

## Principe produit

La complexité appartient aux moteurs ; Trân voit d’abord l’information utile pour décider quoi faire.

---

# Runtime production — v1.19.3 Build 26.3

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
build-meta.js
```

CSS additif pertinent :

```text
progression-ux.css
session-ux.css
voice-replay.css
progress-details-dashboard.css
build26-3-ux.css
```

Production runtime : `5947149e9fcb3b387aa01a797607270edb4f100e` — PR #44 — GitHub Pages #101 SUCCESS.

---

# Build 26.3 — Interaction Stability

## Cause racine Today

Avant Build 26.3, la même surface était composée par plusieurs couches :

```text
daily-coach.js
    ↓ crée .daily-step
listening-engine.js
    ↓ injecte Écouter dans .daily-steps
session-ux.js
    ↓ déplace les boutons dans <details>
    ↓ les remet ensuite dans .daily-steps
    ↓ supprime/recrée le disclosure
```

Listening et Session UX observent tous deux les mutations `childList`. Un contrôle visible pouvait donc être remplacé entre son feedback `pointerdown` et le `click` final.

Le symptôme terrain était cohérent :

- `Continuer le parcours` était structurellement fiable car il résolvait directement le vrai bouton de leçon ;
- `Révision mémoire` pouvait avoir le feedback visuel mais perdre la navigation ;
- `Écouter 3 minutes` et `Voir les autres activités` pouvaient être inertes ou visuellement différents.

## Couche `build26-3-ux.js`

Cette couche **n’est pas un nouveau moteur pédagogique**. Elle orchestre uniquement la surface Today et le placement Progress.

```text
DailyCoach.plan()
      ↓
Build26.3 surface stable
      ├── 2 actions principales .daily-step
      ├── proxy Listening caché
      └── extras hors .daily-steps
```

### Contrat Today

- exactement 2 actions principales directes dans `.daily-steps` ;
- activités secondaires dans `.b263-daily-extras` ;
- proxy Listening caché avec `data-listening-open`, sans classe `.daily-step` ;
- `Voir les autres activités` = vrai `<button>` avec `aria-expanded` ;
- routage en phase capture :
  - Review → bus de compatibilité bottom-nav ;
  - Lesson → vrai `[data-open-lesson]` ;
  - Conversation → bus de compatibilité conversation ;
  - Listening → `FrenchTranquilleListening.open()` ;
- aucune écriture learner / Memory / Scenario / Listening.

### Idempotence

La couche ne réécrit un label, un attribut, un état `hidden` ou un dataset que si la valeur doit réellement changer. Ce contrat est important car l’application conserve plusieurs `MutationObserver` historiques.

`daily-coach.js` reste la source du plan ; Build 26.3 conserve sa signature legacy afin qu’il ne reconstruise pas la surface quand le plan n’a pas changé.

---

# Build 26.3 — Progress Layout

L’objectif est de réorganiser **les nœuds existants**, pas de recréer les moteurs.

Structure historique simplifiée :

```text
.progress-layout
├── div historique
│   ├── .progress-ux-overview
│   └── .progress-ux-details
└── .progress-ux-curriculum
```

Build 26.3 applique :

```css
.progress-layout > div:first-child { display: contents; }
```

Les descendants deviennent donc des items du CSS Grid principal sans clone ni migration DOM.

## Desktop / tablette large

```text
┌──────────────────────────┬─────────────────────────────┐
│ progress-ux-overview     │ progress-ux-details         │
│                          │ dashboard + groupe actif     │
├──────────────────────────┤                             │
│ progress-ux-curriculum   │ sticky / overflow auto      │
└──────────────────────────┴─────────────────────────────┘
```

`progress-ux-details` :

- ouvert par défaut au premier rendu desktop ;
- `position: sticky` ;
- `max-height` basé sur le viewport ;
- scroll interne ;
- header sticky.

## Mobile

Ordre conservateur :

```text
progress-ux-overview
↓
progress-ux-curriculum
↓
progress-ux-details (replié par défaut)
```

Le curriculum reste **5 / 40** visible par défaut.

Un `WeakSet` garde la notion de « premier rendu » afin que la couche responsive ne rouvre/referme pas sans cesse un panneau que l’utilisateur vient de manipuler.

---

# Progression UX — Build 25 + Build 26.2

`progression-ux.js` reste propriétaire du résumé, du curriculum compact et de la frontière `<details>`.

Build 26.2 a ajouté le toggle explicite/déterministe de `Détails d’apprentissage`. Build 26.3 ne remplace pas ce contrat : il change uniquement la **position responsive** de cette frontière.

---

# Learning Details Dashboard — Build 26.1

Toujours actif à l’intérieur de `.progress-ux-details` :

```text
🧠 memory    → Learning Memory + Error
🎯 mastery   → Mastery + A1 Mastery
🎧 listening → Listening
🎭 real-life → Scenario / Real Life
🧩 path      → Stage2 / Stage3 / Adaptive / Daily / A1
⋯ other      → futur contenu non classifié
```

Aucune carte n’est clonée. Les vrais nœuds DOM restent descendants de `.progress-layout` et continuent à être mis à jour par leurs moteurs.

---

# Listening — Build 25.1 + correction Build 26.2

Chaîne finale :

```text
normal request 0.88 → effectif 0.88
slow request   0.68 → bridge 0.65 → effectif 0.65
```

`voice-ios.js` accepte déjà les rates `>= 0.65`; il reste byte-identique. Le bridge vit dans `build-meta.js`.

---

# Session UX — Build 25.2

Les sessions restent bornées :

- Listening : 5 questions ;
- Révision : jusqu’à 5 éléments prioritaires ;
- Scenario : 1 situation ;
- vocal guidé : objectif borné sans modification de `free-voice.js`.

Build 26.3 ne change pas ces moteurs. Il stabilise seulement leurs entrées depuis Today.

---

# Real Life French III — Build 26

Ordre runtime :

```text
scenario-data.js
real-life-data.js
real-life-data-2.js
real-life-data-3.js
scenario-host.js
scenario-engine.js
real-life-ux.js
real-life-coach.js
session-ux.js
```

Production : **36 situations / 108 tours**.

Baseline historique protégée : `real-life-data-2.js` correspond à la phase **v1.17.0 — Build 24 — Real Life French II**, où Scenario comptait **28 situations / 84 tours** avant Pack III.

---

# Voice Self-Playback — Build 26.1

Architecture conservatrice :

```text
free-voice.js
   ↓ réponse reconnue normalement
.free-voice-result
   ↓
voice-replay.js
   ↓ seconde prise volontaire locale
MediaRecorder → Blob URL → Audio
```

Pas de capture simultanée du premier essai, pas d’upload, pas de persistance audio, pas d’événement pédagogique créé par le replay.

Gate restant : test réel iPhone `reconnaissance → seconde prise → lecture → reconnaissance suivante`.

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

Curriculum : **40 leçons / 241 éléments**.
Scenario : **36 situations / 108 tours**.

Build 26.3 ne crée aucune clé learner et ne migre aucun état.

# Voice / branding — sanctuaires

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

# CI Build 26.3 — production

PR #44 : **9 workflows fonctionnels / 9 SUCCESS**.

Le nouveau smoke Build 26.3 vérifie physiquement :

1. ouverture de `Voir les autres activités` ;
2. identité du même nœud toggle avant/après ;
3. clic `Écouter 3 minutes` → overlay Listening ;
4. clic `Révision mémoire` → écran Review ;
5. retour Home puis clic `Continuer le parcours` → écran Lesson ;
6. desktop `display: contents` + Details ouvert/sticky + dashboard présent ;
7. mobile Details replié + curriculum 5/40 ;
8. profil synthétique l8 inchangé.

Sur `main`, le premier passage de ce nouveau smoke a été sensible au timing Chrome ; le rerun sur le **même commit runtime** a passé Today, desktop et mobile. Les 9 contrats fonctionnels sont verts et GitHub Pages **#101 SUCCESS**.

# Dette / gate terrain

Le layout Progress et les interactions Today sont des baselines production. L’auto-écoute reste production déployée mais **terrain iPhone non confirmée**.

`app.js` reste monolithique par choix de sécurité. Son extraction est réservée à Architecture Hardening.