# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version production

- **v1.20.0**
- **Build 27 — App Shell Reset**
- statut : **✅ PROD / réécoute iPhone à valider terrain**
- commit runtime production : `beeb9ce8ba081ed0298edbcc339dca41600e4d09`
- PR runtime : **#60**
- head PR certifié : `dba27d35b59b78bb63b1bf930c5f47b119feff36`
- tribunal PR : **16/16 workflows fonctionnels SUCCESS**
- tribunal `main` : **16/16 fonctionnels SUCCESS + Pages SUCCESS** ; le seul premier rouge historique Build 26.8 a repassé le même job inchangé
- GitHub Pages runtime : **#116 SUCCESS**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **36 situations / 108 tours**
- Listening : **0.88 normal / 0.65 lent**
- coût : **0 €**

## 🧭 Build 27 — une vraie façade d’app

Le retour terrain après Builds 26.6 → 26.9 a montré que `Parcours` était devenu techniquement fiable mais restait trop proche d’un dashboard de moteurs pédagogiques.

Build 27 arrête donc de polir le cockpit et sépare enfin clairement :

```text
moteurs pédagogiques historiques
        ↓
restent propriétaires des données
        ↓
Build 27 App Shell
        ↓
interface simple pour Trân
```

Principe canonique :

> **La complexité appartient aux moteurs. Trân voit seulement ce qu’elle doit faire maintenant.**

### Aujourd’hui

La Home affiche uniquement :

- prochaine leçon ;
- un CTA principal `Continuer` ;
- deux raccourcis : `Réviser` / `Écouter` ;
- un rappel discret de durée.

L’ancien dashboard Home continue d’exister sous le capot pour les moteurs mais n’est plus une interface apprenante.

### Pratiquer

Le bouton central ouvre une vraie page dédiée avec quatre intentions :

```text
🎙️ Parler
🎧 Écouter
↻ Réviser
♥ Dans la vraie vie
```

Une intention = un écran. `Dans la vraie vie` réutilise le vrai Scenario Engine et privilégie les situations personnelles Jerry déjà débloquées.

### Progrès

L’écran normal montre seulement :

- position A0 → A1 ;
- prochaine leçon ;
- étape actuelle ;
- cinq leçons utiles autour de la position ;
- `Voir tout le parcours`.

Memory / Mastery / Listening / Scenario / Error Intelligence restent des moteurs, **pas des catégories que Trân doit piloter**. Le cockpit historique reste accessible en DEBUG FR uniquement.

### Parcours complet

Vue dédiée avec cinq étapes :

1. Survie A0 — 1–7 ;
2. Vie quotidienne — 8–15 ;
3. Fondations A1 — 16–20 ;
4. Premiers échanges — 21–25 ;
5. A1 Core — 26–40.

Une seule étape expose ses leçons. A1 Core = **15 leçons**, jamais 40 lignes simultanément.

## ✅ Preuves navigateur Build 27

Chrome exécute réellement :

```text
Home
→ Pratiquer
→ retour
→ Progrès
→ Parcours complet
→ A1 Core
→ retour
→ vraie Leçon
```

Contrats :

- desktop `1640×900` et mobile `390×844` ;
- Home : **1** carte leçon principale + **2** raccourcis ;
- Home desktop : **672 px** de hauteur sur viewport 900 px ;
- Practice : **4** actions ;
- Progress : **5** leçons utiles ;
- Journey : **5** étapes ;
- A1 Core : **15** leçons ;
- arrivée réelle dans une leçon ;
- zéro overflow horizontal.

Le nav-smoke fait aussi de vrais `pointerdown → pointerup → click` et exige : feedback tactile, tap echo, nœuds de tab bar persistants, **une seule tab active**, page Practice sans chevauchement de la tab bar et destinations réelles.

Le CI capture également Home desktop, Practice desktop, Progress desktop, Journey desktop et Home mobile. La revue visuelle de la release confirme une composition app-like et un Journey sans ghost de l’écran précédent.

## 🛡️ Cerveaux et données conservés

Build 27 ne réécrit pas `app.js`, ne reparent pas Memory/Mastery/Listening/Scenario et ne crée aucune migration learner.

Les anciens workflows 26.x gardent leurs vraies surfaces historiques : Build 27 se désactive automatiquement sur leurs URLs `...Smoke`.

Sanctuaires :

- learner : `francais-avec-luc:learner:v1` ;
- Learning Memory / Scenario / Listening ;
- `voice-ios.js` ;
- `free-voice.js` ;
- `assets/LOGO.png` ;
- `assets/Favicon.png` ;
- containment Build 26.6 ;
- geometry Build 26.7 ;
- Focus Flow Build 26.8 ;
- Content Reliability Build 26.9.

### Baseline historique protégée

Le contrat **v1.17.0 — Build 24 — Real Life French II** reste explicitement conservé : Scenario comptait alors **28 situations / 84 tours** avant Pack III. `real-life-data-2.js` reste un marqueur historique canonique.

## 🎙️ Gate terrain toujours ouvert

Build 26.1 reste actif :

```text
réponse reconnue
→ seconde prise locale
→ réécoute correcte
→ réponse vocale suivante toujours reconnue normalement
```

La coexistence doit encore être confirmée sur le vrai iPhone avant d’enregistrer automatiquement le premier essai exact.

## Suite

1. **Gate terrain iPhone Build 26.1**.
2. **Build 28 — Data & Recovery Hardening**.
3. **Build 29 — iPhone / PWA / Accessibility Hardening**.
4. **Build 30 — Architecture Hardening**.
5. **V2.0.0 — Freeze / Release**.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md` et `docs/BUILD-27-APP-SHELL-RESET.md`.