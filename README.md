# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version candidate

- **v1.19.0**
- **Build 26 — Real Life French III**
- statut : **CANDIDAT / EN COURS**
- baseline production : **v1.18.2 — Build 25.2 — Session Goals / Milestones / App Delight**
- calibration Listening : **0.88 normal / 0.64 lent**
- curriculum : **40 leçons / 241 éléments**
- Scenario candidat : **36 situations / 108 tours**
- coût : **0 €**

## Baseline fonctionnelle historique conservée

Le contrat **v1.17.0 — Build 24 — Real Life French II** reste une baseline de non-régression explicite : avant Pack III, Scenario comptait **28 situations / 84 tours**. Build 26 enrichit cette baseline ; il ne remplace ni les Packs I/II ni leurs tests.

## Build 26 — objectif

Enrichir `Pratiquer → Parler français` sans ajouter de nouveau bouton : davantage de français oral naturel côté interlocuteur, des réponses un peu moins récitées et plusieurs formulations simples explicitement acceptées.

Le moteur reste **déterministe et local**. Il ne prétend pas comprendre librement n’importe quelle phrase.

### Pack Real Life III

8 nouvelles situations / 24 tours :

- 👂 comprendre `T’es prête ?`, `J’sais pas…`, `Y a pas…` ;
- 📆 futur proche : `Je vais appeler Jerry.` ;
- 🏠 passé récent : `Je viens de rentrer.` ;
- 🍜 passé composé : `J’ai mangé.` ;
- 🚪 mouvement au passé : `Je suis rentrée à la maison.` ;
- 📄 administration : `Pouvez-vous m’expliquer ?` ;
- 💬 émotion / besoin : `Je suis inquiète.` / `J’ai besoin de parler.` ;
- ❤️ petit échange de couple : `Tu me manques.` et réemploi de plusieurs acquis.

La première situation est accessible à partir de la leçon 20 ; les suivantes se débloquent avec les leçons 35 à 40.

## Réponses avec ses mots

Dans le Pack III, Lucie peut rappeler discrètement :

> Tu peux répondre avec tes mots. Une phrase simple qui exprime la bonne idée suffit.

Cela signifie **plusieurs réponses prévues acceptables**, pas une validation IA floue.

## Memory safety

Les nouveaux acquis avancés sont résolus depuis le curriculum réellement chargé. Une requête doit produire **exactement un acquis**. Zéro résultat ou plusieurs résultats = contrat CI rouge.

## Session UX conservée

Build 25.2 reste propriétaire de l’expérience de session :

```text
1 situation
→ progression des tours
→ fin explicite
→ Retour à Aujourd’hui
```

Le Pack III n’ajoute ni menu ni écran technique.

## Listening / voix

Calibration inchangée :

```text
normal = 0.88
lent   = 0.64
```

`voice-ios.js` et `free-voice.js` restent byte-identiques.

## CI candidate

Nouveau workflow **Build 26 Real Life French III smoke** :

- l20 : 1 scène Pack III ouverte ;
- l35 : 2 scènes ouvertes ;
- l40 : les 8 scènes ouvertes ;
- Scenario total **36 / 108** ;
- 15 résolutions Memory avancées ;
- **0 résolution ambiguë** ;
- maximum 6 situations ouvertes visibles dans le catalogue ;
- branding / voix sanctuarisés.

Les contrats quality / Options / nav-mobile / Progression UX / Listening-rate / Session UX restent obligatoires.

## Sanctuaires

```text
francais-avec-luc:learner:v1
Learning Memory / Scenario / Listening state
assets/LOGO.png
assets/Favicon.png
voice-ios.js
free-voice.js
Progression UX Build 25
Session UX Build 25.2
```

## Suite

1. **Build 26 — Real Life French III** — EN COURS.
2. Build 27 — Data & Recovery Hardening.
3. Build 28 — iPhone / PWA / Accessibility Hardening.
4. Build 29 — Architecture Hardening.
5. V2.0.0 — Freeze / Release.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-26-REAL-LIFE-FRENCH-III.md`.