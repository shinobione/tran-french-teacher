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

# Baseline production — v1.18.1 / Build 25.1

**Listening Slow Calibration — ✅ PROD / CLOS**

```text
normal effectif = 0.88
lent effectif   = 0.64
```

- `voice-ios.js` inchangé ;
- même voix / même pitch ;
- vitesse Lucie sauvegardée restaurée après chaque appel ;
- Build 25 Progression UX conservé ;
- 40 leçons / 241 éléments ;
- Scenario 28 / 84 ;
- coût 0 €.

Preuves `main` `178c8b71d47887d8f9efd3389aa358d2f3e1a8eb` : quality #100, Options #31, nav #50, Progression #8, Listening-rate #3, Pages #92 — SUCCESS.

`0.62` reste une éventuelle calibration future uniquement sur retour terrain.

---

# v1.18.2 — Build 25.2 — Session Goals / Milestones / App Delight — PROCHAIN

## Problème produit

Plusieurs écrans permettent de pratiquer mais ne répondent pas assez clairement à :

> Combien je dois faire ? Où j’en suis ? Quand est-ce terminé ? Où est-ce que je vais ensuite ?

## Contrat commun

Chaque activité principale doit suivre :

```text
AVANT   → objectif court
PENDANT → progression visible
FIN     → réussite explicite
APRÈS   → sortie logique en 1 tap
```

Aucune activité standard ne doit sembler infinie.

## Cibles de session candidates

```text
Listening          5 questions
Révision mémoire   jusqu’à 5 éléments prioritaires
Scenario            1 situation complète
Vocal guidé         5 réponses
Leçon               étapes existantes + fin renforcée
```

Continuer après réussite reste volontaire et secondaire.

## App Delight

Succès premium et court :

- barre qui atteint 100 % ;
- coche ;
- glow mint/lilas ;
- pulse discret Lucie/logo ;
- transition 400–800 ms ;
- `prefers-reduced-motion` respecté.

Pas de son forcé, XP, monnaie, classement ou confettis permanents.

## Milestones significatifs

- première leçon terminée ;
- première réponse vocale reconnue ;
- première session Listening ;
- première situation réelle ;
- premier rappel réussi ;
- 10 / 25 / 50 acquis consolidés ;
- fin d’un bloc A0 / A1 ;
- première session sans aide si la preuve est réellement observable.

## Simplification transversale

### Pratiquer → Parler français

Ne plus empiler en permanence Scenario + Vocal guidé + Lucie pratique + rappel vocal.

Cible :

```text
Recommandé maintenant
[ Situation réelle — 3 min ]

Autres façons
[ Répéter une phrase ]
[ Pratique guidée ]
```

Quand un mode est choisi, un seul moteur domine l’écran.

### Aujourd’hui / Séance du jour

Montrer priorité + prochaine leçon + éventuellement une pratique courte. Les autres activités derrière un dépliage.

### Cohérence générale

- une action principale par écran ;
- sorties placées de façon cohérente ;
- informations techniques cachées ;
- état vide / en cours / réussi / à revoir immédiatement compréhensible ;
- aucun écran où il faut deviner si sortir perd le travail.

## Critères de clôture Build 25.2

- objectif visible avant une session ;
- compteur `x / cible` compréhensible ;
- fin explicitement atteignable ;
- sortie en 1 tap après réussite ;
- option de continuer secondaire ;
- données enregistrées avant l’animation/écran de fin ;
- animations < 1 s ;
- reduced-motion testé ;
- aucune nouvelle gamification artificielle ;
- old-profile l8 intact ;
- voix/branding sanctuarisés ;
- quality / Options / nav / Progression / Listening-rate restent verts ;
- nouveau smoke Session UX sur PR et `main` ;
- Pages verte.

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