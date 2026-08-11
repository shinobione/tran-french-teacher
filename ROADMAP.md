# French Trân’quille — ROADMAP

> `README.md` = état courant. `CHANGELOG.md` = historique livré. Ici : **ordre, dépendances et critères de clôture**.

## Principes non négociables

1. iPhone / Safari / PWA iOS = cible principale ; PC et Android restent supportés.
2. Interface utilisable sans connaissances techniques.
3. 0 € d’exploitation récurrente sauf décision explicite.
4. Vietnamien comme soutien, français augmenté selon les preuves.
5. Oral prioritaire, sans faux diagnostic phonétique.
6. Communication réelle > théorie scolaire.
7. Aucun reset silencieux ; toute migration garde un smoke ancien utilisateur.
8. Un gros build = une intention principale.
9. Chrome réel avant merge important ; même tribunal sur `main`.
10. README / CHANGELOG / ROADMAP / ARCHITECTURE synchronisés.
11. Un nouveau moteur n’obtient pas automatiquement une nouvelle entrée de navigation.
12. Toute surface tappable donne un retour visuel immédiat sur mobile.
13. `Aujourd’hui / Pratiquer / Parcours` gardent des nœuds persistants et exactement un état actif.
14. Progressive disclosure : tous les moteurs et compteurs ne sont pas visibles par défaut.
15. **Contrat de session** : chaque activité possède un objectif, une progression, une fin et une sortie évidente.
16. Pas de tunnel pédagogique infini par défaut.
17. Succès visible et agréable, sans gamification agressive.
18. Pendant une vraie session de Trân : pas de polish runtime/cache sauf incident critique.
19. Une fonction d’auto-écoute ne doit jamais dégrader la reconnaissance vocale validée.
20. Les détails pédagogiques peuvent être riches, mais ils doivent être groupés par intention et jamais affichés comme un dump vertical des moteurs.

---

# Baseline production — v1.19.1 / Build 26.1

**Voice Self-Playback + Learning Details Dashboard — ✅ PROD / CLOS**

- `Parcours` compact via Build 25 ;
- Listening effectif : **0.88 normal / 0.64 lent** via Build 25.1 ;
- sessions bornées et sorties explicites via Build 25.2 ;
- Real Life French III via Build 26 : **36 situations / 108 tours** ;
- auto-écoute locale secondaire après réponse vocale reconnue ;
- aucune capture audio persistée ou uploadée ;
- `Détails d’apprentissage` groupé par intentions ;
- une seule famille détaillée ouverte à la fois ;
- 40 leçons / 241 éléments ;
- voix/branding sanctuarisés ;
- coût 0 €.

Preuve production Build 26.1 : PR #40, merge `8ad7e5eb9cb2f64c58c086847c3e035463ab3ba3`, **8 workflows applicatifs SUCCESS** sur PR puis sur `main`, GitHub Pages **#98 SUCCESS**.

Baseline historique protégée : **v1.17.0 — Build 24 — Real Life French II**, Scenario **28 situations / 84 tours** avant Pack III.

---

# Build 26 — Real Life French III — ✅ CLOS

- [x] 8 nouvelles situations / 24 tours ;
- [x] Scenario total **36 / 108** ;
- [x] 15 résolutions Memory avancées et 0 ambiguïté ;
- [x] variantes semi-libres déterministes ;
- [x] Session UX = 1 situation ;
- [x] voix, reconnaissance, logo, favicon byte-identiques ;
- [x] PR #37 + 8/8 workflows + Pages #96 SUCCESS.

---

# Build 26.1 — critères clôturés

## Voice Self-Playback

Après une réponse reconnue :

```text
🎧 Écoute-toi
[ 🎙️ M’enregistrer pour me réécouter ]
          ↓
[ ▶ Réécouter ma voix ] [ ↻ Refaire ]
```

- [x] reconnaissance terminée avant la seconde capture ;
- [x] `MediaRecorder` / `getUserMedia` avec feature detection ;
- [x] local uniquement ;
- [x] aucune persistance ;
- [x] aucun upload ;
- [x] aucun effet sur Memory/Error/Mastery/Session ;
- [x] Blob URL révoquée ;
- [x] piste micro stoppée ;
- [x] capture max 9 secondes ;
- [x] échec de capture sans casser l’exercice vocal ;
- [x] `free-voice.js` / `voice-ios.js` byte-identiques.

La capture simultanée exacte du premier essai reste volontairement reportée à un futur test iPhone réel.

## Learning Details Dashboard

```text
🧠 Mémoire & révisions
🎯 Maîtrise
🎧 Compréhension orale
🎭 Français réel
🧩 A1 & rythme
```

- [x] seules les familles réellement présentes apparaissent ;
- [x] une seule famille détaillée ouverte à la fois ;
- [x] les vraies cartes historiques restent dans le DOM ;
- [x] les moteurs continuent à mettre à jour leurs cartes ;
- [x] fallback `Autres détails` ;
- [x] aucune migration ni donnée apprenante créée ;
- [x] Real Life III reste **36 / 108**.

## CI / livraison

- [x] version `v1.19.1 / Build 26.1` et cache cohérents ;
- [x] 4 nouveaux fichiers UX câblés/précachés ;
- [x] smoke Real Life III rendu durable ;
- [x] nouveau workflow Build 26.1 ;
- [x] 8 workflows applicatifs verts sur PR #40 ;
- [x] merge `main` `8ad7e5eb9cb2f64c58c086847c3e035463ab3ba3` ;
- [x] 8 workflows applicatifs verts sur `main` ;
- [x] Pages #98 SUCCESS ;
- [x] docs post-prod CLOS.

---

# v1.20.0 — Build 27 — Data & Recovery Hardening — PROCHAIN

Sauvegarde/restauration, migrations versionnées, snapshot pré-migration, localStorage corrompu toléré, tests zéro-perte.

Priorité : protéger la vraie progression avant toute restructuration technique plus profonde.

# v1.21.0 — Build 28 — iPhone / PWA / Accessibility Hardening

Safe areas, tactile, contraste, tailles, offline/install et vrais tests iPhone.

# v1.22.0 — Build 29 — Architecture Hardening

Découpage du noyau uniquement avec snapshots comparatifs.

# V2.0.0 — Freeze / Release

Release cohérente, sauvegardable, testée et documentée.

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
bottom navigation interaction baseline
Progression UX Build 25
Session UX Build 25.2
Real Life III Build 26
Voice Replay / Details Dashboard Build 26.1
```

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.