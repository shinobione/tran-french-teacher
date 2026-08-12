# French Trân’quille — CHANGELOG

Ce fichier conserve l’historique réellement livré. Les intentions futures vivent dans `ROADMAP.md`.

## [Unreleased]

- aucun nouveau build engagé après le freeze V2 ; priorité à l’usage réel, au gate iPhone et aux correctifs prouvés.

---

# [2.0.0] — Freeze / Release — 2026-08-13

- gèle French Trân’quille sur **Architecture Build 30** sans ajouter de moteur, de curriculum ou de navigation ;
- version produit visible passée à **v2.0.0 • Build 30** ;
- ajoute `release-v2.json`, contrat machine-readable de la baseline ;
- baseline gelée : **40 leçons / 241 éléments**, Scenario **36 / 108**, Listening **0.88 / 0.65**, Speaking Loop **max 2**, six stores durables, coût **0 €** ;
- ajoute `v2-release-smoke.js` et `.github/workflows/v2-release-freeze.yml` ;
- le tribunal V2 vérifie Runtime Contracts ↔ Recovery ↔ Release Contract, backup V2 six stores, version Options, routes principales, ancienne utilisatrice et absence d’écriture durable pendant le round-trip ;
- le profil ancien utilisateur reste exactement **7 leçons terminées / l8=4 / 40 acquis** ;
- les sanctuaires `app.js`, `voice-ios.js`, `free-voice.js`, logo et favicon restent aux hashes gelés ;
- aucune migration ni renommage des six stores durables ;
- PR runtime V2 **#73**, head `c221fa9600d23dd83b87225cc4accce01e83cfe6` : **22/22 workflows fonctionnels SUCCESS** ;
- runtime applicatif V2 `5f2c486b3e455220ebd903f25ee766ff2430e4a5` ; **GitHub Pages #131 SUCCESS** ;
- après merge runtime, l’ancien workflow Build 25 Progression UX a reproduit un Chrome headless non borné malgré son passage sur la PR ; aucune régression PWA n’était impliquée ;
- PR CI-only **#74**, head `0fbd3b8e8124b3beaf7d6086d8a837580abb2cb3` : un seul YAML, mêmes assertions, Chrome isolé + timeout + retries ; **22/22 fonctionnels SUCCESS** ;
- baseline finale de certification `6e0f5cde97cfba0572efccc6344a8bd6cbe7a315` : **23/23 workflows SUCCESS**, dont **Pages #132 SUCCESS** ;
- le gate terrain `reconnaissance → seconde prise → lecture → reconnaissance suivante` reste ouvert uniquement pour une future capture automatique du premier essai exact ;
- après V2, aucun Build 31 n’est pré-engagé : observation/maintenance d’abord.

---

## [1.23.0] — Build 30 — Architecture Hardening — 2026-08-13

- ajoute `runtime-contracts.js` : six stores, snapshots Recovery, invariants produit, ownership, routes et sanctuaires ;
- ajoute `runtime-bridge.js` : `snapshot()`, `refresh()`, `route()` et `openLesson()` ;
- aucun `localStorage.setItem` dans Contracts/Bridge ;
- `app.js` reste byte-identique ;
- tribunal Chrome desktop/mobile avec learner brut strictement inchangé ;
- PR #71, head `ffa3ddf7a16dcbc32474701cfaf2f961e86d348c` : **21/21 fonctionnels SUCCESS** ;
- runtime `5a8369df9df536f41521acefb528da71efb168a8` ; Pages **#129 SUCCESS** ;
- clôture docs #72 ; final Build30 `main` `9e48bf1038a9f1bfbe1d27e83acd94a405872c0e` ; Pages **#130 SUCCESS**.

## [1.22.2] — Build 29.2 — Speaking Loop Variety & Clarity — 2026-08-12

- `Ghi âm lại` / `Enregistrer à nouveau` ; `Nghe Tyffany` / `Écouter Tyffany` ;
- compréhension ≠ production ; planificateur contextualisé + anti-répétition ;
- Bài 7 : `10 euros` reste compréhension, recap oral `Combien ça coûte ?` ;
- 2 moments maximum / leçon ; aucun faux score de prononciation ;
- runtime `b6031cd8fa6756eee39496cd62a164b8400d15af` ; Pages #126.

## [1.22.1] — Build 29.1 — Speaking Loop Content — 2026-08-12
- auto-écoute locale intégrée aux leçons, max 2 moments ; runtime `b2fde53792c38d1e6283d8779bbcedfac36f9502` ; Pages #122.

## [1.22.0] — Build 29 — iPhone / PWA / Accessibility Hardening — 2026-08-12
- safe areas, touch ≥44 px, a11y, `VisualViewport`, reduced motion et offline ; runtime `1c01648d89dfb3bd9236b9ad93fbade4e21102fa` ; Pages #120.

## [1.21.0] — Build 28 — Data & Recovery Hardening — 2026-08-12
- backup V2 six stores, restore transactionnel, rollback, migration V1 sûre, quarantaine et last-good ; runtime `ed09159a6246fe3c1892cb0ff8d03a4beffb7428` ; Pages #118.

## [1.20.0] — Build 27 — App Shell Reset — 2026-08-12
- Aujourd’hui / Pratiquer / Progrès ; cockpit moteur réservé DEBUG FR ; runtime `beeb9ce8ba081ed0298edbcc339dca41600e4d09` ; Pages #116.

## [1.19.x] — Builds 26 → 26.9 — 2026-08-11/12
- Real Life French III : **36 situations / 108 tours** ;
- sessions bornées, Progression UX, auto-écoute locale, fixes de navigation/layout, single-scroll, Tyffany, containment et Focus Flow ;
- la voix et les données apprenantes restent protégées.

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
