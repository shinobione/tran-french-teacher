# French Trân’quille — ARCHITECTURE

## Vue générale — Produit V2.1.0 / Architecture gelée Build 30

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
Build 31 — Learner Intelligence Core
progression + mémoire + erreurs → score / confiance / priorité
        ↓
Produit courant V2.1.0 / Build 31
```

La PWA reste statique sur GitHub Pages, sans backend obligatoire ni API payante.

# Deux niveaux de version désormais distincts

```text
Produit courant         2.1.0 / Build 31
Architecture gelée      2.0.0 / Build 30
Release Contract V2     2.0.0 / Build 30
Curriculum courant      40 / 241
Scenario                36 / 108
Listening               0.88 / 0.65
Speaking Loop           max 2 / leçon
Stores durables         6
Coût récurrent          0 €
```

Cette séparation est intentionnelle : Build30 devient le **socle d’architecture stable**, pas un verrou empêchant toute V2.x future.

`build-meta.js` décrit la version produit courante. `runtime-contracts.js`, `runtime-bridge.js` et `release-v2.json` restent gelés sur 2.0.0 / Build30.

---

# Build 31 — Learner Intelligence Core

Modules :

```text
build31-loader.js
learner-intelligence.js
learner-intelligence.css
learner-intelligence-smoke.js
```

Exposition : `window.FrenchTranquilleLearnerIntelligence`.

## Responsabilité

Build31 **observe et agrège**. Il ne devient propriétaire d’aucun store.

Sources lues :

- learner canonique : progression, leçons terminées, acquis connus ;
- Learning Memory : attempts, statut, échéance, rétention observable ;
- Error Intelligence : récence, répétition, récupération, priorité ;
- Curriculum : leçon d’origine de chaque item ;
- contexte/source des preuves déjà enregistrées.

Aucune écriture durable depuis `learner-intelligence.js` ou `build31-loader.js`.

## Bandes unifiées

```text
1–7    Survival A0
8–15   Daily A0
16–20  Foundations A1
21–25  First Exchanges A1
26–40  A1 Core
```

Les deux anciens calculs Mastery historiques restent disponibles et inchangés. Build31 ajoute une **vue unifiée au-dessus d’eux** sans réécrire leur état.

## Sorties du modèle

Pour chaque item :

- connu / non connu ;
- leçon terminée ;
- preuve Memory ;
- statut `new / fragile / learning / solid` ;
- due / non due ;
- rétention estimée à partir des preuves existantes ;
- pression Error Intelligence ;
- risque de fragilité ;
- types de contextes observés.

Pour chaque bande :

- couverture leçons ;
- couverture acquis ;
- couverture de révision ;
- rétention ;
- pression de risque ;
- score interne 0–100 ;
- **confiance séparée 0–100** ;
- état `locked / exploring / learning / consolidating / strong`.

Profil global :

```text
A0
A0+
Pré-A1
A1-
A1
```

Ces libellés servent à l’adaptation interne. Ils ne constituent **ni un examen ni une certification CECRL**.

## Recommandation suivante

Ordre actuel :

1. acquis à forte priorité Error + fragile/dû ;
2. courte révision si plusieurs fragiles/dus ;
3. prochaine leçon incomplète ;
4. pratique ciblée si curriculum terminé mais preuves insuffisantes ;
5. entretien si aucun besoin urgent.

Le moteur retourne une intention unique : `review`, `lesson`, `practice` ou `maintain`.

## Neutralité voix

`sourceKind()` classe toute source `voice-*` comme **`recognition`**.

```text
non-reconnaissance vocale
≠ mauvaise prononciation prouvée
≠ score phonétique
```

Build31 peut considérer la non-reconnaissance comme un signal de difficulté du système d’interaction, mais ne la transforme jamais en diagnostic phonétique.

Le pipeline iPhone exact-first-attempt reste hors scope.

---

# UI Build 31

Build31 n’ajoute aucune route ni aucun onglet.

Dans **Progrès** :

- une carte compacte ;
- niveau interne ;
- indice interne ;
- confiance ;
- priorité suivante ;
- `<details>` replié par défaut pour les cinq bandes.

Dans **Options** :

- une ligne diagnostic du Learner Model ;
- la version produit principale reste gérée par BuildMeta.

Progressive disclosure reste la règle : le modèle peut être riche sans devenir un dump permanent.

---

# Runtime Contracts — socle gelé

Module : `runtime-contracts.js`.

Exposition : `window.FrenchTranquilleRuntimeContracts`.

Version gelée : **2.0.0 / Build 30**.

## Stores canoniques

```text
learner     francais-avec-luc:learner:v1
memory      french-tranquille:learning-memory:v1
errors      french-tranquille:error-intelligence:v1
scenarios   french-tranquille:scenarios:v1
listening   french-tranquille:listening:v1
milestones  french-tranquille:milestones:v1
```

Build31 n’ajoute **aucun septième store**.

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
architecture → Runtime Contracts / Runtime Bridge
intelligence → Learner Intelligence (read-only aggregator)
release      → BuildMeta / SpeakingLoop
```

