from pathlib import Path

# Error Intelligence: add listening-specific observable evidence and prevent double counting.
p=Path('src/pedagogy/error-intelligence.js')
t=p.read_text(encoding='utf-8')
t=t.replace("    'voice-unrecognized': { icon:'🎙️', vi:'Câu nói chưa được nhận ra', fr:'Phrase vocale non reconnue' },\n", "    'voice-unrecognized': { icon:'🎙️', vi:'Câu nói chưa được nhận ra', fr:'Phrase vocale non reconnue' },\n    'listening-miss': { icon:'🎧', vi:'Chưa hiểu phần nghe', fr:'Compréhension orale à retravailler' },\n")
t=t.replace("    if (value === 'voice' || value.endsWith('-voice')) return 'voice';\n", "    if (value.startsWith('listening-')) return 'listening';\n    if (value === 'voice' || value.endsWith('-voice')) return 'voice';\n")
t=t.replace("    if (channel === 'voice') type = 'voice-unrecognized';\n    else if (channel === 'text')", "    if (channel === 'voice') type = 'voice-unrecognized';\n    else if (channel === 'listening') type = 'listening-miss';\n    else if (channel === 'text')")
t=t.replace("    if (source.startsWith('free-voice-')) return;\n", "    if (source.startsWith('free-voice-') || source.startsWith('listening-')) return;\n")
p.write_text(t,encoding='utf-8')

# index.html
p=Path('index.html')
t=p.read_text(encoding='utf-8').replace('1.12.0-b19','1.13.0-b20').replace('Build 19 affiche','Build 20 affiche')
css='  <link rel="stylesheet" href="./src/pedagogy/error-intelligence.css?v=1.13.0-b20" />\n'
if 'src/pedagogy/listening-engine.css' not in t:
    t=t.replace(css,css+'  <link rel="stylesheet" href="./src/pedagogy/listening-engine.css?v=1.13.0-b20" />\n')
needle='  <script type="module" src="./src/pedagogy/error-intelligence.js?v=1.13.0-b20"></script>\n'
if 'src/pedagogy/listening-data.js' not in t:
    t=t.replace(needle,needle+'  <script type="module" src="./src/pedagogy/listening-data.js?v=1.13.0-b20"></script>\n  <script type="module" src="./src/pedagogy/listening-engine.js?v=1.13.0-b20"></script>\n')
p.write_text(t,encoding='utf-8')

# service worker
p=Path('sw.js')
t=p.read_text(encoding='utf-8').replace("tran-french-teacher-v1.12.0-b19","tran-french-teacher-v1.13.0-b20").replace("const V='1.12.0-b19';","const V='1.13.0-b20';")
if 'src/pedagogy/listening-engine.css' not in t:
    t=t.replace("  `./src/pedagogy/error-intelligence.css?v=${V}`,\n", "  `./src/pedagogy/error-intelligence.css?v=${V}`,\n  `./src/pedagogy/listening-engine.css?v=${V}`,\n")
if 'src/pedagogy/listening-data.js' not in t:
    t=t.replace("  `./src/pedagogy/error-intelligence.js?v=${V}`,\n", "  `./src/pedagogy/error-intelligence.js?v=${V}`,\n  `./src/pedagogy/listening-data.js?v=${V}`,\n  `./src/pedagogy/listening-engine.js?v=${V}`,\n")
p.write_text(t,encoding='utf-8')

# centralized build metadata
p=Path('src/core/build-meta.js')
t=p.read_text(encoding='utf-8').replace("const META = { version: '1.12.0', build: 19 };","const META = { version: '1.13.0', build: 20 };")
if "'FrenchTranquilleListeningData'" not in t:
    t=t.replace("  'FrenchTranquilleErrors'\n", "  'FrenchTranquilleErrors',\n  'FrenchTranquilleListeningData',\n  'FrenchTranquilleListening'\n")
p.write_text(t,encoding='utf-8')

