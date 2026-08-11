# French Trân’quille

PWA de français pensée pour **Trân**, vietnamienne débutante absolue (**A0**), avec pédagogie très majoritairement vietnamienne au départ et français introduit progressivement.

## Version actuelle

- **v1.7.1**
- **Build 14**
- Phase : **UX / Visual Pass + PWA-3 Learning Memory + Curriculum A0**
- coût d'exploitation : **0 €**

## Plateformes cibles

### Cible principale

- **iPhone / Safari / PWA iOS**

### Cibles secondaires

- **Android** : Chrome / navigateurs Chromium, installation PWA lorsque disponible ;
- **Navigateur PC** : Chrome, Edge et navigateurs modernes sur Windows/macOS/Linux.

L'interface, les leçons, les révisions et la progression locale sont conçues pour fonctionner sur les trois familles de plateformes. La disponibilité de la **reconnaissance vocale** dépend du navigateur et du système ; le fallback texte reste toujours disponible.

## Build 14 — UX / Visual Pass

Avant d'ajouter de nouvelles fonctions, l'interface de pratique a été retravaillée pour mieux différencier les usages et sortir du rendu trop uniforme « cartes bleues propres ».

### Conversation / Luyện hội thoại

- layout élargi sur desktop ;
- zone vocale gratuite mise au premier plan ;
- pratique texte séparée visuellement sans devenir secondaire sur mobile ;
- hiérarchie plus claire entre consigne, micro, modèle audio, transcription et feedback ;
- panneau vocal et conversation texte affichés en deux colonnes sur grand écran, puis en pile naturelle sur iPhone / Android ;
- accents mint / lilas conservés, avec une petite touche d'ambre pour les indications et feedbacks.

### Révision / Ôn tập

- la carte de rappel devient le vrai centre visuel de la page ;
- mot / expression à retrouver beaucoup plus lisible ;
- réponse révélée mieux isolée ;
- boutons **Difficile / Correct / Facile** différenciés par des accents corail doux / ambre / mint ;
- intégration directe des statuts Learning Memory dans cette nouvelle hiérarchie ;
- comportement responsive conservé, avec boutons empilés sur très petit écran.

### PWA-3 Learning Memory

- cartes mémoire moins « greffon technique » et plus proches d'un petit dashboard pédagogique ;
- métriques **À revoir / Fragiles / En cours / Solides** visuellement distinctes sans couleurs agressives ;
- éléments fragiles et sauvegarde locale mieux séparés ;
- badges Nouveau / Fragile / En cours / Solide harmonisés avec la nouvelle palette.

### Charte visuelle

Le Build 14 conserve le socle sombre, mint et lilas de French Trân’quille, mais ajoute avec parcimonie :

- **prune** pour la profondeur et les zones conversationnelles ;
- **corail doux** pour les difficultés / alertes pédagogiques ;
- **ambre** pour les indices et états intermédiaires ;
- toujours du **mint** pour les réussites et éléments solides.

Objectif : davantage de personnalité et de hiérarchie sans partir vers une interface arcade ou néon.

## Build 13 — PWA-3 Learning Memory

Lucie ne se contente plus de savoir si une leçon est terminée. Une mémoire d'apprentissage locale suit désormais chaque élément réellement appris.

### États suivis

Chaque mot ou expression peut être classé automatiquement comme :

- **Nouveau** ;
- **Fragile** ;
- **En cours** ;
- **Solide**.

La mémoire conserve notamment :

- première rencontre de l'élément ;
- dernière révision ;
- nombre de tentatives ;
- réussites / difficultés ;
- série de bonnes réponses ;
- force estimée ;
- intervalle de révision ;
- prochaine date de révision.

### Révision espacée locale

Les boutons **Difficile / Correct / Facile** pilotent maintenant un petit scheduler local :

- **Difficile** → retour rapide de l'élément ;
- **Correct** → nouvel essai après un délai modéré ;
- **Facile** → intervalle plus long ;
- les éléments fragiles et arrivés à échéance passent en priorité.

Aucune API n'est nécessaire : tout est calculé dans le navigateur.

### UI Learning Memory

- la homepage affiche un résumé **À revoir / Fragiles / En cours / Solides** ;
- le bouton **Réviser intelligemment** ouvre la révision priorisée ;
- la page **Progression** affiche la mémoire d'apprentissage et les prochaines priorités ;
- les éléments déjà appris reçoivent un badge d'état ;
- la mémoire existante est initialisée à partir des anciennes données de révision sans reset forcé.

### Sauvegarde locale

Dans `⚙ Réglages` :

- **Exporter** crée un fichier JSON avec la progression + la mémoire d'apprentissage ;
- **Importer** restaure ce fichier sur le même appareil ou un autre appareil ;
- aucune donnée n'est envoyée vers un backend.

Clé locale dédiée :

```text
french-tranquille:learning-memory:v1
```

La clé historique de progression reste conservée pour garantir la compatibilité avec les Builds précédents.

## Curriculum UX

Le parcours de **15 leçons / 88 éléments A0** reste intégré proprement au layout :

- desktop : colonne parcours stable + liste scrollable ;
- iPhone / Android / tablette : hauteur adaptée au viewport ;
- descriptions limitées dans l'aperçu home ;
- parcours complet disponible dans **Progression**.

## Curriculum A0 — 15 leçons / 88 éléments

