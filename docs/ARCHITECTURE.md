# French Trân’quille — ARCHITECTURE

## Vue générale

PWA statique GitHub Pages :

```text
iPhone / Safari / PWA
        ↓
French Trân’quille UI
        ↓
UX Shell simple
        ↓
moteurs pédagogiques locaux
        ↓
localStorage + Web APIs navigateur
```

Aucun backend obligatoire, aucune base distante, aucune clé API cliente, aucune dépendance payante nécessaire.

---

# Principe Build 22

L’architecture distingue désormais clairement :

```text
COMPLEXITÉ INTERNE
Memory / Mastery / Error / Scenario / Listening / Language

                  ↓

INTERFACE APPRENANTE
Aujourd’hui / Pratiquer / Parcours
```

Un moteur n’obtient pas automatiquement un bouton de navigation parce qu’il existe.

---

# Runtime — v1.15.0 Build 22

Ordre canonique :

```text
progress-safety.js          # snapshot avant toute évolution
        ↓
app.js                      # moteur historique + leçons 1–15
        ↓
curriculum-stage2.js        # leçons 16–25
        ↓
curriculum-stage3.js        # leçons 26–40
        ↓
stage2-boot.js              # rerender curriculum unique
        ↓
debug-fr.js
        ↓
voice-ios.js                # baseline iPhone validé
        ↓
free-voice.js               # baseline reconnaissance validé
        ↓
learning-memory.js
        ↓
error-intelligence.js
        ↓
language-ratio-core.js
        ↓
language-ratio.js
        ↓
daily-coach.js
        ↓
mastery-engine.js
        ↓
mastery-stage3.js
        ↓
scenario-data.js
scenario-host.js
scenario-engine.js
        ↓
listening-data.js
listening-engine.js
        ↓
ux-shell.js                 # façade apprenante
        ↓
build-meta.js               # version finale, TOUJOURS dernier
```

Build 22 réconcilie explicitement cet ordre après avoir détecté un **loader drift** : des modules récents existaient dans le repo mais le `index.html` et le service worker de `main` audité étaient restés sur une composition Build 18.

---

# Noyau historique

## `app.js`

Responsabilités :

- état apprenant historique ;
- leçons 1–15 ;
- rendu des écrans Home / Lesson / Conversation / Review / Progress / Settings ;
- navigation historique `.bottom-nav` ;
- sauvegarde dans la clé legacy.

Il reste monolithique et n’est pas réécrit dans Build 22.

### Pourquoi garder `.bottom-nav` ?

De nombreux modules historiques déclenchent encore :

```text
.bottom-nav [data-go="review"]
.bottom-nav [data-go="conversation"]
```

Build 22 garde ce menu dans le DOM comme **bus de compatibilité invisible**.

`ux-shell.css` le masque côté utilisateur.

---

# UX Shell — Build 22

## `ux-shell.js`

Façade apprenante.

Elle ne stocke aucune progression pédagogique.

Responsabilités :

- créer la navigation 3 destinations ;
- ouvrir la Practice Sheet ;
- router vers les écrans historiques sans les dupliquer ;
- injecter une synthèse de parcours ;
- masquer les surfaces techniques côté apprenante ;
- préserver DEBUG FR ;
- exposer les attributs smoke Build 22.

## Navigation

```text
Hôm nay / Aujourd’hui → home
Luyện tập / Pratiquer → overlay local
Lộ trình / Parcours → progress
```

Practice Sheet :

```text
Réviser → screen-review
Parler  → screen-conversation
Écouter → FrenchTranquilleListening.open()
```

Les anciens écrans restent les moteurs réels : pas de duplication de logique.

## `ux-shell.css`

Mode apprenante :

- Home en une colonne ;
- curriculum complet retiré de la Home ;
- cartes techniques masquées ;
- Leçon en focus ;
- bottom nav masquée pendant Leçon/Réglages ;
- Parcours humain avant métriques techniques ;
- réglages dangereux/diagnostics masqués.

Mode DEBUG FR : les informations techniques restent disponibles.

---

# Sécurité de progression

## Clé apprenant canonique historique

```text
francais-avec-luc:learner:v1
```

Aucun changement Build 22.

Schema actuel : 2.

Données principales :