# README candidate
Path('README.md').write_text(r'''# French Trân’quille

PWA de français pensée pour **Trân**, vietnamienne débutante au départ, avec vietnamien comme langue de soutien puis davantage de français quand les acquis deviennent réellement utilisables.

## Candidat actuel

- **v1.13.0**
- **Build 20 — Listening Comprehension**
- production précédente : **v1.12.0 / Build 19**
- curriculum conservé : **40 leçons / 238 éléments**
- Scenario Lab : **12 situations / 36 tours**
- Learning Memory + Daily Coach + Mastery + Error Intelligence
- nouveau : **Écoute active / Sens / Contrastes / Mini-dialogues**
- coût d’exploitation : **0 €**
- cible principale : **iPhone / Safari / PWA iOS**

> Build 20 reste candidat tant que PR, CI `main`, GitHub Pages et rendu public ne sont pas tous validés.

## Documentation

- [`ROADMAP.md`](./ROADMAP.md)
- [`CHANGELOG.md`](./CHANGELOG.md)
- [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
- [`docs/BUILD-POLICY.md`](./docs/BUILD-POLICY.md)
- [`docs/BUILD-19-A1-CORE.md`](./docs/BUILD-19-A1-CORE.md)
- [`docs/BUILD-20-LISTENING.md`](./docs/BUILD-20-LISTENING.md)
- PWA : `https://shinobione.github.io/tran-french-teacher/`

---

# Build 20 — Compréhension orale

Build 20 fait une différence simple mais fondamentale : **le texte français n’est plus visible avant la tentative**.

```text
Lucie lit
   ↓
Trân écoute
   ↓
choisit / comprend
   ↓
seulement ensuite : transcript
```

L’audio devient donc un signal à comprendre au lieu d’être uniquement une lecture d’un texte affiché.

## Trois familles

### 1. Sens

Une phrase ou un élément déjà connu est lu. Les choix correspondent à des **sens vietnamiens**. Le transcript français est caché jusqu’à la réponse.

### 2. Contrastes

Build 20 contient plus de dix groupes ciblés :

- météo vs sensation : `Il fait chaud` / `J’ai chaud` ;
- futur proche vs passé récent : `Je vais rentrer` / `Je viens de rentrer` ;
- `il` / `elle` ;
- midi / minuit ;
- et quart / et demie / moins le quart ;
- faim / soif ;
- gauche / droite ;
- aller simple / aller-retour ;
- états émotionnels.

Le but est la **discrimination et la compréhension**, pas la prononciation.

### 3. Mini-dialogues

Banque locale de dialogues : café, gare, téléphone, petite conversation, météo, appartement, administration, Jerry, restaurant et heure.

Un dialogue ne s’ouvre que lorsque ses éléments prérequis sont connus.

---

# Audio local

Aucune API audio externe.

- `speechSynthesis` ;
- voix française disponible dans le navigateur ;
- vitesse normale ≈ `0.88` ;
- vitesse lente ≈ `0.68` ;
- réécoute libre ;
- léger changement de pitch dans les mini-dialogues pour distinguer les interlocuteurs.

Le mode lent n’est pas une version « bébé » : c’est une aide temporaire que les statistiques peuvent compter.

---

# Listening Memory

Clé locale :

```text
french-tranquille:listening:v1
```

Conserve :

- sessions ;
- tentatives ;
- réussites / erreurs ;
- lectures / réécoutes ;
- vitesse lente ;
- statistiques Sens / Contrastes / Dialogues ;
- historique récent borné à 100 entrées.

---

# Learning Memory + Error Intelligence

Chaque réponse Listening nourrit Learning Memory avec :

```text
listening-meaning
listening-contrast
listening-dialogue
```

Build 20 ajoute à Error Intelligence :

```text
listening-miss
```

Cette preuve signifie seulement : **réponse incorrecte à un exercice d’écoute**.

Elle ne signifie ni déficience auditive, ni mauvaise prononciation, ni problème d’accent.

Le diff Memory ignore `listening-*` parce que le moteur Listening envoie déjà la preuve détaillée directement : **pas de double comptage**.

---

# UI Build 20

- carte `🎧 Luyện nghe chủ động / Écoute active` sur Home ;
- étape `Écouter 3 minutes` dans Daily Coach ;
- overlay plein écran ;
- onglets Sens / Contrastes / Mini-dialogues ;
- lecture normale / lente ;
- transcript caché puis révélé ;
- stats de session ;
- carte Compréhension orale dans Progression ;
- diagnostic Listening dans Réglages.

---

# Ce qui reste intact

- **40 leçons / 238 éléments** ;
- Mastery A0→A1 Core ;
- Scenario Lab 12/36 ;
- Error Intelligence 20/120 ;
- Guided Free Voice ;
- DEBUG FR ;
- PWA/offline ;
- aucune API payante.

---

# CI Build 20

Le hook :

```text
?listeningSmoke=1
```

prouve dans Chrome :

1. Listening s’ouvre ;
2. transcript absent avant tentative ;
3. une mauvaise réponse contrôlée est produite ;
4. transcript présent après tentative ;
5. compteur Listening incrémenté ;
6. source Error = `listening-meaning` ;
7. type Error = `listening-miss`.

Les autres Chrome continuent de contrôler Home 40 leçons, Scenario Lab, Error Intelligence 20/120 et Mastery A1 Core.

---

# Voix iPhone

Le **Safari/Siri Calibration Gate** reste séparé. Build 20 travaille la **compréhension d’une synthèse vocale**, pas l’évaluation de la production de Trân.

Aucun faux score phonétique n’est introduit.

---

# Suite

Après Build 20 : **Build 21 — Adaptive Language Ratio**, qui pourra enfin utiliser de vraies preuves de compréhension orale en plus de Memory/Mastery/Error Intelligence.
''',encoding='utf-8')

