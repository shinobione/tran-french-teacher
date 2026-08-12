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
29. **L’indépendance visuelle ne justifie pas de casser une frontière de propriété DOM.**
30. Les anciens workflows CI protègent les **contrats**, pas les query-strings historiques d’un fichier qui peut légitimement évoluer.
31. **Une cardinalité DOM doit rester bornée dans le temps.**
32. **Tout le curriculum doit rester accessible sans être affiché simultanément.**
33. Pour un contrôle critique de disclosure, l’état visuel doit être déterministe dans le même geste utilisateur.
34. **Un panneau secondaire ouvert ne doit jamais écraser la largeur de la tâche principale.** Les layouts responsive importants sont protégés par des mesures de géométrie réelles, pas seulement par des sélecteurs CSS.
35. **Quand deux colonnes deviennent trop étroites, on empile.** Une pile lisible est préférable à deux colonnes théoriquement présentes mais inutilisables.

---

# Baseline production — v1.19.7 / Build 26.7

**Progress Open-Details Geometry — ✅ PROD / CLOS**

- commit runtime : `eaa4b9f8688a90de85a3f853dc29e59d0b8ac650` ;
- PR runtime **#54** ;
- PR : **13 workflows fonctionnels / 13 SUCCESS** ;
- `main` : **13 workflows fonctionnels / 13 SUCCESS** ;
- GitHub Pages : **#110 SUCCESS** ;
- ouverture `Détails d’apprentissage` ne compresse plus le parcours ;
- desktop large 1640×900 : flow **452 px**, Details **452 px**, ligne de leçon min **410 px** ;
- desktop compact 980×900 : pile verticale, flow **906 px**, ligne de leçon min **864 px** ;
- overflow horizontal = 0 sur les deux profils ;
- dashboard ouvert = 2 tuiles par ligne sur desktop large ;
- containment 26.6 conservé ;
- anti-prolifération 26.6 conservée : **12 → 12** ;
- curriculum humanisé 26.6 conservé : **5 étapes**, jamais 40 lignes simultanées ;
- single-scroll conservé ;
- mobile `<=860px` inchangé ;
- Conversation Exit Build 26.5 conservé ;
- Listening **0.88 / 0.65** ;
- Scenario **36 / 108** ;
- curriculum **40 / 241** ;
- aucune migration learner/Memory/Scenario/Listening ;
- `voice-ios.js`, `free-voice.js`, logo, favicon sanctuarisés ;
- coût 0 €.

Baseline historique protégée : **v1.17.0 — Build 24 — Real Life French II**, Scenario **28 situations / 84 tours** avant Pack III.

---

# Build 26.7 — critères clôturés

## 1. Retour terrain

Vidéo réelle : Détails fermé = Progress lisible ; Détails ouvert = colonne apprenante écrasée, texte vertical, grand vide inutile.

Cause : le track Details de Build 26.6 gardait `minmax(440px,1.06fr)` tandis que le learner flow pouvait descendre à zéro.

## 2. Desktop large

- [x] containment DOM 26.6 inchangé ;
- [x] Détails ouvert → `minmax(0,1fr) minmax(0,1fr)` ;
- [x] dashboard ouvert → 2 tuiles par ligne ;
- [x] Chrome 1640×900 ouvre réellement Détails ;
- [x] flow réel = **452 px** ;
- [x] Details réel = **452 px** ;
- [x] ligne de leçon min = **410 px** ;
- [x] côte à côte ;
- [x] overflow horizontal = 0.

## 3. Desktop compact / tablette paysage

- [x] 861–1040 px : Détails passe sous le learner flow ;
- [x] Chrome 980×900 ouvre réellement Détails ;
- [x] flow réel = **906 px** ;
- [x] ligne de leçon min = **864 px** ;
- [x] pile verticale confirmée ;
- [x] overflow horizontal = 0.

## 4. Régressions protégées

- [x] Build 26.6 containment / anti-photocopieuse ;
- [x] Build 26.6 curriculum 5 étapes ;
- [x] Build 26.4 single-scroll ;
- [x] Build 26.5 Conversation Exit ;
- [x] mobile 26.6 ;
- [x] learner l8 historique ;
- [x] voix / logo / favicon byte-identiques ;
- [x] curriculum 40/241 ;
- [x] Scenario 36/108 ;
- [x] Listening 0.88/0.65.

## 5. CI / release

- [x] workflow dédié Build 26.7 ;
- [x] workflow 26.6 rendu version-forward sans supprimer ses Chrome ;
- [x] PR #54 : **13/13 SUCCESS** ;
- [x] merge exact du head validé ;
- [x] runtime `eaa4b9f8688a90de85a3f853dc29e59d0b8ac650` ;
- [x] `main` : **13/13 SUCCESS** ;
- [x] GitHub Pages **#110 SUCCESS**.

---

# Build 26.6 — baseline conservée

## Dashboard Containment

- [x] Details descendant de la frontière historique ;
- [x] cardinalité stable après quiescence : **12 → 12** ;
- [x] `Autres détails` borné ;
- [x] cartes moteur uniques ;
- [x] Overview/Curriculum hors Details ;
- [x] aucune migration.

## Curriculum Humanization

- [x] vue normale = 5 leçons ;
- [x] 5 étapes ;
- [x] l8 = 8 lignes dans son étape ;
- [x] A1 Core = 15 lignes ;
- [x] 40 leçons accessibles ;
- [x] jamais 40 visibles simultanément ;
- [x] vrais clics Chrome.

Build 26.7 **supersède uniquement la géométrie ouverte desktop** de 26.6. Sa frontière DOM, son anti-prolifération et son parcours par étapes restent la baseline.

# Build 26.5 — baseline conservée / structure Progress supersédée

Conversation Exit, une colonne active et Tyffany/label séparés restent valides. La structure `Details` frère direct de `.progress-layout` reste supersédée par 26.6.

# Build 26.4 — baseline conservée

Single-scroll Progress et branding Tyffany restent actifs.

# Build 26.3 — baseline conservée

Today conserve ses contrôles stables et ses vraies destinations.

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
Progress Open-Details Geometry Build 26.7
```

Compatibilité interne conservée malgré le branding Tyffany : `LucieVoice`, `luc-*`, `lucie-*`.

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.
