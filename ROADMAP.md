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
23. **Un contrôle visible ne doit pas être remplacé entre `pointerdown` et `click`.**
24. Les tests d’interaction vérifient la **destination réelle**, pas seulement la présence du bouton.
25. **Une page ne doit pas imposer deux scrolls verticaux concurrents sans nécessité forte.**
26. Un renommage produit ne justifie pas une migration technique risquée.
27. **Un mode visible doit toujours avoir une sortie déterministe.**
28. **Un seul mode actif ne doit pas hériter d’une grille conçue pour plusieurs modes simultanés.**
29. **L’indépendance visuelle ne justifie pas de casser une frontière de propriété DOM.** Les moteurs historiques doivent continuer à retrouver les nœuds qu’ils possèdent.
30. Les anciens workflows CI protègent les **contrats**, pas les query-strings historiques d’un fichier qui peut légitimement évoluer.
31. **Une cardinalité DOM doit rester bornée dans le temps.** Un `MutationObserver` ne doit jamais transformer un écran stable en générateur de cartes.
32. **Tout le curriculum doit rester accessible sans être affiché simultanément.** Le parcours complet utilise des étapes et une seule tranche ouverte à la fois.
33. Pour un contrôle critique de disclosure, l’état visuel doit être déterministe dans le même geste utilisateur, sans dépendre d’un futur frame pour devenir cohérent.

---

# Baseline production — v1.19.6 / Build 26.6

**Progress Dashboard Containment + Humanized Curriculum — ✅ PROD / CLOS**

- commit runtime : `7bb48979f21db0cf1cc94d7a9e03e225f2e1cc7a` ;
- PR runtime **#52** ;
- PR : **12 workflows fonctionnels / 12 SUCCESS** ;
- `main` : **12 workflows fonctionnels / 12 SUCCESS** ;
- GitHub Pages : **#108 SUCCESS** ;
- dashboard terrain runaway supprimé ;
- profil synthétique l8 : dashboard stabilisé **12 → 12** après observation, `Autres détails = 1` ;
- cartes moteur principales uniques, Overview/Curriculum interdits dans Details ;
- Progress desktop : deux colonnes visuelles conservées à l’intérieur de la frontière DOM historique ;
- single-scroll conservé ;
- curriculum compact : **5/40** ;
- parcours complet : **5 étapes**, une seule tranche de leçons visible ;
- position l8 : **8 leçons** dans l’étape courante ;
- A1 Core : **15 leçons** ;
- les **40** restent accessibles sans mur de 40 lignes ;
- `Voir tout le parcours` et changement d’étape couverts par de vrais clics Chrome ;
- Conversation Exit Build 26.5 conservé ;
- Listening **0.88 / 0.65** ;
- Scenario **36 / 108** ;
- curriculum **40 / 241** ;
- aucune migration learner/Memory/Scenario/Listening ;
- `voice-ios.js`, `free-voice.js`, logo, favicon sanctuarisés ;
- coût 0 €.

Baseline historique protégée : **v1.17.0 — Build 24 — Real Life French II**, Scenario **28 situations / 84 tours** avant Pack III.

---

# Build 26.6 — critères clôturés

## 1. Dashboard Containment

Retour terrain : `Autres détails` augmentait sans interaction jusqu’à plusieurs centaines de cartes.

Cause : Build 26.5 avait déplacé `Détails` hors de l’ancêtre historique dans lequel les moteurs recherchent leur propre carte. Ils la recréaient donc à chaque passage observer.

Après 26.6 :

```text
progress-layout
└── progress-ux-composition  ← frontière historique
    ├── progress-ux-left-flow
    │   ├── Overview
    │   └── Curriculum
    └── Details
```

Critères :

- [x] Details reste descendant de la frontière historique ;
- [x] rendu desktop toujours gauche / droite ;
- [x] Overview et Curriculum restent hors Details ;
- [x] chaque carte Dashboard a une famille stable ;
- [x] `Éléments appris` appartient à Mémoire ;
- [x] cardinalité attend la quiescence avant mesure ;
- [x] cardinalité stable dans le temps : **12 → 12** sur profil synthétique ;
- [x] `Autres détails` borné ;
- [x] cartes moteur principales uniques ;
- [x] aucun nested scroll ;
- [x] aucune migration.

## 2. Curriculum Humanization

- [x] vue normale = 5 leçons autour de la position actuelle ;
- [x] `Voir tout le parcours` ne montre plus 40 lignes ;
- [x] 5 étapes : Survie A0 / Vie quotidienne / Fondations A1 / Premiers échanges / A1 Core ;
- [x] l’étape actuelle s’ouvre par défaut ;
- [x] une seule étape expose ses leçons ;
- [x] à l8 : 8 lignes ;
- [x] A1 Core : 15 lignes ;
- [x] les 40 leçons restent toutes accessibles ;
- [x] vrai clic Chrome sur `Voir tout` ;
- [x] vrai clic Chrome sur `A1 Core` ;
- [x] transition flushée de façon déterministe ;
- [x] dashboard reste stable pendant la navigation des étapes.

## 3. Régressions historiques protégées

- [x] Build 25 Progression UX ;
- [x] Build 25.2 Session UX ;
- [x] Build 26 Real Life III ;
- [x] Build 26.1 Voice Replay + Details Dashboard ;
- [x] Build 26.2 Listening 0.88 / 0.65 ;
- [x] Build 26.3 interactions ;
- [x] Build 26.4 single-scroll + Tyffany ;
- [x] Build 26.5 `Changer de pratique` pointer + click ;
- [x] mobile Résumé → Curriculum compact → Détails repliés.

## 4. CI / release

- [x] workflow dédié Build 26.6 ;
- [x] anti-prolifération temporelle ;
- [x] navigation réelle par étapes ;
- [x] PR #52 : **12/12 SUCCESS** ;
- [x] merge exact du head validé ;
- [x] runtime `7bb48979f21db0cf1cc94d7a9e03e225f2e1cc7a` ;
- [x] `main` : **12/12 SUCCESS** ;
- [x] GitHub Pages **#108 SUCCESS**.

---

# Build 26.5 — baseline conservée / implémentation Progress partiellement supersédée

Toujours valides : Conversation Exit, une colonne active, Tyffany/label séparés, gap Overview→Curriculum compact, deux colonnes visuelles, mobile et single-scroll.

**Supersédé en 26.6 :** `Details` n’est plus enfant direct de `.progress-layout`. Cette structure cassait la frontière de propriété des moteurs. L’indépendance visuelle est désormais fournie par une grille imbriquée dans l’ancêtre historique.

# Build 26.4 — baseline conservée

Single-scroll Progress et branding Tyffany restent actifs.

# Build 26.3 — baseline conservée

Today conserve ses contrôles stables et ses vraies destinations. L’intention 2 colonnes reste valide.

# Build 26.2 — baseline conservée

Clic Détails déterministe et Listening effectif **0.88 normal / 0.65 lent**.

# Build 26.1 — baseline conservée / gate terrain iPhone

Voice Self-Playback reste livré mais le gate réel iPhone est toujours ouvert :

- [ ] réponse reconnue → seconde prise locale → lecture correcte → réponse vocale suivante toujours reconnue normalement.

La capture simultanée exacte du premier essai reste hors scope tant que cette coexistence n’est pas prouvée.

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
Progress Dashboard Containment Build 26.6
```

Compatibilité interne conservée malgré le branding Tyffany : `LucieVoice`, `luc-*`, `lucie-*`.

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.
