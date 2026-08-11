# Build 26.1 — Field Feedback UX

Version candidate : **v1.19.1**  
Statut : **CANDIDAT / EN COURS**  
Date : **2026-08-11**

## Origine terrain

Deux retours directs après utilisation réelle :

1. Trân veut pouvoir **réécouter sa propre voix** après avoir parlé, comme dans d’autres applications d’apprentissage des langues ;
2. `Parcours → Détails d’apprentissage` est replié, mais son contenu reste un long empilement vertical de cartes techniques.

Le build traite uniquement ces deux points, sans ajouter de menu principal ni toucher aux données apprenantes.

## 1. Réécoute de sa propre voix

Nouveaux fichiers :

```text
voice-replay.js
voice-replay.css
```

Principe : capture locale best-effort avec `getUserMedia` + `MediaRecorder` en parallèle du moteur de reconnaissance existant.

Après une réponse enregistrable, l’interface peut afficher :

```text
🎧 Giọng của tôi / Ma voix
▶ Nghe lại / Réécouter
```

### Contrat de sécurité

- `voice-ios.js` reste byte-identique ;
- `free-voice.js` reste byte-identique ;
- le nouveau module ne bloque, n’annule ni ne remplace le handler de reconnaissance existant ;
- si la capture MediaRecorder échoue ou n’est pas disponible, la reconnaissance actuelle continue ;
- aucun score de prononciation n’est inventé ;
- aucun audio n’est envoyé vers un serveur ;
- aucun Blob/audio n’est écrit en `localStorage` ;
- seul le dernier enregistrement de la session est conservé en mémoire via une URL Blob, puis révoqué lors du remplacement ou de la fermeture de page ;
- durée de sécurité : 15 secondes max ;
- garde de démarrage : si la reconnaissance ne passe jamais en état d’écoute, la capture est arrêtée rapidement.

### Gate iPhone

Le navigateur Chrome de CI peut valider le wiring, la présence UI et l’absence de persistance. La coexistence réelle `SpeechRecognition + MediaRecorder` doit encore être confirmée sur **l’iPhone de Trân**. Si iOS refuse la capture parallèle, le fallback attendu est : reconnaissance intacte, pas de bouton de réécoute pour cette tentative.

## 2. Détails d’apprentissage — fin du parchemin

Build 25 avait correctement caché les détails derrière un `<details>`, mais `collectSecondaryCards()` déplaçait ensuite toutes les cartes moteur dans un seul conteneur vertical.

Build 26.1 les classe désormais dans 4 familles :

1. 🧠 **Mémoire & révisions** — acquis, Learning Memory, Error Intelligence ;
2. 🎯 **Maîtrise** — Mastery A0/A1, blocs de consolidation ;
3. 🎧 **Pratique réelle** — Scenario + Listening ;
4. 🌐 **Soutien de Lucie** — adaptation VI / FR.

### UX

- l’enveloppe `Détails d’apprentissage` reste fermée par défaut ;
- à l’intérieur : grille 2 colonnes sur desktop, 1 colonne sur mobile ;
- chaque famille possède un titre, une courte explication et un état synthétique ;
- une seule famille peut être ouverte à la fois ;
- une famille ouverte occupe toute la largeur desktop ;
- les cartes moteur d’origine restent intactes dans leur famille ;
- aucun changement de persistance ou de calcul pédagogique.

## Version / cache

```text
version = 1.19.1
build   = 26.1
cache   = tran-french-teacher-v1.19.1-b26.1-field-feedback
```

## CI

Le build ajoute `Build 26.1 Field Feedback UX smoke` et renforce `Build 25 Progression UX smoke`.

Contrats :

- syntaxe Voice Replay / Progression / SW / Build Meta ;
- wiring cache/version ;
- aucun `localStorage.setItem` dans Voice Replay ;
- UI Replay VI + DEBUG FR présente en Chrome ;
- MediaRecorder détecté en Chrome CI ;
- 4 groupes de détails présents ;
- 0 groupe ouvert en mode compact ;
- 1 seul groupe ouvert en mode détails smoke ;
- anciennes cartes Memory / Mastery / Scenario / Listening / Language toujours présentes ;
- profil l8 intact ;
- curriculum 40 leçons intact ;
- Build 26 Real Life III intact ;
- Listening 0.88 / 0.64 intact ;
- Options / nav / Session UX intacts ;
- branding et fichiers voix sanctuarisés.

## Checklist

- [x] audit du point de coupure ;
- [x] Build 26 réparé, validé, mergé et documenté ;
- [x] architecture Voice Replay séparée ;
- [x] regroupement Détails d’apprentissage ;
- [x] cache/version candidate ;
- [x] smoke dédié ;
- [ ] PR candidate ;
- [ ] tribunal PR vert ;
- [ ] merge `main` ;
- [ ] tribunal `main` vert ;
- [ ] Pages SUCCESS ;
- [ ] test terrain iPhone pour coexistence micro ;
- [ ] docs post-prod CLOS.
