# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Candidat actuel

- **v1.17.2**
- **Build 24.2 — Navigation Interaction Hotfix**
- statut : **CANDIDAT / branche `hotfix-nav-clicks`**
- socle fonctionnel : **v1.17.0 Build 24 — Real Life French II**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **28 situations / 84 tours**
- Real Life I + II : **16 situations / 48 tours**
- coût : **0 €**

## Hotfix 24.2

Le correctif vise la barre apprenante :

```text
Aujourd’hui / Pratiquer / Parcours
```

Sur un vrai Chrome desktop, elle pouvait être visible mais ne plus réagir aux clics alors que les smokes propres restaient verts.

Build 24.2 :

- stabilise les nœuds DOM du menu pour éviter les remplacements inutiles ;
- traite les clics de navigation en phase de capture ;
- force un nouvel asset `ux-shell.js?v=1.17.2-b24.2` ;
- aligne l’identité du cache service worker et celle nettoyée par `index.html` ;
- ajoute un smoke Chrome dédié aux clics physiques, y compris page scrollée.

Aucun reset et aucune modification du curriculum, de la voix, de Learning Memory, des scénarios ou du branding.

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

Les prérequis couvrent `l9` → `l20` et réutilisent aussi certains acquis plus anciens.

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

## Runtime Build 24

Ordre Scenario :

```text
scenario-data
→ real-life-data
→ real-life-data-2
→ scenario-host
→ scenario-engine
→ real-life-ux
```

## Documentation

- [`ROADMAP.md`](./ROADMAP.md)
- [`CHANGELOG.md`](./CHANGELOG.md)
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
- [`docs/BUILD-POLICY.md`](./docs/BUILD-POLICY.md)
- [`docs/BUILD-24-REAL-LIFE-FRENCH-II.md`](./docs/BUILD-24-REAL-LIFE-FRENCH-II.md)
- [`docs/HOTFIX-24.1-OPTIONS-CRASH.md`](./docs/HOTFIX-24.1-OPTIONS-CRASH.md)
- [`docs/HOTFIX-24.2-NAV-INTERACTION.md`](./docs/HOTFIX-24.2-NAV-INTERACTION.md)

Build 24.2 ne sera déclaré `PROD / CLOS` qu’après PR, CI complète, merge `main` et GitHub Pages verts.
