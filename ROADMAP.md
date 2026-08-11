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
15. Les trois entrées `Aujourd’hui / Pratiquer / Parcours` gardent des nœuds DOM persistants et **exactement un** état actif.
16. L’état actif de navigation doit être synchronisé explicitement ; il ne dépend pas uniquement d’un `MutationObserver`.

---

# Baseline production — v1.17.5 Build 24.5

- 40 leçons / 241 éléments ;
- Scenario 28 / 84 ;
- navigation Aujourd’hui / Pratiquer / Parcours ;
- feedback premium persistant ;
- Pratiquer = vrai écran ;
- header leçon allégé ;
- progression protégée ;
- voix/reconnaissance iPhone baseline validée ;
- coût 0 €.

## État Builds 24.x

- Build 24 — Real Life French II — ✅ INTÉGRÉ
- Build 24.1 — Options Crash — ✅ PROD
- Build 24.2 — Navigation Interaction — ✅ PROD
- Build 24.3 — Premium Interaction UX — ✅ CLOS
- Build 24.4 — Mobile Polish — ✅ INTÉGRÉ, clôturé techniquement par 24.5
- Build 24.5 — Navigation State Sync — ✅ PROD / CLOS

Validation 24.5 :

- PR #27 quality #83 / Options #14 / nav-mobile #33 : SUCCESS ;
- `main` quality #84 / Options #15 / nav-mobile #34 : SUCCESS ;
- Pages #86 : SUCCESS.

---

# v1.18.0 — Build 25 — Real Life French III — PROCHAIN

## Intention

Poursuivre la vraie vie en français sans ajouter de complexité d’interface : problèmes quotidiens, émotions, explications, français oral courant vs forme écrite et conversation moins guidée.

## Garde-fous

- aucun nouveau bouton principal ;
- même façade `Pratiquer → Parler français` ;
- Memory / Error / Adaptive réutilisés ;
- aucune régression mobile premium ;
- progression existante protégée ;
- voix/reconnaissance sanctuarisées.

---

# v1.19.0 — Build 26 — Data & Recovery Hardening

Sauvegarde/restauration unifiée, migrations sûres/versionnées, snapshot pré-migration, tolérance au localStorage corrompu et tests zéro-perte.

# v1.20.0 — Build 27 — iPhone / PWA / Accessibility Hardening

Safe areas, tactile, contraste, tailles, offline/install, tests iPhone réels et ergonomie faible aisance numérique.

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
