# French Trân’quille — NEXT UX PASS

Statut : **BUILDS 25 / 25.1 / 25.2 / 26 / 26.1 CLOS**  
Date terrain : **2026-08-11**

## ✅ Build 25 — Progression UX

`Parcours` est compact par défaut : résumé, détails volontaires, 5 leçons visibles autour de la position actuelle, 40 disponibles à la demande.

## ✅ Build 25.1 — Listening Slow Calibration

Production : **0.88 normal / 0.64 lent**. Voix Lucie et `voice-ios.js` inchangés.

## ✅ Build 25.2 — Session Goals / Milestones / App Delight

Les activités ont un objectif, une progression, une fin et une sortie. Practice Hub n’expose qu’un moteur dominant et Home garde deux actions principales.

## ✅ Build 26 — Real Life French III

Production : **8 situations / 24 tours**, Scenario **36 / 108**, français oral naturel côté interlocuteur, variantes simples déterministes côté Trân.

## ✅ Build 26.1 — Voice Self-Playback + Learning Details Dashboard

Deux retours terrain sont fermés :

### Entendre sa propre production

Après une réponse vocale reconnue :

```text
🎧 Écoute-toi
[ M’enregistrer pour me réécouter ]
        ↓
prise locale courte
        ↓
[ Réécouter ma voix ] [ Refaire ]
```

La prise est temporaire, locale, sans upload ni persistance et ne compte pas comme nouvelle tentative pédagogique. La capture simultanée exacte du premier essai reste reportée jusqu’à un vrai test iPhone.

### Détails d’apprentissage non stackés

```text
🧠 Mémoire & révisions   🎯 Maîtrise
🎧 Compréhension orale   🎭 Français réel
🧩 A1 & rythme
```

Une tuile = un résumé court. **Une seule famille détaillée est ouverte à la fois.** Les vraies cartes historiques restent gérées par leurs moteurs.

### Livraison

PR #40 : les 8 workflows applicatifs ont terminé SUCCESS.

`main` `8ad7e5eb9cb2f64c58c086847c3e035463ab3ba3` : les 8 workflows applicatifs ont de nouveau terminé sans échec et Pages #98 a terminé SUCCESS.

---

# Prochaine passe

## Build 27 — Data & Recovery Hardening

Priorité désormais à la protection des données réelles : sauvegarde/restauration cohérente, migrations versionnées, snapshot avant migration, tolérance au localStorage corrompu et tests zéro-perte.

Puis :

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

La suite clarifie et sécurise l’expérience ; elle ne réinvente pas les moteurs.