# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

# ✅ V2.2.0 — Build 32 · Practical A1 Expansion — PROD / CLOS

French Trân’quille a étendu son curriculum sans réécrire sa baseline historique ni toucher aux sanctuaires voix/données. Le produit courant est **v2.2.0 • Build 32** au-dessus de l’Architecture Runtime gelée **2.0.0 • Build 30**.

Build 32 est parti d’un audit des 40 leçons existantes. Elles couvraient déjà la survie, les directions, les transports de base, les achats, le logement, le téléphone, le présent, le futur proche, le passé récent/composé, l’administration et les émotions. L’extension vise donc surtout **l’autonomie et l’interaction A1**, pas un compteur de leçons artificiel.

## Baseline produit actuelle

- version visible : **v2.2.0 • Build 32** ;
- architecture gelée : **Runtime Contracts / Runtime Bridge 2.0.0 • Build 30** ;
- baseline V2 historique : **40 leçons / 241 éléments** au freeze ;
- curriculum courant : **52 leçons / 313 éléments** ;
- Stage 4 : **12 leçons / 72 éléments** ;
- Scenario : **44 situations / 132 tours** ;
- Real Life Pack IV : **8 situations / 24 tours** ;
- Listening II : **4 contrastes + 8 mini-dialogues** ;
- Listening : **0.88 normal / 0.65 lent** ;
- Speaking Loop : **52/52 leçons couvertes, 2 moments maximum par leçon** ;
- stores durables Recovery : **6**, inchangés ;
- coût récurrent : **0 €**.

## 📚 Stage 4 — français A1 pratique

Deux nouvelles étapes complètent le parcours :

```text
41–46  Autonomie A1
47–52  Interaction A1
```

### Autonomie A1 — 41 à 46

1. Clarifier & demander de reformuler
2. Quantités & emballages
3. Comparer & choisir
4. Proposer, inviter & refuser poliment
5. Santé & rendez-vous médical
6. Médicaments & pharmacie

### Interaction A1 — 47 à 52

1. Travail & consignes
2. Signaler une panne & demander une intervention
3. Retard, annulation & correspondance
4. Raconter dans l’ordre
5. Donner son avis simplement
6. Le **`on`** du français oral

Les **40 premières leçons et les 241 premiers IDs d’acquis restent dans le même ordre**. Stage 4 est ajouté à la suite ; aucun ancien acquis n’a été remplacé pour faire correspondre les chiffres.

## 🎭 Réutilisation au lieu de contenu isolé

`real-life-data-4.js` ajoute **8 situations / 24 tours** : clarification à un guichet, comparaison d’un achat, invitation avec Jerry, rendez-vous médical, consigne au travail, réparation dans l’appartement, train perturbé et petit plan naturel avec `on`.

Le Scenario Engine courant passe ainsi à **44 situations / 132 tours**. Chaque référence de preuve du Pack IV est validée contre un vrai ID du curriculum.

`listening-data-2.js` ajoute **4 contrastes + 8 mini-dialogues** basés sur les nouveaux acquis, sans changer les vitesses finales validées **0.88 / 0.65**.

Le Speaking Loop existant lit le curriculum vivant : il s’étend sans nouveau sous-système et son tribunal confirme **52/52 leçons**, toujours **max 2 moments**.

## 🧠 Learner Intelligence 2.2

Le modèle courant raisonne maintenant sur **7 bandes / 52 leçons / 313 éléments** :

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

- indice interne séparé de la **confiance** ;
- lecture de progression + Learning Memory + Error Intelligence ;
- diversité des contextes de réutilisation ;
- priorité déterministe `review / lesson / practice / maintain` ;
- neutralité de la reconnaissance vocale.

`A1+` peut apparaître comme **étiquette interne d’adaptation uniquement**. Ce n’est ni un examen ni une certification CECRL.

Une non-reconnaissance vocale reste un signal du **système de reconnaissance**, jamais un score de prononciation.

## 🧊 Baselines historiques rejouables

Build 32 ne réécrit pas le passé pour rendre les tests verts :

