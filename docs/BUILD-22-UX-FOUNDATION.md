# Build 22 — UX Foundation & Runtime Integrity

## Cible

- version : **v1.15.0** ;
- build : **22** ;
- phase : **UX Foundation & Runtime Integrity** ;
- cible principale : **Trân sur iPhone / Safari / PWA** ;
- curriculum attendu après câblage : **40 leçons / 238 éléments** ;
- coût d’exploitation : **0 €**.

## Contexte réel

French Trân’quille n’est plus un prototype : Trân l’utilise réellement et se trouve autour de la **leçon 8**.

Retour utilisateur direct avant Build 22 :

- reconnaissance des réponses françaises : **bonne sur son iPhone** ;
- voix française de Lucie : **naturelle** ;
- progression existante : **à protéger absolument**.

Conséquence : Build 22 ne recalibre ni `voice-ios.js` ni `free-voice.js`. Ces deux fichiers deviennent un baseline protégé par hash CI pour cette refonte.

Le logo et le favicon sont également sanctuarisés.

---

# Problèmes UX traités

L’application a grandi par couches : Curriculum, Memory, Daily Coach, Mastery, Scenario Lab, Error Intelligence, Listening et Adaptive Language.

Ces moteurs sont utiles pédagogiquement mais ne doivent pas devenir autant de concepts que Trân doit comprendre.

Le principe UX devient :

> **Le moteur peut être complexe. L’usage doit rester simple.**

Une personne peu à l’aise avec l’informatique doit pouvoir ouvrir la PWA et savoir immédiatement quoi faire.

---

# Nouveau modèle mental

Trois destinations apprenante seulement :

```text
Hôm nay / Aujourd’hui
        │
        ├── prochaine étape évidente
        └── séance du jour

Luyện tập / Pratiquer
        │
        ├── Réviser
        ├── Parler
        └── Écouter

Lộ trình / Parcours
        │
        ├── où j’en suis
        └── liste des leçons
```

Les anciens écrans `conversation`, `review`, `progress`, etc. restent disponibles comme primitives internes pour garantir la compatibilité des modules existants.

L’ancien `.bottom-nav` reste donc dans le DOM mais devient invisible pour Trân. `ux-shell.js` l’utilise comme bus de navigation interne.

---

# Home

La Home doit répondre à une seule question :

> **Qu’est-ce que je fais maintenant ?**

Visible en priorité :

- logo French Trân’quille ;
- Lucie ;
- prochaine leçon ;
- position `Bài X / 40` ;
- bouton Continuer ;
- séance du jour ;
- trois métriques compactes.

Les cartes techniques Memory / Mastery / Error / Listening / Language Ratio restent dans le runtime mais sont masquées en mode apprenante.

Elles restent visibles en DEBUG FR pour Jerry.

---

# Leçon = mode Focus

Pendant une leçon :

- pas de bottom nav ;
- titre compact ;
- gros texte français ;
- boutons tactiles ≥ 48 px ;
- navigation Précédent / Continuer fixe en bas ;
- une seule tâche cognitive à l’écran ;
- détails techniques de Language Ratio masqués côté Trân.

La logique des leçons et la progression historique ne sont pas réécrites.

---

# Practice Sheet

Le bouton central `Luyện tập / Pratiquer` ouvre une feuille simple :

1. **Ôn những gì đã học / Réviser mes acquis** ;
2. **Nói tiếng Pháp / Parler français** ;
3. **Luyện nghe / Écouter**.

Listening est désactivé visuellement tant que les acquis ne permettent pas un exercice valide.

Scenario Lab reste une intelligence interne de Conversation : Trân n’a pas à connaître le nom du moteur.

---

# Parcours

L’écran Parcours montre d’abord :

- leçon actuelle ;
- pourcentage de parcours ;
- nombre de leçons terminées ;
- nombre d’acquis ;
- liste complète du curriculum.

