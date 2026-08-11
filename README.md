# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version production

- **v1.19.5**
- **Build 26.5 — Conversation Exit + Layout Repair**
- statut : **✅ PROD / réécoute iPhone à valider terrain**
- commit runtime production : `2cd29f20faa8db850f92c343074809cc91b42c76`
- PR runtime : **#49**
- GitHub Pages runtime : **#106 SUCCESS**
- tribunal runtime : **11 workflows fonctionnels / 11 SUCCESS + Pages SUCCESS**
- calibration Listening : **0.88 normal / 0.65 lent**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **36 situations / 108 tours**
- coût : **0 €**

## 🧯 Build 26.5 — sortie Conversation + réparation du layout

Les captures terrain ont montré deux vrais problèmes :

1. `Changer de pratique` pouvait recevoir le feedback visuel mais rester **mort**, enfermant Conversation dans la pratique guidée ;
2. plusieurs règles de layout héritées se contredisaient : Conversation gardait une vieille grille 2 colonnes alors qu’un seul mode est visible, et un groupe `Détails d’apprentissage` très haut pouvait pousser le curriculum gauche très loin vers le bas.

Build 26.5 corrige les deux **structurellement**, sans migration de données.

### Conversation : plus de cul-de-sac

La transition de mode est maintenant explicite et synchrone :

```text
Pratique guidée / Vocal / Situation
        ↓
setPracticeMode(mode)
        ↓
mode visible

Changer de pratique
        ↓ pointerup OU click
setPracticeMode(null)
        ↓
hub de pratique
```

Le contrôle visible reçoit aussi un binding direct `pointerup + click`. On ne dépend donc plus uniquement d’un gros listener global pendant que les couches de Conversation peuvent recomposer le DOM.

Le smoke Chrome 26.5 reproduit réellement le problème et exige :

```text
pointer/tactile → hub ✅
click/clavier   → hub ✅
```

### Conversation desktop : une seule colonne de travail

L’ancien Build 14 avait prévu :

```text
Free Voice | Pratique guidée
```

Mais depuis Build 25.2, un seul mode est actif à la fois. Garder la vieille grille créait le grand désert observé sur les captures : bouton retour à gauche, carte guidée à droite, rien au milieu.

Build 26.5 impose désormais pour le mode actif :

```text
┌────────────────────────────────────┐
│ ‹ Changer de pratique              │
│                                    │
│ Tyffany                            │
│ Pratique guidée                    │
│ ...                                │
└────────────────────────────────────┘
```

Le nom **Tyffany** et le label `Pratique guidée` sont également séparés visuellement : fini `TyffanyPratique guidée` collé.

## 🧭 Progrès : deux colonnes réellement indépendantes

Build 26.3 avait construit visuellement :

```text
Résumé      | Détails
Curriculum  | Détails
```

Build 26.4 avait ensuite supprimé le scroll interne de `Détails` — correctement — mais le panneau droit restait un item de grille couvrant deux lignes. Avec un groupe long comme `Maîtrise`, sa hauteur pouvait étirer les lignes et pousser le curriculum gauche plusieurs centaines de pixels plus bas.

Build 26.5 change la composition DOM :

```text
.progress-layout
├── colonne gauche
│   ├── Résumé / prochaine étape
│   └── Parcours A0 → A1
└── Détails d’apprentissage
```

Sur desktop :

```text
┌──────────────────────────┬─────────────────────────────┐
│ Où j’en suis             │ Détails d’apprentissage    │
│ prochaine étape          │ dashboard + groupe actif   │
├──────────────────────────┤                             │
│ Parcours A0 → A1         │                             │
│ leçon précédente         │                             │
│ leçon actuelle           │                             │
│ prochaines leçons        │                             │
└──────────────────────────┴─────────────────────────────┘
```

La colonne gauche garde son propre flux compact. Une carte `Maîtrise` très longue à droite **ne peut plus créer un trou géant entre Résumé et Parcours**.

Le Chrome 26.5 mesure la géométrie réelle :

```text
Overview → Curriculum gap = 0 à 48 px
Details direct à droite     = oui
nested scroll               = 0
page scrollable             = 1
```

Et Build 26.4 reste respecté : **un seul scroll vertical, celui de la page**.

### Mobile conservé

```text
Résumé
↓
Parcours compact — 5 / 40
↓
Détails d’apprentissage repliés
```

Aucune carte pédagogique n’est clonée. Memory, Mastery, Listening, Scenario et A1 restent les vrais nœuds historiques pilotés par leurs moteurs.

## 👩‍🏫 Tyffany reste le nom produit

Build 26.4 a remplacé le nom visible `Lucie` par **Tyffany** sans migration risquée :

- affichage apprenant : `Tyffany` ;
- export public tutor : `Tyffany` ;
- parole synthétique contenant `Lucie` → normalisée en `Tyffany` ;
- `voice-ios.js` et `free-voice.js` byte-identiques ;
- identifiants internes historiques `LucieVoice`, `luc-*`, `lucie-*` inchangés ;
- clé learner `francais-avec-luc:learner:v1` inchangée.

On renomme toujours la prof, **pas le sous-sol technique de l’immeuble**. 😄

