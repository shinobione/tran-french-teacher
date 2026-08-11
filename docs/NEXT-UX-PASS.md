# French Trân’quille — NEXT UX PASS

Statut : **PLANIFIÉ / AUCUN CODE EN COURS**  
Date terrain : **2026-08-11**

Ce document transforme les captures et retours d’utilisation réelle en plan de travail. Il ne décrit pas un build déjà livré.

---

# Règle de sécurité immédiate

Trân utilise actuellement l’application.

**Ne rien modifier en production pour le moment.**

Autorisé :

- documentation ;
- analyse ;
- maquettes mentales ;
- préparation de tests ;
- branche non mergée.

Interdit pendant la session :

- patch runtime ;
- cache/service-worker bump ;
- refonte CSS live ;
- migration de données ;
- recalibration audio ;
- merge `main` de polish.

Exception : crash, perte de données ou blocage critique reproductible.

---

# Ce que montrent les captures

## 1. Parcours / Progression — priorité P0

L’écran est devenu **beaucoup trop long**.

Il enchaîne des informations utiles mais de niveaux différents :

- position actuelle ;
- niveau ;
- compteurs ;
- Learning Memory ;
- rythme ;
- plusieurs cartes Mastery ;
- situations réelles ;
- fondations A1 ;
- éléments acquis ;
- détails A1 ;
- liste du parcours complet.

Le problème n’est pas la quantité de données disponible. Le problème est que **tout est traité comme contenu principal**.

Effet mobile :

- scroll interminable ;
- difficulté à comprendre ce qui compte vraiment ;
- sensation de dashboard technique ;
- risque que Trân lise des indicateurs destinés surtout au moteur ou au DEBUG comme s’ils étaient des tâches à accomplir.

### Cible

Au premier affichage, Parcours doit tenir mentalement en trois blocs :

```text
OÙ TU EN ES
↓
CE QUI EST SOLIDE / À REVOIR
↓
CE QUI VIENT ENSUITE
```

Le reste devient repliable.

---

## 2. Conversation / Pratique — priorité P1

Les captures montrent plusieurs outils empilés verticalement sur le même écran :

- `Parler en situation` ;
- `Entraînement vocal guidé` ;
- bloc Lucie / pratique guidée ;
- rappel `Entraînement vocal gratuit`.

Chaque module pris séparément a du sens. Ensemble, ils créent une page qui demande implicitement :

> « Lequel de ces quatre systèmes dois-je utiliser ? »

Ce choix ne doit pas reposer sur Trân.

### Cible

`Pratiquer → Parler français` doit commencer par **une seule décision simple** ou, mieux, une recommandation de Lucie :

```text
Recommandé maintenant
[ Situation réelle — 3 min ]

Autres façons de pratiquer
[ Répéter une phrase ]
[ Pratique libre guidée ]
```

Une fois un mode choisi, **un seul moteur occupe l’écran**.

Ne plus afficher tous les moteurs en pile permanente.

---

## 3. Home / Séance du jour — priorité P1

La Home est beaucoup plus claire qu’avant, mais `Séance du jour` peut encore devenir longue lorsque plusieurs actions sont proposées.

### Cible

Afficher en priorité :

1. l’action la plus importante ;
2. la prochaine leçon ;
3. éventuellement une pratique courte.

Puis :

```text
Voir les autres activités du jour
```

Pas besoin de montrer quatre grandes lignes si deux suffisent immédiatement.

---

## 4. Listening — priorité P2

Le layout est globalement lisible.

Retour audio :

```text
normal = 0.88
lent   = 0.68
```

Le mode lent pourrait encore être légèrement ralenti.

### Calibration future

Tester plus tard :

```text
0.68
0.64
0.62
```

Même phrase, même iPhone, même voix Lucie.

Le but n’est pas « le plus lent possible » mais **plus facile à segmenter tout en restant naturel**.

Aucun changement pendant la session actuelle.

