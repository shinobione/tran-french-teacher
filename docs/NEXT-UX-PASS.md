# French Trân’quille — NEXT UX PASS

Statut : **BUILDS 25 / 25.1 / 25.2 CLOS — BUILD 25.3 EN COURS**  
Date terrain : **2026-08-11**

## ✅ Build 25 — Progression UX

`Parcours` est compact par défaut : résumé, détails volontaires, 5 leçons visibles autour de la position actuelle, 40 disponibles à la demande.

## ✅ Build 25.1 — Listening Slow Calibration

Production : **0.88 normal / 0.64 lent**. Voix Lucie et `voice-ios.js` inchangés.

## ✅ Build 25.2 — Session Goals / Milestones / App Delight

Les activités utilisent désormais le contrat :

```text
objectif → progression → fin → sortie
```

Listening = 5 questions ; Révision = jusqu’à 5 éléments ; Scenario = 1 situation ; Vocal guidé = 5 réponses ; pratique guidée = 1 réponse correcte. Practice Hub et Home compact sont en production.

---

# Build 25.3 — Voice Self-Playback + Learning Details Dashboard — EN COURS

## Retour terrain 1 — s’entendre parler

Trân signale une fonction utile présente dans d’autres apps de langue : **réécouter sa propre voix** après avoir parlé.

Le candidat ne touche pas à la reconnaissance validée. Après une transcription vocale :

```text
Lucie / reconnaissance terminée
        ↓
🎧 Écoute-toi
        ↓
[ M’enregistrer pour me réécouter ]
        ↓
prise locale courte
        ↓
[ Réécouter ma voix ] [ Refaire ]
```

Pourquoi une seconde prise : la priorité reste de ne jamais perturber `SpeechRecognition` sur iPhone. La capture exacte simultanée du premier essai attend un vrai test appareil.

Contrat : local, temporaire, aucun upload, aucune sauvegarde et aucun effet sur Memory/Error/Mastery.

## Retour terrain 2 — Détails d’apprentissage encore trop longs

Build 25 a replié la complexité, mais l’ouverture du bloc révélait encore toutes les cartes l’une sous l’autre.

Le candidat les groupe maintenant :

```text
🧠 Mémoire & révisions   🎯 Maîtrise
🎧 Compréhension orale   🎭 Français réel
🧩 A1 & rythme
```

Une tuile = un résumé court. **Une seule famille détaillée est ouverte à la fois.**

Les vraies cartes historiques restent dans le DOM : on réorganise l’affichage, on ne duplique ni ne réécrit les moteurs.

---

# Tribunal Build 25.3

Nouveau workflow :

```text
Build 25.3 Voice replay + Details dashboard smoke
```

Il prouve :

- replay sans réseau ni persistance ;
- voix/reconnaissance sanctuarisées ;
- dashboard avec plusieurs groupes ;
- Memory et Mastery toujours présents ;
- une seule famille active ;
- surface replay visible après un résultat vocal.

Les anciens tribunaux restent obligatoires : quality, Options, nav-mobile, Progression UX, Listening-rate, Session UX.

---

# Après Build 25.3

## Build 26 — Real Life French III

Retour au contenu : plus de français oral réel, réponses légèrement plus libres mais déterministes, aucun nouveau bouton principal.

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
4. Si elle ouvre les détails, sont-ils groupés par intention plutôt qu’empilés par moteur ?

Avant tout exercice :

1. Quel est le but ?
2. Comment voit-elle qu’elle avance ?
3. Qu’est-ce qui signifie `terminé` ?
4. Où va-t-elle ensuite ?
5. Si elle parle, peut-elle utilement se comparer au modèle sans perturber la reconnaissance ?

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