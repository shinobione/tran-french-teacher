# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version production

- **v1.19.8**
- **Build 26.8 — Progress Focus Flow**
- statut : **✅ PROD / réécoute iPhone à valider terrain**
- commit runtime production : `1084e1d71a7aebbf6d7dcea9dfa0cabb44f6cbe1`
- PR runtime : **#56**
- GitHub Pages runtime : **#112 SUCCESS**
- tribunal runtime : **14 workflows fonctionnels / 14 SUCCESS + Pages SUCCESS**
- calibration Listening : **0.88 normal / 0.65 lent**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **36 situations / 108 tours**
- coût : **0 €**

## 🧭 Build 26.8 — une intention prend l’écran

Build 26.7 avait réparé la géométrie de `Parcours`, mais le retour terrain montrait encore un écran trop long : Résumé, Curriculum, tuiles Détails, famille active et cartes moteur restaient tous présents dans le même document.

Build 26.8 remplace ce comportement « parchemin » par un **Focus Flow réversible**.

### Vue normale

`Parcours` reste compact :

```text
Résumé
+ curriculum autour de la position actuelle
+ Détails d’apprentissage repliables
```

### Clic sur une famille Détails

Un clic sur `Mémoire`, `Maîtrise`, `Compréhension orale`, `Français réel`, `A1 & rythme` ou `Autres détails` déclenche :

```text
vue compacte
→ fade-out court
→ le contexte inutile disparaît
→ la famille choisie prend toute la surface Progress
→ Retour aux détails
→ fade-in de la vue précédente
```

Sur grand desktop, la surface Focus peut utiliser jusqu’à **1420 px** de shell et les cartes détaillées passent en deux colonnes. Sur écran plus étroit et sur iPhone, elles repassent proprement en une colonne.

### `Voir tout le parcours`

Ce bouton devient lui aussi un vrai changement de contexte :

```text
Résumé + Détails disparaissent
→ Curriculum pleine largeur
→ 5 étapes visibles
→ leçons de l’étape active
→ Retour au résumé
→ vue compacte restaurée à 5 lignes
```

Les **40 leçons restent accessibles**, mais ne sont jamais affichées simultanément.

### Mouvement

Les transitions utilisent un fade / léger déplacement court. `prefers-reduced-motion: reduce` supprime l’animation sans modifier le comportement fonctionnel.

Le mouvement est purement cosmétique : l’état logique est validé indépendamment de la fin du fade, afin qu’un clic rapide ne puisse pas laisser l’interface entre deux vues.

## ✅ Preuves navigateur Build 26.8

Le tribunal Chrome ne vérifie pas seulement des classes CSS.

Il exécute réellement :

```text
vue compacte
→ Memory focus
→ retour
→ Curriculum focus
→ retour
→ 5 lignes compactes restaurées
```

Sur desktop `1640×900`, les deux surfaces Focus mesurent **920 px** dans le viewport de test et n’ont aucun overflow horizontal.

Le workflow vérifie aussi un focus Détails en viewport mobile `390×844` : une seule colonne, toolbar retour visible, largeur utile au-dessus du seuil mobile et aucun overflow horizontal.

## 🛡️ Build 26.6 et 26.7 restent des contrats actifs

Build 26.8 ne remplace pas leurs protections.

### Build 26.6 — containment / anti-photocopieuse

```text
Dashboard après quiescence : 12 cartes
3 secondes plus tard       : 12 cartes
Autres détails             : borné
cartes moteur              : uniques
```

Les cartes Memory / Mastery / Listening / Scenario restent dans la frontière DOM historique où leurs moteurs savent les retrouver. Build 26.8 **ne clone ni ne reparent** ces cartes.

### Build 26.7 — géométrie de sécurité

Le garde-fou qui empêchait Détails d’écraser le parcours reste actif et version-forward. Les tests wide/compact continuent à mesurer la géométrie réelle.

## 🧠 Curriculum et Détails

Curriculum : **40 leçons / 241 éléments**, organisé en cinq étapes :

1. Survie A0 — 1–7 ;
2. Vie quotidienne — 8–15 ;
3. Fondations A1 — 16–20 ;
4. Premiers échanges — 21–25 ;
5. A1 Core — 26–40.

Détails d’apprentissage :

```text
🧠 Mémoire & révisions
🎯 Maîtrise
🎧 Compréhension orale
🎭 Français réel
🧩 A1 & rythme
⋯ Autres détails
```

Une seule famille détaillée possède l’écran à la fois.

## 🎙️ Réécouter sa propre voix — gate terrain toujours ouvert

Build 26.1 reste actif. Après une réponse vocale reconnue, Trân peut faire une **seconde prise locale volontaire** pour s’écouter.

Contrat : aucun upload, aucune persistance audio, capture locale bornée, et aucun événement pédagogique créé par l’auto-écoute.

Gate réel iPhone restant :

```text
réponse reconnue
→ seconde prise locale
→ réécoute correcte
→ réponse vocale suivante toujours reconnue normalement
```

La capture automatique exacte du premier essai reste hors scope tant que cette coexistence n’est pas prouvée sur le vrai iPhone.

## 👩‍🏫 Tyffany et compatibilité

**Tyffany** reste le nom visible de la professeure. Les identifiants techniques historiques (`LucieVoice`, `luc-*`, `lucie-*`) restent volontairement inchangés.

Sanctuaires :

- learner : `francais-avec-luc:learner:v1` ;
- Learning Memory / Scenario / Listening existants ;
- `voice-ios.js` ;
- `free-voice.js` ;
- logo et favicon ;
- Progression UX Build 25 ;
- Session UX Build 25.2 ;
- Real Life French III Build 26 ;
- Voice Replay + Details Dashboard Build 26.1 ;
- Progress Dashboard Containment Build 26.6 ;
- Progress Open-Details Geometry Build 26.7 ;
- aucune migration learner/Memory/Scenario/Listening dans Build 26.8.

### Baseline historique protégée

Le contrat **v1.17.0 — Build 24 — Real Life French II** reste explicitement conservé : avant Real Life III, Scenario comptait **28 situations / 84 tours**.

## CI / production

PR runtime **#56** : **14/14 workflows fonctionnels SUCCESS**.

Production runtime `1084e1d71a7aebbf6d7dcea9dfa0cabb44f6cbe1` :

- **14/14 workflows fonctionnels SUCCESS** ;
- **GitHub Pages #112 SUCCESS** ;
- aucun workflow en échec ou en cours après certification.

## Suite

1. **Gate terrain iPhone Build 26.1** — auto-écoute puis reconnaissance suivante.
2. **Build 27 — Data & Recovery Hardening**.
3. **Build 28 — iPhone / PWA / Accessibility Hardening**.
4. **Build 29 — Architecture Hardening**.
5. **V2.0.0 — Freeze / Release**.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-26-6-PROGRESS-DASHBOARD-CONTAINMENT.md`, `docs/BUILD-26-7-PROGRESS-OPEN-GEOMETRY.md` et `docs/BUILD-26-8-PROGRESS-FOCUS-FLOW.md`.
