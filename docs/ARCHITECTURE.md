# French Trân’quille — ARCHITECTURE

## Vue générale — V2.0.0 / Architecture Build 30

```text
iPhone / Safari / PWA
        ↓
Build 29 — iPhone / PWA / Accessibility
safe areas / touch / a11y / VisualViewport / offline
        ↓
Build 28 — Recovery Engine
validation / last-good / snapshots / rollback
        ↓
Legacy Core + Curriculum
40 leçons / 241 éléments
        ↓
Memory / Error / Scenario / Listening / Mastery
Scenario 36 / 108 · Listening 0.88 / 0.65
        ↓
Build 27 — App Shell
Aujourd’hui / Pratiquer / Progrès
        ↓
Build 30 — Runtime Contracts + Runtime Bridge
frontière stable / read-only / ownership / routing
        ↓
Build 29.2 — Speaking Loop
Tyffany → prise locale → Ma voix → recap contextualisé
        ↓
V2 Release Contract
release-v2.json + tribunal v2-release-freeze
```

PWA statique GitHub Pages, sans backend obligatoire ni API payante.

# Baseline V2 certifiée

```text
Version produit        2.0.0
Architecture           Build 30
Curriculum             40 / 241
Scenario               36 / 108
Listening              0.88 / 0.65
Speaking Loop          max 2 / leçon
Stores durables        6
Coût récurrent         0 €
```

## Chaîne de certification

- PR runtime V2 **#73**, head `c221fa9600d23dd83b87225cc4accce01e83cfe6` : **22/22 fonctionnels SUCCESS** ;
- runtime applicatif `5f2c486b3e455220ebd903f25ee766ff2430e4a5` ; Pages **#131 SUCCESS** ;
- PR CI-only **#74**, head `0fbd3b8e8124b3beaf7d6086d8a837580abb2cb3` : **22/22 fonctionnels SUCCESS** ;
- baseline finale de certification `6e0f5cde97cfba0572efccc6344a8bd6cbe7a315` : **23/23 SUCCESS**, Pages **#132 SUCCESS**.

PR #74 ne change qu’un workflow GitHub Actions : mêmes quatre assertions Progression UX, mais Chrome isolé, borné par timeout et retries. Le code PWA servi reste celui du runtime V2.

---

# Release Contract

Fichier : `release-v2.json`

Le contrat machine contient :

- version `2.0.0` ;
- Architecture Build `30` ;
- cardinalités produit ;
- six stores durables ;
- hashes des sanctuaires ;
- couches protégées ;
- gate terrain exact-first-attempt encore ouvert.

Workflow : `.github/workflows/v2-release-freeze.yml`.

Il certifie :

- Release Contract ↔ Runtime Contracts ↔ Recovery ;
- backup V2 à six stores ;
- version Options ;
- navigation réelle ;
- ancienne utilisatrice ;
- stores inchangés avant/après round-trip ;
- sanctuaires ;
- zéro overflow horizontal.

---

# Runtime Contracts

Module : `runtime-contracts.js`

Exposition : `window.FrenchTranquilleRuntimeContracts`.

## Stores canoniques

```text
learner     francais-avec-luc:learner:v1
memory      french-tranquille:learning-memory:v1
errors      french-tranquille:error-intelligence:v1
scenarios   french-tranquille:scenarios:v1
listening   french-tranquille:listening:v1
milestones  french-tranquille:milestones:v1
```

## Snapshots Recovery

```text
french-tranquille:recovery:last-good:v1
french-tranquille:recovery:pre-restore:v1
french-tranquille:recovery:pre-migration:v1
french-tranquille:recovery:pre-reset:v1
french-tranquille:recovery:quarantine:v1
french-tranquille:safety:pre-build22:v1
```

## Routes stables

```text
today     → home
practice  → practice
progress  → progress
```

## Ownership

