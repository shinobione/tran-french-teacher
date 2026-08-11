# Build 22 — UX Foundation & Runtime Integrity

## Statut

**v1.15.0 — Build 22 — PROD / CLOS — 2026-08-11**

- PR : **#16 — SUCCESS** ;
- commit production : `2c961ed5f0e36f378dc5ffa272f6eda83646e3d6` ;
- CI `main` : **run #59 — SUCCESS** ;
- GitHub Pages : **run #75 — SUCCESS** ;
- curriculum audité : **40 leçons / 241 éléments** ;
- coût d’exploitation : **0 €**.

## Pourquoi ce build

French Trân’quille est utilisée réellement. La refonte devait donc améliorer l’ergonomie sans déplacer ni réinitialiser les données d’une apprenante déjà engagée dans son parcours.

Le principe retenu :

> **Le moteur peut être complexe. L’usage doit rester simple.**

## UX livrée

Trois destinations apprenante :

```text
Hôm nay / Aujourd’hui
Luyện tập / Pratiquer
Lộ trình / Parcours
```

`Pratiquer` regroupe : Réviser, Parler, Écouter.

La Home répond à « qu’est-ce que je fais maintenant ? », la Leçon fonctionne en mode Focus, le Parcours répond à « où j’en suis ? », et les diagnostics techniques restent derrière DEBUG FR.

L’ancien `.bottom-nav` est conservé dans le DOM comme bus de compatibilité mais n’est plus l’interface apprenante.

## Protection de progression

Clé canonique historique inchangée :

```text
francais-avec-luc:learner:v1
```

Snapshot pré-refonte :

```text
french-tranquille:safety:pre-build22:v1
```

Le smoke Chrome a démarré avec :

```text
l1 → l7 terminées
l8 progress = 4
40 acquis
conversationWins = 5
streak = 6
```

Après chargement du runtime complet, le test a confirmé :

- **7** leçons terminées ;
- prochaine leçon = **l8** ;
- `lessonProgress.l8 = 4` ;
- **40** acquis conservés ;
- snapshot présent et `l8 = 4` dans le snapshot ;
- nouvelle navigation = **3** entrées ;
- logo Home présent.

## Sanctuaires vérifiés

Les hashes CI ont confirmé byte-identiques pendant toute la refonte :

```text
assets/LOGO.png
assets/Favicon.png
voice-ios.js
free-voice.js
```

La reconnaissance vocale et la voix iPhone ne sont donc pas recalibrées dans Build 22.

## Runtime Integrity

L’audit a identifié un loader drift : plusieurs moteurs existaient dans le repo mais n’étaient pas tous chargés par la composition production historique.

Ordre livré :

```text
progress-safety
app
Stage 2
Stage 3
curriculum boot
debug
voice
free voice
Learning Memory
Error Intelligence
Language Ratio core
Language Ratio runtime
Daily Coach
Mastery
Mastery Stage 3
Scenario Data / Host / Engine
Listening Data / Engine
UX Shell
Build Meta — dernier
```

Le service worker `1.15.0-b22` reflète cette composition.

## Audit curriculum

Stage 3 contient réellement **93 éléments**, et non les 90 indiqués dans l’ancienne documentation.

Avec le socle de 148 éléments :

```text
148 + 93 = 241
```

Le contrat production est donc : **40 leçons / 241 éléments**. Aucun contenu utile n’a été supprimé pour retrouver artificiellement l’ancien chiffre 238.

## Tribunal final

- [x] nouvelle navigation = 3 destinations ;
- [x] Home simplifiée ;
- [x] Practice Sheet ;
- [x] Parcours simplifié ;
- [x] Leçon Focus ;
- [x] Réglages simplifiés côté Trân ;
- [x] DEBUG FR conserve les outils techniques ;
- [x] logo/favicon hashes vérifiés ;
- [x] voice/free-voice hashes vérifiés ;
- [x] aucune clé principale renommée ;
- [x] snapshot non destructif ;
- [x] smoke Trân leçon 8 vert ;
- [x] 40 leçons / 241 éléments actifs ;
- [x] Listening actif ;
- [x] Adaptive Language actif ;
- [x] Scenario / Error non régressés ;
- [x] PR #16 verte ;
- [x] `main` run #59 vert ;
- [x] GitHub Pages #75 vert.

## Limitation / validation terrain

Les fonctions spécifiques iPhone qui ont déjà une bonne baseline ne sont pas modifiées. Un smoke visuel/tactile réel sur l’iPhone reste utile pour juger le ressenti de la nouvelle UX, mais il n’est pas nécessaire de recalibrer la voix tant qu’aucun problème reproductible n’est signalé.

## Suite

**v1.16.0 — Build 23 — Real Life French I : quotidien avec Jerry.**

Build 23 doit réutiliser le shell Build 22 et ne pas ajouter une nouvelle destination de navigation.
