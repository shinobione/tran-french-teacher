# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version en production

- **v1.18.1**
- **Build 25.1 — Listening Slow Calibration**
- statut : **PROD / CLOS**
- baseline précédente : **v1.18.0 — Build 25 — Progression UX / Progressive Disclosure**
- baseline fonctionnelle historique : **v1.17.0 — Build 24 — Real Life French II**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **28 situations / 84 tours**
- coût : **0 €**

## Listening

La calibration effective est maintenant :

```text
normal = 0.88
lent   = 0.64
```

Le moteur Listening conserve son signal historique `0.68` pour le mode lent ; `build-meta.js` le transforme en **0.64 juste avant la synthèse vocale**, puis restaure exactement la vitesse Lucie précédente. `voice-ios.js`, la voix sélectionnée et le pitch restent inchangés.

### Preuves Build 25.1

PR #33 : quality #99, Options #30, nav/mobile #49, Progression UX #7 et Listening-rate #2 — SUCCESS.

Production `main` `178c8b71d47887d8f9efd3389aa358d2f3e1a8eb` :

- quality #100 ✅ ;
- Options #31 ✅ ;
- nav/mobile #50 ✅ ;
- Progression UX #8 ✅ ;
- Listening-rate #3 ✅ ;
- GitHub Pages #92 ✅.

`0.62` reste volontairement hors production : uniquement si le prochain retour iPhone montre que `0.64` est encore trop rapide.

## Build 25 — Progression UX

`Parcours` reste compact : résumé clair, détails repliables, 5 leçons visibles par défaut et les 40 accessibles à la demande. Le contrat synthétique l8 reste : 7 leçons terminées, l8 actuelle, 40 acquis.

## Mobile interaction baseline

- retour visuel immédiat sur toute surface tappable ;
- `tap echo` perceptible après rerender ;
- nœuds persistants Aujourd’hui / Pratiquer / Parcours ;
- un seul état actif ;
- Pratiquer = vrai écran ;
- header de leçon léger ;
- reduced motion respecté.

## Sanctuaires

```text
francais-avec-luc:learner:v1
assets/LOGO.png
assets/Favicon.png
voice-ios.js
free-voice.js
curriculum / Learning Memory / Scenario / Listening state
```

## Suite

1. **v1.18.2 — Build 25.2 — Session Goals / Milestones / App Delight** — PROCHAIN.
2. **v1.19.0 — Build 26 — Real Life French III**.
3. **v1.20.0 — Build 27 — Data & Recovery Hardening**.
4. **v1.21.0 — Build 28 — iPhone / PWA / Accessibility Hardening**.
5. **v1.22.0 — Build 29 — Architecture Hardening**.
6. **V2.0.0 — Freeze / Release**.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/NEXT-UX-PASS.md`, `docs/BUILD-25-PROGRESSION-UX.md`, `docs/BUILD-25-1-LISTENING-SLOW.md`.