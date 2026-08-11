# French Trân’quille — CHANGELOG

Ce fichier conserve l’historique réellement livré. Les intentions futures vivent dans `ROADMAP.md`.

## [Unreleased]

### v1.17.2 — Build 24.2 — Navigation Interaction Hotfix — candidat

- corrige un état réel où `Aujourd’hui / Pratiquer / Parcours` pouvait rester visible mais ne plus répondre aux clics ;
- stabilise les nœuds DOM de la barre UX : aucun remplacement si son état visuel n’a pas changé ;
- traite les clics de navigation en phase de capture ;
- nouveau token UX `1.17.2-b24.2` pour `ux-shell.js`, `ux-shell.css` et `build-meta.js` ;
- identité de cache PWA alignée entre `index.html` et `sw.js` : `1.17.2-b24.2-nav-hotfix` ;
- ajout d’un smoke Chrome permanent avec hit-testing réel, scroll desktop et navigation `Pratiquer → Parcours → Aujourd’hui` ;
- aucune modification de la progression, du curriculum, de Learning Memory, des scénarios, de la voix ou du branding.

Reste Unreleased jusqu’à PR → `main` → GitHub Pages.

### v1.17.0 — Build 24 — Real Life French II — candidat

- ajout de `real-life-data-2.js` : **10 situations / 30 tours** pour les acquis des leçons 9→20 ;
- pack II centré sur des séquences croisées plutôt que des doublons des scénarios gare/resto/pharmacie historiques ;
- rendez-vous/train, shopping, dîner, santé, présentation de Jerry, retour, réservation, logement et téléphone ;
- total Scenario candidat : **28 situations / 84 tours** ;
- Real Life I + II : **16 situations / 48 tours** ;
- aucune nouvelle clé de progression ;
- même stockage `french-tranquille:scenarios:v1` ;
- `real-life-ux.js` fait évoluer le catalogue vers une vue de recommandation : **6 situations ouvertes max visibles par défaut** ;
- tri des scènes personnelles selon les prérequis les plus récents ;
- bouton pour afficher les autres scènes ouvertes ;
- seulement deux scènes futures verrouillées visibles ;
- cache candidat `1.17.0-b24` ;
- logo/favicon/voice/free-voice restent sanctuarisés.

Reste Unreleased jusqu’à PR → `main` → GitHub Pages.

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

- navigation apprenante **Aujourd’hui / Pratiquer / Parcours** ;
- Home simplifiée ; Leçon Focus ; Parcours simplifié ;
- snapshot pré-Build22 non destructif ;
- smoke ancien utilisateur leçon 8 ;
- logo/favicon/voice/free-voice sanctuarisés ;
- réconciliation Stage 3 / Listening / Adaptive Language ;
- curriculum audité **40 leçons / 241 éléments** ;
- PR #16, CI main #59 et Pages #75 SUCCESS.

## [1.14.0] — Build 21 — Adaptive Language Ratio — 2026-08-11
- profils VI-HEAVY / VI-SUPPORT / BALANCED / FR-GROWING ; contextes et retour temporaire vers davantage de vietnamien.

## [1.13.0] — Build 20 — Listening Comprehension — 2026-08-11
- Sens / Contrastes / Mini-dialogues ; transcript caché avant réponse ; vitesse normale/lente ; Memory + Error.

## [1.12.0] — Build 19 — A1 Core — 2026-08-11
- Stage 3, leçons 26–40 ; structures A1 ; Mastery A1 Core. Audit Build 22 : total réel 241 éléments.

## [1.11.0] — Build 18 — Error Intelligence — 2026-08-11
- historique borné 20/item et 120 globaux ; récence/répétition/récupération ; Free Voice relié à Memory/Error.

## [1.10.0] — Build 17 — Scenario Lab — 2026-08-11
- 12 situations / 36 tours ; indices/modèles ; Memory ; voix/texte ; stats locales.

## [1.9.0] — Build 16 — Mastery Engine — 2026-08-11
- maîtrise fondée sur preuves Learning Memory ; gouvernance documentaire/CI.

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
