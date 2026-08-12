# French Trân’quille — ARCHITECTURE

## Vue générale — production Build 29 + candidat 29.1

```text
iPhone / Safari / PWA
        ↓
Build 29 — iPhone / PWA / Accessibility
safe areas / touch / a11y / VisualViewport / offline
        ↓
Build 28 Recovery Engine
validation / last-good / snapshots / rollback
        ↓
Build 27 App Shell Reset
façade apprenante mobile-first
        ↓
Aujourd’hui / Pratiquer / Progrès / Parcours complet
        ↓
Build 29.1 Speaking Loop Content — candidat
Tyffany → prise locale → Ma voix → comparer / refaire
        ↓
compatibility bus + moteurs historiques
        ↓
Progression / Session / Scenario / Listening / Memory / Mastery / Error
        ↓
6 stores pédagogiques durables + Web APIs navigateur
```

PWA statique GitHub Pages, sans backend obligatoire ni API payante.

Principes :

- **la complexité appartient aux moteurs ; l’utilisatrice voit l’intention utile** ;
- **une donnée durable invalide ne devient jamais silencieusement une progression neuve** ;
- **l’audio de réécoute reste local et éphémère** ;
- **aucun score de prononciation n’est inventé à partir d’une simple transcription ou d’une auto-écoute**.

Production : **v1.22.0 / Build 29**, runtime `1c01648d89dfb3bd9236b9ad93fbade4e21102fa`, PR #64, Pages #120 SUCCESS.

Candidat : **v1.22.1 / Build 29.1**, PR #66.

---

# Ordre de boot

```text
index.html
  ↓
data-recovery-core.js
  ↓
data-recovery.js
  ↓
progress-safety.js
  ↓
app.js + curriculum
  ↓
moteurs pédagogiques
  ↓
Build 27 App Shell
  ↓
Build 29 iPhone/PWA layer
  ↓
build-meta.js
  ↓
Speaking Loop 29.1 chargé dynamiquement — candidat
```

Recovery agit donc avant `app.js`. Build 29 reste une couche device/accessibility autour du shell. Build 29.1 n’est pas propriétaire de la progression : il décore uniquement les moments de leçon qui répondent à son contrat.

---

# Build 29 — iPhone / PWA / Accessibility — PROD

Modules :

```text
build29-iphone-a11y.css
build29-iphone-a11y.js
build29-smoke.js
manifest.webmanifest
sw.js
```

Responsabilités :

- safe areas et `viewport-fit=cover` ;
- cibles coarse-pointer ≥44 px ;
- focus-visible ;
- sémantique active `aria-current` ;
- progressbar/live regions ;
- `VisualViewport` / clavier virtuel ;
- standalone ;
- reduced motion / contraste ;
- petits, grands et paysage ;
- manifest/install/offline.

Tribunal : `320×568`, `390×844`, `430×932`, reduced-motion et boot offline réel après chauffe du Service Worker.

PR #65 a testé une isolation supplémentaire des anciens smoke harnesses du Service Worker. Elle a été **fermée sans merge** : aucun changement #65 ne fait partie de la production.

---

# Build 29.1 — Speaking Loop Content — CANDIDAT

Modules :

```text
speaking-loop-content.js
speaking-loop-content.css
speaking-loop-smoke.js
.github/workflows/build29-1-speaking-loop-smoke.yml
```

## Rôle

Le module choisit **un élément oral principal par leçon** depuis `window.FrenchTranquilleCurriculum`, puis propose un second moment après réussite du challenge final.

```text
lesson.items
   ↓
scoring utilité orale / phrase / question / contexte
   ↓
1 élément principal
   ↓
Speaking Loop teach

lesson.challenge.answer
   ↓ après feedback.ok
Speaking Loop final
```

Contrat :

```text
40 leçons couvertes
maxMoments = 2
```

Aucune leçon ni aucun item canonique n’est créé ou modifié.

## Audio modèle

