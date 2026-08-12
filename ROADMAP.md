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
12. Toute surface tappable donne un retour visuel immédiat.
13. `Aujourd’hui / Pratiquer / Parcours` gardent des nœuds persistants et un état déterministe.
14. Progressive disclosure : tous les moteurs et compteurs ne sont pas visibles par défaut.
15. Chaque activité possède un objectif, une progression, une fin et une sortie évidente.
16. Pas de tunnel pédagogique infini par défaut.
17. Succès visible et agréable, sans gamification agressive.
18. Pendant une vraie session de Trân : pas de polish runtime/cache sauf incident critique.
19. Une fonction d’auto-écoute ne doit jamais dégrader la reconnaissance vocale validée.
20. Les détails pédagogiques peuvent être riches, mais jamais affichés comme un dump vertical permanent.
21. Un mode `Lent` doit être **effectivement plus lent dans la couche voix finale**.
22. Les surfaces repliables critiques ont un contrat de clic navigateur réel.
23. **Un contrôle visible ne doit pas être remplacé entre `pointerdown` et `click`.**
24. Les tests d’interaction vérifient la destination réelle.
25. **Une page ne doit pas imposer deux scrolls verticaux concurrents sans nécessité forte.**
26. Un renommage produit ne justifie pas une migration technique risquée.
27. **Un mode visible doit toujours avoir une sortie déterministe.**
28. **Un seul mode actif ne doit pas hériter d’une grille conçue pour plusieurs modes.**
29. **L’indépendance visuelle ne justifie pas de casser une frontière de propriété DOM.**
30. Les anciens workflows CI protègent les contrats, pas les versions historiques globales.
31. **Une cardinalité DOM doit rester bornée dans le temps.**
32. **Tout le curriculum doit rester accessible sans être affiché simultanément.**
33. Un disclosure critique devient cohérent dans le même geste utilisateur.
34. **Un panneau secondaire ouvert ne doit jamais écraser la largeur de la tâche principale.**
35. **Quand deux colonnes deviennent trop étroites, on empile.**
36. **Une intention active peut prendre l’écran et masquer temporairement le contexte non nécessaire.** Le retour doit restaurer exactement la vue précédente.
37. **L’animation ne possède jamais l’état métier.** Un fade peut continuer visuellement après que la transition fonctionnelle est déjà validée.
38. `prefers-reduced-motion` doit conserver le même flux fonctionnel sans animation.

---

# Baseline production — v1.19.8 / Build 26.8

**Progress Focus Flow — ✅ PROD / CLOS**

- runtime : `1084e1d71a7aebbf6d7dcea9dfa0cabb44f6cbe1` ;
- PR runtime **#56** ;
- PR : **14/14 workflows fonctionnels SUCCESS** ;
- `main` : **14/14 workflows fonctionnels SUCCESS** ;
- GitHub Pages : **#112 SUCCESS** ;
- vue Progress normale compacte ;
- famille Détails active = focus pleine surface ;
- `Voir tout le parcours` = focus Curriculum pleine surface ;
- retour Détails et retour Curriculum explicites ;
- round-trip réel restauré à **5 lignes compactes** ;
- desktop 1640×900 : surface Focus mesurée **920 px**, aucun overflow horizontal ;
- mobile 390×844 : focus une colonne, aucun overflow horizontal ;
- shell focalisé peut utiliser jusqu’à **1420 px** sur grand desktop ;
- `prefers-reduced-motion` supporté ;
- containment Build 26.6 intact ;
- anti-prolifération Build 26.6 intacte : **12 → 12** ;
- géométrie Build 26.7 intacte ;
- curriculum **40 / 241** ;
- Scenario **36 / 108** ;
- Listening **0.88 / 0.65** ;
- aucune migration learner/Memory/Scenario/Listening ;
- voix, logo et favicon sanctuarisés ;
- coût 0 €.

Baseline historique protégée : **v1.17.0 — Build 24 — Real Life French II**, Scenario **28 situations / 84 tours** avant Pack III.

---

# Build 26.8 — critères clôturés

## 1. Focus Détails

- [x] clic sur une famille réellement observé ;
- [x] learner flow masqué pendant le focus ;
- [x] grille de familles masquée ;
- [x] famille choisie visible seule ;
- [x] toolbar de retour explicite ;
- [x] surface grand desktop >= 900 px ;
- [x] cartes en 2 colonnes lorsque l’espace le permet ;
- [x] 1 colonne sur écran étroit/mobile ;
- [x] aucun overflow horizontal ;
- [x] containment 26.6 conservé.

## 2. Focus Curriculum

- [x] `Voir tout le parcours` masque Résumé + Détails ;
- [x] Curriculum utilise toute la surface ;
- [x] 5 étapes horizontales sur grand desktop ;
- [x] leçons en 2 colonnes sur grand desktop ;
- [x] responsive 2/1 colonnes ;
- [x] `Retour au résumé` explicite ;
- [x] jamais 40 leçons visibles simultanément.

## 3. Round-trip humain

Chrome exécute :

```text
compact
→ Memory focus
→ retour
→ Curriculum focus
→ retour
```

Critères :

- [x] aucun focus actif à la fin ;
- [x] aucune famille active ;
- [x] curriculum compact restauré à **5 lignes** ;
- [x] transitions idempotentes sous MutationObserver ;
- [x] sorties pilotées par les API propriétaires du dashboard/curriculum ;
- [x] état logique découplé de la fin cosmétique du fade.

## 4. Responsive / accessibilité mouvement

- [x] desktop large utilise davantage l’écran ;
- [x] mobile 390×844 sans overflow horizontal ;
- [x] toolbar compacte mobile ;
- [x] `prefers-reduced-motion` supprime l’animation sans changer le flux.

## 5. Régressions historiques protégées

- [x] Build 26.6 containment / anti-photocopieuse ;
- [x] Build 26.6 curriculum 5 étapes ;
- [x] Build 26.7 wide/compact geometry ;
- [x] Build 26.5 Conversation Exit ;
- [x] Build 26.4 single-scroll ;
- [x] Build 26.3 interactions ;
- [x] Build 26.2 Listening 0.88 / 0.65 ;
- [x] Build 26.1 Voice Replay ;
- [x] learner l8 historique ;
- [x] voix / logo / favicon byte-identiques.

---

# Baselines conservées

## Build 26.7 — Progress Open-Details Geometry

Toujours sous Chrome : deux colonnes utilisables sur desktop large, pile lisible sur desktop compact. Build 26.8 supersède seulement la **présentation quand un focus est actif**.

## Build 26.6 — Progress Dashboard Containment + Humanized Curriculum

Toujours canonique pour la propriété DOM et la cardinalité : **12 → 12** après quiescence, cartes moteur uniques, 5 étapes curriculum.

## Build 26.5 → 26.2

Conversation Exit, single-scroll, interactions stables, clic Détails déterministe et Listening **0.88 / 0.65** restent actifs.

## Build 26.1 — gate terrain iPhone

Voice Self-Playback reste livré. Gate encore ouvert :

- [ ] réponse reconnue → seconde prise locale → lecture correcte → réponse vocale suivante toujours reconnue normalement.

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
Progress Focus Flow Build 26.8
```

Compatibilité interne conservée malgré le branding Tyffany : `LucieVoice`, `luc-*`, `lucie-*`.

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.
