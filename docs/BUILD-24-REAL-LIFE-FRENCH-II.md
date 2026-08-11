# Build 24 — Real Life French II

## Cible

- **v1.17.0 — Build 24** ;
- socle : Build 23 PROD ;
- curriculum inchangé : **40 / 241** ;
- coût : **0 €**.

## Objectif

Ajouter des scènes personnelles pour les acquis l9→l20 sans créer de nouveau menu et sans recopier les scénarios génériques existants.

## Pack II

10 situations / 30 tours :

| ID | Axe | Prérequis |
|---|---|---|
| `jerry-rdv-train` | destination + billet + heure | l9,l10 |
| `jerry-shopping-budget` | trop cher + choisir + carte | l11 |
| `jerry-diner-choix` | préférence + commander + bilan | l5,l12 |
| `jerry-mal-dehors` | douleur + pharmacie + urgence | l8,l13 |
| `jerry-presente-fiance` | présenter Jerry | l14 |
| `jerry-prete-rentrer` | être + vouloir + pouvoir | l16,l18 |
| `jerry-reservation-aide` | avoir + question + aide | l17 |
| `jerry-cle-appartement` | clé + porte + aide | l18,l19 |
| `jerry-probleme-eau` | logement + eau chaude + aide | l17,l19 |
| `jerry-reseau-message` | appel + réseau + message | l20 |

Total Scenario candidat : **28 situations / 84 tours**.

## UX catalogue

L’augmentation du contenu ne doit pas augmenter la charge visuelle.

Build 24 limite la vue par défaut à :

```text
6 situations ouvertes maximum
2 situations futures verrouillées maximum
```

Les scènes personnelles ouvertes sont triées vers les prérequis les plus récents. Les autres restent accessibles via boutons de dévoilement.

## Profils smoke

### lesson8

Le smoke Build 23 doit rester inchangé : 5 scènes Real Life I ouvertes, zéro perte de progression.

### lesson15

Avec l1→l15 terminées :

- 5 scènes Pack II ouvertes ;
- au moins 11 scènes personnelles ouvertes au total ;
- seulement 6 situations ouvertes visibles par défaut.

### lesson20

Avec l1→l20 terminées :

- 10 scènes Pack II ouvertes ;
- 16 scènes personnelles ouvertes au total ;
- seulement 6 situations ouvertes visibles par défaut ;
- téléphone et logement disponibles.

## Stockage

Aucune nouvelle clé. Toujours :

```text
french-tranquille:scenarios:v1
```

## Sanctuaires

Doivent rester byte-identiques :

```text
assets/LOGO.png
assets/Favicon.png
voice-ios.js
free-voice.js
```

## Critères de clôture

- [x] pack II 10 / 30 ;
- [x] UX catalogue max 6 ouverts / 2 verrouillés ;
- [x] runtime/cache Build 24 ;
- [x] docs candidat ;
- [ ] Scenario total 28 / 84 validé ;
- [ ] références d’items valides ;
- [ ] smoke l8 vert ;
- [ ] smoke l15 : pack II=5, visibles=6 ;
- [ ] smoke l20 : pack II=10, visibles=6 ;
- [ ] Error / Listening / Adaptive verts ;
- [ ] hashes sanctuaires verts ;
- [ ] PR verte ;
- [ ] main vert ;
- [ ] Pages verte ;
- [ ] docs release CLOS.

## Suite

Build 25 — Real Life French III : problèmes, émotions et conversations moins guidées, toujours sans augmenter la complexité du shell.
