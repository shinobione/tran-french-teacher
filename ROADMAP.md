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
24. Les tests d’interaction vérifient la **destination réelle**, pas seulement la présence du bouton.
25. **Une page ne doit pas imposer deux scrolls verticaux concurrents sans nécessité forte.** Sur Progress desktop, le document est le propriétaire du scroll ; un panneau pédagogique long s’étend dans le flux plutôt que d’ajouter un ascenseur imbriqué.
26. Un renommage produit ne justifie pas une migration technique risquée : les identifiants historiques peuvent rester internes si l’UI visible est cohérente.

---

# Baseline production — v1.19.3 / Build 26.3

**Interaction Stability + Progress Layout — ✅ PROD**

- commit runtime production : `5947149e9fcb3b387aa01a797607270edb4f100e` ;
- PR #44 ;
- **9 workflows fonctionnels / 9 SUCCESS** sur la PR ;
- même tribunal fonctionnel vert sur `main` après rerun du smoke 26.3 sur le même commit ;
- GitHub Pages **#101 SUCCESS** ;
- Today : `Révision mémoire`, `Continuer le parcours`, `Écouter 3 minutes`, `Voir les autres activités` couverts par un smoke de clic réel ;
- Progress desktop : résumé + parcours à gauche, détails à droite ;
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

# v1.19.4 — Build 26.4 — Single-scroll Progress + Tyffany — CANDIDATE

## Retour terrain : double scrollbar dans Progrès

Build 26.3 a validé la structure desktop 2 colonnes, mais les captures réelles montrent que `Détails d’apprentissage` possède un scrollbar interne dans une page déjà scrollable.

Cause :

```text
position: sticky
+ max-height calculé sur le viewport
+ overflow:auto
= second contexte de scroll vertical
```

Build 26.4 garde les deux colonnes mais rend à la page la propriété du scroll.

### Critères UX desktop

- [x] architecture 2 colonnes conservée ;
- [x] aucun clone des cartes pédagogiques ;
- [x] `display: contents` Build 26.3 conservé ;
- [x] override candidat `max-height:none` ;
- [x] override candidat `overflow:visible` ;
- [x] header Details non sticky dans un conteneur interne ;
- [x] mobile reste résumé → parcours → détails repliés ;
- [ ] Chrome candidat confirme `overflow-y: visible` ;
- [ ] Chrome candidat confirme absence de nested scroll ;
- [ ] Chrome candidat confirme que la page devient le scroll owner avec un groupe Mastery long ;
- [ ] tribunal PR complet vert ;
- [ ] merge `main` ;
- [ ] tribunal `main` vert ;
- [ ] GitHub Pages SUCCESS.

## Renommage professeure : Tyffany

Le nom produit visible devient **Tyffany**.

Contrat :

- [x] couche additive `build26-4-ux.js` ;
- [x] texte rendu `Lucie` → `Tyffany` ;
- [x] attributs visibles/sûrs normalisés ;
- [x] `FrenchTranquilleCurriculum.tutor` normalisé à `Tyffany` ;
- [x] parole synthétique contenant l’ancien nom normalisée avant lecture ;
- [x] `voice-ios.js` byte-identique ;
- [x] `free-voice.js` byte-identique ;
- [x] anciennes clés `luc-*`, IDs `lucie-*` et API `LucieVoice` conservés comme compatibilité ;
- [x] clé learner `francais-avec-luc:learner:v1` conservée ;
- [ ] Chrome candidat voit Tyffany et aucun Lucie visible ;
- [ ] options/debug voix reste fonctionnel ;
- [ ] aucun effet sur reconnaissance, choix de voix, rate ou pitch.

## CI Build 26.4

Nouveau workflow dédié :

- syntaxe/wiring/cache/version 1.19.4 ;
- hashes voix/branding inchangés ;
- rendu Tyffany ;
- aucun Lucie visible après branding ;
- tutor export Tyffany ;
- Progress l8 + Mastery ouvert ;
- Details sans scrollbar imbriqué ;
- page scrollable ;
- ancien profil l8 intact.

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
- [x] proxy Listening caché ;
- [x] `Voir les autres activités` = vrai `<button>` ;
- [x] rendu strictement idempotent ;
- [x] routes Review / Lesson / Conversation / Listening explicites ;
- [x] aucune écriture learner/Memory/Scenario/Listening ;
- [x] vrais clics Chrome jusqu’aux destinations.

## Progress Layout — baseline structurelle

Desktop :

```text
Résumé / prochaine étape  | Détails d’apprentissage
Parcours A0 → A1          | dashboard + groupe actif
```

Build 26.3 avait initialement rendu Details sticky avec un scroll interne. **Build 26.4 est autorisé à remplacer uniquement cette politique de scroll**, sans remettre en cause la structure 2 colonnes.

Mobile :

```text
Résumé
↓
Parcours compact
↓
Détails repliés
```

Critères structurels conservés :

- [x] aucun clone des cartes pédagogiques ;
- [x] wrapper historique via `display: contents` ;
- [x] dashboard Build 26.1 toujours présent ;
- [x] Details replié par défaut sur mobile ;
- [x] curriculum mobile compact **5 / 40** ;
- [x] profil synthétique l8 conserve sa progression ;
- [x] PR #44 : 9/9 workflows verts ;
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

**Prochain gros chantier après Build 26.4 et le gate iPhone.**

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

Compatibilité interne conservée malgré le branding Tyffany : `LucieVoice`, `luc-*`, `lucie-*`.

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.