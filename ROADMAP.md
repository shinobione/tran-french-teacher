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
46. **Une donnée durable invalide ne doit jamais devenir silencieusement une donnée neuve.**
47. **Un restore multi-store est transactionnel : validation, écriture, vérification, rollback.**
48. **Tout import/migration/reset destructif possède un snapshot préalable.**
49. **Un vieux backup ne peut pas effacer une donnée moderne qu’il ne connaissait pas.**
50. **Les données corrompues sont mises en quarantaine avant d’être écartées.**
51. **Le Recovery Engine doit agir avant le runtime susceptible d’initialiser un état neuf.**
52. **Les réglages dépendants de l’appareil ne deviennent pas automatiquement des données pédagogiques portables.**

---

# Baseline production — v1.21.0 / Build 28

## Data & Recovery Hardening — ✅ PROD / CLOS

- runtime : `ed09159a6246fe3c1892cb0ff8d03a4beffb7428` ;
- PR runtime : **#62** ;
- head PR certifié : `dc060ea5304b0526010bd8ac158b70c363525325` ;
- PR : **17/17 workflows SUCCESS** ;
- `main` : **17/17 workflows fonctionnels SUCCESS** ;
- GitHub Pages : **#118 SUCCESS** ;
- total runtime `main` : **18/18 SUCCESS Pages incluse** ;
- curriculum **40 / 241** ;
- Scenario **36 / 108** ;
- Listening **0.88 / 0.65** ;
- coût 0 €.

### Coffre V2

- [x] registre explicite de six stores durables ;
- [x] learner ;
- [x] Learning Memory ;
- [x] Error Intelligence ;
- [x] Scenario ;
- [x] Listening ;
- [x] Milestones ;
- [x] réglages voix laissés locaux à l’appareil.

### Backup / restore

- [x] format `french-tranquille-backup` version 2 ;
- [x] export des six stores ;
- [x] validation avant export/import ;
- [x] snapshot `pre-restore` ;
- [x] snapshot `pre-migration` ;
- [x] restore transactionnel ;
- [x] vérification exacte après écriture ;
- [x] rollback automatique sur erreur ;
- [x] backup V1 migré sans effacer les stores modernes absents du vieux format.

### Corruption / récupération

- [x] Recovery Engine avant `app.js` ;
- [x] JSON invalide détecté ;
- [x] schéma invalide détecté ;
- [x] écriture invalide bloquée en runtime ;
- [x] quarantaine bornée ;
- [x] snapshot `last-good` ;
- [x] fallback snapshot historique Build 22 ;
- [x] seul le store irrécupérable est écarté si aucun fallback valide n’existe.

### Reset

- [x] snapshot `pre-reset` ;
- [x] les six stores durables sont supprimés ensemble ;
- [x] snapshot pré-reset conservé ;
- [x] restore après reset testé sur ancien profil synthétique.

### Tribunal Build 28

Node :

- [x] backup complet ;
- [x] round-trip exact ;
- [x] panne simulée pendant restore ;
- [x] rollback exact ;
- [x] invalid JSON/schema ;
- [x] migration V1 préservant les stores modernes.

Chrome réel :

- [x] tentative d’écriture learner cassée bloquée ;
- [x] original conservé ;
- [x] quarantaine créée ;
- [x] backup complet + restore ;
- [x] reset atomique ;
- [x] profil historique **7 leçons + `l8=4`** récupéré ;
- [x] corruption injectée avant `app.js` réparée depuis `last-good` ;
- [x] Home Build 27 mobile `390×844` intacte.

### Sanctuaires / baselines

- [x] `voice-ios.js` byte-identique ;
- [x] `free-voice.js` byte-identique ;
- [x] logo byte-identique ;
- [x] favicon byte-identique ;
- [x] Build 27 App Shell intact ;
- [x] Build 26.9 Content Reliability ;
- [x] Build 26.8 round-trip ;
- [x] Build 26.7 geometry ;
- [x] Build 26.6 containment / **12 → 12** ;
- [x] Session / Listening / Options / nav ;
- [x] learner historique.

Baseline historique protégée : **v1.17.0 — Build 24 — Real Life French II**, Scenario **28 situations / 84 tours** avant Pack III. `real-life-data-2.js` reste un marqueur canonique.

---

# Build 26.1 — gate terrain iPhone toujours ouvert

- [ ] réponse reconnue → seconde prise locale → lecture correcte → réponse vocale suivante toujours reconnue normalement.

Ce gate reste indépendant du Build 28 : aucune modification de `voice-ios.js` ou `free-voice.js`.

---

# v1.22.0 — Build 29 — iPhone / PWA / Accessibility Hardening

**Prochain gros chantier.**

Objectif : certifier French Trân’quille comme vraie PWA iPhone utilisable confortablement, sans modifier les moteurs pédagogiques inutilement.

Axes prévus :

- safe areas iPhone / encoche / barre Home ;
- tailles tactiles ;
- contraste et lisibilité ;
- zoom / tailles de police / texte dynamique lorsque possible ;
- `prefers-reduced-motion` déjà présent → audit complet ;
- clavier / focus / labels accessibles ;
- installation PWA / lancement standalone ;
- offline réel après installation ;
- rotation / petits et grands iPhone ;
- comportement du clavier virtuel ;
- tab bar et overlays avec viewport Safari réel ;
- tests navigateur mobile renforcés ;
- validation terrain iPhone quand nécessaire.

Critères avant clôture :

- [ ] aucune donnée Build 28 perdue ;
- [ ] App Shell Build 27 intact ;
- [ ] voice sanctuaries intactes sauf changement terrain explicitement justifié ;
- [ ] audit accessibility documenté ;
- [ ] PWA install/offline documentés et testés ;
- [ ] Chrome mobile + vrais retours iPhone quand un comportement WebKit est en jeu.

---

# v1.23.0 — Build 30 — Architecture Hardening

Découpage du noyau uniquement avec snapshots comparatifs ; pas de grande réécriture cosmétique du cœur.

Priorités :

- réduire le monolithe historique sans modifier le comportement ;
- clarifier propriétaires DOM / state / routing ;
- isoler davantage les moteurs ;
- conserver les six stores Build 28 et leurs migrations ;
- comparaison avant/après par smokes reproductibles.

---

# V2.0.0 — Freeze / Release

Release cohérente, sauvegardable, restaurable, testée et documentée. Aucun nouveau moteur nécessaire pour justifier V2 : le jalon est la **fiabilité globale du produit**.

---

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
bottom navigation compatibility bus
Progression UX Build 25
Session UX Build 25.2
Real Life III Build 26
Voice Replay + Details Dashboard Build 26.1
Progress Dashboard Containment Build 26.6
Progress Open-Details Geometry Build 26.7
Progress Focus Flow Build 26.8
Progress Focus Content Reliability Build 26.9
App Shell Build 27
Data & Recovery Build 28
```

Compatibilité interne conservée malgré le branding Tyffany : `LucieVoice`, `luc-*`, `lucie-*`.

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.