## 🧠 Détails d’apprentissage

Le dashboard Build 26.1 reste groupé par intention :

```text
🧠 Mémoire & révisions
🎯 Maîtrise
🎧 Compréhension orale
🎭 Français réel
🧩 A1 & rythme
⋯ Autres détails
```

Une seule famille détaillée s’ouvre à la fois.

## 🎙️ Réécouter sa propre voix

Build 26.1 reste actif. Après une réponse vocale reconnue dans Free Voice, Trân peut faire une **seconde prise locale volontaire** pour s’écouter :

```text
🎧 Écoute-toi
[ 🎙️ M’enregistrer pour me réécouter ]
          ↓
[ ▶ Réécouter ma voix ]   [ ↻ Refaire ]
```

Contrat :

- aucune capture simultanée du premier essai ;
- `voice-ios.js` / `free-voice.js` inchangés ;
- aucun upload ni stockage audio ;
- aucun événement Memory / Error / Mastery / Session créé par l’auto-écoute ;
- Blob URL temporaire ;
- piste micro stoppée ;
- arrêt automatique après 9 secondes ;
- échec de capture = exercice vocal existant toujours utilisable.

### Gate terrain restant

La fonction est en production mais doit encore être validée sur le vrai iPhone de Trân :

```text
réponse reconnue
→ seconde prise locale
→ réécoute correcte
→ réponse vocale suivante toujours reconnue normalement
```

La capture exacte du premier essai reste hors scope tant que cette coexistence n’est pas prouvée.

## 🛡️ Baselines conservées

- Progression UX Build 25 ;
- Listening **0.88 / 0.65** ;
- Session UX Build 25.2 ;
- Real Life French III Build 26 : **36 situations / 108 tours** ;
- Voice Replay + Details Dashboard Build 26.1 ;
- Click + Listening Rate Hotfix Build 26.2 ;
- Interaction Stability Build 26.3 ;
- Single-scroll + Tyffany Build 26.4 ;
- learner historique et profil synthétique l8 protégés ;
- logo, favicon, `voice-ios.js`, `free-voice.js` sanctuarisés ;
- aucune migration learner/Memory/Scenario/Listening dans Build 26.5.

### Baseline historique protégée

Le contrat **v1.17.0 — Build 24 — Real Life French II** reste explicitement protégé : avant Real Life III, Scenario comptait **28 situations / 84 tours**. Le marqueur historique `real-life-data-2.js` reste conservé dans l’architecture.

## CI / production Build 26.5

PR #49 : **11/11 workflows fonctionnels SUCCESS**.

Le nouveau workflow Build 26.5 vérifie en vrai Chrome :

- sortie Conversation par pointer/tactile ;
- sortie Conversation par click/clavier ;
- mode actif sur une seule colonne ;
- Tyffany / label non collés ;
- Progress desktop avec `Maîtrise` long ;
- gap Résumé → Curriculum borné à 48 px ;
- deux colonnes indépendantes ;
- aucun nested scroll réintroduit ;
- page propriétaire du scroll ;
- mobile Résumé → Curriculum → Détails repliés ;
- profil l8 : 7 leçons terminées / 40 acquis intact.

Plusieurs anciens workflows ont également été rendus plus durables : ils protègent désormais **le comportement historique** plutôt que de figer à vie l’URL exacte d’un fichier propriétaire. Le smoke Build 26.1 possède maintenant des Chrome isolés et bornés par timeout.

État runtime final `main` sur `2cd29f20faa8db850f92c343074809cc91b42c76` :

- quality ✅ ;
- Options ✅ ;
- nav/mobile ✅ ;
- Progression UX ✅ ;
- Listening rate ✅ ;
- Session UX ✅ ;
- Real Life French III ✅ ;
- Voice Replay + Details Dashboard ✅ ;
- Build 26.3 interactions ✅ ;
- Build 26.4 single-scroll + Tyffany ✅ ;
- Build 26.5 Conversation + Layout ✅ ;
- GitHub Pages **#106 ✅**.

## Sanctuaires

```text
francais-avec-luc:learner:v1
Learning Memory / Scenario / Listening state
assets/LOGO.png
assets/Favicon.png
voice-ios.js
free-voice.js
bottom navigation compatibility bus
Progression UX Build 25
Session UX Build 25.2
Real Life III Build 26
Voice Replay + Details Dashboard Build 26.1
```

## Suite

1. **Gate terrain iPhone Build 26.1** : auto-écoute puis reconnaissance suivante.
2. **Build 27 — Data & Recovery Hardening**.
3. **Build 28 — iPhone / PWA / Accessibility Hardening**.
4. **Build 29 — Architecture Hardening**.
5. **V2.0.0 — Freeze / Release**.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-26-1-VOICE-REPLAY-DETAILS-DASHBOARD.md`, `docs/BUILD-26-2-CLICK-LISTENING-HOTFIX.md`, `docs/BUILD-26-3-INTERACTION-PROGRESS-LAYOUT.md`, `docs/BUILD-26-4-SINGLE-SCROLL-TYFFANY.md` et `docs/BUILD-26-5-CONVERSATION-LAYOUT-REPAIR.md`.
