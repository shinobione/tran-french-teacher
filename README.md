# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version candidate

- **v1.18.1**
- **Build 25.1 — Listening Slow Calibration**
- statut : **CANDIDAT / EN COURS**
- baseline production : **v1.18.0 — Build 25 — Progression UX / Progressive Disclosure**
- baseline fonctionnelle historique : **v1.17.0 — Build 24 — Real Life French II**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **28 situations / 84 tours**
- coût : **0 €**

## Build 25.1

Retour terrain : le bouton `Lent` est désormais réellement distinct de `Vitesse normale`, mais `0.68` reste légèrement rapide.

Candidat :

```text
normal effectif = 0.88
lent effectif   = 0.64
```

Le moteur Listening conserve son ancien signal `0.68`; `build-meta.js` le calibre à **0.64 juste avant la synthèse vocale**. Ce choix évite toute modification de `voice-ios.js`, du pitch, de la voix sélectionnée ou de la vitesse Lucie sauvegardée.

Le build expose également les valeurs effectives dans le DOM/API afin que CI puisse prouver :

```text
normal = 0.88
engine slow request = 0.68
effective slow = 0.64
```

Cache candidat : `tran-french-teacher-v1.18.1-b25.1-listening-slow`.

## Build 25 — livré

Build 25 simplifie `Parcours` : résumé clair, détails repliables, 5 leçons visibles par défaut et les 40 accessibles à la demande. Son contrat l8 reste : 7 leçons terminées, l8 actuelle, 40 acquis.

Preuves production Build 25 : quality #94, Options #25, nav/mobile #44, Progression UX #2 et Pages #90 — SUCCESS.

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

1. **Build 25.1 — Listening Slow Calibration** — EN COURS.
2. **Build 25.2 — Session Goals / Milestones / App Delight**.
3. **Build 26 — Real Life French III**.
4. Build 27 — Data & Recovery.
5. Build 28 — iPhone/PWA/Accessibility.
6. Build 29 — Architecture Hardening.
7. V2.0.0 — Freeze / Release.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/NEXT-UX-PASS.md`.