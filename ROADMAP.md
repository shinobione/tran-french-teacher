# French Trân’quille — ROADMAP

> Document canonique du futur du projet.  
> `README.md` = état courant. `CHANGELOG.md` = historique livré.  
> Ici : **ordre, dépendances et critères de clôture**.

## Principes non négociables

1. **Cible principale : Trân sur iPhone / Safari / PWA iOS.** Android et PC restent supportés.
2. **0 € d’exploitation récurrente** tant qu’une décision explicite ne change pas cette règle.
3. **Vietnamien majoritaire au départ**, français augmenté selon les acquis réels.
4. **Oral prioritaire**, sans inventer une mesure phonétique non observable.
5. **Communication réelle > théorie scolaire.**
6. **Aucun reset silencieux de progression.**
7. **Un gros build = une intention principale claire.** Hotfix : `Build X.1`, `X.2`, etc.
8. **Aucun merge important sans vrai Chrome headless vert.** Safari réel reste obligatoire pour les fonctions iOS spécifiques.
9. **README / CHANGELOG / ROADMAP / architecture sont synchronisés avec le code.**
10. French Trân’quille reste une **PWA dédiée**, pas un clone de ChatGPT ni un jeu infantilisant.

---

# État de référence livré

## v1.10.0 — Build 17 — ✅ PROD

- 25 leçons / 148 éléments ;
- Learning Memory ;
- Daily Coach ;
- Mastery Engine ;
- Scenario Lab : 12 situations / 36 tours ;
- Free Voice + fallback texte ;
- Chrome Home + Conversation ;
- GitHub Pages ;
- coût 0 €.

---

# PHASE PWA-3B / ADAPTATION

## v1.9.0 — Build 16 — Mastery Engine — ✅ CLOS

- [x] 4 grandes étapes ;
- [x] preuves mémoire avant `Maîtrisé` ;
- [x] estimation interne non assimilée à une certification CECRL ;
- [x] priorité suivante ;
- [x] docs canoniques ;
- [x] Chrome + Pages verts.

## v1.10.0 — Build 17 — Scenario Lab — ✅ CLOS

- [x] 12 scénarios / 36 tours ;
- [x] déverrouillage par leçons ;
- [x] variantes acceptées ;
- [x] indice puis modèle ;
- [x] modèle compté comme aide ;
- [x] Learning Memory alimentée ;
- [x] stats locales ;
- [x] profil vierge supporté ;
- [x] Chrome Home + Conversation ;
- [x] CI main + Pages verts.

---

## v1.11.0 — Build 18 — Error Intelligence — 🔥 EN COURS

### But

Mémoriser **les difficultés observables** et leur répétition afin de mieux décider ce qui doit revenir, sans inventer de diagnostic grammatical ou phonétique.

### Taxonomie V1

```text
retrieval-difficult
text-mismatch
scenario-miss
assisted
voice-unrecognized
partial
practice-miss
repeated-miss
```

Les catégories plus linguistiques (`article`, `négation`, `ordre des mots`, etc.) sont reportées tant qu’une comparaison entrée/cible ne permet pas de les prouver de manière fiable.

### Architecture retenue

```text
Learning Memory = quoi réviser et quand
Error Intelligence = où / comment la difficulté a été observée
Mastery Engine = degré global de consolidation
Daily Coach = quoi faire maintenant
```

### Livré sur branche Build 18

- [x] stockage `french-tranquille:error-intelligence:v1` ;
- [x] historique borné : 20 événements / élément, 120 récents globaux ;
- [x] compteurs agrégés ;
- [x] récence ;
- [x] répétition sur fenêtre de 30 min ;
- [x] récupération après réussite ;
- [x] erreur dominante uniquement après répétition ;
- [x] score de priorité interne ;
- [x] focus ajouté à Daily Coach ;
- [x] carte Error Intelligence dans Progression ;
- [x] mini-bilan de session ;
- [x] export JSON dédié ;
- [x] diagnostic Réglages ;
- [x] Free Voice → Learning Memory ;
- [x] Free Voice → Error Intelligence ;
- [x] erreurs techniques micro exclues de la mémoire linguistique ;
- [x] Scenario Lab observé via ses sources Learning Memory ;
- [x] rating Révision difficile exploitable ;
- [x] README / CHANGELOG / ARCHITECTURE actualisés.

