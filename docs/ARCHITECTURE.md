# French Trân’quille — ARCHITECTURE

## Vue générale — production Build 28

```text
iPhone / Safari / PWA
        ↓
Build 28 Recovery Engine
validation / last-good / snapshots / rollback
        ↓
Build 27 App Shell Reset
façade apprenante mobile-first
        ↓
Aujourd’hui / Pratiquer / Progrès / Parcours complet
        ↓
compatibility bus + moteurs historiques
        ↓
Progression / Session / Scenario / Listening / Memory / Mastery / Error
        ↓
Builds 26.6 → 26.9 : containment / geometry / focus / content reliability
        ↓
6 stores pédagogiques durables + Web APIs navigateur
```

PWA statique GitHub Pages, sans backend obligatoire ni API payante.

Principe produit : **la complexité appartient aux moteurs ; l’utilisatrice voit seulement le contexte nécessaire à l’action en cours.**

Principe données : **une donnée durable invalide ne doit jamais devenir silencieusement une progression neuve.**

Production : **v1.21.0 / Build 28**, runtime `ed09159a6246fe3c1892cb0ff8d03a4beffb7428`, PR #62, Pages #118 SUCCESS.

---

# Ordre de boot production

Build 28 change volontairement l’ordre de protection, pas le propriétaire pédagogique des données :

```text
index.html
  ↓
data-recovery-core.js
  ↓
data-recovery.js
  ↓
progress-safety.js
  ↓
app.js
  ↓
moteurs pédagogiques
  ↓
Build 27 App Shell
  ↓
build-meta.js
```

Le Recovery Engine est donc capable de détecter/réparer un store corrompu **avant** que `app.js` puisse interpréter l’absence ou l’invalidité comme un besoin d’initialiser un nouvel état.

---

# Build 28 — Data & Recovery

## Modules

```text
data-recovery-core.js
  logique pure / validateurs / backup / migration / restore / rollback

data-recovery.js
  intégration navigateur / snapshots / quarantaine / interception storage / UI backup

data-recovery-smoke.js
  contrat Chrome runtime

tools/test-build28-data-recovery.cjs
  tribunal Node zéro-perte
```

`data-recovery-core.js` fonctionne sans DOM et reste testable en Node.

## Registre durable canonique

```text
learner
  francais-avec-luc:learner:v1

memory
  french-tranquille:learning-memory:v1

errors
  french-tranquille:error-intelligence:v1

scenarios
  french-tranquille:scenarios:v1

listening
  french-tranquille:listening:v1

milestones
  french-tranquille:milestones:v1
```

Ces six stores sont le périmètre portable du backup V2.

Les préférences voix (`voiceURI`, rate, etc.) restent locales à l’appareil : copier un identifiant de voix Safari/iOS vers un autre environnement n’est pas un transfert pédagogique fiable.

---

# Backup format V2

```text
{
  format: "french-tranquille-backup",
  version: 2,
  exportedAt,
  app: { version, build },
  stores: {
    learner,
    memory,
    errors,
    scenarios,
    listening,
    milestones
  }
}
```

Avant export, chaque store présent passe son validateur. Un état critique illisible ne produit pas silencieusement un joli fichier incomplet.

Le bouton historique de backup Learning Memory reste la surface utilisateur ; Build 28 intercepte son action et remplace le vieux export partiel par le coffre V2 sans réécrire le moteur Memory.

---

# Restore transactionnel

Flux :

```text
backup entrant
   ↓
parse
   ↓
normalisation / migration
   ↓
snapshot pre-restore
   ↓
pre-migration si nécessaire
   ↓
validation des stores
   ↓
écriture cible
   ↓
relecture storage
   ↓
validation + comparaison exacte
   ├─ OK → last-good + reload
   └─ KO → rollback état précédent
```

L’écriture des stores est traitée comme une transaction applicative : si une étape échoue, la cible n’est pas considérée comme restaurée.

Le tribunal Node injecte volontairement une panne au milieu d’un restore et exige l’égalité exacte avec l’état d’avant.

---

# Migration backup V1 → V2

Le format historique V1 contenait :

```text
learner
memory
```

Il ne connaissait pas :

```text
errors
scenarios
listening
milestones
```

Règle Build 28 :

> **absence parce que le vieux format ne connaissait pas un store ≠ instruction de suppression.**

Donc un V1 restaure learner + Memory, mais préserve les quatre stores modernes existants.

---

# Snapshots Recovery

```text
french-tranquille:recovery:last-good:v1
french-tranquille:recovery:pre-restore:v1
french-tranquille:recovery:pre-migration:v1
french-tranquille:recovery:pre-reset:v1
french-tranquille:recovery:quarantine:v1
```

Le snapshot historique :

```text
french-tranquille:safety:pre-build22:v1
```

reste un fallback accepté lorsqu’un nouveau `last-good` n’existe pas encore.

## Last-good

Après un état durable validé, Build 28 maintient un snapshot cohérent des six stores. Les écritures durables passent d’abord leur validateur.

## Quarantaine

Une donnée rejetée n’est pas simplement jetée : sa représentation brute est conservée dans une quarantaine bornée pour diagnostic/récupération manuelle éventuelle.

---

# Corruption au boot

Pour chaque store présent :

```text
raw storage
   ↓
JSON valide ?
   ↓
schéma valide ?
   ├─ oui → continue
   └─ non
       ↓
     quarantaine
       ↓
     last-good valide ?
       ├─ oui → restore store
       └─ non
           ↓
         snapshot Build 22 valide ?
           ├─ oui → restore store
           └─ non → retire uniquement le store fautif
```

