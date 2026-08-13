# Build 32 — Practical A1 Expansion

Status: **✅ PROD / CLOS**

Release: **French Trân’quille v2.2.0 • Build 32**.

## Intent

Build 32 est une release de contenu + intelligence apprenante au-dessus de la baseline d’architecture V2 gelée. Il ne réécrit pas le cœur historique, ne migre aucune donnée learner et ne touche pas aux sanctuaires voix iPhone.

L’objectif n’était pas d’augmenter le compteur de leçons. Les 40 leçons existantes ont d’abord été auditées : elles couvraient déjà survie, directions, transports de base, heure/date, shopping, restaurant, santé de base, famille, logement, téléphone, météo, présent, futur proche, passé récent/composé, administration et émotions.

Les trous A1 à forte valeur concernaient surtout **l’autonomie et l’interaction** : garder une conversation vivante quand quelque chose n’est pas clair, quantité/emballage, comparaison/choix, invitations/refus, santé/pharmacie plus structurées, consignes de travail, signalement de panne, perturbations transport, petit récit ordonné, avis simple et compréhension du très courant `on` oral.

## Curriculum successeur

Le cœur historique V2 / Build31 reste rejouable comme :

```text
40 leçons / 241 éléments
```

Le produit Build32 devient :

```text
52 leçons / 313 éléments
```

Stage 4 ajoute exactement **12 leçons / 72 éléments**.

### Autonomie A1 — leçons 41–46

41. Clarifier & demander de reformuler
42. Quantités & emballages
43. Comparer & choisir
44. Proposer, inviter & refuser poliment
45. Santé & rendez-vous médical
46. Médicaments & pharmacie

### Interaction A1 — leçons 47–52

47. Travail & consignes
48. Signaler une panne & demander une intervention
49. Retard, annulation & correspondance
50. Raconter dans l’ordre
51. Donner son avis simplement
52. Le `on` du français oral

Les 40 premiers lesson IDs et les 241 premiers item IDs restent dans le même ordre. Stage 4 est ajouté à la suite ; il ne modifie pas ces enregistrements historiques.

## Réutilisation, pas contenu isolé

### Real Life Pack IV

`real-life-data-4.js` ajoute **8 situations / 24 tours**. Scenario courant :

```text
44 situations / 132 tours
```

Les nouvelles situations réutilisent clarification au guichet, comparaison d’achat, invitation avec Jerry, rendez-vous médical, consignes de travail, appel pour réparation d’appartement, train perturbé et conversation naturelle avec `on`.

Chaque ID de preuve du Pack IV est validé contre un vrai acquis du curriculum.

### Listening Pack II

`listening-data-2.js` ajoute :

- **4 contrastes** ;
- **8 mini-dialogues**.

L’extension réutilise le moteur Listening local existant. Les vitesses finales restent **0.88 normal / 0.65 lent**.

### Speaking Loop

Le planner Speaking Loop existant lit le curriculum courant dynamiquement. Build32 prouve une couverture **52/52**, sans nouveau sous-système et toujours avec **2 moments maximum par leçon**.

Aucun score automatique de prononciation n’est introduit.

## Learner Intelligence 2.2

Le learner model ajoute deux bandes :

```text
41–46  Autonomie A1
47–52  Interaction A1
```

Il raisonne donc sur **7 bandes / 52 leçons / 313 éléments**.

`A1+` peut apparaître uniquement comme **étiquette adaptative interne** lorsque les preuves pratiques sont fortes. Ce n’est ni un examen ni une certification CEFR/CECRL.

La reconnaissance vocale reste une preuve neutre : une non-reconnaissance est classée comme signal du système de reconnaissance, jamais comme jugement automatique de prononciation.

Learner Intelligence 2.2 reste read-only vis-à-vis des stores durables.

## Rejeu des tribunaux historiques

Build32 conserve les anciens jalons réellement reproductibles :