# CHANGELOG candidate
p=Path('CHANGELOG.md')
t=p.read_text(encoding='utf-8')
head='## [Unreleased]\n\nAucun changement non livré pour le moment.\n'
entry=r'''## [Unreleased]

### v1.13.0 — Build 20 — Listening Comprehension

- moteur local `src/pedagogy/listening-engine.js` ;
- banque déclarative `src/pedagogy/listening-data.js` ;
- stockage `french-tranquille:listening:v1` ;
- historique récent borné à 100 entrées ;
- trois familles : Sens / Contrastes / Mini-dialogues ;
- phrase française cachée avant tentative ;
- transcript révélé après réponse ;
- vitesse normale / lente ;
- réécoute ;
- stats par famille ;
- carte Home ;
- étape Daily Coach ;
- carte Progression ;
- diagnostic Réglages ;
- Learning Memory sources `listening-*` ;
- Error Intelligence `listening-miss` ;
- exclusion `listening-*` du diff Memory pour empêcher le double comptage ;
- hook CI `?listeningSmoke=1` ;
- dossier `docs/BUILD-20-LISTENING.md` ;
- CI prévue Home / Listening / Scenario / Error / A1 Core.

> Reste dans Unreleased jusqu’à la preuve PR + main + Pages + rendu public.
'''
if head in t:t=t.replace(head,entry+'\n')
elif '### v1.13.0 — Build 20' not in t:t=t.replace('## [Unreleased]\n',entry+'\n')
p.write_text(t,encoding='utf-8')

# ROADMAP candidate
p=Path('ROADMAP.md')
t=p.read_text(encoding='utf-8')
t=t.replace('# v1.13.0 — Build 20 — Listening Comprehension — 🔥 PROCHAIN','# v1.13.0 — Build 20 — Listening Comprehension — 🔥 EN COURS')
# Insert implementation status before criteria if not present.
needle='## Critères de clôture Build 20\n'
status=r'''## Implémentation candidate

- [x] `src/pedagogy/listening-data.js` ;
- [x] `src/pedagogy/listening-engine.js` ;
- [x] `src/pedagogy/listening-engine.css` ;
- [x] Sens ;
- [x] Contrastes ;
- [x] Mini-dialogues ;
- [x] transcript caché avant tentative ;
- [x] vitesse normale / lente ;
- [x] Home ;
- [x] Daily Coach ;
- [x] Progression ;
- [x] stockage local ;
- [x] Memory bridge ;
- [x] Error `listening-miss` ;
- [x] dossier Build 20 ;
- [ ] CI PR ;
- [ ] merge ;
- [ ] CI main ;
- [ ] Pages ;
- [ ] rendu public ;

'''
if needle in t and '## Implémentation candidate' not in t:t=t.replace(needle,status+needle)
p.write_text(t,encoding='utf-8')

