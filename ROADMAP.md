# French Trân’quille — ROADMAP

> `README.md` = état courant. `CHANGELOG.md` = historique livré. Ici : **ordre, dépendances et critères de clôture**.

## Principes non négociables

1. iPhone / Safari / PWA iOS = cible principale ; PC et Android secondaires.
2. Interface utilisable sans comprendre l’architecture interne.
3. 0 € de coût récurrent sauf décision explicite.
4. Vietnamien comme soutien, français augmenté selon les preuves.
5. Oral prioritaire, sans faux diagnostic phonétique.
6. Communication réelle > théorie scolaire.
7. Aucun reset silencieux ; migration = snapshot + validation + rollback.
8. Un gros build = une intention principale.
9. Chrome réel avant merge important, puis même tribunal sur `main`.
10. README / CHANGELOG / ROADMAP / ARCHITECTURE synchronisés après certification.
11. Un nouveau moteur n’obtient pas automatiquement une nouvelle navigation.
12. Une page = une intention principale ; progressive disclosure par défaut.
13. Chaque activité a début, objectif, progression, fin et sortie évidente.
14. Aucun contrôle visible ne doit être remplacé entre `pointerdown` et `click`.
15. Une route principale doit rester déterministe au **premier geste**, sans tap de récupération.
16. Un overlay/modal possède une fermeture explicite avant toute navigation qui change l’écran dessous.
17. Une fonction d’auto-écoute ne doit jamais dégrader SpeechRecognition validé.
18. `voice-unrecognized` = signal de reconnaissance, jamais preuve phonétique.
19. Pas de score de prononciation sans vraie mesure phonétique.
20. Un audio local n’entre ni dans progression, ni Memory, ni backups.
21. Une baseline gelée et le produit courant sont deux vérités différentes.
22. 52 IDs de leçons et 313 IDs d’items actuels restent ordonnés ; le freeze V2 40/241 reste rejouable.
23. Un concept grammatical n’est pas « maîtrisé » parce qu’un QCM est réussi une fois.
24. Phrase mémorisée, concept compris, construction autonome et transfert sont des preuves différentes.
25. La grammaire s’enseigne avec exemples connus puis règle courte, pas avec un mur théorique.
26. Le vietnamien explique le mécanisme ; le français sert d’exemple et de production.
27. Les noms français s’apprennent autant que possible avec leur article.
28. Pas de nouvel onglet principal `Grammaire` sans besoin utilisateur prouvé.
29. Une capsule Fondations reste courte, contextuelle et facultative dans le pilote.
30. Aucun nouveau store ou schéma durable pour le pilote Fondations.
31. Memory Evidence v2 ne sera adoptée qu’après migration simulée, relecture et rollback prouvés.
32. Un vieux backup ne peut pas effacer une donnée moderne qu’il ne connaissait pas.
33. Les données corrompues sont mises en quarantaine avant d’être écartées.
34. `app.js`, voix et branding restent sanctuaires hors build explicitement justifié.
35. Les tests doivent exercer **l’action qui a réellement cassé**, pas seulement vérifier que son bouton existe.

---

# ✅ Maintenance terrain post-Build32 — LIVRÉE / FIELD CONFIRMATION PENDING

Deux bugs réels ont été remontés pendant l’utilisation de Trân.

## P1 Navigation — Listening → Aujourd’hui

Bug observé :

```text
Listening
→ tap Aujourd’hui
→ contenu principal vide/bloqué indéfiniment
→ bottom bar encore visible
→ deuxième tap Home nécessaire
```

### Correctif livré

- [x] identifier Listening comme overlay `body` avec état propre ;
- [x] fermer Listening sur le geste physique de bottom-nav **avant** le routage existant ;
- [x] ne pas réécrire `app.js` ;
- [x] ne toucher à aucun store ;
- [x] PR runtime #82 mergée ;
- [x] runtime `93f513f719f176c9c059eee7458e31026e602e7f` ;
- [x] Pages #139 SUCCESS ;
- [ ] confirmation vrai iPhone : **un seul tap** Listening → Aujourd’hui rend Home immédiatement.

Le fix n’est considéré terrain-clos qu’après cette dernière case.

## P1 Réécoute Speaking Loop

Bug observé à partir d’au moins Bài 11/12 :

```text
🎙️ Ghi âm
→ ⏹ Dừng ghi âm
→ absence du ▶ Giọng của tôi attendu
```

Il n’existe aucune condition « lesson >= 11 » dans le code.

### Correctif livré

- [x] identifier le contrat réel : `MediaRecorder → dataavailable → Blob → Blob URL → Ma voix` ;
- [x] constater que le code utilisait `MediaRecorder.start(120)` ;
- [x] pour les prises **audio-only**, retirer uniquement le `timeslice` et laisser la finalisation au `stop()` ;
- [x] laisser les autres MediaRecorder inchangés ;
- [x] `voice-ios.js` inchangé ;
- [x] `free-voice.js` inchangé ;
- [x] aucune persistance audio ;
- [x] PR #82 + Pages #139 ;
- [ ] vrai iPhone Bài 11 : record → stop → `▶ Giọng của tôi` → lecture audible ;
- [ ] vrai iPhone Bài 12 : même test ;
- [ ] nouvelle reconnaissance vocale après réécoute : toujours normale.

