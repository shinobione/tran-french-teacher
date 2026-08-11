# French Trân’quille — ROADMAP

> `README.md` = état courant. `CHANGELOG.md` = historique livré. Ici : **ordre, dépendances et critères de clôture**.

## Principes non négociables

1. iPhone / Safari / PWA iOS = cible principale.
2. L’application doit être utilisable par une personne peu à l’aise avec l’informatique.
3. 0 € d’exploitation récurrente tant qu’une décision explicite ne change pas cette règle.
4. Vietnamien comme soutien ; français augmenté selon des preuves d’apprentissage.
5. Oral prioritaire, sans faux diagnostic phonétique.
6. Communication réelle > théorie scolaire.
7. **Aucun reset silencieux et aucune migration sans smoke sur données anciennes simulées.**
8. Un gros build = une intention principale ; hotfix = `.1`, `.2`, etc.
9. Aucun merge important sans Chrome headless vert ; Safari réel reste requis pour iOS spécifique.
10. README / CHANGELOG / ROADMAP / ARCHITECTURE synchronisés.
11. PWA dédiée, pas clone de chatbot ni gamification agressive.

---

# Baseline pédagogique disponible

Les modules existants couvrent :

- Curriculum A0 → A1 Core, cible **40 leçons / 238 éléments** ;
- Learning Memory ;
- Daily Coach ;
- Mastery + A1 Core ;
- Scenario Lab : 12 situations / 36 tours ;
- Error Intelligence ;
- Free Voice ;
- Listening : Sens / Contrastes / Mini-dialogues ;
- Adaptive Language Ratio ;
- DEBUG FR local ;
- coût : **0 €**.

Audit Build 22 : plusieurs modules récents existaient dans le repo alors que le loader/service worker de `main` n’avait pas été totalement réconcilié. Build 22 traite cette dette explicitement.

---

# Baseline iPhone réelle — 2026-08-11

Trân utilise déjà l’application, autour de la **leçon 8**.

Retour direct :

- reconnaissance vocale des réponses françaises : **bonne** ;
- voix française de Lucie : **naturelle**.

Décision :

- pas de recalibrage vocal pendant la refonte UX ;
- `voice-ios.js` et `free-voice.js` gelés par hash dans la CI Build 22 ;
- Safari Calibration Gate devient **conditionnel** : on ne le rouvre que si de vraies erreurs apparaissent.

---

# Phases récentes

## Build 16 — Mastery Engine — ✅ CLOS
## Build 17 — Scenario Lab — ✅ CLOS
## Build 18 — Error Intelligence — ✅ CLOS
## Build 19 — A1 Core — ✅ CLOS documentaire
## Build 20 — Listening Comprehension — ✅ CODE / ARTIFACTS
## Build 21 — Adaptive Language Ratio — ✅ CODE / ARTIFACTS

Build 22 réconcilie leur activation runtime avant de poursuivre l’expansion fonctionnelle.

---

# v1.15.0 — Build 22 — UX Foundation & Runtime Integrity — 🔥 EN COURS

## Intention

Rendre French Trân’quille utilisable sans devoir comprendre ses moteurs internes, tout en protégeant la progression réelle de Trân.

## Navigation apprenante

Trois destinations seulement :

```text
Hôm nay / Aujourd’hui
Luyện tập / Pratiquer
Lộ trình / Parcours
```

`Pratiquer` regroupe :

- Réviser ;
- Parler ;
- Écouter.

## Home

- [x] logo conservé ;
- [x] prochaine leçon dominante ;
- [x] position dans le parcours ;
- [x] séance du jour conservée ;
- [x] cartes techniques masquées côté apprenante ;
- [x] DEBUG FR conserve les détails techniques.

## Leçon Focus

- [x] bottom nav masquée pendant le cours ;
- [x] grandes zones tactiles ;
- [x] navigation précédente/suivante fixe ;
- [x] une tâche principale à l’écran ;
- [x] ratio technique masqué côté Trân.

