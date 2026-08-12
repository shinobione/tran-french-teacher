# French Trân’quille — ARCHITECTURE

## Vue générale — production 29.1 + candidat 29.2

```text
iPhone / Safari / PWA
        ↓
Build 29 — iPhone / PWA / Accessibility
safe areas / touch / a11y / VisualViewport / offline
        ↓
Build 28 Recovery Engine
validation / last-good / snapshots / rollback
        ↓
Build 27 App Shell Reset
Aujourd’hui / Pratiquer / Progrès
        ↓
Curriculum + Memory + moteurs pédagogiques
        ↓
Build 29.2 Speaking Loop Variety & Clarity — candidat
contexte → modèle Tyffany → prise locale → Ma voix → recap varié
```

PWA statique GitHub Pages, sans backend obligatoire ni API payante.

Production certifiée : **v1.22.1 / Build 29.1**, runtime `b2fde53792c38d1e6283d8779bbcedfac36f9502`, PR #66, Pages #122 SUCCESS.

Candidat : **v1.22.2 / Build 29.2**.

## Ordre de boot

```text
index.html
  ↓
data-recovery-core.js
  ↓
data-recovery.js
  ↓
progress-safety.js
  ↓
app.js + curriculum
  ↓
Memory / Error / Scenario / Listening / Mastery / autres moteurs
  ↓
Build 27 App Shell
  ↓
Build 29 iPhone/PWA layer
  ↓
build-meta.js
  ↓
speaking-loop-content.js
```

Recovery agit avant `app.js`. Speaking Loop ne possède ni la progression ni Learning Memory : il les **consulte** pour choisir un moment oral cohérent, sans écrire de donnée durable.

---

# Build 29.2 — Speaking Loop Variety & Clarity — CANDIDAT

Modules concernés :

```text
speaking-loop-content.js
speaking-loop-content.css
speaking-loop-smoke.js
speaking-loop-variety-smoke.js
build-meta.js
sw.js
.github/workflows/build29-1-speaking-loop-smoke.yml
.github/workflows/build29-2-speaking-variety-smoke.yml
```

## Séparer compréhension et production

29.1 utilisait directement :

```text
lesson.challenge.answer
        ↓
Speaking Loop final
```

C’était trop naïf : une bonne réponse de reconnaissance peut être une cible orale médiocre.

29.2 devient :

```text
teach items + thème de leçon
        ↓
1 cible orale principale

challenge
        ↓
reste un exercice de compréhension / choix

écran de fin
        ↓
planificateur contextualisé
        ↓
1 recap oral distinct
```

Exemple Bài 7 :

```text
challenge : « dix euros » → 10 euros
recap oral attendu avec acquis antérieurs : « Combien ça coûte ? »
```

`10 euros` n’est donc pas supprimé du curriculum : il garde son rôle de compréhension, mais n’est plus automatiquement recyclé comme production orale.

## Planificateur oral

Le plan est calculé localement et reste borné à **2 moments maximum**.

### Candidats

1. éléments de la leçon actuelle ;
2. réponse du challenge seulement si sa qualité orale le permet ;
3. acquis déjà connus de leçons antérieures **uniquement avec recouvrement contextuel**.

### Score

Le score favorise :

- phrase/question de longueur utile ;
- forme directement prononçable ;
- mots/thème liés à la leçon actuelle ;
- proximité dans le parcours ;
- entrée Learning Memory `fragile`, puis `due`, puis `learning`.

Il défavorise :

- nombre seul ou `10 euros`-like comme production ;
- unité isolée (`euros`) ;
- cible identique au premier moment ;
- phrase présente dans la fenêtre récente anti-répétition ;
- acquis solide lorsqu’une cible plus utile existe.

Memory est appelée via :

```text
window.FrenchTranquilleMemory.summary()
```

Aucune méthode d’écriture Memory n’est invoquée. Le module n’effectue aucun `localStorage.setItem`.

## Anti-répétition

Une fenêtre mémoire **éphémère** garde jusqu’à six phrases récemment proposées. Elle n’est pas persistée et disparaît avec le runtime.

Le plan reste stable à l’intérieur d’une leçon pour éviter qu’un MutationObserver change la phrase sous les yeux de Trân. En quittant puis revisitant la leçon, une nouvelle planification peut exploiter la fenêtre récente et varier.

## Propriété du bouton modèle

Sur une étape `teach`, l’exercice possède déjà :

```text
button.listen[data-speak]
```

29.2 le rend explicite :

