# French Trân’quille — ARCHITECTURE

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
