# French Trân’quille — CHANGELOG

Ce fichier conserve l’historique réellement livré. Les intentions futures vivent dans `ROADMAP.md`.

## [Unreleased]

---

## [1.22.1] — Build 29.1 — Speaking Loop Content — 2026-08-12

- intègre l’auto-écoute demandée par Trân directement dans les leçons ;
- sélectionne une phrase orale utile par leçon depuis le curriculum réellement chargé ;
- ajoute un second moment oral après réussite de la situation finale ;
- limite volontairement à **2 moments maximum par leçon** ;
- modèle Tyffany → seconde prise locale volontaire → `Ma voix` → Tyffany → refaire/continuer ;
- couvre **40/40 leçons** sans modifier les **40/241** acquis ;
- aucun score numérique de prononciation ;
- audio local, temporaire, ≤9 s, jamais uploadé ni ajouté aux stores durables ;
- `voice-ios.js`, `free-voice.js`, logo et favicon byte-identiques ;
- nouveau tribunal Chrome : vraie Leçon 1 → contenu → quiz → situation finale → second Speaking Loop, desktop et `390×844` ;
- PR #66 head `df730d60a8434819cb19f116eb0dc66c3718b5f4` : **19/19 workflows fonctionnels SUCCESS** ;
- runtime production `b2fde53792c38d1e6283d8779bbcedfac36f9502` ;
- `main` : **19/19 workflows fonctionnels SUCCESS** ;
- GitHub Pages **#122 SUCCESS** ; total runtime `main` **20/20 SUCCESS Pages incluse** ;
- Build 29 PWA/offline, Build 28 Recovery, Build 27 App Shell et Build 26.1 Voice Replay restent verts ;
- gate terrain exact-premier-essai toujours ouvert : aucune capture automatique parallèle à SpeechRecognition.

---

## [1.22.0] — Build 29 — iPhone / PWA / Accessibility Hardening — 2026-08-12

- durcit l’App Shell Build 27 pour l’usage iPhone/PWA réel ;
- `viewport-fit=cover`, safe areas, cibles tactiles ≥44 px, focus visible, `aria-current`, progressbar/live regions ;
- `VisualViewport`, standalone, petits/grands écrans, paysage, reduced-motion, contraste ;
- manifest/install/offline durcis ; matrice Chrome **320×568 / 390×844 / 430×932** ;
- vrai boot offline après chauffe Service Worker ;
- PR #64, runtime `1c01648d89dfb3bd9236b9ad93fbade4e21102fa`, Pages #120 ;
- PR #65 expérimentale **fermée sans merge** ;
- curriculum **40/241**, Scenario **36/108**, Listening **0.88/0.65** inchangés.

---

## [1.21.0] — Build 28 — Data & Recovery Hardening — 2026-08-12
- Recovery Engine avant `app.js`, backup V2 six stores, restore transactionnel, rollback, migration V1 sûre, quarantaine, last-good et snapshots ;
- PR #62, runtime `ed09159a6246fe3c1892cb0ff8d03a4beffb7428`, Pages #118.

## [1.20.0] — Build 27 — App Shell Reset — 2026-08-12
- façade mobile-first Aujourd’hui / Pratiquer / Progrès ; cockpit historique en DEBUG FR ; PR #60 ; runtime `beeb9ce8ba081ed0298edbcc339dca41600e4d09` ; Pages #116.

## [1.19.9] — Build 26.9 — Progress Focus Content Reliability — 2026-08-12
- vrai contenu moteur visible/dimensionné en Focus ; PR #58 ; runtime `0b31eedb78daebd58dd9bdcb0a472d56250c8fff` ; Pages #114.

## [1.19.8] — Build 26.8 — Progress Focus Flow — 2026-08-12
- une intention active possède l’écran ; PR #56 ; runtime `1084e1d71a7aebbf6d7dcea9dfa0cabb44f6cbe1` ; Pages #112.

## [1.19.7] — Build 26.7 — Progress Open-Details Geometry — 2026-08-12
- corrige l’écrasement du learner flow ; PR #54 ; runtime `eaa4b9f8688a90de85a3f853dc29e59d0b8ac650` ; Pages #110.

## [1.19.6] — Build 26.6 — Progress Dashboard Containment + Humanized Curriculum — 2026-08-12
- cardinalité **12 → 12** ; curriculum en 5 étapes ; PR #52 ; runtime `7bb48979f21db0cf1cc94d7a9e03e225f2e1cc7a` ; Pages #108.

## [1.19.5] — Build 26.5 — Conversation Exit + Layout Repair — 2026-08-12
- répare `Changer de pratique` ; PR #49 ; runtime `2cd29f20faa8db850f92c343074809cc91b42c76` ; Pages #106.

## [1.19.4] — Build 26.4 — Single-scroll Progress + Tyffany — 2026-08-12
- single-scroll et branding visible Tyffany ; PR #46 ; runtime `7e74b3727dfefdddb41521a2be92ece8301a32e7` ; Pages #103.

## [1.19.3] — Build 26.3 — Interaction Stability + Progress Layout — 2026-08-11
- stabilise Today/Practice et layout Progress ; PR #44 ; runtime `5947149e9fcb3b387aa01a797607270edb4f100e` ; Pages #101.

## [1.19.2] — Build 26.2 — Click + Listening Rate Hotfix — 2026-08-11
- clic Détails déterministe ; Listening final **0.88 / 0.65** ; PR #42 ; runtime `4d1d224aa4eb6612fe6b0dc997f3871bbb502317` ; Pages #100.

## [1.19.1] — Build 26.1 — Voice Self-Playback + Learning Details Dashboard — 2026-08-11
- seconde prise locale volontaire pour s’écouter ; PR #40 ; runtime `8ad7e5eb9cb2f64c58c086847c3e035463ab3ba3` ; Pages #98.

### Gate terrain restant
`réponse reconnue → seconde prise → réécoute → nouvelle reconnaissance` sur le vrai iPhone.

## [1.19.0] — Build 26 — Real Life French III — 2026-08-11
- Scenario production **36 situations / 108 tours** ; PR #37 ; Pages #96.

## [1.18.2] — Build 25.2 — Session Goals / Milestones / App Delight — 2026-08-11
- sessions bornées, progression et fin explicite.

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
- runtime historique : `real-life-data-2.js`.

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

## [1.0.x] — Builds 1–14
- fondations PWA, DEBUG FR, voix iPhone-first, Free Voice, branding, curriculum, Learning Memory et UX initiale.