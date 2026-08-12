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
61. **Un refactor d’architecture commence par rendre les frontières explicites avant de déplacer le code.**
62. **Une nouvelle frontière runtime ne devient jamais propriétaire silencieusement d’un store existant.**
63. **Le cœur historique reste témoin de référence tant que son remplacement n’a pas une preuve comparative navigateur.**
64. **Les routes principales possèdent une façade stable indépendante des détails DOM historiques.**
65. **Un hardening d’architecture ne doit pas modifier les données learner pour prouver qu’il fonctionne.**

---

# Baseline production — v1.23.0 / Build 30

## Architecture Hardening — ✅ PROD / CLOS

- PR runtime **#71** ; head certifié `ffa3ddf7a16dcbc32474701cfaf2f961e86d348c` ;
- runtime `5a8369df9df536f41521acefb528da71efb168a8` ;
- PR : **21/21 workflows fonctionnels SUCCESS** ;
- un ancien Chrome Real Life III a échoué une fois à la leçon 35 puis a repassé **inchangé** les leçons 20 / 35 / 40 ; aucune rustine runtime n’a été ajoutée ;
- runtime `main` : **21/21 workflows fonctionnels SUCCESS** ;
- GitHub Pages runtime **#129 SUCCESS** sur le SHA exact ;
- total runtime `main` : **22/22 SUCCESS Pages incluse** ;
- curriculum **40 / 241** ; Scenario **36 / 108** ; Listening **0.88 / 0.65** ; coût 0 €.

### Frontière Architecture

- [x] `runtime-contracts.js` centralise stores, snapshots, invariants, routes, propriétaires, phases de boot et sanctuaires ;
- [x] contrats gelés / lecture seule ;
- [x] `runtime-bridge.js` fournit `snapshot`, `refresh`, `route` et `openLesson` ;
- [x] aucune écriture `localStorage.setItem` depuis le contrat ou le bridge ;
- [x] owners APIs explicites ;
- [x] six stores durables explicites ;
- [x] ordre de boot logique documenté ;
- [x] nouvelles frontières précachées par la PWA.

### Tribunal comparatif

- [x] `app.js` byte-identique ;
- [x] `voice-ios.js` / `free-voice.js` byte-identiques ;
- [x] logo / favicon byte-identiques ;
- [x] Chrome desktop **1440×900** ;
- [x] Chrome mobile **390×844** ;
- [x] runtime boundary prête ;
- [x] 40 leçons / 241 éléments ;
- [x] Recovery / Build 27 Shell / Speaking Loop présents ;
- [x] navigation réelle `Progrès → Aujourd’hui → Pratiquer` via le bridge ;
- [x] learner raw JSON **strictement identique avant/après** ;
- [x] un seul onglet actif ;
- [x] zéro overflow horizontal.

### Ce que Build 30 n’a volontairement PAS fait

- [x] aucune migration de learner ;
- [x] aucun renommage des clés historiques ;
- [x] aucun changement voix / Safari ;
- [x] aucun nouveau curriculum ;
- [x] aucune refonte visible ;
- [x] aucune réécriture big-bang de `app.js`.

---

# Build 26.1 — gate terrain iPhone toujours ouvert

- [ ] réponse Free Voice reconnue → seconde prise locale → lecture correcte → réponse vocale suivante toujours reconnue normalement.

Tant que ce gate n’est pas validé, **pas d’enregistrement automatique du premier essai exact** pendant la reconnaissance Safari.

Ce gate terrain reste **parallèle** à la release V2 ; il protège uniquement l’éventuelle évolution vers l’enregistrement automatique du premier essai.

---

# V2.0.0 — Freeze / Release — PROCHAIN JALON

Objectif : **ne pas ajouter de moteur**. Certifier ce qui existe comme release cohérente.

## Scope

- [ ] geler la baseline produit `40 / 241`, Scenario `36 / 108`, Listening `0.88 / 0.65` ;
- [ ] certifier Recovery / backup / restore / rollback ;
- [ ] certifier App Shell et navigation learner ;
- [ ] certifier iPhone/PWA/offline/a11y ;
- [ ] certifier Speaking Loop / variété / Tyffany / auto-écoute locale ;
- [ ] certifier Runtime Contracts / Runtime Bridge Build 30 ;
- [ ] effectuer un round-trip ancien utilisateur ;
- [ ] effectuer une matrice navigateur desktop + mobile ;
- [ ] vérifier zéro migration/écriture inattendue au boot ;
- [ ] synchroniser README / ROADMAP / CHANGELOG / ARCHITECTURE ;
- [ ] tag/release seulement après tribunal final.

## Definition of Done V2

La release est :

> **cohérente, sauvegardable, restaurable, utilisable sans connaître l’architecture, testée sur les parcours principaux et documentée avec une baseline reproductible.**

---

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
