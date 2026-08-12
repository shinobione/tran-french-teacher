# French Trân’quille — ARCHITECTURE

## Vue générale — candidat Build 27

```text
iPhone / Safari / PWA
        ↓
Build 27 App Shell Reset
façade apprenante mobile-first
        ↓
Aujourd’hui / Pratiquer / Progrès / Parcours complet
        ↓
compatibility bus + moteurs historiques
        ↓
Progression / Session / Scenario / Listening / Memory / Mastery / Error
        ↓
Builds 26.6 → 26.9 : containment / geometry / focus / content reliability
        ↓
localStorage + Web APIs navigateur
```

PWA statique GitHub Pages, sans backend obligatoire ni API payante.

Principe produit : **la complexité appartient aux moteurs ; l’utilisatrice voit seulement le contexte nécessaire à l’action en cours.**

---

# Candidat runtime — v1.20.0 Build 27

Build 27 ajoute :

```text
build27-app-shell.js
build27-app-shell.css
build27-smoke.js
```

Le runtime pédagogique historique reste chargé :

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
build26-8-ux.js
build26-9-ux.js
build27-app-shell.js
build27-smoke.js
build-meta.js
```

`app.js` n’est pas réécrit par Build 27. Memory, Mastery, Listening, Scenario, Error Intelligence et leurs données ne sont ni clonés ni déplacés par la nouvelle façade.

---

# Build 27 — séparation façade / moteurs

## Problème produit

Après Builds 26.6 → 26.9, le cockpit `Parcours` était techniquement fiable mais restait trop proche d’un dashboard pédagogique : beaucoup de petites cartes, familles analytiques, compteurs et sous-panneaux.

La correction n’est donc plus un nouveau layout du dashboard. Build 27 introduit une **façade apprenante indépendante**.

```text
DOM + moteurs historiques
        ↓
continuent d’exister et de se mettre à jour
        ↓
Build 27 lit seulement les états utiles
        ↓
façade simple pour Trân
```

Les anciennes surfaces Home/Progress restent dans le DOM afin que leurs moteurs et leurs anciens tests continuent de fonctionner, mais sont masquées dans l’UX apprenante Build 27.

## Isolation des anciens contrats

Au démarrage, `build27-app-shell.js` détecte les paramètres des anciens smokes :

```text
b266Smoke
b267Smoke
b268Smoke
b269Smoke
...
```

Lorsque l’un de ces contrats historiques est actif, la façade Build 27 **ne s’installe pas**. Les anciens workflows continuent donc à voir et tester les surfaces qu’ils protègent réellement.

`b27Smoke` est le seul contrat propriétaire du nouveau shell. `uxSmoke=lesson8` peut rester présent uniquement pour injecter un ancien profil synthétique.

---

# Aujourd’hui Build 27

L’ancien dashboard Home reste dans le DOM, mais la vue apprenante expose :

```text
French Trân’quille
Bonjour / Xin chào Trân
        ↓
prochaine leçon
[ Continuer ]
        ↓
Réviser    Écouter
        ↓
petit rappel de durée
```

Build 27 récupère la prochaine leçon depuis le learner historique :

```text
francais-avec-luc:learner:v1
```

Aucun nouvel état de progression n’est créé.

Sur desktop de certification `1640×900`, la Home Build 27 mesure **672 px** de hauteur. Sur mobile `390×844`, elle reste mono-colonne et sans overflow horizontal.

---

# Pratiquer Build 27

Le bouton central de la bottom bar est intercepté en phase de capture par la façade Build 27 et ouvre :

```text
.b27-practice-page
```

Quatre intentions seulement :

```text
Parler
Écouter
Réviser
Dans la vraie vie
```

Les destinations restent les propriétaires historiques :

- `Parler` → bus Conversation existant ;
- `Écouter` → `FrenchTranquilleListening.open()` ;
- `Réviser` → bus Review existant ;
- `Dans la vraie vie` → `FrenchTranquilleScenarios.start(id)`.

Les scénarios personnels Jerry déjà débloqués sont privilégiés par la façade ; aucun scénario n’est dupliqué.

## Tab bar persistante

La bottom navigation reste le bus historique. Build 27 ne la recrée pas.

Contrats :

- nœuds Home / Practice / Progress persistants ;
- feedback `pointerdown` ;
- tap echo ;
- une seule tab `.active` ;
- Practice page s’arrête exactement au-dessus de la tab bar sur mobile.

Plusieurs couches historiques peuvent rappeler `FrenchTranquilleUX.refresh()`. Le bridge final de Build 27 observe donc les classes de la tab bar tant que Practice est ouvert et réaffirme idempotemment :

```text
active = practice uniquement
```

## Géométrie mobile

Le bottom de `.b27-overlay` n’est pas déterminé par une hauteur viewport supposée.

Build 27 mesure directement :

```text
overlay.getBoundingClientRect().bottom
vs
nav.getBoundingClientRect().top
```

Puis corrige le `bottom` inline jusqu’à obtenir un gap nul. Cette méthode reste valide dans un iframe, avec safe-area et dans Chrome headless.

---

# Progrès Build 27

La façade apprenante ne montre plus le cockpit analytique comme navigation normale.

```text
position A0 → A1
        ↓
prochaine leçon
        ↓
étape actuelle
        ↓
5 leçons autour de la position
        ↓
