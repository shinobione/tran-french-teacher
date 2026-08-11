# French Trân’quille — ROADMAP

> `README.md` = état courant. `CHANGELOG.md` = historique livré. Ici : **ordre, dépendances et critères de clôture**.

## Principes non négociables

1. iPhone / Safari / PWA iOS = cible principale.
2. Interface utilisable sans connaissances techniques.
3. 0 € d’exploitation récurrente sauf décision explicite.
4. Vietnamien comme soutien ; français augmenté selon les preuves.
5. Oral prioritaire, sans faux diagnostic phonétique.
6. Communication réelle > théorie scolaire.
7. Aucun reset silencieux ; toute migration garde un smoke ancien utilisateur.
8. Un gros build = une intention principale.
9. Chrome headless obligatoire avant merge important.
10. README / CHANGELOG / ROADMAP / ARCHITECTURE synchronisés.
11. Pas de gamification agressive ni clone de chatbot.
12. Un nouveau moteur n’obtient pas automatiquement une nouvelle entrée de navigation.

---

# Baseline production — v1.15.0 Build 22

- **40 leçons / 241 éléments** ;
- Learning Memory ; Daily Coach ; Mastery ; Scenario ; Error ; Listening ; Adaptive Language ;
- UX : **Aujourd’hui / Pratiquer / Parcours** ;
- DEBUG FR local ;
- progression protégée ;
- voix iPhone et reconnaissance vocale baseline validée ;
- coût 0 €.

## Builds 16 → 22

- Build 16 — Mastery Engine — ✅ CLOS
- Build 17 — Scenario Lab — ✅ CLOS
- Build 18 — Error Intelligence — ✅ CLOS
- Build 19 — A1 Core — ✅ CLOS
- Build 20 — Listening — ✅ INTÉGRÉ
- Build 21 — Adaptive Language — ✅ INTÉGRÉ
- Build 22 — UX Foundation & Runtime Integrity — ✅ CLOS

---

# v1.16.0 — Build 23 — Real Life French I — 🔥 EN COURS

## Intention

Faire de **Pratiquer → Parler français** un entraînement qui ressemble à la vraie vie de Trân, sans ajouter un nouvel écran principal.

## Pack I — codé

6 situations / 18 tours :

1. Jerry parle trop vite — requis `l2` ;
2. Jerry présente Trân à quelqu’un — `l3` ;
3. prendre un café avec Jerry — `l4` ;
4. parler de ses goûts — `l5` ;
5. faire un petit achat — `l7` ;
6. trouver un lieu avec Jerry — `l8`.

## UX Scenario — codée

- [x] situations personnelles disponibles remontées en premier ;
- [x] badge `Ta vraie vie` ;
- [x] titre apprenant `Parler en situation` au lieu de `Scenario Lab` ;
- [x] seulement 2 futures situations verrouillées visibles par défaut ;
- [x] bouton pour dévoiler le reste ;
- [x] aucun nouveau bouton dans le menu Build 22.

## Pédagogie

- [x] réponses obligatoires limitées aux acquis des leçons requises ;
- [x] premier raté → indice historique ;
- [x] blocage → modèle historique ;
- [x] Memory `scenario-success / miss / assisted` conservée ;
- [x] clavier + reconnaissance existants conservés ;
- [x] aucune modification du moteur vocal ;
- [x] même clé Scenario existante.

## Protection

- [x] ancienne progression inchangée ;
- [x] logo/favicon inchangés ;
- [x] voice/free-voice inchangés ;
- [ ] smoke leçon 8 zéro-perte sur head final ;
- [ ] smoke Real Life : 6 scénarios présents ;
- [ ] profil leçon 8 : 5 scénarios du pack déjà ouverts, le sixième (`l8`) encore verrouillé ;
- [ ] vue Conversation : scénarios personnels en premier et futurs condensés ;
- [ ] Scenario total = 18 situations / 54 tours ;
- [ ] non-régression Error / Listening / Adaptive ;
- [ ] PR verte ;
- [ ] `main` vert ;
- [ ] Pages verte ;
- [ ] docs release / CLOS.

---

# v1.17.0 — Build 24 — Real Life French II — PROCHAIN

Déplacements, gare, téléphone, rencontres avec les proches, repas, logement et premières conversations plus longues. Les nouveaux scénarios devront continuer à se débloquer par acquis et rester derrière **Pratiquer**.

---

# v1.18.0 — Build 25 — Real Life French III

Problèmes quotidiens, émotions, explications, français oral courant vs forme écrite, humour simple et conversation moins guidée.

---

# V2.0.0 — Hardening

- UX apprenante stabilisée ;
- migrations versionnées ;
- sauvegarde/restore robuste ;
- offline/PWA ;
- iPhone réel ;
- dette `app.js` traitée dans un build dédié avec comparaison d’état ;
- nettoyage des scripts/workflows temporaires ;
- documentation finale.

---

# Backlog

Vrai avatar Lucie, sons discrets, fiches imprimables, bilan exportable, admin local, mode 5 min, écoute/déplacement, stats hebdo, multi-appareil gratuit si solution sûre.

# Reporté

Backend/API payants, avatar vidéo, XP/classement, gamification agressive, score phonétique pseudo-scientifique, app native tant que la PWA suffit.

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.
