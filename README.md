# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Candidat actuel

- **v1.17.4**
- **Build 24.4 — Mobile Polish / Interaction Timing**
- statut : **CANDIDAT / branche `build24-4-mobile-polish`**
- baseline production : **v1.17.3 Build 24.3 — Premium Interaction UX**
- socle fonctionnel : **v1.17.0 Build 24 — Real Life French II**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **28 situations / 84 tours**
- coût : **0 €**

## Pourquoi Build 24.4

Le feedback tactile de Build 24.3 fonctionnait, mais un vrai test mobile a montré un défaut important : lors d’un changement réel d’onglet, `ux-shell.js` reconstruisait les boutons de la bottom bar pour changer leur état actif. Le nœud pressé pouvait donc disparaître avant que l’animation soit perceptible. Un retap sur l’onglet déjà actif, lui, conservait le nœud et affichait correctement le feedback.

Build 24.4 corrige la cause :

- les 3 boutons `Aujourd’hui / Pratiquer / Parcours` deviennent des **nœuds DOM persistants** ;
- seul leur état `active / aria-current` change ;
- un `tap echo` indépendant du composant reste visible même si l’écran cible rerend son contenu ;
- exactement un onglet principal doit rester actif ;
- le passage `Pratiquer → Parcours` évite le flash intermédiaire vers Home ;
- le header de leçon n’utilise plus le gros bandeau violet/sticky : titre transparent, retour intégré et séparation légère ;
- cache PWA : `1.17.4-b24.4-mobile-polish`.

## Règle UX canonique

> Toute action tappable doit produire un retour visuel immédiat **et ce retour doit survivre assez longtemps pour être perçu, même si l’action provoque un rerender**.

## Validation navigateur renforcée

Le smoke mobile 390×844 doit maintenant prouver :

- feedback `pointerdown` sur Pratiquer / Parcours / Aujourd’hui ;
- `tap echo` présent sur les trois ;
- identité DOM des 3 boutons inchangée avant/après les vraies navigations ;
- exactement un onglet actif après chaque navigation ;
- `Pratiquer` reste un vrai écran ;
- le header de leçon n’est plus sticky et n’a plus de fond opaque.

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

## Documentation

- [`ROADMAP.md`](./ROADMAP.md)
- [`CHANGELOG.md`](./CHANGELOG.md)
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
- [`docs/BUILD-POLICY.md`](./docs/BUILD-POLICY.md)
- [`docs/HOTFIX-24.3-PREMIUM-INTERACTION.md`](./docs/HOTFIX-24.3-PREMIUM-INTERACTION.md)
- [`docs/HOTFIX-24.4-MOBILE-POLISH.md`](./docs/HOTFIX-24.4-MOBILE-POLISH.md)

Build 24.4 ne sera déclaré `PROD / CLOS` qu’après PR, quality, Options, nav/mobile smoke, merge `main` et GitHub Pages verts.

Prochain jalon fonctionnel après stabilisation UX : **v1.18.0 — Build 25 — Real Life French III**.
