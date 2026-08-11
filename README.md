# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version en production

- **v1.19.1**
- **Build 26.1 — Voice Self-Playback + Learning Details Dashboard**
- statut : **PROD / CLOS**
- commit production : `8ad7e5eb9cb2f64c58c086847c3e035463ab3ba3`
- baseline contenu : **v1.19.0 — Build 26 — Real Life French III**
- calibration Listening : **0.88 normal / 0.64 lent**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **36 situations / 108 tours**
- coût : **0 €**

## 🎙️ Réécouter sa propre voix

Après une réponse vocale transcrite, Trân peut obtenir une **prise locale destinée uniquement à l’auto-écoute** :

```text
🎧 Écoute-toi
[ 🎙️ M’enregistrer pour me réécouter ]
          ↓
[ ▶ Réécouter ma voix ]   [ ↻ Refaire ]
```

La reconnaissance existante finit d’abord, puis cette seconde prise est enregistrée. **`free-voice.js` et `voice-ios.js` restent byte-identiques.**

Contrat replay :

- `MediaRecorder` / `getUserMedia` seulement si disponibles ;
- aucun upload ;
- aucune sauvegarde ;
- aucun nouvel événement Memory/Error/Mastery ;
- Blob URL temporaire ;
- piste micro stoppée après la prise ;
- arrêt automatique après 9 secondes ;
- si la capture locale échoue, la reconnaissance pédagogique continue normalement.

La capture simultanée exacte du premier essai reste hors scope tant qu’elle n’est pas prouvée fiable sur le vrai iPhone de Trân.

## 🧠 Détails d’apprentissage sans « parchemin »

`Parcours → Détails d’apprentissage` garde une seule entrée, mais n’affiche plus tous les moteurs empilés. Les cartes sont regroupées par intention :

```text
🧠 Mémoire & révisions
🎯 Maîtrise
🎧 Compréhension orale
🎭 Français réel
🧩 A1 & rythme
```

Une tuile montre un résumé court. **Une seule famille détaillée est ouverte à la fois.** Les vraies cartes historiques restent dans le DOM et continuent à être mises à jour par leurs moteurs. Une carte future non reconnue tombe dans `Autres détails` au lieu de disparaître.

## Build 26 — baseline conservée

Real Life French III reste intégralement chargé : **8 situations / 24 tours** supplémentaires, Scenario total **36 / 108**, français oral naturel côté interlocuteur et réponses simples alternatives explicitement listées.

Le moteur reste déterministe et local. Session UX Build 25.2 continue à imposer **1 situation = 1 session**.

## Baseline fonctionnelle historique conservée

Le contrat **v1.17.0 — Build 24 — Real Life French II** reste une baseline de non-régression explicite : avant Pack III, Scenario comptait **28 situations / 84 tours**.

## Preuves Build 26.1

PR #40 : les **8 workflows applicatifs** ont terminé SUCCESS, dont quality #126 et Build 26.1 smoke #3.

Sur `main` au commit `8ad7e5eb9cb2f64c58c086847c3e035463ab3ba3`, les **8 workflows applicatifs** ont de nouveau terminé sans échec et GitHub Pages **#98** a terminé SUCCESS.

Le smoke Build 26 Real Life French III est désormais durable : il protège le sous-système Pack III sans figer la version globale à `1.19.0`.

## Listening / voix

```text
normal = 0.88
lent   = 0.64
```

## Sanctuaires

```text
francais-avec-luc:learner:v1
Learning Memory / Scenario / Listening state
assets/LOGO.png
assets/Favicon.png
voice-ios.js
free-voice.js
Progression UX Build 25
Session UX Build 25.2
Real Life III Build 26
```

## Suite

1. Build 27 — Data & Recovery Hardening.
2. Build 28 — iPhone / PWA / Accessibility Hardening.
3. Build 29 — Architecture Hardening.
4. V2.0.0 — Freeze / Release.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-26-1-VOICE-REPLAY-DETAILS-DASHBOARD.md`.