# French Trân’quille — ARCHITECTURE

## Vue générale

```text
iPhone / Safari / PWA
        ↓
UX Shell simple
        ↓
Progression UX + Session UX
        ↓
Build 26.3 Interaction layer
        ↓
Build 26.4 single-scroll + Tyffany
        ↓
Build 26.5 Conversation exit
        ↓
Build 26.6 Progress containment + staged curriculum
        ↓
Build 26.7 open-Details geometry guard
        ↓
Details Dashboard + Voice Replay
        ↓
moteurs pédagogiques locaux
        ↓
localStorage + Web APIs navigateur
```

PWA statique GitHub Pages, sans backend obligatoire ni API payante.

Principe produit : **la complexité appartient aux moteurs ; Trân voit d’abord l’information utile pour décider quoi faire.**

---

# Runtime production — v1.19.7 Build 26.7

Runtime principal :

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
real-life-data.js
real-life-data-2.js
real-life-data-3.js
scenario-host.js
scenario-engine.js
real-life-ux.js
real-life-coach.js
listening-data.js
listening-engine.js
ux-shell.js
interaction-ux.js
progression-ux.js
session-ux.js
session-ux-adapter.js
voice-replay.js
progress-details-dashboard.js
build26-3-ux.js
build26-4-ux.js
build26-5-ux.js
build26-6-ux.js
build26-7-ux.js
build-meta.js
```

CSS additif pertinent :

```text
progression-ux.css
session-ux.css
voice-replay.css
progress-details-dashboard.css
build26-3-ux.css
build26-4-ux.css
build26-5-ux.css
build26-6-ux.css
build26-7-ux.css
```

Production runtime : `eaa4b9f8688a90de85a3f853dc29e59d0b8ac650` — PR #54 — **13/13 workflows fonctionnels SUCCESS** — Pages **#110 SUCCESS**.

---

# Build 26.7 — contrat de géométrie quand Details est ouvert

## Régression terrain

Après Build 26.6, la frontière de propriété DOM était saine, mais une vidéo terrain a montré :

```text
Details fermé → Progress lisible
Details ouvert → learner flow écrasé
                → texte quasi vertical
                → cartes de leçon très étroites
```

La cause n’était pas un déplacement DOM ni une nouvelle duplication. Elle était purement géométrique.

## Cause CSS

La composition 26.6 utilisait :

```css
grid-template-columns:minmax(0,.94fr) minmax(440px,1.06fr);
```

Le learner flow pouvait donc rétrécir jusqu’à zéro alors que Details gardait un plancher de 440 px. L’ouverture du dashboard augmentait la pression intrinsèque sur le track droit.

## Correction

La structure 26.6 ne change pas :

```text
.progress-layout
└── .progress-ux-composition        ← frontière historique
    ├── .progress-ux-left-flow
    │   ├── .progress-ux-overview
    │   └── .progress-ux-curriculum
    └── .progress-ux-details
```

Lorsque Details est ouvert sur desktop large :

```css
grid-template-columns:minmax(0,1fr) minmax(0,1fr);
```

Les deux tracks peuvent donc se contracter équitablement sans qu’un minimum arbitraire force le parcours à céder toute sa largeur.

Les nœuds principaux reçoivent aussi `min-width:0` de façon explicite pour que les règles d’intrinsic sizing Grid ne réintroduisent pas un minimum inattendu.

Dashboard ouvert :

```css
grid-template-columns:repeat(2,minmax(0,1fr));
```

## Fallback 861–1040 px

Deux colonnes restent possibles techniquement mais ne sont plus considérées humaines à cette largeur lorsque Details est ouvert.

La grille devient :

```text
progress-ux-left-flow
↓
progress-ux-details
```

Mobile `<=860px` reste sous le contrat responsive historique.

## Preuves de géométrie

Le workflow 26.7 ne vérifie pas seulement des propriétés CSS ; il ouvre vraiment Details et mesure `getBoundingClientRect()`.

### 1640×900

```text
composition          = 920 px
left flow            = 452 px
Details              = 452 px
Overview             = 452 px
Curriculum           = 452 px
min lesson row       = 410 px
dashboard columns    = 2
side by side         = 1
horizontal overflow  = 0
containment 26.6     = 1
```

### 980×900

```text
left flow            = 906 px
min lesson row       = 864 px
vertical stack       = 1
horizontal overflow  = 0
containment 26.6     = 1
```

Le test échoue si le learner flow ou une ligne de leçon repasse sous les seuils contractuels.

---

# Build 26.6 — frontière de propriété Progress conservée

Plusieurs moteurs historiques créent leur carte Progress dans :

```js
document.querySelector('.screen-progress .progress-layout > div:first-child')
```

Cette première colonne est donc historiquement une **frontière de propriété DOM**, pas seulement un wrapper visuel.

Composition canonique depuis 26.6 :

```text
.progress-layout
└── .progress-ux-composition
    ├── .progress-ux-left-flow
    │   ├── .progress-ux-overview
    │   └── .progress-ux-curriculum
    └── .progress-ux-details
