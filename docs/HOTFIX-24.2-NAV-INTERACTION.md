# French Trân’quille — Hotfix 24.2 / Navigation Interaction

## Incident

Sur un vrai Chrome desktop en DEBUG FR, la barre apprenante `Aujourd’hui / Pratiquer / Parcours` pouvait être visible mais ne pas réagir aux clics.

Les smokes Chrome propres confirmaient que la logique de navigation et le hit-testing fonctionnaient, y compris après scroll. Le problème était donc compatible avec un état client/cache PWA incohérent ou une interaction fragilisée par les couches runtime.

## Correctifs

- `src/ui/ux-shell.js` : le menu ne remplace plus ses boutons si son état visuel n’a pas changé ;
- le handler principal de navigation est exécuté en phase de capture pour recevoir le clic avant les couches applicatives ;
- `src/ui/ux-shell.js` et `src/ui/ux-shell.css` sont servis avec le token neuf `1.17.2-b24.2` ;
- `src/core/build-meta.js` utilise le même token neuf ;
- le cache service worker devient `tran-french-teacher-v1.17.2-b24.2-nav-hotfix` ;
- `index.html` utilise exactement la même identité de cache lors du nettoyage ;
- ajout d’un smoke Chrome permanent qui vérifie le hit-testing et les clics physiques sur `Pratiquer`, `Parcours` et `Aujourd’hui`, page scrollée en viewport desktop.

## Sanctuaires

Aucune modification de :

- progression apprenante / clés `localStorage` ;
- curriculum ;
- Learning Memory ;
- Scenario / Real Life ;
- `voice-ios.js` ;
- `free-voice.js` ;
- logo / favicon.

## Critère de livraison

Ne pas merger si l’un des éléments suivants est rouge :

- quality générale ;
- Options smoke ;
- nav click smoke ;
- GitHub Pages après merge.
