from pathlib import Path

Path('README.md').write_text(r'''# French Trân’quille

PWA de français pensée pour **Trân**, vietnamienne débutante au départ (**A0**), avec vietnamien comme langue de soutien puis davantage de français à mesure que les acquis deviennent réellement utilisables.

## Candidat actuel

- **v1.12.0**
- **Build 19 — A1 Core**
- curriculum cible : **40 leçons / 238 éléments**
- ajout Build 19 : **15 leçons / 90 éléments**
- Scenario Lab : **12 situations / 36 tours**
- Learning Memory + Daily Coach + Mastery + Error Intelligence
- coût d’exploitation : **0 €**
- cible principale : **iPhone / Safari / PWA iOS**

> Build 19 reste un candidat tant que PR, CI `main` et GitHub Pages ne sont pas tous verts. Le statut de production vit dans `CHANGELOG.md` et `ROADMAP.md`.

## Liens projet

- [`ROADMAP.md`](./ROADMAP.md)
- [`CHANGELOG.md`](./CHANGELOG.md)
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
- [`docs/BUILD-POLICY.md`](./docs/BUILD-POLICY.md)
- [`docs/BUILD-19-A1-CORE.md`](./docs/BUILD-19-A1-CORE.md)
- PWA : `https://shinobione.github.io/tran-french-teacher/`

---

# Build 19 — A1 Core

Build 19 étend le parcours sans réécrire le moteur historique.

```text
25 leçons / 148 éléments
        ↓
+ 15 leçons / 90 éléments
        ↓
40 leçons / 238 éléments
```

Les nouvelles leçons sont chargées par `curriculum-stage3.js` avant le rerender curriculum existant. Les 25 anciennes leçons restent inchangées.

## Leçons 26 → 40

26. **Nombres 11 → 20** ;
27. **Nombres 20 → 100 & prix** ;
28. **Jours de la semaine** ;
29. **Mois & dates** ;
30. **Heure plus précise** — et quart, et demie, moins le quart, midi, minuit ;
31. **Possessifs** — mon/ma/mes, ton/ta/tes ;
32. **Présent avec tu** ;
33. **Présent avec il / elle** ;
34. **Présent avec nous** ;
35. **Futur proche** — aller + infinitif ;
36. **Passé récent** — venir de + infinitif ;
37. **Passé composé fréquent avec avoir** ;
38. **Passé composé avec être** et formes féminines utiles à Trân ;
39. **Administration & documents** ;
40. **Émotions, besoins & proches** — dont `Tu me manques`.

Chaque leçon Build 19 contient exactement **6 éléments**, une intro VI/FR, une mini-structure utile et une situation finale.

## Philosophie grammaticale

On ne crée pas de chapitre « conjugaison du présent » isolé.

La progression est volontairement :

```text
je déjà connu
→ tu
→ il / elle
→ nous
→ futur proche
→ passé récent
→ passé composé fréquent
```

Les formes arrivent parce qu’elles permettent de parler, pas parce qu’un programme scolaire exige un tableau.

---

# A1 Core Mastery

`mastery-stage3.js` ajoute un **cinquième palier** indépendant des quatre étapes historiques.

Il suit les leçons 26–40 avec :

- leçons terminées ;
- éléments connus ;
- éléments réellement révisés ;
- éléments solides ;
- fragilités.

Le statut `Maîtrisé` exige notamment :

- 15/15 leçons terminées ;
- ≥ 95 % des items connus ;
- ≥ 70 % avec preuve de révision ;
- ≥ 55 % solides ;
- ≤ 20 % fragiles.

Ce score reste **un indicateur pédagogique interne**, jamais une certification CECRL.

---

# Mémoire et adaptation

Les nouveaux IDs Stage 3 rejoignent le curriculum global ; ils deviennent donc automatiquement visibles par :

- **Learning Memory** ;
- **Free Voice** ;
- **Error Intelligence** ;
- **Daily Coach** ;
- **Mastery Stage 3**.

Aucune nouvelle clé apprenant n’est nécessaire et aucun reset n’est prévu.

## Learning Memory

Clé : `french-tranquille:learning-memory:v1`

États : Nouveau / Fragile / En cours / Solide.

## Error Intelligence

Clé : `french-tranquille:error-intelligence:v1`

Build 18 reste intact : historique borné **20 événements / élément**, **120 récents globaux**, récence, répétition, récupération et classification fondée sur des preuves observables.

## Scenario Lab

Clé : `french-tranquille:scenarios:v1`

Les 12 scénarios Build 17 restent présents. Build 19 n’ajoute volontairement pas de nouveaux scénarios : son intention principale est le curriculum A1 Core.

---

# Voix

Toujours 0 € :

- `speechSynthesis` ;
- `SpeechRecognition` / `webkitSpeechRecognition` quand disponible ;
- fallback texte permanent ;
- Free Voice → Learning Memory + Error Intelligence.

La calibration Safari/Siri reste un **gate séparé** jusqu’au test réel sur l’iPhone de Trân.

French Trân’quille ne transforme jamais « la transcription ne correspond pas » en faux verdict phonétique.

---

# Runtime Build 19

```text
app.js
↓
curriculum-stage2.js       # leçons 16–25
↓
curriculum-stage3.js       # leçons 26–40
↓
stage2-boot.js             # un seul rerender pour Stage 2 + 3
↓
debug / voice
↓
learning-memory.js
↓
daily-coach.js
↓
mastery-engine.js
↓
mastery-stage3.js
↓
scenario-data.js
↓
scenario-host.js
↓
scenario-engine.js
↓
error-intelligence.js
↓
build-meta.js              # source finale de version runtime
```

`app.js` historique reste sanctuarisé.

---

# Qualité Build 19

Le workflow est normalisé autour de l’état courant plutôt que d’empiler un `grep` différent pour chaque build depuis la V1.

Contrats :

- syntaxe de tous les modules ;
- 15 leçons Stage 3 ;
- 6 items par leçon ;
- 90 items Stage 3 ;
- IDs curriculum uniques ;
- non-régression Scenario Lab ;
- non-régression Error Intelligence ;
- câblage PWA/cache/version ;
- Mastery A1 Core ;
- Chrome Home : 40 leçons + leçon 40 ;
- Chrome Scenario ;
- Chrome Error Intelligence ;
- Chrome A1 Core / Progression.

Voir [`docs/BUILD-19-A1-CORE.md`](./docs/BUILD-19-A1-CORE.md).

---

# DEBUG FR

Le DEBUG FR reste local au navigateur de Jerry. L’appareil de Trân reste en vietnamien.

Raccourci : `?debug=fr`.

---

# Roadmap

Après Build 19 :

- **Build 20 — Listening Comprehension** ;
- **Build 21 — Adaptive Language Ratio** ;
- Safari/Siri Calibration Gate dès que le test réel iPhone est disponible ;
- puis Real Life French et durcissement V2.

Le détail et les critères de clôture sont dans [`ROADMAP.md`](./ROADMAP.md).
''', encoding='utf-8')

