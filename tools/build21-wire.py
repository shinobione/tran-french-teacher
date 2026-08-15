from pathlib import Path
import re

VERSION='1.14.0-b21'

# Patch adaptive T() wrappers on modular surfaces.
def patch_t(path, context):
    p=Path(path); t=p.read_text(encoding='utf-8')
    pattern=r"const T\s*=\s*\(vi,\s*fr\)\s*=>\s*isDebug\(\)\s*\?\s*fr\s*:\s*vi\s*;"
    replacement=f"const T = (vi,fr,context='{context}') => isDebug() ? fr : (window.FrenchTranquilleLanguage?.text?.(vi,fr,context) ?? vi);"
    t2,n=re.subn(pattern,replacement,t,count=1)
    if n==0:
        pattern2=r"const T\s*=\s*\(vi,\s*fr\)\s*=>\s*isDebug\(\)\s*\?\s*fr\s*:\s*vi"
        t2,n=re.subn(pattern2,replacement.rstrip(';'),t,count=1)
    if n==0:
        raise SystemExit(f'Could not patch T() in {path}')
    p.write_text(t2,encoding='utf-8')

for path,ctx in [
    ('src/pedagogy/daily-coach.js','daily'),
    ('src/pedagogy/scenario-engine.js','scenario'),
    ('src/pedagogy/listening-engine.js','listening'),
    ('src/pedagogy/curriculum-stage2.js','lesson-new'),
    ('src/pedagogy/curriculum-stage3.js','lesson-new')
]:
    patch_t(path,ctx)

# Scenario hints get extra Vietnamese support when the learner is blocked.
p=Path('src/pedagogy/scenario-engine.js'); t=p.read_text(encoding='utf-8')
t=re.sub(r"T\(([^,\n]*\.hintVi),\s*([^\)\n]*\.hintFr)\)",r"T(\1,\2,'scenario-hint')",t)
p.write_text(t,encoding='utf-8')

# Listening answer choices keep Vietnamese meaning to avoid leaking French transcript.
p=Path('src/pedagogy/listening-engine.js'); t=p.read_text(encoding='utf-8')
t=t.replace("options:dialogue.options.map(option=>({label:T(option.vi,option.fr)}))","options:dialogue.options.map(option=>({label:option.vi}))")
p.write_text(t,encoding='utf-8')

# index.html version + assets + runtime order.
p=Path('index.html'); t=p.read_text(encoding='utf-8')
t=t.replace('1.13.0-b20',VERSION).replace('Build 20 affiche','Build 21 affiche')
css='  <link rel="stylesheet" href="./src/pedagogy/listening-engine.css?v=1.14.0-b21" />\n'
if 'src/pedagogy/language-ratio.css' not in t:
    t=t.replace(css,css+'  <link rel="stylesheet" href="./src/pedagogy/language-ratio.css?v=1.14.0-b21" />\n')
needle='  <script type="module" src="./src/pedagogy/learning-memory.js?v=1.14.0-b21"></script>\n'
if 'src/pedagogy/language-ratio-core.js' not in t:
    t=t.replace(needle,needle+'  <script type="module" src="./src/pedagogy/language-ratio-core.js?v=1.14.0-b21"></script>\n  <script type="module" src="./src/pedagogy/language-ratio.js?v=1.14.0-b21"></script>\n')
p.write_text(t,encoding='utf-8')

# Service worker.
p=Path('sw.js'); t=p.read_text(encoding='utf-8')
t=t.replace('tran-french-teacher-v1.13.0-b20','tran-french-teacher-v1.14.0-b21').replace("const V='1.13.0-b20';","const V='1.14.0-b21';")
if 'src/pedagogy/language-ratio.css' not in t:
    t=t.replace("  `./src/pedagogy/listening-engine.css?v=${V}`,\n","  `./src/pedagogy/listening-engine.css?v=${V}`,\n  `./src/pedagogy/language-ratio.css?v=${V}`,\n")
