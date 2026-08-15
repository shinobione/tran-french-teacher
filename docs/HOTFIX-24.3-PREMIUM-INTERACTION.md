# v1.17.3 — Build 24.3 — Premium Interaction UX

## Statut

**PROD / CLOS — 2026-08-11**

Commit production :

```text
eef4bb7113dcc3f37bab76928f112b8032034ec5
```

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

- `src/ui/interaction-ux.js`
- `src/ui/interaction-ux.css`

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
- actions Révision/Conversation utilisant les composants existants.

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

Le moteur historique garde son overlay interne pour la compatibilité, mais sa représentation est désormais un vrai écran :

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

Cache production :

```text
tran-french-teacher-v1.17.3-b24.3-premium-interaction
```

Assets UX :

```text
src/ui/ux-shell.css?v=1.17.3-b24.3
src/ui/ux-shell.js?v=1.17.3-b24.3
src/ui/interaction-ux.css?v=1.17.3-b24.3
src/ui/interaction-ux.js?v=1.17.3-b24.3
src/core/build-meta.js?v=1.17.3-b24.3
```

## Contrat CI

Le smoke navigation utilise un viewport **390×844**.

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
- [x] quality PR #75 ;
- [x] Options PR #6 ;
- [x] nav interaction PR #19 ;
- [x] PR #24 mergée ;
- [x] quality main #76 ;
- [x] Options main #7 ;
- [x] nav interaction main #20 ;
- [x] GitHub Pages #83.

## Clôture

Build 24.3 est **PROD / CLOS**. Prochain jalon : **v1.18.0 — Build 25 — Real Life French III**.