Les tableaux Mastery / Error / Memory / Listening / Adaptive Language sont masqués côté apprenante pour éviter un tableau de bord d’ingénieur.

Ils restent disponibles en DEBUG FR.

---

# Réglages

En mode Trân :

- pas de diagnostic technique ;
- pas de bouton reset exposé ;
- pas d’import/export technique en première vue ;
- un message simple confirme que voix et données restent locales/intactes.

DEBUG FR conserve les outils d’administration et de diagnostic.

---

# Protection de progression

Clé apprenant historique inchangée :

```text
francais-avec-luc:learner:v1
```

Build 22 ajoute uniquement une **photo de sécurité non destructive** :

```text
french-tranquille:safety:pre-build22:v1
```

`progress-safety.js` capture une seule fois, si elles existent :

- progression apprenant ;
- Learning Memory ;
- Error Intelligence ;
- Scenario Lab ;
- Listening.

Aucune de ces données n’est réécrite par la capture.

---

# Smoke « Trân leçon 8 »

La CI injecte un profil synthétique dans la vraie clé legacy :

```text
l1 → l7 terminées
l8 progress = 4
40 acquis
conversationWins = 5
streak = 6
```

Après chargement de **tout le runtime**, Chrome doit retrouver exactement :

- 7 leçons terminées ;
- prochaine leçon = `l8` ;
- `lessonProgress.l8 = 4` ;
- 40 acquis ;
- snapshot de sécurité présent ;
- snapshot `l8 = 4` ;
- 3 boutons dans la nouvelle navigation ;
- logo Home présent.

Si une seule valeur change, Build 22 ne merge pas.

---

# Runtime Integrity

Audit Build 22 : plusieurs modules récents existaient dans `main`, mais le loader de production et le service worker restaient sur une composition Build 18.

Build 22 réconcilie explicitement l’ordre :

```text
progress-safety
app
Stage 2
Stage 3
curriculum boot
debug
voice
free voice
Learning Memory
Error Intelligence
Language Ratio core
Language Ratio runtime
Daily Coach
Mastery
Mastery Stage 3
Scenario Data / Host / Engine
Listening Data / Engine
UX Shell
Build Meta (dernier)
```

Cette réconciliation fait partie du build : le but n’est pas uniquement cosmétique.

---

# Sanctuaires Build 22

Doivent rester byte-identiques pendant cette refonte :

```text
assets/LOGO.png
assets/Favicon.png
voice-ios.js
free-voice.js
```

Motif : logo/favicon validés, voix + reconnaissance vocales validées par l’utilisatrice réelle.

---

# Critères de clôture

- [ ] nouvelle navigation = 3 destinations ;
- [ ] Home simplifiée ;
- [ ] Practice Sheet ;
- [ ] Parcours simplifié ;
- [ ] Leçon Focus ;
- [ ] Réglages simplifiés côté Trân ;
- [ ] DEBUG FR conserve les outils techniques ;
- [ ] logo/favicon inchangés ;
- [ ] voice/free-voice inchangés ;
- [ ] aucune clé principale renommée ;
- [ ] snapshot non destructif ;
- [ ] smoke Trân leçon 8 vert ;
- [ ] 40 leçons / 238 éléments actifs ;
- [ ] Listening actif ;
- [ ] Adaptive Language actif ;
- [ ] Scenario / Error / Mastery non régressés ;
- [ ] README / ROADMAP / CHANGELOG / ARCHITECTURE / BUILD-POLICY synchronisés ;
- [ ] PR verte ;
- [ ] `main` vert ;
- [ ] GitHub Pages vert ;
- [ ] validation manuelle iPhone recommandée après déploiement, sans modifier la voix.

---

# Suite

Après Build 22 :

- **Build 23 — Real Life French I : quotidien avec Jerry** ;
- **Build 24 — Real Life French II : déplacements / proches / téléphone** ;
- **Build 25 — Real Life French III : problèmes / émotions / français oral** ;
- puis Hardening V2.
