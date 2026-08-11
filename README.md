# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version en production

- **v1.16.0**
- **Build 23 — Real Life French I**
- statut : **PROD / GitHub Pages**
- curriculum : **40 leçons / 241 éléments**
- situations Conversation : **18 situations / 54 tours**
- coût : **0 €**

> Build 23 a été validé sur PR, sur le commit mergé de `main`, puis déployé par GitHub Pages. Le smoke « leçon 8 » est resté vert et le nouveau smoke Real Life a confirmé que 5 situations personnelles sont déjà disponibles à ce stade sans modifier la progression.

## Expérience apprenante

Le shell simple de Build 22 reste la façade :

```text
Aujourd’hui
Pratiquer
Parcours
```

Build 23 enrichit **Pratiquer → Parler français** sans créer un nouveau menu.

### Real Life French I

Six situations personnelles ont été ajoutées :

- Jerry parle trop vite ;
- Jerry présente Trân à quelqu’un ;
- prendre un café avec Jerry ;
- parler de ses goûts ;
- faire un petit achat ;
- trouver un lieu avec Jerry.

Les prérequis vont de `l2` à `l8`. Une apprenante arrivée autour de la leçon 8 peut donc déjà utiliser cinq scènes du pack ; la sixième se débloque après la leçon 8.

Dans Conversation, les situations personnelles disponibles remontent en premier, portent un badge discret `Ta vraie vie`, et les situations futures verrouillées sont condensées pour ne pas transformer l’écran en catalogue interminable.

## Pédagogie

Chaque réponse obligatoire repose sur un acquis réellement enseigné avant le scénario : demander de répéter, demander de parler plus lentement, se présenter, commander, parler de ses goûts, demander un prix, demander où se trouve un lieu, etc.

Le moteur historique conserve :

- premier raté → indice ;
- blocage persistant → modèle ;
- voix ou clavier ;
- Learning Memory ;
- statistiques Scenario locales ;
- aucun score phonétique fictif.

## Progression, voix et branding protégés

Aucune nouvelle clé apprenant et aucun reset.

Le pack utilise toujours :

```text
french-tranquille:scenarios:v1
```

Ces fichiers sont restés byte-identiques :

```text
assets/LOGO.png
assets/Favicon.png
voice-ios.js
free-voice.js
```

## Runtime Build 23

Ajouts :

```text
real-life-data.js
real-life-ux.js
real-life-ux.css
```

Ordre Scenario :

```text
scenario-data
→ real-life-data
→ scenario-host
→ scenario-engine
→ real-life-ux
```

Le pack étend le moteur existant au lieu d’en créer un deuxième.

## Preuves de production

- PR #18 : **SUCCESS** ;
- commit `main` : `7f5dd657e5f46a2847c443ffb8f5d0154a89924a` ;
- CI `main` run #63 : **SUCCESS** ;
- GitHub Pages run #77 : **SUCCESS** ;
- smoke leçon 8 zéro-perte : **SUCCESS** ;
- smoke Real Life leçon 8 : **SUCCESS** ;
- Error / Listening / Adaptive Language : **non régressés**.

## Documentation

- [`ROADMAP.md`](./ROADMAP.md)
- [`CHANGELOG.md`](./CHANGELOG.md)
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
- [`docs/BUILD-POLICY.md`](./docs/BUILD-POLICY.md)
- [`docs/BUILD-22-UX-FOUNDATION.md`](./docs/BUILD-22-UX-FOUNDATION.md)
- [`docs/BUILD-23-REAL-LIFE-FRENCH-I.md`](./docs/BUILD-23-REAL-LIFE-FRENCH-I.md)

## Prochain build

**v1.17.0 — Build 24 — Real Life French II** : déplacements, téléphone, repas, proches, logement et conversations un peu plus longues, toujours derrière **Pratiquer**.
