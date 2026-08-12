# Build 26.6 — Progress Dashboard Containment + Humanized Curriculum

**Version candidate : v1.19.6**  
**Build : 26.6**  
**État : CANDIDAT — ne devient PROD qu’après PR → CI → main → Pages**

## Retour terrain

Une vidéo réelle du 12 août 2026 a montré deux problèmes dans `Parcours` après Build 26.5 :

1. `Autres détails` augmentait continuellement sans interaction (`24 → 123 → 179 → 218 → 326`, avec plus de 500 cartes observées plus tard) ;
2. `Voir les 40 leçons` rendait simultanément les 40 lignes, produisant une page extrêmement longue et peu humaine.

Le premier problème est une **régression fonctionnelle active**, pas seulement un défaut visuel.

## Cause racine confirmée

Plusieurs moteurs historiques injectent leur carte Progress en utilisant la première colonne comme frontière d’appartenance :

```js
const column = document.querySelector('.screen-progress .progress-layout > div:first-child');
if (!column || column.querySelector('.memory-progress-card')) return;
```

Build 25 déplaçait ces cartes dans `Détails d’apprentissage`, mais `Détails` restait alors descendant de la première colonne. Les moteurs retrouvaient donc leur carte existante.

Build 26.5 a rendu les colonnes visuellement indépendantes en déplaçant `Détails` comme frère direct de la première colonne :

```text
progress-layout
├── colonne gauche
└── Détails
```

Conséquence :

```text
moteur Memory / Mastery / Stage…
        ↓
ne trouve plus sa carte dans la première colonne
        ↓
recrée une carte
        ↓
Progression la déplace dans Détails
        ↓
le moteur ne la trouve toujours plus
        ↓
recrée une carte
        ↓
∞
```

Le dashboard n’était donc pas la source initiale de la duplication : la nouvelle frontière DOM de 26.5 rendait les moteurs historiques incapables de reconnaître leurs propres cartes.

## Correction structurelle 26.6

Build 26.6 restaure la **frontière de propriété historique** sans revenir au mauvais layout visuel.

DOM :

```text
progress-layout
└── progress-ux-composition   ← première colonne historique
    ├── progress-ux-left-flow
    │   ├── Résumé
    │   └── Curriculum
    └── Détails d’apprentissage
```

CSS desktop :

```text
progress-ux-composition
├── gauche : progress-ux-left-flow
└── droite : Détails
```

Ainsi :

- Memory / Mastery / Error / Stage 2 / Stage 3 continuent à trouver leurs cartes avec leurs sélecteurs historiques ;
- le rendu desktop reste en deux colonnes indépendantes ;
- la hauteur de Détails ne pousse pas le Curriculum ;
- aucun scroll interne à Détails n’est réintroduit ;
- aucune migration de données n’est nécessaire ;
- aucun moteur pédagogique n’est réécrit.

## Dashboard : appartenance stable

`progress-details-dashboard.js` reçoit en plus un contrat défensif :

- chaque carte reçoit une famille stable `data-progress-detail-family` ;
- une carte déjà classée n’est plus reclassée à cause d’un changement de texte/DOM ;
- `Résumé` et `Curriculum` sont interdits dans Détails ;
- `Éléments appris` appartient explicitement à Mémoire ;
- l’API expose les comptes par famille pour permettre un test de stabilité dans le temps.

## Parcours complet : 40 leçons sans mur de 40 lignes

Le bouton compact garde cinq leçons autour de la position actuelle.

Quand l’utilisatrice demande tout le parcours, Build 26.6 affiche cinq étapes :

1. **Survie A0** — leçons 1–7 ;
2. **Vie quotidienne** — leçons 8–15 ;
3. **Fondations A1** — leçons 16–20 ;
4. **Premiers échanges** — leçons 21–25 ;
5. **A1 Core** — leçons 26–40.

L’étape contenant la leçon actuelle s’ouvre par défaut. Une seule étape affiche ses leçons à la fois.

À la position terrain autour de la leçon 8 :

```text
Vue compacte : 5 lignes
Vue parcours : 5 étapes + 8 lignes pour l’étape courante
```

Le pire cas est A1 Core avec 15 lignes — jamais 40 simultanément.

Les 40 leçons restent toutes accessibles ; elles ne sont simplement plus toutes visibles en même temps.

## Tribunal Build 26.6

Le nouveau smoke Chrome doit prouver sur desktop et mobile :

- `Détails` est contenu dans la frontière historique ;
- Résumé et Curriculum restent hors de Détails ;
- le nombre total de cartes Dashboard est identique avant/après plusieurs secondes d’observers ;
- le nombre reste borné ;
- les cartes moteur principales restent uniques ;
- aucune carte Résumé/Curriculum ne fuit dans Détails ;
- l’ouverture et la navigation des étapes ne font pas varier le compte Dashboard ;
- 5 étapes existent ;
- les 40 leçons restent accessibles ;
- A1 Core affiche exactement 15 lignes ;
- la vue ne montre jamais 40 leçons simultanément ;
- sur mobile, Détails reste replié au départ.

Les contrats historiques 26.5 restent testés en version-forward :

- Conversation active sur une colonne ;
- `Changer de pratique` pointer + click ;
- Résumé → Curriculum compact ;
- Détails à droite sur desktop ;
- ordre Résumé → Curriculum → Détails sur mobile ;
- single page scroll.

## Sanctuaires

Build 26.6 ne doit modifier ni :

- `voice-ios.js` ;
- `free-voice.js` ;
- `assets/LOGO.png` ;
- `assets/Favicon.png` ;
- `francais-avec-luc:learner:v1` ;
- les états Memory / Scenario / Listening ;
- le curriculum canonique 40 / 241 ;
- Scenario 36 / 108 ;
- Listening 0.88 / 0.65.

## Critère de clôture

Build 26.6 ne sera marqué `PROD / CLOS` qu’après :

```text
branche
→ PR candidate
→ tous les workflows fonctionnels verts
→ merge main
→ tous les workflows main verts
→ GitHub Pages SUCCESS
→ clôture README / ROADMAP / CHANGELOG / ARCHITECTURE
```
