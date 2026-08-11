# French Trân’quille

PWA de français pensée pour **Trân**, vietnamienne débutante au départ (**A0**), avec vietnamien comme langue de soutien puis davantage de français à mesure que les acquis deviennent réellement utilisables.

## Version en production

- **v1.12.0**
- **Build 19 — A1 Core**
- statut : **PROD / GitHub Pages**
- curriculum cible : **40 leçons / 238 éléments**
- ajout Build 19 : **15 leçons / 90 éléments**
- Scenario Lab : **12 situations / 36 tours**
- Learning Memory + Daily Coach + Mastery + Error Intelligence
- coût d’exploitation : **0 €**
- cible principale : **iPhone / Safari / PWA iOS**

> Build 19 a été validé sur PR, sur `main`, sur GitHub Pages et par un rendu Chrome direct de l’URL publique.

## Liens projet

- [`ROADMAP.md`](./ROADMAP.md)
- [`CHANGELOG.md`](./CHANGELOG.md)
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
- [`docs/BUILD-POLICY.md`](./docs/BUILD-POLICY.md)
- [`docs/BUILD-19-A1-CORE.md`](./docs/BUILD-19-A1-CORE.md)
- PWA : `https://shinobione.github.io/tran-french-teacher/`

---

# Build 19 — A1 Core

Build 19 étend le parcours sans réécrire le moteur historique.

```text
25 leçons / 148 éléments
        ↓
+ 15 leçons / 90 éléments
        ↓
40 leçons / 238 éléments
```

Les nouvelles leçons sont chargées par `curriculum-stage3.js` avant le rerender curriculum existant. Les 25 anciennes leçons restent inchangées.

## Leçons 26 → 40

26. **Nombres 11 → 20** ;
27. **Nombres 20 → 100 & prix** ;
28. **Jours de la semaine** ;
29. **Mois & dates** ;
30. **Heure plus précise** — et quart, et demie, moins le quart, midi, minuit ;
31. **Possessifs** — mon/ma/mes, ton/ta/tes ;
32. **Présent avec tu** ;
33. **Présent avec il / elle** ;
34. **Présent avec nous** ;
35. **Futur proche** — aller + infinitif ;
36. **Passé récent** — venir de + infinitif ;
37. **Passé composé fréquent avec avoir** ;
38. **Passé composé avec être** et formes féminines utiles à Trân ;
39. **Administration & documents** ;
40. **Émotions, besoins & proches** — dont `Tu me manques`.

Chaque leçon Build 19 contient exactement **6 éléments**, une intro VI/FR, une mini-structure utile et une situation finale.

## Philosophie grammaticale

On ne crée pas de chapitre « conjugaison du présent » isolé.

La progression est volontairement :

```text
je déjà connu
→ tu
→ il / elle
→ nous
→ futur proche
→ passé récent
→ passé composé fréquent
```

Les formes arrivent parce qu’elles permettent de parler, pas parce qu’un programme scolaire exige un tableau.

---

# A1 Core Mastery

`mastery-stage3.js` ajoute un **cinquième palier** indépendant des quatre étapes historiques.

Il suit les leçons 26–40 avec :

- leçons terminées ;
- éléments connus ;
- éléments réellement révisés ;
- éléments solides ;
- fragilités.

Le statut `Maîtrisé` exige notamment :

- 15/15 leçons terminées ;
- ≥ 95 % des items connus ;
- ≥ 70 % avec preuve de révision ;
- ≥ 55 % solides ;
- ≤ 20 % fragiles.

Ce score reste **un indicateur pédagogique interne**, jamais une certification CECRL.

---

# Mémoire et adaptation

Les nouveaux IDs Stage 3 rejoignent le curriculum global ; ils deviennent donc automatiquement visibles par :

- **Learning Memory** ;
- **Free Voice** ;
- **Error Intelligence** ;
- **Daily Coach** ;
- **Mastery Stage 3**.

Aucune nouvelle clé apprenant n’est nécessaire et aucun reset n’est prévu.

## Learning Memory

Clé : `french-tranquille:learning-memory:v1`

États : Nouveau / Fragile / En cours / Solide.

## Error Intelligence

Clé : `french-tranquille:error-intelligence:v1`

Build 18 reste intact : historique borné **20 événements / élément**, **120 récents globaux**, récence, répétition, récupération et classification fondée sur des preuves observables.

## Scenario Lab

Clé : `french-tranquille:scenarios:v1`

Les 12 scénarios Build 17 restent présents. Build 19 n’ajoute volontairement pas de nouveaux scénarios : son intention principale est le curriculum A1 Core.

---

# Voix

Toujours 0 € :

- `speechSynthesis` ;
- `SpeechRecognition` / `webkitSpeechRecognition` quand disponible ;
- fallback texte permanent ;
- Free Voice → Learning Memory + Error Intelligence.

La calibration Safari/Siri reste un **gate séparé** jusqu’au test réel sur l’iPhone de Trân.

French Trân’quille ne transforme jamais « la transcription ne correspond pas » en faux verdict phonétique.

---

# Runtime Build 19

```text
app.js
↓
curriculum-stage2.js       # leçons 16–25
↓
curriculum-stage3.js       # leçons 26–40
↓
stage2-boot.js             # un seul rerender pour Stage 2 + 3
↓
debug / voice
↓
learning-memory.js
↓
daily-coach.js
↓
mastery-engine.js
↓
mastery-stage3.js
↓
scenario-data.js
↓
scenario-host.js
↓
scenario-engine.js
↓
error-intelligence.js
↓
build-meta.js              # source finale de version runtime
```

`app.js` historique reste sanctuarisé.

---

# Qualité Build 19

Le workflow est normalisé autour de l’état courant plutôt que d’empiler un `grep` différent pour chaque build depuis la V1.

Contrats :

- syntaxe de tous les modules ;
- 15 leçons Stage 3 ;
- 6 items par leçon ;
- 90 items Stage 3 ;
- IDs curriculum uniques ;
- non-régression Scenario Lab ;
- non-régression Error Intelligence ;
- câblage PWA/cache/version ;
- Mastery A1 Core ;
- Chrome Home : 40 leçons + leçon 40 ;
- Chrome Scenario ;
- Chrome Error Intelligence ;
- Chrome A1 Core / Progression.

Voir [`docs/BUILD-19-A1-CORE.md`](./docs/BUILD-19-A1-CORE.md).

---

# DEBUG FR

Le DEBUG FR reste local au navigateur de Jerry. L’appareil de Trân reste en vietnamien.

Raccourci : `?debug=fr`.

---

# Roadmap

Après Build 19 :

- **Build 20 — Listening Comprehension** ;
- **Build 21 — Adaptive Language Ratio** ;
- Safari/Siri Calibration Gate dès que le test réel iPhone est disponible ;
- puis Real Life French et durcissement V2.

Le détail et les critères de clôture sont dans [`ROADMAP.md`](./ROADMAP.md).
