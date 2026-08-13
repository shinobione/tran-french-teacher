# French Trân’quille — ARCHITECTURE

## Vue générale — Produit V2.2.0 / Architecture gelée Build 30

```text
iPhone / Safari / PWA
        ↓
Build 29 — iPhone / PWA / Accessibility
safe areas / touch / a11y / VisualViewport / offline
        ↓
Build 28 — Recovery Engine
validation / last-good / snapshots / rollback
        ↓
Legacy Core historique
40 leçons / 241 éléments
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
frontière stable / read-only / ownership / routing
        ↓
Build 29.2 — Speaking Loop
Tyffany → prise locale → Ma voix → recap contextualisé
52/52 · max 2 / leçon
        ↓
Build 32 — Learner Intelligence 2.2
7 bandes / 52 / 313 → score / confiance / priorité
        ↓
Produit courant V2.2.0 / Build 32
```

La PWA reste statique sur GitHub Pages, sans backend obligatoire ni API payante.

# Trois vérités séparées

```text
Produit courant         2.2.0 / Build 32
Architecture gelée      2.0.0 / Build 30
Release Contract V2     2.0.0 / Build 30
Curriculum au freeze    40 / 241
Curriculum courant      52 / 313
Scenario courant        44 / 132
Listening               0.88 / 0.65
Speaking Loop           52/52 · max 2 / leçon
Stores durables         6
Coût récurrent          0 €
```

La distinction est intentionnelle : une **baseline gelée** décrit ce qui a été certifié à un instant donné ; un **successeur** peut grandir au-dessus sans falsifier cette photographie.

`build-meta.js` décrit la version produit courante. `runtime-contracts.js`, `runtime-bridge.js` et `release-v2.json` restent gelés sur **2.0.0 / Build30**.

---

# Curriculum : cœur historique + successeur

## Cœur historique

Sans `curriculum-stage4.js`, le runtime historique reste :

```text
40 leçons
241 éléments
```

La CI reconstruit explicitement cette combinaison à partir de `app.js`, `curriculum-stage2.js` et `curriculum-stage3.js`.

Build32 exige que les **40 premiers lesson IDs** et les **241 premiers item IDs** restent dans le même ordre.

## Stage 4

Module : `curriculum-stage4.js`.

```text
41–46  Autonomie A1
47–52  Interaction A1
```

Stage 4 ajoute exactement **12 leçons / 72 éléments**, soit un produit courant **52 / 313**.

Le module est additif et read-only vis-à-vis des stores durables. Il n’effectue aucune migration.

`curriculum-stage4.css` ajoute uniquement une petite note pédagogique de structure dans les leçons 41–52.

---

# Build 32 Loader / replay historique

Modules :

```text
build31-loader.js
build32-loader.js
build32-shell-extension.js
```

Le rôle de `build31-loader.js` est maintenant double :

1. permettre aux tribunaux historiques (`b31Audit`, `b30Audit`, anciens `*Smoke`) de rejouer leur monde certifié sans injection automatique de Stage 4 ;
2. déléguer le runtime courant à `build32-loader.js` en usage normal, `v2Audit` et `b32Audit`.

`build32-loader.js` charge dans l’ordre :

```text
curriculum-stage4
→ extension App Shell 41–52
→ Real Life Pack IV
→ Listening II
→ Learner Intelligence 2.2
```

Cette stratégie conserve un **Build31 réellement rejouable** plutôt que de modifier ses assertions jusqu’à ce qu’elles correspondent artificiellement au produit courant.

---

# App Shell Build32

`build32-shell-extension.js` n’édite pas le cœur `build27-app-shell.js`.

Il ajoute deux étapes au parcours complet :

```text
Autonomie A1    41–46
Interaction A1  47–52
```

Le Journey courant contient donc **7 étapes**. Le tribunal Build32 exige exactement **6 lignes** dans chacune des deux nouvelles étapes.

Pour un profil ayant terminé les anciennes leçons 1–40, la prochaine leçon devient **l41**.

Pour l’ancien profil de régression : **7 leçons terminées / l8=4 / 40 acquis**, la prochaine leçon reste **l8**.

---

# Real Life Pack IV