if 'src/pedagogy/language-ratio-core.js' not in t:
    t=t.replace("  `./src/pedagogy/learning-memory.js?v=${V}`,\n","  `./src/pedagogy/learning-memory.js?v=${V}`,\n  `./src/pedagogy/language-ratio-core.js?v=${V}`,\n  `./src/pedagogy/language-ratio.js?v=${V}`,\n")
p.write_text(t,encoding='utf-8')

# Central metadata remains last in index and patches new modules.
p=Path('src/core/build-meta.js'); t=p.read_text(encoding='utf-8')
t=t.replace("const META = { version: '1.13.0', build: 20 };","const META = { version: '1.14.0', build: 21 };")
if "'FrenchTranquilleLanguageCore'" not in t:
    t=t.replace("  'FrenchTranquilleListening'\n","  'FrenchTranquilleListening',\n  'FrenchTranquilleLanguageCore',\n  'FrenchTranquilleLanguage'\n")
p.write_text(t,encoding='utf-8')

# README candidate.
Path('README.md').write_text(r'''# French Trân’quille

PWA de français pensée pour **Trân**, vietnamienne débutante au départ, avec vietnamien comme langue de soutien puis français progressivement renforcé selon les acquis réels.

## Candidat actuel

- **v1.14.0**
- **Build 21 — Adaptive Language Ratio**
- production précédente : **v1.13.0 / Build 20**
- curriculum : **40 leçons / 238 éléments**
- Scenario Lab : **12 situations / 36 tours**
- Listening Comprehension actif
- nouveau : moteur local **VI-HEAVY → VI-SUPPORT → BALANCED → FR-GROWING**
- coût d’exploitation : **0 €**
- cible principale : **iPhone / Safari / PWA iOS**

> Build 21 reste candidat tant que PR, `main`, GitHub Pages et rendu public n’ont pas tous validé les profils adaptatifs.

## Documentation

- [`ROADMAP.md`](./ROADMAP.md)
- [`CHANGELOG.md`](./CHANGELOG.md)
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
- [`docs/BUILD-POLICY.md`](./docs/BUILD-POLICY.md)
- [`docs/BUILD-20-LISTENING.md`](./docs/BUILD-20-LISTENING.md)
- [`docs/BUILD-21-ADAPTIVE-LANGUAGE.md`](./docs/BUILD-21-ADAPTIVE-LANGUAGE.md)
- PWA : `https://shinobione.github.io/tran-french-teacher/`

---

# Build 21 — soutien linguistique adaptatif

French Trân’quille n’utilise plus seulement une règle implicite « beaucoup de vietnamien au début, plus de français plus tard ».

Build 21 calcule un **profil de soutien** depuis des preuves locales :

```text
Curriculum
+ Learning Memory
+ Listening
+ pratique active
- fragilités
- erreurs récentes
- assistance nécessaire
        ↓
profil VI / FR
```

## Profils

```text
VI-HEAVY   ≈ VI 90 / FR 10
VI-SUPPORT ≈ VI 70 / FR 30
BALANCED   ≈ VI 50 / FR 50
FR-GROWING ≈ VI 30 / FR 70
```

Ce ne sont pas des quotas mot-à-mot. Ils indiquent **combien de soutien vietnamien Lucie doit conserver**.

## Les preuves qui font monter le français

- éléments réellement révisés ;
- mémoire solide ;
- réussite en Listening avec assez de tentatives ;
- pratique active ;
- progression curriculum, avec un poids volontairement limité.

## Ce qui remet du vietnamien

- beaucoup d’éléments fragiles ;
- difficultés des dernières 24 h ;
- difficultés répétées ;
- recours fréquent à une réponse modèle / assistance.

Une baisse du profil n’est pas une « régression de niveau » : c’est un retour temporaire du filet de sécurité.

---

# Adaptation par contexte

Le profil global est modulé.

Exemple avec `FR-GROWING` :

```text
Home               VI 25 / FR 75
Nouvelle leçon     VI 45 / FR 55
Révision           VI 20 / FR 80
Listening          VI 20 / FR 80
Scenario           VI 20 / FR 80
Feedback erreur    VI 50 / FR 50
Administration     VI 60 / FR 40 minimum de sécurité
Safety             VI 70 / FR 30 minimum
```

Donc même lorsque le français devient principal, une nouvelle structure ou une situation sensible récupère automatiquement davantage d’explication vietnamienne.

---

# Surfaces Build 21

## Home

Carte `Équilibre des langues` : profil, ratio, preuves positives, prudences.

## Leçons

Bandeau adaptatif sans réécrire les données curriculum historiques. La consigne principale et son support s’inversent selon le contexte.

## Daily Coach

Ses textes consomment le profil calculé.

## Scenario Lab

Les consignes deviennent plus françaises lorsque les preuves le permettent. Les **indices** utilisent un contexte séparé qui remet davantage de vietnamien quand Trân bloque.

## Listening

Les consignes/questions peuvent devenir françaises avec un profil fort.

**Les options de sens restent vietnamiennes**, afin de ne jamais transformer l’exercice audio en exercice de lecture du transcript.

## Progression

Dashboard : score interne, ratios par contexte, nombre de révisions, solides, Listening, erreurs récentes et raisons du profil.

## Réglages

Diagnostic compact du soutien courant.

---

# Moteur pur

`src/pedagogy/language-ratio-core.js` est testable sans navigateur.

Contrat CI :

```text
beginner → VI-HEAVY
strong   → FR-GROWING
fragile  → VI-SUPPORT
```

Le profil fragile utilise volontairement les mêmes progrès de curriculum que le profil fort, mais ajoute mémoire fragile + erreurs récentes + répétitions + assistance. Le moteur doit donc **redonner du vietnamien malgré le nombre élevé de leçons terminées**.

---

# Runtime adapter

`src/pedagogy/language-ratio.js` lit les clés pédagogiques existantes et recalcule le profil. Il ne crée pas de « niveau VI/FR » permanent qui pourrait devenir obsolète.

Il expose :

```text
FrenchTranquilleLanguage.current()
FrenchTranquilleLanguage.ratioFor(context)
FrenchTranquilleLanguage.text(vi,fr,context)
FrenchTranquilleLanguage.pair(vi,fr,context)
```

Les écritures Memory / Listening / Error / Scenario déclenchent un recalcul.

---

# DEBUG FR

DEBUG FR reste prioritaire pour Jerry : les fonctions adaptatives rendent alors le français sans modifier les preuves ni le profil réel de Trân.

---

# Non-régressions verrouillées

- 40 leçons / 238 éléments ;
- Listening hidden→reveal ;
- Scenario Lab 12/36 ;
- Error Intelligence 20/120 ;
- A1 Core Mastery ;
- Free Voice ;
- zéro API payante ;
- Safari/Siri Calibration Gate toujours séparé.

---

# CI Build 21

Node teste la décision pure et les contextes.

Chrome teste :

- profil débutant ;
- profil fort ;
- profil fragilisé ;
- Listening consommant `FR-GROWING` sans révéler le transcript ;
- systèmes existants.

Hooks :

```text
?languageSmoke=beginner
?languageSmoke=strong
?languageSmoke=fragile
```

Les preuves synthétiques restent limitées au calcul du navigateur CI et n’écrivent pas de faux niveau dans les données de l’utilisatrice.

---

# Suite

Après Build 21, la couche adaptative sera suffisamment complète pour attaquer **Real Life French / Français avec Jerry** sur une base bien plus intelligente : curriculum + mémoire + situations + erreurs + écoute + soutien linguistique adaptatif.
''',encoding='utf-8')

