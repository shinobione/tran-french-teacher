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

Un moteur n’obtient pas automatiquement une destination de navigation.

---

# Runtime canonique — v1.16.0 Build 23

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
real-life-data.js          ← Build 23
scenario-host.js
scenario-engine.js
real-life-ux.js            ← Build 23
listening-data.js
listening-engine.js
ux-shell.js
build-meta.js              ← dernier
```

CSS Build 23 : `real-life-ux.css` est chargé avec `scenario-engine.css`.

---

# État apprenant

Clé historique canonique :

```text
francais-avec-luc:learner:v1
```

Schema 2. Build 23 ne la modifie pas.

Snapshot de sécurité créé depuis Build 22 :

```text
french-tranquille:safety:pre-build22:v1
```

---

# Curriculum

- `app.js` : l1–l15 ;
- `curriculum-stage2.js` : l16–l25 ;
- `curriculum-stage3.js` : l26–l40.

Contrat audité : **40 leçons / 241 éléments**.

---

# Scenario Engine

Clé persistante :

```text
french-tranquille:scenarios:v1
```

`scenario-data.js` fournit le pack historique : **12 situations / 36 tours**.

## Extension Build 23

`real-life-data.js` s’exécute après `scenario-data.js` et **étend le même tableau** avant l’initialisation de `scenario-engine.js`.

Il ajoute :

```text
6 situations / 18 tours
```

Total Build 23 attendu :

```text
18 situations / 54 tours
```

Aucune migration du state Scenario : les statistiques existantes restent valides par ID.

Pack :

```text
real-life-jerry-1
```

Prérequis l2 → l8, donc valeur immédiate pour une apprenante au début du parcours.

## `real-life-ux.js`

Cette couche ne remplace pas le Scenario Engine.

Elle adapte seulement sa présentation :

- titre apprenant `Parler en situation` ;
- scènes Jerry disponibles en premier ;
- badge personnel ;
- seulement deux prochaines scènes verrouillées visibles ;
- dévoilement facultatif du reste.

Le moteur historique continue à gérer validation, indice, modèle, voix/clavier, Memory et persistance.

---

# Learning Memory

Clé : `french-tranquille:learning-memory:v1`.

Scenario continue d’enregistrer :

```text
scenario-success
scenario-miss
scenario-assisted
```

Les nouveaux scénarios Build 23 utilisent les mêmes sources.

---

# Error Intelligence

Clé : `french-tranquille:error-intelligence:v1`.

Contrat : 20 événements détaillés par item / 120 récents globaux.

Build 23 ne change pas sa taxonomie.

---

# Listening

Clé : `french-tranquille:listening:v1`.

Build 23 n’intervient pas dans Listening ; les smokes Build 22 restent des non-régressions obligatoires.

---

# Adaptive Language

`language-ratio-core.js` + `language-ratio.js` restent actifs. Scenario continue de consommer le soutien contextuel existant ; le pack Build 23 n’introduit pas un mode linguistique parallèle.

---

# Voice — sanctuaire réel

Retour iPhone : reconnaissance des réponses françaises satisfaisante et voix Lucie naturelle.

Build 23 conserve byte-identiques :

```text
voice-ios.js
free-voice.js
```

Aucune recalibration sans problème réel reproductible.

---

# Branding

Sanctuaires :

```text
assets/LOGO.png
assets/Favicon.png
```

Les nouveaux visuels de scénarios utilisent uniquement CSS/emoji ; le branding principal ne change pas.

---

# UX Shell

Navigation apprenante Build 22 conservée :

```text
Aujourd’hui
Pratiquer
Parcours
```

`Pratiquer → Parler français` continue à ouvrir l’écran Conversation historique, désormais enrichi par Build 23.

L’ancien `.bottom-nav` reste le bus de compatibilité invisible.

---

# Service Worker — Build 23

Cache :

```text
tran-french-teacher-v1.16.0-b23
```

Le précache ajoute :

```text
real-life-data.js
real-life-ux.js
real-life-ux.css
```

---

# CI Build 23

Contrats :

1. syntaxe runtime complet ;
2. hashes branding + voice ;
3. curriculum 40/241 ;
4. Scenario total 18/54 ;
5. pack Real Life = 6/18 ;
6. tous les IDs/réponses/item refs valides ;
7. profil leçon 8 : 5 scènes du pack ouvertes, 1 verrouillée ;
8. progression leçon 8 conservée ;
9. UX Conversation : scènes personnelles visibles/prioritaires, futur condensé ;
10. Error 20/120 ;
11. Listening ;
12. Adaptive Language ;
13. aucune fatal card.

---

# Dette technique

`app.js` reste monolithique par choix de sécurité. Sa future extraction doit être un build dédié avec migration comparative, pas une conséquence cachée d’un build pédagogique.
