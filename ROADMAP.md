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
55. **Le modèle vocal et l’enregistrement local doivent rester séparés de la progression durable.**

---

# Baseline production — v1.22.0 / Build 29

## iPhone / PWA / Accessibility Hardening — ✅ PROD / CLOS

- runtime : `1c01648d89dfb3bd9236b9ad93fbade4e21102fa` ;
- PR runtime : **#64** ;
- head PR certifié : `27c67ee7b47b9f9a015e6c0072640e0e573de52d` ;
- `main` : **19/19 SUCCESS** après rerun inchangé du seul ancien contrôle Build 27 visuel ;
- GitHub Pages : **#120 SUCCESS** ;
- curriculum **40 / 241** ;
- Scenario **36 / 108** ;
- Listening **0.88 / 0.65** ;
- coût 0 €.

### iPhone / PWA

- [x] safe areas / `viewport-fit=cover` ;
- [x] cibles tactiles coarse-pointer ≥44 px ;
- [x] focus clavier visible ;
- [x] `aria-current` / progressbar / live regions ;
- [x] `VisualViewport` pour clavier virtuel ;
- [x] mode standalone détecté ;
- [x] petits/grands viewports ;
- [x] paysage compact ;
- [x] textes longs / overflow ;
- [x] reduced motion ;
- [x] contraste renforcé ;
- [x] manifest PWA ;
- [x] boot offline après chauffe Service Worker ;
- [x] matrice Chrome 320×568 / 390×844 / 430×932.

### Expérience #65

- [x] isolation Service Worker des anciens smoke harnesses explorée ;
- [x] expérience jugée inutile : vieux contrôle visuel Build 27 toujours instable ;
- [x] PR #65 **fermée sans merge** ;
- [x] aucun runtime #65 en production.

---

# v1.22.1 — Build 29.1 — Speaking Loop Content

**Candidat actuel — PR #66.**

Objectif : intégrer la réécoute demandée par Trân directement dans le contenu des leçons, sans casser la voix ni la reconnaissance existantes.

### Contrat pédagogique

- [x] sélectionner une phrase utile par leçon depuis le curriculum réel ;
- [x] ajouter un second moment après réussite de la situation finale ;
- [x] **2 moments maximum par leçon** ;
- [x] couvrir les **40 leçons** sans modifier la baseline 40/241 ;
- [x] modèle vocal Tyffany ;
- [x] seconde prise locale volontaire ;
- [x] lecture de sa propre voix ;
- [x] possibilité de réécouter Tyffany et de refaire ;
- [x] `Continuer` reste disponible ;
- [x] aucun score de prononciation inventé.

### Sécurité

- [x] `getUserMedia` seulement après clic explicite ;
- [x] enregistrement local ≤9 s ;
- [x] aucun upload ;
- [x] aucune persistance learner/Memory/backup ;
- [x] nettoyage Blob au changement d’étape/page ;
- [x] `voice-ios.js` byte-identique ;
- [x] `free-voice.js` byte-identique ;
- [x] logo / favicon byte-identiques.

### Tribunal candidat

- [x] vraie Leçon 1 ouverte dans Chrome ;
- [x] Speaking Loop de contenu visible ;
- [x] quiz réels traversés ;
- [x] situation finale réussie ;
- [x] Speaking Loop final visible ;
- [x] mobile `390×844` ;
- [x] overflow horizontal = 0 ;
- [x] cible tactile ≥44 px ;
- [x] Build 29 PWA/offline toujours testé ;
- [x] Build 28 Recovery toujours testé ;
- [x] Voice Replay 26.1 toujours testé.

### Avant merge

- [ ] tous les workflows historiques + 29.1 verts sur le même head ;
- [ ] docs candidat synchronisés ;
- [ ] merge PR #66 ;
- [ ] tribunal `main` ;
- [ ] GitHub Pages sur le SHA runtime ;
- [ ] clôture docs-only PROD/CLOS.

---

# Build 26.1 — gate terrain iPhone toujours ouvert

- [ ] réponse reconnue → seconde prise locale → lecture correcte → réponse vocale suivante toujours reconnue normalement.

Ce gate reste indépendant de 29.1. Tant qu’il n’est pas validé, **pas d’enregistrement automatique du premier essai exact** pendant Free Voice.

---

# v1.23.0 — Build 30 — Architecture Hardening

Découpage du noyau uniquement avec snapshots comparatifs ; pas de grande réécriture cosmétique du cœur.

Priorités :

- réduire le monolithe historique sans modifier le comportement ;
- clarifier propriétaires DOM / state / routing ;
- isoler davantage les moteurs ;
- conserver les six stores Build 28 et leurs migrations ;
- conserver l’App Shell Build 27, le hardening iPhone Build 29 et le Speaking Loop ;
- comparaison avant/après par smokes reproductibles.

---

# V2.0.0 — Freeze / Release

Release cohérente, sauvegardable, restaurable, testée et documentée. Aucun nouveau moteur n’est requis pour justifier V2 : le jalon est la **fiabilité globale du produit**.

---

# Baselines historiques protégées

**v1.17.0 — Build 24 — Real Life French II** : **28 situations / 84 tours** avant Pack III ; `real-life-data-2.js` reste canonique.

Builds structurants conservés :

```text
Build 26.1 Voice Replay + Details Dashboard
Build 26.6 Progress Dashboard Containment
Build 26.7 Progress Geometry
Build 26.8 Progress Focus Flow
Build 26.9 Progress Focus Content Reliability
Build 27 App Shell Reset
Build 28 Data & Recovery
Build 29 iPhone / PWA / Accessibility
Build 29.1 Speaking Loop Content — candidat
```

# Sanctuaires

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