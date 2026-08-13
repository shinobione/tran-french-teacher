# French Trân’quille — CHANGELOG

Ce fichier conserve l’historique réellement livré. Les intentions futures vivent dans `ROADMAP.md`.

## [Unreleased]

- prochaine intention : **Build 33 — Memory Evidence v2 / Migration Readiness** ; design des preuves, du schéma et de la migration réversible avant toute modification du stockage durable ;
- aucune migration Memory v2 ni nouveau store ne sont pré-engagés ;
- gate terrain iPhone exact-first-attempt toujours parallèle et non bloquant pour le design contenu/niveaux/mémoire hors capture vocale.

---

# [2.2.0] — Build 32 — Practical A1 Expansion — 2026-08-13

- fait évoluer le produit courant vers **v2.2.0 • Build 32** tout en gardant l’Architecture Runtime gelée **2.0.0 / Build 30** ;
- part d’un audit du curriculum 1–40 au lieu d’ajouter des leçons pour gonfler un compteur ;
- conserve le cœur historique **40 leçons / 241 éléments** rejouable et ordonné ;
- ajoute `curriculum-stage4.js` : **12 leçons / 72 éléments** ;
- curriculum courant : **52 leçons / 313 éléments**, avec 313 IDs uniques ;
- ajoute deux étapes : **Autonomie A1 41–46** et **Interaction A1 47–52** ;
- nouvelles capacités : clarification/reformulation, quantités, comparaison/choix, invitation/refus, santé/rendez-vous, pharmacie, travail/consignes, panne/logement, perturbations transport, récit ordonné, avis simple et `on` oral ;
- ajoute `real-life-data-4.js` : **8 situations / 24 tours**, pour un Scenario courant de **44 / 132** ;
- valide chaque référence Pack IV contre un vrai ID curriculum ;
- ajoute `listening-data-2.js` : **4 contrastes + 8 mini-dialogues**, sans changer les vitesses finales **0.88 / 0.65** ;
- Speaking Loop existant étendu dynamiquement à **52/52 leçons**, toujours max 2 moments / leçon ;
- ajoute `learner-intelligence-v2.js` : **7 bandes / 52 / 313**, score/confiance séparés et priorité déterministe ;
- `A1+` est uniquement une étiquette interne d’adaptation, jamais une certification CECRL ;
- une non-reconnaissance `voice-*` reste un signal `recognition`, jamais un score phonétique ;
- Learner Intelligence 2.2 reste read-only vis-à-vis des stores durables ;
- ajoute `build32-shell-extension.js` pour présenter les deux nouvelles étapes sans réécrire le shell Build27 ;
- ajoute `build32-loader.js` et conserve les anciens tribunaux rejouables ;
- Build31 peut encore rejouer exactement **2.1 / Build31 / 40–241 / 5 bandes** ;
- `release-v2.json` reste volontairement **2.0.0 / Architecture Build30 / 40–241** ;
- le tribunal V2 distingue désormais la baseline gelée du produit V2.x courant et exige que le courant soit un **superset compatible** ;
- aucun nouveau store durable, aucune migration ;
- ancien profil conservé exactement **7 leçons terminées / l8=4 / 40 acquis → prochaine l8** ;
- profil ayant terminé les 40 leçons historiques → **prochaine l41** ;
- six stores durables byte-identiques pendant les audits Build32 ;
- `app.js`, `voice-ios.js`, `free-voice.js`, logo et favicon restent aux hashes sanctuaires exacts ;
- PR runtime **#79**, head `b64539e8f463bde8cabc05cd606f3132b01e2da8` : **25/25 workflows fonctionnels SUCCESS** ;
- runtime `main` **`269cb0b476ea131cfbe086a87bcc4364ec39c342`** : **26/26 workflows SUCCESS**, Pages comprise ;
- GitHub Pages **#137 SUCCESS** sur le SHA runtime exact ;
- prochaine intention canonique : **Build 33 — Memory Evidence v2 / Migration Readiness**, design-first et sans changement de schéma durable tant qu’une migration réversible n’est pas démontrée.

---

# [2.1.0] — Build 31 — Learner Intelligence Core — 2026-08-13

