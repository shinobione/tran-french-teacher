# French Trân’quille — NEXT UX PASS

Statut : **BUILD 25 + 25.1 CLOS / BUILD 25.2 PROCHAIN**  
Date terrain : **2026-08-11**

## ✅ Build 25 — Progression UX

`Parcours` est désormais compact par défaut : résumé simple, détails à la demande, 5 leçons visibles autour de la position actuelle et 40 disponibles volontairement.

## ✅ Build 25.1 — Listening Slow Calibration

Production :

```text
normal = 0.88
lent   = 0.64
```

`voice-ios.js`, pitch et voix Lucie inchangés. `0.62` reste uniquement un candidat futur si un nouveau test iPhone le justifie.

---

# Build 25.2 — Session Goals / Milestones / App Delight — PROCHAIN

## Problème transversal

Les écrans d’entraînement peuvent encore ressembler à des tunnels : on sait quoi faire, mais pas toujours combien, quand c’est fini et où aller ensuite.

## Contrat commun

```text
AVANT   → objectif court
PENDANT → progression visible
FIN     → réussite explicite
APRÈS   → sortie logique
```

Cibles candidates :

```text
Listening          5 questions
Révision mémoire   jusqu’à 5 éléments prioritaires
Scenario            1 situation complète
Vocal guidé         5 réponses
Leçon               fin renforcée
```

Continuer après réussite est un choix secondaire.

## Succès premium

Barre 100 %, coche, glow mint/lilas, petit pulse Lucie/logo, 400–800 ms, `prefers-reduced-motion` respecté. Pas de son forcé, XP, monnaie, classement ou confettis permanents.

## Milestones utiles

- première leçon terminée ;
- première réponse vocale reconnue ;
- première session Listening ;
- première situation réelle ;
- premier rappel réussi ;
- 10 / 25 / 50 acquis consolidés ;
- fin de bloc A0 / A1 ;
- première session sans aide si réellement observable.

## Conversation / Pratiquer

Ne plus empiler en permanence Situation réelle + Vocal guidé + Lucie pratique + rappel vocal.

Cible :

```text
Recommandé maintenant
[ Situation réelle — 3 min ]

Autres façons
[ Répéter une phrase ]
[ Pratique guidée ]
```

Une fois le mode choisi, un seul moteur domine l’écran.

## Home / Séance du jour

Afficher priorité + prochaine leçon + éventuellement une pratique courte. Les autres activités derrière un dépliage.

## Règle d’implémentation

Préférer une **Session UX layer** indépendante qui observe/orchestre les moteurs actuels plutôt que de réécrire voix, Memory, Scenario ou Listening.

---

# Build 26 — Real Life French III

Repoussé derrière les passes UX. Plus de français réel, moins de roulettes, aucun nouveau bouton principal.

---

# Règles générales

Avant toute nouvelle UI :

1. Trân a-t-elle besoin de voir cette information maintenant ?
2. L’aide-t-elle à décider de la prochaine action ?
3. Peut-elle rester derrière `Voir détails` ?

Avant tout exercice :

1. Quel est le but ?
2. Comment voit-elle qu’elle avance ?
3. Qu’est-ce qui signifie `terminé` ?
4. Où va-t-elle ensuite ?

Si une réponse manque, l’expérience n’est pas terminée.

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
bottom navigation interaction baseline
```

La suite clarifie l’expérience ; elle ne réinvente pas les moteurs.