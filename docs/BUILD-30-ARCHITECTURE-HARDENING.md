# Build 30 — Architecture Hardening

## Statut

**v1.23.0 — Build 30 — ✅ PROD / CLOS**

- PR runtime : **#71**
- head PR certifié : `ffa3ddf7a16dcbc32474701cfaf2f961e86d348c`
- runtime `main` : `5a8369df9df536f41521acefb528da71efb168a8`
- PR : **21/21 workflows fonctionnels SUCCESS**
- runtime `main` : **21/21 workflows fonctionnels SUCCESS**
- GitHub Pages : **#129 SUCCESS** sur le SHA runtime exact
- total runtime `main` : **22/22 SUCCESS Pages incluse**

Ce build ne cherche pas à ajouter une fonction visible. Il transforme l’architecture implicite accumulée depuis Build 11 en **contrats explicites et testables**, sans réécrire le cœur historique pendant qu’il porte de vraies données apprenantes.

## Problème audité

Le produit moderne repose encore sur un noyau `app.js` historique, complété progressivement par Curriculum Stage 2/3, Learning Memory, Scenario, Listening, Recovery, App Shell, iPhone/PWA et Speaking Loop.

Le comportement est solide parce que les tribunaux sont nombreux, mais plusieurs dépendances restaient implicites :

- quel module possède quel état ;
- quels stores sont durables ;
- quel composant possède la navigation visible ;
- quelles APIs globales sont des frontières légitimes ;
- quel ordre de boot est nécessaire ;
- quels invariants produit doivent rester stables pendant un futur découpage du monolithe.

Une réécriture directe de `app.js` aurait donc été inutilement risquée.

## Stratégie Build 30

Build 30 adopte un **strangler refactor** :

1. conserver le noyau historique byte-identique ;
2. poser une frontière officielle autour de lui ;
3. centraliser les contrats durables et les propriétaires ;
4. fournir une façade read-only pour observer le runtime ;
5. fournir des routes stables qui utilisent les surfaces modernes quand elles existent ;
6. certifier en vrai Chrome que cette frontière pilote l’application sans modifier la progression ;
7. rendre les prochaines extractions/remplacements possibles module par module au lieu d’un big-bang.

## `src/core/runtime-contracts.js`

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

## `src/core/runtime-bridge.js`

La façade `window.FrenchTranquilleRuntime` fournit :

- `snapshot()` : état structurel read-only du curriculum, des stores, APIs et navigation ;
- `refresh()` : resynchronisation des marqueurs diagnostiques ;
- `route('today'|'practice'|'progress')` : point d’entrée stable pour les écrans principaux ;
- `openLesson(id)` : ouverture via la meilleure surface existante ;
- `lastSnapshot()` : dernière photographie structurelle ;
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
Runtime boundary / Release layer
  ↓
Speaking Loop
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

- `app.js` — `600f094266c9f0c4c7b57efdbf61129909ebd9cb` ;
- `voice-ios.js` — `38e97aa3ef62dd6dcda224901b435f0973618679` ;
- `free-voice.js` — `b4c19b1936c788ee017eac9ba14e5a62c159e8d5` ;
- `assets/LOGO.png` — `64eaa6ad9781c6a9075d4f68615fc44344c4e21c` ;
- `assets/Favicon.png` — `c358672368a960bf7617e5532aff3e3319cddb3e`.

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

## Incident CI observé

Un vieux smoke **Real Life French III** a échoué une première fois dans Chrome headless sur l’étape leçon 35, après avoir déjà validé la leçon 20.

Aucun fichier Real Life n’avait été modifié. Le **même job a été rerun sans changement de code** et a ensuite validé :

```text
leçon 20 ✅
leçon 35 ✅
leçon 40 ✅
```

Il est donc classé comme flake historique Chrome et **aucune rustine runtime** n’a été ajoutée pour obtenir du vert.

## Release metadata version-forward

Les workflows Build 29.1 / 29.2 protégeaient correctement leurs comportements mais certains parseurs lisaient encore un numéro global Build 29.x exact.

Build 30 a uniquement rendu cette lecture version-forward afin que :

- Build 29.1 continue de protéger deux moments oraux ;
- Build 29.2 continue de protéger Bài 7, Tyffany, l’anti-répétition et les cibles tactiles ;
- une nouvelle version globale ne fasse pas échouer artificiellement un contrat historique toujours valide.

Aucune assertion pédagogique ou interactionnelle n’a été supprimée.

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

## Preuves de clôture

```text
PR #71 head ffa3ddf7...       21/21 fonctionnels SUCCESS
main runtime 5a8369df...      21/21 fonctionnels SUCCESS
Pages #129                    SUCCESS
main runtime total            22/22 SUCCESS Pages incluse
```

Le runtime Build 30 a donc été validé sur la PR exacte, mergé, retesté sur `main` puis réellement servi par GitHub Pages avant la clôture documentaire.

## Suite

Après Build 30 : **V2.0.0 — Freeze / Release**.

Le but du freeze est de certifier ce qui existe, pas d’introduire un nouveau moteur. Le gate terrain iPhone reste parallèle et ne devra pas être transformé en capture automatique du premier essai sans validation réelle.
