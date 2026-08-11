# French Trân’quille

PWA de français pensée pour **Trân**, vietnamienne débutante absolue au départ (**A0**), avec pédagogie majoritairement vietnamienne au début puis introduction progressive du français réellement utile.

## Version actuelle

- **v1.10.0**
- **Build 17**
- Phase : **Scenario Lab / conversation multi-tours locale**
- curriculum : **25 leçons / 148 éléments**
- scénarios : **12 situations / 36 tours de dialogue**
- parcours : **A0 → premières fondations A1**
- coût d'exploitation : **0 €**

## Liens projet

- Roadmap canonique : [`ROADMAP.md`](./ROADMAP.md)
- Historique : [`CHANGELOG.md`](./CHANGELOG.md)
- Architecture : [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md)
- Politique de build : [`docs/BUILD-POLICY.md`](./docs/BUILD-POLICY.md)
- PWA : `https://shinobione.github.io/tran-french-teacher/`

---

# Build 17 — Scenario Lab

Build 17 fait évoluer **Conversation** : Trân ne répond plus seulement à une phrase isolée. Elle peut maintenant entrer dans une petite situation et tenir **plusieurs tours consécutifs** avec un interlocuteur.

Le moteur reste entièrement déterministe et local :

```text
situation
  ↓
phrase de l’interlocuteur
  ↓
réponse de Trân
  ↓
validation locale
  ↓
indice si blocage
  ↓
modèle seulement après plusieurs échecs
  ↓
tour suivant
  ↓
bilan + Learning Memory
```

Aucune IA payante n’est nécessaire.

## 12 situations V1

1. ☕ **Au café** ;
2. 🚆 **À la gare** ;
3. 🍽️ **Au restaurant** ;
4. 🛒 **Au supermarché** ;
5. 🩺 **À la pharmacie** ;
6. 🏠 **Problème dans l’appartement** ;
7. 📱 **Appeler Jerry** ;
8. 🇫🇷 **Arrivée en France** ;
9. 👨‍👩‍👧 **Rencontrer des proches** ;
10. 🆘 **Demander de l’aide** ;
11. 🕒 **Prendre un rendez-vous** ;
12. 🙂 **Petite conversation sociale**.

Chaque scénario contient actuellement **3 tours**, soit **36 tours de dialogue** au total.

## Déverrouillage pédagogique

Les scénarios ne sont pas tous ouverts immédiatement.

Ils apparaissent selon les leçons réellement terminées. Exemples :

- café après la leçon 4 ;
- gare après la leçon 9 ;
- appartement après la leçon 19 ;
- supermarché après les leçons 11 + 22 ;
- proches après les leçons 14 + 23 ;
- conversation sociale après les leçons 23 + 25.

L’objectif est d’éviter de demander à Trân d’inventer une structure qu’elle n’a encore jamais vue.

## Validation d’un tour

Pour chaque réponse :

- plusieurs variantes naturelles peuvent être acceptées ;
- accents, apostrophes et ponctuation sont normalisés ;
- premier échec → **indice** ;
- après plusieurs erreurs → **modèle visible** ;
- utiliser le modèle compte comme une aide, pas comme une réussite autonome ;
- réussite, erreur et aide sont envoyées à Learning Memory pour les éléments concernés.

## Mémoire des scénarios

Clé locale :

```text
french-tranquille:scenarios:v1
```

Pour chaque situation, l’app conserve :

- nombre de tentatives ;
- nombre de scénarios terminés ;
- meilleur nombre d’erreurs ;
- dernière tentative ;
- dernière réussite.

Progression reçoit une carte **Situations réelles** avec :

- verrouillage/déverrouillage ;
- situations déjà terminées ;
- nombre de réussites ;
- meilleur résultat.

Un scénario terminé n’est **pas** assimilé à une compétence définitivement maîtrisée : le Mastery Engine et la Learning Memory restent les références de consolidation.

## Voix dans Scenario Lab

Lorsque le navigateur expose `SpeechRecognition` ou `webkitSpeechRecognition`, un bouton micro peut remplir la réponse.

Le texte reste toujours disponible.

L’interlocuteur peut être réécouté avec `speechSynthesis`.

Règle inchangée :

> French Trân’quille sait si une phrase a été reconnue ; il ne prétend pas mesurer scientifiquement la prononciation.

La calibration Safari/Siri spécifique à Trân reste donc bloquée jusqu’au test réel sur iPhone.

---

# Build 16 — Mastery Engine

Le Mastery Engine distingue :

