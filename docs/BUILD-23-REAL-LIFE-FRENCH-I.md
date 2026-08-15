# Build 23 — Real Life French I

## Statut

**v1.16.0 — Build 23 — PROD / CLOS — 2026-08-11**

- PR : **#18 — SUCCESS** ;
- commit production : `7f5dd657e5f46a2847c443ffb8f5d0154a89924a` ;
- CI `main` : **run #63 — SUCCESS** ;
- GitHub Pages : **run #77 — SUCCESS** ;
- curriculum : **40 leçons / 241 éléments** ;
- Scenario : **18 situations / 54 tours** ;
- coût : **0 €**.

## Principe livré

La nouvelle capacité n’est pas devenue un nouveau menu. Trân continue à utiliser :

```text
Aujourd’hui
Pratiquer
Parcours
```

Build 23 enrichit **Pratiquer → Parler français**.

## Pack Jerry I

| ID | Situation | Prérequis | Tours |
|---|---|---:|---:|
| `jerry-parle-vite` | Jerry parle trop vite | l2 | 3 |
| `jerry-presente-tran` | Jerry présente Trân | l3 | 3 |
| `jerry-cafe-ensemble` | Café avec Jerry | l4 | 3 |
| `jerry-gouts` | Parler de ses goûts | l5 | 3 |
| `jerry-petit-achat` | Petit achat | l7 | 3 |
| `jerry-trouver-lieu` | Trouver un lieu | l8 | 3 |

Total ajouté : **6 situations / 18 tours**.

Le Scenario Engine est passé de **12 / 36** à **18 / 54**.

## Pédagogie

Aucune réponse obligatoire ne demande une structure non apprise dans le prérequis déclaré.

Le moteur historique gère toujours :

- premier raté → indice ;
- deuxième raté → modèle ;
- reconnaissance vocale ou clavier ;
- `scenario-success / scenario-miss / scenario-assisted` dans Learning Memory ;
- statistiques locales ;
- aucune prétention de score phonétique.

## UX livrée

`src/pedagogy/real-life-ux.js` :

- scènes personnelles disponibles en premier ;
- badge `Ta vraie vie` ;
- titre apprenant `Parler en situation` ;
- deux futures scènes verrouillées visibles par défaut ;
- dévoilement du reste sur demande ;
- aucun nouveau bouton dans le shell principal.

## Stockage et progression

Aucune nouvelle clé apprenant.

Le pack utilise la même clé Scenario :

```text
french-tranquille:scenarios:v1
```

Le smoke « ancien utilisateur » est resté vert : le profil leçon 8 conserve ses 7 leçons terminées, sa progression partielle `l8`, ses 40 acquis et son snapshot de sécurité.

## Smoke Real Life leçon 8

Avec l1→l7 terminées et l8 en cours :

- **5** scènes personnelles ouvertes ;
- `jerry-trouver-lieu` reste verrouillée ;
- scènes personnelles ouvertes prioritaires ;
- futures scènes condensées ;
- badge personnel visible ;
- titre technique Scenario Lab non exposé dans la carte apprenante.

Résultat : **SUCCESS**.

## Sanctuaires

Hashes inchangés pendant Build 23 :

```text
assets/LOGO.png
assets/Favicon.png
voice-ios.js
free-voice.js
```

## Tribunal final

- [x] 6 scénarios / 18 tours ajoutés ;
- [x] prérequis l2→l8 ;
- [x] réponses fondées sur les acquis ;
- [x] UX personnalisée sans nouveau menu ;
- [x] même stockage Scenario ;
- [x] cache/runtime Build 23 ;
- [x] contrat data 18 scénarios / 54 tours ;
- [x] smoke leçon 8 zéro-perte ;
- [x] smoke Real Life 5 ouverts / 1 verrouillé ;
- [x] Error / Listening / Adaptive non régressés ;
- [x] README / ROADMAP / CHANGELOG / ARCHITECTURE synchronisés ;
- [x] PR #18 verte ;
- [x] `main` run #63 vert ;
- [x] Pages #77 verte ;
- [x] release CLOS.

## Suite

**v1.17.0 — Build 24 — Real Life French II** : déplacements, gare, repas, proches, téléphone/logement selon prérequis, toujours derrière **Pratiquer**.
