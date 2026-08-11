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
20. **Contrat de session** : chaque activité a un début, un objectif visible, une progression, une fin explicite et une sortie évidente.
21. Aucun écran pédagogique ne doit être un tunnel sans fin.
22. Le plaisir d’utilisation vient de micro-interactions et de réussites observables, pas d’une gamification agressive.

---

# Baseline production avant Build 25

- v1.17.5 — Build 24.5 — Navigation State Sync — PROD / CLOS ;
- baseline fonctionnelle **Build 24 — Real Life French II** ;
- 40 leçons / 241 éléments ;
- Scenario 28 / 84 ;
- bottom bar Aujourd’hui / Pratiquer / Parcours ;
- voix/reconnaissance iPhone validées ;
- progression protégée ;
- coût 0 €.

Microfix Listening PR #29 : **0.88 normal / 0.68 lent** réellement distincts, `voice-ios.js` inchangé.

## État Builds 24.x

- Build 24 — Real Life French II — ✅ INTÉGRÉ
- Build 24.1 — Options Crash — ✅ PROD
- Build 24.2 — Navigation Interaction — ✅ PROD
- Build 24.3 — Premium Interaction UX — ✅ CLOS
- Build 24.4 — Mobile Polish — ✅ INTÉGRÉ, clôturé techniquement par 24.5
- Build 24.5 — Navigation State Sync — ✅ PROD / CLOS
- microfix Listening PR #29 — ✅ PROD

---

# FREEZE TERRAIN

**LEVÉ le 11/08/2026 à 19:10 heure locale.**

Trân a terminé sa session. Les changements runtime peuvent reprendre via branches/PR/CI.

La règle reste active pour les prochaines sessions réelles : pas de polish live pendant qu’elle utilise l’app, sauf incident critique.

---

# v1.18.0 — Build 25 — Progression UX / Progressive Disclosure — EN COURS

## Problème terrain

`Parcours` est devenu un écran interminable. La navigation principale est simple, mais l’écran Progression expose Memory, Mastery, A1, situations, acquis et 40 leçons comme si tout avait la même importance.

## Décision d’architecture

**Ne pas réécrire les moteurs.**

Nouveau module :

```text
progression-ux.js
progression-ux.css
```

Il se charge après les moteurs existants et orchestre leur DOM :

- les cartes techniques restent présentes ;
- elles sont regroupées derrière `Détails d’apprentissage` ;
- le vieux hero/stats reste dans le DOM mais est masqué au profit d’un résumé simple ;
- le curriculum complet reste intact ;
- seulement 5 leçons autour de la position actuelle sont visibles par défaut ;
- `Voir les 40 leçons` révèle la liste complète.

Aucune clé localStorage n’est modifiée.

## Niveau 1 — visible immédiatement

`Parcours` doit répondre en quelques secondes à :

1. Où j’en suis ?
2. Combien ai-je déjà fait ?
3. Combien d’acquis / de choses à revoir ?
4. Quelle est ma prochaine étape ?

Résumé candidat :

- leçon actuelle ;
- progression globale ;
- leçons terminées ;
- acquis ;
- à revoir ;
- CTA `Continuer`.

## Niveau 2 — détails volontaires

Un seul bloc repliable : **Détails d’apprentissage**.

Il contient les cartes déjà générées par :

- Learning Memory ;
- Mastery ;
- A1 Core ;
- autres injecteurs Progress existants.

Les moteurs continuent de fonctionner et de mettre leurs cartes à jour normalement.

## Niveau 3 — parcours complet

Par défaut, autour de la leçon actuelle :

```text
1 leçon récente
leçon actuelle
3 prochaines leçons
```

Puis bouton explicite : **Voir les 40 leçons**.

## Contrat zéro-perte Build 25

Profil synthétique représentatif : l1–l7 terminées, l8 en cours, 40 acquis.

Chrome doit retrouver après boot :

```text
current = l8
completed = 7
known = 40
visible curriculum rows = 5
curriculum total = 40
details open = false
```

Deuxième smoke : 40 lignes accessibles à la demande.

Troisième smoke : cartes Memory / Mastery toujours accessibles derrière les détails.

## Critères de clôture

- v1.18.0 / Build 25 cohérent dans runtime/cache/docs ;
- première vue beaucoup plus courte ;
- aucune liste de 40 ouverte par défaut ;
- détails existants non supprimés ;
- ancienne progression inchangée ;
- bottom bar 24.5 inchangée ;
- branding et voix byte-identiques ;
- quality historique verte ;
- Options verte ;
- nav/mobile verte ;
- nouveau workflow `Progression UX smoke` vert sur PR puis sur `main` ;
- GitHub Pages verte ;
- clôture docs uniquement après preuve prod.

Voir `docs/BUILD-25-PROGRESSION-UX.md` et `docs/NEXT-UX-PASS.md`.

---

# v1.18.1 — Build 25.1 — Listening Slow Calibration

Petit jalon distinct après Build 25.

État actuel :

```text
normal = 0.88
lent   = 0.68
```

Retour terrain : lent encore légèrement rapide.

Ordre d’essai prévu : **0.64**, puis **0.62** seulement si nécessaire.

Garde-fous : normal inchangé, même voix/pitch, `voice-ios.js` sanctuarisé, A/B iPhone.

---

# v1.18.2 — Build 25.2 — Session Goals / Milestones / App Delight

Chaque mode doit suivre :

```text
objectif clair
↓
progression visible
↓
fin explicite
↓
sortie évidente
```

Cibles indicatives :

- Listening : 5 questions ;
- Révision : 5 éléments prioritaires ;
- Scenario : 1 situation complète ;
- vocal guidé : 5 réponses ;
- leçon : fin renforcée et retour logique.

Animations succès premium et sobres : coche, barre 100 %, glow mint/lilas, pulse court Lucie/logo, 400–800 ms, reduced motion respecté.

Milestones uniquement sur progrès réels : première leçon, premier vocal reconnu, première session Listening, première situation, 10/25/50 acquis consolidés, fin de bloc A0/A1.

Aucun XP, monnaie ou classement.

---

# v1.19.0 — Build 26 — Real Life French III

Ancien chantier Build 25 volontairement repoussé derrière les passes UX.

Objectif : problèmes quotidiens, émotions, français oral courant, réponses moins dirigées. Toujours derrière `Pratiquer → Parler français`.

---

# v1.20.0 — Build 27 — Data & Recovery Hardening

Sauvegarde/restauration unifiée, migrations versionnées, snapshot pré-migration, localStorage corrompu toléré, tests zéro-perte.

# v1.21.0 — Build 28 — iPhone / PWA / Accessibility Hardening

Safe areas, tactile, contraste, tailles, offline/install, vrais tests iPhone et ergonomie faible aisance numérique.

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