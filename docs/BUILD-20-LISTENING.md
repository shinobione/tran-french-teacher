# Build 20 — Listening Comprehension

## Cible

- version : **v1.13.0** ;
- build : **20** ;
- phase : **Listening Comprehension** ;
- curriculum conservé : **40 leçons / 238 éléments** ;
- coût : **0 €**.

## Intention

Transformer l’audio de French Trân’quille en vraie source d’apprentissage.

Avant Build 20, la synthèse vocale servait principalement à entendre une phrase visible. Build 20 ajoute des exercices où la phrase française est **masquée avant la tentative**.

## Familles d’exercices

### 1. Sens

- une phrase ou un élément français appris est lu ;
- le texte français reste caché ;
- Trân choisit le sens vietnamien parmi plusieurs options ;
- transcript révélé après réponse.

### 2. Contrastes

Groupes auditifs/structurels utiles, par exemple :

- `Il fait chaud` / `J’ai chaud` ;
- `Il fait froid` / `J’ai froid` ;
- `Je vais rentrer` / `Je viens de rentrer` ;
- `Il travaille` / `Elle travaille` ;
- midi / minuit ;
- et quart / et demie / moins le quart ;
- faim / soif ;
- gauche / droite ;
- aller simple / aller-retour ;
- émotions.

Le choix affiche le **sens**, pas le transcript français complet.

### 3. Mini-dialogues

Dialogues courts, locaux, sans API :

- café ;
- gare ;
- téléphone ;
- conversation sociale ;
- météo ;
- appartement ;
- administration ;
- Jerry ;
- restaurant ;
- heure.

Chaque dialogue exige que ses acquis de base soient déjà connus.

## Audio

API navigateur : `speechSynthesis`.

Deux vitesses :

```text
normal ≈ 0.88
lent   ≈ 0.68
```

Le mode dialogue alterne légèrement le pitch entre interlocuteurs pour rendre les tours plus faciles à suivre sans ajouter de moteur audio externe.

## Stockage

Clé :

```text
french-tranquille:listening:v1
```

Données :

- sessions ;
- tentatives ;
- réussites ;
- erreurs ;
- lectures ;
- réécoutes ;
- lectures lentes ;
- stats par famille ;
- historique récent borné à 100 entrées.

## Learning Memory

Chaque réponse appelle :

```text
FrenchTranquilleMemory.recordPractice(id, ok, `listening-${family}`)
```

Sources :

```text
listening-meaning
listening-contrast
listening-dialogue
```

## Error Intelligence

Build 20 ajoute une preuve observable :

```text
listening-miss
```

Le module Listening envoie directement l’événement Error Intelligence. Le diff Learning Memory doit ignorer `listening-*` pour éviter le double comptage, exactement comme Free Voice.

`listening-miss` signifie uniquement :

> la réponse à un exercice de compréhension orale était incorrecte.

Ce n’est pas une conclusion sur l’audition médicale, l’accent ou la prononciation.

## UI

Build 20 injecte :

- carte Listening sur Home ;
- étape `Écouter 3 minutes` dans Daily Coach ;
- overlay Listening plein écran ;
- onglets Sens / Contrastes / Mini-dialogues ;
- vitesse normale/lente ;
- stats de session ;
- carte Listening dans Progression ;
- diagnostic dans Réglages.

## Smoke navigateur

Hook :

```text
?listeningSmoke=1
```

Le smoke :

1. injecte uniquement dans le profil navigateur CI quelques acquis connus ;
2. ouvre Listening ;
3. vérifie qu’aucun transcript français n’est présent avant tentative ;
4. produit volontairement une mauvaise réponse ;
5. vérifie que le transcript est alors révélé ;
6. vérifie le compteur Listening ;
7. vérifie la source Error Intelligence `listening-meaning` ;
8. vérifie le type `listening-miss`.

## Non-objectifs

- STT/reconnaissance vocale : ce build teste la compréhension, pas la production ;
- score phonétique ;
- audio cloud ;
- voix neurale payante ;
- nouveaux scénarios Scenario Lab ;
- extension curriculum.

## Clôture attendue

- contrat data Listening ;
- trois familles présentes ;
- transcript caché avant tentative ;
- vitesse normale/lente ;
- Memory + Error reliées ;
- pas de double comptage ;
- stockage borné ;
- Chrome Home ;
- Chrome Listening ;
- Chrome Scenario ;
- Chrome Error ;
- 40 leçons / 238 éléments inchangés ;
- docs synchronisées ;
- PR + main + Pages verts.


---

## Clôture production

Build 20 est **CLOS**.

Validation :

- trois familles Listening ;
- transcript caché avant tentative puis révélé ;
- source `listening-meaning` ;
- type `listening-miss` ;
- Home 40 leçons ;
- Scenario Lab ;
- Error Intelligence 20/120 ;
- A1 Core Mastery ;
- PR #13 ;
- CI `main` ;
- GitHub Pages ;
- Chrome direct sur l’URL publique pour Home et Listening.

État livré : **v1.13.0 • Build 20 • 40 leçons • 238 éléments • Listening actif**.
