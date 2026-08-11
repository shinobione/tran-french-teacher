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

# Runtime candidat — v1.18.1 Build 25.1

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

Build 25.1 ne modifie aucun moteur pédagogique. Il modifie uniquement la calibration du bridge audio final dans `build-meta.js` et l’identité cache/version correspondante.

---

# Progression UX — Build 25

Dans `.screen-progress .progress-layout` :

1. `.progress-ux-overview` fournit le résumé apprenant ;
2. le vieux hero/stats est masqué mais non supprimé ;
3. les cartes secondaires vivent dans `details.progress-ux-details` ;
4. le curriculum complet reste intact ;
5. 5 lignes autour de la position actuelle sont visibles par défaut ;
6. `Voir les 40 leçons` révèle tout.

Build 25 ne persiste aucune donnée.

---

# État et sécurité

Clés historiques :

```text
francais-avec-luc:learner:v1
french-tranquille:scenarios:v1
french-tranquille:listening:v1
french-tranquille:safety:pre-build22:v1
```

Aucun changement UX ne doit les renommer.

---

# Curriculum / Scenario

Curriculum : **40 leçons / 241 éléments**.

Scenario :

```text
scenario-data.js      12 / 36
real-life-data.js      6 / 18
real-life-data-2.js   10 / 30
TOTAL                 28 / 84
```

---

# Learning Memory / Error / Adaptive / Mastery

Ces moteurs restent inchangés. Ils travaillent derrière l’interface et alimentent Daily Coach, Parcours et les exercices.

---

# Listening — Build 25.1

Le moteur historique produit encore :

```text
normal request = 0.88
slow request   = 0.68
```

La couche `voice-ios.js` reste propriétaire de la voix choisie et de la vitesse globale Lucie. Comme elle normalise les utterances, `build-meta.js` installe un bridge ciblé.

Calibration candidate :

```text
0.88 request → 0.88 effectif
0.68 request → 0.64 effectif
```

Le bridge place temporairement l’effective rate dans `tran-french-teacher:luc-rate:v1` uniquement pendant l’appel hérité, puis restaure exactement la valeur précédente.

Aucune modification persistante du réglage utilisateur.

Observabilité :

```text
window.FrenchTranquilleListeningRates
html[data-listening-normal-rate="0.88"]
html[data-listening-engine-slow-rate="0.68"]
html[data-listening-slow-rate="0.64"]
```

---

# Voice / branding — sanctuaires

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

La voix Lucie, le pitch et la reconnaissance ne sont pas modifiés par Build 25.1.

---

# UX Shell

Navigation : `Aujourd’hui / Pratiquer / Parcours`.

Builds 24.3–24.5 garantissent feedback pointerdown, tap echo, nœuds persistants, état actif unique et header léger. Build 25/25.1 préservent cette baseline.

---

# CI canonique

Contrats obligatoires :

1. quality historique ;
2. Options ;
3. nav/mobile ;
4. Progression UX compact / expanded / details ;
5. **Listening rate smoke 25.1** ;
6. branding + voice hashes ;
7. curriculum 40/241 ;
8. Scenario 28/84 ;
9. Error / Listening / Adaptive ;
10. ancien profil l8 ;
11. aucune fatal card.

---

# Freeze terrain

Quand Trân utilise activement la PWA : aucun nouveau runtime/cache sauf incident critique.

---

# Dette technique

`app.js` reste monolithique par choix de sécurité. Son extraction est réservée à Architecture Hardening.