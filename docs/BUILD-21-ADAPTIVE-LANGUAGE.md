# Build 21 — Adaptive Language Ratio

## Cible

- version : **v1.14.0** ;
- build : **21** ;
- phase : **Adaptive Language Ratio** ;
- curriculum conservé : **40 leçons / 238 éléments** ;
- Listening : Build 20 conservé ;
- coût : **0 €**.

## Problème traité

French Trân’quille a été conçu pour partir avec beaucoup de vietnamien puis augmenter progressivement le français. Jusqu’à Build 20, cette progression existait surtout dans la conception pédagogique, mais pas comme un moteur explicite fondé sur les données.

Build 21 introduit un moteur local et explicable :

```text
preuves d’apprentissage
        ↓
score de soutien
        ↓
profil linguistique
        ↓
ratio adapté au contexte
```

Le but n’est **pas** de compter les mots VI/FR au caractère près. Le ratio représente un **niveau de soutien**.

## Profils

```text
VI-HEAVY   ≈ 90 % VI / 10 % FR
VI-SUPPORT ≈ 70 % VI / 30 % FR
BALANCED   ≈ 50 % VI / 50 % FR
FR-GROWING ≈ 30 % VI / 70 % FR
```

## Preuves utilisées

### Curriculum

- leçons terminées ;
- éléments connus ;
- couverture du parcours.

Le curriculum seul a volontairement un poids limité : cliquer sur « suivant » n’est pas une preuve suffisante.

### Learning Memory

- éléments réellement révisés ;
- éléments solides ;
- éléments fragiles ;
- éléments dus.

### Listening

- nombre de tentatives ;
- taux de réussite ;
- minimum de preuves avant de considérer l’écoute comme fiable.

### Pratique active

- `conversationWins` historique ;
- réussites Scenario Lab lorsqu’elles sont disponibles.

### Error Intelligence

Pénalités temporaires :

- difficultés des dernières 24 h ;
- difficultés récurrentes ;
- assistance / modèles nécessaires ;
- fragilité mémoire.

## Score pur

`language-ratio-core.js` ne dépend ni du DOM ni de `localStorage`.

Il expose :

```text
normalizeEvidence()
scoreEvidence()
profileFor()
ratioFor()
text()
pair()
explain()
```

Cela permet de tester la décision dans Node avec des profils synthétiques.

## Conditions de montée

### VI-HEAVY → VI-SUPPORT

Nécessite au minimum :

- score ≥ 28 ;
- 7 preuves ;
- 4 éléments révisés.

### VI-SUPPORT → BALANCED

Nécessite :

- score ≥ 50 ;
- 14 preuves ;
- 8 éléments révisés ;
- et soit une preuve Listening suffisante, soit assez de pratique active.

### BALANCED → FR-GROWING

Nécessite notamment :

- score ≥ 72 ;
- 28 preuves ;
- 16 éléments révisés ;
- au moins 8 tentatives Listening ;
- Listening ≥ 68 % ;
- fragilité ≤ 25 % ;
- peu d’erreurs récurrentes ;
- peu d’assistance récente.

## Retour temporaire vers davantage de vietnamien

Si les données indiquent :

- beaucoup d’erreurs récentes ;
- plusieurs difficultés récurrentes ;
- ou une proportion élevée de mémoire fragile ;

le profil peut redescendre d’un palier.

Ce n’est pas une sanction ni une perte de niveau : c’est du **scaffolding**.

## Contextes

Le profil global est modulé selon l’écran :

| Contexte | Effet |
|---|---|
| navigation | moins de VI |
| home | légèrement moins de VI |
| leçon nouvelle | davantage de VI |
| révision | moins de VI |
| grammaire | davantage de VI |
| Listening | moins de VI dans les consignes |
| Scenario | moins de VI si preuves fortes |
| indice Scenario | davantage de VI |
| feedback erreur | davantage de VI |
| feedback réussite | moins de VI |
| administration | plancher VI |
| sécurité | plancher VI élevé |

