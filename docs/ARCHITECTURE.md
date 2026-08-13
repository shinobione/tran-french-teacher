# French Trân’quille — ARCHITECTURE

## Vue générale — Produit V2.3.0 / Architecture gelée Build 30

```text
iPhone / Safari / PWA
        ↓
Build 29 — iPhone / PWA / Accessibility
        ↓
Build 28 — Recovery Engine
        ↓
Legacy Curriculum 40 / 241
        ↓
Build 32 — Stage 4
52 leçons / 313 items
        ↓
Memory / Error / Mastery
        ↓
Scenario 44 / 132 + Listening 0.88 / 0.65
        ↓
Build 27 — App Shell
Aujourd’hui / Pratiquer / Progrès
        ↓
Build 30 — Runtime Contracts + Runtime Bridge
        ↓
Build 29.2 — Speaking Loop
52/52 · max 2
        ↓
Post-Build32 Field Reliability
Listening pre-close + audio-only MediaRecorder compat
        ↓
Build 34 — Foundations Pilot F01–F04
non-persistent
        ↓
Learner Intelligence 2.2
7 bandes / 52 / 313
        ↓
Produit courant V2.3.0 / Build 34
```

La PWA reste statique sur GitHub Pages, sans backend obligatoire ni API payante.

## Vérités séparées

```text
Produit courant          2.3.0 / Build 34
Architecture gelée       2.0.0 / Build 30
Release Contract V2      2.0.0 / Build 30
Curriculum au freeze     40 / 241
Curriculum courant       52 / 313
Scenario courant         44 / 132
Listening                0.88 / 0.65
Speaking Loop            52/52 · max 2
Fondations               F01–F04 pilot
Stores durables          6
Coût récurrent           0 €
```

Une baseline gelée décrit un instant certifié. Le produit courant peut grandir sans falsifier cette photographie.

---

# Curriculum — historique + successeur

