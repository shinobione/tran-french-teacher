# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Candidat actuel

- **v1.17.5**
- **Build 24.5 — Navigation State Sync**
- statut : **CANDIDAT / branche `hotfix24-4-nav-state-sync`**
- socle UX : Build 24.4 — Mobile Polish / Interaction Timing
- baseline fonctionnelle : **v1.17.0 — Build 24 — Real Life French II**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **28 situations / 84 tours**
- coût : **0 €**

## Pourquoi Build 24.5

Build 24.4 a corrigé le vrai problème de feedback mobile : bottom-nav persistante, `tap echo` qui survit aux rerenders et header de leçon allégé. Sa PR était verte, mais le smoke mobile rejoué sur le commit `main` a détecté une course de synchronisation : l’écran Home était bien revenu alors que l’état visuel pouvait encore rester sur Parcours.

Build 24.5 retire cette dépendance au timing du `MutationObserver` :

- l’onglet demandé reçoit immédiatement l’état actif ;
- après la navigation native, `renderBottomNav()` confirme l’état immédiatement ;
- une seconde confirmation a lieu au prochain `requestAnimationFrame` ;
- une dernière réconciliation courte à 80 ms couvre les chemins de rendu différés ;
- nouveau token d’assets **`1.17.5-b24.5`** ;
- nouveau cache PWA **`tran-french-teacher-v1.17.5-b24.5-nav-state-sync`**.

La règle reste : **exactement un onglet actif**, feedback perceptible à chaque vrai changement, mêmes nœuds DOM avant/après navigation.

## Mobile Polish conservé

- `tap echo` premium sur les actions tappables ;
- bottom-nav persistante ;
- Pratiquer = vrai troisième écran ;
- header de leçon transparent/non-sticky ;
- support `prefers-reduced-motion`.

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

Build 24.5 ne sera déclaré `PROD / CLOS` qu’après PR, quality, Options, nav/mobile smoke sur le head final, puis les mêmes preuves sur `main` et GitHub Pages.

Prochain jalon fonctionnel après stabilisation : **v1.18.0 — Build 25 — Real Life French III**.
