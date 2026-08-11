# Build 25.1 — Listening Slow Calibration

Version candidate : **v1.18.1**  
Statut : **CANDIDAT / EN COURS**  
Date : **2026-08-11**

## Retour terrain

Après correction de la séparation Normal/Lent, `0.68` reste légèrement rapide pour le mode lent.

## Candidat

```text
normal effectif = 0.88
lent effectif   = 0.64
```

## Implémentation

Le moteur Listening historique continue à émettre :

```text
normal request = 0.88
slow request   = 0.68
```

Le bridge dans `build-meta.js` calibre uniquement `0.68 → 0.64` avant la couche `voice-ios.js`.

Cela garantit :

- même voix ;
- même pitch ;
- normal inchangé ;
- vitesse Lucie sauvegardée non modifiée ;
- `voice-ios.js` non modifié.

## Observabilité

API : `window.FrenchTranquilleListeningRates`

```text
normal     0.88
engineSlow 0.68
slow       0.64
```

DOM :

```text
data-listening-normal-rate="0.88"
data-listening-engine-slow-rate="0.68"
data-listening-slow-rate="0.64"
```

## Version/cache

```text
version = 1.18.1
build   = 25.1
cache   = tran-french-teacher-v1.18.1-b25.1-listening-slow
```

## CI dédiée

`.github/workflows/listening-rate-smoke.yml` vérifie :

- constantes de calibration ;
- version/cache ;
- hashes voix/branding ;
- valeurs effectives exposées dans un vrai Chrome mobile-ish ;
- Home démarre sans fatal card.

Les workflows quality / Options / nav-mobile / Progression UX restent obligatoires.

## Sanctuaires

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
francais-avec-luc:learner:v1
Listening state existant
```

## Checklist

- [x] branche alignée sur Build 25 clôturé ;
- [x] calibration bridge 0.64 ;
- [x] version/cache candidat ;
- [x] workflow dédié ;
- [x] README/ROADMAP candidat ;
- [ ] CHANGELOG/ARCHITECTURE candidat ;
- [ ] PR ;
- [ ] quality PR ;
- [ ] Options PR ;
- [ ] nav-mobile PR ;
- [ ] Progression UX PR ;
- [ ] Listening-rate PR ;
- [ ] merge `main` ;
- [ ] mêmes tests `main` ;
- [ ] Pages ;
- [ ] docs PROD/CLOS.

`0.62` reste volontairement hors build : décision seulement après nouveau test terrain.