# CHANGELOG candidate.
p=Path('CHANGELOG.md'); t=p.read_text(encoding='utf-8')
head='## [Unreleased]\n\nAucun changement non livré pour le moment.\n'
entry=r'''## [Unreleased]

### v1.14.0 — Build 21 — Adaptive Language Ratio

- `src/pedagogy/language-ratio-core.js` : moteur pur de scoring ;
- `src/pedagogy/language-ratio.js` : adapter runtime ;
- `src/pedagogy/language-ratio.css` ;
- profils VI-HEAVY / VI-SUPPORT / BALANCED / FR-GROWING ;
- preuves Curriculum / Memory / Listening / pratique ;
- pénalités fragilité / erreurs récentes / répétition / assistance ;
- contextes navigation / home / lesson / review / grammar / listening / scenario / hint / feedback / admin / safety ;
- planchers de soutien VI pour contextes sensibles ;
- carte Home ;
- bandeau Leçon ;
- dashboard Progression ;
- diagnostic Réglages ;
- Daily Coach adaptatif ;
- Scenario Lab adaptatif ;
- indices Scenario plus soutenus ;
- Listening adaptatif avec options de sens toujours vietnamiennes ;
- DEBUG FR prioritaire et indépendant ;
- smoke beginner / strong / fragile ;
- dossier `docs/BUILD-21-ADAPTIVE-LANGUAGE.md`.

> Reste dans Unreleased jusqu’à PR + main + Pages + rendu public.
'''
if head in t:t=t.replace(head,entry+'\n')
elif '### v1.14.0 — Build 21' not in t:t=t.replace('## [Unreleased]\n',entry+'\n')
p.write_text(t,encoding='utf-8')

