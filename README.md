# French Trân’quille

PWA de français pensée pour **Trân**, vietnamienne débutante absolue (**A0**), avec pédagogie très majoritairement vietnamienne au départ et français introduit progressivement.

## Version actuelle

- **v1.6.0**
- **Build 11**
- Phase : **Curriculum A0 étendu + Voice-ready**
- coût d'exploitation : **0 €**

## Plateformes cibles

### Cible principale

- **iPhone / Safari / PWA iOS**

### Cibles secondaires

- **Android** : Chrome / navigateurs Chromium, installation PWA lorsque disponible ;
- **Navigateur PC** : Chrome, Edge et navigateurs modernes sur Windows/macOS/Linux.

L'interface, les leçons, les révisions et la progression locale sont conçues pour fonctionner sur les trois familles de plateformes. La disponibilité de la **reconnaissance vocale** dépend du navigateur et du système ; le fallback texte reste toujours disponible.

## Build 11 — Curriculum Expansion

La PWA passe de **7 leçons / 40 éléments** à **15 leçons / 88 éléments A0**.

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

Chaque leçon conserve la même logique A0 :

- explication principalement en vietnamien ;
- petit groupe de 4 à 6 éléments ;
- écoute du français ;
- checks de reconnaissance ;
- mini-situation finale ;
- réintégration automatique dans Révision, Conversation et entraînement vocal.

### Nouveaux thèmes réels

- demander où se trouvent les toilettes, la gare ou la pharmacie ;
- gauche / droite ;
- acheter un billet de train, aller simple / aller-retour, quai et horaires ;
- aujourd'hui / demain / maintenant / demander l'heure ;
- chercher et acheter quelque chose, payer par carte ;
- demander une table, la carte et commander au restaurant ;
- dire qu'on a mal, qu'on est malade ou qu'on a besoin d'un médecin ;
- présenter ses proches et saluer quelqu'un pour la première fois ;
- premiers besoins à l'arrivée en France : faim, soif, fatigue, être perdue, demander de l'aide.

## Progression

- déverrouillage séquentiel des leçons ;
- progression mémorisée par leçon ;
- migration automatique des données Build 1–10 ;
- aucun reset forcé des acquis existants ;
- vocabulaire connu partagé entre leçons, révisions et conversation ;
- statistiques : leçons terminées, éléments acquis, éléments à revoir, série de jours.

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

### Build 11 — Voice-ready curriculum

Le moteur vocal n'est plus limité à une liste fermée d'expressions. **Tout élément réellement appris peut maintenant revenir dans la pratique vocale** :

- les phrases importantes disposent d'un scénario contextuel dédié ;
- les autres éléments utilisent automatiquement un prompt simple en vietnamien ;
- une séance vocale sélectionne jusqu'à 10 acquis ;
- le moteur accepte toujours plusieurs variantes de transcription lorsque le navigateur les fournit.

Le prochain jalon voix reste le **test réel sur l'iPhone de Trân avec Safari/Siri**, puis l'ajustement des tolérances à partir des transcriptions observées.

## DEBUG FR

Dans `⚙ Réglages` :

- `🇫🇷 DEBUG FR` affiche l'interface en français sur **ce navigateur uniquement** ;
- l'iPhone de Trân continue à afficher le vietnamien ;
- raccourci : `?debug=fr`.

## Qualité / CI

Depuis Build 10.2, chaque modification de `main` passe :

- `node --check` des scripts JavaScript ;
- smoke test de rendu Node ;
- **vrai smoke test dans Google Chrome headless** vérifiant que la homepage remplace correctement l'écran de boot.

Cette protection a été ajoutée après la collision navigateur `window.top` rencontrée pendant Build 10.

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
- ⏳ ajustement des tolérances selon ses transcriptions réelles.

### PWA-3 — Learning Memory
- répétition espacée plus intelligente ;
- erreurs récurrentes ;
- sélection automatique des éléments fragiles ;
- export/import manuel local.

### PWA-4 — Curriculum A0 → A1
- enrichir les 15 leçons A0 actuelles ;
- ajouter téléphone, logement, météo, vêtements, courses alimentaires et petites conversations sociales ;
- introduire progressivement `être`, `avoir`, `vouloir`, `aimer`, articles et présent ;
- faire évoluer le ratio vietnamien/français selon les acquis réels.

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
- **Build 10.1–10.2** — watchdog de démarrage, isolation ES modules et vrai smoke test Chrome ;
- **v1.6.0 / Build 11** — 15 leçons / 88 éléments + curriculum entièrement voice-ready.