Module : `real-life-data-4.js`.

Ajoute **8 situations / 24 tours** :

- demander une reformulation à un guichet ;
- comparer puis choisir un achat ;
- invitation/refus avec Jerry ;
- rendez-vous médical ;
- consigne au travail ;
- panne/réparation d’appartement ;
- train en retard / correspondance ;
- petit échange naturel avec `on`.

Le Scenario Engine courant devient :

```text
44 situations / 132 tours
```

Chaque `turn.items` du Pack IV doit pointer vers un vrai ID du curriculum courant.

### Baseline historique Real Life

`real-life-data-2.js` reste le témoin canonique de **v1.17.0 — Build 24 — Real Life French II** : **28 situations / 84 tours** avant Pack III.

Cette référence historique continue d’être testée sans charger Pack III/IV.

---

# Listening II

Module : `listening-data-2.js`.

Ajoute :

- **4 contrastes** ;
- **8 mini-dialogues**.

Les exercices réutilisent les nouveaux acquis sans créer un nouveau moteur d’écoute.

La couche vocale finale reste :

```text
normal  0.88
lent    0.65
```

`voice-ios.js` reste byte-identique.

---

# Learner Intelligence 2.2

Module courant : `learner-intelligence-v2.js`.

Exposition : `window.FrenchTranquilleLearnerIntelligence`.

Build32 observe et agrège ; il ne devient propriétaire d’aucun store.

## Sept bandes

```text
1–7    Survival A0
8–15   Daily A0
16–20  Foundations A1
21–25  First Exchanges A1
26–40  A1 Core
41–46  Autonomie A1
47–52  Interaction A1
```

Le modèle raisonne donc sur **52 leçons / 313 éléments**.

Pour chaque acquis il conserve les concepts introduits en Build31 : connu, leçon terminée, preuve Memory, `new/fragile/learning/solid`, échéance, rétention, pression Error, risque et types de contexte.

Pour chaque bande : couverture, révision, rétention, risque, score interne, **confiance séparée** et état.

Profil interne possible :

```text
A0
A0+
Pré-A1
A1-
A1
A1+
```

`A1+` est uniquement une **étiquette interne d’adaptation**. Aucun de ces libellés ne constitue une certification CECRL.

## Neutralité voix

`sourceKind()` classe `voice-*` comme `recognition`.

```text
non-reconnaissance vocale
≠ mauvaise prononciation prouvée
≠ score phonétique
```

Aucun changement du gate exact-first-attempt.

---

# Build31 reste rejouable

Les modules historiques restent présents :

```text
learner-intelligence.js
learner-intelligence-smoke.js
```

Lors de `b31Audit`, BuildMeta et le loader reconstruisent :

```text
Produit 2.1.0 / Build31
40 leçons / 241 éléments
5 bandes
```

Le tribunal Build31 vérifie toujours clean learner → l1 et ancien learner → l8, avec les stores inchangés.

---

# Runtime Contracts — socle gelé

Module : `runtime-contracts.js`.

Version : **2.0.0 / Build30**.

## Stores canoniques

```text
learner     francais-avec-luc:learner:v1
memory      french-tranquille:learning-memory:v1
errors      french-tranquille:error-intelligence:v1
scenarios   french-tranquille:scenarios:v1
listening   french-tranquille:listening:v1
milestones  french-tranquille:milestones:v1
```

