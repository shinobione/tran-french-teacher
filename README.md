# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## État actuel

# ✅ V2.0.0 — Freeze / Release — PROD / CLOS

French Trân’quille V2 gèle la baseline construite jusqu’à **Architecture Build 30**. Ce jalon n’ajoute ni nouveau moteur, ni nouveau curriculum, ni nouvelle navigation : il certifie le produit existant comme release reproductible, sauvegardable, restaurable et testée.

### Baseline V2 gelée

- curriculum : **40 leçons / 241 éléments** ;
- Scenario : **36 situations / 108 tours** ;
- Listening : **0.88 normal / 0.65 lent** ;
- Speaking Loop : **2 moments maximum par leçon** ;
- stores durables Recovery : **6** ;
- coût récurrent : **0 €** ;
- architecture : **Build 30** ;
- version visible dans Options : **v2.0.0 • Build 30**.

### Preuves de release

- PR runtime V2 **#73** ; head certifié `c221fa9600d23dd83b87225cc4accce01e83cfe6` ; **22/22 workflows fonctionnels SUCCESS** ;
- runtime applicatif V2 mergé : `5f2c486b3e455220ebd903f25ee766ff2430e4a5` ; **GitHub Pages #131 SUCCESS** sur ce SHA ;
- l’ancien workflow Progression UX a ensuite révélé un Chrome non borné sur `main` malgré son passage sur la PR ;
- PR CI-only **#74** : **un seul YAML GitHub Actions**, mêmes assertions, Chrome isolé + timeout + retries bornés ; head `0fbd3b8e8124b3beaf7d6086d8a837580abb2cb3` ; **22/22 fonctionnels SUCCESS** ;
- baseline finale de certification : `6e0f5cde97cfba0572efccc6344a8bd6cbe7a315` ; **23/23 workflows SUCCESS**, dont **GitHub Pages #132 SUCCESS**.

Le commit `6e0f5cde…` ne change aucune ligne de PWA par rapport au runtime V2 : il stabilise uniquement son tribunal Progression UX.

## 🔐 Contrat de release

`release-v2.json` décrit la baseline machine-readable : version, Architecture Build, cardinalités produit, six stores durables, hashes des sanctuaires et gate terrain restant.

Le tribunal `.github/workflows/v2-release-freeze.yml` vérifie notamment :

- concordance Release Contract ↔ Runtime Contracts ↔ Recovery ;
- backup V2 à six stores ;
- Options `v2.0.0 • Build 30` ;
- navigation réelle `Progrès → Aujourd’hui → Pratiquer` ;
- ancienne utilisatrice synthétique conservée à **7 leçons terminées / l8=4 / 40 acquis** ;
- stores durables strictement inchangés pendant le round-trip ;
- zéro overflow horizontal ;
- hashes sanctuaires exacts.

## 🏗️ Architecture gelée

V2 conserve les couches suivantes :

- **Build 27 — App Shell** : Aujourd’hui / Pratiquer / Progrès ;
- **Build 28 — Data & Recovery** : backup V2, snapshots, restore transactionnel, rollback, quarantaine ;
- **Build 29 — iPhone / PWA / Accessibility** : safe areas, touch ≥44 px, a11y, offline ;
- **Build 29.2 — Speaking Loop Variety & Clarity** : Tyffany, auto-écoute locale, anti-répétition, compréhension ≠ production ;
- **Build 30 — Architecture Hardening** : Runtime Contracts, Runtime Bridge, ownership et routes stables.

## 🎙️ Audio / Speaking Loop

Le comportement reste celui validé avant le freeze :

- `🔊 Nghe Tyffany` / `🔊 Écouter Tyffany` ;
- `↻ Ghi âm lại` / `↻ Enregistrer à nouveau` ;
- compréhension ≠ production orale ;
- planificateur contextualisé et anti-répétition ;
- aucun faux score de prononciation ;
- prise locale volontaire ≤9 s, jamais uploadée ni persistée dans la progression.

## 📱 Gate terrain iPhone encore ouvert

La V2 est gelée avec le comportement sûr actuel. Le seul gate terrain restant concerne une éventuelle évolution future :

```text
reconnaissance Free Voice
→ seconde prise locale
→ lecture
→ reconnaissance suivante toujours normale
```

Tant que ce test réel iPhone n’est pas confirmé, **aucune capture automatique du premier essai exact** n’est ajoutée en parallèle de SpeechRecognition.

## 🛡️ Sanctuaires V2

- `app.js` — `600f094266c9f0c4c7b57efdbf61129909ebd9cb` ;
- `voice-ios.js` — `38e97aa3ef62dd6dcda224901b435f0973618679` ;
- `free-voice.js` — `b4c19b1936c788ee017eac9ba14e5a62c159e8d5` ;
- `assets/LOGO.png` — `64eaa6ad9781c6a9075d4f68615fc44344c4e21c` ;
- `assets/Favicon.png` — `c358672368a960bf7617e5532aff3e3319cddb3e` ;
- learner canonique `francais-avec-luc:learner:v1`.

## Baseline historique qualité conservée

La CI protège toujours explicitement **v1.17.0 — Build 24 — Real Life French II** : **28 situations / 84 tours** avant Pack III, avec `real-life-data-2.js` comme référence historique. Une release V2 ne gomme donc pas les contrats qui ont servi à construire le produit.

## Suite

V2 marque un **point de freeze**, pas le départ automatique d’une nouvelle usine à gaz. La suite canonique est maintenant :

1. usage réel / observation ;
2. gate terrain iPhone Voice Replay ;
3. maintenance et correctifs critiques si nécessaires ;
4. toute future V2.x/V3 repartira d’une roadmap explicite, pas d’un empilement opportuniste.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md` et `docs/V2-RELEASE.md`.
