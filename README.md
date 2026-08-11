# French Trân’quille

PWA de français pensée pour **Trân**, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version production

- **v1.18.2**
- **Build 25.2 — Session Goals / Milestones / App Delight**
- statut : **PROD / CLOS**
- baseline UX : **Build 25 — Progression UX / Progressive Disclosure**
- calibration Listening : **Build 25.1 — 0.88 normal / 0.64 lent**
- baseline fonctionnelle historique : **v1.17.0 — Build 24 — Real Life French II**
- curriculum : **40 leçons / 241 éléments**
- Scenario : **28 situations / 84 tours**
- coût : **0 €**

## Ce que Build 25.2 change

Une activité ne ressemble plus à un tunnel sans fin.

Contrat commun :

```text
AVANT   → objectif court
PENDANT → progression visible
FIN     → réussite explicite
APRÈS   → sortie logique en 1 tap
```

Sessions standard :

- Listening : **5 questions** ;
- Révision mémoire : **jusqu’à 5 éléments prioritaires** ;
- Scenario : **1 situation complète** ;
- Vocal guidé : **5 réponses reconnues** ;
- pratique guidée historique : **1 réponse correcte** ;
- leçon : fin enregistrée confirmée après sauvegarde.

Après une session terminée, `Retour à Aujourd’hui` est l’action principale. Continuer reste volontaire et secondaire.

## Pratiquer → Parler français

L’écran ne superpose plus tous les moteurs. Il ouvre un hub simple :

```text
Recommandé maintenant
[ Situation réelle • ≈ 3 min ]

Autres façons
[ Répondre à l’oral ]
[ Pratique guidée ]
```

Une fois un mode choisi, un seul moteur domine l’écran.

## Home / Séance du jour

`Séance du jour` limite le flux principal à **2 actions**. Les activités supplémentaires restent accessibles via `Voir les autres activités`.

## App Delight

Succès premium et court : barre à 100 %, coche, glow mint/lilas, pulse discret et transition < 1 seconde. `prefers-reduced-motion` est respecté.

Pas de son forcé, XP, monnaie, classement ni pluie de confettis.

## Milestones

Clé indépendante :

```text
french-tranquille:milestones:v1
```

Elle ne modifie aucune donnée pédagogique. Les acquis déjà atteints à sa première installation sont silencieusement baselinés afin d’éviter une avalanche rétroactive.

## Listening

Calibration production :

```text
normal = 0.88
lent   = 0.64
```

`voice-ios.js` reste inchangé.

## Progression UX

`Parcours` reste compact : 5 leçons visibles par défaut, 40 accessibles à la demande, détails Memory/Mastery repliables.

## Validation production

Commit production Build 25.2 : `49d866bed59bb0cb3268e1675225a4811f6c595f`.

- 7 workflows déclenchés sur ce SHA ;
- aucun workflow en échec ;
- GitHub Pages **SUCCESS** ;
- Progression UX smoke **SUCCESS** ;
- Session UX smoke + quality / Options / nav-mobile / Listening-rate obligatoires.

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

1. **v1.19.0 — Build 26 — Real Life French III** — PROCHAIN.
2. Build 27 — Data & Recovery.
3. Build 28 — iPhone/PWA/Accessibility.
4. Build 29 — Architecture Hardening.
5. V2.0.0 — Freeze / Release.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-25-2-SESSION-UX.md`.