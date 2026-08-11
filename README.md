# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Candidat actuel

- **v1.16.0**
- **Build 23 — Real Life French I**
- statut : **CANDIDAT / branche `build23-real-life-french-1`**
- socle production : **v1.15.0 Build 22**
- curriculum : **40 leçons / 241 éléments**
- coût : **0 €**

## Intention

Build 23 ne crée aucun nouveau bouton principal. Il enrichit **Pratiquer → Parler français** avec des situations qui ressemblent à la vraie vie de Trân.

Pack I : **6 situations / 18 tours** ajoutés au moteur Scenario existant :

- Jerry parle trop vite ;
- Jerry présente Trân à quelqu’un ;
- prendre un café avec Jerry ;
- parler de ses goûts avec Jerry ;
- faire un petit achat ;
- trouver un lieu avec Jerry.

Les prérequis vont uniquement des leçons **2 à 8**. Un profil autour de la leçon 8 peut donc déjà utiliser la majorité du pack.

## UX

Le shell Build 22 reste inchangé :

```text
Aujourd’hui
Pratiquer
Parcours
```

Dans Conversation :

- situations personnelles disponibles remontées en premier ;
- badge discret `♡ Cuộc sống của bạn / Ta vraie vie` ;
- seulement deux situations futures verrouillées affichées par défaut ;
- les autres restent derrière `Voir les situations futures` ;
- le titre technique `Scenario Lab` est remplacé côté apprenante par **Parler en situation**.

## Pédagogie

Chaque réponse obligatoire correspond à des acquis déjà présents : `Je ne comprends pas`, `Pouvez-vous répéter ?`, `Je voudrais…`, goûts, nombres/prix, `Où est… ?`, gauche/droite, etc.

Le moteur historique conserve :

- premier raté → indice ;
- deuxième raté → modèle ;
- voix ou clavier ;
- Memory `scenario-success / miss / assisted` ;
- statistiques locales ;
- aucun score phonétique fictif.

## Progression, voix et branding

Aucune nouvelle clé apprenant. Aucun reset.

Build 23 ne modifie pas :

```text
assets/LOGO.png
assets/Favicon.png
voice-ios.js
free-voice.js
```

Le smoke « leçon 8 » de Build 22 reste obligatoire en CI.

## Runtime Build 23

Nouveaux fichiers :

```text
real-life-data.js
real-life-ux.js
real-life-ux.css
```

Chargement :

```text
scenario-data
→ real-life-data
→ scenario-host
→ scenario-engine
→ real-life-ux
```

Le pack étend la même clé Scenario existante :

```text
french-tranquille:scenarios:v1
```

Les statistiques déjà enregistrées restent compatibles.

## Documentation

- [`ROADMAP.md`](./ROADMAP.md)
- [`CHANGELOG.md`](./CHANGELOG.md)
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
- [`docs/BUILD-POLICY.md`](./docs/BUILD-POLICY.md)
- [`docs/BUILD-22-UX-FOUNDATION.md`](./docs/BUILD-22-UX-FOUNDATION.md)
- [`docs/BUILD-23-REAL-LIFE-FRENCH-I.md`](./docs/BUILD-23-REAL-LIFE-FRENCH-I.md)

Build 23 ne sera déclaré `PROD / CLOS` qu’après PR, CI `main` et GitHub Pages vertes.
