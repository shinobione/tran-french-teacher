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
39. **Un wrapper large ne prouve pas qu’un écran est utilisable.** Les tests Focus mesurent les vraies cartes visibles, leur largeur et leur hauteur.
40. **Une famille active n’est prête que si son vrai contenu moteur est rendu.** Une toolbar sans carte visible est un échec, pas un état acceptable.

---

# Baseline production — v1.19.9 / Build 26.9

**Progress Focus Content Reliability — ✅ PROD / CLOS**

- runtime : `0b31eedb78daebd58dd9bdcb0a472d56250c8fff` ;
- PR runtime **#58** ;
- head PR certifié : `0fcb28038ef5bab5d138948c6d63b8fd963b2aab` ;
- PR : **15/15 workflows fonctionnels SUCCESS** ;
- `main` : **15/15 workflows fonctionnels SUCCESS** après rerun inchangé du seul runner 26.3 initialement rouge ;
- GitHub Pages : **#114 SUCCESS** ;
- chaque famille Focus possède au moins une vraie carte moteur visible ;
- panel desktop de certification : **918 px** ;
- famille à une carte : la carte occupe **918 px** ;
- familles multi-cartes : grille 2 colonnes autour de **452 px** par carte sur le viewport de certification ;
- mobile 390×844 : vraie carte visible, une colonne, aucun overflow horizontal ;
- Build 26.8 Focus Flow / round-trip intact ;
- Build 26.7 geometry intacte ;
- Build 26.6 containment / anti-prolifération intact ;
- curriculum **40 / 241** ;
- Scenario **36 / 108** ;
- Listening **0.88 / 0.65** ;
- aucune migration learner/Memory/Scenario/Listening ;
- voix, logo et favicon sanctuarisés ;
- coût 0 €.

Baseline historique protégée : **v1.17.0 — Build 24 — Real Life French II**, Scenario **28 situations / 84 tours** avant Pack III.

---

# Build 26.9 — critères clôturés

## 1. Retour terrain

- [x] vidéo réelle analysée ;
- [x] demi-largeur d’une famille à carte unique identifiée ;
- [x] état `toolbar visible + vrai contenu vide` identifié ;
- [x] cause classée comme synchronisation/présentation Focus, pas données pédagogiques absentes.

## 2. Fiabilité du Focus Détails

- [x] `ProgressDetailsDashboard` reste propriétaire de `activeKey` ;
- [x] aucun reparenting des cartes Memory/Mastery/Listening/Scenario ;
- [x] état `activeKey → hidden` réconcilié de façon idempotente ;
- [x] contenu considéré prêt seulement après vraie mesure d’une carte visible ;
- [x] retries de stabilisation bornés ;
- [x] carte unique span toute la grille Focus ;
- [x] aucun overflow horizontal.

## 3. Tribunal desktop multi-familles

Chrome `1640×900` exécute :

```text
Mémoire → retour
Maîtrise → retour
Compréhension orale → retour
Français réel → retour
A1 & rythme → retour
```

Preuves :

- [x] Mémoire : 3 cartes, panneau 918 px, cartes 452 px ;
- [x] Maîtrise : 2 cartes, panneau 918 px, cartes 452 px ;
- [x] Compréhension orale : 1 carte, 918 px ;
- [x] Français réel : 1 carte, 918 px ;
- [x] A1 & rythme : 4 cartes, panneau 918 px, cartes 452 px ;
- [x] toutes les familles ont une hauteur rendue non nulle.

## 4. Mobile

- [x] Chrome 390×844 ;
- [x] vraie carte Memory visible ;
- [x] largeur réelle >= seuil mobile ;
- [x] une colonne ;
- [x] aucun overflow horizontal.

## 5. Baselines historiques protégées

- [x] Build 26.8 Focus Flow + Curriculum Focus + round-trip 5 lignes ;
- [x] Build 26.7 wide/compact geometry ;
- [x] Build 26.6 containment / 12 → 12 ;
- [x] Build 26.5 Conversation Exit ;
- [x] Build 26.4 single-scroll ;
- [x] Build 26.3 interactions ;
- [x] Build 26.2 Listening 0.88 / 0.65 ;
- [x] Build 26.1 Voice Replay ;
- [x] learner l8 historique ;
- [x] voix / logo / favicon byte-identiques.

## 6. CI / release

- [x] workflow dédié Build 26.9 ;
- [x] workflow 26.8 rendu version-forward sans supprimer ses Chrome ;
- [x] PR #58 : **15/15 SUCCESS** ;
- [x] merge exact du head `0fcb2803…` ;
- [x] runtime `0b31eedb…` ;
- [x] premier passage main du smoke 26.3 : seul rouge, destination Lesson non atteinte dans son délai historique ;
- [x] même job **inchangé** rerun → Today + Progress desktop + Progress mobile SUCCESS ;
- [x] `main` final : **15/15 fonctionnels SUCCESS** ;
- [x] GitHub Pages **#114 SUCCESS**.

---

# Baselines conservées

## Build 26.8 — Progress Focus Flow

Toujours canonique pour : une intention prend l’écran, fade réversible, retour explicite, focus Curriculum, `prefers-reduced-motion` et round-trip vers 5 lignes compactes.

## Build 26.7 — Progress Open-Details Geometry

Toujours canonique pour la géométrie de la vue normale lorsque Détails est simplement ouvert.

## Build 26.6 — Progress Dashboard Containment + Humanized Curriculum

Toujours canonique pour la propriété DOM, la cardinalité **12 → 12** et le curriculum en 5 étapes.

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
Progress Focus Content Reliability Build 26.9
```

Compatibilité interne conservée malgré le branding Tyffany : `LucieVoice`, `luc-*`, `lucie-*`.

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.
