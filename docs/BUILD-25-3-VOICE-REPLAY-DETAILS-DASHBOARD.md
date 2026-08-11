# Build 25.3 — Voice Self-Playback + Learning Details Dashboard

Version candidate : **v1.18.3**  
Statut : **CANDIDAT / EN COURS**  
Date : **2026-08-11**

## Origine terrain

Deux retours utilisateurs directs déclenchent ce mini-build :

1. après une réponse orale, Trân veut pouvoir **réécouter sa propre voix** comme dans d’autres applications de langue ;
2. `Parcours → Détails d’apprentissage` a bien été replié en Build 25, mais son contenu reste ensuite **stacké** en un long parchemin vertical.

Ce build ferme ces deux problèmes UX avant Build 26 Real Life French III.

---

# 1. Voice Self-Playback

## Ce que l’on protège

Les deux fichiers validés sur iPhone restent strictement intacts :

```text
voice-ios.js
free-voice.js
```

La reconnaissance continue donc d’utiliser exactement la baseline existante.

## Pourquoi le premier essai n’est pas enregistré simultanément

Le Web Speech API expose la transcription reconnue, pas le flux audio brut de `SpeechRecognition` comme `MediaStream` réutilisable. Obtenir parallèlement un second flux via `getUserMedia()` sur iPhone peut également modifier la session audio ou échouer selon l’état de WebKit.

Build 25.3 choisit donc une stratégie conservatrice : **la reconnaissance finit d’abord**, puis Trân peut faire volontairement une courte seconde prise de la même phrase destinée uniquement à l’auto-écoute.

## UX

Après `.free-voice-result` :

```text
🎧 Écoute-toi
Répète la même réponse une fois : cette prise sert seulement à t’écouter.

[ 🎙️ M’enregistrer pour me réécouter ]
```

Pendant la prise :

```text
[ ⏹ Terminer l’enregistrement ]
```

Après :

```text
[ ▶ Réécouter ma voix ]
[ ↻ Refaire ]

Local uniquement • non sauvegardé
```

L’interface vietnamienne porte les mêmes intentions avec un vocabulaire simple.

## Implémentation

```text
voice-replay.js
voice-replay.css
```

Chaîne :

```text
.free-voice-result
      ↓
getUserMedia(audio)
      ↓
MediaRecorder
      ↓
Blob temporaire
      ↓
URL.createObjectURL
      ↓
Audio(blobUrl)
```

## Sécurité / confidentialité

Contrats automatiques :

- pas de `fetch()` ;
- pas de `XMLHttpRequest` ;
- pas de `FormData` ;
- pas de `sendBeacon` ;
- pas de `localStorage.setItem` ;
- piste micro stoppée après capture ;
- Blob URL révoquée au changement de phrase / fermeture ;
- maximum 9 secondes ;
- feature detection ;
- le bouton reste désactivé tant que la reconnaissance n’a pas complètement libéré le micro ;
- si la capture échoue, le moteur vocal pédagogique reste fonctionnel.

Cette seconde prise ne compte **ni comme réussite, ni comme tentative, ni comme erreur**. Elle ne nourrit aucun moteur pédagogique.

---

# 2. Learning Details Dashboard

## Problème Build 25

Build 25 a correctement déplacé les moteurs secondaires derrière :

```text
Détails d’apprentissage
```

Mais une fois ce bloc ouvert, les cartes restent affichées l’une sous l’autre : Memory → Error → Mastery → A1 → Listening → Scenario → Adaptive… donc la complexité réapparaît sous forme de scroll.

## Cible Build 25.3

Le bloc principal reste unique, puis devient un dashboard :

```text
┌──────────────────────┐ ┌──────────────────────┐
│ 🧠 Mémoire & révision │ │ 🎯 Maîtrise           │
│ 3 à revoir            │ │ A0                    │
└──────────────────────┘ └──────────────────────┘

┌──────────────────────┐ ┌──────────────────────┐
│ 🎧 Compréhension      │ │ 🎭 Français réel      │
│ À commencer           │ │ Situations            │
└──────────────────────┘ └──────────────────────┘

┌──────────────────────────────────────────────┐
│ 🧩 A1 & rythme                               │
└──────────────────────────────────────────────┘
```

Tap sur une tuile → **un seul groupe détaillé apparaît**. Tap à nouveau ou `×` → fermeture.

## Groupes

```text
memory    → Learning Memory + Error Intelligence
mastery   → Mastery + A1 Mastery
listening → Listening
real-life → Scenario / Real Life
path      → Stage2 / Stage3 / Adaptive / Daily / A1 path
other     → toute future carte non encore classifiée
```

## Compatibilité avec les moteurs historiques

Aucune carte n’est clonée ou supprimée. `progress-details-dashboard.js` **déplace les vrais nœuds DOM existants** dans des panels qui restent descendants de `.progress-layout`.

Les anciens moteurs continuent donc à exécuter leurs sélecteurs descendants et à mettre à jour leurs cartes normalement.

`Autres détails` garantit qu’une future carte ne disparaît jamais si elle n’est pas encore reconnue par la classification.

## Anti-boucle

- signature de rendu ;
- panels réutilisés ;
- observer limité à `childList` ;
- orchestration planifiée au `requestAnimationFrame` ;
- aucune persistance.

---

# Version / cache

```text
version = 1.18.3
build   = 25.3
cache   = tran-french-teacher-v1.18.3-b25.3-voice-replay-details-dashboard
```

Nouveaux assets :

```text
voice-replay.js
voice-replay.css
progress-details-dashboard.js
progress-details-dashboard.css
```

---

# CI dédiée

Workflow :

```text
.github/workflows/build25-3-ux-smoke.yml
```

Il vérifie :

1. syntaxe + wiring + cache/version ;
2. replay local-only et non persistant ;
3. hashes des sanctuaires ;
4. Chrome / profil leçon 8 : dashboard présent, au moins 3 groupes, groupe Memory actif, Memory + Mastery toujours dans le DOM ;
5. Chrome : surface replay injectée derrière un résultat vocal synthétique.

Les workflows historiques restent obligatoires :

```text
quality
Options
nav/mobile
Progression UX
Listening rate
Session UX
```

---

# Sanctuaires

```text
francais-avec-luc:learner:v1
Learning Memory state
Scenario state
Listening state
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
bottom navigation baseline
Progression UX Build 25
Session UX Build 25.2
```

---

# Checklist

- [x] branche depuis `main` Build 25.2 CLOS ;
- [x] voice replay additif ;
- [x] détails groupés ;
- [x] version/cache candidat ;
- [x] CI dédiée ;
- [x] README / ROADMAP / CHANGELOG / ARCHITECTURE candidat ;
- [x] dossier Build 25.3 ;
- [ ] PR ;
- [ ] quality PR ;
- [ ] Options PR ;
- [ ] nav/mobile PR ;
- [ ] Progression UX PR ;
- [ ] Listening-rate PR ;
- [ ] Session UX PR ;
- [ ] Build 25.3 smoke PR ;
- [ ] merge `main` ;
- [ ] mêmes tests `main` ;
- [ ] Pages ;
- [ ] docs PROD/CLOS.

## Hors scope

- analyse automatique de la prononciation à partir du fichier audio ;
- sauvegarde de la voix de Trân ;
- upload cloud ;
- comparaison waveform ;
- enregistrement simultané exact du premier essai SpeechRecognition.

Ces points ne seront envisagés qu’avec une vraie valeur pédagogique et après validation iPhone.