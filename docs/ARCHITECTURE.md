# French Trân’quille — ARCHITECTURE

## Vue générale — production Build 30

```text
iPhone / Safari / PWA
        ↓
Build 29 — iPhone / PWA / Accessibility
safe areas / touch / a11y / VisualViewport / offline
        ↓
Build 28 Recovery Engine
validation / last-good / snapshots / rollback
        ↓
Legacy Core + Curriculum
        ↓
Memory / Error / Scenario / Listening / Mastery
        ↓
Build 27 App Shell
Aujourd’hui / Pratiquer / Progrès
        ↓
Build 30 Runtime Contracts + Runtime Bridge
frontière stable / read-only / ownership / routing
        ↓
Build 29.2 Speaking Loop Variety & Clarity
contexte → modèle Tyffany → prise locale → Ma voix → recap varié
```

PWA statique GitHub Pages, sans backend obligatoire ni API payante.

Production certifiée : **v1.23.0 / Build 30**, PR #71, head certifié `ffa3ddf7a16dcbc32474701cfaf2f961e86d348c`, runtime `5a8369df9df536f41521acefb528da71efb168a8`, **21/21 workflows fonctionnels SUCCESS** sur PR et runtime `main`, **Pages #129 SUCCESS**, soit **22/22 SUCCESS Pages incluse** sur le runtime.

Un ancien Chrome Real Life III a échoué une fois sur le head PR à la leçon 35. Le même job, rerun sans changement de code, a repassé les leçons 20 / 35 / 40 : aucun patch produit n’a été ajouté pour masquer le flake.

---

# Principe Build 30 : strangler boundary

Le cœur historique `app.js` transporte encore une grande partie de l’état, du rendu et du curriculum initial. Les Builds 17→29 ont ajouté autour de lui des moteurs spécialisés solides.

Build 30 **ne réécrit pas ce noyau**. Il rend d’abord ses frontières explicites afin qu’un futur remplacement soit comparatif et incrémental :

```text
ancien runtime stable
       ↓
contrats explicites
       ↓
façade stable
       ↓
extractions futures derrière la façade
```

`app.js` est resté byte-identique pendant Build 30 et sert encore de témoin de référence.

---

# Runtime Contracts

Module : `runtime-contracts.js`

Exposition :

```text
window.FrenchTranquilleRuntimeContracts
```

Le module est gelé avec `Object.freeze` et ne possède aucun chemin d’écriture durable.

## Stores canoniques

```text
learner     francais-avec-luc:learner:v1
memory      french-tranquille:learning-memory:v1
errors      french-tranquille:error-intelligence:v1
scenarios   french-tranquille:scenarios:v1
listening   french-tranquille:listening:v1
milestones  french-tranquille:milestones:v1
```

## Snapshots Recovery connus

```text
french-tranquille:recovery:last-good:v1
french-tranquille:recovery:pre-restore:v1
french-tranquille:recovery:pre-migration:v1
french-tranquille:recovery:pre-reset:v1
french-tranquille:recovery:quarantine:v1
french-tranquille:safety:pre-build22:v1
```

## Invariants produit

```text
curriculum             40 leçons / 241 éléments
Scenario               36 situations / 108 tours
Listening normal       0.88
Listening lent final   0.65
Speaking Loop          max 2 moments / leçon
```

## Routes stables

```text
today     → home
practice  → practice
progress  → progress
```

## Ownership map

```text
legacyCore
  └─ FrenchTranquilleCurriculum

recovery
  └─ FrenchTranquilleRecovery

voice
  ├─ LucieVoice
  ├─ FrenchTranquilleFreeVoice
  └─ FrenchTranquilleVoiceReplay

learning
  ├─ FrenchTranquilleMemory
  ├─ FrenchTranquilleErrors
  ├─ FrenchTranquilleMastery
  ├─ FrenchTranquilleMasteryStage3
  ├─ FrenchTranquilleDailyCoach
  └─ FrenchTranquilleLanguage

practice
  ├─ FrenchTranquilleListening
  ├─ FrenchTranquilleScenarios
  └─ Real Life data / UX / coach

presentation
  ├─ UX historiques
  ├─ Progress / Session / Details layers
  └─ FrenchTranquilleBuild27Shell

release
  ├─ FrenchTranquilleBuildMeta
  └─ FrenchTranquilleSpeakingLoop
```

Les noms internes `Lucie*`, `luc-*`, `lucie-*` restent volontairement compatibles malgré le branding visible **Tyffany**.

---

# Runtime Bridge

Module : `runtime-bridge.js`

Exposition :

```text
window.FrenchTranquilleRuntime
```

API :

```text
snapshot()
refresh()
route('today' | 'practice' | 'progress')
openLesson(id)
lastSnapshot()
```

## `snapshot()`

Retourne une photographie structurelle read-only :

- curriculum chargé ;
- nombre de leçons / items ;
- learner présent/valide ;
- progression de leçon ;
- présence/validité des six stores ;
- APIs globales présentes et propriétaire attendu ;
- écran courant ;
- état de la navigation.

Le bridge ne contient **aucun `localStorage.setItem`**.

## `route()`

La façade masque la plomberie DOM historique :

