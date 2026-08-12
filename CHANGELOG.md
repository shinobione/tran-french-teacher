# French Trân’quille — CHANGELOG

Ce fichier conserve l’historique réellement livré. Les intentions futures vivent dans `ROADMAP.md`.

## [Unreleased]

### [1.20.0] — Build 27 — App Shell Reset — CANDIDAT PR #60

- abandonne le modèle « dashboard pédagogique comme façade » au profit d’un **app shell mobile-first** ;
- conserve tous les moteurs et données historiques derrière la nouvelle interface ; aucun `app.js`, Memory, Mastery, Listening, Scenario, voix ou asset de branding n’est réécrit ;
- `Aujourd’hui` devient une vraie Home : prochaine leçon dominante, un seul CTA, deux raccourcis Réviser / Écouter ;
- ancien dashboard Home conservé dans le DOM pour les moteurs mais invisible dans l’UX apprenante ;
- `Pratiquer` devient une page dédiée avec quatre intentions : Parler, Écouter, Réviser, Dans la vraie vie ;
- `Dans la vraie vie` réutilise le vrai Scenario Engine et privilégie les situations personnelles Jerry lorsqu’elles sont déjà débloquées ;
- `Progrès` n’expose plus Memory/Mastery/Listening/Error/Scenario comme navigation normale : seulement position A0→A1, prochaine leçon, étape actuelle et 5 leçons utiles ;
- ancien cockpit moteur encore accessible en DEBUG FR comme diagnostic ;
- `Voir tout le parcours` ouvre une vue dédiée avec 5 étapes et une seule étape développée ; A1 Core = 15 leçons ;
- grand desktop agrandit l’app sans la transformer en dashboard SaaS ; mobile 390×844 reste mono-colonne ;
- transitions fade/translate courtes avec `prefers-reduced-motion` ;
- overlays Practice/Journey sont alignés sur la **géométrie réelle** de la tab bar persistante, sans chevauchement mobile ;
- la tab bar conserve ses nœuds historiques, feedback pointer/tap echo et **une seule tab active sémantiquement** ;
- les anciennes URLs `...Smoke` désactivent la façade Build 27 afin que les workflows 26.x continuent à tester leurs vraies surfaces historiques ;
- nouveau tribunal Chrome : `Home → Practice → retour → Progrès → Journey → A1 Core → retour → vraie Leçon`, sur desktop et mobile ;
- Home desktop de certification : **672 px** de haut sur viewport 900 px, une action principale, deux raccourcis, zéro overflow horizontal ;
- captures visuelles CI : Home desktop, Practice desktop, Progress desktop, Journey desktop et Home mobile ; les captures overlay ne sont acceptées qu’après sortie complète de `entering/leaving` ;
- revue visuelle candidat : Journey ne montre plus de ghost de l’écran Progrès ;
- runtime head pré-doc `7c5978cea9d4c1e9bb4b3b0e8ce75a151df3ea2e` : **16/16 workflows SUCCESS** ;
- curriculum **40/241**, Scenario **36/108**, Listening **0.88/0.65** inchangés ;
- `voice-ios.js`, `free-voice.js`, logo et favicon byte-identiques ;
- aucune migration learner/Memory/Scenario/Listening ;
- **pas encore PROD** : le head docs candidat doit repasser le tribunal complet, puis merge exact → `main` → Pages.

---

## [1.19.9] — Build 26.9 — Progress Focus Content Reliability — 2026-08-12

- corrige une régression révélée par la vidéo terrain après Build 26.8 : un Focus pouvait afficher une toolbar correcte mais une vraie carte moteur invisible, ou conserver une carte unique sur seulement la moitié de la surface disponible ;
- conserve `ProgressDetailsDashboard` comme propriétaire de `activeKey` et ne reparent aucune carte moteur ;
- ajoute un contrat de **vrai contenu visible et dimensionné** ;
- famille à carte unique = pleine largeur ; familles multi-cartes = grille efficace ;
- tribunal Chrome multi-familles + mobile ;
- conserve Build 26.6 containment / anti-prolifération **12 → 12**, Build 26.7 geometry et Build 26.8 Focus Flow ;
- conserve curriculum **40/241**, Scenario **36/108**, Listening **0.88/0.65** ;
- PR #58 ; runtime `0b31eedb78daebd58dd9bdcb0a472d56250c8fff` ; **15/15 SUCCESS** après rerun inchangé du seul ancien smoke 26.3 initialement flakey ; Pages #114.

## [1.19.8] — Build 26.8 — Progress Focus Flow — 2026-08-12

- une intention active possède l’écran ; Details/Curriculum Focus avec retour explicite ;
- transitions idempotentes, `prefers-reduced-motion`, round-trip Chrome ;
- PR #56 ; runtime `1084e1d71a7aebbf6d7dcea9dfa0cabb44f6cbe1` ; **14/14 SUCCESS** ; Pages #112.

## [1.19.7] — Build 26.7 — Progress Open-Details Geometry — 2026-08-12

- corrige l’écrasement du learner flow quand Détails est ouvert ;
- desktop large : **452 / 452 px**, desktop compact : pile verticale ;
- PR #54 ; runtime `eaa4b9f8688a90de85a3f853dc29e59d0b8ac650` ; **13/13 SUCCESS** ; Pages #110.

## [1.19.6] — Build 26.6 — Progress Dashboard Containment + Humanized Curriculum — 2026-08-12

- corrige la prolifération de cartes `Autres détails` ; cardinalité **12 → 12** ;
- curriculum en 5 étapes, jamais 40 leçons simultanément ;
- PR #52 ; runtime `7bb48979f21db0cf1cc94d7a9e03e225f2e1cc7a` ; **12/12 SUCCESS** ; Pages #108.

## [1.19.5] — Build 26.5 — Conversation Exit + Layout Repair — 2026-08-12
- répare `Changer de pratique` ; Conversation active = une colonne ; PR #49 ; runtime `2cd29f20faa8db850f92c343074809cc91b42c76` ; Pages #106.

## [1.19.4] — Build 26.4 — Single-scroll Progress + Tyffany — 2026-08-12
- supprime le scroll vertical imbriqué ; branding visible Tyffany sans migration technique ; PR #46 ; runtime `7e74b3727dfefdddb41521a2be92ece8301a32e7` ; Pages #103.

## [1.19.3] — Build 26.3 — Interaction Stability + Progress Layout — 2026-08-11
- stabilise Today/Practice et introduit le layout Progress desktop ; PR #44 ; runtime `5947149e9fcb3b387aa01a797607270edb4f100e` ; Pages #101.

## [1.19.2] — Build 26.2 — Click + Listening Rate Hotfix — 2026-08-11
- clic Détails déterministe ; Listening final **0.88 / 0.65** ; PR #42 ; runtime `4d1d224aa4eb6612fe6b0dc997f3871bbb502317` ; Pages #100.

## [1.19.1] — Build 26.1 — Voice Self-Playback + Learning Details Dashboard — 2026-08-11
- seconde prise locale volontaire pour s’écouter ; dashboard groupé par intentions ; PR #40 ; runtime `8ad7e5eb9cb2f64c58c086847c3e035463ab3ba3` ; Pages #98.

### Gate terrain restant
L’auto-écoute doit encore confirmer sur le vrai iPhone : `réponse reconnue → seconde prise → réécoute → nouvelle reconnaissance`.

## [1.19.0] — Build 26 — Real Life French III — 2026-08-11
- 8 situations / 24 tours ; Scenario production **36 situations / 108 tours** ; PR #37 ; runtime `db8219e44d74f0af13421ec798a0c98d02f7a7b5` ; Pages #96.

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