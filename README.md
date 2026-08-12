# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version production

- **v1.19.6**
- **Build 26.6 — Progress Dashboard Containment + Humanized Curriculum**
- statut : **✅ PROD / réécoute iPhone à valider terrain**
- commit runtime production : `7bb48979f21db0cf1cc94d7a9e03e225f2e1cc7a`
- PR runtime : **#52**
- GitHub Pages runtime : **#108 SUCCESS**
- tribunal runtime : **12 workflows fonctionnels / 12 SUCCESS + Pages SUCCESS**
- calibration Listening : **0.88 normal / 0.65 lent**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **36 situations / 108 tours**
- coût : **0 €**

## 🧯 Build 26.6 — le dashboard ne se photocopie plus tout seul

Une vidéo terrain a montré que `Parcours` avait encore deux comportements franchement inhumains :

1. le compteur `Autres détails` montait tout seul pendant que l’écran restait ouvert — observé `24 → 123 → 179 → 218 → 326`, puis plus de 500 cartes ;
2. `Voir les 40 leçons` affichait réellement les **40 lignes simultanément**, transformant le parcours en ticket de caisse sans fin.

Le premier point était une **régression fonctionnelle active**, pas seulement un défaut visuel.

### Cause racine

Plusieurs moteurs historiques (Memory, Mastery, Stage 2/3…) vérifient l’existence de leur carte à l’intérieur de la première colonne Progress.

Build 26.5 avait déplacé `Détails d’apprentissage` hors de cette frontière pour rendre la colonne droite visuellement indépendante :

```text
progress-layout
├── colonne gauche
└── Détails
```

Une carte déplacée dans `Détails` n’était donc plus retrouvée par son moteur :

```text
moteur ne trouve pas sa carte
→ en recrée une
→ Progression la déplace dans Détails
→ moteur ne la trouve toujours pas
→ en recrée une
→ ∞
```

### Correction 26.6 : propriété DOM conservée, rendu visuel indépendant

La frontière historique est restaurée sans revenir au canyon vertical :

```text
progress-layout
└── progress-ux-composition
    ├── progress-ux-left-flow
    │   ├── Résumé
    │   └── Curriculum
    └── Détails d’apprentissage
```

Sur desktop, le conteneur interne est rendu en deux colonnes :

```text
┌──────────────────────────┬──────────────────────────────┐
│ Résumé                   │ Détails d’apprentissage     │
│ Curriculum               │ dashboard + groupe actif   │
└──────────────────────────┴──────────────────────────────┘
```

Donc :

- les moteurs retrouvent à nouveau leurs propres cartes ;
- la droite ne pousse pas le Curriculum vers le bas ;
- aucun scrollbar interne n’est réintroduit ;
- le document reste l’unique propriétaire du scroll vertical ;
- aucune donnée apprenante n’est migrée.

Le dashboard possède aussi désormais une appartenance stable par carte (`data-progress-detail-family`). `Résumé` et `Curriculum` sont explicitement interdits dans `Détails`, et `Éléments appris` appartient à **Mémoire** au lieu de finir dans `Autres détails`.

### La preuve anti-photocopieuse

Le nouveau Chrome Build 26.6 attend d’abord que tous les moteurs aient fini leur injection légitime, puis observe encore la page.

Profil synthétique leçon 8 :

```text
Dashboard stabilisé : 12 cartes
3 secondes plus tard : 12 cartes
Autres détails : 1
cartes moteur principales : uniques
Résumé/Curriculum dans Details : 0
```

Le test échoue si le compteur recommence à croître dans le temps.

## 🧭 Les 40 leçons restent accessibles, mais plus en mur vertical

La vue normale reste compacte : **5 leçons autour de la position actuelle**.

`Voir tout le parcours` affiche maintenant cinq étapes :

1. **Survie A0** — leçons 1–7 ;
2. **Vie quotidienne** — leçons 8–15 ;
3. **Fondations A1** — leçons 16–20 ;
4. **Premiers échanges** — leçons 21–25 ;
5. **A1 Core** — leçons 26–40.

Une seule étape expose ses leçons à la fois. À la position synthétique l8, l’ouverture affiche **8 leçons**, pas 40. L’étape la plus longue, A1 Core, en affiche **15**. Les 40 restent toutes accessibles.

