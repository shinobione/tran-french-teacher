from pathlib import Path

# README: candidate -> production
p=Path('README.md')
t=p.read_text(encoding='utf-8')
t=t.replace('## Candidat actuel','## Version en production')
t=t.replace('- **Build 19 — A1 Core**','- **Build 19 — A1 Core**\n- statut : **PROD / GitHub Pages**')
t=t.replace('> Build 19 reste un candidat tant que PR, CI `main` et GitHub Pages ne sont pas tous verts. Le statut de production vit dans `CHANGELOG.md` et `ROADMAP.md`.','> Build 19 a été validé sur PR, sur `main`, sur GitHub Pages et par un rendu Chrome direct de l’URL publique.')
p.write_text(t,encoding='utf-8')

# CHANGELOG: release Build19
p=Path('CHANGELOG.md')
t=p.read_text(encoding='utf-8')
t=t.replace('## [Unreleased]\n\n### v1.12.0 — Build 19 — A1 Core\n','## [Unreleased]\n\nAucun changement non livré pour le moment.\n\n---\n\n## [1.12.0] — Build 19 — A1 Core — 2026-08-11\n')
t=t.replace('> Cette entrée reste dans **Unreleased** jusqu’à validation PR + `main` + GitHub Pages.\n','')
marker='- nouveaux smoke tests Chrome Home / Scenario / Error / A1 Core.\n'
if marker in t and 'rendu Chrome direct de la GitHub Pages publique' not in t:
    t=t.replace(marker,marker+'- PR #11 validée puis squash-mergée ;\n- Chrome Home / Scenario / Error / A1 Core validés sur PR puis sur `main` ;\n- GitHub Pages validé ;\n- rendu Chrome direct de la GitHub Pages publique validé avec 40 leçons, leçon 40 et Mastery A1 Core.\n')
p.write_text(t,encoding='utf-8')

