# Build 26.2 — Click + Listening Rate Hotfix

Version : **v1.19.2**  
Statut : **✅ PROD / CLOS**  
Date : **2026-08-11**

## Origine terrain

Une vidéo de test a montré deux problèmes distincts :

1. `Parcours → Détails d’apprentissage` reçoit le clic mais peut rester fermé ;
2. `🐢 Lent` dans Listening sonne quasiment comme la vitesse normale.

## Fix 1 — Détails d’apprentissage

Le panneau reste un `<details>` natif, mais `src/ui/progression-ux.js` prend désormais explicitement en charge le clic sur son `<summary>` :

```text
click summary
→ preventDefault
→ toggleDetails(details)
→ details.open = !details.open
```

Le dashboard Build 26.1 n’est pas dupliqué ni réécrit.

Le smoke Progression ouvre un vrai Chrome, ferme le panneau, clique le résumé et exige les marqueurs d’ouverture.

## Fix 2 — Listening lent

Chaîne avant correctif :

```text
Listening slow request = 0.68
Build-meta bridge       = 0.64
voice-ios.js minimum    = 0.65
0.64 rejeté             = fallback ~0.84
```

La différence réellement entendue était donc environ **0.88 vs 0.84**.

Build 26.2 utilise le plancher déjà accepté par `voice-ios.js` :

```text
Normal = 0.88
Lent   = 0.65
```

`voice-ios.js` reste byte-identique ; aucun changement de voix, pitch ou reconnaissance.

## Version / cache

```text
version = 1.19.2
build   = 26.2
cache   = tran-french-teacher-v1.19.2-b26.2-clicks-listening-rate
```

## Données / sanctuaires

Aucune migration learner/Memory/Scenario/Listening.

Hashes conservés :

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

## CI

PR #42 puis `main` :

```text
quality                         ✅
Options                         ✅
nav/mobile                      ✅
Progression UX + details click  ✅
Listening rate 0.88 / 0.65      ✅
Session UX                      ✅
Real Life French III            ✅
Voice Replay + Details Dashboard✅
Pages #100                      ✅
```

Commit production : `4d1d224aa4eb6612fe6b0dc997f3871bbb502317`.

## Gate terrain restant

Build 26.2 est clos. Le seul gate terrain hérité reste celui de Build 26.1 : valider sur le vrai iPhone de Trân `réponse reconnue → seconde prise locale → réécoute → nouvelle réponse reconnue`.