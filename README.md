# French Trân’quille

PWA de français pensée pour **Trân**, vietnamienne débutante absolue (**A0**), avec pédagogie très majoritairement vietnamienne au départ et français introduit progressivement.

## Version actuelle

- **v1.5.0**
- **Build 10**
- Phase : **Curriculum A0 + Responsive multi-device**
- coût d'exploitation : **0 €**

## Plateformes cibles

### Cible principale

- **iPhone / Safari / PWA iOS**

### Cibles secondaires — officiellement supportées par le layout

- **Android** : Chrome / navigateurs Chromium, installation PWA lorsque disponible ;
- **Navigateur PC** : Chrome, Edge et navigateurs modernes sur Windows/macOS/Linux.

L'interface, les leçons, les révisions et la progression locale sont conçues pour fonctionner sur les trois familles de plateformes. La disponibilité de la **reconnaissance vocale** dépend en revanche du navigateur et du système ; le fallback texte reste toujours disponible.

## Build 10 — ce qui change

### Layout / branding

- correction du layout desktop trop étroit ;
- dashboard responsive : 2 colonnes sur écran large, 1 colonne sur mobile/tablette ;
- largeur adaptée aux navigateurs PC sans transformer la PWA en bande verticale ;
- maintien des safe areas et gros touch targets sur iPhone/Android ;
- logo homepage chargé directement depuis **`assets/LOGO.png`** ;
- suppression du chargement expérimental du logo découpé en base64 ;
- branding natif dans le moteur : **French Trân’quille** + **Lucie** ;
- favicon et Apple Touch icon depuis **`assets/Favicon.png`**, avec une icône PWA 192 dédiée pour Android.

### Curriculum A0

La PWA passe de 4 expressions isolées à **7 vraies leçons / 40 éléments** :

1. **Chào hỏi & giới thiệu — Saluer & se présenter**
   - Bonjour
   - Merci
   - Au revoir
   - Je m'appelle Trân.

2. **Lịch sự & hiểu người khác — Politesse & compréhension**
   - S'il vous plaît.
   - Excusez-moi.
   - Je comprends.
   - Je ne comprends pas.
   - Pouvez-vous répéter ?
   - Plus lentement, s'il vous plaît.

3. **Nói thêm về bản thân — Parler un peu de soi**
   - Je suis vietnamienne.
   - Je viens du Vietnam.
   - J'habite à Hô Chi Minh-Ville.
   - Et vous ?
   - Oui.
   - Non.

4. **Gọi đồ ở quán cà phê — Commander au café**
   - Je voudrais…
   - De l'eau.
   - Un café.
   - Un thé.
   - L'addition, s'il vous plaît.
   - Combien ça coûte ?

5. **Nói điều mình thích — Dire ce qu'on aime**
   - J'aime…
   - Je n'aime pas…
   - Beaucoup.
   - Un peu.
   - C'est bon.
   - Je préfère…

6. **Số từ 0 đến 5 — Les nombres de 0 à 5**

7. **Số 6 đến 10 & hỏi giá — Les nombres 6 à 10 & le prix**

Chaque leçon comprend introduction, écoute, éléments nouveaux en petits groupes, checks de reconnaissance, mini-situation finale et réintégration automatique dans les révisions/conversations.

## Progression

- déverrouillage séquentiel des leçons ;
- progression mémorisée par leçon ;
- migration automatique de l'ancien schéma Build 1–9 ;
- les acquis existants de Trân ne sont pas supprimés ;
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

## DEBUG FR

Dans `⚙ Réglages` :

- `🇫🇷 DEBUG FR` affiche l'interface en français sur **ce navigateur uniquement** ;
- l'iPhone de Trân continue à afficher le vietnamien ;
- raccourci : `?debug=fr`.

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
- ⏳ tests réels iPhone de Trân ;
- ⏳ ajustement des seuils selon ses transcriptions réelles.

### PWA-3 — Learning Memory
- unifier encore davantage leçon / révision / vocal ;
- répétition espacée plus intelligente ;
- erreurs récurrentes ;
- export/import manuel local.

### PWA-4 — Curriculum A0 → A1
- enrichir les 7 premières leçons ;
- ajouter famille, transport, restaurant, courses, médecin/pharmacie, voyage ;
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
- **v1.5.0 / Build 10** — Responsive multi-device + 7 leçons / 40 éléments.
