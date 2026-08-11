# French Trân’quille — NEXT UX PASS

Statut : **BUILD 25 CLOS / SUITE PLANIFIÉE**  
Date terrain : **2026-08-11**

## Build 25 — Progression UX — ✅ LIVRÉ

`Parcours` utilise désormais une logique de progressive disclosure : résumé simple, détails à la demande, seulement 5 leçons visibles par défaut et les 40 disponibles volontairement.

Le contrat l8 et les moteurs Memory/Mastery restent intacts. Voir `docs/BUILD-25-PROGRESSION-UX.md`.

---

# Build 25.1 — Listening Slow Calibration — PROCHAIN

État courant :

```text
normal = 0.88
lent   = 0.68
```

Retour terrain : lent reste un peu rapide.

Candidat suivant :

```text
normal = 0.88
lent   = 0.64
```

`0.62` seulement si le prochain test iPhone montre que 0.64 reste trop rapide.

Contraintes : même voix, même pitch, normal inchangé, `voice-ios.js` sanctuarisé, aucune donnée apprenante touchée.

---

# Build 25.2 — Session Goals / Milestones / App Delight

## Problème transversal

Les écrans d’entraînement peuvent encore ressembler à des tunnels : on sait quoi faire, mais pas toujours combien, quand c’est fini et où aller ensuite.

## Contrat commun

```text
AVANT   → objectif court
PENDANT → progression visible
FIN     → réussite explicite
APRÈS   → sortie logique
```

Cibles indicatives :

```text
Listening         5 questions
Révision mémoire  5 éléments
Scenario           1 situation
Vocal guidé        5 réponses
Leçon              fin renforcée
```

Continuer après réussite reste un choix secondaire.

## Succès premium

Barre à 100 %, coche, glow mint/lilas, petit pulse Lucie/logo, transition courte 400–800 ms. `prefers-reduced-motion` respecté. Pas de son forcé, XP, monnaie, classement ou confettis permanents.

## Milestones utiles

- première leçon terminée ;
- première réponse vocale reconnue ;
- première session Listening ;
- première situation réelle ;
- premier rappel réussi ;
- 10 / 25 / 50 acquis consolidés ;
- fin de bloc A0 / A1 ;
- première session sans aide si cette preuve existe réellement.

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

Une fois le mode choisi, un seul moteur occupe l’écran.

## Home / Séance du jour

Afficher priorité + prochaine leçon + éventuellement une pratique courte. Les autres activités derrière un dépliage.

---

# Build 26 — Real Life French III

Repoussé derrière les passes UX. Plus de français réel, moins de roulettes, aucun nouveau bouton principal.

---

# Règle générale

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