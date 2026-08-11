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
19. Une fonction d’auto-écoute ne doit jamais dégrader la reconnaissance vocale validée ; sur iPhone la capture secondaire locale est prioritaire tant que la capture simultanée n’est pas prouvée sûre.
20. Les détails pédagogiques peuvent être riches, mais ils doivent être **groupés par intention** et jamais affichés comme un dump vertical de l’architecture interne.

---

# Baseline production — v1.18.2 / Build 25.2

**Session Goals / Milestones / App Delight — ✅ PROD / CLOS**

- `Parcours` compact via Build 25 ;
- Listening effectif : **0.88 normal / 0.64 lent** via Build 25.1 ;
- sessions bornées et sorties explicites via Build 25.2 ;
- Practice Hub : un seul moteur dominant ;
- Home : 2 actions principales + extras repliés ;
- milestones séparés des données pédagogiques ;
- 40 leçons / 241 éléments ;
- Scenario 28 / 84 ;
- voix/branding sanctuarisés ;
- coût 0 €.

Preuve production Build 25.2 : commit `49d866bed59bb0cb3268e1675225a4811f6c595f`, 7 workflows déclenchés, aucun échec, Pages SUCCESS.

Baseline fonctionnelle historique conservée pour les contrats CI : **v1.17.0 — Build 24 — Real Life French II**.

---

# v1.18.3 — Build 25.3 — Voice Self-Playback + Learning Details Dashboard — EN COURS

## Retours terrain

1. Trân veut pouvoir écouter sa propre voix après un exercice oral afin de comparer ce qu’elle produit au modèle de Lucie.
2. `Parcours → Détails d’apprentissage` est encore trop long : les moteurs sont repliés derrière un seul menu mais restent ensuite empilés verticalement.

## Voice Self-Playback

La reconnaissance existante est un sanctuaire. Build 25.3 **ne modifie ni `free-voice.js` ni `voice-ios.js`**.

Après une réponse vocale reconnue :

```text
🎧 Écoute-toi
[ 🎙️ M’enregistrer pour me réécouter ]
```

Trân répète une fois la même réponse pendant une capture locale indépendante. Après arrêt :

```text
[ ▶ Réécouter ma voix ]   [ ↻ Refaire ]
```

Contrat :

- `MediaRecorder` / `getUserMedia` seulement si disponibles ;
- aucun upload réseau ;
- aucune persistance ;
- Blob URL temporaire révoquée ;
- piste micro arrêtée ;
- arrêt automatique de sécurité après 9 s ;
- si la capture locale n’est pas disponible, l’exercice vocal continue sans elle ;
- capture simultanée exacte du premier essai reportée après test iPhone réel.

## Learning Details Dashboard

`Détails d’apprentissage` reste une seule entrée repliable, puis affiche des catégories compactes :

```text
🧠 Mémoire & révisions
🎯 Maîtrise
🎧 Compréhension orale
🎭 Français réel
🧩 A1 & rythme
```

Règles :

- seules les catégories réellement présentes sont affichées ;
- **une seule catégorie détaillée à la fois** ;
- les cartes Memory/Error/Mastery/A1/Listening/Scenario/Adaptive restent dans le DOM ;
- les moteurs continuent à mettre à jour leurs cartes sans connaître le dashboard ;
- toute future carte non reconnue est conservée dans `Autres détails` ;
- aucune donnée apprenante n’est créée ou migrée par le dashboard.

## Critères de clôture Build 25.3

- version `v1.18.3 / Build 25.3` et cache cohérents ;
- `voice-replay.js/css` et `progress-details-dashboard.js/css` câblés et précachés ;
- replay local sans `fetch`, `sendBeacon`, `FormData`, `XMLHttpRequest` ni `localStorage.setItem` ;
- `free-voice.js`, `voice-ios.js`, logo et favicon byte-identiques ;
- vrai Chrome : au moins 3 catégories de détails sur profil l8 ;
- vrai Chrome : Memory et Mastery restent présents ;
- vrai Chrome : une seule catégorie est active dans le smoke ;
- vrai Chrome : surface de replay apparaît après une réponse vocale synthétique ;
- anciens quality / Options / nav / Progression / Listening-rate / Session UX restent verts ;
- nouveau smoke Build 25.3 vert sur PR puis `main` ;
- Pages SUCCESS ;
- test iPhone réel recommandé avant d’envisager l’enregistrement simultané du premier essai ;
- docs CLOS après production.

---

# v1.19.0 — Build 26 — Real Life French III — APRÈS 25.3

## Intention

Une fois les deux retours UX fermés, enrichir `Pratiquer → Parler français` sans ajouter de nouveau bouton principal.

Objectif : **moins de roulettes, plus de compréhension du français oral réel, réponses légèrement plus libres mais toujours déterministes/locales**.

## Principes

- le français oral naturel peut apparaître côté interlocuteur : `T’es prête ?`, `J’sais pas`, `Y a pas…` ;
- Trân peut répondre en français standard ;
- plusieurs formulations simples équivalentes peuvent être acceptées ;
- aucune pseudo-IA locale qui “devine” arbitrairement le sens ;
- les réponses acceptées restent explicitement définies ;
- les références Memory doivent résoudre exactement un acquis ;
- le Scenario Engine reste propriétaire de ses stats/persistance ;
- Session UX 25.2 doit continuer à borner une session à **1 situation**.

## Pack III cible

8 situations / 24 tours prévues autour de :

1. comprendre Jerry quand il parle vite ;
2. futur proche : `Je vais appeler Jerry.` ;
3. passé récent : `Je viens de rentrer.` ;
4. passé composé : `J’ai mangé.` ;
5. mouvement : `Je suis rentrée à la maison.` ;
6. administratif : `Pouvez-vous m’expliquer ?` ;
7. émotion / besoin : `Je suis inquiète.` / `J’ai besoin de parler.` ;
8. couple : `Tu me manques.`.

Le pack préparatoire historique `real-life-data-3.js` / `real-life-coach.js` doit être **porté sur la baseline 25.3**, pas mergé tel quel depuis son ancienne branche.

## UX

Dans les scènes Pack III seulement, Lucie peut afficher discrètement :

> `Tu peux répondre avec tes mots. Une phrase simple qui exprime la bonne idée suffit.`

Pas de nouveau réglage, mode ou bouton.

## Critères de clôture Build 26

- version `v1.19.0 / Build 26` et cache cohérents ;
- 8 nouvelles situations / 24 tours ;
- Scenario total attendu : **36 situations / 108 tours** si aucun doublon supprimé ;
- aucun clone d’une situation existante ;
- toutes les références `memoryQueries` résolvent exactement 1 acquis ;
- les réponses semi-libres restent déterministes et testables ;
- Pack III disponible selon les leçons requises ;
- catalogue visible toujours limité par la logique existante ;
- Session UX 25.2 reste fonctionnelle : objectif `1 situation`, fin et sortie ;
- profil ancien utilisateur / l8 intact ;
- voix, reconnaissance, logo, favicon byte-identiques ;
- quality / Options / nav / Progression / Listening-rate / Session UX / Build25.3 verts ;
- nouveau smoke Real Life III vert sur PR puis `main` ;
- Pages SUCCESS ;
- docs CLOS après production.

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
```

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.