Le fait que la réécoute ait déjà fonctionné auparavant est traité comme une preuve de **régression/fragilité de finalisation**, pas comme un seuil pédagogique.

---

# ✅ Build 33 — Foundations Audit & Pedagogy Specification — CLOS

Objectif : savoir ce qui est **explicite, implicite, partiel ou manquant** avant de coder des capsules.

## Audit structurel 313/313

- [x] leçons 1–15 : **88 items**, structures surtout implicites ;
- [x] leçons 16–25 : **60 items**, notes grammaticales contextuelles ;
- [x] leçons 26–40 : **93 items**, structures A1 explicites/contextuelles ;
- [x] leçons 41–52 : **72 items**, structures Build32 ;
- [x] total : **313/313 classifiés**.

## Conclusion

Le principal trou prioritaire n’est pas la conjugaison générale : `être`, `avoir`, `vouloir/pouvoir`, sujets, possessifs, futur proche, passé récent, passé composé, `devoir` et `on` sont déjà explicitement travaillés plus tard.

Le trou à corriger d’abord est :

```text
F01  genre du nom
F02  un / une / des
F03  le / la / l’ / les
F04  singulier / pluriel
```

avec vocabulaire déjà rencontré : `la gare`, `la pharmacie`, `un billet`, `une table`, `les toilettes`.

Voir `docs/BUILD-33-FOUNDATIONS-AUDIT.md`.

---

# ✅ V2.3.0 — Build 34 · Foundations Pilot F01–F04 — PROD / FIELD VALIDATION

Objectif : valider la pédagogie Fondations sur un petit périmètre réel avant d’industrialiser F05–F18.

## Runtime livré

- [x] aucune renumérotation 52/313 ;
- [x] aucune leçon 53+ ;
- [x] aucun nouvel onglet Grammaire ;
- [x] capsule contextuelle dans la zone leçons **8–13** ;
- [x] explication VI-heavy ;
- [x] exemples réels du curriculum ;
- [x] 4 mini-checks ;
- [x] `la pharmacie → les pharmacies` comme premier transfert simple ;
- [x] rappel explicite : mini-check réussi ≠ maîtrise ;
- [x] retour à la leçon ;
- [x] zéro `localStorage.setItem` dans le pilote ;
- [x] zéro nouveau store/migration ;
- [x] pas de micro obligatoire ;
- [x] audits historiques Build30/31/32 exclus du pilote ;
- [x] PR #84, head `6cd47c8c5e11ccccee219217b81b3877408c6e5a` ;
- [x] tous les workflows PR existants SUCCESS après rerun inchangé d’un flake Build32 ;
- [x] `main` runtime `259e07c9ed208fe0a7e91998827406b4fdc0bc33` ;
- [x] **26/26 SUCCESS** ;
- [x] Pages **#140 SUCCESS** exact SHA.

## Field validation à faire avec Trân

- [ ] capsule facile à comprendre en vietnamien ;
- [ ] `la gare` / `un billet` / `une table` compris comme motifs, pas seulement phrases mémorisées ;
- [ ] pluriel `la pharmacie → les pharmacies` compris ;
- [ ] durée perçue raisonnable ;
- [ ] capsule utile et non intrusive.

**Interdiction roadmap : ne pas industrialiser F05–F18 avant ce retour.**

---

# Premium gate before Build 35 — V5.10 PHYSICAL FIELD PASS

V5.9 is technically closed through PRs **#130–#134**, ending at `4019c1b6cb41fee9c36bdb223e255455a0da4b5f`.

Before Build 35 can start:

- [ ] real installed-iPhone/PWA pass across Original / Aurora / Sunset / Nocturne;
- [ ] confirm Speaking Loop has one record CTA + one note;
- [ ] confirm full-card About tap;
- [ ] confirm Lesson/Eiffel separation;
- [ ] confirm hidden DEBUG entry and no learner-facing leak;
- [ ] confirm new home-screen/PWA icon quality;
- [ ] explicit final user PASS;
- [ ] close Premium issue #114.

**Build 35 is reserved and blocked until every gate above is closed.**

---

# Build 35 — Memory Evidence v2 / Migration Readiness — BLOCKED / RESERVED

Objectif : concevoir la future mémoire en sachant désormais distinguer **phrase mémorisée et concept grammatical**.

## 35.1 — Evidence model

À spécifier au minimum :

```text
retrieval
listening
scenario
text
recognition
construction
transfer
assistance
recency
repetition
recovery
```

États à distinguer :

```text
exposure
assisted success
autonomous recall
contextual reuse
concept understanding
novel construction / transfer
```

