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
21. Un mode `Lent` doit être **effectivement plus lent dans la couche voix finale**, pas seulement porter une valeur différente dans le moteur appelant.
22. Les surfaces repliables critiques doivent avoir un contrat de clic navigateur réel, pas seulement exister dans le DOM.

---

# Baseline production — v1.19.2 / Build 26.2

**Click + Listening Rate Hotfix — ✅ PROD**

- commit production : `4d1d224aa4eb6612fe6b0dc997f3871bbb502317` ;
- PR #42 ;
- **8 workflows / 8 SUCCESS** sur PR puis `main` ;
- GitHub Pages **#100 SUCCESS** ;
- Progression UX Build 25 intact ;
- `Détails d’apprentissage` : clic explicite/déterministe validé dans Chrome ;
- Listening : **0.88 normal / 0.65 lent effectif** ;
- Session UX Build 25.2 intact ;
- Real Life French III Build 26 intact : **36 situations / 108 tours** ;
- Voice Replay + Details Dashboard Build 26.1 intact ;
- curriculum : **40 leçons / 241 éléments** ;
- voix/branding sanctuarisés ;
- aucune migration de données apprenantes ;
- coût 0 €.

Baseline historique protégée : **v1.17.0 — Build 24 — Real Life French II**, Scenario **28 situations / 84 tours** avant Pack III.

---

# Build 26.2 — critères clôturés

## Retour terrain : clic Détails

La vidéo terrain montre un clic sur `Parcours → Détails d’apprentissage` sans ouverture alors qu’un clic de leçon juste après fonctionne.

Correction :

- `<details>` conservé ;
- interception explicite du clic `summary` ;
- `preventDefault()` puis toggle contrôlé par `progression-ux.js` ;
- dataset de diagnostic d’ouverture ;
- vrai Chrome clique le résumé et doit constater l’état `open`.

Critères :

- [x] clic réel `Détails` ouvre le panneau ;
- [x] deuxième logique de toggle disponible sans réimplémenter le dashboard ;
- [x] dashboard Build 26.1 toujours groupé ;
- [x] Memory + Mastery toujours présents ;
- [x] curriculum 40 leçons toujours accessible.

## Retour terrain : Listening lent

Cause auditée :

```text
Listening slow request = 0.68
bridge ancien         = 0.64
voice-ios minimum     = 0.65
0.64 rejeté           → fallback ~0.84
```

Donc le comportement réellement entendu était proche de :

```text
Normal = 0.88
Lent   = ~0.84
```

Build 26.2 utilise le plancher déjà autorisé par la couche voix :

```text
Normal = 0.88
Lent   = 0.65
```

Critères :

- [x] `voice-ios.js` byte-identique ;
- [x] `free-voice.js` byte-identique ;
- [x] normal effectif 0.88 ;
- [x] lent effectif 0.65 ;
- [x] Session UX 5/5 reste valide ;
- [x] Listening-rate smoke protège le rate final ;
- [x] cache/version `v1.19.2 / Build 26.2` cohérents ;
- [x] quality / Options / nav / Progression / Listening / Session UX / Real Life III / Build 26.1 verts ;
- [x] même tribunal `main` vert ;
- [x] Pages #100 SUCCESS.

---

# Build 26.1 — état conservé

## Voice Self-Playback

Après une réponse reconnue, Free Voice peut proposer :

```text
🎧 Écoute-toi
[ 🎙️ M’enregistrer pour me réécouter ]
          ↓
[ ▶ Réécouter ma voix ] [ ↻ Refaire ]
```

Le choix reste volontairement conservateur : la reconnaissance se termine **avant** l’ouverture de cette seconde prise locale.

Contrat : local uniquement, aucune persistance, aucun upload, aucun effet sur Memory/Error/Mastery/Session, capture max 9 secondes, pistes micro stoppées, Blob URL révoquée, et reconnaissance pédagogique toujours utilisable si la capture échoue.

## Learning Details Dashboard

`Parcours → Détails d’apprentissage` reste regroupé par intention :

```text
🧠 Mémoire & révisions
🎯 Maîtrise
🎧 Compréhension orale
🎭 Français réel
🧩 A1 & rythme
```

Une seule famille détaillée est ouverte à la fois ; les cartes historiques restent les vrais nœuds DOM et toute future carte non classifiée tombe dans `Autres détails`.

### Gate terrain restant

- [ ] **test réel sur l’iPhone de Trân :** réponse reconnue → seconde prise locale → lecture correcte → réponse vocale suivante toujours reconnue normalement.

La capture simultanée exacte du premier essai reste hors scope tant que cette coexistence n’est pas prouvée.

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
Voice Replay + Details Dashboard Build 26.1
```

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.