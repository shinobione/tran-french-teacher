# Build 26.1 — Voice Self-Playback + Learning Details Dashboard

Version : **v1.19.1**  
Statut : **✅ PROD / FIELD VALIDATION IPHONE PENDING**  
Date : **2026-08-11**  
PR : **#40**  
Commit production : `8ad7e5eb9cb2f64c58c086847c3e035463ab3ba3`  
GitHub Pages : **#98 SUCCESS**

## Origine terrain

Deux retours directs de Trân :

1. pouvoir **réécouter sa propre voix** après avoir parlé, comme dans d’autres applications de langue ;
2. `Parcours → Détails d’apprentissage` restait trop long une fois ouvert : les cartes des moteurs étaient encore affichées en pile verticale.

Build 26 Real Life French III reste la baseline pédagogique. Build 26.1 est un patch UX additif par-dessus.

---

# 1. Voice Self-Playback

## Sanctuaire vocal

```text
voice-ios.js
free-voice.js
```

Ces fichiers sont restés byte-identiques.

La reconnaissance pédagogique fonctionne d’abord exactement comme avant. `voice-replay.js` intervient seulement quand `.free-voice-result` existe déjà.

## UX livrée

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

La reconnaissance Web Speech ne fournit pas à l’application son flux audio brut réutilisable sous forme de `MediaStream`. Build 26.1 évite en plus de demander un second accès micro tant que Free Voice indique encore que la reconnaissance est active.

Le choix déployé est donc : **reconnaissance terminée → seconde prise volontaire courte → auto-écoute**.

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

## Gate terrain iPhone

Le composant, son wiring et sa politique local-only sont validés en CI. Il reste à vérifier sur le vrai iPhone :

```text
réponse reconnue
→ bouton auto-écoute visible
→ seconde prise locale
→ lecture correcte
→ exercice vocal suivant toujours reconnu normalement
```

Ce gate reste volontairement ouvert.

---

# 2. Learning Details Dashboard

## Avant

Build 25 avait correctement caché les détails derrière une entrée volontaire, mais l’ouverture révélait encore :

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

Le dashboard est considéré **PROD** : ses contrats navigateur et Progression sont verts sur PR puis `main`.

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

Scenario reste :

```text
36 situations / 108 tours
8 scènes Pack III
15 résolutions Memory avancées
0 ambiguïté
```

Le smoke Build 26 a été rendu durable : il protège Pack III sans exiger que la version globale reste éternellement `1.19.0`.

Baseline historique conservée : **v1.17.0 Build 24 / real-life-data-2.js / 28 situations / 84 tours** avant Pack III.

---

# Version / cache

```text
version = 1.19.1
build   = 26.1
cache   = tran-french-teacher-v1.19.1-b26.1-voice-replay-details-dashboard
```

---

# CI / tribunal

Workflow dédié :

```text
.github/workflows/build26-1-ux-smoke.yml
```

Il vérifie :

1. syntaxe + wiring + cache/version ;
2. replay local-only ;
3. hashes voix/branding ;
4. Chrome l8 : dashboard avec familles groupées ;
5. Memory + Mastery toujours dans le DOM ;
6. Chrome l40 : Real Life III toujours 36 / 108 ;
7. Chrome : surface replay derrière un résultat vocal synthétique.

Le smoke Replay a été isolé du routage Practice après qu’un premier harness a révélé une dépendance de timing. Navigation, Practice Hub et Replay sont désormais testés séparément selon leur responsabilité.

## Tribunal PR #40

- quality ✅ ;
- Options ✅ ;
- nav/mobile ✅ ;
- Progression UX ✅ ;
- Listening-rate ✅ ;
- Session UX ✅ ;
- Real Life French III ✅ ;
- Build 26.1 Voice Replay + Details Dashboard ✅.

## Tribunal `main`

Les mêmes 8 workflows sont **SUCCESS** sur le commit `8ad7e5e…`.

GitHub Pages **#98 SUCCESS**.

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

- [x] branche récupérée après interruption de conversation ;
- [x] voice replay additif ;
- [x] dashboard de détails ;
- [x] version/cache ;
- [x] Real Life III CI rendue durable ;
- [x] workflow Build 26.1 ;
- [x] README / ROADMAP / CHANGELOG / ARCHITECTURE candidat ;
- [x] dossier Build 26.1 ;
- [x] PR #40 ;
- [x] quality PR ;
- [x] Options PR ;
- [x] nav-mobile PR ;
- [x] Progression UX PR ;
- [x] Listening-rate PR ;
- [x] Session UX PR ;
- [x] Real Life III PR ;
- [x] Build 26.1 smoke PR ;
- [x] merge `main` ;
- [x] même tribunal `main` ;
- [x] Pages #98 SUCCESS ;
- [x] docs passées en état production ;
- [ ] test terrain auto-écoute sur l’iPhone de Trân.

## Hors scope

- analyse automatique de prononciation ;
- stockage de la voix de Trân ;
- upload cloud ;
- waveform comparative ;
- capture simultanée exacte du premier essai SpeechRecognition.