Les noms internes `Lucie*`, `luc-*`, `lucie-*` restent compatibles malgré le branding visible **Tyffany**.

---

# Runtime Bridge

Module : `runtime-bridge.js`.

Exposition : `window.FrenchTranquilleRuntime`.

Version d’architecture gelée : **2.0.0 / Build 30**.

```text
snapshot()
refresh()
route('today' | 'practice' | 'progress')
openLesson(id)
lastSnapshot()
```

Le bridge reste read-only vis-à-vis des stores durables.

Le cœur historique `app.js` reste le témoin de référence ; Build30 conserve sa **strangler boundary**.

---

# V2 Freeze Compatibility

`release-v2.json` reste une photographie machine-readable du freeze V2.0 :

- version `2.0.0` ;
- Architecture Build `30` ;
- curriculum au freeze `40 / 241` ;
- Scenario `36 / 108` ;
- Listening `0.88 / 0.65` ;
- Speaking max 2 ;
- six stores ;
- hashes sanctuaires ;
- gate exact-first-attempt ouvert.

Le workflow `.github/workflows/v2-release-freeze.yml` est désormais nommé **V2.0.0 Freeze compatibility tribunal**.

Il ne prétend plus que la version produit doit rester éternellement 2.0.0. Il exige à la place :

- release contract toujours exactement 2.0/30 ;
- Runtime Contracts toujours exactement 2.0/30 ;
- produit courant dans la famille V2 et Build ≥30 ;
- backup Recovery aligné sur la version produit courante ;
- Options alignées sur BuildMeta courant ;
- cardinalités et invariants gelés toujours présents ;
- ancien utilisateur exact ;
- stores inchangés pendant round-trip ;
- sanctuaires exacts.

---

# Recovery

Build 28 reste propriétaire des données durables.

Fonctions protégées :

- backup V2 six stores ;
- snapshots pré-restore / pré-migration / pré-reset ;
- last-good ;
- quarantaine ;
- restore transactionnel ;
- rollback ;
- compatibilité backup V1 sans effacement des stores modernes.

Sous Build31, `backupObject()` doit annoncer **la version produit courante 2.1.0 / Build31**, tandis que la liste de six stores et les contrats Recovery restent inchangés.

Toute future **Memory Evidence v2** devra passer par une vraie stratégie de migration Recovery avant de modifier ce schéma.

---

# App Shell / iPhone

Build 27 : Aujourd’hui / Pratiquer / Progrès, cockpit détaillé réservé DEBUG FR.

Build 29 : safe areas, targets tactiles ≥44 px, focus visible, `aria-current`, `VisualViewport`, reduced motion, boot offline et matrice mobile.

Build31 ne touche aucune de ces couches.

---

# Speaking Loop / voix

Build 29.2 reste inchangé :

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

Ce gate bloque uniquement une future capture automatique du premier essai en parallèle de SpeechRecognition. **Il ne bloque ni Content Build32, ni l’intelligence de niveau, ni une future migration Memory correctement conçue.**

---

# CI actuelle

Avec Build31 :

- **24 workflows fonctionnels** ;
- + GitHub Pages sur `main` ;
- PR #77 : 24/24 fonctionnels SUCCESS ;
- runtime main `e2b2c6293f35495fa8bbffd2e6b684fba897df88` : **25/25 SUCCESS**, Pages #135 comprise.

Le workflow Build31 vérifie notamment :

- 5 bandes = exactement 40 / 241 ;
- clean → leçon 1 ;
- ancien profil → leçon 8 ;
- ancien profil exact 7 / l8=4 / 40 ;
- neutralité voice-recognition ;
- six stores byte-identiques ;
- desktop + mobile 390×844 ;
- zéro overflow horizontal.

---

# Baseline historique Real Life protégée

`real-life-data-2.js` reste le témoin **v1.17.0 — Build 24 — Real Life French II** : **28 situations / 84 tours** avant Pack III.

Production actuelle : **36 situations / 108 tours**.

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

## Suite architecture

**Build 32** étendra d’abord le contenu sans migration des stores. **Memory Evidence v2** restera une phase distincte avec schéma, snapshots, migration transactionnelle, rollback et old-user smoke.