- reprend explicitement l’évolution post-freeze à partir d’un besoin utilisateur clair, sans attendre le gate terrain iPhone ;
- version produit visible passée à **v2.1.0 • Build 31** ;
- conserve l’Architecture Runtime gelée **2.0.0 / Build 30** et `release-v2.json` comme baseline historique 2.0.0 / 30 ;
- ajoute `learner-intelligence.js`, couche read-only au-dessus de progression, Learning Memory et Error Intelligence ;
- unifie le curriculum existant en cinq bandes : 1–7 Survival A0, 8–15 Daily A0, 16–20 Foundations A1, 21–25 First Exchanges A1, 26–40 A1 Core ;
- calcule un indice interne, une confiance séparée, une estimation `A0 / A0+ / Pré-A1 / A1- / A1` et une recommandation suivante déterministe ;
- aucun nouveau store durable, aucune migration ;
- source `voice-*` / `voice-unrecognized` classée `recognition`, jamais prononciation ;
- PR runtime **#77**, head `eed097ca3d261f2f4dd60db930a11670511f33a1` : **24/24 fonctionnels SUCCESS** ;
- runtime `main` `e2b2c6293f35495fa8bbffd2e6b684fba897df88` : **25/25 SUCCESS**, Pages comprise ;
- GitHub Pages **#135 SUCCESS**.

---

# [2.0.0] — Freeze / Release — 2026-08-13

- gèle French Trân’quille sur **Architecture Build 30** ;
- version produit visible **v2.0.0 • Build 30** ;
- ajoute `release-v2.json`, contrat machine-readable ;
- baseline gelée : **40 leçons / 241 éléments**, Scenario **36 / 108**, Listening **0.88 / 0.65**, Speaking Loop **max 2**, six stores, coût **0 €** ;
- ancien utilisateur exact **7 leçons / l8=4 / 40 acquis** ;
- sanctuaires `app.js`, `voice-ios.js`, `free-voice.js`, logo et favicon hashés ;
- PR runtime V2 **#73** : 22/22 fonctionnels ;
- PR CI-only **#74** : tribunal Progression borné ;
- baseline finale de certification `6e0f5cde97cfba0572efccc6344a8bd6cbe7a315` : **23/23 SUCCESS**, Pages #132.

---

## [1.23.0] — Build 30 — Architecture Hardening — 2026-08-13

- Runtime Contracts + Runtime Bridge ; six stores, ownership et routes explicites ;
- aucun `localStorage.setItem` dans Contracts/Bridge ;
- `app.js` byte-identique ;
- PR #71 : 21/21 fonctionnels ; runtime `5a8369df9df536f41521acefb528da71efb168a8` ; Pages #129 ; clôture #72 / Pages #130.

## [1.22.2] — Build 29.2 — Speaking Loop Variety & Clarity — 2026-08-12
- Tyffany, auto-écoute locale, compréhension ≠ production, anti-répétition ; max 2 moments ; runtime `b6031cd8fa6756eee39496cd62a164b8400d15af` ; Pages #126.

## [1.22.1] — Build 29.1 — Speaking Loop Content — 2026-08-12
- auto-écoute locale intégrée aux leçons ; runtime `b2fde53792c38d1e6283d8779bbcedfac36f9502` ; Pages #122.

## [1.22.0] — Build 29 — iPhone / PWA / Accessibility Hardening — 2026-08-12
- safe areas, touch ≥44 px, a11y, `VisualViewport`, reduced motion et offline ; runtime `1c01648d89dfb3bd9236b9ad93fbade4e21102fa` ; Pages #120.

## [1.21.0] — Build 28 — Data & Recovery Hardening — 2026-08-12
- backup V2 six stores, restore transactionnel, rollback, migration V1 sûre, quarantaine et last-good ; runtime `ed09159a6246fe3c1892cb0ff8d03a4beffb7428` ; Pages #118.

## [1.20.0] — Build 27 — App Shell Reset — 2026-08-12
- Aujourd’hui / Pratiquer / Progrès ; cockpit moteur réservé DEBUG FR ; runtime `beeb9ce8ba081ed0298edbcc339dca41600e4d09` ; Pages #116.

## [1.19.x] — Builds 26 → 26.9 — 2026-08-11/12
- Real Life French III : **36 situations / 108 tours** ; sessions bornées, Progression UX, auto-écoute locale, fixes navigation/layout, Tyffany, containment et Focus Flow.

## [1.18.x] — Build 25 / 25.2 — 2026-08-11
- progressive disclosure, objectifs de session, milestones et fins explicites.

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