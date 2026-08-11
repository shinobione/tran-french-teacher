# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Candidat actuel

- **v1.17.0**
- **Build 24 — Real Life French II**
- statut : **CANDIDAT / branche `build24-real-life-french-2`**
- socle production : **v1.16.0 Build 23**
- curriculum : **40 leçons / 241 éléments**
- Scenario candidat : **28 situations / 84 tours**
- Real Life I + II : **16 situations / 48 tours**
- coût : **0 €**

## Intention

Build 24 prolonge **Pratiquer → Parler français** avec des scènes qui relient plusieurs acquis déjà appris, sans ajouter de nouveau bouton principal.

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

Build 24 ne crée donc aucune nouvelle destination de navigation.

## Profils de contrôle

### Leçon 8

Le smoke historique reste obligatoire : aucune perte de progression et pack I inchangé.

### Leçon 15

Attendu :

- 5 situations du pack II ouvertes ;
- catalogue visuel limité à 6 propositions ;
- les autres situations ouvertes restent accessibles sur demande.

### Leçon 20

Attendu :

- les 10 situations du pack II ouvertes ;
- toujours 6 propositions visibles par défaut ;
- aucun changement du stockage apprenant ou Scenario.

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

Nouveau module :

```text
real-life-data-2.js
```

Ordre Scenario :

```text
scenario-data
→ real-life-data
→ real-life-data-2
→ scenario-host
→ scenario-engine
→ real-life-ux
```

`real-life-ux.js` reste la façade commune aux packs I et II.

## Documentation

- [`ROADMAP.md`](./ROADMAP.md)
- [`CHANGELOG.md`](./CHANGELOG.md)
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
- [`docs/BUILD-POLICY.md`](./docs/BUILD-POLICY.md)
- [`docs/BUILD-24-REAL-LIFE-FRENCH-II.md`](./docs/BUILD-24-REAL-LIFE-FRENCH-II.md)

Build 24 ne sera déclaré `PROD / CLOS` qu’après PR, `main` et GitHub Pages verts.
