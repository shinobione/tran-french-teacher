# French Trân’quille — ROADMAP

> `README.md` = état courant. `CHANGELOG.md` = historique livré. Ici : **ordre, dépendances et critères de clôture**.

## Principes non négociables

1. iPhone / Safari / PWA iOS = cible principale.
2. Navigateur PC et Android = cibles secondaires supportées.
3. Interface utilisable sans connaissances techniques.
4. 0 € d’exploitation récurrente sauf décision explicite.
5. Vietnamien comme soutien ; français augmenté selon les preuves.
6. Oral prioritaire, sans faux diagnostic phonétique.
7. Communication réelle > théorie scolaire.
8. Aucun reset silencieux ; toute migration garde un smoke ancien utilisateur.
9. Un gros build = une intention principale.
10. Chrome headless obligatoire avant merge important.
11. README / CHANGELOG / ROADMAP / ARCHITECTURE synchronisés.
12. Pas de gamification agressive ni clone de chatbot.
13. Un nouveau moteur n’obtient pas automatiquement une nouvelle entrée de navigation.
14. **Toute surface tappable doit produire un retour visuel immédiat sur mobile.**
15. Le feedback d’un tap doit rester perceptible même si l’action déclenche un rerender ou un changement d’écran.
16. Les trois entrées `Aujourd’hui / Pratiquer / Parcours` gardent des nœuds DOM persistants et exactement un état actif.
17. L’état actif de navigation doit être synchronisé explicitement.
18. **Progressive disclosure** : l’apprenante ne voit pas par défaut tous les moteurs, compteurs et catalogues internes.
19. **Freeze terrain** : pendant une vraie session de Trân, aucun changement runtime sauf incident critique.

---

# Baseline production — v1.17.5 Build 24.5

- 40 leçons / 241 éléments ;
- Scenario 28 / 84 ;
- navigation Aujourd’hui / Pratiquer / Parcours ;
- feedback premium persistant ;
- Pratiquer = vrai écran ;
- header leçon allégé ;
- progression protégée ;
- voix/reconnaissance iPhone baseline validée ;
- coût 0 €.

Microfix post-release Listening livré par PR #29 : séparation réelle **0.88 normal / 0.68 lent** sans modification de `voice-ios.js`.

## État Builds 24.x

- Build 24 — Real Life French II — ✅ INTÉGRÉ
- Build 24.1 — Options Crash — ✅ PROD
- Build 24.2 — Navigation Interaction — ✅ PROD
- Build 24.3 — Premium Interaction UX — ✅ CLOS
- Build 24.4 — Mobile Polish — ✅ INTÉGRÉ, clôturé techniquement par 24.5
- Build 24.5 — Navigation State Sync — ✅ PROD / CLOS
- microfix Listening PR #29 — ✅ PROD, sans bump de version

---

# FREEZE TERRAIN — ACTIF

Trân utilise actuellement la PWA.

Pendant ce freeze :

- aucune modification de code de production ;
- aucun changement de service worker/cache ;
- aucun merge `main` de polish ;
- documentation et préparation uniquement sur branche ;
- exception : crash, perte de données ou blocage critique reproductible.

---

# v1.18.0 — Build 25 — Progression UX / Progressive Disclosure — PROCHAIN

## Pourquoi cette priorité

Les captures terrain du 11/08 montrent que `Parcours` est devenu un écran interminable. La simplification de la navigation principale a réussi, mais la complexité a été déplacée dans un seul écran qui expose trop de modules en continu.

Le problème à résoudre n’est donc pas « ajouter moins de données » mais **mieux hiérarchiser les données existantes**.

## Objectif produit

`Parcours` doit répondre immédiatement à trois questions :

1. **Où j’en suis ?**
2. **Qu’est-ce que j’ai déjà acquis ?**
3. **Quelle est la prochaine étape ?**

Tout le reste doit être secondaire, repliable ou réservé au DEBUG FR.

## Structure cible

### Niveau 1 — visible immédiatement

