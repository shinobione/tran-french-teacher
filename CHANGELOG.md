# French Trân’quille — CHANGELOG

Ce fichier conserve l’historique réellement livré. Les intentions futures vivent dans `ROADMAP.md`.

## [Unreleased]

---

## [1.19.8] — Build 26.8 — Progress Focus Flow — 2026-08-12

- traite le dernier effet « parchemin » observé sur une vidéo terrain de `Parcours` : même après la correction géométrique 26.7, Résumé, Curriculum, tuiles Détails, famille active et cartes moteur restaient tous dans le même document ;
- introduit le principe **une intention active possède l’écran** ;
- clic sur une famille Détails → fade court, learner flow masqué, grille de familles masquée, famille active pleine surface, retour explicite ;
- `Voir tout le parcours` → Résumé + Détails masqués, Curriculum pleine surface, retour explicite vers la vue compacte ;
- grand desktop : shell focalisé jusqu’à 1420 px, cartes Détails en 2 colonnes, cinq étapes Curriculum horizontales et leçons en 2 colonnes ;
- responsive : réduction vers 2 puis 1 colonne ; mobile 390×844 testé sans overflow horizontal ;
- support `prefers-reduced-motion` : même flux fonctionnel sans animation ;
- rend les transitions idempotentes sous les `MutationObserver` historiques ;
- les sorties Focus utilisent les API propriétaires `ProgressDetailsDashboard.close()` et `ProgressionUX.setCurriculumExpanded(false)` plutôt que des faux clics sur des contrôles cachés ;
- découple l’état logique de la fin cosmétique du fade afin qu’une animation ne puisse jamais bloquer une interaction suivante ;
- nouveau tribunal Chrome : Details focus, Curriculum focus, mobile focus et vrai round-trip `compact → Memory → retour → Curriculum → retour → 5 lignes` ;
- desktop 1640×900 : surfaces Focus mesurées **920 px**, aucun overflow horizontal ;
- conserve Build 26.6 containment / anti-prolifération **12 → 12** ;
- conserve Build 26.7 géométrie wide/compact ;
- ne clone ni ne reparent les cartes Memory / Mastery / Listening / Scenario ;
- conserve curriculum **40/241**, Scenario **36/108**, Listening **0.88/0.65** ;
- `voice-ios.js`, `free-voice.js`, logo et favicon restent byte-identiques ;
- aucune migration learner/Memory/Scenario/Listening ;
- PR runtime **#56** ; head certifié `c919262076e80296d38861cb986c9c42a1ded7a8` ; **14/14 workflows fonctionnels SUCCESS** sur PR ;
- commit runtime production `1084e1d71a7aebbf6d7dcea9dfa0cabb44f6cbe1` ; **14/14 workflows fonctionnels SUCCESS** sur `main` ;
- GitHub Pages runtime **#112 SUCCESS**.

---

## [1.19.7] — Build 26.7 — Progress Open-Details Geometry — 2026-08-12

- corrige l’écrasement du learner flow quand `Détails d’apprentissage` est ouvert ;
- desktop large : deux tracks réellement shrinkables, preuve Chrome **452 / 452 px**, ligne de leçon min **410 px** ;
- desktop compact : Details empilé, flow **906 px**, ligne de leçon min **864 px** ;
- overflow horizontal 0 ; containment 26.6 intact ;
- PR #54 ; runtime `eaa4b9f8688a90de85a3f853dc29e59d0b8ac650` ; **13/13 SUCCESS** ; Pages #110 ;
- la présentation d’une famille active est ensuite améliorée par Build 26.8, sans supprimer ce garde-fou géométrique.

## [1.19.6] — Build 26.6 — Progress Dashboard Containment + Humanized Curriculum — 2026-08-12

- corrige la prolifération terrain de cartes `Autres détails` ;
- restaure la frontière DOM historique des moteurs ;
- cardinalité après quiescence **12 → 12**, cartes moteur uniques ;
- `Voir tout le parcours` devient 5 étapes avec une seule tranche ouverte ;
- 40 leçons accessibles mais jamais 40 simultanément ;
- PR #52 ; runtime `7bb48979f21db0cf1cc94d7a9e03e225f2e1cc7a` ; **12/12 SUCCESS** ; Pages #108.

## [1.19.5] — Build 26.5 — Conversation Exit + Layout Repair — 2026-08-12

- répare `Changer de pratique` ; Conversation active = une colonne ; Tyffany/label séparés ;
- PR #49 ; runtime `2cd29f20faa8db850f92c343074809cc91b42c76` ; **11/11 SUCCESS** ; Pages #106.

## [1.19.4] — Build 26.4 — Single-scroll Progress + Tyffany — 2026-08-12

