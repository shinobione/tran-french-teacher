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
- Real Life French I : **6 situations / 18 tours** ;
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

### Preuves Build 23

- PR #18 : SUCCESS ;
- merge `main` : `7f5dd657e5f46a2847c443ffb8f5d0154a89924a` ;
- CI `main` run #63 : SUCCESS ;
- GitHub Pages run #77 : SUCCESS ;
- profil leçon 8 : zéro perte ;
- 5 situations personnelles déjà accessibles, 1 verrouillée par `l8` ;
- Error / Listening / Adaptive non régressés ;
- branding + voix inchangés.

---

# v1.17.0 — Build 24 — Real Life French II — 🔜 PROCHAIN

## Intention

Prolonger les situations personnelles à mesure que Trân avance vers les leçons 9–20, sans changer son modèle mental de l’application.

Toujours :

```text
Aujourd’hui
Pratiquer
Parcours
```

Build 24 enrichira encore **Pratiquer → Parler français**.

## Axes

### Déplacements / gare

- acheter un billet ;
- demander un aller simple / aller-retour ;
- demander l’heure de départ ;
- comprendre quai / gare / billet quand déjà appris.

### Rendez-vous / déplacement simple

- dire où elle va ;
- confirmer une heure ;
- demander quand Jerry arrive ;
- mini-échange avant de se retrouver.

### Shopping / restaurant

- demander une taille / un prix selon acquis ;
- commander un repas ;
- demander l’addition ;
- exprimer une préférence.

### Santé / pharmacie

- expliquer un besoin très simple ;
- demander une pharmacie ;
- comprendre une réponse courte.

### Proches

- rencontrer un proche de Jerry ;
- dire qui elle est ;
- parler très simplement de famille / provenance / goûts.

### Téléphone / logement

À introduire seulement quand les prérequis Stage 2 correspondants sont réellement terminés. Pas de réponse obligatoire basée sur un élément non appris.

## Règles UX

- aucun nouveau menu ;
- le système de tri/condensation Build 23 reste la seule vue Scenario apprenante ;
- les scènes ouvertes pertinentes remontent avant les scènes verrouillées ;
- nouvelles scènes futures ne doivent pas saturer l’écran ;
- nom technique du pack invisible côté Trân.

## Tests obligatoires

- smoke leçon 8 Build 22 reste vert ;
- smoke Build 23 reste vert ;
- profil l15 : nouvelles scènes du pack II correctement déverrouillées ;
- profil l20 : scènes téléphone/logement si présentes ;
- aucune clé de progression ajoutée sans justification ;
- Scenario total et tours audités ;
- voice / free-voice / logo / favicon hashes inchangés ;
- Error / Listening / Adaptive non régressés ;
- PR → `main` → Pages.

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
