# French Trân’quille — CHANGELOG

Ce fichier conserve l’historique réellement livré. Les intentions futures vivent dans `ROADMAP.md`.

## [Unreleased]

### v1.15.0 — Build 22 — UX Foundation & Runtime Integrity — candidat

- nouvelle navigation apprenante limitée à **Aujourd’hui / Pratiquer / Parcours** ;
- `Pratiquer` regroupe Révision / Conversation / Listening ;
- Home simplifiée autour de la prochaine leçon et de la séance du jour ;
- mode Leçon recentré, navigation fixe et grandes zones tactiles ;
- Parcours simplifié côté Trân, intelligence détaillée conservée en DEBUG FR ;
- Réglages techniques / reset masqués côté apprenante ;
- ajout de `progress-safety.js` et snapshot pré-Build22 non destructif ;
- smoke Chrome dédié à un profil synthétique arrivé à la leçon 8 ;
- logo/favicon sanctuarisés et protégés par hash ;
- `voice-ios.js` / `free-voice.js` sanctuarisés pendant la refonte après retour iPhone positif ;
- audit de loader : Stage 3 / Listening / Adaptive Language présents dans le repo mais pas tous activés par le loader/service worker historique ;
- réconciliation du runtime complet et `build-meta.js` replacé en dernier ;
- cache PWA `1.15.0-b22` ;
- documentation Build 22 ajoutée.

Aucun élément ci-dessus ne sera déplacé dans une release tant que PR, `main` et GitHub Pages ne seront pas verts.

---

## [1.14.0] — Build 21 — Adaptive Language Ratio — 2026-08-11

- moteur pur de soutien VI/FR ;
- profils VI-HEAVY / VI-SUPPORT / BALANCED / FR-GROWING ;
- décision fondée sur Curriculum / Memory / Listening / pratique / fragilités ;
- retour temporaire vers davantage de vietnamien après difficultés ;
- contextes lesson/listening/scenario/admin/safety ;
- DEBUG FR prioritaire ;
- fichiers et tests de décision livrés dans le repo.

**Note d’intégrité Build 22 :** l’audit ultérieur a établi que le loader/service worker de `main` n’activait pas encore toute cette couche. Build 22 réconcilie le runtime au lieu de masquer cette dette.

## [1.13.0] — Build 20 — Listening Comprehension — 2026-08-11

- moteur Listening local ;
- Sens / Contrastes / Mini-dialogues ;
- transcript caché avant réponse ;
- vitesse normale / lente ;
- réécoute ;
- clé `french-tranquille:listening:v1` ;
- Memory + Error `listening-miss` ;
- fichiers et contrats Listening livrés dans le repo.

**Note d’intégrité Build 22 :** l’audit ultérieur a montré que le loader/service worker historique n’avait pas encore activé cette couche dans toutes les compositions de `main`. Le câblage est repris explicitement dans Build 22.

## [1.12.0] — Build 19 — A1 Core — 2026-08-11

- ajout de **15 leçons / 90 éléments** ;
- cible **40 leçons / 238 éléments** ;
- `curriculum-stage3.js` pour les leçons 26–40 ;
- nombres 11→100, jours, mois, dates, heure précise ;
- possessifs de base ;
- présent avec `tu`, `il/elle`, `nous` ;
- futur proche ;
- passé récent ;
- passé composé fréquent avec `avoir` ;
- passé composé avec `être` et formes féminines utiles à Trân ;
- administration / documents ;
- émotions, besoins et proches ;
- Mastery A1 Core ;
- dossier `docs/BUILD-19-A1-CORE.md`.

**Note d’intégrité Build 22 :** les fichiers Stage 3 étaient présents mais l’`index.html` de `main` audité en Build 22 était resté sur un loader Build 18. Build 22 active enfin explicitement Stage 3 dans la composition runtime contrôlée.

## [1.11.0] — Build 18 — Error Intelligence — 2026-08-11

- stockage `french-tranquille:error-intelligence:v1` ;
- taxonomie fondée sur des preuves observables ;
- historique borné à 20 événements par élément / 120 globaux récents ;
- récence, répétition, récupération ;
- priorité Daily Coach ;
- Free Voice → Learning Memory + Error Intelligence ;
- correction de classification `free-voice-text` / `voice`.

## [1.10.0] — Build 17 — Scenario Lab — 2026-08-11

- 12 situations / 36 tours ;
- déverrouillage selon les leçons ;
- indices puis modèle ;
- Learning Memory ;
- voix + texte ;
- stats locales ;
- profil vierge supporté.

## [1.9.0] — Build 16 — Mastery Engine — 2026-08-11

- maîtrise par grandes étapes ;
- preuves Learning Memory ;
- estimation interne non certifiante ;
- docs canoniques ROADMAP / CHANGELOG / ARCHITECTURE / BUILD-POLICY ;
- process branche → PR → CI → Chrome → merge → Pages.

## [1.8.0] — Build 15 — 2026-08-11

- 25 leçons / 148 éléments ;
- Early A1 ;
- Daily Coach ;
- Stage 2 modulaire.

## [1.7.1] — Build 14 / 14.1 — 2026-08-11

- refonte UX Conversation/Révision/Memory ;
- avatar Lucie via icône French Trân’quille.

## [1.7.0] — Build 13 — 2026-08-11

- Learning Memory ;
- révision espacée ;
- export/import JSON.

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
