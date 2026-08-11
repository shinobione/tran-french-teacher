# French Trân’quille — CHANGELOG

Ce fichier conserve l’historique réellement livré. Les intentions futures vivent dans `ROADMAP.md`.

## [Unreleased]

---

## [1.19.3] — Build 26.3 — Interaction Stability + Progress Layout — 2026-08-11

- corrige les interactions incohérentes observées dans une vidéo terrain sur `Séance du jour` ;
- identifie une compétition DOM entre `daily-coach.js`, `listening-engine.js` et `session-ux.js` : plusieurs `MutationObserver` pouvaient déplacer/recréer les mêmes contrôles ;
- ajoute `build26-3-ux.js` / `build26-3-ux.css` comme couche additive d’orchestration ;
- garde exactement 2 actions Today principales avec des nœuds stables ;
- place les activités secondaires hors de `.daily-steps` pour éviter leur déplacement par Session UX ;
- utilise un proxy Listening caché pour empêcher une réinjection concurrente ;
- remplace le `<summary>` reconstruit de `Voir les autres activités` par un vrai `<button>` stable avec `aria-expanded` ;
- rend le refresh Today strictement idempotent : aucun texte/attribut/état n’est réécrit s’il est déjà correct ;
- route explicitement Review / Lesson / Conversation / Listening sans écrire de donnée apprenante ;
- ajoute un smoke Chrome qui ouvre réellement les autres activités, vérifie la stabilité du même nœud, clique Listening, Review puis la leçon et exige les destinations réelles ;
- optimise `Progrès` desktop selon le layout validé terrain : résumé + curriculum à gauche, `Détails d’apprentissage` à droite ;
- la colonne Details est ouverte par défaut sur desktop, sticky et scrollable indépendamment ;
- conserve sur mobile l’ordre résumé → curriculum compact → Details replié ;
- utilise `display: contents` + CSS Grid : aucun clone ou remplacement des cartes Memory/Mastery/Listening/Scenario ;
- conserve le dashboard Build 26.1 et son progressive disclosure ;
- conserve curriculum **40 leçons / 241 éléments**, Scenario **36 situations / 108 tours**, Listening **0.88 / 0.65** ;
- `voice-ios.js`, `free-voice.js`, logo et favicon restent byte-identiques ;
- aucune migration learner/Memory/Scenario/Listening ;
- PR #44 ; commit runtime production `5947149e9fcb3b387aa01a797607270edb4f100e` ;
- **9 workflows fonctionnels / 9 SUCCESS** sur PR ;
- sur `main`, le nouveau smoke 26.3 a eu un premier passage timing/flaky puis son rerun sur le **même commit** a validé Today + desktop + mobile ; les 9 contrats fonctionnels sont verts ;
- GitHub Pages **#101 SUCCESS**.

---

## [1.19.2] — Build 26.2 — Click + Listening Rate Hotfix — 2026-08-11

- corrige le clic inerte observé en vidéo sur `Parcours → Détails d’apprentissage` ;
- remplace la dépendance au toggle natif implicite de `<details>` par un toggle explicite et déterministe dans `progression-ux.js` ;
- ajoute un smoke Chrome qui clique réellement le `summary` et exige l’ouverture du panneau ;
- corrige la cause réelle du mode Listening `Lent` quasi identique au normal : le bridge demandait `0.64`, mais `voice-ios.js` refuse les rates `< 0.65` et retombait donc sur ~`0.84` ;
- fixe le rate lent effectif à **0.65**, soit le plancher déjà accepté par la couche voix ;
- résultat effectif : **0.88 normal / 0.65 lent** ;
- `voice-ios.js`, `free-voice.js`, logo et favicon restent byte-identiques ;
- aucun changement de voix, pitch ou reconnaissance ;
- aucune migration learner/Memory/Scenario/Listening ;
- rend le smoke Build 26.1 durable vis-à-vis des hotfixes de version globale ;
- aligne Session UX et Listening-rate CI sur le contrat **0.88 / 0.65** ;
- cache `tran-french-teacher-v1.19.2-b26.2-clicks-listening-rate` ;
- PR #42 ; commit production `4d1d224aa4eb6612fe6b0dc997f3871bbb502317` ;
- **8 workflows / 8 SUCCESS** sur PR puis `main` ;
- GitHub Pages **#100 SUCCESS**.

