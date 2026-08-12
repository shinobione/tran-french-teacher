# Build 27 — App Shell Reset

**Version candidate : v1.20.0**  
**Build : 27**  
**État : CANDIDAT — PR → CI → main → Pages requis avant PROD**

## Pourquoi ce build existe

Le retour terrain après Builds 26.6 → 26.9 a confirmé que `Parcours` était devenu techniquement stable mais restait trop proche d’un dashboard de moteurs pédagogiques. Les écrans exposaient encore trop de cartes, compteurs, familles analytiques et structures internes pour ressembler à une application simple destinée à Trân.

Build 27 ne cherche donc plus à « améliorer le dashboard ». Il remplace la **façade apprenante** par une interface mobile-first centrée sur une seule intention par écran.

## Contrat produit

### Aujourd’hui

L’écran principal montre uniquement :

- identité French Trân’quille ;
- prochaine leçon ;
- une action principale `Continuer` ;
- deux raccourcis discrets `Réviser` / `Écouter` ;
- une indication légère de durée conseillée.

Les anciennes cartes Home restent dans le DOM pour leurs moteurs, mais sont invisibles dans la façade apprenante.

### Pratiquer

Le bouton central ouvre une vraie vue d’application, pas un dashboard imbriqué :

- Parler ;
- Écouter ;
- Réviser ;
- Dans la vraie vie.

`Dans la vraie vie` utilise le Scenario Engine existant et démarre une situation déjà débloquée, avec priorité aux situations personnelles Jerry lorsqu’elles existent.

### Progrès

L’utilisatrice voit :

- position A0 → A1 ;
- prochaine leçon ;
- étape actuelle ;
- cinq leçons utiles autour de sa position ;
- accès à une vue `Parcours complet` dédiée.

Les panneaux Memory / Mastery / Listening / Scenario / Error / Language ne sont plus exposés comme navigation normale. En DEBUG FR, un bouton diagnostic permet encore d’afficher l’ancien cockpit moteur sans le mélanger à l’expérience apprenante.

### Parcours complet

Une vue dédiée affiche les cinq étapes et **une seule étape à la fois**. Les 40 leçons restent accessibles sans devenir un parchemin permanent.

## Responsive / mouvement

- mobile-first ;
- grand desktop : Home utilise intelligemment deux zones sans devenir un dashboard SaaS ;
- mobile : une seule colonne ;
- bottom tab bar conservée ;
- transitions courtes fade / translate ;
- `prefers-reduced-motion` conserve le flux sans animation ;
- zéro overflow horizontal contractuel.

## Architecture

Build 27 est additif :

```text
moteurs historiques + DOM historique
            ↓
     restent propriétaires
            ↓
 build27-app-shell.js/css
            ↓
 façade apprenante simplifiée
```

Aucun reparenting Memory/Mastery/Listening/Scenario. Aucun clone de données pédagogiques.

Les anciens workflows `...Smoke` gardent leurs surfaces historiques : Build 27 se désactive pendant leurs URLs de test. Le nouveau workflow Build 27 teste séparément la nouvelle façade.

## Nouveau tribunal Chrome

Profil synthétique historique : leçons 1–7 terminées, leçon 8 en cours, progression et acquis conservés.

Desktop 1640×900 :

1. Home visible ;
2. une seule carte leçon principale ;
3. exactement deux actions rapides ;
4. ancien dashboard Home invisible ;
5. écran Home borné au viewport de certification ;
6. zéro overflow horizontal.

Round-trip :

```text
Home
→ Pratiquer
→ retour
→ Progrès
→ Parcours complet
→ A1 Core
→ retour
→ prochaine leçon
```

Contrats : 4 actions Practice, 5 lignes compactes Progress, 5 étapes, A1 Core = 15 leçons, arrivée réelle sur l’écran Leçon.

Le même flux est testé en viewport mobile 390×844.

## Sanctuaires

Build 27 ne modifie pas :

- `francais-avec-luc:learner:v1` ;
- Learning Memory / Scenario / Listening state ;
- `voice-ios.js` ;
- `free-voice.js` ;
- `assets/LOGO.png` ;
- `assets/Favicon.png` ;
- curriculum **40 / 241** ;
- Scenario **36 / 108** ;
- Listening **0.88 / 0.65** ;
- containment Build 26.6 ;
- géométrie Build 26.7 ;
- Focus Flow Build 26.8 ;
- Content Reliability Build 26.9.

Le gate terrain Voice Replay Build 26.1 reste ouvert.

## Clôture requise

```text
PR runtime
→ nouveau tribunal Build 27 vert
→ tous les contrats historiques verts
→ validation visuelle du candidat
→ merge exact
→ mêmes checks sur main
→ GitHub Pages SUCCESS
→ docs PROD / CLOS
```
