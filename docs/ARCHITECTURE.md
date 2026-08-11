# French Trân’quille — ARCHITECTURE

## Vue générale

```text
iPhone / Safari / PWA
        ↓
UX Shell simple
        ↓
moteurs pédagogiques locaux
        ↓
localStorage + Web APIs navigateur
```

PWA statique GitHub Pages, sans backend obligatoire ni API payante.

---

# Principe produit

```text
COMPLEXITÉ INTERNE
Curriculum / Memory / Mastery / Error / Scenario / Listening / Language

                  ↓

INTERFACE APPRENANTE
Aujourd’hui / Pratiquer / Parcours
```

Un nouveau moteur n’obtient pas une nouvelle destination de navigation.

Règle ajoutée après observation terrain :

> **un moteur peut être important sans être visible en permanence.**

L’interface doit utiliser une logique de **progressive disclosure** : résumé utile d’abord, détails ensuite, diagnostics seulement si demandé ou en DEBUG FR.

---

# Runtime canonique — baseline v1.17.5 Build 24.5

```text
progress-safety.js
app.js
curriculum-stage2.js
curriculum-stage3.js
stage2-boot.js
debug-fr.js
voice-ios.js
free-voice.js
learning-memory.js
error-intelligence.js
language-ratio-core.js
language-ratio.js
daily-coach.js
mastery-engine.js
mastery-stage3.js
scenario-data.js
real-life-data.js            # Pack I
real-life-data-2.js          # Pack II
scenario-host.js
scenario-engine.js
real-life-ux.js
listening-data.js
listening-engine.js
ux-shell.js
interaction-ux.js            # feedback tactile premium
build-meta.js                # dernier : metadata + ponts runtime ciblés
```

CSS Scenario personnel : `real-life-ux.css`.

Le microfix Listening du 11/08/2026 est porté par `build-meta.js` sans modification de `voice-ios.js`. Son rôle est uniquement de laisser passer les vitesses pédagogiques explicites du module Listening au lieu de les laisser être écrasées par la vitesse globale Lucie.

---

# État et sécurité

Clé apprenant historique :

```text
francais-avec-luc:learner:v1
```

Clé Scenario :

```text
french-tranquille:scenarios:v1
```

Clé Listening :

```text
french-tranquille:listening:v1
```

Snapshot de sécurité depuis Build 22 :

```text
french-tranquille:safety:pre-build22:v1
```

Aucun changement UX futur ne doit renommer ces clés pour des raisons esthétiques.

---

# Curriculum

- l1–l15 : `app.js` ;
- l16–l25 : `curriculum-stage2.js` ;
- l26–l40 : `curriculum-stage3.js`.

Contrat actuel : **40 leçons / 241 éléments**.

---

# Scenario Engine

Le moteur historique reste responsable de :

- verrouillage par `requiredLessons` ;
- validation des réponses ;
- indice ;
- modèle après blocage ;
- voix/clavier ;
- Learning Memory ;
- stats persistantes.

## Packs data

```text
scenario-data.js      12 situations / 36 tours
real-life-data.js      6 situations / 18 tours
real-life-data-2.js   10 situations / 30 tours
```

Total : **28 situations / 84 tours**.

Chaque pack étend le même tableau `FrenchTranquilleScenarioData.scenarios` avant l’initialisation du moteur.

Aucune migration du state Scenario n’est nécessaire : les stats existantes sont indexées par ID et les nouveaux IDs sont additifs.

---

# `real-life-ux.js` — catalogue scalable

La façade Scenario reste limitée par défaut :

```text
MAX_OPEN = 6
```

Principe : quelques scènes pertinentes visibles, puis expansion volontaire. Cette même philosophie doit maintenant être appliquée à **Parcours / Progression**.

---

# Learning Memory / Error / Adaptive

Les moteurs travaillent derrière l’interface apprenante :

- Learning Memory mémorise la solidité et les besoins de révision ;
- Error Intelligence mémorise uniquement des erreurs observables ;
- Adaptive Language ajuste le soutien VI/FR ;
- Mastery synthétise les preuves ;
- Daily Coach choisit quoi remettre devant Trân.

Ces moteurs **ne doivent pas imposer chacun leur propre grande carte permanente** dans l’écran Parcours.

---

# Listening

Audio local via `speechSynthesis`.

État production après PR #29 :

```text
normal = 0.88
lent   = 0.68
```

Le retour terrain indique que `lent` pourrait être légèrement plus lent. La calibration est reportée à un mini-jalon après test iPhone ; candidat envisagé : **0.62–0.64**.

Aucune modification pendant une session réelle de Trân.

---

# Voice — sanctuaire réel

Retour iPhone validé : voix Lucie naturelle et reconnaissance des réponses satisfaisante.

Sanctuaires :

```text
voice-ios.js
free-voice.js
```

Le microfix Listening n’a pas modifié `voice-ios.js`.

Aucune recalibration générale sans problème réel reproductible.

---

# Branding

Sanctuaires :

```text
assets/LOGO.png
assets/Favicon.png
```

---

# UX Shell

Toujours :

```text
Aujourd’hui
Pratiquer
Parcours
```

Builds 24.3–24.5 garantissent :

- feedback `pointerdown` ;
- `tap echo` ;
- boutons persistants ;
- un seul onglet actif ;
- synchronisation déterministe de l’état actif ;
- `Pratiquer` comme vrai écran ;
- header de leçon allégé.

---

# Dette UX prioritaire : Parcours

Observation terrain du 11/08/2026 : l’écran `Parcours` est trop long et expose trop d’implémentation interne.

Éléments actuellement susceptibles de s’empiler :

- position dans le parcours ;
- stats globales ;
- Learning Memory ;
- plusieurs cartes Mastery ;
- situations réelles ;
- fondations A1 ;
- éléments acquis ;
- liste complète des 40 leçons ;
- métriques détaillées.

Cible Build 25 :

```text
NIVEAU 1 — Résumé
  position + progrès + prochaine étape

NIVEAU 2 — Détails repliables
  Memory / Mastery / Listening / Real Life / A1

NIVEAU 3 — Vue complète
  tous les acquis / toutes les leçons / diagnostics
```

Aucune donnée ne sera supprimée : la refonte porte sur **l’architecture d’information**, pas sur les moteurs.

Voir `docs/NEXT-UX-PASS.md`.

---

# Freeze terrain

Tant que Trân utilise activement la PWA :

- pas de merge runtime ;
- pas de service-worker bump ;
- pas de modification de cache ;
- documentation sur branche uniquement ;
- exception : incident critique reproductible.

---

# CI à conserver

Contrats minimum :

1. syntaxe runtime complet ;
2. hashes branding + voice ;
3. curriculum 40/241 ;
4. Scenario 28/84 ;
5. ancien utilisateur/progression ;
6. Error / Listening / Adaptive ;
7. Options ;
8. navigation mobile réelle ;
9. aucune fatal card.

Build 25 devra ajouter un contrat de **densité / progressive disclosure** sans supprimer les tests 24.5.

---

# Dette technique

`app.js` reste monolithique par choix de sécurité. Son extraction reste réservée à Architecture Hardening avec comparaison d’état avant/après.
