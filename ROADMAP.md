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

# Baseline production — v1.19.0 / Build 26

**Real Life French III — ✅ PROD / CLOS**

- `Parcours` compact via Build 25 ;
- Listening effectif : **0.88 normal / 0.64 lent** via Build 25.1 ;
- sessions bornées et sorties explicites via Build 25.2 ;
- Pack Real Life III : **8 situations / 24 tours** ;
- Scenario total : **36 situations / 108 tours** ;
- français oral naturel côté interlocuteur, réponses standard côté Trân ;
- réponses simples alternatives explicitement listées ;
- 15 résolutions Memory avancées, 0 ambiguïté ;
- 40 leçons / 241 éléments ;
- voix/branding sanctuarisés ;
- coût 0 €.

Preuve production Build 26 : PR #37, commit `db8219e44d74f0af13421ec798a0c98d02f7a7b5`, **8 workflows / 8 SUCCESS**, Pages **#96 SUCCESS**.

Baseline historique protégée : **v1.17.0 — Build 24 — Real Life French II**, Scenario **28 situations / 84 tours** avant Pack III.

---

# Build 26 — critères clôturés

- [x] version `v1.19.0 / Build 26` et cache `1.19.0-b26-real-life-3` cohérents ;
- [x] 8 nouvelles situations / 24 tours ;
- [x] Scenario total **36 / 108** ;
- [x] aucun ID de scénario dupliqué ;
- [x] 15 résolutions Memory avancées et **0 ambiguïté** ;
- [x] réponses semi-libres déterministes et testables ;
- [x] déblocage l20 → l35…l40 conforme ;
- [x] catalogue visible limité à 6 scènes ouvertes ;
- [x] Session UX 25.2 intacte ;
- [x] profil ancien utilisateur / l8 intact ;
- [x] voix, reconnaissance, logo, favicon byte-identiques ;
- [x] 8 workflows / 8 SUCCESS + Pages #96 SUCCESS ;
- [x] docs CLOS.

---

# v1.19.1 — Build 26.1 — Voice Self-Playback + Learning Details Dashboard — EN COURS

## Retours terrain

1. Trân souhaite pouvoir réécouter sa propre voix après un exercice oral afin de se comparer au modèle.
2. `Parcours → Détails d’apprentissage` reste trop long une fois ouvert : les cartes techniques sont encore stackées verticalement.

## Voice Self-Playback

Le moteur vocal validé reste un sanctuaire : **`free-voice.js` et `voice-ios.js` ne sont pas modifiés**.

Après une réponse reconnue :

```text
🎧 Écoute-toi
[ 🎙️ M’enregistrer pour me réécouter ]
          ↓
[ ▶ Réécouter ma voix ] [ ↻ Refaire ]
```

Contrat :

- la reconnaissance finit avant l’ouverture de la seconde capture ;
- `MediaRecorder` / `getUserMedia` avec feature detection ;
- local uniquement ;
- aucune persistance ;
- aucun upload ;
- aucun effet sur Memory/Error/Mastery/Session ;
- Blob URL révoquée ;
- piste micro stoppée ;
- capture max 9 secondes ;
- si la capture échoue, la reconnaissance reste utilisable ;
- capture simultanée exacte du premier essai reportée après validation iPhone réelle.

## Learning Details Dashboard

`Détails d’apprentissage` devient un dashboard compact :

```text
🧠 Mémoire & révisions
🎯 Maîtrise
🎧 Compréhension orale
🎭 Français réel
🧩 A1 & rythme
```

Règles :

- seules les catégories présentes sont affichées ;
- une seule famille détaillée est ouverte à la fois ;
- les cartes historiques restent les vrais nœuds DOM ;
- les moteurs continuent à les mettre à jour ;
- toute carte non reconnue tombe dans `Autres détails` ;
- aucune donnée apprenante n’est créée ou migrée.

## CI / compatibilité

Le workflow Build 26 Real Life III est rendu durable : il protège `real-life-data-3.js` / `real-life-coach.js` et leurs contrats **36 / 108** sans obliger la version globale à rester `1.19.0`.

Nouveau tribunal : **Build 26.1 Voice replay + Details dashboard smoke**.

## Critères de clôture Build 26.1

- version `v1.19.1 / Build 26.1` et cache cohérents ;
- 4 nouveaux fichiers UX câblés/précachés ;
- replay sans réseau ni persistance ;
- `free-voice.js`, `voice-ios.js`, logo, favicon byte-identiques ;
- vrai Chrome : au moins 3 groupes de détails sur profil l8 ;
- Memory + Mastery toujours présents ;
- une seule famille active dans le smoke ;
- vrai Chrome : surface replay injectée après résultat vocal synthétique ;
- Real Life III reste **36 situations / 108 tours** ;
- quality / Options / nav / Progression / Listening-rate / Session UX / Real Life III / Build26.1 verts sur PR puis `main` ;
- Pages SUCCESS ;
- docs post-prod CLOS.

---

# v1.20.0 — Build 27 — Data & Recovery Hardening

Sauvegarde/restauration, migrations versionnées, snapshot pré-migration, localStorage corrompu toléré, tests zéro-perte.

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
```

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.