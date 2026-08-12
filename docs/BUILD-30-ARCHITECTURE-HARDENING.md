# Build 30 — Architecture Hardening

## Statut

**v1.23.0 — Build 30 — CANDIDAT**

Ce build ne cherche pas à ajouter une fonction visible. Il transforme l’architecture implicite accumulée depuis Build 11 en **contrats explicites et testables**, sans réécrire le cœur historique pendant qu’il porte de vraies données apprenantes.

## Problème audité

Le produit moderne repose encore sur un noyau `app.js` historique, complété progressivement par Curriculum Stage 2/3, Learning Memory, Scenario, Listening, Recovery, App Shell, iPhone/PWA et Speaking Loop.

Le comportement est solide parce que les tribunaux sont nombreux, mais plusieurs dépendances restent implicites :

- quel module possède quel état ;
- quels stores sont durables ;
- quel composant possède la navigation visible ;
- quelles APIs globales sont des frontières légitimes ;
- quel ordre de boot est nécessaire ;
- quels invariants produit doivent rester stables pendant un futur découpage du monolithe.

Une réécriture directe de `app.js` serait donc inutilement risquée.

## Stratégie Build 30

Build 30 adopte un **strangler refactor** :

1. conserver le noyau historique byte-identique ;
2. poser une frontière officielle autour de lui ;
3. centraliser les contrats durables et les propriétaires ;
4. fournir une façade read-only pour observer le runtime ;
5. fournir des routes stables qui utilisent les surfaces modernes quand elles existent ;
6. certifier en vrai Chrome que cette frontière pilote l’application sans modifier la progression ;
7. rendre les prochains extractions/remplacements possibles module par module au lieu d’un big-bang.

## Nouveau `runtime-contracts.js`

Ce module contient uniquement des constantes et fonctions pures :

- version/build Architecture ;
- six stores durables Recovery ;
- snapshots Recovery historiques ;
- invariants produit `40 / 241`, Scenario `36 / 108`, Listening `0.88 / 0.65`, Speaking Loop `max 2` ;
- routes `today / practice / progress` ;
- carte de propriété des APIs globales ;
- phases de boot ;
- sanctuaires.

Le contrat est gelé avec `Object.freeze` et **n’écrit dans aucun store**.

## Nouveau `runtime-bridge.js`

La façade `window.FrenchTranquilleRuntime` fournit :

- `snapshot()` : état structurel read-only du curriculum, des stores, APIs et navigation ;
- `refresh()` : resynchronisation des marqueurs diagnostiques ;
- `route('today'|'practice'|'progress')` : point d’entrée stable pour les écrans principaux ;
- `openLesson(id)` : ouverture via la meilleure surface existante ;
- exposition du contrat Architecture.

Le bridge ne contient **aucun `localStorage.setItem`**.

Il ne devient pas propriétaire des données : Recovery, Curriculum, Memory, Scenario, Listening et App Shell conservent leurs responsabilités actuelles.

## Propriétaires explicités

```text
legacyCore   → FrenchTranquilleCurriculum
recovery     → FrenchTranquilleRecovery
voice        → LucieVoice / FreeVoice / VoiceReplay
learning     → Memory / Error / Mastery / DailyCoach / Language
practice     → Listening / Scenario / Real Life
presentation → UX historiques + Build 27 App Shell
release      → BuildMeta / SpeakingLoop
```

Les noms techniques `Lucie*` restent volontairement compatibles malgré le branding visible Tyffany.

## Ordre logique documenté

```text
Recovery
  ↓
Legacy Core
  ↓
Curriculum extensions
  ↓
Pedagogy engines
  ↓
Presentation / App Shell
  ↓
iPhone / PWA
  ↓
Release layer / Speaking Loop
```

## Tribunal Build 30

Le nouveau workflow certifie :

### Statique

- syntaxe des nouveaux modules ;
- version `1.23.0 / 30` ;
- stores et invariants canoniques ;
- aucune écriture locale depuis le contrat ou le bridge ;
- précache PWA des nouvelles frontières.

### Sanctuaires byte-identiques

- `app.js` ;
- `voice-ios.js` ;
- `free-voice.js` ;
- `assets/LOGO.png` ;
- `assets/Favicon.png`.

### Chrome desktop + mobile

- Runtime boundary prête ;
- Curriculum `40 / 241` ;
- aucun propriétaire dupliqué ;
- aucun store dupliqué ;
- learner key canonique ;
- Recovery / Shell / Speaking Loop présents ;
- navigation réelle `Progrès → Aujourd’hui → Pratiquer` via le nouveau bridge ;
- **chaîne learner strictement identique avant/après** ;
- un seul onglet actif ;
- aucun overflow horizontal.

Les anciens workflows continuent en parallèle à protéger Recovery, App Shell, iPhone/offline, Speaking Loop, Listening, Scenario et les régressions historiques.

## Hors scope volontaire

Build 30 ne fait pas :

- de migration de données ;
- de renommage des clés historiques ;
- de nouveau curriculum ;
- de changement vocal ;
- de changement de reconnaissance Safari ;
- de changement du Speaking Loop ;
- de réécriture complète de `app.js` ;
- de nouvelle navigation visible.

## Gate terrain iPhone

Le gate Build 26.1 reste indépendant et ouvert :

```text
reconnaissance Free Voice
→ seconde prise locale
→ lecture
→ reconnaissance suivante toujours normale
```

Aucun enregistrement automatique du premier essai exact n’est ajouté par Architecture Hardening.

## Critère de clôture

Build 30 ne devient **PROD / CLOS** qu’après :

1. tribunal Build 30 vert sur le head exact de PR ;
2. tous les contrats historiques applicables verts ;
3. merge runtime ;
4. même tribunal sur `main` ;
5. GitHub Pages SUCCESS sur le runtime ;
6. clôture README / ROADMAP / CHANGELOG / ARCHITECTURE / présent dossier.

## Suite

Après Build 30 : **V2.0.0 — Freeze / Release**. Le but du freeze est de certifier ce qui existe, pas d’introduire un nouveau moteur.
