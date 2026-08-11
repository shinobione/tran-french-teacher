# French Trân’quille — CHANGELOG

Ce fichier conserve l’historique des versions livrées. Les intentions futures vivent dans `ROADMAP.md`.

## [Unreleased]

### v1.10.0 — Build 17 — Scenario Lab

- ajout de 12 situations multi-tours déterministes ;
- 3 tours par situation, soit 36 tours de dialogue ;
- déverrouillage selon les leçons terminées ;
- variantes de réponses acceptées ;
- normalisation accents / apostrophes / ponctuation ;
- premier échec → indice ;
- erreurs répétées → modèle ;
- modèle utilisé compté comme aide ;
- succès / échecs / aides reliés à Learning Memory ;
- synthèse vocale de l’interlocuteur ;
- micro navigateur quand SpeechRecognition est disponible ;
- fallback texte permanent ;
- stockage local `french-tranquille:scenarios:v1` ;
- statistiques par scénario ;
- carte Situations réelles dans Progression ;
- diagnostic Scenario Lab ;
- second smoke test Chrome dédié à Conversation via `?scenarioSmoke=1`.

---

## [1.9.0] — Build 16 — Mastery Engine — 2026-08-11

### Mastery Engine

- moteur local de maîtrise par grandes étapes ;
- distinction leçon terminée / élément connu / compétence consolidée ;
- score interne basé sur progression + preuves Learning Memory ;
- états Non commencé / Découverte / Consolidation / Presque solide / Maîtrisé ;
- estimation interne A0 / A0+ / Pré-A1 / A1 en construction ;
- priorité suivante suggérée par Lucie ;
- dashboard de maîtrise dans Progression ;
- résumé de maîtrise sur la home ;
- diagnostic enrichi ;
- aucun statut Maîtrisé sans suffisamment de preuves mémoire.

### Gouvernance du projet

- création de `ROADMAP.md` ;
- création de `CHANGELOG.md` ;
- création de `docs/ARCHITECTURE.md` ;
- création de `docs/BUILD-POLICY.md` ;
- README recentré sur l’état en production ;
- politique branche → PR → CI → Chrome → merge → Pages.

### Qualité

- cache PWA `1.9.0-b16` ;
- guards CI Mastery + documentation ;
- vrai Chrome headless vérifiant 25 leçons + Learning Memory + Daily Coach + Mastery Engine ;
- `app.js` historique laissé intact.

> L’indicateur de maîtrise est un outil pédagogique interne et ne constitue pas une certification CECRL.

---

## [1.8.0] — Build 15 — 2026-08-11

- passage à 25 leçons / 148 éléments ;
- leçons 16 à 25 ;
- être, avoir, vouloir, pouvoir, il y a ;
- logement, téléphone, météo, courses, petite conversation, présent, questions simples ;
- notes Structure utile ;
- parcours en quatre étapes ;
- pratique A1 START ;
- Daily Coach ;
- priorité mémoire → leçon → conversation ;
- Chrome headless et Pages validés.

## [1.7.1] — Build 14 / 14.1 — 2026-08-11

- refonte UX/visuelle Conversation, Révision et Learning Memory ;
- hiérarchie desktop/mobile améliorée ;
- avatar `L` remplacé par l’icône French Trân’quille.

## [1.7.0] — Build 13 — 2026-08-11

- Learning Memory locale ;
- Nouveau / Fragile / En cours / Solide ;
- scheduler de révision ;
- export/import JSON.

## [1.6.1] — Build 12 — 2026-08-11

- Curriculum UX responsive ;
- liste bornée et scrollable ;
- colonne desktop sticky ;
- build metadata centralisée.

## [1.6.0] — Build 11 — 2026-08-11

- 15 leçons / 88 éléments ;
- vie quotidienne A0 ;
- curriculum voice-ready.

## [1.5.0] — Build 10 / 10.1 / 10.2

- responsive multi-device ;
- 7 leçons / 40 éléments ;
- watchdog ;
- cache-busting ;
- ES modules ;
- vrai smoke test Chrome headless.

## [1.4.0] — Build 9

- rebranding French Trân’quille ;
- logo / favicon / PWA ;
- Luc → Lucie ;
- voix améliorées ;
- progression préservée.

## [1.3.0] — Build 8

- Guided Free Voice Engine ;
- indices progressifs ;
- fallback clavier ;
- répétition des ratés ;
- aucun faux score de prononciation.

## [1.2.0] — Build 7

- Free Voice gratuit ;
- reconnaissance navigateur si disponible ;
- synthèse vocale locale ;
- suppression de la dépendance payante.

## [1.1.x] — Builds 5–6

- expérimentation OpenAI Realtime / Vercel ;
- abandonnée pour rester à 0 € ;
- fichiers retirés de `main`.

## [1.0.3] — Build 4

- voix iPhone-first ;
- diagnostic/sélection de voix.

## [1.0.2] — Build 3

- DEBUG FR local.

## [1.0.1] — Build 2

- verrouillage anti-traduction automatique ;
- interface vietnamienne préservée.

## [1.0.0] — Build 1

- première PWA ;
- leçon 1 ;
- progression locale ;
- révision ;
- conversation guidée ;
- audio navigateur ;
- offline / GitHub Pages.
