# French Trân’quille — ARCHITECTURE

## Vue générale

```text
iPhone / Safari / PWA
        ↓
UX Shell simple
        ↓
Progression UX + Session UX + Build 26.3 Interaction layer
        ↓
Build 26.4 single-scroll + Tyffany compatibility layer
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

# Runtime candidate — v1.19.4 Build 26.4

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
build-meta.js
```

CSS additif pertinent :

```text
progression-ux.css
session-ux.css
voice-replay.css
progress-details-dashboard.css
build26-3-ux.css
build26-4-ux.css
```

Baseline production précédente : v1.19.3 / Build 26.3 — runtime `5947149e9fcb3b387aa01a797607270edb4f100e` — PR #44 — Pages #101 SUCCESS.

---

# Build 26.4 — propriété du scroll

## Problème observé

Build 26.3 a correctement créé le layout desktop 2 colonnes, mais avait donné à `.progress-ux-details` son propre viewport vertical :

```css
position: sticky;
max-height: calc(100vh - 36px);
overflow: auto;
```

Avec un groupe long comme Mastery, le résultat réel était :

```text
scrollbar de la page
+
scrollbar dans la carte Détails
```

Cette hiérarchie impose deux gestes de scroll concurrents sans nécessité pédagogique.

## Contrat Build 26.4

`build26-4-ux.css` ne détruit pas la grille Build 26.3. Il remplace uniquement la politique de scroll sur desktop :

```css
position: relative;
top: auto;
max-height: none;
overflow: visible;
overscroll-behavior: auto;
scrollbar-gutter: auto;
```

Le `summary` de la frontière Details redevient lui aussi statique dans le flux.

Conséquence :

- le document est l’unique propriétaire du scroll vertical ;
- la carte Details grandit avec le groupe actif ;
- les cartes pédagogiques restent les mêmes nœuds DOM ;
- aucun moteur ne reçoit de nouvelle responsabilité ;
- aucune donnée n’est migrée.

Mobile conserve le contrat Build 26.3 : Details replié et aucun changement de disposition.

---

# Build 26.4 — branding Tyffany sans migration

## Pourquoi une couche additive

Le nom initial `Lucie` est présent dans des chaînes historiques et dans des identifiants techniques vieux de plusieurs builds :

```text
LucieVoice
tran-french-teacher:luc-voice:v1
tran-french-teacher:luc-rate:v1
tran-french-teacher:luc-pitch:v1
lucie-* ids/classes
```

Ces identifiants contiennent des préférences locales et des contrats CI. Les renommer n’apporte aucune valeur à Trân et augmenterait le risque de perte de réglages.

Le nom produit visible devient donc **Tyffany** via `build26-4-ux.js`, sans migration interne.

## Pipeline de branding

```text
moteur historique rend du texte
        ↓
Build26.4 patch idempotent des text nodes
        ↓
Lucie visible → Tyffany visible
```

Attributs textuels sûrs également normalisés :

```text
aria-label
title
alt
placeholder
data-speak
```

Les `id`, `class`, clés localStorage et noms d’API ne sont **pas** renommés.

Le public export :

```text
FrenchTranquilleCurriculum.tutor = "Tyffany"
```

La couche expose aussi :

```text
FrenchTranquilleTeacher.name = "Tyffany"
```

## Speech synthesis

`voice-ios.js` reste byte-identique.

Build 26.4 enveloppe seulement la dernière fonction `speechSynthesis.speak` déjà composée par les couches existantes afin de remplacer l’ancien nom dans `utterance.text` lorsqu’il apparaît.

```text
"Je m'appelle Lucie"
        ↓
"Je m'appelle Tyffany"
        ↓
chaîne voix existante inchangée
```

Le choix de voix, le rate, le pitch et la reconnaissance vocale ne sont pas modifiés.

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

Cette couche n’est pas un moteur pédagogique. Elle orchestre Today et le placement Progress.

```text
DailyCoach.plan()
      ↓
Build26.3 surface stable
      ├── 2 actions principales .daily-step
      ├── proxy Listening caché
      └── extras hors .daily-steps
```

Contrat : nœuds stables, vrai bouton disclosure, routage explicite, rendu idempotent, aucune écriture learner/Memory/Scenario/Listening.

---

# Build 26.3 — structure Progress conservée

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

Les descendants deviennent des items du CSS Grid principal sans clone ni migration DOM.

## Desktop / tablette large

```text
┌──────────────────────────┬─────────────────────────────┐
│ progress-ux-overview     │ progress-ux-details         │
├──────────────────────────┤ dashboard + groupe actif    │
│ progress-ux-curriculum   │                             │
└──────────────────────────┴─────────────────────────────┘
```

Build 26.3 avait initialement ajouté sticky + scroll interne. Build 26.4 remplace uniquement cette partie.

## Mobile

```text
progress-ux-overview
↓
progress-ux-curriculum
↓
progress-ux-details (replié par défaut)
```

Le curriculum reste **5 / 40** visible par défaut.

---

# Progression UX — Build 25 + Build 26.2

`progression-ux.js` reste propriétaire du résumé, du curriculum compact et de la frontière `<details>`.

Build 26.2 a ajouté le toggle explicite/déterministe de `Détails d’apprentissage`. Les builds 26.3/26.4 ne remplacent pas ce contrat.

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

Baseline historique protégée : `real-life-data-2.js` correspond à **v1.17.0 — Build 24 — Real Life French II**, où Scenario comptait **28 situations / 84 tours** avant Pack III.

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

Build 26.4 ne crée aucune clé learner et ne migre aucun état.

# Voice / branding — sanctuaires

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

Le nom visible Tyffany est une couche de branding ; les identifiants historiques internes restent compatibles.

---

# CI candidate Build 26.4

Le workflow dédié vérifie :

1. version/cache/wiring 1.19.4 ;
2. hashes voix/branding inchangés ;
3. Tyffany visible dans le DOM apprenant ;
4. aucun Lucie visible après patch ;
5. tutor export = Tyffany ;
6. Progress l8 réellement ouvert ;
7. groupe Mastery réellement sélectionné ;
8. `overflow-y: visible` ;
9. `max-height: none` ;
10. aucun nested scroll ;
11. page elle-même scrollable ;
12. progression synthétique l8 intacte.

Le workflow Build 26.3 reste actif pour ses contrats Today et sa structure 2 colonnes, mais n’impose plus l’ancienne politique sticky comme invariant éternel.

# Dette / gate terrain

Build 26.4 ne modifie pas le gate iPhone de l’auto-écoute. `app.js` reste monolithique par choix de sécurité ; son extraction est réservée à Architecture Hardening.