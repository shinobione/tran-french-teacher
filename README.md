# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version production

- **v1.19.9**
- **Build 26.9 — Progress Focus Content Reliability**
- statut : **✅ PROD / réécoute iPhone à valider terrain**
- commit runtime production : `0b31eedb78daebd58dd9bdcb0a472d56250c8fff`
- PR runtime : **#58**
- GitHub Pages runtime : **#114 SUCCESS**
- tribunal runtime : **15 workflows fonctionnels / 15 SUCCESS + Pages SUCCESS**
- calibration Listening : **0.88 normal / 0.65 lent**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **36 situations / 108 tours**
- coût : **0 €**

## 🧭 Build 26.9 — le focus doit contenir du vrai contenu

La vidéo terrain du 12 août 2026 a montré une faiblesse que Build 26.8 ne testait pas assez loin : le **wrapper** du Focus pouvait mesurer environ 920 px tout en affichant une vraie carte trop étroite, ou même une toolbar de famille avec un contenu moteur temporairement invisible.

Build 26.9 ne change pas la pédagogie et ne déplace pas les moteurs. Il rend la conséquence visuelle de l’état actif déterministe :

```text
famille active
→ panneau correspondant visible
→ au moins une vraie carte moteur rendue
→ largeur/hauteur réelles mesurées
→ seulement alors le contenu est considéré prêt
```

Une famille qui ne contient qu’une seule carte utilise désormais toute la largeur du focus au lieu de laisser une demi-page vide.

## ✅ Preuves navigateur 26.9

Le nouveau Chrome desktop `1640×900` ouvre successivement, avec de vrais clics :

```text
Mémoire → retour
Maîtrise → retour
Compréhension orale → retour
Français réel → retour
A1 & rythme → retour
```

Mesures certifiées sur le candidat puis sur le même runtime :

- Mémoire : **3 cartes**, panneau **918 px**, cartes jusqu’à **452 px** ;
- Maîtrise : **2 cartes**, panneau **918 px**, cartes **452 px** ;
- Compréhension orale : **1 carte**, **918 px pleine largeur** ;
- Français réel : **1 carte**, **918 px pleine largeur** ;
- A1 & rythme : **4 cartes**, panneau **918 px**, cartes **452 px** ;
- mobile `390×844` : vraies cartes visibles, une colonne, aucun overflow horizontal.

Le build échoue si une famille Focus n’a plus de vraie carte visible, si sa hauteur retombe à zéro, si une carte unique reste en demi-largeur ou si un overflow horizontal réapparaît.

## 🧠 Build 26.8 reste le Focus Flow

Build 26.9 ne remplace pas le principe livré en 26.8 :

```text
vue compacte
→ clic sur une famille
→ fade court
→ contexte inutile masqué
→ famille active possède l’écran
→ Retour aux détails
→ vue compacte restaurée
```

`Voir tout le parcours` reste un focus Curriculum séparé, avec les 5 étapes et un retour explicite. Le round-trip Chrome `compact → Memory → retour → Curriculum → retour → 5 lignes` reste sous test permanent.

## 🛡️ Baselines encore actives

### Build 26.6 — containment / anti-photocopieuse

Les cartes Memory / Mastery / Listening / Scenario restent dans leur frontière DOM historique. Le contrat temporel reste **12 cartes → 12 cartes** après quiescence, sans recréation infinie.

### Build 26.7 — géométrie

Détails ouvert dans la vue normale conserve une géométrie humaine : deux colonnes réellement shrinkables sur grand desktop et pile verticale lorsque la largeur devient insuffisante.

### Build 26.8 — focus / sortie / mouvement

Une intention active masque le contexte inutile, les sorties utilisent les API propriétaires, l’état logique ne dépend pas de la fin du fade et `prefers-reduced-motion` garde le même flux sans animation.

## 🗺️ Curriculum et Détails

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

Build 26.1 reste actif. Après une réponse reconnue, Trân peut faire une **seconde prise locale volontaire** pour s’écouter. Aucun upload ni persistance audio.

Gate réel iPhone restant :

```text
réponse reconnue
→ seconde prise locale
→ réécoute correcte
→ réponse vocale suivante toujours reconnue normalement
```

La capture automatique exacte du premier essai reste hors scope tant que cette coexistence n’est pas prouvée sur le vrai iPhone.

## 👩‍🏫 Tyffany et sanctuaires

**Tyffany** reste le nom visible de la professeure. Les identifiants techniques historiques (`LucieVoice`, `luc-*`, `lucie-*`) restent volontairement inchangés.

Sanctuaires :

- learner : `francais-avec-luc:learner:v1` ;
- Learning Memory / Scenario / Listening ;
- `voice-ios.js` ;
- `free-voice.js` ;
- logo et favicon ;
- Progression UX Build 25 ;
- Session UX Build 25.2 ;
- Real Life French III Build 26 ;
- Voice Replay + Details Dashboard Build 26.1 ;
- Progress Dashboard Containment Build 26.6 ;
- Progress Open-Details Geometry Build 26.7 ;
- Progress Focus Flow Build 26.8 ;
- Progress Focus Content Reliability Build 26.9 ;
- aucune migration learner/Memory/Scenario/Listening dans Build 26.9.

### Baseline historique protégée

Le contrat **v1.17.0 — Build 24 — Real Life French II** reste explicitement conservé : avant Real Life III, Scenario comptait **28 situations / 84 tours**. Le marqueur `real-life-data-2.js` reste documenté dans `docs/ARCHITECTURE.md`.

## CI / production

PR runtime **#58** : **15/15 workflows fonctionnels SUCCESS** sur le head certifié `0fcb28038ef5bab5d138948c6d63b8fd963b2aab`.

Production runtime `0b31eedb78daebd58dd9bdcb0a472d56250c8fff` :

- **15/15 workflows fonctionnels SUCCESS** ;
- un premier passage du smoke historique Build 26.3 a raté sa destination Lesson sur un runner Chrome 151 ; le **même job inchangé** a été relancé et a passé Today + Progress desktop + Progress mobile ;
- **GitHub Pages #114 SUCCESS** sur le même SHA ;
- aucun workflow en échec ou en cours après certification.

## Suite

1. **Gate terrain iPhone Build 26.1** — auto-écoute puis reconnaissance suivante.
2. **Build 27 — Data & Recovery Hardening**.
3. **Build 28 — iPhone / PWA / Accessibility Hardening**.
4. **Build 29 — Architecture Hardening**.
5. **V2.0.0 — Freeze / Release**.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-26-6-PROGRESS-DASHBOARD-CONTAINMENT.md`, `docs/BUILD-26-7-PROGRESS-OPEN-GEOMETRY.md`, `docs/BUILD-26-8-PROGRESS-FOCUS-FLOW.md` et `docs/BUILD-26-9-PROGRESS-FOCUS-CONTENT.md`.