Path('CHANGELOG.md').write_text(r'''# French Trân’quille — CHANGELOG

Ce fichier conserve l’historique des versions livrées. Les intentions futures vivent dans `ROADMAP.md`.

## [Unreleased]

### v1.12.0 — Build 19 — A1 Core

- ajout prévu de **15 leçons / 90 éléments** ;
- cible **40 leçons / 238 éléments** ;
- `curriculum-stage3.js` pour les leçons 26–40 ;
- nombres 11→100, jours, mois, dates, heure précise ;
- possessifs de base ;
- présent avec `tu`, `il/elle`, `nous` ;
- futur proche ;
- passé récent ;
- passé composé fréquent avec `avoir` ;
- passé composé avec `être` et formes féminines utiles à Trân ;
- administration / documents ;
- émotions, besoins et proches ;
- exactement 6 éléments par leçon ;
- nouveau chapitre visuel A1 Core ;
- carte Progression Stage 3 ;
- `mastery-stage3.js` avec preuves de révision obligatoires avant maîtrise ;
- `build-meta.js` chargé en dernier comme source finale de version runtime ;
- réutilisation du boot curriculum existant au lieu d’ajouter un second boot ;
- dossier [`docs/BUILD-19-A1-CORE.md`](./docs/BUILD-19-A1-CORE.md) ;
- normalisation de la CI autour de l’état courant ;
- nouveaux smoke tests Chrome Home / Scenario / Error / A1 Core.

> Cette entrée reste dans **Unreleased** jusqu’à validation PR + `main` + GitHub Pages.

---

## [1.11.0] — Build 18 — Error Intelligence — 2026-08-11

- stockage `french-tranquille:error-intelligence:v1` ;
- taxonomie fondée sur des preuves observables ;
- historique borné à 20 événements par élément / 120 globaux récents ;
- récence, répétition, récupération ;
- priorité Daily Coach ;
- carte Progression et export local ;
- Free Voice → Learning Memory + Error Intelligence ;
- correction de classification `free-voice-text` / `voice` ;
- triple Chrome Home / Scenario / Error ;
- limites 20/120 prouvées par smoke navigateur ;
- CI `main` et GitHub Pages validés.

## [1.10.0] — Build 17 — Scenario Lab — 2026-08-11

- 12 situations / 36 tours ;
- déverrouillage selon les leçons ;
- indices puis modèle ;
- Learning Memory ;
- voix + texte ;
- stats locales ;
- profil vierge supporté ;
- double Chrome Home / Conversation.

## [1.9.0] — Build 16 — Mastery Engine — 2026-08-11

- maîtrise par grandes étapes ;
- preuves Learning Memory ;
- estimation interne non certifiante ;
- docs canoniques ROADMAP / CHANGELOG / ARCHITECTURE / BUILD-POLICY ;
- process branche → PR → CI → Chrome → merge → Pages.

## [1.8.0] — Build 15 — 2026-08-11

- 25 leçons / 148 éléments ;
- Early A1 ;
- Daily Coach ;
- Stage 2 modulaire.

## [1.7.1] — Build 14 / 14.1 — 2026-08-11

- refonte UX Conversation/Révision/Memory ;
- avatar Lucie via icône French Trân’quille.

## [1.7.0] — Build 13 — 2026-08-11

- Learning Memory ;
- révision espacée ;
- export/import JSON.

## [1.6.1] — Build 12 — 2026-08-11

- Curriculum UX responsive.

## [1.6.0] — Build 11 — 2026-08-11

- 15 leçons / 88 éléments.

## [1.5.0] — Build 10 / 10.1 / 10.2

- responsive ; watchdog ; ES modules ; Chrome headless.

## [1.4.0] — Build 9

- French Trân’quille ; Lucie ; logo/favicon/PWA.

## [1.3.0] — Build 8

- Guided Free Voice.

## [1.2.0] — Build 7

- Free Voice gratuit.

## [1.1.x] — Builds 5–6

- expérimentation payante abandonnée ; retour architecture 0 €.

## [1.0.3] — Build 4

- voix iPhone-first.

## [1.0.2] — Build 3

- DEBUG FR.

## [1.0.1] — Build 2

- anti-traduction automatique.

## [1.0.0] — Build 1

- première PWA / leçon / progression / offline / GitHub Pages.
''', encoding='utf-8')

