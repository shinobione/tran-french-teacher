# French Trân’quille — CHANGELOG

Ce fichier conserve l’historique réellement livré. Les intentions futures vivent dans `ROADMAP.md`.

## [Unreleased]

---

## [1.19.5] — Build 26.5 — Conversation Exit + Layout Repair — 2026-08-12

- corrige le clic mort `Changer de pratique` observé en Conversation : le contrôle pouvait recevoir son feedback visuel sans quitter la pratique guidée ;
- ajoute une transition explicite/synchrone `setPracticeMode()` et un binding direct du contrôle visible ;
- couvre séparément la sortie par `pointerup` tactile/souris et par `click` clavier/souris ;
- supprime le grand vide desktop hérité de l’ancienne grille Build 14 : un seul mode actif utilise désormais une seule colonne de travail centrée ;
- sépare visuellement **Tyffany** du label `Pratique guidée` ;
- répare la composition Progress : Overview + Curriculum vivent dans une colonne gauche indépendante, tandis que `Détails d’apprentissage` devient son frère direct à droite ;
- corrige ainsi le grand trou vertical qui apparaissait dans le parcours gauche lorsqu’un groupe long comme `Maîtrise` était ouvert à droite ;
- conserve la politique Build 26.4 : **aucun nested scroll**, le document reste propriétaire du scroll vertical ;
- conserve sur mobile l’ordre Résumé → Curriculum compact **5/40** → Détails repliés ;
- ajoute `build26-5-ux.css` / `build26-5-ux.js` et le cache `tran-french-teacher-v1.19.5-b26.5-conversation-layout-repair` ;
- ajoute un smoke Chrome Build 26.5 mesurant la vraie géométrie : back + carte active alignés, pointer/click vers hub, gap Overview→Curriculum **0–48 px**, colonnes côte à côte, nested scroll 0, mobile order intact ;
- rend les workflows Session UX, Progression UX, Build 26.3 et Build 26.4 durables : ils protègent leurs comportements historiques sans figer éternellement les query-strings d’un fichier propriétaire ;
- borne le smoke Build 26.1 par profils Chrome isolés, retries et timeouts pour supprimer les runners qui pouvaient rester ouverts indéfiniment ;
- conserve curriculum **40 leçons / 241 éléments**, Scenario **36 situations / 108 tours**, Listening **0.88 / 0.65** ;
- `voice-ios.js`, `free-voice.js`, logo et favicon restent byte-identiques ;
- aucune migration learner/Memory/Scenario/Listening ;
- PR runtime **#49** ; head validé `3f3b1ab80ccfc8142df8e7b9b2288cf4373905d4` ; **11/11 workflows SUCCESS** sur PR ;
- commit runtime production `2cd29f20faa8db850f92c343074809cc91b42c76` ; **11/11 workflows fonctionnels SUCCESS** sur `main` ;
- GitHub Pages runtime **#106 SUCCESS**.

---

## [1.19.4] — Build 26.4 — Single-scroll Progress + Tyffany — 2026-08-12

- conserve le layout Progress 2 colonnes de Build 26.3 mais supprime le deuxième contexte de scroll vertical dans `Détails d’apprentissage` ;
- remplace sur desktop `sticky + max-height viewport + overflow:auto` par `max-height:none` et `overflow:visible` ;
- la page redevient l’unique propriétaire du scroll vertical ;
- mobile reste résumé → curriculum compact → Details replié ;
- ajoute `build26-4-ux.js` comme couche de branding compatible ;
- le nom apprenant **Lucie** devient **Tyffany** dans le DOM rendu, l’export tutor et les paroles synthétiques ;
- les identifiants techniques historiques `LucieVoice`, `luc-*`, `lucie-*` et `francais-avec-luc:learner:v1` sont conservés ;
- `voice-ios.js`, `free-voice.js`, logo et favicon restent byte-identiques ;
- aucune migration learner/Memory/Scenario/Listening ;
- PR #46 ; runtime `7e74b3727dfefdddb41521a2be92ece8301a32e7` ; **10/10 workflows SUCCESS** ; Pages #103 ;
- PR #47 stabilise uniquement le harness Mastery ; commit CI-only `4852e95684ad79d0988e05de641b56a8ad0ede22` ; final `main` 10/10 + Pages #104 ;
- l’implémentation de grille `display:contents` héritée reste historique ; Build 26.5 la supersède ensuite pour rendre les deux colonnes structurellement indépendantes, sans revenir sur le contrat single-scroll.