Une non-reconnaissance vocale reste `recognition`, jamais prononciation.

## 35.2 — Storage decision

- [ ] décider objectivement in-place vs nouveau store ;
- [ ] bornes d’historique/taille ;
- [ ] compat backups V1/V2 ;
- [ ] ownership explicitement documenté ;
- [ ] aucune adoption simplement pour « faire plus propre ».

## 35.3 — Migration dry run obligatoire

1. [ ] snapshot `pre-migration` ;
2. [ ] validation source ;
3. [ ] transform déterministe ;
4. [ ] écriture transactionnelle simulée ;
5. [ ] relecture ;
6. [ ] comparaison ;
7. [ ] rollback ;
8. [ ] quarantaine invalides ;
9. [ ] vieux backups ;
10. [ ] ancien profil `7 / l8=4 / 40` ;
11. [ ] vrais navigateurs.

**DoD Build35 : modèle simulable et réversible, aucun nouveau schéma durable adopté.**

---

# Build 36 — Memory Evidence v2 Adoption Candidate — CONDITIONNEL

N’existe que si Build35 ferme tout.

- [ ] migration déterministe ;
- [ ] idempotence ;
- [ ] rollback prouvé ;
- [ ] backup compatibility ;
- [ ] old-user smoke ;
- [ ] Recovery `pre-migration` ;
- [ ] stockage borné ;
- [ ] aucun fait inventé depuis une absence de preuve.

---

# Build 37 — Foundations Core Complete

Après validation réelle de F01–F04 :

- [ ] finaliser syllabus F05–F18 depuis audit et retours ;
- [ ] introduction + renforcement + review mapping par capsule ;
- [ ] règles `do not trigger` ;
- [ ] Listening/Speaking seulement quand pédagogiquement utiles ;
- [ ] preuves de concept compatibles Memory v2 ;
- [ ] aucune obligation micro systématique.

Syllabus candidat restant : pronoms sujets, consolidation `être/avoir`, `-er`, futur proche, modaux, négation, questions, adjectifs, possessifs, partitifs, contractions, passé récent/composé, `on` oral. Les leçons déjà explicites doivent être **réutilisées**, pas dupliquées.

---

# Build 38 — Generalization & Transfer

Objectif : générer du français à partir de règles acquises.

Cibles :

- singulier → pluriel ;
- masculin/féminin quand pertinent ;
- remplacement de sujet ;
- affirmatif → négatif ;
- phrase → question ;
- présent → futur proche ;
- passé récent / passé composé simple ;
- article + nom ;
- accord adjectif ;
- phrase nouvelle avec vocabulaire connu.

Validation locale/déterministe ; pas de pseudo-LLM flou.

---

# Build 39 — Learner Intelligence 3

Tyffany pourra choisir entre :

```text
continuer la leçon
revoir une phrase
revoir un concept
proposer une capsule
Listening
transfer
maintain
```

Phrase competence, concept competence, confiance et diversité des preuves restent séparées.

---

# Build 40 — A1 Consolidation Audit

Avant mass A2 : audit complet de :

- 52 leçons ;
- Fondations ;
- transfer ;
- Listening ;
- oral ;
- scénarios réels ;
- trous restants.

Décision explicite ensuite : renforcer A1, A1+ interne ou vraie expansion A2.

---

# Phase A2 — seulement après Build 40

Axes candidats : narration plus riche, causes/conséquences, opinion développée, admin, travail, logement/services, santé quotidienne, incidents de voyage, appels, écriture simple, écoute plus naturelle, connecteurs, pronoms objets fréquents, impératif, conditionnel de politesse, passé composé consolidé, imparfait si nécessaire, futur, comparaison/superlatif, fréquence/durée.

Chaque nouvelle capacité doit être intégrée quand pertinent à :

`Curriculum + Listening + Scenario + Speaking + Foundations + Memory evidence + Transfer`.

---

# Baselines à ne jamais perdre

```text
V2 Freeze        2.0.0 / Build30 / 40 leçons / 241 items
Build31          2.1.0 / 40 / 241 / 5 bandes historiques
Build32          2.2.0 / 52 / 313 / 7 bandes
Build34 current  2.3.0 / 52 / 313 + F01–F04 pilot
Scenario current 44 / 132
Listening        0.88 / 0.65
Speaking Loop    52/52 · max 2
Stores           6
```

Sanctuaires :

```text
app.js            600f094266c9f0c4c7b57efdbf61129909ebd9cb
voice-ios.js      38e97aa3ef62dd6dcda224901b435f0973618679
free-voice.js     b4c19b1936c788ee017eac9ba14e5a62c159e8d5
assets/LOGO.png   64eaa6ad9781c6a9075d4f68615fc44344c4e21c
assets/Favicon.png c358672368a960bf7617e5532aff3e3319cddb3e
```

Ancien utilisateur de référence : **7 leçons terminées / `l8=4` / 40 acquis**.