```text
leçon terminée
≠
élément connu
≠
compétence consolidée
```

Il suit quatre étapes :

1. Survie A0 — leçons 1–7 ;
2. Vie quotidienne A0 — leçons 8–15 ;
3. Fondations A1 — leçons 16–20 ;
4. Premiers échanges A1 — leçons 21–25.

États internes :

- Non commencé ;
- Découverte ;
- Consolidation ;
- Presque solide ;
- Maîtrisé.

L’estimation A0 / A0+ / A1- / A1 est **un indicateur pédagogique interne**, pas une certification CECRL.

---

# Curriculum — 25 leçons / 148 éléments

## Survie A0 — 1 à 7

Salutations, politesse, phrases de secours, présentation, café, goûts, nombres et prix.

## Vie quotidienne A0 — 8 à 15

Direction, train, heure, shopping, restaurant, santé, proches et arrivée en France.

## Fondations A1 — 16 à 20

`être`, `avoir`, `vouloir`, `pouvoir`, logement, `il y a`, téléphone.

## Premiers échanges A1 — 21 à 25

Météo, courses alimentaires, petite conversation, présent et questions courtes.

---

# Learning Memory

Clé :

```text
french-tranquille:learning-memory:v1
```

La mémoire suit notamment :

- tentatives ;
- réussites ;
- échecs ;
- force ;
- dernière révision ;
- prochaine échéance ;
- source de l’événement.

États : **Nouveau / Fragile / En cours / Solide**.

Scenario Lab alimente cette mémoire au lieu de créer un système parallèle isolé.

---

# Daily Coach

La Séance du jour reste construite localement :

```text
mémoire due / fragile
        ↓
prochaine leçon
        ↓
conversation courte
```

Cible souple : **10–15 min**.

---

# Voix — 0 €

- `speechSynthesis` ;
- choix local de voix françaises ;
- `SpeechRecognition` / `webkitSpeechRecognition` si disponible ;
- fallback texte ;
- aucune API payante ;
- aucun backend obligatoire ;
- aucun faux score phonétique.

---

# DEBUG FR

Le mode DEBUG FR reste local au navigateur de Jerry :

- interface de contrôle en français ;
- interface de Trân inchangée ;
- activation dans Réglages ;
- raccourci `?debug=fr`.

---

# Architecture

Ordre fonctionnel actuel :

```text
app.js
  ↓
curriculum-stage2.js
  ↓
stage2-boot.js
  ↓
voice / debug
  ↓
learning-memory.js
  ↓
daily-coach.js
  ↓
mastery-engine.js
  ↓
scenario-data.js
  ↓
scenario-engine.js
```

Le moteur historique `app.js` reste sanctuarisé ; les gros jalons sont ajoutés en modules tant que cette architecture reste saine.

Voir [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md).

---

# Données locales

Aucun Build 17 ne force de reset.

Principales clés :

```text
francais-avec-luc:learner:v1
french-tranquille:learning-memory:v1
french-tranquille:scenarios:v1
tran-french-teacher:debug-fr:v1
```

La clé apprenant historique garde volontairement l’ancien nom afin de préserver la progression créée avant le rebranding Luc → Lucie.

---

# Qualité / CI

Chaque gros build suit désormais :

```text
branche
→ PR
→ syntaxe
→ guards
→ smoke Node
→ Chrome Home
→ Chrome écran spécifique au build
→ merge
→ CI main
→ GitHub Pages
```

Build 17 ajoute un **second smoke test Chrome dédié à Conversation / Scenario Lab**, en plus du test de la home complète.

Voir [`docs/BUILD-POLICY.md`](./docs/BUILD-POLICY.md).

---

# Roadmap

👉 [`ROADMAP.md`](./ROADMAP.md)

Après Scenario Lab :

- **Build 18 — Error Intelligence** ;
- **Safari/Siri Calibration Gate** après test réel iPhone ;
- **Build 19 — Curriculum 26→40 / A1 Core** ;
- **Build 20 — Listening Comprehension** ;
- **Build 21 — Adaptive Language Ratio** ;
- puis Real Life French et durcissement V2.

---

# Historique

👉 [`CHANGELOG.md`](./CHANGELOG.md)

Repères :

- Build 13 — Learning Memory ;
- Build 14 — UX ;
- Build 15 — 25 leçons / 148 éléments + Daily Coach ;
- Build 16 — Mastery Engine + gouvernance documentaire ;
- **Build 17 — Scenario Lab / conversation multi-tours**.
