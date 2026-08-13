# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

# ✅ V2.3.0 — Build 34 · Foundations Pilot — PROD / CLOS runtime

French Trân’quille conserve le curriculum **52 leçons / 313 éléments** de Build 32 et ajoute une première couche de **Fondations du français** sans renuméroter les leçons, sans nouveau store et sans migration.

La maintenance du 2026-08-13 a aussi livré deux correctifs terrain post-Build32 :

- **Navigation** : Listening est fermé avant que la bottom bar route vers `Aujourd’hui / Pratiquer / Progrès`, afin d’éviter l’état blanc/bloqué observé au premier tap ;
- **Réécoute voix** : les courtes captures audio-only n’imposent plus les tranches MediaRecorder de 120 ms ; Safari/iOS peut finaliser une prise complète au `stop()`, ce qui vise le cas `Ghi âm → Dừng ghi âm → pas de ▶ Ma voix` signalé à partir de Bài 11/12.

Ces deux correctifs sont en production mais gardent un **field gate iPhone** jusqu’au retest réel de Trân.

## Baseline produit actuelle

- produit courant : **v2.3.0 • Build 34** ;
- architecture gelée : **2.0.0 • Build 30** ;
- baseline V2 historique : **40 leçons / 241 éléments** ;
- curriculum courant : **52 leçons / 313 éléments** ;
- Scenario : **44 situations / 132 tours** ;
- Listening : **0.88 normal / 0.65 lent** ;
- Speaking Loop : **52/52**, max **2 moments / leçon** ;
- stores pédagogiques durables : **6**, inchangés ;
- coût récurrent : **0 €** ;
- cible principale : **iPhone / Safari / PWA iOS**.

## 🧩 Build 33 — Foundations Audit

L’audit a classé les **313/313 éléments** :

```text
1–15   88 items   structures surtout implicites
16–25  60 items   notes grammaticales contextuelles
26–40  93 items   structures A1 explicites/contextuelles
41–52  72 items   structures Build32 explicites/contextuelles
```

Conclusion : le principal trou n’était pas « aucune conjugaison ». À partir de l16, l’app enseigne déjà explicitement `être`, `avoir`, `vouloir/pouvoir`, les sujets, les possessifs, futur proche, passé récent, passé composé, `devoir`, `on`, etc.

Le trou prioritaire est **plus tôt** : Trân utilise déjà `la gare`, `un billet`, `une table`, `les toilettes`, `la pharmacie`, etc. sans disposer d’une base courte expliquant **genre + articles + singulier/pluriel**.

Voir `docs/BUILD-33-FOUNDATIONS-AUDIT.md`.

## 🧩 Build 34 — pilote F01–F04

Dans les leçons **8–13**, une entrée facultative peut proposer :

**`🧩 Nền tảng nhỏ / Petite base utile`**

Le pilote couvre uniquement :

- **F01** — masculin / féminin ;
- **F02** — `un / une / des` ;
- **F03** — `le / la / l’ / les` ;
- **F04** — singulier / pluriel.

Le flow est volontairement court : explication surtout vietnamienne → exemples connus → 4 mini-questions → rappel que réussir une mini-question ≠ maîtriser la règle → retour exact à la leçon.

Exemples :

```text
la gare
un billet
une table
les toilettes
la pharmacie → les pharmacies
```

### Contrat du pilote

- aucun onglet principal `Grammaire` ;
- aucune leçon 53+ ;
- aucun ID historique modifié ;
- aucune écriture durable liée aux Fondations ;
- aucun nouveau store ;
- aucune migration ;
- pas de score de maîtrise inventé ;
- pas de microphone obligatoire ;
- historique Build30/31/32 rejouable.

Voir `docs/BUILD-34-FOUNDATIONS-PILOT.md`.

## 🔧 Correctif terrain — Navigation

Le bug réel était :

```text
Listening ouvert
→ 1 tap Aujourd’hui
→ corps vide/bloqué indéfiniment
→ 2e tap Home nécessaire pour récupérer
```

Listening est un overlay `body` avec son propre état. Le patch ferme désormais cet overlay **sur le geste physique de navigation**, avant que les handlers historiques changent la route sous-jacente.

Le hotfix terrain a été mergé via PR **#82** et déployé sur `main` **`93f513f719f176c9c059eee7458e31026e602e7f`**, Pages **#139 SUCCESS**.

Le fix reste à confirmer sur le vrai iPhone avec : `Listening → un seul tap Aujourd’hui → Home immédiatement visible`.

