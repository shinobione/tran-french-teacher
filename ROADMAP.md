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
14. Les trois entrées principales `Aujourd’hui / Pratiquer / Parcours` doivent se comporter comme des écrans de même niveau.

---

# Baseline production — v1.17.2 Build 24.2

- socle : **Build 24 — Real Life French II** ;
- **40 leçons / 241 éléments** ;
- Learning Memory ; Daily Coach ; Mastery ; Error ; Listening ; Adaptive Language ;
- Scenario : **28 situations / 84 tours** ;
- Real Life I + II : **16 situations / 48 tours** ;
- UX : **Aujourd’hui / Pratiquer / Parcours** ;
- navigation click hotfix 24.2 ;
- progression protégée ;
- voix iPhone et reconnaissance vocale baseline validée ;
- coût 0 €.

## Builds 16 → 24.2

- Build 16 — Mastery Engine — ✅ CLOS
- Build 17 — Scenario Lab — ✅ CLOS
- Build 18 — Error Intelligence — ✅ CLOS
- Build 19 — A1 Core — ✅ CLOS
- Build 20 — Listening — ✅ INTÉGRÉ
- Build 21 — Adaptive Language — ✅ INTÉGRÉ
- Build 22 — UX Foundation & Runtime Integrity — ✅ CLOS
- Build 23 — Real Life French I — ✅ CLOS
- Build 24 — Real Life French II — ✅ INTÉGRÉ
- Build 24.1 — Options Crash Hotfix — ✅ PROD
- Build 24.2 — Navigation Interaction Hotfix — ✅ PROD

---

# v1.17.3 — Build 24.3 — Premium Interaction UX — 🔥 EN COURS

## Intention

Faire ressentir French Trân’quille comme une **application mobile premium**, sans modifier la pédagogie ni les données.

## Interaction globale

- [x] `pointerdown` global sur les surfaces tappables ;
- [x] compression courte et réponse visuelle immédiate ;
- [x] glow/contraste court et confirmation de clic ;
- [x] état actif renforcé dans la bottom bar ;
- [x] transition courte d’entrée des écrans ;
- [x] `prefers-reduced-motion` ;
- [x] zones tactiles mobiles >= 48 px.

## Pratiquer = vrai troisième écran

- [x] suppression visuelle du backdrop modal ;
- [x] suppression de la croix ;
- [x] bottom bar conservée ;
- [x] onglet `Pratiquer` actif pendant l’écran ;
- [x] contenu plein écran sous la navigation ;
- [x] mêmes règles d’interaction que Aujourd’hui et Parcours.

## Sanctuaires

- [x] aucune clé de progression modifiée ;
- [x] logo/favicon inchangés ;
- [x] `voice-ios.js` inchangé ;
- [x] `free-voice.js` inchangé ;
- [x] aucun curriculum/scénario modifié.

## Contrat navigateur

- [x] viewport mobile 390×844 ;
- [x] `pointerdown` doit créer `.ux-pressing` ;
- [x] Pratiquer doit toucher géométriquement la bottom bar ;
- [x] aucune croix de modale visible ;
- [x] Pratiquer actif ;
- [x] navigation physique Pratiquer → Parcours → Aujourd’hui ;
- [ ] quality générale verte ;
- [ ] Options smoke vert ;
- [ ] PR verte ;
- [ ] `main` vert ;
- [ ] Pages verte ;
- [ ] docs release CLOS.

---

# v1.18.0 — Build 25 — Real Life French III — PROCHAIN

Problèmes quotidiens, émotions, explications, français oral courant vs forme écrite, humour simple et conversation moins guidée.

La priorité reste de rendre Lucie plus capable **sans rendre l’interface plus complexe**.

---

# v1.19.0 — Build 26 — Data & Recovery Hardening

- sauvegarde/restauration unifiée ;
- migrations sûres et versionnées ;
- snapshot automatique pré-migration ;
- tolérance au `localStorage` corrompu ;
- tests zéro-perte sur profils existants.

# v1.20.0 — Build 27 — iPhone / PWA / Accessibility Hardening

- safe areas ;
- tactile ;
- contraste ;
- tailles ;
- offline/install ;
- tests iPhone réels ;
- ergonomie faible aisance numérique.

# v1.21.0 — Build 28 — Architecture Hardening

Découpage du vieux noyau uniquement avec snapshots comparatifs avant/après.

# V2.0.0 — Freeze / Release

Pas une nouvelle feature : release cohérente, sauvegardable, testée, documentée et utilisable sans connaître l’architecture interne.

---

# Backlog

Vrai avatar Lucie, sons discrets, fiches imprimables, bilan exportable, admin local, mode 5 min, écoute/déplacement, stats hebdo, multi-appareil gratuit si solution sûre.

# Reporté

Backend/API payants, avatar vidéo, XP/classement, gamification agressive, score phonétique pseudo-scientifique, app native tant que la PWA suffit.

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.