1. **Chào hỏi & giới thiệu — Saluer & se présenter**
2. **Lịch sự & hiểu người khác — Politesse & compréhension**
3. **Nói thêm về bản thân — Parler un peu de soi**
4. **Gọi đồ ở quán cà phê — Commander au café**
5. **Nói điều mình thích — Dire ce qu'on aime**
6. **Số từ 0 đến 5 — Les nombres de 0 à 5**
7. **Số 6 đến 10 & hỏi giá — Les nombres 6 à 10 & le prix**
8. **Hỏi đường & tìm địa điểm — Demander son chemin**
9. **Đi tàu & mua vé — Prendre le train & acheter un billet**
10. **Thời gian & hẹn gặp — L'heure & les rendez-vous**
11. **Mua sắm đơn giản — Faire des achats simples**
12. **Ở nhà hàng — Au restaurant**
13. **Sức khỏe & hiệu thuốc — Santé & pharmacie**
14. **Gia đình & người thân — Famille & proches**
15. **Ngày đầu tiên ở Pháp — Premier jour en France**

Chaque leçon conserve la logique A0 :

- explication principalement en vietnamien ;
- petit groupe de 4 à 6 éléments ;
- écoute du français ;
- checks de reconnaissance ;
- mini-situation finale ;
- réintégration automatique dans Révision, Conversation et entraînement vocal.

## Voix — 0 €

- synthèse vocale via `speechSynthesis` ;
- choix de voix local au navigateur ;
- DEBUG FR avec sélecteur et test de **Lucie** ;
- préférence automatique pour les voix françaises plus naturelles exposées par l'appareil ;
- reconnaissance via `SpeechRecognition` / `webkitSpeechRecognition` lorsqu'elle existe ;
- validation locale de la transcription ;
- aucune prétention à noter précisément la phonétique ;
- fallback texte systématique ;
- aucune API payante, aucun backend payant.

### Curriculum voice-ready

Tout élément réellement appris peut revenir dans la pratique vocale :

- scénarios dédiés pour les phrases importantes ;
- prompt vietnamien générique pour les autres éléments ;
- jusqu'à 10 acquis par séance vocale ;
- plusieurs variantes de transcription acceptées lorsque le navigateur les fournit.

Le prochain jalon voix reste le **test réel sur l'iPhone de Trân avec Safari/Siri**, puis l'ajustement des tolérances à partir des transcriptions observées.

## DEBUG FR

Dans `⚙ Réglages` :

- `🇫🇷 DEBUG FR` affiche l'interface en français sur **ce navigateur uniquement** ;
- l'iPhone de Trân continue à afficher le vietnamien ;
- raccourci : `?debug=fr`.

## Qualité / CI

Chaque modification importante passe :

- `node --check` des scripts JavaScript ;
- garde Curriculum UX ;
- garde Learning Memory ;
- garde UX / Visual Pass ;
- smoke test de rendu Node ;
- **vrai smoke test dans Google Chrome headless** vérifiant que la homepage démarre, contient les 15 leçons et charge les couches attendues.

`build-meta.js` centralise l'affichage runtime de la version/build afin d'éviter les diagnostics désynchronisés.

## Hébergement

GitHub Pages déploie automatiquement `main` :

```text
https://shinobione.github.io/tran-french-teacher/
```

## Roadmap

### PWA-2 — Voice
- ✅ iPhone-first ;
- ✅ Android / PC en cibles secondaires ;
- ✅ synthèse vocale gratuite ;
- ✅ reconnaissance gratuite quand le navigateur l'expose ;
- ✅ fallback texte ;
- ✅ curriculum voice-ready ;
- ⏳ test réel Safari/Siri sur l'iPhone de Trân ;
- ⏳ intégration des résultats vocaux dans Learning Memory ;
- ⏳ ajustement des tolérances selon ses transcriptions réelles.

### PWA-3 — Learning Memory
- ✅ mémoire locale par élément ;
- ✅ Nouveau / Fragile / En cours / Solide ;
- ✅ révision espacée ;
- ✅ priorité automatique aux éléments fragiles ;
- ✅ export/import manuel local ;
- ✅ intégration visuelle revue dans Build 14 ;
- ⏳ historique plus détaillé des erreurs ;
- ⏳ suggestions automatiques de mini-séance quotidienne.

### PWA-4 — Curriculum A0 → A1
- enrichir les 15 leçons A0 actuelles ;
- ajouter téléphone, logement, météo, vêtements, courses alimentaires et petites conversations sociales ;
- introduire progressivement `être`, `avoir`, `vouloir`, `aimer`, articles et présent ;
- faire évoluer le ratio vietnamien/français selon les acquis réels.

### Easter egg pédagogique futur

- **Leçon 69 réservée** 😇🍌🍑 — vocabulaire adulte/intime, consentement, registres de langue et expressions de couple, uniquement quand le niveau de Trân permettra de l'aborder proprement.

## Historique court

- **v1.0.0 / Build 1** — Fondation PWA ;
- **v1.0.1 / Build 2** — verrouillage vietnamien ;
- **v1.0.2 / Build 3** — DEBUG FR ;
- **v1.0.3 / Build 4** — voix iPhone-first ;
- **v1.1.x / Builds 5–6** — expérimentation Realtime/Vercel, abandonnée pour rester à 0 € ;
- **v1.2.0 / Build 7** — Free Voice ;
- **v1.3.0 / Build 8** — Guided Free Voice ;
- **v1.4.0 / Build 9** — French Trân’quille + Lucie ;
- **v1.5.0 / Build 10** — Responsive multi-device + 7 leçons / 40 éléments ;
- **Build 10.1–10.2** — watchdog, isolation ES modules et vrai smoke test Chrome ;
- **v1.6.0 / Build 11** — 15 leçons / 88 éléments + curriculum voice-ready ;
- **v1.6.1 / Build 12** — Curriculum UX responsive ;
- **v1.7.0 / Build 13** — Learning Memory locale, révision espacée et sauvegarde JSON ;
- **v1.7.1 / Build 14** — refonte UX/visuelle de Conversation, Révision et PWA-3 + palette enrichie avec retenue.
