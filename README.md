# Français avec Luc

PWA mobile-first de professeur particulier de français pour **Trân**, vietnamienne débutante absolue (**A0**).

## Version

- **v1.0.1**
- **Build 2**
- Phase **PWA-1 — Foundation**

## Correctif v1.0.1 / Build 2

- blocage explicite de la traduction automatique du navigateur (`notranslate` + `translate="no"`) ;
- interface apprenante conservée en vietnamien ;
- nom visible de la PWA : **Tiếng Pháp cùng Luc** ;
- seuls les mots et phrases étudiés restent en français.

## V1 fonctionnelle

- interface mobile-first en vietnamien (~95 %) avec français introduit par petites touches (~5 %) ;
- **Bài 1 — Bonjour** complète et interactive ;
- `Bonjour`, `Merci`, `Au revoir`, `Je m'appelle Trân.` ;
- lecture audio française via `speechSynthesis` du navigateur ;
- conversation guidée déterministe ;
- révisions `Khó / Được / Dễ` ;
- progression non gamifiée ;
- persistance `localStorage` ;
- diagnostics discrets ;
- manifest PWA + service worker ;
- fonctionnement hors-ligne après première visite ;
- aucune clé API dans le navigateur.

## Exécution locale

Aucune dépendance ni compilation n'est nécessaire.

```bash
python -m http.server 8080
```

Puis ouvrir `http://localhost:8080`.

## GitHub Pages

Le workflow `.github/workflows/pages.yml` déploie automatiquement le contenu statique de `main` vers GitHub Pages.

Dans **Settings → Pages**, utiliser **GitHub Actions** comme source si GitHub ne l'active pas automatiquement.

## Future IA

`api/tutor.mjs` documente le futur adaptateur **serveur** OpenAI. Il n'est volontairement pas appelé par la PWA V1, car GitHub Pages n'exécute pas de backend.

La clé `OPENAI_API_KEY` doit rester côté serveur. L'exemple utilise la Responses API et `store: false`.

## Roadmap

### PWA-2 — Voice
- micro ;
- conversation vocale ;
- vraie entrée audio ;
- feedback de prononciation uniquement quand l'audio le permet.

### PWA-3 — Learning Memory
- backend persistant multi-appareils ;
- erreurs récurrentes ;
- répétition espacée intelligente ;
- historique.

### PWA-4 — Curriculum A0 → A1
- programme complet ;
- ratios vietnamien/français adaptatifs ;
- situations de vie réelle ;
- progression structurée jusqu'à A1.