### À valider avant clôture

- [ ] contrat CI Error Intelligence ;
- [ ] limite de taille vérifiée automatiquement ;
- [ ] absence de double comptage Free Voice ;
- [ ] aucune régression Learning Memory ;
- [ ] aucune régression 25 leçons / 12 scénarios ;
- [ ] Chrome Home vert ;
- [ ] Chrome Scenario Lab vert ;
- [ ] Chrome Error Intelligence `?errorSmoke=1` vert ;
- [ ] PR verte ;
- [ ] merge ;
- [ ] CI `main` verte ;
- [ ] GitHub Pages vert ;
- [ ] ROADMAP + CHANGELOG clôturés après preuve de prod.

---

# PHASE PWA-2B — VOICE CALIBRATION

## Safari/Siri Calibration Gate — dépendance externe

**Bloqué jusqu’au vrai test sur l’iPhone de Trân. Rien ne sera simulé.**

À récolter :

- phrase cible ;
- transcription Safari ;
- alternatives ;
- nombre d’essais ;
- faux refus ;
- faux positifs.

Puis seulement :

- tolérances réelles ;
- variantes observées ;
- distinction phrase reconnue / prononciation correcte ;
- aucun faux score phonétique.

Ce gate peut devenir **Build 18.x** si le test arrive avant Build 19, ou être traité plus tard sans bloquer le curriculum.

---

# PHASE PWA-4B — A1 CORE

## v1.12.0 — Build 19 — Curriculum 26 → 40 — PROCHAIN APRÈS BUILD 18

Axes :

- nombres 11 → 100 ;
- dates, jours, mois ;
- heures complètes ;
- possessifs de base ;
- présent `tu / il / elle / nous` sur structures fréquentes ;
- `aller + infinitif` — futur proche ;
- `venir de + infinitif` simple ;
- passé composé ultra-fréquent après consolidation du présent ;
- transport / administration / rendez-vous ;
- émotions et besoins ;
- situations avec Jerry et les proches.

**Règle :** aucune conjugaison hors-sol ; chaque structure est motivée par une situation.

---

## v1.13.0 — Build 20 — Listening Comprehension

- phrase audio → choix de sens ;
- contrastes proches ;
- vitesse lente puis normale ;
- mini-dialogues ;
- erreurs envoyées à Learning Memory + Error Intelligence.

---

## v1.14.0 — Build 21 — Adaptive Language Ratio

Le ratio VI/FR dépendra :

- Mastery ;
- compréhension ;
- indices nécessaires ;
- Error Intelligence ;
- difficulté de la situation.

Le vietnamien recule uniquement quand les preuves le permettent.

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

- neutre ;
- oral courant ;
- familier raisonnable ;
- phrase correcte vs phrase naturelle.

---

# PHASE PWA-6 — V2 / HARDENING

## v2.0.0 — objectif A1 Core stable

- curriculum A0 → A1 cohérent ;
- Scenario Lab stable ;
- mémoire + erreurs versionnées ;
- sauvegarde/import robuste ;
- PWA iPhone validée ;
- tests Safari réels ;
- Chrome/Android sans régression majeure ;
- offline testé ;
- docs complètes ;
- aucune clé/API client ;
- aucune dépendance payante obligatoire.

---

# BACKLOG NON BLOQUANT

- vrai avatar Lucie ;
- sons de validation discrets ;
- fiches imprimables ;
- bilan lisible/exportable ;
- admin local données ;
- mode 5 minutes ;
- écoute/déplacement ;
- statistiques hebdomadaires ;
- multi-appareil gratuit si une solution sûre existe.

---

# REPORTÉ EXPLICITEMENT

- backend payant ;
- OpenAI API / Realtime payant ;
- avatar vidéo ;
- XP/classement ;
- gamification agressive ;
- score phonétique pseudo-scientifique ;
- app native iOS tant que la PWA suffit.

---

# EASTER EGG RÉSERVÉ

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement, registres de langue et expressions de couple. Verrouillée jusqu’à ce que le niveau permette de la traiter correctement.
