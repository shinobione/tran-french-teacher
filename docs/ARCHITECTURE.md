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

# Runtime candidat — v1.19.0 Build 26

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
real-life-data-3.js
scenario-host.js
scenario-engine.js
real-life-ux.js
real-life-coach.js
listening-data.js
listening-engine.js
ux-shell.js
interaction-ux.js
progression-ux.js
session-ux.js
session-ux-adapter.js
build-meta.js
```

---

# Baselines canoniques conservées

## Progression UX — Build 25

`progression-ux.js` orchestre `Parcours` sans persister de données : résumé apprenant, détails repliables, 5 lignes curriculum visibles par défaut, 40 accessibles à la demande.

## Listening — Build 25.1

```text
normal request 0.88 → effectif 0.88
slow request   0.68 → effectif 0.64
```

Le bridge vit dans `build-meta.js`. `voice-ios.js`, voix et pitch sont inchangés.

## Session UX — Build 25.2

Chaque moteur conserve ses écritures ; `session-ux.js` observe et orchestre `objectif / progression / fin / sortie`. Scenario reste borné à **1 situation par session**.

---

# Build 26 — Real Life French III

## Insertion runtime

```text
scenario-data.js
real-life-data.js
real-life-data-2.js
real-life-data-3.js   ← 8 scènes / 24 tours
scenario-host.js
scenario-engine.js
real-life-ux.js       ← catalogue max 6 ouverts visibles
real-life-coach.js    ← note semi-libre Pack III
session-ux.js         ← contrat 1 situation
```

`real-life-data-3.js` enrichit le tableau `FrenchTranquilleScenarioData.scenarios` avant le démarrage du host/engine. Il ne crée aucune nouvelle clé localStorage.

## Réponses semi-libres déterministes

`openResponse:true` signifie uniquement que plusieurs variantes explicitement listées sont acceptées. Le moteur ne fait aucune classification sémantique libre.

Exemple :

```text
Je suis inquiète.
Je suis un peu inquiète.
Oui, je suis inquiète.
```

## Français oral naturel

Le français relâché apparaît côté interlocuteur pour entraîner la compréhension :

```text
T'es prête ?
J'sais pas… on rentre ?
Y a pas de réseau.
```

Trân n’est pas obligée de reproduire ces contractions ; elle peut répondre en français standard.

## Résolution Memory

Pour les acquis avancés, `real-life-data-3.js` résout une requête textuelle contre le curriculum réellement chargé.

Règle :

```text
0 match  → invalide
1 match  → accepté
2+ match → ambigu / invalide
```

Les résolutions et erreurs sont exposées dans `FrenchTranquilleRealLife3.resolution` et `invalidResolution` pour le CI.

Candidat : **15 résolutions avancées, 0 invalide**.

## Déblocage

- l20 : français oral naturel ;
- l35 : futur proche ;
- l36 : passé récent ;
- l37 : passé composé ;
- l38 : mouvement au passé ;
- l39 : administratif ;
- l40 : émotion/besoin + couple.

Scenario candidat total : **36 situations / 108 tours**.

## Coach Pack III

`real-life-coach.js` n’altère pas le moteur. Il ajoute uniquement, dans une scène Pack III active, une note apprenante : répondre avec ses mots est possible si l’idée reste dans les variantes prévues.

Il publie aussi des `data-*` uniquement lorsque `?realLifeSmoke=...` est présent afin de rendre les contrats Chrome mesurables.

---

# Practice Hub / Daily Coach / Milestones

Les couches Build 25.2 restent inchangées : un seul moteur dominant dans Practice, deux actions principales sur Home, milestones non pédagogiques et succès avec reduced motion.

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

Curriculum : **40 leçons / 241 éléments**.

---

# Voice / branding — sanctuaires

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

---

# CI candidat Build 26

Contrats obligatoires :

1. quality historique ;
2. Options ;
3. nav/mobile ;
4. Progression UX ;
5. Listening-rate 0.88 / 0.64 ;
6. Session UX ;
7. nouveau **Real Life French III smoke** ;
8. hashes branding/voice ;
9. profil l8 ;
10. aucune fatal card.

Real Life III smoke vérifie l20 / l35 / l40, **36 / 108**, 15 résolutions, 0 ambiguïté et maximum 6 situations ouvertes visibles.

# Dette technique

`app.js` reste monolithique par choix de sécurité. Son extraction est réservée à Architecture Hardening.