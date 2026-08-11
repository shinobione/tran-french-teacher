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
19. Un retour terrain utilisateur peut créer un micro-build avant le hardening si sa valeur pédagogique/UX est claire et si les sanctuaires restent intacts.

---

# Baseline production — v1.19.0 / Build 26

**Real Life French III — ✅ PROD / CLOS**

- Progression UX Build 25 ;
- Listening **0.88 / 0.64** ;
- Session UX Build 25.2 ;
- Pack Real Life III : 8 situations / 24 tours ;
- Scenario total : **36 / 108** ;
- 40 leçons / 241 éléments ;
- voix/branding sanctuarisés ;
- coût 0 €.

Preuve : PR #37, commit `db8219e44d74f0af13421ec798a0c98d02f7a7b5`, 8 workflows / 8 SUCCESS, Pages #96 SUCCESS.

---

# v1.19.1 — Build 26.1 — Field Feedback UX — CANDIDAT / EN COURS

## Intention

Traiter deux retours terrain sans attendre le hardening général :

1. permettre à Trân de **réécouter sa propre voix** après une réponse vocale ;
2. supprimer l’effet “parchemin” de `Détails d’apprentissage`.

## Réécoute voix

Architecture : nouvelle couche `voice-replay.js` + `voice-replay.css`, séparée de la reconnaissance validée.

Contrat :

- MediaRecorder/getUserMedia best-effort ;
- aucun changement de `voice-ios.js` / `free-voice.js` ;
- aucun upload ;
- aucune persistance audio ;
- dernier Blob uniquement en mémoire de session ;
- aucun score de prononciation ;
- si la capture parallèle échoue, la reconnaissance existante doit continuer ;
- coexistence réelle à confirmer sur l’iPhone de Trân avant de considérer le sous-système terrain pleinement validé.

## Détails d’apprentissage

Quatre familles :

- 🧠 Mémoire & révisions ;
- 🎯 Maîtrise ;
- 🎧 Pratique réelle ;
- 🌐 Soutien de Lucie.

Règles : enveloppe fermée par défaut, grille 2 colonnes desktop / 1 mobile, une seule famille ouverte à la fois, cartes moteur existantes conservées sans changement de données.

## Critères de clôture Build 26.1

- [x] version/cache candidate `1.19.1 / 26.1` ;
- [x] Voice Replay isolé du moteur de reconnaissance ;
- [x] zéro écriture localStorage dans Voice Replay ;
- [x] 4 familles Progression ;
- [x] smoke dédié ;
- [x] Progression smoke renforcé ;
- [ ] PR candidate ;
- [ ] quality / Options / nav / Progression / Listening / Session / Real Life III verts ;
- [ ] Field Feedback UX smoke vert ;
- [ ] merge `main` ;
- [ ] tribunal `main` vert ;
- [ ] Pages SUCCESS ;
- [ ] test iPhone de coexistence SpeechRecognition + MediaRecorder ;
- [ ] docs post-prod CLOS.

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
Session UX Build 25.2
```

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.