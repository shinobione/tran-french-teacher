# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version en production

- **v1.17.5**
- **Build 24.5 — Navigation State Sync**
- statut : **PROD / CLOS**
- commit production : `a64ba268934c4cc811c578764b6aac00427c086a`
- baseline fonctionnelle : **v1.17.0 — Build 24 — Real Life French II**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **28 situations / 84 tours**
- coût : **0 €**

## Mobile interaction baseline

French Trân’quille doit se comporter comme une application mobile :

- retour visuel immédiat sur toute surface tappable ;
- `tap echo` perceptible même si l’action provoque un rerender ;
- nœuds DOM persistants pour `Aujourd’hui / Pratiquer / Parcours` ;
- exactement un onglet actif ;
- état actif synchronisé explicitement après navigation, sans dépendre uniquement du timing d’un `MutationObserver` ;
- `Pratiquer` est un vrai troisième écran ;
- header de leçon transparent/non-sticky ;
- `prefers-reduced-motion` respecté.

## Validation Build 24.5

PR #27 :

- quality #83 : **SUCCESS** ;
- Options #14 : **SUCCESS** ;
- nav/mobile #33 : **SUCCESS**.

Production `main` sur le même SHA :

- quality #84 : **SUCCESS** ;
- Options #15 : **SUCCESS** ;
- nav/mobile #34 : **SUCCESS** ;
- GitHub Pages #86 : **SUCCESS**.

Le smoke mobile vérifie maintenant réellement : feedback `pointerdown`, `tap echo`, identité persistante des trois boutons, onglet actif unique, navigation `Pratiquer → Parcours → Aujourd’hui` et header de leçon allégé.

## Sanctuaires

Aucun reset et aucune modification de :

```text
francais-avec-luc:learner:v1
assets/LOGO.png
assets/Favicon.png
voice-ios.js
free-voice.js
curriculum / Learning Memory / Scenario / Listening
```

## Suite

Prochain jalon fonctionnel : **v1.18.0 — Build 25 — Real Life French III**.

Voir aussi : `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md` et `docs/HOTFIX-24.5-NAV-STATE-SYNC.md`.
