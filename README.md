# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version candidate en cours

- **v1.18.0**
- **Build 25 — Progression UX / Progressive Disclosure**
- statut : **CANDIDAT / EN COURS**
- baseline fonctionnelle conservée : **v1.17.0 — Build 24 — Real Life French II**
- dernière baseline mobile clôturée : **v1.17.5 — Build 24.5 — Navigation State Sync**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **28 situations / 84 tours**
- coût : **0 €**

## Build 25 — intention

Les retours terrain ont montré que `Parcours` était devenu un écran interminable : les moteurs internes fonctionnent, mais trop de cartes et de compteurs sont exposés en permanence.

Build 25 ne supprime **aucune donnée** et ne remplace **aucun moteur**. Il ajoute une couche `progression-ux` chargée après Memory / Mastery / Scenario / Listening afin de réorganiser leur rendu.

Première vue cible :

```text
Où tu en es
↓
3 indicateurs simples
↓
prochaine étape
↓
quelques leçons autour de la leçon actuelle
```

Les cartes techniques existantes restent disponibles derrière **Détails d’apprentissage**. Le parcours complet reste disponible derrière **Voir les 40 leçons**.

### Contrat candidat

Sur le profil synthétique leçon 8 :

- l8 reste la leçon actuelle ;
- 7 leçons terminées restent 7 ;
- 40 acquis restent 40 ;
- seulement **5 lignes de parcours** sont visibles par défaut ;
- les 40 restent accessibles à la demande ;
- Memory / Mastery et les autres cartes restent dans le DOM et accessibles via un détail repliable ;
- aucun reset / migration ;
- voix, reconnaissance, logo et favicon inchangés.

## Microfix Listening livré avant Build 25

PR #29 / commit `58f64a46bf8b2943a791a1098402e36285e91814` :

- `Vitesse normale` et `Lent` ne sont plus écrasés par la même vitesse globale Lucie ;
- valeurs actuelles : **0.88 / 0.68** ;
- `voice-ios.js` reste sanctuarisé.

Retour terrain : **0.68 pourrait encore être un peu plus lent**. La calibration est gardée pour **Build 25.1**, après A/B iPhone.

## Freeze terrain

Le freeze terrain du 11/08 est **LEVÉ** : Trân a terminé sa session et Build 25 peut passer en développement/CI.

La règle reste canonique : pendant une session réelle, aucun changement runtime sauf crash, perte de données ou blocage critique reproductible.

## Mobile interaction baseline

French Trân’quille doit se comporter comme une application mobile :

- retour visuel immédiat sur toute surface tappable ;
- `tap echo` perceptible même si l’action provoque un rerender ;
- nœuds DOM persistants pour `Aujourd’hui / Pratiquer / Parcours` ;
- exactement un onglet actif ;
- état actif synchronisé explicitement après navigation ;
- `Pratiquer` est un vrai troisième écran ;
- header de leçon transparent/non-sticky ;
- `prefers-reduced-motion` respecté.

Build 25 doit préserver entièrement cette baseline.

## Sanctuaires

Aucun reset et aucune modification opportuniste de :

```text
francais-avec-luc:learner:v1
assets/LOGO.png
assets/Favicon.png
voice-ios.js
free-voice.js
curriculum / Learning Memory / Scenario / Listening state
```

## Suite recalée

1. **Build 25 — Progression UX / Progressive Disclosure** — EN COURS.
2. **Build 25.1 — Listening Slow Calibration** — A/B iPhone, candidat 0.64 puis 0.62 si nécessaire.
3. **Build 25.2 — Session Goals / Milestones / App Delight** — objectif visible, progression, fin claire, succès premium sobre.
4. **Build 26 — Real Life French III** — contenu repoussé derrière le chantier UX.
5. **Build 27 — Data & Recovery Hardening**.
6. **Build 28 — iPhone / PWA / Accessibility Hardening**.
7. **Build 29 — Architecture Hardening**.
8. **V2.0.0 — Freeze / Release**.

Voir aussi : `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/NEXT-UX-PASS.md` et les dossiers Build/Hotfix existants.