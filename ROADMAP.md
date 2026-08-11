# French Trân’quille — ROADMAP

> `README.md` = état courant. `CHANGELOG.md` = historique livré. Ici : **ordre, dépendances et critères de clôture**.

## Principes non négociables

1. iPhone / Safari / PWA iOS = cible principale.
2. 0 € d’exploitation récurrente tant qu’une décision explicite ne change pas cette règle.
3. Vietnamien majoritaire au départ ; français augmenté selon les preuves d’apprentissage.
4. Oral prioritaire, sans faux diagnostic phonétique.
5. Communication réelle > théorie scolaire.
6. Aucun reset silencieux.
7. Un gros build = une intention principale ; hotfix = `.1`, `.2`, etc.
8. Aucun merge important sans Chrome headless vert ; Safari réel reste requis pour iOS spécifique.
9. README / CHANGELOG / ROADMAP / ARCHITECTURE synchronisés.
10. PWA dédiée, pas clone de chatbot ni gamification agressive.

---

# État de référence livré

## v1.13.0 — Build 20 — ✅ PROD

- **40 leçons / 238 éléments** ;
- A0 → A1 Core ;
- Learning Memory ;
- Daily Coach ;
- Mastery Engine + A1 Core ;
- Scenario Lab : 12 situations / 36 tours ;
- Error Intelligence ;
- Free Voice ;
- Listening Comprehension : Sens / Contrastes / Mini-dialogues ;
- transcript caché avant tentative ;
- vitesse normale/lente ;
- Memory + Error `listening-miss` ;
- Chrome Home / Listening / Scenario / Error / A1 Core ;
- validation directe de GitHub Pages publique ;
- coût : **0 €**.

---

# PHASES RÉCENTES CLÔTURÉES

## Build 16 — Mastery Engine — ✅ CLOS
## Build 17 — Scenario Lab — ✅ CLOS
## Build 18 — Error Intelligence — ✅ CLOS
## Build 19 — A1 Core — ✅ CLOS

## v1.13.0 — Build 20 — Listening Comprehension — ✅ CLOS

- [x] moteur Listening local ;
- [x] stockage `french-tranquille:listening:v1` ;
- [x] historique borné à 100 ;
- [x] Sens ;
- [x] Contrastes ;
- [x] Mini-dialogues ;
- [x] transcript caché avant tentative ;
- [x] transcript révélé après réponse ;
- [x] vitesse normale / lente ;
- [x] réécoute ;
- [x] Home ;
- [x] Daily Coach ;
- [x] Progression ;
- [x] Réglages ;
- [x] Learning Memory `listening-*` ;
- [x] Error Intelligence `listening-miss` ;
- [x] double comptage évité ;
- [x] Chrome Home ;
- [x] Chrome Listening ;
- [x] Chrome Scenario ;
- [x] Chrome Error ;
- [x] Chrome A1 Core ;
- [x] PR #13 verte et mergée ;
- [x] CI `main` verte ;
- [x] GitHub Pages vert ;
- [x] URL publique Home + Listening vérifiée.

---

# VOICE CALIBRATION GATE — BLOQUÉ SUR DONNÉES RÉELLES

Toujours séparé : cible, transcription Safari réelle, alternatives, essais, faux refus et faux positifs avant toute calibration spécifique à Trân.

---

# v1.14.0 — Build 21 — Adaptive Language Ratio — 🔥 PROCHAIN

## But

Faire évoluer le ratio vietnamien/français **selon les preuves d’apprentissage**, et non selon un numéro de leçon arbitraire.

## Signaux prévus

- Mastery global ;
- Mastery A1 Core ;
- réussite Listening ;
- fragilités Learning Memory ;
- Error Intelligence récente ;
- assistance nécessaire dans Scenario Lab ;
- difficulté de l’écran ou de l’exercice.

## Profils de langue envisagés

```text
VI-HEAVY   ≈ 90% VI / 10% FR
VI-SUPPORT ≈ 70% VI / 30% FR
BALANCED   ≈ 50% VI / 50% FR
FR-GROWING ≈ 30% VI / 70% FR
```

Ce sont des **cibles de rendu**, pas des quotas mot-à-mot rigides.

## Garde-fous

- une fragilité récente peut faire revenir temporairement plus de vietnamien ;
- un excellent score global ne supprime pas l’aide VI sur une nouvelle structure ;
- les consignes de sécurité / administration peuvent garder davantage de soutien ;
- DEBUG FR de Jerry reste indépendant ;
- aucune langue n’est changée silencieusement dans les données stockées.

## Critères de clôture Build 21

- [ ] moteur ratio séparé ;
- [ ] score explicable ;
- [ ] profils de langue définis ;
- [ ] Home / leçons / Listening / Scenarios peuvent consommer le profil ;
- [ ] baisse du VI uniquement avec preuves ;
- [ ] remontée du VI après difficultés ;
- [ ] DEBUG FR préservé ;
- [ ] smoke de profils débutant / intermédiaire / fragilisé ;
- [ ] 40 leçons intactes ;
- [ ] Listening intact ;
- [ ] Scenario / Error / Mastery intacts ;
- [ ] docs ;
- [ ] PR + main + Pages verts.

---

# Builds 22–24 — Real Life French

Français avec Jerry, proches, repas, téléphone, déplacements, problèmes quotidiens, émotions, humour simple, oral courant vs forme correcte.

---

# V2.0.0 — Hardening

A0→A1 cohérent, adaptation stable, scénarios, mémoire versionnée, sauvegarde robuste, Safari réel, offline, docs, zéro dépendance payante obligatoire.

---

# Backlog

Vrai avatar Lucie, sons discrets, fiches imprimables, bilan exportable, admin local, mode 5 min, écoute/déplacement, stats hebdo, multi-appareil gratuit si solution sûre.

# Reporté

Backend/API payants, avatar vidéo, XP/classement, gamification agressive, score phonétique pseudo-scientifique, app native tant que la PWA suffit.

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.
