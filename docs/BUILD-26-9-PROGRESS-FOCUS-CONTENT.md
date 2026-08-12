# Build 26.9 — Progress Focus Content Reliability

**Version candidate : v1.19.9**  
**Build : 26.9**  
**État : CANDIDAT — PR → CI → main → Pages requis avant PROD**

## Retour terrain

La vidéo réelle du 12 août 2026 a révélé deux défauts que le tribunal Build 26.8 ne mesurait pas :

1. en focus `Mémoire`, le conteneur Details utilisait bien environ 920 px, mais une famille ne contenant qu'une seule carte moteur restait limitée au premier track d'une grille 2 colonnes ; la moitié droite de l'écran était donc vide ;
2. certaines familles (`Maîtrise`, `Compréhension orale`, notamment) pouvaient afficher la toolbar de focus pendant plusieurs secondes alors que leur vraie carte moteur restait invisible. Un resize ou une recomposition ultérieure pouvait la faire réapparaître, preuve que les données/moteurs existaient bien.

## Cause de couverture

Build 26.8 validait :

- le wrapper Details ;
- la toolbar ;
- la présence d'un panneau actif ;
- la largeur du wrapper ;
- l'absence d'overflow horizontal.

Il ne validait pas :

- qu'au moins une vraie `.card` moteur était effectivement visible ;
- sa hauteur réelle ;
- sa largeur réelle ;
- plusieurs familles successives.

Le smoke pouvait donc être vert avec un wrapper large et un contenu vide ou demi-largeur.

## Correction 26.9

Build 26.9 reste une couche de présentation/fiabilité :

- aucune carte Memory/Mastery/Listening/Scenario n'est reparentée par cette couche ;
- `progress-details-dashboard.js` reste propriétaire du `activeKey` ;
- 26.9 réconcilie de façon idempotente `activeKey → hidden` pour les panneaux si une recomposition concurrente laisse un état visuel obsolète ;
- une famille à carte unique span toute la grille focused ;
- le contenu focus reçoit un marqueur `data-b269-content-ready` uniquement après mesure d'une vraie carte visible et dimensionnée ;
- les retries de stabilisation sont bornés et n'altèrent aucune donnée pédagogique.

## Nouveau tribunal

À 1640×900, Chrome ouvre successivement :

```text
Mémoire
→ retour
Maîtrise
→ retour
Compréhension orale
→ retour
Français réel
→ retour
A1 & rythme
→ retour
```

Pour chaque famille il exige :

- famille active cohérente ;
- focus Details réellement actif ;
- au moins une carte moteur visible ;
- panneau réel >= 850 px de large ;
- hauteur réelle non nulle ;
- carte réelle >= 300 px ;
- si une seule carte : >= 700 px sur le desktop de certification ;
- aucun overflow horizontal.

Un second Chrome 390×844 exige une vraie carte Memory visible, >= 300 px et sans overflow horizontal.

Build 26.8 garde parallèlement ses tests de focus, curriculum, round-trip et mobile. Son workflow devient version-forward : il protège le contrat historique 26.8 sans figer la version globale du produit.

## Sanctuaires

Build 26.9 ne modifie pas :

- `voice-ios.js` ;
- `free-voice.js` ;
- `assets/LOGO.png` ;
- `assets/Favicon.png` ;
- `francais-avec-luc:learner:v1` ;
- Learning Memory / Scenario / Listening state ;
- curriculum **40 / 241** ;
- Scenario **36 / 108** ;
- Listening **0.88 / 0.65** ;
- containment anti-duplication Build 26.6 ;
- géométrie Build 26.7 ;
- Focus Flow / round-trip Build 26.8.

## Clôture attendue

```text
branche
→ PR runtime
→ tous les workflows fonctionnels verts
→ merge exact du head
→ tous les workflows main verts
→ GitHub Pages SUCCESS
→ docs PROD / CLOS
```
