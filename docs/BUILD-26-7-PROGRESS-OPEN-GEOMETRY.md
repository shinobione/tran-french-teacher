# Build 26.7 — Progress Open-Details Geometry

**Version candidate : v1.19.7**  
**Build : 26.7**  
**État : CANDIDAT — PR → CI → main → Pages requis avant PROD**

## Retour terrain

Une vidéo réelle du 12 août 2026 montre une régression desktop introduite après Build 26.6 :

- `Détails d’apprentissage` fermé : Progress reste lisible ;
- `Détails d’apprentissage` ouvert : la colonne apprenante peut être compressée jusqu’à une bande extrêmement étroite ;
- les titres et lignes de leçon passent alors presque lettre par lettre ;
- une grande zone vide apparaît à droite sous le dashboard.

Ce problème est distinct de la prolifération de cartes corrigée en 26.6.

## Cause

Build 26.6 a correctement restauré la frontière DOM historique nécessaire à Memory/Mastery/Stage, mais sa grille imbriquée desktop conservait :

```css
grid-template-columns:minmax(0,.94fr) minmax(440px,1.06fr);
```

Le track de droite garde donc un plancher fixe de 440 px. Lorsque le dashboard Details s’ouvre et expose son contenu, la colonne droite peut imposer une largeur intrinsèque importante pendant que le track gauche est explicitement autorisé à descendre jusqu’à 0.

Résultat terrain : le navigateur protège Details et sacrifie le parcours.

## Correction

Build 26.7 ne change pas l’architecture 26.6.

La propriété DOM reste :

```text
progress-layout
└── progress-ux-composition
    ├── progress-ux-left-flow
    │   ├── Overview
    │   └── Curriculum
    └── Details
```

Sur desktop large, lorsque Details est ouvert :

```css
grid-template-columns:minmax(0,1fr) minmax(0,1fr);
```

Les deux tracks sont donc réellement shrinkables et aucun plancher fixe ne peut voler la largeur de l’autre.

Le dashboard ouvert passe à deux tuiles par ligne pour rester confortable dans sa moitié de page.

Entre 861 et 1040 px, l’ouverture de Details passe volontairement en pile :

```text
Overview + Curriculum
↓
Details
```

On préfère une pile large et lisible à deux colonnes microscopiques.

Mobile <= 860 px conserve les règles 26.6.

## Tribunal 26.7

Le workflow dédié ouvre réellement Progress + Details.

### 1640×900

Exigences :

- Details ouvert ;
- containment 26.6 intact ;
- deux colonnes côte à côte ;
- flow >= 420 px ;
- Details >= 420 px ;
- ligne de leçon >= 400 px ;
- dashboard = 2 colonnes ;
- aucun overflow horizontal.

### 980×900

Exigences :

- Details ouvert ;
- containment intact ;
- pile verticale au lieu d’une compression ;
- flow >= 620 px ;
- ligne de leçon >= 580 px ;
- aucun overflow horizontal.

## Sanctuaires

Build 26.7 ne modifie pas :

- `voice-ios.js` ;
- `free-voice.js` ;
- `assets/LOGO.png` ;
- `assets/Favicon.png` ;
- `francais-avec-luc:learner:v1` ;
- Learning Memory / Scenario / Listening ;
- curriculum 40 / 241 ;
- Scenario 36 / 108 ;
- Listening 0.88 / 0.65 ;
- containment anti-duplication Build 26.6 ;
- parcours humanisé en cinq étapes Build 26.6.

## Clôture

```text
branche
→ PR candidate
→ tous les workflows fonctionnels verts
→ merge exact du head
→ tous les workflows main verts
→ GitHub Pages SUCCESS
→ README / ROADMAP / CHANGELOG / ARCHITECTURE PROD/CLOS
```