# ROADMAP: Build21 in progress and define next Real Life build sequence.
p=Path('ROADMAP.md'); t=p.read_text(encoding='utf-8')
t=t.replace('# v1.14.0 — Build 21 — Adaptive Language Ratio — 🔥 PROCHAIN','# v1.14.0 — Build 21 — Adaptive Language Ratio — 🔥 EN COURS')
needle='## Critères de clôture Build 21\n'
status=r'''## Implémentation candidate

- [x] moteur pur ;
- [x] quatre profils ;
- [x] score explicable ;
- [x] contextes ;
- [x] retour vers plus de VI après fragilité ;
- [x] Home ;
- [x] Leçon ;
- [x] Daily Coach ;
- [x] Scenario ;
- [x] indices Scenario ;
- [x] Listening ;
- [x] Progression ;
- [x] Réglages ;
- [x] DEBUG FR ;
- [x] dossier Build 21 ;
- [ ] CI PR ;
- [ ] merge ;
- [ ] CI main ;
- [ ] Pages ;
- [ ] rendu public.

'''
if needle in t and '## Implémentation candidate' not in t:t=t.replace(needle,status+needle)
# Expand Real Life French next milestone if absent.
if '# v1.15.0 — Build 22' not in t:
    insert=r'''
---

# v1.15.0 — Build 22 — Real Life French I / Français avec Jerry

Premier pack de situations très personnelles et réellement utiles : retrouvailles, maison, repas, messages, proches, fatigue, besoins, petites incompréhensions et langage affectif simple.

Le contenu utilisera enfin toutes les couches précédentes : Mastery, Scenario, Error, Listening et Adaptive Language Ratio.

'''
    t=t.replace('# Builds 22–24 — Real Life French',insert+'# Builds 22–24 — Real Life French')
p.write_text(t,encoding='utf-8')

