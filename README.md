# French Trân’quille

PWA de français pensée pour **Trân**, vietnamienne débutante absolue au départ (**A0**), avec pédagogie majoritairement vietnamienne au début puis introduction progressive du français réellement utile.

## Version actuelle

- **v1.8.0**
- **Build 15**
- Phase : **PWA-4 A0 → Early A1 + PWA-3 Daily Coach**
- **25 leçons / 148 éléments**
- coût d'exploitation : **0 €**

## Plateformes cibles

### Cible principale

- **iPhone / Safari / PWA iOS**

### Cibles secondaires

- **Android** : Chrome / navigateurs Chromium, installation PWA lorsque disponible ;
- **Navigateur PC** : Chrome, Edge et navigateurs modernes sur Windows/macOS/Linux.

L'interface, les leçons, la progression et la mémoire locale sont prévues pour les trois familles de plateformes. La **reconnaissance vocale** dépend du navigateur et du système ; le fallback texte reste toujours disponible.

---

## Build 15 — A0 → Early A1

Le socle historique de 15 leçons reste intact. Build 15 ajoute un pack curriculum modulaire `curriculum-stage2.js` chargé juste après le moteur principal, avant les modules voix et mémoire.

### Nouveau total

- **25 leçons** ;
- **148 éléments** ;
- progression séquentielle conservée ;
- migration transparente des anciennes données ;
- aucune remise à zéro forcée.

### Leçons 16 à 25

16. **Être dans des phrases utiles** — `je suis`, `tu es`, `il/elle est`, `c'est` ;
17. **Avoir & ce qu'on a** — `j'ai`, `tu as`, `je n'ai pas` ;
18. **Vouloir & pouvoir** — vouloir, pouvoir, impossibilité, demande ;
19. **Le logement & il y a** — appartement, clé, pièces, problème d'eau chaude ;
20. **Téléphone & messages** — allô, entendre, appeler, message, réseau ;
21. **Météo & sensations** — `il fait chaud/froid`, `j'ai chaud/froid`, pluie ;
22. **Courses alimentaires** — pain, lait, œufs, quantité, caisses, articles partitifs ;
23. **Petite conversation sociale** — `ça va`, `et toi`, activité du moment ;
24. **Une journée simple au présent** — se lever, travailler, manger, rentrer, regarder, dormir ;
25. **Questions simples pour continuer** — où, quand, pourquoi, avec qui, quoi, parce que.

Chaque nouvelle leçon conserve le format court : quelques éléments, écoute, reconnaissance, mini-situation et réutilisation ultérieure. Elle ajoute aussi une note **Structure utile** qui explique la petite règle nécessaire en vietnamien, sans transformer la séance en cours de grammaire scolaire.

### Parcours en 4 étapes

Le Curriculum UX est désormais regroupé visuellement :

1. **Survie A0** — leçons 1–7 ;
2. **Vie quotidienne** — leçons 8–15 ;
3. **Fondations A1** — leçons 16–20 ;
4. **Premiers échanges** — leçons 21–25.

La liste reste scrollable et bornée sur la home afin de ne pas refaire le débordement des premiers builds.

### Conversation Stage 2

Les nouveaux acquis peuvent être retravaillés :

- dans le **Free Voice Engine**, qui lit le curriculum global ;
- dans la **Learning Memory** ;
- dans une carte texte dédiée **A1 START** ajoutée à Conversation pour les structures des leçons 16–25.

Le test réel Safari/Siri sur l'iPhone de Trân reste volontairement séparé : Build 15 n'invente aucun score phonétique avant d'avoir observé les transcriptions réelles.

---

## Build 15 — PWA-3 Daily Coach

PWA-3 ne se limite plus à afficher des compteurs de mémoire. La home reçoit une vraie carte **Séance du jour** construite localement à partir de la progression et de la mémoire.

Elle propose au maximum trois actions simples :

