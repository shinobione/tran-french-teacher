# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version production

- **v1.19.3**
- **Build 26.3 — Interaction Stability + Progress Layout**
- statut : **✅ PROD / réécoute iPhone à valider terrain**
- commit runtime production : `5947149e9fcb3b387aa01a797607270edb4f100e`
- PR : **#44**
- GitHub Pages : **#101 SUCCESS**
- tribunal production : **9 workflows fonctionnels / 9 SUCCESS + Pages SUCCESS**
- calibration Listening : **0.88 normal / 0.65 lent**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **36 situations / 108 tours**
- coût : **0 €**

## 🖱️ Build 26.3 — interactions terrain stabilisées

La vidéo terrain a montré une différence nette entre les contrôles de `Séance du jour` :

- `Continuer le parcours` restait fiable ;
- `Révision mémoire` pouvait recevoir le feedback visuel sans naviguer ;
- `Écouter 3 minutes` et `Voir les autres activités` pouvaient être inertes ou visuellement incohérents.

L’audit a trouvé une **guerre de composition DOM** : Daily Coach créait les actions, Listening injectait son bouton et Session UX déplaçait/recréait les mêmes nœuds sous plusieurs `MutationObserver`.

Build 26.3 ajoute une couche d’orchestration additive :

- 2 actions principales Today avec nœuds stables ;
- activités secondaires hors de la zone legacy qui les déplaçait ;
- `Voir les autres activités` devient un vrai `<button>` stable avec `aria-expanded` ;
- routage explicite Review / Lesson / Conversation / Listening ;
- rendu idempotent : aucun texte/état DOM n’est réécrit si la valeur est déjà correcte ;
- aucune écriture learner, Memory, Scenario ou Listening.

Le nouveau smoke terrain fait désormais de **vrais clics navigateur** sur :

```text
Voir les autres activités
→ Écouter 3 minutes
→ Révision mémoire
→ retour Aujourd’hui
→ Continuer le parcours
```

et exige les écrans réellement attendus.

## 🧭 Progrès — layout desktop optimisé

Sur desktop / tablette large, l’écran suit maintenant la logique validée par le mockup terrain :

```text
┌──────────────────────────┬─────────────────────────────┐
│ Où j’en suis             │ Détails d’apprentissage     │
│ prochaine étape          │ dashboard + groupe actif    │
├──────────────────────────┤                             │
│ Parcours A0 → A1         │ sticky / scroll interne     │
└──────────────────────────┴─────────────────────────────┘
```

La colonne droite reste sticky et scrolle indépendamment. Les cartes Memory/Mastery/Listening/Scenario restent les **vrais nœuds DOM existants** : aucun clone, aucune migration de donnée.

Sur mobile :

```text
Résumé
↓
Parcours compact
↓
Détails d’apprentissage repliés
```

Le dashboard Build 26.1 reste groupé par intention :

```text
🧠 Mémoire & révisions
🎯 Maîtrise
🎧 Compréhension orale
🎭 Français réel
🧩 A1 & rythme
⋯ Autres détails
```

## 🩹 Build 26.2 — baseline conservée

Build 26.2 avait corrigé :

1. le clic `Parcours → Détails d’apprentissage` avec un toggle explicite/déterministe ;
2. le mode Listening lent, dont la valeur `0.64` tombait sous le minimum `0.65` déjà accepté par `voice-ios.js` et provoquait un fallback proche de `0.84`.

Contrat actuel inchangé :

```text
Normal → 0.88
Lent   → 0.65
```

`voice-ios.js` et `free-voice.js` restent byte-identiques.

## 🎙️ Réécouter sa propre voix

Build 26.1 reste actif. Après une réponse vocale reconnue dans Free Voice, Trân peut faire une **seconde prise locale volontaire** pour s’écouter :

```text
🎧 Écoute-toi
[ 🎙️ M’enregistrer pour me réécouter ]
          ↓
[ ▶ Réécouter ma voix ]   [ ↻ Refaire ]
```

Contrat :

- aucune capture simultanée du premier essai ;
- `voice-ios.js` / `free-voice.js` inchangés ;
- aucun upload ni stockage audio ;
- aucun événement Learning Memory / Error / Mastery / Session créé par l’auto-écoute ;
- Blob URL temporaire ;
- piste micro stoppée ;
- arrêt automatique après 9 secondes ;
- échec de capture = exercice vocal existant toujours utilisable.

### Gate terrain restant

La fonction est en production mais doit encore être validée sur le vrai iPhone de Trân :

```text
réponse reconnue
→ seconde prise locale
→ réécoute correcte
→ réponse vocale suivante toujours reconnue normalement
```

La capture exacte du premier essai reste hors scope tant que cette coexistence n’est pas prouvée.

## Baselines conservées

- Progression UX Build 25 ;
- Listening **0.88 / 0.65** ;
- Session UX Build 25.2 ;
- Real Life French III Build 26 : **36 situations / 108 tours** ;
- Voice Replay + Details Dashboard Build 26.1 ;
- Click + Listening Rate Hotfix Build 26.2 ;
- learner historique et profil l8 protégés ;
- logo, favicon, `voice-ios.js`, `free-voice.js` sanctuarisés ;
- aucune migration learner/Memory/Scenario/Listening dans Build 26.3.

### Baseline historique protégée

Le contrat **v1.17.0 — Build 24 — Real Life French II** reste explicitement protégé : avant Real Life III, Scenario comptait **28 situations / 84 tours**.

## CI / production

Sur PR #44 : **9 / 9 workflows fonctionnels SUCCESS**.

Sur le commit `main` `5947149e…` : les 9 contrats fonctionnels sont verts, dont le nouveau smoke terrain Build 26.3 ; son premier passage `main` a rencontré un flake de timing Chrome puis le **rerun du même commit** a validé Today + desktop + mobile intégralement. GitHub Pages **#101 SUCCESS** a déployé ce commit.

## Sanctuaires

```text
francais-avec-luc:learner:v1
Learning Memory / Scenario / Listening state
assets/LOGO.png
assets/Favicon.png
voice-ios.js
free-voice.js
bottom navigation compatibility bus
Progression UX Build 25
Session UX Build 25.2
Real Life III Build 26
Voice Replay + Details Dashboard Build 26.1
```

## Suite

1. **Gate terrain iPhone Build 26.1** : auto-écoute puis reconnaissance suivante.
2. **Build 27 — Data & Recovery Hardening**.
3. **Build 28 — iPhone / PWA / Accessibility Hardening**.
4. **Build 29 — Architecture Hardening**.
5. **V2.0.0 — Freeze / Release**.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-26-1-VOICE-REPLAY-DETAILS-DASHBOARD.md`, `docs/BUILD-26-2-CLICK-LISTENING-HOTFIX.md` et `docs/BUILD-26-3-INTERACTION-PROGRESS-LAYOUT.md`.