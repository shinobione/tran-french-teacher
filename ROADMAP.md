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

# Baseline production — v1.16.0 Build 23

- **40 leçons / 241 éléments** ;
- Learning Memory ; Daily Coach ; Mastery ; Error ; Listening ; Adaptive Language ;
- Scenario : **18 situations / 54 tours** ;
- Real Life I : **6 situations / 18 tours** ;
- UX : **Aujourd’hui / Pratiquer / Parcours** ;
- progression protégée ;
- voix iPhone et reconnaissance vocale baseline validée ;
- coût 0 €.

## Builds 16 → 23

- Build 16 — Mastery Engine — ✅ CLOS
- Build 17 — Scenario Lab — ✅ CLOS
- Build 18 — Error Intelligence — ✅ CLOS
- Build 19 — A1 Core — ✅ CLOS
- Build 20 — Listening — ✅ INTÉGRÉ
- Build 21 — Adaptive Language — ✅ INTÉGRÉ
- Build 22 — UX Foundation & Runtime Integrity — ✅ CLOS
- Build 23 — Real Life French I — ✅ CLOS

---

# v1.17.0 — Build 24 — Real Life French II — 🔥 EN COURS

## Intention

Prolonger **Pratiquer → Parler français** vers les acquis des leçons 9–20, en créant des séquences personnelles qui relient plusieurs compétences au lieu de dupliquer les scénarios génériques existants.

## Pack II — codé

10 situations / 30 tours :

1. `jerry-rdv-train` — l9+l10 ;
2. `jerry-shopping-budget` — l11 ;
3. `jerry-diner-choix` — l5+l12 ;
4. `jerry-mal-dehors` — l8+l13 ;
5. `jerry-presente-fiance` — l14 ;
6. `jerry-prete-rentrer` — l16+l18 ;
7. `jerry-reservation-aide` — l17 ;
8. `jerry-cle-appartement` — l18+l19 ;
9. `jerry-probleme-eau` — l17+l19 ;
10. `jerry-reseau-message` — l20.

Total candidat :

```text
Scenario = 28 situations / 84 tours
Real Life I + II = 16 situations / 48 tours
```

## UX catalogue — codée

- [x] aucun nouveau menu ;
- [x] scènes personnelles ouvertes prioritaires ;
- [x] tri vers les prérequis les plus récents ;
- [x] **6 situations ouvertes max visibles** par défaut ;
- [x] bouton pour voir les autres situations ouvertes ;
- [x] 2 futures scènes verrouillées max visibles ;
- [x] badge `Ta vraie vie` conservé.

## Profils de contrôle

### l8

- [ ] smoke Build 23 reste vert ;
- [ ] progression l8 zéro-perte.

### l15

- [ ] pack II : **5** scènes ouvertes ;
- [ ] catalogue visible limité à 6 ;
- [ ] scènes ouvertes supplémentaires cachées mais accessibles.

### l20

- [ ] pack II : **10** scènes ouvertes ;
- [ ] catalogue visible toujours limité à 6 ;
- [ ] téléphone/logement accessibles.

## Protection

- [x] aucune nouvelle clé apprenant ;
- [x] même clé Scenario ;
- [x] logo/favicon non modifiés ;
- [x] voice/free-voice non modifiés ;
- [ ] hashes vérifiés par CI ;
- [ ] Error / Listening / Adaptive non régressés.

## Clôture

- [x] data pack II ;
- [x] UX catalogue scalable ;
- [x] runtime/cache Build 24 ;
- [ ] README / CHANGELOG / ARCHITECTURE / dossier Build 24 ;
- [ ] CI Build 24 ;
- [ ] PR verte ;
- [ ] main vert ;
- [ ] Pages verte ;
- [ ] docs release CLOS.

---

# v1.18.0 — Build 25 — Real Life French III — PROCHAIN

Problèmes quotidiens, émotions, explications, français oral courant vs forme écrite, humour simple et conversation moins guidée.

La priorité sera de passer de réponses isolées vers des mini-conversations plus libres **sans rendre l’interface plus complexe**.

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