1. **Révision mémoire** — priorité aux éléments dus et fragiles ;
2. **Continuer le parcours** — prochaine leçon réellement déverrouillée ;
3. **Parler 3 minutes** — Conversation lorsque suffisamment d'éléments sont connus.

Le coach affiche aussi :

- nombre d'éléments dus ;
- nombre d'acquis ;
- éléments déjà retravaillés aujourd'hui ;
- une cible souple de **10–15 minutes**, sans système de récompense artificiel.

Dans Progression, une carte **Rythme conseillé** rappelle l'objectif : une petite leçon, quelques révisions et quelques minutes de conversation. Si Trân est fatiguée, elle n'a pas besoin de faire les trois.

Aucune API, aucun compte, aucun serveur : tout est dérivé du `localStorage` et de la Learning Memory.

---

## Build 14 / 14.1 — UX & identité

### Conversation / Luyện hội thoại

- layout desktop élargi ;
- zone vocale gratuite mise au premier plan ;
- pratique texte séparée visuellement ;
- hiérarchie claire consigne / micro / modèle / transcription / feedback ;
- retour en pile verticale sur iPhone / Android.

### Révision / Ôn tập

- vraie carte centrale de rappel ;
- réponse mieux isolée ;
- **Difficile / Correct / Facile** différenciés en corail doux / ambre / mint ;
- intégration de la Learning Memory dans la hiérarchie visuelle.

### PWA-3

- dashboard mémoire moins technique ;
- `À revoir / Fragiles / En cours / Solides` mieux différenciés ;
- palette sombre + mint + lilas, complétée avec retenue par prune, corail et ambre.

### Lucie

Build 14.1 remplace l'ancien avatar `L` par le favicon French Trân’quille dans les emplacements de Lucie. Un avatar dédié pourra venir plus tard.

---

## PWA-3 — Learning Memory

Clé locale :

```text
french-tranquille:learning-memory:v1
```

Chaque élément connu possède progressivement :

- première rencontre ;
- dernière utilisation ;
- dernière révision ;
- nombre de tentatives ;
- réussites / difficultés ;
- série de bonnes réponses ;
- force estimée ;
- intervalle de révision ;
- prochaine date de révision.

### États

- **Nouveau** ;
- **Fragile** ;
- **En cours** ;
- **Solide**.

### Scheduler local

- **Difficile** → retour rapide ;
- **Correct** → délai modéré ;
- **Facile** → intervalle plus long ;
- éléments dus et fragiles prioritaires.

### Sauvegarde

Dans `⚙ Réglages` :

- export JSON progression + mémoire ;
- import JSON sur le même appareil ou un autre ;
- aucune donnée envoyée vers un backend.

---

## Curriculum complet — 25 leçons

### A0 — Survie

1. Chào hỏi & giới thiệu — Saluer & se présenter  
2. Lịch sự & hiểu người khác — Politesse & compréhension  
3. Nói thêm về bản thân — Parler un peu de soi  
4. Gọi đồ ở quán cà phê — Commander au café  
5. Nói điều mình thích — Dire ce qu'on aime  
6. Số từ 0 đến 5 — Les nombres de 0 à 5  
7. Số 6 đến 10 & hỏi giá — Les nombres 6 à 10 & le prix

### A0 — Vie quotidienne

8. Hỏi đường & tìm địa điểm — Demander son chemin  
9. Đi tàu & mua vé — Prendre le train & acheter un billet  
10. Thời gian & hẹn gặp — L'heure & les rendez-vous  
11. Mua sắm đơn giản — Faire des achats simples  
12. Ở nhà hàng — Au restaurant  
13. Sức khỏe & hiệu thuốc — Santé & pharmacie  
14. Gia đình & người thân — Famille & proches  
15. Ngày đầu tiên ở Pháp — Premier jour en France

### Fondations A1

16. Être dans des phrases utiles  
17. Avoir & ce qu'on a  
18. Vouloir & pouvoir  
19. Le logement & il y a  
20. Téléphone & messages

