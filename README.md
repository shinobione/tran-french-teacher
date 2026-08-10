# Français avec Luc

PWA mobile-first de professeur particulier de français pour **Trân**, vietnamienne débutante absolue (**A0**).

## Version

- **v1.1.0**
- **Build 5**
- Phase **PWA-2 — Voice / Realtime foundation**

## v1.1.0 / Build 5 — PWA-2 Realtime Voice

- ajout de `realtime-voice.js` : client WebRTC pensé en priorité pour **iPhone / iOS** ;
- ajout de `api/realtime.js` : proxy serveur vers OpenAI Realtime ;
- conversation audio bidirectionnelle : micro de Trân → Luc → audio retour ;
- la clé `OPENAI_API_KEY` reste strictement côté serveur ;
- profil vocal de Luc configuré avec la voix Realtime `cedar` par défaut ;
- débit audio légèrement ralenti pour une débutante A0 ;
- instructions pédagogiques serveur : environ **95 % vietnamien / 5 % français**, une notion à la fois ;
- transcription de Trân et transcription de Luc affichables pendant la session ;
- contexte local transmis au serveur : niveau, éléments connus, état de la première leçon ;
- bouton de démarrage/arrêt de session vocale dans l'écran Conversation dès qu'un backend est configuré ;
- carte `PWA-2 BACKEND` dans le mode DEBUG FR pour renseigner/tester l'endpoint ;
- l'ancienne synthèse vocale iOS reste disponible en fallback pour les petits boutons d'écoute ;
- documentation de déploiement dans [`PWA2_BACKEND.md`](./PWA2_BACKEND.md).

> GitHub Pages continue d'héberger la PWA statique. Une vraie session Realtime nécessite un endpoint serveur séparé, car GitHub Pages n'exécute pas de backend.

## v1.0.3 / Build 4 — iPhone-first Voice

- priorité donnée à l'utilisation sur **iPhone / iOS** ;
- ajout de `voice-ios.js`, couche audio indépendante du moteur pédagogique ;
- sélection automatique de la meilleure voix française disponible sur l'appareil ;
- préférence pour `fr-FR`, service local et voix de meilleure qualité lorsqu'elles sont exposées par le navigateur ;
- choix de voix mémorisé localement par appareil ;
- vitesse et hauteur de voix ajustables ;
- sélecteur et bouton d'audition disponibles en **DEBUG FR** dans les réglages ;
- fallback automatique vers la voix système si aucune voix française exploitable n'est exposée.

## v1.0.2 / Build 3 — Debug FR

- ajout d'un mode **🇫🇷 DEBUG FR** accessible depuis les réglages ;
- traduction à la volée du vietnamien vers le français pour Jerry ;
- traduction locale au navigateur via `localStorage` : l'activation sur le PC de Jerry n'affecte pas l'iPhone de Trân ;
- bandeau visible lorsque le mode debug est actif ;
- traduction des écrans, boutons, consignes, feedbacks et placeholders ;
- les mots et phrases de français étudiés restent inchangés ;
- raccourci de secours possible avec `?debug=fr` ;
- couche isolée dans `debug-fr.js` afin de ne pas toucher au moteur pédagogique.

## Correctif v1.0.1 / Build 2

- blocage explicite de la traduction automatique du navigateur (`notranslate` + `translate="no"`) ;
- interface apprenante conservée en vietnamien ;
- nom visible de la PWA : **Tiếng Pháp cùng Luc** ;
- seuls les mots et phrases étudiés restent en français.

## Fonctionnalités actuelles

- interface mobile-first en vietnamien (~95 %) avec français introduit par petites touches (~5 %) ;
- **Bài 1 — Bonjour** complète et interactive ;
- `Bonjour`, `Merci`, `Au revoir`, `Je m'appelle Trân.` ;
- lecture audio française locale via `speechSynthesis` pour les exemples courts ;
- couche Realtime WebRTC prête pour conversation vocale naturelle ;
- conversation guidée déterministe de secours ;
- révisions `Khó / Được / Dễ` ;
- progression non gamifiée ;
- persistance `localStorage` ;
- diagnostics discrets + DEBUG FR ;
- manifest PWA + service worker ;
- fonctionnement hors-ligne pour la partie statique après première visite ;
- aucune clé API dans le navigateur.

## Exécution locale

La partie statique n'a aucune dépendance ni compilation.

```bash
python -m http.server 8080
```

Puis ouvrir `http://localhost:8080`.

## GitHub Pages

Le workflow `.github/workflows/pages.yml` déploie automatiquement le contenu statique de `main` vers GitHub Pages.

## Backend Realtime

Voir [`PWA2_BACKEND.md`](./PWA2_BACKEND.md).

Variables principales :

```text
OPENAI_API_KEY=...
OPENAI_REALTIME_MODEL=gpt-realtime
OPENAI_REALTIME_VOICE=cedar
```

## Roadmap

### PWA-2 — Voice
- ✅ couche iPhone-first ;
- ✅ client WebRTC ;
- ✅ proxy OpenAI Realtime ;
- ✅ transcription UI ;
- ⏳ déploiement du backend ;
- ⏳ test réel iPhone de Trân ;
- ⏳ réglage final de la voix / latence / VAD ;
- ⏳ feedback de prononciation réellement fondé sur l'audio.

### PWA-3 — Learning Memory
- backend persistant multi-appareils ;
- erreurs récurrentes ;
- répétition espacée intelligente ;
- historique.

### PWA-4 — Curriculum A0 → A1
- programme complet ;
- ratios vietnamien/français adaptatifs ;
- situations de vie réelle ;
- progression structurée jusqu'à A1.
