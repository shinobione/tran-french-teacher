# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version production

- **v1.19.7**
- **Build 26.7 — Progress Open-Details Geometry**
- statut : **✅ PROD / réécoute iPhone à valider terrain**
- commit runtime production : `eaa4b9f8688a90de85a3f853dc29e59d0b8ac650`
- PR runtime : **#54**
- GitHub Pages runtime : **#110 SUCCESS**
- tribunal runtime : **13 workflows fonctionnels / 13 SUCCESS + Pages SUCCESS**
- calibration Listening : **0.88 normal / 0.65 lent**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **36 situations / 108 tours**
- coût : **0 €**

## 🧯 Build 26.7 — ouvrir Détails ne transforme plus le parcours en code-barres

Une nouvelle vidéo terrain du 12 août 2026 a révélé une régression géométrique distincte du bug de prolifération corrigé en Build 26.6.

Comportement observé :

```text
Détails fermé
→ Progress lisible

Détails ouvert
→ colonne apprenante écrasée
→ textes presque lettre par lettre
→ lignes de leçon transformées en bandes verticales
→ grand vide inutile sous le dashboard
```

### Cause

Build 26.6 avait correctement restauré la frontière DOM historique nécessaire aux moteurs Memory/Mastery/Stage, mais sa grille desktop conservait :

```css
grid-template-columns:minmax(0,.94fr) minmax(440px,1.06fr);
```

La colonne Details avait donc un minimum fixe de **440 px**, tandis que la colonne apprenante pouvait théoriquement descendre jusqu’à zéro. À l’ouverture du dashboard, son contenu intrinsèque pouvait protéger la droite et sacrifier le parcours gauche.

### Correction 26.7

La composition DOM 26.6 reste strictement conservée :

```text
progress-layout
└── progress-ux-composition
    ├── progress-ux-left-flow
    │   ├── Résumé
    │   └── Curriculum
    └── Détails d’apprentissage
```

Sur desktop large, lorsque Détails est ouvert :

```css
grid-template-columns:minmax(0,1fr) minmax(0,1fr);
```

Les deux côtés sont réellement shrinkables et aucun plancher fixe ne peut voler la largeur de l’autre. Le dashboard ouvert passe à **2 tuiles par ligne** pour rester confortable.

Entre **861 et 1040 px**, on ne tente plus de faire rentrer deux colonnes coûte que coûte :

```text
Résumé + Curriculum
↓
Détails
```

Une pile large et lisible vaut mieux que deux colonnes microscopiques.

Mobile `<= 860 px` conserve le comportement Build 26.6.

### Preuves Chrome réelles

Le nouveau workflow ouvre réellement `Parcours → Détails` et mesure les rectangles rendus.

**Viewport 1640×900 :**

```text
composition        920 px
parcours gauche    452 px
Détails            452 px
ligne de leçon min 410 px
dashboard          2 colonnes
côte à côte        oui
overflow horizontal 0
containment 26.6   oui
```

**Viewport 980×900 :**

```text
Détails empilé sous le parcours
parcours gauche    906 px
ligne de leçon min 864 px
overflow horizontal 0
containment 26.6   oui
```

Le build devient rouge si l’ouverture de Détails recommence à écraser la largeur apprenante.

## ✅ Build 26.6 reste intact : anti-photocopieuse + curriculum humain

Build 26.7 ne remplace pas l’architecture de 26.6 ; il la rend géométriquement sûre.

Le contrat anti-prolifération reste sous test permanent :

```text
Dashboard stabilisé : 12 cartes
3 secondes plus tard : 12 cartes
Autres détails : 1
cartes moteur principales : uniques
Résumé/Curriculum dans Details : 0
```

Et les **40 leçons** restent accessibles sans être affichées simultanément :

1. **Survie A0** — leçons 1–7 ;
2. **Vie quotidienne** — leçons 8–15 ;
3. **Fondations A1** — leçons 16–20 ;
4. **Premiers échanges** — leçons 21–25 ;
5. **A1 Core** — leçons 26–40.

Vue normale : **5 lignes**. À la position synthétique l8, la vue complète affiche **8 leçons** dans l’étape courante. A1 Core en affiche **15**. Jamais 40 simultanément.

