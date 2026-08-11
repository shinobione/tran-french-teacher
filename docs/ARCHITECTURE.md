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
Build 26.5 Conversation exit + independent Progress columns
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

# Runtime production — v1.19.5 Build 26.5

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
build26-5-ux.css
```

Production runtime : `2cd29f20faa8db850f92c343074809cc91b42c76` — PR #49 — **11/11 workflows fonctionnels SUCCESS** — Pages **#106 SUCCESS**.

---

# Build 26.5 — Conversation : sortie déterministe

## Problème terrain

La surface `Changer de pratique` pouvait recevoir son feedback visuel sans réellement quitter la pratique guidée.

Le handler n’était pas absent : Session UX possédait déjà un listener global en capture. Mais Conversation reste une surface recomposée par plusieurs couches et `MutationObserver`. Dépendre uniquement d’un délégué global alors que le nœud visible peut être recréé reste fragile.

## Contrat 26.5

`session-ux.js` possède maintenant une transition explicite :

```text
setPracticeMode('scenario' | 'voice' | 'guided')
        ↓
practiceMode synchronisé
        ↓
decoratePractice()
        ↓
un seul mode visible
```

Le retour :

```text
Changer de pratique
        ↓ pointerup OU click
setPracticeMode(null)
        ↓
decoratePractice()
        ↓
practice hub
```

`build26-5-ux.js` lie aussi directement chaque contrôle visible `[data-session-practice-back]` :

```text
MutationObserver
   ↓ nouveau bouton retour
bind pointerup + click une seule fois
   ↓
FrenchTranquilleSessionUX.returnToPracticeHub()
```

Le dataset `data-b265-back-bound` empêche les doubles bindings.

Cette couche ne crée aucune donnée apprenante et ne modifie aucun moteur de reconnaissance vocale.

---

# Build 26.5 — Conversation : un mode actif = une colonne

Build 14 avait conçu :

```text
Free Voice | Pratique guidée
```

C’était cohérent lorsque les deux surfaces existaient ensemble.

Build 25.2 introduit ensuite un hub et un seul mode actif à la fois, mais la vieille grille continuait à forcer :

```css
#free-voice-card  → colonne 1
.conversation-card → colonne 2
```

Avec Free Voice caché :

```text
bouton retour | grand vide | carte guidée
```

Build 26.5 ajoute la règle tardive :

```css
.screen-conversation .narrow.session-practice-active-mode {
  display:grid;
  grid-template-columns:minmax(0,1fr);
}
```

Le hub et chaque mode actif utilisent une colonne centrée `min(820px, 100%)`. Le bouton retour et la carte active partagent la même colonne.

Le nom produit et le label du mode sont aussi séparés visuellement :

```text
Tyffany
Pratique guidée
```

et non `TyffanyPratique guidée`.

---

# Build 26.5 — Progress : colonnes structurellement indépendantes

## Avant 26.5

Build 26.3 avait construit visuellement :

```text
Résumé      | Details
Curriculum  | Details
```

avec l’implémentation historique :

```css
.progress-layout > div:first-child { display: contents; }
```

Le panneau `Details` couvrait donc les deux lignes de la grille.

Build 26.4 a ensuite correctement retiré son scroll interne :

```css
max-height:none;
overflow:visible;
```

Mais un groupe très haut comme Mastery pouvait alors contribuer à la hauteur intrinsèque des deux lignes et créer un énorme espace entre le Résumé et le Curriculum à gauche.

## Après 26.5

La composition devient :

```text
.progress-layout
├── div historique = colonne gauche
│   ├── .progress-ux-overview
│   └── .progress-ux-curriculum
└── .progress-ux-details
```

Desktop :

```text
┌──────────────────────────┬─────────────────────────────┐
│ left wrapper             │ details                     │
│  ├─ overview             │ dashboard                   │
│  └─ curriculum           │ groupe actif                │
└──────────────────────────┴─────────────────────────────┘
```

Le wrapper gauche redevient un vrai grid container local :

```css
.progress-layout > div:first-child {
  display:grid;
  grid-template-columns:minmax(0,1fr);
  gap:16px;
}
```

Le panneau droit est un enfant direct de `.progress-layout`.

Conséquences :

- la hauteur de Details n’influence plus le gap Overview → Curriculum ;
- le Chrome 26.5 exige un gap réel **0–48 px** même avec Mastery ouvert ;
- aucun clone de carte ;
- aucun déplacement de donnée ;
- Build 26.4 single-scroll reste intact.

### Mobile

```text
colonne gauche
  ├─ Overview
  └─ Curriculum compact 5/40
