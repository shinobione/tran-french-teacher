# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## État actuel

### Production certifiée

- **v1.22.0**
- **Build 29 — iPhone / PWA / Accessibility Hardening**
- statut : **✅ PROD / CLOS**
- runtime production : `1c01648d89dfb3bd9236b9ad93fbade4e21102fa`
- PR runtime : **#64**
- head PR certifié : `27c67ee7b47b9f9a015e6c0072640e0e573de52d`
- tribunal `main` : **19/19 SUCCESS** après rerun inchangé du seul ancien smoke Build 27 visuel
- GitHub Pages : **#120 SUCCESS** sur le runtime exact

### Candidat en cours

- **v1.22.1**
- **Build 29.1 — Speaking Loop Content**
- statut : **🧪 CANDIDAT / NON MERGÉ**
- PR : **#66**

Baselines produit inchangées :

- curriculum : **40 leçons / 241 éléments** ;
- Scenario : **36 situations / 108 tours** ;
- Listening : **0.88 normal / 0.65 lent** ;
- coût : **0 €**.

## 📱 Build 29 — iPhone / PWA / Accessibility

Build 29 durcit la façade Build 27 pour le vrai usage iPhone :

- `viewport-fit=cover` et safe areas ;
- cibles tactiles coarse-pointer d’au moins 44 px ;
- focus clavier visible ;
- `aria-current`, progressbar et régions live ;
- gestion `VisualViewport` pour clavier iOS ;
- standalone/PWA ;
- textes longs, petits écrans et paysage compact ;
- `prefers-reduced-motion` ;
- `prefers-contrast` ;
- manifest/install/offline vérifiés ;
- matrice Chrome 320×568, 390×844 et 430×932 ;
- boot offline après chauffe du Service Worker.

La PR #65 a exploré une isolation supplémentaire des anciens smoke harnesses du Service Worker. Elle n’a pas stabilisé le vieux contrôle visuel Build 27 et a donc été **fermée sans merge**. Aucun runtime de #65 n’est en production.

## 🎙️ Build 29.1 — Speaking Loop Content

L’objectif est de transformer la demande de Trân — **pouvoir se réécouter** — en vraie mécanique pédagogique intégrée aux leçons, sans la transformer en réglage technique.

Chaque leçon reçoit au maximum **deux moments oraux** :

1. une phrase utile de la leçon ;
2. après réussite de la situation finale, la réponse naturelle de cette situation.

Flux candidat :

```text
🔊 Tyffany
→ Trân répète / dit la phrase
→ 🎙️ seconde prise locale volontaire
→ ▶ Ma voix
→ 🔊 Tyffany
→ ↻ Refaire si elle veut
→ Continuer reste toujours disponible
```

Principes :

- **40/40 leçons couvertes** par le sélecteur de contenu ;
- **2 moments maximum** par leçon ;
- aucun faux score de prononciation ;
- l’app invite seulement à comparer rythme et sons ;
- `getUserMedia` uniquement après clic explicite ;
- prise locale limitée à 9 secondes ;
- aucun upload ;
- aucun stockage dans learner/Memory/backup ;
- Blob temporaire détruit au changement d’étape/page ;
- Tyffany utilise toujours la chaîne vocale existante.

Le nouveau tribunal Chrome ouvre une **vraie Leçon 1**, traverse ses étapes et quiz, exige le moment Speaking Loop de contenu, réussit la situation finale puis exige le second moment. Sur `390×844`, il vérifie aussi zéro overflow et une cible tactile d’au moins 44 px.

## 🔐 Build 28 — Data & Recovery toujours sous le shell

Les six stores durables restent protégés :

1. `francais-avec-luc:learner:v1` ;
2. `french-tranquille:learning-memory:v1` ;
3. `french-tranquille:error-intelligence:v1` ;
4. `french-tranquille:scenarios:v1` ;
5. `french-tranquille:listening:v1` ;
6. `french-tranquille:milestones:v1`.

Build 28 conserve backup V2, restore transactionnel, rollback, migration V1 sûre, quarantaine, `last-good`, snapshots pré-restore/pré-migration/pré-reset et le filet historique Build 22.

## 🧭 App Shell Build 27

### Aujourd’hui
- prochaine leçon ;
- CTA principal `Continuer` ;
- raccourcis `Réviser` / `Écouter`.

### Pratiquer
- 🎙️ Parler ;
- 🎧 Écouter ;
- ↻ Réviser ;
- ♥ Dans la vraie vie.

### Progrès
- position A0 → A1 ;
- prochaine leçon ;
- étape actuelle ;
- cinq leçons utiles ;
- parcours complet en cinq étapes.

Memory / Mastery / Listening / Scenario / Error Intelligence restent des moteurs sous le capot. Le cockpit historique reste accessible en DEBUG FR.

## 🛡️ Sanctuaires

Doivent rester byte-identiques pendant Build 29.1 :

- `voice-ios.js` — `38e97aa3ef62dd6dcda224901b435f0973618679` ;
- `free-voice.js` — `b4c19b1936c788ee017eac9ba14e5a62c159e8d5` ;
- `assets/LOGO.png` — `64eaa6ad9781c6a9075d4f68615fc44344c4e21c` ;
- `assets/Favicon.png` — `c358672368a960bf7617e5532aff3e3319cddb3e`.

Le learner historique reste **`francais-avec-luc:learner:v1`**.

### Baseline historique qualité

La CI conserve explicitement : **v1.17.0 — Build 24 — Real Life French II**, avec **28 situations / 84 tours** avant Pack III et le fichier canonique `real-life-data-2.js`.

## 🎧 Gate terrain iPhone toujours ouvert

Build 26.1 reste actif et distinct du nouveau Speaking Loop :

```text
réponse Free Voice reconnue
→ seconde prise locale
→ réécoute correcte
→ réponse vocale suivante toujours reconnue normalement
```

Tant que ce flux n’est pas confirmé sur le vrai iPhone, **l’enregistrement automatique du premier essai exact reste interdit**. Build 29.1 ajoute l’auto-écoute aux leçons, mais ne lance pas MediaRecorder en parallèle de la reconnaissance Safari.

## Suite

1. **Build 29.1 — Speaking Loop Content** : candidat actuel.
2. **Gate terrain iPhone Build 26.1** : reconnaissance → réécoute → reconnaissance suivante.
3. **Build 30 — Architecture Hardening**.
4. **V2.0.0 — Freeze / Release**.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-29-IPHONE-PWA-A11Y.md` et `docs/BUILD-29-1-SPEAKING-LOOP-CONTENT.md`.