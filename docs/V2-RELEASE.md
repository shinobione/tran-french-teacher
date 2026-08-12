# French Trân’quille — V2.0.0 Freeze / Release

## Statut

**V2.0.0 — CANDIDAT RELEASE**

V2 n’ajoute aucun nouveau moteur pédagogique. La release gèle et certifie la baseline déjà construite jusqu’au Build 30.

## Baseline gelée

```text
Version produit        2.0.0
Architecture           Build 30
Curriculum             40 leçons / 241 éléments
Scenario               36 situations / 108 tours
Listening              0.88 normal / 0.65 lent
Speaking Loop          max 2 moments / leçon
Coût récurrent         0 €
```

Le contrat machine correspondant vit dans `release-v2.json`.

## Couches protégées

- **Build 27 — App Shell Reset** : Aujourd’hui / Pratiquer / Progrès ;
- **Build 28 — Data & Recovery** : backup V2, restore transactionnel, rollback, snapshots, quarantaine ;
- **Build 29 — iPhone / PWA / Accessibility** : safe areas, touch, a11y, reduced motion, offline ;
- **Build 29.2 — Speaking Loop Variety & Clarity** : Tyffany, auto-écoute locale, anti-répétition, compréhension ≠ production ;
- **Build 30 — Architecture Hardening** : Runtime Contracts / Runtime Bridge / ownership / route facade.

## Stores durables gelés

```text
francais-avec-luc:learner:v1
french-tranquille:learning-memory:v1
french-tranquille:error-intelligence:v1
french-tranquille:scenarios:v1
french-tranquille:listening:v1
french-tranquille:milestones:v1
```

V2 ne migre ni ne renomme ces clés.

## Sanctuaires gelés

```text
app.js                  600f094266c9f0c4c7b57efdbf61129909ebd9cb
voice-ios.js            38e97aa3ef62dd6dcda224901b435f0973618679
free-voice.js           b4c19b1936c788ee017eac9ba14e5a62c159e8d5
assets/LOGO.png         64eaa6ad9781c6a9075d4f68615fc44344c4e21c
assets/Favicon.png      c358672368a960bf7617e5532aff3e3319cddb3e
```

La CI lit également ces hashes depuis `release-v2.json`.

## Changements runtime autorisés par le freeze

Seulement la plomberie de release :

- `FrenchTranquilleBuildMeta.version` passe à `2.0.0` ;
- `FrenchTranquilleRuntimeContracts.version` passe à `2.0.0` ;
- Architecture reste **Build 30** ;
- URLs versionnées Runtime Contracts / Runtime Bridge passent à `2.0.0-b30` ;
- le Service Worker précache le contrat de release et le smoke V2 ;
- Build 30 CI devient version-forward tout en exigeant toujours Architecture Build 30.

Aucune logique learner, Recovery, voix, curriculum, Scenario, Listening ou Speaking Loop n’est modifiée.

## Tribunal V2 dédié

Workflow : `.github/workflows/v2-release-freeze.yml`

### Contrat statique

- `release-v2.json` = version `2.0.0`, Architecture `30`, baseline `40/241`, `36/108`, `0.88/0.65`, max 2 moments, 0 € ;
- six stores uniques ;
- concordance Runtime Contracts ↔ Recovery ↔ release contract ;
- sanctuaires hashés ;
- aucune écriture depuis Runtime Contracts / Runtime Bridge ;
- assets de tribunal V2 présents dans le précache.

### Chrome desktop — profil propre

Le navigateur exige :

- version visible `v2.0.0 • Build 30` dans Options ;
- Runtime / release contract / backup V2 tous alignés sur `2.0.0 / 30` ;
- curriculum `40/241` ;
- Scenario `36/108` ;
- Listening `0.88/0.65` ;
- six stores Recovery ;
- backup V2 contenant six stores ;
- route réelle `Progrès → Aujourd’hui → Pratiquer` ;
- stores durables byte-identiques avant/après la navigation ;
- zéro overflow horizontal.

### Chrome mobile — ancienne utilisatrice

Le profil synthétique historique reste :

```text
7 leçons terminées
prochaine leçon l8
progress l8 = 4
40 acquis connus
```

Le tribunal exige ces valeurs après boot V2 et après le round-trip UI, avec stores durables inchangés.

## Tribunaux historiques

Le tribunal V2 ne remplace rien. Tous les workflows historiques restent actifs en parallèle : Recovery, iPhone/offline/a11y, Speaking Loop 29.1/29.2, Build 30 Architecture, Options, navigation, Progress, Scenario, Listening, qualité générale, etc.

La release ne sera pas déclarée PROD tant que :

1. le head exact de PR n’a pas tous ses fonctionnels verts ;
2. le runtime V2 n’est pas mergé sur `main` ;
3. le même tribunal n’est pas vert sur `main` ;
4. GitHub Pages n’a pas servi le SHA runtime exact ;
5. la clôture documentaire séparée n’a pas elle-même repassé la CI.

## Gate terrain iPhone séparé

Toujours ouvert :

```text
reconnaissance Free Voice
→ seconde prise locale
→ lecture
→ reconnaissance suivante toujours normale
```

Ce gate n’empêche pas de geler V2 avec le comportement actuel. Il empêche uniquement une évolution future vers la capture automatique du **premier essai exact** en parallèle de SpeechRecognition.

## Hors scope V2

- nouveau curriculum ;
- nouveau moteur ;
- nouvelle navigation ;
- nouveau score de prononciation ;
- capture automatique du premier essai ;
- migration/renommage des stores ;
- refonte esthétique ;
- API ou backend payant.