Le tribunal clique réellement sur :

```text
Voir tout le parcours
→ 5 étapes / étape courante = 8 lignes
→ clic A1 Core
→ 15 lignes
```

Les transitions sont flushées immédiatement dans le même geste utilisateur au lieu d’attendre un futur `requestAnimationFrame`.

## ✅ Build 26.5 reste conservé là où il était bon

Build 26.6 supersède **uniquement** la frontière DOM de Progress qui provoquait la duplication. Les corrections 26.5 restent actives :

- `Changer de pratique` retourne au hub par pointer/tactile **et** click/clavier ;
- Conversation active = une seule colonne centrée ;
- `Tyffany` / `Pratique guidée` ne sont plus collés ;
- Overview → Curriculum reste compact même avec `Maîtrise` long ;
- desktop reste visuellement en deux colonnes ;
- mobile reste Résumé → Curriculum compact → Détails repliés ;
- single-scroll Build 26.4 reste intact.

## 👩‍🏫 Tyffany

**Tyffany** reste le nom visible de la professeure. Les identifiants techniques historiques (`LucieVoice`, `luc-*`, `lucie-*`) et la clé learner restent volontairement inchangés pour éviter toute migration risquée.

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

Une seule famille détaillée s’ouvre à la fois. Build 26.6 ajoute le contrat d’appartenance stable qui empêche les cartes de se dupliquer ou de changer de famille au gré des mutations DOM.

## 🎙️ Réécouter sa propre voix — gate terrain toujours ouvert

Build 26.1 reste actif. Après une réponse vocale reconnue, Trân peut faire une **seconde prise locale volontaire** pour s’écouter :

```text
🎧 Écoute-toi
[ 🎙️ M’enregistrer pour me réécouter ]
          ↓
[ ▶ Réécouter ma voix ]   [ ↻ Refaire ]
```

Contrat : aucune capture simultanée du premier essai, aucun upload, aucune persistance audio, piste micro stoppée, capture max 9 secondes, aucun événement Memory/Error/Mastery/Session créé par l’auto-écoute.

Le gate réel iPhone reste :

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
- Conversation Exit + Layout Repair Build 26.5 ;
- logo, favicon, `voice-ios.js`, `free-voice.js` sanctuarisés ;
- aucune migration learner/Memory/Scenario/Listening en Build 26.6.

### Baseline historique protégée

Le contrat **v1.17.0 — Build 24 — Real Life French II** reste explicitement protégé : avant Real Life III, Scenario comptait **28 situations / 84 tours**. Le marqueur historique `real-life-data-2.js` reste conservé dans `docs/ARCHITECTURE.md`.

## CI / production Build 26.6

PR #52 : **12/12 workflows fonctionnels SUCCESS**.

Le nouveau workflow Build 26.6 vérifie en vrai Chrome :

- dashboard arrivé à quiescence puis cardinalité strictement stable ;
- cartes moteur principales uniques ;
- aucun Overview/Curriculum dans Détails ;
- `Autres détails` borné ;
- 5 étapes curriculum ;
- vrai clic `Voir tout le parcours` ;
- vrai clic `A1 Core` ;
- 40 leçons accessibles mais jamais 40 visibles simultanément ;
- mobile compact + Détails replié ;
- learner synthétique l8 conservé.

État production `main` sur `7bb48979f21db0cf1cc94d7a9e03e225f2e1cc7a` :

- **12/12 workflows fonctionnels SUCCESS** ;
- **GitHub Pages #108 SUCCESS** ;
- aucun workflow en échec, en cours ou en attente après certification.

## Suite

1. **Gate terrain iPhone Build 26.1** : auto-écoute puis reconnaissance suivante.
2. **Build 27 — Data & Recovery Hardening**.
3. **Build 28 — iPhone / PWA / Accessibility Hardening**.
4. **Build 29 — Architecture Hardening**.
5. **V2.0.0 — Freeze / Release**.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-26-1-VOICE-REPLAY-DETAILS-DASHBOARD.md`, `docs/BUILD-26-5-CONVERSATION-LAYOUT-REPAIR.md` et `docs/BUILD-26-6-PROGRESS-DASHBOARD-CONTAINMENT.md`.
