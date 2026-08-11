# French Trân’quille — ARCHITECTURE

## Vue générale

```text
iPhone / Safari / PWA
        ↓
UX Shell simple
        ↓
Progression UX / Session UX
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

Règles terrain :

> **un moteur peut être important sans être visible en permanence.**

> **la complexité appartient à Lucie ; Trân reçoit d’abord l’information utile pour décider quoi faire.**

---

# Runtime candidat — v1.18.0 Build 25

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
progression-ux.js            # Build 25 : progressive disclosure de Parcours
build-meta.js                # dernier : metadata + pont Listening
```

CSS Build 25 : `progression-ux.css`.

`progression-ux.js` est volontairement chargé **après** les moteurs qui injectent leurs cartes. Il ne remplace ni Memory, ni Mastery, ni le curriculum : il orchestre leur DOM une fois rendu.

---

# Build 25 — Progression UX

## Pourquoi une couche séparée

Les cartes Progress sont injectées par plusieurs modules indépendants. Réécrire chacun d’eux uniquement pour simplifier l’écran créerait une large surface de régression.

Build 25 utilise donc une façade dédiée :

```text
moteurs existants
   ↓ rendent leurs cartes normalement
progression-ux.js
   ↓ hiérarchise l’affichage
Parcours compact
```

## Comportement DOM

Dans `.screen-progress .progress-layout` :

1. un nouveau résumé `.progress-ux-overview` est ajouté ;
2. le vieux `.progress-hero` et `.stats` sont **masqués mais non supprimés** ;
3. les cartes secondaires du premier rail sont déplacées dans :

```text
<details class="progress-ux-details">
  <summary>Détails d’apprentissage</summary>
  <div class="progress-ux-details-body">
    cartes existantes
  </div>
</details>
```

Les sélecteurs des moteurs continuent à fonctionner car les cartes gardent leurs classes et restent descendantes de `.progress-layout`.

Si un injecteur recrée une carte au premier niveau après une mutation, l’orchestrateur la remet dans le bloc de détails au frame suivant.

## Curriculum compact

Le `.curriculum-card` complet reste intact.

Par défaut, Build 25 montre au plus :

```text
leçon précédente
leçon actuelle
3 leçons suivantes
```

Les autres lignes reçoivent `progress-ux-row-hidden`.

`Voir les 40 leçons` enlève ce masquage sans recréer le curriculum.

## Zéro migration

Build 25 n’écrit aucune nouvelle donnée apprenante et ne modifie aucune clé existante.

Il lit :

```text
francais-avec-luc:learner:v1
FrenchTranquilleMemory.summary()
FrenchTranquilleMastery.levelEstimate()
```

mais ne persiste rien.

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

Snapshot sécurité :

```text
french-tranquille:safety:pre-build22:v1
```

Aucun changement UX ne doit renommer ces clés pour des raisons esthétiques.

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
- validation ;
- indices/modèles ;
- voix/clavier ;
- Learning Memory ;
- stats persistantes.

Packs :

```text
scenario-data.js      12 situations / 36 tours
real-life-data.js      6 situations / 18 tours
real-life-data-2.js   10 situations / 30 tours
```

Total : **28 situations / 84 tours**.

`real-life-ux.js` limite déjà les scènes ouvertes visibles à `MAX_OPEN = 6`. Build 25 applique la même philosophie à Parcours.

---

# Learning Memory / Error / Adaptive / Mastery

Ces moteurs travaillent derrière l’interface :

- Memory suit solidité et échéances ;
- Error conserve uniquement des erreurs observables ;
- Adaptive Language ajuste le soutien VI/FR ;
- Mastery synthétise des preuves ;
- Daily Coach choisit les priorités.

Build 25 ne change aucune de leurs règles. Il retire seulement leurs grands panneaux du flux principal de Parcours.

---

# Listening

Audio via `speechSynthesis`.

État courant :

```text
normal = 0.88
lent   = 0.68
```

Le microfix PR #29 est porté par `build-meta.js` sans modifier `voice-ios.js`.

Build 25.1 testera plus tard **0.64**, puis éventuellement **0.62**.

---

# Voice — sanctuaire

Retours terrain iPhone : voix Lucie naturelle et reconnaissance française satisfaisante.

Sanctuaires byte-identiques en CI :

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

---

# UX Shell

Navigation :

```text
Aujourd’hui
Pratiquer
Parcours
```

Builds 24.3–24.5 garantissent feedback pointerdown, tap echo, nœuds persistants, état actif unique, Pratiquer comme écran et header de leçon allégé.

Build 25 n’intervient pas dans cette couche.

---

# CI Build 25

Le nouveau workflow `progression-ux-smoke.yml` ajoute trois navigateurs logiques sur viewport 390×844 :

## Compact

Profil l8 synthétique :

```text
current = l8
completed = 7
known = 40
visible rows = 5
total rows = 40
details open = 0
```

## Expanded

Même profil :

```text
visible rows = 40
expanded = 1
```

## Details

Le bloc détails est ouvert et Chrome doit encore retrouver au minimum :

```text
memory-progress-card
mastery-progress-card
```

Les workflows quality / Options / nav-mobile restent obligatoires.

---

# Freeze terrain

Le freeze du 11/08 est levé pour le chantier Build 25.

Règle permanente : pendant une vraie session de Trân, aucun nouveau runtime/cache sauf incident critique.

---

# Dette technique

`app.js` reste monolithique par choix de sécurité. Son extraction reste réservée à Architecture Hardening avec comparaison d’état avant/après.