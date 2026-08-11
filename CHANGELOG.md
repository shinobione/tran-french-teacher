# French Trân’quille — CHANGELOG

Ce fichier conserve l’historique réellement livré. Les intentions futures vivent dans `ROADMAP.md`.

## [Unreleased]

- prochain jalon : **v1.17.0 — Build 24 — Real Life French II**.

---

## [1.16.0] — Build 23 — Real Life French I — 2026-08-11

- ajout de `real-life-data.js` : **6 situations / 18 tours** liées à la vraie vie de Trân avec Jerry ;
- prérequis progressifs `l2` → `l8` ;
- réponses obligatoires limitées aux acquis déjà enseignés ;
- Scenario total : **18 situations / 54 tours** ;
- aucune nouvelle clé de progression ;
- même stockage `french-tranquille:scenarios:v1` ;
- ajout de `real-life-ux.js` / `real-life-ux.css` ;
- situations personnelles disponibles remontées en premier ;
- titre apprenant `Parler en situation` ;
- futures scènes verrouillées condensées à deux par défaut ;
- shell Build 22 inchangé ;
- voix / reconnaissance / logo / favicon sanctuarisés ;
- cache `1.16.0-b23` ;
- smoke ancien utilisateur leçon 8 : SUCCESS ;
- smoke Real Life leçon 8 : **5 scènes personnelles ouvertes / 1 verrouillée** ;
- PR #18 : SUCCESS ;
- `main` CI run #63 : SUCCESS ;
- GitHub Pages run #77 : SUCCESS.

---

## [1.15.0] — Build 22 — UX Foundation & Runtime Integrity — 2026-08-11

- nouvelle navigation apprenante limitée à **Aujourd’hui / Pratiquer / Parcours** ;
- `Pratiquer` regroupe Révision / Conversation / Listening ;
- Home simplifiée autour de la prochaine leçon et de la séance du jour ;
- mode Leçon recentré, navigation fixe et grandes zones tactiles ;
- Parcours simplifié côté Trân, intelligence détaillée conservée en DEBUG FR ;
- Réglages techniques / reset masqués côté apprenante ;
- ajout de `progress-safety.js` et snapshot pré-Build22 non destructif ;
- smoke Chrome dédié à un profil synthétique arrivé à la leçon 8 : progression et acquis conservés ;
- logo/favicon sanctuarisés et protégés par hash ;
- `voice-ios.js` / `free-voice.js` sanctuarisés après retour iPhone positif ;
- audit de loader : Stage 3 / Listening / Adaptive Language présents dans le repo mais pas tous activés par l’ancien loader/service worker ;
- réconciliation du runtime complet et `build-meta.js` replacé en dernier ;
- audit curriculum : **40 leçons / 241 éléments réels** ;
- cache PWA `1.15.0-b22` ;
- PR #16 SUCCESS ;
- `main` CI run #59 SUCCESS ;
- GitHub Pages run #75 SUCCESS.

---

## [1.14.0] — Build 21 — Adaptive Language Ratio — 2026-08-11

- moteur pur de soutien VI/FR ;
- profils VI-HEAVY / VI-SUPPORT / BALANCED / FR-GROWING ;
- décision fondée sur Curriculum / Memory / Listening / pratique / fragilités ;
- retour temporaire vers davantage de vietnamien après difficultés ;
- contextes lesson/listening/scenario/admin/safety ;
- DEBUG FR prioritaire.

**Note d’intégrité Build 22 :** le runtime de production a été réconcilié en Build 22.

## [1.13.0] — Build 20 — Listening Comprehension — 2026-08-11

- moteur Listening local ;
- Sens / Contrastes / Mini-dialogues ;
- transcript caché avant réponse ;
- vitesse normale / lente ;
- réécoute ;
- clé `french-tranquille:listening:v1` ;
- Memory + Error alimentés par les sources `listening-*`.

**Note d’intégrité Build 22 :** le câblage production complet a été repris explicitement en Build 22.

## [1.12.0] — Build 19 — A1 Core — 2026-08-11

- Stage 3, leçons 26–40 ;
- nombres 11→100, jours, mois, dates, heure précise ;
- possessifs ; présent avec `tu`, `il/elle`, `nous` ;
- futur proche ; passé récent ; passé composé ;
- administration / documents ; émotions, besoins et proches ;
- Mastery A1 Core.

**Correction d’audit Build 22 :** Stage 3 contient réellement **93 éléments**, total runtime **241**.

## [1.11.0] — Build 18 — Error Intelligence — 2026-08-11

- stockage `french-tranquille:error-intelligence:v1` ;
- taxonomie fondée sur des preuves observables ;
- historique borné à 20 événements par élément / 120 globaux récents ;
- récence, répétition, récupération ;
- Free Voice → Learning Memory + Error Intelligence.

## [1.10.0] — Build 17 — Scenario Lab — 2026-08-11

- 12 situations / 36 tours ;
- déverrouillage selon les leçons ;
- indices puis modèle ;
- Learning Memory ; voix + texte ; stats locales.

## [1.9.0] — Build 16 — Mastery Engine — 2026-08-11

- maîtrise par grandes étapes ;
- preuves Learning Memory ;
- estimation interne non certifiante ;
- docs canoniques et process PR/CI/Chrome/Pages.

## [1.8.0] — Build 15 — 2026-08-11
- 25 leçons / 148 éléments ; Early A1 ; Daily Coach ; Stage 2.

## [1.7.1] — Build 14 / 14.1 — 2026-08-11
- refonte UX Conversation/Révision/Memory ; avatar Lucie.

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