# Architecture Build21.
Path('docs/ARCHITECTURE.md').write_text(r'''# French Trân’quille — ARCHITECTURE

## Vue générale

PWA statique GitHub Pages, sans backend obligatoire ni dépendance payante.

```text
iPhone/Safari/PWA | Android | PC
              ↓
         GitHub Pages
              ↓
 HTML + CSS + JavaScript
              ↓
 localStorage + Web APIs navigateur
```

## Ordre runtime — Build 21

```text
app.js
src/pedagogy/curriculum-stage2.js
src/pedagogy/curriculum-stage3.js
src/core/stage2-boot.js
src/core/debug-fr.js
voice-ios.js
free-voice.js
src/pedagogy/learning-memory.js
src/pedagogy/language-ratio-core.js
src/pedagogy/language-ratio.js
src/pedagogy/daily-coach.js
src/pedagogy/mastery-engine.js
src/pedagogy/mastery-stage3.js
src/pedagogy/scenario-data.js
src/pedagogy/scenario-host.js
src/pedagogy/scenario-engine.js
src/pedagogy/error-intelligence.js
src/pedagogy/listening-data.js
src/pedagogy/listening-engine.js
src/core/build-meta.js
```

Le moteur Language est chargé **après Learning Memory** mais **avant les surfaces modernes** Daily / Scenario / Listening, afin que leurs fonctions de texte puissent consulter le profil dès leur premier rendu.

`src/core/build-meta.js` reste dernier.

---

# Curriculum

40 leçons / 238 éléments : cœur 1–15, Stage2 16–25, Stage3 26–40. `app.js` reste sanctuarisé.

---

# Learning Memory

Clé : `french-tranquille:learning-memory:v1`.

La Language Ratio lit reviewed / solid / fragile / due depuis l’API mémoire quand disponible, sinon depuis la structure locale.

---

# Listening

Clé : `french-tranquille:listening:v1`.

La Language Ratio utilise uniquement : nombre de tentatives et réussites. La confiance Listening augmente progressivement jusqu’à 12 tentatives dans le score.

`src/pedagogy/listening-engine.js` consomme `FrenchTranquilleLanguage.text()` pour ses consignes, mais conserve les options de sens en vietnamien.

---

# Error Intelligence

Clé : `french-tranquille:error-intelligence:v1`.

Signaux consommés par Language Ratio : erreurs 24 h, récurrences, assistance. Ils peuvent faire redescendre temporairement le profil.

---

# Adaptive Language Ratio — Build 21

## `src/pedagogy/language-ratio-core.js`

Moteur pur. Aucune dépendance DOM/localStorage.

Entrée :

```text
curriculum {completed,total,known,totalItems}
memory {reviewed,solid,fragile,due}
listening {attempts,correct}
practice {conversationWins,scenarioSuccesses}
errors {recent,recurring,assisted}
```

Sortie : score 0–100, profil, composants et raisons.

Profils : VI-HEAVY / VI-SUPPORT / BALANCED / FR-GROWING.

`ratioFor()` applique ensuite un ajustement par contexte.

## `src/pedagogy/language-ratio.js`

Adapter runtime :

- collecte les preuves locales ;
- expose `FrenchTranquilleLanguage` ;
- surveille les écritures des clés pédagogiques en enveloppant le `Storage.setItem` déjà installé par Learning Memory ;
- appelle toujours le wrapper précédent afin de préserver la chaîne historique ;
- injecte Home / Lesson / Progress / Settings ;
- recalcule sans stocker un profil autoritaire.

## Idempotence

Les cartes utilisent des signatures de rendu. MutationObserver ne doit jamais réécrire un bloc si les preuves n’ont pas changé.

---

# Surfaces adaptatives

`src/pedagogy/daily-coach.js`, `src/pedagogy/scenario-engine.js`, `src/pedagogy/listening-engine.js` utilisent désormais une fonction `T()` dynamique :

```text
DEBUG FR ? français : FrenchTranquilleLanguage.text(...)
```

Scenario distingue `scenario` et `scenario-hint`.

Stage2/Stage3 utilisent aussi le resolver dynamique lors de leurs décorations futures.

Le cœur historique n’est pas traduit arbitrairement par heuristique DOM : Build21 ajoute un bandeau pédagogique adaptatif au lieu de réécrire `app.js`.

---

# Mastery

Mastery historique + A1 Core restent inchangés. Le ratio linguistique consomme des preuves compatibles mais ne modifie pas les seuils de maîtrise.

---

# DEBUG FR

Toujours prioritaire pour le navigateur de Jerry. Il n’écrit aucune fausse donnée d’apprentissage.

---

# Stockage

Aucune nouvelle clé de profil linguistique : le profil est dérivé.

Clés lues : learner, memory, listening, errors, scenarios.

---

# CI Build 21

- décision pure Node : beginner / strong / fragile ;
- sécurité des contextes ;
- Chrome beginner ;
- Chrome strong ;
- Chrome fragile ;
- Chrome Listening sous profil strong ;
- Home/Scenario/Error/A1 Core non-régression ;
- docs/version/cache.
''',encoding='utf-8')

# Install current quality workflow.
Path('.github/workflows/quality.yml').write_text(Path('tools/quality-build21.yml').read_text(encoding='utf-8'),encoding='utf-8')

print('Build 21 runtime/module/docs/CI wiring complete')
