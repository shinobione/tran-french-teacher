# Field Reliability V2 — navigation + réécoute leçon

Date : 2026-08-13

## Retour terrain déclencheur

Sur le vrai iPhone de Trân en v2.3.0 :

- plusieurs incohérences de navigation persistent ;
- la vidéo de partage d’écran montre `Hôm nay` actif alors que le contenu Home est vide, et montre aussi Home actif alors que la page Practice reste encore visible ;
- dans Bài 12, `Ghi âm` démarre bien, `Dừng ghi âm` apparaît, mais après Stop aucun bouton `Giọng của tôi` n’est publié.

Le premier hotfix post-Build32 est donc considéré **insuffisant** : il traitait Listening et un `timeslice` MediaRecorder, pas les causes racines observées.

## Cause navigation

La bottom bar visible était partagée entre plusieurs propriétaires :

- `src/ui/ux-shell.js` routait le noyau historique ;
- `src/ui/build27-app-shell.js` possédait Practice et les façades Home/Progress ;
- `src/core/build-meta.js` ajoutait encore des refresh différés ;
- Listening possédait un overlay body indépendant.

Un même geste pouvait donc annoncer une route dans la bottom bar avant que la façade correspondante soit reconstruite, ou laisser une page Build27 en animation au-dessus d’une route déjà changée.

## Contrat V2 navigation

`src/core/stage2-boot.js` enregistre désormais, avant Build27, le propriétaire unique du geste sur `.ux-bottom-nav` :

1. intercepter une fois le clic visible ;
2. fermer Listening, Practice UX, Practice Build27 et Journey ;
3. supprimer immédiatement les surfaces Build27 en sortie après avoir laissé leur handler remettre ses références internes à zéro ;
4. pour Home/Progress, déclencher exactement une route legacy ;
5. reconstruire explicitement la façade Build27 ;
6. ne confirmer la tab active qu’une fois la destination réellement présente ;
7. réessayer jusqu’à quatre RAF si la façade n’est pas encore montée.

## Cause / contrat audio

Le Speaking Loop historique garde `recorder`, `chunks` et `blobUrl` dans un état global au module. Ce fichier est resté identique depuis Build29.2, mais les couches runtime ajoutées depuis multiplient les mutations/renders autour de lui. Le premier hotfix qui supprimait seulement `start(120)` n’a pas corrigé le terrain.

`src/core/field-audio-session.js` prend désormais possession des boutons d’enregistrement des cartes Speaking Loop sans modifier `voice-ios.js` ni `free-voice.js` :

- une prise = un token + un stream + un MediaRecorder + son tableau de chunks ;
- le navigateur choisit son format natif ;
- `requestData()` est demandé avant Stop quand disponible ;
- Stop est décalé de 80 ms pour laisser WebKit livrer ce chunk ;
- le Blob est assemblé depuis **les chunks locaux de cette session**, pas depuis une variable globale susceptible d’être réinitialisée par un render ;
- un re-render de la carte pendant la finalisation ne détruit pas la prise ;
- si 0 octet est réellement reçu, l’UI affiche une erreur explicite au lieu de revenir silencieusement à `Ghi âm` ;
- l’audio reste local, temporaire, non persisté.

Le prototype global `MediaRecorder` du premier hotfix n’est plus chargé.

## Protection

Inchangés :

- `app.js` ;
- `voice-ios.js` ;
- `free-voice.js` ;
- les six stores pédagogiques ;
- Recovery ;
- branding.

## Nouveau tribunal

Workflow `Field reliability V2 — router + lesson audio` :

- hashes sanctuaires exacts ;
- aucun `localStorage.setItem` dans le nouveau module audio ;
- Chrome + vrai MediaRecorder avec fake media device : Record → Stop → DOM rerender → Blob > 0 → Play ;
- Chrome 390×844 : Practice → Listening → Home → Progress → Practice → Home, quatre cycles, une seule tab active et aucun overlay fantôme ;
- stores pédagogiques hors compteur Listening byte-identiques pendant le smoke navigation.

## Gate terrain restant après CI + Pages

Sur le vrai iPhone de Trân :

1. navigation : refaire les transitions montrées dans la vidéo ; aucune page vide, aucune tab incohérente ;
2. Bài 12 : Ghi âm → Dừng ghi âm → `▶ Giọng của tôi` → écoute audible ;
3. refaire une reconnaissance vocale normale ensuite ;
4. si l’UI affiche désormais `Aucun audio reçu`, noter si WhatsApp est en appel/partage d’écran au même moment : ce signal prouvera que MediaRecorder reçoit réellement 0 octet au lieu de laisser le problème invisible.