---

## 5. Sessions sans but clair — priorité P0

Le screenshot Listening révèle un autre problème transversal : l’écran montre l’exercice, les catégories et les tentatives, mais l’utilisatrice ne sait pas immédiatement :

- combien d’exercices constituent une session ;
- combien il en reste ;
- quand elle peut considérer le travail terminé ;
- ce qui se passe à la fin ;
- comment sortir proprement sans avoir l’impression d’abandonner.

Un entraînement ne doit pas être un flux potentiellement infini.

### Cible

Chaque mode doit afficher un **objectif court et fini** :

```text
Session d’écoute
Objectif : 5 questions
2 / 5 terminées
Encore 3
```

À `5 / 5`, l’app doit produire un véritable état de fin :

```text
✓ Session terminée
4 réussites
1 élément à revoir

[ Retour à Aujourd’hui ]
[ Encore 3 minutes ]
```

Le deuxième bouton est volontairement secondaire.

---

# Build 25 — Progression UX / Progressive Disclosure

## Écran Parcours cible

### Hero compact

- `Tu es à la leçon X` ;
- étape A0/A1 ;
- barre globale ;
- prochaine leçon.

### Résumé apprentissage

Maximum 3 ou 4 valeurs :

- leçons terminées ;
- acquis solides ;
- à revoir ;
- jours récents / rythme.

### Cartes synthèse

Exemple :

```text
🧠 Mémoire
10 acquis • 1 à revoir
[Voir détails]

🎧 Compréhension orale
8 essais • 75 %
[Voir détails]

🎭 Situations réelles
1 disponible maintenant
[Voir détails]
```

Pas de sous-dashboard complet tant que `Voir détails` n’a pas été demandé.

### Parcours pédagogique

Par défaut :

- 2–3 dernières leçons terminées ;
- leçon actuelle ;
- 3–5 prochaines ;
- blocs futurs résumés.

Puis :

```text
Voir les 40 leçons
```

La liste complète existe toujours mais n’est plus le mode par défaut.

---

# Build 25 — critères UX mesurables

1. Une utilisatrice peut comprendre son état sans connaître les mots `Memory`, `Mastery`, `Error Intelligence` ou `Adaptive`.
2. Le contenu principal de Parcours tient dans environ **1 à 2 hauteurs d’écran mobile** avant les détails volontaires.
3. Aucune liste de 40 leçons ouverte par défaut.
4. Aucune suppression de données ou de capacités.
5. Les détails restent accessibles en 1 tap.
6. DEBUG FR peut montrer davantage de métriques que l’interface normale.
7. Les cartes repliables ont un feedback tactile premium identique au reste de l’app.
8. Bottom bar 24.5 inchangée.
9. Progression ancienne utilisatrice inchangée après ouverture/fermeture de tous les détails.
10. Test mobile vérifie la hauteur du résumé et l’accès à `Voir tout`.

---

# Build 25.1 — Listening Slow Calibration

Petit jalon après Build 25 ou dès qu’une fenêtre de test terrain existe.

À ne pas coupler à une grosse refonte.

Décision uniquement après A/B iPhone.

Candidat probable : **0.64** d’abord, puis **0.62** seulement si 0.64 reste trop rapide.

---

# Build 25.2 — Session Goals / Milestones / App Delight

## But

Faire en sorte que French Trân’quille soit non seulement simple à comprendre, mais aussi **agréable à terminer**.

Une activité pédagogique doit donner quatre repères :

```text
1. Je sais ce que je vais faire.
2. Je sais où j’en suis.
3. Je sais quand j’ai terminé.
4. Je sais quoi faire ensuite.
```

## Contrat de session commun

Chaque activité principale reçoit :

- un objectif court ;
- une progression visible ;
- une estimation simple si pertinente (`≈ 3 min`) ;
- une sortie claire ;
- un état de fin explicite.

