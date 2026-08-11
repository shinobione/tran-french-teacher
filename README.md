# French Trân’quille

PWA de français pensée pour **Trân**, vietnamienne débutante absolue au départ (**A0**), avec pédagogie majoritairement vietnamienne au début puis introduction progressive du français réellement utile.

## Version actuelle

- **v1.11.0**
- **Build 18**
- Phase : **PWA-3B / Error Intelligence**
- curriculum : **25 leçons / 148 éléments**
- Scenario Lab : **12 situations / 36 tours**
- parcours : **A0 → premières fondations A1**
- coût d’exploitation : **0 €**

## Documentation canonique

- [`ROADMAP.md`](./ROADMAP.md) — futur, ordre, dépendances, critères de clôture ;
- [`CHANGELOG.md`](./CHANGELOG.md) — historique des builds ;
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) — modules, stockage et ordre runtime ;
- [`docs/BUILD-POLICY.md`](./docs/BUILD-POLICY.md) — règles de livraison ;
- PWA : `https://shinobione.github.io/tran-french-teacher/`.

---

# Build 18 — Error Intelligence

Build 18 répond à une question simple :

> **Pourquoi Lucie décide-t-elle qu’un élément mérite de revenir ?**

Learning Memory savait déjà qu’un élément était nouveau, fragile, en cours ou solide. Error Intelligence ajoute une couche de **preuves observables** : où l’élément a posé problème, si cela se répète, si Trân a eu besoin d’un modèle, et si elle a ensuite récupéré.

## Règle fondamentale : pas de pseudo-diagnostic

French Trân’quille ne prétend pas savoir qu’une erreur vient d’un article, d’une négation ou d’un ordre des mots simplement parce que la phrase cible contient ces structures.

Build 18 commence par des catégories démontrables :

```text
retrieval-difficult
text-mismatch
scenario-miss
assisted
voice-unrecognized
partial
practice-miss
repeated-miss
```

Exemples :

- **retrieval-difficult** : une carte de révision est explicitement notée difficile ;
- **scenario-miss** : une réponse est refusée dans Scenario Lab ;
- **assisted** : le modèle a dû être utilisé pour continuer ;
- **voice-unrecognized** : le navigateur a produit une transcription qui ne correspond pas à la cible ;
- **partial** : une partie significative de la cible est réellement présente dans la réponse texte ;
- **repeated-miss** : l’élément échoue plusieurs fois dans une fenêtre rapprochée.

`voice-unrecognized` signifie **« la phrase cible n’a pas été reconnue par le navigateur »**, pas **« mauvaise prononciation »**.

---

## Stockage Error Intelligence

Clé locale :

```text
french-tranquille:error-intelligence:v1
```

Pour chaque élément, le moteur conserve notamment :

- compteurs par type ;
- nombre total de difficultés ;
- récupérations ;
- série actuelle d’erreurs ;
- dernière difficulté ;
- dernière récupération ;
- dernier type ;
- dernière source ;
- petit historique d’événements.

### Taille bornée

Afin de ne pas laisser `localStorage` grossir indéfiniment :

- maximum **20 événements par élément** ;
- maximum **120 événements récents globaux**.

Les compteurs agrégés restent conservés même lorsque les événements les plus anciens sortent de la fenêtre détaillée.

---

# Récence, répétition et récupération

Le moteur tient compte de trois choses différentes.

### Récence

Une difficulté survenue il y a quelques minutes pèse davantage qu’un ancien incident.

### Répétition

Deux difficultés rapprochées sur le même élément constituent une preuve plus forte qu’une erreur isolée.

### Récupération

Une réussite après des difficultés remet `errorStreak` à zéro et augmente le compteur de récupération.

Le but n’est donc pas d’accumuler une liste permanente de « fautes de Trân », mais de détecter **ce qui mérite de revenir maintenant** puis de laisser la difficulté perdre du poids lorsqu’elle disparaît.

---

# Daily Coach + Error Intelligence

Build 18 enrichit la carte **Séance du jour**.

Lorsqu’un élément présente une priorité suffisamment forte, une ligne dédiée peut apparaître avec :

- la phrase concernée ;
- le type de preuve dominante si elle est réellement répétée ;
- la récence ;
- un accès direct à Révision.

Le calcul combine :

```text
récence
+ répétition
+ nombre d’incidents
+ nécessité d’assistance
- récupérations
```

Error Intelligence n’écrase pas Daily Coach : il lui fournit un **signal supplémentaire**.

---

# Progression — Error Intelligence

Progression reçoit une carte dédiée affichant :

- difficultés observées sur 24 h ;
- éléments récurrents ;
- modèles utilisés ;
- incidents voix ;
- récupérations ;
- points prioritaires à retravailler ;
- mini-bilan de la session courante.

L’interface évite volontairement le vocabulaire culpabilisant : il s’agit de **points à retravailler**, pas d’un tableau rouge de fautes.

---

# Free Voice → Learning Memory

Build 18 corrige aussi une dette historique.

Le Guided Free Voice validait les réponses localement, mais ses tentatives n’alimentaient pas encore directement Learning Memory.

Désormais :

```text
Free Voice
   ↓
phrase reconnue / non reconnue
   ↓
Learning Memory.recordPractice()
   ↓
Error Intelligence.recordAttempt()
```

Sources utilisées :

```text
free-voice-voice
free-voice-text
```

Le mode texte permet également de reconnaître une réponse **partielle** lorsque l’intersection de mots avec la cible est objectivement suffisante.

