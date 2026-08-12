# French Trân’quille — ARCHITECTURE

## Vue générale

```text
iPhone / Safari / PWA
        ↓
UX Shell simple
        ↓
Progression UX + Session UX
        ↓
Build 26.3 Interaction layer
        ↓
Build 26.4 single-scroll + Tyffany
        ↓
Build 26.5 Conversation exit
        ↓
Build 26.6 Progress containment + staged curriculum
        ↓
Details Dashboard + Voice Replay
        ↓
moteurs pédagogiques locaux
        ↓
localStorage + Web APIs navigateur
```

PWA statique GitHub Pages, sans backend obligatoire ni API payante.

Principe produit : **la complexité appartient aux moteurs ; Trân voit d’abord l’information utile pour décider quoi faire.**

---

# Runtime production — v1.19.6 Build 26.6

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
build26-6-ux.css
```

Production runtime : `7bb48979f21db0cf1cc94d7a9e03e225f2e1cc7a` — PR #52 — **12/12 workflows fonctionnels SUCCESS** — Pages **#108 SUCCESS**.

---

# Build 26.6 — frontière de propriété Progress

## Régression terrain

Après Build 26.5, le compteur `Autres détails` pouvait augmenter continuellement sans interaction jusqu’à plusieurs centaines de cartes.

Plusieurs moteurs historiques créent leur carte Progress avec une logique de ce type :

```js
const column = document.querySelector('.screen-progress .progress-layout > div:first-child');
if (!column || column.querySelector('.memory-progress-card')) return;
```

La première colonne n’est donc pas seulement un choix visuel : elle sert historiquement de **frontière de propriété DOM**.

Build 26.5 avait rendu `Détails` frère direct de cette colonne :

```text
progress-layout
├── colonne gauche
└── Details
```

Une carte déplacée dans Details quittait alors la frontière recherchée par son moteur :

```text
moteur ne trouve plus sa carte
→ crée une nouvelle carte
→ Progression la déplace dans Details
→ moteur ne la trouve toujours pas
→ boucle MutationObserver
```

## Composition 26.6

Build 26.6 conserve la frontière historique tout en gardant l’indépendance visuelle :

```text
.progress-layout
└── .progress-ux-composition        ← div:first-child historique
    ├── .progress-ux-left-flow
    │   ├── .progress-ux-overview
    │   └── .progress-ux-curriculum
    └── .progress-ux-details
```

Desktop :

```text
.progress-ux-composition
┌──────────────────────────┬─────────────────────────────┐
│ progress-ux-left-flow    │ progress-ux-details        │
│  ├─ overview             │ dashboard                  │
│  └─ curriculum           │ groupe actif               │
└──────────────────────────┴─────────────────────────────┘
```

Conséquences :

- Memory / Mastery / Error / Stage 2 / Stage 3 retrouvent leurs cartes existantes ;
- la droite reste visuellement indépendante de la hauteur du flux gauche ;
- Overview → Curriculum reste compact ;
- Build 26.4 single-scroll reste intact ;
- aucune migration ou réécriture des moteurs historiques.

### Contrat temporel

Le smoke 26.6 attend cinq mesures consécutives identiques avant de considérer le dashboard à quiescence. Il observe ensuite encore la page.

Profil synthétique l8 certifié :

```text
initial après quiescence = 12 cartes
3 secondes plus tard     = 12 cartes
Autres détails           = 1
forbidden cards          = 0
engine cards uniques     = oui
```

Le vieux comportement de prolifération ne peut pas atteindre ce contrat.

---

# Learning Details Dashboard — Build 26.1 + containment 26.6

Familles :

```text
🧠 memory    → Learning Memory + Error + Éléments appris
🎯 mastery   → Mastery + A1 Mastery
🎧 listening → Listening
🎭 real-life → Scenario / Real Life
🧩 path      → Stage2 / Stage3 / Adaptive / Daily / A1
⋯ other      → futur contenu non classifié
```

Build 26.6 ajoute :

- `data-progress-detail-family` comme propriété stable ;
- classification structurelle prioritaire ;
- une carte déjà possédée n’est plus reclassée à cause d’un changement de texte ;
- Overview / Curriculum sont interdits dans Details ;
- récupération défensive vers `progress-ux-left-flow` si une carte interdite y entre ;
- API `state()` exposant les comptes par famille pour le tribunal temporel.

Les cartes ne sont jamais clonées : les vrais nœuds historiques continuent d’être alimentés par leurs moteurs.

---

# Curriculum Progress — Build 25 + Humanization 26.6

Vue normale : **5 lignes** autour de la leçon courante.

La vue complète ne signifie plus `40 lignes simultanées`. Elle expose cinq étapes :

```text
1. Survie A0          1–7
2. Vie quotidienne    8–15
3. Fondations A1      16–20
4. Premiers échanges  21–25
5. A1 Core            26–40
```

Une seule étape affiche ses `.lesson-row` à la fois.

Contrats Chrome :

```text
profil l8 → étape courante = 8 lignes
clic A1 Core → 15 lignes
progressTotalRows = 40
progressStageCount = 5
```

Les changements d’étape sont flushés dans le même geste utilisateur afin de ne pas dépendre d’un futur `requestAnimationFrame` pour devenir visuellement cohérents.

---

# Build 26.5 — Conversation Exit conservé

`session-ux.js` possède la transition explicite :

```text
setPracticeMode('scenario' | 'voice' | 'guided')
        ↓
