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
12. Toute surface tappable donne un retour visuel immédiat sur mobile.
13. `Aujourd’hui / Pratiquer / Parcours` gardent des nœuds persistants et exactement un état actif.
14. Progressive disclosure : tous les moteurs et compteurs ne sont pas visibles par défaut.
15. **Contrat de session** : chaque activité possède un objectif, une progression, une fin et une sortie évidente.
16. Pas de tunnel pédagogique infini par défaut.
17. Succès visible et agréable, sans gamification agressive.
18. Pendant une vraie session de Trân : pas de polish runtime/cache sauf incident critique.

---

# Baseline production — v1.18.1 / Build 25.1

**Listening Slow Calibration — ✅ PROD / CLOS**

- Listening effectif : **0.88 normal / 0.64 lent** ;
- Build 25 Progression UX conservé ;
- 40 leçons / 241 éléments ;
- Scenario 28 / 84 ;
- voix/branding sanctuarisés ;
- coût 0 €.

Preuves `main` `178c8b71d47887d8f9efd3389aa358d2f3e1a8eb` : quality #100, Options #31, nav #50, Progression #8, Listening-rate #3, Pages #92 — SUCCESS.

---

# v1.18.2 — Build 25.2 — Session Goals / Milestones / App Delight — EN COURS

## Problème terrain

Plusieurs modes fonctionnent mais ne disent pas assez clairement :

> Combien je dois faire ? Où j’en suis ? Quand est-ce fini ? Puis-je partir maintenant ?

## Architecture candidate

Nouveaux modules :

```text
session-ux.js
session-ux-adapter.js
session-ux.css
.github/workflows/session-ux-smoke.yml
```

La couche Session UX **orchestre les moteurs existants**. Elle ne réécrit ni Voice, ni Memory, ni Scenario, ni Listening.

## Contrat commun

```text
AVANT   → objectif court
PENDANT → progression visible
FIN     → réussite explicite
APRÈS   → sortie logique en 1 tap
```

## Sessions candidates

- **Listening** : 5 questions ; après 5/5, écran `Session terminée`, résultat bref, `Retour à Aujourd’hui` principal, `Encore 3 minutes` secondaire.
- **Révision mémoire** : jusqu’à 5 éléments prioritaires ; fin explicite puis sortie.
- **Scenario** : une situation complète ; le nombre de tours existant devient l’indicateur de progression ; l’état de fin natif est conservé.
- **Entraînement vocal guidé** : 5 réponses reconnues, sans modifier `free-voice.js`.
- **Pratique guidée historique** : 1 réponse correcte par mini-session.
- **Leçon** : étapes existantes conservées ; dernière étape annoncée, puis confirmation sur Home après enregistrement.

## Pratiquer → Parler français

Le grand empilement de moteurs disparaît du flux principal.

Candidat :

```text
Recommandé maintenant
[ Situation réelle • ≈ 3 min ]

Autres façons
[ Répondre à l’oral ]
[ Pratique guidée ]
```

Une fois un mode sélectionné, les autres moteurs sont masqués sans être supprimés.

## Aujourd’hui / Séance du jour

Maximum **2 actions principales** dans le flux. Les autres restent accessibles dans `Voir les autres activités`.

## App Delight

Succès sobre et premium :

- barre à 100 % ;
- coche ;
- glow mint/lilas ;
- petit pulse ;
- transition 400–800 ms ;
- `prefers-reduced-motion` respecté.

Pas de son forcé, XP, monnaie, classement ou confettis permanents.

## Milestones

Nouvelle clé séparée :

```text
french-tranquille:milestones:v1
```

Elle ne change aucune donnée pédagogique. Les jalons déjà atteints lors de l’installation sont marqués `baseline` pour éviter une avalanche rétroactive.

Jalons candidats : première leçon, premier vocal reconnu, première session Listening, première situation réelle, premier rappel réussi, 10/25/50 acquis consolidés, fin A0/A1.

## Critères de clôture

- v1.18.2 / Build 25.2 / cache cohérents ;
- Home : 2 actions visibles + extras repliés ;
- Practice : hub simple et un seul moteur dominant ;
- Listening : 5/5 puis fin explicite ;
- Révision : cible bornée puis fin explicite ;
- Scenario / Vocal / Guided : objectifs visibles et sortie claire ;
- fin de leçon confirmée après sauvegarde ;
- reduced motion testé ;
- aucune donnée pédagogique migrée ou écrasée ;
- profil l8 intact ;
- voix/logo/favicon byte-identiques ;
- quality / Options / nav / Progression / Listening-rate verts ;
- nouveau **Session UX smoke** vert sur PR puis `main` ;
- GitHub Pages verte ;
- docs CLOS uniquement après preuve production.

---

# v1.19.0 — Build 26 — Real Life French III

Contenu repoussé derrière les passes UX : problèmes quotidiens, émotions, français oral courant, réponses moins dirigées. Toujours derrière `Pratiquer → Parler français`.

# v1.20.0 — Build 27 — Data & Recovery Hardening

Sauvegarde/restauration, migrations versionnées, snapshot pré-migration, localStorage corrompu toléré, tests zéro-perte.

# v1.21.0 — Build 28 — iPhone / PWA / Accessibility Hardening

Safe areas, tactile, contraste, tailles, offline/install et vrais tests iPhone.

# v1.22.0 — Build 29 — Architecture Hardening

Découpage du noyau uniquement avec snapshots comparatifs.

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
bottom navigation interaction baseline
```

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.