Path('ROADMAP.md').write_text(r'''# French Trân’quille — ROADMAP

> `README.md` = état du candidat/courant. `CHANGELOG.md` = historique. Ici : **ordre, dépendances et critères de clôture**.

## Principes non négociables

1. iPhone / Safari / PWA iOS = cible principale.
2. 0 € d’exploitation récurrente tant qu’une décision explicite ne change pas cette règle.
3. Vietnamien majoritaire au départ ; français augmenté selon les preuves d’apprentissage.
4. Oral prioritaire, sans faux diagnostic phonétique.
5. Communication réelle > théorie scolaire.
6. Aucun reset silencieux.
7. Un gros build = une intention principale.
8. Aucun merge important sans Chrome headless vert.
9. README / CHANGELOG / ROADMAP / ARCHITECTURE synchronisés.
10. PWA dédiée, pas clone de chatbot ni gamification agressive.

---

# Référence production

## v1.11.0 — Build 18 — ✅ PROD

- 25 leçons / 148 éléments ;
- Learning Memory ;
- Daily Coach ;
- Mastery Engine ;
- Scenario Lab 12 / 36 ;
- Error Intelligence ;
- Free Voice ;
- Chrome Home / Scenario / Error ;
- Pages ;
- 0 €.

---

# PHASE PWA-4B — A1 CORE

## v1.12.0 — Build 19 — 🔥 EN COURS

### But

Passer de l’Early A1 à un **A1 Core réellement utilisable** sans chapitre de conjugaison hors-sol.

### Livrables candidat

- [x] `curriculum-stage3.js` ;
- [x] leçons 26→40 ;
- [x] nombres 11→100 ;
- [x] jours / mois / dates ;
- [x] heure plus complète ;
- [x] possessifs ;
- [x] présent avec `tu` ;
- [x] présent avec `il/elle` ;
- [x] présent avec `nous` ;
- [x] futur proche ;
- [x] passé récent ;
- [x] passé composé fréquent ;
- [x] formes féminines avec être ;
- [x] administration / documents ;
- [x] émotions / besoins / Jerry ;
- [x] `curriculum-stage3.css` ;
- [x] `mastery-stage3.js` ;
- [x] `mastery-stage3.css` ;
- [x] dossier Build 19 ;
- [x] build-meta central placé en dernier ;
- [x] CI Build 19 normalisée.

### Cible chiffrée

```text
15 nouvelles leçons
90 nouveaux éléments
40 leçons total
238 éléments total
```

### À valider avant clôture

- [ ] normalisation effective à 6 items par leçon ;
- [ ] IDs globaux uniques ;
- [ ] aucun reset des données ;
- [ ] Learning Memory voit Stage 3 ;
- [ ] Free Voice voit Stage 3 ;
- [ ] Error Intelligence voit Stage 3 ;
- [ ] Mastery A1 Core visible ;
- [ ] Chrome Home = 40 leçons ;
- [ ] Chrome Scenario non-régression ;
- [ ] Chrome Error non-régression ;
- [ ] Chrome A1 Core/Progression ;
- [ ] PR verte ;
- [ ] merge ;
- [ ] CI `main` verte ;
- [ ] GitHub Pages vert ;
- [ ] CHANGELOG déplacé de Unreleased vers release ;
- [ ] ROADMAP Build 19 = CLOS.

---

# VOICE CALIBRATION GATE

Bloqué jusqu’au vrai test iPhone/Safari de Trân.

À collecter : cible, transcription, alternatives, essais, faux refus, faux positifs. Aucun score phonétique inventé avant ces données.

---

# Build 20 — v1.13.0 — Listening Comprehension — PROCHAIN

- phrase audio → sens ;
- contrastes proches ;
- vitesse lente puis normale ;
- mini-dialogues ;
- Memory + Error Intelligence ;
- difficulté adaptée au Mastery.

# Build 21 — v1.14.0 — Adaptive Language Ratio

Le ratio VI/FR dépendra de : Mastery, compréhension, indices, Error Intelligence et difficulté des situations.

# Builds 22–24 — Real Life French

Français avec Jerry, proches, repas, téléphone, problèmes quotidiens, émotions, humour simple, oral courant vs forme correcte.

# V2.0.0 — Hardening

A0→A1 cohérent, scénarios stables, mémoire versionnée, sauvegarde robuste, Safari réel, offline, docs complètes, 0 dépendance payante obligatoire.

---

# Backlog

- vrai avatar Lucie ;
- sons discrets ;
- fiches imprimables ;
- bilan exportable ;
- admin local ;
- mode 5 min ;
- écoute/déplacement ;
- stats hebdomadaires ;
- multi-appareil gratuit si solution sûre.

# Reporté

Backend/API payants, avatar vidéo, XP/classement, gamification agressive, score phonétique pseudo-scientifique, app native tant que PWA suffisante.

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.
''', encoding='utf-8')