# Architecture: rewrite current Build20 view concisely.
Path('docs/ARCHITECTURE.md').write_text(r'''# French Trân’quille — ARCHITECTURE

## Vue générale

PWA statique GitHub Pages, sans backend obligatoire ni API payante.

```text
iPhone/Safari/PWA | Android | PC
              ↓
         GitHub Pages
              ↓
 HTML + CSS + JavaScript
              ↓
 localStorage + Web APIs navigateur
```

## Ordre runtime — Build 20

```text
app.js
src/pedagogy/curriculum-stage2.js
src/pedagogy/curriculum-stage3.js
src/core/stage2-boot.js
src/core/debug-fr.js
voice-ios.js
free-voice.js
src/pedagogy/learning-memory.js
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

`src/core/build-meta.js` reste chargé en dernier et impose la version/runtime finale à tous les modules exposés.

---

# Curriculum

- `app.js` : cœur historique + 1–15 ;
- `src/pedagogy/curriculum-stage2.js` : 16–25 ;
- `src/pedagogy/curriculum-stage3.js` : 26–40 ;
- total : **40 leçons / 238 éléments** ;
- `src/core/stage2-boot.js` réalise un unique rerender après les extensions.

`app.js` reste sanctuarisé.

---

# Learning Memory

`src/pedagogy/learning-memory.js`

Clé : `french-tranquille:learning-memory:v1`.

États : new / fragile / learning / solid. Toutes les couches modernes utilisent le curriculum global.

---

# Error Intelligence

`src/pedagogy/error-intelligence.js`

Clé : `french-tranquille:error-intelligence:v1`.

Historique : 20 événements détaillés par item / 120 globaux récents.

Build 20 étend la taxonomie avec :

```text
listening-miss
```

`sourceChannel()` reconnaît `listening-*`. `classifyMemoryChange()` ignore `listening-*` parce que le moteur Listening envoie directement sa preuve détaillée, évitant le double comptage.

---

# Listening Comprehension — Build 20

## `src/pedagogy/listening-data.js`

Catalogue déclaratif :

- contrastes ;
- mini-dialogues ;
- prérequis par IDs curriculum ;
- questions VI/FR ;
- options ;
- items servant de preuves Memory/Error.

## `src/pedagogy/listening-engine.js`

Clé :

```text
french-tranquille:listening:v1
```

Responsabilités :

- famille Sens générée depuis les `knownItems` ;
- contrastes filtrés par acquis ;
- dialogues filtrés par prérequis ;
- synthèse audio locale ;
- vitesse normale/lente ;
- transcript caché avant réponse ;
- évaluation ;
- stats locales ;
- Home / Daily Coach / Progression / Settings ;
- Learning Memory bridge ;
- Error Intelligence bridge.

Sources :

```text
listening-meaning
listening-contrast
listening-dialogue
```

## Audio

`speechSynthesis` uniquement. Une voix française disponible est choisie localement. Les mini-dialogues utilisent un léger changement de pitch entre interlocuteurs.

Aucun audio n’est envoyé sur un serveur.

## Smoke CI

```text
?listeningSmoke=1
```

Le hook crée des acquis uniquement dans le profil navigateur CI, ouvre Listening, mémorise que le transcript était caché, produit une erreur contrôlée puis expose dans le DOM : transcript révélé, tentative enregistrée, source et type Error Intelligence.

---

# Free Voice

`free-voice.js` = production vocale guidée, SpeechRecognition quand disponible + fallback texte.

Free Voice et Listening sont complémentaires :

```text
Free Voice  = Trân produit → navigateur transcrit
Listening   = navigateur parle → Trân comprend
```

Aucun score phonétique.

---

# Mastery

`src/pedagogy/mastery-engine.js` = quatre étapes historiques.

`src/pedagogy/mastery-stage3.js` = A1 Core 26–40, avec preuves Memory requises avant maîtrise.

Build 20 n’altère pas les seuils de maîtrise.

---

# Scenario Lab

12 situations / 36 tours, clé `french-tranquille:scenarios:v1`. Build 20 = non-régression seulement.

---

# Daily Coach

Listening injecte une étape `Écouter 3 minutes` quand au moins trois acquis sont disponibles.

Error Intelligence peut continuer d’injecter sa priorité de difficulté.

---

# Stockage principal

```text
francais-avec-luc:learner:v1
french-tranquille:learning-memory:v1
french-tranquille:scenarios:v1
french-tranquille:error-intelligence:v1
french-tranquille:listening:v1
tran-french-teacher:debug-fr:v1
```

Aucun reset Build 20.

---

# CI Build 20

- syntaxe ;
- curriculum 40/238 ;
- contrat Listening Data ;
- transcript hidden→reveal ;
- Memory/Error bridge ;
- Home ;
- Listening ;
- Scenario ;
- Error 20/120 ;
- A1 Core.

Safari/Siri spécifique reste un test réel séparé.
''',encoding='utf-8')

# Replace quality workflow with Build20 current-state contract.
Path('.github/workflows/quality.yml').write_text(Path('tools/quality-build20.yml').read_text(encoding='utf-8'),encoding='utf-8')

print('Build 20 wiring/docs/CI complete')
