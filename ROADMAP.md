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
66. **Une release majeure peut être un freeze : elle n’a pas besoin d’ajouter une feature pour être utile.**
67. **Une baseline de release doit exister sous forme de contrat machine-readable et sous forme documentaire.**
68. **Une release ne passe pas si son propre tribunal peut rester bloqué indéfiniment.**
69. **Les tests Chrome critiques sont bornés, isolés et gardent leurs assertions fonctionnelles.**
70. **Après un freeze, aucune V2.x/V3 ne démarre sans nouveau problème utilisateur ou roadmap explicite.**

---

# ✅ V2.0.0 — Freeze / Release — PROD / CLOS

Objectif atteint : **certifier ce qui existe comme release cohérente, sans ajouter de moteur.**

## Baseline gelée

- [x] curriculum **40 / 241** ;
- [x] Scenario **36 / 108** ;
- [x] Listening **0.88 / 0.65** ;
- [x] Speaking Loop **max 2 moments / leçon** ;
- [x] six stores durables Recovery ;
- [x] coût récurrent **0 €** ;
- [x] Architecture **Build 30** ;
- [x] version visible **v2.0.0 • Build 30** ;
- [x] contrat machine `release-v2.json`.

## Certification

- [x] PR runtime V2 **#73**, head `c221fa9600d23dd83b87225cc4accce01e83cfe6` : **22/22 fonctionnels SUCCESS** ;
- [x] runtime applicatif `5f2c486b3e455220ebd903f25ee766ff2430e4a5` ;
- [x] GitHub Pages runtime **#131 SUCCESS** ;
- [x] Recovery / backup / restore / rollback sous tribunaux historiques ;
- [x] App Shell et navigation learner certifiés ;
- [x] iPhone/PWA/offline/a11y certifiés ;
- [x] Speaking Loop / Tyffany / variété / auto-écoute locale certifiés ;
- [x] Runtime Contracts / Runtime Bridge Build 30 certifiés ;
- [x] round-trip ancienne utilisatrice : **7 terminées / l8=4 / 40 acquis** ;
- [x] stores durables byte-identiques avant/après le tribunal V2 ;
- [x] matrice desktop + mobile ;
- [x] zéro migration/renommage des stores ;
- [x] sanctuaires hashés.

## Stabilisation finale du tribunal

Sur le runtime mergé, l’ancien workflow Build 25 Progression UX a reproduit un **Chrome headless non borné** alors qu’il avait passé sur la PR V2. Aucune régression produit n’était observée.

- [x] PR CI-only **#74** : un seul YAML ;
- [x] mêmes quatre scénarios et mêmes assertions Progression ;
- [x] profils Chrome isolés ;
- [x] timeout + kill-after ;
- [x] retries bornés ;
- [x] head #74 `0fbd3b8e8124b3beaf7d6086d8a837580abb2cb3` : **22/22 fonctionnels SUCCESS** ;
- [x] baseline finale `main` `6e0f5cde97cfba0572efccc6344a8bd6cbe7a315` : **23/23 SUCCESS**, Pages comprise ;
- [x] GitHub Pages **#132 SUCCESS**.

## Definition of Done V2

> **cohérente, sauvegardable, restaurable, utilisable sans connaître l’architecture, testée sur les parcours principaux et documentée avec une baseline reproductible.**

**Atteint.**

---

# 📱 Gate terrain iPhone — parallèle / encore ouvert

- [ ] réponse Free Voice reconnue → seconde prise locale → lecture correcte → réponse vocale suivante toujours reconnue normalement.

Ce gate ne remet pas V2 en cause. Il bloque seulement une évolution future vers **l’enregistrement automatique du premier essai exact** pendant SpeechRecognition.

---

# Après V2 — observation / maintenance

Aucun Build 31 n’est pré-engagé.

Ordre canonique :

1. [ ] laisser Trân utiliser la V2 normalement ;
2. [ ] collecter uniquement des problèmes ou besoins terrain observables ;
3. [ ] valider le gate iPhone Voice Replay quand possible ;
4. [ ] corriger seulement crash, perte de données, blocage critique ou régression prouvée pendant le freeze ;
5. [ ] ouvrir une future roadmap V2.x/V3 seulement à partir d’un besoin utilisateur clair.

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
app.js
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

Compatibilité interne conservée malgré le branding Tyffany : `LucieVoice`, `luc-*`, `lucie-*`.

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.
