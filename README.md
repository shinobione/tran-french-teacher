# Trân French Teacher — Tiếng Pháp cùng Luc

PWA mobile-first de professeur de français pour **Trân**, vietnamienne débutante absolue (**A0**).

## Version

- **v1.2.0**
- **Build 7**
- Phase **PWA-2 — Free Voice**
- cible principale : **iPhone / Safari / PWA iOS**
- coût d'exploitation visé : **0 €**

## v1.2.0 / Build 7 — Zero-cost Voice

Décision d'architecture : le projet ne dépend plus d'OpenAI API, Vercel ou d'un backend payant.

La branche active utilise uniquement :

- **GitHub Pages** pour l'hébergement statique ;
- `SpeechRecognition` / `webkitSpeechRecognition` lorsque Safari l'expose ;
- la reconnaissance vocale iOS/Safari pour les réponses françaises ;
- `speechSynthesis` iOS pour écouter les exemples français ;
- JavaScript local pour valider les réponses ;
- `localStorage` pour la progression.

### Pratique vocale actuelle

Dans `Hội thoại / Conversation` :

1. une situation est donnée principalement en vietnamien ;
2. Trân touche le micro ;
3. elle répond en français ;
4. Safari transcrit la réponse ;
5. la PWA valide localement la réponse attendue ;
6. elle peut écouter le modèle français ;
7. la progression est enregistrée localement.

Premières situations :

- `Bonjour`
- `Merci`
- `Je m'appelle Trân.`
- `Au revoir`

Si la reconnaissance vocale n'est pas disponible, le mode texte reste utilisable.

## Pourquoi ce choix

Le but est qu'une utilisation normale par Trân ne génère **aucune facture d'API ni d'hébergement**.

Les fonctions OpenAI Realtime et le déploiement Vercel expérimentés dans les builds précédents ont été retirés de `main`. Ils restent récupérables dans l'historique Git si nous changeons d'avis un jour.

## Limite assumée

Cette version n'est pas une conversation IA ouverte : elle fonctionne avec des scénarios pédagogiques, des réponses attendues et des règles locales.

C'est volontaire pour garder le projet gratuit. Nous pouvons néanmoins enrichir progressivement le moteur avec :

- davantage de leçons ;
- variantes de réponses acceptées ;
- logique adaptative ;
- révisions espacées ;
- reconnaissance vocale par exercice ;
- arbres de conversation ;
- prononciation ciblée ;
- situations réelles.

## Versions précédentes

### v1.0.3 / Build 4 — iPhone-first Voice

- couche `voice-ios.js` ;
- sélection de la meilleure voix française exposée par le navigateur ;
- réglages vitesse / hauteur en DEBUG FR ;
- fallback vocal système.

### v1.0.2 / Build 3 — Debug FR

- mode **🇫🇷 DEBUG FR** local au navigateur de Jerry ;
- traduction de l'interface vietnamienne vers le français ;
- aucun impact sur l'iPhone de Trân.

### v1.0.1 / Build 2

- verrouillage de l'interface vietnamienne ;
- blocage de la traduction automatique du navigateur.

### v1.0.0 / Build 1

- PWA initiale ;
- Bài 1 ;
- révisions ;
- progression ;
- conversation guidée texte.

## Fonctionnalités actuelles

- interface vietnamienne ~95 % au niveau A0 ;
- français introduit par petites touches ;
- **Bài 1 — Bonjour** interactive ;
- écoute de mots et phrases françaises ;
- pratique vocale gratuite ;
- conversation guidée texte de secours ;
- révisions `Khó / Được / Dễ` ;
- progression non gamifiée ;
- persistance locale ;
- DEBUG FR pour Jerry ;
- PWA installable ;
- service worker et cache offline pour les fichiers statiques ;
- aucune clé API ;
- aucun secret ;
- aucun backend.

## Test iPhone

1. ouvrir la PWA dans Safari ;
2. vérifier que Siri est activé sur l'iPhone ;
3. ouvrir `Hội thoại` ;
4. toucher `Trả lời bằng giọng nói` ;
5. autoriser le microphone / reconnaissance vocale si iOS le demande ;
6. répondre en français ;
7. si la reconnaissance n'est pas exposée dans le mode PWA installé, refaire le même test directement dans Safari.

## Hébergement

La PWA reste publiée par GitHub Pages depuis `main`.

GitHub Pages est adapté ici car le projet est un site statique personnel/non commercial et le dépôt est public.

## Roadmap gratuite

### PWA-2 — Free Voice

- ✅ iPhone-first ;
- ✅ synthèse vocale française locale ;
- ✅ reconnaissance vocale Safari ;
- ✅ validation locale ;
- ✅ fallback texte ;
- ⏳ tests réels sur l'iPhone de Trân ;
- ⏳ tolérance phonétique améliorée ;
- ⏳ davantage de situations vocales.

### PWA-3 — Local Learning Memory

- erreurs récurrentes dans `localStorage` ;
- répétition espacée ;
- difficulté adaptative ;
- historique local ;
- export/import manuel de progression si nécessaire.

### PWA-4 — Curriculum A0 → A1

- programme complet ;
- ratios vietnamien/français adaptatifs ;
- vocabulaire de vie réelle ;
- scénarios France / voyage / restaurant / famille / transport / médecin ;
- progression structurée jusqu'à A1.
