# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version actuellement utilisée

- **v1.17.5**
- **Build 24.5 — Navigation State Sync**
- statut : **PROD / CLOS**
- baseline fonctionnelle : **v1.17.0 — Build 24 — Real Life French II**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **28 situations / 84 tours**
- coût : **0 €**

### Microfix post-release Listening — 2026-08-11

PR #29 / commit `58f64a46bf8b2943a791a1098402e36285e91814` :

- `Vitesse normale` et `Lent` ne sont plus écrasés par la même vitesse globale Lucie ;
- valeurs actuellement utilisées par Listening : **0.88 / 0.68** ;
- `voice-ios.js` reste sanctuarisé ;
- quality / Options / nav-mobile / Pages : **SUCCESS**.

Retour terrain : **0.68 est nettement mieux mais pourrait encore être un peu plus lent**. Aucun changement tant que Trân utilise activement l’application. La prochaine calibration sera faite à l’oreille sur iPhone, avec candidat autour de **0.62–0.64**, sans engagement avant test.

## Freeze terrain — actif

Trân utilise actuellement la PWA. Jusqu’à fin de sa session réelle :

- **aucun changement runtime** ;
- **aucun cache/service-worker bump** ;
- **aucun merge sur `main`** pour du polish ;
- seules la documentation et la préparation sur branche sont autorisées ;
- exception : crash, perte de données ou blocage critique reproductible.

La progression existante reste prioritaire sur la vitesse de développement.

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

## Dette UX prioritaire observée sur téléphone

Les captures terrain du 11/08 montrent que **Parcours / Progression est devenu trop long et trop technique**. Le problème n’est plus la bottom bar : c’est la densité d’information derrière `Parcours`.

L’écran expose actuellement trop de couches à la suite : niveau, Memory, Mastery, situations réelles, fondations A1, éléments acquis, moteurs de maîtrise et parcours complet. Tout est utile au moteur ou au debug, mais **tout ne doit pas être visible en permanence par l’apprenante**.

Règle de la prochaine passe :

> **La complexité appartient à Lucie. Trân voit d’abord où elle en est, ce qu’elle a réussi et ce qui vient ensuite. Les détails restent accessibles à la demande.**

Voir `docs/NEXT-UX-PASS.md`.

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

1. **Build 25 — Progression UX / Progressive Disclosure** — priorité suivante après le freeze terrain.
2. **Build 25.1 — Listening Slow Calibration** — seulement après A/B iPhone et hors session active.
3. **Build 26 — Real Life French III** — ancien Build 25, volontairement repoussé derrière le nettoyage UX.
4. Data & Recovery Hardening.
5. iPhone / PWA / Accessibility Hardening.
6. Architecture Hardening.
7. V2.0.0 Freeze / Release.

Voir aussi : `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/NEXT-UX-PASS.md` et les dossiers Build/Hotfix existants.
