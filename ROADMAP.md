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
57. **La répétition orale doit être espacée et variée.**
58. **Un acquis dû/fragile n’est réinjecté dans une leçon que s’il reste pertinent pour son contexte.**
59. **Une fonction déjà présente dans l’exercice ne doit pas être dupliquée dans une couche pédagogique ajoutée.**
60. **Un libellé d’action doit dire ce que l’action va réellement faire.**
61. **Un refactor d’architecture commence par rendre les frontières explicites avant de déplacer le code.**
62. **Une nouvelle frontière runtime ne devient jamais propriétaire silencieusement d’un store existant.**
63. **Le cœur historique reste témoin de référence tant que son remplacement n’a pas une preuve comparative navigateur.**
64. **Les routes principales possèdent une façade stable indépendante des détails DOM historiques.**
65. **Un hardening d’architecture ne doit pas modifier les données learner pour prouver qu’il fonctionne.**
66. **Une release majeure peut être un freeze.**
67. **Une baseline de release doit exister sous forme machine-readable et documentaire.**
68. **Une release ne passe pas si son propre tribunal peut rester bloqué indéfiniment.**
69. **Les tests Chrome critiques sont bornés, isolés et gardent leurs assertions fonctionnelles.**
70. **Après un freeze, aucune V2.x/V3 ne démarre sans nouveau problème utilisateur ou roadmap explicite.**
71. **Un niveau interne doit séparer compétence estimée et confiance dans cette estimation.**
72. **Une non-reconnaissance vocale n’est jamais une preuve suffisante de mauvaise prononciation.**
73. **Un modèle apprenant peut lire plusieurs stores, mais n’en devient pas propriétaire par commodité.**
74. **Une extension de curriculum répond à des capacités manquantes, pas à un objectif arbitraire de nombre de leçons.**
75. **Toute Memory v2 qui change le schéma durable passe par Recovery, migration transactionnelle et ancien-utilisateur avant adoption.**
76. **Une baseline gelée et un produit successeur sont deux faits distincts : faire évoluer le second ne réécrit pas la première.**
77. **Une extension de contenu conserve l’ordre et les IDs historiques avant d’ajouter de nouveaux éléments.**
78. **Un nouvel acquis important doit être réutilisable en pratique réelle, écoute ou rappel ; une carte isolée n’est pas une progression.**
79. **Une migration de mémoire n’est pas un refactor de structure : elle exige snapshot, validation, rollback, compat backups et preuve ancien-utilisateur.**

---

# ✅ V2.2.0 — Build 32 · Practical A1 Expansion — PROD / CLOS

Objectif atteint : **étendre ce que Trân sait réellement faire en français tout en conservant les preuves historiques et les données existantes**.

## Audit + curriculum

- [x] audit des capacités 1–40 avant ajout ;
- [x] baseline historique **40 leçons / 241 éléments** rejouable ;
- [x] Stage 4 ajouté à la suite : **12 leçons / 72 éléments** ;
- [x] produit courant : **52 leçons / 313 éléments** ;
- [x] 313 IDs uniques ;
- [x] ordre des 40 premières leçons et 241 premiers acquis inchangé ;
- [x] nouvelle étape **Autonomie A1 — 41–46** ;
- [x] nouvelle étape **Interaction A1 — 47–52**.

Capacités ajoutées : clarification/reformulation, quantités, comparaison/choix, invitations/refus, rendez-vous médical, pharmacie, travail/consignes, panne/logement, perturbations transport, récit ordonné, avis simple et `on` oral.

## Réutilisation

- [x] Real Life Pack IV : **8 situations / 24 tours** ;
- [x] Scenario courant : **44 / 132** ;
- [x] zéro ID de preuve invalide dans Pack IV ;
- [x] Listening II : **4 contrastes + 8 mini-dialogues** ;
- [x] zéro ID invalide Listening II ;
- [x] Speaking Loop étendu dynamiquement à **52/52**, toujours max 2 moments / leçon ;
- [x] vitesses Listening finales **0.88 / 0.65** inchangées.

## Learner Intelligence 2.2

- [x] **7 bandes / 52 leçons / 313 éléments** ;
- [x] Autonomie A1 et Interaction A1 intégrées au raisonnement ;
- [x] `A1+` autorisé uniquement comme étiquette adaptative interne ;
- [x] niveau et confiance toujours séparés ;
- [x] `voice-*` reste classé `recognition`, jamais score phonétique ;
- [x] modèle read-only vis-à-vis des stores durables.

## Compatibilité / données