Voir tout le parcours
```

Le cockpit historique reste accessible uniquement en DEBUG FR pour diagnostic.

Le curriculum reste **40 leçons / 241 éléments**.

---

# Parcours complet Build 27

Vue dédiée :

```text
1. Survie A0          1–7
2. Vie quotidienne    8–15
3. Fondations A1      16–20
4. Premiers échanges  21–25
5. A1 Core            26–40
```

Une seule étape expose ses leçons.

Desktop large : 2 colonnes de leçons lorsque l’espace le permet. Mobile : une colonne.

Le workflow exige explicitement **15 lignes** lorsque `A1 Core` est sélectionné.

---

# Mouvement / état Build 27

Les pages Build 27 utilisent de courts fades/translations.

L’état logique n’appartient jamais à l’animation :

- un overlay reçoit `b27-entering` au montage ;
- `requestAnimationFrame` retire la classe ;
- un fallback borné à 48 ms retire également la classe si le frame est retardé ;
- `prefers-reduced-motion` désactive le mouvement sans changer le flux.

Les screenshots visuels CI `Practice/Journey` sont refusés tant que l’overlay possède encore `b27-entering` ou `b27-leaving`.

---

# Tribunal Build 27

Workflow : `.github/workflows/build27-app-shell-smoke.yml`.

Desktop `1640×900` :

```text
Home
→ Pratiquer
→ retour
→ Progrès
→ Parcours complet
→ A1 Core
→ retour
→ vraie Leçon
```

Même flux en `390×844`.

Contrats :

```text
Home primary CTA         = 1
Home quick actions       = 2
legacy Home visible      = 0
Practice actions         = 4
Progress lesson rows     = 5
legacy Progress visible  = 0
Journey stages           = 5
A1 Core rows             = 15
real lesson reached      = 1
horizontal overflow      = 0
```

Un second workflow `nav-click-smoke` reste le contrat tactile physique : pointer feedback, tap echo, persistance des nœuds, tab unique active, géométrie Practice/tab bar et destination réelle.

Le runtime head pré-doc candidat `7c5978cea9d4c1e9bb4b3b0e8ce75a151df3ea2e` a passé **16/16 workflows fonctionnels SUCCESS**.

---

# Revue visuelle Build 27

Le workflow capture :

```text
home-desktop.png
practice-desktop.png
progress-desktop.png
journey-desktop.png
home-mobile.png
```

Revue du candidat pré-doc :

- Home desktop : une leçon dominante + deux raccourcis ;
- Home mobile : une colonne, targets larges, tab bar ;
- Practice : quatre choix, aucun cockpit ;
- Progress : progression + prochaine leçon + stage ;
- Journey : vue dédiée, **aucun ghost de Progress après settlement**.

---

# Builds 26.6 → 26.9 restent actifs sous la façade

Build 27 ne supprime pas leurs contrats ; il masque simplement leur cockpit dans l’UX apprenante normale.

## Build 26.9 — Focus Content Reliability

Toujours canonique pour le vrai contenu visible des familles historiques.

## Build 26.8 — Progress Focus Flow

Toujours canonique pour les focus/sorties historiques et leur round-trip.

## Build 26.7 — garde géométrique

Toujours canonique pour la géométrie historique Détails/Parcours.

## Build 26.6 — frontière de propriété DOM

Composition historique conservée ; contrat anti-prolifération :

```text
après quiescence = 12 cartes
3 secondes après = 12 cartes
engine cards      = uniques
forbidden cards   = 0
```

Build 27 ne reparent aucune de ces cartes.

---

# Learning Details Dashboard — diagnostic historique

Familles toujours existantes sous le capot :

```text
🧠 memory
🎯 mastery
🎧 listening
🎭 real-life
🧩 path
⋯ other
```

Elles pilotent et diagnostiquent le moteur ; elles ne constituent plus la navigation quotidienne de Trân sous Build 27.

---

# Listening

Contrat final inchangé :

```text
normal request 0.88 → effectif 0.88
slow request   0.68 → bridge 0.65 → effectif 0.65
```

`voice-ios.js` reste byte-identique.

---

# Voice Self-Playback — Build 26.1

```text
réponse reconnue par free-voice.js
→ voice-replay.js
→ seconde prise volontaire locale
→ MediaRecorder / Blob URL / Audio
```

Pas d’upload ni persistance audio. Gate réel iPhone toujours ouvert :

```text
reconnaissance
→ seconde prise
→ lecture
→ reconnaissance suivante
```

---

# Real Life French

Ordre historique important :

```text
scenario-data.js
real-life-data.js
real-life-data-2.js
real-life-data-3.js
scenario-host.js
scenario-engine.js
real-life-ux.js
real-life-coach.js
```

Production actuelle : **36 situations / 108 tours**.

Baseline historique protégée : `real-life-data-2.js` correspond à **v1.17.0 — Build 24 — Real Life French II**, où Scenario comptait **28 situations / 84 tours** avant Pack III.

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

Build 27 ne crée aucune migration.

Sanctuaires byte-identiques :

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

---

# Production et release

Production tant que PR #60 n’est pas mergée :

```text
v1.19.9 Build 26.9
runtime 0b31eedb78daebd58dd9bdcb0a472d56250c8fff
GitHub Pages #114 SUCCESS
```

Build 27 reste **CANDIDAT** jusqu’à :

```text
docs candidat
→ exact PR head tout vert
→ merge exact
→ main tout vert
→ GitHub Pages SUCCESS
→ docs PROD / CLOS
```

Après Build 27 : Data & Recovery Hardening, iPhone/PWA/Accessibility Hardening, puis Architecture Hardening avant V2.0.0.