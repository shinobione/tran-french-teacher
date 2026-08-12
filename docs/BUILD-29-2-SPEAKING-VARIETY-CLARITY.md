# Build 29.2 — Speaking Loop Variety & Clarity

## État

**v1.22.2 — Build 29.2 — CANDIDAT / NON MERGÉ**

Objectif : rendre les moments d’auto-écoute plus explicites et pédagogiquement variés après les premiers retours réels sur Build 29.1.

## Problèmes observés

1. `Refaire` ne précisait pas qu’il relançait un enregistrement ;
2. la carte Speaking Loop possédait un bouton Tyffany alors que l’étape de leçon possédait déjà son bouton audio ;
3. une réponse de compréhension comme `10 euros` pouvait être recyclée comme cible orale répétée, mélangeant reconnaissance et production.

## UX cible

### Enregistrement

```text
Trân      ↻ Ghi âm lại
DEBUG FR  ↻ Enregistrer à nouveau
```

### Modèle audio sur une étape de leçon

```text
Trân      🔊 Nghe Tyffany
DEBUG FR  🔊 Écouter Tyffany
```

Le bouton natif reçoit aussi un `title` et un `aria-label` qui expliquent que Tyffany lit la phrase modèle en français.

Lorsque ce bouton existe, la carte Speaking Loop ne crée aucun bouton modèle supplémentaire.

## Deux intentions différentes

### Challenge

Le challenge mesure une compréhension ou une reconnaissance :

```text
Tu entends « dix euros ».
Combien est-ce ?
→ 10 euros
```

### Production orale

Le Speaking Loop cherche une phrase utile à produire. La cible finale est donc calculée séparément et apparaît au bilan de la leçon.

Pour Bài 7, avec les acquis antérieurs disponibles, le contrat attendu est :

```text
Compréhension : 10 euros
Production :    Combien ça coûte ?
```

Le curriculum n’est pas altéré : `10 euros` reste la bonne réponse du challenge.

## Planificateur oral

### Priorités

- phrase directement liée à la leçon ;
- phrase/question prononçable et utile ;
- cible différente du premier moment oral ;
- acquis déjà connu seulement s’il partage un contexte réel avec la leçon ;
- `fragile`, `due`, puis `learning` issus de Learning Memory peuvent augmenter la priorité ;
- une cible récemment proposée reçoit une forte pénalité.

### Dépriorisation

- nombre seul ;
- valeur numérique + euro comme `10 euros` ;
- unité isolée `euros` ;
- même cible que le premier moment ;
- cible dans la fenêtre récente ;
- acquis ancien sans lien avec le thème courant.

## Mémoire et données

Le module consulte :

```text
window.FrenchTranquilleMemory.summary()
```

Il n’appelle aucune méthode d’écriture et n’effectue aucun `localStorage.setItem`.

La fenêtre anti-répétition est purement en mémoire du runtime et contient au maximum six phrases.

## Stabilité de la leçon

Le plan est mis en cache pendant la leçon. Les `MutationObserver` peuvent redécorer l’interface sans changer la cible sous les yeux de l’utilisatrice.

Quand la leçon est quittée, son plan peut être recalculé lors d’une prochaine visite en tenant compte des cibles récemment vues.

## Audio

Inchangé par rapport à 29.1 :

```text
clic explicite
→ getUserMedia
→ MediaRecorder
→ max 9 secondes
→ Blob URL local
→ Ma voix
```

- aucun upload ;
- aucune persistance audio ;
- aucun backup audio ;
- aucun faux score de prononciation ;
- Blob détruit au changement de moment/page.

`voice-ios.js` et `free-voice.js` restent byte-identiques.

## Tribunal Build 29.2

### Statique

- v1.22.2 / Build 29.2 ;
- wiring cache/assets ;
- labels VI/DEBUG FR exacts ;
- Memory uniquement consultée ;
- sanctuaires voix/branding/learner ;
- Listening 0.88 / 0.65.

### Chrome desktop

- 40 leçons couvertes ;
- deux cibles distinctes ;
- Bài 7 recap ≠ `10 euros` ;
- Bài 7 recap = `Combien ça coûte ?` avec les acquis antérieurs ;
- source = acquis connu/contextuel ;
- anti-répétition produit une rotation ;
- bouton `Écouter Tyffany` natif ;
- zéro bouton modèle dupliqué sur le teach ;
- un seul modèle au recap final ;
- aucune ancienne carte `challenge` ;
- aucun faux score ;
- zéro overflow.

### Chrome mobile 390×844

- libellé `Nghe Tyffany` ;
- cible tactile ≥44 px ;
- zéro overflow ;
- même planificateur et même cardinalité.

## Contrats conservés

- curriculum **40 / 241** ;
- Scenario **36 / 108** ;
- Listening **0.88 / 0.65** ;
- coût **0 €** ;
- learner `francais-avec-luc:learner:v1` ;
- `voice-ios.js` ;
- `free-voice.js` ;
- logo / favicon ;
- Recovery Build 28 ;
- App Shell Build 27 ;
- gate terrain Build 26.1 toujours ouvert.

## Baseline historique

**v1.17.0 — Build 24 — Real Life French II** : **28 situations / 84 tours** avant Pack III ; `real-life-data-2.js` reste canonique.

## Critère de merge

Ne pas merger tant que le nouveau tribunal 29.2, Build 29.1 version-forward, Build 29 PWA/offline, Build 28 Recovery, Build 27 App Shell, Build 26.1 Voice Replay et tous les anciens contrats fonctionnels ne sont pas verts sur le même head.
