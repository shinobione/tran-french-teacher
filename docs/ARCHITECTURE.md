# French Trân’quille — ARCHITECTURE

## Vue générale

French Trân’quille est une **PWA statique** servie par GitHub Pages.

```text
iPhone / Safari / PWA
Android / Chromium
PC / Chrome-Edge
        ↓
GitHub Pages
        ↓
HTML + CSS + JavaScript
        ↓
localStorage + Web APIs navigateur
```

Il n’existe actuellement :

- aucun backend obligatoire ;
- aucune base de données distante ;
- aucune clé API côté client ;
- aucune dépendance payante nécessaire à l’exécution.

---

# Ordre de chargement runtime

```text
index.html
  ↓
app.js
  ↓
curriculum-stage2.js
  ↓
stage2-boot.js
  ↓
debug-fr.js
  ↓
voice-ios.js
  ↓
free-voice.js
  ↓
build-meta.js
  ↓
learning-memory.js
  ↓
daily-coach.js
  ↓
mastery-engine.js       ← Build 16
  ↓
scenario-data.js        ← Build 17
  ↓
scenario-host.js        ← Build 17
  ↓
scenario-engine.js      ← Build 17
  ↓
error-intelligence.js   ← Build 18
```

Les interactions utilisateur n’ont lieu qu’après le chargement de la page : bien que `free-voice.js` soit déclaré avant Error Intelligence, ses appels à `window.FrenchTranquilleErrors` sont donc disponibles au moment d’une vraie tentative utilisateur.

---

# Modules principaux

## `app.js`

Moteur historique / UI de base :

- leçons 1–15 ;
- état principal apprenant ;
- migration historique ;
- Accueil / Leçon / Conversation / Révision / Progression / Réglages ;
- navigation ;
- synthèse vocale de base ;
- `window.FrenchTranquilleCurriculum`.

**Politique :** sanctuarisé tant qu’une migration dédiée n’est pas planifiée.

---

## `curriculum-stage2.js`

Build 15 :

- leçons 16–25 ;
- 60 éléments ;
- structures utiles ;
- chapitres A0 → A1 ;
- pratique texte A1 START ;
- extension du curriculum global.

## `stage2-boot.js`

Force un rerender contrôlé après extension du curriculum afin que le moteur historique voie les 25 leçons.

---

# Voix

## `voice-ios.js`

- inventaire des voix françaises ;
- choix Auto / manuel ;
- diagnostic navigateur ;
- préférences de voix qualitatives lorsqu’elles existent.

## `free-voice.js`

- `SpeechRecognition` / `webkitSpeechRecognition` quand disponible ;
- fallback clavier ;
- validation de transcription ;
- variantes tolérées ;
- synthèse du modèle ;
- Build 18 : chaque vraie tentative appelle maintenant `FrenchTranquilleMemory.recordPractice()` ;
- Build 18 : chaque tentative envoie également une preuve à `FrenchTranquilleErrors.recordAttempt()` lorsque le module est présent.

Sources Build 18 :

```text
free-voice-voice
free-voice-text
```

Une erreur technique `recognition.onerror` n’est pas enregistrée comme difficulté d’apprentissage.

Le moteur n’est **pas** un analyseur phonétique.

---

# Mémoire pédagogique

## `learning-memory.js`

Clé :

```text
french-tranquille:learning-memory:v1
```

Chaque entrée peut contenir :

- première / dernière rencontre ;
- dernière révision ;
- échéance ;
- tentatives ;
- réussites ;
- échecs ;
- streak ;
- force ;
- dernier rating ;
- dernière source.

États calculés :

```text
new
fragile
learning
solid
```

Expose :

```text
window.FrenchTranquilleMemory
```

avec `summary`, `statusOf`, `applyRating`, `recordPractice`, `sync`, `exportBackup`.

---

## `error-intelligence.js` — Build 18

Responsabilité : construire une mémoire **des difficultés observables** sans remplacer Learning Memory.

Clé :

```text
french-tranquille:error-intelligence:v1
```

Expose :

```text
window.FrenchTranquilleErrors
```

API principale :

```text
recordError(id,type,source,detail)
recordRecovery(id,source)
recordAttempt({itemId,ok,source,input,target})
sync()
summary()
priorityItems()
dominantType()
exportData()
```

### Taxonomie V1

```text
retrieval-difficult
text-mismatch
scenario-miss
assisted
voice-unrecognized
partial
practice-miss
repeated-miss
```

Ces catégories sont choisies parce qu’elles correspondent à des preuves accessibles à la PWA.

Build 18 **n’infère pas** automatiquement `négation`, `article`, `ordre des mots`, etc. sans données entrée/cible permettant de le démontrer.

### Observation de Learning Memory

`learning-memory.js` encapsule certaines écritures dans sa propre closure. Error Intelligence ne monkey-patche donc pas brutalement son stockage.

Il maintient un snapshot léger des entrées exposées par `FrenchTranquilleMemory.summary()` et compare :

- `attempts` ;
- `misses` ;
- `successes` ;
- `lastRating` ;
- `lastSource`.

Quand l’UI évolue après une action, le snapshot est resynchronisé.

Cette stratégie permet de détecter :

```text
smart-review rating 0 → retrieval-difficult
scenario-miss          → scenario-miss
scenario-assisted      → assisted
succès après difficulté → recovery
```

