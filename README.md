# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Candidat en cours — v1.20.0 / Build 27

**App Shell Reset — 🟡 CANDIDAT PR #60 — NE PAS CONFONDRE AVEC LA PROD**

Build 27 change volontairement de niveau : après plusieurs builds passés à rendre le dashboard `Parcours` techniquement fiable, le retour terrain a confirmé que la façade restait trop proche d’un outil de diagnostic et pas assez d’une vraie application d’apprentissage.

La règle devient :

> **La complexité appartient aux moteurs. Trân voit seulement ce qu’elle doit faire maintenant.**

Le runtime pédagogique historique reste en place. Build 27 ajoute une façade mobile-first qui réutilise ses vrais états et ses vraies destinations sans migrer les données.

### Aujourd’hui

Une seule action principale : **continuer la prochaine leçon**.

Deux raccourcis seulement :

- Réviser ;
- Écouter.

Le moteur Daily / Memory continue de travailler dessous, mais son cockpit n’est plus affiché comme interface apprenante.

### Pratiquer

Le bouton central ouvre une vraie page d’application avec quatre intentions :

```text
🎙️ Parler
🎧 Écouter
↻ Réviser
♥ Dans la vraie vie
```

Une intention → un écran. Pas une grille de moteurs qui se déplie dans un dashboard.

### Progrès

L’écran apprenant montre uniquement :

- position A0 → A1 ;
- prochaine leçon ;
- étape actuelle ;
- cinq leçons utiles autour de la position ;
- accès à `Voir tout le parcours`.

Memory / Mastery / Listening / Scenario / Error Intelligence ne sont plus des catégories de navigation normales. En **DEBUG FR**, le cockpit historique reste disponible comme diagnostic développeur.

### Parcours complet

Vue dédiée avec cinq étapes :

1. Survie A0 — 1–7 ;
2. Vie quotidienne — 8–15 ;
3. Fondations A1 — 16–20 ;
4. Premiers échanges — 21–25 ;
5. A1 Core — 26–40.

Une seule étape expose ses leçons. Les 40 restent accessibles sans devenir un parchemin permanent.

## ✅ Validation candidat Build 27

Le premier candidat complet a passé **16/16 workflows fonctionnels** sur le head runtime `7c5978cea9d4c1e9bb4b3b0e8ce75a151df3ea2e` avant synchronisation des docs candidat.

Le nouveau tribunal Chrome vérifie réellement :

```text
Home
→ Pratiquer
→ retour
→ Progrès
→ Parcours complet
→ A1 Core
→ retour
→ vraie leçon
```

Sur desktop `1640×900` :

- Home = une seule carte leçon principale ;
- exactement deux raccourcis ;
- ancien dashboard Home invisible ;
- Home mesurée **672 px** de haut sur le viewport de 900 px ;
- Practice = 4 actions ;
- Progress = 5 lignes de leçons utiles ;
- Journey = 5 étapes ;
- A1 Core = 15 leçons ;
- aucun overflow horizontal.

Le même flux est testé en `390×844`.

Le nav-smoke fait en plus de vrais `pointerdown → pointerup → click` et exige : feedback tactile, tap echo, nœuds de tab bar persistants, **une seule tab active**, page Practice alignée exactement au-dessus de la tab bar, retour Home/Progress et arrivée dans une vraie leçon.

### Revue visuelle automatique

GitHub Actions capture cinq screenshots du vrai candidat : Home desktop, Practice desktop, Progress desktop, Journey desktop et Home mobile.

La dernière revue avant docs candidat confirme :

- Home desktop et mobile : composition app-like, sans cockpit ;
- Practice : quatre choix clairs ;
- Progress : progression + prochaine étape + parcours uniquement ;
- Journey : vue dédiée sans ghost de l’écran précédent ;
- overlays `Practice/Journey` totalement sortis du fade avant capture.

## 🛡️ Architecture : façade neuve, cerveaux conservés

Build 27 **ne réécrit pas `app.js`** et ne déplace pas les cartes pédagogiques historiques.

```text
moteurs / DOM historiques
        ↓
restent propriétaires des données
        ↓
build27-app-shell.js / .css
        ↓
façade apprenante mobile-first
```

Les anciens workflows 26.x continuent de tester leurs propres surfaces historiques : Build 27 se désactive automatiquement sur leurs URLs `...Smoke`. Le nouveau tribunal Build 27 teste séparément la nouvelle façade.

## Production actuelle tant que PR #60 n’est pas mergée

- **v1.19.9 — Build 26.9 / Progress Focus Content Reliability** ;
- runtime production : `0b31eedb78daebd58dd9bdcb0a472d56250c8fff` ;
- PR runtime : **#58** ;
- GitHub Pages runtime : **#114 SUCCESS** ;
- curriculum : **40 leçons / 241 éléments** ;
- Scenario : **36 situations / 108 tours** ;
- Listening : **0.88 normal / 0.65 lent** ;
- coût : **0 €**.

Build 27 ne devient PROD qu’après : PR exacte verte avec docs candidat → merge exact → mêmes checks sur `main` → GitHub Pages SUCCESS → clôture docs PROD.

## 🎙️ Réécouter sa propre voix — gate terrain toujours ouvert

Build 26.1 reste actif. Après une réponse reconnue, Trân peut faire une seconde prise locale volontaire pour s’écouter, sans upload ni persistance audio.

Gate réel iPhone restant :

```text
réponse reconnue
→ seconde prise locale
→ réécoute correcte
→ réponse vocale suivante toujours reconnue normalement
```

## 👩‍🏫 Tyffany et sanctuaires

**Tyffany** reste le nom visible de la professeure. Les identifiants techniques historiques (`LucieVoice`, `luc-*`, `lucie-*`) restent volontairement inchangés.

Sanctuaires :

- learner : `francais-avec-luc:learner:v1` ;
- Learning Memory / Scenario / Listening ;
- `voice-ios.js` ;
- `free-voice.js` ;
- `assets/LOGO.png` ;
- `assets/Favicon.png` ;
- curriculum **40 / 241** ;
- Scenario **36 / 108** ;
- Listening **0.88 / 0.65** ;
- Progress Dashboard Containment Build 26.6 ;
- Progress Open-Details Geometry Build 26.7 ;
- Progress Focus Flow Build 26.8 ;
- Progress Focus Content Reliability Build 26.9 ;
- aucune migration learner/Memory/Scenario/Listening dans Build 27.

### Baseline historique protégée

Le contrat **v1.17.0 — Build 24 — Real Life French II** reste explicitement conservé : avant Real Life III, Scenario comptait **28 situations / 84 tours**. Le fichier `real-life-data-2.js` reste un marqueur historique canonique.

## Suite après Build 27

1. **Gate terrain iPhone Build 26.1** — auto-écoute puis reconnaissance suivante.
2. **Build 28 — Data & Recovery Hardening**.
3. **Build 29 — iPhone / PWA / Accessibility Hardening**.
4. **Build 30 — Architecture Hardening**.
5. **V2.0.0 — Freeze / Release**.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md` et `docs/BUILD-27-APP-SHELL-RESET.md`.