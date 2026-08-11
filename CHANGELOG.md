# French Trân’quille — CHANGELOG

Ce fichier conserve l’historique réellement livré. Les intentions futures vivent dans `ROADMAP.md`.

## [Unreleased]

### v1.18.1 — Build 25.1 — Listening Slow Calibration — CANDIDAT

- vitesse normale effective conservée à **0.88** ;
- slow historique demandé par Listening = **0.68** ;
- calibration effective candidate = **0.64** ;
- calibration portée uniquement par le bridge `build-meta.js` ;
- `voice-ios.js`, pitch, voix choisie et vitesse Lucie persistée inchangés ;
- expose `FrenchTranquilleListeningRates` + `data-listening-*-rate` ;
- cache candidat `tran-french-teacher-v1.18.1-b25.1-listening-slow` ;
- nouveau workflow `Build 25.1 Listening rate smoke` ;
- `0.62` reste reporté au prochain retour terrain si 0.64 est encore trop rapide.

Ce bloc reste Unreleased jusqu’à PR → CI → `main` → Pages.

Prochain gros jalon : **Build 25.2 — Session Goals / Milestones / App Delight**.

---

## [1.18.0] — Build 25 — Progression UX / Progressive Disclosure — 2026-08-11

- ajoute `progression-ux.js` et `progression-ux.css` ;
- résumé simple de `Parcours` ;
- Memory / Mastery / A1 derrière `Détails d’apprentissage` ;
- 5 lignes de curriculum visibles par défaut, 40 accessibles à la demande ;
- aucune migration ;
- PR #31 : quality #93 / Options #24 / nav #43 / Progression #1 SUCCESS ;
- `main` `4f354221f923004b0cefdaf6b3281e51ba30dbf9` : quality #94 / Options #25 / nav #44 / Progression #2 SUCCESS ;
- Pages #90 SUCCESS ;
- contrat l8 : 7 terminées / 40 acquis préservé.

---

## Post-release microfix — Listening speed separation — 2026-08-11

PR #29 / commit `58f64a46bf8b2943a791a1098402e36285e91814` :

- corrige l’écrasement des vitesses explicites Listening ;
- `normal = 0.88`, `lent = 0.68` ;
- `voice-ios.js` non modifié ;
- quality / Options / nav / Pages SUCCESS.

---

## [1.17.5] — Build 24.5 — Navigation State Sync — 2026-08-11
- stabilisation définitive de la bottom bar après Build 24.4 ; nœuds persistants, tap echo, état actif déterministe ; quality / Options / nav / Pages SUCCESS.

## [1.17.3] — Build 24.3 — Premium Interaction UX — 2026-08-11
- feedback interaction premium et Pratiquer comme vrai troisième écran.

## [1.17.2] — Build 24.2 — Navigation Interaction Hotfix — 2026-08-11
- navigation visible mais inerte corrigée ; cache réaligné ; smoke clic physique.

## [1.17.1] — Build 24.1 — Options Crash Hotfix — 2026-08-11
- boucle MutationObserver du diagnostic Options corrigée ; smoke dédié.

## [1.17.0] — Build 24 — Real Life French II — 2026-08-11
- 10 situations / 30 tours ; Scenario 28 / 84 ; catalogue ouvert plafonné visuellement.

## [1.16.0] — Build 23 — Real Life French I — 2026-08-11
- 6 situations / 18 tours liées à la vraie vie avec Jerry.

## [1.15.0] — Build 22 — UX Foundation & Runtime Integrity — 2026-08-11
- Aujourd’hui / Pratiquer / Parcours ; snapshot ancien utilisateur ; curriculum audité 40 / 241.

## [1.14.0] — Build 21 — Adaptive Language Ratio — 2026-08-11
- VI-HEAVY / VI-SUPPORT / BALANCED / FR-GROWING.

## [1.13.0] — Build 20 — Listening Comprehension — 2026-08-11
- Sens / Contrastes / Mini-dialogues ; transcript caché ; Memory + Error.

## [1.12.0] — Build 19 — A1 Core — 2026-08-11
- leçons 26–40 ; A1 Core ; total ensuite audité à 241 éléments.

## [1.11.0] — Build 18 — Error Intelligence — 2026-08-11
- historique borné ; récence/répétition/récupération.

## [1.10.0] — Build 17 — Scenario Lab — 2026-08-11
- 12 situations / 36 tours.

## [1.9.0] — Build 16 — Mastery Engine — 2026-08-11
- maîtrise fondée sur preuves ; gouvernance docs/CI.

## [1.8.0] — Build 15 — 2026-08-11
- 25 leçons / 148 éléments ; Early A1 ; Daily Coach.

## [1.7.1] — Build 14 / 14.1 — 2026-08-11
- UX Conversation/Révision/Memory ; avatar Lucie.

## [1.7.0] — Build 13 — 2026-08-11
- Learning Memory ; révision espacée ; export/import JSON.

## [1.6.1] — Build 12 — 2026-08-11
- Curriculum UX responsive.

## [1.6.0] — Build 11 — 2026-08-11
- 15 leçons / 88 éléments.

## [1.5.0] — Build 10 / 10.1 / 10.2
- responsive ; watchdog ; ES modules ; Chrome headless.

## [1.4.0] — Build 9
- French Trân’quille ; Lucie ; logo/favicon/PWA.

## [1.3.0] — Build 8
- Guided Free Voice.

## [1.2.0] — Build 7
- Free Voice gratuit.

## [1.1.x] — Builds 5–6
- expérimentation payante abandonnée ; retour architecture 0 €.

## [1.0.3] — Build 4
- voix iPhone-first.

## [1.0.2] — Build 3
- DEBUG FR.

## [1.0.1] — Build 2
- anti-traduction automatique.

## [1.0.0] — Build 1
- première PWA / leçon / progression / offline / GitHub Pages.