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

## v1.9.0 — Build 16 — LIVRÉ

- 25 leçons / 148 éléments ;
- Learning Memory + révision espacée ;
- Daily Coach ;
- Mastery Engine ;
- distinction leçon terminée / acquis / maîtrise ;
- estimation interne A0 → A1 en construction ;
- Free Voice + fallback texte ;
- CI Chrome headless ;
- GitHub Pages ;
- documentation canonique ;
- coût : 0 €.

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

## v1.10.0 — Build 17 — Scenario Lab — 🔥 EN COURS

### But

Transformer Conversation en **situations multi-tours réellement jouables**, sans IA payante.

### Périmètre V1

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

### Fonctionnement attendu

- scénarios déverrouillés selon les leçons terminées ;
- plusieurs variantes de réponse acceptées ;
- première erreur → indice ;
- erreurs répétées → modèle ;
- utilisation du modèle comptée comme aide ;
- réussites / échecs / aides reliés à Learning Memory ;
- progression locale par scénario ;
- interlocuteur réécoutable ;
- micro utilisé si le navigateur l’expose ;
- fallback texte permanent ;
- aucune notation phonétique inventée.

### Critères de clôture Build 17

- [ ] 12 scénarios présents et IDs uniques ;
- [ ] au moins 3 tours par scénario ;
- [ ] déverrouillage basé sur `completedLessons` ;
- [ ] aucun scénario ne révèle son modèle avant plusieurs échecs ;
- [ ] Learning Memory reçoit succès / échec / aide ;
- [ ] statistiques locales persistées ;
- [ ] Progression affiche les situations ;
- [ ] diagnostic Scenario Lab présent ;
- [ ] Home Build16 toujours saine ;
- [ ] Chrome Home vert ;
- [ ] Chrome Conversation `?scenarioSmoke=1` vert ;
- [ ] README / ROADMAP / CHANGELOG / ARCHITECTURE synchronisés ;
- [ ] cache/version Build 17 synchronisés ;
- [ ] CI PR verte ;
- [ ] CI main verte ;
- [ ] GitHub Pages vert.

### Non inclus dans Build 17

- compréhension sémantique libre par IA ;
- conversation générative illimitée ;
- score de prononciation ;
- calibration Siri spécifique ;
- nouvelle extension du curriculum.

---

## v1.11.0 — Build 18 — Error Intelligence — PROCHAIN

### But

Passer de « difficile/correct/facile » à une mémoire des **types de confusion**.

### Catégories prévues

- mot oublié ;
- mot confondu ;
- ordre des mots ;
- négation ;
- article ;
- verbe / structure ;
- transcription vocale non reconnue ;
- réponse partielle ;
- hésitation répétée ;
- aide/modèle nécessaire dans Scenario Lab.

### Livrables

- historique compact par élément ;
- confusion récurrente ;
- source d’erreur (`review`, `voice`, `scenario`, etc.) ;
- priorité quotidienne influencée par le type d’erreur ;
- mini-bilan après séance ;
- export JSON versionné ;
- pont vers Mastery Engine.

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