Build32 n’ajoute **aucun septième store**.

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
legacyCore   → Curriculum historique
content      → Stage 4 / Packs de réutilisation
recovery     → Recovery
voice        → LucieVoice / FreeVoice / VoiceReplay
learning     → Memory / Error / Mastery / DailyCoach / Language
practice     → Listening / Scenario / Real Life
presentation → UX historiques + Build27 + extension Build32
architecture → Runtime Contracts / Runtime Bridge
intelligence → Learner Intelligence (read-only aggregator)
release      → BuildMeta / SpeakingLoop
```

Les noms internes `Lucie*`, `luc-*`, `lucie-*` restent compatibles malgré le branding visible **Tyffany**.

---

# Runtime Bridge

Module : `runtime-bridge.js`.

Exposition : `window.FrenchTranquilleRuntime`.

Version d’architecture gelée : **2.0.0 / Build30**.

```text
snapshot()
refresh()
route('today' | 'practice' | 'progress')
openLesson(id)
lastSnapshot()
```

Le bridge reste read-only vis-à-vis des stores durables. Le cœur historique `app.js` reste le témoin de référence.

---

# V2 Freeze Compatibility

`release-v2.json` reste une photographie du freeze V2.0 :

- release `2.0.0` ;
- Architecture Build `30` ;
- curriculum au freeze **40 / 241** ;
- Scenario **36 / 108** ;
- Listening **0.88 / 0.65** ;
- Speaking max 2 ;
- six stores ;
- hashes sanctuaires ;
- gate exact-first-attempt ouvert.

Le workflow `V2.0.0 Freeze compatibility tribunal` distingue maintenant :

1. **les marqueurs historiques gelés** — qui restent 40/241, 36/108, 2.0/30 ;
2. **le produit courant** — qui doit être une V2.x compatible et un superset du curriculum gelé.

Sous Build32, le tribunal exige notamment :

```text
frozen curriculum = 40 / 241
current curriculum >= 40 / 241
current metadata = 2.2.0 / 32
backup + Options = metadata courant
six stores = inchangés
```

Ainsi, ajouter du contenu n’efface pas la valeur probante de V2.0.

---

# Recovery

Build28 reste propriétaire des données durables : backup V2, snapshots, quarantaine, restore transactionnel, rollback et compat vieux backups.

Build32 ne requiert aucune migration : les nouvelles leçons sont simplement ajoutées après l40.

Une future **Memory Evidence v2** ne sera pas adoptée parce que le schéma « semble mieux ». Avant toute écriture durable, il faudra :

```text
modèle de preuves
→ schéma candidat
→ snapshot pre-migration
→ validation source
→ transformation déterministe
→ écriture transactionnelle
→ relecture
→ rollback
→ vieux backups
→ ancien-utilisateur
```

Ce chantier devient **Build33 — Migration Readiness** avant toute migration runtime.

---

# App Shell / iPhone

Build27 reste la façade principale : Aujourd’hui / Pratiquer / Progrès.

Build29 conserve safe areas, targets tactiles ≥44 px, focus visible, `aria-current`, `VisualViewport`, reduced motion, boot offline et matrice mobile.

Build32 n’édite ni Build27 core, ni Build29 core ; il ajoute son extension de Journey et son contenu au-dessus.

---

# Speaking Loop / voix

Build29.2 reste le propriétaire du Speaking Loop :

```text
enseignement
→ cible orale utile
→ Nghe / Écouter Tyffany
→ seconde prise locale volontaire
→ Ma voix
→ recap contextualisé
```

Build32 réutilise ce moteur et exige **52/52 leçons couvertes**, max 2 moments.

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

Ce gate bloque uniquement une future capture automatique du premier essai en parallèle de SpeechRecognition. Il ne bloque ni le contenu Build32 ni le design Memory Evidence v2.

---

# Certification Build32

```text
PR #79 head
b64539e8f463bde8cabc05cd606f3132b01e2da8
→ 25/25 fonctionnels SUCCESS

runtime main
269cb0b476ea131cfbe086a87bcc4364ec39c342
→ 26/26 SUCCESS Pages comprise
→ GitHub Pages #137 SUCCESS
```

Les audits couvrent clean learner, ancien profil l8, profil l40→l41, 7 étapes, 52/313, Scenario 44/132, Listening II, Speaking 52/52, stores inchangés et zéro overflow horizontal.

---

# Sanctuaires

```text
app.js                  600f094266c9f0c4c7b57efdbf61129909ebd9cb
voice-ios.js            38e97aa3ef62dd6dcda224901b435f0973618679
free-voice.js           b4c19b1936c788ee017eac9ba14e5a62c159e8d5
assets/LOGO.png         64eaa6ad9781c6a9075d4f68615fc44344c4e21c
assets/Favicon.png      c358672368a960bf7617e5532aff3e3319cddb3e
francais-avec-luc:learner:v1
```

Aucun de ces sanctuaires n’a été modifié par Build32.