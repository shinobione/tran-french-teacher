# French Trân’quille — ARCHITECTURE

## Vue générale — Produit V2.3.0 / Architecture gelée Build 30

```text
iPhone / Safari / PWA
        ↓
Build 29 — iPhone / PWA / Accessibility
safe areas / touch / a11y / VisualViewport / offline
        ↓
Build 28 — Recovery Engine
validation / last-good / snapshots / rollback
        ↓
Legacy Curriculum
40 leçons / 241 éléments historiques
        ↓
Build 32 — Stage 4 successeur
+12 leçons / +72 éléments
= 52 leçons / 313 éléments
        ↓
Memory / Error / Mastery
        ↓
Scenario + Real Life IV / Listening II
44 situations / 132 tours · Listening 0.88 / 0.65
        ↓
Build 27 — App Shell
Aujourd’hui / Pratiquer / Progrès
        ↓
Build 30 — Runtime Contracts + Runtime Bridge
frontière stable / ownership / routes
        ↓
Build 29.2 — Speaking Loop
Tyffany → prise locale → Ma voix
52/52 · max 2 / leçon
        ↓
Post-Build32 Field Reliability
Listening pre-close + MediaRecorder audio-only compat
        ↓
Build 34 — Foundations Pilot
F01–F04 · genre / articles / singulier-pluriel
non-persistent / contextuel
        ↓
Learner Intelligence 2.2
7 bandes / 52 / 313
        ↓
Produit courant V2.3.0 / Build 34
```

La PWA reste statique sur GitHub Pages, sans backend obligatoire ni API payante.

# Vérités séparées

```text
Produit courant          2.3.0 / Build 34
Architecture gelée       2.0.0 / Build 30
Release Contract V2      2.0.0 / Build 30
Curriculum au freeze     40 / 241
Curriculum courant       52 / 313
Scenario courant         44 / 132
Listening                0.88 / 0.65
Speaking Loop            52/52 · max 2
Fondations runtime       F01–F04 pilot, non-persistent
Stores durables          6
Coût récurrent           0 €
```

La baseline V2 ne change pas quand le produit V2.x grandit. `release-v2.json`, Runtime Contracts et Runtime Bridge restent des témoins historiques 2.0.0 / Build30.

---

# Curriculum — cœur historique + Stage 4

Le cœur historique reste :

```text
app.js
curriculum-stage2.js
curriculum-stage3.js
→ 40 leçons / 241 items
```

Stage 4 (`curriculum-stage4.js`) ajoute :

```text
41–46  Autonomie A1
47–52  Interaction A1
→ +12 leçons / +72 items
→ produit courant 52 / 313
```

Les 40 premiers lesson IDs et 241 premiers item IDs restent dans le même ordre.

Build 32 ajoute aussi :

```text
real-life-data-4.js      → Scenario 44 / 132
listening-data-2.js      → 4 contrastes + 8 mini-dialogues
learner-intelligence-v2.js → 7 bandes / 52 / 313
build32-shell-extension.js → étapes 41–52
```

Aucun de ces modules n’ajoute de store durable.

---

# Build 33 — Audit des Fondations

Document canonique : `docs/BUILD-33-FOUNDATIONS-AUDIT.md`.

L’audit sépare **présence d’une forme** et **enseignement transférable de son mécanisme**.

Classification :

```text
1–15   88 items   formes surtout implicites
16–25  60 items   règles contextuelles
26–40  93 items   structures A1 contextuelles
41–52  72 items   structures Build32
```

Les leçons 16+ enseignent déjà beaucoup de conjugaison utile : `être`, `avoir`, `vouloir/pouvoir`, sujets, futur proche, passé récent, passé composé, possessifs, `devoir`, `on`.

Le premier déficit structurel prioritaire se trouve plus tôt : **genre + articles + nombre**.

---

# Build 34 — Foundations Pilot

Module : `foundations-pilot.js`.

Exposition :

```text
window.FrenchTranquilleFoundationsPilot
version 2.3.0
build 34
persistent false
concepts F01,F02,F03,F04
```

## Scope

```text
F01  genre du nom
F02  un / une / des
F03  le / la / l’ / les
F04  singulier / pluriel
```

Le module est chargé par `build32-loader.js` **uniquement dans le runtime courant**. Les routes historiques `b32Audit`, `b31Audit`, `b30Audit` et `v2Audit` ne doivent pas recevoir la couche Fondations.

## UX

Dans la zone leçons 8–13 :

```text
🧩 Nền tảng nhỏ / Petite base utile
→ overlay focus
→ règle courte surtout VI
→ exemples existants
→ 4 mini-checks
→ retour à la leçon
```

Exemples actuels :

```text
la gare
un billet
une table
les toilettes
la pharmacie → les pharmacies
```

Le pilote ne crée pas d’onglet principal et ne renumérote aucune leçon.

## Data ownership

Fondations Pilot ne possède **aucun store**.

Il ne doit contenir aucun `localStorage.setItem`. Ses réponses existent uniquement dans l’UI courante. Une bonne réponse n’est pas persistée comme « maîtrise ».

Memory Evidence v2 décidera plus tard comment représenter :

```text
phrase memorized
concept understood
construction
transfer
```

après validation terrain du pilote.

---

# Field Reliability post-Build32

Deux shims additifs ont été livrés via PR #82 sans modifier les sanctuaires.

## `navigation-field-hotfix.js`

### Problème

Listening est un overlay attaché au `body` et possède un état `listening-open`. La bottom nav pouvait changer la route du shell sous cet overlay sans le fermer.

### Contrat

Sur geste vers `.ux-bottom-nav [data-ux-nav]` :

