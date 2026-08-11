# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version candidate

- **v1.18.2**
- **Build 25.2 — Session Goals / Milestones / App Delight**
- statut : **CANDIDAT / EN COURS**
- baseline production : **v1.18.1 — Build 25.1 — Listening Slow Calibration**
- baseline UX précédente : **v1.18.0 — Build 25 — Progression UX / Progressive Disclosure**
- baseline fonctionnelle historique : **v1.17.0 — Build 24 — Real Life French II**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **28 situations / 84 tours**
- coût : **0 €**

## Build 25.2 — principe

Une activité ne doit plus ressembler à un tunnel sans fin.

Contrat commun :

```text
AVANT   → objectif court
PENDANT → progression visible
FIN     → réussite explicite
APRÈS   → sortie logique en 1 tap
```

### Sessions candidates

- Listening : **5 questions** ;
- Révision mémoire : **jusqu’à 5 éléments prioritaires** ;
- Scenario : **1 situation complète** ;
- Vocal guidé : **5 réponses reconnues** ;
- Pratique guidée historique : **1 réponse correcte** ;
- leçon : fin enregistrée confirmée clairement sur la Home.

Après une session terminée, `Retour à Aujourd’hui` est l’action principale. Continuer reste volontaire et secondaire.

## Pratiquer → Parler français

L’écran ne doit plus empiler Scenario + Vocal + Lucie + rappel technique.

Build 25.2 ajoute un hub simple :

```text
Recommandé maintenant
[ Situation réelle • ≈ 3 min ]

Autres façons
[ Répondre à l’oral ]
[ Pratique guidée ]
```

Une fois un mode choisi, un seul moteur domine l’écran.

## Home / Séance du jour

`Séance du jour` limite maintenant le flux principal à **2 actions**. Les activités supplémentaires restent accessibles via `Voir les autres activités`.

## App Delight

Succès premium et court :

- barre à 100 % ;
- coche ;
- glow mint/lilas ;
- petit pulse ;
- transition < 1 seconde ;
- `prefers-reduced-motion` respecté.

Pas de son forcé, XP, monnaie, classement ni pluie de confettis.

## Milestones

Nouvelle clé indépendante :

```text
french-tranquille:milestones:v1
```

Elle ne modifie aucune donnée pédagogique. Les acquis déjà atteints lors de sa première installation sont marqués comme baseline afin d’éviter une avalanche rétroactive.

Jalons : première leçon, premier vocal reconnu, première session Listening, première situation réelle, premier rappel réussi, 10/25/50 acquis consolidés, fin A0/A1.

## Listening

Calibration production conservée :

```text
normal = 0.88
lent   = 0.64
```

`voice-ios.js` reste inchangé.

## Build 25 — Progression UX

`Parcours` reste compact : 5 leçons visibles par défaut, 40 accessibles, détails Memory/Mastery repliables.

## CI candidate

Nouveau workflow **Build 25.2 Session UX smoke** :

- Home = 2 actions visibles + reste replié ;
- Practice = hub unique ;
- Listening = 5/5 puis fin explicite ;
- Révision = 5/5 puis fin explicite ;
- reduced motion présent ;
- profil l8 toujours intact.

Les workflows quality / Options / nav-mobile / Progression UX / Listening-rate restent obligatoires.

## Sanctuaires

```text
francais-avec-luc:learner:v1
assets/LOGO.png
assets/Favicon.png
voice-ios.js
free-voice.js
curriculum / Learning Memory / Scenario / Listening state
```

## Suite

1. **Build 25.2 — Session Goals / Milestones / App Delight** — EN COURS.
2. **Build 26 — Real Life French III**.
3. Build 27 — Data & Recovery.
4. Build 28 — iPhone/PWA/Accessibility.
5. Build 29 — Architecture Hardening.
6. V2.0.0 — Freeze / Release.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/NEXT-UX-PASS.md`.