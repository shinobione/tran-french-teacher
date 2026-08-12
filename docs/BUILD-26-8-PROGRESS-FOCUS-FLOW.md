# Build 26.8 — Progress Focus Flow

**Version candidate : v1.19.8**  
**Build : 26.8**  
**État : CANDIDAT — PR → CI → main → Pages requis avant PROD**

## Retour terrain

La vidéo réelle du 12 août 2026 montre que Build 26.7 a réparé la géométrie mais pas encore la longueur cognitive de `Parcours`.

Le problème n'est plus une colonne écrasée. Il reste un comportement de type « parchemin » : lorsque l'utilisateur ouvre une famille de `Détails d’apprentissage`, le Résumé, le Curriculum, les six tuiles du dashboard, la famille active et ses cartes restent tous présents dans le même document.

Même correctement dimensionné, cet empilement oblige à scroller longtemps et sous-utilise un grand écran.

## Intention UX

Build 26.8 introduit un principe simple :

> une intention active possède l'écran ; le contexte non nécessaire disparaît temporairement puis revient à la sortie.

La transition reste une couche de présentation. Les nœuds Memory / Mastery / Listening / Scenario ne sont jamais clonés ni déplacés hors de la frontière DOM historique restaurée en 26.6.

## Vue normale

`Parcours` conserve :

- le Résumé ;
- le curriculum compact autour de la position actuelle ;
- `Détails d’apprentissage` et ses familles ;
- les protections de cardinalité et de géométrie 26.6 / 26.7.

## Focus Détails

Clic sur une famille (`Mémoire`, `Maîtrise`, `Compréhension orale`, `Français réel`, `A1 & rythme`, `Autres`) :

1. fade-out court de la composition actuelle ;
2. le flux Résumé + Curriculum est masqué ;
3. la grille des familles est masquée ;
4. la famille choisie occupe toute la surface Progress ;
5. les cartes utilisent deux colonnes sur grand desktop et une seule colonne sur écran plus étroit ;
6. un contrôle explicite `Retour aux détails` referme la famille ;
7. fade-in de la vue précédente.

Le panneau `Details` reste à sa place dans `.progress-ux-composition`. Le containment 26.6 n'est jamais violé.

## Focus Curriculum

`Voir tout le parcours` devient un vrai changement de contexte :

1. Résumé et Détails disparaissent ;
2. le Curriculum prend toute la largeur ;
3. les 5 étapes deviennent une rangée sur grand desktop ;
4. les leçons de l'étape active utilisent deux colonnes sur grand desktop ;
5. mobile reste une seule colonne ;
6. `Retour au résumé` restaure la vue compacte 5 lignes.

Les 40 leçons restent accessibles mais jamais affichées simultanément.

## Utilisation de l'espace

La largeur historique globale de l'application reste inchangée hors focus.

Uniquement pendant un focus Progress, `.app-shell` peut s'étendre jusqu'à 1420 px afin qu'un écran desktop large ne conserve pas une colonne centrale inutilement étroite.

## Mouvement

Transition cible : environ 145 ms fade / léger déplacement vertical. Le changement de layout intervient entre les deux phases afin d'éviter le flash d'un DOM recomposé.

`prefers-reduced-motion: reduce` désactive les animations et conserve exactement le même contrat fonctionnel.

## Responsive

- grand desktop : focus pleine largeur, détails 2 colonnes, curriculum 5 étapes horizontales + leçons 2 colonnes ;
- desktop / tablette : détails 1 colonne, étapes 2 colonnes ;
- iPhone / mobile <= 860 px : une seule colonne, toolbar compacte, aucun overflow horizontal.

## Tribunal Build 26.8

Le workflow dédié vérifie en vrai Chrome :

### Focus Détails desktop 1640×900

- famille Memory réellement ouverte ;
- `data-b268-focus=details` ;
- learner flow masqué ;
- grille de familles masquée ;
- panneau actif visible ;
- toolbar retour visible ;
- surface focus >= 900 px ;
- aucun overflow horizontal ;
- containment 26.6 intact.

### Focus Curriculum desktop 1640×900

- curriculum réellement développé ;
- Overview masqué ;
- Details masqué ;
- Curriculum visible ;
- toolbar retour visible ;
- surface focus >= 900 px ;
- aucun overflow horizontal ;
- containment intact.

### Round-trip

Chrome exécute :

```text
vue compacte
→ Memory focus
→ retour
→ Curriculum focus
→ retour
```

Puis exige :

- aucun focus actif ;
- aucune famille active ;
- curriculum compact restauré à 5 lignes.

### Mobile 390×844

Focus Details :

- toolbar visible ;
- surface >= 320 px ;
- aucun overflow horizontal ;
- containment intact.

## Sanctuaires

Build 26.8 ne modifie pas :

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
- géométrie open-Details Build 26.7 ;
- parcours humanisé en cinq étapes.

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
