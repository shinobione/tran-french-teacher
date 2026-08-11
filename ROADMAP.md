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
12. Un nouveau moteur n’obtient pas automatiquement une nouvelle entrée de navigation.

---

# Baseline production — v1.15.0 Build 22

- Curriculum A0 → A1 Core : **40 leçons / 241 éléments audités** ;
- Learning Memory ;
- Daily Coach ;
- Mastery + A1 Core ;
- Scenario Lab ;
- Error Intelligence ;
- Free Voice ;
- Listening ;
- Adaptive Language Ratio ;
- UX apprenante : **Aujourd’hui / Pratiquer / Parcours** ;
- DEBUG FR local ;
- coût : **0 €**.

Trân utilise déjà l’application autour de la leçon 8. Sa reconnaissance vocale iPhone et la voix de Lucie constituent une baseline réelle validée : ne pas les modifier sans problème reproductible.

---

# Phases récentes

## Build 16 — Mastery Engine — ✅ CLOS
## Build 17 — Scenario Lab — ✅ CLOS
## Build 18 — Error Intelligence — ✅ CLOS
## Build 19 — A1 Core — ✅ CLOS
## Build 20 — Listening Comprehension — ✅ INTÉGRÉ AU RUNTIME
## Build 21 — Adaptive Language Ratio — ✅ INTÉGRÉ AU RUNTIME
## Build 22 — UX Foundation & Runtime Integrity — ✅ CLOS

### Preuves de clôture Build 22

- PR #16 verte ;
- smoke Home UX vert ;
- smoke « Trân leçon 8 » zéro-perte vert ;
- branding + voix byte-identiques ;
- runtime **40 / 241** vérifié ;
- Scenario / Error / Listening / Adaptive Language non régressés ;
- merge `main` : `2c961ed5f0e36f378dc5ffa272f6eda83646e3d6` ;
- CI `main` run #59 : SUCCESS ;
- GitHub Pages run #75 : SUCCESS.

---

# v1.16.0 — Build 23 — Real Life French I — 🔜 PROCHAIN

## Quotidien avec Jerry

Objectif : transformer les acquis déjà connus en **mini-situations de vraie vie** directement utiles à Trân.

Build 23 doit produire de la valeur dès son niveau actuel. Les situations les plus simples doivent donc fonctionner avec les acquis des premières leçons au lieu d’attendre la fin du parcours.

## UX

Aucun nouveau bouton dans le menu du bas.

Build 23 vivra derrière **Pratiquer**, soit comme sélection automatique de situations dans Conversation, soit comme entrée contextualisée dans la Practice Sheet si cela reste plus simple que le moteur historique.

Le nom technique « Real Life French » n’a pas besoin d’être exposé à Trân.

## Pack I — situations prévues

- retrouver Jerry et le saluer ;
- se présenter à quelqu’un avec lui ;
- demander de répéter ;
- demander de parler plus lentement ;
- commander une boisson ;
- dire ce qu’elle aime / n’aime pas ;
- comprendre ou donner un petit prix ;
- demander où se trouve un lieu ;
- dire qu’elle n’a pas compris ;
- petit trajet / rendez-vous simple.

## Contraintes pédagogiques

- aucune réponse obligatoire ne doit dépendre d’un élément non appris ;
- chaque situation déclare ses prérequis ;
- les situations se débloquent automatiquement ;
- premier raté → indice ;
- blocage persistant → modèle court ;
- succès et difficultés alimentent Memory / Error ;
- Adaptive Language module la quantité de vietnamien ;
- voix existante réutilisée sans recalibrage ;
- progression actuelle de Trân intacte.

## Tests prévus

- profil synthétique leçon 8 : pack de situations déjà utilisables ;
- profil débutant : uniquement situations réellement accessibles ;
- aucun reset de l’ancienne progression ;
- voix/free-voice hashes inchangés sauf build vocal dédié ;
- nouvelle capacité utilisable depuis le shell Build 22 ;
- Chrome Conversation + Practice ;
- PR → main → Pages.

---

# v1.17.0 — Build 24 — Real Life French II

Déplacements, gare, téléphone, rencontres avec les proches, repas, logement et premières conversations plus longues.

---

# v1.18.0 — Build 25 — Real Life French III

Problèmes quotidiens, émotions, explications, français oral courant vs forme écrite, humour simple et conversation moins guidée.

---

# V2.0.0 — Hardening

- parcours A0→A1 cohérent ;
- UX apprenante stabilisée ;
- adaptation vérifiable ;
- migrations versionnées ;
- sauvegarde/restore robustes ;
- offline/PWA ;
- iPhone réel ;
- nettoyage des scripts/workflows temporaires ;
- dette `app.js` évaluée dans un build dédié avec migration comparative ;
- documentation finale.

---

# Backlog

Vrai avatar Lucie, sons discrets, fiches imprimables, bilan exportable, admin local, mode 5 min, écoute/déplacement, stats hebdo, multi-appareil gratuit si solution sûre.

# Reporté

Backend/API payants, avatar vidéo, XP/classement, gamification agressive, score phonétique pseudo-scientifique, app native tant que la PWA suffit.

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.
