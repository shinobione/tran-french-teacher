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

# Runtime candidat — v1.18.2 Build 25.2

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

# Progression UX — Build 25

`progression-ux.js` orchestre `Parcours` sans persister de données : résumé apprenant, détails repliables, 5 lignes curriculum visibles par défaut, 40 accessibles à la demande.

---

# Listening — Build 25.1

Calibration canonique :

```text
normal request 0.88 → effectif 0.88
slow request   0.68 → effectif 0.64
```

Le bridge vit dans `build-meta.js`. `voice-ios.js`, voix et pitch sont inchangés.

---

# Session UX — Build 25.2

## Pourquoi une façade

Les moteurs savent déjà enregistrer leurs propres données et certains possèdent une fin native. Les réécrire pour ajouter un simple contrat de session augmenterait inutilement le risque.

Build 25.2 utilise donc :

```text
moteur existant
   ↓ produit/stocke normalement
session-ux.js
   ↓ observe progression et orchestre l’affichage
objectif / progression / fin / sortie
```

`session-ux-adapter.js` couvre uniquement les vieilles zones qui n’exposent pas d’API de session propre.

## Listening

À l’ouverture de `.listening-overlay`, Session UX mémorise les compteurs courants comme baseline.

Session standard : **5 tentatives**.

```text
attempts session = totals.attempts - baselineAttempts
correct session  = totals.correct  - baselineCorrect
```

À 5/5, les données sont déjà persistées par Listening ; Session UX masque l’exercice et affiche l’état de fin. Continuer volontairement démarre un nouveau petit lot de 3 à partir des nouveaux compteurs.

## Révision mémoire

Session UX lit les totaux persistés de `french-tranquille:learning-memory:v1`.

Cible : `min(5, due || entries)`, minimum 1.

Après chaque rating, Learning Memory persiste d’abord ; Session UX calcule ensuite le delta de reviews. À la cible, la flashcard est remplacée par l’état de réussite.

## Scenario

Scenario garde son moteur natif : validation, tours, stats et `scenario-done`.

Session UX ajoute :

- objectif `1 situation` ;
- progression à partir du compteur de tour natif ;
- succès visuel sur `scenario-done` ;
- action principale `Retour à Aujourd’hui` ;
- replay masqué de la hiérarchie principale.

## Vocal guidé

`free-voice.js` reste sanctuarisé.

Session UX observe les clics réussis sur `#free-voice-next`; cible : **5 réponses reconnues**. La carte est remplacée par un état de fin au cinquième succès.

## Pratique guidée historique

`session-ux-adapter.js` utilise le delta de `conversationWins`. Une mini-session = **1 réponse correcte**. L’ancien moteur reste intact.

## Leçon

Leçon conserve ses étapes et son écriture historique.

Session UX :

1. indique explicitement `Dernière étape` lorsque le bouton devient `Terminer` ;
2. capture l’intention de terminer ;
3. laisse `app.js` enregistrer la leçon et revenir à Home ;
4. affiche alors une confirmation `Leçon enregistrée`.

La réussite visuelle arrive donc après sauvegarde, jamais avant.

---

# Practice Hub

Dans `screen-conversation`, les moteurs existants restent dans le DOM mais sont masqués par défaut.

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

Session UX garde **2 actions principales** dans `.daily-steps` et déplace les autres boutons existants dans `details.session-daily-more`.

Aucun bouton moteur n’est détruit ; ils changent uniquement de parent DOM.

---

# Milestones

Clé indépendante :

```text
french-tranquille:milestones:v1
```

Ce n’est pas une donnée pédagogique et elle n’influence aucun score/moteur.

Au premier démarrage, les achievements déjà vrais deviennent `baseline`, donc aucune avalanche rétroactive. Seuls les nouveaux franchissements déclenchent une micro-carte.

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

Curriculum : **40 leçons / 241 éléments**. Scenario : **28 / 84**.

---

# Voice / branding — sanctuaires

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

---

# CI candidate Build 25.2

Contrats obligatoires :

1. quality historique ;
2. Options ;
3. nav/mobile ;
4. Progression UX ;
5. Listening-rate 0.88 / 0.64 ;
6. nouveau **Session UX smoke** ;
7. hashes branding/voice ;
8. profil l8 ;
9. aucune fatal card.

Session UX smoke vérifie notamment :

```text
Home       2 actions principales + extras repliés
Practice   hub unique
Listening  5/5 → completion
Review     cible bornée → completion
```

---

# Freeze terrain

Quand Trân utilise activement la PWA : aucun nouveau runtime/cache sauf incident critique.

# Dette technique

`app.js` reste monolithique par choix de sécurité. Son extraction est réservée à Architecture Hardening.