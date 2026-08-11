# Build 25.2 — Session Goals / Milestones / App Delight

Version candidate : **v1.18.2**  
Statut : **CANDIDAT / EN COURS**  
Date : **2026-08-11**

## Intention

Supprimer la sensation de tunnel sans fin : chaque activité doit avoir un objectif, une progression, une fin explicite et une sortie logique.

## Nouveaux fichiers

```text
session-ux.js
session-ux-adapter.js
session-ux.css
.github/workflows/session-ux-smoke.yml
```

## Session contract

```text
AVANT   → objectif
PENDANT → x / cible
FIN     → état terminé
APRÈS   → Retour à Aujourd’hui principal
```

## Cibles candidates

```text
Listening        5 questions
Révision         ≤ 5 éléments prioritaires
Scenario          1 situation complète
Vocal guidé       5 réponses reconnues
Guided legacy     1 réponse correcte
Leçon             étapes natives + confirmation après sauvegarde
```

## Practice Hub

`Parler français` n’affiche plus quatre moteurs en pile. Hub : Situation réelle recommandée, Vocal/Guided alternatives. Un seul moteur est visible comme activité principale.

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

## Tribunal

Six workflows obligatoires :

1. quality ;
2. Options ;
3. nav/mobile ;
4. Progression UX ;
5. Listening-rate ;
6. Session UX.

Session UX smoke doit prouver : Home progressive disclosure, Practice hub, Listening 5/5 completion, Review completion.

## Checklist

- [x] branche créée ;
- [x] Session UX layer ;
- [x] legacy adapter ;
- [x] CSS success/session ;
- [x] version/cache candidate ;
- [x] Session UX workflow ;
- [x] Listening-rate guard rendu version-forward ;
- [x] docs candidat synchronisées ;
- [ ] PR ouverte ;
- [ ] six workflows PR verts ;
- [ ] merge main ;
- [ ] six workflows main verts ;
- [ ] Pages SUCCESS ;
- [ ] docs post-prod CLOS.

Le build ne sera pas déclaré livré avant la dernière case.