```

Conséquences :

- Memory / Mastery / Error / Stage retrouvent leurs cartes ;
- aucun moteur ne recrée sa carte parce qu’elle a quitté sa frontière ;
- Overview/Curriculum restent hors Details ;
- Build 26.4 single-scroll reste intact ;
- aucune migration de données.

Contrat temporel certifié :

```text
initial après quiescence = 12 cartes
3 secondes plus tard     = 12 cartes
Autres détails           = 1
forbidden cards          = 0
engine cards uniques     = oui
```

Build 26.7 modifie uniquement **la géométrie ouverte**, jamais cette propriété DOM.

---

# Learning Details Dashboard — Build 26.1 + containment 26.6 + geometry 26.7

Familles :

```text
🧠 memory    → Learning Memory + Error + Éléments appris
🎯 mastery   → Mastery + A1 Mastery
🎧 listening → Listening
🎭 real-life → Scenario / Real Life
🧩 path      → Stage2 / Stage3 / Adaptive / Daily / A1
⋯ other      → futur contenu non classifié
```

Contrats :

- `data-progress-detail-family` = propriété stable ;
- Overview / Curriculum interdits dans Details ;
- cartes réelles déplacées, jamais clonées ;
- une seule famille détaillée ouverte à la fois ;
- 3 tuiles par ligne dans son format historique, **2 quand Details est ouvert sur desktop 26.7** ;
- aucune famille ne peut imposer une largeur qui écrase le learner flow.

---

# Curriculum Progress — Build 25 + Humanization 26.6

Vue normale : **5 lignes** autour de la leçon courante.

Vue complète :

```text
1. Survie A0          1–7
2. Vie quotidienne    8–15
3. Fondations A1      16–20
4. Premiers échanges  21–25
5. A1 Core            26–40
```

Une seule étape expose ses leçons.

Contrats Chrome :

```text
profil l8 → étape courante = 8 lignes
clic A1 Core → 15 lignes
progressTotalRows = 40
progressStageCount = 5
```

Les 40 leçons restent toutes accessibles sans mur de 40 lignes.

---

# Build 26.5 — Conversation Exit conservé

```text
setPracticeMode('scenario' | 'voice' | 'guided')
        ↓
un seul mode visible

Changer de pratique
        ↓ pointerup OU click
setPracticeMode(null)
        ↓
practice hub
```

Conversation active reste une seule colonne centrée. `Tyffany` et `Pratique guidée` restent séparés visuellement.

La structure Progress 26.5 avec Details comme frère direct de la première colonne est supersédée par Build 26.6.

---

# Build 26.4 — single-scroll + Tyffany

Contrat toujours valide :

```text
overflow-y = visible
max-height = none
nested scroll = 0
page scrollable = 1
single scroll = 1
```

Tyffany est le nom visible. Les identifiants historiques restent volontairement compatibles :

```text
LucieVoice
tran-french-teacher:luc-voice:v1
tran-french-teacher:luc-rate:v1
tran-french-teacher:luc-pitch:v1
lucie-* ids/classes
```

`voice-ios.js` reste byte-identique.

---

# Build 26.3 — Interaction Stability

Today reste orchestré par `build26-3-ux.js` avec nœuds stables, routage explicite et rendu idempotent.

---

# Listening — Build 25.1 + correction Build 26.2

```text
normal request 0.88 → effectif 0.88
slow request   0.68 → bridge 0.65 → effectif 0.65
```

`voice-ios.js` accepte déjà les rates `>=0.65` et reste byte-identique.

---

# Session UX — Build 25.2

Sessions bornées :

- Listening : 5 questions ;
- Révision : jusqu’à 5 éléments prioritaires ;
- Scenario : 1 situation ;
- vocal guidé : objectif borné.

---

# Real Life French III — Build 26

Ordre runtime :

```text
scenario-data.js
real-life-data.js
real-life-data-2.js
real-life-data-3.js
scenario-host.js
scenario-engine.js
real-life-ux.js
real-life-coach.js
session-ux.js
```

Production : **36 situations / 108 tours**.

Baseline historique protégée : `real-life-data-2.js` correspond à **v1.17.0 — Build 24 — Real Life French II**, où Scenario comptait **28 situations / 84 tours** avant Pack III.

---

# Voice Self-Playback — Build 26.1

```text
free-voice.js
   ↓ réponse reconnue normalement
.free-voice-result
   ↓
voice-replay.js
   ↓ seconde prise volontaire locale
MediaRecorder → Blob URL → Audio
```

Pas de capture simultanée du premier essai, pas d’upload, pas de persistance audio, pas d’événement pédagogique créé par le replay.

Gate restant : test réel iPhone `reconnaissance → seconde prise → lecture → reconnaissance suivante`.

---

# État et sécurité

Clés pédagogiques existantes inchangées :

```text
francais-avec-luc:learner:v1
french-tranquille:scenarios:v1
french-tranquille:listening:v1
french-tranquille:learning-memory:v1
french-tranquille:safety:pre-build22:v1
```

Curriculum : **40 leçons / 241 éléments**.  
Scenario : **36 situations / 108 tours**.

Build 26.7 ne crée aucune clé learner et ne migre aucun état.

## Voice / branding — sanctuaires

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

---

# CI Build 26.7 — production

Le tribunal fonctionnel comporte désormais **13 workflows**.

Le workflow dédié 26.7 vérifie :

1. syntaxe / wiring / cache v1.19.7 ;
2. sanctuaires byte-identiques ;
3. vrai accès à Progress ;
4. vraie ouverture de Details ;
5. containment 26.6 toujours présent ;
6. géométrie 1640×900 mesurée et bornée ;
7. dashboard 2 colonnes en état ouvert ;
8. aucune overflow horizontale ;
9. fallback empilé à 980×900 ;
10. largeur du learner flow et des lesson rows au-dessus des seuils humains.

Le workflow 26.6 est version-forward sur le meta/cache global mais garde ses trois Chrome : stabilité temporelle, curriculum par étapes et mobile.

Preuves runtime :

```text
PR #54 / head 6b44b212...     13/13 SUCCESS
main eaa4b9f8...              13/13 SUCCESS
GitHub Pages #110             SUCCESS
```

# Dette / gate terrain

Build 26.7 est **PROD / CLOS**. Le gate iPhone de l’auto-écoute Build 26.1 reste ouvert. `app.js` reste monolithique par choix de sécurité ; son extraction est réservée à Architecture Hardening.