- `practice` utilise l’API Build 27 quand elle existe ;
- `today` / `progress` utilisent les surfaces learner stables ;
- le détail des boutons legacy n’est plus un contrat que les futures couches doivent connaître.

## `openLesson()`

Ouvre une leçon via la meilleure surface existante sans imposer aux futurs modules la structure exacte du curriculum DOM.

---

# Ordre logique de boot

```text
Recovery
  ↓
Legacy Core
  ↓
Curriculum extensions
  ↓
Pedagogy engines
  ↓
Presentation / App Shell
  ↓
iPhone / PWA
  ↓
Runtime boundary / Release layer
  ↓
Speaking Loop
```

Ordre concret actuel simplifié :

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
Memory / Error / Scenario / Listening / Mastery / autres moteurs
  ↓
Build 27 App Shell
  ↓
Build 29 iPhone/PWA layer
  ↓
build-meta.js
      ├─ runtime-contracts.js
      ├─ runtime-bridge.js
      └─ speaking-loop-content.js
```

Recovery continue donc d’agir avant le runtime susceptible d’initialiser un état neuf.

---

# Tribunal Build 30

Le workflow `.github/workflows/build30-architecture-hardening.yml` protège :

## Statique

- syntaxe des nouveaux modules ;
- version `1.23.0 / 30` ;
- six stores et invariants canoniques ;
- zéro écriture depuis Contracts / Bridge ;
- précache PWA des nouvelles frontières.

## Sanctuaires byte-identiques

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

## Chrome desktop 1440×900 + mobile 390×844

Le test fait réellement :

```text
boot
→ snapshot runtime
→ Progrès
→ Aujourd’hui
→ Pratiquer
→ fermeture du hub pratique
→ snapshot runtime
```

Puis exige :

- **40 / 241** ;
- owners uniques ;
- stores uniques ;
- learner key canonique ;
- Recovery / App Shell / Speaking Loop prêts ;
- learner brut **strictement inchangé** ;
- un seul onglet actif ;
- zéro overflow horizontal.

Les tribunaux historiques restent actifs en parallèle. Build 30 ne remplace donc pas Recovery, App Shell, iPhone, Speaking, Listening, Scenario ou Progress CI : il ajoute un contrat transversal.

---

# Build 29.2 — Speaking Loop Variety & Clarity

Le contrat reste inchangé sous Build 30 :

```text
teach items + thème de leçon
        ↓
1 cible orale principale

challenge
        ↓
compréhension / choix

écran de fin
        ↓
planificateur contextualisé
        ↓
1 recap oral distinct
```

Bài 7 canonique :

```text
challenge : « dix euros » → 10 euros
recap oral : « Combien ça coûte ? »
```

Le bouton modèle natif reste :

```text
VI       🔊 Nghe Tyffany
DEBUG FR 🔊 Écouter Tyffany
```

Après prise :

```text
VI       ↻ Ghi âm lại
DEBUG FR ↻ Enregistrer à nouveau
```

Audio : local, volontaire, ≤9 s, jamais uploadé ni persisté. Aucun faux score de prononciation.

---

# Gate exact-premier-essai — toujours ouvert

Build 26.1 Free Voice reste séparé :

```text
reconnaissance
→ seconde prise
→ lecture
→ reconnaissance suivante toujours normale
```

Tant que ce gate réel iPhone n’est pas validé, aucune capture automatique parallèle du premier essai SpeechRecognition.

Ce gate ne bloque pas la stabilisation V2 du produit existant ; il bloque uniquement l’évolution future vers l’enregistrement automatique du premier essai exact.

---

# Build 29 — iPhone / PWA / Accessibility

Safe areas, touch ≥44 px, focus-visible, `aria-current`, progressbar/live regions, `VisualViewport`, standalone, reduced-motion, contraste, matrice **320×568 / 390×844 / 430×932** et boot offline restent sous CI.

# Build 28 — Data & Recovery

Backup V2 six stores, restore transactionnel, rollback, migration V1 sûre, quarantaine, `last-good` et snapshots restent en vigueur.

# Build 27 — App Shell

- Aujourd’hui : prochaine leçon / Continuer / Réviser / Écouter ;
- Pratiquer : Parler / Écouter / Réviser / Dans la vraie vie ;
- Progrès : position A0→A1 / prochaine leçon / 5 leçons / parcours complet ;
- cockpit moteur historique : DEBUG FR seulement.

# Listening

```text
normal request 0.88 → effectif 0.88
slow request   0.68 → bridge 0.65 → effectif 0.65
```

# Real Life French

Production : **36 situations / 108 tours**.

Baseline historique protégée : `real-life-data-2.js` = **v1.17.0 — Build 24 — Real Life French II**, avec **28 situations / 84 tours** avant Pack III.

# Sanctuaires

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
francais-avec-luc:learner:v1
```

Baselines produit : curriculum **40/241**, Scenario **36/108**, Listening **0.88/0.65**, Build 27 App Shell, Build 28 Recovery, Build 29 iPhone/PWA/A11y, Build 29.2 Speaking Loop, Build 30 Runtime Contracts/Bridge.

## Suite

1. gate terrain iPhone Voice Replay en parallèle ;
2. **V2.0.0 Freeze / Release** : geler et certifier la baseline existante, sans nouveau moteur.
