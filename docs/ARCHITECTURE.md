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
mastery-engine.js        ← Build 16
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

Ce fichier existe pour éviter de réécrire `app.js` uniquement afin d’ajouter les nouvelles leçons.

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

- SpeechRecognition / webkitSpeechRecognition quand disponible ;
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

Aucun serveur n’est nécessaire.

---

## `mastery-engine.js` — Build 16

Responsabilité : estimer la **maîtrise pédagogique interne** par grande étape.

Étapes :

1. Survie A0 — leçons 1–7 ;
2. Vie quotidienne A0 — leçons 8–15 ;
3. Fondations A1 — leçons 16–20 ;
4. Premiers échanges A1 — leçons 21–25.

Entrées :

- leçons terminées ;
- éléments connus ;
- entrées Learning Memory ;
- quantité de preuves de révision ;
- qualité moyenne de mémoire ;
- fragilités restantes.

Sorties :

- score interne ;
- état de maîtrise ;
- estimation interne globale ;
- priorité suivante.

Le score n’est pas une certification CECRL.

Expose :

```text
window.FrenchTranquilleMastery
```

---

# Stockage local

## État apprenant historique

Clé conservée pour compatibilité :

```text
francais-avec-luc:learner:v1
```

Le nom historique de la clé n’est pas modifié afin de ne pas effacer la progression existante lors du rebranding Luc → Lucie / French Trân’quille.

## Learning Memory

```text
french-tranquille:learning-memory:v1
```

## DEBUG FR

```text
tran-french-teacher:debug-fr:v1
```

D’autres préférences vocales possèdent leurs propres clés locales dans les modules voix.

---

# PWA / cache

`sw.js` :

- precache les fichiers critiques ;
- réseau d’abord pour les GET ;
- mise en cache des réponses valides ;
- fallback vers cache/index en cas d’échec ;
- suppression des anciens caches lors de l’activation.

Chaque gros build change :

- version du cache ;
- query string des assets ;
- metadata runtime.

---

# Sécurité et confidentialité

Les données d’apprentissage restent actuellement sur l’appareil :

- aucune télémétrie serveur ;
- aucun upload automatique ;
- sauvegarde JSON uniquement sur action explicite ;
- aucune clé secrète dans le navigateur.

---

# CI

Le workflow de qualité vérifie au minimum :

- syntaxe JS ;
- guards des fonctionnalités majeures ;
- rendu Node du moteur historique ;
- lancement réel Chrome headless ;
- disparition de l’écran de boot ;
- rendu de la home ;
- présence des modules attendus.

Les fonctions iOS spécifiques nécessitent toujours un test réel Safari en complément.

---

# Dette technique connue

## `app.js` monolithique

Le moteur historique reste volumineux. Il est volontairement sanctuarisé à court terme car les builds 10–15 ont montré qu’une réécriture rapide augmente fortement le risque de régression.

Une extraction future pourra séparer :

```text
curriculum/
state/
ui/
practice/
review/
```

mais cette migration devra être un **build dédié**, pas un effet secondaire d’une feature.

## Décorateurs DOM

Learning Memory, Stage 2, Daily Coach et Mastery Engine utilisent des injections DOM / MutationObserver pour étendre l’UI historique.

Règle : chaque décorateur doit être **idempotent** :

- ne pas réécrire le DOM si la signature fonctionnelle n’a pas changé ;
- ne pas créer deux fois la même carte ;
- ne pas provoquer une boucle MutationObserver.

Build 15 a déjà intercepté ce type de boucle avant merge ; le Chrome smoke test doit continuer à protéger ce point.
