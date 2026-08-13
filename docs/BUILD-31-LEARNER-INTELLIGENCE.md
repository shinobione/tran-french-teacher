# Build 31 — Learner Intelligence Core

## Statut

**v2.1.0 • Build 31 — PROD / CLOS**

Runtime certifié : `e2b2c6293f35495fa8bbffd2e6b684fba897df88`.

Build31 est la première évolution produit explicitement ouverte après le freeze V2.0. Il reste indépendant du gate terrain iPhone relatif à une future capture automatique du premier essai vocal.

## Problème traité

Avant Build31, French Trân’quille possède déjà plusieurs sources de preuve utiles mais historiques :

- progression learner ;
- Learning Memory ;
- Error Intelligence ;
- Mastery 1–25 ;
- Mastery Stage3 26–40 ;
- Scenario / Listening / Speaking.

Le risque pour la suite était d’ajouter des leçons 41+ alors que la vision du niveau et de la priorité suivante restait fragmentée.

Build31 choisit donc un **agrégateur read-only** avant toute extension de contenu ou migration mémoire.

## Périmètre

### Ajouté

```text
build31-loader.js
learner-intelligence.js
learner-intelligence.css
learner-intelligence-smoke.js
.github/workflows/build31-learner-intelligence.yml
```

### Adapté

```text
build-meta.js
settings-legal.js
sw.js
v2-release-smoke.js
.github/workflows/v2-release-freeze.yml
.github/workflows/build30-architecture-hardening.yml
```

### Non touché

```text
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
les six stores Recovery
le curriculum 40 / 241
Scenario 36 / 108
Listening 0.88 / 0.65
Speaking max 2
```

## Modèle apprenant

Build31 unifie les 40 leçons en cinq bandes :

| Bande | Leçons | Intention |
|---|---:|---|
| Survival A0 | 1–7 | survie et premières fonctions |
| Daily A0 | 8–15 | vie quotidienne |
| Foundations A1 | 16–20 | fondations A1 |
| First Exchanges A1 | 21–25 | premiers échanges autonomes |
| A1 Core | 26–40 | consolidation A1 |

Pour chaque item, le moteur observe :

- état connu ;
- leçon terminée ;
- présence de preuves Learning Memory ;
- statut `new / fragile / learning / solid` ;
- échéance ;
- signal Error Intelligence ;
- variété des types de contexte observés.

Pour chaque bande, il produit :

- couverture ;
- rétention ;
- pression de risque ;
- score interne ;
- confiance séparée ;
- état d’apprentissage.

Le profil global utilise des codes internes :

```text
A0
A0+
Pré-A1
A1-
A1
```

Ils ne sont pas une certification CECRL.

## Pourquoi score + confiance

Un score unique serait trompeur : une apprenante peut avoir parcouru beaucoup de contenu mais disposer de peu de preuves de réutilisation espacée.

Build31 sépare donc :

- **indice interne** : ce que les preuves actuelles suggèrent sur la maîtrise ;
- **confiance** : quantité/diversité suffisante ou non pour croire cette estimation.

Une future Memory Evidence v2 pourra enrichir cette confiance sans changer le principe.

## Recommandation déterministe

Ordre :

1. priorité Error forte + acquis fragile/dû ;
2. révision courte si accumulation de fragiles/dus ;
3. prochaine leçon incomplète ;
4. pratique si curriculum terminé mais preuves insuffisantes ;
5. entretien sinon.

Sorties : `review`, `lesson`, `practice`, `maintain`.

## Contrat voix

Toute source contenant `voice` est classée par Build31 comme :

```text
recognition
```

Cela impose :

```text
voice-unrecognized
≠ mauvaise prononciation certifiée
≠ score phonétique
```

Build31 ne modifie aucun comportement SpeechRecognition.

## Contrat données

Learner Intelligence et son loader ne possèdent aucun `localStorage.setItem`.

Ils lisent les stores existants sans :

- créer de 7e store ;
- migrer le learner ;
- modifier Learning Memory ;
- modifier Error Intelligence ;
- modifier Recovery.

Le tribunal capture les six stores bruts avant/après et exige l’égalité byte-à-byte.

## Architecture V2.x

Build31 introduit une distinction durable :

```text
version produit courante    v2.1.0 / Build 31
architecture gelée          v2.0.0 / Build 30
release-v2.json             v2.0.0 / Build 30
```

Le tribunal V2 devient un **compatibility tribunal** : une V2.x peut avancer si le socle gelé, les stores, les backups, les routes et les sanctuaires restent compatibles.

## PWA

Les assets Build31 sont précachés additivement.

L’identité de cache validée au Build29 est conservée volontairement : le service worker change et met à jour le cache existant sans provoquer une migration PWA opportuniste.

## UI

Une seule nouvelle surface visible : carte **Plan d’apprentissage intelligent / Kế hoạch học thông minh** dans Progrès.

Elle expose :

- niveau interne ;
- indice ;
- confiance ;
- prochaine priorité.

Le raisonnement détaillé est dans un `<details>` fermé par défaut.

Aucune nouvelle route ni tab bar.

## Tribunal Build31

Workflow : `.github/workflows/build31-learner-intelligence.yml`.

### Profil propre desktop

Attendus :

- 2.1.0 / 31 ;
- 5 bandes = 40 / 241 ;
- recommandation `lesson / l1` ;
- voice neutral ;
- carte visible ;
- détails fermés ;
- stores inchangés ;
- zéro overflow.

### Ancien profil mobile 390×844

Attendus :

```text
completed  = 7
l8         = 4
known      = 40
next       = l8
```

Plus stores inchangés et zéro overflow.

## Certification

- PR runtime **#77** ;
- head certifié `eed097ca3d261f2f4dd60db930a11670511f33a1` ;
- **24/24 workflows fonctionnels SUCCESS** sur PR ;
- runtime mergé `e2b2c6293f35495fa8bbffd2e6b684fba897df88` ;
- **25/25 SUCCESS sur main**, Pages comprise ;
- GitHub Pages **#135 SUCCESS** sur le SHA runtime exact.

## Suite

Build31 ne prétend pas résoudre tout le curriculum. Il fournit la fondation pour le faire proprement.

Prochaine étape : **V2.2.0 — Build 32 · Content Map & Practical A1 Expansion**.

Ordre :

1. cartographier les capacités 1–40 ;
2. identifier les trous A1 utiles ;
3. ajouter les leçons 41+ par capacité communicative ;
4. réutiliser les nouvelles capacités dans Scenario / Listening quand pertinent ;
5. garder Memory v1 pendant cette extension ;
6. traiter Memory Evidence v2 séparément avec migration Recovery transactionnelle.

Le gate iPhone exact-first-attempt reste parallèle.