- position actuelle : leçon / étape / A0-A1 ;
- progression globale simple ;
- 2 à 4 indicateurs maximum : acquis, à revoir, leçons terminées, rythme récent ;
- prochaine étape claire.

### Niveau 2 — cartes repliables

- Mémoire d’apprentissage ;
- Maîtrise ;
- Français réel / situations ;
- Fondations A1 ;
- Listening.

Chaque carte montre **un résumé**, puis `Voir les détails`.

### Niveau 3 — détails avancés

- éléments acquis complets ;
- compteurs par moteur ;
- historique détaillé ;
- parcours 40 leçons complet ;
- diagnostics.

Ces éléments ne doivent plus constituer le flux principal mobile.

## Parcours 40 leçons

Par défaut :

- leçon actuelle ;
- quelques leçons terminées récentes ;
- 3 à 5 prochaines leçons ;
- étapes futures regroupées par bloc A0 / A1 ;
- bouton explicite `Voir tout le parcours` pour développer la liste complète.

Pas de liste de 40 lignes ouverte par défaut sur mobile.

## Critères de clôture Build 25

- première vue de `Parcours` compréhensible sans scroll marathon ;
- informations principales visibles en environ 1 à 2 écrans mobiles ;
- aucune donnée supprimée : seulement hiérarchisée ;
- détails toujours accessibles ;
- DEBUG FR peut exposer davantage d’information que l’interface Trân ;
- bottom bar et feedback premium 24.5 inchangés ;
- aucun reset de progression ;
- test ancien utilisateur ;
- test mobile de hauteur/densité ;
- test ouverture/fermeture des cartes détaillées ;
- test parcours complet accessible à la demande ;
- voix / reconnaissance / logo / favicon sanctuarisés.

Voir `docs/NEXT-UX-PASS.md`.

---

# v1.18.1 — Build 25.1 — Listening Slow Calibration

Petit jalon distinct, uniquement après disponibilité de Trân pour tester.

État actuel :

```text
normal = 0.88
lent   = 0.68
```

Retour terrain : `lent` peut encore descendre légèrement.

Candidat envisagé : **0.62–0.64**, à choisir après écoute comparative sur le même iPhone et la même voix Lucie.

Garde-fous :

- normal reste inchangé ;
- même voix / même pitch ;
- `voice-ios.js` non modifié sauf nécessité démontrée ;
- test explicite prouvant que normal et lent restent distincts ;
- pas de calibration pendant une session réelle.

---

# v1.19.0 — Build 26 — Real Life French III

Anciennement prévu comme Build 25. Il est volontairement repoussé : **on n’ajoute pas de contenu avant d’avoir rendu l’information existante plus respirable**.

Intention conservée : problèmes quotidiens, émotions, explications, français oral courant vs forme écrite et conversation moins guidée.

Toujours derrière `Pratiquer → Parler français`, sans nouveau bouton principal.

---

# v1.20.0 — Build 27 — Data & Recovery Hardening

Sauvegarde/restauration unifiée, migrations sûres/versionnées, snapshot pré-migration, tolérance au localStorage corrompu et tests zéro-perte.

# v1.21.0 — Build 28 — iPhone / PWA / Accessibility Hardening

Safe areas, tactile, contraste, tailles, offline/install, tests iPhone réels et ergonomie faible aisance numérique.

# v1.22.0 — Build 29 — Architecture Hardening

Découpage du vieux noyau uniquement avec snapshots comparatifs avant/après.

# V2.0.0 — Freeze / Release

Release cohérente, sauvegardable, testée, documentée et utilisable sans connaître l’architecture interne.

---

# Backlog secondaire

Vrai avatar Lucie, sons discrets, fiches imprimables, bilan exportable, admin local, mode 5 min, écoute/déplacement, stats hebdo, multi-appareil gratuit si solution sûre.

# Reporté

Backend/API payants, avatar vidéo, XP/classement, gamification agressive, score phonétique pseudo-scientifique, app native tant que la PWA suffit.

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.
