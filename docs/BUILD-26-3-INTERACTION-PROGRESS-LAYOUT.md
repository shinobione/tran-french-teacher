# Build 26.3 — Interaction Stability + Progress Layout

Status: **✅ PROD / CLOS**

Version: **v1.19.3 — Build 26.3**

- PR runtime : **#44**
- commit runtime production : `5947149e9fcb3b387aa01a797607270edb4f100e`
- PR : **9 workflows fonctionnels / 9 SUCCESS**
- `main` : 9 contrats fonctionnels verts après rerun du smoke 26.3 sur le même commit
- GitHub Pages : **#101 SUCCESS**

## Field feedback

Une vidéo d’usage réel a montré une séparation cohérente entre les contrôles :

- `Révision mémoire` et `Continuer le parcours` pouvaient recevoir un bon feedback visuel, mais `Révision mémoire` pouvait encore ne pas naviguer ;
- `Écouter 3 minutes` et `Voir les autres activités` étaient moins cohérents visuellement et pouvaient ne pas réagir ;
- l’écran desktop `Progrès` n’utilisait pas logiquement l’espace disponible.

## Cause racine

La surface Today était composée par plusieurs couches indépendantes :

1. `src/pedagogy/daily-coach.js` crée les boutons Daily.
2. `src/pedagogy/listening-engine.js` injecte Listening dans `.daily-steps`.
3. `src/ui/session-ux.js` déplaçait les boutons Daily dans un `<details>`, puis les remettait dans `.daily-steps`, supprimait le disclosure et le reconstruisait.
4. Listening et Session UX observent tous deux les mutations `childList`.

Un contrôle visible pouvait donc être remplacé entre le feedback `pointerdown` et le `click` final. Le `<summary>` natif de `Voir les autres activités` était également différent des vrais boutons couverts par l’Interaction Layer.

`Continuer le parcours` était structurellement plus sûr car il résolvait directement le vrai bouton de leçon.

## Runtime fix

Build 26.3 ajoute une couche isolée `src/ui/build26-3-ux.js` / `src/ui/build26-3-ux.css`.

### Stable Today controls

- Daily Coach reste la source du plan.
- Exactement deux `.daily-step` principaux sont rendus et gardés stables.
- Les activités secondaires vivent hors de `.daily-steps`, donc Session UX ne les déplace plus.
- Un proxy Listening caché satisfait l’injecteur sans devenir une action Daily visible.
- `Voir les autres activités` devient un vrai `<button>` stable avec `aria-expanded`.
- Routes explicites en phase capture :
  - Review → bus de compatibilité Review ;
  - Lesson → vrai bouton de leçon ;
  - Conversation → bus de compatibilité Conversation ;
  - Listening → `FrenchTranquilleListening.open()`.
- Le refresh est strictement idempotent : aucun label/attribut/état n’est réécrit s’il est déjà correct.
- Aucune donnée learner, Memory, Scenario ou Listening n’est écrite par cette couche.

### Progress desktop layout

Le DOM pédagogique existant est conservé.

Desktop / tablette large :

```text
┌──────────────────────────┬─────────────────────────────┐
│ Résumé / prochaine étape │ Détails d’apprentissage     │
│                          │ dashboard + groupe actif     │
├──────────────────────────┤                             │
│ Parcours A0 → A1         │ sticky / scroll interne     │
└──────────────────────────┴─────────────────────────────┘
```

La première enveloppe historique de Progress passe en `display: contents`, permettant à Overview, Curriculum et Details de devenir des items du Grid principal **sans clone et sans migration DOM**.

La colonne Details est :

- ouverte par défaut au premier rendu desktop ;
- sticky ;
- limitée par la hauteur du viewport ;
- scrollable indépendamment ;
- dotée d’un header sticky.

### Mobile

Ordre :

1. résumé ;
2. curriculum compact ;
3. Learning Details replié par défaut.

Le dashboard Build 26.1 et toutes les cartes moteur restent les mêmes nœuds DOM.

## Sanctuaires confirmés

Build 26.3 n’a pas modifié :

- `francais-avec-luc:learner:v1` ;
- Learning Memory / Scenario / Listening storage schemas ;
- curriculum **40 leçons / 241 éléments** ;
- Scenario **36 situations / 108 tours** ;
- Listening **0.88 normal / 0.65 lent** ;
- `voice-ios.js` ;
- `free-voice.js` ;
- `assets/LOGO.png` ;
- `assets/Favicon.png` ;
- Build 25.2 bounded-session behavior ;
- Build 26.1 local self-playback behavior.

## CI gate — résultats

### Today real-click smoke

Validé :

- [x] ouvre `Voir les autres activités` ;
- [x] prouve que le même nœud toggle existe avant/après ;
- [x] clique `Écouter 3 minutes` et voit l’overlay Listening ;
- [x] clique `Révision mémoire` et atteint Review ;
- [x] retourne Home ;
- [x] clique `Continuer le parcours` et atteint Lesson.

### Progress desktop

Validé :

- [x] profil synthétique lesson-8 préservé ;
- [x] Overview + Curriculum + Details présents ;
- [x] wrapper historique = `display: contents` ;
- [x] Details ouvert par défaut ;
- [x] Details = `position: sticky` ;
- [x] dashboard Build 26.1 présent.

### Progress mobile

Validé :

- [x] profil lesson-8 préservé ;
- [x] curriculum compact **5 / 40** ;
- [x] Details replié par défaut ;
- [x] même DOM disponible à la demande.

### Tribunal global

Sur PR #44 :

- quality ✅
- Options ✅
- nav/mobile ✅
- Progression UX ✅
- Listening rate ✅
- Session UX ✅
- Real Life French III ✅
- Voice Replay + Details Dashboard ✅
- Build 26.3 Interaction + Progress layout ✅

Soit **9 / 9 workflows fonctionnels SUCCESS**.

Sur `main`, le premier passage du nouveau smoke 26.3 a raté un marqueur de timing sans fatal card/runtime crash. Le rerun du **même commit** a validé Today + desktop + mobile intégralement. Les check-runs finaux du commit production sont verts, ainsi que GitHub Pages **#101**.

## État après clôture

Build 26.3 devient la baseline UX production pour :

- les interactions `Séance du jour` ;
- le layout desktop/tablette large de `Progrès` ;
- l’ordre mobile de Progress.

Le seul gate terrain encore ouvert dans la chaîne actuelle reste Build 26.1 : **auto-écoute réelle sur l’iPhone de Trân puis vérification que la reconnaissance vocale suivante reste normale**.

La prochaine phase structurante est **Build 27 — Data & Recovery Hardening**.