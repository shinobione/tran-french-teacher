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

**Voice Self-Playback + Learning Details Dashboard — ✅ PROD / gate iPhone replay encore ouvert**

- commit production : `8ad7e5eb9cb2f64c58c086847c3e035463ab3ba3` ;
- PR #40 ;
- **8 workflows / 8 SUCCESS** sur PR puis `main` ;
- GitHub Pages **#98 SUCCESS** ;
- Progression UX Build 25 intact ;
- Listening **0.88 normal / 0.64 lent** ;
- Session UX Build 25.2 intact ;
- Real Life French III Build 26 intact : **36 situations / 108 tours** ;
- curriculum : **40 leçons / 241 éléments** ;
- voix/branding sanctuarisés ;
- aucune migration de données apprenantes ;
- coût 0 €.

Baseline historique protégée : **v1.17.0 — Build 24 — Real Life French II**, Scenario **28 situations / 84 tours** avant Pack III.

---

# Build 26.1 — état réel

## Voice Self-Playback

Après une réponse reconnue, Free Voice peut proposer :

```text
🎧 Écoute-toi
[ 🎙️ M’enregistrer pour me réécouter ]
          ↓
[ ▶ Réécouter ma voix ] [ ↻ Refaire ]
```

Le choix est volontairement conservateur : la reconnaissance se termine **avant** l’ouverture de cette seconde prise locale.

Contrat livré :

- `voice-ios.js` et `free-voice.js` byte-identiques ;
- `MediaRecorder` / `getUserMedia` avec feature detection ;
- local uniquement ;
- aucune persistance ;
- aucun upload ;
- aucun effet sur Memory/Error/Mastery/Session ;
- Blob URL révoquée ;
- piste micro stoppée ;
- capture max 9 secondes ;
- capture locale impossible = reconnaissance pédagogique toujours utilisable ;
- capture simultanée exacte du premier essai reportée jusqu’à preuve réelle sur iPhone.

## Learning Details Dashboard

`Parcours → Détails d’apprentissage` est maintenant regroupé par intention :

```text
🧠 Mémoire & révisions
🎯 Maîtrise
🎧 Compréhension orale
🎭 Français réel
🧩 A1 & rythme
```

Règles livrées :

- seules les catégories présentes sont affichées ;
- une seule famille détaillée ouverte à la fois ;
- les cartes historiques restent les vrais nœuds DOM ;
- les moteurs continuent de les mettre à jour ;
- toute carte future non classifiée tombe dans `Autres détails` ;
- aucune donnée apprenante n’est créée ou migrée.

## Critères de clôture Build 26.1

- [x] version `v1.19.1 / Build 26.1` et cache cohérents ;
- [x] 4 nouveaux fichiers UX câblés/précachés ;
- [x] replay sans réseau ni persistance ;
- [x] `free-voice.js`, `voice-ios.js`, logo, favicon byte-identiques ;
- [x] dashboard groupé dans vrai Chrome ;
- [x] Memory + Mastery toujours présents ;
- [x] une seule famille active dans le smoke ;
- [x] surface replay injectée après résultat vocal synthétique ;
- [x] Real Life III reste **36 / 108** ;
- [x] quality / Options / nav / Progression / Listening-rate / Session UX / Real Life III / Build26.1 verts sur PR ;
- [x] même tribunal `main` vert ;
- [x] Pages #98 SUCCESS ;
- [x] docs passées en état production ;
- [ ] **test terrain sur l’iPhone de Trân :** réponse reconnue → seconde prise locale → lecture correcte → réponse vocale suivante toujours reconnue normalement.

Le build est donc **déployé**, mais la sous-fonction d’auto-écoute n’est pas marquée “terrain validée” avant ce test réel.

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