```text
legacyCore   → Curriculum
recovery     → Recovery
voice        → LucieVoice / FreeVoice / VoiceReplay
learning     → Memory / Error / Mastery / DailyCoach / Language
practice     → Listening / Scenario / Real Life
presentation → UX historiques + Build 27 App Shell
release      → BuildMeta / SpeakingLoop
```

Les noms internes `Lucie*`, `luc-*`, `lucie-*` restent volontairement compatibles malgré le branding visible **Tyffany**.

---

# Runtime Bridge

Module : `runtime-bridge.js`

Exposition : `window.FrenchTranquilleRuntime`.

```text
snapshot()
refresh()
route('today' | 'practice' | 'progress')
openLesson(id)
lastSnapshot()
```

Le bridge est read-only vis-à-vis des stores durables : **aucun `localStorage.setItem`**.

Le cœur historique `app.js` reste le témoin de référence ; Build 30 a posé une **strangler boundary** plutôt qu’une réécriture big-bang.

---

# Recovery

Build 28 agit avant le runtime susceptible d’initialiser un état neuf.

Fonctions protégées :

- backup V2 six stores ;
- snapshots pré-restore / pré-migration / pré-reset ;
- last-good ;
- quarantaine ;
- restore transactionnel ;
- rollback ;
- compatibilité backup V1 sans effacement des stores modernes.

Le tribunal V2 vérifie que `backupObject()` annonce **2.0.0 / Build 30** et six stores.

---

# App Shell / iPhone

Build 27 :

- Aujourd’hui ;
- Pratiquer ;
- Progrès ;
- cockpit détaillé réservé DEBUG FR.

Build 29 :

- safe areas ;
- targets tactiles ≥44 px ;
- focus visible ;
- `aria-current` ;
- `VisualViewport` ;
- reduced motion ;
- boot offline ;
- matrice 320×568 / 390×844 / 430×932.

---

# Speaking Loop / voix

Build 29.2 reste gelé sous V2 :

```text
enseignement
→ cible orale utile
→ Nghe / Écouter Tyffany
→ seconde prise locale volontaire
→ Ma voix
→ recap oral contextualisé et distinct
```

Bài 7 canonique :

```text
compréhension : « dix euros » → 10 euros
production : « Combien ça coûte ? »
```

Aucun faux score phonétique. Audio local ≤9 s, sans upload ni persistance durable.

---

# Gate terrain exact-premier-essai

Toujours séparé :

```text
reconnaissance
→ seconde prise
→ lecture
→ reconnaissance suivante toujours normale
```

Ce gate ne remet pas V2 en cause ; il bloque uniquement une future capture automatique du premier essai en parallèle de SpeechRecognition.

---

# CI V2

Le produit possède désormais **22 workflows fonctionnels** plus Pages.

La vieille dette Progression UX a été corrigée côté CI uniquement : chaque Chrome est maintenant :

- isolé par `--user-data-dir` ;
- protégé contre le background throttling ;
- borné par `timeout` / `kill-after` ;
- retenté au maximum trois fois ;
- soumis aux mêmes assertions fonctionnelles qu’avant.

---

# Baseline historique Real Life protégée

`real-life-data-2.js` reste le témoin **v1.17.0 — Build 24 — Real Life French II** : **28 situations / 84 tours** avant Pack III.

Production V2 : **36 situations / 108 tours**.

---

# Sanctuaires V2

```text
app.js                  600f094266c9f0c4c7b57efdbf61129909ebd9cb
voice-ios.js            38e97aa3ef62dd6dcda224901b435f0973618679
free-voice.js           b4c19b1936c788ee017eac9ba14e5a62c159e8d5
assets/LOGO.png         64eaa6ad9781c6a9075d4f68615fc44344c4e21c
assets/Favicon.png      c358672368a960bf7617e5532aff3e3319cddb3e
francais-avec-luc:learner:v1
```

## Après V2

Architecture en **freeze/maintenance**. Aucun Build 31 n’est prévu sans besoin terrain ou nouvelle roadmap explicite.