```text
si Listening est ouvert
→ FrenchTranquilleListening.close()
→ puis handlers historiques de navigation
```

Le shim intervient en capture sur pointer/mouse/clavier afin de fermer l’overlay **avant** le routage existant.

Il ne possède aucun store et ne change aucune route canonique.

## `mediarecorder-ios-compat.js`

### Problème

Speaking Loop et Voice Replay créent le bouton `Ma voix` seulement après réception de données audio non vides et création d’un Blob URL.

Le code historique du Speaking Loop appelait :

```text
MediaRecorder.start(120)
```

Le retour terrain a montré qu’une prise pouvait atteindre l’état `Dừng ghi âm` puis ne jamais produire le playback attendu.

### Contrat

Le shim enveloppe `MediaRecorder.prototype.start` :

```text
si recorder audio-only + timeslice positif
→ native start() sans timeslice
sinon
→ appel original inchangé
```

Objectif : laisser Safari/iOS finaliser une courte prise audio en un chunk complet au `stop()`.

Le shim ne touche pas :

```text
SpeechRecognition
voice-ios.js
free-voice.js
learner stores
Memory
Recovery
```

La prise reste temporaire et locale.

### Field gates

Le code livré ne suffit pas à clore le comportement iPhone :

```text
Listening → Home en un tap
Bài 11/12 → record → stop → Ma voix → écoute
réécoute → reconnaissance suivante normale
```

restent à confirmer sur le vrai appareil.

---

# Speaking Loop / Voice

`build-meta.js` installe `speaking-loop-content.js`.

Contrat pédagogique :

```text
Tyffany parle
→ Trân peut enregistrer une prise locale
→ Blob URL local
→ Ma voix
→ comparaison volontaire
```

- 52/52 leçons ;
- max 2 moments / leçon ;
- audio non uploadé et non sauvegardé ;
- pas de score de prononciation ;
- compréhension ≠ production ;
- cible orale variée/contextuelle.

Sanctuaires voix :

```text
voice-ios.js  38e97aa3ef62dd6dcda224901b435f0973618679
free-voice.js b4c19b1936c788ee017eac9ba14e5a62c159e8d5
```

Les noms internes `LucieVoice`, `luc-*`, `lucie-*` restent des compatibilités techniques malgré le nom visible Tyffany.

---

# Learner Intelligence 2.2

Module : `learner-intelligence-v2.js`.

Bandes :

```text
1–7    Survie A0
8–15   Vie quotidienne A0
16–20  Fondations A1
21–25  Premiers échanges A1
26–40  A1 Core
41–46  Autonomie A1
47–52  Interaction A1
```

Le modèle observe progression + Learning Memory + Error Intelligence. Il sépare niveau interne et confiance.

`A1+` est une étiquette interne seulement.

`voice-*` / non-reconnaissance reste `recognition`, jamais prononciation.

Build34 ne modifie pas ce modèle et ne lui injecte encore aucune preuve conceptuelle durable.

---

# Runtime Contracts — socle gelé

Version : **2.0.0 / Build30**.

Stores canoniques :

```text
learner     francais-avec-luc:learner:v1
memory      french-tranquille:learning-memory:v1
errors      french-tranquille:error-intelligence:v1
scenarios   french-tranquille:scenarios:v1
listening   french-tranquille:listening:v1
milestones  french-tranquille:milestones:v1
```

Snapshots Recovery :

```text
french-tranquille:recovery:last-good:v1
french-tranquille:recovery:pre-restore:v1
french-tranquille:recovery:pre-migration:v1
french-tranquille:recovery:pre-reset:v1
french-tranquille:recovery:quarantine:v1
french-tranquille:safety:pre-build22:v1
```

Routes :

```text
today     → home
practice  → practice
progress  → progress
```

Ownership :

```text
legacyCore     → curriculum historique
content        → Stage 4 / Real Life / Listening additions
foundations    → pilote ephemeral F01–F04, aucun store
recovery       → Recovery
voice          → LucieVoice / FreeVoice / VoiceReplay / Speaking Loop
learning       → Memory / Error / Mastery / DailyCoach / Language / Learner Intelligence
practice       → Listening / Scenario / Real Life
presentation   → Build27 shell + extensions
architecture   → Runtime Contracts / Runtime Bridge
```

---

# Build 35+ — prochaine frontière

Build 35 Memory Evidence v2 doit pouvoir distinguer :

```text
retrieval
listening
scenario
text
recognition
construction
transfer
assistance
recency
repetition
recovery
```

mais ne possède encore aucun droit d’écrire un nouveau schéma.

Avant adoption :

```text
pre-migration snapshot
→ validation
→ transform déterministe
→ write transactionnel
→ reread
→ compare
→ rollback
→ quarantine
→ vieux backups
→ ancien utilisateur l8=4
→ vrais navigateurs
```

Build36 est l’adoption candidate conditionnelle. Build37 industrialise les Fondations seulement après retour réel F01–F04. Build38 ajoute transfert, Build39 Learner Intelligence 3, Build40 audit A1 avant A2.

---

# Baselines / certification

```text
V2 Freeze      2.0.0 / Build30 / 40 / 241
Build31        2.1.0 / 40 / 241
Build32        2.2.0 / 52 / 313
Build34        2.3.0 / 52 / 313 + pilot F01–F04
Scenario       44 / 132
Listening      0.88 / 0.65
Speaking       52/52 · max 2
Stores         6
```

Field hotfix runtime : `93f513f719f176c9c059eee7458e31026e602e7f`, Pages #139.

Build34 runtime : `259e07c9ed208fe0a7e91998827406b4fdc0bc33`, **26/26 SUCCESS**, Pages #140.

Sanctuaires core/branding restent byte-identiques.