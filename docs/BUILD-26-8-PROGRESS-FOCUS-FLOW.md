# Build 26.8 — Progress Focus Flow

**Version : v1.19.8**  
**Build : 26.8**  
**État : ✅ PROD / CLOS**  
**PR runtime : #56**  
**Runtime production : `1084e1d71a7aebbf6d7dcea9dfa0cabb44f6cbe1`**  
**GitHub Pages : #112 SUCCESS**

## Retour terrain

Une vidéo réelle du 12 août 2026 a montré que Build 26.7 avait réparé la géométrie mais pas encore la longueur cognitive de `Parcours`.

Le problème n’était plus une colonne écrasée. Le document restait trop long :

```text
Résumé
+ Curriculum
+ six tuiles Détails
+ famille active
+ cartes moteur de cette famille
```

Même correctement dimensionné, cet empilement produisait encore une sensation de « parchemin » et sous-utilisait les grands écrans.

## Principe livré

> **Une intention active possède l’écran ; le contexte non nécessaire disparaît temporairement puis revient à la sortie.**

Build 26.8 est une couche d’état/presentation. Il ne crée aucun moteur pédagogique et ne déplace aucune carte historique hors de la frontière DOM restaurée en Build 26.6.

## Vue normale

`Parcours` reste compact :

- Résumé ;
- curriculum 5 lignes autour de la position actuelle ;
- `Détails d’apprentissage` et ses familles.

## Focus Détails

Clic sur une famille :

```text
compact
→ fade-out court
→ learner flow masqué
→ grille des familles masquée
→ famille choisie pleine surface
→ Retour aux détails
→ compact restauré
```

Sur grand desktop : cartes détaillées en deux colonnes lorsque possible et shell focalisé jusqu’à 1420 px.

Sur écran plus étroit/mobile : une seule colonne.

Le panneau `.progress-ux-details` reste dans `.progress-ux-composition` : containment 26.6 intact.

## Focus Curriculum

`Voir tout le parcours` devient une vraie vue focalisée :

```text
Résumé + Details masqués
→ Curriculum pleine surface
→ 5 étapes
→ leçons de l’étape active
→ Retour au résumé
→ compact 5 lignes restauré
```

Grand desktop : 5 étapes horizontales et leçons en 2 colonnes. Responsive : 2 puis 1 colonne.

Les 40 leçons restent accessibles mais jamais affichées simultanément.

## Sorties propres

Le chantier a révélé qu’un faux clic sur un contrôle caché était trop fragile sous les `MutationObserver` historiques.

Les sorties finales utilisent donc les API propriétaires :

```text
Details
→ FrenchTranquilleProgressDetailsDashboard.close()
→ decorate()

Curriculum
→ FrenchTranquilleProgressionUX.setCurriculumExpanded(false)
→ decorate()
```

Chaque état reste ainsi piloté par son propriétaire.

## Transitions idempotentes

Les observers peuvent produire plusieurs mutations pendant un même changement visuel.

Build 26.8 refuse de redémarrer une transition déjà en route vers la même destination. Cela empêche une rafale de mutations de repousser indéfiniment le timer de transition.

Autre règle importante :

```text
fade-out
→ applyFocus()
→ état logique terminé
→ fade-in cosmétique
```

La fin du fade n’est donc jamais nécessaire pour permettre l’interaction suivante.

`prefers-reduced-motion: reduce` retire les animations et conserve exactement le même contrat fonctionnel.

## Tribunal Chrome

Le workflow `.github/workflows/build26-8-progress-focus-smoke.yml` couvre :

### 1. Details focus — 1640×900

- Memory réellement ouverte ;
- learner flow masqué ;
- grille familles masquée ;
- panneau actif visible ;
- toolbar retour visible ;
- containment intact ;
- aucun overflow horizontal ;
- surface Focus mesurée **920 px** dans le viewport de CI.

### 2. Curriculum focus — 1640×900

- Curriculum réellement développé ;
- Overview masqué ;
- Details masqué ;
- toolbar retour visible ;
- containment intact ;
- aucun overflow horizontal ;
- surface Focus mesurée **920 px**.

### 3. Round-trip

Chrome exécute réellement :

```text
vue compacte
→ Memory focus
→ Retour aux détails
→ Curriculum focus
→ Retour au résumé
```

Puis exige :

```text
focus actif       = aucun
famille active    = aucune
lesson rows       = 5
```

### 4. Mobile 390×844

- Details focus ;
- une seule colonne responsive ;
- toolbar retour visible ;
- largeur utile au-dessus du seuil contractuel ;
- aucun overflow horizontal ;
- containment intact.

## Régressions protégées

Build 26.8 conserve :

- Build 26.6 containment / cardinalité stable **12 → 12** ;
- Build 26.6 curriculum en cinq étapes ;
- Build 26.7 garde géométrique wide/compact ;
- Build 26.5 Conversation Exit ;
- Build 26.4 single-scroll ;
- Build 26.3 interactions ;
- Build 26.2 Listening effectif **0.88 / 0.65** ;
- Build 26.1 Voice Replay ;
- curriculum **40 / 241** ;
- Scenario **36 / 108**.

## Sanctuaires

Aucun changement sur :

```text
francais-avec-luc:learner:v1
Learning Memory state
Scenario state
Listening state
voice-ios.js
free-voice.js
assets/LOGO.png
assets/Favicon.png
```

Aucune migration learner/Memory/Scenario/Listening.

## Certification

Candidat final PR #56 :

```text
head c919262076e80296d38861cb986c9c42a1ded7a8
14/14 workflows fonctionnels SUCCESS
```

Après squash merge :

```text
main 1084e1d71a7aebbf6d7dcea9dfa0cabb44f6cbe1
14/14 workflows fonctionnels SUCCESS
GitHub Pages #112 SUCCESS
0 failure
0 in-progress après certification
```

## Gate restant

Le gate terrain réel de Build 26.1 reste volontairement ouvert :

```text
réponse vocale reconnue
→ seconde prise locale
→ réécoute
→ réponse vocale suivante toujours reconnue normalement
```

Ce gate est indépendant du Focus Flow.
