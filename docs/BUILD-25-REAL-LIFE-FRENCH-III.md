# Build 25 — Real Life French III

## Cible

- version : **v1.18.0** ;
- build : **25** ;
- socle : Build 24 ;
- curriculum : **40 leçons / 241 éléments** ;
- coût : **0 €**.

## Intention

Faire évoluer les situations vers des réponses moins guidées **sans ajouter de nouveau mode à apprendre**.

Trân continue à utiliser :

```text
Aujourd’hui
Pratiquer
Parcours
```

Build 25 vit derrière **Pratiquer → Parler français**.

## Pack III

8 situations / 24 tours :

| ID | Axe | Prérequis |
|---|---|---|
| `jerry-francais-oral` | comprendre `T’es`, `J’sais`, `Y a pas` | l20 |
| `jerry-plan-appel` | futur proche | l35 |
| `jerry-viens-rentrer` | passé récent | l36 |
| `jerry-raconte-repas` | passé composé avec avoir | l37 |
| `jerry-rentree-maison` | passé composé avec être | l38 |
| `jerry-papiers-comprendre` | demander une explication | l39 |
| `jerry-inquiete-parler` | émotion + besoin + couple | l40 |
| `jerry-message-couple` | petit enchaînement affectif | l40 |

Total candidat après les trois packs :

```text
Scenario = 36 situations / 108 tours
Real Life I + II + III ajoutés = 24 situations / 72 tours
```

## Réponses moins guidées

Les tours `openResponse:true` proposent plusieurs formulations acceptables autour de **la même compétence cible**.

Exemple :

```text
Je suis inquiète.
Je suis un peu inquiète.
Oui, je suis inquiète.
```

Le moteur historique accepte déjà une réponse contenant la formulation cible ; Build 25 exploite cette propriété plutôt que de créer un évaluateur flou supplémentaire.

Le modèle n’apparaît qu’après blocage, comme avant.

## Français oral courant

La scène `jerry-francais-oral` fait entendre :

```text
T’es prête ?
J’sais pas…
Y a pas de réseau.
```

Ces formes sont **à comprendre**, pas obligatoires dans la réponse de Trân. Elle peut continuer à répondre en français standard.

## Mémoire sans IDs devinés

Pour les acquis avancés, `real-life-data-3.js` résout les références depuis le curriculum déjà chargé.

Exemples de requêtes :

```text
vais appeler Jerry
viens de rentrer
j'ai mangé
suis rentrée à la maison
m'expliquer
je suis inquiète
besoin de parler
tu me manques
```

La CI exige pour chaque requête :

```text
exactement 1 correspondance curriculum
```

0 ou >1 = build rouge.

## UX

`real-life-coach.js` ajoute uniquement dans une scène Pack III :

> Tu peux répondre avec tes mots. Une phrase simple qui exprime la bonne idée suffit.

Aucun nouveau bouton, aucun réglage.

Le catalogue scalable Build 24 reste :

```text
6 situations ouvertes max visibles
2 futures max visibles
```

## Profils smoke

### l8

Progression réelle protégée, aucun Pack III ouvert.

### l20

- Pack II complet ;
- **1 scène Pack III** ouverte : français oral courant ;
- toujours 6 suggestions visibles.

### l40

- **8 scènes Pack III** ouvertes ;
- toujours 6 suggestions visibles ;
- les autres restent accessibles sans saturer l’écran.

## Sanctuaires

Doivent rester byte-identiques :

```text
assets/LOGO.png
assets/Favicon.png
voice-ios.js
free-voice.js
```

## Critères de clôture

- [x] Pack III 8 / 24 ;
- [x] réponses moins guidées sans moteur probabiliste ;
- [x] français oral uniquement en compréhension ;
- [x] résolution mémoire dynamique ;
- [x] micro-coach UX ;
- [ ] Scenario 36 / 108 ;
- [ ] toutes les requêtes mémoire résolvent exactement 1 acquis ;
- [ ] smoke l8 zéro-perte ;
- [ ] l20 : Pack III=1 / visibles=6 ;
- [ ] l40 : Pack III=8 / visibles=6 ;
- [ ] Error / Listening / Adaptive non régressés ;
- [ ] hashes sanctuaires ;
- [ ] docs canoniques ;
- [ ] PR verte ;
- [ ] main vert ;
- [ ] Pages verte ;
- [ ] release CLOS.

## Suite proposée

- Build 26 — Data & Recovery Hardening ;
- Build 27 — iPhone/PWA/Accessibility Hardening ;
- Build 28 — Architecture Hardening ;
- V2.0.0 — freeze / release.
