# French Trân’quille — ARCHITECTURE

## Vue générale — production Build 27

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

Production : **v1.20.0 / Build 27**, runtime `beeb9ce8ba081ed0298edbcc339dca41600e4d09`, PR #60, Pages #116 SUCCESS.

---

# Runtime production — v1.20.0 Build 27

Build 27 ajoute :

```text
build27-app-shell.js
build27-app-shell.css
build27-smoke.js
```

Le runtime pédagogique historique reste chargé et propriétaire :

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

`app.js` n’est pas réécrit. Memory, Mastery, Listening, Scenario et Error Intelligence ne sont ni clonés ni déplacés par la nouvelle façade.

---

# Build 27 — séparation façade / moteurs

## Modèle

```text
DOM + moteurs historiques
        ↓
continuent d’exister et de se mettre à jour
        ↓
Build 27 lit seulement les états utiles
        ↓
façade simple pour Trân
```

Les anciennes surfaces Home/Progress restent dans le DOM pour les moteurs et leurs contrats historiques, mais sont masquées dans l’UX apprenante normale.

## Isolation des anciens smokes

`build27-app-shell.js` détecte les anciens paramètres `...Smoke`. Lorsqu’un contrat historique 26.x est actif, Build 27 ne s’installe pas. Les anciens workflows voient donc toujours les surfaces qu’ils protègent réellement.

`b27Smoke` appartient uniquement au nouveau shell ; `uxSmoke=lesson8` peut servir à injecter le profil historique sans désactiver Build 27.

---

# Aujourd’hui

```text
French Trân’quille
Xin chào / Bonjour Trân
        ↓
prochaine leçon
[ Continuer ]
        ↓
Réviser    Écouter
        ↓
petit rappel de durée
```

La prochaine leçon vient directement du learner historique :

```text
francais-avec-luc:learner:v1
```

Aucun nouvel état de progression n’est créé.

Certification desktop `1640×900` : Home **672 px** de haut. Mobile `390×844` : une colonne, zéro overflow horizontal.

---

# Pratiquer

La tab centrale ouvre `.b27-practice-page` avec :

```text
Parler
Écouter
Réviser
Dans la vraie vie
```

Destinations propriétaires :

- Parler → bus Conversation existant ;
- Écouter → `FrenchTranquilleListening.open()` ;
- Réviser → bus Review existant ;
- Dans la vraie vie → `FrenchTranquilleScenarios.start(id)`.

Les situations personnelles Jerry déjà débloquées sont privilégiées ; aucun scénario n’est dupliqué.

## Tab bar persistante

Build 27 ne recrée pas la navigation historique.

Contrats :

- nœuds Home / Practice / Progress persistants ;
- feedback `pointerdown` ;
- tap echo ;
- une seule tab `.active` ;
- page Practice arrêtée exactement au-dessus de la tab bar mobile.

Le bridge final réaffirme idempotemment `active = practice` pendant que Practice est ouvert, même si une couche historique appelle `FrenchTranquilleUX.refresh()`.

## Géométrie mobile

La façade mesure directement :

```text
overlay.getBoundingClientRect().bottom
vs
nav.getBoundingClientRect().top
```

Puis corrige le `bottom` jusqu’à un gap nul. Pas de constante magique fondée sur un viewport supposé.

---

# Progrès

UX apprenante :

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

Le cockpit historique reste accessible uniquement en DEBUG FR.

Curriculum : **40 leçons / 241 éléments**.

---

# Parcours complet

```text
1. Survie A0          1–7
2. Vie quotidienne    8–15
3. Fondations A1      16–20
4. Premiers échanges  21–25
5. A1 Core            26–40
```

Une seule étape expose ses leçons. Desktop large peut utiliser 2 colonnes ; mobile reste à 1. Le tribunal exige **15 lignes** pour A1 Core.

---

# Mouvement / état

Les pages utilisent de courts fades/translations.

```text
montage overlay
→ b27-entering
→ rAF retire la classe
→ fallback 48 ms si frame retardé
```

L’animation ne possède jamais l’état métier. `prefers-reduced-motion` conserve le flux sans mouvement.

Les captures CI Practice/Journey sont rejetées tant que `b27-entering` ou `b27-leaving` reste actif.

---

# Tribunal Build 27

Workflow : `.github/workflows/build27-app-shell-smoke.yml`.

Flux réel :

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

Desktop `1640×900` + mobile `390×844`.

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

`nav-click-smoke` protège en parallèle pointer feedback, tap echo, persistance des nœuds, tab unique active, géométrie Practice/tab bar et destination réelle.

Preuves de release :

```text
PR #60 head dba27d35...    16/16 fonctionnels SUCCESS
main beeb9ce8...           16/16 fonctionnels SUCCESS
Pages #116                 SUCCESS
main total                 17/17 SUCCESS Pages incluse
```

Le seul premier rouge `main` était l’ancien round-trip 26.8 ; le même job, sans changement de code, a ensuite passé Details / Curriculum / Round-trip / Mobile SUCCESS.

---

# Revue visuelle Build 27

Captures CI :

```text
home-desktop.png
practice-desktop.png
progress-desktop.png
journey-desktop.png
home-mobile.png
```

Release validée :

- Home desktop : une leçon dominante + deux raccourcis ;
- Home mobile : une colonne, targets larges, tab bar ;
- Practice : quatre choix, aucun cockpit ;
- Progress : progression + prochaine leçon + étape ;
- Journey : vue dédiée sans ghost de Progress après settlement.

---

# Builds 26.6 → 26.9 sous la façade

Build 27 ne supprime aucun de leurs contrats.

## Build 26.9 — Content Reliability
Vrai contenu visible des familles historiques.

## Build 26.8 — Focus Flow
Focus/sorties historiques et round-trip.

## Build 26.7 — Geometry
Géométrie historique Détails/Parcours.

## Build 26.6 — Containment

```text
après quiescence = 12 cartes
3 secondes après = 12 cartes
engine cards      = uniques
forbidden cards   = 0
```

Build 27 ne reparent aucune de ces cartes.

---

# Listening

```text
normal request 0.88 → effectif 0.88
slow request   0.68 → bridge 0.65 → effectif 0.65
```

`voice-ios.js` reste byte-identique.

---

# Voice Self-Playback — Build 26.1

```text
réponse reconnue
→ seconde prise volontaire locale
→ MediaRecorder / Blob URL / Audio
```

Pas d’upload ni persistance audio. Gate réel iPhone toujours ouvert : `reconnaissance → seconde prise → lecture → reconnaissance suivante`.

---

# Real Life French

Ordre historique :

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

Production : **36 situations / 108 tours**.

Baseline historique protégée : `real-life-data-2.js` = **v1.17.0 — Build 24 — Real Life French II**, avec **28 situations / 84 tours** avant Pack III.

---

# État et sécurité

Clés inchangées :

```text
francais-avec-luc:learner:v1
french-tranquille:scenarios:v1
french-tranquille:listening:v1
french-tranquille:learning-memory:v1
french-tranquille:safety:pre-build22:v1
```

Sanctuaires byte-identiques :

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

Build 27 ne crée aucune migration.

---

# Dette / suite

Build 27 est **PROD / CLOS**.

Prochains jalons : Build 28 Data & Recovery Hardening, Build 29 iPhone/PWA/Accessibility Hardening, Build 30 Architecture Hardening, puis V2.0.0.