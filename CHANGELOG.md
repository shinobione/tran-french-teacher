# French Trân’quille — CHANGELOG

Ce fichier conserve l’historique réellement livré. Les intentions futures vivent dans `ROADMAP.md`.

## [Unreleased]

### v1.17.5 — Build 24.5 — Navigation State Sync — candidat

- correctif de stabilisation après le smoke `main` de Build 24.4 ;
- supprime la dépendance au timing du `MutationObserver` pour l’état actif de la bottom bar ;
- synchronise immédiatement l’onglet demandé, puis confirme après navigation native, au prochain frame et à +80 ms ;
- conserve les nœuds DOM persistants et le `tap echo` de Build 24.4 ;
- force les assets UX sous `1.17.5-b24.5` ;
- cache PWA `tran-french-teacher-v1.17.5-b24.5-nav-state-sync` ;
- aucune modification de la progression, du curriculum, de la voix, de Learning Memory, Scenario, Listening ou du branding.

### v1.17.4 — Build 24.4 — Mobile Polish / Interaction Timing — intégré mais non clos

- corrige le feedback mobile qui disparaissait lors d’un vrai changement d’onglet ;
- remplace la reconstruction `innerHTML` de la bottom bar par des nœuds DOM persistants ;
- ajoute un `tap echo` indépendant du composant ;
- impose un seul onglet actif ;
- nettoie le header de leçon : plus de gros bandeau violet/sticky ;
- PR verte, mais le smoke mobile rejoué sur `main` a révélé une course de synchronisation `active-wrong:progress:home` ;
- la clôture est donc reportée à Build 24.5.

---

## [1.17.3] — Build 24.3 — Premium Interaction UX — 2026-08-11

- couche globale `interaction-ux.js/css` ;
- retour visuel immédiat `pointerdown`, compression courte, glow/contraste et confirmation ;
- Pratiquer = vrai troisième écran/tab ;
- zones tactiles mobiles renforcées ;
- PR #24, quality main #76, Options #7, nav interaction #20 et Pages #83 : SUCCESS.

## [1.17.2] — Build 24.2 — Navigation Interaction Hotfix — 2026-08-11
- corrige un état où la navigation pouvait rester visible mais inerte ; stabilise le cache et ajoute un smoke de clic physique.

## [1.17.1] — Build 24.1 — Options Crash Hotfix — 2026-08-11
- corrige la boucle `MutationObserver` du diagnostic Options et ajoute un smoke dédié.

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
