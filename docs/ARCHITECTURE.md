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

L’ordre est important car plusieurs modules étendent les objets créés précédemment.

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
scenario-engine.js      ← Build 17
```

Les styles spécifiques suivent la même logique de couches sans remplacer le socle global.

---

# Modules

## `app.js`

Responsabilité : moteur historique et UI de base.

Contient notamment :

- curriculum historique leçons 1–15 ;
- état principal apprenant ;
- migration des anciennes données ;
- Accueil ;
- Leçon ;
- Conversation texte de base ;
- Révision de base ;
- Progression ;
- Réglages ;
- navigation interne ;
- synthèse vocale de base ;
- exposition `window.FrenchTranquilleCurriculum`.

**Politique :** ne pas réécrire ce fichier pour chaque nouvelle fonction. Les nouveaux jalons doivent préférer des modules d’extension tant que cette stratégie reste maintenable.

---

## `curriculum-stage2.js`

Responsabilité : extension curriculum Build 15.

- leçons 16–25 ;
- 60 éléments supplémentaires ;
- notes de structures ;
- chapitres visuels A0 → A1 ;
- pratique texte A1 START ;
- mise à disposition des éléments au curriculum global.

Le module doit être chargé **avant** les moteurs qui lisent le curriculum complet.

---

## `stage2-boot.js`

Responsabilité : déclencher proprement un rerender du moteur après extension du curriculum afin que l’UI de base voie les 25 leçons.

---

## `voice-ios.js`

Responsabilité : synthèse vocale et sélection des voix disponibles.

- inventaire des voix françaises ;
- choix manuel ;
- choix Auto ;
- préférences de voix qualitatives lorsqu’elles existent ;
- diagnostic navigateur.

La disponibilité exacte dépend de l’appareil.

---

## `free-voice.js`

Responsabilité : entraînement vocal gratuit.

- `SpeechRecognition` / `webkitSpeechRecognition` quand disponible ;
- fallback clavier ;
- validation de transcription ;
- variantes tolérées ;
- indices progressifs ;
- répétition des ratés.

Le moteur n’est **pas** un analyseur phonétique.

---

## `learning-memory.js`

Responsabilité : mémoire pédagogique locale par élément.

Clé :

```text
french-tranquille:learning-memory:v1
```

Chaque entrée peut contenir :

- première rencontre ;
- dernière rencontre ;
- dernière révision ;
- échéance ;
- tentatives ;
- réussites ;
- échecs ;
- streak ;
- force ;
- dernier rating ;
- source de l’événement.

États calculés :

- `new` ;
- `fragile` ;
- `learning` ;
- `solid`.

Expose :

```text
window.FrenchTranquilleMemory
```

avec notamment `summary`, `statusOf`, `applyRating`, `recordPractice`, `sync`, `exportBackup`.

---

## `daily-coach.js`

Responsabilité : recommandations quotidiennes locales.

Analyse :

- éléments dus ;
- fragilités ;
- révisions du jour ;
- prochaine leçon ;
- nombre d’acquis.

Produit une petite séance cible :

```text
révision mémoire
    ↓
prochaine leçon
    ↓
