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
13. `Aujourd’hui / Pratiquer / Progrès` gardent des nœuds persistants et un état déterministe.
14. Progressive disclosure : tous les moteurs et compteurs ne sont pas visibles par défaut.
15. Chaque activité possède un objectif, une progression, une fin et une sortie évidente.
16. Pas de tunnel pédagogique infini par défaut.
17. Succès visible et agréable, sans gamification agressive.
18. Pendant une vraie session de Trân : pas de polish runtime/cache sauf incident critique.
19. Une fonction d’auto-écoute ne doit jamais dégrader la reconnaissance vocale validée.
20. Les détails pédagogiques peuvent être riches, mais jamais affichés comme un dump vertical permanent.
21. Un mode `Lent` doit être **effectivement plus lent dans la couche voix finale**.
22. Les surfaces critiques ont un contrat de clic navigateur réel.
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
36. **Une intention active peut prendre l’écran et masquer temporairement le contexte non nécessaire.**
37. **L’animation ne possède jamais l’état métier.**
38. `prefers-reduced-motion` doit conserver le même flux fonctionnel sans animation.
39. **Un wrapper large ne prouve pas qu’un écran est utilisable.** Les tests mesurent le contenu réel.
40. **Une famille active n’est prête que si son vrai contenu moteur est rendu.**
41. **L’interface apprenante n’est pas le cockpit des moteurs.**
42. **Une page = une intention principale.**
43. **Desktop agrandit une app ; il ne transforme pas l’app en dashboard SaaS.**
44. **La tab bar possède un seul état actif à la fois**, visuellement et sémantiquement.
45. **Une page plein écran ne chevauche jamais la tab bar persistante.**

---

# Baseline production — v1.20.0 / Build 27

## App Shell Reset — ✅ PROD / CLOS

- runtime : `beeb9ce8ba081ed0298edbcc339dca41600e4d09` ;
- PR runtime : **#60** ;
- head PR certifié : `dba27d35b59b78bb63b1bf930c5f47b119feff36` ;
- PR : **16/16 workflows fonctionnels SUCCESS** ;
- `main` : **16/16 fonctionnels SUCCESS** après rerun inchangé du seul premier flake historique 26.8 ;
- GitHub Pages : **#116 SUCCESS** ;
- total runtime `main` : **17/17 SUCCESS Pages incluse** ;
- revue visuelle CI : Home / Practice / Progress / Journey / mobile ;
- curriculum **40 / 241** ;
- Scenario **36 / 108** ;
- Listening **0.88 / 0.65** ;
- coût 0 €.

### Aujourd’hui

- [x] une seule prochaine leçon dominante ;
- [x] un seul CTA principal ;
- [x] exactement deux raccourcis : Réviser / Écouter ;
- [x] ancien dashboard Home invisible côté apprenante ;
- [x] desktop 1640×900 : Home mesurée **672 px** de haut ;
- [x] mobile 390×844 : une colonne, zéro overflow horizontal.

### Pratiquer

- [x] vraie page dédiée ;
- [x] 4 intentions : Parler / Écouter / Réviser / Dans la vraie vie ;
- [x] priorité aux situations personnelles Jerry quand disponibles ;
- [x] bouton retour explicite ;
- [x] tab `Pratiquer` unique active ;
- [x] page alignée exactement au-dessus de la tab bar ;
- [x] feedback pointer + tap echo mobile.

### Progrès

- [x] position A0 → A1 ;
- [x] prochaine leçon ;
- [x] étape actuelle ;
- [x] 5 leçons utiles autour de la position ;
- [x] aucun cockpit Memory/Mastery/Listening/Scenario dans l’UX normale ;
- [x] cockpit historique uniquement en DEBUG FR ;
- [x] accès au Parcours complet dédié.

### Parcours complet

- [x] 5 étapes ;
- [x] une seule étape expose ses leçons ;
- [x] A1 Core = 15 leçons ;
- [x] desktop multi-colonnes lorsque utile ;
- [x] mobile 1 colonne ;
- [x] aucun ghost de Progrès après transition.

### Navigation / mouvement

- [x] bottom nav historique conservée comme bus ;
- [x] nœuds persistants ;
- [x] une seule tab active ;
- [x] `prefers-reduced-motion` ;
- [x] fade / translate court ;
- [x] animation découplée de la destination.

### Tribunal Build 27

```text
Home
→ Pratiquer
→ retour
→ Progrès
→ Parcours complet
→ A1 Core
→ retour
→ vraie leçon
```

- [x] desktop 1640×900 ;
- [x] mobile 390×844 ;
- [x] 4 actions Practice ;
- [x] 5 lignes Progress ;
- [x] 5 étapes ;
- [x] A1 Core 15 lignes ;
- [x] vraie leçon atteinte ;
- [x] zéro overflow horizontal ;
- [x] captures visuelles hors transition ;
- [x] nav physique réelle.

### Baselines historiques préservées

- [x] Build 26.9 Content Reliability ;
- [x] Build 26.8 round-trip ;
- [x] Build 26.7 geometry ;
- [x] Build 26.6 containment / **12 → 12** ;
- [x] Build 26.5 Conversation Exit ;
- [x] Build 26.4 single-scroll ;
- [x] Build 26.3 interactions ;
- [x] Build 26.1 Voice Replay ;
- [x] Session / Listening / Options / nav ;
- [x] learner historique ;
- [x] voix / logo / favicon byte-identiques.

Baseline historique protégée : **v1.17.0 — Build 24 — Real Life French II**, Scenario **28 situations / 84 tours** avant Pack III. `real-life-data-2.js` reste un marqueur canonique.

---

# Build 26.1 — gate terrain iPhone toujours ouvert

- [ ] réponse reconnue → seconde prise locale → lecture correcte → réponse vocale suivante toujours reconnue normalement.

---

# v1.21.0 — Build 28 — Data & Recovery Hardening

**Prochain gros chantier après le gate terrain / validation visuelle réelle du shell.**

- sauvegarde/restauration cohérente ;
- migrations versionnées ;
- snapshot avant migration ;
- localStorage corrompu toléré ;
- tests zéro-perte ;
- rollback documenté.

# v1.22.0 — Build 29 — iPhone / PWA / Accessibility Hardening

Safe areas, tactile, contraste, tailles, offline/install et vrais tests iPhone.

# v1.23.0 — Build 30 — Architecture Hardening

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