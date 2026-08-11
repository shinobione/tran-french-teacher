# French Trân’quille — NEXT UX PASS

Statut : **BUILD 25 + 25.1 CLOS / BUILD 25.2 EN COURS**  
Date terrain : **2026-08-11**

## ✅ Build 25 — Progression UX

`Parcours` est compact par défaut : résumé, détails volontaires, 5 leçons visibles autour de la position actuelle, 40 disponibles à la demande.

## ✅ Build 25.1 — Listening Slow Calibration

Production : **0.88 normal / 0.64 lent**. Voix Lucie et `voice-ios.js` inchangés.

---

# Build 25.2 — Session Goals / Milestones / App Delight — EN COURS

## Contrat désormais implémenté dans le candidat

```text
AVANT   → objectif court
PENDANT → progression visible
FIN     → réussite explicite
APRÈS   → sortie logique
```

### Listening

Session standard = **5 questions**. À 5/5, l’exercice cède la place à une vraie fin de session. `Retour à Aujourd’hui` est principal ; `Encore 3 minutes` relance volontairement un lot de 3.

### Révision

Lot borné = jusqu’à **5 éléments prioritaires**. La progression est calculée depuis les écritures réelles de Learning Memory ; l’écran de fin arrive donc après enregistrement.

### Scenario

Objectif = **1 situation complète**. Le compteur de tours existant reste la progression. La fin native est conservée, avec `Retour à Aujourd’hui` mis en avant.

### Vocal guidé

Objectif = **5 réponses reconnues**. `free-voice.js` reste sanctuarisé ; Session UX observe uniquement les succès déjà émis par le moteur.

### Pratique guidée historique

Mini-session = **1 réponse correcte** grâce à un adaptateur basé sur le delta réel de `conversationWins`.

### Leçon

La dernière étape est explicitement annoncée. `app.js` enregistre normalement la leçon, puis la Home affiche une confirmation seulement après retour : la réussite visuelle n’anticipe jamais la sauvegarde.

---

# Pratiquer → Parler français

Le candidat remplace l’empilement par :

```text
Recommandé maintenant
[ Situation réelle • ≈ 3 min ]

Autres façons
[ Répondre à l’oral ]
[ Pratique guidée ]
```

Les moteurs restent dans le DOM mais un seul devient dominant après sélection.

---

# Home / Séance du jour

Le flux principal conserve **2 actions**. Les activités restantes vivent derrière `Voir les autres activités`.

---

# App Delight

- barre de session ;
- coche / glow mint-lilas ;
- pulse court ;
- transitions 400–800 ms ;
- reduced motion ;
- aucun son forcé, XP, monnaie, classement ou casino-confetti.

## Milestones

Clé séparée `french-tranquille:milestones:v1`.

Les acquis déjà atteints au premier démarrage sont enregistrés comme **baseline**, sans notification rétroactive. Les nouveaux franchissements peuvent déclencher une petite carte temporaire.

---

# Tribunal candidat

Nouveau workflow `Build 25.2 Session UX smoke` :

```text
Home       → 2 principales + extras repliés
Practice   → hub unique
Listening  → 5/5 → Session terminée
Review     → lot borné → Révision terminée
```

Tous les anciens tribunaux restent obligatoires : quality, Options, nav-mobile, Progression UX, Listening-rate.

---

# Après Build 25.2

## Build 26 — Real Life French III

Retour au contenu uniquement après clôture de cette passe UX : plus de français réel, moins de roulettes, aucun nouveau bouton principal.

## Puis

- Build 27 — Data & Recovery ;
- Build 28 — iPhone/PWA/Accessibility ;
- Build 29 — Architecture Hardening ;
- V2.0.0 — Freeze / Release.

---

# Règles générales

Avant toute nouvelle UI :

1. Trân a-t-elle besoin de voir cette information maintenant ?
2. L’aide-t-elle à choisir la prochaine action ?
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