# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version production

- **v1.19.1**
- **Build 26.1 — Voice Self-Playback + Learning Details Dashboard**
- statut : **✅ PROD / réécoute iPhone à valider terrain**
- commit production : `8ad7e5eb9cb2f64c58c086847c3e035463ab3ba3`
- PR : **#40**
- GitHub Pages : **#98 SUCCESS**
- tribunal production : **8 workflows / 8 SUCCESS**
- calibration Listening : **0.88 normal / 0.64 lent**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **36 situations / 108 tours**
- coût : **0 €**

## 🎙️ Réécouter sa propre voix

Après une réponse vocale reconnue dans Free Voice, Trân voit désormais une petite zone d’auto-écoute :

```text
🎧 Écoute-toi
[ 🎙️ M’enregistrer pour me réécouter ]
          ↓
[ ▶ Réécouter ma voix ]   [ ↻ Refaire ]
```

Le choix est volontairement prudent : la reconnaissance existante termine d’abord, puis cette **seconde prise locale** est enregistrée. Nous ne lançons pas deux moteurs micro en parallèle sur l’iPhone.

Contrat :

- `voice-ios.js` et `free-voice.js` restent byte-identiques ;
- `MediaRecorder` / `getUserMedia` seulement si disponibles ;
- aucun upload ;
- aucune sauvegarde audio ;
- aucun événement Learning Memory / Error / Mastery créé par l’auto-écoute ;
- Blob URL temporaire ;
- piste micro stoppée après la prise ;
- arrêt automatique après 9 secondes ;
- échec de capture = exercice vocal existant toujours utilisable.

La capture exacte du **premier essai** reste hors scope tant qu’un test réel sur l’iPhone de Trân n’a pas prouvé qu’une capture parallèle n’abîme pas la reconnaissance déjà validée.

## 🧠 Détails d’apprentissage : fin du parchemin

`Parcours → Détails d’apprentissage` garde une seule entrée, mais les cartes ne sont plus empilées verticalement. Elles sont regroupées par intention :

```text
🧠 Mémoire & révisions
🎯 Maîtrise
🎧 Compréhension orale
🎭 Français réel
🧩 A1 & rythme
```

Une tuile affiche un résumé court ; **une seule famille détaillée est ouverte à la fois**. Les vraies cartes historiques restent dans le DOM et continuent d’être pilotées par leurs moteurs. Une future carte inconnue tombe dans `Autres détails` au lieu de disparaître.

Le dashboard est validé par Chrome et les contrats de progression ; il ne crée ni ne migre de données apprenantes.

## Baseline Build 26 conservée

Real Life French III reste intégralement chargé : **8 situations / 24 tours**, Scenario total **36 / 108**, Session UX Build 25.2 et Listening **0.88 / 0.64** inchangés.

Baseline historique protégée : **v1.17.0 — Build 24 — Real Life French II**, Scenario **28 situations / 84 tours** avant Pack III.

## CI / production

Sur le commit `8ad7e5e…` :

- quality ✅ ;
- Options ✅ ;
- nav/mobile ✅ ;
- Progression UX ✅ ;
- Listening-rate ✅ ;
- Session UX ✅ ;
- Real Life French III ✅ ;
- Build 26.1 Voice Replay + Details Dashboard ✅ ;
- GitHub Pages #98 ✅.

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

1. **Test terrain iPhone Build 26.1** : vérifier `M’enregistrer → Réécouter` après une vraie réponse reconnue.
2. Build 27 — Data & Recovery Hardening.
3. Build 28 — iPhone / PWA / Accessibility Hardening.
4. Build 29 — Architecture Hardening.
5. V2.0.0 — Freeze / Release.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-26-1-VOICE-REPLAY-DETAILS-DASHBOARD.md`.