Le Recovery Engine agit avant `app.js`.

Le Chrome Build 28 injecte réellement un learner cassé avant le boot et exige sa récupération avant rendu normal de la PWA.

---

# Interception des écritures invalides

`Storage.prototype.setItem` est enveloppé uniquement pour les clés du registre durable.

Pour ces stores :

```text
nouvelle valeur
   ↓
validation
   ├─ valide → écriture + schedule last-good
   └─ invalide → blocage + quarantaine
```

Les autres clés `localStorage` continuent leur cycle normal.

---

# Reset cohérent

Le reset historique partait du learner canonique. Build 28 intercepte cette intention :

```text
pre-reset snapshot
   ↓
remove learner
remove memory
remove errors
remove scenarios
remove listening
remove milestones
   ↓
last-good de l’état reset
   ↓
reload
```

Le snapshot pré-reset reste disponible.

---

# Tribunal Build 28

Workflow : `.github/workflows/build28-data-recovery-smoke.yml`.

## Node

```text
6-store backup             PASS
round-trip exact           PASS
forced mid-restore failure PASS
rollback exact             PASS
invalid JSON               REJECTED
invalid schema             REJECTED
V1 migration               modern stores preserved
```

## Chrome runtime

Profil historique synthétique :

```text
l1 → l7 terminées
l8 progress = 4
```

Chrome prouve :

```text
corrupt write blocked      = 1
backup complete            = 1
restore exact              = 1
legacy migration detected  = 1
reset six stores           = 1
pre-reset snapshot         = 1
restore after reset        = 1
quarantine                 = 1
l8=4 after recovery        = 1
```

Deuxième Chrome : corruption injectée avant `app.js` → `last-good` → Home normale.

Troisième contrat mobile : Home Build 27 `390×844`, une action principale, deux raccourcis, zéro overflow horizontal.

Preuves release :

```text
PR #62 head dc060ea...      17/17 SUCCESS
main ed09159a...            17/17 fonctionnels SUCCESS
Pages #118                  SUCCESS
main total                  18/18 SUCCESS Pages incluse
```

---

# Build 27 — façade toujours propriétaire de l’UX apprenante

Build 28 n’ajoute aucune nouvelle destination à la navigation.

### Aujourd’hui

```text
prochaine leçon
[ Continuer ]
Réviser    Écouter
```

### Pratiquer

```text
Parler
Écouter
Réviser
Dans la vraie vie
```

### Progrès

```text
position A0 → A1
prochaine leçon
étape actuelle
5 leçons autour de la position
Voir tout le parcours
```

Cockpit moteur historique = DEBUG FR seulement.

---

# Runtime pédagogique historique

Les moteurs restent propriétaires de leur logique :

```text
progress-safety.js
app.js
curriculum-stage2.js
curriculum-stage3.js
stage2-boot.js
debug-fr.js
voice-ios.js
free-voice.js
learning-memory.js
error-intelligence.js
language-ratio-core.js
language-ratio.js
daily-coach.js
mastery-engine.js
mastery-stage3.js
scenario-data.js
real-life-data.js
real-life-data-2.js
real-life-data-3.js
scenario-host.js
scenario-engine.js
real-life-ux.js
real-life-coach.js
listening-data.js
listening-engine.js
ux-shell.js
interaction-ux.js
progression-ux.js
session-ux.js
session-ux-adapter.js
voice-replay.js
progress-details-dashboard.js
build26-3-ux.js
build26-4-ux.js
build26-5-ux.js
build26-6-ux.js
build26-7-ux.js
build26-8-ux.js
build26-9-ux.js
build27-app-shell.js
build27-smoke.js
```

Build 28 protège le stockage autour d’eux sans les réécrire.

---

# Builds 26.6 → 26.9 sous la façade

- Build 26.9 — vrai contenu visible des familles historiques ;
- Build 26.8 — Focus Flow / round-trip ;
- Build 26.7 — geometry ;
- Build 26.6 — containment **12 → 12**.

Tous restent sous CI.

---

# Listening

```text
normal request 0.88 → effectif 0.88
slow request   0.68 → bridge 0.65 → effectif 0.65
```

`voice-ios.js` reste byte-identique.

---

# Voice Self-Playback — Build 26.1

```text
réponse reconnue
→ seconde prise volontaire locale
→ MediaRecorder / Blob URL / Audio
```

Pas d’upload ni persistance audio. Gate réel iPhone toujours ouvert : `reconnaissance → seconde prise → lecture → reconnaissance suivante`.

---

# Real Life French

Production : **36 situations / 108 tours**.

Baseline historique protégée : `real-life-data-2.js` = **v1.17.0 — Build 24 — Real Life French II**, avec **28 situations / 84 tours** avant Pack III.

---

# Sanctuaires

Byte-identiques Build 28 :

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

Baselines produit :

```text
curriculum 40 / 241
Scenario 36 / 108
Listening 0.88 / 0.65
Build 27 App Shell
Build 26.6 containment
Build 26.7 geometry
Build 26.8 Focus Flow
Build 26.9 Content Reliability
```

---

# Dette / suite

Build 28 est **PROD / CLOS**.

Prochains jalons :

1. gate terrain iPhone Build 26.1 ;
2. Build 29 iPhone / PWA / Accessibility Hardening ;
3. Build 30 Architecture Hardening ;
4. V2.0.0 Freeze / Release.