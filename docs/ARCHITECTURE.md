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

La complexité appartient aux moteurs ; Trân voit d’abord l’information utile pour décider quoi faire.

---

# Runtime canonique — v1.18.1 Build 25.1

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

---

# Progression UX — Build 25

`progression-ux.js` orchestre le rendu existant sans modifier les moteurs ni persister de données : résumé apprenant, détails repliables, 5 lignes curriculum visibles par défaut, 40 accessibles à la demande.

---

# Listening — Build 25.1

Le moteur historique demande encore :

```text
normal request = 0.88
slow request   = 0.68
```

`build-meta.js` installe le bridge ciblé :

```text
0.88 request → 0.88 effectif
0.68 request → 0.64 effectif
```

Pendant l’appel hérité à `speechSynthesis.speak`, le bridge place temporairement l’effective rate dans `tran-french-teacher:luc-rate:v1`, puis restaure exactement la valeur précédente.

Observabilité canonique :

```text
window.FrenchTranquilleListeningRates
html[data-listening-normal-rate="0.88"]
html[data-listening-engine-slow-rate="0.68"]
html[data-listening-slow-rate="0.64"]
```

Aucune modification de `voice-ios.js`, du pitch, de la voix choisie ou du réglage Lucie persistant.

---

# État et sécurité

Clés historiques à préserver :

```text
francais-avec-luc:learner:v1
french-tranquille:scenarios:v1
french-tranquille:listening:v1
french-tranquille:safety:pre-build22:v1
```

Curriculum : **40 leçons / 241 éléments**. Scenario : **28 situations / 84 tours**.

---

# Voice / branding — sanctuaires

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

---

# UX Shell

Navigation : `Aujourd’hui / Pratiquer / Parcours`.

Builds 24.3–24.5 garantissent feedback pointerdown, tap echo, nœuds persistants, état actif unique et header léger. Build 25 / 25.1 préservent cette baseline.

---

# CI canonique

Contrats obligatoires :

1. quality historique ;
2. Options ;
3. nav/mobile ;
4. Progression UX compact / expanded / details ;
5. Listening rate smoke ;
6. branding + voice hashes ;
7. curriculum 40/241 ;
8. Scenario 28/84 ;
9. Error / Listening / Adaptive ;
10. ancien profil l8 ;
11. aucune fatal card.

Build 25.1 a passé ces contrats sur PR puis sur `main`, plus Pages #92.

---

# Prochain chantier architectural UX

Build 25.2 introduira une **Session UX layer** : objectif visible, progression, fin explicite et sortie logique, sans réécrire les moteurs existants quand une façade peut suffire.

---

# Freeze terrain

Quand Trân utilise activement la PWA : aucun nouveau runtime/cache sauf incident critique.

# Dette technique

`app.js` reste monolithique par choix de sécurité. Son extraction est réservée à Architecture Hardening.