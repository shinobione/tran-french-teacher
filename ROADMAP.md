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
13. **Toute surface tappable doit produire un retour visuel immédiat sur mobile.**
14. Le feedback d’un tap doit rester perceptible même si l’action déclenche un rerender ou un changement d’écran.
15. Les trois entrées `Aujourd’hui / Pratiquer / Parcours` gardent des nœuds DOM persistants et un seul état actif.

---

# Baseline production — v1.17.3 Build 24.3

- socle : Build 24 — Real Life French II ;
- 40 leçons / 241 éléments ;
- Scenario : 28 situations / 84 tours ;
- UX : Aujourd’hui / Pratiquer / Parcours ;
- progression protégée ;
- voix iPhone et reconnaissance vocale baseline validée ;
- coût 0 €.

## Builds 16 → 24.3

- Build 16 — Mastery Engine — ✅ CLOS
- Build 17 — Scenario Lab — ✅ CLOS
- Build 18 — Error Intelligence — ✅ CLOS
- Build 19 — A1 Core — ✅ CLOS
- Build 20 — Listening — ✅ INTÉGRÉ
- Build 21 — Adaptive Language — ✅ INTÉGRÉ
- Build 22 — UX Foundation & Runtime Integrity — ✅ CLOS
- Build 23 — Real Life French I — ✅ CLOS
- Build 24 — Real Life French II — ✅ INTÉGRÉ
- Build 24.1 — Options Crash — ✅ PROD
- Build 24.2 — Navigation Interaction — ✅ PROD
- Build 24.3 — Premium Interaction UX — ✅ CLOS

---

# v1.17.4 — Build 24.4 — Mobile Polish / Interaction Timing — 🔥 EN COURS

## Intention

Corriger le défaut observé sur vrai mobile : le feedback d’un nouvel onglet était détruit par le rerender de la bottom bar avant d’être perceptible, alors qu’un retap sur l’onglet déjà actif fonctionnait.

## Navigation persistante

- [x] suppression du `innerHTML` de reconstruction lors du changement actif ;
- [x] nœuds Home / Pratiquer / Parcours persistants ;
- [x] mise à jour in-place de `active / aria-current` ;
- [x] exactement un onglet actif ;
- [x] suppression du flash intermédiaire Home en quittant Pratiquer.

## Retour premium durable

- [x] `pointerdown` conservé ;
- [x] ajout d’un `tap echo` indépendant du nœud ;
- [x] le feedback peut survivre à un rerender ;
- [x] `prefers-reduced-motion` respecté.

## Header de leçon

- [x] suppression du gros fond violet ;
- [x] suppression du sticky ;
- [x] titre intégré au fond ;
- [x] retour compact ;
- [x] séparation gradient fine.

## Sanctuaires

- [x] aucune clé de progression modifiée ;
- [x] logo/favicon inchangés ;
- [x] voice-ios/free-voice inchangés ;
- [x] aucun curriculum/scénario modifié.

## Contrat navigateur

- [x] viewport mobile 390×844 ;
- [x] feedback + tap echo sur les 3 onglets ;
- [x] identité DOM inchangée après vraie navigation ;
- [x] active unique ;
- [x] header de leçon non sticky / transparent ;
- [ ] quality générale ;
- [ ] Options smoke ;
- [ ] PR verte ;
- [ ] main vert ;
- [ ] Pages verte ;
- [ ] docs release CLOS.

---

# v1.18.0 — Build 25 — Real Life French III — PROCHAIN

Problèmes quotidiens, émotions, explications, français oral courant vs forme écrite et conversation moins guidée, **sans rendre l’interface plus complexe**.

---

# v1.19.0 — Build 26 — Data & Recovery Hardening

- sauvegarde/restauration unifiée ;
- migrations sûres et versionnées ;
- snapshot automatique pré-migration ;
- tolérance au localStorage corrompu ;
- tests zéro-perte sur profils existants.

# v1.20.0 — Build 27 — iPhone / PWA / Accessibility Hardening

- safe areas ; tactile ; contraste ; tailles ; offline/install ; tests iPhone réels ; ergonomie faible aisance numérique.

# v1.21.0 — Build 28 — Architecture Hardening

Découpage du vieux noyau uniquement avec snapshots comparatifs avant/après.

# V2.0.0 — Freeze / Release

Release cohérente, sauvegardable, testée, documentée et utilisable sans connaître l’architecture interne.

---

# Backlog

Vrai avatar Lucie, sons discrets, fiches imprimables, bilan exportable, admin local, mode 5 min, écoute/déplacement, stats hebdo, multi-appareil gratuit si solution sûre.

# Reporté

Backend/API payants, avatar vidéo, XP/classement, gamification agressive, score phonétique pseudo-scientifique, app native tant que la PWA suffit.

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.
