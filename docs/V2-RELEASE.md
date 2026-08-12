# French Trân’quille — V2.0.0 Freeze / Release

## Statut

# ✅ V2.0.0 — PROD / CLOS

V2 n’ajoute aucun nouveau moteur pédagogique. La release gèle et certifie la baseline construite jusqu’au **Build 30**.

## Baseline gelée

```text
Version produit        2.0.0
Architecture           Build 30
Curriculum             40 leçons / 241 éléments
Scenario               36 situations / 108 tours
Listening              0.88 normal / 0.65 lent
Speaking Loop          max 2 moments / leçon
Stores durables        6
Coût récurrent         0 €
```

Le contrat machine correspondant vit dans `release-v2.json` avec le statut lifecycle-neutral `freeze`.

## Preuves de certification

### PR runtime V2 #73

```text
head c221fa9600d23dd83b87225cc4accce01e83cfe6
22 / 22 workflows fonctionnels SUCCESS
```

Aucun nouveau curriculum, aucun moteur, aucune navigation, aucune migration learner.

### Runtime applicatif

```text
5f2c486b3e455220ebd903f25ee766ff2430e4a5
GitHub Pages #131 SUCCESS
```

Sur ce `main`, l’ancien Progression UX a reproduit un problème **de runner Chrome non borné** qu’il n’avait pas reproduit sur le head PR. Tous les autres fonctionnels et Pages étaient verts ; aucune régression PWA n’était observée.

### PR CI-only #74

```text
head 0fbd3b8e8124b3beaf7d6086d8a837580abb2cb3
1 fichier .github/workflows/progression-ux-smoke.yml
22 / 22 workflows fonctionnels SUCCESS
```

Le patch conserve exactement les quatre scénarios et assertions Progression, mais ajoute :

- profils Chrome isolés ;
- `disable-background-timer-throttling` ;
- `disable-renderer-backgrounding` ;
- timeout / kill-after ;
- maximum trois tentatives bornées.

**Aucun fichier PWA/runtime n’a changé.**

### Baseline finale de certification

```text
main 6e0f5cde97cfba0572efccc6344a8bd6cbe7a315
22 / 22 workflows fonctionnels SUCCESS
GitHub Pages #132 SUCCESS
23 / 23 workflows SUCCESS au total
```

Cette baseline sert exactement le même code applicatif V2 que `5f2c486…` ; seul le tribunal Progression UX est devenu reproductible.

## Contrat de release

`release-v2.json` gèle :

- version `2.0.0` ;
- Architecture Build `30` ;
- `40/241` ;
- Scenario `36/108` ;
- Listening `0.88/0.65` ;
- Speaking Loop max `2` ;
- coût `0 €` ;
- six stores durables ;
- hashes sanctuaires ;
- gate terrain iPhone encore ouvert.

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

## Couches protégées

- **Build 27 — App Shell Reset** : Aujourd’hui / Pratiquer / Progrès ;
- **Build 28 — Data & Recovery** : backup V2, restore transactionnel, rollback, snapshots, quarantaine ;
- **Build 29 — iPhone / PWA / Accessibility** : safe areas, touch, a11y, reduced motion, offline ;
- **Build 29.2 — Speaking Loop Variety & Clarity** : Tyffany, auto-écoute locale, anti-répétition, compréhension ≠ production ;
- **Build 30 — Architecture Hardening** : Runtime Contracts / Runtime Bridge / ownership / route facade.

## Tribunal V2 dédié

Workflow : `.github/workflows/v2-release-freeze.yml`.

### Contrat statique

- Release Contract exact ;
- six stores uniques ;
- Runtime Contracts ↔ Recovery ↔ Release Contract ;
- hashes sanctuaires ;
- aucune écriture depuis Runtime Contracts / Runtime Bridge ;
- assets V2 présents dans le précache PWA.

### Chrome desktop — profil propre

- Options affiche `v2.0.0 • Build 30` ;
- Runtime / Release Contract / backup V2 alignés ;
- `40/241`, `36/108`, `0.88/0.65` ;
- backup V2 à six stores ;
- `Progrès → Aujourd’hui → Pratiquer` ;
- stores durables byte-identiques avant/après ;
- zéro overflow horizontal.

### Chrome mobile — ancienne utilisatrice

Le profil historique reste :

```text
7 leçons terminées
prochaine leçon l8
progress l8 = 4
40 acquis connus
```

Ces valeurs restent intactes après le boot et le round-trip V2.

## Tribunaux historiques

Le tribunal V2 ne remplace aucun garde : Recovery, iPhone/offline/a11y, Speaking Loop 29.1/29.2, Build 30 Architecture, Options, navigation, Progress, Scenario, Listening et qualité générale continuent de tourner.

La finalisation CI de Progression garantit désormais qu’un runner Chrome ne peut plus rester vivant indéfiniment pendant un freeze.

## Gate terrain iPhone séparé

Toujours ouvert :

```text
reconnaissance Free Voice
→ seconde prise locale
→ lecture
→ reconnaissance suivante toujours normale
```

Ce gate **ne remet pas V2 en cause**. Il bloque uniquement une éventuelle future capture automatique du **premier essai exact** en parallèle de SpeechRecognition.

## Hors scope V2

- nouveau curriculum ;
- nouveau moteur ;
- nouvelle navigation ;
- score de prononciation artificiel ;
- capture automatique du premier essai ;
- migration/renommage des stores ;
- refonte esthétique ;
- API ou backend payant.

## Après le freeze

Aucun Build 31 automatique. La prochaine roadmap doit venir d’un besoin terrain observé, pas d’une envie d’empiler une couche de plus.
