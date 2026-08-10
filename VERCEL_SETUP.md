# Vercel setup — Trân French Teacher

Version cible : **v1.1.1 — Build 6**

Cette configuration peut déployer **toute la PWA + le backend Realtime** sur Vercel depuis le même repo GitHub.

## 1. Importer le repo

Dans Vercel :

1. New Project
2. Import Git Repository
3. sélectionner `shinobione/tran-french-teacher`
4. Framework Preset : **Other** / aucun framework nécessaire
5. Root Directory : racine du repo
6. ne pas définir de commande de build personnalisée

Vercel sert les fichiers statiques à la racine et transforme automatiquement les fichiers de `api/` en Vercel Functions.

## 2. Variables d'environnement obligatoires

Dans **Project Settings → Environment Variables** :

### `OPENAI_API_KEY`

Clé API OpenAI privée. Elle reste côté serveur et ne doit jamais être ajoutée au repo ou au JavaScript navigateur.

### `TUTOR_ACCESS_TOKEN`

Jeton privé long utilisé pour empêcher qu'un tiers utilise le proxy Realtime et consomme la clé OpenAI.

Choisir une valeur longue et aléatoire, par exemple au moins 24–32 caractères.

Le jeton sera saisi une seule fois sur l'iPhone de Trân et stocké uniquement dans le `localStorage` de cet appareil.

## 3. Variables facultatives

```text
OPENAI_REALTIME_MODEL=gpt-realtime
OPENAI_REALTIME_VOICE=cedar
ALLOWED_ORIGINS=
```

`cedar` est le choix par défaut de Luc. `marin` peut être testé ensuite.

## 4. Déployer

Après avoir ajouté les variables d'environnement, lancer ou relancer un **Production Deployment**.

Une modification de variable d'environnement n'affecte pas un ancien déploiement : il faut redéployer.

## 5. Vérification backend

Ouvrir :

```text
https://<projet>.vercel.app/api/health
```

Réponse attendue :

```json
{
  "ok": true,
  "openaiConfigured": true,
  "accessProtected": true,
  "realtimeModel": "gpt-realtime",
  "realtimeVoice": "cedar",
  "version": "1.1.1",
  "build": 6
}
```

Aucune clé ou valeur secrète n'est renvoyée par cette route.

## 6. iPhone de Trân

Si Trân utilise directement l'URL Vercel de la PWA, l'app détecte automatiquement `/api/realtime` sur le même domaine.

La première fois qu'elle ouvre l'écran de conversation vocale, l'app demande le **code d'activation**. Saisir la valeur de `TUTOR_ACCESS_TOKEN` une fois. Elle reste locale à l'iPhone.

Ensuite :

1. ouvrir `Hội thoại` ;
2. toucher `Bắt đầu nói với Luc` ;
3. autoriser le microphone ;
4. Luc démarre la session Realtime.

## 7. Garder GitHub Pages en parallèle

GitHub Pages continue de fonctionner pour la PWA statique.

Pour utiliser le backend Vercel depuis GitHub Pages :

1. activer `DEBUG FR` ;
2. dans `PWA-2 BACKEND`, entrer :

```text
https://<projet>.vercel.app/api/realtime
```

3. dans `VERCEL SECURITY`, entrer le `TUTOR_ACCESS_TOKEN` ;
4. tester le backend.

Le backend autorise déjà `https://shinobione.github.io` comme origine navigateur.

## Sécurité

- ne jamais committer `OPENAI_API_KEY` ;
- ne jamais committer `TUTOR_ACCESS_TOKEN` ;
- ne pas utiliser la protection CORS comme seule sécurité ;
- le proxy Realtime exige le header privé `X-Tutor-Token` ;
- `.env*` est ignoré par Git sauf `.env.example`.
