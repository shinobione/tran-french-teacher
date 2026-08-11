# v1.17.5 — Build 24.5 — Navigation State Sync

## Statut

**PROD / CLOS**

Commit production :

```text
a64ba268934c4cc811c578764b6aac00427c086a
```

## Origine

Build 24.4 avait corrigé le problème terrain où le feedback tactile disparaissait lors d’un vrai changement d’onglet : nœuds DOM persistants, `tap echo`, état actif unique et header de leçon allégé.

Sa PR était verte, mais le même smoke rejoué après squash merge sur `main` a détecté :

```text
active-wrong:progress:home
```

L’écran Home était effectivement revenu, mais la bottom bar pouvait encore afficher Parcours comme actif selon le timing du navigateur.

## Cause

L’état visuel final dépendait encore du passage d’un `MutationObserver`. Les chemins de rendu n’ont pas exactement le même timing selon la version du navigateur / runner.

## Correctif

`nativeGo()` effectue maintenant une synchronisation déterministe :

1. état demandé appliqué immédiatement ;
2. navigation native via l’ancien bus caché ;
3. `renderBottomNav()` synchrone ;
4. confirmation au prochain `requestAnimationFrame` ;
5. dernière réconciliation à +80 ms.

La bottom bar conserve les trois mêmes objets DOM pendant toute la navigation.

## Cache

```text
UX token: 1.17.5-b24.5
PWA cache: tran-french-teacher-v1.17.5-b24.5-nav-state-sync
```

## Validation

PR #27 :

- quality #83 — SUCCESS ;
- Options #14 — SUCCESS ;
- nav/mobile #33 — SUCCESS.

Production `main` :

- quality #84 — SUCCESS ;
- Options #15 — SUCCESS ;
- nav/mobile #34 — SUCCESS ;
- Pages #86 — SUCCESS.

## Sanctuaires

Aucune modification de :

- `francais-avec-luc:learner:v1` ;
- curriculum ;
- Learning Memory ;
- Error Intelligence ;
- Scenario ;
- Listening ;
- `voice-ios.js` ;
- `free-voice.js` ;
- `assets/LOGO.png` ;
- `assets/Favicon.png`.

Build 24.5 devient la baseline interaction/navigation mobile avant Build 25.
