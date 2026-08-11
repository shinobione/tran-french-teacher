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
15. Chaque activité possède un objectif, une progression, une fin et une sortie évidente.
16. Pas de tunnel pédagogique infini par défaut.
17. Succès visible et agréable, sans gamification agressive.
18. Pendant une vraie session de Trân : pas de polish runtime/cache sauf incident critique.
19. Une fonction d’auto-écoute ne doit jamais dégrader la reconnaissance vocale validée.
20. Les détails pédagogiques peuvent être riches, mais ils doivent être groupés par intention et jamais affichés comme un dump vertical.
21. Un mode `Lent` doit être **effectivement plus lent dans la couche voix finale**.
22. Les surfaces repliables critiques ont un contrat de clic navigateur réel.
23. **Un contrôle visible ne doit pas être remplacé entre `pointerdown` et `click`.** Les couches DOM récentes doivent être idempotentes et ne pas se disputer les mêmes nœuds.
24. Les tests d’interaction vérifient la **destination réelle**, pas seulement la présence du bouton.
25. **Une page ne doit pas imposer deux scrolls verticaux concurrents sans nécessité forte.** Sur Progress desktop, le document est le propriétaire du scroll.
26. Un renommage produit ne justifie pas une migration technique risquée : les identifiants historiques peuvent rester internes si l’UI visible est cohérente.
27. **Un mode visible doit toujours avoir une sortie déterministe.** Touch/pointer et click/clavier doivent rejoindre la même destination.
28. **Un seul mode actif ne doit pas hériter d’une grille conçue pour plusieurs modes simultanés.**
29. **Deux colonnes visuelles doivent être structurellement indépendantes lorsque leur hauteur peut diverger fortement.** Un long détail à droite ne doit pas créer un trou dans le parcours gauche.
30. Les anciens workflows CI protègent les **contrats**, pas les numéros de query-string historiques d’un fichier qui peut légitimement évoluer.

---

# Baseline production — v1.19.5 / Build 26.5

**Conversation Exit + Layout Repair — ✅ PROD / CLOS**

- commit runtime production : `2cd29f20faa8db850f92c343074809cc91b42c76` ;
- PR runtime **#49** ;
- PR : **11 workflows fonctionnels / 11 SUCCESS** ;
- `main` runtime : **11 workflows fonctionnels / 11 SUCCESS** ;
- GitHub Pages runtime : **#106 SUCCESS** ;
- Conversation : `Changer de pratique` retourne au hub par pointer/tactile **et** click/clavier ;
- Conversation desktop : un seul mode actif = une seule colonne de travail centrée ;
- Progress desktop : Résumé + Curriculum dans une colonne gauche indépendante, Details à droite ;
- gap Résumé → Curriculum vérifié entre **0 et 48 px** même avec `Maîtrise` long ;
- Build 26.4 single-scroll conservé : **aucun scroll imbriqué**, document propriétaire du scroll ;
- mobile : Résumé → Curriculum compact **5/40** → Détails repliés ;
- Tyffany reste le nom visible de la professeure ;
- Progression UX Build 25 intact ;
- Listening : **0.88 normal / 0.65 lent effectif** ;
- Session UX Build 25.2 intact ;
- Real Life French III Build 26 : **36 situations / 108 tours** ;
- Voice Replay + Details Dashboard Build 26.1 intact ;
- curriculum : **40 leçons / 241 éléments** ;
- `voice-ios.js` / `free-voice.js` / logo / favicon sanctuarisés ;
- aucune migration de données apprenantes ;
- coût 0 €.

Baseline historique protégée : **v1.17.0 — Build 24 — Real Life French II**, Scenario **28 situations / 84 tours** avant Pack III.

---

# Build 26.5 — critères clôturés

## Conversation Exit

Retour terrain : `Changer de pratique` recevait le feedback visuel mais pouvait rester inerte et enfermer Conversation en pratique guidée.

Cause : le handler global existait déjà, mais la surface Conversation reste composée par plusieurs couches à base de mutations DOM. Dépendre uniquement d’un événement global pendant cette recomposition était trop fragile.

Correction :

- [x] `setPracticeMode(mode)` devient la transition explicite/synchrone ;
- [x] `setPracticeMode(null)` reconstruit immédiatement le hub ;
- [x] binding direct du contrôle visible ;
- [x] `pointerup` couvert ;
- [x] `click` couvert ;
- [x] Chrome exige la destination `hub` après les deux chemins ;
- [x] aucun changement de donnée learner/Memory/Scenario/Listening.

## Conversation Layout

Cause : vieille grille Build 14 conçue pour `Free Voice | Guided Practice`, alors que Build 25.2 n’affiche plus qu’un mode actif.

Critères :

- [x] hub de pratique = une colonne ;
- [x] mode actif = une colonne centrée ;
- [x] bouton retour et carte active alignés dans la même colonne ;
- [x] plus de grand vide entre le retour et la carte ;
- [x] `Tyffany` et `Pratique guidée` ne sont plus collés visuellement ;
- [x] mobile reste naturellement en une colonne.