- Build31 audit charge le learner model exact **2.1 / Build31 / 40–241 / 5 bandes** ;
- Build30 et les anciens `*Smoke` peuvent rester isolés de Stage 4 ;
- `release-v2.json` reste **2.0.0 / Architecture Build30 / 40–241** ;
- le tribunal V2 distingue baseline gelée et produit V2.x courant, et exige que le courant soit un superset compatible.

La croissance du produit ne réécrit donc pas l’histoire de certification.

## Sécurité des données

Aucun nouveau store durable n’est ajouté.

Aucune migration n’est nécessaire :

- ancien profil : **7 leçons terminées / `l8=4` / 40 acquis → prochaine l8** ;
- profil ayant terminé l1–l40 → **prochaine l41**.

Les six stores Recovery restent le périmètre pédagogique durable complet et sont exigés byte-identiques avant/après les audits Build32.

## Sanctuaires

Build32 conserve les hashes exacts :

```text
app.js                  600f094266c9f0c4c7b57efdbf61129909ebd9cb
voice-ios.js            38e97aa3ef62dd6dcda224901b435f0973618679
free-voice.js           b4c19b1936c788ee017eac9ba14e5a62c159e8d5
assets/LOGO.png         64eaa6ad9781c6a9075d4f68615fc44344c4e21c
assets/Favicon.png      c358672368a960bf7617e5532aff3e3319cddb3e
```

Le gate exact-first-attempt iPhone reste parallèle et hors scope.

## Tribunal Build32 — résultats

Le workflow dédié prouve :

- [x] cœur historique sans Stage 4 = **40/241** ;
- [x] successeur courant = **52/313** ;
- [x] Stage 4 = **12/72** ;
- [x] **313 IDs uniques** ;
- [x] ordre des 40 lesson IDs et 241 item IDs historiques inchangé ;
- [x] Learner Intelligence = **7 bandes couvrant 52/313** ;
- [x] Scenario = **44/132**, Pack IV = **8/24**, zéro ID de preuve invalide ;
- [x] Listening II = **4 contrastes + 8 dialogues**, zéro ID invalide ;
- [x] Speaking Loop = **52/52**, max 2 ;
- [x] clean learner → **leçon 1** ;
- [x] ancien learner → **7 terminées / l8=4 / 40 acquis / prochaine l8** ;
- [x] learner ayant terminé les 40 anciennes leçons → **prochaine l41** ;
- [x] Journey = **7 étapes**, avec 6 leçons dans chaque nouvelle étape ;
- [x] six stores durables byte-identiques ;
- [x] zéro overflow horizontal desktop et 390×844 ;
- [x] V2 gelée, Build31 replay, voix et branding sanctuarisés.

## Certification exacte

### Pull Request

PR runtime **#79**

```text
head
b64539e8f463bde8cabc05cd606f3132b01e2da8

25 / 25 workflows fonctionnels SUCCESS
```

### Runtime `main`

```text
269cb0b476ea131cfbe086a87bcc4364ec39c342

26 / 26 workflows SUCCESS
= 25 fonctionnels + GitHub Pages
0 failure
0 queued
0 in-progress
```

GitHub Pages **#137 = SUCCESS** sur exactement ce SHA runtime.

## Definition of Done

```text
candidate docs                  ✅
PR tous fonctionnels verts      ✅ 25/25
merge du head exact             ✅
main exact tous workflows verts ✅ 26/26
Pages sur SHA exact             ✅ #137
clôture docs séparée            ✅ préparée après certification runtime
```

**Definition of Done Build 32 : ATTEINTE.**

## Suite

La prochaine intention devient **Build 33 — Memory Evidence v2 / Migration Readiness**.

Ce prochain jalon est volontairement **design-first** : dimensions de preuve, schéma candidat, bornes, compatibilité backups, snapshot pré-migration, migration transactionnelle simulable, relecture et rollback. Aucun nouveau schéma durable ni septième store ne sera adopté tant que cette migration n’est pas démontrée réversible sur ancien utilisateur et vieux backups.