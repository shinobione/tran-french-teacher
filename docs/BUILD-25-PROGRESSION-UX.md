# Build 25 — Progression UX / Progressive Disclosure

Version candidate : **v1.18.0**  
Statut : **CANDIDAT / EN COURS**  
Date : **2026-08-11**

## Intention

Réduire drastiquement la charge cognitive de `Parcours` sans supprimer une seule capacité pédagogique ni modifier les données de Trân.

## Problème terrain

Les captures montrent un écran Progression très long : Memory, Mastery, A1, situations, éléments acquis et liste des 40 leçons s’empilent dans un seul flux.

La donnée est utile. Son exposition permanente ne l’est pas.

## Solution

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

Toutes les anciennes cartes techniques restent présentes derrière un seul `<details>` :

```text
Détails d’apprentissage
```

Aucune carte Memory/Mastery n’est supprimée.

### Curriculum

Par défaut : 5 lignes autour de la position actuelle.

Bouton :

```text
Voir les 40 leçons
```

pour afficher le parcours complet.

## Sécurité des données

Aucune migration.

Aucune écriture spécifique Build 25 dans :

```text
francais-avec-luc:learner:v1
french-tranquille:learning-memory:v1
french-tranquille:scenarios:v1
french-tranquille:listening:v1
```

Le module Progression UX est une façade de rendu.

## Sanctuaires

Hashes historiques inchangés attendus :

```text
assets/LOGO.png
assets/Favicon.png
voice-ios.js
free-voice.js
```

Bottom navigation 24.5 hors périmètre.

## Version / cache

```text
version = 1.18.0
build   = 25
cache   = tran-french-teacher-v1.18.0-b25-progression-ux
```

## Contrats navigateur

### Smoke compact — profil leçon 8

Attendu :

```text
current lesson = l8
completed = 7
known = 40
visible curriculum rows = 5
total curriculum rows = 40
expanded = 0
details open = 0
```

### Smoke expanded

Attendu :

```text
visible curriculum rows = 40
expanded = 1
current lesson = l8
```

### Smoke details

Attendu :

```text
details open = 1
memory-progress-card visible dans le DOM
mastery-progress-card visible dans le DOM
```

## Garde-fous globaux à conserver

- quality historique ;
- Options smoke ;
- nav/mobile smoke ;
- aucune fatal card ;
- curriculum 40/241 ;
- Scenario 28/84 ;
- Error 20/120 ;
- Listening ;
- Adaptive Language ;
- ancien profil l8.

## Checklist de clôture

- [x] branche Build 25 créée ;
- [x] module Progression UX créé ;
- [x] CSS créé ;
- [x] cache/version candidat câblé ;
- [x] docs candidat synchronisées ;
- [x] workflow Progression UX ajouté ;
- [ ] PR ouverte ;
- [ ] quality PR verte ;
- [ ] Options PR verte ;
- [ ] nav/mobile PR verte ;
- [ ] Progression UX smoke compact vert ;
- [ ] Progression UX smoke expanded vert ;
- [ ] Progression UX smoke details vert ;
- [ ] merge `main` ;
- [ ] mêmes tests verts sur `main` ;
- [ ] GitHub Pages SUCCESS ;
- [ ] contrôle URL publique ;
- [ ] README/ROADMAP/CHANGELOG passés en PROD/CLOS.

Le build ne sera marqué livré qu’après la dernière case.