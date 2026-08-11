# French Trân’quille — CHANGELOG

Ce fichier conserve l’historique des versions livrées. Les intentions futures vivent dans `ROADMAP.md`.

## [Unreleased]

Aucun changement non livré pour le moment.

---

## [1.9.0] — Build 16 — Mastery Engine — 2026-08-11

### Mastery Engine

- ajout d’un moteur local de maîtrise par grandes étapes ;
- distinction entre leçon terminée, élément connu et compétence consolidée ;
- score interne basé sur progression + preuves Learning Memory ;
- états Non commencé / Découverte / Consolidation / Presque solide / Maîtrisé ;
- estimation interne A0 / A0+ / Pré-A1 / A1 en construction ;
- priorité suivante suggérée par Lucie ;
- dashboard de maîtrise dans Progression ;
- résumé de maîtrise sur la home ;
- diagnostic enrichi ;
- aucun statut « Maîtrisé » sans suffisamment de preuves mémoire.

### Gouvernance du projet

- création de `ROADMAP.md` ;
- création de `CHANGELOG.md` ;
- création de `docs/ARCHITECTURE.md` ;
- création de `docs/BUILD-POLICY.md` ;
- README recentré sur l’état réellement en production ;
- politique explicite branche → PR → CI → Chrome → merge → Pages.

### Qualité

- cache PWA `1.9.0-b16` ;
- guards CI Mastery + documentation ;
- vrai Chrome headless vérifiant 25 leçons + Learning Memory + Daily Coach + Mastery Engine ;
- `app.js` historique laissé intact.

> L’indicateur de maîtrise est un outil pédagogique interne et ne constitue pas une certification CECRL.

---

## [1.8.0] — Build 15 — 2026-08-11

### A0 → Early A1

- passage à 25 leçons / 148 éléments ;
- ajout des leçons 16 à 25 ;
- être, avoir, vouloir, pouvoir, il y a ;
- logement, téléphone, météo, courses, petite conversation, présent, questions simples ;
- notes « Structure utile » ;
- parcours en quatre étapes ;
- pratique A1 START dans Conversation.

### Daily Coach

- carte Séance du jour ;
- priorité mémoire → prochaine leçon → conversation ;
- rythme cible 10–15 minutes ;
- carte Rythme conseillé dans Progression.

### Qualité

- pack Stage 2 modulaire ;
- idempotence des décorateurs DOM après détection d’une boucle MutationObserver en CI ;
- Chrome headless et GitHub Pages validés.

---

## [1.7.1] — Build 14 / 14.1 — 2026-08-11

- refonte visuelle Conversation / Révision / Learning Memory ;
- hiérarchie desktop/mobile améliorée ;
- palette enrichie avec retenue ;
- avatar temporaire `L` remplacé par l’icône French Trân’quille.

## [1.7.0] — Build 13 — 2026-08-11

- Learning Memory locale par élément ;
- états Nouveau / Fragile / En cours / Solide ;
- scheduler de révision espacée ;
- priorité aux éléments dus et fragiles ;
- export/import JSON local.

## [1.6.1] — Build 12 — 2026-08-11

- Curriculum UX responsive ;
- liste des leçons bornée et scrollable ;
- colonne desktop sticky ;
- build metadata centralisée.

## [1.6.0] — Build 11 — 2026-08-11

- passage à 15 leçons / 88 éléments A0 ;
- nouvelles situations vie quotidienne ;
- curriculum global accessible au moteur vocal ;
- pratique vocale sur tous les éléments appris.

## [1.5.0] — Build 10 / 10.1 / 10.2

- responsive multi-device ;
- 7 leçons / 40 éléments ;
- watchdog de démarrage ;
- cache-busting ;
- isolation ES modules ;
- ajout du vrai smoke test Chrome headless.

## [1.4.0] — Build 9

- rebranding French Trân’quille ;
- logo + favicon + icône PWA ;
- Luc devient Lucie ;
- amélioration de la sélection de voix française ;
- progression existante préservée.

## [1.3.0] — Build 8

- Guided Free Voice Engine ;
- situations guidées ;
- indices progressifs ;
- fallback clavier ;
- répétition des éléments ratés ;
- aucun faux score de prononciation.

## [1.2.0] — Build 7

- architecture Free Voice ;
- reconnaissance navigateur quand disponible ;
- synthèse vocale locale ;
- validation locale ;
- suppression de la dépendance à une API payante.

## [1.1.x] — Builds 5–6

- expérimentation OpenAI Realtime / Vercel ;
- expérimentation abandonnée afin de conserver un coût d’exploitation nul ;
- fichiers concernés retirés de `main`.

## [1.0.3] — Build 4

- voix iPhone-first ;
- sélection et diagnostic des voix navigateur.

## [1.0.2] — Build 3

- DEBUG FR local pour Jerry ;
- interface de Trân inchangée en vietnamien.

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
- offline / service worker ;
- GitHub Pages.
