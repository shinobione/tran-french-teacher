# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version candidate

- **v1.19.1**
- **Build 26.1 — Field Feedback UX**
- statut : **CANDIDAT / EN COURS**
- baseline production : **v1.19.0 — Build 26 — Real Life French III**
- calibration Listening : **0.88 normal / 0.64 lent**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **36 situations / 108 tours**
- coût : **0 €**

### Retour terrain traité

Build 26.1 répond à deux retours concrets :

1. après avoir parlé, Trân peut **réécouter sa propre voix** via une petite carte `🎧 Ma voix → Réécouter` quand le navigateur permet la capture parallèle ;
2. `Parcours → Détails d’apprentissage` n’est plus un long empilement : les cartes sont rangées en **4 familles logiques** — Mémoire & révisions, Maîtrise, Pratique réelle, Soutien de Lucie.

La réécoute est une couche séparée : `voice-ios.js` et `free-voice.js` restent byte-identiques. Aucun audio n’est uploadé ni écrit en localStorage ; le dernier Blob de la session reste uniquement en mémoire et est révoqué à la fermeture/remplacement.

Le regroupement Progression ne change aucun calcul pédagogique : il réorganise uniquement l’affichage. Une seule famille de détails peut être ouverte à la fois ; desktop = grille 2 colonnes, mobile = 1 colonne.

Voir `docs/BUILD-26.1-FIELD-FEEDBACK-UX.md`.

---

## Baseline production — v1.19.0 / Build 26

- statut : **✅ PROD / CLOS**
- commit production : `db8219e44d74f0af13421ec798a0c98d02f7a7b5`
- PR : **#37**
- GitHub Pages : **#96 SUCCESS**
- tribunal production : **8 workflows / 8 SUCCESS**
- Scenario : **36 situations / 108 tours**

`Pratiquer → Parler français` contient le Pack Real Life III : 8 situations / 24 tours, français oral naturel côté interlocuteur, réponses standard ou variantes simples explicitement acceptées, sans IA sémantique floue.

### Baseline historique conservée

**v1.17.0 — Build 24 — Real Life French II** = **28 situations / 84 tours** avant Pack III. Ce contrat reste un marqueur de non-régression ; Build 26 l’enrichit sans l’effacer.

## Session UX conservée

Build 25.2 reste propriétaire de l’expérience de session :

```text
objectif
→ progression
→ fin explicite
→ Retour à Aujourd’hui
```

## Listening / voix

```text
normal = 0.88
lent   = 0.64
```

Les moteurs validés restent sanctuarisés :

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

## Données apprenantes sanctuarisées

```text
francais-avec-luc:learner:v1
Learning Memory state
Scenario state
Listening state
```

Aucune migration n’est introduite par Build 26.1.

## Suite

1. **v1.19.1 — Build 26.1 — Field Feedback UX — EN COURS.**
2. v1.20.0 — Build 27 — Data & Recovery Hardening.
3. v1.21.0 — Build 28 — iPhone / PWA / Accessibility Hardening.
4. v1.22.0 — Build 29 — Architecture Hardening.
5. V2.0.0 — Freeze / Release.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-26-REAL-LIFE-FRENCH-III.md` et `docs/BUILD-26.1-FIELD-FEEDBACK-UX.md`.