### Premiers échanges A1

21. Météo & sensations  
22. Courses alimentaires  
23. Petite conversation sociale  
24. Une journée simple au présent  
25. Questions simples pour continuer

---

## Voix — 0 €

- synthèse vocale via `speechSynthesis` ;
- sélection locale des voix françaises ;
- DEBUG FR avec test de Lucie ;
- reconnaissance `SpeechRecognition` / `webkitSpeechRecognition` lorsqu'elle existe ;
- validation locale de la transcription ;
- fallback texte systématique ;
- **aucun score phonétique inventé** ;
- aucune API payante, aucun backend payant.

Tout élément exposé par le curriculum global peut être proposé au moteur vocal. Les leçons 16–25 sont donc **voice-ready** dès Build 15.

Le prochain jalon voix reste : **test réel Safari/Siri sur l'iPhone de Trân**, puis calibration des tolérances à partir de ce que l'appareil transcrit réellement.

---

## DEBUG FR

Dans `⚙ Réglages` :

- `🇫🇷 DEBUG FR` traduit l'interface de contrôle sur **ce navigateur uniquement** ;
- l'iPhone de Trân reste en vietnamien ;
- raccourci : `?debug=fr`.

---

## Qualité / CI

Chaque modification importante passe par PR avant merge sur `main`.

Le workflow vérifie :

- `node --check` des scripts JavaScript ;
- garde Curriculum UX ;
- garde Learning Memory ;
- garde UX / Visual Pass ;
- garde **Build 15 A0 → A1** ;
- garde **Daily Coach** ;
- smoke test Node du moteur de base ;
- **vrai lancement Google Chrome headless** vérifiant le rendu final, le curriculum 25 leçons, la Learning Memory et le coach quotidien.

`build-meta.js` centralise l'affichage runtime de la version/build.

---

## Hébergement

GitHub Pages déploie automatiquement `main` :

```text
https://shinobione.github.io/tran-french-teacher/
```

---

## Roadmap

### PWA-2 — Voice

- ✅ synthèse vocale gratuite ;
- ✅ choix de voix ;
- ✅ reconnaissance gratuite si le navigateur l'expose ;
- ✅ fallback texte ;
- ✅ curriculum voice-ready ;
- ⏳ test réel Safari/Siri sur l'iPhone de Trân ;
- ⏳ intégration des réussites/ratés vocaux dans Learning Memory ;
- ⏳ calibration des variantes de transcription.

### PWA-3 — Learning Memory

- ✅ mémoire locale par élément ;
- ✅ Nouveau / Fragile / En cours / Solide ;
- ✅ révision espacée ;
- ✅ priorité aux fragiles ;
- ✅ export/import JSON ;
- ✅ **Séance du jour / Daily Coach** ;
- ⏳ historique détaillé des erreurs et types de confusion ;
- ⏳ recommandations encore plus fines selon plusieurs jours d'activité.

### PWA-4 — A0 → A1

- ✅ 25 leçons / 148 éléments ;
- ✅ être / avoir / vouloir / pouvoir ;
- ✅ il y a ;
- ✅ articles partitifs de survie ;
- ✅ premiers verbes au présent ;
- ✅ questions courtes ;
- ⏳ enrichir les dialogues multi-tours ;
- ⏳ compréhension orale plus progressive ;
- ⏳ faire évoluer davantage le ratio vietnamien/français selon les acquis réels.

### Easter egg pédagogique futur

- **Leçon 69 réservée** 😇🍌🍑 — vocabulaire adulte/intime, consentement, registres de langue et expressions de couple, uniquement quand le niveau de Trân permettra de l'aborder proprement.

---

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
- **v1.7.1 / Build 14** — refonte UX/visuelle Conversation, Révision et PWA-3 ;
- **Build 14.1** — avatar Lucie cohérent avec le branding ;
- **v1.8.0 / Build 15** — 25 leçons / 148 éléments, fondations A1 et Daily Coach local.