---

## [1.19.1] — Build 26.1 — Voice Self-Playback + Learning Details Dashboard — 2026-08-11

- ajoute `voice-replay.js` / `voice-replay.css` sans modifier `free-voice.js` ni `voice-ios.js` ;
- après une réponse vocale reconnue, propose une **seconde prise locale volontaire** destinée uniquement à l’auto-écoute ;
- utilise `MediaRecorder` / `getUserMedia` si disponibles ;
- aucun upload, aucune persistance, aucun événement pédagogique créé par le replay ;
- Blob URL temporaire révoquée, piste micro arrêtée, capture max 9 secondes ;
- n’essaie pas d’enregistrer simultanément le premier essai reconnu sur iPhone ;
- ajoute `progress-details-dashboard.js` / `progress-details-dashboard.css` ;
- remplace l’empilement de `Détails d’apprentissage` par des familles compactes : Mémoire, Maîtrise, Écoute, Français réel, A1/rythme ;
- une seule famille détaillée est visible à la fois ;
- les cartes historiques restent dans le DOM et continuent à être pilotées par leurs moteurs ;
- une carte future non reconnue tombe dans `Autres détails` ;
- conserve Real Life III : **36 situations / 108 tours** ;
- cache `tran-french-teacher-v1.19.1-b26.1-voice-replay-details-dashboard` ;
- ajoute `Build 26.1 Voice replay + Details dashboard smoke` ;
- aucune migration learner/Memory/Scenario/Listening ;
- voix et branding sanctuarisés ;
- PR #40 ; commit production `8ad7e5eb9cb2f64c58c086847c3e035463ab3ba3` ;
- **8 workflows / 8 SUCCESS** sur PR puis `main` ;
- GitHub Pages **#98 SUCCESS**.

### Gate terrain restant

Le dashboard est livré et validé. La fonction d’auto-écoute est déployée, mais son usage réel `réponse reconnue → seconde prise locale → réécoute → nouvelle reconnaissance` doit encore être confirmé sur **l’iPhone de Trân**. La capture simultanée exacte du premier essai reste hors scope.

---

## [1.19.0] — Build 26 — Real Life French III — 2026-08-11

- ajoute `real-life-data-3.js` : **8 situations / 24 tours** ;
- Scenario production : **36 situations / 108 tours** ;
- introduit du français oral naturel côté interlocuteur ;
- conserve des réponses standard et plusieurs variantes simples explicitement autorisées ;
- ajoute futur proche, passé récent, passé composé, mouvement au passé, administratif, émotion/besoin et couple ;
- ajoute `real-life-coach.js` ;
- chaque référence Memory avancée doit correspondre à exactement un acquis ;
- conserve la limite de 6 situations ouvertes visibles ;
- conserve le contrat Session UX 25.2 : **1 situation = 1 session** ;
- aucune migration learner/Memory/Scenario/Listening ;
- voix et branding sanctuarisés ;
- PR #37 ; commit prod `db8219e44d74f0af13421ec798a0c98d02f7a7b5` ; **8 workflows / 8 SUCCESS** ; Pages **#96 SUCCESS**.

---

## [1.18.2] — Build 25.2 — Session Goals / Milestones / App Delight — 2026-08-11
- objectif → progression → fin → sortie ; Listening 5 questions ; Révision jusqu’à 5 éléments ; Scenario 1 situation ; vocal guidé 5 réponses ; milestones sobres ; PR #35 ; Pages #94 SUCCESS.

## [1.18.1] — Build 25.1 — Listening Slow Calibration — 2026-08-11
- bridge de séparation normal/lent introduit ; calibration finale corrigée en Build 26.2 à **0.88 / 0.65**.

## [1.18.0] — Build 25 — Progression UX / Progressive Disclosure — 2026-08-11
- résumé simple de `Parcours` ; détails repliables ; 5 lignes curriculum visibles par défaut, 40 accessibles ; aucune migration.

## Post-release microfix — Listening speed separation — 2026-08-11
- PR #29 : séparation des demandes Listening, `voice-ios.js` inchangé.

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