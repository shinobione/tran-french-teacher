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
21. Un mode `Lent` doit être effectivement plus lent dans la couche voix finale.
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
46. **Une donnée durable invalide ne doit jamais devenir silencieusement une donnée neuve.**
47. **Un restore multi-store est transactionnel : validation, écriture, vérification, rollback.**
48. **Tout import/migration/reset destructif possède un snapshot préalable.**
49. **Un vieux backup ne peut pas effacer une donnée moderne qu’il ne connaissait pas.**
50. **Les données corrompues sont mises en quarantaine avant d’être écartées.**
51. **Le Recovery Engine doit agir avant le runtime susceptible d’initialiser un état neuf.**
52. **Les réglages dépendants de l’appareil ne deviennent pas automatiquement des données pédagogiques portables.**
53. **L’auto-écoute est un outil pédagogique ponctuel, jamais une obligation à chaque mot.**
54. **Pas de score de prononciation si le produit ne possède pas une vraie mesure phonétique.**
55. **Le modèle vocal et l’enregistrement local restent séparés de la progression durable.**
56. **Une cible de compréhension ne devient pas automatiquement une cible de production orale.**
57. **La répétition orale doit être espacée et variée ; pas de même cible servie en boucle quand une alternative cohérente existe.**
58. **Un acquis dû/fragile n’est réinjecté dans une leçon que s’il reste pertinent pour son contexte.**
59. **Une fonction déjà présente dans l’exercice ne doit pas être dupliquée dans une couche pédagogique ajoutée.**
60. **Un libellé d’action doit dire ce que l’action va réellement faire.**

---

# Baseline production — v1.22.2 / Build 29.2

## Speaking Loop Variety & Clarity — ✅ PROD / CLOS

- PR runtime **#68** ; head certifié `947896ff8eed75aa805be63cc24821b1c2247980` ;
- runtime `b6031cd8fa6756eee39496cd62a164b8400d15af` ;
- PR : **20/20 workflows fonctionnels SUCCESS** ;
- `main` : **20/20 workflows fonctionnels SUCCESS** ;
- l’ancien smoke Build 26.8 a montré son flake historique `curriculum-clicked` sur PR/main et a été rerun **sans changement de code** jusqu’au passage complet ; ses tests Details/Curriculum de 920 px restaient verts ;
- GitHub Pages **#126 SUCCESS** sur le SHA runtime exact ;
- total runtime `main` : **21/21 SUCCESS Pages incluse** ;
- curriculum **40 / 241** ; Scenario **36 / 108** ; Listening **0.88 / 0.65** ; coût 0 €.

### Clarté UI

- [x] `↻ Ghi âm lại` côté Trân ;
- [x] `↻ Enregistrer à nouveau` en DEBUG FR ;
- [x] bouton audio natif `🔊 Nghe Tyffany` / `🔊 Écouter Tyffany` ;
- [x] courte explication indiquant que Tyffany fournit le modèle ;
- [x] zéro bouton Tyffany dupliqué lorsque l’exercice possède déjà son playback ;
- [x] un seul bouton modèle au recap final, où aucun playback natif n’existe.

### Contrat pédagogique

- [x] challenge de compréhension séparé de la cible de production orale ;
- [x] deuxième moment déplacé sur la fin de leçon sous forme de `recap` ;
- [x] deux cibles distinctes par leçon ;
- [x] nombres/unités isolés fortement défavorisés comme cibles orales ;
- [x] réutilisation d’un acquis déjà connu uniquement si le contexte correspond ;
- [x] Learning Memory consultée en lecture seule pour favoriser fragile/dû/learning ;
- [x] fenêtre récente anti-répétition ;
- [x] aucun `localStorage.setItem` depuis le planificateur oral ;
- [x] toujours **2 moments maximum**.

### Régression Bài 7 verrouillée

Le challenge canonique reste :

```text
« dix euros » → 10 euros
```

Mais la cible orale finale attendue, avec les acquis précédents, est :

```text
Combien ça coûte ?
```

Le tribunal 29.2 prouve également qu’une seconde planification avec les deux cibles récentes choisit une autre alternative cohérente.

### Terrain audio

- [x] la lecture de **sa propre voix** après enregistrement fonctionne dans le flux local ;
- [ ] gate Free Voice complet sur vrai iPhone : reconnaissance → seconde prise → lecture → **reconnaissance suivante** toujours normale.

---

# Build 26.1 — gate terrain iPhone toujours ouvert

- [ ] réponse Free Voice reconnue → seconde prise locale → lecture correcte → réponse vocale suivante toujours reconnue normalement.

Tant que ce gate n’est pas validé, **pas d’enregistrement automatique du premier essai exact** pendant la reconnaissance Safari.

---

# v1.23.0 — Build 30 — Architecture Hardening

Après le retour terrain : réduire le monolithe historique sans changer le comportement, clarifier propriétaires DOM/state/routing, conserver Recovery, App Shell, iPhone hardening et Speaking Loop, avec snapshots comparatifs.

# V2.0.0 — Freeze / Release

Release cohérente, sauvegardable, restaurable, testée et documentée.

## Baseline historique protégée

**v1.17.0 — Build 24 — Real Life French II** : **28 situations / 84 tours** avant Pack III ; `real-life-data-2.js` reste canonique.

## Sanctuaires

```text
francais-avec-luc:learner:v1
french-tranquille:learning-memory:v1
french-tranquille:error-intelligence:v1
french-tranquille:scenarios:v1
french-tranquille:listening:v1
french-tranquille:milestones:v1
french-tranquille:recovery:last-good:v1
french-tranquille:recovery:pre-restore:v1
french-tranquille:recovery:pre-migration:v1
french-tranquille:recovery:pre-reset:v1
french-tranquille:recovery:quarantine:v1
french-tranquille:safety:pre-build22:v1
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

Compatibilité interne conservée malgré le branding Tyffany : `LucieVoice`, `luc-*`, `lucie-*`.

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.
