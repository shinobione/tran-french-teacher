# French Trân’quille — BUILD POLICY

Ce document définit la façon de préparer, tester, documenter et livrer un build.

## 1. Numérotation

Format : `vMAJOR.MINOR.PATCH` + numéro de build.

- `MAJOR` : rupture importante de produit ou de données ;
- `MINOR` : nouveau jalon fonctionnel significatif ;
- `PATCH` : amélioration compatible / stabilisation ;
- hotfix d’un même jalon : `Build 22.1`, `22.2`, etc.

---

## 2. Une intention principale par build

Un build doit pouvoir être résumé ainsi :

> « Ce build sert principalement à ________. »

Deux objectifs indépendants avec des risques différents deviennent deux builds.

---

## 3. Branche → PR → production

```text
main
  ↓
branch buildXX-description
  ↓
code + docs candidat
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
  ↓
docs release / CLOS
```

Les changements importants directement sur `main` sont interdits sauf hotfix réellement trivial et à très faible risque.

---

## 4. Documentation obligatoire

Avant PR :

- `README.md` : état candidat ;
- `ROADMAP.md` : build EN COURS + suite ;
- `CHANGELOG.md` : entrée Unreleased ;
- `docs/ARCHITECTURE.md` si runtime/stockage/responsabilités évoluent ;
- `docs/BUILD-XX-*.md` pour tout gros jalon ;
- ce fichier si le processus évolue.

Après preuve de production : passage explicite en `PROD / CLOS`.

La documentation ne doit jamais annoncer une fonctionnalité active si le loader/runtime public ne la charge pas réellement.

---

## 5. Données locales — règle renforcée Build 22

French Trân’quille possède désormais une utilisatrice réelle avec une progression réelle.

Aucun build ne doit supprimer, réinitialiser ou renommer silencieusement :

- progression ;
- leçon en cours ;
- acquis ;
- mémoire ;
- erreurs ;
- scénarios ;
- Listening ;
- streak ;
- choix de voix ;
- DEBUG FR.

### Toute migration ou refonte UX doit désormais avoir un smoke « ancien utilisateur »

Un build n’est **pas mergeable** avec la seule assertion :

> « le schéma n’a pas changé ».

Il faut :

1. injecter un profil synthétique réaliste dans l’ancienne clé ;
2. démarrer le vrai runtime complet ;
3. vérifier les valeurs après boot ;
4. prouver que la prochaine leçon reste identique ;
5. prouver que la progression partielle de la leçon reste identique ;
6. prouver que les acquis restent identiques.

Build 22 établit le premier profil de référence : **apprenante autour de la leçon 8**.

### Snapshot de sécurité

Pour les refontes à risque, un snapshot local non destructif peut être créé avant migration.

Il ne doit jamais remplacer automatiquement les données courantes sans action ou logique de récupération explicitement testée.

---

## 6. Baselines réelles à sanctuariser

Quand un utilisateur réel confirme qu’une partie fonctionne correctement, un build sans rapport avec cette partie doit éviter de la retoucher.

Exemples Build 22 :

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

La CI peut imposer leur hash exact pendant une refonte UX.

Une modification future de ces fichiers doit avoir une intention de build explicite et des tests adaptés.

---

## 7. Voix

Règle absolue :

> Une transcription correcte n’est pas une preuve scientifique d’une bonne prononciation.

L’application peut observer : phrase reconnue / non reconnue / variante / nombre d’essais.

Elle ne doit pas inventer : score phonétique, précision articulatoire ou diagnostic d’un son qu’elle ne peut pas réellement mesurer.

Le Safari Calibration Gate n’est ouvert que si des tests réels iPhone montrent un problème reproductible. Une baseline réelle satisfaisante ne doit pas être recalibrée « pour optimiser » sans besoin.

---

## 8. UX apprenante

La présence d’un moteur interne ne justifie pas un bouton ou une carte permanente.

Pour toute nouvelle fonction, demander d’abord :

> **Quelle action l’utilisatrice veut-elle accomplir ?**

et non :

> **Quel module voulons-nous montrer ?**

Règles :

- gros touch targets ;
- une action principale claire ;
- profondeur de navigation faible ;
- terminologie utilisateur, pas noms de moteurs ;
- fonctions dangereuses cachées côté apprenante ;
- diagnostics disponibles en DEBUG/admin ;
- iPhone safe areas respectées ;
- pas de gamification agressive.

---

## 9. CI minimale

Tout build fonctionnel doit garder :

- `node --check` pour tous les scripts runtime ;
- contrats de données utiles ;
- guards spécifiques au build ;
- vrai Chrome headless ;
- contrôle de l’absence d’écran fatal ;
- contrôle d’au moins une fonctionnalité spécifique au build.

Un build de migration/UX doit en plus tester un profil préexistant.

Un build ne se clôture jamais sur la seule base de `grep`.

---

## 10. Tests réels

### PC / Chrome

Automatique pour chaque build important.

### iPhone / Safari

Obligatoire avant de considérer stable une modification qui change :

- SpeechRecognition ;
- choix/lecture d’une voix Apple ;
- permissions micro ;
- clavier iOS ;
- installation / standalone PWA ;
- safe areas ou gestuelle tactile importante.

Un build purement structure/UX peut être livré après CI, puis faire l’objet d’un smoke manuel iPhone sans retoucher la baseline vocale.

---

## 11. Runtime Integrity

Tout fichier déclaré livré doit être :

- présent ;
- chargé dans `index.html` quand nécessaire ;
- inclus dans le service worker si nécessaire offline ;
- exécuté dans l’ordre attendu ;
- visible dans un smoke comportemental.

**« Le fichier existe dans le repo » n’est pas une preuve que la fonctionnalité est active.**

`src/core/build-meta.js` doit être chargé en dernier lorsque son rôle est de normaliser les métadonnées de tous les modules.

---

## 12. Protection du socle

`app.js` reste le moteur historique.

Les nouveautés doivent préférer des modules séparés tant qu’une réécriture du noyau n’a pas son propre build de migration.

Une refonte de `app.js` exige :

- comparaison avant/après de l’état ;
- migrations ;
- tests des anciens écrans ;
- rollback documenté.

---

## 13. Coût

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

## 14. Critères de clôture

Un build est `DONE` uniquement si :

- code terminé ;
- données existantes protégées ;
- docs synchronisées ;
- CI PR verte ;
- PR mergée ;
- CI `main` verte ;
- GitHub Pages verte ;
- limitation connue documentée ;
- roadmap repositionnée ;
- docs passées de candidat à release.

Sinon : **EN COURS**.
