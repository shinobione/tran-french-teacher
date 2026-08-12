# French Trân’quille — CHANGELOG

Ce fichier conserve l’historique réellement livré. Les intentions futures vivent dans `ROADMAP.md`.

## [Unreleased]

### v1.22.1 — Build 29.1 — Speaking Loop Content — CANDIDAT

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
- Build 29 PWA/offline et Build 28 Recovery restent des gates de merge ;
- PR #66 en cours ; aucune production déclarée avant merge + `main` + Pages.

---

## [1.22.0] — Build 29 — iPhone / PWA / Accessibility Hardening — 2026-08-12

- durcit l’App Shell Build 27 pour l’usage iPhone/PWA réel ;
- `viewport-fit=cover` et safe areas ;
- cibles tactiles coarse-pointer ≥44 px ;
- focus clavier visible, `aria-current`, progressbar et live regions ;
- gestion `VisualViewport` pour clavier iOS ;
- standalone/PWA détecté ;
- audit petits/grands écrans et paysage compact ;
- textes longs sans overflow horizontal ;
- `prefers-reduced-motion` et contraste renforcé ;
- manifest/install/offline durcis ;
- matrice Chrome **320×568 / 390×844 / 430×932** ;
- vrai boot offline après chauffe Service Worker ;
- PR runtime **#64**, head `27c67ee7b47b9f9a015e6c0072640e0e573de52d` ;
- runtime production `1c01648d89dfb3bd9236b9ad93fbade4e21102fa` ;
- `main` : **19/19 SUCCESS** après rerun inchangé du seul ancien contrôle Build 27 visuel ;
- GitHub Pages **#120 SUCCESS** ;
- PR #65 d’isolation SW des anciens smokes explorée puis **fermée sans merge** car elle ne résolvait pas le flake visuel ;
- curriculum **40/241**, Scenario **36/108**, Listening **0.88/0.65** inchangés ;
- Recovery Build 28, App Shell Build 27, voix, learner, logo et favicon conservés.

---

## [1.21.0] — Build 28 — Data & Recovery Hardening — 2026-08-12

- ajoute un Recovery Engine chargé **avant `app.js`** afin qu’une donnée corrompue ne soit pas silencieusement remplacée par une progression neuve ;
- introduit le format de sauvegarde `french-tranquille-backup` **version 2** ;
- le coffre V2 couvre six stores durables : learner, Learning Memory, Error Intelligence, Scenario, Listening et Milestones ;
- les réglages voix dépendants de l’appareil restent volontairement hors backup portable ;
- validation de schéma avant export et import ;
- snapshots automatiques `last-good`, `pre-restore`, `pre-migration`, `pre-reset` ;
- conserve `french-tranquille:safety:pre-build22:v1` comme fallback historique ;
- JSON ou schéma invalide au boot → quarantaine puis restauration depuis un fallback valide lorsqu’il existe ;
- écriture invalide sur un store critique bloquée avant d’écraser la dernière valeur saine ;
- restauration multi-store transactionnelle avec relecture, vérification exacte et rollback automatique ;
- migration backup V1 → V2 : restaure learner + Memory mais **préserve** Error / Scenario / Listening / Milestones que le vieux format ne connaissait pas ;
- reset learner rendu cohérent : snapshot pré-reset puis suppression des six stores durables ensemble ;
- nouveau tribunal Node : backup complet, round-trip exact, panne simulée en plein restore, rollback exact, invalid JSON/schema, migration V1 sûre ;
- nouveau tribunal Chrome : écriture corrompue bloquée, quarantaine, backup/restore réel, reset/récupération, ancien profil **7 leçons + `l8=4`**, corruption injectée avant `app.js` puis réparée depuis `last-good` ;
- Home Build 27 mobile `390×844` revalidée ;
- PR #62 head final `dc060ea5304b0526010bd8ac158b70c363525325` : **17/17 workflows SUCCESS** ;
- runtime production `ed09159a6246fe3c1892cb0ff8d03a4beffb7428` ;
- GitHub Pages **#118 SUCCESS** ;
- curriculum **40/241**, Scenario **36/108**, Listening **0.88/0.65** inchangés.

---

## [1.20.0] — Build 27 — App Shell Reset — 2026-08-12

