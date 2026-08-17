# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

> Pour reprendre le projet correctement : **`AGENTS.md` → `PROJECT-STATE.md` → `MASTER-ROADMAP.md` → GitHub live**.
>
> Ce README décrit le produit. Il ne remplace pas le checkpoint ni la roadmap canonique.

## État actuel — 2026-08-17

### Version publique affichée

```text
v2.4.0 · Build 36
```

Cette valeur est volontairement le **runtime release anchor** affiché dans Réglages. Elle ne suit pas automatiquement chaque slice interne de roadmap.

### Ligne projet actuelle

```text
Build 35  CLOSED — Memory Evidence v2 readiness
Build 36  CLOSED — Evidence derived shadow / Recovery v3 / 7 stores
Build 37  CLOSED — Foundations Core
Build 38  ACTIVE — Generalization & Transfer
38.9      CLOSED / CERTIFIED / NON-WIRED
```

Le dernier checkpoint Build 38 accepté est le core déterministe `nous → on` :

```text
Nous travaillons. → On travaille.
Nous rentrons.    → On rentre.
Nous allons à…    → On va à…
```

Il est **certifié mais non câblé learner-facing** : aucune carte Transfer supplémentaire n’a été ajoutée automatiquement en leçon 52.

## Pourquoi Réglages affiche encore `v2.4.0 · Build 36` ?

French Trân’quille distingue désormais explicitement trois notions :

```text
Public runtime release   = v2.4.0 · Build 36
Pedagogy baseline        = v2.3.0 · Build 34
Roadmap checkpoint       = Build 38.9
```

Les slices `37.x`, `38.x`, etc. sont des **unités internes d’implémentation/certification**, pas des versions SemVer.

Une version publique ne change que via une décision de release dédiée. Le candidat naturel lorsque Build 38 sera réellement fermé serait **v2.5.0 · Build 38**, mais ce bump n’est pas encore attribué ni livré.

Voir `docs/RELEASE-VERSIONING-POLICY.md`.

## Produit courant

- curriculum : **52 leçons / 313 éléments** ;
- Scenario : **44 situations / 132 tours** ;
- Speaking Loop : **52/52**, max **2 moments / leçon** ;
- Listening : **0.88 normal / 0.65 lent** ;
- Recovery : **7 stores durables** ;
- backup : **enveloppe v3** ;
- Evidence v2 : **7e store derived shadow** ;
- les **6 stores historiques restent la vérité produit** ;
- Premium **V5.10 CLOSED / physical FIELD PASS** ;
- cible terrain principale : **iPhone / Safari / PWA installée** ;
- coût récurrent du runtime : **0 €**.

## Fondations du français — Build 37

Build 37 industrialise des mini-Fondations sans renuméroter les 52 leçons et sans créer de vérité durable parallèle.

Routes certifiées :

```text
F01–F04 → lessons 8–13
F11     → lessons 17–20
F08     → lessons 32–33
F05     → lessons 34–36
F13     → lesson 40 only
F12     → lessons 41–43
```

F16 (`à/de` contractions) reste **deferred / not completed**.

F18 (`spoken-on`) reste **reuse-existing**, canoniquement enseigné par la leçon 52.

## Generalization & Transfer — Build 38

Le but n’est plus seulement de reconnaître une phrase connue, mais de **construire une phrase valide à partir de matériel déjà appris**.

Routes learner-facing actuellement certifiées :

```text
lesson 13 → nominal plural
lesson 33 → subject substitution
lesson 34 → affirmation → negation
lesson 35 → present → futur proche
```

Exemples :

```text
la gare → les gares
Je travaille. → Tu travailles.
Je travaille. → Je ne travaille pas.
Je travaille. → Je vais travailler.
```

Le core 38.9 ajoute une famille pure/non-wired :

```text
nous → on spoken equivalence
```

Une future intégration learner-facing doit d’abord démontrer qu’elle ajoute de la vraie recombinaison sans simplement répéter F18 / la leçon 52.

## Contrats de sécurité permanents

Ne pas casser silencieusement :

- progression historique de Trân ;
- IDs des leçons ;
- `app.js`, `voice-ios.js`, `free-voice.js` sans build explicitement justifié ;
- identité PWA / cache contract de PR #180 ;
- Recovery v3 / backup v3 / sept stores ;
- rôle derived-shadow d’Evidence ;
- les six stores historiques comme vérité produit ;
- curriculum 52/313 ;
- ownership Listening / Scenario / Mastery / Learner Intelligence ;
- Premium V5.10 field-approved ;
- Foundations Build 37 ;
- cores et placements Transfer Build 38 certifiés ;
- renderer Transfer partagé unique.

Continuité historique à préserver :

```text
7 completed lessons
l8 progress = 4
40 known historical items
```

## Audio / voix

Principes verrouillés :

- pas de faux score de prononciation ;
- un échec de reconnaissance vocale n’est pas une preuve de mauvaise prononciation ;
- la réécoute de sa propre voix reste temporaire/locale ;
- l’audio de réécoute n’entre pas dans Memory, progression ou backup.

## Navigation / Premium

Contrat terrain :

```text
ZERO route flash
ZERO remanence
ZERO competing facades
```

Themes first-class :

- Original ;
- Aurora ;
- Sunset ;
- Nocturne.

Premium V5.10 reste fermé après validation physique PWA installée.

## CI historique

Quatre failures historiques restent la baseline connue :

1. `Build 36.2 Evidence shadow adoption` ;
2. `V2.0.0 Freeze tribunal` ;
3. `Build 36.3 Recovery v3 durability tribunal` ;
4. `Build 28 Data recovery smoke`.

Tout autre rouge doit être classifié. Ces dettes historiques ne justifient jamais d’ignorer une nouvelle régression.

## Reprise rapide

```text
read AGENTS.md
→ read PROJECT-STATE.md
→ read MASTER-ROADMAP.md
→ verify live main / PRs / CI / Pages
→ continue from NEXT
```

Le prochain travail canonique est un **audit de placement learner-facing du core 38.9**, pas un démarrage automatique de `38.10` ni de Build 39.
