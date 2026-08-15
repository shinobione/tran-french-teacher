# Build 26.6 — Progress Dashboard Containment + Humanized Curriculum

**Version : v1.19.6**  
**Build : 26.6**  
**État : ✅ PROD / CLOS**  
**PR runtime : #52**  
**Head PR certifié : `b43eca2cb06c0272e13b1794dfecf26d7abec322`**  
**Commit runtime production : `7bb48979f21db0cf1cc94d7a9e03e225f2e1cc7a`**  
**GitHub Pages : #108 SUCCESS**  
**Tribunal : 12/12 workflows fonctionnels SUCCESS sur PR et sur `main`**

## Retour terrain

Une vidéo réelle du 12 août 2026 a montré deux problèmes dans `Parcours` après Build 26.5 :

1. `Autres détails` augmentait continuellement sans interaction (`24 → 123 → 179 → 218 → 326`, avec plus de 500 cartes observées plus tard) ;
2. `Voir les 40 leçons` rendait simultanément les 40 lignes, produisant une page extrêmement longue et peu humaine.

Le premier problème était une **régression fonctionnelle active**, pas seulement un défaut visuel.

## Cause racine confirmée

Plusieurs moteurs historiques injectent leur carte Progress en utilisant la première colonne comme frontière d’appartenance :

```js
const column = document.querySelector('.screen-progress .progress-layout > div:first-child');
if (!column || column.querySelector('.memory-progress-card')) return;
```

Build 25 déplaçait ces cartes dans `Détails d’apprentissage`, mais `Détails` restait alors descendant de la première colonne. Les moteurs retrouvaient donc leur carte existante.

Build 26.5 avait déplacé `Détails` comme frère direct pour obtenir des colonnes visuellement indépendantes :

```text
progress-layout
├── colonne gauche
└── Détails
```

Conséquence :

```text
moteur Memory / Mastery / Stage…
        ↓
ne trouve plus sa carte dans la première colonne
        ↓
recrée une carte
        ↓
Progression la déplace dans Détails
        ↓
le moteur ne la trouve toujours plus
        ↓
recrée une carte
        ↓
∞
```

Le dashboard n’était donc pas la source initiale de la duplication : la nouvelle frontière DOM de 26.5 rendait les moteurs historiques incapables de reconnaître leurs propres cartes.

## Correction structurelle 26.6

Build 26.6 restaure la **frontière de propriété historique** sans revenir au mauvais layout visuel.

DOM :

```text
progress-layout
└── progress-ux-composition   ← première colonne historique
    ├── progress-ux-left-flow
    │   ├── Résumé
    │   └── Curriculum
    └── Détails d’apprentissage
```

CSS desktop :

```text
progress-ux-composition
├── gauche : progress-ux-left-flow
└── droite : Détails
```

Ainsi :

- Memory / Mastery / Error / Stage 2 / Stage 3 retrouvent leurs cartes ;
- le rendu desktop reste en deux colonnes ;
- la hauteur de Détails ne pousse pas le Curriculum ;
- aucun scroll interne à Détails n’est réintroduit ;
- aucune migration de données n’est nécessaire ;
- aucun moteur pédagogique historique n’est réécrit.

## Dashboard : appartenance stable

`src/ui/progress-details-dashboard.js` reçoit en plus un contrat défensif :

- chaque carte reçoit une famille stable `data-progress-detail-family` ;
- une carte déjà classée n’est plus reclassée à cause d’un changement de texte/DOM ;
- `Résumé` et `Curriculum` sont interdits dans Détails ;
- `Éléments appris` appartient explicitement à Mémoire ;
- l’API expose les comptes par famille pour le test de stabilité.

### Preuve temporelle

Le smoke attend la quiescence réelle des moteurs : **5 snapshots identiques consécutifs**. Ensuite il laisse encore vivre les observers pendant 3 secondes.

Profil synthétique l8 certifié :

```text
Dashboard après quiescence = 12 cartes
3 secondes plus tard       = 12 cartes
Autres détails             = 1
forbidden cards            = 0
engine cards uniques       = oui
```

Le bug terrain `12 → 24 → 123 → 500+` ne peut plus satisfaire ce contrat.

## Parcours complet : 40 leçons sans mur de 40 lignes

Le mode compact conserve cinq leçons autour de la position actuelle.

Quand l’utilisatrice demande tout le parcours, Build 26.6 affiche cinq étapes :

1. **Survie A0** — leçons 1–7 ;
2. **Vie quotidienne** — leçons 8–15 ;
3. **Fondations A1** — leçons 16–20 ;
4. **Premiers échanges** — leçons 21–25 ;
5. **A1 Core** — leçons 26–40.

L’étape contenant la leçon actuelle s’ouvre par défaut. Une seule étape affiche ses leçons à la fois.

À la position synthétique l8 :

```text
Vue compacte : 5 lignes
Vue parcours : étape 2 = 8 lignes
A1 Core : 15 lignes
Total accessible : 40
```

Le tribunal clique réellement sur `Voir tout le parcours`, puis réellement sur `A1 Core`.

Les changements d’état sont flushés dans le même geste utilisateur afin de ne pas dépendre d’un futur `requestAnimationFrame` pour devenir cohérents.

## Tribunal Build 26.6 — résultat final

Le workflow dédié prouve sur desktop et mobile :

- [x] `Détails` contenu dans la frontière historique ;
- [x] Résumé et Curriculum hors de Détails ;
- [x] dashboard arrivé à quiescence ;
- [x] nombre total de cartes identique après observation ;
- [x] nombre borné ;
- [x] cartes moteur principales uniques ;
- [x] aucune carte Overview/Curriculum dans Détails ;
- [x] `Autres détails` borné ;
- [x] vrai clic `Voir tout le parcours` ;
- [x] 5 étapes ;
- [x] vrai clic `A1 Core` ;
- [x] A1 Core = 15 lignes ;
- [x] total curriculum = 40 ;
- [x] jamais 40 lignes visibles simultanément ;
- [x] dashboard stable après navigation ;
- [x] mobile : Détails replié au départ ;
- [x] mobile : curriculum compact 5/40.

Les contrats historiques restent verts : Build 25 Progression, Build 25.1 Listening, Build 25.2 Session, Build 26 Real Life III, Build 26.1 Voice Replay/Dashboard, Build 26.3 interactions, Build 26.4 single-scroll/Tyffany et Build 26.5 Conversation/Layout.

## Preuves release

```text
PR #52 head b43eca2c...      12/12 fonctionnels SUCCESS
main 7bb48979...            12/12 fonctionnels SUCCESS
GitHub Pages #108           SUCCESS
```

Après certification du runtime, aucun workflow n’était en échec, en cours ou en attente sur ce SHA.

## Sanctuaires conservés

Build 26.6 ne modifie ni :

- `voice-ios.js` ;
- `free-voice.js` ;
- `assets/LOGO.png` ;
- `assets/Favicon.png` ;
- `francais-avec-luc:learner:v1` ;
- les états Memory / Scenario / Listening ;
- le curriculum canonique **40 / 241** ;
- Scenario **36 / 108** ;
- Listening **0.88 / 0.65**.

## Gate encore ouvert

Build 26.6 est fermé. Le gate terrain restant appartient à **Build 26.1 Voice Self-Playback** :

```text
réponse reconnue
→ seconde prise locale
→ réécoute correcte
→ réponse vocale suivante toujours reconnue normalement
```

La capture simultanée exacte du premier essai reste hors scope jusqu’à validation réelle sur l’iPhone de Trân.
