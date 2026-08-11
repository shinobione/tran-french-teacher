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

# Runtime candidat — v1.18.3 Build 25.3

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
scenario-host.js
scenario-engine.js
real-life-ux.js
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

CSS candidat :

```text
session-ux.css
voice-replay.css
progress-details-dashboard.css
```

---

# Progression UX — Build 25 — CANONIQUE

`progression-ux.js` orchestre `Parcours` sans persister de données : résumé apprenant, détails repliables, 5 lignes curriculum visibles par défaut, 40 accessibles à la demande.

Son bloc `details.progress-ux-details` reste la frontière canonique dans laquelle les moteurs secondaires sont déplacés.

---

# Listening — Build 25.1 — CANONIQUE

Calibration :

```text
normal request 0.88 → effectif 0.88
slow request   0.68 → effectif 0.64
```

Le bridge vit dans `build-meta.js`. `voice-ios.js`, voix et pitch sont inchangés.

---

# Session UX — Build 25.2 — CANONIQUE

Les moteurs persistent leurs propres données. `session-ux.js` observe et orchestre :

```text
objectif → progression → fin → sortie
```

Listening = 5 questions ; Révision = jusqu’à 5 éléments ; Scenario = 1 situation ; Vocal guidé = 5 réponses reconnues ; pratique guidée = 1 réponse correcte.

`session-ux-adapter.js` couvre uniquement les vieilles zones qui n’exposent pas d’API de session propre.

---

# Voice Self-Playback — Build 25.3 — CANDIDAT

## Contrat de sécurité

`voice-replay.js` est **additif**. Il ne patch pas `SpeechRecognition`, `free-voice.js` ou `voice-ios.js`.

La surface apparaît uniquement lorsque `free-voice.js` a déjà rendu `.free-voice-result` :

```text
free-voice.js
  ↓ réponse vocale transcrite
.free-voice-result
  ↓
voice-replay.js
  ↓
prise locale secondaire volontaire
  ↓
Blob URL temporaire
  ↓
Audio() local
```

La seconde prise n’est pas une nouvelle tentative pédagogique : elle ne nourrit ni Learning Memory, ni Error Intelligence, ni Session UX. Elle sert uniquement à l’auto-écoute.

## Capture

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
- arrêt automatique après 9 s ;
- `MediaStreamTrack.stop()` à la fin ;
- `URL.revokeObjectURL()` au changement d’exercice / fermeture ;
- en cas d’échec de capture, la reconnaissance existante reste intacte.

La capture simultanée du même flux que `SpeechRecognition` n’est pas utilisée dans ce build : l’audio interne du Web Speech API n’est pas exposé comme `MediaStream`, et la priorité reste la fiabilité iPhone déjà validée.

---

# Learning Details Dashboard — Build 25.3 — CANDIDAT

`progress-details-dashboard.js` se place **au-dessus du DOM déjà orchestré par Build 25**, sans remplacer les moteurs.

Avant :

```text
Détails d’apprentissage
├── Memory
├── Error
├── Mastery
├── A1 Mastery
├── Listening
├── Scenario
├── Adaptive
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
      un seul panel visible
```

## Classification

Les cartes sont classées par leurs classes/titres existants : Memory/Error, Mastery, Listening, Scenario/Real Life, Stage2/Stage3/Language/Daily. Une carte qui ne matche aucun groupe va dans `Autres détails`.

Aucune carte n’est supprimée. Elles sont déplacées dans `.progress-detail-panel-cards`, qui reste descendante de `.progress-layout`. Les moteurs historiques continuent donc à retrouver leurs cartes via leurs sélecteurs descendants et à remplacer leur `innerHTML` normalement.

## Anti-boucle

Le dashboard :

- ne reconstruit les tuiles que si sa signature change ;
- réutilise ses panels ;
- déplace uniquement les cartes directes nouvellement injectées ;
- utilise un `MutationObserver` planifié au `requestAnimationFrame` ;
- n’écrit aucune donnée apprenante.

---

# Practice Hub / Daily Coach

Baseline Build 25.2 inchangée : un seul moteur dominant dans `Pratiquer → Parler français`, et 2 actions principales maximum dans `Séance du jour`.

---

# Milestones

Clé indépendante :

```text
french-tranquille:milestones:v1
```

Build 25.3 ne la modifie pas.

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

Curriculum : **40 leçons / 241 éléments**. Scenario : **28 / 84** avant Build 26.

Le replay ne crée **aucune clé** supplémentaire.

---

# Build 26 — extension prévue

`Real Life French III` doit partir de la baseline 25.3 une fois ce feedback UX fermé :

```text
scenario-data.js
real-life-data.js
real-life-data-2.js
real-life-data-3.js   ← Build 26
scenario-host.js
scenario-engine.js
real-life-ux.js
real-life-coach.js    ← aide UX Pack III uniquement
session-ux.js         ← conserve objectif 1 situation
```

Les références vers les acquis avancés doivent être résolues contre le curriculum réellement chargé, avec unicité obligatoire.

---

# Voice / branding — sanctuaires

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

Build 25.3 ajoute une couche autour du résultat vocal, pas dans le moteur vocal validé.

---

# CI candidate Build 25.3

Contrats historiques conservés : quality, Options, nav/mobile, Progression UX, Listening-rate, Session UX, hashes branding/voice, profil ancien utilisateur et absence de fatal card.

Nouveau workflow `Build 25.3 Voice replay + Details dashboard smoke` :

1. syntaxe / câblage / cache ;
2. replay local-only ;
3. sanctuaires byte-identiques ;
4. Chrome l8 → dashboard de détails avec ≥3 groupes ;
5. Memory et Mastery toujours présents ;
6. Chrome → surface replay injectée après résultat vocal synthétique.

# Dette technique

`app.js` reste monolithique par choix de sécurité. Son extraction est réservée à Architecture Hardening.