# French Trân’quille — ARCHITECTURE

## Vue générale

```text
iPhone / Safari / PWA
        ↓
UX Shell simple
        ↓
Progression UX + Session UX + Field Feedback UX
        ↓
moteurs pédagogiques locaux
        ↓
localStorage + Web APIs navigateur
```

PWA statique GitHub Pages, sans backend obligatoire ni API payante.

## Principe produit

La complexité appartient aux moteurs ; Trân voit d’abord l’information utile pour décider quoi faire.

---

# Runtime candidat — v1.19.1 Build 26.1

Build 26 reste la baseline pédagogique de production. Build 26.1 ajoute deux couches UX sans migration de données :

```text
voice-replay.js       ← capture/relecture locale best-effort
voice-replay.css
progression-ux.js     ← regroupement Détails d’apprentissage
progression-ux.css
```

Le reste du runtime conserve notamment : Curriculum 40/241, Scenario 36/108, Listening 0.88/0.64, Session UX 25.2 et Real Life III.

---

# Voice Replay — séparation stricte

Le moteur de reconnaissance validé reste :

```text
voice-ios.js
free-voice.js
```

Build 26.1 **ne les modifie pas**.

`voice-replay.js` écoute les mêmes interactions micro via délégation DOM en phase de capture, mais ne fait jamais `preventDefault()` sur le bouton micro et ne remplace aucun handler. Il tente indépendamment :

```text
getUserMedia({ audio:true })
        ↓
MediaRecorder
        ↓
Blob mémoire
        ↓
URL.createObjectURL(blob)
        ↓
▶ Réécouter
```

## Persistance

Aucune.

Le module ne fait aucun `localStorage.setItem` et n’envoie aucun audio. Une seule URL Blob est gardée en mémoire ; l’ancienne est révoquée au remplacement et la dernière à `pagehide`.

## Cycle de capture

- clic micro ;
- tentative asynchrone de capture ;
- observation de l’état du bouton de reconnaissance ;
- arrêt à la fin de l’écoute ;
- garde si l’écoute ne démarre jamais ;
- arrêt de sécurité à 15 s ;
- publication du bouton uniquement si un Blob non vide existe.

Si MediaRecorder/getUserMedia échoue, la reconnaissance existante reste propriétaire de son flux. La coexistence réelle sur iPhone reste un **gate terrain** : Chrome CI ne suffit pas à certifier l’usage simultané du micro par les deux Web APIs sur l’appareil de Trân.

---

# Progression UX — Détails groupés

Build 25 avait introduit la progressive disclosure extérieure. Build 26.1 traite le niveau intérieur.

Au lieu de déplacer toutes les cartes moteur dans un unique `.progress-ux-details-body`, `progression-ux.js` crée :

```text
Détails d’apprentissage
  ├── 🧠 Mémoire & révisions
  ├── 🎯 Maîtrise
  ├── 🎧 Pratique réelle
  └── 🌐 Soutien de Lucie
```

Mapping actuel :

```text
Mémoire & révisions
  learned-list
  memory-progress-card
  error-intelligence-card

Maîtrise
  mastery-progress-card
  stage3-progress-card
  mastery-stage3-card

Pratique réelle
  scenario-progress-card
  listening-progress-card

Soutien de Lucie
  language-progress-card
```

Les cartes originales sont **déplacées dans le DOM, pas réimplémentées** : leurs moteurs, calculs, boutons et persistance restent propriétaires de leur logique.

## Accordéon

- enveloppe externe fermée par défaut ;
- groupes fermés par défaut ;
- une seule famille ouverte simultanément ;
- groupe ouvert pleine largeur desktop ;
- grille 2 colonnes desktop / 1 mobile ;
- familles vides masquées.

---

# Baselines canoniques conservées

## Build 26 — Real Life French III

- 8 scènes / 24 tours Pack III ;
- Scenario total 36 / 108 ;
- 15 résolutions Memory avancées ;
- réponses semi-libres déterministes ;
- max 6 scènes ouvertes visibles.

## Session UX — Build 25.2

Chaque moteur conserve ses écritures ; `session-ux.js` orchestre objectif / progression / fin / sortie.

## Listening — Build 25.1

```text
normal request 0.88 → effectif 0.88
slow request   0.68 → effectif 0.64
```

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

Voice Replay n’ajoute aucune clé persistante.

---

# Voice / branding — sanctuaires

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

---

# CI Build 26.1

Contrats obligatoires :

1. quality historique ;
2. Options ;
3. nav/mobile ;
4. Progression UX renforcé ;
5. Listening-rate ;
6. Session UX ;
7. Real Life French III ;
8. nouveau Field Feedback UX smoke ;
9. hashes branding/voice ;
10. profil l8 ;
11. aucune fatal card.

Le nouveau smoke vérifie la présence du contrôle Replay en vietnamien et DEBUG FR, la détection MediaRecorder dans Chrome, l’absence d’écriture localStorage dans le module, et le wiring cache/version.

Le smoke Progression vérifie 4 familles, zéro famille ouverte en mode compact et exactement une en mode détails test.

# Dette / gate terrain

Le replay vocal reste **best-effort jusqu’au test réel iPhone**. Le produit ne doit jamais sacrifier la reconnaissance vocale déjà validée pour obtenir la réécoute.

`app.js` reste monolithique par choix de sécurité ; son extraction est réservée à Architecture Hardening.