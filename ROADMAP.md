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
6. **Aucun reset silencieux de progression.** Toute migration de données doit préserver les données locales ou documenter explicitement l’exception.
7. **Un gros build = une intention principale claire.** Les hotfixes gardent le numéro de build et ajoutent `.1`, `.2`, etc.
8. **Aucun merge important sans vrai Chrome headless vert.** Le test iPhone réel reste indispensable pour les fonctions spécifiques Safari/Siri.
9. **Toute modification importante met à jour la documentation vivante** : README, CHANGELOG, ROADMAP si nécessaire, et documents d’architecture/politique concernés.
10. French Trân’quille reste une **PWA dédiée**, pas un clone de ChatGPT ni un jeu infantilisant.

---

# État de référence

## v1.9.0 — Build 16 — LIVRÉ

- 25 leçons / 148 éléments ;
- A0 → premières fondations A1 ;
- Learning Memory locale + révision espacée ;
- Daily Coach ;
- **Mastery Engine** par grandes étapes ;
- distinction leçon terminée / acquis / maîtrise ;
- estimation interne A0 / A0+ / Pré-A1 / A1 en construction ;
- Free Voice gratuit + fallback texte ;
- UX desktop/mobile responsive ;
- branding French Trân’quille + Lucie ;
- CI avec vrai Chrome headless ;
- GitHub Pages ;
- gouvernance documentaire canonique ;
- coût d’exploitation : 0 €.

---

# PHASE PWA-3B — ADAPTATION RÉELLE

## v1.9.0 — Build 16 — Mastery Engine — ✅ CLOS

### But

Ne plus confondre **« leçon terminée »** avec **« compétence réellement utilisable »**.

### Livré

- carte de maîtrise par grandes étapes ;
- score interne basé sur progression, acquis, preuves de révision, Learning Memory et fragilités ;
- états Non commencé / Découverte / Consolidation / Presque solide / Maîtrisé ;
- estimation interne A0 / A0+ / Pré-A1 / A1 en construction ;
- priorité suivante proposée par Lucie ;
- aucune assimilation à une certification CECRL officielle ;
- diagnostic enrichi ;
- documentation canonique créée.

### Clôture Build 16

- [x] 4 étapes visibles dans Progression ;
- [x] aucun statut « Maîtrisé » sans preuves mémoire suffisantes ;
- [x] aucune régression des 25 leçons ;
- [x] décorateurs idempotents / aucune boucle MutationObserver observée ;
- [x] Chrome headless vert ;
- [x] README / CHANGELOG / ROADMAP / ARCHITECTURE / BUILD-POLICY synchronisés ;
- [x] cache/version Build 16 synchronisés ;
- [x] PR validée avant merge.

---

## v1.10.0 — Build 17 — Scenario Lab — PROCHAIN

### But

Transformer Conversation en **situations multi-tours**, sans IA payante.

### Scénarios V1 prévus

- café ;
- gare ;
- restaurant ;
- supermarché ;
- pharmacie ;
- problème dans l’appartement ;
- appel à Jerry ;
- arrivée en France ;
- rencontre avec des proches ;
- demander de l’aide ;
- rendez-vous ;
- petite conversation sociale.

### Fonctionnement

- plusieurs tours de dialogue ;
- variantes acceptées ;
- indice au premier blocage ;
- modèle après plusieurs échecs ;
- échec/réussite envoyé à Learning Memory ;
- scénarios déverrouillés selon les acquis ;
- progression locale par scénario ;
- texte systématiquement disponible ;
- voix utilisée lorsque le navigateur le permet.

### Clôture

Un scénario doit pouvoir être joué jusqu’au bout **sans IA, sans réseau applicatif et sans réponse codée visible avant tentative**.

---

## v1.11.0 — Build 18 — Error Intelligence

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
- hésitation répétée.

### Livrables

- historique compact par élément ;
- confusion récurrente ;
- priorité quotidienne influencée par le type d’erreur ;
- mini-bilan après séance ;
- export JSON versionné.

---

# PHASE PWA-2B — VOICE CALIBRATION

## Build 18.x ou 19 selon disponibilité — Safari/Siri Calibration Gate

**Cette étape dépend d’un vrai test sur l’iPhone de Trân. Elle ne sera pas simulée.**

### Données nécessaires