Une erreur d’autorisation micro ou un navigateur sans reconnaissance vocale **n’est pas enregistrée comme erreur d’apprentissage** : ce serait une erreur technique, pas une preuve linguistique.

---

# Scenario Lab → Error Intelligence

Scenario Lab alimentait déjà Learning Memory avec :

```text
scenario-success
scenario-miss
scenario-assisted
```

Error Intelligence observe les changements de Learning Memory et transforme les deux derniers en preuves :

```text
scenario-miss → erreur en situation
scenario-assisted → modèle nécessaire
```

Les succès ultérieurs peuvent compter comme récupération.

---

# Révision → Error Intelligence

Lorsqu’un élément est évalué **Difficile** dans la révision intelligente, Learning Memory enregistre un rating `0`.

Build 18 l’interprète comme :

```text
retrieval-difficult
```

C’est une preuve valide : l’utilisatrice a explicitement indiqué que le rappel était difficile.

---

# Export local

Réglages reçoit un export Error Intelligence séparé :

```text
french-tranquille-errors-YYYY-MM-DD.json
```

Format :

```text
french-tranquille-error-intelligence
version 1
```

Il contient uniquement les données locales Error Intelligence.

Aucun envoi réseau n’est effectué.

La sauvegarde pédagogique générale Build 13 reste inchangée pour éviter de casser son format historique dans le même build.

---

# Build 17 — Scenario Lab

Scenario Lab reste disponible avec :

- 12 situations ;
- 36 tours ;
- déverrouillage selon les leçons terminées ;
- indices ;
- modèles après plusieurs erreurs ;
- stats locales ;
- synthèse vocale ;
- SpeechRecognition lorsqu’exposé ;
- fallback texte ;
- pont Learning Memory.

Clé :

```text
french-tranquille:scenarios:v1
```

---

# Build 16 — Mastery Engine

Le Mastery Engine distingue :

```text
leçon terminée
≠ acquis connu
≠ compétence consolidée
```

Étapes suivies :

1. Survie A0 ;
2. Vie quotidienne A0 ;
3. Fondations A1 ;
4. Premiers échanges A1.

Les niveaux A0 / A0+ / A1- / A1 affichés sont des **indicateurs internes**, jamais une certification CECRL.

Build 18 ne modifie pas les seuils de maîtrise : Error Intelligence est exposé comme signal complémentaire pour les futurs builds adaptatifs.

---

# Learning Memory

Clé :

```text
french-tranquille:learning-memory:v1
```

États :

```text
Nouveau
Fragile
En cours
Solide
```

Learning Memory reste la source de vérité pour l’espacement des révisions. Error Intelligence explique davantage **la nature observable et la récence des difficultés**.

---

# Architecture runtime

Ordre actuel :

```text
app.js
↓
curriculum-stage2.js
↓
stage2-boot.js
↓
debug / voice
↓
learning-memory.js
↓
daily-coach.js
↓
mastery-engine.js
↓
scenario-data.js
↓
scenario-host.js
↓
scenario-engine.js
↓
error-intelligence.js
```

`app.js` historique reste sanctuarisé.

Voir [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md).

---

# Données locales principales

```text
francais-avec-luc:learner:v1
french-tranquille:learning-memory:v1
french-tranquille:scenarios:v1
french-tranquille:error-intelligence:v1
tran-french-teacher:debug-fr:v1
```

Aucun Build 18 ne force de reset.

---

# Voix — limitation assumée

French Trân’quille utilise :

- `speechSynthesis` ;
- `SpeechRecognition` / `webkitSpeechRecognition` quand disponible ;
- fallback texte permanent.

Il peut mesurer :

- transcription obtenue ;
- cible reconnue ou non ;
- nombre d’essais ;
- répétition d’un échec de reconnaissance.

Il ne peut pas déduire proprement :

- qualité du R ;
- U / OU ;
- nasalisation ;
- accent ;
- précision phonétique réelle.

La calibration Safari/Siri spécifique reste donc un **gate nécessitant un test réel iPhone**.

---

# DEBUG FR

Le DEBUG FR reste local au navigateur de contrôle :

- appareil de Trân inchangé ;
- activation dans Réglages ;
- raccourci `?debug=fr`.

---

# Qualité / CI

Build 18 doit passer :

```text
syntax checks
→ anciens guards Builds 12–17
→ contrat Error Intelligence
→ limites de stockage
→ Free Voice / Memory bridge
→ Chrome Home
→ Chrome Scenario Lab
→ Chrome Error Intelligence
→ merge
→ CI main
→ GitHub Pages
```

Le smoke test Error Intelligence utilise `?errorSmoke=1` pour générer uniquement dans le navigateur CI quelques preuves locales contrôlées puis ouvrir Progression.

Voir [`docs/BUILD-POLICY.md`](./docs/BUILD-POLICY.md).

---

# Roadmap

👉 [`ROADMAP.md`](./ROADMAP.md)

Après Build 18 :

- Safari/Siri Calibration Gate lorsqu’un vrai test iPhone est disponible ;
- **Build 19 — Curriculum 26→40 / A1 Core** ;
- **Build 20 — Listening Comprehension** ;
- **Build 21 — Adaptive Language Ratio** ;
- puis Real Life French et durcissement V2.

---

# Historique

👉 [`CHANGELOG.md`](./CHANGELOG.md)

Derniers jalons :

- Build 15 — 25 leçons / 148 éléments + Daily Coach ;
- Build 16 — Mastery Engine + gouvernance documentaire ;
- Build 17 — Scenario Lab ;
- **Build 18 — Error Intelligence**.
