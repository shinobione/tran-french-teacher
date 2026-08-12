# French Trân’quille — ROADMAP

> `README.md` = état courant. `CHANGELOG.md` = historique livré. Ici : **ordre, dépendances et critères de clôture**.

## Principes non négociables

1. iPhone / Safari / PWA iOS = cible principale ; PC et Android restent supportés.
2. Interface utilisable sans connaissances techniques.
3. 0 € d’exploitation récurrente sauf décision explicite.
4. Vietnamien comme soutien, français augmenté selon les preuves.
5. Oral prioritaire, sans faux diagnostic phonétique.
6. Communication réelle > théorie scolaire.
7. Aucun reset silencieux ; toute migration garde un smoke ancien utilisateur.
8. Branche → candidat → PR → CI → Chrome réel → merge → CI `main` → Pages → docs CLOS.
9. Un nouveau moteur n’obtient pas automatiquement une nouvelle entrée de navigation.
10. Une page = une intention principale ; desktop agrandit une app, pas un dashboard SaaS.
11. Toute donnée durable invalide est protégée par Recovery avant initialisation d’un état neuf.
12. Restore multi-store = validation + snapshot + écriture + vérification + rollback.
13. iPhone : safe areas, zoom utilisateur, cibles tactiles et accessibilité sont des contrats produit.
14. Un Service Worker présent dans le repo ne compte pas comme PWA : il doit être **enregistré, actif et prouvé offline**.
15. Les vieux harnesses CI ne doivent pas modifier le cycle de vie PWA qu’ils testent indirectement.
16. La voix, la reconnaissance et les données réelles ne sont modifiées que sur preuve terrain ou bug démontré.

---

# Baseline production — v1.22.0 / Build 29

## iPhone / PWA / Accessibility Hardening — ✅ PROD / CLOS

- runtime final : `ff788fd86e1754b15e8003b2f63c9673708480d0` ;
- PR runtime : **#64** ;
- head #64 certifié : `27c67ee7b47b9f9a015e6c0072640e0e573de52d` ;
- hotfix smoke/SW isolation : **PR #65** ;
- head #65 certifié : `3e11e6124654b88e6932f292ed7acb1df31b0039` ;
- `main` final : **19/19 workflows SUCCESS** ;
- GitHub Pages : **#121 SUCCESS** sur `ff788fd…` ;
- curriculum **40 / 241** ;
- Scenario **36 / 108** ;
- Listening **0.88 / 0.65** ;
- coût **0 €**.

### PWA réelle

- [x] `sw.js` explicitement enregistré depuis la vraie app top-level ;
- [x] `skipWaiting()` attendu pendant install ;
- [x] purge caches + `clients.claim()` attendus pendant activate ;
- [x] cache Build 29 dédié ;
- [x] anciens `*Smoke` et iframes isolés du Worker ;
- [x] `b29Audit` utilise le Worker réel ;
- [x] manifest `id/start_url/scope = ./` ;
- [x] `display=standalone` ;
- [x] Apple Touch Icon dédiée câblée ;
- [x] **serveur HTTP arrêté physiquement → Home complète depuis Worker/cache**.

### iPhone / accessibilité

- [x] safe areas quatre côtés ;
- [x] `viewport-fit=cover` ;
- [x] `visualViewport` / clavier virtuel ;
- [x] champs ≥16 px ;
- [x] targets tactiles visibles ≥44×44 ;
- [x] focus clavier visible ;
- [x] `aria-current="page"` ;
- [x] progressbars sémantiques ;
- [x] feedbacks `aria-live` ;
- [x] reduced motion ;
- [x] increased contrast ;
- [x] zoom utilisateur conservé ;
- [x] zéro overflow horizontal dans la matrice certifiée.

### Matrice Chrome réelle

- [x] 390×844 ;
- [x] 320×568 ;
- [x] 430×932 ;
- [x] reduced-motion forcé ;
- [x] cibles trop petites = 0 ;
- [x] boutons sans nom accessible = 0 ;
- [x] onglet courant visible = 1 ;
- [x] overflow horizontal = 0 ;
- [x] offline serveur mort.

### Baselines conservées

- [x] Build 28 Recovery six stores ;
- [x] Build 27 learner shell ;
- [x] learner historique 7 leçons + `l8=4` ;
- [x] `voice-ios.js` byte-identique ;
- [x] `free-voice.js` byte-identique ;
- [x] logo byte-identique ;
- [x] favicon byte-identique.

---

# Gate terrain iPhone — toujours ouvert

Chrome ne remplace pas Safari/WebKit et VoiceOver.

À vérifier sur le vrai iPhone :

- [ ] safe area / Dynamic Island / Home Indicator réels ;
- [ ] clavier iOS réel ;
- [ ] installation sur écran d’accueil + reprise standalone ;
- [ ] VoiceOver sur Aujourd’hui / Pratiquer / Progrès ;
- [ ] **Build 26.1** : réponse reconnue → seconde prise locale → réécoute → réponse vocale suivante reconnue normalement.

Aucune modification des sanctuaires vocaux sans preuve terrain.

---

# v1.23.0 — Build 30 — Architecture Hardening

**Prochain gros chantier.**

Objectif : réduire la dette du runtime historique **sans réécriture fonctionnelle**.

Priorités :

- réduire progressivement le monolithe `app.js` ;
- clarifier propriétaires DOM / state / routing ;
- documenter dépendances entre moteurs ;
- isoler les adaptateurs historiques ;
- conserver Build 27 comme façade ;
- conserver Build 28 comme contrat données ;
- conserver Build 29 comme contrat PWA/device ;
- snapshots comparatifs avant/après ;
- aucun renommage gratuit des clés `localStorage` ;
- aucun changement voix/branding dans ce chantier.

Critères avant clôture :

- [ ] aucun comportement apprenant modifié volontairement ;
- [ ] six stores Build 28 inchangés ;
- [ ] offline Build 29 toujours vert ;
- [ ] Build27 Home/flow/mobile verts ;
- [ ] ancien profil récupérable ;
- [ ] architecture mise à jour avec propriétaires explicites ;
- [ ] tribunal complet PR + `main` + Pages.

---

# V2.0.0 — Freeze / Release

V2 n’a pas besoin d’un nouveau moteur. Le jalon est :

> **une application cohérente, sauvegardable, restaurable, installable, utilisable offline, accessible, testée, documentée et compréhensible sans connaître son architecture.**

Avant freeze :

- [ ] gates iPhone matériels traités ou documentés ;
- [ ] Build 30 clos ;
- [ ] zéro dette de migration critique ;
- [ ] smoke ancien utilisateur ;
- [ ] PWA offline ;
- [ ] docs release ;
- [ ] tag/release V2.

---

# Sanctuaires

```text
francais-avec-luc:learner:v1
french-tranquille:learning-memory:v1
french-tranquille:error-intelligence:v1
french-tranquille:scenarios:v1
french-tranquille:listening:v1
french-tranquille:milestones:v1
french-tranquille:recovery:last-good:v1
french-tranquille:recovery:pre-restore:v1
french-tranquille:recovery:pre-migration:v1
french-tranquille:recovery:pre-reset:v1
french-tranquille:recovery:quarantine:v1
french-tranquille:safety:pre-build22:v1
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
App Shell Build 27
Data & Recovery Build 28
PWA / Accessibility Build 29
```

Compatibilité interne conservée malgré le branding Tyffany : `LucieVoice`, `luc-*`, `lucie-*`.

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.
