# French Trân’quille — ARCHITECTURE

## Vue générale

```text
iPhone / Safari / PWA
        ↓
UX Shell simple
        ↓
moteurs pédagogiques locaux
        ↓
localStorage + Web APIs navigateur
```

PWA statique GitHub Pages, sans backend obligatoire ni API payante.

---

# Principe produit

```text
COMPLEXITÉ INTERNE
Curriculum / Memory / Mastery / Error / Scenario / Listening / Language

                  ↓

INTERFACE APPRENANTE
Aujourd’hui / Pratiquer / Parcours
```

Un nouveau pack de contenu n’obtient pas une nouvelle destination de navigation.

---

# Runtime canonique — v1.17.0 Build 24

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
real-life-data.js            # Pack I
real-life-data-2.js          # Pack II — Build 24
scenario-host.js
scenario-engine.js
real-life-ux.js              # façade commune des packs
listening-data.js
listening-engine.js
ux-shell.js
build-meta.js                # dernier
```

CSS Scenario personnel : `real-life-ux.css`.

---

# État et sécurité

Clé apprenant historique :

```text
francais-avec-luc:learner:v1
```

Clé Scenario :

```text
french-tranquille:scenarios:v1
```

Snapshot de sécurité depuis Build 22 :

```text
french-tranquille:safety:pre-build22:v1
```

Build 24 ne crée aucune nouvelle clé de progression.

---

# Curriculum

- l1–l15 : `app.js` ;
- l16–l25 : `curriculum-stage2.js` ;
- l26–l40 : `curriculum-stage3.js`.

Contrat : **40 leçons / 241 éléments**.

---

# Scenario Engine

Le moteur historique reste responsable de :

- verrouillage par `requiredLessons` ;
- validation des réponses ;
- indice ;
- modèle après blocage ;
- voix/clavier ;
- Learning Memory ;
- stats persistantes.

## Packs data

```text
scenario-data.js      12 situations / 36 tours
real-life-data.js      6 situations / 18 tours
real-life-data-2.js   10 situations / 30 tours
```

Total candidat Build 24 :

```text
28 situations / 84 tours
```

Real Life I + II :

```text
16 situations / 48 tours
```

Chaque pack étend le même tableau `FrenchTranquilleScenarioData.scenarios` **avant** l’initialisation du moteur.

Aucune migration du state Scenario n’est nécessaire : les stats existantes sont indexées par ID et les nouveaux IDs sont additifs.

---

# Real Life French II

Pack :

```text
real-life-jerry-2
```

Prérequis entre l9 et l20. Les scénarios relient plusieurs acquis :

- train + horaire ;
- shopping + budget + carte ;
- préférence + commande ;
- douleur + localisation + urgence ;
- présentation de Jerry ;
- être prête + vouloir + pouvoir ;
- réservation + question + aide ;
- clé + porte + aide ;
- logement + eau chaude + aide ;
- téléphone + réseau + message.

Le contenu évite de recopier les scénarios historiques génériques ; il ajoute des **enchaînements personnels**.

---

# `real-life-ux.js` — catalogue scalable

La façade Scenario doit rester simple même lorsque le moteur contient beaucoup de scènes.

Build 24 introduit :

```text
MAX_OPEN = 6
```

Comportement par défaut :

1. scènes personnelles ouvertes ;
2. triées selon le prérequis le plus récent ;
3. autres scènes ouvertes ;
4. seulement les 6 premières sont visibles ;
5. bouton pour afficher les autres scènes ouvertes ;
6. seulement 2 futures scènes verrouillées visibles ;
7. second bouton pour afficher les futures scènes si souhaité.

Le badge `Ta vraie vie` et le titre apprenant `Parler en situation` restent communs aux packs I et II.

---

# Learning Memory / Error / Adaptive

Build 24 n’introduit aucun nouveau chemin parallèle : les scénarios continuent d’utiliser les mêmes hooks Scenario → Learning Memory.

Error Intelligence, Listening et Adaptive Language restent inchangés et sont testés comme non-régressions.

---

# Voice — sanctuaire réel

Retour iPhone validé : voix Lucie naturelle et reconnaissance des réponses satisfaisante.

Build 24 conserve byte-identiques :

```text
voice-ios.js
free-voice.js
```

Aucune recalibration sans problème réel reproductible.

---

# Branding

Sanctuaires :

```text
assets/LOGO.png
assets/Favicon.png
```

Build 24 ne remplace ni le logo, ni le favicon.

---

# UX Shell

Toujours :

```text
Aujourd’hui
Pratiquer
Parcours
```

Le catalogue agrandi reste derrière `Pratiquer → Parler français`.

---

# Service Worker — Build 24

Cache :

```text
tran-french-teacher-v1.17.0-b24
```

Nouveau fichier précaché :

```text
real-life-data-2.js
```

---

# CI Build 24

Contrats :

1. syntaxe runtime complet ;
2. hashes branding + voice ;
3. curriculum 40/241 ;
4. Scenario 28/84 ;
5. Pack I 6/18 ;
6. Pack II 10/30 ;
7. références `turn.items` valides dans le curriculum ;
8. profil l8 : non-régression Build 23 ;
9. profil l15 : 5 scènes Pack II ouvertes ;
10. profil l20 : 10 scènes Pack II ouvertes ;
11. catalogue visuel limité à 6 situations ouvertes par défaut ;
12. 2 futures scènes verrouillées max ;
13. Error 20/120 ; Listening ; Adaptive Language ;
14. aucune fatal card.

---

# Dette technique

`app.js` reste monolithique par choix de sécurité. Sa future extraction reste réservée à un build de Hardening avec comparaison/migration d’état.
