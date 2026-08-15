from pathlib import Path
import re

MAIN = '4019c1b6cb41fee9c36bdb223e255455a0da4b5f'
CHECKPOINTS = '''- **V5.9A / PR #130** — interaction coherence — merge `5d25b6079dd8115149356bdf3dcb3133fee606e0`;
- **V5.9B / PR #131** — shared Lesson/Eiffel layout — merge `45e7d2a62a635b4448ea16250c53e092390e5464`;
- **V5.9C / PR #132** — shared Premium controls + hidden DEBUG entry — merge `3c6ecce404efa62723bfb0b10c85da6bbbfda1ed`;
- **V5.9D / PR #133** — Premium goat favicon/PWA icon family — merge `48aed8e2fca0b6dacec8f9a4a5e257b16bad67ef`;
- **V5.9E / PR #134** — aggregate technical QA checkpoint — merge `4019c1b6cb41fee9c36bdb223e255455a0da4b5f`.'''


def between(text, start, end, replacement):
    if start not in text or end not in text:
        raise SystemExit(f'missing section boundary: {start!r} / {end!r}')
    a = text.index(start)
    b = text.index(end, a)
    return text[:a] + replacement.rstrip() + '\n\n' + text[b:]


# PROJECT-STATE.md
p = Path('PROJECT-STATE.md')
t = p.read_text(encoding='utf-8')
pat = r"- Verified `main` HEAD at reconciliation:.*?- The Codex review panel seen after V5\.8 contained V5\.8-era changes already merged; do \*\*not\*\* treat that panel as durable V5\.9 project state\.\n"
repl = f'''- Verified `main` HEAD at reconciliation: **`{MAIN}`**.
- That commit is the merge of PR **#134 — V5.9E global Premium QA checkpoint**.
- Premium gate issue: **#114 OPEN**.
- **V5.9 is technically closed in git**, split into five independently revertable checkpoints (#130→#134).
- **V5.10 physical iPhone / Safari / installed-PWA verdict is now the active gate.**
- Build 35 remains blocked/reserved until that field gate is explicitly passed and #114 is closed.
'''
t, n = re.subn(pat, repl, t, flags=re.S)
assert n == 1, n
t = t.replace('| Visual line | **Premium V5.8 merged · V5.9 field-coherence specification active** |', '| Visual line | **Premium V5.9 technically closed · V5.10 physical field gate active** |')
closeout = f'''## Premium V5.9 technical closeout — merged 2026-08-15

The V5.9 field findings were resolved as **shared-system changes**, not four independent theme patch stacks.

### Rollback chain

{CHECKPOINTS}

### Technically delivered

- Speaking Loop duplicate self-record CTA / local-only note guarded to one instance per speaking card;
- Settings `Giới thiệu` / About promoted to a whole-card hit target while preserving its underlying action;
- Real Life receives one shared Premium line-icon treatment;
- Lesson/Today card identity cluster and Eiffel decoration now share one cross-theme geometry contract;
- shared Premium card / CTA / icon-circle / focus / press grammar added without route crossfade ownership;
- DEBUG FR remains theme-independent and gains a discreet admin entry (long-press Settings title + desktop fallback), with no permanent learner-facing DEBUG button;
- new goat-derived favicon / Apple Touch / PWA icon family is stored under `assets/premium/brand/`; historical `assets/Favicon.png` remains intact;
- aggregate V5.9 QA checkpoint exists separately from the product slices.

### What this does **not** certify

Automation does **not** certify the final installed-iPhone visual/gesture experience. V5.9 technical closure is therefore **not** the final Premium user PASS and does not close issue #114.
'''
t = between(t, '## Premium V5.9 field findings — user screenshots 2026-08-15', '## Canonical next action', closeout)
nextsec = '''## Canonical next action

**Do not start Build 35. Do not auto-chain beyond the field gate.**

The next phase is:

### Premium V5.10 — Global Visual QA + Physical iPhone Verdict

Required next action is a **real-device validation**, not another speculative CSS pass:

1. deploy/refresh current `main` at the V5.9 technical checkpoint;
2. validate Original / Aurora / Sunset / Nocturne on the installed iPhone/PWA;
3. verify one self-record CTA + one note in Speaking Loop;
4. verify full-card `Giới thiệu` tap target;
5. verify Real Life icon quality;
6. verify Lesson identity never overlaps Eiffel art;
7. verify hidden DEBUG entry under every theme without leaking into learner UI;
8. verify new favicon / home-screen / PWA icon family on-device;
9. recheck ZERO route flash / ZERO competing facades and reduced-motion functionality;
10. only after explicit user PASS: close #114, finish Build 34 governance/docs closure, then unlock Build 35.

```text
V5.8 merged
→ V5.9 technical slices #130→#134 merged
→ V5.10 physical iPhone / PWA verdict  ← ACTIVE NEXT
→ explicit user PASS
→ close #114
→ Build 34 governance/docs closure
→ Build 35
```
'''
t = between(t, '## Canonical next action', '## Runtime / asset policy for this checkpoint', nextsec)
runtime = '''## Runtime / asset policy for this checkpoint

This closeout is **docs-only**. The V5.9 runtime already lives on `main` through PRs #130–#134.

- do not reopen V5.9 with speculative visual patches before the physical V5.10 verdict;
- no learner-data/store migration;
- no voice/audio semantic change;
- no Premium background regeneration;
- keep locked Eiffel/background assets stable unless V5.10 produces a concrete field defect;
- Build 35 remains unavailable for CSS/assets/animation/cache/DEBUG/visual QA work.
'''
t = between(t, '## Runtime / asset policy for this checkpoint', '## Protected sanctuaries', runtime)
t = t.replace('6. Read V5.9 + V5.10 in MASTER-ROADMAP.md.', '6. Read the V5.9 closeout + V5.10 field gate in MASTER-ROADMAP.md.')
p.write_text(t, encoding='utf-8')

