# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version production

- **v1.21.0**
- **Build 28 — Data & Recovery Hardening**
- statut : **✅ PROD / CLOS — réécoute iPhone Build 26.1 à valider terrain**
- commit runtime production : `ed09159a6246fe3c1892cb0ff8d03a4beffb7428`
- PR runtime : **#62**
- head PR certifié : `dc060ea5304b0526010bd8ac158b70c363525325`
- tribunal PR : **17/17 workflows SUCCESS**
- tribunal `main` : **17/17 workflows fonctionnels SUCCESS**
- GitHub Pages runtime : **#118 SUCCESS**
- total runtime `main` : **18/18 SUCCESS Pages incluse**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **36 situations / 108 tours**
- Listening : **0.88 normal / 0.65 lent**
- coût : **0 €**

## 🔐 Build 28 — coffre de données et récupération

Après le Build 27 App Shell Reset, le prochain risque prioritaire n’était plus visuel : c’était la possibilité qu’un futur changement, un import ancien ou un `localStorage` corrompu abîme silencieusement la progression réelle de Trân.

Build 28 ajoute donc une couche Recovery chargée **avant `app.js`**.

Principe canonique :

> **Une donnée invalide, une restauration ratée ou une migration ancienne ne doit jamais se transformer silencieusement en progression neuve.**

### Six stores durables protégés

Le coffre V2 connaît explicitement :

1. `francais-avec-luc:learner:v1` — progression canonique ;
2. `french-tranquille:learning-memory:v1` — mémoire / répétition espacée ;
3. `french-tranquille:error-intelligence:v1` — erreurs observables ;
4. `french-tranquille:scenarios:v1` — situations réelles ;
5. `french-tranquille:listening:v1` — compréhension orale ;
6. `french-tranquille:milestones:v1` — jalons.

Les réglages voix restent volontairement locaux à l’appareil : un `voiceURI` iPhone n’est pas une donnée pédagogique portable.

### Backup V2 complet

L’ancien export historique sauvegardait essentiellement learner + Learning Memory.

Le format V2 exporte désormais les **six stores** après validation de schéma :

```text
french-tranquille-backup
version: 2
stores:
  learner
  memory
  errors
  scenarios
  listening
  milestones
```

### Restore transactionnel

Avant un import :

```text
snapshot pre-restore
→ snapshot pre-migration si backup ancien
→ validation
→ écriture des six stores
→ relecture + validation
→ comparaison exacte
→ rollback automatique si échec
```

Une panne au milieu d’une restauration ne doit donc jamais laisser un mélange incohérent de stores.

### Migration backup V1 sûre

Un ancien backup V1 ne connaissait que learner + Memory. Build 28 restaure ces données **sans supprimer** Error / Scenario / Listening / Milestones déjà présents sur l’appareil.

### Corruption : quarantaine + last-good

Au démarrage :

- JSON invalide ou schéma invalide → quarantaine ;
- restauration depuis `last-good` lorsqu’il existe ;
- sinon fallback possible vers le snapshot historique Build 22 ;
- si aucun fallback valide n’existe, seul le store fautif est retiré et la donnée brute reste conservée en quarantaine.

Pendant l’utilisation, une écriture invalide sur un store critique est bloquée avant d’écraser la dernière version saine.

Snapshots Recovery :

```text
french-tranquille:recovery:last-good:v1
french-tranquille:recovery:pre-restore:v1
french-tranquille:recovery:pre-migration:v1
french-tranquille:recovery:pre-reset:v1
french-tranquille:recovery:quarantine:v1
```

Le filet historique `french-tranquille:safety:pre-build22:v1` reste conservé.

### Reset cohérent

Le reset learner est désormais atomique :

```text
snapshot pre-reset
→ learner
→ Memory
→ Error
→ Scenario
→ Listening
→ Milestones
→ supprimés ensemble
```

Le snapshot pré-reset reste disponible pour récupération/diagnostic.

## ✅ Preuves Build 28

Le tribunal Node et Chrome prouve réellement :

- backup V2 = six stores ;
- mutation → restore → état durable exact ;
- panne simulée en plein restore → rollback exact ;
- JSON et schémas invalides rejetés ;
- migration V1 conserve les stores modernes ;
- tentative d’écriture learner corrompue bloquée ;
- corruption injectée **avant `app.js`** réparée depuis `last-good` ;
- reset des six stores + récupération du profil historique ;
- ancien profil synthétique : **7 leçons terminées + `l8=4`** récupérés ;
- Home Build 27 mobile `390×844` toujours intacte.

La PR #62 head `dc060ea…` a passé **17/17 workflows**. Après merge, le runtime `ed09159a…` a passé **17/17 workflows fonctionnels sur `main`**, puis **GitHub Pages #118 SUCCESS**, soit **18/18 SUCCESS Pages incluse**.

## 🧭 App Shell Build 27 toujours intact

La façade apprenante reste :

### Aujourd’hui
- prochaine leçon ;
- CTA principal `Continuer` ;
- raccourcis `Réviser` / `Écouter` ;
- durée discrète.

### Pratiquer
- 🎙️ Parler ;
- 🎧 Écouter ;
- ↻ Réviser ;
- ♥ Dans la vraie vie.

### Progrès
- position A0 → A1 ;
- prochaine leçon ;
- étape actuelle ;
- cinq leçons utiles ;
- parcours complet en 5 étapes.

Memory / Mastery / Listening / Scenario / Error Intelligence restent des moteurs, pas des catégories que Trân doit piloter. Le cockpit historique reste en DEBUG FR.

## 🛡️ Sanctuaires

Byte-identiques pendant Build 28 :

- `voice-ios.js` ;
- `free-voice.js` ;
- `assets/LOGO.png` ;
- `assets/Favicon.png`.

Baselines conservées :

- curriculum **40 / 241** ;
- Scenario production **36 / 108** ;
- Listening **0.88 / 0.65** ;
- App Shell Build 27 ;
- containment Build 26.6 ;
- geometry Build 26.7 ;
- Focus Flow Build 26.8 ;
- Content Reliability Build 26.9.

Baseline historique protégée : **v1.17.0 — Build 24 — Real Life French II**, Scenario **28 situations / 84 tours** avant Pack III ; `real-life-data-2.js` reste canonique.

## 🎙️ Gate terrain toujours ouvert

Build 26.1 reste actif :

```text
réponse reconnue
→ seconde prise locale
→ réécoute correcte
→ réponse vocale suivante toujours reconnue normalement
```

Cette coexistence doit encore être confirmée sur le vrai iPhone avant d’enregistrer automatiquement le premier essai exact.

## Suite

1. **Gate terrain iPhone Build 26.1**.
2. **Build 29 — iPhone / PWA / Accessibility Hardening**.
3. **Build 30 — Architecture Hardening**.
4. **V2.0.0 — Freeze / Release**.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-27-APP-SHELL-RESET.md` et `docs/BUILD-28-DATA-RECOVERY.md`.