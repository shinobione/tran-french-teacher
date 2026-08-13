# French Trân’quille — Roadmap exhaustive post-Build 32

Status: **PLANNED / DOCS-ONLY**  
Point de départ certifié: **v2.2.0 • Build 32**  
`main` de référence au moment de cette roadmap: `02c2ae237a1c6e388b509c64302d61145e3dc719`

> Cette roadmap remplace l’ordre ancien « Build 33 = Memory Evidence v2 immédiatement ». Memory Evidence v2 reste prévue, mais **après l’audit et un pilote des Fondations du français**, afin que le futur modèle de mémoire sache réellement quelles preuves grammaticales il doit représenter.

---

# 0. Intention produit

French Trân’quille sait déjà enseigner beaucoup de **français utile en situation**. Le produit courant possède 52 leçons / 313 acquis, Scenario 44/132, Listening, Speaking Loop, Learner Intelligence et Recovery.

Le prochain manque pédagogique important n’est pas « encore plus de situations ». C’est une couche qui aide Trân à comprendre et **généraliser les mécanismes du français** :

- `un / une / des` ;
- `le / la / l’ / les` ;
- masculin / féminin ;
- singulier / pluriel ;
- pronoms sujets ;
- conjugaison utile au présent ;
- négation ;
- questions ;
- accords ;
- possessifs ;
- partitifs ;
- contractions `au / aux / du / des` ;
- futur proche ;
- passé récent ;
- passé composé de base ;
- `on` du français oral ;
- construction autonome d’une phrase nouvelle.

Le but n’est **pas** que Trân puisse réciter un cours de grammaire. Le but est qu’elle puisse passer de :

> « je connais cette phrase »

à :

> « je comprends le mécanisme et je peux fabriquer une autre phrase correcte avec des mots que je connais déjà ».

---

# 1. Règles non négociables du chantier Fondations

1. **Ne jamais renuméroter les 52 leçons existantes.**
2. **Ne jamais modifier l’ordre des 313 acquis existants pour “faire de la place”.**
3. Les Fondations sont un **curriculum parallèle**, pas des leçons 53–70 artificielles.
4. Pas de nouvelle entrée principale « GRAMMAIRE » dans la tab bar.
5. Une capsule apparaît quand elle est utile : dans une leçon, Aujourd’hui, Réviser ou une recommandation de Tyffany.
6. Une capsule normale vise **4 à 7 minutes** et une seule intention principale.
7. Explication débutante principalement en vietnamien ; exemples et production en français.
8. La règle vient **après ou avec les exemples**, pas avant sous forme de dissertation scolaire.
9. Les tableaux complets existent éventuellement derrière `Voir la règle complète`, jamais comme écran par défaut.
10. Chaque capsule doit finir par une **utilisation réelle**, pas seulement un QCM de reconnaissance.
11. Une règle n’est pas « maîtrisée » parce qu’un QCM a été réussi une fois.
12. Une phrase mémorisée et une règle généralisée sont deux preuves différentes.
13. Aucune non-reconnaissance vocale n’est transformée en diagnostic phonétique.
14. Aucun score de prononciation inventé.
15. Aucun nouveau store durable avant qu’un modèle de preuve + migration soit prouvé réversible.
16. Aucun changement aux sanctuaires voix / branding / core sans intention explicite.
17. Coût récurrent cible : **0 €**.
18. iPhone/Safari/PWA reste la cible principale.
19. Une vraie session de Trân interdit les patches runtime de confort ; seuls les docs peuvent évoluer sans toucher à l’app servie.
20. Les baselines historiques V2/Build30, Build31 40/241 et Build32 52/313 restent rejouables.

---

# 2. Modèle pédagogique d’une capsule Fondations

Chaque capsule suit le même squelette, avec variations selon le concept.

## 2.1 — Étape A : observer

Tyffany montre 2 à 4 exemples très courts issus du vocabulaire déjà connu.

Exemple :

```text
le train
la gare
l’eau
les billets
```

L’explication vietnamienne dit simplement ce qu’il faut remarquer.

## 2.2 — Étape B : comprendre le motif

Une mini-règle, idéalement 1 à 3 phrases maximum.

Exemple :

```text
le = danh từ giống đực số ít
la = danh từ giống cái số ít
l’ = trước nguyên âm / h muet
les = số nhiều
```

