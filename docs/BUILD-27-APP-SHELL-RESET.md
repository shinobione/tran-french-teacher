# Build 27 — App Shell Reset

**Version : v1.20.0**  
**Build : 27**  
**État : ✅ PROD / CLOS**

## Pourquoi ce build existe

Le retour terrain après Builds 26.6 → 26.9 a confirmé que `Parcours` était devenu techniquement stable mais restait trop proche d’un dashboard de moteurs pédagogiques.

Build 27 ne cherche donc plus à améliorer ce dashboard. Il remplace la **façade apprenante** par une interface mobile-first centrée sur une seule intention par écran.

## Contrat produit livré

### Aujourd’hui

- identité French Trân’quille ;
- prochaine leçon ;
- une action principale `Continuer` ;
- deux raccourcis `Réviser` / `Écouter` ;
- durée conseillée discrète.

Les anciennes cartes Home restent dans le DOM pour leurs moteurs, mais sont invisibles dans la façade apprenante.

### Pratiquer

Page dédiée avec :

- Parler ;
- Écouter ;
- Réviser ;
- Dans la vraie vie.

`Dans la vraie vie` démarre une vraie situation Scenario déjà débloquée et privilégie les situations personnelles Jerry lorsqu’elles existent.

### Progrès

- position A0 → A1 ;
- prochaine leçon ;
- étape actuelle ;
- cinq leçons utiles ;
- accès au Parcours complet.

Memory / Mastery / Listening / Scenario / Error ne sont plus une navigation normale. Le cockpit historique reste disponible en DEBUG FR.

### Parcours complet

Cinq étapes, une seule développée à la fois. Les 40 leçons restent accessibles sans être affichées simultanément.

## Responsive / mouvement

- mobile-first ;
- desktop agrandit l’app sans en faire un dashboard SaaS ;
- mobile mono-colonne ;
- tab bar persistante ;
- transitions courtes ;
- `prefers-reduced-motion` ;
- zéro overflow horizontal contractuel ;
- Practice/Journey alignés sur la géométrie réelle de la tab bar.

## Architecture

```text
moteurs historiques + DOM historique
            ↓
     restent propriétaires
            ↓
 build27-app-shell.js/css
            ↓
 façade apprenante simplifiée
```

Aucun reparenting Memory/Mastery/Listening/Scenario. Aucun clone de données pédagogiques. Aucun changement de clé learner.

Les anciens workflows `...Smoke` gardent leurs surfaces historiques : Build 27 se désactive pendant leurs URLs de test.

## Tribunal Chrome

Profil synthétique historique : leçons 1–7 terminées, leçon 8 en cours.

Desktop `1640×900` :

- Home visible ;
- une seule carte leçon principale ;
- exactement deux actions rapides ;
- ancien dashboard Home invisible ;
- Home **672 px** de haut ;
- zéro overflow horizontal.

Round-trip :

```text
Home
→ Pratiquer
→ retour
→ Progrès
→ Parcours complet
→ A1 Core
→ retour
→ vraie Leçon
```

Contrats : 4 actions Practice, 5 lignes Progress, 5 étapes, A1 Core = 15 leçons, arrivée réelle sur une leçon. Même flux en `390×844`.

Le nav physique exige pointer feedback, tap echo, persistance des nœuds, une seule tab active et aucun chevauchement avec la tab bar.

## Revue visuelle

CI capture :

```text
home-desktop.png
practice-desktop.png
progress-desktop.png
journey-desktop.png
home-mobile.png
```

La release a été revue avant merge : Home/Practice/Progress ont une composition app-like ; Journey est une vue dédiée sans ghost de l’écran précédent ; les overlays sont settled avant capture.

## Preuves release

```text
PR runtime       #60
head PR          dba27d35b59b78bb63b1bf930c5f47b119feff36
PR fonctionnels  16 / 16 SUCCESS
runtime main     beeb9ce8ba081ed0298edbcc339dca41600e4d09
main fonctionnels 16 / 16 SUCCESS
Pages            #116 SUCCESS
main total       17 / 17 SUCCESS Pages incluse
```

Le premier run `main` de l’ancien Build 26.8 a flaké à son round-trip historique. Le **même job inchangé** a été rerun sur le même runtime et a ensuite passé Details, Curriculum, Round-trip et Mobile SUCCESS. Aucun patch Build 27 n’a été ajouté pour ce flake.

## Sanctuaires

Build 27 ne modifie pas :

- `francais-avec-luc:learner:v1` ;
- Learning Memory / Scenario / Listening ;
- `voice-ios.js` ;
- `free-voice.js` ;
- `assets/LOGO.png` ;
- `assets/Favicon.png` ;
- curriculum **40 / 241** ;
- Scenario **36 / 108** ;
- Listening **0.88 / 0.65** ;
- containment Build 26.6 ;
- geometry Build 26.7 ;
- Focus Flow Build 26.8 ;
- Content Reliability Build 26.9.

Le gate terrain Voice Replay Build 26.1 reste ouvert.

### Baseline historique protégée

**v1.17.0 — Build 24 — Real Life French II** : Scenario **28 situations / 84 tours** avant Pack III. `real-life-data-2.js` reste explicitement conservé.

## Suite

Build 27 est clos. Prochains jalons : Build 28 Data & Recovery Hardening, Build 29 iPhone/PWA/Accessibility Hardening, Build 30 Architecture Hardening, puis V2.0.0 Freeze / Release.