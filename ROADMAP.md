# French Trân’quille — ROADMAP

> `README.md` = état courant. `CHANGELOG.md` = historique livré. Ici : **ordre, dépendances et critères de clôture**.

## Principes non négociables

1. iPhone / Safari / PWA iOS = cible principale ; PC et Android restent supportés.
2. Interface utilisable sans connaissances techniques.
3. 0 € d’exploitation récurrente sauf décision explicite.
4. Vietnamien comme soutien, français augmenté selon les preuves.
5. Oral prioritaire, sans faux diagnostic phonétique.
6. Communication réelle > théorie scolaire.
7. Aucun reset silencieux ; toute migration garde un smoke ancien utilisateur.
8. Un gros build = une intention principale.
9. Chrome réel avant merge important ; même tribunal sur `main`.
10. README / CHANGELOG / ROADMAP / ARCHITECTURE synchronisés.
11. Un nouveau moteur n’obtient pas automatiquement une nouvelle entrée de navigation.
12. Toute surface tappable donne un retour visuel immédiat sur mobile.
13. `Aujourd’hui / Pratiquer / Parcours` gardent des nœuds persistants et exactement un état actif.
14. Progressive disclosure : tous les moteurs et compteurs ne sont pas visibles par défaut.
15. Chaque activité possède un objectif, une progression, une fin et une sortie évidente.
16. Pas de tunnel pédagogique infini par défaut.
17. Succès visible et agréable, sans gamification agressive.
18. Pendant une vraie session de Trân : pas de polish runtime/cache sauf incident critique.
19. Une fonction d’auto-écoute ne doit jamais dégrader la reconnaissance vocale validée.
20. Les détails pédagogiques peuvent être riches, mais ils doivent être groupés par intention et jamais affichés comme un dump vertical.
21. Un mode `Lent` doit être **effectivement plus lent dans la couche voix finale**.
22. Les surfaces repliables critiques ont un contrat de clic navigateur réel.
23. **Un contrôle visible ne doit pas être remplacé entre `pointerdown` et `click`.** Les couches DOM récentes doivent être idempotentes et ne pas se disputer les mêmes nœuds.
24. Les tests d’interaction doivent vérifier la **destination réelle**, pas seulement la présence du bouton.

---

# Baseline production — v1.19.3 / Build 26.3

**Interaction Stability + Progress Layout — ✅ PROD**

- commit runtime production : `5947149e9fcb3b387aa01a797607270edb4f100e` ;
- PR #44 ;
- **9 workflows fonctionnels / 9 SUCCESS** sur la PR ;
- même tribunal fonctionnel vert sur `main` après rerun du smoke 26.3 sur le même commit ;
- GitHub Pages **#101 SUCCESS** ;
- Today : `Révision mémoire`, `Continuer le parcours`, `Écouter 3 minutes`, `Voir les autres activités` couverts par un smoke de clic réel ;
- Progress desktop : résumé + parcours à gauche, détails sticky/scroll interne à droite ;
- Progress mobile : résumé → parcours compact → détails repliés ;
- Progression UX Build 25 intact ;
- Listening : **0.88 normal / 0.65 lent effectif** ;
- Session UX Build 25.2 intact ;
- Real Life French III Build 26 intact : **36 situations / 108 tours** ;
- Voice Replay + Details Dashboard Build 26.1 intact ;
- curriculum : **40 leçons / 241 éléments** ;
- voix/branding sanctuarisés ;
- aucune migration de données apprenantes ;
- coût 0 €.

Baseline historique protégée : **v1.17.0 — Build 24 — Real Life French II**, Scenario **28 situations / 84 tours** avant Pack III.

---

# Build 26.3 — critères clôturés

## Interaction Stability — Today

Retour terrain vidéo :

- `Continuer le parcours` fonctionnait correctement ;
- `Révision mémoire` pouvait recevoir le feedback sans naviguer ;
- `Écouter 3 minutes` et `Voir les autres activités` pouvaient être inertes/incohérents.

Cause auditée : Daily Coach, Listening et Session UX composaient la même surface et plusieurs `MutationObserver` pouvaient déplacer/recréer les contrôles.