Le vocabulaire grammatical français peut être affiché secondairement, mais le vietnamien reste la langue de compréhension au début.

## 2.3 — Étape C : construire

Exercices courts de transformation ou assemblage :

- `une pharmacie` → `la pharmacie` ;
- `le billet` → `les billets` ;
- `je parle` → `tu parles` ;
- phrase affirmative → négative ;
- ordre de mots d’une question.

## 2.4 — Étape D : écouter

Quand pertinent, Listening vérifie le concept **sans révéler immédiatement le transcript**.

Exemples :

- distinguer `le` / `les` dans une phrase ;
- reconnaître `je suis` / `ils sont` ;
- comprendre une question avec `est-ce que` ;
- reconnaître `on va` dans le français oral.

## 2.5 — Étape E : produire

Une production contrôlée ou semi-libre :

- dire une phrase ;
- choisir un nom connu et construire la phrase ;
- transformer une phrase connue ;
- répondre à une mini-situation.

## 2.6 — Étape F : transfert

La capsule se termine idéalement par une phrase **jamais montrée exactement sous cette forme**, construite à partir d’éléments connus.

Exemple : Trân connaît déjà `la pharmacie`, le pluriel et `être` ; on lui demande de construire :

> `Les pharmacies sont ouvertes.`

Le transfert est une preuve plus forte qu’une simple répétition.

---

# 3. Syllabus candidat — Fondations Core

Le syllabus exact sera confirmé par l’audit Build 33. Les numéros ci-dessous sont **des IDs de capsules**, pas des numéros de leçons.

## F01 — Le nom : masculin / féminin

Objectifs :

- comprendre qu’un nom français possède généralement un genre grammatical ;
- apprendre le nom avec son article, pas comme un mot nu ;
- éviter de présenter le genre comme une propriété logique du monde réel.

Exemples : `un café`, `une gare`, `un billet`, `une pharmacie`.

Contraste vietnamien : le vietnamien ne possède pas ce système de genre grammatical article+noun.

## F02 — Articles indéfinis : `un / une / des`

Objectifs :

- objet/personne non identifié(e) ou présenté(e) pour la première fois ;
- singulier masculin / singulier féminin / pluriel.

Transfert : choisir correctement l’article devant un nom déjà connu mais jamais testé avec cet article.

## F03 — Articles définis : `le / la / l’ / les`

Objectifs :

- référent identifié / général dans les usages A1 utiles ;
- élision `l’` ;
- pluriel `les`.

Pas d’exposé académique sur tous les emplois possibles au premier passage.

## F04 — Singulier / pluriel des noms

Objectifs :

- modèle régulier en `-s` ;
- différence écrit / oral lorsque le `s` n’est pas entendu directement ;
- quelques formes fréquentes seulement si elles existent déjà dans le vocabulaire réel de Trân.

Ne pas enseigner une encyclopédie des pluriels irréguliers A2/B1 dans Core.

## F05 — Pronoms sujets

`je / tu / il / elle / on / nous / vous / ils / elles`

Objectifs :

- comprendre que le sujet est normalement exprimé en français ;
- distinguer `tu` et `vous` ;
- préparer les paradigmes verbaux ;
- rattacher `on` au français oral déjà présent dans le curriculum.

## F06 — `être` au présent

Progression d’abord utile :

`je suis → tu es → il/elle/on est → nous sommes → vous êtes → ils/elles sont`

Le tableau complet peut être révélé, mais la capsule commence par les formes réellement utilisées.

## F07 — `avoir` au présent

Même logique : formes utiles dans des phrases réelles.

Réutilisations : âge, possession, faim/soif, douleur, besoins et expressions déjà connues.

## F08 — Verbes réguliers en `-er` au présent

Objectifs :

- reconnaître radical + terminaison ;
- produire principalement `je / tu / il-elle-on / nous / vous / ils-elles` ;
- faire remarquer que plusieurs terminaisons s’écrivent différemment mais se prononcent de manière proche.

Pas de cours abstrait « premier groupe » comme point de départ.

## F09 — `aller` + futur proche

Objectifs :

- présent de `aller` utile ;
- `aller + infinitif` ;
- distinguer action actuelle et projet proche.

Réutilise le futur proche déjà présent dans le curriculum historique.

## F10 — `vouloir / pouvoir / devoir`

