# Build 25 — Progression UX / Progressive Disclosure

Version : **v1.18.0**  
Statut : **PROD / CLOS**  
Date : **2026-08-11**

## Intention

Réduire drastiquement la charge cognitive de `Parcours` sans supprimer une capacité pédagogique ni modifier les données de Trân.

## Solution livrée

Nouveaux fichiers :

```text
progression-ux.js
progression-ux.css
.github/workflows/progression-ux-smoke.yml
```

Le module se charge après les moteurs existants et transforme uniquement leur présentation.

### Vue principale

- leçon actuelle ;
- progression globale ;
- leçons terminées ;
- acquis ;
- à revoir ;
- CTA vers la leçon actuelle.

### Détails

Les anciennes cartes techniques restent présentes derrière :

```text
Détails d’apprentissage
```

Memory/Mastery/A1 ne sont pas supprimés.

### Curriculum

Par défaut : **5 lignes** autour de la position actuelle.

`Voir les 40 leçons` affiche le parcours complet inchangé.

## Sécurité des données

Aucune migration et aucune écriture Build 25 dans :

```text
francais-avec-luc:learner:v1
french-tranquille:learning-memory:v1
french-tranquille:scenarios:v1
french-tranquille:listening:v1
```

Le module est une façade de rendu.

## Version / cache

```text
version = 1.18.0
build   = 25
cache   = tran-french-teacher-v1.18.0-b25-progression-ux
```

## Contrat leçon 8 validé

```text
current lesson = l8
completed = 7
known = 40
visible curriculum rows = 5
total curriculum rows = 40
expanded = 0
details open = 0
```

Les modes `expanded` et `details` prouvent respectivement que les **40 leçons** et les cartes **Memory / Mastery** restent accessibles.

## Preuves

### PR #31 — head `e170c8f893adedaa5bf0907177ea7fdad3835e5d`

- quality #93 — SUCCESS ;
- Options #24 — SUCCESS ;
- nav/mobile #43 — SUCCESS ;
- Progression UX #1 — SUCCESS ;
- compact / expanded / details — SUCCESS.

### Production — `main` `4f354221f923004b0cefdaf6b3281e51ba30dbf9`

- quality #94 — SUCCESS ;
- Options #25 — SUCCESS ;
- nav/mobile #44 — SUCCESS ;
- Progression UX #2 — SUCCESS ;
- GitHub Pages #90 — SUCCESS.

## Sanctuaires

Les garde-fous ont confirmé l’intégrité de :

```text
assets/LOGO.png
assets/Favicon.png
voice-ios.js
free-voice.js
```

La bottom navigation 24.5 et les données pédagogiques restent hors périmètre.

## Checklist de clôture

- [x] branche Build 25 créée ;
- [x] module Progression UX créé ;
- [x] CSS créé ;
- [x] cache/version câblés ;
- [x] docs candidat synchronisées ;
- [x] workflow Progression UX ajouté ;
- [x] PR #31 ouverte ;
- [x] quality PR verte ;
- [x] Options PR verte ;
- [x] nav/mobile PR verte ;
- [x] compact vert ;
- [x] expanded vert ;
- [x] details vert ;
- [x] merge `main` ;
- [x] mêmes tests verts sur `main` ;
- [x] GitHub Pages SUCCESS ;
- [x] README/ROADMAP/CHANGELOG clôturés.

**Build 25 est livré.**