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

## Principe produit

```text
COMPLEXITÉ INTERNE
Curriculum / Memory / Mastery / Error / Scenario / Listening / Language

                  ↓

INTERFACE APPRENANTE
Aujourd’hui / Pratiquer / Parcours
```

Un moteur peut être important sans être visible en permanence. La complexité appartient à Lucie ; Trân reçoit d’abord l’information utile pour décider quoi faire.

---

# Runtime canonique — v1.18.0 Build 25

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
scenario-host.js
scenario-engine.js
real-life-ux.js
listening-data.js
listening-engine.js
ux-shell.js
interaction-ux.js
progression-ux.js
build-meta.js
```

CSS Build 25 : `progression-ux.css`.

`progression-ux.js` se charge après les moteurs qui injectent leurs cartes. Il ne remplace ni Memory, ni Mastery, ni le curriculum : il orchestre leur DOM une fois rendu.

---

# Progression UX

Dans `.screen-progress .progress-layout` :

1. `.progress-ux-overview` fournit le résumé apprenant ;
2. le vieux `.progress-hero` et `.stats` sont masqués mais non supprimés ;
3. les cartes secondaires sont rangées dans `details.progress-ux-details` ;
4. le curriculum complet reste intact ;
5. 5 lignes autour de la position actuelle sont visibles par défaut ;
6. `Voir les 40 leçons` révèle tout sans recréer le curriculum.

Les moteurs continuent à retrouver leurs cartes car elles restent descendantes de `.progress-layout`. Si un injecteur recrée une carte au premier niveau, l’orchestrateur la remet dans le bloc détails au frame suivant.

Build 25 ne persiste aucune donnée.

---

# État et sécurité

Clés historiques à préserver :

```text
francais-avec-luc:learner:v1
french-tranquille:scenarios:v1
french-tranquille:listening:v1
french-tranquille:safety:pre-build22:v1
```

Aucun changement UX ne doit les renommer pour des raisons esthétiques.

---

# Curriculum

- l1–l15 : `app.js` ;
- l16–l25 : `curriculum-stage2.js` ;
- l26–l40 : `curriculum-stage3.js`.

Contrat : **40 leçons / 241 éléments**.

---

# Scenario Engine

```text
scenario-data.js      12 situations / 36 tours
real-life-data.js      6 situations / 18 tours
real-life-data-2.js   10 situations / 30 tours
```

Total : **28 situations / 84 tours**.

`real-life-ux.js` limite déjà les scènes ouvertes visibles à `MAX_OPEN = 6`.

---

# Learning Memory / Error / Adaptive / Mastery

- Memory suit solidité et échéances ;
- Error conserve uniquement des erreurs observables ;
- Adaptive Language ajuste le soutien VI/FR ;
- Mastery synthétise des preuves ;
- Daily Coach choisit les priorités.

Build 25 ne change aucune règle de ces moteurs. Il retire seulement leurs grands panneaux du flux principal de Parcours.

---

# Listening

Audio via `speechSynthesis`.

État production après PR #29 :

```text
normal = 0.88
lent   = 0.68
```

Le pont est porté par `build-meta.js` sans toucher à `voice-ios.js`.

Build 25.1 testera **0.64**, puis éventuellement **0.62**.

---

# Voice / branding — sanctuaires

Retours terrain iPhone : voix Lucie naturelle et reconnaissance française satisfaisante.

CI protège :

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

---

# UX Shell

Navigation : `Aujourd’hui / Pratiquer / Parcours`.

Builds 24.3–24.5 garantissent feedback pointerdown, tap echo, nœuds persistants, état actif unique, Pratiquer comme écran et header de leçon allégé. Build 25 n’intervient pas dans cette couche.

---

# CI canonique

Contrats obligatoires :

1. quality historique ;
2. Options ;
3. nav/mobile ;
4. Progression UX compact / expanded / details ;
5. branding + voice hashes ;
6. curriculum 40/241 ;
7. Scenario 28/84 ;
8. Error / Listening / Adaptive ;
9. ancien profil l8 ;
10. aucune fatal card.

Build 25 a passé ces contrats sur PR puis sur `main`.

---

# Freeze terrain

Quand Trân utilise activement la PWA : aucun nouveau runtime/cache sauf incident critique.

---

# Dette technique

`app.js` reste monolithique par choix de sécurité. Son extraction est réservée à Architecture Hardening avec comparaison d’état avant/après.