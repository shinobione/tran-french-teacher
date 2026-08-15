# Build 29.1 — Speaking Loop Content

## État

**v1.22.1 — Build 29.1 — ✅ PROD / CLOS**

Objectif : faire de l’auto-écoute demandée par Trân une vraie brique pédagogique des leçons, sans modifier les moteurs vocaux sanctuarisés ni rendre l’oral obligatoire.

## Preuves production

- PR runtime : **#66** ;
- head PR certifié : `df730d60a8434819cb19f116eb0dc66c3718b5f4` ;
- PR : **19/19 workflows fonctionnels SUCCESS** ;
- runtime production : `b2fde53792c38d1e6283d8779bbcedfac36f9502` ;
- `main` : **19/19 workflows fonctionnels SUCCESS** ;
- GitHub Pages : **#122 SUCCESS** ;
- total runtime `main` : **20/20 SUCCESS Pages incluse**.

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

- `voice-ios.js` byte-identique ;
- `free-voice.js` byte-identique ;
- `getUserMedia` uniquement après un clic explicite ;
- `MediaRecorder` local ;
- prise maximale 9 secondes ;
- Blob URL temporaire ;
- aucun upload ;
- aucune persistance dans learner / Memory / backups ;
- nettoyage au changement d’étape et à `pagehide` ;
- modèle Tyffany routé par la chaîne vocale historique.

Build 29.1 ne remplace pas le gate terrain Build 26.1. L’enregistrement automatique du premier essai exact reste interdit tant que la coexistence **reconnaissance → réécoute → reconnaissance suivante** n’est pas confirmée sur le vrai iPhone.

## Sélection du contenu

Le module s’appuie sur le curriculum réellement chargé et sélectionne un élément oral principal par leçon avec priorité aux phrases utiles, questions et formes contextualisées. La situation finale fournit le second moment.

Contrat runtime certifié :

```text
40 leçons couvertes
maxMoments = 2
```

Le contenu ne crée aucune nouvelle leçon et ne modifie pas la baseline **40 / 241**.

## Fichiers

- `src/pedagogy/speaking-loop-content.js`
- `src/pedagogy/speaking-loop-content.css`
- `tests/smoke/speaking-loop-smoke.js`
- `.github/workflows/build29-1-speaking-loop-smoke.yml`

Le loader est installé par `src/core/build-meta.js`; le Service Worker Build 29 précache les nouveaux assets sans modifier son identité de cache, afin de rester cohérent avec le cache guardian de la PWA.

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
- cible tactile du Speaking Loop ≥44 px ;
- même couverture 40 leçons ;
- aucun écran de boot erreur.

Gates hérités également verts sur le runtime :

- Build 29 PWA/offline ;
- Build 28 Recovery ;
- Build 27 App Shell ;
- Build 26.1 Voice Replay ;
- Session / Listening / Options / nav ;
- Build 26.6 containment ;
- Build 26.7 geometry ;
- Build 26.8 Focus Flow ;
- Build 26.9 Content Reliability ;
- quality + marqueurs historiques Build 24.

## Gate terrain restant

Sur le vrai iPhone :

```text
Free Voice reconnu
→ seconde prise locale
→ réécoute
→ nouvelle réponse Free Voice reconnue normalement
```

Ce gate est volontairement le seul prérequis avant d’étudier une future capture automatique du premier essai exact.