↓
Details replié
```

Le test Chrome 390×844 vérifie l’ordre réel des rectangles et l’état fermé de Details.

---

# Build 26.4 — propriété du scroll conservée

Build 26.3 avait initialement :

```css
position: sticky;
max-height: calc(100vh - 36px);
overflow: auto;
```

Build 26.4 impose :

```css
position: relative;
top: auto;
max-height: none;
overflow: visible;
overscroll-behavior: auto;
scrollbar-gutter: auto;
```

Contrat toujours valide en Build 26.5 :

```text
overflow-y = visible
max-height = none
nested scroll = 0
page scrollable = 1
single scroll = 1
```

La page reste l’unique propriétaire du scroll vertical.

---

# Build 26.4 — branding Tyffany sans migration

Le nom initial `Lucie` reste présent dans des identifiants historiques :

```text
LucieVoice
tran-french-teacher:luc-voice:v1
tran-french-teacher:luc-rate:v1
tran-french-teacher:luc-pitch:v1
lucie-* ids/classes
```

Ils sont conservés. `build26-4-ux.js` normalise uniquement le branding visible :

```text
Lucie visible → Tyffany visible
FrenchTranquilleCurriculum.tutor = "Tyffany"
FrenchTranquilleTeacher.name = "Tyffany"
```

Attributs textuels sûrs : `aria-label`, `title`, `alt`, `placeholder`, `data-speak`.

`voice-ios.js` reste byte-identique ; la couche 26.4 normalise uniquement l’ancien nom dans le texte envoyé à `speechSynthesis.speak`.

---

# Build 26.3 — Interaction Stability conservée

Today reste orchestré par `build26-3-ux.js` :

```text
DailyCoach.plan()
      ↓
Build26.3 surface stable
      ├── 2 actions principales
      ├── proxy Listening caché
      └── extras hors zone legacy
```

Nœuds stables, vrai bouton disclosure, routage explicite, rendu idempotent, aucune écriture learner/Memory/Scenario/Listening.

L’intention visuelle 2 colonnes de Progress reste protégée, mais **l’implémentation `display:contents` est supersédée par Build 26.5**.

---

# Progression UX — Build 25 + 26.2 + 26.5

`progression-ux.js` reste propriétaire :

- résumé ;
- curriculum compact ;
- frontière `<details>` ;
- toggle explicite Build 26.2 ;
- composition DOM indépendante Build 26.5.

Le curriculum reste 5/40 par défaut et 40/40 accessible.

---

# Learning Details Dashboard — Build 26.1

Toujours actif dans `.progress-ux-details` :

```text
🧠 memory    → Learning Memory + Error
🎯 mastery   → Mastery + A1 Mastery
🎧 listening → Listening
🎭 real-life → Scenario / Real Life
🧩 path      → Stage2 / Stage3 / Adaptive / Daily / A1
⋯ other      → futur contenu non classifié
```

Aucune carte n’est clonée. Les vrais nœuds historiques restent descendants de `.progress-layout` et continuent d’être mis à jour par leurs moteurs.

---

# Listening — Build 25.1 + correction Build 26.2

```text
normal request 0.88 → effectif 0.88
slow request   0.68 → bridge 0.65 → effectif 0.65
```

`voice-ios.js` accepte déjà les rates `>=0.65` et reste byte-identique.

---

# Session UX — Build 25.2 + 26.5

Sessions bornées :

- Listening : 5 questions ;
- Révision : jusqu’à 5 éléments prioritaires ;
- Scenario : 1 situation ;
- vocal guidé : objectif borné.

Build 26.5 ne change pas ces objectifs ; il fiabilise le changement de mode et la sortie Conversation.

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

Build 26.5 ne crée aucune clé learner et ne migre aucun état.

# Voice / branding — sanctuaires

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

Tyffany est le nom produit visible ; les identifiants historiques internes restent compatibles.

---

# CI Build 26.5 — production

Le tribunal fonctionnel comporte désormais **11 workflows**.

Le nouveau workflow 26.5 vérifie en Chrome :

1. Guided Practice visible seul ;
2. bouton retour et carte active sur la même colonne ;
3. `pointerup` retourne au hub ;
4. `.click()` retourne au hub ;
5. Details enfant direct de Progress ;
6. Curriculum enfant de la colonne gauche ;
7. gap Overview→Curriculum **0–48 px** avec Mastery long ;
8. desktop côte à côte ;
9. nested scroll = 0 ;
10. page scrollable ;
11. profil l8 = 7 terminées / 40 acquis ;
12. mobile Overview→Curriculum→Details ;
13. mobile Details fermé ;
14. mobile curriculum 5/40.

CI durable :

- Session UX et Progression UX ne figent plus le query-string exact du fichier propriétaire ;
- Build 26.4 protège son propre layer + ses comportements sans imposer la version globale ;
- Build 26.3 protège Today et l’intention 2 colonnes sans imposer `display:contents` ;
- Build 26.1 lance ses Chrome dans des profils isolés avec retries et timeout borné.

Preuves runtime :

```text
PR #49                     11/11 SUCCESS
main 2cd29f20...            11/11 SUCCESS
GitHub Pages #106           SUCCESS
```

# Dette / gate terrain

Build 26.5 est **PROD / CLOS**. Le gate iPhone de l’auto-écoute Build 26.1 reste ouvert. `app.js` reste monolithique par choix de sécurité ; son extraction est réservée à Architecture Hardening.