Pas besoin de demander à Trân de choisir elle-même une taille de session. Lucie propose une petite dose adaptée.

### Cibles indicatives

À valider lors de l’implémentation :

```text
Listening         5 questions
Révision mémoire  5 éléments prioritaires
Scenario           1 situation complète
Vocal guidé        5 réponses
Leçon              étapes finies déjà existantes
```

Une fois la cible atteinte, continuer devient un **choix**, jamais la condition pour que la session soit comptée.

## État de succès

Le succès doit être visible mais calme :

- barre qui atteint 100 % ;
- petite coche ;
- glow mint/lilas court ;
- avatar/logo qui pulse légèrement ;
- résumé de session qui remplace proprement l’exercice.

Durée cible de l’animation : **400 à 800 ms**.

Aucun son forcé, aucune pluie de confettis, aucune attente artificielle avant de pouvoir sortir.

`prefers-reduced-motion` coupe ou simplifie l’animation.

## Milestones

Utiliser des étapes qui racontent une progression réelle :

- première leçon terminée ;
- première réponse vocale reconnue ;
- première session Listening ;
- première situation réelle ;
- premier acquis rappelé correctement en révision ;
- 10 / 25 / 50 acquis consolidés ;
- fin d’un bloc A0 / A1 ;
- première session réalisée sans aide lorsque cette information est réellement observable.

Les milestones apparaissent ponctuellement puis disparaissent. Ils ne doivent pas créer un deuxième dashboard de badges.

## Interface plus attractive sans bazar

Quelques règles :

- une action principale par écran ;
- un seul message pédagogique prioritaire ;
- titres courts et cohérents ;
- retours et sorties placés toujours de la même manière ;
- espaces plus généreux lorsque l’écran devient dense ;
- couleurs utilisées pour guider, pas décorer chaque carte ;
- animation seulement lorsqu’elle explique une transition, un appui ou une réussite ;
- statistiques techniques cachées derrière les détails ;
- aucun compteur sans signification claire pour Trân.

L’objectif est une application qui **donne envie de continuer parce qu’on comprend toujours ce qui se passe**.

## Critères de test

- aucun exercice principal n’affiche une session sans cible ;
- démarrage → progression → réussite → sortie testés en mobile ;
- le bouton principal après succès mène à une destination logique ;
- `Continuer` reste secondaire après une session terminée ;
- aucun état apprenant perdu lors d’une sortie immédiate après succès ;
- animation de succès < 1 s ;
- reduced motion validé ;
- aucun XP, monnaie ou classement introduit ;
- ancienne progression préservée.

---

# Build 26 — Real Life French III

Le contenu prévu n’est pas abandonné.

Il est **repoussé** derrière la simplification UX et la mise en place de sessions clairement bornées.

Raison : ajouter encore des scénarios avant de réduire la densité des écrans amplifierait le problème observé.

Le principe reste : plus de français réel, moins de roulettes, aucun nouveau bouton principal.

---

# Principe général à conserver ensuite

> **Ajouter une capacité au moteur ne doit pas ajouter automatiquement une carte permanente à l’écran.**

Avant toute nouvelle UI, poser trois questions :

1. Trân a-t-elle besoin de voir cette information maintenant ?
2. Cette information l’aide-t-elle à décider de la prochaine action ?
3. Peut-elle vivre derrière `Voir détails` sans perte pédagogique ?

Si la réponse à 3 est oui, elle reste derrière `Voir détails`.

Et avant tout nouvel exercice, poser quatre autres questions :

1. Quel est le but de cette session ?
2. Comment Trân voit-elle qu’elle avance ?
3. Quel événement signifie clairement `terminé` ?
4. Où l’application l’emmène-t-elle ensuite ?

Si une de ces réponses manque, l’expérience n’est pas terminée.

---

# Sanctuaires pendant la future refonte

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

La prochaine refonte doit **réorganiser l’affichage et clarifier les sessions, pas réinventer les moteurs**.