```text
VI       🔊 Nghe Tyffany
DEBUG FR 🔊 Écouter Tyffany
```

avec `title` / `aria-label` expliquant que Tyffany lit la phrase modèle. Le Speaking Loop **ne duplique plus ce contrôle**.

Sur le `recap` final, aucun bouton audio natif n’existe : la carte fournit alors un seul bouton modèle Tyffany.

## Auto-écoute locale

Inchangé dans son architecture :

```text
clic explicite
→ getUserMedia(audio)
→ MediaRecorder
→ max 9 s
→ Blob / Object URL
→ lecture locale
→ destruction au changement de moment/page
```

Libellés après enregistrement :

```text
VI       ↻ Ghi âm lại
DEBUG FR ↻ Enregistrer à nouveau
```

Pas d’upload, pas de backup, pas de store durable, pas de faux score de prononciation.

---

# Tribunal Build 29.2

Le nouveau workflow vérifie en vrai Chrome :

- **40 leçons** couvertes ;
- deux cibles distinctes / max 2 ;
- Bài 7 : recap != `10 euros` ;
- Bài 7 : récupération contextuelle `Combien ça coûte ?` avec acquis antérieurs ;
- deuxième plan avec historique récent → rotation ;
- bouton natif `Écouter Tyffany` / `Nghe Tyffany` ;
- zéro bouton Tyffany dupliqué sur le teach ;
- un bouton modèle au recap ;
- aucune ancienne carte Speaking Loop `challenge` ;
- zéro faux score de prononciation ;
- mobile `390×844`, target ≥44 px, zéro overflow.

Le workflow 29.1 reste actif en mode version-forward afin de protéger le contrat historique de deux moments oraux sans figer l’ancien détail d’implémentation.

---

# Build 29.1 — Speaking Loop Content — PROD

Preuves :

```text
PR #66 head df730d60...   19/19 fonctionnels SUCCESS
main b2fde537...           19/19 fonctionnels SUCCESS
Pages #122                SUCCESS
main total                20/20 SUCCESS Pages incluse
```

29.2 affine la sélection et l’UI ; il ne remet pas en cause la prise locale volontaire introduite par 29.1.

---

# Gate exact-premier-essai — toujours ouvert

Build 26.1 Free Voice reste séparé :

```text
reconnaissance
→ seconde prise
→ lecture
→ reconnaissance suivante toujours normale
```

Tant que ce gate réel iPhone n’est pas validé, aucune capture automatique parallèle du premier essai SpeechRecognition.

---

# Build 29 — iPhone / PWA / Accessibility

Safe areas, touch ≥44 px, focus-visible, `aria-current`, progressbar/live regions, `VisualViewport`, standalone, reduced-motion, contraste, matrice **320×568 / 390×844 / 430×932** et boot offline restent sous CI.

# Build 28 — Data & Recovery

Stores durables :

```text
learner     francais-avec-luc:learner:v1
memory      french-tranquille:learning-memory:v1
errors      french-tranquille:error-intelligence:v1
scenarios   french-tranquille:scenarios:v1
listening   french-tranquille:listening:v1
milestones  french-tranquille:milestones:v1
```

Backup V2, restore transactionnel, rollback, migration V1 sûre, quarantaine, `last-good` et snapshots restent en vigueur.

# Build 27 — App Shell

- Aujourd’hui : prochaine leçon / Continuer / Réviser / Écouter ;
- Pratiquer : Parler / Écouter / Réviser / Dans la vraie vie ;
- Progrès : position A0→A1 / prochaine leçon / 5 leçons / parcours complet ;
- cockpit moteur historique : DEBUG FR seulement.

# Listening

```text
normal request 0.88 → effectif 0.88
slow request   0.68 → bridge 0.65 → effectif 0.65
```

# Real Life French

Production : **36 situations / 108 tours**.

Baseline historique protégée : `real-life-data-2.js` = **v1.17.0 — Build 24 — Real Life French II**, **28 situations / 84 tours** avant Pack III.

# Sanctuaires

```text
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
francais-avec-luc:learner:v1
```

Baselines produit : curriculum **40/241**, Scenario **36/108**, Listening **0.88/0.65**, Build 27 App Shell, Build 28 Recovery, Build 29 iPhone/PWA/A11y, Build 29.1 Speaking Loop.

## Suite

1. certifier Build 29.2 ;
2. gate terrain iPhone Voice Replay ;
3. Build 30 Architecture Hardening ;
4. V2.0.0 Freeze / Release.