Path('docs/ARCHITECTURE.md').write_text(r'''# French Trân’quille — ARCHITECTURE

## Vue générale

PWA statique GitHub Pages :

```text
iPhone/Safari/PWA | Android/Chromium | PC
                    ↓
               GitHub Pages
                    ↓
        HTML + CSS + JavaScript
                    ↓
          localStorage + Web APIs
```

Aucun backend obligatoire, aucune base distante, aucune clé API cliente, aucune dépendance payante nécessaire.

---

# Ordre runtime — Build 19

```text
app.js
↓
curriculum-stage2.js        # leçons 16–25
↓
curriculum-stage3.js        # leçons 26–40
↓
stage2-boot.js              # rerender unique après les deux extensions
↓
debug-fr.js
↓
voice-ios.js
↓
free-voice.js
↓
learning-memory.js
↓
daily-coach.js
↓
mastery-engine.js           # étapes 1–4
↓
mastery-stage3.js           # palier A1 Core 26–40
↓
scenario-data.js
↓
scenario-host.js
↓
scenario-engine.js
↓
error-intelligence.js
↓
build-meta.js               # chargé en dernier, version runtime finale
```

---

# Curriculum

## `app.js`

Moteur historique + leçons 1–15 + UI de base. Sanctuarisé.

## `curriculum-stage2.js`

Leçons 16–25, 60 éléments, structures Early A1.

## `curriculum-stage3.js` — Build 19

Leçons 26–40, **90 éléments** après normalisation.

Responsabilités :

- étendre `FrenchTranquilleCurriculum.lessons` ;
- étendre `FrenchTranquilleCurriculum.items` ;
- exposer `FrenchTranquilleStage3` ;
- note grammaticale courte VI/FR ;
- chapitre visuel A1 Core ;
- carte Progression Stage 3.

Le module est chargé avant `stage2-boot.js`, donc un seul rerender rend les 40 leçons visibles.

## `stage2-boot.js`

Nom historique conservé. Son rôle Build 19 devient en pratique **curriculum extension boot** : il rerend l’UI une fois après Stage 2 + Stage 3.

---

# Mastery

## `mastery-engine.js`

Quatre étapes historiques : Survie A0, Vie quotidienne A0, Fondations A1, Premiers échanges A1.

## `mastery-stage3.js` — Build 19

Cinquième palier : **A1 Core (leçons 26–40)**.

Entrées : progression, connus, Learning Memory, révisions, solides, fragiles.

Maîtrise : 15/15 leçons + ≥95 % connus + ≥70 % révisés + ≥55 % solides + ≤20 % fragiles.

Expose `FrenchTranquilleMasteryStage3`.

---

# Learning Memory

`learning-memory.js` — clé `french-tranquille:learning-memory:v1`.

Le module lit le curriculum global ; les items Stage 3 deviennent donc automatiquement éligibles à la mémoire.

États : new / fragile / learning / solid.

---

# Error Intelligence

`error-intelligence.js` — clé `french-tranquille:error-intelligence:v1`.

- preuves observables ;
- historique 20/élément, 120 récents ;
- récence/répétition/récupération ;
- priorité Daily Coach ;
- export local.

Il reconstruit sa table d’items depuis le curriculum global, donc Stage 3 est compatible sans migration de schéma.

---

# Voix

`free-voice.js` lit `FrenchTranquilleCurriculum.items` au moment de la pratique : les nouveaux items appris peuvent donc entrer dans le pool vocal.

Free Voice → Learning Memory + Error Intelligence.

Aucun score phonétique. Safari/Siri doit être calibré avec de vraies données iPhone.

---

# Scenario Lab

`scenario-data.js` + `scenario-host.js` + `scenario-engine.js`.

12 scénarios / 36 tours Build 17. Build 19 ne modifie pas leur catalogue : test de non-régression uniquement.

Clé : `french-tranquille:scenarios:v1`.

---

# Daily Coach

`daily-coach.js` combine Memory/progression ; Error Intelligence peut injecter un focus prioritaire.

Stage 3 augmente naturellement le parcours disponible via le curriculum global.

---

# Build metadata

## `build-meta.js`

Build 19 le charge **après tous les autres modules**.

Il applique la version/build finale à : Curriculum, Voice, FreeVoice, Stage2, Stage3, DailyCoach, Mastery, MasteryStage3, ScenarioData, Scenarios et Errors.

Cela évite qu’un module chargé plus tard réexpose un ancien numéro interne.

---

# Stockage local principal

```text
francais-avec-luc:learner:v1
french-tranquille:learning-memory:v1
french-tranquille:scenarios:v1
french-tranquille:error-intelligence:v1
tran-french-teacher:debug-fr:v1
```

Aucune nouvelle clé apprenant Build 19 : pas de reset ni migration destructive.

---

# Service Worker

Build 19 : cache `1.12.0-b19`, précache Stage3 + MasteryStage3, réseau d’abord pour GET, fallback cache/index, purge des anciens caches.

---

# CI Build 19

Le workflow est normalisé autour de l’état courant :

- syntaxe ;
- garde du cœur historique ;
- contrat Stage 3 = 15 leçons / 6 items chacune / 90 items ;
- unicité globale des IDs ;
- câblage/version/cache ;
- contrat Mastery A1 Core ;
- compatibilité Memory/Voice/Error ;
- Scenario non-régression ;
- Chrome Home 40 leçons ;
- Chrome Scenario ;
- Chrome Error ;
- Chrome A1 Core.

---

# Dette technique

`app.js` reste monolithique. Les extensions DOM doivent être idempotentes et ne jamais créer de boucle MutationObserver.

Une extraction future d’`app.js` devra être un build de migration dédié, pas un refactor glissé au milieu d’un build pédagogique.
''', encoding='utf-8')

print('Build 19 canonical docs written')