- abandonne le modèle « dashboard pédagogique comme façade » au profit d’un **app shell mobile-first** ;
- conserve les moteurs et données historiques derrière la nouvelle interface ;
- `Aujourd’hui` : prochaine leçon dominante, un CTA, Réviser / Écouter ;
- `Pratiquer` : Parler, Écouter, Réviser, Dans la vraie vie ;
- `Progrès` : progression humaine, prochaine leçon, 5 leçons utiles ;
- cockpit moteur historique conservé en DEBUG FR ;
- parcours complet en 5 étapes, une seule développée ;
- tab bar persistante, une seule tab active ;
- PR #60 ; runtime `beeb9ce8ba081ed0298edbcc339dca41600e4d09` ; Pages #116 ;
- curriculum **40/241**, Scenario **36/108**, Listening **0.88/0.65** inchangés.

---

## [1.19.9] — Build 26.9 — Progress Focus Content Reliability — 2026-08-12
- vrai contenu moteur visible/dimensionné en Focus ; PR #58 ; runtime `0b31eedb78daebd58dd9bdcb0a472d56250c8fff` ; Pages #114.

## [1.19.8] — Build 26.8 — Progress Focus Flow — 2026-08-12
- une intention active possède l’écran ; Details/Curriculum Focus avec retour explicite ; PR #56 ; runtime `1084e1d71a7aebbf6d7dcea9dfa0cabb44f6cbe1` ; Pages #112.

## [1.19.7] — Build 26.7 — Progress Open-Details Geometry — 2026-08-12
- corrige l’écrasement du learner flow quand Détails est ouvert ; PR #54 ; runtime `eaa4b9f8688a90de85a3f853dc29e59d0b8ac650` ; Pages #110.

## [1.19.6] — Build 26.6 — Progress Dashboard Containment + Humanized Curriculum — 2026-08-12
- corrige la prolifération de cartes ; cardinalité **12 → 12** ; curriculum en 5 étapes ; PR #52 ; runtime `7bb48979f21db0cf1cc94d7a9e03e225f2e1cc7a` ; Pages #108.

## [1.19.5] — Build 26.5 — Conversation Exit + Layout Repair — 2026-08-12
- répare `Changer de pratique` ; PR #49 ; runtime `2cd29f20faa8db850f92c343074809cc91b42c76` ; Pages #106.

## [1.19.4] — Build 26.4 — Single-scroll Progress + Tyffany — 2026-08-12
- single-scroll et branding visible Tyffany sans migration technique ; PR #46 ; runtime `7e74b3727dfefdddb41521a2be92ece8301a32e7` ; Pages #103.

## [1.19.3] — Build 26.3 — Interaction Stability + Progress Layout — 2026-08-11
- stabilise Today/Practice et layout Progress ; PR #44 ; runtime `5947149e9fcb3b387aa01a797607270edb4f100e` ; Pages #101.

## [1.19.2] — Build 26.2 — Click + Listening Rate Hotfix — 2026-08-11
- clic Détails déterministe ; Listening final **0.88 / 0.65** ; PR #42 ; runtime `4d1d224aa4eb6612fe6b0dc997f3871bbb502317` ; Pages #100.

## [1.19.1] — Build 26.1 — Voice Self-Playback + Learning Details Dashboard — 2026-08-11
- seconde prise locale volontaire pour s’écouter ; dashboard groupé ; PR #40 ; runtime `8ad7e5eb9cb2f64c58c086847c3e035463ab3ba3` ; Pages #98.

### Gate terrain restant
L’auto-écoute doit encore confirmer sur le vrai iPhone : `réponse reconnue → seconde prise → réécoute → nouvelle reconnaissance`.

## [1.19.0] — Build 26 — Real Life French III — 2026-08-11
- 8 situations / 24 tours ; Scenario production **36 situations / 108 tours** ; PR #37 ; runtime `db8219e44d74f0af13421ec798a0c98d02f7a7b5` ; Pages #96.

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

## [1.7.0] — Builds 13–14 — 2026-08-11
- Learning Memory, révision espacée, UX conversation et avatar historique.

## [1.6.x] — Builds 11–12 — 2026-08-11
- 15 leçons / 88 éléments et Curriculum UX responsive.

## [1.5.0] — Build 10 / 10.1 / 10.2
- responsive ; watchdog ; ES modules ; Chrome headless.

## [1.4.0] — Build 9
- French Trân’quille ; branding/PWA.

## [1.3.0] — Build 8
- Guided Free Voice.

## [1.2.0] — Build 7
- Free Voice gratuit.

## [1.0.x] — Builds 1–6
- première PWA, DEBUG FR, voix iPhone-first et retour architecture 0 €.