- `release-v2.json` reste exactement **2.0.0 / Architecture Build 30 / 40–241** ;
- le tribunal V2 distingue maintenant cette baseline gelée du produit V2.x courant et exige que le courant reste un **superset compatible** ;
- Build 31 peut rejouer exactement son learner model **2.1 / Build 31 sur 40/241** ;
- Build 30 et les vieux `*Smoke` gardent leur monde historique ;
- la CI protège toujours explicitement **v1.17.0 — Build 24 — Real Life French II** : **28 situations / 84 tours** avant Pack III, avec `real-life-data-2.js` comme témoin historique.

## 🔐 Données / Recovery

Build 32 n’ajoute **aucun store** et ne nécessite **aucune migration**.

```text
francais-avec-luc:learner:v1
french-tranquille:learning-memory:v1
french-tranquille:error-intelligence:v1
french-tranquille:scenarios:v1
french-tranquille:listening:v1
french-tranquille:milestones:v1
```

Le tribunal navigateur exige ces six valeurs brutes byte-identiques avant/après le calcul Build32.

Un ancien profil à **7 leçons terminées / `l8=4` / 40 acquis** reste exactement à cet état et reçoit toujours **l8** comme prochaine leçon. Un profil ayant terminé les 40 leçons historiques continue naturellement à **l41**.

## 🎙️ Gate iPhone toujours parallèle

Build 32 ne modifie ni `voice-ios.js`, ni `free-voice.js`, ni la logique de capture automatique du premier essai.

Le gate terrain reste :

```text
reconnaissance Free Voice
→ seconde prise locale
→ lecture
→ reconnaissance suivante toujours normale
```

Il bloque uniquement une future capture automatique du premier essai exact. Il ne bloque ni contenu, ni niveau, ni travail de mémoire hors cette capture.

## 🛡️ Sanctuaires exacts

- `app.js` — `600f094266c9f0c4c7b57efdbf61129909ebd9cb` ;
- `voice-ios.js` — `38e97aa3ef62dd6dcda224901b435f0973618679` ;
- `free-voice.js` — `b4c19b1936c788ee017eac9ba14e5a62c159e8d5` ;
- `assets/LOGO.png` — `64eaa6ad9781c6a9075d4f68615fc44344c4e21c` ;
- `assets/Favicon.png` — `c358672368a960bf7617e5532aff3e3319cddb3e` ;
- learner canonique `francais-avec-luc:learner:v1`.

## ✅ Certification Build 32

- PR runtime **#79**, head certifié `b64539e8f463bde8cabc05cd606f3132b01e2da8` : **25/25 workflows fonctionnels SUCCESS** ;
- runtime mergé sur `main` : **`269cb0b476ea131cfbe086a87bcc4364ec39c342`** ;
- exact `main` runtime : **26/26 SUCCESS**, Pages comprise ;
- GitHub Pages **#137 SUCCESS** sur exactement ce SHA ;
- clean learner → prochaine **leçon 1** ;
- ancien profil mobile → **7 terminées / l8=4 / 40 acquis**, prochaine **leçon 8** ;
- profil ayant terminé l1–l40 → prochaine **leçon 41** ;
- parcours complet : **7 étapes**, nouvelles étapes à 6 leçons chacune ;
- Stage 4 **12/72**, 313 IDs uniques ;
- Scenario **44/132**, Pack IV **8/24**, zéro référence invalide ;
- Listening II **4 + 8**, zéro référence invalide ;
- Speaking Loop **52/52**, max 2 ;
- V2 Freeze Compatibility, Build31 replay, Build30 Architecture, Recovery, iPhone/PWA, Speaking et tous les anciens parcours restent verts ;
- six stores durables inchangés ;
- zéro overflow horizontal sur les audits desktop/mobile.

## Suite canonique

La prochaine intention est **Build 33 — Memory Evidence v2 / Migration Readiness**.

Ce build commencera **par le design**, pas par une migration nocturne : modalités/contextes/assistance/récence/confiance, schéma candidat, compat backups, snapshot pré-migration, validation, rollback et ancien-utilisateur. **Aucun nouveau schéma durable ni septième store ne sera adopté tant que la migration n’est pas prouvée réversible.**

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-31-LEARNER-INTELLIGENCE.md`, `docs/BUILD-32-PRACTICAL-A1.md` et `docs/V2-RELEASE.md`.