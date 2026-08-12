# French Trân’quille — CHANGELOG

Ce fichier conserve l’historique réellement livré. Les intentions futures vivent dans `ROADMAP.md`.

## [Unreleased]

---

## [1.19.6] — Build 26.6 — Progress Dashboard Containment + Humanized Curriculum — 2026-08-12

- corrige une régression terrain active de `Parcours` où `Autres détails` pouvait augmenter continuellement sans interaction jusqu’à plusieurs centaines de cartes ;
- cause confirmée : Build 26.5 avait déplacé `Détails d’apprentissage` hors de la première colonne historique utilisée par Memory/Mastery/Stage comme frontière de propriété ; les moteurs ne retrouvaient plus leur propre carte et la recréaient à chaque passage `MutationObserver` ;
- restaure cette frontière DOM sans revenir au mauvais layout : Overview + Curriculum vivent dans `progress-ux-left-flow`, tandis que `Détails` reste descendant du même ancêtre mais est rendu visuellement à droite par une grille imbriquée ;
- conserve le contrat Build 26.4 : aucun scroll vertical imbriqué, document propriétaire du scroll ;
- ajoute une appartenance stable `data-progress-detail-family` aux cartes du dashboard ;
- interdit explicitement Overview/Curriculum dans `Détails` et classe `Éléments appris` dans Mémoire ;
- ajoute un smoke temporel qui attend la quiescence puis exige une cardinalité strictement stable : profil synthétique l8 **12 cartes → 12 cartes**, `Autres détails = 1`, cartes moteur principales uniques, cartes interdites = 0 ;
- humanise `Voir tout le parcours` : les 40 leçons restent accessibles mais sont réparties en 5 étapes, une seule étape affichée à la fois ;
- étapes : Survie A0 1–7, Vie quotidienne 8–15, Fondations A1 16–20, Premiers échanges 21–25, A1 Core 26–40 ;
- à l8, le parcours complet affiche 8 leçons de l’étape courante ; A1 Core en affiche 15 ; jamais 40 simultanément ;
- couvre par vrais clics Chrome `Voir tout le parcours` puis `A1 Core` ;
- rend la recomposition de ces disclosures déterministe dans le même geste utilisateur ;
- rend les contrats Build 25 / 26.1 / 26.5 version-forward là où leur implémentation propriétaire évolue ;
- conserve Conversation Exit Build 26.5, Tyffany, mobile compact, curriculum **40/241**, Scenario **36/108**, Listening **0.88/0.65** ;
- `voice-ios.js`, `free-voice.js`, logo et favicon restent byte-identiques ;
- aucune migration learner/Memory/Scenario/Listening ;
- PR runtime **#52** ; head validé `b43eca2cb06c0272e13b1794dfecf26d7abec322` ; **12/12 workflows fonctionnels SUCCESS** sur PR ;
- commit runtime production `7bb48979f21db0cf1cc94d7a9e03e225f2e1cc7a` ; **12/12 workflows fonctionnels SUCCESS** sur `main` ;
- GitHub Pages runtime **#108 SUCCESS**.

---

## [1.19.5] — Build 26.5 — Conversation Exit + Layout Repair — 2026-08-12

- corrige le clic mort `Changer de pratique` observé en Conversation ;
- ajoute une transition explicite/synchrone `setPracticeMode()` et couvre pointer/tactile + click/clavier ;
- un seul mode actif utilise une seule colonne centrée ;
- sépare visuellement **Tyffany** du label `Pratique guidée` ;
- répare le canyon vertical Progress en séparant visuellement Overview/Curriculum de Details ;
- conserve single-scroll et mobile 5/40 ;
- PR #49 ; runtime `2cd29f20faa8db850f92c343074809cc91b42c76` ; **11/11 SUCCESS** ; Pages #106 ;
- la structure DOM `Details` comme frère direct de la première colonne est **supersédée par Build 26.6** car elle cassait la frontière de propriété des moteurs ; l’intention visuelle 2 colonnes reste conservée.

---

## [1.19.4] — Build 26.4 — Single-scroll Progress + Tyffany — 2026-08-12

