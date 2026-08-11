# French Trân’quille — ROADMAP

> Document canonique pour le futur du projet.  
> Le `README.md` décrit l’état actuel. `CHANGELOG.md` décrit ce qui est déjà livré.  
> Cette roadmap décrit **ce qui vient ensuite, dans quel ordre, et avec quelles conditions de clôture**.

## Principes non négociables

1. **Cible principale : Trân sur iPhone / Safari / PWA iOS.** Android et PC restent supportés.
2. **0 € d’exploitation récurrente** tant qu’une décision explicite ne change pas cette règle : pas d’API payante, pas de backend obligatoire.
3. **Vietnamien majoritaire au départ**, français augmenté progressivement selon les acquis réels, jamais seulement selon le numéro de leçon.
4. **Oral prioritaire**, mais aucune prétention de mesurer une prononciation que le navigateur ne permet pas réellement d’observer.
5. **Communication réelle > théorie scolaire.** Les règles grammaticales apparaissent parce qu’elles permettent de parler.
6. **Aucun reset silencieux de progression.** Toute migration doit préserver les données locales ou documenter explicitement l’exception.
7. **Un gros build = une intention principale claire.** Les hotfixes gardent le numéro de build et ajoutent `.1`, `.2`, etc.
8. **Aucun merge important sans vrai Chrome headless vert.** Le test iPhone réel reste indispensable pour Safari/Siri.
9. **Toute modification importante met à jour la documentation vivante** : README, CHANGELOG, ROADMAP si nécessaire, architecture/politique concernées.
10. French Trân’quille reste une **PWA dédiée**, pas un clone de ChatGPT ni un jeu infantilisant.

---

# État de référence

## v1.10.0 — Build 17 — LIVRÉ

- 25 leçons / 148 éléments ;
- Learning Memory + révision espacée ;
- Daily Coach ;
- Mastery Engine ;
- Scenario Lab : **12 situations / 36 tours** ;
- scénarios déverrouillés selon les leçons réellement terminées ;
- succès / échecs / aides reconnectés à Learning Memory ;
- voix navigateur + fallback texte ;
- profil vierge supporté : scénarios visibles mais verrouillés ;
- CI avec **Chrome Home + Chrome Conversation** ;
- GitHub Pages ;
- documentation canonique ;
- coût : **0 €**.

---

# PHASE PWA-3B / PWA-4 — ADAPTATION + USAGE RÉEL

## v1.9.0 — Build 16 — Mastery Engine — ✅ CLOS

- [x] 4 étapes de maîtrise ;
- [x] preuves Learning Memory obligatoires avant `Maîtrisé` ;
- [x] estimation interne non assimilée au CECRL officiel ;
- [x] priorité suivante ;
- [x] documentation canonique ;
- [x] Chrome + Pages verts.

---

## v1.10.0 — Build 17 — Scenario Lab — ✅ CLOS

### Livré

12 scénarios, 3 tours chacun :

1. café ;
2. gare ;
3. restaurant ;
4. supermarché ;
5. pharmacie ;
6. problème dans l’appartement ;
7. appel à Jerry ;
8. arrivée en France ;
9. rencontre avec des proches ;
10. demander de l’aide ;
11. rendez-vous ;
12. petite conversation sociale.

Total : **36 tours de dialogue**.

### Clôture Build 17

- [x] 12 scénarios présents et IDs uniques ;
- [x] au moins 3 tours par scénario ;
- [x] déverrouillage basé sur `completedLessons` ;
- [x] aucun modèle révélé avant plusieurs échecs ;
- [x] Learning Memory reçoit succès / échec / aide ;
- [x] statistiques locales persistées ;
- [x] Progression affiche les situations ;
- [x] diagnostic Scenario Lab présent ;
- [x] profil vierge supporté via `scenario-host.js` ;
- [x] Home Build 16 toujours saine ;
- [x] Chrome Home vert ;
- [x] Chrome Conversation `?scenarioSmoke=1` vert ;
- [x] README / ROADMAP / CHANGELOG / ARCHITECTURE synchronisés ;
- [x] cache/version Build 17 synchronisés ;
- [x] CI PR verte ;
- [x] CI main verte ;
- [x] GitHub Pages vert.

### Non inclus volontairement

- compréhension sémantique libre par IA ;
- conversation générative illimitée ;
- score de prononciation ;
- calibration Siri spécifique ;
- nouvelle extension du curriculum.

---

## v1.11.0 — Build 18 — Error Intelligence — 🔥 PROCHAIN

### But

Passer de « difficile/correct/facile » à une mémoire des **raisons observables pour lesquelles un acquis revient mal**, sans inventer un diagnostic linguistique que l’application ne peut pas prouver.

### Taxonomie V1 — preuves d’abord

Les premières catégories seront volontairement observables :

- **retrieval-difficult** — l’élément est évalué difficile en révision ;
- **text-mismatch** — réponse texte différente de la cible ;
- **scenario-miss** — réponse refusée dans un scénario ;
- **assisted** — modèle nécessaire dans Scenario Lab ;
- **voice-unrecognized** — le navigateur n’a pas reconnu la phrase attendue ;
- **repeated-miss** — plusieurs échecs rapprochés sur le même élément ;
- **partial** — réponse contenant une partie démontrable de la cible, quand cette information est disponible.

Les catégories grammaticales (`article`, `négation`, `ordre des mots`, etc.) ne seront ajoutées que lorsqu’une comparaison entrée/cible permet de les établir avec assez de certitude. **Pas de pseudo-diagnostic.**

