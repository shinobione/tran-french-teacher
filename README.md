# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## État de cette branche

# 🚧 V2.2.0 — Build 32 · Practical A1 Expansion — CANDIDAT

La production `main` certifiée avant cette branche reste **v2.1.0 • Build 31**. Cette branche prépare son successeur **v2.2.0 • Build 32** ; elle ne devient PROD qu’après PR entièrement verte, merge du head exact, validation du `main` exact et GitHub Pages sur ce même SHA.

Build 32 part d’un audit du curriculum existant plutôt que d’ajouter des leçons au hasard. Les 40 leçons historiques couvrent déjà la survie, la vie quotidienne, les transports de base, les achats, le logement, le téléphone, le présent, le futur proche, le passé récent/composé, l’administration et les émotions.

Le candidat ajoute donc surtout ce qui manque pour **gagner en autonomie et interagir réellement**.

### Candidat produit

- version cible : **v2.2.0 • Build 32** ;
- architecture gelée dessous : **Runtime Contracts / Runtime Bridge 2.0.0 • Build 30** ;
- baseline V2 historique : **40 leçons / 241 éléments** ;
- curriculum courant candidat : **52 leçons / 313 éléments** ;
- Stage 4 : **12 leçons / 72 éléments** ;
- Scenario candidat : **44 situations / 132 tours** ;
- Real Life Pack IV : **8 situations / 24 tours** ;
- Listening II : **4 nouveaux contrastes + 8 mini-dialogues** ;
- Listening final : **0.88 normal / 0.65 lent**, inchangé ;
- Speaking Loop : **2 moments maximum par leçon**, couverture attendue **52/52** ;
- stores durables Recovery : **6**, inchangés ;
- coût récurrent : **0 €**.

## 📚 Build 32 — Practical A1

Deux nouvelles étapes complètent le parcours :

```text
41–46  Autonomie A1
47–52  Interaction A1
```

### Autonomie A1

- clarifier et demander de reformuler ;
- quantités et emballages ;
- comparer et choisir ;
- proposer, inviter, accepter/refuser poliment ;
- santé et rendez-vous médical ;
- médicaments et pharmacie.

### Interaction A1

- travail et consignes ;
- signaler une panne / demander une intervention ;
- retard, annulation et correspondance ;
- raconter un petit événement dans l’ordre ;
- donner son avis simplement ;
- comprendre et utiliser le très courant **`on`** du français oral.

Les 40 premières leçons et les 241 premiers IDs d’acquis restent dans le même ordre. Stage 4 s’ajoute à la suite ; il ne remplace pas le curriculum historique.

## 🎭 Réutilisation réelle

`real-life-data-4.js` ajoute 8 situations liées directement aux nouvelles capacités : guichet incompris, choix en magasin, invitation avec Jerry, rendez-vous médical, consigne au travail, réparation dans l’appartement, train perturbé et plan naturel avec `on`.

Chaque tour reste déterministe et local. Aucun pseudo-LLM JavaScript ne décide si une phrase « semble bonne ».

## 🎧 Listening II

`listening-data-2.js` réutilise les nouveaux acquis dans 4 contrastes et 8 dialogues. Les références doivent toutes pointer vers de vrais IDs du curriculum.

La couche voix validée reste inchangée : **0.88 / 0.65** arrive toujours jusqu’à la dernière couche vocale.

## 🧠 Learner Intelligence 2.2

Le modèle courant candidat raisonne sur **7 bandes / 52 leçons / 313 éléments** :

```text
1–7    Survie A0
8–15   Vie quotidienne A0
16–20  Fondations A1
21–25  Premiers échanges A1
26–40  A1 Core
41–46  Autonomie A1
47–52  Interaction A1
```

Il conserve :

- indice interne séparé de la confiance ;
- priorité déterministe révision / prochaine leçon / pratique ;
- prise en compte Memory + Error + diversité de réutilisation ;
- neutralité de la reconnaissance vocale.