Objectifs :

- demandes ;
- capacité / permission ;
- obligation ;
- formes prioritaires rencontrées dans la vraie vie.

Pas besoin de faire mémoriser toutes les personnes de trois verbes d’un coup si elles ne sont pas encore utiles.

## F11 — La négation

Core :

- `ne … pas` ;
- reconnaissance du français oral où `ne` disparaît souvent ;
- ne pas enseigner l’omission de `ne` comme seule forme correcte.

Exemples : `Je ne comprends pas.` / oral courant entendu : `Je comprends pas.`

## F12 — Poser une question

Progression :

1. intonation : `Tu veux venir ?` ;
2. mots interrogatifs : `où`, `quand`, `combien`, `pourquoi`, `comment`, `quel` ;
3. `est-ce que` ;
4. inversion uniquement comme reconnaissance/extension, pas priorité de production débutante.

## F13 — Adjectifs : genre et nombre

Objectifs :

- accord simple masculin/féminin ;
- pluriel simple ;
- place de quelques adjectifs fréquents réellement rencontrés.

Éviter une liste de 40 exceptions hors contexte.

## F14 — Possessifs

Core :

`mon / ma / mes`, `ton / ta / tes`, puis formes réellement nécessaires.

Point important : le possessif dépend du genre du **nom possédé**, pas du genre du propriétaire.

## F15 — Partitifs et quantité

`du / de la / de l’ / des` pour la matière/quantité non comptée dans les usages de base.

Relier à :

- nourriture ;
- courses ;
- `un peu de` ;
- `une bouteille de` ;
- `deux kilos de`.

Éviter de mélanger trop tôt toutes les valeurs possibles de `des`.

## F16 — `à / de` et contractions

Core utile :

- `à + le = au` ;
- `à + les = aux` ;
- `de + le = du` ;
- `de + les = des` ;
- lieux et provenances réellement utiles.

## F17 — Passé récent et passé composé de base

Objectifs :

- distinguer `je viens de…` de `j’ai…` ;
- auxiliaire + participe passé ;
- `avoir` d’abord ;
- quelques verbes de mouvement avec `être` déjà présents dans le curriculum.

Pas de traité complet sur tous les accords du participe passé dans Core.

## F18 — `on` et français oral naturel

Objectifs :

- `on` = souvent `nous` en conversation ;
- conjugaison comme `il/elle` ;
- comprendre `on va`, `on peut`, `on doit`, `on rentre` ;
- reconnaître quelques contractions orales sans les imposer comme écriture standard.

Cette capsule consolide directement la leçon 52.

---

# 4. Extensions potentielles après Core

Ces sujets ne doivent être promus en Core que si l’audit montre un besoin réel A1.

- F19 démonstratifs `ce / cet / cette / ces` ;
- F20 verbes pronominaux fréquents ;
- F21 impératif utile ;
- F22 comparaison `plus / moins / aussi` ;
- F23 adverbes fréquents ;
- F24 COD simples / pronoms objets très fréquents ;
- F25 accords du passé composé plus avancés ;
- F26 connecteurs de récit ;
- F27 cause / conséquence simples ;
- F28 prépositions temporelles ;
- F29 conditionnel de politesse comme reconnaissance/usage pratique ;
- F30 préparation A2.

Aucune extension ne devient automatique juste parce qu’un numéro existe dans cette liste.

---

# 5. UX cible

## 5.1 — Pas de nouvel onglet principal

La navigation reste centrée sur :

```text
Aujourd’hui
Pratiquer
Progrès
```

## 5.2 — Entrées possibles

Une Fondation peut apparaître :

- dans une leçon : `🧩 Petite base utile — 5 min` ;
- dans Aujourd’hui comme recommandation principale si elle bloque réellement la progression ;
- dans Réviser : `🧩 Réviser une base` ;
- après une erreur récurrente suffisamment interprétable ;
- dans Progrès sous forme humaine, jamais comme cockpit technique.

## 5.3 — Une capsule ne bloque pas arbitrairement

Au premier pilote, une capsule ne doit pas transformer une leçon en péage obligatoire sans preuve terrain.

Préférer :

```text
Cette petite base t’aidera ici.
[La faire maintenant]
[Continuer la leçon]
```

Si des preuves futures montrent qu’une notion est réellement prérequise, Learner Intelligence pourra recommander plus fortement la capsule.