Les planchers évitent qu’un profil avancé retire trop d’aide dans des contextes sensibles.

## Adapter runtime

`language-ratio.js` lit localement :

```text
francais-avec-luc:learner:v1
french-tranquille:learning-memory:v1
french-tranquille:listening:v1
french-tranquille:error-intelligence:v1
french-tranquille:scenarios:v1
```

Il **ne crée pas de niveau permanent autoritaire**. Le profil est recalculé depuis les preuves.

Le module surveille les écritures des clés pédagogiques et recalcule son profil lorsqu’une nouvelle preuve arrive.

Expose :

```text
window.FrenchTranquilleLanguage
```

avec :

```text
current()
refresh()
ratioFor(context)
text(vi,fr,context)
pair(vi,fr,context)
collectEvidence()
```

## Surfaces adaptées Build 21

### Home

Carte dédiée :

- profil ;
- ratio Home ;
- raisons positives ;
- prudences / fragilités.

### Leçons

Un bandeau de soutien adaptatif est injecté en début de carte :

- consigne principale dans la langue du contexte ;
- langue secondaire en support ;
- ratio contextuel visible en DEBUG/diagnostic.

Les données curriculum d’origine ne sont pas réécrites.

### Daily Coach

`daily-coach.js` consomme le profil lorsqu’il génère ses textes.

### Scenario Lab

`scenario-engine.js` consomme le profil pour les consignes générales. Les indices peuvent conserver davantage de vietnamien via le contexte `scenario-hint`.

### Listening

`listening-engine.js` consomme le profil pour les consignes et questions.

**Garde-fou : les options de réponse du mode Sens restent vietnamiennes**, afin de ne jamais révéler le transcript français avant la tentative.

### Progression

Carte détaillée :

- score interne ;
- ratios par contexte ;
- nombre de preuves ;
- solides / fragiles ;
- Listening ;
- erreurs récentes ;
- raisons expliquant le profil.

### Réglages

Diagnostic compact du profil courant.

## DEBUG FR

`DEBUG FR` reste prioritaire.

Quand Jerry active DEBUG FR :

```text
text() → français
```

sans modifier le profil réel de Trân ni ses preuves.

## Smoke tests

### Node — décision pure

Profils synthétiques :

```text
beginner → vi-heavy
strong   → fr-growing
fragile  → davantage de VI que strong
```

Tests de contexte :

- `lesson-new` doit avoir davantage de VI que `home` ;
- `listening` doit pouvoir avoir moins de VI ;
- `safety` garde un plancher VI ≥ 70.

### Browser

Hooks :

```text
?languageSmoke=beginner
?languageSmoke=strong
?languageSmoke=fragile
```

Ils n’écrivent pas de faux profil dans les vraies données ; ils injectent une preuve synthétique uniquement dans le calcul du navigateur de CI.

La CI vérifie :

- carte Home ;
- profil attendu ;
- ratios contextuels ;
- Listening en VI pour débutant ;
- Listening en FR pour profil fort ;
- recul vers davantage de VI pour profil fragilisé.

## Non-objectifs

- modifier automatiquement les données curriculum ;
- traduire arbitrairement tout texte historique par heuristique DOM ;
- retirer le vietnamien dans les contextes sensibles ;
- certifier un niveau CECRL ;
- modifier le Safari/Siri Calibration Gate.

## Critères de clôture

- moteur pur testable ;
- quatre profils ;
- score explicable ;
- contextes ;
- retour temporaire après fragilité ;
- Home / Leçon / Daily / Scenario / Listening / Progression / Settings ;
- DEBUG FR préservé ;
- options Listening non révélatrices ;
- 40 leçons / 238 items intacts ;
- Listening Build 20 intact ;
- Error 20/120 intact ;
- Scenario 12/36 intact ;
- PR + main + Pages + rendu public.
