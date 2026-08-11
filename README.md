# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version en production

- **v1.17.3**
- **Build 24.3 — Premium Interaction UX**
- statut : **PROD / CLOS**
- commit production : `eef4bb7113dcc3f37bab76928f112b8032034ec5`
- socle fonctionnel : **v1.17.0 Build 24 — Real Life French II**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **28 situations / 84 tours**
- Real Life I + II : **16 situations / 48 tours**
- coût : **0 €**

## Build 24.3 — Premium Interaction UX

Objectif : faire ressentir French Trân’quille comme une **application mobile**, pas comme un site web responsive.

Règle UX désormais canonique :

> Toute action tappable doit produire un retour visuel immédiat.

Build 24.3 apporte :

- feedback `pointerdown` global sur boutons, navigation, choix, cartes interactives, révision, conversation et listening ;
- légère compression, contraste/glow court et flash de confirmation au clic ;
- état actif plus lisible dans la bottom bar ;
- transition courte d’entrée des écrans ;
- support `prefers-reduced-motion` ;
- **Pratiquer est visuellement un vrai troisième écran/tab**, sans backdrop flouté ni croix de modale ;
- la bottom bar reste visible et `Pratiquer` reste actif pendant cet écran ;
- zones tactiles renforcées sur mobile ;
- smoke Chrome mobile `390×844` qui vérifie `pointerdown`, feedback visuel et géométrie de l’écran Pratiquer.

Validation production :

- PR #24 : SUCCESS ;
- quality `main` #76 : SUCCESS ;
- Options smoke `main` #7 : SUCCESS ;
- nav/mobile interaction smoke `main` #20 : SUCCESS ;
- GitHub Pages #83 : SUCCESS.

Aucun reset et aucune modification du curriculum, de la voix, de Learning Memory, des scénarios ou du branding.

## Navigation apprenante

```text
Aujourd’hui / Pratiquer / Parcours
```

Les trois entrées ont désormais le même statut visuel : ce sont trois destinations principales de l’application.

`Pratiquer` contient :

- Réviser mes acquis ;
- Parler français ;
- Écouter.

Les moteurs internes restent invisibles pour l’utilisatrice.

## Real Life French II

Le socle Build 24 prolonge **Pratiquer → Parler français** avec des scènes qui relient plusieurs acquis déjà appris, sans ajouter de nouveau bouton principal.

Le pack II ajoute 10 situations :

- prendre le train pour retrouver Jerry ;
- shopping avec budget ;
- dîner et exprimer une préférence ;
- se sentir mal dehors ;
- présenter Jerry comme fiancé ;
- être prête puis vouloir rentrer ;
- avoir une réservation et demander de l’aide ;
- problème de clé à l’appartement ;
- problème d’eau chaude ;
- réseau faible pendant un appel avec Jerry.

## UX à grande échelle

Le catalogue Scenario peut grandir sans devenir un mur de cartes :

- situations personnelles ouvertes triées vers les prérequis les plus récents ;
- **6 situations ouvertes maximum visibles par défaut** ;
- bouton `Voir d’autres situations` pour le reste ;
- seulement 2 situations futures verrouillées visibles par défaut ;
- même façade `Aujourd’hui / Pratiquer / Parcours`.

## Progression, voix et branding

Aucun reset. Même clé Scenario :

```text
french-tranquille:scenarios:v1
```

Sanctuaires inchangés :

```text
assets/LOGO.png
assets/Favicon.png
voice-ios.js
free-voice.js
```

## Runtime interaction

Ordre UX final :

```text
ux-shell
→ interaction-ux
→ build-meta
```

`interaction-ux` est uniquement une couche de feedback et de transition. Elle ne possède aucune donnée d’apprentissage.

## Documentation

- [`ROADMAP.md`](./ROADMAP.md)
- [`CHANGELOG.md`](./CHANGELOG.md)
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
- [`docs/BUILD-POLICY.md`](./docs/BUILD-POLICY.md)
- [`docs/BUILD-24-REAL-LIFE-FRENCH-II.md`](./docs/BUILD-24-REAL-LIFE-FRENCH-II.md)
- [`docs/HOTFIX-24.1-OPTIONS-CRASH.md`](./docs/HOTFIX-24.1-OPTIONS-CRASH.md)
- [`docs/HOTFIX-24.2-NAV-INTERACTION.md`](./docs/HOTFIX-24.2-NAV-INTERACTION.md)
- [`docs/HOTFIX-24.3-PREMIUM-INTERACTION.md`](./docs/HOTFIX-24.3-PREMIUM-INTERACTION.md)

Prochain jalon fonctionnel : **v1.18.0 — Build 25 — Real Life French III**.