# MASTER-ROADMAP.md
p = Path('MASTER-ROADMAP.md')
t = p.read_text(encoding='utf-8')
t = t.replace('| Visual maintenance line | **Premium V5.8 merged · V5.9 next** |', '| Visual maintenance line | **Premium V5.9 technically closed · V5.10 physical field gate next** |')
t = t.replace('| Verified `main` checkpoint at reconciliation | **`bf196a101e9d444650390e94a9ba8adf5f19009c`** |', f'| Verified `main` checkpoint at reconciliation | **`{MAIN}`** |')
t = t.replace('- V5.8 DEBUG FR / theme decoupling was merged as PR #128.\n- The next active runtime slice is **V5.9 — Shared UI Coherence + Fluidity / Premium Feel**.\n- V5.9 is **not** a theme-by-theme patch march.\n- The physical installed-iPhone/PWA final Premium verdict remains reserved for V5.10.', '- V5.8 DEBUG FR / theme decoupling was merged as PR #128.\n- V5.9 shared UI coherence was delivered as independently revertable PRs **#130–#134**.\n- V5.9 technical work is closed at `4019c1b6cb41fee9c36bdb223e255455a0da4b5f`.\n- The next active gate is **V5.10 — physical installed-iPhone/PWA Premium verdict**.')
t = t.replace('→ V5.9 Shared UI Coherence + Fluidity / Premium Feel\n→ V5.10 Global Visual QA + Physical iPhone verdict', '→ V5.9 Shared UI Coherence + Fluidity / Premium Feel ✅\n→ V5.10 Global Visual QA + Physical iPhone verdict')
section = f'''# 6. V5.9 — Shared UI Coherence + Fluidity / Premium Feel — TECHNICALLY CLOSED

## Goal reached

V5.9 converted the user-reported Premium defects into shared, cross-theme contracts instead of adding four stacks of per-theme patches.

## Rollback checkpoints

{CHECKPOINTS}

Each merge is intentionally isolated enough to revert without throwing away the full V5.9 line.

## Delivered contract

- one Speaking Loop self-record CTA + one local-only note per speaking card;
- whole-card `Giới thiệu` / About hit target;
- shared Premium Real Life icon treatment;
- one cross-theme Lesson/Today identity/Eiffel layout contract;
- shared Premium card/button/icon interaction language;
- local-only motion/press/focus polish with **no route crossfade ownership**;
- discreet DEBUG/admin access under all four themes while V5.8 state decoupling stays intact;
- goat-derived favicon/Apple Touch/PWA family under `assets/premium/brand/`, without overwriting historical protected `assets/Favicon.png`;
- aggregate technical QA checkpoint separated from product runtime slices.

## Technical closure vs final product closure

V5.9 is **technically closed**, but the Premium programme is **not yet user-closed**.

The following remain V5.10-only physical checks:

- installed iPhone / Safari / PWA composition;
- real tap ergonomics and hidden DEBUG long-press;
- home-screen/PWA icon appearance;
- route flash/remanence under physical use;
- user visual verdict across Original/Aurora/Sunset/Nocturne.

Therefore issue **#114 remains OPEN** and Build 35 remains **BLOCKED / RESERVED**.
'''
t = between(t, '# 6. V5.9 — Shared UI Coherence + Fluidity / Premium Feel — ACTIVE NEXT', '# 7. V5.10 — Final Premium QA / Physical gate', section)
p.write_text(t, encoding='utf-8')

