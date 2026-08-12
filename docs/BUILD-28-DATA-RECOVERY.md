# Build 28 — Data & Recovery Hardening

**Version cible : v1.21.0**  
**État : CANDIDAT — NE PAS MERGER avant tribunal vert**

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

Un échec d’import ne doit donc pas laisser un mélange learner neuf / Memory ancien / Scenario à moitié restauré.

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

- backup V2 contient les six stores ;
- mutation → restore → égalité exacte du stockage durable ;
- panne simulée pendant restauration → rollback exact ;
- JSON invalide rejeté ;
- schéma invalide rejeté ;
- migration V1 → V2 conserve les stores modernes absents du vieux backup.

### Chrome — vrai runtime

Profil synthétique historique autour de la leçon 8 :

- tentative d’écriture learner cassée → bloquée ;
- learner original reste intact ;
- donnée cassée mise en quarantaine ;
- backup complet produit ;
- mutation + restauration réussie ;
- migration V1 reconnue ;
- reset = six stores supprimés ensemble ;
- snapshot pré-reset présent ;
- restore après reset → 7 leçons terminées + `l8=4` récupérés.

Deuxième Chrome : le learner est volontairement corrompu **avant `app.js`** ; le Recovery Engine doit le restaurer depuis `last-good` avant le boot de la PWA.

### Non-régression UI

Chrome mobile 390×844 garde la Home Build 27 :

- une action principale ;
- deux raccourcis ;
- zéro overflow horizontal.

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
- gate terrain iPhone Build 26.1 toujours ouvert.

## Critères de clôture

- [ ] tests Node Build 28 verts ;
- [ ] Chrome Recovery vert ;
- [ ] Chrome boot-corruption vert ;
- [ ] Chrome mobile Build 27 vert ;
- [ ] anciens tribunaux version-forward verts ;
- [ ] PR runtime mergée ;
- [ ] `main` revalidé ;
- [ ] GitHub Pages SUCCESS ;
- [ ] README / ROADMAP / CHANGELOG / ARCHITECTURE clôturés après prod.