## 🧠 Détails d’apprentissage

Le dashboard reste groupé par intention :

```text
🧠 Mémoire & révisions
🎯 Maîtrise
🎧 Compréhension orale
🎭 Français réel
🧩 A1 & rythme
⋯ Autres détails
```

Une seule famille détaillée s’ouvre à la fois. Les cartes historiques ne sont pas clonées et restent dans la frontière DOM où leurs moteurs savent les retrouver.

## 👩‍🏫 Tyffany

**Tyffany** reste le nom visible de la professeure. Les identifiants techniques historiques (`LucieVoice`, `luc-*`, `lucie-*`) et la clé learner restent volontairement inchangés pour éviter toute migration risquée.

## 🎙️ Réécouter sa propre voix — gate terrain toujours ouvert

Build 26.1 reste actif. Après une réponse vocale reconnue, Trân peut faire une **seconde prise locale volontaire** pour s’écouter :

```text
🎧 Écoute-toi
[ 🎙️ M’enregistrer pour me réécouter ]
          ↓
[ ▶ Réécouter ma voix ]   [ ↻ Refaire ]
```

Contrat : aucune capture simultanée du premier essai, aucun upload, aucune persistance audio, piste micro stoppée, capture max 9 secondes, aucun événement Memory/Error/Mastery/Session créé par l’auto-écoute.

Gate réel iPhone restant :

```text
réponse reconnue
→ seconde prise locale
→ réécoute correcte
→ réponse vocale suivante toujours reconnue normalement
```

La capture exacte du premier essai reste hors scope tant que cette coexistence n’est pas prouvée.

## 🛡️ Baselines conservées

- learner : `francais-avec-luc:learner:v1` ;
- curriculum : **40 leçons / 241 éléments** ;
- Scenario : **36 situations / 108 tours** ;
- Listening : **0.88 / 0.65** ;
- Progression UX Build 25 ;
- Session UX Build 25.2 ;
- Real Life French III Build 26 ;
- Voice Replay + Details Dashboard Build 26.1 ;
- Click + Listening Rate Build 26.2 ;
- Interaction Stability Build 26.3 ;
- Single-scroll + Tyffany Build 26.4 ;
- Conversation Exit Build 26.5 ;
- Progress Dashboard Containment + Humanized Curriculum Build 26.6 ;
- logo, favicon, `voice-ios.js`, `free-voice.js` sanctuarisés ;
- aucune migration learner/Memory/Scenario/Listening dans Build 26.7.

### Baseline historique protégée

Le contrat **v1.17.0 — Build 24 — Real Life French II** reste explicitement protégé : avant Real Life III, Scenario comptait **28 situations / 84 tours**. Le marqueur historique `real-life-data-2.js` reste conservé dans `docs/ARCHITECTURE.md`.

## CI / production Build 26.7

PR #54 : **13/13 workflows fonctionnels SUCCESS**.

Le tribunal 26.7 ajoute aux anciens contrats :

- ouverture réelle de Détails ;
- largeur gauche/droite mesurée en pixels ;
- largeur minimale des lignes de leçon ;
- absence d’overflow horizontal ;
- dashboard 2 colonnes en desktop large ;
- fallback empilé en desktop compact ;
- containment anti-duplication 26.6 obligatoire.

Production `main` sur `eaa4b9f8688a90de85a3f853dc29e59d0b8ac650` :

- **13/13 workflows fonctionnels SUCCESS** ;
- **GitHub Pages #110 SUCCESS** ;
- aucun workflow en échec, en cours ou en attente après certification.

## Suite

1. **Gate terrain iPhone Build 26.1** : auto-écoute puis reconnaissance suivante.
2. **Build 27 — Data & Recovery Hardening**.
3. **Build 28 — iPhone / PWA / Accessibility Hardening**.
4. **Build 29 — Architecture Hardening**.
5. **V2.0.0 — Freeze / Release**.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-26-6-PROGRESS-DASHBOARD-CONTAINMENT.md` et `docs/BUILD-26-7-PROGRESS-OPEN-GEOMETRY.md`.
