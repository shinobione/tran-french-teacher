# Build 25.1 — Listening Slow Calibration

Version : **v1.18.1**  
Statut : **PROD / CLOS**  
Date : **2026-08-11**

## Calibration livrée

```text
normal effectif = 0.88
lent effectif   = 0.64
```

Le moteur Listening historique continue à demander `0.68` pour Lent ; `build-meta.js` calibre cette demande à `0.64` avant la couche voix, puis restaure exactement le réglage Lucie précédent.

## Garanties

- même voix ;
- même pitch ;
- normal inchangé ;
- vitesse Lucie persistée inchangée ;
- `voice-ios.js` non modifié ;
- `free-voice.js`, logo, favicon inchangés ;
- aucune donnée apprenante ou Listening migrée.

## Observabilité

```text
window.FrenchTranquilleListeningRates = {
  normal: 0.88,
  engineSlow: 0.68,
  slow: 0.64
}
```

DOM : `data-listening-normal-rate`, `data-listening-engine-slow-rate`, `data-listening-slow-rate`.

## Version/cache

```text
version = 1.18.1
build   = 25.1
cache   = tran-french-teacher-v1.18.1-b25.1-listening-slow
```

## Preuves

PR #33 — head `942f901d8bff11e762a0d54592c75673b7f24927` :

- quality #99 ✅ ;
- Options #30 ✅ ;
- nav/mobile #49 ✅ ;
- Progression UX #7 ✅ ;
- Listening-rate #2 ✅.

Production — `main` `178c8b71d47887d8f9efd3389aa358d2f3e1a8eb` :

- quality #100 ✅ ;
- Options #31 ✅ ;
- nav/mobile #50 ✅ ;
- Progression UX #8 ✅ ;
- Listening-rate #3 ✅ ;
- GitHub Pages #92 ✅.

## Checklist

- [x] calibration 0.64 ;
- [x] version/cache ;
- [x] workflow dédié ;
- [x] docs candidat ;
- [x] PR ;
- [x] cinq tests PR ;
- [x] merge main ;
- [x] cinq tests main ;
- [x] Pages ;
- [x] docs PROD/CLOS.

`0.62` reste volontairement reporté. Il ne sera envisagé que si un prochain A/B iPhone montre que `0.64` est encore trop rapide.