## Parcours / Réglages

- [x] synthèse humaine du parcours en premier ;
- [x] diagnostics pédagogiques détaillés masqués côté apprenante ;
- [x] reset technique masqué côté apprenante ;
- [x] outils conservés en DEBUG FR.

## Sécurité de progression

- [x] clé legacy `francais-avec-luc:learner:v1` conservée ;
- [x] aucune migration destructive ;
- [x] snapshot `french-tranquille:safety:pre-build22:v1` ;
- [ ] smoke Chrome « Trân leçon 8 » vert sur head final ;
- [ ] snapshot et données après boot strictement conformes.

## Runtime Integrity

- [x] Stage 3 câblé ;
- [x] Mastery Stage 3 câblé ;
- [x] Listening câblé ;
- [x] Adaptive Language câblé ;
- [x] Build Meta dernier ;
- [x] service worker Build 22 complet ;
- [ ] 40 leçons / 238 éléments vérifiés dans Chrome ;
- [ ] Listening smoke vert ;
- [ ] Adaptive Language smoke vert ;
- [ ] Scenario / Error non régressés.

## Sanctuaires

- [ ] `assets/LOGO.png` hash inchangé ;
- [ ] `assets/Favicon.png` hash inchangé ;
- [ ] `voice-ios.js` hash inchangé ;
- [ ] `free-voice.js` hash inchangé.

## Clôture

- [x] README candidat ;
- [x] dossier Build 22 ;
- [x] roadmap candidat ;
- [ ] changelog candidat ;
- [ ] architecture Build 22 ;
- [ ] build policy data-safety ;
- [ ] CI Build 22 ;
- [ ] PR verte ;
- [ ] merge ;
- [ ] CI `main` verte ;
- [ ] GitHub Pages verte ;
- [ ] docs release `PROD / CLOS`.

---

# v1.16.0 — Build 23 — Real Life French I — PROCHAIN

## Quotidien avec Jerry

Objectif : transformer les acquis déjà connus en situations qui correspondent à la vraie vie de Trân.

Priorité aux structures débloquées tôt afin que le module apporte de la valeur immédiatement, même autour des leçons 8–10.

Situations prévues :

- se retrouver / dire bonjour ;
- demander de répéter ou de parler plus lentement ;
- café / nourriture / goûts ;
- prix et petites courses ;
- demander où se trouve un lieu ;
- trajet simple avec Jerry ;
- mini-dialogues où Jerry est l’interlocuteur.

Le contenu plus avancé reste verrouillé par les acquis.

Critères : scénarios utiles, pas de vocabulaire non appris comme réponse obligatoire, Memory/Error/Adaptive intégrés, UI invisible derrière `Pratiquer`.

---

# v1.17.0 — Build 24 — Real Life French II

Déplacements, gare, téléphone, rencontres avec les proches, repas, logement et premières conversations plus longues.

---

# v1.18.0 — Build 25 — Real Life French III

Problèmes quotidiens, émotions, explications, français oral courant vs forme écrite, humour simple et conversation moins guidée.

---

# V2.0.0 — Hardening

Objectif : figer un produit fiable et durable.

- parcours A0→A1 cohérent ;
- UX apprenante stabilisée ;
- adaptation vérifiable ;
- migrations versionnées ;
- sauvegarde/restore robustes ;
- offline/PWA ;
- iPhone réel ;
- nettoyage des scripts/workflows one-shot ;
- dette `app.js` évaluée dans un build dédié, jamais glissée dans un build pédagogique ;
- documentation finale.

---

# Backlog

Vrai avatar Lucie, sons discrets, fiches imprimables, bilan exportable, admin local, mode 5 min, écoute/déplacement, stats hebdo, multi-appareil gratuit si solution sûre.

# Reporté

Backend/API payants, avatar vidéo, XP/classement, gamification agressive, score phonétique pseudo-scientifique, app native tant que la PWA suffit.

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.
