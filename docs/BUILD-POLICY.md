# French Trân’quille — BUILD POLICY

Ce document définit la façon de préparer, tester, documenter et livrer un build.

## 1. Numérotation

### Version fonctionnelle

Format : `vMAJOR.MINOR.PATCH`.

- `MAJOR` : rupture importante de produit ou de données ;
- `MINOR` : nouveau jalon fonctionnel significatif ;
- `PATCH` : amélioration compatible, correction UX ou stabilisation.

### Build

Le numéro de build augmente à chaque jalon cohérent.

Exemple :

```text
v1.9.0 — Build 16
```

### Hotfix

Un correctif urgent qui ne change pas l’intention du build garde le même build :

```text
Build 16.1
Build 16.2
```

Le hotfix doit rester strictement limité à la correction ou à la stabilisation.

---

## 2. Une intention principale par build

Un gros build peut contenir plusieurs fichiers, mais doit répondre à une phrase simple :

> « Ce build sert principalement à ________. »

Si deux objectifs peuvent être livrés indépendamment et présentent des risques différents, ils deviennent deux builds.

---

## 3. Branche et PR

Pour toute modification importante :

```text
main
  ↓
branch buildXX-description
  ↓
commits de travail
  ↓
Pull Request
  ↓
CI
  ↓
merge seulement si vert
  ↓
CI main
  ↓
GitHub Pages
```

Les modifications directes sur `main` sont réservées aux hotfixes réellement triviaux lorsque le risque est inférieur au coût d’une PR.

---

## 4. Documentation obligatoire

Avant clôture d’un build :

### `README.md`

Doit contenir :

- version/build actuels ;
- état fonctionnel réellement livré ;
- instructions de test utiles ;
- limitations importantes ;
- lien vers la roadmap canonique.

### `CHANGELOG.md`

Doit recevoir l’entrée correspondant au build réellement livré.

### `ROADMAP.md`

À modifier seulement si :

- une étape est terminée ;
- une priorité change ;
- une dépendance est découverte ;
- un futur build est ajouté/supprimé/déplacé.

### `docs/ARCHITECTURE.md`

À modifier si un module, une clé locale, un ordre de chargement ou une responsabilité change.

### Ce fichier

À modifier si le processus de livraison évolue.

---

## 5. Données locales

Aucun build ne doit supprimer silencieusement :

- progression ;
- mémoire ;
- réglages ;
- choix de voix ;
- DEBUG FR.

Si un schéma évolue :

1. lire l’ancien schéma ;
2. migrer ;
3. garder un fallback sûr ;
4. documenter la migration ;
5. tester avec données anciennes simulées.

---

## 6. Voix

La synthèse et la reconnaissance vocales dépendent du navigateur et de l’OS.

Règle absolue :

> Une transcription correcte n’est pas une preuve scientifique d’une bonne prononciation.

L’application peut dire :

- phrase reconnue ;
- phrase non reconnue ;
- variante reconnue ;
- plusieurs essais nécessaires.

Elle ne doit pas inventer :

- score phonétique ;
- précision articulatoire ;
- diagnostic de son réellement entendu si seule la transcription est accessible.

Tout calibrage Safari/Siri spécifique à Trân attend des tests réels sur son iPhone.

---

## 7. CI minimale

Tout build fonctionnel doit garder :

- `node --check` pour les scripts ;
- guards spécifiques au build ;
- smoke test du moteur de base ;
- vrai Chrome headless ;
- contrôle de l’absence d’écran de boot/fatal ;
- contrôle d’au moins une fonctionnalité spécifique au build.

Un build ne se clôture pas sur la seule base d’un `grep`.

---

## 8. Tests réels

### PC / Chrome

Obligatoire automatiquement pour chaque build important.

### iPhone / Safari

Obligatoire avant de considérer stable une fonction dépendante de :

- SpeechRecognition ;
- installation PWA iOS ;
- comportement clavier/micro iOS ;
- lecture vocale spécifique aux voix Apple ;
- permissions micro ;
- safe areas / standalone mode.

### Android

Secondaire mais à tester avant une grosse clôture de phase.

---

## 9. Protection du socle

Les modules stables doivent être étendus plutôt que réécrits sans nécessité.

État actuel :

- `app.js` = moteur historique / UI de base ;
- les fonctions nouvelles importantes peuvent être ajoutées en modules indépendants ;
- une refonte de `app.js` devra avoir son propre build de migration et des tests dédiés.

---

## 10. Coût

Tant que la roadmap ne décide pas explicitement le contraire :

```text
API payante : NON
backend payant : NON
Vercel obligatoire : NON
GitHub Pages : OUI
localStorage : OUI
Web APIs navigateur : OUI
```

---

## 11. Critères de clôture d’un build

Un build est `DONE` uniquement si :

- code terminé ;
- migrations sûres ;
- documentation mise à jour ;
- PR mergée ;
- CI PR verte ;
- CI `main` verte ;
- GitHub Pages vert ;
- limitation connue documentée ;
- prochaine étape repositionnée dans `ROADMAP.md`.

Sinon le build reste **EN COURS**.
