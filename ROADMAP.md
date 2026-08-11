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

## v1.11.0 — Build 18 — ✅ PROD

- **25 leçons / 148 éléments** ;
- Learning Memory + révision espacée ;
- Daily Coach ;
- Mastery Engine ;
- Scenario Lab : **12 situations / 36 tours** ;
- Error Intelligence fondée sur des preuves observables ;
- historique d’erreurs borné ;
- récence / répétition / récupération ;
- Free Voice relié à Learning Memory + Error Intelligence ;
- Chrome Home + Scenario + Error Intelligence ;
- GitHub Pages ;
- coût : **0 €**.

---

# PHASE PWA-3B — ADAPTATION RÉELLE

## v1.9.0 — Build 16 — Mastery Engine — ✅ CLOS

- [x] quatre étapes de maîtrise ;
- [x] preuves Learning Memory avant `Maîtrisé` ;
- [x] estimation interne non assimilée à une certification CECRL ;
- [x] priorité suivante ;
- [x] documentation canonique ;
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

## v1.11.0 — Build 18 — Error Intelligence — ✅ CLOS

### Livré

- [x] stockage `french-tranquille:error-intelligence:v1` ;
- [x] taxonomie fondée sur des preuves observables ;
- [x] `retrieval-difficult` ;
- [x] `text-mismatch` ;
- [x] `scenario-miss` ;
- [x] `assisted` ;
- [x] `voice-unrecognized` ;
- [x] `partial` ;
- [x] `practice-miss` ;
- [x] `repeated-miss` ;
- [x] historique borné à **20 événements / élément** ;
- [x] historique global borné à **120 événements récents** ;
- [x] récence ;
- [x] répétition sur fenêtre de 30 minutes ;
- [x] récupération après réussite ;
- [x] score de priorité interne ;
- [x] focus Error Intelligence dans Daily Coach ;
- [x] carte dédiée dans Progression ;
- [x] mini-bilan de session ;
- [x] export JSON local ;
- [x] diagnostic Réglages ;
- [x] Free Voice → Learning Memory ;
- [x] Free Voice → Error Intelligence ;
- [x] erreurs techniques micro exclues de la mémoire linguistique ;
- [x] bug `free-voice-text` / `voice` corrigé par classification exacte du canal ;
- [x] aucun pseudo-diagnostic grammatical ou phonétique ;
- [x] Chrome Home vert ;
- [x] Chrome Scenario Lab vert ;
- [x] Chrome Error Intelligence vert ;
- [x] smoke réel des limites **20 / 120** ;
- [x] PR verte ;
- [x] CI `main` verte ;
- [x] GitHub Pages vert.

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

Ce gate peut être traité en hotfix/build intermédiaire dès que les données réelles existent, sans bloquer le curriculum.

---

# PHASE PWA-4B — A1 CORE

## v1.12.0 — Build 19 — Curriculum 26 → 40 — 🔥 PROCHAIN

### But

Faire passer French Trân’quille d’un **early A1** à un **A1 Core réellement utilisable**, sans transformer l’app en manuel de conjugaison.

### Périmètre prévu

15 nouvelles leçons, chacune centrée sur une situation :

26. nombres **11 → 20** ;
27. nombres **20 → 100** et prix ;
28. **jours de la semaine** et disponibilité ;
29. **mois / dates** et anniversaire / rendez-vous ;
30. **heure complète** : et quart, et demie, moins le quart ;
31. **mon / ma / mes**, ton / ta / tes ;
32. présent utile avec **tu** ;
33. présent utile avec **il / elle** ;
34. présent utile avec **nous** ;
35. **aller + infinitif** — futur proche ;
36. **venir de + infinitif** — action toute récente ;
37. **passé composé ultra-fréquent** : j’ai mangé / j’ai travaillé / j’ai regardé ;
38. **je suis allée / arrivée / rentrée** dans des situations concrètes ;
39. **administration / rendez-vous / documents** ;
40. **émotions, besoins et conversation avec Jerry / proches**.

### Règles pédagogiques

- pas de tableau de conjugaison hors contexte ;
- 5–7 éléments nouveaux maximum par leçon ;
- réutilisation d’anciens acquis ;
- notes de structure courtes VI/FR ;
- phrases réellement utiles ;
- formes féminines cohérentes avec Trân quand nécessaire ;
- le français oral naturel peut être signalé sans sacrifier la forme correcte ;
- les nouveaux éléments doivent automatiquement devenir disponibles pour Memory, Voice, Mastery et futurs scénarios.

### Architecture envisagée

```text
app.js                 — intact
curriculum-stage2.js   — leçons 16–25
curriculum-stage3.js   — leçons 26–40
stage3-boot.js         — rerender contrôlé
```

### Critères de clôture Build 19

- [ ] 15 nouvelles leçons ;
- [ ] total attendu documenté ;
- [ ] IDs de leçons et d’items uniques ;
- [ ] aucune régression des 25 anciennes leçons ;
- [ ] toutes les nouvelles leçons ont intro + items + challenge ;
- [ ] structures grammaticales expliquées sans chapitre scolaire isolé ;
- [ ] Learning Memory voit les nouveaux items ;
- [ ] Free Voice voit les nouveaux items ;
- [ ] Mastery Engine étendu à un nouveau palier A1 Core ;
- [ ] Error Intelligence accepte les nouveaux IDs ;
- [ ] curriculum UX reste bornée/scrollable ;
- [ ] Chrome Home vert ;
- [ ] Chrome ancienne Conversation vert ;
- [ ] Chrome Build 19 / leçon 40 vert ;
- [ ] README / ROADMAP / CHANGELOG / ARCHITECTURE synchronisés ;
- [ ] CI PR + main + Pages verts.

---

## v1.13.0 — Build 20 — Listening Comprehension

- phrase audio → choix de sens ;
- contrastes proches ;
- vitesse lente puis normale ;
- mini-dialogues ;
- erreurs envoyées à Learning Memory + Error Intelligence.

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