Le bouton Tyffany crée un `SpeechSynthesisUtterance` `fr-FR`.

La chaîne vocale historique reste propriétaire de la voix :

```text
speaking-loop-content.js
  ↓ SpeechSynthesisUtterance
voice-ios.js
  ↓ choix voiceURI / rate / pitch existants
speechSynthesis
```

`voice-ios.js` reste byte-identique.

## Auto-écoute locale

```text
clic explicite
  ↓
getUserMedia(audio)
  ↓
MediaRecorder
  ↓ max 9 s
Blob
  ↓
Object URL
  ↓
Audio local
```

- pas d’upload ;
- pas de store durable ;
- pas de backup ;
- suppression au changement de moment/page ;
- codecs préférés : `audio/mp4`, puis WebM/Opus, puis WebM.

Le Speaking Loop ne lance pas SpeechRecognition. Il évite donc volontairement de démarrer MediaRecorder en parallèle de la reconnaissance Safari.

## Gate exact-premier-essai

La fonction Build 26.1 existe toujours séparément dans Free Voice :

```text
réponse reconnue
→ seconde prise volontaire
→ réécoute
```

Gate terrain toujours ouvert :

```text
reconnaissance
→ seconde prise
→ lecture
→ reconnaissance suivante toujours normale
```

Tant que ce gate réel iPhone n’est pas validé, Build 29.1 **n’enregistre pas automatiquement le premier essai reconnu**.

---

# Build 28 — Data & Recovery

Registre durable canonique :

```text
learner     francais-avec-luc:learner:v1
memory      french-tranquille:learning-memory:v1
errors      french-tranquille:error-intelligence:v1
scenarios   french-tranquille:scenarios:v1
listening   french-tranquille:listening:v1
milestones  french-tranquille:milestones:v1
```

Backup V2, restore transactionnel, rollback, migration V1 préservant les stores modernes, quarantaine, `last-good`, snapshots `pre-restore`, `pre-migration`, `pre-reset` et fallback Build 22 restent en vigueur.

Les réglages voix et les blobs d’auto-écoute ne font pas partie des données pédagogiques portables.

---

# Build 27 — App Shell

### Aujourd’hui

```text
prochaine leçon
[ Continuer ]
Réviser    Écouter
```

### Pratiquer

```text
Parler
Écouter
Réviser
Dans la vraie vie
```

### Progrès

```text
position A0 → A1
prochaine leçon
étape actuelle
5 leçons autour de la position
Voir tout le parcours
```

Cockpit moteur historique = DEBUG FR seulement.

---

# Runtime pédagogique historique

Les moteurs restent propriétaires de leur logique :

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
build26-7-ux.js
build26-8-ux.js
build26-9-ux.js
build27-app-shell.js
build29-iphone-a11y.js
```

Build 29.1 s’ajoute comme couche de contenu de leçon ; il ne remplace aucun moteur ci-dessus.

---

# Listening

```text
normal request 0.88 → effectif 0.88
slow request   0.68 → bridge 0.65 → effectif 0.65
```

---

# Real Life French

Production : **36 situations / 108 tours**.

Baseline historique protégée : `real-life-data-2.js` = **v1.17.0 — Build 24 — Real Life French II**, avec **28 situations / 84 tours** avant Pack III.

---

# Sanctuaires

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
francais-avec-luc:learner:v1
```

Baselines produit :

```text
curriculum 40 / 241
Scenario 36 / 108
Listening 0.88 / 0.65
Build 27 App Shell
Build 28 Data & Recovery
Build 29 iPhone/PWA/A11y
Build 26.6 containment
Build 26.7 geometry
Build 26.8 Focus Flow
Build 26.9 Content Reliability
```

---

# Suite

1. Build 29.1 Speaking Loop Content — candidat ;
2. gate terrain iPhone Voice Replay ;
3. Build 30 Architecture Hardening ;
4. V2.0.0 Freeze / Release.