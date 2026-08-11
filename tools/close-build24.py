from pathlib import Path
import os, re, sys

root = Path('.')
meta = (root/'build-meta.js').read_text(encoding='utf-8')
if "version: '1.17.0', build: 24" not in meta:
    raise SystemExit('Refuse close: branch base is not v1.17.0 Build 24')

quality = os.environ.get('QUALITY_RUN', '?')
pages = os.environ.get('PAGES_RUN', '?')
base_sha = os.environ.get('BASE_SHA', '?')

def write(path, text):
    (root/path).write_text(text, encoding='utf-8')

# README: switch candidate -> production, keep audited candidate details.
p = root/'README.md'
s = p.read_text(encoding='utf-8')
s = s.replace('## Candidat actuel', '## Version en production', 1)
s = s.replace('- statut : **CANDIDAT / branche `build24-real-life-french-2`**', '- statut : **PROD / GitHub Pages**', 1)
s = s.replace('Build 24 ne sera déclaré `PROD / CLOS` qu’après PR, `main` et GitHub Pages verts.',
'''## Preuves de production\n\n- PR #20 : **SUCCESS** ;\n- commit `main` : `''' + base_sha + '''` ;\n- CI `main` run #''' + quality + ''' : **SUCCESS** ;\n- GitHub Pages run #''' + pages + ''' : **SUCCESS** ;\n- smoke ancien utilisateur leçon 8 : **SUCCESS** ;\n- profils Real Life l15 / l20 : **SUCCESS** ;\n- Error / Listening / Adaptive Language : **non régressés**.\n\n## Prochain build\n\n**v1.18.0 — Build 25 — Real Life French III** : problèmes, émotions et conversations moins guidées, toujours sans augmenter la complexité du shell.''', 1)
write('README.md', s)

# CHANGELOG: candidate section becomes release, Unreleased points to Build 25.
p = root/'CHANGELOG.md'
s = p.read_text(encoding='utf-8')
s = s.replace('## [Unreleased]\n\n### v1.17.0 — Build 24 — Real Life French II — candidat',
'''## [Unreleased]\n\n- prochain jalon : **v1.18.0 — Build 25 — Real Life French III**.\n\n---\n\n## [1.17.0] — Build 24 — Real Life French II — 2026-08-11''', 1)
s = s.replace('Reste Unreleased jusqu’à PR → `main` → GitHub Pages.',
'''- PR #20 : SUCCESS ;\n- commit `main` : `''' + base_sha + '''` ;\n- CI `main` run #''' + quality + ''' : SUCCESS ;\n- GitHub Pages run #''' + pages + ''' : SUCCESS.''', 1)
write('CHANGELOG.md', s)

# ROADMAP: replace Build24 in-progress block with concise closed evidence, preserve Build25 and later.
p = root/'ROADMAP.md'
s = p.read_text(encoding='utf-8')
start = s.find('# v1.17.0 — Build 24 — Real Life French II — 🔥 EN COURS')
end = s.find('# v1.18.0 — Build 25 — Real Life French III — PROCHAIN')
if start < 0 or end < 0 or end <= start:
    raise SystemExit('Could not locate Build24/Build25 roadmap blocks')
closed = f'''# v1.17.0 — Build 24 — Real Life French II — ✅ CLOS\n\n## Résultat\n\n- Pack II : **10 situations / 30 tours** ;\n- Scenario total : **28 situations / 84 tours** ;\n- Real Life I + II ajoutés : **16 situations / 48 tours** ;\n- profil l20 : **17 situations personnelles ouvertes** grâce à la réutilisation du scénario historique `appel-jerry` ;\n- catalogue apprenante : **6 situations ouvertes max + 2 futures max** visibles par défaut ;\n- aucune nouvelle clé apprenant ;\n- progression l8 conservée ;\n- logo/favicon/voice/free-voice inchangés.\n\n### Preuves\n\n- PR #20 : SUCCESS ;\n- merge `main` : `{base_sha}` ;\n- CI `main` run #{quality} : SUCCESS ;\n- GitHub Pages run #{pages} : SUCCESS ;\n- smoke l8 : SUCCESS ;\n- smoke l15 : Pack II=5 / visibles=6 ;\n- smoke l20 : Pack II=10 / personnelles=17 / visibles=6 ;\n- Error / Listening / Adaptive : non régressés.\n\n---\n\n'''
s = s[:start] + closed + s[end:]
write('ROADMAP.md', s)

# Build24 dossier: mark status and checklist, record evidence.
p = root/'docs/BUILD-24-REAL-LIFE-FRENCH-II.md'
s = p.read_text(encoding='utf-8')
s = s.replace('# Build 24 — Real Life French II', '# Build 24 — Real Life French II\n\n## Statut\n\n**v1.17.0 — Build 24 — PROD / CLOS — 2026-08-11**', 1)
s = s.replace('- [ ] Scenario total 28 / 84 validé ;','- [x] Scenario total 28 / 84 validé ;')
s = s.replace('- [ ] références d’items valides ;','- [x] références d’items valides ;')
s = s.replace('- [ ] smoke l8 vert ;','- [x] smoke l8 vert ;')
s = s.replace('- [ ] smoke l15 : pack II=5, visibles=6 ;','- [x] smoke l15 : pack II=5, visibles=6 ;')
s = s.replace('- [ ] smoke l20 : pack II=10, catalogue personnel=17, visibles=6 ;','- [x] smoke l20 : pack II=10, catalogue personnel=17, visibles=6 ;')
s = s.replace('- [ ] Error / Listening / Adaptive verts ;','- [x] Error / Listening / Adaptive verts ;')
s = s.replace('- [ ] hashes sanctuaires verts ;','- [x] hashes sanctuaires verts ;')
s = s.replace('- [ ] PR verte ;','- [x] PR #20 verte ;')
s = s.replace('- [ ] main vert ;',f'- [x] main run #{quality} vert ;')
s = s.replace('- [ ] Pages verte ;',f'- [x] Pages run #{pages} verte ;')
s = s.replace('- [ ] docs release CLOS.','- [x] docs release CLOS.')
s += f'''\n\n## Preuves finales\n\n- commit production : `{base_sha}` ;\n- CI `main` : run #{quality} SUCCESS ;\n- GitHub Pages : run #{pages} SUCCESS.\n'''
write('docs/BUILD-24-REAL-LIFE-FRENCH-II.md', s)

print('Build24 release docs closed for', base_sha, 'quality', quality, 'pages', pages)
