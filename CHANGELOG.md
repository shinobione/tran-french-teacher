# French Trân’quille — CHANGELOG

Ce fichier conserve l’historique réellement livré. Les intentions futures vivent dans `ROADMAP.md` / `MASTER-ROADMAP.md`.

## [Unreleased]

- Aucun changement produit postérieur à **v2.5.0 · Build 38** n’est encore matérialisé.

---

# [2.5.0] — Build 38 — Generalization & Transfer — 2026-08-17

- publie le milestone **Build 38 — Generalization & Transfer** comme release publique **v2.5.0 · Build 38** ;
- conserve la baseline pédagogique **v2.3.0 · Build 34** ;
- conserve **52 leçons / 313 éléments**, Scenario **44 / 132**, Speaking Loop **52/52 · max 2**, Listening **0.88 / 0.65** ;
- conserve Recovery **7 stores / backup v3** et Evidence v2 comme **derived shadow** ; les six stores historiques restent vérité produit ;
- chaîne Transfer livrée :
  - 38.1 → 38.2 : subject substitution → leçon 33 ;
  - 38.3 → 38.8 : affirmation → negation → leçon 34 ;
  - 38.4 → 38.5 : present → futur proche → leçon 35 ;
  - 38.6 → 38.7 : singular → plural nominal → leçon 13 ;
  - 38.9 → 38.10 : `nous` → spoken `on` → leçon 52 ;
- Transfer reste optionnel/éphémère : aucun durable write, aucun Evidence product read, aucun mastery claim ;
- audit milestone : **Build 38.11 NOT AUTHORIZED** ; adjective agreement, generic question transform, comparatives, broad recombination et F16 contractions ne justifient pas un 38.11 sous le contrat déterministe actuel ;
- release slice #206 : ownership/version/certification uniquement, sans nouvelle pédagogie ;
- final candidate head : `78768ff26dcc64c090535163a10af8e019fdb4a1` ;
- squash merge / `main` accepté : **`2abe20511d6265d12643276f18041812fec3e715`** ;
- GitHub Pages **#272 / run `32072053127` SUCCESS** sur exactement ce SHA ;
- déploiement `github-pages` **5951805479 SUCCESS** sur exactement ce SHA ;
- release gate final : dedicated release, runtime metadata, Build38.10 et Build32 verts ; Build26.4 confirmé flake par rerun inchangé SUCCESS ;
- matrice finale : aucun nouvel échec persistant au-delà des cinq dettes CI héritées documentées ;
- continuité historique verrouillée : **7 leçons terminées / l8=4 / 40 acquis historiques** ;
- aucun changement de curriculum, voix, learner store, Recovery schema, Evidence role, Premium UI, PWA identity, logo ou favicon dans la release slice.

---

# [2.3.0] — Build 34 — Foundations Pilot F01–F04 — 2026-08-13

- conserve **52 leçons / 313 éléments** et tous les IDs historiques ;
- embarque la conclusion de **Build 33 — Foundations Audit** ;
- audit structurel : leçons 1–15 = 88 items surtout implicites, 16–25 = 60 avec notes contextuelles, 26–40 = 93 A1 contextuels, 41–52 = 72 Build32 ;
- identifie le principal trou transférable précoce : **genre + articles + singulier/pluriel**, et non une absence générale de conjugaison ;
- ajoute `src/pedagogy/foundations-pilot.js`, chargé uniquement en runtime courant non historique ;
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
- nouveau shim : `src/core/navigation-field-hotfix.js` ;
- Listening est fermé au geste physique de navigation avant le routage historique ;
- aucune donnée learner modifiée.

## Réécoute voix

- traite le cas `Ghi âm → Dừng ghi âm → pas de ▶ Giọng của tôi` remonté à partir de Bài 11/12 ;
- confirme qu’il n’existe aucune condition « lesson >= 11 » ;
- le playback dépend d’un Blob non vide après `MediaRecorder.stop()` ;
- le Speaking Loop demandait des chunks via `MediaRecorder.start(120)` ;
- ajoute `src/core/mediarecorder-ios-compat.js` : pour un MediaRecorder **audio-only**, le `timeslice` est retiré afin de laisser Safari/iOS finaliser une prise complète au stop ;
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
- ajoute `src/pedagogy/curriculum-stage4.js` : **12 leçons / 72 éléments** ;
- curriculum courant depuis Build32 : **52 leçons / 313 éléments**, 313 IDs uniques ;
- ajoute **Autonomie A1 41–46** et **Interaction A1 47–52** ;
- capacités : clarification, quantités, comparaison, invitation/refus, santé/rendez-vous, pharmacie, travail/consignes, panne/logement, transport perturbé, récit, avis et `on` oral ;
- `src/pedagogy/real-life-data-4.js` : **8 situations / 24 tours**, Scenario **44 / 132** ;
- `src/pedagogy/listening-data-2.js` : **4 contrastes + 8 mini-dialogues**, vitesses **0.88 / 0.65** ;
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
- **28 situations / 84 tours** avant Pack III ; `src/pedagogy/real-life-data-2.js` témoin historique.

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
