# French Trân’quille

PWA de français pensée pour **Trân**, avec une priorité forte donnée à l’oral, au français réellement utile et à une interface suffisamment simple pour être utilisée sans connaissances techniques.

## Candidat actuel

- **v1.15.0**
- **Build 22 — UX Foundation & Runtime Integrity**
- statut : **CANDIDAT / branche `build22-ux-foundation`**
- cible principale : **iPhone / Safari / PWA iOS**
- curriculum attendu : **40 leçons / 238 éléments**
- coût d’exploitation : **0 €**

## Pourquoi Build 22

L’application a accumulé de bons moteurs pédagogiques : Learning Memory, Daily Coach, Mastery, Scenario Lab, Error Intelligence, Listening et Adaptive Language.

Build 22 change le principe d’interface :

> **la complexité reste dans les moteurs ; Trân ne voit que les actions utiles.**

La navigation apprenante devient :

```text
Hôm nay / Aujourd’hui
Luyện tập / Pratiquer
Lộ trình / Parcours
```

`Pratiquer` ouvre trois choix simples : Réviser, Parler, Écouter.

## Expérience apprenante

### Aujourd’hui

La Home conserve le logo French Trân’quille et met en avant :

- Lucie ;
- la prochaine leçon ;
- la position dans le parcours ;
- un unique bouton principal ;
- la séance du jour ;
- quelques métriques compactes.

Les cartes techniques des moteurs sont masquées côté Trân et restent disponibles en **DEBUG FR**.

### Leçon

La leçon devient un mode Focus : gros texte, grosses zones tactiles, pas de menu du bas, navigation Précédent/Continuer fixe et une seule tâche cognitive visible à la fois.

### Parcours

L’écran commence par une synthèse humaine : où Trân en est, prochaine leçon, progression globale et curriculum. Les diagnostics Memory/Mastery/Error/Language restent derrière DEBUG FR.

## Progression : aucune remise à zéro

La clé historique reste volontairement :

```text
francais-avec-luc:learner:v1
```

Build 22 ne la renomme pas et ne réinitialise aucun schéma.

Une sauvegarde locale de sécurité non destructive est créée une seule fois dans :

```text
french-tranquille:safety:pre-build22:v1
```

La CI utilise un profil synthétique représentatif d’une apprenante arrivée à la **leçon 8** et exige après chargement complet :

- 7 leçons terminées ;
- prochaine leçon `l8` ;
- progression `l8 = 4` conservée ;
- 40 acquis conservés ;
- snapshot intact ;
- nouvelle navigation = exactement 3 entrées.

## Voix : baseline validé, donc sanctuarisé

Le retour réel iPhone avant Build 22 est positif : reconnaissance des réponses françaises bonne et voix de Lucie naturelle.

Conséquence : cette refonte **ne modifie pas** `voice-ios.js` ni `free-voice.js`. La CI protège leurs hashes pendant Build 22.

French Trân’quille continue à ne jamais transformer une transcription en faux score phonétique.

## Branding sanctuarisé

Ces visuels sont conservés :

```text
assets/LOGO.png
assets/Favicon.png
```

Leur intégrité est également contrôlée par la CI Build 22.

## Runtime réconcilié

L’audit Build 22 a trouvé une dette : plusieurs modules récents étaient bien présents dans le repo mais le loader/service worker de production était encore resté sur une composition plus ancienne.

Build 22 recâble explicitement :

```text
Safety snapshot
→ app historique
→ Stage 2
→ Stage 3
→ Voice / Free Voice
→ Learning Memory
→ Error Intelligence
→ Adaptive Language
→ Daily Coach
→ Mastery
→ Scenario Lab
→ Listening
→ UX Shell
→ Build Meta en dernier
```

Le build est donc à la fois une **refonte UX** et un **build d’intégrité runtime**.

## Liens projet

- [`ROADMAP.md`](./ROADMAP.md)
- [`CHANGELOG.md`](./CHANGELOG.md)
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
- [`docs/BUILD-POLICY.md`](./docs/BUILD-POLICY.md)
- [`docs/BUILD-22-UX-FOUNDATION.md`](./docs/BUILD-22-UX-FOUNDATION.md)
- PWA : `https://shinobione.github.io/tran-french-teacher/`

## Prochaine étape après clôture

- **Build 23 — Real Life French I : quotidien avec Jerry** ;
- Build 24 — déplacements / proches / téléphone ;
- Build 25 — problèmes, émotions et français oral ;
- puis V2 Hardening.

Build 22 ne sera déclaré `PROD / CLOS` qu’après PR verte, CI `main` verte et GitHub Pages verte.
