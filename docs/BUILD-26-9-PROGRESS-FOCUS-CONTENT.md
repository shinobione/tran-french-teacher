# Build 26.9 — Progress Focus Content Reliability

**Version : v1.19.9**  
**Build : 26.9**  
**État : ✅ PROD / CLOS**  
**PR runtime : #58**  
**Head PR certifié : `0fcb28038ef5bab5d138948c6d63b8fd963b2aab`**  
**Runtime production : `0b31eedb78daebd58dd9bdcb0a472d56250c8fff`**  
**GitHub Pages : #114 SUCCESS**

## Retour terrain

La vidéo réelle du 12 août 2026 a révélé deux défauts que le tribunal Build 26.8 ne mesurait pas :

1. le wrapper Focus pouvait utiliser environ 920 px tandis qu’une famille à carte unique restait limitée au premier track d’une grille 2 colonnes, laissant une demi-surface vide ;
2. certaines familles (`Maîtrise`, `Compréhension orale`, notamment) pouvaient afficher la toolbar de focus pendant plusieurs secondes alors que leur vraie carte moteur restait invisible. Un resize/re-render pouvait ensuite la faire réapparaître, preuve que les données/moteurs existaient bien.

## Cause de couverture

Build 26.8 validait :

- le wrapper Details ;
- la toolbar ;
- la présence d’un panneau actif ;
- la largeur du wrapper ;
- l’absence d’overflow horizontal.

Il ne validait pas encore :

- qu’au moins une vraie `.card` moteur était visible ;
- sa hauteur réelle ;
- sa largeur réelle ;
- plusieurs familles successives dans la même navigation.

Le smoke pouvait donc être vert avec un wrapper large mais un contenu vide ou sous-dimensionné.

## Correction 26.9

Build 26.9 reste une couche de présentation/fiabilité :

- aucune carte Memory/Mastery/Listening/Scenario n’est reparentée ;
- `progress-details-dashboard.js` reste propriétaire du `activeKey` ;
- 26.9 réconcilie de façon idempotente `activeKey → hidden` lorsqu’une recomposition concurrente laisse un état visuel obsolète ;
- une famille à carte unique span toute la grille Focus ;
- `data-b269-content-ready` n’est validé qu’après mesure d’une vraie carte visible et dimensionnée ;
- les retries de stabilisation sont bornés et n’altèrent aucune donnée pédagogique.

## Tribunal desktop multi-familles

À `1640×900`, Chrome ouvre successivement avec de vrais clics :

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
- panneau réel >= 850 px ;
- hauteur réelle non nulle ;
- carte réelle >= 300 px ;
- si une seule carte : >= 700 px ;
- aucun overflow horizontal.

### Mesures certifiées

```text
Memory      3 cartes   panel 918 px   carte max 452 px   hauteur 2319 px
Mastery     2 cartes   panel 918 px   carte max 452 px   hauteur 1218 px
Listening   1 carte    panel 918 px   carte     918 px   hauteur 400 px
Real Life   1 carte    panel 918 px   carte     918 px   hauteur 2330 px
Path / A1   4 cartes   panel 918 px   carte max 452 px   hauteur 826 px
```

Un second Chrome `390×844` exige une vraie carte Memory visible, une colonne, largeur utile et aucun overflow horizontal.

## Baselines conservées

Build 26.9 ne remplace pas les contrats précédents :

- Build 26.6 : frontière DOM, anti-prolifération **12 → 12**, curriculum humanisé ;
- Build 26.7 : géométrie safe quand Details est ouvert en vue normale ;
- Build 26.8 : Focus Flow, Focus Curriculum, sorties explicites, round-trip vers 5 lignes, `prefers-reduced-motion` ;
- Build 26.4 : single-scroll ;
- Build 26.3 : interactions stables ;
- Build 26.2 : Listening **0.88 / 0.65** ;
- Build 26.1 : Voice Replay, gate terrain iPhone encore ouvert.

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
- Listening **0.88 / 0.65**.

## CI / release

### PR runtime #58

- head certifié : `0fcb28038ef5bab5d138948c6d63b8fd963b2aab` ;
- **15/15 workflows fonctionnels SUCCESS** ;
- Build 26.9 real-content smoke SUCCESS ;
- Build 26.8 focus/round-trip SUCCESS ;
- Build 26.7 geometry SUCCESS ;
- Build 26.6 containment SUCCESS ;
- anciens tribunaux et sanctuaires SUCCESS.

### `main`

Runtime : `0b31eedb78daebd58dd9bdcb0a472d56250c8fff`.

Le premier passage du smoke historique Build 26.3 a manqué uniquement sa destination Lesson dans sa fenêtre temporelle. Le **même job inchangé** a été rerun et a passé :

```text
Today controls
Progress desktop
Progress mobile
```

État final :

- **15/15 workflows fonctionnels SUCCESS** ;
- **GitHub Pages #114 SUCCESS** ;
- aucun run en échec ou en cours après certification.

## Gate restant

Le seul gate terrain explicitement ouvert reste Build 26.1 sur le vrai iPhone :

```text
réponse vocale reconnue
→ seconde prise locale
→ réécoute correcte
→ réponse vocale suivante toujours reconnue normalement
```

Build 26.9 : **PROD / CLOS**.
