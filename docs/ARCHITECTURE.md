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

# Runtime production — v1.19.2 Build 26.2

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

Production commit : `4d1d224aa4eb6612fe6b0dc997f3871bbb502317` — PR #42 — Pages #100 SUCCESS.

---

# Build 26.2 — Click + Listening Rate Hotfix

## Toggle déterministe de `Détails d’apprentissage`

Build 25 avait créé :

```html
<details class="progress-ux-details">
  <summary>…</summary>
  …
</details>
```

Build 26.1 a installé son dashboard à l’intérieur. Le retour vidéo Build 26.2 a montré que le `summary` pouvait recevoir le clic sans provoquer une ouverture fiable dans le runtime composé de plusieurs couches DOM/MutationObserver.

Le contrat devient explicite :

```text
click summary
   ↓ capture document
preventDefault()
   ↓
toggleDetails(details)
   ↓
details.open = !details.open
   ↓
progressDetailsOpen + progressDetailsManualToggle
```

Le dashboard n’est pas réimplémenté. `progression-ux.js` contrôle uniquement l’ouverture de sa frontière `<details>`.

Le smoke Progression lance un vrai Chrome, ferme le panneau, clique réellement le `summary` puis exige l’état ouvert.

## Listening : séparation entre rate demandé et rate réellement appliqué

Chaîne historique :

```text
listening-engine.js
slow button → utterance.rate = 0.68
          ↓
build-meta.js bridge
0.68 → tentative 0.64
          ↓
voice-ios.js
currentRate() accepte seulement >= 0.65
          ↓
0.64 rejeté → fallback ~0.84
```

Le bug terrain venait donc d’un **rate final différent du rate attendu**. Le moteur et le bridge portaient bien des valeurs différentes, mais la dernière couche annulait cette différence.

Build 26.2 ne modifie pas `voice-ios.js`. Il utilise son plancher existant :

```text
normal request 0.88 → effectif 0.88
slow request   0.68 → bridge 0.65 → effectif 0.65
```

Cela préserve la voix, le pitch, la reconnaissance et les hashes sanctuarisés tout en rendant le mode lent réellement audible.

Contrat CI :

- `data-listening-normal-rate="0.88"` ;
- `data-listening-slow-rate="0.65"` ;
- `data-listening-engine-slow-rate="0.68"` ;
- `voice-ios.js` doit toujours exposer son plancher `n>=.65` et conserver son hash ;
- Session UX 5/5 doit finir avec le même contrat `0.65`.

---

# Baselines canoniques conservées

## Progression UX — Build 25

`progression-ux.js` orchestre `Parcours` sans persister de données : résumé apprenant, détails repliables, 5 lignes curriculum visibles par défaut, 40 accessibles à la demande.

Build 26.2 ajoute uniquement un contrat de clic explicite à la frontière des détails.

## Listening — Build 25.1 + correction Build 26.2

```text
normal request 0.88 → effectif 0.88
slow request   0.68 → effectif 0.65
```

Le bridge vit dans `build-meta.js`. `voice-ios.js`, voix et pitch sont inchangés.

## Session UX — Build 25.2

Chaque moteur conserve ses écritures ; `session-ux.js` observe et orchestre `objectif / progression / fin / sortie`. Scenario reste borné à **1 situation par session**. Listening reste une session de 5 questions.

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

Build 26.2 ne modifie ni Real Life III ni le Scenario Engine.

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

Le Web Speech API fournit le résultat de reconnaissance, mais pas un flux audio brut réutilisable par l’application. Build 26.1 évite donc de demander un second accès micro tant que Free Voice indique encore que la reconnaissance est active.

Une fois la reconnaissance terminée, Trân peut répéter la même phrase pour s’écouter.

Cette architecture est déployée, mais le parcours réel `reconnaissance → seconde prise → lecture → reconnaissance suivante` doit encore être confirmé sur l’iPhone de Trân avant d’être considéré comme baseline terrain.

La capture simultanée exacte du premier essai reste hors scope.

Garde-fous : feature detection, aucun upload réseau, aucun `localStorage.setItem`, aucun événement Learning Memory / Error / Mastery / Session, arrêt automatique après 9 s, pistes stoppées, Blob URL révoquée et rendu idempotent.

---

# Learning Details Dashboard — Build 26.1 — PROD

Build 25 a créé `details.progress-ux-details`. Build 26.1 travaille **à l’intérieur** de cette frontière ; Build 26.2 fiabilise le clic sur la frontière elle-même.

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

Classification :

```text
memory    → Memory + Error
mastery   → Mastery + A1 Mastery
listening → Listening
real-life → Scenario / Real Life
path      → Stage2 / Stage3 / Adaptive / Daily / A1 path
other     → futur contenu non classifié
```

Aucune carte n’est clonée ou supprimée. Le dashboard déplace les **vrais nœuds DOM existants** dans des panels toujours descendants de `.progress-layout`.

Anti-boucle : signature de rendu, panels réutilisés, observer `childList`, orchestration au `requestAnimationFrame`, aucune persistance.

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

Curriculum : **40 leçons / 241 éléments**. Scenario : **36 / 108**.

Build 26.2 ne crée aucune clé de donnée apprenante et ne migre aucun état.

---

# Voice / branding — sanctuaires

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

---

# CI Build 26.2 — production

Contrats validés sur PR #42 puis `main` :

1. quality historique ✅ ;
2. Options ✅ ;
3. nav/mobile ✅ ;
4. Progression UX + clic réel Détails ✅ ;
5. Listening-rate 0.88 / 0.65 ✅ ;
6. Session UX ✅ ;
7. Real Life French III ✅ ;
8. Voice replay + Details dashboard ✅ ;
9. hashes branding/voice ✅ ;
10. profil l8 ✅ ;
11. aucune fatal card ✅ ;
12. GitHub Pages #100 ✅.

Les workflows Build 26 et Build 26.1 sont durables : ils protègent leurs sous-systèmes sans figer la version globale et peuvent donc survivre aux hotfixes suivants.

# Dette / gate terrain

Le dashboard et le clic de sa frontière sont des baselines production. L’auto-écoute reste **production déployée mais terrain iPhone non confirmée** jusqu’au test réel de Trân.

`app.js` reste monolithique par choix de sécurité. Son extraction est réservée à Architecture Hardening.