# v1.17.3 — Build 24.3 — Premium Interaction UX

## Problème observé

French Trân’quille fonctionnait à nouveau après Build 24.2, mais l’expérience restait trop proche d’un site web :

- peu ou pas de réponse visuelle pendant l’appui ;
- `Pratiquer` apparaissait comme une bottom-sheet modale alors que `Aujourd’hui` et `Parcours` étaient de vrais écrans ;
- hiérarchie de navigation incohérente ;
- sensation mobile insuffisamment premium.

## Intention

Créer une couche de feedback commune à toute l’application sans toucher à la pédagogie ni aux données.

## Changements

### Interaction Layer

Nouveaux fichiers :

- `interaction-ux.js`
- `interaction-ux.css`

Le runtime écoute `pointerdown / pointerup / pointercancel` en capture et applique un état visuel immédiat `.ux-pressing`.

Les surfaces concernées incluent :

- boutons ;
- liens ;
- bottom navigation ;
- actions de leçon ;
- choix de réponse ;
- Daily Coach ;
- cartes Scenario ;
- options Listening ;
- actions Révision/Conversation quand elles utilisent les composants existants.

### Feedback visuel

- compression courte ;
- contraste/luminosité légèrement augmentés ;
- glow court ;
- flash de confirmation au clic ;
- focus clavier visible ;
- état actif de navigation renforcé ;
- transition d’écran ~185 ms ;
- support `prefers-reduced-motion`.

### Pratiquer

Le moteur historique garde son overlay interne pour la compatibilité, mais sa représentation devient un vrai écran :

- fond plein écran cohérent avec l’app ;
- aucune couche floutée sur la Home ;
- aucune croix de fermeture ;
- bottom bar toujours visible ;
- onglet `Pratiquer` actif ;
- contenu jusqu’à la barre de navigation ;
- retour via `Aujourd’hui` ou `Parcours` comme dans une app mobile classique.

## Données protégées

Aucune modification de :

- `francais-avec-luc:learner:v1` ;
- Learning Memory ;
- Error Intelligence ;
- Scenario storage ;
- Listening storage ;
- curriculum ;
- `voice-ios.js` ;
- `free-voice.js` ;
- `assets/LOGO.png` ;
- `assets/Favicon.png`.

## PWA

Cache candidat :

```text
tran-french-teacher-v1.17.3-b24.3-premium-interaction
```

Assets UX :

```text
ux-shell.css?v=1.17.3-b24.3
ux-shell.js?v=1.17.3-b24.3
interaction-ux.css?v=1.17.3-b24.3
interaction-ux.js?v=1.17.3-b24.3
build-meta.js?v=1.17.3-b24.3
```

## Contrat CI

Le smoke navigation utilise un viewport **390×844** et exige :

- [x] runtime `FrenchTranquilleInteraction` chargé ;
- [x] CSS Interaction chargé ;
- [x] stabilité des nœuds bottom-nav ;
- [x] `pointerdown` → `.ux-pressing` sur Pratiquer ;
- [x] `pointerdown` → `.ux-pressing` sur Parcours ;
- [x] `pointerdown` → `.ux-pressing` sur Aujourd’hui ;
- [x] écran Pratiquer présent ;
- [x] bas de Pratiquer aligné sur le haut de la bottom bar ;
- [x] aucune croix modale visible ;
- [x] onglet Pratiquer actif ;
- [x] navigation complète ;
- [ ] quality générale ;
- [ ] Options smoke ;
- [ ] PR ;
- [ ] main ;
- [ ] Pages.

## Clôture

Build 24.3 reste **CANDIDAT** tant que PR, `main` et GitHub Pages ne sont pas tous verts.
