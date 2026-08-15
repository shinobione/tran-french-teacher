# Build 25.2 — Session Goals / Milestones / App Delight

Version : **v1.18.2**  
Statut : **PROD / CLOS**  
Date : **2026-08-11**

## Intention

Supprimer la sensation de tunnel sans fin : chaque activité possède un objectif, une progression, une fin explicite et une sortie logique.

## Runtime livré

```text
src/ui/session-ux.js
src/ui/session-ux-adapter.js
src/ui/session-ux.css
.github/workflows/session-ux-smoke.yml
```

## Session contract

```text
AVANT   → objectif
PENDANT → x / cible
FIN     → état terminé
APRÈS   → Retour à Aujourd’hui principal
```

## Cibles production

```text
Listening        5 questions
Révision         ≤ 5 éléments prioritaires
Scenario          1 situation complète
Vocal guidé       5 réponses reconnues
Guided legacy     1 réponse correcte
Leçon             étapes natives + confirmation après sauvegarde
```

## Practice Hub

`Parler français` n’affiche plus tous les moteurs en pile. Hub : Situation réelle recommandée, Vocal/Guided alternatives. Un seul moteur est visible comme activité principale.

## Daily Coach

Deux actions principales maximum. Les extras sont déplacés sous un `<details>` sans supprimer les boutons existants.

## Milestones

Clé séparée : `french-tranquille:milestones:v1`.

La première installation marque les succès déjà atteints comme baseline afin de ne pas afficher rétroactivement une cascade de badges.

## App Delight

- progression animée courte ;
- coche et glow mint/lilas ;
- milestone toast discret ;
- reduced motion ;
- aucun son forcé ;
- aucun XP, monnaie, classement.

## Sécurité

Aucune migration des clés pédagogiques. Les moteurs restent propriétaires de leurs écritures ; Session UX observe seulement après persistance.

Sanctuaires :

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
francais-avec-luc:learner:v1
Learning Memory / Scenario / Listening state
```

## Version/cache

```text
version = 1.18.2
build   = 25.2
cache   = tran-french-teacher-v1.18.2-b25.2-session-ux
```

Listening 25.1 conservé : **0.88 / 0.64**.

## Validation production

PR #35 mergée. Commit production :

```text
49d866bed59bb0cb3268e1675225a4811f6c595f
```

Sur ce SHA :

- **7 workflows** déclenchés ;
- **0 workflow en échec** ;
- Progression UX smoke : SUCCESS ;
- GitHub Pages #94 : SUCCESS ;
- quality / Options / nav-mobile / Listening-rate / Session UX font partie du tribunal obligatoire.

## Checklist

- [x] branche créée ;
- [x] Session UX layer ;
- [x] legacy adapter ;
- [x] CSS success/session ;
- [x] version/cache candidate ;
- [x] Session UX workflow ;
- [x] Listening-rate guard rendu version-forward ;
- [x] docs candidat synchronisées ;
- [x] PR #35 ouverte ;
- [x] workflows PR verts ;
- [x] merge main ;
- [x] workflows main verts ;
- [x] Pages SUCCESS ;
- [x] docs post-prod CLOS.

## Suite

**Build 26 — Real Life French III** doit réutiliser ce contrat de session : une situation complète = une session, puis sortie claire.