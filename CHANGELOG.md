# French Trân’quille — CHANGELOG

Ce fichier conserve l’historique réellement livré. Les intentions futures vivent dans `ROADMAP.md`.

## [Unreleased]

- **Premium V5.9 — TECHNICALLY CLOSED / FIELD PASS PENDING**:
  - PR #130 / merge `5d25b6079dd8115149356bdf3dcb3133fee606e0` — duplicate Speaking Loop CTA/note guard, whole-card About hit target, shared Real Life icon;
  - PR #131 / merge `45e7d2a62a635b4448ea16250c53e092390e5464` — shared cross-theme Lesson/Eiffel geometry;
  - PR #132 / merge `3c6ecce404efa62723bfb0b10c85da6bbbfda1ed` — shared Premium cards/CTA controls + hidden DEBUG entry;
  - PR #133 / merge `48aed8e2fca0b6dacec8f9a4a5e257b16bad67ef` — goat-derived favicon/Apple Touch/PWA icon family without overwriting historical `assets/Favicon.png`;
  - PR #134 / merge `4019c1b6cb41fee9c36bdb223e255455a0da4b5f` — aggregate V5.9 technical QA checkpoint;
- **Premium V5.10 is the active next gate**: physical installed-iPhone/PWA visual + gesture verdict across all four themes;
- issue **#114 remains OPEN** until explicit final user PASS;
- Build 35 remains **BLOCKED / RESERVED** until V5.10 PASS + #114 closure;
- Foundations F01–F04 and the earlier Listening/voice field confirmations remain independent learner-side validation items.

---

# [2.3.0] — Build 34 — Foundations Pilot F01–F04 — 2026-08-13

- conserve **52 leçons / 313 éléments** et tous les IDs historiques ;
- embarque la conclusion de **Build 33 — Foundations Audit** ;
- audit structurel : leçons 1–15 = 88 items surtout implicites, 16–25 = 60 avec notes contextuelles, 26–40 = 93 A1 contextuels, 41–52 = 72 Build32 ;
- identifie le principal trou transférable précoce : **genre + articles + singulier/pluriel**, et non une absence générale de conjugaison ;
- ajoute `foundations-pilot.js`, chargé uniquement en runtime courant non historique ;
- propose dans la zone leçons 8–13 une entrée facultative `🧩 Nền tảng nhỏ / Petite base utile` ;
- couvre seulement **F01 genre**, **F02 un/une/des**, **F03 le/la/l’/les**, **F04 singulier/pluriel** ;
- exemples existants : `la gare`, `un billet`, `une table`, `les toilettes`, `la pharmacie → les pharmacies` ;
- 4 mini-checks, retour à la leçon et rappel explicite qu’un succès unique ≠ maîtrise ;
- **aucun `localStorage.setItem` dans le pilote**, aucun store, aucune migration, aucun score conceptuel durable ;
- pas de nouvel onglet Grammaire, pas de leçon 53+, pas de micro obligatoire ;
- historique Build30/31/32 exclu du pilote et rejouable ;
- PR runtime **#84**, head `6cd47c8c5e11ccccee219217b81b3877408c6e5a` ;
- un premier passage du vieux smoke Build32 old-user a flaké ; **rerun inchangé SUCCESS**, aucune rustine produit ;
- `main` runtime **`259e07c9ed208fe0a7e91998827406b4fdc0bc33`** ;
- **26/26 workflows SUCCESS** ;
- GitHub Pages **#140 SUCCESS** sur exactement ce SHA ;
- état : runtime livré, validation pédagogique terrain de Trân encore attendue.

---

# [2.2.1-maint] — Post-Build32 Field Reliability — 2026-08-13

Maintenance sans migration et sans modification des sanctuaires voix/core.

## Navigation

- corrige le cas réel `Listening → Aujourd’hui` où le premier tap pouvait laisser le corps de l’app vide/bloqué indéfiniment et nécessiter un deuxième tap ;
- cause-frontière : Listening est un overlay `body` avec état propre ; la bottom nav routait le contenu sous-jacent sans fermeture préalable ;
- nouveau shim : `navigation-field-hotfix.js` ;
- Listening est fermé au geste physique de navigation avant le routage historique ;
- aucune donnée learner modifiée.

## Réécoute voix

- traite le cas `Ghi âm → Dừng ghi âm → pas de ▶ Giọng của tôi` remonté à partir de Bài 11/12 ;
- confirme qu’il n’existe aucune condition « lesson >= 11 » ;
- le playback dépend d’un Blob non vide après `MediaRecorder.stop()` ;
- le Speaking Loop demandait des chunks via `MediaRecorder.start(120)` ;
- ajoute `mediarecorder-ios-compat.js` : pour un MediaRecorder **audio-only**, le `timeslice` est retiré afin de laisser Safari/iOS finaliser une prise complète au stop ;
- les MediaRecorder non audio-only gardent leur appel original ;
- `voice-ios.js`, `free-voice.js`, SpeechRecognition, progression et backups inchangés ;
- audio toujours local/jetable ;
- PR **#82**, head `eef513c34a6c535be3273d7139d17690affde741` ;
- runtime `main` **`93f513f719f176c9c059eee7458e31026e602e7f`** ;
- GitHub Pages **#139 SUCCESS** ;
- field confirmation iPhone encore requise pour clore définitivement les deux incidents.