- supprime le deuxième contexte de scroll vertical dans `Détails d’apprentissage` ;
- la page redevient l’unique propriétaire du scroll ;
- mobile reste résumé → curriculum compact → Details replié ;
- nom visible Lucie → **Tyffany** sans migration technique ;
- `voice-ios.js`, `free-voice.js`, logo, favicon et identifiants historiques inchangés ;
- PR #46 ; runtime `7e74b3727dfefdddb41521a2be92ece8301a32e7` ; Pages #103 ; PR #47 stabilisation CI-only ; final Pages #104.

## [1.19.3] — Build 26.3 — Interaction Stability + Progress Layout — 2026-08-11

- stabilise `Révision mémoire`, `Écouter 3 minutes`, `Voir les autres activités` et `Continuer le parcours` ;
- introduit le layout Progress desktop 2 colonnes ;
- mobile compact conservé ;
- PR #44 ; runtime `5947149e9fcb3b387aa01a797607270edb4f100e` ; Pages #101.

## [1.19.2] — Build 26.2 — Click + Listening Rate Hotfix — 2026-08-11

- clic `Détails d’apprentissage` déterministe ;
- Listening final **0.88 normal / 0.65 lent** ;
- PR #42 ; runtime `4d1d224aa4eb6612fe6b0dc997f3871bbb502317` ; Pages #100.

## [1.19.1] — Build 26.1 — Voice Self-Playback + Learning Details Dashboard — 2026-08-11

- seconde prise locale volontaire pour s’écouter ; aucun upload ni persistance ;
- dashboard groupé Mémoire / Maîtrise / Écoute / Français réel / A1 & rythme / Autres ;
- PR #40 ; runtime `8ad7e5eb9cb2f64c58c086847c3e035463ab3ba3` ; Pages #98.

### Gate terrain restant

L’auto-écoute doit encore confirmer sur le vrai iPhone : `réponse reconnue → seconde prise → réécoute → nouvelle reconnaissance`.

## [1.19.0] — Build 26 — Real Life French III — 2026-08-11

- **8 situations / 24 tours** ; Scenario production **36 situations / 108 tours** ;
- français oral naturel, variantes déterministes et structures A1 utiles ;
- PR #37 ; runtime `db8219e44d74f0af13421ec798a0c98d02f7a7b5` ; Pages #96.

## [1.18.2] — Build 25.2 — Session Goals / Milestones / App Delight — 2026-08-11
- objectif → progression → fin → sortie ; sessions bornées.

## [1.18.1] — Build 25.1 — Listening Slow Calibration — 2026-08-11
- calibration finale corrigée ensuite à **0.88 / 0.65**.

## [1.18.0] — Build 25 — Progression UX / Progressive Disclosure — 2026-08-11
- résumé simple de `Parcours` ; 5 lignes curriculum par défaut, 40 accessibles.

## [1.17.5] — Build 24.5 — Navigation State Sync — 2026-08-11
- bottom bar persistante, tap echo, état actif déterministe.

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
- Aujourd’hui / Pratiquer / Parcours ; snapshot ancien utilisateur ; curriculum **40 leçons / 241 éléments**.

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
- maîtrise fondée sur preuves ; gouvernance docs/CI.

## [1.8.0] — Build 15 — 2026-08-11
- 25 leçons / 148 éléments ; Early A1 ; Daily Coach.

## [1.7.1] — Build 14 / 14.1 — 2026-08-11
- UX Conversation/Révision/Memory ; avatar Lucie, nom produit renommé Tyffany en Build 26.4.

## [1.7.0] — Build 13 — 2026-08-11
- Learning Memory ; révision espacée ; export/import JSON.

## [1.6.1] — Build 12 — 2026-08-11
- Curriculum UX responsive.

## [1.6.0] — Build 11 — 2026-08-11
- 15 leçons / 88 éléments.

## [1.5.0] — Build 10 / 10.1 / 10.2
- responsive ; watchdog ; ES modules ; Chrome headless.

## [1.4.0] — Build 9
- French Trân’quille ; Lucie comme nom initial ; logo/favicon/PWA.

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