- [x] aucun nouveau store ;
- [x] aucune migration ;
- [x] ancien profil exact : **7 terminées / l8=4 / 40 acquis → prochaine l8** ;
- [x] profil ayant terminé l1–l40 → **prochaine l41** ;
- [x] six stores byte-identiques pendant les audits ;
- [x] Build31 rejouable en **2.1 / 31 / 40–241 / 5 bandes** ;
- [x] `release-v2.json` reste **2.0.0 / Architecture Build30 / 40–241** ;
- [x] tribunal V2 exige que le produit courant soit un superset compatible ;
- [x] sanctuaires voix/core/branding exacts.

## Certification

- [x] PR runtime **#79**, head `b64539e8f463bde8cabc05cd606f3132b01e2da8` : **25/25 fonctionnels SUCCESS** ;
- [x] runtime `main` **`269cb0b476ea131cfbe086a87bcc4364ec39c342`** : **26/26 SUCCESS, Pages comprise** ;
- [x] GitHub Pages **#137 SUCCESS** sur ce SHA exact ;
- [x] Chrome desktop : 52/313, 7 étapes, 6 leçons Autonomie + 6 Interaction ;
- [x] Chrome mobile 390×844 : ancien profil intact, zéro overflow horizontal ;
- [x] V2 Freeze Compatibility, Build31, Build30, Recovery, iPhone/PWA, Speaking et anciens parcours tous verts.

**Definition of Done Build 32 : atteinte.**

---

# 🧠 Build 33 — Memory Evidence v2 / Migration Readiness — PLANNED

Objectif : **concevoir une mémoire plus riche sans modifier le stockage durable tant qu’une migration réversible n’est pas prouvée.**

Build 33 est d’abord un chantier de modèle + migration readiness, pas une excuse pour créer un septième store pendant la nuit.

## 33.1 — Modèle de preuves

- [ ] définir les dimensions utiles : `retrieval`, `listening`, `scenario`, `text`, `recognition`, assistance, récence, répétition et récupération ;
- [ ] distinguer exposition, réussite assistée, rappel autonome et réutilisation contextuelle ;
- [ ] définir comment la confiance Learner Intelligence utilise ces preuves sans surpondérer un seul canal ;
- [ ] conserver la neutralité voix : reconnaissance ≠ phonétique.

## 33.2 — Schéma candidat

- [ ] documenter le schéma Memory Evidence v2 ;
- [ ] décider objectivement entre migration in-place et nouveau store ;
- [ ] définir bornes d’historique / taille locale ;
- [ ] définir compat lecture avec l’ancien schéma ;
- [ ] vérifier backup V1/V2 et exports existants.

## 33.3 — Recovery / migration readiness

Avant toute écriture du nouveau schéma :

1. [ ] snapshot `pre-migration` ;
2. [ ] validation complète de la source ;
3. [ ] transformation déterministe ;
4. [ ] écriture transactionnelle ;
5. [ ] relecture/vérification ;
6. [ ] rollback intégral si un invariant échoue ;
7. [ ] quarantaine des données invalides ;
8. [ ] ancien-utilisateur `l8=4` inchangé ;
9. [ ] vieux backups ne détruisent aucune preuve moderne ;
10. [ ] comparaison avant/après sur vrais navigateurs.

## Definition of Done Build 33

> **Le nouveau modèle de preuve et sa migration sont spécifiés, simulables et réversibles ; aucun nouveau schéma durable n’est adopté tant que ce contrat n’est pas démontré.**

Une éventuelle migration runtime deviendra un build séparé **uniquement si Build 33 ferme tous ces critères**.

---

# 📱 Gate terrain iPhone — parallèle / encore ouvert

- [ ] réponse Free Voice reconnue → seconde prise locale → lecture correcte → réponse vocale suivante toujours reconnue normalement.

Ce gate ne bloque ni Build 32, ni le design Memory v2. Il bloque uniquement une future évolution vers **l’enregistrement automatique du premier essai exact** pendant SpeechRecognition.

---

# ✅ V2.1.0 — Build 31 · Learner Intelligence Core — PROD / CLOS

- [x] modèle read-only progression + Memory + Error ;
- [x] cinq bandes historiques couvrant **40/241** ;
- [x] score interne + confiance séparée ;
- [x] recommandation déterministe ;
- [x] PR #77 : 24/24 fonctionnels ;
- [x] runtime `e2b2c6293f35495fa8bbffd2e6b684fba897df88` : 25/25 Pages comprise ;
- [x] Pages #135 ;
- [x] ancien profil l8 exact ;
- [x] aucun store/migration.

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

Le produit courant évolue **au-dessus** de cette photographie sans la réécrire.

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