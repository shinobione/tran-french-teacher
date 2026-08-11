# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version candidate

- **v1.18.3**
- **Build 25.3 — Voice Self-Playback + Learning Details Dashboard**
- statut : **CANDIDAT / EN COURS**
- baseline production : **v1.18.2 — Build 25.2 — Session Goals / Milestones / App Delight**
- baseline UX : **Build 25 — Progression UX / Progressive Disclosure**
- calibration Listening : **Build 25.1 — 0.88 normal / 0.64 lent**
- baseline fonctionnelle historique : **v1.17.0 — Build 24 — Real Life French II**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **28 situations / 84 tours**
- coût : **0 €**

## Build 25.3 — retour terrain

Deux retours réels sont traités avant de reprendre le contenu :

1. après avoir parlé, Trân doit pouvoir **entendre sa propre voix** pour se comparer au modèle ;
2. `Parcours → Détails d’apprentissage` ne doit plus devenir un long empilement vertical de tous les moteurs internes.

## 🎙️ Réécoute de sa propre voix

Le moteur vocal validé reste sanctuarisé : **`free-voice.js` et `voice-ios.js` ne sont pas modifiés**.

Après une réponse vocale transcrite, une couche additive propose :

```text
🎧 Écoute-toi
[ 🎙️ M’enregistrer pour me réécouter ]
```

L’utilisatrice répète la même réponse une fois. Cette seconde prise sert uniquement à l’auto-écoute :

```text
[ ▶ Réécouter ma voix ]   [ ↻ Refaire ]
```

Contrat de confidentialité :

- enregistrement **local uniquement** ;
- Blob temporaire en mémoire ;
- aucun upload ;
- aucun `localStorage` ;
- piste micro arrêtée après la prise ;
- URL Blob révoquée au changement d’exercice / fermeture de page.

Ce choix est volontairement conservateur sur iPhone : la PWA ne tente pas encore d’enregistrer simultanément le flux utilisé par `SpeechRecognition`. La reconnaissance qui fonctionne déjà reste prioritaire. Une capture simultanée exacte du premier essai ne sera envisagée qu’après test réel sur l’iPhone de Trân.

## 🧠 Détails d’apprentissage — fin du « parchemin »

Le grand bloc repliable reste l’entrée unique, mais son contenu devient un **dashboard de cartes logiques**.

Les cartes existantes sont reclassées automatiquement :

```text
🧠 Mémoire & révisions
🎯 Maîtrise
🎧 Compréhension orale
🎭 Français réel
🧩 A1 & rythme
```

Les catégories réellement disponibles apparaissent sous forme de tuiles compactes. **Une seule catégorie détaillée est ouverte à la fois.** Les cartes historiques de Memory, Error Intelligence, Mastery, A1, Listening, Scenario et Adaptive Language restent dans le DOM et continuent à être mises à jour par leurs moteurs ; elles ne sont simplement plus toutes affichées simultanément.

Les cartes inconnues/futures ne sont jamais perdues : elles tombent dans `Autres détails` jusqu’à ce qu’une catégorie explicite leur soit attribuée.

## Build 25.2 — baseline conservée

Le contrat de session reste :

```text
AVANT   → objectif court
PENDANT → progression visible
FIN     → réussite explicite
APRÈS   → sortie logique en 1 tap
```

Listening = 5 questions ; Révision = jusqu’à 5 éléments ; Scenario = 1 situation ; Vocal guidé = 5 réponses reconnues. `Retour à Aujourd’hui` reste l’action principale de sortie.

## Listening

Calibration production conservée :

```text
normal = 0.88
lent   = 0.64
```

## Cache candidat

```text
tran-french-teacher-v1.18.3-b25.3-voice-replay-details-dashboard
```

## Validation candidate

Nouveau workflow : **Build 25.3 Voice replay + Details dashboard smoke**.

Il vérifie notamment :

- syntaxe et câblage des deux nouvelles couches ;
- replay local sans upload ni persistance ;
- `free-voice.js` / `voice-ios.js` byte-identiques ;
- vrai Chrome : Détails d’apprentissage regroupés et non stackés ;
- vrai Chrome : surface de replay injectée après une réponse vocale synthétique ;
- tous les anciens workflows restent obligatoires avant merge.

## Sanctuaires

```text
francais-avec-luc:learner:v1
assets/LOGO.png
assets/Favicon.png
voice-ios.js
free-voice.js
curriculum / Learning Memory / Scenario / Listening state
```

## Suite

1. **v1.18.3 — Build 25.3** — candidat actuel.
2. **v1.19.0 — Build 26 — Real Life French III**.
3. Build 27 — Data & Recovery.
4. Build 28 — iPhone/PWA/Accessibility.
5. Build 29 — Architecture Hardening.
6. V2.0.0 — Freeze / Release.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-25-3-VOICE-REPLAY-DETAILS-DASHBOARD.md`.