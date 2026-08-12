# Build 29 — iPhone / PWA / Accessibility Hardening

## État

**v1.22.0 — Build 29 — ✅ PROD / CLOS**

Objectif atteint : French Trân’quille possède désormais une couche iPhone/accessibilité certifiée et une **vraie PWA offline**, sans modifier les moteurs pédagogiques, les données apprenantes ni les sanctuaires vocaux.

## Production

- PR runtime : **#64**
- head #64 certifié : `27c67ee7b47b9f9a015e6c0072640e0e573de52d`
- merge #64 : `1c01648d89dfb3bd9236b9ad93fbade4e21102fa`
- PR hotfix harness/SW isolation : **#65**
- head #65 certifié : `3e11e6124654b88e6932f292ed7acb1df31b0039`
- runtime production final : `ff788fd86e1754b15e8003b2f63c9673708480d0`
- `main` final runtime : **19/19 workflows SUCCESS**
- GitHub Pages : **#121 SUCCESS** sur `ff788fd…`

## Baseline protégée

- Build 28 Data & Recovery : six stores durables + restore transactionnel + quarantaine + `last-good` ;
- Build 27 App Shell : `Aujourd’hui / Pratiquer / Progrès` ;
- curriculum : **40 leçons / 241 éléments** ;
- Scenario : **36 situations / 108 tours** ;
- Listening : **0.88 normal / 0.65 lent** ;
- coût : **0 €** ;
- gate terrain Build 26.1 réécoute iPhone : toujours séparé et ouvert.

Sanctuaires byte-identiques :

- `voice-ios.js` ;
- `free-voice.js` ;
- `assets/LOGO.png` ;
- `assets/Favicon.png`.

Aucune clé durable n’a été renommée.

## Découverte majeure : le Worker n’était jamais enregistré

Avant Build 29, le repo contenait déjà :

- `sw.js` ;
- un manifest ;
- une liste de precache ;
- une stratégie réseau/cache.

Mais aucune page runtime ne faisait réellement :

```js
navigator.serviceWorker.register(...)
```

Le projet avait donc les pièces d’une PWA sans cycle de vie Service Worker garanti.

Build 29 ajoute l’enregistrement explicite depuis l’application **top-level** et le certifie.

## Service Worker lifecycle-safe

Le Worker Build 29 attend désormais réellement :

### Install

```text
cache.addAll(CORE)
→ skipWaiting()
→ fin install
```

### Activate

```text
liste des caches
→ suppression anciens caches
→ clients.claim()
→ fin activate
```

### Fetch

```text
réseau disponible
→ réponse réseau
→ copie cache via event.waitUntil

réseau indisponible
→ cache exact
→ fallback index.html
```

Cache canonique :

```text
tran-french-teacher-v1.22.0-b29-iphone-pwa-a11y
```

## Isolation des anciens harnesses

Rendre le Worker réel a révélé une dette CI : certains vieux smoke-tests Chrome top-level pouvaient enregistrer le Worker et garder Chrome vivant ou modifier le timing de leurs captures.

PR #65 sépare les contextes :

```text
app normale top-level       → Worker OUI
b29Audit                    → Worker OUI
anciens paramètres *Smoke   → Worker NON
iframe de test              → Worker NON
```

Le vrai comportement PWA n’est donc plus pollué par les anciens harnesses, et inversement.

Build 27 a aussi été rendu plus déterministe :

- le vrai `flow` continue à tester l’interaction utilisateur complète ;
- les vues visuelles utilisent l’API publique Build 27 pour construire l’état à capturer ;
- les transitions sont attendues avec une borne, pas une photo prise à un délai fixe arbitraire.

## Safe areas / viewport iOS

Build 29 généralise et certifie :

- `viewport-fit=cover` ;
- top safe area ;
- left/right safe areas ;
- Home Indicator / bottom safe area ;
- overlays ;
- tab bar ;
- petits et grands viewports ;
- paysage à faible hauteur.

## Clavier virtuel / VisualViewport

La couche consomme `visualViewport` lorsqu’il existe :

- hauteur visible ;
- offset vertical ;
- estimation du clavier ;
- `scroll-padding-bottom` dynamique ;
- recentrage du champ éditable ;
- tab bar non interactive pendant l’ouverture clavier pour éviter le tap accidentel derrière le clavier.

Aucun état pédagogique ne dépend de cette géométrie.

## Accessibilité interactionnelle

Sur la façade apprenante :

- targets visibles **≥ 44 × 44 px** sur coarse pointer/mobile ;
- champs ≥16 px pour éviter le zoom iOS au focus ;
- focus clavier visible via `:focus-visible` ;
- tab bar avec `aria-current="page"` ;
- boutons icône nommés ;
- progressions `role="progressbar"` avec valeur ;
- feedbacks utiles `aria-live="polite"` ;
- `prefers-reduced-motion` sans perte fonctionnelle ;
- `prefers-contrast: more` ;
- longs textes sans overflow horizontal ;
- aucun blocage du zoom utilisateur.

## PWA / installation

Manifest canonique :

```text
id: ./
start_url: ./
scope: ./
display: standalone
orientation: any
lang: vi
```

L’icône Apple dédiée `assets/apple-touch-icon.png` est réellement utilisée par `index.html`.

## Preuve offline dure

Le tribunal Build 29 ne se contente pas de regarder un cache ou une registration :

1. profil Chrome persistant ;
2. warm boot online ;
3. second warm boot online ;
4. **arrêt physique du serveur HTTP** ;
5. nouvelle navigation vers `127.0.0.1:4173` ;
6. exigence d’une Home apprenante complète ;
7. refus de `ERR_CONNECTION_REFUSED` et des boot errors.

Avec le serveur mort, seule la PWA installée et son cache peuvent servir le runtime. Ce scénario est passé avant merge et sur le runtime final.

## Tribunal mobile

Chrome réel vérifie :

- **390 × 844** ;
- **320 × 568** ;
- **430 × 932** ;
- `prefers-reduced-motion` forcé ;
- offline serveur mort.

Mesures :

```text
cibles trop petites = 0
boutons sans nom accessible = 0
onglets aria-current visibles = 1
overflow horizontal = 0
Home Build 27 visible = 1
```

## Build 28 reste un contrat

Le workflow Recovery a uniquement été rendu version-forward pour les identités globales version/cache. Ses preuves fonctionnelles restent intactes :

- écriture corrompue bloquée ;
- backup/restore ;
- migration V1 ;
- reset atomique ;
- quarantaine ;
- boot repair ;
- ancien profil ;
- Home Build 27 mobile.

## Validation terrain encore nécessaire

Chrome ne certifie pas WebKit réel. Restent à observer sur le vrai iPhone :

- encoche / Dynamic Island ;
- Home Indicator ;
- clavier iOS ;
- VoiceOver ;
- installation « Sur l’écran d’accueil » ;
- reprise standalone après extinction ;
- gate Build 26.1 de réécoute vocale.

Ces gates ne justifient aucune modification des sanctuaires vocaux sans preuve terrain.

## Suite

- **Build 30 — Architecture Hardening** ;
- puis **V2.0.0 — Freeze / Release**.