Pour plusieurs phrases déjà apprises :

- phrase cible ;
- transcription Safari ;
- alternatives de transcription si disponibles ;
- nombre d’essais ;
- cas où Trân estime avoir correctement prononcé mais Safari refuse ;
- cas où Safari accepte une mauvaise phrase.

### Après collecte

- tolérances par type de phrase ;
- variantes réellement observées ;
- distinction « phrase reconnue » / « prononciation correcte » ;
- aucun faux score phonétique.

---

# PHASE PWA-4B — A1 CORE

## v1.12.0 — Build 19 — Curriculum 26 → 40

### Axes prévus

- nombres 11 → 100 ;
- dates et calendrier ;
- heures plus complètes ;
- jours / mois ;
- possessifs de base ;
- présent : tu / il / elle / nous dans des structures fréquentes ;
- aller + infinitif pour le futur proche ;
- venir de + infinitif dans un contexte simple ;
- passé composé ultra-fréquent, seulement après assez de présent ;
- transport / administration / rendez-vous ;
- émotions et besoins ;
- conversation avec Jerry et les proches.

### Règle

Pas de « chapitre de conjugaison ». Chaque structure est introduite par une situation.

---

## v1.13.0 — Build 20 — Listening Comprehension

### But

Faire progresser la compréhension orale même sans reconnaissance vocale avancée.

### Prévu

- Lucie lit une phrase ;
- choix de sens ;
- contraste entre deux phrases proches ;
- vitesse lente puis normale ;
- mini-dialogues audio ;
- répétition optionnelle ;
- erreurs envoyées à Learning Memory.

---

## v1.14.0 — Build 21 — Adaptive Language Ratio

### But

Faire évoluer automatiquement la proportion VI/FR.

### Principe

Le ratio ne dépend pas du nombre de jours. Il dépend :

- maîtrise par étape ;
- compréhension réussie ;
- quantité d’indices nécessaires ;
- fragilité des éléments ;
- niveau de la situation.

### Exemple

- début A0 : explications massivement vietnamiennes ;
- A0 renforcé : davantage de consignes françaises très répétitives ;
- early A1 : consignes simples en français, explications difficiles en vietnamien ;
- jamais de bascule brutale.

---

# PHASE PWA-5 — REAL LIFE FRENCH

## Builds 22–24

### Français avec Jerry

Mini-situations inspirées de la vraie vie :

- arrivée / retrouvailles ;
- chez soi ;
- repas ;
- amis et famille ;
- téléphone ;
- déplacement ;
- problème quotidien ;
- expressions affectives naturelles ;
- humour simple ;
- petites incompréhensions de couple.

### Registres

- français neutre ;
- français oral courant ;
- expressions familières raisonnables ;
- différence entre phrase correcte et phrase naturelle.

---

# PHASE PWA-6 — HARDENING / V2

## v2.0.0 — objectif de clôture A1 Core

Pour considérer French Trân’quille V2 stable :

- curriculum A0 → A1 cohérent ;
- scénario multi-tours stable ;
- mémoire et erreurs versionnées ;
- sauvegarde/import robuste ;
- PWA installable iPhone ;
- tests Safari réels effectués ;
- Chrome/Android sans régression majeure ;
- offline testé ;
- documentation complète ;
- aucun secret/API côté client ;
- aucune dépendance payante obligatoire.

---

# BACKLOG NON BLOQUANT

- vrai avatar Lucie ;
- sons de validation très discrets ;
- fiches de révision imprimables ;
- export de bilan lisible par Jerry ;
- outil admin local de diagnostic des données ;
- mode « 5 minutes seulement » ;
- mode déplacement / écoute mains libres ;
- statistiques hebdomadaires locales ;
- meilleure gestion multi-appareil sans serveur si une solution gratuite et sûre est viable.

---

# IDÉES EXPRESSÉMENT REPORTÉES

- backend payant ;
- OpenAI API / Realtime payant ;
- avatar vidéo ;
- classement / XP artificiel ;
- gamification agressive ;
- score de prononciation pseudo-scientifique ;
- app native iOS tant que la PWA suffit.

---

# EASTER EGG RÉSERVÉ

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement, registres de langue et expressions de couple. Elle restera verrouillée jusqu’à ce que le niveau linguistique permette de la traiter proprement.
