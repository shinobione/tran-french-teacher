# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version production

- **v1.19.2**
- **Build 26.2 — Click + Listening Rate Hotfix**
- statut : **✅ PROD / réécoute iPhone à valider terrain**
- commit production : `4d1d224aa4eb6612fe6b0dc997f3871bbb502317`
- PR : **#42**
- GitHub Pages : **#100 SUCCESS**
- tribunal production : **8 workflows / 8 SUCCESS**
- calibration Listening : **0.88 normal / 0.65 lent**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **36 situations / 108 tours**
- coût : **0 €**

## 🩹 Build 26.2 — hotfix terrain

Deux retours terrain ont déclenché ce patch :

1. `Parcours → Détails d’apprentissage` pouvait recevoir le clic sans s’ouvrir ;
2. la lecture `🐢 Lent` sonnait presque comme la lecture normale.

### Détails d’apprentissage

Le panneau reste un `<details>` natif, mais son ouverture/fermeture ne dépend plus uniquement du comportement implicite du navigateur. `progression-ux.js` intercepte maintenant le clic sur le `summary` et applique un toggle déterministe.

Un vrai smoke Chrome clique désormais sur le résumé et exige :

```text
data-progress-details-click-smoke="1"
data-progress-details-open="1"
data-progress-details-manual-toggle="open"
```

Le dashboard Build 26.1 reste inchangé derrière cette entrée :

```text
🧠 Mémoire & révisions
🎯 Maîtrise
🎧 Compréhension orale
🎭 Français réel
🧩 A1 & rythme
```

### Listening lent : cause exacte

Le moteur Listening demandait `0.68`. Le bridge Build 25.1 essayait ensuite d’imposer `0.64` à la couche voix.

Mais `voice-ios.js` accepte volontairement seulement les vitesses **>= 0.65**. La valeur `0.64` était donc rejetée et la couche voix retombait sur sa valeur par défaut d’environ **0.84**.

En pratique avant Build 26.2 :

```text
Normal → 0.88
Lent   → ~0.84
```

La différence était donc presque inaudible.

Build 26.2 place le lent exactement sur le plancher déjà accepté :

```text
Normal → 0.88
Lent   → 0.65
```

`voice-ios.js` reste **byte-identique** : aucun changement de voix, pitch ou reconnaissance.

## 🎙️ Réécouter sa propre voix

Build 26.1 reste actif. Après une réponse vocale reconnue dans Free Voice, Trân peut faire une **seconde prise locale volontaire** pour s’écouter :

```text
🎧 Écoute-toi
[ 🎙️ M’enregistrer pour me réécouter ]
          ↓
[ ▶ Réécouter ma voix ]   [ ↻ Refaire ]
```

Contrat inchangé :

- `voice-ios.js` et `free-voice.js` byte-identiques ;
- `MediaRecorder` / `getUserMedia` seulement si disponibles ;
- aucun upload ;
- aucune sauvegarde audio ;
- aucun événement Learning Memory / Error / Mastery créé par l’auto-écoute ;
- Blob URL temporaire ;
- piste micro stoppée après la prise ;
- arrêt automatique après 9 secondes ;
- échec de capture = exercice vocal existant toujours utilisable.

La capture exacte du premier essai reste hors scope tant qu’un test réel sur l’iPhone de Trân n’a pas prouvé qu’une capture parallèle n’abîme pas la reconnaissance validée.

## Baselines conservées

- Progression UX Build 25 ;
- Listening **0.88 / 0.65** ;
- Session UX Build 25.2 ;
- Real Life French III Build 26 : **36 situations / 108 tours** ;
- Voice Replay + Details Dashboard Build 26.1 ;
- ancien profil l8 / progression protégée ;
- logo, favicon, `voice-ios.js`, `free-voice.js` sanctuarisés.

Aucune migration learner/Memory/Scenario/Listening n’a été faite dans Build 26.2.

## CI / production

Sur PR #42 puis `main` :

- quality ✅ ;
- Options ✅ ;
- nav/mobile ✅ ;
- Progression UX + vrai clic `Détails` ✅ ;
- Listening-rate **0.88 / 0.65** ✅ ;
- Session UX ✅ ;
- Real Life French III ✅ ;
- Voice Replay + Details Dashboard ✅ ;
- GitHub Pages **#100 ✅**.

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
Voice Replay + Details Dashboard Build 26.1
```

## Suite

1. **Test terrain iPhone** : auto-écoute après une vraie réponse reconnue + vérification de la reconnaissance suivante.
2. Build 27 — Data & Recovery Hardening.
3. Build 28 — iPhone / PWA / Accessibility Hardening.
4. Build 29 — Architecture Hardening.
5. V2.0.0 — Freeze / Release.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-26-1-VOICE-REPLAY-DETAILS-DASHBOARD.md`.