---

## [1.19.3] — Build 26.3 — Interaction Stability + Progress Layout — 2026-08-11

- corrige les interactions incohérentes de `Séance du jour` causées par une compétition DOM entre Daily Coach, Listening et Session UX ;
- stabilise `Révision mémoire`, `Écouter 3 minutes`, `Voir les autres activités` et `Continuer le parcours` avec de vraies destinations ;
- introduit le layout Progress desktop Résumé+Curriculum à gauche / Details à droite ;
- mobile conserve Résumé → Curriculum compact → Details replié ;
- aucun clone des cartes Memory/Mastery/Listening/Scenario ;
- curriculum **40/241**, Scenario **36/108**, Listening **0.88/0.65** conservés ;
- PR #44 ; runtime `5947149e9fcb3b387aa01a797607270edb4f100e` ; **9/9 workflows SUCCESS** ; Pages #101 ;
- l’intention 2 colonnes reste valide ; l’implémentation `display:contents` est supersédée en Build 26.5.

---

## [1.19.2] — Build 26.2 — Click + Listening Rate Hotfix — 2026-08-11

- corrige le clic `Parcours → Détails d’apprentissage` avec un toggle explicite/déterministe ;
- fixe le mode Lent effectif à **0.65** car `voice-ios.js` refuse les rates `<0.65` ;
- résultat final : **0.88 normal / 0.65 lent** ;
- `voice-ios.js`, `free-voice.js`, logo et favicon byte-identiques ;
- PR #42 ; runtime `4d1d224aa4eb6612fe6b0dc997f3871bbb502317` ; **8/8 SUCCESS** ; Pages #100.

---

## [1.19.1] — Build 26.1 — Voice Self-Playback + Learning Details Dashboard — 2026-08-11

- ajoute une seconde prise locale volontaire après une réponse reconnue pour que Trân puisse s’écouter ;
- aucun upload, aucune persistance, Blob URL temporaire, capture max 9 s ;
- `voice-ios.js` / `free-voice.js` inchangés ;
- ajoute le dashboard groupé Mémoire / Maîtrise / Écoute / Français réel / A1 & rythme / Autres ;
- une seule famille détaillée visible à la fois ;
- PR #40 ; runtime `8ad7e5eb9cb2f64c58c086847c3e035463ab3ba3` ; **8/8 SUCCESS** ; Pages #98.

### Gate terrain restant

Le dashboard est livré. L’auto-écoute doit encore confirmer sur le vrai iPhone : `réponse reconnue → seconde prise → réécoute → nouvelle reconnaissance`.

---

## [1.19.0] — Build 26 — Real Life French III — 2026-08-11

- ajoute **8 situations / 24 tours** ; Scenario production **36 situations / 108 tours** ;
- français oral naturel côté interlocuteur, variantes déterministes, futur proche, passé récent, passé composé, administratif, émotion/besoin/couple ;
- PR #37 ; runtime `db8219e44d74f0af13421ec798a0c98d02f7a7b5` ; **8/8 SUCCESS** ; Pages #96.

---

## [1.18.2] — Build 25.2 — Session Goals / Milestones / App Delight — 2026-08-11
- objectif → progression → fin → sortie ; Listening 5 questions ; Révision jusqu’à 5 éléments ; Scenario 1 situation ; vocal guidé 5 réponses ; PR #35 ; Pages #94.

## [1.18.1] — Build 25.1 — Listening Slow Calibration — 2026-08-11
- bridge de séparation normal/lent ; calibration finale corrigée ensuite à **0.88 / 0.65**.

## [1.18.0] — Build 25 — Progression UX / Progressive Disclosure — 2026-08-11
- résumé simple de `Parcours` ; détails repliables ; 5 lignes curriculum visibles par défaut, 40 accessibles.

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