```text
lessonProgress
completedLessons
knownItems
reviewState
conversationWins
lastActivity
streak
```

## `progress-safety.js`

Nouvelle clé :

```text
french-tranquille:safety:pre-build22:v1
```

Elle crée **une seule photo locale non destructive** des données existantes avant la refonte.

La capture peut inclure :

```text
francais-avec-luc:learner:v1
french-tranquille:learning-memory:v1
french-tranquille:error-intelligence:v1
french-tranquille:scenarios:v1
french-tranquille:listening:v1
```

Elle n’effectue aucune restauration automatique et ne modifie jamais les valeurs capturées.

---

# Curriculum

## Base

`app.js` : leçons 1–15.

## Stage 2

`curriculum-stage2.js` : leçons 16–25.

## Stage 3

`curriculum-stage3.js` : leçons 26–40.

Le Stage 3 doit être chargé **avant** `stage2-boot.js` afin qu’un seul rerender voie les 40 leçons.

Cible runtime :

```text
40 leçons
238 éléments
```

---

# Learning Memory

Clé :

```text
french-tranquille:learning-memory:v1
```

États : new / fragile / learning / solid.

Son UI détaillée est une **source d’intelligence**, pas une destination principale côté Trân.

---

# Error Intelligence

Clé :

```text
french-tranquille:error-intelligence:v1
```

Historique borné :

```text
20 événements / item
120 événements récents globaux
```

Erreur = observation, pas diagnostic phonétique.

---

# Listening

Fichiers :

```text
listening-data.js
listening-engine.js
listening-engine.css
```

Clé :

```text
french-tranquille:listening:v1
```

L’interface Listening reste un overlay spécialisé. Build 22 l’ouvre depuis la Practice Sheet au lieu d’exposer une carte permanente sur la Home.

---

# Adaptive Language

```text
language-ratio-core.js
language-ratio.js
```

Le moteur calcule VI-HEAVY / VI-SUPPORT / BALANCED / FR-GROWING.

Ses résultats pilotent les modules mais sa carte de diagnostic n’a pas besoin d’être visible à l’apprenante.

Le détail reste disponible en DEBUG FR.

---

# Voice — baseline réel

Retour iPhone avant Build 22 :

- reconnaissance des réponses françaises satisfaisante ;
- voix de Lucie naturelle.

Décision architecture :

```text
voice-ios.js  = sanctuarisé Build 22
free-voice.js = sanctuarisé Build 22
```

Leur blob Git doit rester identique pendant cette refonte.

Le Safari Calibration Gate n’est plus une étape obligatoire tant que l’utilisatrice réelle ne signale pas de problème reproductible.

---

# Branding — baseline réel

Assets sanctuarisés :

```text
assets/LOGO.png
assets/Favicon.png
```

Build 22 les réutilise dans Home, Practice Sheet, favicon et PWA.

---

# DEBUG FR

DEBUG FR reste local au navigateur.

En learner mode : interfaces techniques masquées.

En DEBUG FR : diagnostics, Memory, Mastery, Error, Listening stats et Language Ratio peuvent rester visibles pour l’administration/debug.

---

# Service Worker

Build 22 :

```text
tran-french-teacher-v1.15.0-b22
```

Le précache doit refléter exactement le runtime canonique Build 22, y compris Stage 3, Listening, Language et UX Shell.

Stratégie GET : réseau d’abord, cache fallback.

---

# CI Build 22

Contrats obligatoires :

1. syntaxe de tous les modules actifs ;
2. hashes logo/favicon immuables ;
3. hashes voice/free-voice immuables ;
4. loader + SW contiennent le runtime canonique ;
5. curriculum 40 / 238 ;
6. Chrome Home avec navigation 3 destinations ;
7. Chrome « Trân leçon 8 » : progression strictement conservée ;
8. Scenario Lab non régressé ;
9. Error Intelligence 20/120 ;
10. Listening hidden→reveal ;
11. Adaptive Language beginner/strong/fragile ;
12. aucune fatal card.

---

# Dette technique

`app.js` reste monolithique.

Build 22 choisit volontairement **une façade séparée** plutôt qu’un refactor du noyau sous les pieds d’une utilisatrice active.

Une extraction de `app.js` devra être un build dédié, avec migration state + tests comparatifs, probablement pendant Hardening V2.
