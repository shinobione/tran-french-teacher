from pathlib import Path
import subprocess

BASE='4019c1b6cb41fee9c36bdb223e255455a0da4b5f'
MAIN=BASE
CHECKPOINTS='''- **V5.9A / PR #130** — interaction coherence — merge `5d25b6079dd8115149356bdf3dcb3133fee606e0`;
- **V5.9B / PR #131** — shared Lesson/Eiffel layout — merge `45e7d2a62a635b4448ea16250c53e092390e5464`;
- **V5.9C / PR #132** — shared Premium controls + hidden DEBUG entry — merge `3c6ecce404efa62723bfb0b10c85da6bbbfda1ed`;
- **V5.9D / PR #133** — Premium goat favicon/PWA icon family — merge `48aed8e2fca0b6dacec8f9a4a5e257b16bad67ef`;
- **V5.9E / PR #134** — aggregate technical QA checkpoint — merge `4019c1b6cb41fee9c36bdb223e255455a0da4b5f`.'''

t=subprocess.check_output(['git','show',f'{BASE}:MASTER-ROADMAP.md'],text=True)
t=t.replace('| Visual maintenance line | **Premium V5.8 merged · V5.9 next** |','| Visual maintenance line | **Premium V5.9 technically closed · V5.10 physical field gate next** |')
t=t.replace('| Verified `main` checkpoint at reconciliation | **`bf196a101e9d444650390e94a9ba8adf5f19009c`** |',f'| Verified `main` checkpoint at reconciliation | **`{MAIN}`** |')
t=t.replace('- V5.8 DEBUG FR / theme decoupling was merged as PR #128.\n- The next active runtime slice is **V5.9 — Shared UI Coherence + Fluidity / Premium Feel**.\n- V5.9 is **not** a theme-by-theme patch march.\n- The physical installed-iPhone/PWA final Premium verdict remains reserved for V5.10.', '- V5.8 DEBUG FR / theme decoupling was merged as PR #128.\n- V5.9 shared UI coherence was delivered as independently revertable PRs **#130–#134**.\n- V5.9 technical work is closed at `4019c1b6cb41fee9c36bdb223e255455a0da4b5f`.\n- The next active gate is **V5.10 — physical installed-iPhone/PWA Premium verdict**.')
t=t.replace('→ V5.9 Shared UI Coherence + Fluidity / Premium Feel\n→ V5.10 Global Visual QA + Physical iPhone verdict','→ V5.9 Shared UI Coherence + Fluidity / Premium Feel ✅\n→ V5.10 Global Visual QA + Physical iPhone verdict')
old='# 6. V5.9 — Shared UI Coherence + Fluidity / Premium Feel — ACTIVE NEXT\n\n## Goal\n'
if old not in t:
    raise SystemExit('V5.9 section header not found in base MASTER')
close=f'''# 6. V5.9 — Shared UI Coherence + Fluidity / Premium Feel — TECHNICALLY CLOSED\n\n> **Historical execution specification retained below on purpose.** The original field findings, design contracts and DoD remain here as durable evidence; this section is no longer the active next phase.\n\n## Technical closeout — 2026-08-15\n\n{CHECKPOINTS}\n\nV5.9 is technically closed. **V5.10 owns the real installed-iPhone / Safari / PWA verdict.** Issue #114 therefore remains OPEN and Build 35 remains BLOCKED / RESERVED.\n\nThe earlier “stop at candidate PR” agent policy is retained below as historical phase policy; this run continued through CI/merge only because the user explicitly delegated autonomous execution with rollback checkpoints.\n\n## Goal\n'''
t=t.replace(old,close)
# Mark only the V5.9 Definition of Done checklist as technically completed while preserving its wording.
start=t.index('## 6.7 V5.9 Definition of Done')
end=t.index('## 6.8 V5.9 execution policy',start)
chunk=t[start:end].replace('- [ ]','- [x]')
t=t[:start]+chunk+t[end:]
Path('MASTER-ROADMAP.md').write_text(t,encoding='utf-8')
