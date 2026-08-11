# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version candidate

- **v1.19.4**
- **Build 26.4 — Single-scroll Progress + Tyffany**
- statut : **🧪 CANDIDATE / validation CI puis production**
- baseline production actuelle : **v1.19.3 / Build 26.3**
- commit runtime production actuel : `5947149e9fcb3b387aa01a797607270edb4f100e`
- GitHub Pages production actuelle : **#101 SUCCESS**
- calibration Listening : **0.88 normal / 0.65 lent**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **36 situations / 108 tours**
- coût : **0 €**

## 🧹 Build 26.4 — un seul scroll dans Progrès

Les captures desktop de Build 26.3 ont révélé un détail UX franchement chelou : `Détails d’apprentissage` possédait son **propre scrollbar**, à l’intérieur d’une page qui possède déjà le sien.

Build 26.4 conserve le layout 2 colonnes validé :

```text
┌──────────────────────────┬─────────────────────────────┐
│ Où j’en suis             │ Détails d’apprentissage     │
│ prochaine étape          │ dashboard + groupe actif    │
├──────────────────────────┤                             │
│ Parcours A0 → A1         │ contenu détaillé            │
└──────────────────────────┴─────────────────────────────┘
```

Mais sur desktop/tablette large, la colonne droite ne crée plus de contexte de scroll indépendant :

```text
Build 26.3 : sticky + max-height viewport + overflow:auto
Build 26.4 : flux normal + max-height:none + overflow:visible
```

**Le seul ascenseur vertical est donc celui de la page.** La carte Details grandit avec le groupe sélectionné.

Sur mobile, le contrat reste inchangé :

```text
Résumé
↓
Parcours compact
↓
Détails d’apprentissage repliés
```

Les cartes Memory/Mastery/Listening/Scenario/A1 restent les **mêmes nœuds DOM historiques** : aucun clone, aucune migration de donnée.

## 👩‍🏫 Lucie devient Tyffany

Le nom visible de la professeure devient **Tyffany** dans l’interface et dans les phrases vocales contenant l’ancien nom.

Le changement est volontairement traité comme du **branding compatible** :

- affichage apprenant : `Tyffany` ;
- export public tutor : `Tyffany` ;
- parole synthétique contenant `Lucie` → normalisée en `Tyffany` avant lecture ;
- `voice-ios.js` et `free-voice.js` restent byte-identiques ;
- les anciens IDs techniques `LucieVoice`, `luc-*`, `lucie-*` restent inchangés ;
- la clé historique `francais-avec-luc:learner:v1` reste inchangée pour protéger la progression.

Autrement dit : **on renomme la prof, pas le sous-sol technique de l’immeuble.** 😄

## 🖱️ Build 26.3 — interactions terrain stabilisées

La vidéo terrain avait montré une différence nette entre les contrôles de `Séance du jour` :

- `Continuer le parcours` restait fiable ;
- `Révision mémoire` pouvait recevoir le feedback visuel sans naviguer ;
- `Écouter 3 minutes` et `Voir les autres activités` pouvaient être inertes ou visuellement incohérents.

L’audit a trouvé une **guerre de composition DOM** : Daily Coach créait les actions, Listening injectait son bouton et Session UX déplaçait/recréait les mêmes nœuds sous plusieurs `MutationObserver`.

Build 26.3 a ajouté une couche d’orchestration additive :

- 2 actions principales Today avec nœuds stables ;
- activités secondaires hors de la zone legacy qui les déplaçait ;
- `Voir les autres activités` = vrai `<button>` stable avec `aria-expanded` ;
- routage explicite Review / Lesson / Conversation / Listening ;
- rendu idempotent ;
- aucune écriture learner, Memory, Scenario ou Listening.

Le smoke terrain clique réellement :

```text
Voir les autres activités
→ Écouter 3 minutes
→ Révision mémoire
→ retour Aujourd’hui
→ Continuer le parcours
```

Build 26.4 conserve intégralement ce contrat.

## 🧭 Progrès — structure conservée

Build 26.3 a introduit le placement desktop : résumé + parcours à gauche, Details à droite via CSS Grid + `display: contents`.

Build 26.4 **ne change pas cette architecture** ; il retire seulement la propriété de scroll interne de la colonne droite.

Le dashboard Build 26.1 reste groupé par intention :

```text
🧠 Mémoire & révisions
🎯 Maîtrise
🎧 Compréhension orale
🎭 Français réel
🧩 A1 & rythme
⋯ Autres détails
```

## 🩹 Build 26.2 — baseline conservée

Build 26.2 avait corrigé :

1. le clic `Parcours → Détails d’apprentissage` avec un toggle explicite/déterministe ;
2. le mode Listening lent, dont la valeur `0.64` tombait sous le minimum `0.65` déjà accepté par `voice-ios.js` et provoquait un fallback proche de `0.84`.

Contrat actuel :

```text
Normal → 0.88
Lent   → 0.65
```

`voice-ios.js` et `free-voice.js` restent byte-identiques.

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
- aucun événement Learning Memory / Error / Mastery / Session créé par l’auto-écoute ;
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

## Baselines conservées

- Progression UX Build 25 ;
- Listening **0.88 / 0.65** ;
- Session UX Build 25.2 ;
- Real Life French III Build 26 : **36 situations / 108 tours** ;
- Voice Replay + Details Dashboard Build 26.1 ;
- Click + Listening Rate Hotfix Build 26.2 ;
- Interaction Stability + two-column Progress Build 26.3 ;
- learner historique et profil l8 protégés ;
- logo, favicon, `voice-ios.js`, `free-voice.js` sanctuarisés ;
- aucune migration learner/Memory/Scenario/Listening dans Build 26.4.

### Baseline historique protégée

Le contrat **v1.17.0 — Build 24 — Real Life French II** reste explicitement protégé : avant Real Life III, Scenario comptait **28 situations / 84 tours**. Le marqueur historique `real-life-data-2.js` reste conservé dans l’architecture.

## CI candidate Build 26.4

Le nouveau workflow doit prouver :

- Tyffany réellement rendue dans l’UI ;
- aucun `Lucie` visible après application de la couche de compatibilité ;
- export tutor = Tyffany ;
- `voice-ios.js` / `free-voice.js` toujours byte-identiques ;
- desktop : Details `overflow-y: visible`, `max-height: none`, aucun nested scroll ;
- la page reste le propriétaire du scroll ;
- dashboard Mastery réellement ouvert pendant le smoke ;
- profil l8 inchangé ;
- tout le tribunal historique reste vert.

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

Les noms techniques `LucieVoice`, `luc-*` et `lucie-*` sont volontairement conservés comme compatibilité interne ; **Tyffany est le nom produit visible**.

## Suite

1. Valider Build 26.4 : PR → tribunal complet → `main` → Pages.
2. **Gate terrain iPhone Build 26.1** : auto-écoute puis reconnaissance suivante.
3. **Build 27 — Data & Recovery Hardening**.
4. **Build 28 — iPhone / PWA / Accessibility Hardening**.
5. **Build 29 — Architecture Hardening**.
6. **V2.0.0 — Freeze / Release**.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-26-1-VOICE-REPLAY-DETAILS-DASHBOARD.md`, `docs/BUILD-26-2-CLICK-LISTENING-HOTFIX.md`, `docs/BUILD-26-3-INTERACTION-PROGRESS-LAYOUT.md` et `docs/BUILD-26-4-SINGLE-SCROLL-TYFFANY.md`.