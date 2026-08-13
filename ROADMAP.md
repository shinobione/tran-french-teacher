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
71. **Un niveau interne doit séparer compétence estimée et confiance dans cette estimation.**
72. **Une non-reconnaissance vocale n’est jamais une preuve suffisante de mauvaise prononciation.**
73. **Un modèle apprenant peut lire plusieurs stores, mais n’en devient pas propriétaire par commodité.**
74. **Une extension de curriculum répond à des capacités manquantes, pas à un objectif arbitraire de nombre de leçons.**
75. **Toute Memory v2 qui change le schéma durable passe par Recovery, migration transactionnelle et ancien-utilisateur avant adoption.**

---

# ✅ V2.1.0 — Build 31 · Learner Intelligence Core — PROD / CLOS

Objectif : **unifier le cerveau apprenant avant d’étendre le curriculum**.

## Livré

- [x] modèle read-only sur progression + Learning Memory + Error Intelligence ;
- [x] cinq bandes cohérentes couvrant exactement **40 leçons / 241 éléments** ;
- [x] indice interne + confiance séparée ;
- [x] estimation interne `A0 / A0+ / Pré-A1 / A1- / A1` ;
- [x] recommandation unique : review / lesson / practice / maintain ;
- [x] carte compacte dans **Progrès**, détails repliés par défaut ;
- [x] aucun nouvel onglet ;
- [x] aucun nouveau store, aucune migration, aucune écriture durable Build31 ;
- [x] `voice-unrecognized` reste un signal **recognition**, jamais une note phonétique ;
- [x] version produit **v2.1.0 • Build 31** ;
- [x] Architecture Runtime toujours gelée **2.0.0 • Build 30** ;
- [x] `release-v2.json` reste la baseline gelée 2.0.0 / 30 ;
- [x] PWA précache Build31 additif, identité de cache validée inchangée.

## Certification

- [x] PR runtime **#77**, head `eed097ca3d261f2f4dd60db930a11670511f33a1` : **24/24 fonctionnels SUCCESS** ;
- [x] runtime `main` `e2b2c6293f35495fa8bbffd2e6b684fba897df88` : **25/25 SUCCESS Pages comprise** ;
- [x] GitHub Pages **#135 SUCCESS** sur ce SHA ;
- [x] clean learner → recommandation **leçon 1** ;
- [x] ancien profil → **7 terminées / l8=4 / 40 acquis** et recommandation **leçon 8** ;
- [x] stores durables byte-identiques avant/après ;
- [x] Chrome desktop + mobile 390×844 ;
- [x] V2 Freeze Compatibility et Build30 Architecture verts ;
- [x] voix/iPhone sanctuarisés et inchangés.

---

# ▶️ V2.2.0 — Build 32 · Content Map & Practical A1 Expansion — NEXT

Objectif : **étendre ce que Trân sait réellement faire en français**, pas simplement augmenter le nombre de cartes.

## 32.1 — Audit de capacités 1–40

- [ ] cartographier chaque leçon existante par intention communicative : demander, refuser, expliquer, clarifier, raconter, comparer, résoudre un problème, etc. ;
- [ ] identifier les trous A1 pratiques après la leçon 40 ;
- [ ] détecter les doublons de vocabulaire ou structures avant d’ajouter du contenu ;
- [ ] conserver le vietnamien comme soutien adaptatif, pas comme béquille fixe ;
- [ ] lister les capacités qui ont besoin de Scenario/Listening plutôt que d’une leçon isolée.

## 32.2 — Leçons 41+

Candidats prioritaires à valider par l’audit :

- [ ] expliquer un problème simple et demander de l’aide ;
- [ ] prendre / déplacer / annuler un rendez-vous ;
- [ ] logement : panne, voisinage, propriétaire, livraison ;
- [ ] santé quotidienne : symptômes simples, pharmacie, rendez-vous ;
- [ ] transport : retard, correspondance, billet, direction ;
- [ ] travail quotidien : horaires, consignes, incompréhension, demande de répétition ;
- [ ] raconter brièvement hier / un événement récent ;
- [ ] parler d’un projet proche et d’une préférence ;
- [ ] gérer prix, quantité, comparaison et choix avec plus d’autonomie ;
- [ ] conversation sociale : inviter, accepter/refuser poliment, proposer une alternative.

Critère : chaque nouvelle leçon doit apporter **une capacité de communication identifiable** et réutilisable dans au moins un autre moteur.

## 32.3 — Réutilisation

- [ ] nouveaux items branchés sur Learning Memory existante sans migration ;
- [ ] nouveaux items compatibles Learner Intelligence ;
- [ ] Scenario/Listening enrichis seulement si la capacité gagne réellement à être réutilisée en contexte ;
- [ ] Speaking Loop reste max 2 moments / leçon ;
- [ ] aucun changement du pipeline exact-first-attempt iPhone.

## Definition of Done Build 32

> **Le curriculum couvre davantage de situations A1 utiles, chaque ajout a une raison communicative, et l’ancien profil reste intact.**

---

# ⏭️ V2.3.x — Memory Evidence v2 — APRÈS CONTENT MAP

Pas de migration précipitée.

Objectif envisagé : conserver davantage de preuves par **modalité et contexte** (retrieval, listening, scenario, text, recognition), afin que la confiance du modèle reflète mieux la réutilisation réelle.

Avant tout code :

1. [ ] définir le schéma v2 ;
2. [ ] décider migration in-place ou nouveau store ;
3. [ ] snapshot Recovery pré-migration ;
4. [ ] migration transactionnelle + rollback ;
5. [ ] compat vieux backups ;
6. [ ] smoke ancien utilisateur ;
7. [ ] seulement ensuite brancher Learner Intelligence sur les nouvelles preuves.

---

# 📱 Gate terrain iPhone — parallèle / encore ouvert

- [ ] réponse Free Voice reconnue → seconde prise locale → lecture correcte → réponse vocale suivante toujours reconnue normalement.

Ce gate ne bloque **ni Build 32 Content**, ni l’audit de niveaux, ni le travail futur de mémoire. Il bloque uniquement une évolution vers **l’enregistrement automatique du premier essai exact** pendant SpeechRecognition.

---

# ✅ V2.0.0 — Freeze / Release — BASELINE GELÉE

La baseline machine `release-v2.json` reste volontairement :

- curriculum **40 / 241** au moment du freeze ;
- Scenario **36 / 108** ;
- Listening **0.88 / 0.65** ;
- Speaking Loop **max 2** ;
- six stores Recovery ;
- coût **0 €** ;
- Architecture **Build 30** ;
- release `2.0.0`.

La V2.1 évolue **au-dessus** de cette architecture sans réécrire la baseline historique.

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