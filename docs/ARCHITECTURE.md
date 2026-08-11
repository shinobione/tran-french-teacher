# French Trân’quille — ARCHITECTURE

## Vue générale

```text
iPhone / Safari / PWA
        ↓
UX Shell simple
        ↓
Progression UX + Session UX + Details Dashboard + Voice Replay
        ↓
moteurs pédagogiques locaux
        ↓
localStorage + Web APIs navigateur
```

PWA statique GitHub Pages, sans backend obligatoire ni API payante.

## Principe produit

La complexité appartient aux moteurs ; Trân voit d’abord l’information utile pour décider quoi faire.

---

# Runtime production — v1.19.1 Build 26.1

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
build-meta.js
```

CSS additif :

```text
voice-replay.css
progress-details-dashboard.css
```

Production commit : `8ad7e5eb9cb2f64c58c086847c3e035463ab3ba3` — PR #40 — Pages #98 SUCCESS.

---

# Baselines canoniques conservées

## Progression UX — Build 25

`progression-ux.js` orchestre `Parcours` sans persister de données : résumé apprenant, détails repliables, 5 lignes curriculum visibles par défaut, 40 accessibles à la demande.

## Listening — Build 25.1

```text
normal request 0.88 → effectif 0.88
slow request   0.68 → effectif 0.64
```

Le bridge vit dans `build-meta.js`. `voice-ios.js`, voix et pitch sont inchangés.

## Session UX — Build 25.2

Chaque moteur conserve ses écritures ; `session-ux.js` observe et orchestre `objectif / progression / fin / sortie`. Scenario reste borné à **1 situation par session**.

---

# Build 26 — Real Life French III — PROD / INTACT

## Insertion runtime

```text
scenario-data.js
real-life-data.js
real-life-data-2.js
real-life-data-3.js   ← 8 scènes / 24 tours
scenario-host.js
scenario-engine.js
real-life-ux.js       ← catalogue max 6 ouverts visibles
real-life-coach.js    ← note semi-libre Pack III
session-ux.js         ← contrat 1 situation
```

`real-life-data-3.js` enrichit le tableau `FrenchTranquilleScenarioData.scenarios` avant le démarrage du host/engine. Il ne crée aucune nouvelle clé localStorage.

Les réponses semi-libres restent déterministes : plusieurs variantes explicitement listées, aucune classification sémantique libre.

Production : **36 situations / 108 tours**, **15 résolutions Memory avancées**, 0 ambiguïté.

Build 26.1 ne modifie ni `real-life-data-3.js`, ni `real-life-coach.js`, ni le Scenario Engine.

Baseline historique protégée : `real-life-data-2.js` / **v1.17.0 Build 24**, Scenario **28 / 84** avant Pack III.

---

# Voice Self-Playback — Build 26.1 — PROD / gate iPhone terrain

## Position dans le runtime

`voice-replay.js` est une **couche additive après résultat vocal** :

```text
free-voice.js
   ↓ réponse reconnue / persistée normalement
.free-voice-result
   ↓
voice-replay.js
   ↓ prise locale volontaire secondaire
MediaRecorder
   ↓
Blob URL temporaire
   ↓
Audio(blobUrl)
```

Il ne patch pas `SpeechRecognition`, `free-voice.js` ou `voice-ios.js`.

## Pourquoi une seconde prise

Le Web Speech API fournit le résultat de reconnaissance, mais pas un flux audio brut réutilisable par l’application. Build 26.1 évite également de demander un second accès micro tant que Free Voice indique encore que la reconnaissance est active.

Une fois la reconnaissance terminée, Trân peut répéter la même phrase pour s’écouter.

Cette architecture est déployée, mais le parcours réel `reconnaissance → seconde prise → lecture → reconnaissance suivante` doit encore être confirmé sur l’iPhone de Trân avant d’être considéré comme baseline terrain.

La capture simultanée exacte du premier essai reste hors scope.

## Capture / confidentialité

```text
navigator.mediaDevices.getUserMedia({audio:true})
        ↓