---

# [2.2.0] — Build 32 — Practical A1 Expansion — 2026-08-13

- produit courant à l’époque : **v2.2.0 • Build 32** au-dessus de l’Architecture Runtime gelée **2.0.0 / Build 30** ;
- conserve le cœur historique **40 leçons / 241 éléments** rejouable et ordonné ;
- ajoute `curriculum-stage4.js` : **12 leçons / 72 éléments** ;
- curriculum courant depuis Build32 : **52 leçons / 313 éléments**, 313 IDs uniques ;
- ajoute **Autonomie A1 41–46** et **Interaction A1 47–52** ;
- capacités : clarification, quantités, comparaison, invitation/refus, santé/rendez-vous, pharmacie, travail/consignes, panne/logement, transport perturbé, récit, avis et `on` oral ;
- `real-life-data-4.js` : **8 situations / 24 tours**, Scenario **44 / 132** ;
- `listening-data-2.js` : **4 contrastes + 8 mini-dialogues**, vitesses **0.88 / 0.65** ;
- Speaking Loop : **52/52**, max 2 ;
- Learner Intelligence 2.2 : **7 bandes / 52 / 313** ;
- `A1+` interne uniquement ; reconnaissance vocale ≠ prononciation ;
- aucun nouveau store, aucune migration ;
- ancien profil exact **7 leçons / l8=4 / 40 acquis → l8** ;
- profil ayant terminé l1–l40 → **l41** ;
- sanctuaires exacts conservés ;
- PR runtime #79 ; runtime historique Build32 `269cb0b476ea131cfbe086a87bcc4364ec39c342` ; Pages #137 ;
- clôture finale Build32 `02c2ae237a1c6e388b509c64302d61145e3dc719`, **26/26 SUCCESS**, Pages #138.

---

# [2.1.0] — Build 31 — Learner Intelligence Core — 2026-08-13

- couche read-only progression + Learning Memory + Error Intelligence ;
- cinq bandes historiques sur **40/241** ;
- niveau interne et confiance séparés ;
- aucun nouveau store/migration ;
- `voice-*` classé reconnaissance, jamais phonétique ;
- runtime `e2b2c6293f35495fa8bbffd2e6b684fba897df88` ; Pages #135 ;
- clôture finale `d7da5d1cce7c94dc8bb685d7019daebbff1a4296`, 25/25, Pages #136.

---

# [2.0.0] — Freeze / Release — 2026-08-13

- Architecture Build30 gelée ;
- `release-v2.json` machine-readable ;
- baseline : **40/241**, Scenario **36/108**, Listening **0.88/0.65**, Speaking max 2, six stores, 0 € ;
- ancien utilisateur **7 / l8=4 / 40** ;
- sanctuaires hashés ;
- release finale `f870ae551e82899b1a183754b63b55b43c1636d6`, **23/23 SUCCESS**, Pages #133.

---

## [1.23.0] — Build 30 — Architecture Hardening — 2026-08-13
- Runtime Contracts + Runtime Bridge ; ownership/routes explicites ; aucun write durable ; `app.js` byte-identique.

## [1.22.2] — Build 29.2 — Speaking Loop Variety & Clarity — 2026-08-12
- Tyffany, auto-écoute locale, compréhension ≠ production, anti-répétition ; max 2 moments.

## [1.22.1] — Build 29.1 — Speaking Loop Content — 2026-08-12
- auto-écoute locale intégrée aux leçons.

## [1.22.0] — Build 29 — iPhone / PWA / Accessibility Hardening — 2026-08-12
- safe areas, touch ≥44 px, a11y, VisualViewport, reduced motion, offline.

## [1.21.0] — Build 28 — Data & Recovery Hardening — 2026-08-12
- backup V2 six stores, restore transactionnel, rollback, migration V1 sûre, quarantaine et last-good.

## [1.20.0] — Build 27 — App Shell Reset — 2026-08-12
- Aujourd’hui / Pratiquer / Progrès ; cockpit moteur réservé DEBUG FR.

## [1.19.x] — Builds 26 → 26.9 — 2026-08-11/12
- Real Life III **36/108**, sessions bornées, Progression UX, auto-écoute, fixes navigation/layout, Tyffany et Focus Flow.

## [1.18.x] — Build 25 / 25.2 — 2026-08-11
- progressive disclosure, objectifs de session, milestones et fins explicites.

## [1.17.0] — Build 24 — Real Life French II — 2026-08-11
- **28 situations / 84 tours** avant Pack III ; `real-life-data-2.js` témoin historique.

## [1.16.0] — Build 23 — Real Life French I — 2026-08-11
- situations liées à la vraie vie avec Jerry.

## [1.15.0] — Build 22 — UX Foundation & Runtime Integrity — 2026-08-11
- UX simplifiée + snapshot ancien utilisateur ; curriculum 40/241.

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

## [1.8.0] — Build 15 — Early A1 + Daily Coach — 2026-08-11
- 25 leçons / 148 éléments.

## [1.0.x] — Builds 1–14
- PWA, DEBUG FR, voix iPhone-first, Free Voice, branding, curriculum, Learning Memory et UX initiale.
