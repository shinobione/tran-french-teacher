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
- Scenario 28 situations / 84 tours ;
- navigation Aujourd’hui / Pratiquer / Parcours ;
- feedback tactile premium 24.x conservé ;
- `Parcours` compact par défaut ;
- 5 leçons autour de la position actuelle visibles par défaut ;
- les 40 leçons restent accessibles à la demande ;
- Memory / Mastery / A1 restent disponibles derrière `Détails d’apprentissage` ;
- aucune migration de données ;
- voix/reconnaissance iPhone sanctuarisées ;
- coût 0 €.

### Preuves Build 25

PR #31 : quality #93, Options #24, nav/mobile #43 et Progression UX #1 — SUCCESS.

`main` `4f354221f923004b0cefdaf6b3281e51ba30dbf9` : quality #94, Options #25, nav/mobile #44, Progression UX #2 et Pages #90 — SUCCESS.

Contrat leçon 8 : `l8 / 7 terminées / 40 acquis / 5 lignes visibles / 40 disponibles` préservé.

---

# v1.18.1 — Build 25.1 — Listening Slow Calibration — PROCHAIN

## Retour terrain

État actuel :

```text
normal = 0.88
lent   = 0.68
```

`0.68` est désormais réellement distinct de `0.88`, mais reste légèrement rapide à l’oreille.

## Plan

Premier candidat :

```text
normal = 0.88
lent   = 0.64
```

`0.62` ne sera tenté que si 0.64 paraît encore trop rapide lors du prochain test iPhone.

## Garde-fous

- `voice-ios.js` non modifié ;
- même voix / même pitch ;
- vitesse normale inchangée ;
- cache/version cohérents ;
- contrat explicite prouvant deux rates distincts ;
- quality / Options / nav-mobile / Progression UX restent verts ;
- aucune donnée apprenante modifiée.

---

# v1.18.2 — Build 25.2 — Session Goals / Milestones / App Delight

## Problème

Plusieurs écrans savent proposer un exercice mais ne disent pas assez clairement :

> Combien dois-je en faire ? Où j’en suis ? Quand ai-je fini ? Où vais-je ensuite ?

## Contrat de session commun

```text
AVANT   → objectif court
PENDANT → progression visible
FIN     → état terminé explicite
APRÈS   → sortie logique en 1 tap
```

Cibles indicatives :

- Listening : 5 questions ;
- Révision mémoire : 5 éléments prioritaires ;
- Scenario : 1 situation complète ;
- Vocal guidé : 5 réponses ;
- Leçon : fin de leçon renforcée et destination suivante claire.

Continuer après réussite reste volontaire et secondaire.

## App Delight

Animations premium sobres : barre 100 %, coche, glow mint/lilas, pulse court Lucie/logo, transition 400–800 ms, `prefers-reduced-motion` respecté.

Pas de son forcé, pluie de confettis, XP, monnaie ou classement.

## Milestones significatifs

- première leçon terminée ;
- première réponse vocale reconnue ;
- première session Listening ;
- première situation réelle ;
- premier rappel réussi ;
- 10 / 25 / 50 acquis consolidés ;
- fin de bloc A0 / A1 ;
- première session sans aide lorsque cette preuve existe réellement.

## UX transversale à traiter dans ce build

- `Pratiquer → Parler français` ne doit plus empiler tous les moteurs ;
- une recommandation principale d’abord, alternatives ensuite ;
- `Séance du jour` doit rester courte : priorité + prochaine leçon + pratique éventuelle, puis détails ;
- une action principale par écran ;
- sorties cohérentes et toujours visibles ;
- informations techniques hors interface apprenante normale.

---

# v1.19.0 — Build 26 — Real Life French III

Contenu repoussé derrière les passes UX : problèmes quotidiens, émotions, français oral courant, réponses moins dirigées. Toujours derrière `Pratiquer → Parler français`, sans nouvelle entrée principale.

---

# v1.20.0 — Build 27 — Data & Recovery Hardening

Sauvegarde/restauration unifiée, migrations versionnées, snapshot pré-migration, tolérance au localStorage corrompu, tests zéro-perte.

# v1.21.0 — Build 28 — iPhone / PWA / Accessibility Hardening

Safe areas, tactile, contraste, tailles, offline/install, vrais tests iPhone et ergonomie faible aisance numérique.

# v1.22.0 — Build 29 — Architecture Hardening

Découpage du vieux noyau uniquement avec snapshots comparatifs avant/après.

# V2.0.0 — Freeze / Release

Release cohérente, sauvegardable, testée, documentée et utilisable sans connaître l’architecture interne.

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

# Backlog secondaire

Vrai avatar Lucie, sons discrets, fiches imprimables, bilan exportable, admin local, mode 5 min, écoute/déplacement, stats hebdo, multi-appareil gratuit si solution sûre.

# Reporté

Backend/API payants, avatar vidéo, XP/classement, gamification agressive, score phonétique pseudo-scientifique, app native tant que la PWA suffit.

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.