## Progress — colonnes indépendantes

Avant 26.5 :

```text
Résumé      | Details
Curriculum  | Details
```

`Details` couvrait deux lignes. Après suppression correcte de son scroll interne en 26.4, une grande hauteur à droite pouvait étirer ces lignes et pousser le Curriculum gauche très loin vers le bas.

Après 26.5 :

```text
.progress-layout
├── colonne gauche
│   ├── Overview
│   └── Curriculum
└── Details
```

Critères :

- [x] Details = enfant direct de `.progress-layout` ;
- [x] Curriculum = enfant de la colonne gauche ;
- [x] Overview + Curriculum possèdent leur propre flux vertical compact ;
- [x] Chrome ouvre réellement `Maîtrise` ;
- [x] gap Overview → Curriculum compris entre **0 et 48 px** ;
- [x] gauche et droite côte à côte sur desktop ;
- [x] nested scroll = 0 ;
- [x] page scrollable = 1 ;
- [x] profil l8 conserve 7 leçons terminées / 40 acquis ;
- [x] mobile : Overview → Curriculum → Details ;
- [x] mobile : Details replié ;
- [x] mobile : curriculum **5 / 40**.

## CI / release

- [x] workflow dédié Build 26.5 ;
- [x] Session UX historique rendu durable vis-à-vis des versions propriétaires ;
- [x] Progression UX historique rendu durable ;
- [x] Build 26.4 continue de protéger Tyffany + single-scroll sans figer le build global ;
- [x] Build 26.3 protège son intention structurelle/Today sans imposer éternellement `display:contents` ;
- [x] Build 26.1 Chrome isolé + retries bornés + timeouts ;
- [x] PR #49 : **11/11 SUCCESS** ;
- [x] merge exact du head validé ;
- [x] commit runtime `2cd29f20faa8db850f92c343074809cc91b42c76` ;
- [x] `main` : **11/11 SUCCESS** ;
- [x] GitHub Pages **#106 SUCCESS**.

---

# Build 26.4 — baseline conservée

## Single-scroll Progress

- [x] `max-height:none` ;
- [x] `overflow:visible` ;
- [x] aucun nested scroll ;
- [x] page propriétaire du scroll ;
- [x] Tyffany visible ;
- [x] `voice-ios.js` / `free-voice.js` byte-identiques ;
- [x] identifiants `LucieVoice`, `luc-*`, `lucie-*` conservés comme compatibilité ;
- [x] clé learner `francais-avec-luc:learner:v1` conservée.

Build 26.5 **supersède uniquement la composition de grille** héritée de 26.3 : la politique single-scroll de 26.4 reste intacte.

# Build 26.3 — baseline conservée

Today conserve ses contrôles stables et ses vraies destinations. Le layout 2 colonnes reste l’intention produit, mais l’implémentation historique `display: contents` est désormais **supersédée par Build 26.5** pour rendre les colonnes réellement indépendantes.

# Build 26.2 — baseline conservée

- clic `Détails d’apprentissage` déterministe ;
- Listening effectif : **0.88 normal / 0.65 lent** ;
- `voice-ios.js` / `free-voice.js` byte-identiques ;
- aucune migration.

# Build 26.1 — baseline conservée / gate terrain iPhone

## Voice Self-Playback

Après une réponse reconnue, Free Voice propose une **seconde prise locale volontaire** destinée à l’auto-écoute. Aucun upload, aucune persistance, aucun effet sur Memory/Error/Mastery/Session, capture max 9 secondes, pistes micro stoppées.

### Gate terrain restant

- [ ] **test réel sur l’iPhone de Trân :** réponse reconnue → seconde prise locale → lecture correcte → réponse vocale suivante toujours reconnue normalement.

La capture simultanée exacte du premier essai reste hors scope tant que cette coexistence n’est pas prouvée.

## Learning Details Dashboard

Familles conservées :

```text
🧠 Mémoire & révisions
🎯 Maîtrise
🎧 Compréhension orale
🎭 Français réel
🧩 A1 & rythme
⋯ Autres détails
```

---

# v1.20.0 — Build 27 — Data & Recovery Hardening

**Prochain gros chantier après le gate iPhone.**

- sauvegarde/restauration cohérente ;
- migrations versionnées ;
- snapshot avant migration ;
- localStorage corrompu toléré ;
- tests zéro-perte ;
- rollback documenté.

# v1.21.0 — Build 28 — iPhone / PWA / Accessibility Hardening

Safe areas, tactile, contraste, tailles, offline/install et vrais tests iPhone.

# v1.22.0 — Build 29 — Architecture Hardening

Découpage du noyau uniquement avec snapshots comparatifs ; pas de grande réécriture cosmétique du cœur.

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
bottom navigation compatibility bus
Progression UX Build 25
Session UX Build 25.2
Real Life III Build 26
Voice Replay + Details Dashboard Build 26.1
Click + Listening Rate Build 26.2
Single-scroll + Tyffany Build 26.4
```

Compatibilité interne conservée malgré le branding Tyffany : `LucieVoice`, `luc-*`, `lucie-*`.

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.