## 5.4 — Affichage grammatical

Par défaut :

- exemples ;
- mini-règle ;
- exercice ;
- transfert.

Secondaire :

- `Voir la règle complète` ;
- tableau complet ;
- exceptions ;
- vocabulaire grammatical français.

DEBUG FR peut exposer : IDs, prérequis, concept, evidence targets et mapping de leçons.

---

# 6. Conception spécifique pour une vietnamophone

Le vietnamien n’est pas seulement une traduction : il sert à expliquer les différences de système.

Le contenu doit signaler sobrement, lorsque pertinent :

- le français possède des articles là où le vietnamien n’a pas le même mécanisme ;
- le français possède un genre grammatical des noms ;
- les verbes français changent de forme selon la personne/temps ;
- le pronom sujet français est normalement explicite ;
- les accords écrits peuvent être peu audibles ;
- l’ordre des mots d’une question française peut varier ;
- la négation écrite et l’oral courant peuvent différer ;
- `tu / vous` ne se superposent pas exactement aux systèmes d’adresse vietnamiens ;
- les pronoms français ne doivent pas être expliqués comme une traduction 1:1 des termes relationnels vietnamiens.

Règle : **contraste utile, jamais caricature linguistique.**

---

# 7. Build 33 — Foundations Audit & Pedagogy Specification

Status cible : **design / audit, aucun runtime learner durable modifié**.

## 33.1 — Audit des 313 acquis

Pour chaque acquis courant :

- leçon ;
- forme française ;
- traduction vietnamienne ;
- concept grammatical implicite ;
- concept déjà expliqué explicitement ou non ;
- niveau d’exposition ;
- réutilisation Scenario ;
- réutilisation Listening ;
- réutilisation Speaking ;
- potentiel de transfert ;
- doublons / incohérences éventuels.

Livrable : matrice machine-readable + rapport humain.

## 33.2 — Carte des concepts

Construire une matrice :

```text
concept
→ exemples existants
→ leçons où il apparaît
→ moment recommandé pour l’expliquer
→ prérequis
→ renforcements ultérieurs
→ contextes de transfert
```

## 33.3 — Valider le syllabus F01–F18

Pour chaque capsule :

- conserver ;
- fusionner ;
- scinder ;
- repousser ;
- supprimer si le curriculum couvre déjà suffisamment le concept.

## 33.4 — Définir les contrats pédagogiques

Pour chaque capsule retenue :

- objectif de compréhension ;
- objectif de production ;
- vocabulaire autorisé ;
- règle VI courte ;
- exemples ;
- activité de construction ;
- Listening éventuel ;
- Speaking éventuel ;
- transfert inédit ;
- erreurs typiques observables ;
- ce que le système **n’a pas le droit d’inférer**.

## 33.5 — Prototype de données sans adoption durable

Définir une structure candidate, par exemple :

```text
foundationId
concept
prerequisites
introducedBy
reinforcedBy
examples
viContrast
checks
transferTasks
evidenceTargets
```

Le schéma reste un **contrat de contenu**, pas encore un nouveau store learner.

## Definition of Done Build 33

- audit complet 313/313 ;
- aucun ancien ID modifié ;
- syllabus Core décidé ;
- mapping leçons ↔ concepts décidé ;
- schéma de capsule documenté ;
- aucun nouveau store ;
- aucun changement de progression Trân ;
- aucun runtime production nécessaire pour clôturer le build.

---

# 8. Build 34 — Foundations Pilot

Objectif : **tester la pédagogie et l’UX avant d’industrialiser la mémoire grammaticale**.

## 34.1 — Pilote réduit

Commencer avec 4 à 5 capsules à très forte valeur :

- F01 genre ;
- F02 `un / une / des` ;
- F03 `le / la / l’ / les` ;
- F04 singulier / pluriel ;
- F06 `être` ou F07 `avoir` selon l’audit.

## 34.2 — Injection contextuelle

- pas de nouvel onglet ;
- carte `Petite base utile` ;
- entrée/sortie déterministe ;
- retour exact à la leçon d’origine ;
- utilisable aussi depuis Réviser.

## 34.3 — Pilotage non destructif

Le pilote ne crée **aucun nouveau schéma learner durable**.

Les sessions peuvent être :

