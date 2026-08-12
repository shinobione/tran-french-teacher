# Build 26.7 — Progress Open-Details Geometry

**Version : v1.19.7**  
**Build : 26.7**  
**État : ✅ PROD / CLOS**

## Retour terrain

Une vidéo réelle du 12 août 2026 a montré une régression desktop introduite après Build 26.6 :

- `Détails d’apprentissage` fermé : Progress restait lisible ;
- `Détails d’apprentissage` ouvert : la colonne apprenante pouvait être compressée jusqu’à une bande extrêmement étroite ;
- les titres et lignes de leçon passaient alors presque lettre par lettre ;
- une grande zone vide apparaissait à droite sous le dashboard.

Ce problème était distinct de la prolifération de cartes corrigée en 26.6.

## Cause confirmée

Build 26.6 avait correctement restauré la frontière DOM historique nécessaire à Memory/Mastery/Stage, mais sa grille imbriquée desktop conservait :

```css
grid-template-columns:minmax(0,.94fr) minmax(440px,1.06fr);
```

Le track de droite gardait donc un plancher fixe de 440 px. Lorsque le dashboard Details s’ouvrait et exposait son contenu, la colonne droite pouvait imposer une largeur intrinsèque importante pendant que le track gauche était explicitement autorisé à descendre jusqu’à 0.

Résultat terrain : le navigateur protégeait Details et sacrifiait le parcours.

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

### Desktop large

Lorsque Details est ouvert :

```css
grid-template-columns:minmax(0,1fr) minmax(0,1fr);
```

Les deux tracks sont réellement shrinkables et aucun plancher fixe ne peut voler la largeur de l’autre.

Le dashboard ouvert passe à **deux tuiles par ligne**.

### Desktop compact / tablette paysage

Entre 861 et 1040 px, l’ouverture de Details passe volontairement en pile :

```text
Overview + Curriculum
↓
Details
```

Une pile large et lisible est préférée à deux colonnes microscopiques.

Mobile <=860 px conserve les règles 26.6.

## Tribunal Build 26.7 — preuves réelles

Le workflow dédié ouvre réellement `Parcours`, clique sur `Détails d’apprentissage`, puis mesure la géométrie rendue avec `getBoundingClientRect()`.

### Chrome 1640×900

Mesures certifiées :

```text
composition          920 px
learner flow         452 px
Details              452 px
Overview             452 px
Curriculum           452 px
min lesson row       410 px
dashboard columns    2
side by side         oui
horizontal overflow  0
containment 26.6     oui
```

Seuils contractuels : flow >=420 px, Details >=420 px, lesson row >=400 px.

### Chrome 980×900

Mesures certifiées :

```text
learner flow         906 px
min lesson row       864 px
vertical stack       oui
horizontal overflow  0
containment 26.6     oui
```

Seuils contractuels : flow >=620 px, lesson row >=580 px.

## Anti-régression 26.6 conservée

Le workflow Build 26.6 a été rendu version-forward uniquement sur le numéro global de build/cache. Ses vrais tests navigateur restent intacts et passent avec 26.7 :

- Details dans la frontière historique ;
- quiescence puis **12 → 12 cartes** ;
- `Autres détails` borné ;
- cartes moteur uniques ;
- 5 étapes curriculum ;
- vrais clics `Voir tout` puis `A1 Core` ;
- mobile 5/40 + Details replié.

## Sanctuaires

Build 26.7 ne modifie pas :

- `voice-ios.js` ;
- `free-voice.js` ;
- `assets/LOGO.png` ;
- `assets/Favicon.png` ;
- `francais-avec-luc:learner:v1` ;
- Learning Memory / Scenario / Listening ;
- curriculum **40 / 241** ;
- Scenario **36 / 108** ;
- Listening **0.88 / 0.65** ;
- containment anti-duplication Build 26.6 ;
- parcours humanisé en cinq étapes Build 26.6.

## Production

```text
PR runtime #54
head validé : 6b44b212bd1c859be18629e4726d55d3e5da0241
PR : 13/13 workflows fonctionnels SUCCESS

merge squash main : eaa4b9f8688a90de85a3f853dc29e59d0b8ac650
main : 13/13 workflows fonctionnels SUCCESS
GitHub Pages #110 : SUCCESS
```

## Critère de clôture — terminé

```text
branche ✅
→ PR candidate ✅
→ tous les workflows fonctionnels verts ✅
→ merge exact du head ✅
→ tous les workflows main verts ✅
→ GitHub Pages SUCCESS ✅
→ README / ROADMAP / CHANGELOG / ARCHITECTURE synchronisés ✅
```

Le seul gate terrain encore volontairement ouvert dans la roadmap globale reste l’auto-écoute Build 26.1 sur le vrai iPhone de Trân.