Les sources `free-voice-*` sont ignorées par ce diff car Free Voice envoie déjà une preuve plus riche directement, ce qui évite le double comptage.

### Taille bornée

```text
MAX_ITEM_EVENTS   = 20
MAX_RECENT_EVENTS = 120
```

Les anciens événements détaillés sortent de la fenêtre, mais les compteurs agrégés restent conservés.

### Répétition

Une nouvelle difficulté sur le même élément dans une fenêtre de 30 minutes augmente le signal `repeated-miss`.

### Récupération

Une réussite ultérieure :

- incrémente `recoveries` ;
- remet `errorStreak` à zéro ;
- réduit indirectement la priorité de l’élément.

### Priorité

`priorityScore()` combine :

- récence ;
- série d’erreurs ;
- volume d’incidents ;
- type dominant observable ;
- récupérations.

Le score sert à ordonner les besoins de révision. Il n’est pas affiché comme note pédagogique absolue.

### UI Build 18

Error Intelligence injecte :

- un focus dans **Daily Coach** lorsqu’une difficulté devient prioritaire ;
- une carte détaillée dans **Progression** ;
- un export JSON dans **Réglages** ;
- un diagnostic compact dans **Réglages**.

### Export

Format :

```text
french-tranquille-error-intelligence
version 1
```

L’export est volontairement séparé de la sauvegarde générale Build 13 afin de ne pas casser son format pendant Build 18.

### Test hook

```text
?errorSmoke=1
```

Le hook CI crée quelques preuves locales contrôlées (`scenario-miss`, `assisted`) puis ouvre Progression. Il ne sert qu’au test navigateur automatisé.

---

# Coach / maîtrise

## `daily-coach.js`

Analyse :

- éléments dus ;
- fragilités ;
- révisions du jour ;
- prochaine leçon ;
- acquis.

Error Intelligence n’en remplace pas la logique : il ajoute un **focus prioritaire** si ses preuves dépassent un seuil.

## `mastery-engine.js` — Build 16

Suit :

1. Survie A0 ;
2. Vie quotidienne A0 ;
3. Fondations A1 ;
4. Premiers échanges A1.

Entrées : progression, acquis, Learning Memory, preuves de révision et fragilités.

Build 18 expose Error Intelligence comme signal futur mais **ne change pas les seuils du Mastery Engine dans ce build**.

Le score reste un indicateur interne, pas une certification CECRL.

---

# Scenario Lab

## `scenario-data.js` — Build 17

Catalogue déclaratif :

```text
id
icon
titleVi/titleFr
descVi/descFr
requiredLessons[]
turns[]
```

Chaque tour :

```text
npcFr / npcVi
promptVi / promptFr
answers[]
model
hintVi / hintFr
items[]
```

12 scénarios × 3 tours = 36 tours.

## `scenario-host.js`

Adaptateur pour le profil vierge : crée `.narrow.scenario-host` lorsque l’ancien écran Conversation ne possède pas encore le conteneur attendu.

## `scenario-engine.js`

- déverrouillage par `completedLessons` ;
- variantes ;
- indice ;
- modèle assisté ;
- stats locales ;
- voix navigateur ;
- pont Learning Memory.

Clé :

```text
french-tranquille:scenarios:v1
```

Sources mémoire utiles à Build 18 :

```text
scenario-success
scenario-miss
scenario-assisted
```

Test hook :

```text
?scenarioSmoke=1
```

---

# Stockage local

```text
francais-avec-luc:learner:v1
french-tranquille:learning-memory:v1
french-tranquille:scenarios:v1
french-tranquille:error-intelligence:v1
tran-french-teacher:debug-fr:v1
```

Le nom historique `francais-avec-luc` reste volontairement pour préserver les données créées avant Lucie / French Trân’quille.

---

# PWA / cache

`sw.js` :

- precache des fichiers critiques ;
- réseau d’abord pour GET ;
- cache des réponses valides ;
- fallback cache/index ;
- purge des anciens caches à l’activation.

Chaque gros build synchronise :

```text
version cache
query strings assets
build-meta.js
README / CHANGELOG / ROADMAP
```

---

# Confidentialité

- données pédagogiques locales ;
- aucune télémétrie serveur ;
- aucun upload automatique ;
- exports JSON uniquement sur action explicite ;
- aucune clé secrète dans le navigateur.

---

# CI

Le workflow doit conserver :

- syntaxe JS ;
- anciens guards ;
- contrat Scenario Data ;
- contrat Error Intelligence ;
- limites de stockage ;
- pont Free Voice → Memory / Errors ;
- rendu Node du moteur historique ;
- Chrome Home ;
- Chrome Scenario Lab `?scenarioSmoke=1` ;
- Chrome Error Intelligence `?errorSmoke=1`.

Les fonctions iOS spécifiques nécessitent toujours un test Safari réel.

---

# Dette technique connue

## `app.js`

Toujours monolithique et sanctuarisé. Une extraction future sera un build de migration dédié.

## Décorateurs DOM

Les modules avancés utilisent des injections DOM / MutationObserver.

Règle absolue : **idempotence**.

- ne pas réécrire si la signature est identique ;
- ne pas dupliquer les cartes ;
- ne pas provoquer de boucle MutationObserver.

Les smoke tests Chrome sont la barrière de sécurité principale contre ce type de régression.
