# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version en production

- **v1.18.0**
- **Build 25 — Progression UX / Progressive Disclosure**
- statut : **PROD / CLOS**
- baseline fonctionnelle historique : **v1.17.0 — Build 24 — Real Life French II**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **28 situations / 84 tours**
- coût : **0 €**

Build 25 simplifie `Parcours` sans modifier les moteurs pédagogiques ni les données apprenantes. La première vue montre désormais la position actuelle, trois indicateurs simples, la prochaine étape et seulement quelques leçons autour de la position courante. Memory, Mastery, A1 et les autres détails restent accessibles derrière **Détails d’apprentissage**, et les 40 leçons restent disponibles via **Voir les 40 leçons**.

### Preuves de livraison Build 25

PR #31 a passé :

- quality #93 ✅ ;
- Options #24 ✅ ;
- nav/mobile #43 ✅ ;
- Progression UX smoke #1 ✅.

Le commit `main` `4f354221f923004b0cefdaf6b3281e51ba30dbf9` a ensuite repassé :

- quality #94 ✅ ;
- Options #25 ✅ ;
- nav/mobile #44 ✅ ;
- Progression UX smoke #2 ✅ ;
- GitHub Pages #90 ✅.

Le contrat leçon 8 reste intact : l8 actuelle, 7 leçons terminées, 40 acquis ; 5 lignes du parcours visibles par défaut, 40 disponibles à la demande.

## Listening

Microfix PR #29 : `Vitesse normale` et `Lent` sont réellement distincts.

État actuel :

```text
normal = 0.88
lent   = 0.68
```

Retour terrain : **0.68 pourrait encore être un peu plus lent**. Build 25.1 testera d’abord **0.64** sans toucher à `voice-ios.js`.

## Mobile interaction baseline

French Trân’quille doit se comporter comme une application mobile :

- retour visuel immédiat sur toute surface tappable ;
- `tap echo` perceptible même si l’action provoque un rerender ;
- nœuds DOM persistants pour `Aujourd’hui / Pratiquer / Parcours` ;
- exactement un onglet actif ;
- état actif synchronisé explicitement ;
- `Pratiquer` est un vrai troisième écran ;
- header de leçon léger ;
- `prefers-reduced-motion` respecté.

## Freeze terrain

Le freeze du 11/08 est levé pour le développement. La règle reste canonique : pendant une vraie session de Trân, aucun polish runtime/cache sauf crash, perte de données ou blocage critique.

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

## Suite

1. **v1.18.1 — Build 25.1 — Listening Slow Calibration** — PROCHAIN.
2. **v1.18.2 — Build 25.2 — Session Goals / Milestones / App Delight**.
3. **v1.19.0 — Build 26 — Real Life French III**.
4. **v1.20.0 — Build 27 — Data & Recovery Hardening**.
5. **v1.21.0 — Build 28 — iPhone / PWA / Accessibility Hardening**.
6. **v1.22.0 — Build 29 — Architecture Hardening**.
7. **V2.0.0 — Freeze / Release**.

Voir : `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/NEXT-UX-PASS.md`, `docs/BUILD-25-PROGRESSION-UX.md`.