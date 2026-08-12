# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## État actuel

# ✅ V2.1.0 — Build 31 · Learner Intelligence Core — PROD

French Trân’quille a repris son évolution au-dessus de la baseline V2 gelée. **Architecture Build 30 reste le socle figé 2.0.0**, tandis que le produit courant passe à **v2.1.0 • Build 31**.

Build 31 n’ajoute pas encore de nouvelles leçons : il unifie d’abord le modèle apprenant sur les **40 leçons / 241 éléments** existants afin que la prochaine extension de contenu repose sur des preuves plutôt que sur un simple compteur de leçons.

### Baseline produit actuelle

- version visible : **v2.1.0 • Build 31** ;
- architecture gelée : **Runtime Contracts / Runtime Bridge 2.0.0 • Build 30** ;
- curriculum : **40 leçons / 241 éléments** ;
- Scenario : **36 situations / 108 tours** ;
- Listening : **0.88 normal / 0.65 lent** ;
- Speaking Loop : **2 moments maximum par leçon** ;
- stores durables Recovery : **6**, inchangés ;
- coût récurrent : **0 €**.

## 🧠 Build 31 — Learner Intelligence Core

Nouveau module `learner-intelligence.js`, exposé via `window.FrenchTranquilleLearnerIntelligence`.

Il lit sans migrer ni remplacer les moteurs existants :

- progression des leçons ;
- acquis connus ;
- Learning Memory : statut, échéance, rétention observable ;
- Error Intelligence : récence, répétition, récupération ;
- diversité des contextes où un acquis a été rencontré.

Il construit cinq bandes cohérentes :

```text
1–7    Survival A0
8–15   Daily A0
16–20  Foundations A1
21–25  First Exchanges A1
26–40  A1 Core
```

Le modèle produit :

- un **indice interne d’apprentissage** ;
- un **degré de confiance séparé** ;
- une estimation interne `A0 / A0+ / Pré-A1 / A1- / A1` ;
- une seule priorité suivante déterministe : révision, prochaine leçon, pratique ou entretien.

Ce niveau est un **outil interne d’adaptation**, jamais une certification CECRL.

### Interface

Une carte compacte apparaît dans **Progrès** : niveau interne, score, confiance et priorité suivante. Le détail des cinq bandes reste replié par défaut pour conserver le principe de progressive disclosure.

Aucun nouvel onglet de navigation et aucun cockpit moteur dans l’interface apprenante.

## 🎙️ Voix : gate iPhone toujours indépendant

Build 31 ne touche ni `voice-ios.js`, ni `free-voice.js`, ni Voice Replay, ni SpeechRecognition.

Une non-reconnaissance vocale est explicitement classée comme **signal du système de reconnaissance**, jamais comme mesure de qualité de prononciation. Aucun faux score phonétique n’est introduit.

Le gate terrain parallèle reste :

```text
reconnaissance Free Voice
→ seconde prise locale
→ lecture
→ reconnaissance suivante toujours normale
```

Il bloque uniquement une future **capture automatique du premier essai exact** pendant SpeechRecognition. Il ne bloque pas les builds de contenu, niveau, intelligence ou mémoire qui restent indépendants de cette capture.

## 🔐 Données / Recovery

Build 31 est **read-only vis-à-vis des stores durables** :

- aucun nouveau store ;
- aucune migration ;
- aucun `localStorage.setItem` dans Learner Intelligence ou son loader ;
- les six stores V2 restent les seuls stores pédagogiques Recovery ;
- le smoke navigateur exige les six valeurs brutes byte-identiques avant/après le calcul et le rendu Build31.

Stores canoniques :

```text
francais-avec-luc:learner:v1
french-tranquille:learning-memory:v1
french-tranquille:error-intelligence:v1
french-tranquille:scenarios:v1
french-tranquille:listening:v1
french-tranquille:milestones:v1
```

## 🧊 Baseline V2 toujours gelée

`release-v2.json` reste volontairement **2.0.0 / Architecture Build 30**. Les workflows V2 et Build30 ont été rendus version-forward sans affaiblir leurs assertions historiques : ils vérifient désormais qu’une V2.x courante reste compatible avec le socle gelé.

Le contrat continue de protéger :

- cardinalités 40/241, Scenario 36/108, Listening 0.88/0.65, Speaking max 2 ;
- six stores Recovery ;
- routes `Aujourd’hui / Pratiquer / Progrès` ;
- ancienne utilisatrice synthétique **7 leçons terminées / l8=4 / 40 acquis** ;
- sanctuaires exacts ;
- absence d’écriture durable pendant les round-trips.

## ✅ Certification Build 31

- PR runtime **#77** ; head certifié `eed097ca3d261f2f4dd60db930a11670511f33a1` ; **24/24 workflows fonctionnels SUCCESS** ;
- runtime mergé : `e2b2c6293f35495fa8bbffd2e6b684fba897df88` ;
- `main` runtime : **25/25 SUCCESS**, Pages comprise ;
- GitHub Pages **#135 SUCCESS** sur le SHA runtime exact ;
- smoke Build31 desktop : profil neuf → **leçon 1** ;
- smoke Build31 mobile 390×844 : ancien profil → **leçon 8**, état exact 7 / l8=4 / 40 ;
- V2 Freeze Compatibility, Build30 Architecture, Build29 iPhone/PWA, Recovery, Speaking et anciens parcours restent verts.

## 🛡️ Sanctuaires

- `app.js` — `600f094266c9f0c4c7b57efdbf61129909ebd9cb` ;
- `voice-ios.js` — `38e97aa3ef62dd6dcda224901b435f0973618679` ;
- `free-voice.js` — `b4c19b1936c788ee017eac9ba14e5a62c159e8d5` ;
- `assets/LOGO.png` — `64eaa6ad9781c6a9075d4f68615fc44344c4e21c` ;
- `assets/Favicon.png` — `c358672368a960bf7617e5532aff3e3319cddb3e` ;
- learner canonique `francais-avec-luc:learner:v1`.

## Baseline historique qualité conservée

La CI protège toujours explicitement **v1.17.0 — Build 24 — Real Life French II** : **28 situations / 84 tours** avant Pack III, avec `real-life-data-2.js` comme référence historique.

## Suite canonique

1. **Build 32 — Content Map & Practical A1 Expansion** : audit des capacités couvertes 1–40 puis extension des leçons **41+** vers le français pratique A1, sans gonfler le curriculum au hasard ;
2. enrichir Scenario / Listening seulement quand une nouvelle capacité nécessite une vraie réutilisation ;
3. **Memory v2** ensuite : richer evidence par modalité/contexte, uniquement avec plan de migration Recovery transactionnel ;
4. gate iPhone exact-first-attempt toujours parallèle et non bloquant pour ces travaux.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-31-LEARNER-INTELLIGENCE.md` et `docs/V2-RELEASE.md`.