- non persistantes ; ou
- enregistrées uniquement via des événements déjà propriétaires d’un store existant, si et seulement si cela respecte ses contrats.

Interdiction d’utiliser un store existant comme poubelle « parce qu’il est déjà là ».

## 34.4 — Validation terrain

Observer :

- Trân comprend-elle l’intention de la capsule ?
- la durée est-elle acceptable ?
- la transition leçon → capsule → leçon est-elle naturelle ?
- les explications vietnamiennes sont-elles utiles sans être trop longues ?
- la capsule aide-t-elle réellement à répondre à une phrase nouvelle ?

## Definition of Done Build 34

- pilote utilisable sur iPhone ;
- 4–5 capsules complètes ;
- aucune migration ;
- stores learner byte-identiques si le pilote est configuré sans persistance ;
- aucune régression voix ;
- aucune régression 52/313 ;
- validation visuelle/mobile ;
- retours terrain documentés avant généralisation.

---

# 9. Build 35 — Memory Evidence v2 / Migration Readiness

Memory Evidence v2 revient ici, **informée par le pilote Fondations**.

Objectif : définir une mémoire capable de distinguer :

- exposition ;
- reconnaissance ;
- rappel autonome ;
- réussite assistée ;
- Listening ;
- Scenario ;
- texte ;
- reconnaissance vocale ;
- construction grammaticale ;
- transformation ;
- transfert à une phrase nouvelle ;
- récence ;
- répétition ;
- récupération après erreur ;
- diversité des contextes.

## 35.1 — Nouvelles dimensions conceptuelles

La mémoire doit pouvoir représenter deux axes différents :

```text
item / phrase
concept / mécanisme
```

Exemple :

- item connu : `Je suis prête.` ;
- concept : `être — je suis` ;
- transfert : construction autonome de `Je suis fatiguée.`.

## 35.2 — Assistance

Distinguer :

- réponse montrée ;
- indice ;
- choix multiple ;
- construction guidée ;
- rappel sans aide.

## 35.3 — Confidence

Learner Intelligence ne doit pas confondre :

- score élevé avec peu de preuves ;
- score légèrement inférieur avec beaucoup de preuves diversifiées.

## 35.4 — Taille locale

Définir :

- historique borné ;
- agrégats ;
- purge non destructive ;
- taille maximale raisonnable ;
- comportement quand le stockage approche les limites navigateur.

## 35.5 — Migration candidate

Décider objectivement :

- évolution in-place ;
- nouveau store ;
- modèle hybride.

Aucune option n’est retenue par préférence esthétique.

## 35.6 — Migration dry-run obligatoire

Avant toute adoption :

1. snapshot `pre-migration` ;
2. validation source ;
3. transformation déterministe ;
4. écriture transactionnelle simulée ;
5. reread ;
6. comparaison ;
7. rollback ;
8. quarantaine ;
9. vieux backups ;
10. ancien profil `l8=4` ;
11. vrais navigateurs.

## Definition of Done Build 35

> Le modèle Evidence v2 est spécifié, simulable et réversible. **Aucun nouveau schéma durable n’est encore adopté.**

---

# 10. Build 36 — Memory Evidence v2 Adoption Candidate

Ce build n’existe que si Build 35 ferme tous les critères.

Objectif : adopter le nouveau modèle durable **dans un build séparé**.

## Conditions d’entrée

- migration déterministe ;
- rollback prouvé ;
- backup V1/V2 compatible ;
- old-user smoke ;
- Recovery snapshot ;
- taille locale bornée ;
- absence de perte des six stores historiques ;
- décision documentée sur nouveau store ou migration in-place.

## Conditions de sortie

- migration une seule fois, idempotente ;
- reread exact ;
- rollback intégral en cas d’échec ;
- backups anciens non destructifs ;
- données invalides quarantinées ;
- profil historique inchangé sur les champs historiques ;
- aucune nouvelle donnée inventée à partir d’un manque d’information.

---

# 11. Build 37 — Foundations Core Complete

Objectif : industrialiser le syllabus validé après pilote et après disponibilité du modèle de preuve adéquat.

## 37.1 — Capsules Core complètes

Cible initiale : F01–F18, corrigée selon Build 33/34.

## 37.2 — Mapping contextuel

Chaque capsule connaît :

- quand elle est introduite ;
- où elle est renforcée ;
- où elle peut être révisée ;
- quelles leçons ne doivent pas la déclencher.

