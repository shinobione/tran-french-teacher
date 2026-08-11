# French Trân’quille

PWA de français pensée pour **Trân**, vietnamienne débutante absolue au départ (**A0**), avec pédagogie majoritairement vietnamienne au début puis introduction progressive du français réellement utile.

## Version actuelle

- **v1.9.0**
- **Build 16**
- Phase : **PWA-3B Adaptive Learning / Mastery Engine**
- curriculum : **25 leçons / 148 éléments**
- parcours : **A0 → premières fondations A1**
- coût d'exploitation : **0 €**

## Liens projet

- Roadmap canonique : [`ROADMAP.md`](./ROADMAP.md)
- Historique : [`CHANGELOG.md`](./CHANGELOG.md)
- Architecture : [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
- Politique de build : [`docs/BUILD-POLICY.md`](./docs/BUILD-POLICY.md)
- PWA : `https://shinobione.github.io/tran-french-teacher/`

---

# Build 16 — Mastery Engine

Jusqu’à Build 15, l’application savait déjà :

- si une leçon était terminée ;
- quels éléments avaient été vus ;
- quels éléments étaient nouveaux, fragiles, en cours ou solides dans Learning Memory ;
- quoi proposer aujourd’hui via Daily Coach.

Build 16 ajoute une couche au-dessus : **est-ce qu’un grand bloc est réellement consolidé ?**

## Les 4 étapes suivies

1. **Survie A0** — leçons 1–7 ;
2. **Vie quotidienne A0** — leçons 8–15 ;
3. **Fondations A1** — leçons 16–20 ;
4. **Premiers échanges A1** — leçons 21–25.

Pour chaque étape, Lucie observe plusieurs signaux :

- leçons terminées ;
- éléments réellement connus ;
- quantité d’éléments déjà révisés ;
- qualité moyenne de la Learning Memory ;
- éléments solides ;
- fragilités restantes.

Le score ne monte donc pas simplement parce que Trân a cliqué jusqu’à la fin d’une leçon.

## États de maîtrise

Chaque étape peut être :

- **Non commencé** ;
- **Découverte** ;
- **Consolidation** ;
- **Presque solide** ;
- **Maîtrisé**.

Une étape ne peut devenir **Maîtrisée** que si :

- toutes ses leçons sont terminées ;
- presque tous ses éléments ont été appris ;
- la mémoire contient suffisamment de vraies preuves de révision ;
- la qualité mémoire dépasse un seuil ;
- les fragilités restantes restent limitées.

## Estimation interne

La home et Progression peuvent afficher une estimation du type :

```text
A0
A0+
A1-
A1
```

avec des libellés comme :

```text
A0 initial
A0 en progression
A0 renforcé
Pré-A1 / début A1
A1 en construction
```

**Important : ce n’est pas une certification CECRL.** C’est un indicateur interne utilisé pour piloter les révisions et le rythme pédagogique.

## Priorité suivante

Le Mastery Engine propose aussi une priorité :

- revoir les éléments fragiles ;
- continuer une leçon incomplète ;
- ou réutiliser une étape déjà parcourue en Révision / Conversation.

## UI

### Home

Une carte compacte **Maîtrise réelle** affiche :

- estimation interne ;
- étape actuelle ;
- état ;
- score ;
- accès au détail.

### Progression

Une carte **Carte de maîtrise** expose les quatre étapes avec :

- progression ;
- leçons terminées ;
- acquis ;
- éléments révisés ;
- solides ;
- fragiles ;
- priorité suivante.

### Réglages

Le diagnostic affiche également le niveau interne estimé.

---

# Curriculum — 25 leçons / 148 éléments

## Survie A0 — 1 à 7

- saluer et se présenter ;
- politesse et phrases de secours ;
- parler de soi ;
- commander au café ;
- goûts ;
- nombres 0–10 ;
- demander un prix.

## Vie quotidienne A0 — 8 à 15

- demander son chemin ;
- train et billet ;
- heure ;
- shopping ;
- restaurant ;
- santé / pharmacie ;
- famille et proches ;
- premier jour en France.

## Fondations A1 — 16 à 20

- être ;
- avoir ;
- vouloir ;
- pouvoir ;
- logement et `il y a` ;
- téléphone et messages.

## Premiers échanges A1 — 21 à 25

- météo et sensations ;
- courses alimentaires / articles partitifs ;
- petite conversation sociale ;
- journée simple au présent ;
- questions courtes pour continuer une conversation.

---

# PWA-3 — Learning Memory

Clé locale :

```text
french-tranquille:learning-memory:v1
```

Chaque élément peut mémoriser :

- première rencontre ;
- dernière utilisation ;
- dernière révision ;
- tentatives ;
- réussites ;
- difficultés ;
- streak ;
- force ;
- intervalle ;
- prochaine révision ;
- source du dernier événement.

États :

```text
Nouveau
Fragile
En cours
Solide
```

Les éléments difficiles reviennent rapidement ; les éléments solides s’espacent.

## Sauvegarde

Dans Réglages :

- export JSON ;
- import JSON ;
- progression + mémoire ;
- aucune donnée envoyée automatiquement sur Internet.

---

# Daily Coach

La home construit localement une **Séance du jour**.

Priorité générale :

```text
mémoire due / fragile
        ↓
prochaine leçon
        ↓
conversation courte
```

Cible souple : **10–15 minutes**.

L’objectif n’est pas d’accumuler des jours ou de l’XP, mais de créer une routine réaliste et durable.

---

# Voix — 0 €

French Trân’quille utilise uniquement les possibilités du navigateur :

- `speechSynthesis` pour Lucie ;
- choix local des voix françaises disponibles ;
- `SpeechRecognition` / `webkitSpeechRecognition` lorsqu’exposé ;
- fallback texte systématique ;
- validation locale de la transcription ;
- indices progressifs ;
- réintroduction des phrases ratées.

## Limite assumée

L’application peut savoir si le navigateur **reconnaît une phrase**.

Elle ne peut pas prétendre mesurer scientifiquement :

- le R ;
- U / OU ;
- nasalisation ;
- articulation ;
- accent ;
- précision phonétique réelle

si Safari ne lui fournit qu’une transcription.

Le prochain jalon spécifique voix dépend donc toujours d’un **test réel Safari/Siri sur l’iPhone de Trân**.

---

# DEBUG FR

Le mode DEBUG FR reste local au navigateur de Jerry.

- interface de contrôle en français ;
- appareil de Trân inchangé ;
- activation dans Réglages ;
- raccourci `?debug=fr`.

---

# Architecture

Le socle historique reste volontairement protégé :

```text
app.js
  ↓
curriculum-stage2.js
  ↓
stage2-boot.js
  ↓
voice / debug
  ↓
learning-memory.js
  ↓
daily-coach.js
  ↓
mastery-engine.js
```

Les nouvelles couches sont modulaires afin d’éviter une réécriture risquée de `app.js` au milieu d’un build fonctionnel.

Voir [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md).

---

# Données locales

La clé historique apprenant reste volontairement :

```text
francais-avec-luc:learner:v1
```

Elle n’a pas été renommée lors du passage Luc → Lucie afin de préserver la progression déjà existante.

Aucun Build 16 ne force de reset.

---

# Qualité / CI

Chaque gros build passe maintenant par :

```text
branche dédiée
→ PR
→ syntax check
→ guards fonctionnels
→ smoke Node
→ vrai Chrome headless
→ merge
→ CI main
→ GitHub Pages
```

Build 16 ajoute des guards pour :

- Mastery Engine ;
- documentation canonique ;
- cache/version ;
- rendu réel de la carte Maîtrise sur Chrome.

Les règles complètes vivent dans [`docs/BUILD-POLICY.md`](./docs/BUILD-POLICY.md).

---

# Roadmap

La roadmap détaillée n’est plus maintenue en doublon dans le README.

👉 [`ROADMAP.md`](./ROADMAP.md)

Prochains gros jalons actuellement prévus :

- **Build 17 — Scenario Lab** : vraies situations multi-tours locales ;
- **Build 18 — Error Intelligence** : mémoire des types de confusion ;
- **Safari/Siri Calibration Gate** : uniquement après test réel iPhone ;
- **Build 19 — Curriculum 26→40 / A1 Core** ;
- **Build 20 — Listening Comprehension** ;
- **Build 21 — Adaptive Language Ratio** ;
- puis Real Life French et durcissement V2.

---

# Historique

Le détail complet vit dans [`CHANGELOG.md`](./CHANGELOG.md).

Repères principaux :

- Build 1 — première PWA ;
- Build 3 — DEBUG FR ;
- Build 7–8 — Free Voice ;
- Build 9 — French Trân’quille + Lucie ;
- Build 10.x — durcissement navigateur / Chrome smoke test ;
- Build 11 — 15 leçons / 88 éléments ;
- Build 13 — Learning Memory ;
- Build 14 — refonte UX ;
- Build 15 — 25 leçons / 148 éléments + Daily Coach ;
- **Build 16 — Mastery Engine + gouvernance documentaire**.