# ROADMAP: canonical post-release state
Path('ROADMAP.md').write_text(r'''# French Trân’quille — ROADMAP

> `README.md` = état courant. `CHANGELOG.md` = historique livré. Ici : **ordre, dépendances et critères de clôture**.

## Principes non négociables

1. iPhone / Safari / PWA iOS = cible principale.
2. 0 € d’exploitation récurrente tant qu’une décision explicite ne change pas cette règle.
3. Vietnamien majoritaire au départ ; français augmenté selon les preuves d’apprentissage.
4. Oral prioritaire, sans faux diagnostic phonétique.
5. Communication réelle > théorie scolaire.
6. Aucun reset silencieux.
7. Un gros build = une intention principale ; hotfix = `.1`, `.2`, etc.
8. Aucun merge important sans Chrome headless vert ; Safari réel reste requis pour iOS spécifique.
9. README / CHANGELOG / ROADMAP / ARCHITECTURE synchronisés.
10. PWA dédiée, pas clone de chatbot ni gamification agressive.

---

# État de référence livré

## v1.12.0 — Build 19 — ✅ PROD

- **40 leçons / 238 éléments** ;
- A0 → A1 Core ;
- Learning Memory ;
- Daily Coach ;
- Mastery Engine + palier A1 Core ;
- Scenario Lab : 12 situations / 36 tours ;
- Error Intelligence ;
- Free Voice ;
- runtime metadata centralisée ;
- Chrome Home / Scenario / Error / A1 Core ;
- validation directe de l’URL GitHub Pages publique ;
- coût : **0 €**.

---

# PHASES CLÔTURÉES RÉCENTES

## v1.9.0 — Build 16 — Mastery Engine — ✅ CLOS

- [x] quatre étapes de maîtrise ;
- [x] preuves Learning Memory avant `Maîtrisé` ;
- [x] estimation interne non assimilée à une certification CECRL ;
- [x] gouvernance documentaire.

## v1.10.0 — Build 17 — Scenario Lab — ✅ CLOS

- [x] 12 scénarios / 36 tours ;
- [x] déverrouillage par leçons ;
- [x] indices / modèles / Memory ;
- [x] profil vierge ;
- [x] Chrome Home + Conversation.

## v1.11.0 — Build 18 — Error Intelligence — ✅ CLOS

- [x] preuves observables ;
- [x] historique 20/élément / 120 globaux ;
- [x] récence / répétition / récupération ;
- [x] Free Voice → Memory + Error ;
- [x] Chrome Home / Scenario / Error.

## v1.12.0 — Build 19 — A1 Core — ✅ CLOS

- [x] 15 nouvelles leçons 26→40 ;
- [x] 90 nouveaux éléments ;
- [x] 40 leçons / 238 éléments total ;
- [x] six éléments par leçon ;
- [x] IDs globaux uniques ;
- [x] nombres 11→100 ;
- [x] jours / mois / dates ;
- [x] heure précise ;
- [x] possessifs ;
- [x] présent `tu`, `il/elle`, `nous` ;
- [x] futur proche ;
- [x] passé récent ;
- [x] passé composé fréquent ;
- [x] formes féminines avec être ;
- [x] administration / documents ;
- [x] émotions / besoins / proches ;
- [x] Mastery A1 Core avec preuves de révision ;
- [x] Learning Memory / Free Voice / Error compatibles ;
- [x] build-meta chargé en dernier ;
- [x] CI normalisée autour de l’état courant ;
- [x] Chrome Home = 40 leçons ;
- [x] Chrome Scenario non-régression ;
- [x] Chrome Error non-régression ;
- [x] Chrome A1 Core ;
- [x] PR #11 verte et mergée ;
- [x] CI `main` verte ;
- [x] GitHub Pages vert ;
- [x] URL publique réellement rendue et vérifiée.

---

# VOICE CALIBRATION GATE — BLOQUÉ SUR DONNÉES RÉELLES

Le calibrage Safari/Siri spécifique à Trân reste séparé.

À collecter sur son vrai iPhone :

- phrase cible ;
- transcription Safari ;
- alternatives éventuelles ;
- nombre d’essais ;
- faux refus ;
- faux positifs.

Seulement après : tolérances réelles et variantes observées. **Jamais de faux score phonétique.**

---

# v1.13.0 — Build 20 — Listening Comprehension — 🔥 PROCHAIN

## But

Faire travailler la compréhension orale **sans afficher immédiatement la phrase française**, afin que l’audio devienne une vraie source d’information et pas simplement un bouton “lire le texte”.

## Périmètre prévu

### Mode Écoute

- Lucie lit une phrase déjà connue ou légèrement recombinée ;
- Trân choisit le sens vietnamien ;
- possibilité de réécouter ;
- vitesse lente puis normale ;
- la réponse textuelle française n’est révélée qu’après tentative.

### Contrastes auditifs utiles

Exemples :

- `tu` / `tout` ;
- nombres proches ;
- `il est` / `elle est` ;
- heure et prix ;
- présent / futur proche selon contexte ;
- phrases courtes de la vie quotidienne.

Sans prétendre mesurer la production phonétique : ici on teste **la compréhension**.

### Mini-dialogues

- 2 à 4 répliques ;
- question de compréhension ;
- situations café / gare / téléphone / proches / rendez-vous ;
- audio généré avec `speechSynthesis` local ;
- transcript masqué avant réponse.

### Mémoire

Les réponses alimenteront :

- Learning Memory ;
- Error Intelligence avec source `listening-*` ;
- Daily Coach ;
- future adaptation VI/FR.

## Critères de clôture Build 20

- [ ] moteur Listening séparé et local ;
- [ ] banque d’exercices construite à partir des acquis ;
- [ ] phrase française masquée avant tentative ;
- [ ] vitesse lente / normale ;
- [ ] réécoute ;
- [ ] au moins 3 familles d’exercices ;
- [ ] mini-dialogues ;
- [ ] Memory + Error Intelligence alimentées ;
- [ ] aucune régression 40 leçons ;
- [ ] aucune régression Scenario Lab ;
- [ ] Chrome Home ;
- [ ] Chrome Listening ;
- [ ] Chrome Scenario ;
- [ ] Chrome Error ;
- [ ] README / ROADMAP / CHANGELOG / ARCHITECTURE synchronisés ;
- [ ] PR + `main` + Pages verts.

---

# v1.14.0 — Build 21 — Adaptive Language Ratio

Le ratio VI/FR dépendra de :

- Mastery ;
- compréhension Listening ;
- indices nécessaires ;
- Error Intelligence ;
- difficulté de la situation.

Le vietnamien recule uniquement quand les preuves le permettent.

---

# Builds 22–24 — Real Life French

Français avec Jerry, proches, repas, téléphone, déplacements, problèmes quotidiens, émotions, humour simple, oral courant vs forme correcte.

---

# V2.0.0 — Hardening

Objectif : A0→A1 cohérent, scénarios stables, mémoire versionnée, sauvegarde robuste, Safari réel, offline testé, docs complètes, zéro dépendance payante obligatoire.

---

# Backlog

- vrai avatar Lucie ;
- sons discrets ;
- fiches imprimables ;
- bilan exportable ;
- admin local ;
- mode 5 min ;
- écoute/déplacement ;
- statistiques hebdomadaires ;
- multi-appareil gratuit si solution sûre.

# Reporté explicitement

Backend/API payants, avatar vidéo, XP/classement, gamification agressive, score phonétique pseudo-scientifique, app native tant que la PWA suffit.

# Easter egg réservé

**Leçon 69** 😇🍌🍑 — vocabulaire adulte/intime, consentement et registres de couple, uniquement quand le niveau sera suffisant.
''',encoding='utf-8')

# Build dossier: append closure once
p=Path('docs/BUILD-19-A1-CORE.md')
t=p.read_text(encoding='utf-8')
if '## Clôture production' not in t:
    t += r'''

---

## Clôture production

Build 19 est **CLOS**.

Validation effectuée :

- contrat 15 leçons / 90 items ;
- IDs globaux uniques ;
- syntaxe de tous les modules ;
- Chrome Home : 40 leçons + leçon 40 + chapitre A1 Core ;
- Chrome Scenario Lab ;
- Chrome Error Intelligence avec limites 20/120 ;
- Chrome A1 Core / Mastery ;
- PR #11 squash-mergée ;
- CI `main` verte ;
- GitHub Pages verte ;
- validation Chrome directe de l’URL publique.

État livré : **v1.12.0 • Build 19 • 40 leçons • 238 éléments**.
'''
    p.write_text(t,encoding='utf-8')

print('Build 19 release docs closed')
