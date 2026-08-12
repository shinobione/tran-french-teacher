# Build 28 — Data & Recovery Hardening

**Version : v1.21.0**  
**État : ✅ PROD / CLOS**

## Preuves production

- PR runtime : **#62** ;
- head PR certifié : `dc060ea5304b0526010bd8ac158b70c363525325` ;
- tribunal PR : **17/17 workflows SUCCESS** ;
- runtime production : `ed09159a6246fe3c1892cb0ff8d03a4beffb7428` ;
- `main` : **17/17 workflows fonctionnels SUCCESS** ;
- GitHub Pages : **#118 SUCCESS** ;
- total runtime `main` : **18/18 SUCCESS Pages incluse**.

## Intention

Build 28 protège les données réelles de Trân avant tout nouveau chantier d’architecture.

Principe :

> Une donnée invalide, une restauration ratée ou une migration ancienne ne doit jamais se transformer silencieusement en progression neuve.

Le build ne change ni curriculum, ni pédagogie, ni voix, ni reconnaissance, ni branding, ni App Shell Build 27.

## Stores durables protégés

Le coffre V2 possède un registre explicite de six stores :

1. `francais-avec-luc:learner:v1` — progression canonique ;
2. `french-tranquille:learning-memory:v1` — mémoire / révision espacée ;
3. `french-tranquille:error-intelligence:v1` — erreurs observables ;
4. `french-tranquille:scenarios:v1` — situations réelles ;
5. `french-tranquille:listening:v1` — compréhension orale ;
6. `french-tranquille:milestones:v1` — jalons de session.

Les réglages voix restent volontairement locaux à l’appareil : un `voiceURI` iPhone n’est pas une donnée pédagogique portable.

## Backup V2

Ancien export : learner + Memory seulement.

Nouveau format :

```text
french-tranquille-backup
version: 2
stores:
  learner
  memory
  errors
  scenarios
  listening
  milestones
```

Chaque store est validé avant export. Un backup complet ne peut pas être produit à partir d’un store critique illisible sans signaler le problème.

## Import / restore transactionnel

Avant toute restauration :

1. snapshot `pre-restore` ;
2. si backup ancien : snapshot `pre-migration` ;
3. validation du format et des schémas ;
4. écriture des six stores ;
5. relecture + validation ;
6. comparaison exacte avec la cible ;
7. si échec : rollback vers l’état précédent.

Un échec d’import ne laisse donc pas un mélange learner neuf / Memory ancien / Scenario à moitié restauré.

## Migration V1 → V2

Le backup V1 historique ne contenait que learner + Memory.

Build 28 migre ces deux stores mais **préserve** les stores modernes déjà présents sur l’appareil. Il ne les efface pas sous prétexte que le vieux fichier ne pouvait pas les connaître.

## Corruption localStorage

Le Recovery Engine se charge avant `app.js`.

Au boot :

- JSON invalide / schéma invalide → quarantaine ;
- restauration depuis `last-good` si disponible ;
- sinon fallback possible vers le snapshot historique Build 22 ;
- si aucune copie valide n’existe, seul le store fautif est retiré ; la donnée brute corrompue reste en quarantaine.

En runtime, une tentative d’écriture invalide sur un store critique est bloquée avant d’écraser la dernière version valide.

## Snapshots automatiques

Clés Recovery :

- `french-tranquille:recovery:last-good:v1`
- `french-tranquille:recovery:pre-restore:v1`
- `french-tranquille:recovery:pre-migration:v1`
- `french-tranquille:recovery:pre-reset:v1`
- `french-tranquille:recovery:quarantine:v1`

Le snapshot historique `french-tranquille:safety:pre-build22:v1` reste lisible comme filet de secours.

## Reset cohérent

L’ancien bouton Reset supprimait essentiellement le learner canonique ; les cerveaux annexes pouvaient rester sur l’appareil.

Build 28 intercepte ce geste :

```text
snapshot pre-reset
→ suppression learner + Memory + Error + Scenario + Listening + Milestones
→ reload propre
```