- supprime le scroll vertical imbriqué de Details ;
- nom visible Lucie → Tyffany sans migration technique ;
- PR #46 ; runtime `7e74b3727dfefdddb41521a2be92ece8301a32e7` ; Pages #103.

## [1.19.3] — Build 26.3 — Interaction Stability + Progress Layout — 2026-08-11

- stabilise les contrôles Today/Practice et introduit le layout Progress desktop ;
- PR #44 ; runtime `5947149e9fcb3b387aa01a797607270edb4f100e` ; Pages #101.

## [1.19.2] — Build 26.2 — Click + Listening Rate Hotfix — 2026-08-11

- clic Détails déterministe ; Listening final **0.88 / 0.65** ;
- PR #42 ; runtime `4d1d224aa4eb6612fe6b0dc997f3871bbb502317` ; Pages #100.

## [1.19.1] — Build 26.1 — Voice Self-Playback + Learning Details Dashboard — 2026-08-11

- seconde prise locale volontaire pour s’écouter ; dashboard groupé par intentions ;
- PR #40 ; runtime `8ad7e5eb9cb2f64c58c086847c3e035463ab3ba3` ; Pages #98.

### Gate terrain restant

L’auto-écoute doit encore confirmer sur le vrai iPhone : `réponse reconnue → seconde prise → réécoute → nouvelle reconnaissance`.

## [1.19.0] — Build 26 — Real Life French III — 2026-08-11

- 8 situations / 24 tours ; Scenario production **36 situations / 108 tours** ;
- PR #37 ; runtime `db8219e44d74f0af13421ec798a0c98d02f7a7b5` ; Pages #96.

## [1.18.2] — Build 25.2 — Session Goals / Milestones / App Delight — 2026-08-11
- sessions bornées, progression et fin explicite.

## [1.18.1] — Build 25.1 — Listening Slow Calibration — 2026-08-11
- calibration corrigée ensuite à **0.88 / 0.65**.

## [1.18.0] — Build 25 — Progression UX / Progressive Disclosure — 2026-08-11
- résumé simple de `Parcours` ; 5 lignes par défaut, 40 accessibles.

## [1.17.5] — Build 24.5 — Navigation State Sync — 2026-08-11
- bottom bar persistante, état actif déterministe.

## [1.17.3] — Build 24.3 — Premium Interaction UX — 2026-08-11
- feedback premium et Pratiquer comme troisième écran.

## [1.17.2] — Build 24.2 — Navigation Interaction Hotfix — 2026-08-11
- navigation/caches stabilisés.

## [1.17.1] — Build 24.1 — Options Crash Hotfix — 2026-08-11
- boucle MutationObserver Options corrigée.

## [1.17.0] — Build 24 — Real Life French II — 2026-08-11
- **10 situations / 30 tours ; Scenario 28 situations / 84 tours.**

## [1.16.0] — Build 23 — Real Life French I — 2026-08-11
- 6 situations / 18 tours liées à la vraie vie avec Jerry.

## [1.15.0] — Build 22 — UX Foundation & Runtime Integrity — 2026-08-11
- Aujourd’hui / Pratiquer / Parcours ; snapshot ancien utilisateur ; curriculum 40/241.

## [1.14.0] — Build 21 — Adaptive Language Ratio — 2026-08-11
- VI-HEAVY / VI-SUPPORT / BALANCED / FR-GROWING.

## [1.13.0] — Build 20 — Listening Comprehension — 2026-08-11
- Sens / Contrastes / Mini-dialogues ; transcript caché ; Memory + Error.

## [1.12.0] — Build 19 — A1 Core — 2026-08-11
- leçons 26–40 ; total audité 241 éléments.

## [1.11.0] — Build 18 — Error Intelligence — 2026-08-11
- historique borné ; récence/répétition/récupération.

## [1.10.0] — Build 17 — Scenario Lab — 2026-08-11
- 12 situations / 36 tours.

## [1.9.0] — Build 16 — Mastery Engine — 2026-08-11
- maîtrise fondée sur preuves.

## [1.8.0] — Build 15 — 2026-08-11
- 25 leçons / 148 éléments ; Early A1 ; Daily Coach.

## [1.7.1] — Build 14 / 14.1 — 2026-08-11
- UX Conversation/Révision/Memory ; avatar historique Lucie.

## [1.7.0] — Build 13 — 2026-08-11
- Learning Memory ; révision espacée ; export/import JSON.

## [1.6.1] — Build 12 — 2026-08-11
- Curriculum UX responsive.

## [1.6.0] — Build 11 — 2026-08-11
- 15 leçons / 88 éléments.

## [1.5.0] — Build 10 / 10.1 / 10.2
- responsive ; watchdog ; ES modules ; Chrome headless.

## [1.4.0] — Build 9
- French Trân’quille ; branding/PWA.

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
