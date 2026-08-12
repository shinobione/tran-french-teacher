# Build 29 — iPhone / PWA / Accessibility Hardening

## État

**v1.22.0 — Build 29 — CANDIDAT / NON MERGÉ**

Objectif : certifier French Trân’quille comme PWA iPhone confortable et robuste sans modifier les moteurs pédagogiques, les données apprenantes ni les sanctuaires vocaux.

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

Aucune clé durable n’est renommée.

## Couche Build 29

Build 29 ajoute une couche de présentation/device séparée :

- `build29-iphone-a11y.css` ;
- `build29-iphone-a11y.js` ;
- `build29-smoke.js` ;
- workflow `build29-iphone-pwa-a11y-smoke.yml`.

`app.js` n’est pas modifié.

## Safe areas / viewport iOS

Le projet possédait déjà `viewport-fit=cover` et quelques usages de `env(safe-area-inset-*)`. Build 29 généralise et certifie le contrat sur la façade Build 27 :

- top safe area ;
- left/right safe areas ;
- Home indicator / bottom safe area ;
- overlays ;
- tab bar ;
- petits et grands viewports ;
- paysage à faible hauteur.

## Clavier virtuel / VisualViewport

Build 29 consomme `visualViewport` lorsqu’il existe :

- hauteur visible ;
- offset vertical ;
- estimation du clavier virtuel ;
- `scroll-padding-bottom` dynamique ;
- recentrage du contrôle éditable au focus ;
- tab bar rendue non-interactive pendant l’ouverture clavier pour éviter un tap accidentel derrière le clavier.

Aucun état pédagogique ne dépend de cette géométrie.

## Accessibilité interactionnelle

Sur la façade apprenante :

- cibles tactiles visibles >= **44 × 44 px** sur coarse pointer/mobile ;
- focus clavier visible via `:focus-visible` ;
- tab bar annotée avec `aria-current="page"` ;
- boutons icône nommés ;
- progressions exposées comme `role="progressbar"` avec valeur ;
- feedbacks utiles en `aria-live="polite"` ;
- `prefers-reduced-motion` conserve le même flux sans dépendre de l’animation ;
- `prefers-contrast: more` renforce les séparations lorsque demandé ;
- textes longs autorisés à se replier sans créer d’overflow horizontal ;
- aucun `maximum-scale=1` / `user-scalable=no` : le zoom utilisateur reste disponible.

## PWA / installation

Le manifest devient explicitement stable :

```text
id: ./
start_url: ./
scope: ./
display: standalone
orientation: any
lang: vi
```

L’icône Apple dédiée existante `assets/apple-touch-icon.png` est enfin utilisée par `index.html` au lieu du favicon générique.

Le Service Worker reçoit une nouvelle identité de cache Build 29 et précache la couche Build 29, le manifest et l’Apple Touch Icon.

## Offline

Le tribunal Build 29 :

1. ouvre la PWA avec un profil Chrome persistant ;
2. réouvre une seconde fois pour que le Service Worker contrôle la page ;
3. coupe le serveur HTTP ;
4. relance la même PWA avec le même profil ;
5. exige que la Home et le smoke Build 29 redémarrent depuis le cache sans écran de boot erreur.

Ce test ne remplace pas WebKit réel, mais valide le contrat PWA/offline statique.

## Tribunal mobile

Chrome réel vérifie :

- **390 × 844** — cible mobile de référence ;
- **320 × 568** — petit viewport ;
- **430 × 932** — grand iPhone logique ;
- `prefers-reduced-motion` forcé ;
- boot offline après warm install.

Le smoke mesure le contenu réellement visible :

- cibles trop petites = 0 ;
- boutons sans nom accessible = 0 ;
- tabs `aria-current` visibles = exactement 1 ;
- overflow horizontal = 0 ;
- manifest PWA valide ;
- Build 27 Home toujours rendue.

## Build 28 reste un contrat

Le workflow Build 28 est seulement rendu **version-forward** pour ses assertions de numéro/cache. Ses tests fonctionnels restent inchangés :

- corrupt write bloquée ;
- backup/restore ;
- migration V1 ;
- reset atomique ;
- quarantaine ;
- boot repair ;
- ancien profil ;
- Home Build 27 mobile.

Build 29 ne diminue donc pas le tribunal Recovery.

## Validation terrain encore nécessaire

Chrome ne peut pas certifier les comportements propres à Safari/WebKit :

- encoche / Dynamic Island réelle ;
- Home indicator réel ;
- clavier iOS réel ;
- VoiceOver ;
- installation « Sur l’écran d’accueil » ;
- reprise standalone après extinction ;
- gate Build 26.1 de réécoute vocale.

Ces points doivent être observés sur le vrai iPhone quand ils sont matériels. Ils ne justifient pas de modifier les sanctuaires vocaux sans preuve terrain.

## Critère de merge

**Ne pas merger** tant que :

- le nouveau tribunal Build 29 n’est pas vert ;
- Build 28 Recovery n’est pas vert ;
- Build 27 App Shell n’est pas vert ;
- les anciens contrats fonctionnels ne sont pas verts ou expliqués comme flake historique puis rerun inchangé ;
- aucune donnée/voix/branding sanctuarisé n’a bougé.
