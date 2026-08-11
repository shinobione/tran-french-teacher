# Build 19 — A1 Core

## Cible

- version : **v1.12.0** ;
- build : **19** ;
- phase : **PWA-4B / A1 Core** ;
- ancienne base : **25 leçons / 148 éléments** ;
- ajout : **15 leçons / 90 éléments** ;
- cible finale : **40 leçons / 238 éléments** ;
- coût : **0 €**.

## Intention

Étendre le parcours vers un A1 réellement utilisable tout en conservant les principes historiques :

- français utile avant théorie ;
- petites doses ;
- vietnamien comme support ;
- oral et réutilisation ;
- aucune conjugaison hors contexte ;
- aucun reset des données existantes.

## Leçons 26–40

| # | Axe | Structure principale |
|---|---|---|
| 26 | 11 → 20 | reconnaissance des nombres |
| 27 | 20 → 100 / prix | dizaines et grands repères |
| 28 | jours de la semaine | calendrier courant |
| 29 | mois / dates | `Quelle est la date ?` |
| 30 | heure précise | `et quart`, `et demie`, `moins le quart` |
| 31 | possessifs | `mon / ma / mes`, `ton / ta / tes` |
| 32 | présent avec `tu` | questions fréquentes |
| 33 | présent avec `il / elle` | parler d’une autre personne |
| 34 | présent avec `nous` | actions communes |
| 35 | futur proche | `aller + infinitif` |
| 36 | passé récent | `venir de + infinitif` |
| 37 | passé composé | `j’ai + participe passé` |
| 38 | passé avec être | formes féminines utiles à Trân |
| 39 | administration | rendez-vous / passeport / document |
| 40 | émotions & proches | état, besoin, `Tu me manques` |

## Architecture

```text
app.js                     ← historique intact
curriculum-stage2.js       ← 16–25
curriculum-stage3.js       ← 26–40
stage2-boot.js             ← rerender réutilisé après Stage 2 + 3
learning-memory.js
mastery-engine.js
mastery-stage3.js          ← 5e palier A1 Core
scenario-engine.js
error-intelligence.js
build-meta.js              ← chargé en dernier
```

Le boot existant est volontairement réutilisé : Stage 3 est chargé **avant** `stage2-boot.js`, ce qui permet un seul rerender curriculum.

## Mastery A1 Core

Un nouveau palier mesure les leçons 26–40 avec :

- leçons terminées ;
- items connus ;
- items réellement révisés ;
- items solides ;
- fragilités.

`Maîtrisé` exige :

- 15/15 leçons terminées ;
- au moins 95 % des items connus ;
- au moins 70 % des items ayant une preuve de révision ;
- au moins 55 % solides ;
- au plus 20 % fragiles.

C’est un indicateur pédagogique interne, pas une certification CECRL.

## Données

Aucune nouvelle clé apprenant n’est nécessaire.

Les nouveaux IDs deviennent automatiquement disponibles pour :

- Learning Memory ;
- Free Voice ;
- Error Intelligence ;
- Daily Coach ;
- Mastery Stage 3.

## Validation prévue

- contrat Node : **15 leçons / 90 items** ;
- IDs curriculum uniques sur `app.js + stage2 + stage3` ;
- toutes les leçons ont intro / grammaire / challenge ;
- 6 éléments exactement par leçon ;
- Chrome Home : **40 leçons** + leçon 40 présente ;
- Chrome Scenario Lab : non-régression ;
- Chrome Error Intelligence : non-régression ;
- Chrome Stage 3 : Progression + A1 Core mastery ;
- cache / version synchronisés ;
- docs synchronisées avant clôture.


---

## Clôture production

Build 19 est **CLOS**.

Validation effectuée :

- contrat 15 leçons / 90 items ;
- IDs globaux uniques ;
- syntaxe de tous les modules ;
- Chrome Home : 40 leçons + leçon 40 + chapitre A1 Core ;
- Chrome Scenario Lab ;
- Chrome Error Intelligence avec limites 20/120 ;
- Chrome A1 Core / Mastery ;
- PR #11 squash-mergée ;
- CI `main` verte ;
- GitHub Pages verte ;
- validation Chrome directe de l’URL publique.

État livré : **v1.12.0 • Build 19 • 40 leçons • 238 éléments**.
