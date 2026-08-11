# French Trân’quille — ARCHITECTURE

## Vue générale

```text
iPhone / Safari / PWA
        ↓
UX Shell simple
        ↓
Progression UX + Session UX
        ↓
moteurs pédagogiques locaux
        ↓
localStorage + Web APIs navigateur
```

PWA statique GitHub Pages, sans backend obligatoire ni API payante.

## Principe produit

La complexité appartient aux moteurs ; Trân voit d’abord l’information utile pour décider quoi faire.

---

# Runtime production — v1.18.2 Build 25.2

```text
progress-safety.js
app.js
curriculum-stage2.js
curriculum-stage3.js
stage2-boot.js
debug-fr.js
voice-ios.js
free-voice.js
learning-memory.js
error-intelligence.js
language-ratio-core.js
language-ratio.js
daily-coach.js
mastery-engine.js
mastery-stage3.js
scenario-data.js
real-life-data.js
real-life-data-2.js
scenario-host.js
scenario-engine.js
real-life-ux.js
listening-data.js
listening-engine.js
ux-shell.js
interaction-ux.js
progression-ux.js
session-ux.js
session-ux-adapter.js
build-meta.js
```

CSS Session UX : `session-ux.css`.

---

# Progression UX — Build 25 — CANONIQUE

`progression-ux.js` orchestre `Parcours` sans persister de données : résumé apprenant, détails repliables, 5 lignes curriculum visibles par défaut, 40 accessibles à la demande.

---

# Listening — Build 25.1 — CANONIQUE

Calibration :

```text
normal request 0.88 → effectif 0.88
slow request   0.68 → effectif 0.64
```

Le bridge vit dans `build-meta.js`. `voice-ios.js`, voix et pitch sont inchangés.

---

# Session UX — Build 25.2 — CANONIQUE

## Pourquoi une façade

Les moteurs savent déjà enregistrer leurs propres données et certains possèdent une fin native. Les réécrire pour ajouter un simple contrat de session augmenterait inutilement le risque.

```text
moteur existant
   ↓ produit/stocke normalement
session-ux.js
   ↓ observe progression et orchestre l’affichage
objectif / progression / fin / sortie
```

`session-ux-adapter.js` couvre uniquement les vieilles zones qui n’exposent pas d’API de session propre.

## Listening

Session standard : **5 tentatives**. À 5/5, les données sont déjà persistées par Listening ; Session UX masque l’exercice et affiche l’état de fin. Continuer volontairement démarre un nouveau petit lot.

## Révision mémoire

Cible : `min(5, due || entries)`, minimum 1. Learning Memory persiste d’abord ; Session UX calcule ensuite le delta de reviews et affiche la réussite à la cible.

## Scenario

Scenario garde validation, tours, stats et fin native. Session UX ajoute objectif `1 situation`, progression à partir du tour natif, succès visuel et retour principal vers Aujourd’hui.

## Vocal guidé

`free-voice.js` reste sanctuarisé. Session UX observe les succès et borne la mini-session à **5 réponses reconnues**.

## Pratique guidée historique

`session-ux-adapter.js` utilise le delta de `conversationWins`. Une mini-session = **1 réponse correcte**.

## Leçon

La réussite visuelle intervient après l’écriture historique de la leçon et le retour Home, jamais avant sauvegarde.

---

# Practice Hub

Dans `screen-conversation`, les moteurs existants restent disponibles mais ne sont plus empilés comme quatre tâches concurrentes.

Vue initiale :

```text
Recommandé maintenant
Situation réelle

Autres façons
Vocal guidé
Pratique guidée
```

Une seule capacité devient dominante après sélection.

---

# Daily Coach compact

Session UX garde **2 actions principales** et range les extras sous `details.session-daily-more`.

---

# Milestones

Clé indépendante :

```text
french-tranquille:milestones:v1
```

Elle ne modifie aucun score/moteur pédagogique. Les achievements déjà vrais au premier démarrage deviennent `baseline` ; seuls les nouveaux franchissements déclenchent une micro-carte.

---

# Animations

`session-ux.css` utilise des transitions courtes de réussite. `@media(prefers-reduced-motion:reduce)` les supprime/simplifie.

Pas de son forcé, XP, monnaie ou classement.

---

# État et sécurité

Clés pédagogiques existantes inchangées :

```text
francais-avec-luc:learner:v1
french-tranquille:scenarios:v1
french-tranquille:listening:v1
french-tranquille:learning-memory:v1
french-tranquille:safety:pre-build22:v1
```

Curriculum : **40 leçons / 241 éléments**. Scenario : **28 / 84** avant Build 26.

---

# Build 26 — extension prévue

`Real Life French III` doit s’insérer entre `real-life-data-2.js` et le Scenario runtime, sans modifier les propriétaires de données :

```text
scenario-data.js
real-life-data.js
real-life-data-2.js
real-life-data-3.js   ← Build 26
scenario-host.js
scenario-engine.js
real-life-ux.js
real-life-coach.js    ← aide UX Pack III uniquement
session-ux.js         ← conserve objectif 1 situation
```

Les références vers les acquis avancés doivent être résolues contre le curriculum réellement chargé, avec unicité obligatoire.

---

# Voice / branding — sanctuaires

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

---

# CI production Build 25.2

Commit `49d866bed59bb0cb3268e1675225a4811f6c595f` : 7 workflows déclenchés, aucun échec, Pages SUCCESS.

Contrats conservés pour Build 26 : quality, Options, nav/mobile, Progression UX, Listening-rate, Session UX, hashes branding/voice, profil ancien utilisateur et absence de fatal card.

# Dette technique

`app.js` reste monolithique par choix de sécurité. Son extraction est réservée à Architecture Hardening.