Correction :

- [x] couche additive `build26-3-ux.js/css` ;
- [x] exactement 2 actions Today principales stables ;
- [x] extras hors de `.daily-steps` legacy ;
- [x] proxy Listening caché pour stopper la réinjection concurrente ;
- [x] `Voir les autres activités` = vrai `<button>` avec `aria-expanded` ;
- [x] rendu strictement idempotent ;
- [x] routes Review / Lesson / Conversation / Listening explicites ;
- [x] aucune écriture learner/Memory/Scenario/Listening ;
- [x] vrai Chrome ouvre les extras ;
- [x] le même nœud toggle survit ;
- [x] vrai Chrome clique Listening et voit l’overlay ;
- [x] vrai Chrome clique Review et atteint l’écran Révision ;
- [x] vrai Chrome revient Home puis clique la leçon et atteint l’écran Lesson.

## Progress Layout — desktop + mobile

Desktop :

```text
Résumé / prochaine étape  | Détails d’apprentissage
Parcours A0 → A1          | dashboard + groupe actif
                           | sticky / scroll interne
```

Mobile :

```text
Résumé
↓
Parcours compact
↓
Détails repliés
```

Critères :

- [x] aucun clone des cartes pédagogiques ;
- [x] wrapper historique repositionné via `display: contents` ;
- [x] Details ouvert par défaut sur desktop ;
- [x] Details `position: sticky` sur desktop ;
- [x] dashboard Build 26.1 toujours présent ;
- [x] Details replié par défaut sur mobile ;
- [x] curriculum mobile reste compact **5 / 40** ;
- [x] profil synthétique l8 conserve sa progression ;
- [x] PR #44 : 9/9 workflows verts ;
- [x] `main` : contrats verts ;
- [x] Pages #101 SUCCESS.

---

# Build 26.2 — baseline conservée

- clic `Détails d’apprentissage` déterministe ;
- Listening effectif : **0.88 normal / 0.65 lent** ;
- `voice-ios.js` / `free-voice.js` byte-identiques ;
- aucune migration.

# Build 26.1 — baseline conservée / gate terrain iPhone

## Voice Self-Playback

Après une réponse reconnue, Free Voice propose une **seconde prise locale volontaire** destinée à l’auto-écoute. Aucun upload, aucune persistance, aucun effet sur Memory/Error/Mastery/Session, capture max 9 secondes, pistes micro stoppées.

### Gate terrain restant

- [ ] **test réel sur l’iPhone de Trân :** réponse reconnue → seconde prise locale → lecture correcte → réponse vocale suivante toujours reconnue normalement.

La capture simultanée exacte du premier essai reste hors scope tant que cette coexistence n’est pas prouvée.

## Learning Details Dashboard

Familles conservées :

```text
🧠 Mémoire & révisions
🎯 Maîtrise
🎧 Compréhension orale
🎭 Français réel
🧩 A1 & rythme
⋯ Autres détails
```

---

# v1.20.0 — Build 27 — Data & Recovery Hardening

**Prochain gros chantier après le gate iPhone.**

- sauvegarde/restauration cohérente ;
- migrations versionnées ;
- snapshot avant migration ;
- localStorage corrompu toléré ;
- tests zéro-perte ;
- rollback documenté.

# v1.21.0 — Build 28 — iPhone / PWA / Accessibility Hardening

Safe areas, tactile, contraste, tailles, offline/install et vrais tests iPhone.

# v1.22.0 — Build 29 — Architecture Hardening

Découpage du noyau uniquement avec snapshots comparatifs ; pas de grande réécriture cosmétique du cœur.

# V2.0.0 — Freeze / Release

Release cohérente, sauvegardable, testée et documentée.

---

# Sanctuaires

```text
francais-avec-luc:learner:v1
Learning Memory state
Scenario state
Listening state
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
bottom navigation compatibility bus
Progression UX Build 25
Session UX Build 25.2
Real Life III Build 26
Voice Replay + Details Dashboard Build 26.1
Click + Listening Rate Build 26.2
```

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.