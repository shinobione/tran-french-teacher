# Build 26 — Real Life French III

Version : **v1.19.0**  
Statut : **✅ PROD / CLOS**  
Date : **2026-08-11**  
PR : **#37**  
Commit production : `db8219e44d74f0af13421ec798a0c98d02f7a7b5`  
GitHub Pages : **#96 SUCCESS**

## Intention

Après Progression UX et Session UX, reprendre l’enrichissement pédagogique sans réintroduire de complexité de navigation.

Build 26 ajoute du français oral naturel côté interlocuteur et des réponses légèrement plus libres, tout en restant déterministe et 100 % local.

## Nouveaux fichiers

```text
real-life-data-3.js
real-life-coach.js
.github/workflows/real-life-3-smoke.yml
```

## Pack III

```text
8 situations
24 tours
Scenario production : 36 / 108
```

Déblocage : l20, l35, l36, l37, l38, l39, l40.

## Français oral

Première scène :

```text
T'es prête ?
J'sais pas… on rentre ?
Y a pas de réseau.
```

L’objectif est la compréhension. Les réponses de Trân restent standard : `Je suis prête.`, `Je veux rentrer.`, `Envoie-moi un message.`

## Réponses semi-libres

Plusieurs variantes simples sont explicitement listées. `openResponse:true` ne déclenche aucune IA ni classification sémantique arbitraire.

## Memory resolver

Les acquis avancés sont résolus contre le curriculum chargé. Une requête est valide uniquement si elle donne exactement 1 item.

Production :

```text
15 résolutions
0 ambiguïté
```

## Compatibilité Session UX

Une scène reste une session bornée : objectif `1 situation`, tours visibles, fin native, puis action principale vers Aujourd’hui.

## Cache

```text
version = 1.19.0
build   = 26
cache   = tran-french-teacher-v1.19.0-b26-real-life-3
```

## Ajustements CI faits avant merge

### Quality l20

Le vieux smoke attendait 17 scènes personnelles ouvertes à l20. C’était exact avant Pack III. Build 26 ouvre une première scène supplémentaire dès l20 : le contrat réel devient **18**, dont seulement 6 visibles dans le catalogue compact.

### Session UX

Le smoke multi-Chrome Listening/Révision produisait des faux rouges de timing intermittents. Les hooks ont été isolés dans des profils Chrome distincts avec retry borné et diagnostics. Les critères fonctionnels restent stricts : progression atteinte, fin explicite, carte de succès et état masqué après clôture.

Aucun moteur pédagogique, aucune donnée apprenante et aucun fichier voix sanctuarisé n’a été modifié pour faire passer ces tests.

## Sanctuaires

```text
francais-avec-luc:learner:v1
Learning Memory / Scenario / Listening state
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
Progression UX Build 25
Session UX Build 25.2
```

## Tribunal production

- quality ✅ ;
- Options ✅ ;
- nav/mobile ✅ ;
- Progression UX ✅ ;
- Listening-rate ✅ ;
- Session UX ✅ ;
- Real Life French III smoke ✅ ;
- GitHub Pages ✅.

## Checklist

- [x] branche neuve depuis baseline 25.2 ;
- [x] ancien prototype audité, sans cherry-pick sauvage ;
- [x] data Pack III portée ;
- [x] coach Pack III porté ;
- [x] version/cache Build 26 ;
- [x] smoke dédié ;
- [x] docs candidat synchronisées ;
- [x] PR ouverte ;
- [x] tribunal PR vert ;
- [x] merge main ;
- [x] tribunal main vert ;
- [x] Pages SUCCESS ;
- [x] docs post-prod CLOS.

Build 26 est clos.