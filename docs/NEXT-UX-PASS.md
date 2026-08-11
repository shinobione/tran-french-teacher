# French Trân’quille — NEXT UX PASS

Statut : **BUILDS 25 / 25.1 / 25.2 / 26 CLOS — BUILD 26.1 EN COURS**  
Date terrain : **2026-08-11**

## ✅ Build 25 — Progression UX

`Parcours` est compact par défaut : résumé, détails volontaires, 5 leçons visibles autour de la position actuelle, 40 disponibles à la demande.

## ✅ Build 25.1 — Listening Slow Calibration

Production : **0.88 normal / 0.64 lent**. Voix Lucie et `voice-ios.js` inchangés.

## ✅ Build 25.2 — Session Goals / Milestones / App Delight

Les activités ont un objectif, une progression, une fin et une sortie. Practice Hub n’expose qu’un moteur dominant et Home garde deux actions principales.

## ✅ Build 26 — Real Life French III

Production : **8 situations / 24 tours**, Scenario **36 / 108**, français oral naturel côté interlocuteur, variantes simples déterministes côté Trân.

---

# Build 26.1 — Voice Self-Playback + Learning Details Dashboard — EN COURS

## Retour terrain 1 — entendre sa propre production

Trân signale qu’elle aime la possibilité, dans d’autres apps de langue, de réécouter sa propre voix après avoir parlé.

Le candidat conserve d’abord la reconnaissance existante, puis propose :

```text
🎧 Écoute-toi
[ M’enregistrer pour me réécouter ]
        ↓
prise locale courte
        ↓
[ Réécouter ma voix ] [ Refaire ]
```

Cette prise n’est pas une tentative pédagogique supplémentaire. Elle ne modifie ni Memory, ni Error, ni Mastery, ni Session UX.

La capture simultanée exacte du premier essai reste reportée jusqu’à un vrai test iPhone : priorité à la reconnaissance déjà validée.

## Retour terrain 2 — Détails d’apprentissage encore stackés

L’entrée principale reste :

```text
Détails d’apprentissage
```

mais son contenu devient :

```text
🧠 Mémoire & révisions   🎯 Maîtrise
🎧 Compréhension orale   🎭 Français réel
🧩 A1 & rythme
```

Une tuile = un résumé court. **Une seule famille détaillée est ouverte à la fois.**

Les vraies cartes historiques restent dans le DOM et continuent à être gérées par leurs moteurs.

---

# Tribunal Build 26.1

```text
quality
Options
nav-mobile
Progression UX
Listening-rate
Session UX
Real Life III
Build 26.1 Voice replay + Details dashboard
```

Le nouveau smoke doit notamment prouver :

- replay sans réseau ni persistance ;
- voix/reconnaissance sanctuarisées ;
- plusieurs familles de détails ;
- Memory + Mastery toujours présentes ;
- Real Life III toujours 36 / 108 ;
- surface replay après résultat vocal.

---

# Après Build 26.1

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
5. Une aide supplémentaire peut-elle être ajoutée sans toucher au moteur déjà validé ?

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