# CHANGELOG.md
p = Path('CHANGELOG.md')
t = p.read_text(encoding='utf-8')
unreleased = '''## [Unreleased]

- **Premium V5.9 — TECHNICALLY CLOSED / FIELD PASS PENDING**:
  - PR #130 / merge `5d25b6079dd8115149356bdf3dcb3133fee606e0` — duplicate Speaking Loop CTA/note guard, whole-card About hit target, shared Real Life icon;
  - PR #131 / merge `45e7d2a62a635b4448ea16250c53e092390e5464` — shared cross-theme Lesson/Eiffel geometry;
  - PR #132 / merge `3c6ecce404efa62723bfb0b10c85da6bbbfda1ed` — shared Premium cards/CTA controls + hidden DEBUG entry;
  - PR #133 / merge `48aed8e2fca0b6dacec8f9a4a5e257b16bad67ef` — goat-derived favicon/Apple Touch/PWA icon family without overwriting historical `assets/Favicon.png`;
  - PR #134 / merge `4019c1b6cb41fee9c36bdb223e255455a0da4b5f` — aggregate V5.9 technical QA checkpoint;
- **Premium V5.10 is the active next gate**: physical installed-iPhone/PWA visual + gesture verdict across all four themes;
- issue **#114 remains OPEN** until explicit final user PASS;
- Build 35 remains **BLOCKED / RESERVED** until V5.10 PASS + #114 closure;
- Foundations F01–F04 and the earlier Listening/voice field confirmations remain independent learner-side validation items.
'''
t = between(t, '## [Unreleased]', '---', unreleased)
p.write_text(t, encoding='utf-8')

# README.md
p = Path('README.md')
t = p.read_text(encoding='utf-8')
anchor = '- cible principale : **iPhone / Safari / PWA iOS**.\n'
if anchor not in t:
    raise SystemExit('README baseline anchor missing')
block = f'''\n## ✨ Premium V5.9 — technical closeout

La ligne Premium V5.9 est désormais **techniquement fermée** sur `main` **`{MAIN}`**, en cinq checkpoints indépendamment revertables : **PR #130 → #134**.

Elle couvre la cohérence Speaking/About/Real Life, un layout Lesson/Eiffel commun aux quatre thèmes, une grammaire Premium partagée pour cartes/CTA/icônes, un accès DEBUG discret et indépendant du thème, ainsi qu’une nouvelle famille favicon/Apple Touch/PWA goat-derived sous `assets/premium/brand/`.

**Le verdict produit final n’est pas encore prononcé** : V5.10 doit encore être validée sur le vrai iPhone / Safari / PWA installé. Issue **#114 reste ouverte** et Build 35 reste bloqué jusque-là.
'''
if '## ✨ Premium V5.9 — technical closeout' not in t:
    t = t.replace(anchor, anchor + block)
p.write_text(t, encoding='utf-8')

# ROADMAP.md
p = Path('ROADMAP.md')
t = p.read_text(encoding='utf-8')
marker = '# Build 35 — Memory Evidence v2 / Migration Readiness — NEXT DESIGN'
if marker not in t:
    raise SystemExit('ROADMAP Build35 marker missing')
gate = f'''# Premium gate before Build 35 — V5.10 PHYSICAL FIELD PASS

V5.9 is technically closed through PRs **#130–#134**, ending at `{MAIN}`.

Before Build 35 can start:

- [ ] real installed-iPhone/PWA pass across Original / Aurora / Sunset / Nocturne;
- [ ] confirm Speaking Loop has one record CTA + one note;
- [ ] confirm full-card About tap;
- [ ] confirm Lesson/Eiffel separation;
- [ ] confirm hidden DEBUG entry and no learner-facing leak;
- [ ] confirm new home-screen/PWA icon quality;
- [ ] explicit final user PASS;
- [ ] close Premium issue #114.

**Build 35 is reserved and blocked until every gate above is closed.**

---

# Build 35 — Memory Evidence v2 / Migration Readiness — BLOCKED / RESERVED'''
t = t.replace(marker, gate)
p.write_text(t, encoding='utf-8')