## 37.3 — Evidence

Une capsule peut produire des preuves séparées :

- recognition ;
- construction ;
- listening ;
- production ;
- transfer.

## 37.4 — Révision

Une notion fragile peut revenir sans répéter exactement le même exercice.

## 37.5 — Speaking / Listening

Maximum de moments oraux reste borné ; la grammaire ne transforme pas chaque leçon en entraînement micro obligatoire.

---

# 12. Build 38 — Generalization & Transfer

Objectif : mesurer davantage la capacité à **fabriquer du français**, pas seulement rappeler des chunks.

Familles d’exercices :

- singular → plural ;
- masculine → feminine quand pertinent ;
- subject substitution ;
- affirmative → negative ;
- statement → question ;
- present → futur proche ;
- recent past → passé composé simple ;
- noun/article substitution ;
- adjective agreement ;
- known vocabulary in unseen sentence.

Règle : la réponse cible doit être déterministe et vérifiable localement. Pas de pseudo-LLM flou pour décider arbitrairement si « ça ressemble » à une bonne phrase.

---

# 13. Build 39 — Learner Intelligence 3 / Foundation-aware Coaching

Objectif : faire utiliser les nouvelles preuves par le cerveau sans exposer un cockpit à Trân.

Le moteur peut décider :

- continuer la leçon ;
- revoir une phrase ;
- revoir un concept ;
- proposer une capsule ;
- proposer du Listening ;
- proposer un transfert ;
- maintenir sans intervention.

Il doit séparer :

- compétence de phrase ;
- compétence de concept ;
- confiance ;
- diversité des preuves.

Une notion fragile ne bloque pas nécessairement une leçon si elle n’est pas prérequise.

---

# 14. Build 40 — A1 Consolidation Audit

Avant d’ajouter massivement de l’A2 :

- audit des 52 leçons + Fondations ;
- audit des capacités communicatives ;
- audit des concepts grammaticaux ;
- audit des preuves de transfert ;
- audit du Listening ;
- audit du français oral ;
- audit des situations réelles ;
- audit des trous encore présents.

Sortie : décision explicite entre :

- renforcer A1 ;
- ouvrir A1+ interne ;
- commencer une vraie extension A2.

Aucune progression CECRL officielle n’est déclarée uniquement sur la base du nombre de leçons terminées.

---

# 15. Phase A2 — uniquement après Build 40

Axes candidats, à confirmer par audit :

- raconter avec plus de détail ;
- expliquer causes et conséquences ;
- donner une opinion plus développée ;
- comparer plusieurs options ;
- démarches administratives plus longues ;
- travail / consignes / résolution de problème ;
- logement et services ;
- santé quotidienne plus nuancée ;
- voyages / incidents ;
- conversations sociales ;
- appels téléphoniques ;
- messages et écrits simples ;
- compréhension de français oral plus naturel ;
- connecteurs ;
- pronoms objets fréquents ;
- impératif ;
- conditionnel de politesse ;
- passé composé consolidé ;
- imparfait en compréhension puis production si nécessaire ;
- futur ;
- comparatifs/superlatifs ;
- expressions de fréquence et durée.

Chaque nouvelle capacité A2 doit avoir, lorsque pertinent :

```text
curriculum
+ Listening
+ Scenario
+ Speaking
+ Foundation/grammar
+ Memory evidence
+ transfer
```

---

# 16. Contrats CI permanents pour les Fondations

Les futurs workflows doivent vérifier au minimum :

## Historique

- baseline V2 Freeze toujours rejouable 40/241 ;
- Build31 historique toujours 40/241 ;
- Build32 historique toujours 52/313 ;
- aucun ancien ID réordonné.

## Fondations

- IDs `Fxx` uniques ;
- aucun conflit avec lesson/item IDs ;
- prérequis valides ;
- mapping leçons valide ;
- chaque exemple existant référence un acquis réel ;
- tout exemple volontairement nouveau est marqué `transfer`, jamais présenté comme un acquis déjà enseigné ;
- chaque capsule possède objectif + règle VI + activité + sortie ;
- cardinalité DOM stable dans le temps.

## Données

- aucune écriture durable dans les builds design/pilot non persistants ;
- old user exact `7 completed / l8=4 / 40 known` ;
- six stores historiques intacts avant migration ;
- Recovery avant toute migration ;
- rollback prouvé avant adoption.

