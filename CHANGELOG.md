# French Trân’quille — CHANGELOG

Ce fichier conserve l’historique réellement livré. Les intentions futures vivent dans `ROADMAP.md`.

## [Unreleased]

### v1.18.0 — Build 25 — Progression UX / Progressive Disclosure — CANDIDAT

Le freeze terrain est levé. Le chantier runtime reprend sur branche dédiée.

Candidat actuel :

- nouveau `progression-ux.js` + `progression-ux.css` ;
- Build meta candidat : **v1.18.0 / Build 25** ;
- cache candidat : `tran-french-teacher-v1.18.0-b25-progression-ux` ;
- vue Parcours réorganisée sans migration de données ;
- ancien hero/stats conservé dans le DOM mais remplacé visuellement par un résumé simple ;
- cartes Memory / Mastery / A1 et autres injecteurs déplacées derrière `Détails d’apprentissage` ;
- seulement 5 lignes du curriculum visibles par défaut autour de la leçon actuelle ;
- les 40 leçons restent accessibles via `Voir les 40 leçons` ;
- CTA direct vers la leçon actuelle ;
- nouveau workflow `Build 25 Progression UX smoke` : compact / expanded / details ;
- profil synthétique l8 attendu inchangé : 7 leçons terminées, l8 actuelle, 40 acquis ;
- hashes logo/favicon/voice/free-voice inchangés.

Ce bloc reste **Unreleased** tant que PR → CI → `main` → Pages n’est pas complètement vert.

### Notes terrain planifiées ensuite

- Build 25.1 : Listening lent à tester vers 0.64 puis 0.62 si nécessaire ;
- Build 25.2 : objectifs de session, milestones significatifs et animations de succès premium sobres ;
- Real Life French III déplacé en Build 26.

---

## Post-release microfix — Listening speed separation — 2026-08-11

PR #29 / commit `58f64a46bf8b2943a791a1098402e36285e91814` :

- corrige l’écrasement des vitesses explicites du module Listening par la vitesse globale Lucie ;
- conserve `normal = 0.88` et `lent = 0.68` ;
- même voix, même timbre ;
- `voice-ios.js` non modifié ;
- quality #88 : SUCCESS ;
- Options : SUCCESS ;
- nav/mobile : SUCCESS ;
- GitHub Pages #88 : SUCCESS.

Ce microfix n’a pas reçu de nouveau numéro de version produit ; la baseline reste **v1.17.5 / Build 24.5**.

---

## [1.17.5] — Build 24.5 — Navigation State Sync — 2026-08-11

- clôt la stabilisation mobile initiée par Build 24.4 ;
- supprime la dépendance au seul timing du `MutationObserver` pour l’état actif de la bottom bar ;
- synchronise l’onglet demandé immédiatement, après navigation native, au prochain frame et à +80 ms ;
- conserve les nœuds DOM persistants et le `tap echo` ;
- force les assets UX sous `1.17.5-b24.5` ;
- cache PWA `tran-french-teacher-v1.17.5-b24.5-nav-state-sync` ;
- PR #27 : quality #83 / Options #14 / nav-mobile #33 SUCCESS ;
- `main` : quality #84 / Options #15 / nav-mobile #34 SUCCESS ;
- GitHub Pages #86 SUCCESS ;
- aucune modification de la progression, du curriculum, de la voix, de Learning Memory, Scenario, Listening ou du branding.

### Build 24.4 — Mobile Polish / Interaction Timing

Build 24.4 a apporté les nœuds persistants, le `tap echo` et le header de leçon allégé. Sa PR était verte, mais le smoke `main` a révélé une course `active-wrong:progress:home`. La clôture fonctionnelle de ce chantier est donc portée par Build 24.5.

---

## [1.17.3] — Build 24.3 — Premium Interaction UX — 2026-08-11
- couche globale d’interaction premium ; Pratiquer = vrai troisième écran ; PR #24 + quality #76 + Options #7 + nav #20 + Pages #83 SUCCESS.

## [1.17.2] — Build 24.2 — Navigation Interaction Hotfix — 2026-08-11
- navigation visible mais inerte corrigée ; cache réaligné ; smoke de clic physique ajouté.

## [1.17.1] — Build 24.1 — Options Crash Hotfix — 2026-08-11
- boucle `MutationObserver` du diagnostic Options corrigée ; smoke dédié ajouté.

## [1.17.0] — Build 24 — Real Life French II — 2026-08-11
- 10 situations / 30 tours ; Scenario total 28 / 84 ; catalogue limité à 6 propositions ouvertes visibles.

## [1.16.0] — Build 23 — Real Life French I — 2026-08-11
- 6 situations / 18 tours liées à la vraie vie de Trân avec Jerry ; profil leçon 8 protégé.

## [1.15.0] — Build 22 — UX Foundation & Runtime Integrity — 2026-08-11
- navigation Aujourd’hui / Pratiquer / Parcours ; snapshot ancien utilisateur ; curriculum audité 40 / 241.

## [1.14.0] — Build 21 — Adaptive Language Ratio — 2026-08-11
- profils VI-HEAVY / VI-SUPPORT / BALANCED / FR-GROWING.

## [1.13.0] — Build 20 — Listening Comprehension — 2026-08-11
- Sens / Contrastes / Mini-dialogues ; transcript caché avant réponse ; Memory + Error.

## [1.12.0] — Build 19 — A1 Core — 2026-08-11
- Stage 3, leçons 26–40 ; Mastery A1 Core. Total réel audité ensuite : 241 éléments.

## [1.11.0] — Build 18 — Error Intelligence — 2026-08-11
- historique borné ; récence/répétition/récupération ; Free Voice relié à Memory/Error.

## [1.10.0] — Build 17 — Scenario Lab — 2026-08-11
- 12 situations / 36 tours ; indices/modèles ; Memory ; voix/texte.

## [1.9.0] — Build 16 — Mastery Engine — 2026-08-11
- maîtrise fondée sur preuves Learning Memory ; gouvernance documentaire/CI.

## [1.8.0] — Build 15 — 2026-08-11
- 25 leçons / 148 éléments ; Early A1 ; Daily Coach.

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