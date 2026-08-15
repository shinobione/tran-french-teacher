from pathlib import Path
import os
import re
import subprocess
import sys

ROOT = Path('.')
SEARCH_DIRS = [Path('src/core'), Path('src/pedagogy'), Path('src/ui'), Path('src/premium'), Path('tests/smoke')]


def rel_from_module(source: Path, target: Path) -> str:
    rel = os.path.relpath(target, source.parent).replace(os.sep, '/')
    return rel if rel.startswith('.') else './' + rel


def build_mapping():
    mapping = {}
    duplicates = set()
    for base in SEARCH_DIRS:
        if not base.exists():
            continue
        for p in base.iterdir():
            if not p.is_file():
                continue
            if p.name in mapping and mapping[p.name] != p.as_posix():
                duplicates.add(p.name)
            mapping[p.name] = p.as_posix()
    if duplicates:
        raise SystemExit('duplicate basenames cannot be auto-rewired: ' + ', '.join(sorted(duplicates)))
    return mapping


def protect_module_relative(text: str, source: Path, mapping: dict[str, str]):
    placeholders = {}
    counter = 0

    # Static import/export specifiers and dynamic import() resolve relative to the module file,
    # unlike DOM-created script/link URLs which resolve against the document URL.
    patterns = [
        re.compile(r"(?P<prefix>\bimport\s+(?:[^;\n]*?\s+from\s+)?)(?P<q>['\"])(?P<url>\./[^'\"]+)(?P=q)"),
        re.compile(r"(?P<prefix>\bexport\s+[^;\n]*?\s+from\s+)(?P<q>['\"])(?P<url>\./[^'\"]+)(?P=q)"),
        re.compile(r"(?P<prefix>\bimport\s*\(\s*)(?P<q>['\"])(?P<url>\./[^'\"]+)(?P=q)(?P<suffix>\s*\))"),
        re.compile(r"(?P<prefix>new\s+URL\(\s*)(?P<q>['\"])(?P<url>\./[^'\"]+)(?P=q)(?P<suffix>\s*,\s*import\.meta\.url\s*\))"),
    ]

    def mask(match):
        nonlocal counter
        raw = match.group('url')
        base, suffix = raw, ''
        cut = len(raw)
        for sep in ('?', '#'):
            i = raw.find(sep)
            if i != -1:
                cut = min(cut, i)
        base, suffix = raw[:cut], raw[cut:]
        name = Path(base).name
        if name in mapping:
            rewritten = rel_from_module(source, Path(mapping[name])) + suffix
        else:
            rewritten = raw
        token = f'__FTQ_MODULE_URL_{counter}__'
        counter += 1
        prefix = match.groupdict().get('prefix') or ''
        q = match.group('q')
        end = match.groupdict().get('suffix') or ''
        placeholders[token] = f'{prefix}{q}{rewritten}{q}{end}'
        return token

    for pattern in patterns:
        text = pattern.sub(mask, text)
    return text, placeholders


def rewire_js(source: Path, mapping: dict[str, str]):
    text = source.read_text(encoding='utf-8')
    masked, placeholders = protect_module_relative(text, source, mapping)
    out = masked

    # Runtime/document URLs preserve their original root-document semantics by pointing to the
    # new repository location. This covers script.src, link.href, browser smoke injection, etc.
    for name, target in sorted(mapping.items(), key=lambda kv: -len(kv[0])):
        out = out.replace('./' + name, './' + target)

    for token, value in placeholders.items():
        out = out.replace(token, value)

    if out != text:
        source.write_text(out, encoding='utf-8')
        return True
    return False


def verify(mapping: dict[str, str]):
    # Syntax-check all moved JS.
    for base in SEARCH_DIRS:
        if not base.exists():
            continue
        for p in sorted(base.glob('*.js')):
            result = subprocess.run(['node', '--check', str(p)], capture_output=True, text=True)
            if result.returncode:
                raise SystemExit(f'node --check failed for {p}: {result.stderr}')

    # Required document-root runtime URLs that are known CI contracts.
    required = {
        Path('src/core/theme-controller.js'): [
            './src/premium/premium-theme-polish.css',
            './src/premium/premium-v5-fidelity-reset.js',
            './src/premium/premium-v59-interactions.css',
            './src/premium/premium-v59-interactions.js',
            './src/premium/premium-v59-lesson-layout.css',
            './src/premium/premium-v59-lesson-layout.js',
            './src/premium/premium-v59-system.css',
            './src/premium/premium-v59-system.js',
        ],
        Path('src/core/build-meta.js'): [
            './src/pedagogy/speaking-loop-content.css',
            './src/pedagogy/speaking-loop-content.js',
            './tests/smoke/speaking-loop-smoke.js',
            './tests/smoke/speaking-loop-variety-smoke.js',
            './tests/smoke/build30-architecture-smoke.js',
            './tests/smoke/v2-release-smoke.js',
        ],
    }
    for p, needles in required.items():
        text = p.read_text(encoding='utf-8')
        missing = [n for n in needles if n not in text]
        if missing:
            raise SystemExit(f'{p} missing rewired runtime URLs: {missing}')

    # Frozen module-relative architecture imports must remain valid after relocation.
    build_meta = Path('src/core/build-meta.js').read_text(encoding='utf-8')
    bridge = Path('src/core/runtime-bridge.js').read_text(encoding='utf-8')
    if "import './runtime-contracts.js?v=2.0.0-b30'" not in build_meta:
        raise SystemExit('Build 30 contract import topology changed unexpectedly')
    if "import './runtime-bridge.js?v=2.0.0-b30'" not in build_meta:
        raise SystemExit('Build 30 bridge import topology changed unexpectedly')
    if "from './runtime-contracts.js?v=2.0.0-b30'" not in bridge:
        raise SystemExit('runtime-bridge contract import topology changed unexpectedly')

    # Protected legacy sanctuaries stay byte-identical.
    result = subprocess.run([
        'git', 'diff', '--exit-code', 'HEAD', '--',
        'app.js', 'voice-ios.js', 'free-voice.js', 'assets/LOGO.png', 'assets/Favicon.png'
    ])
    if result.returncode:
        raise SystemExit('protected sanctuary diff detected')


def main():
    mapping = build_mapping()
    changed = []
    for base in SEARCH_DIRS:
        if not base.exists():
            continue
        for p in sorted(base.glob('*.js')):
            if rewire_js(p, mapping):
                changed.append(p.as_posix())
    verify(mapping)
    print(f'Runtime URL rewire changed {len(changed)} JS files:')
    for p in changed:
        print(' -', p)


if __name__ == '__main__':
    main()
