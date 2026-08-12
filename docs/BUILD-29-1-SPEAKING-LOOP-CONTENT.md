# Build 29.1 — Speaking Loop Content

## État

**v1.22.1 — Build 29.1 — CANDIDAT / NON MERGÉ**

Objectif : faire de l’auto-écoute demandée par Trân une vraie brique pédagogique des leçons, sans modifier les moteurs vocaux sanctuarisés ni rendre l’oral obligatoire.

## Contrat pédagogique

Chaque leçon peut proposer au maximum **deux moments** :

1. un moment de répétition sur un élément oral utile sélectionné dans la leçon ;
2. après réussite de la situation finale, un moment pour dire la réponse naturelle avec sa propre voix.

Flux :

```text
🔊 Tyffany
→ Trân parle
→ seconde prise locale volontaire
→ ▶ Ma voix
→ 🔊 Tyffany
→ refaire si elle veut
→ Continuer reste toujours disponible
```

Aucun score de prononciation n’est inventé. L’application invite seulement à comparer rythme et sons.

## Sécurité audio

- `voice-ios.js` inchangé ;
- `free-voice.js` inchangé ;
- `getUserMedia` uniquement après un clic explicite ;
- `MediaRecorder` local ;
- prise maximale 9 secondes ;
- Blob URL temporaire ;
- aucun upload ;
- aucune persistance dans learner/Memory/backups ;
- nettoyage au changement d’étape et à `pagehide`.

Build 29.1 ne remplace pas encore le gate terrain Build 26.1. L’enregistrement automatique du premier essai exact reste interdit tant que la coexistence reconnaissance → réécoute → reconnaissance suivante n’est pas confirmée sur le vrai iPhone.

## Sélection du contenu

Le module s’appuie sur le curriculum réellement chargé et sélectionne un élément oral principal par leçon avec priorité aux phrases utiles, questions et formes contextualisées. La situation finale fournit le second moment.

Le contrat runtime expose :

```text
40 leçons couvertes
maxMoments = 2
```

Le contenu ne crée aucune nouvelle leçon et ne modifie pas la baseline **40 / 241**.

## Fichiers

- `speaking-loop-content.js`
- `speaking-loop-content.css`
- `speaking-loop-smoke.js`
- `.github/workflows/build29-1-speaking-loop-smoke.yml`

Le loader est installé par `build-meta.js`; le Service Worker Build 29 précache les nouveaux assets sans modifier son identité de cache, afin de rester cohérent avec le cache guardian déjà présent dans `index.html`.

## Tribunal

Chrome desktop :

```text
Home
→ vraie Leçon 1
→ étapes réelles
→ Speaking Loop teach visible
→ quiz réel
→ situation finale réelle
→ bonne réponse
→ Speaking Loop challenge visible
```

Chrome mobile `390×844` :

- overflow horizontal = 0 ;
- cible tactile du Speaking Loop >= 44 px ;
- même couverture 40 leçons ;
- aucun écran de boot erreur.

Tous les anciens workflows, Build 29 PWA/offline, Build 28 Recovery, Build 27 App Shell et Build 26.1 Voice Replay doivent rester verts avant merge.
