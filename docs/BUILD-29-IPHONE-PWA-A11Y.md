# Build 29 — iPhone / PWA / Accessibility Hardening

## État

**v1.22.0 — Build 29 — ✅ PROD / CLOS**

Objectif : certifier French Trân’quille comme PWA iPhone confortable et robuste sans modifier les moteurs pédagogiques, les données apprenantes ni les sanctuaires vocaux.

### Preuves production

- PR runtime : **#64** ;
- head PR certifié : `27c67ee7b47b9f9a015e6c0072640e0e573de52d` ;
- runtime production : `1c01648d89dfb3bd9236b9ad93fbade4e21102fa` ;
- `main` final runtime : **19/19 workflows SUCCESS** après rerun inchangé du seul ancien contrôle visuel Build 27 initialement rouge ;
- GitHub Pages **#120 SUCCESS** sur ce SHA ;
- PR expérimentale #65 : **fermée sans merge**.

## Baseline protégée

- Build 28 Data & Recovery ;
- Build 27 App Shell ;
- curriculum **40 leçons / 241 éléments** ;
- Scenario **36 situations / 108 tours** ;
- Listening **0.88 normal / 0.65 lent** ;
- coût **0 €** ;
- gate terrain Build 26.1 réécoute iPhone toujours séparé et ouvert.

Sanctuaires byte-identiques :

- `voice-ios.js` ;
- `free-voice.js` ;
- `assets/LOGO.png` ;
- `assets/Favicon.png`.

Aucune clé durable n’a été renommée.

## Couche Build 29

```text
src/ui/build29-iphone-a11y.css
src/ui/build29-iphone-a11y.js
tests/smoke/build29-smoke.js
.github/workflows/build29-iphone-pwa-a11y-smoke.yml
```

`app.js` n’est pas réécrit.

## Safe areas / viewport iOS

Build 29 généralise et certifie :

- `viewport-fit=cover` ;
- safe area top/left/right/bottom ;
- Home indicator ;
- overlays ;
- tab bar ;
- petits et grands viewports ;
- paysage compact.

## Clavier virtuel / VisualViewport

Lorsque `visualViewport` existe :

- hauteur visible ;
- offset vertical ;
- estimation du clavier ;
- `scroll-padding-bottom` dynamique ;
- recentrage du contrôle éditable ;
- tab bar non interactive pendant l’ouverture du clavier pour éviter les taps derrière celui-ci.

Aucun état pédagogique ne dépend de cette géométrie.

## Accessibilité interactionnelle

- cibles tactiles visibles ≥ **44 × 44 px** sur coarse pointer/mobile ;
- focus clavier via `:focus-visible` ;
- `aria-current="page"` ;
- boutons icône nommés ;
- progressions `role="progressbar"` ;
- feedbacks utiles `aria-live="polite"` ;
- `prefers-reduced-motion` ;
- `prefers-contrast: more` ;
- textes longs sans overflow horizontal ;
- zoom utilisateur conservé.

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

L’Apple Touch Icon dédiée est utilisée. Le Service Worker précache le shell, la couche Build 29, le manifest et les assets nécessaires.

## Offline

Le tribunal :

1. ouvre la PWA avec un profil Chrome persistant ;
2. réouvre pour laisser le Service Worker contrôler ;
3. coupe le serveur HTTP ;
4. redémarre la PWA avec le même profil ;
5. exige Home + smoke Build 29 sans boot error.

Cette vérification a passé sur le runtime production.

## Matrice mobile certifiée

- **390 × 844** ;
- **320 × 568** ;
- **430 × 932** ;
- reduced-motion forcé ;
- boot offline après warm install.

Contrats :

```text
cibles trop petites = 0
boutons sans nom = 0
aria-current visible = 1
overflow horizontal = 0
manifest valide
Home Build 27 rendue
```

## Recovery reste un gate

Build 28 continue de tester :

- corrupt write bloquée ;
- backup/restore ;
- migration V1 ;
- reset atomique ;
- quarantaine ;
- boot repair ;
- ancien profil ;
- Home Build 27 mobile.

## PR #65 — expérience non mergée

Une mini-PR a testé l’idée d’éviter l’enregistrement Service Worker sur les anciennes URLs `*Smoke`. Elle n’a pas supprimé le flake visuel Build 27 qu’elle visait. Le même Build 29 `main` original a ensuite passé ce vieux contrôle en rerun inchangé.

Conclusion : **#65 fermée sans merge**. La production Build 29 reste `1c01648d…`.

## Validation terrain encore nécessaire

Chrome ne certifie pas :

- encoche / Dynamic Island réelle ;
- Home indicator réel ;
- clavier iOS réel ;
- VoiceOver réel ;
- installation « Sur l’écran d’accueil » ;
- reprise standalone après extinction ;
- gate Build 26.1 de réécoute vocale.

Ces points restent des observations terrain et ne justifient pas de modifier les sanctuaires vocaux sans preuve.

## Suite

Build 29 est fermé. Le candidat suivant est **v1.22.1 — Build 29.1 Speaking Loop Content**, qui réutilise cette base iPhone/PWA pour intégrer l’auto-écoute au contenu des leçons.