Le cœur historique :

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
→ 52 / 313
```

Les 40 premiers lesson IDs et 241 premiers item IDs restent dans le même ordre.

Build32 ajoute aussi :

```text
real-life-data-4.js          → Pack IV
listening-data-2.js          → Listening II
learner-intelligence-v2.js   → 7 bandes
build32-shell-extension.js   → étapes 41–52
```

Aucun nouveau store durable.

## Témoin historique Real Life II

La CI protège explicitement :

```text
v1.17.0 — Build 24 — Real Life French II
real-life-data-2.js
28 situations / 84 tours avant Pack III
```

Ce témoin ne décrit pas le Scenario courant 44/132 ; il garantit que l’histoire du produit reste rejouable.

---

# Build 33 — Foundations Audit

Document : `docs/BUILD-33-FOUNDATIONS-AUDIT.md`.

Classification des 313 items :

```text
1–15   88 items   structures surtout implicites
16–25  60 items   règles contextuelles
26–40  93 items   structures A1 contextuelles
41–52  72 items   structures Build32
```

Conclusion : la conjugaison utile existe déjà largement à partir de l16. Le premier déficit transférable prioritaire est **genre + articles + nombre**.

---

# Build 34 — Foundations Pilot

Module : `foundations-pilot.js`.

API :

```text
window.FrenchTranquilleFoundationsPilot
version 2.3.0
build 34
persistent false
concepts F01,F02,F03,F04
```

Scope :

```text
F01  genre du nom
F02  un / une / des
F03  le / la / l’ / les
F04  singulier / pluriel
```

Le module est chargé par `build32-loader.js` seulement dans le runtime courant. Les routes historiques `b32Audit`, `b31Audit`, `b30Audit`, `v2Audit` restent hors pilote.

UX :

```text
leçons 8–13
→ 🧩 Nền tảng nhỏ / Petite base utile
→ explication VI-heavy
→ la gare / un billet / une table / les toilettes
→ 4 mini-checks
→ la pharmacie → les pharmacies
→ retour à la leçon
```

Aucun onglet Grammaire, aucune leçon 53+, aucune migration.

## Data ownership

Fondations Pilot ne possède **aucun store** et ne doit contenir aucun `localStorage.setItem`.

Une réponse correcte reste éphémère. Elle ne devient pas automatiquement une preuve de maîtrise.

Memory Evidence v2 devra plus tard distinguer :

```text
phrase memorized
concept understood
construction
transfer
```

---

# Field Reliability post-Build32

Deux shims additifs ont été livrés via PR #82.

## `navigation-field-hotfix.js`

Listening possède un overlay `body` et un état `listening-open`. Le bug terrain venait du routage du shell sous cet overlay sans fermeture préalable.

Contrat :

```text
geste bottom-nav
→ si Listening ouvert : FrenchTranquilleListening.close()
→ routage historique ensuite
```

Le shim intervient en capture pointer/mouse/clavier. Aucun store, aucune route canonique modifiée.

## `mediarecorder-ios-compat.js`

Speaking Loop / Voice Replay n’affichent `Ma voix` qu’après un Blob audio non vide.

Le Speaking Loop appelait historiquement :

```text
MediaRecorder.start(120)
```

Le shim applique :

```text
audio-only + timeslice positif
→ native start() sans timeslice
sinon
→ appel original inchangé
```

Objectif : laisser Safari/iOS finaliser une courte prise au `stop()`.

Il ne touche pas :

```text
SpeechRecognition
voice-ios.js
free-voice.js
learner stores
Memory
Recovery
```

Field gates encore réels :

```text
Listening → Home en un tap
Bài 11/12 → record → stop → Ma voix → écoute
réécoute → reconnaissance suivante normale
```

---

# Speaking Loop / Voice

Contrat :

```text
Tyffany
→ prise locale volontaire
→ Blob URL local
→ Ma voix
→ comparaison
```

- 52/52 leçons ;
- max 2 moments ;
- audio temporaire, non uploadé, non sauvegardé ;
- pas de score de prononciation ;
- compréhension ≠ production.

Sanctuaires :

```text
voice-ios.js  38e97aa3ef62dd6dcda224901b435f0973618679
free-voice.js b4c19b1936c788ee017eac9ba14e5a62c159e8d5
```

Les noms techniques `LucieVoice`, `luc-*`, `lucie-*` restent des compatibilités internes malgré Tyffany visible.

---

# Learner Intelligence 2.2

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

Le modèle observe progression + Learning Memory + Error Intelligence, sépare niveau interne et confiance et reste read-only sur les stores.

`A1+` reste interne. `voice-*` = reconnaissance, jamais prononciation.

Build34 ne lui injecte aucune preuve grammaticale durable.

---

# Runtime Contracts — socle gelé

Version : **2.0.0 / Build30**.

Stores :

```text
learner     francais-avec-luc:learner:v1
memory      french-tranquille:learning-memory:v1
errors      french-tranquille:error-intelligence:v1
scenarios   french-tranquille:scenarios:v1
listening   french-tranquille:listening:v1
milestones  french-tranquille:milestones:v1
```

Recovery :

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
foundations    → F01–F04 pilot éphémère, aucun store
recovery       → Recovery
voice          → LucieVoice / FreeVoice / VoiceReplay / Speaking Loop
learning       → Memory / Error / Mastery / DailyCoach / Language / Learner Intelligence
practice       → Listening / Scenario / Real Life
presentation   → Build27 shell + extensions
architecture   → Runtime Contracts / Runtime Bridge
```

---

# Build 35+ — frontière suivante

Memory Evidence v2 devra distinguer :

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

Aucun nouveau schéma durable avant :

```text
pre-migration snapshot
→ validation
→ transformation déterministe
→ write transactionnel
→ reread
→ compare
→ rollback
→ quarantine
→ vieux backups
→ ancien utilisateur l8=4
→ vrais navigateurs
```

Build36 = adoption candidate conditionnelle. Build37 = Foundations Core après retour F01–F04. Build38 = Transfer. Build39 = Learner Intelligence 3. Build40 = audit A1 avant A2.

---

# Certification / baselines

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

Field hotfix : `93f513f719f176c9c059eee7458e31026e602e7f`, Pages #139.

Build34 runtime : `259e07c9ed208fe0a7e91998827406b4fdc0bc33`, **26/26 SUCCESS**, Pages #140.

Sanctuaires core/branding restent byte-identiques.