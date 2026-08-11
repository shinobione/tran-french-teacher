# French Trân’quille — CHANGELOG

Ce fichier conserve l’historique réellement livré. Les intentions futures vivent dans `ROADMAP.md`.

## [Unreleased]

### v1.18.3 — Build 25.3 — Voice Self-Playback + Learning Details Dashboard — CANDIDAT

- ajoute `voice-replay.js` / `voice-replay.css` sans modifier `free-voice.js` ni `voice-ios.js` ;
- après une réponse vocale reconnue, propose une seconde prise locale destinée uniquement à l’auto-écoute ;
- enregistrement via `MediaRecorder` / `getUserMedia` si disponibles ;
- aucun upload, aucune persistance, aucun `localStorage.setItem` dans la couche replay ;
- Blob URL temporaire révoquée et piste micro arrêtée ;
- capture bornée à 9 secondes ;
- n’essaie pas encore d’enregistrer simultanément le premier essai reconnu sur iPhone ;
- ajoute `progress-details-dashboard.js` / `progress-details-dashboard.css` ;
- remplace l’empilement de `Détails d’apprentissage` par des catégories compactes : Mémoire, Maîtrise, Écoute, Français réel, A1/rythme ;
- une seule catégorie détaillée est visible à la fois ;
- les cartes historiques restent dans le DOM et continuent à être pilotées par leurs moteurs ;
- les cartes non reconnues sont conservées dans `Autres détails` ;
- cache candidat `tran-french-teacher-v1.18.3-b25.3-voice-replay-details-dashboard` ;
- ajoute `Build 25.3 Voice replay + Details dashboard smoke` ;
- aucune migration learner / Memory / Scenario / Listening ;
- branding et voix validée restent sanctuarisés.

Ce bloc reste **Unreleased** jusqu’à PR → anciens workflows + smoke 25.3 → `main` → mêmes workflows → Pages → docs CLOS.

Prochaine étape ensuite : **v1.19.0 — Build 26 — Real Life French III**.

---

## [1.18.2] — Build 25.2 — Session Goals / Milestones / App Delight — 2026-08-11

- ajoute `session-ux.js`, `session-ux-adapter.js`, `session-ux.css` ;
- ajoute un contrat commun `objectif → progression → fin → sortie` ;
- Listening devient une session standard de **5 questions** avec état de fin explicite ;
- Révision mémoire devient un lot borné jusqu’à **5 éléments prioritaires** ;
- Scenario conserve sa fin native mais reçoit un objectif explicite `1 situation` et une sortie vers Aujourd’hui ;
- Vocal guidé reçoit une cible de **5 réponses** sans modification de `free-voice.js` ;
- pratique guidée historique devient une mini-session d’**1 réponse correcte** ;
- la fin de leçon est annoncée et confirmée après enregistrement ;
- `Pratiquer → Parler français` utilise un hub : une recommandation principale, alternatives secondaires, un seul moteur dominant ;
- `Séance du jour` garde 2 actions principales, les autres derrière un détail ;
- nouvelle clé non pédagogique `french-tranquille:milestones:v1` ; les jalons déjà atteints sont marqués comme baseline à la première installation ;
- animations de succès sobres + `prefers-reduced-motion` ;
- conserve Listening **0.88 / 0.64** ;
- cache `tran-french-teacher-v1.18.2-b25.2-session-ux` ;
- ajoute `Build 25.2 Session UX smoke` : Home / Practice / Listening 5/5 / Review bornée ;
- aucune migration learner/Memory/Scenario/Listening ;
- voix et branding sanctuarisés ;
- PR #35 mergée ;
- commit production `49d866bed59bb0cb3268e1675225a4811f6c595f` ;
- 7 workflows `main`, aucun échec ;
- GitHub Pages #94 SUCCESS.

---

## [1.18.1] — Build 25.1 — Listening Slow Calibration — 2026-08-11

- normal effectif **0.88** ; lent effectif **0.64** ;
- bridge `build-meta.js`, `voice-ios.js` inchangé ;
- PR #33 : quality #99 / Options #30 / nav #49 / Progression #7 / Listening-rate #2 SUCCESS ;
- `main` `178c8b71d47887d8f9efd3389aa358d2f3e1a8eb` : quality #100 / Options #31 / nav #50 / Progression #8 / Listening-rate #3 SUCCESS ;
- Pages #92 SUCCESS.

---

## [1.18.0] — Build 25 — Progression UX / Progressive Disclosure — 2026-08-11

- résumé simple de `Parcours` ;
- Memory / Mastery / A1 derrière `Détails d’apprentissage` ;
- 5 lignes curriculum visibles par défaut, 40 accessibles ;
- aucune migration ;
- PR #31 puis `main` : quality / Options / nav / Progression UX / Pages SUCCESS ;
- contrat l8 préservé.

---

## Post-release microfix — Listening speed separation — 2026-08-11
- PR #29 : corrige l’écrasement Normal/Lent ; `0.88 / 0.68`, `voice-ios.js` inchangé.

## [1.17.5] — Build 24.5 — Navigation State Sync — 2026-08-11
- bottom bar persistante, tap echo, état actif déterministe.

## [1.17.3] — Build 24.3 — Premium Interaction UX — 2026-08-11
- feedback premium et Pratiquer comme troisième écran.

## [1.17.2] — Build 24.2 — Navigation Interaction Hotfix — 2026-08-11
- navigation/caches stabilisés.

## [1.17.1] — Build 24.1 — Options Crash Hotfix — 2026-08-11
- boucle MutationObserver Options corrigée.

## [1.17.0] — Build 24 — Real Life French II — 2026-08-11
- 10 situations / 30 tours ; Scenario 28 / 84.

## [1.16.0] — Build 23 — Real Life French I — 2026-08-11
- 6 situations / 18 tours liées à la vraie vie avec Jerry.

## [1.15.0] — Build 22 — UX Foundation & Runtime Integrity — 2026-08-11
- Aujourd’hui / Pratiquer / Parcours ; snapshot ancien utilisateur ; curriculum 40 / 241.

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