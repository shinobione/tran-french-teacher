# French Trân’quille — NEXT UX PASS

Statut : **BUILD 25 EN COURS / SUITE PLANIFIÉE**  
Date terrain : **2026-08-11**

Ce document traduit les retours d’utilisation réelle en ordre de travail.

---

# Freeze terrain

Le freeze est **LEVÉ** : Trân a terminé sa session.

La règle reste permanente : pendant une utilisation réelle, aucune modification runtime/cache sauf crash, perte de données ou blocage critique.

---

# 1. Parcours / Progression — P0 — BUILD 25 EN COURS

## Observation

L’écran est devenu beaucoup trop long : position, niveau, Learning Memory, Mastery, A1, situations, acquis et 40 leçons s’empilent comme si tout était une tâche à lire.

## Cible

Au premier affichage :

```text
OÙ TU EN ES
↓
CE QUI COMPTE MAINTENANT
↓
CE QUI VIENT ENSUITE
```

Le reste est accessible volontairement.

## Implémentation candidate

`progression-ux.js` orchestre les cartes existantes :

- résumé simple en tête ;
- vieux hero/stats masqués, pas supprimés ;
- cartes techniques regroupées dans `Détails d’apprentissage` ;
- 5 leçons autour de la position actuelle visibles par défaut ;
- bouton `Voir les 40 leçons` ;
- aucune migration de données.

Tests dédiés : compact / expanded / details sur profil synthétique leçon 8.

---

# 2. Conversation / Pratique — P1

## Observation

`Parler français` peut encore empiler :

- situation réelle ;
- entraînement vocal guidé ;
- pratique guidée Lucie ;
- rappel vocal gratuit.

## Cible future

Une recommandation principale, puis quelques alternatives :

```text
Recommandé maintenant
[ Situation réelle — 3 min ]

Autres façons
[ Répéter une phrase ]
[ Pratique guidée ]
```

Une fois un mode choisi, un seul moteur occupe l’écran.

Ce chantier sera intégré au travail **Build 25.2 App Delight / Session Goals**, pas au Build 25 actuel afin de garder un gros build = une intention.

---

# 3. Home / Séance du jour — P1

La Home est nettement meilleure mais `Séance du jour` peut encore montrer trop d’actions.

Cible : action prioritaire + prochaine leçon + éventuellement une pratique courte, puis `Voir les autres activités`.

À traiter avec Build 25.2.

---

# 4. Listening — P2 — Build 25.1

État :

```text
normal = 0.88
lent   = 0.68
```

Retour terrain : lent pourrait encore descendre légèrement.

A/B prévu :

```text
0.68
0.64
0.62
```

Même iPhone, même voix, même phrase. Premier candidat : **0.64**.

---

# 5. Sessions sans but clair — P0 — Build 25.2

## Problème

Dans Listening et plusieurs entraînements, l’utilisatrice peut ne pas savoir :

- combien elle doit faire ;
- combien il reste ;
- quand la session est terminée ;
- comment sortir sans avoir l’impression d’abandonner.

## Contrat de session

Chaque activité doit avoir :

```text
AVANT  → objectif
PENDANT → progression
FIN → réussite explicite
APRÈS → destination claire
```

Cibles indicatives :

```text
Listening         5 questions
Révision mémoire  5 éléments
Scenario           1 situation
Vocal guidé        5 réponses
Leçon              étapes déjà bornées
```

## Succès premium

Autorisé : barre 100 %, coche, glow mint/lilas, pulse discret Lucie/logo, 400–800 ms.

Interdit : XP, monnaie, classement, confettis permanents, son forcé.

Milestones significatifs : première leçon, premier vocal reconnu, première session Listening, première situation, premier rappel réussi, 10/25/50 acquis consolidés, fin de bloc A0/A1.

---

# Ordre officiel

1. **v1.18.0 Build 25 — Progression UX** — EN COURS.
2. **v1.18.1 Build 25.1 — Listening Slow Calibration**.
3. **v1.18.2 Build 25.2 — Session Goals / Milestones / App Delight**.
4. **v1.19.0 Build 26 — Real Life French III**.
5. Build 27 — Data & Recovery.
6. Build 28 — iPhone/PWA/Accessibility.
7. Build 29 — Architecture Hardening.
8. V2.0.0 — Freeze / Release.

---

# Sanctuaires

```text
progression de Trân
francais-avec-luc:learner:v1
Learning Memory state
Scenario state
Listening state
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
bottom navigation interaction baseline 24.5
```

La refonte réorganise l’expérience ; elle ne réinvente pas les moteurs.