Le snapshot pré-reset reste disponible pour diagnostic/récupération.

## Tribunal

### Node — zéro perte

- [x] backup V2 contient les six stores ;
- [x] mutation → restore → égalité exacte du stockage durable ;
- [x] panne simulée pendant restauration → rollback exact ;
- [x] JSON invalide rejeté ;
- [x] schéma invalide rejeté ;
- [x] migration V1 → V2 conserve les stores modernes absents du vieux backup.

### Chrome — vrai runtime

Profil synthétique historique autour de la leçon 8 :

- [x] tentative d’écriture learner cassée → bloquée ;
- [x] learner original reste intact ;
- [x] donnée cassée mise en quarantaine ;
- [x] backup complet produit ;
- [x] mutation + restauration réussie ;
- [x] migration V1 reconnue ;
- [x] reset = six stores supprimés ensemble ;
- [x] snapshot pré-reset présent ;
- [x] restore après reset → 7 leçons terminées + `l8=4` récupérés.

Deuxième Chrome :

- [x] learner volontairement corrompu **avant `app.js`** ;
- [x] restauration depuis `last-good` avant boot normal de la PWA.

### Non-régression UI

Chrome mobile `390×844` :

- [x] Home Build 27 intacte ;
- [x] une action principale ;
- [x] deux raccourcis ;
- [x] zéro overflow horizontal.

## Incidents de certification utiles

### Premier rouge Build 28

Le smoke Recovery cherchait la classe Build 27 dans un mode historique `uxSmoke` qui désactive volontairement le shell Build 27. Le produit était correct ; le tribunal a été corrigé pour mesurer la vraie surface historique attendue.

### Deuxième rouge Build 28

Le smoke boot cherchait le texte d’erreur du watchdog dans tout le HTML. Cette chaîne existe naturellement dans le code source du watchdog même lorsque l’app fonctionne. L’assertion auto-déclenchante a été supprimée au profit des marqueurs réels de réparation.

### Quality Listening

L’ancien smoke Listening fabriquait volontairement un faux learner partiel `{ knownItems: [...] }`. Build 28 l’a correctement refusé. Le test a été rendu réaliste avec le profil historique valide `uxSmoke=lesson8` au lieu d’affaiblir le validateur Recovery.

### Build 26.8

Le vieux round-trip a connu son flake Chrome historique pendant une passe intermédiaire ; les sous-tests isolés étaient sains et le workflow final a repassé inchangé. Aucun runtime historique n’a été modifié pour masquer le flake.

## Sanctuaires

Byte-identiques :

- `voice-ios.js`
- `free-voice.js`
- `assets/LOGO.png`
- `assets/Favicon.png`

Inchangés fonctionnellement :

- 40 leçons / 241 acquis ;
- Scenario 36 / 108 ;
- Listening 0.88 / 0.65 ;
- Build 27 learner shell ;
- Build 26.6 containment ;
- Build 26.7 geometry ;
- Build 26.8 Focus Flow ;
- Build 26.9 Content Reliability ;
- gate terrain iPhone Build 26.1 toujours ouvert.

Baseline historique protégée : **v1.17.0 — Build 24 — Real Life French II**, Scenario **28 situations / 84 tours** avant Pack III ; `real-life-data-2.js` reste canonique.

## Critères de clôture

- [x] tests Node Build 28 verts ;
- [x] Chrome Recovery vert ;
- [x] Chrome boot-corruption vert ;
- [x] Chrome mobile Build 27 vert ;
- [x] anciens tribunaux version-forward verts ;
- [x] PR runtime #62 mergée ;
- [x] `main` revalidé ;
- [x] GitHub Pages #118 SUCCESS ;
- [x] README / ROADMAP / CHANGELOG / ARCHITECTURE clôturés après prod.

## Suite

Build 28 est fermé. Le prochain gros jalon est **v1.22.0 — Build 29 / iPhone / PWA / Accessibility Hardening**, sans oublier le gate terrain Voice Replay Build 26.1.