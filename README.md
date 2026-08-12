# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## État actuel

### Production certifiée

- **v1.22.1 — Build 29.1 / Speaking Loop Content**
- statut : **✅ PROD / CLOS**
- runtime production : `b2fde53792c38d1e6283d8779bbcedfac36f9502`
- PR runtime : **#66**
- head PR certifié : `df730d60a8434819cb19f116eb0dc66c3718b5f4`
- tribunal PR : **19/19 workflows fonctionnels SUCCESS**
- tribunal `main` : **19/19 workflows fonctionnels SUCCESS**
- GitHub Pages runtime : **#122 SUCCESS**
- total runtime `main` : **20/20 SUCCESS Pages incluse**

### Candidat en cours

- **v1.22.2 — Build 29.2 / Speaking Loop Variety & Clarity**
- statut : **🧪 CANDIDAT / NON MERGÉ**

Baselines inchangées : curriculum **40 leçons / 241 éléments**, Scenario **36 situations / 108 tours**, Listening **0.88 normal / 0.65 lent**, coût **0 €**.

## 🎙️ Build 29.2 — Variety & Clarity

Le retour terrain après Build 29.1 a révélé trois défauts très concrets :

1. `Refaire` ne disait pas clairement ce qui allait être refait ;
2. le bouton Tyffany du Speaking Loop doublonnait le bouton audio déjà présent dans l’exercice ;
3. une cible de compréhension comme **`10 euros`** pouvait devenir une cible orale répétée, sans variété suffisante.

### Labels explicites

Après une prise enregistrée :

```text
Trân :      ↻ Ghi âm lại
DEBUG FR :  ↻ Enregistrer à nouveau
```

Le bouton audio natif de l’exercice devient :

```text
Trân :      🔊 Nghe Tyffany
DEBUG FR :  🔊 Écouter Tyffany
```

avec une courte explication indiquant que Tyffany lit le modèle français. Quand ce bouton natif existe, le Speaking Loop **n’en crée plus un deuxième**. Un bouton modèle reste présent dans le récapitulatif final uniquement parce que cette vue ne possède pas de bouton audio natif.

### Comprendre ≠ devoir répéter

Build 29.1 attachait son deuxième moment oral directement à `lesson.challenge.answer`. Cela mélangeait deux intentions pédagogiques :

- reconnaître/comprendre une réponse ;
- produire une phrase française utile.

Build 29.2 sépare ces deux rôles. Le challenge reste un test de compréhension. Le deuxième moment oral devient un **rappel final contextualisé** sur l’écran de fin de leçon.

Exemple canonique Bài 7 :

```text
Challenge de compréhension : « dix euros » → 10 euros
Rappel oral :               « Combien ça coûte ? »
```

`10 euros` reste donc une bonne réponse de compréhension, mais ne devient plus automatiquement un mantra à enregistrer.

### Planificateur oral local

La sélection ne repose pas sur un randomizer. Elle combine :

- pertinence avec le thème et la leçon actuelle ;
- qualité orale de la cible (phrase/question utile plutôt qu’un nombre ou une unité isolée) ;
- acquis déjà connus lorsque leur lien avec le contexte est réel ;
- Learning Memory en **lecture seule** : fragile/dû peut remonter, mais seulement si l’acquis reste contextuellement pertinent ;
- fenêtre récente anti-répétition ;
- deux cibles distinctes par leçon.

Le planificateur n’écrit dans aucun store durable. La progression, Memory, Recovery et backups restent propriétaires de leurs données.

## 🛡️ Sanctuaires

Build 29.2 ne modifie pas :

- `voice-ios.js` — `38e97aa3ef62dd6dcda224901b435f0973618679` ;
- `free-voice.js` — `b4c19b1936c788ee017eac9ba14e5a62c159e8d5` ;
- `assets/LOGO.png` — `64eaa6ad9781c6a9075d4f68615fc44344c4e21c` ;
- `assets/Favicon.png` — `c358672368a960bf7617e5532aff3e3319cddb3e` ;
- learner canonique `francais-avec-luc:learner:v1`.

Audio de réécoute : local, volontaire, ≤9 s, sans upload ni persistance.

## 📱 Build 29 / 🔐 Build 28 / 🧭 Build 27

Les contrats existants restent actifs : safe areas, cibles tactiles ≥44 px, offline PWA, Recovery six stores, restore transactionnel, App Shell `Aujourd’hui / Pratiquer / Progrès` et cockpit technique réservé au DEBUG FR.

## 🎧 Gate terrain iPhone toujours ouvert

Build 26.1 reste distinct :

```text
réponse Free Voice reconnue
→ seconde prise locale
→ réécoute correcte
→ réponse vocale suivante toujours reconnue normalement
```

Tant que ce flux n’est pas confirmé sur le vrai iPhone, **aucun enregistrement automatique du premier essai exact** pendant SpeechRecognition.

### Baseline historique qualité

La CI conserve explicitement **v1.17.0 — Build 24 — Real Life French II**, **28 situations / 84 tours** avant Pack III et `real-life-data-2.js`.

## Suite

1. **Build 29.2 — Speaking Loop Variety & Clarity** : candidat actuel.
2. Gate terrain iPhone Build 26.1.
3. **Build 30 — Architecture Hardening**.
4. **V2.0.0 — Freeze / Release**.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-29-1-SPEAKING-LOOP-CONTENT.md` et `docs/BUILD-29-2-SPEAKING-VARIETY-CLARITY.md`.
