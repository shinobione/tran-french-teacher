# French Trân’quille

PWA de français pensée pour **Trân**, avec une priorité forte donnée à l’oral, au français réellement utile et à une interface suffisamment simple pour être utilisée sans connaissances techniques.

## Version en production

- **v1.15.0**
- **Build 22 — UX Foundation & Runtime Integrity**
- statut : **PROD / GitHub Pages**
- cible principale : **iPhone / Safari / PWA iOS**
- curriculum audité : **40 leçons / 241 éléments**
- coût d’exploitation : **0 €**

> Build 22 a été validé sur PR, puis sur le commit mergé de `main`, puis déployé par GitHub Pages. Le smoke « leçon 8 » a confirmé la conservation de la progression, des acquis et de la progression partielle.

## Expérience apprenante

La navigation principale côté Trân est volontairement limitée à :

```text
Hôm nay / Aujourd’hui
Luyện tập / Pratiquer
Lộ trình / Parcours
```

`Pratiquer` regroupe Réviser, Parler et Écouter. Les moteurs techniques — Learning Memory, Mastery, Scenario Lab, Error Intelligence, Listening et Adaptive Language — restent actifs mais ne deviennent pas autant de concepts à comprendre.

### Aujourd’hui

La Home conserve le logo French Trân’quille et met en avant la prochaine leçon, la position dans le parcours, un bouton principal et la séance du jour.

### Leçon

Leçon = mode Focus : gros texte, grandes zones tactiles, pas de menu du bas pendant l’exercice, navigation Précédent/Continuer stable.

### Parcours

Le parcours commence par une synthèse humaine : leçon actuelle, progression globale, nombre de leçons terminées et acquis. Les diagnostics détaillés restent disponibles en **DEBUG FR**.

## Progression protégée

La clé historique reste :

```text
francais-avec-luc:learner:v1
```

Build 22 ne la renomme pas et ne réinitialise aucun schéma.

Une photo locale de sécurité non destructive est créée une seule fois dans :

```text
french-tranquille:safety:pre-build22:v1
```

La CI a démarré la PWA avec un profil synthétique arrivé à la leçon 8 et a vérifié après boot complet : 7 leçons terminées, `l8` toujours en cours au même step, 40 acquis, snapshot identique et nouvelle navigation en 3 entrées.

## Voix et branding sanctuarisés

Le retour iPhone réel étant positif, Build 22 n’a modifié ni `voice-ios.js` ni `free-voice.js`. Le logo et le favicon ont eux aussi été conservés byte-identiques et protégés par hash dans la CI.

```text
assets/LOGO.png
assets/Favicon.png
voice-ios.js
free-voice.js
```

## Runtime réconcilié

L’audit Build 22 a détecté que plusieurs modules récents existaient dans le repo alors que le loader/service worker de production était resté sur une composition plus ancienne.

Build 22 active explicitement :

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

L’audit a également établi que Stage 3 contient réellement **93 éléments** ; le total runtime correct est donc **40 leçons / 241 éléments**, et non 238.

## Liens projet

- [`ROADMAP.md`](./ROADMAP.md)
- [`CHANGELOG.md`](./CHANGELOG.md)
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
- [`docs/BUILD-POLICY.md`](./docs/BUILD-POLICY.md)
- [`docs/BUILD-22-UX-FOUNDATION.md`](./docs/BUILD-22-UX-FOUNDATION.md)
- PWA : `https://shinobione.github.io/tran-french-teacher/`

## Prochain build

**v1.16.0 — Build 23 — Real Life French I : quotidien avec Jerry**.

Le principe reste celui de Build 22 : les nouvelles capacités doivent apparaître derrière les gestes simples existants, pas créer un nouveau bouton de navigation à chaque moteur.