## 🎙️ Correctif terrain — Réécoute locale

Il n’existe **aucune règle “à partir de la leçon 11”** dans le Speaking Loop.

Le code n’affiche `▶ Ma voix / Giọng của tôi` qu’après création d’un Blob audio non vide. Le Speaking Loop appelait `MediaRecorder.start(120)`, donc demandait des fragments de 120 ms. Le patch post-Build32 retire ce `timeslice` **uniquement pour les MediaRecorder audio-only** : les petites prises locales peuvent être finalisées en un chunk complet lors du `stop()`.

Important :

- `voice-ios.js` inchangé ;
- `free-voice.js` inchangé ;
- SpeechRecognition inchangé ;
- audio toujours local, temporaire, non sauvegardé ;
- aucun faux score de prononciation.

Le fait que Jerry ait déjà entendu Trân se réécouter auparavant est cohérent avec une **régression/fragilité de finalisation**, pas avec un seuil pédagogique l11.

Field gate restant : Bài 11/12 → enregistrer → arrêter → `▶ Giọng của tôi` apparaît → lecture audible → reconnaissance suivante toujours normale.

## 🧠 Learner Intelligence / contenu courant

Build 32 reste la base pédagogique de contenu :

- 41–46 **Autonomie A1** ;
- 47–52 **Interaction A1** ;
- Learner Intelligence **7 bandes / 52 / 313** ;
- `A1+` interne uniquement, jamais certification CECRL ;
- non-reconnaissance vocale = signal de reconnaissance, pas diagnostic de prononciation.

## 🔐 Stores durables canoniques

```text
francais-avec-luc:learner:v1
french-tranquille:learning-memory:v1
french-tranquille:error-intelligence:v1
french-tranquille:scenarios:v1
french-tranquille:listening:v1
french-tranquille:milestones:v1
```

Recovery reste propriétaire des snapshots `last-good`, `pre-restore`, `pre-migration`, `pre-reset`, `quarantine` et du snapshot historique Build22.

Un ancien profil **7 leçons terminées / l8=4 / 40 acquis** doit rester exactement à cet état et continuer à l8.

## 🛡️ Sanctuaires exacts

- `app.js` — `600f094266c9f0c4c7b57efdbf61129909ebd9cb` ;
- `voice-ios.js` — `38e97aa3ef62dd6dcda224901b435f0973618679` ;
- `free-voice.js` — `b4c19b1936c788ee017eac9ba14e5a62c159e8d5` ;
- `assets/LOGO.png` — `64eaa6ad9781c6a9075d4f68615fc44344c4e21c` ;
- `assets/Favicon.png` — `c358672368a960bf7617e5532aff3e3319cddb3e`.

## ✅ Certification actuelle

### Field reliability

- PR **#82** : tous les tribunaux historiques verts avant merge ;
- runtime hotfix : **`93f513f719f176c9c059eee7458e31026e602e7f`** ;
- Pages **#139 SUCCESS**.

### Foundations

- PR **#84**, head certifié **`6cd47c8c5e11ccccee219217b81b3877408c6e5a`** : tous les workflows existants SUCCESS après rerun inchangé du flake Build32 old-user ;
- runtime `main` : **`259e07c9ed208fe0a7e91998827406b4fdc0bc33`** ;
- **26/26 workflows SUCCESS** sur ce SHA ;
- GitHub Pages **#140 SUCCESS** sur exactement ce SHA.

## Suite canonique

1. **retour terrain Trân** sur les deux correctifs + pilote F01–F04 ;
2. **Build 35 — Memory Evidence v2 / Migration Readiness** : design de `retrieval / listening / scenario / text / recognition / construction / transfer / assistance / récence` ;
3. **Build 36 — adoption candidate** uniquement si snapshot, migration, relecture et rollback sont prouvés ;
4. **Build 37 — Foundations Core Complete** après validation du pilote ;
5. **Build 38 — Generalization & Transfer** ;
6. **Build 39 — Learner Intelligence 3** ;
7. **Build 40 — A1 Consolidation Audit** ;
8. A2 seulement après l’audit.

Ne pas industrialiser F05–F18 avant le retour réel sur le pilote F01–F04.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-33-FOUNDATIONS-AUDIT.md`, `docs/BUILD-34-FOUNDATIONS-PILOT.md`, `docs/BUILD-32-PRACTICAL-A1.md` et `docs/V2-RELEASE.md`.