## UX

- 390×844 sans overflow horizontal ;
- targets tactiles ≥ 44 px pour actions principales ;
- retour capsule → origine déterministe ;
- pas de nouvel onglet principal non autorisé ;
- pas de tunnel sans sortie ;
- `prefers-reduced-motion` conserve le flux ;
- DEBUG FR ne modifie aucune donnée learner.

## Voix

- hashes sanctuaires inchangés sauf build explicitement vocal ;
- Speaking Loop toujours borné ;
- reconnaissance ≠ prononciation ;
- aucune capture automatique du premier essai avant validation iPhone du gate terrain.

## PWA

- offline toujours fonctionnel ;
- nouveaux assets pré-cachés uniquement quand runtime adopté ;
- aucune incohérence cache index/SW ;
- vrai Chrome avant merge ;
- Pages vérifiée sur SHA exact.

---

# 17. Sanctuaires actuels

À la date de cette roadmap :

```text
app.js
600f094266c9f0c4c7b57efdbf61129909ebd9cb

voice-ios.js
38e97aa3ef62dd6dcda224901b435f0973618679

free-voice.js
b4c19b1936c788ee017eac9ba14e5a62c159e8d5

assets/LOGO.png
64eaa6ad9781c6a9075d4f68615fc44344c4e21c

assets/Favicon.png
c358672368a960bf7617e5532aff3e3319cddb3e
```

Durable stores historiques :

```text
francais-avec-luc:learner:v1
french-tranquille:learning-memory:v1
french-tranquille:error-intelligence:v1
french-tranquille:scenarios:v1
french-tranquille:listening:v1
french-tranquille:milestones:v1
```

Recovery snapshots :

```text
french-tranquille:recovery:last-good:v1
french-tranquille:recovery:pre-restore:v1
french-tranquille:recovery:pre-migration:v1
french-tranquille:recovery:pre-reset:v1
french-tranquille:recovery:quarantine:v1
french-tranquille:safety:pre-build22:v1
```

---

# 18. Gate terrain iPhone — parallèle

Toujours ouvert :

```text
Free Voice recognition
→ seconde prise locale volontaire
→ playback
→ prochaine reconnaissance fonctionne normalement
```

Ce gate ne bloque :

- ni Fondations ;
- ni Memory Evidence design ;
- ni A1/A2 ;
- ni Listening ;
- ni Learner Intelligence.

Il bloque seulement une future fonction :

> enregistrer automatiquement **le premier essai exact** pendant SpeechRecognition.

---

# 19. Ordre canonique retenu

```text
✅ V2.2.0 / Build 32 — Practical A1 Expansion

→ Build 33 — Foundations Audit & Pedagogy Specification
→ Build 34 — Foundations Pilot
→ Build 35 — Memory Evidence v2 / Migration Readiness
→ Build 36 — Memory Evidence v2 Adoption Candidate (seulement si prêt)
→ Build 37 — Foundations Core Complete
→ Build 38 — Generalization & Transfer
→ Build 39 — Learner Intelligence 3 / Foundation-aware Coaching
→ Build 40 — A1 Consolidation Audit
→ Phase A2 décidée à partir de l’audit réel
```

L’ordre peut être ajusté par retour terrain, mais **Memory Evidence v2 ne repasse pas devant l’audit/pilote Fondations sans raison documentée**, car le modèle de mémoire doit être conçu avec la connaissance des preuves grammaticales à représenter.

---

# 20. Prochaine action quand le runtime redevient disponible

Quand Trân n’est plus en train d’utiliser activement la PWA et qu’un chantier runtime est autorisé :

1. repartir du `main` réel ;
2. revalider le SHA courant et les checks ;
3. ouvrir une branche **Build 33 design/audit** ;
4. scanner réellement les 313 acquis ;
5. produire la matrice conceptuelle ;
6. ne pas toucher aux stores learner ;
7. ne pas toucher aux sanctuaires voix ;
8. documenter le syllabus final ;
9. certifier Build 33 ;
10. seulement ensuite préparer le pilote Build 34.

**Ne pas commencer directement à coder les 18 capsules depuis cette liste sans faire l’audit 313/313.** Cette liste est un syllabus candidat ; le produit réel reste la source de vérité.