MediaRecorder
        ↓
Blob mémoire
        ↓
URL.createObjectURL(blob)
```

Garde-fous :

- feature detection ;
- aucun upload réseau ;
- aucun `localStorage.setItem` ;
- aucun événement Learning Memory / Error / Mastery / Session ;
- arrêt automatique après 9 s ;
- `MediaStreamTrack.stop()` à la fin ;
- `URL.revokeObjectURL()` au changement d’exercice / fermeture ;
- en cas d’échec de capture, la reconnaissance pédagogique reste intacte ;
- rendu idempotent par signature pour éviter les boucles `MutationObserver`.

---

# Learning Details Dashboard — Build 26.1 — PROD

Build 25 a créé `details.progress-ux-details`. Build 26.1 travaille **à l’intérieur** de cette frontière.

Avant :

```text
Détails d’apprentissage
├── Learning Memory
├── Error Intelligence
├── Mastery
├── A1 Mastery
├── Listening
├── Scenario / Real Life
├── Adaptive Language
└── ...
```

Après :

```text
Détails d’apprentissage
└── Dashboard
    ├── 🧠 Mémoire & révisions
    ├── 🎯 Maîtrise
    ├── 🎧 Compréhension orale
    ├── 🎭 Français réel
    └── 🧩 A1 & rythme
          ↓
       1 panel visible
```

## Classification

```text
memory    → Memory + Error
mastery   → Mastery + A1 Mastery
listening → Listening
real-life → Scenario / Real Life
path      → Stage2 / Stage3 / Adaptive / Daily / A1 path
other     → futur contenu non classifié
```

Aucune carte n’est clonée ou supprimée. Le dashboard déplace les **vrais nœuds DOM existants** dans `.progress-detail-panel-cards`, eux-mêmes toujours descendants de `.progress-layout`.

Les anciens moteurs continuent donc à retrouver et mettre à jour leurs cartes via leurs sélecteurs descendants.

## Anti-boucle

- signature de rendu ;
- panels réutilisés ;
- observer `childList` seulement ;
- orchestration au `requestAnimationFrame` ;
- aucune persistance.

---

# Practice Hub / Daily Coach / Milestones

Build 25.2 reste inchangé : un seul moteur dominant dans Practice, deux actions principales sur Home, milestones non pédagogiques et succès avec reduced motion.

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

Curriculum : **40 leçons / 241 éléments**. Scenario Build 26 : **36 / 108**.

Build 26.1 ne crée aucune nouvelle clé de donnée apprenante.

---

# Voice / branding — sanctuaires

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

---

# CI Build 26.1 — production

Contrats validés sur PR #40 puis `main` :

1. quality historique ✅ ;
2. Options ✅ ;
3. nav/mobile ✅ ;
4. Progression UX ✅ ;
5. Listening-rate 0.88 / 0.64 ✅ ;
6. Session UX ✅ ;
7. Real Life French III ✅ ;
8. Voice replay + Details dashboard ✅ ;
9. hashes branding/voice ✅ ;
10. profil l8 ✅ ;
11. aucune fatal card ✅ ;
12. GitHub Pages #98 ✅.

Le workflow Build 26 Real Life French III est désormais durable : il vérifie les fichiers/markers Build 26 et le comportement **36 / 108**, sans figer la version globale à `1.19.0`.

Le smoke 26.1 teste le replay comme composant isolé ; navigation et Practice Hub restent testés par leurs propres contrats, ce qui évite une dépendance de timing artificielle entre plusieurs couches UI.

# Dette / gate terrain

Le dashboard est une baseline production. L’auto-écoute reste **production déployée mais terrain iPhone non confirmée** jusqu’au test réel de Trân.

`app.js` reste monolithique par choix de sécurité. Son extraction est réservée à Architecture Hardening.