### Livrables Build 18

- stockage local versionné `french-tranquille:error-intelligence:v1` ;
- historique compact par élément, avec limite de taille ;
- compteurs par type d’erreur et par source ;
- erreur dominante uniquement si elle est suffisamment répétée ;
- détection de répétition / récence ;
- carte Error Intelligence dans Progression ;
- mini-bilan des difficultés récentes ;
- priorité Daily Coach influencée par récence + répétition ;
- pont vers Mastery Engine sans modifier les critères de certification inexistants ;
- export JSON dédié ou extension sûre de la sauvegarde existante ;
- diagnostic dans Réglages ;
- CI avec contrat de stockage + Chrome dédié.

### Critères de clôture Build 18

- [ ] aucun événement d’erreur ne casse Learning Memory existante ;
- [ ] taille de l’historique bornée ;
- [ ] catégories fondées sur des preuves observables ;
- [ ] Scenario Lab produit `miss` / `assisted` exploitables ;
- [ ] Free Voice produit au minimum `voice-unrecognized` lorsque c’est réellement observable ;
- [ ] révision difficile produit `retrieval-difficult` ;
- [ ] Daily Coach peut remonter un élément récidiviste ;
- [ ] Progression montre les difficultés sans stigmatiser ;
- [ ] export/import ou export dédié validé ;
- [ ] aucune régression des 25 leçons / 12 scénarios ;
- [ ] Chrome Home vert ;
- [ ] Chrome Scenario Lab vert ;
- [ ] Chrome Error Intelligence vert ;
- [ ] README / ROADMAP / CHANGELOG / ARCHITECTURE synchronisés ;
- [ ] CI PR + main + Pages verts.

---

# PHASE PWA-2B — VOICE CALIBRATION

## Build 18.x ou 19 selon disponibilité — Safari/Siri Calibration Gate

**Cette étape dépend d’un vrai test sur l’iPhone de Trân. Elle ne sera pas simulée.**

Données nécessaires :

- phrase cible ;
- transcription Safari ;
- alternatives si disponibles ;
- nombre d’essais ;
- faux refus ;
- faux positifs.

Après collecte :

- tolérances par type de phrase ;
- variantes réellement observées ;
- distinction phrase reconnue / prononciation correcte ;
- aucun faux score phonétique.

---

# PHASE PWA-4B — A1 CORE

## v1.12.0 — Build 19 — Curriculum 26 → 40

Axes prévus :

- nombres 11 → 100 ;
- dates / calendrier ;
- heures plus complètes ;
- jours / mois ;
- possessifs de base ;
- présent `tu / il / elle / nous` dans des structures fréquentes ;
- aller + infinitif, futur proche ;
- venir de + infinitif simple ;
- passé composé ultra-fréquent seulement après consolidation du présent ;
- transport / administration / rendez-vous ;
- émotions et besoins ;
- conversation avec Jerry et les proches.

**Règle :** pas de chapitre de conjugaison hors-sol ; chaque structure vient d’une situation.

---

## v1.13.0 — Build 20 — Listening Comprehension

- Lucie lit une phrase ;
- choix de sens ;
- contraste entre phrases proches ;
- vitesse lente puis normale ;
- mini-dialogues audio ;
- répétition optionnelle ;
- erreurs envoyées à Learning Memory / Error Intelligence.

---

## v1.14.0 — Build 21 — Adaptive Language Ratio

Le ratio VI/FR dépendra :

- maîtrise par étape ;
- compréhension réussie ;
- quantité d’indices ;
- fragilités ;
- difficulté du scénario.

Pas de bascule brutale : le vietnamien recule seulement quand les preuves d’apprentissage le permettent.

---

# PHASE PWA-5 — REAL LIFE FRENCH

## Builds 22–24

### Français avec Jerry

- arrivée / retrouvailles ;
- chez soi ;
- repas ;
- amis / famille ;
- téléphone ;
- déplacements ;
- problèmes du quotidien ;
- expressions affectives naturelles ;
- humour simple ;
- petites incompréhensions de couple.

### Registres

- français neutre ;
- français oral courant ;
- familier raisonnable ;
- différence phrase correcte / phrase naturelle.

---

# PHASE PWA-6 — HARDENING / V2

## v2.0.0 — objectif A1 Core stable

Pour clôturer V2 :

- curriculum A0 → A1 cohérent ;
- Scenario Lab stable ;
- mémoire et erreurs versionnées ;
- sauvegarde/import robuste ;
- PWA installable iPhone ;
- tests Safari réels ;
- Chrome/Android sans régression majeure ;
- offline testé ;
- documentation complète ;
- aucun secret/API client ;
- aucune dépendance payante obligatoire.

---

# BACKLOG NON BLOQUANT

- vrai avatar Lucie ;
- sons de validation discrets ;
- fiches imprimables ;
- export de bilan lisible ;
- admin local données ;
- mode 5 minutes ;
- mode écoute/déplacement ;
- statistiques hebdomadaires locales ;
- solution multi-appareil gratuite si sûre.

---

# IDÉES EXPRESSÉMENT REPORTÉES

- backend payant ;
- OpenAI API / Realtime payant ;
- avatar vidéo ;
- XP/classement ;
- gamification agressive ;
- score phonétique pseudo-scientifique ;
- app native iOS tant que la PWA suffit.

---

# EASTER EGG RÉSERVÉ

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement, registres de langue et expressions de couple. Elle reste verrouillée jusqu’à ce que le niveau permette de la traiter proprement.
