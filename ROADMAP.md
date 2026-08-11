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

# Baseline production — v1.18.2 / Build 25.2

**Session Goals / Milestones / App Delight — ✅ PROD / CLOS**

- `Parcours` compact via Build 25 ;
- Listening effectif : **0.88 normal / 0.64 lent** via Build 25.1 ;
- sessions bornées et sorties explicites via Build 25.2 ;
- Practice Hub : un seul moteur dominant ;
- Home : 2 actions principales + extras repliés ;
- milestones séparés des données pédagogiques ;
- 40 leçons / 241 éléments ;
- Scenario 28 / 84 ;
- voix/branding sanctuarisés ;
- coût 0 €.

Preuve production Build 25.2 : commit `49d866bed59bb0cb3268e1675225a4811f6c595f`, 7 workflows déclenchés, aucun échec, Pages SUCCESS.

---

# v1.19.0 — Build 26 — Real Life French III — CANDIDAT / EN COURS

## Intention

Maintenant que l’interface est plus respirable et que les sessions ont une vraie fin, enrichir `Pratiquer → Parler français` sans ajouter de nouveau bouton principal.

Objectif : **moins de roulettes, plus de compréhension du français oral réel, réponses légèrement plus libres mais toujours déterministes/locales**.

## Principes

- français oral naturel possible côté interlocuteur : `T’es prête ?`, `J’sais pas`, `Y a pas…` ;
- Trân peut répondre en français standard ;
- plusieurs formulations simples équivalentes peuvent être acceptées ;
- aucune pseudo-IA locale qui “devine” arbitrairement le sens ;
- les réponses acceptées restent explicitement définies ;
- chaque référence Memory avancée doit résoudre exactement un acquis ;
- Scenario Engine reste propriétaire de ses stats/persistance ;
- Session UX 25.2 continue à borner une session à **1 situation**.

## Pack III candidat

8 situations / 24 tours :

1. comprendre Jerry quand il parle vite — dès l20 ;
2. futur proche `Je vais appeler Jerry.` — l35 ;
3. passé récent `Je viens de rentrer.` — l36 ;
4. passé composé `J’ai mangé.` — l37 ;
5. mouvement `Je suis rentrée à la maison.` — l38 ;
6. administratif `Pouvez-vous m’expliquer ?` — l39 ;
7. émotion/besoin `Je suis inquiète.` / `J’ai besoin de parler.` / `Tu me manques.` — l40 ;
8. mini-échange de couple multi-acquis — l40.

Scenario candidat attendu : **36 situations / 108 tours**.

## UX

Dans les scènes Pack III seulement, Lucie peut afficher discrètement :

> `Tu peux répondre avec tes mots. Une phrase simple qui exprime la bonne idée suffit.`

Pas de nouveau réglage, mode ou bouton.

Le catalogue conserve la limite de **6 situations ouvertes visibles** avant `Voir d’autres situations`.

## Critères de clôture Build 26

- version `v1.19.0 / Build 26` et cache `1.19.0-b26-real-life-3` cohérents ;
- 8 nouvelles situations / 24 tours ;
- Scenario total **36 / 108** ;
- aucun ID de scénario dupliqué ;
- 15 résolutions Memory avancées attendues et **0 ambiguïté** ;
- réponses semi-libres déterministes et testables ;
- déblocage l20 → l35…l40 conforme ;
- catalogue visible limité ;
- Session UX 25.2 intacte : objectif 1 situation, fin et sortie ;
- profil ancien utilisateur / l8 intact ;
- voix, reconnaissance, logo, favicon byte-identiques ;
- quality / Options / nav / Progression / Listening-rate / Session UX verts ;
- nouveau smoke Real Life III vert sur PR puis `main` ;
- Pages SUCCESS ;
- docs CLOS après production.

---

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
Progression UX Build 25
Session UX Build 25.2
```

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.