conversation courte
```

---

## `mastery-engine.js` — Build 16

Responsabilité : estimer la **maîtrise pédagogique interne** par grande étape.

Étapes :

1. Survie A0 — leçons 1–7 ;
2. Vie quotidienne A0 — leçons 8–15 ;
3. Fondations A1 — leçons 16–20 ;
4. Premiers échanges A1 — leçons 21–25.

Entrées : progression, acquis, Learning Memory, preuves de révision et fragilités.

Sorties : score interne, état de maîtrise, estimation globale et priorité suivante.

Le score n’est pas une certification CECRL.

Expose :

```text
window.FrenchTranquilleMastery
```

---

## `scenario-data.js` — Build 17

Responsabilité : **catalogue déclaratif de situations multi-tours**.

Chaque scénario contient :

- identifiant ;
- icône ;
- titre/description VI + FR ;
- leçons requises pour le déverrouillage ;
- une suite ordonnée de tours.

Chaque tour contient :

```text
npcFr / npcVi
promptVi / promptFr
answers[]
model
hintVi / hintFr
items[]
```

`answers[]` contient les variantes acceptables sans rendre la réponse visible avant tentative. `items[]` relie le tour aux éléments du curriculum pour nourrir Learning Memory.

Build 17 V1 contient **12 scénarios × 3 tours = 36 tours**.

Expose :

```text
window.FrenchTranquilleScenarioData
```

Le catalogue est séparé du moteur pour permettre d’ajouter ou ajuster des situations sans réécrire la logique d’exécution.

---

## `scenario-engine.js` — Build 17

Responsabilité : exécuter les scénarios localement dans Conversation.

### Déverrouillage

Un scénario est disponible lorsque toutes ses `requiredLessons` sont présentes dans `completedLessons`.

### Validation

Le moteur :

- normalise casse, accents, apostrophes et ponctuation ;
- accepte plusieurs réponses déclarées ;
- premier échec → indice ;
- après plusieurs échecs → modèle ;
- modèle utilisé = aide, pas réussite autonome ;
- réussite/échec/aide alimentent `FrenchTranquilleMemory.recordPractice`.

### Voix

- interlocuteur lu par `speechSynthesis` ;
- micro via `SpeechRecognition` / `webkitSpeechRecognition` quand disponible ;
- fallback texte permanent ;
- aucune prétention à noter phonétiquement la prononciation.

### Progression scénario

Clé :

```text
french-tranquille:scenarios:v1
```

Conserve :

- plays ;
- completions ;
- bestErrors ;
- lastPlayed ;
- lastCompleted ;
- totalCompletions global.

### UI

Le moteur injecte :

- le **Scenario Lab** au sommet de Conversation ;
- le runner multi-tours ;
- le bilan de fin ;
- une carte **Situations réelles** dans Progression ;
- un diagnostic dans Réglages.

### Test hook

```text
?scenarioSmoke=1
```

ouvre automatiquement Conversation après le boot afin que la CI Chrome puisse vérifier le rendu Scenario Lab séparément de la home.

Expose :

```text
window.FrenchTranquilleScenarios
```

---

# Stockage local

## État apprenant historique

```text
francais-avec-luc:learner:v1
```

Le nom historique est conservé pour ne pas effacer la progression lors des changements de branding.

## Learning Memory

```text
french-tranquille:learning-memory:v1
```

## Scenario Lab

```text
french-tranquille:scenarios:v1
```

## DEBUG FR

```text
tran-french-teacher:debug-fr:v1
```

D’autres préférences vocales possèdent leurs propres clés locales.

---

# PWA / cache

`sw.js` :

- précache les fichiers critiques ;
- réseau d’abord pour les GET ;
- mise en cache des réponses valides ;
- fallback vers cache/index ;
- suppression des anciens caches à l’activation.

Chaque gros build change :

- version du cache ;
- query string des assets ;
- metadata runtime.

---

# Sécurité et confidentialité

Les données d’apprentissage restent sur l’appareil :

- aucune télémétrie serveur ;
- aucun upload automatique ;
- sauvegarde JSON uniquement sur action explicite ;
- aucune clé secrète dans le navigateur.

---

# CI

Le workflow vérifie :

- syntaxe JS ;
- guards des fonctionnalités majeures ;
- rendu Node du moteur historique ;
- Chrome headless Home ;
- disparition de l’écran de boot ;
- curriculum 25 leçons ;
- Memory + Daily Coach + Mastery ;
- **Chrome headless Conversation / Scenario Lab via `?scenarioSmoke=1`**.

Les fonctions iOS spécifiques nécessitent toujours un test réel Safari.

---

# Dette technique connue

## `app.js` monolithique

Le moteur historique reste volumineux et volontairement sanctuarisé à court terme. Une extraction future devra être un build de migration dédié.

## Décorateurs DOM

Learning Memory, Stage 2, Daily Coach, Mastery Engine et Scenario Lab étendent l’UI historique via injections DOM / MutationObserver.

Règle : chaque décorateur doit être **idempotent** :

- ne pas réécrire le DOM si sa signature n’a pas changé ;
- ne pas créer deux fois la même carte ;
- ne pas provoquer de boucle MutationObserver.

Les smoke tests Chrome protègent explicitement ce point.
