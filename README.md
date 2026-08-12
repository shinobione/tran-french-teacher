# French Trân’quille

PWA de français pensée pour **Trân**, vietnamienne débutante, avec priorité à l’oral, au français utile dans la vraie vie et à une interface simple sur iPhone.

## Version production

- **v1.22.0**
- **Build 29 — iPhone / PWA / Accessibility Hardening**
- statut : **✅ PROD / CLOS — validations WebKit terrain encore ouvertes**
- runtime production final : `ff788fd86e1754b15e8003b2f63c9673708480d0`
- PR runtime : **#64** — head certifié `27c67ee7b47b9f9a015e6c0072640e0e573de52d`
- merge runtime initial : `1c01648d89dfb3bd9236b9ad93fbade4e21102fa`
- PR hotfix CI/SW isolation : **#65** — head certifié `3e11e6124654b88e6932f292ed7acb1df31b0039`
- tribunal `main` final : **19/19 workflows SUCCESS**
- GitHub Pages : **#121 SUCCESS** sur `ff788fd…`
- curriculum : **40 leçons / 241 éléments**
- Scenario : **36 situations / 108 tours**
- Listening : **0.88 normal / 0.65 lent**
- coût : **0 €**

👉 **https://shinobione.github.io/tran-french-teacher/**

## 📱 Build 29 — vraie PWA iPhone

Build 29 a découvert une dette historique importante : le repo possédait bien `sw.js`, un manifest et une stratégie de cache, mais **aucun runtime n’enregistrait réellement le Service Worker**.

Build 29 ajoute donc explicitement l’enregistrement top-level :

```text
French Trân’quille top-level
        ↓
navigator.serviceWorker.register(...)
        ↓
install : precache + skipWaiting attendu
        ↓
activate : purge anciens caches + clients.claim attendu
        ↓
fetch : réseau puis cache / fallback offline
```

Le Worker n’est pas lancé dans les anciens harnesses `*Smoke` ni dans les iframes de test. Le vrai `b29Audit` et l’application normale utilisent bien le Worker réel.

### Preuve offline dure

Le tribunal Build 29 fait réellement :

```text
profil Chrome persistant
→ warm boot online
→ second boot online
→ arrêt physique du serveur HTTP
→ nouvelle navigation vers la même URL
→ Home French Trân’quille complète depuis Worker/cache
```

Le test refuse `ERR_CONNECTION_REFUSED`, les boot errors et tout état incomplet. Ce n’est donc plus seulement « un fichier `sw.js` existe » : le démarrage sans serveur est prouvé.

## ♿ iPhone / accessibilité

La couche `build29-iphone-a11y.*` ajoute sans toucher à `app.js` :

- safe areas top/right/bottom/left et Home Indicator ;
- `viewport-fit=cover` ;
- `visualViewport` pour la hauteur visible et le clavier virtuel ;
- cibles tactiles apprenantes **≥ 44 × 44 px** ;
- champs ≥ 16 px pour éviter le zoom iOS au focus ;
- focus clavier visible avec `:focus-visible` ;
- onglet courant via `aria-current="page"` ;
- progressions avec sémantique `progressbar` ;
- feedbacks utiles en `aria-live="polite"` ;
- support `prefers-reduced-motion` et `prefers-contrast: more` ;
- textes longs sans dérive horizontale ;
- zoom utilisateur conservé ;
- Apple Touch Icon dédiée réellement câblée ;
- manifest stable `id/start_url/scope = ./`, `display=standalone`.

Chrome réel certifie **390×844**, **320×568**, **430×932**, reduced-motion et le redémarrage offline.

Mesures exigées :

```text
cibles trop petites = 0
boutons sans nom accessible = 0
onglet courant visible = 1
overflow horizontal = 0
```

## 🔐 Build 28 reste dessous

Build 29 ne remplace pas le coffre de données. Build 28 reste chargé avant `app.js` et protège les six stores durables :

1. `francais-avec-luc:learner:v1`
2. `french-tranquille:learning-memory:v1`
3. `french-tranquille:error-intelligence:v1`
4. `french-tranquille:scenarios:v1`
5. `french-tranquille:listening:v1`
6. `french-tranquille:milestones:v1`

Backup V2, restore transactionnel, rollback, `last-good`, quarantaine et reset atomique restent sous leur tribunal Build 28.

## 🧭 Façade Build 27 toujours intacte

Trân voit toujours seulement :

- **Aujourd’hui** — prochaine leçon, `Continuer`, `Réviser`, `Écouter` ;
- **Pratiquer** — Parler, Écouter, Réviser, Dans la vraie vie ;
- **Progrès** — position A0 → A1, prochaine étape, cinq leçons utiles, parcours complet par étapes.

Memory / Mastery / Listening / Scenario / Error Intelligence restent des moteurs, pas des menus techniques à piloter.

## 🛡️ Sanctuaires

Toujours byte-identiques pendant Build 29 :

- `voice-ios.js` ;
- `free-voice.js` ;
- `assets/LOGO.png` ;
- `assets/Favicon.png`.

Aucune clé durable n’a été renommée et aucune migration apprenante n’a été ajoutée par Build 29.

## 🎙️ Gates terrain encore ouverts

Chrome ne remplace pas un vrai iPhone Safari/WebKit. Restent à observer sur l’appareil réel :

- encoche / Dynamic Island et Home Indicator ;
- clavier iOS réel ;
- VoiceOver ;
- installation « Sur l’écran d’accueil » et reprise standalone ;
- **Build 26.1** : réponse reconnue → seconde prise locale → réécoute → réponse vocale suivante toujours reconnue normalement.

La voix/reconnaissance ne doit pas être modifiée sans preuve terrain.

## Suite

1. **Gate terrain iPhone / VoiceOver / Build 26.1**.
2. **Build 30 — Architecture Hardening**.
3. **V2.0.0 — Freeze / Release**.

Voir `ROADMAP.md`, `CHANGELOG.md`, `docs/ARCHITECTURE.md`, `docs/BUILD-28-DATA-RECOVERY.md` et `docs/BUILD-29-IPHONE-PWA-A11Y.md`.
