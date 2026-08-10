# French Trân’quille

PWA mobile-first de professeur de français pour **Trân**, vietnamienne débutante absolue (**A0**).

## Version

- **v1.4.0**
- **Build 9**
- Phase **PWA-2 — Guided Free Voice + Branding**
- cible principale : **iPhone / Safari / PWA iOS**
- coût d'exploitation visé : **0 €**

## v1.4.0 / Build 9 — French Trân’quille

Rebranding complet de l'application sans toucher à la progression existante.

### Branding

- nouveau nom produit : **French Trân’quille** ;
- grand logo transparent intégré sur la page d'accueil ;
- nouveau favicon cohérent avec le logo ;
- icônes PWA et `apple-touch-icon` dédiées ;
- nouvelle couche `brand.js` pour appliquer le branding sans casser le moteur pédagogique existant ;
- nouveau thème visuel complémentaire `brand.css` ;
- cache PWA incrémenté pour livrer immédiatement les nouveaux assets.

### Professeure

La meilleure voix disponible pendant les tests étant nettement plus naturelle en voix féminine, le professeur **Luc** devient **Lucie**.

La couche de branding :
- remplace les références visibles à Luc par **Lucie** ;
- adapte le DEBUG FR (`Lucie • ta professeure`) ;
- remplace la phrase de test vocal par `Bonjour Trân. Je m'appelle Lucie...` ;
- privilégie, en mode Auto, les voix françaises de meilleure qualité détectées (Google / Premium / Enhanced / Natural lorsque disponibles) sans écraser un choix manuel ;
- conserve volontairement les anciennes clés `localStorage` internes pour **ne pas perdre la progression ni les préférences vocales**.

## v1.3.0 / Build 8 — Guided Free Voice Engine

Le mode vocal gratuit est un moteur d'entraînement guidé, sans backend ni API payante.

- **8 situations A0** ;
- réutilisation de `Bonjour`, `Merci`, `Je m'appelle Trân.` et `Au revoir` ;
- reconnaissance via `SpeechRecognition` / `webkitSpeechRecognition` lorsque Safari l'expose ;
- plusieurs alternatives de transcription évaluées ;
- comparaison tolérante aux accents, apostrophes, espaces et petites erreurs ;
- indices progressifs ;
- répétition automatique des points fragiles ;
- fallback texte ;
- mémoire locale de maîtrise ;
- aucune note de prononciation inventée ;
- **0 € : aucune API payante et aucun backend**.

## Fonctionnalités actuelles

- interface apprenante en vietnamien, environ **95 % VI / 5 % FR** au niveau A0 ;
- **Bài 1 — Bonjour** complète et interactive ;
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

Le moteur de reconnaissance peut dépendre des services proposés par Safari/iOS. L'application n'appelle aucune API commerciale payante.

La reconnaissance vocale n'est **pas** considérée comme un analyseur phonétique : elle valide la transcription reconnue, pas précisément le `R`, les nasales, `U/OU`, etc.

## Exécution locale

```bash
python -m http.server 8080
```

Puis ouvrir `http://localhost:8080`.

## GitHub Pages

Le workflow `.github/workflows/pages.yml` déploie automatiquement `main`.

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
- ✅ branding French Trân’quille + Lucie ;
- ⏳ tests réels sur l'iPhone de Trân ;
- ⏳ réglage des seuils selon les transcriptions réelles de Safari ;
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
- **v1.1.x / Builds 5–6** — expérimentation Realtime/Vercel abandonnée pour l'objectif 0 € ;
- **v1.2.0 / Build 7** — Free Voice ;
- **v1.3.0 / Build 8** — Guided Free Voice Engine ;
- **v1.4.0 / Build 9** — **French Trân’quille**, logo/favicon, Luc → Lucie.
