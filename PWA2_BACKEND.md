# PWA-2 Voice — Backend Realtime

La PWA publique reste hébergée sur GitHub Pages. GitHub Pages ne peut pas exécuter de code serveur ; la conversation OpenAI Realtime a donc besoin d'un petit endpoint séparé.

## Endpoint fourni

Le repo contient :

- `api/realtime.js`

Cet endpoint :

- reçoit l'offre SDP WebRTC du navigateur ;
- conserve `OPENAI_API_KEY` côté serveur ;
- crée la session OpenAI Realtime ;
- renvoie la réponse SDP au navigateur ;
- configure Luc pour Trân A0 avec environ 95 % vietnamien / 5 % français ;
- utilise `cedar` par défaut pour la voix ;
- active la transcription d'entrée uniquement comme aide d'affichage ;
- n'envoie jamais la clé OpenAI au navigateur.

## Variables d'environnement

Obligatoire :

```text
OPENAI_API_KEY=...
```

Optionnelles :

```text
OPENAI_REALTIME_MODEL=gpt-realtime
OPENAI_REALTIME_VOICE=cedar
ALLOWED_ORIGINS=https://shinobione.github.io
```

`ALLOWED_ORIGINS` accepte plusieurs origines séparées par des virgules.

## Déploiement serverless

Le fichier `api/realtime.js` suit le format d'une fonction Node serverless classique et peut être déployé avec le repo sur une plateforme supportant les routes `/api`.

Une fois l'endpoint public disponible, exemple :

```text
https://<backend>/api/realtime
```

il faut le renseigner dans la PWA.

### Méthode de debug

Sur le navigateur de Jerry :

1. activer `DEBUG FR` ;
2. ouvrir `Réglages` ;
3. carte `PWA-2 BACKEND` ;
4. coller l'URL HTTPS de l'endpoint ;
5. enregistrer ;
6. ouvrir `Conversation` ;
7. lancer `Conversation vocale avec Luc`.

Le réglage est local à ce navigateur.

### Raccourci URL

Pour un test ponctuel :

```text
https://shinobione.github.io/tran-french-teacher/?debug=fr&realtime=https%3A%2F%2F<backend>%2Fapi%2Frealtime
```

L'URL passée avec `realtime=` est mémorisée localement.

## Activation pour l'iPhone de Trân

Après validation du backend, l'étape suivante est de fixer cet endpoint comme endpoint par défaut dans `realtime-voice.js`. Trân n'aura alors aucun réglage à effectuer : elle ouvrira simplement `Hội thoại` puis `Bắt đầu nói với Luc`.

## Sécurité

Ne jamais mettre `OPENAI_API_KEY` dans :

- `app.js` ;
- `realtime-voice.js` ;
- une variable JavaScript publique ;
- le manifest ;
- GitHub Pages ;
- `localStorage`.

La clé reste exclusivement dans les variables d'environnement du backend.