`A1+` peut apparaître comme **étiquette interne d’adaptation uniquement**. Ce n’est jamais une certification CECRL.

## 🧊 Baselines historiques rejouables

Build 32 ne réécrit pas les anciens tribunaux :

- Build 31 peut toujours rejouer exactement son learner model **2.1 / 31 sur 40/241** ;
- Build 30 et les anciens `*Smoke` restent capables de tester leur runtime historique ;
- `release-v2.json` reste volontairement **2.0.0 / Architecture Build 30 / 40–241** ;
- le tribunal V2 distingue maintenant le contrat gelé du produit V2.x courant et exige que le courant reste un **superset compatible**.

La CI protège toujours explicitement **v1.17.0 — Build 24 — Real Life French II** : **28 situations / 84 tours** avant Pack III, avec `real-life-data-2.js` comme référence historique.

## 🔐 Données / Recovery

Build 32 ne crée aucun store et n’effectue aucune migration.

Stores canoniques inchangés :

```text
francais-avec-luc:learner:v1
french-tranquille:learning-memory:v1
french-tranquille:error-intelligence:v1
french-tranquille:scenarios:v1
french-tranquille:listening:v1
french-tranquille:milestones:v1
```

Une ancienne utilisatrice à **7 leçons terminées / `l8=4` / 40 acquis** doit rester exactement dans cet état. Une utilisatrice ayant terminé les 40 leçons historiques doit simplement recevoir **l41** comme prochaine étape.

## 🎙️ Voix : gate iPhone toujours parallèle

Build 32 ne modifie ni `voice-ios.js`, ni `free-voice.js`, ni la logique de capture automatique du premier essai.

Le gate terrain reste :

```text
reconnaissance Free Voice
→ seconde prise locale
→ lecture
→ reconnaissance suivante toujours normale
```

Il bloque uniquement une future capture automatique du premier essai exact. Il ne bloque pas ce build de contenu/intelligence.

## 🛡️ Sanctuaires

- `app.js` — `600f094266c9f0c4c7b57efdbf61129909ebd9cb` ;
- `voice-ios.js` — `38e97aa3ef62dd6dcda224901b435f0973618679` ;
- `free-voice.js` — `b4c19b1936c788ee017eac9ba14e5a62c159e8d5` ;
- `assets/LOGO.png` — `64eaa6ad9781c6a9075d4f68615fc44344c4e21c` ;
- `assets/Favicon.png` — `c358672368a960bf7617e5532aff3e3319cddb3e` ;
- learner canonique `francais-avec-luc:learner:v1`.

## Tribunal candidat Build 32

Le workflow dédié doit notamment prouver :

- baseline 40/241 rejouée sans Stage 4 ;
- produit courant 52/313 ;
- Stage 4 12/72 et IDs uniques ;
- Scenario 44/132 + Pack IV 8/24 ;
- Listening II 4 + 8 ;
- Speaking Loop 52/52, max 2 ;
- 7 bandes Learner Intelligence ;
- ancien profil `l8=4` byte-identique ;
- profil ayant fini l40 → l41 ;
- parcours complet = 7 étapes ;
- zéro overflow horizontal desktop/mobile ;
- six stores durables inchangés ;
- tous les sanctuaires exacts.

## Production précédente certifiée

**V2.1.0 — Build 31 · Learner Intelligence Core** reste la dernière production certifiée tant que Build32 n’a pas terminé son cycle de release.

Build31 avait été certifié via PR runtime **#77**, puis `main` runtime `e2b2c6293f35495fa8bbffd2e6b684fba897df88` avec **25/25 SUCCESS** Pages comprise et clôture documentaire finale `d7da5d1cce7c94dc8bb685d7019daebbff1a4296`.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-31-LEARNER-INTELLIGENCE.md`, `docs/BUILD-32-PRACTICAL-A1.md` et `docs/V2-RELEASE.md`.