# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## État actuel

### Production certifiée

- **v1.23.0 — Build 30 / Architecture Hardening**
- statut : **✅ PROD / CLOS**
- runtime production : `5a8369df9df536f41521acefb528da71efb168a8`
- PR runtime : **#71**
- head PR certifié : `ffa3ddf7a16dcbc32474701cfaf2f961e86d348c`
- tribunal PR : **21/21 workflows fonctionnels SUCCESS** ; un ancien Chrome Real Life III a nécessité un rerun inchangé, puis les leçons 20 / 35 / 40 ont toutes repassé
- tribunal runtime `main` : **21/21 workflows fonctionnels SUCCESS**
- GitHub Pages runtime : **#129 SUCCESS** sur le SHA exact
- total runtime `main` : **22/22 SUCCESS Pages incluse**

Baselines inchangées : curriculum **40 leçons / 241 éléments**, Scenario **36 situations / 108 tours**, Listening **0.88 normal / 0.65 lent**, coût **0 €**.

### Baseline historique qualité conservée

La CI protège toujours explicitement **v1.17.0 — Build 24 — Real Life French II** : **28 situations / 84 tours** avant Pack III, avec `real-life-data-2.js` comme référence historique. Build 30 n’efface donc pas les contrats plus anciens sous prétexte d’introduire une nouvelle frontière.

## 🏗️ Build 30 — Architecture Hardening

Build 30 ne réécrit pas brutalement le vieux cœur `app.js`. Il pose une **frontière architecturale explicite et testée** autour du runtime existant afin de préparer V2 sans mettre en danger les données réelles de Trân.

### Contrats canoniques

`runtime-contracts.js` centralise en lecture seule :

- les **6 stores durables** Recovery ;
- les snapshots de sécurité ;
- les invariants produit `40 / 241`, Scenario `36 / 108`, Listening `0.88 / 0.65`, Speaking Loop `max 2` ;
- les propriétaires des APIs globales ;
- les phases de boot ;
- les routes principales `today / practice / progress` ;
- les sanctuaires.

Le contrat est gelé avec `Object.freeze` et n’écrit dans aucun store.

### Runtime Bridge

`runtime-bridge.js` expose désormais une frontière stable :

```text
FrenchTranquilleRuntime.snapshot()
FrenchTranquilleRuntime.refresh()
FrenchTranquilleRuntime.route('today' | 'practice' | 'progress')
FrenchTranquilleRuntime.openLesson(id)
```

Le bridge observe Curriculum, learner, stores, APIs et navigation **sans prendre possession de leurs données**.

### Pourquoi cette approche

Le produit moderne s’est construit autour d’un noyau historique très sollicité. Une extraction massive aurait créé un risque disproportionné. Build 30 adopte donc un **strangler refactor** : l’ancien cœur reste le témoin de référence, tandis que les prochaines extractions pourront se faire derrière des contrats connus et testables.

`app.js` est volontairement resté **byte-identique** pendant ce build.

## 🧪 Tribunal Architecture

Le nouveau smoke Chrome desktop + mobile vérifie réellement :

- Runtime boundary prête ;
- curriculum **40 / 241** ;
- aucun propriétaire ou store dupliqué ;
- Recovery / Build 27 Shell / Speaking Loop présents ;
- navigation réelle **Progrès → Aujourd’hui → Pratiquer** via le bridge ;
- **JSON learner brut strictement identique avant/après** ;
- un seul onglet actif ;
- zéro overflow horizontal.

Les anciens tribunaux restent actifs en parallèle : Recovery, App Shell, iPhone/offline, Listening, Scenario, Progress, Options, navigation et Speaking Loop.

## 🎙️ Speaking Loop / audio

Le comportement Build 29.2 reste inchangé :

- `🔊 Nghe Tyffany` / `🔊 Écouter Tyffany` comme modèle natif ;
- `↻ Ghi âm lại` / `↻ Enregistrer à nouveau` après la prise ;
- compréhension ≠ production orale ;
- planificateur contextualisé et anti-répétition ;
- **2 moments maximum par leçon** ;
- aucun faux score de prononciation ;
- audio de réécoute local, volontaire, ≤9 s, sans upload ni persistance.

## 🎧 Gate terrain iPhone encore ouvert

La propre voix est bien réécoutable après enregistrement. Le gate plus sensible reste à valider sur le vrai iPhone :

```text
reconnaissance Free Voice
→ seconde prise locale
→ lecture
→ reconnaissance suivante toujours normale
```

Tant que ce gate n’est pas validé, aucun enregistrement automatique du premier essai exact n’est lancé en parallèle de SpeechRecognition.

## 🛡️ Sanctuaires

Build 30 conserve notamment :

- `app.js` — `600f094266c9f0c4c7b57efdbf61129909ebd9cb` ;
- `voice-ios.js` — `38e97aa3ef62dd6dcda224901b435f0973618679` ;
- `free-voice.js` — `b4c19b1936c788ee017eac9ba14e5a62c159e8d5` ;
- `assets/LOGO.png` — `64eaa6ad9781c6a9075d4f68615fc44344c4e21c` ;
- `assets/Favicon.png` — `c358672368a960bf7617e5532aff3e3319cddb3e` ;
- learner canonique `francais-avec-luc:learner:v1`.

Build 27 App Shell, Build 28 Recovery, Build 29 iPhone/PWA/A11y et Build 29.2 Speaking Loop restent protégés par leurs CI historiques.

## Suite

1. Gate terrain iPhone Build 26.1 en parallèle.
2. **V2.0.0 — Freeze / Release** : aucune nouvelle usine à gaz ; on certifie le produit existant comme release cohérente, sauvegardable, restaurable, testée et documentée.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md` et `docs/BUILD-30-ARCHITECTURE-HARDENING.md`.