un seul mode visible

Changer de pratique
        ↓ pointerup OU click
setPracticeMode(null)
        ↓
practice hub
```

`build26-5-ux.js` lie directement le contrôle `[data-session-practice-back]` et évite les doubles bindings.

Conversation active reste une seule colonne centrée. `Tyffany` et `Pratique guidée` restent séparés visuellement.

### Progress 26.5 : ce qui est supersédé

L’intention 26.5 reste valide : Overview/Curriculum ne doivent pas être étirés par un Details très haut.

En revanche, l’implémentation historique :

```text
progress-layout
├── left
└── Details direct sibling
```

est **supersédée par Build 26.6**, car elle cassait la frontière de propriété des moteurs. L’indépendance visuelle est désormais assurée dans `.progress-ux-composition`.

---

# Build 26.4 — single-scroll + Tyffany

Contrat toujours valide :

```text
overflow-y = visible
max-height = none
nested scroll = 0
page scrollable = 1
single scroll = 1
```

Tyffany est le nom visible. Les identifiants historiques restent volontairement compatibles :

```text
LucieVoice
tran-french-teacher:luc-voice:v1
tran-french-teacher:luc-rate:v1
tran-french-teacher:luc-pitch:v1
lucie-* ids/classes
```

`voice-ios.js` reste byte-identique.

---

# Build 26.3 — Interaction Stability

Today reste orchestré par `build26-3-ux.js` avec nœuds stables, routage explicite et rendu idempotent.

L’intention visuelle 2 colonnes Progress reste valide ; l’ancienne implémentation `display:contents` est historique.

---

# Listening — Build 25.1 + correction Build 26.2

```text
normal request 0.88 → effectif 0.88
slow request   0.68 → bridge 0.65 → effectif 0.65
```

`voice-ios.js` accepte déjà les rates `>=0.65` et reste byte-identique.

---

# Session UX — Build 25.2

Sessions bornées :

- Listening : 5 questions ;
- Révision : jusqu’à 5 éléments prioritaires ;
- Scenario : 1 situation ;
- vocal guidé : objectif borné.

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

Build 26.6 ne crée aucune clé learner et ne migre aucun état.

## Voice / branding — sanctuaires

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

---

# CI Build 26.6 — production

Le tribunal fonctionnel comporte **12 workflows**.

Le workflow dédié 26.6 vérifie :

1. syntaxe / wiring / cache v1.19.6 ;
2. sanctuaires byte-identiques ;
3. Details dans la frontière historique ;
4. Overview/Curriculum hors Details ;
5. quiescence puis cardinalité stable ;
6. bornage `Autres détails` ;
7. unicité des cartes moteur ;
8. vrai clic `Voir tout le parcours` ;
9. 5 étapes ;
10. vrai clic A1 Core ;
11. 40 leçons accessibles, 15 max dans A1 Core ;
12. dashboard stable après navigation ;
13. mobile 5/40 + Details replié.

Les workflows historiques Build 25, 26.1, 26.3, 26.4 et 26.5 sont version-forward lorsqu’un fichier propriétaire évolue mais continuent à protéger leurs comportements.

Preuves runtime :

```text
PR #52 / head b43eca2c...     12/12 SUCCESS
main 7bb48979...              12/12 SUCCESS
GitHub Pages #108             SUCCESS
```

# Dette / gate terrain

Build 26.6 est **PROD / CLOS**. Le gate iPhone de l’auto-écoute Build 26.1 reste ouvert. `app.js` reste monolithique par choix de sécurité ; son extraction est réservée à Architecture Hardening.
