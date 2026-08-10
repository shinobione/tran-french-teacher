# Trân French Teacher — Tiếng Pháp cùng Luc

PWA mobile-first de professeur de français pour **Trân**, vietnamienne débutante absolue (**A0**).

## Version

- **v1.3.0**
- **Build 8**
- Phase **PWA-2 — Guided Free Voice**
- cible principale : **iPhone / Safari / PWA iOS**
- coût d'exploitation visé : **0 €**

## v1.3.0 / Build 8 — Guided Free Voice Engine

Le mode vocal gratuit devient un vrai moteur d'entraînement guidé, sans backend ni API payante.

### Ce qui change

- **8 situations A0** utilisant uniquement les éléments déjà enseignés dans la Leçon 1 ;
- réutilisation de `Bonjour`, `Merci`, `Je m'appelle Trân.` et `Au revoir` dans plusieurs contextes ;
- reconnaissance via `SpeechRecognition` / `webkitSpeechRecognition` lorsque Safari l'expose ;
- plusieurs alternatives de transcription évaluées au lieu de la première seulement ;
- comparaison tolérante aux accents, apostrophes, espaces et petites erreurs de transcription ;
- seuil adapté pour `Je m'appelle Trân.` afin de ne pas pénaliser une mauvaise transcription du prénom ;
- après un premier échec : **indice progressif** ;
- après deux échecs : affichage de la réponse et ajout automatique du point dans une **file de répétition** en fin de séance ;
- fallback texte intégré directement dans la carte vocale ;
- progression de séance visible ;
- mémoire locale de maîtrise par expression : essais, réussites, réussites au premier essai ;
- résumé de fin de séance avec éléments solides / à revoir ;
- aucune note de prononciation inventée : l'app indique clairement qu'elle valide la **transcription reconnue**, pas la qualité phonétique exacte ;
- stockage uniquement dans `localStorage` pour la progression applicative ;
- **0 € : aucune API payante et aucun backend**.

## v1.2.0 / Build 7 — Zero-cost Voice

Décision d'architecture : le projet ne dépend plus d'OpenAI API, Vercel ou d'un backend payant.

La branche active utilise uniquement :

- **GitHub Pages** pour l'hébergement statique ;
- `SpeechRecognition` / `webkitSpeechRecognition` lorsque Safari l'expose ;
- la reconnaissance vocale Safari/iOS pour les réponses françaises ;
- `speechSynthesis` iOS pour écouter les exemples français ;
- JavaScript local pour valider les réponses ;
- `localStorage` pour la progression.

Les expérimentations OpenAI Realtime / Vercel des builds précédents ont été retirées de `main` et restent récupérables dans l'historique Git.

## Fonctionnalités actuelles

- interface apprenante en vietnamien, environ **95 % VI / 5 % FR** au niveau A0 ;
- **Bài 1 — Bonjour** complète et interactive ;
- `Bonjour`, `Merci`, `Au revoir`, `Je m'appelle Trân.` ;
- écoute des exemples français via synthèse vocale iOS / navigateur ;
- entraînement vocal guidé adaptatif et gratuit ;
- conversation guidée déterministe de secours ;
- révisions `Khó / Được / Dễ` ;
- progression non gamifiée ;
- persistance locale ;
- **DEBUG FR** local au navigateur de Jerry ;
- PWA installable + service worker ;
- aucune clé API dans le navigateur ou le repo.

## Important sur la voix

Le moteur de reconnaissance peut dépendre des services de reconnaissance proposés par Safari/iOS. Notre application ne paie aucun service externe et n'appelle aucune API commerciale.

La reconnaissance vocale n'est **pas** considérée comme un analyseur phonétique. Si Safari transcrit correctement une expression, l'app valide que le message a été reconnu ; elle ne prétend pas mesurer précisément le `R`, les nasales, `U/OU`, etc.

## Exécution locale

Aucune dépendance ni compilation :

```bash
python -m http.server 8080
```

Puis ouvrir `http://localhost:8080`.

## GitHub Pages

Le workflow `.github/workflows/pages.yml` déploie automatiquement `main` vers GitHub Pages.

Production :

```text
https://shinobione.github.io/tran-french-teacher/
```

## Roadmap

### PWA-2 — Voice
- ✅ iPhone-first ;
- ✅ écoute française ;
- ✅ reconnaissance vocale gratuite ;
- ✅ validation tolérante ;
- ✅ indices progressifs ;
- ✅ répétition automatique des erreurs ;
- ✅ fallback texte ;
- ✅ mémoire locale de maîtrise ;
- ⏳ tests réels sur l'iPhone de Trân ;
- ⏳ réglage des seuils d'acceptation selon les transcriptions réelles de Safari ;
- ⏳ scénarios multi-tours plus longs.

### PWA-3 — Learning Memory
- unifier mémoire leçon / révision / entraînement vocal ;
- erreurs récurrentes ;
- répétition espacée plus intelligente ;
- historique local robuste ;
- sauvegarde/export manuel sans serveur si nécessaire.

### PWA-4 — Curriculum A0 → A1
- programme structuré complet ;
- ratio vietnamien/français progressif ;
- situations de vie réelle ;
- nouveaux mots uniquement après introduction pédagogique ;
- progression jusqu'à A1 sans transformer l'app en jeu.

## Historique court

- **v1.0.0 / Build 1** — Fondation PWA ;
- **v1.0.1 / Build 2** — blocage traduction automatique ;
- **v1.0.2 / Build 3** — DEBUG FR ;
- **v1.0.3 / Build 4** — voix iPhone-first ;
- **v1.1.x / Builds 5–6** — expérimentation Realtime/Vercel, abandonnée pour respecter l'objectif 0 € ;
- **v1.2.0 / Build 7** — Free Voice ;
- **v1.3.0 / Build 8** — Guided Free Voice Engine.