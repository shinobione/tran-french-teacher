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
14. **Progressive disclosure** : l’apprenante ne voit pas par défaut tous les moteurs et compteurs internes.
15. **Contrat de session** : chaque activité possède un objectif, une progression, une fin et une sortie évidente.
16. Pas de tunnel pédagogique infini par défaut.
17. Succès visible et agréable, sans gamification agressive.
18. Pendant une vraie session de Trân : pas de polish runtime/cache sauf incident critique.

---

# Baseline production — v1.18.0 / Build 25

**Progression UX / Progressive Disclosure — ✅ PROD / CLOS**

- 40 leçons / 241 éléments ;
- Scenario 28 / 84 ;
- Parcours compact ;
- 5 leçons visibles par défaut / 40 accessibles ;
- détails Memory/Mastery/A1 repliables ;
- aucune migration ;
- voix et branding sanctuarisés.

Preuves : PR #31 puis `main` `4f354221f923004b0cefdaf6b3281e51ba30dbf9`, quality #94 / Options #25 / nav #44 / Progression #2 / Pages #90 — SUCCESS.

---

# v1.18.1 — Build 25.1 — Listening Slow Calibration — EN COURS

## Retour terrain

```text
normal = 0.88
lent   = 0.68
```

Le mode lent est distinct mais reste un peu rapide.

## Candidat implémenté

```text
normal effectif = 0.88
lent effectif   = 0.64
```

Le moteur Listening continue à demander son ancien slow `0.68`. Le bridge `build-meta.js` transforme uniquement cette demande en **0.64** juste avant `voice-ios.js`. Cela évite de modifier la voix validée, le pitch ou la vitesse Lucie sauvegardée.

## Observabilité / CI

`build-meta.js` expose :

```text
normal: 0.88
engineSlow: 0.68
slow: 0.64
```

et les mêmes valeurs en `data-listening-*-rate` sur `<html>`.

Nouveau workflow : **Build 25.1 Listening rate smoke**.

## Critères de clôture

- v1.18.1 / Build 25.1 cohérent ;
- cache `tran-french-teacher-v1.18.1-b25.1-listening-slow` ;
- normal reste 0.88 ;
- slow effectif = 0.64 ;
- `voice-ios.js` byte-identique ;
- `free-voice.js`, logo, favicon inchangés ;
- quality / Options / nav-mobile / Progression UX / Listening-rate verts sur PR et `main` ;
- Pages verte ;
- aucune donnée apprenante modifiée ;
- 0.62 seulement après nouveau retour terrain si nécessaire.

---

# v1.18.2 — Build 25.2 — Session Goals / Milestones / App Delight

Chaque activité doit suivre :

```text
objectif court → progression visible → fin explicite → sortie logique
```

Cibles indicatives : Listening 5 questions, Révision 5 éléments, Scenario 1 situation, vocal guidé 5 réponses, fin de leçon renforcée.

Animations premium sobres : barre 100 %, coche, glow mint/lilas, pulse court Lucie/logo, 400–800 ms, reduced motion respecté. Pas d’XP, monnaie, classement ou confettis permanents.

Milestones : première leçon, premier vocal reconnu, première session Listening, première situation, premier rappel réussi, 10/25/50 acquis consolidés, fin A0/A1.

À traiter aussi :

- `Parler français` → recommandation principale puis alternatives, pas quatre moteurs empilés ;
- `Séance du jour` → priorité + prochaine leçon + pratique courte, reste replié ;
- une action principale par écran ;
- sortie claire sans perte de travail.

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