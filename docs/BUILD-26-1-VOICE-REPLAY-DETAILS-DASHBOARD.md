# Build 26.1 — Voice Self-Playback + Learning Details Dashboard

Version candidate : **v1.19.1**  
Statut : **CANDIDAT / EN COURS**  
Date : **2026-08-11**

## Origine terrain

Deux retours directs de Trân :

1. pouvoir **réécouter sa propre voix** après avoir parlé, comme dans d’autres applications de langue ;
2. `Parcours → Détails d’apprentissage` reste trop long une fois ouvert : les cartes des moteurs sont encore affichées en pile verticale.

Build 26 Real Life French III est déjà PROD/CLOS et reste la baseline. Build 26.1 est un patch UX additif par-dessus.

---

# 1. Voice Self-Playback

## Sanctuaire vocal

```text
voice-ios.js
free-voice.js
```

Ces fichiers ne sont pas modifiés.

La reconnaissance pédagogique fonctionne d’abord exactement comme avant. `voice-replay.js` intervient seulement quand `.free-voice-result` existe déjà.

## UX

```text
🎧 Écoute-toi
Répète la même réponse une fois : cette prise sert seulement à t’écouter.

[ 🎙️ M’enregistrer pour me réécouter ]
```

Puis :

```text
[ ▶ Réécouter ma voix ]
[ ↻ Refaire ]

Local uniquement • non sauvegardé
```

## Pourquoi une seconde prise

La reconnaissance Web Speech ne fournit pas à l’application son flux audio brut sous forme de `MediaStream`. Build 26.1 évite en plus de demander un second accès micro tant que Free Voice indique encore que la reconnaissance est active.

Le choix est donc : **reconnaissance terminée → seconde prise volontaire courte → auto-écoute**.

La capture simultanée exacte du premier essai reste hors scope jusqu’à validation réelle sur l’iPhone de Trân.

## Implémentation

```text
voice-replay.js
voice-replay.css
```

```text
getUserMedia(audio)
      ↓
MediaRecorder
      ↓
Blob mémoire
      ↓
URL.createObjectURL
      ↓
Audio local
```

## Confidentialité / sécurité

- aucun `fetch()` ;
- aucun `XMLHttpRequest` ;
- aucun `FormData` ;
- aucun `sendBeacon` ;
- aucun `localStorage.setItem` ;
- aucun événement Memory/Error/Mastery/Session ;
- piste micro arrêtée après capture ;
- Blob URL révoquée ;
- maximum 9 secondes ;
- feature detection ;
- capture refusée tant que le micro Free Voice est encore occupé ;
- rendu idempotent pour éviter une boucle MutationObserver ;
- échec de MediaRecorder = exercice vocal toujours utilisable.

---

# 2. Learning Details Dashboard

## Avant

Build 25 a correctement caché les détails derrière une entrée volontaire, mais l’ouverture révélait encore :

```text
Memory
Error Intelligence
Mastery
A1 Mastery
Listening
Scenario / Real Life
Adaptive Language
...
```

l’un sous l’autre.

## Après

```text
🧠 Mémoire & révisions   🎯 Maîtrise
🎧 Compréhension orale   🎭 Français réel
🧩 A1 & rythme
```

Tap sur une tuile → un seul groupe détaillé s’ouvre. Tap à nouveau ou `×` → fermeture.

## Groupes

```text
memory    → Learning Memory + Error Intelligence
mastery   → Mastery + A1 Mastery
listening → Listening
real-life → Scenario / Real Life
path      → Stage2 / Stage3 / Adaptive / Daily / A1 path
other     → future carte non classifiée
```

## Compatibilité

Le dashboard ne crée pas de copies. Il déplace les vrais nœuds `.card` vers des panels toujours descendants de `.progress-layout`.

Les moteurs historiques continuent donc à trouver leurs cartes et à mettre à jour leur `innerHTML` normalement.

Une future carte inconnue reste visible via `Autres détails`.

## Anti-boucle

- signature de rendu ;
- panels réutilisés ;
- observer `childList` ;
- orchestration au `requestAnimationFrame` ;
- aucune écriture de données apprenantes.

---

# 3. Coexistence Build 26

Build 26 reste présent et versionné séparément :

```text
real-life-data-3.js?v=1.19.0-b26
real-life-coach.js?v=1.19.0-b26
```

Build 26.1 ajoute :

```text
voice-replay.js?v=1.19.1-b26.1
progress-details-dashboard.js?v=1.19.1-b26.1
```

Scenario doit rester :

```text
36 situations / 108 tours
8 scènes Pack III
15 résolutions Memory avancées
0 ambiguïté
```

Le smoke Build 26 est rendu durable : il protège Pack III sans exiger que la version globale reste éternellement `1.19.0`.

---

# Version / cache

```text
version = 1.19.1
build   = 26.1
cache   = tran-french-teacher-v1.19.1-b26.1-voice-replay-details-dashboard
```

---

# CI

Nouveau workflow :

```text
.github/workflows/build26-1-ux-smoke.yml
```

Il vérifie :

1. syntaxe + wiring + cache/version ;
2. replay local-only ;
3. hashes voix/branding ;
4. Chrome l8 : dashboard avec ≥3 familles ;
5. Memory + Mastery toujours dans le DOM ;
6. Chrome l40 : Real Life III toujours 36 / 108 ;
7. Chrome : surface replay derrière un résultat vocal synthétique.

Les anciens workflows restent obligatoires :

```text
quality
Options
nav/mobile
Progression UX
Listening-rate
Session UX
Real Life French III
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
Real Life III Build 26
```

---

# Checklist

- [x] branche créée depuis Build 26 PROD/CLOS ;
- [x] voice replay additif ;
- [x] dashboard de détails ;
- [x] version/cache candidat ;
- [x] Real Life III CI rendue durable ;
- [x] workflow Build 26.1 ;
- [x] README / ROADMAP / CHANGELOG / ARCHITECTURE candidat ;
- [x] dossier Build 26.1 ;
- [ ] PR ;
- [ ] quality PR ;
- [ ] Options PR ;
- [ ] nav-mobile PR ;
- [ ] Progression UX PR ;
- [ ] Listening-rate PR ;
- [ ] Session UX PR ;
- [ ] Real Life III PR ;
- [ ] Build 26.1 smoke PR ;
- [ ] merge `main` ;
- [ ] même tribunal `main` ;
- [ ] Pages ;
- [ ] docs PROD/CLOS.

## Hors scope

- analyse automatique de prononciation ;
- stockage de la voix de Trân ;
- upload cloud ;
- waveform comparative ;
- capture simultanée exacte du premier essai SpeechRecognition.