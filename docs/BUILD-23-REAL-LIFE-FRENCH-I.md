# Build 23 — Real Life French I

## Cible

- version : **v1.16.0** ;
- build : **23** ;
- phase : **Real Life French I** ;
- socle : **Build 22 UX Foundation** ;
- curriculum inchangé : **40 leçons / 241 éléments** ;
- coût : **0 €**.

## Principe

La nouvelle capacité ne devient pas un nouveau menu.

Trân continue à utiliser :

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

Le Scenario Engine passe de **12 / 36** à **18 / 54**.

## Règle de contenu

Aucune réponse obligatoire ne demande une structure non apprise dans le prérequis déclaré.

Exemples réellement réutilisés :

```text
Je ne comprends pas.
Pouvez-vous répéter ?
Plus lentement, s'il vous plaît.
Je m'appelle Trân.
Je viens du Vietnam.
Je voudrais un thé, s'il vous plaît.
Combien ça coûte ?
J'aime… / Je n'aime pas… / Je préfère…
Dix euros.
Où est la gare ?
À gauche.
Merci.
```

## UX Scenario

`real-life-ux.js` garde le moteur historique mais simplifie la liste :

- scènes personnelles ouvertes en premier ;
- badge `Ta vraie vie` ;
- titre `Parler en situation` ;
- futures scènes : seulement 2 visibles par défaut ;
- bouton pour dévoiler le reste ;
- aucune nouvelle destination du shell.

## Stockage

Aucune nouvelle clé de progression.

Le pack utilise :

```text
french-tranquille:scenarios:v1
```

Les anciens résultats Scenario restent compatibles.

## Voix

Build 23 ne touche pas :

```text
voice-ios.js
free-voice.js
```

Le retour iPhone réel reste notre baseline.

## Smoke leçon 8

Le profil synthétique de Build 22 est réutilisé : l1–l7 terminées, l8 en cours.

Attendu :

- pack = 6 scénarios ;
- **5 scénarios personnels ouverts** ;
- `jerry-trouver-lieu` encore verrouillé tant que l8 n’est pas terminée ;
- ancienne progression inchangée ;
- Conversation affichée avec les scènes personnelles avant les autres disponibles ;
- futures scènes condensées ;
- titre technique Scenario Lab non exposé dans la carte apprenante.

## Sanctuaires

Hashes inchangés requis :

```text
assets/LOGO.png
assets/Favicon.png
voice-ios.js
free-voice.js
```

## Critères de clôture

- [x] 6 scénarios / 18 tours ajoutés ;
- [x] prérequis l2→l8 ;
- [x] réponses fondées sur les acquis ;
- [x] UX personnalisée sans nouveau menu ;
- [x] même stockage Scenario ;
- [x] cache/runtime Build 23 ;
- [ ] contrat data 18 scénarios / 54 tours ;
- [ ] smoke leçon 8 zéro-perte ;
- [ ] smoke Real Life 5 ouverts / 1 verrouillé ;
- [ ] Scenario / Error / Listening / Adaptive non régressés ;
- [ ] README / ROADMAP / CHANGELOG / ARCHITECTURE synchronisés ;
- [ ] PR verte ;
- [ ] main vert ;
- [ ] Pages verte ;
- [ ] release CLOS.
