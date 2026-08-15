# v1.17.4 — Build 24.4 — Mobile Polish / Interaction Timing

## Retour terrain

Sur vrai mobile, Build 24.3 avait un comportement asymétrique :

- retaper l’onglet déjà actif montrait bien le feedback tactile ;
- changer réellement d’onglet faisait disparaître le feedback presque immédiatement ;
- le header de leçon gardait un gros bandeau violet/sticky jugé trop lourd.

## Cause navigation

`src/ui/ux-shell.js` reconstruisait la bottom bar via `innerHTML` quand l’état actif changeait.

Un tap réel suit :

```text
pointerdown → pointerup → click → navigation / rerender
```

Le bouton pressé pouvait être détruit au moment où le nouvel état actif était rendu. L’animation appartenant à ce nœud disparaissait avec lui.

## Correctif

### Bottom nav persistante

Les boutons `Aujourd’hui / Pratiquer / Parcours` sont créés une seule fois puis mis à jour in-place :

- label ;
- icône ;
- classe `active` ;
- `aria-current`.

Aucun remplacement de nœud lors d’un simple changement d’écran.

### Tap echo

`src/ui/interaction-ux.js` crée un élément visuel `ux-tap-echo` positionné sur le rectangle du composant au `pointerdown`.

Cet élément vit dans `document.body`, avec `pointer-events:none`, et disparaît après ~230 ms. Il reste donc perceptible même si la surface initiale est rerendue.

### Header de leçon

`src/ui/mobile-polish.css` retire :

- le fond violet opaque ;
- le comportement sticky ;
- le backdrop blur du header.

Il conserve :

- retour compact ;
- titre centré ;
- séparation gradient fine ;
- focus mode de la leçon et navigation basse existante.

## PWA

Cache candidat :

```text
tran-french-teacher-v1.17.4-b24.4-mobile-polish
```

Assets :

```text
src/ui/ux-shell.css?v=1.17.4-b24.4
src/ui/interaction-ux.css?v=1.17.4-b24.4
src/ui/mobile-polish.css?v=1.17.4-b24.4
src/ui/ux-shell.js?v=1.17.4-b24.4
src/ui/interaction-ux.js?v=1.17.4-b24.4
src/core/build-meta.js?v=1.17.4-b24.4
```

## Données protégées

Aucune modification de la clé apprenant, Memory, Error, Scenario, Listening, curriculum, voix ou branding.

## Contrat CI

- [x] viewport 390×844 ;
- [x] feedback `ux-pressing` sur les 3 onglets ;
- [x] `ux-tap-echo` sur les 3 onglets ;
- [x] mêmes objets DOM avant/après Pratiquer → Parcours → Home ;
- [x] exactement un onglet actif ;
- [x] Pratiquer reste un écran complet ;
- [x] header leçon non sticky ;
- [x] header leçon sans fond opaque ;
- [ ] quality générale ;
- [ ] Options smoke ;
- [ ] PR ;
- [ ] main ;
- [ ] Pages.

Build 24.4 reste **CANDIDAT** jusqu’à validation complète de production.
