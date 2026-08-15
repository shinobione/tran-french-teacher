from pathlib import Path
import os
import re
import subprocess
import sys

ROOT = Path('.')
WF_DIR = Path('.github/workflows')
BROWSER_DIR = Path('tests/browser')
TEMP_WORKFLOW = '_repo-layout-ci-semantics-temp.yml'
STAGE_DIR = Path('.repo-layout-ci-workflows')


def note(msg):
    print(f'::notice title=Repo layout CI::{msg}', flush=True)


def fail(msg):
    print(f'::error title=Repo layout CI::{msg}', flush=True)
    raise SystemExit(msg)


def fix_workflow(text: str, name: str) -> tuple[str, list[str]]:
    changes = []
    out_lines = []
    for line in text.splitlines(keepends=True):
        original = line

        # premium-theme-polish.css moved into src/premium/, but its @imports remain
        # stylesheet-relative. The first mechanical migration incorrectly changed the
        # *expected source string* in static greps to a document-root path.
        if 'src/premium/premium-theme-polish.css' in line:
            matches = list(re.finditer(r'src/premium/(premium-[A-Za-z0-9._-]+\.css(?:\?[^\s\"\']*)?)', line))
            if len(matches) >= 2:
                # Keep the last occurrence: it is the workflow operand (the file under test).
                pieces = []
                pos = 0
                for m in matches[:-1]:
                    pieces.append(line[pos:m.start()])
                    pieces.append('./' + m.group(1))
                    pos = m.end()
                pieces.append(line[pos:])
                line = ''.join(pieces)
            # Exact tail assertions contain ./src/premium/... in the expected string.
            line = line.replace("@import url('./src/premium/premium-nav-geometry-hotfix.css", "@import url('./premium-nav-geometry-hotfix.css")

        # Build 30's ES imports remain relative because runtime-contracts/runtime-bridge
        # moved together with build-meta into src/core/.
        if name in {'build30-architecture-hardening.yml', 'v2-release-freeze.yml'}:
            line = line.replace('src/core/runtime-contracts.js?v=2.0.0-b30', './runtime-contracts.js?v=2.0.0-b30')
            line = line.replace('src/core/runtime-bridge.js?v=2.0.0-b30', './runtime-bridge.js?v=2.0.0-b30')

        # Blind filename rewrites accidentally changed temporary OUTPUT paths. Test inputs
        # live under tests/browser; /tmp diagnostics do not.
        line = re.sub(r'/tmp/tests/browser/([^\s\"\']+)', r'/tmp/\1', line)
        line = re.sub(r'/tmp/tests/smoke/([^\s\"\']+)', r'/tmp/\1', line)
        line = re.sub(r'/tmp/src/(?:core|pedagogy|ui|premium)/([^\s\"\']+)', r'/tmp/\1', line)

        if line != original:
            changes.append(original.rstrip('\n') + '  ==>  ' + line.rstrip('\n'))
        out_lines.append(line)
    return ''.join(out_lines), changes


def fix_workflows():
    total = 0
    touched = []
    for p in sorted(WF_DIR.glob('*.yml')):
        if p.name == TEMP_WORKFLOW:
            continue
        text = p.read_text(encoding='utf-8')
        out, changes = fix_workflow(text, p.name)
        if out != text:
            p.write_text(out, encoding='utf-8')
            total += len(changes)
            touched.append((p, changes))
    note(f'workflow semantics: {total} line rewrites across {len(touched)} workflows')
    for p, changes in touched:
        print(f'--- {p} ({len(changes)})')
        for change in changes:
            print(change)
    return touched


def unique_target_by_basename(name: str):
    hits = [p for base in (Path('src'), Path('tests')) for p in base.rglob(name) if p.is_file()]
    return hits[0] if len(hits) == 1 else None


def fix_tool_requires():
    touched = []
    pattern = re.compile(r"require\((['\"])(\.\./([^/'\"]+\.(?:js|json)))\1\)")
    for p in sorted(Path('tools').rglob('*')):
        if not p.is_file() or p.suffix not in {'.js', '.cjs', '.mjs'}:
            continue
        text = p.read_text(encoding='utf-8')

        def repl(m):
            quote, raw, basename = m.group(1), m.group(2), m.group(3)
            current = (p.parent / raw).resolve()
            if current.exists():
                return m.group(0)
            target = unique_target_by_basename(basename)
            if not target:
                return m.group(0)
            rel = os.path.relpath(target, p.parent).replace(os.sep, '/')
            if not rel.startswith('.'):
                rel = './' + rel
            return f'require({quote}{rel}{quote})'

        out = pattern.sub(repl, text)
        if out != text:
            p.write_text(out, encoding='utf-8')
            touched.append(p)
    note('tool relative requires fixed: ' + (', '.join(map(str, touched)) if touched else 'none'))
    return touched


def fix_browser_harnesses():
    touched = []
    for p in sorted(BROWSER_DIR.glob('*.html')):
        text = p.read_text(encoding='utf-8')
        out = text

        # Any harness that still points to ./index.html or ./? after moving two levels down
        # would load tests/browser/index.html instead of the app root.
        out = re.sub(r"(?P<q>['\"])\./index\.html(?P<tail>[?#][^'\"]*)?(?P=q)",
                     lambda m: f"{m.group('q')}../../index.html{m.group('tail') or ''}{m.group('q')}", out)
        out = re.sub(r"(?P<q>['\"])\./\?(?P<tail>[^'\"]*)(?P=q)",
                     lambda m: f"{m.group('q')}../../?{m.group('tail')}{m.group('q')}", out)

        # V5.10 compares the iframe app's literal runtime src attribute. Those values are
        # document-root URLs, not URLs relative to the tribunal file itself.
        if p.name == 'premium-v510-practice-icons-tribunal.html':
            out = out.replace("'../../assets/premium/practice/", "'./assets/premium/practice/")
            out = out.replace('"../../assets/premium/practice/', '"./assets/premium/practice/')

        if out != text:
            p.write_text(out, encoding='utf-8')
            touched.append(p)
    note('browser harness semantics fixed: ' + (', '.join(map(str, touched)) if touched else 'none'))
    return touched


def verify():
    # No stale temporary-output path rewrites.
    offenders = []
    for p in WF_DIR.glob('*.yml'):
        if p.name == TEMP_WORKFLOW:
            continue
        text = p.read_text(encoding='utf-8')
        if '/tmp/tests/browser/' in text or '/tmp/tests/smoke/' in text or '/tmp/src/' in text:
            offenders.append(str(p))
    if offenders:
        fail('stale /tmp migrated paths: ' + ', '.join(offenders))

    # Same-directory Premium @import expectations must not contain ./src/premium/.
    for p in WF_DIR.glob('*.yml'):
        if p.name == TEMP_WORKFLOW:
            continue
        for line in p.read_text(encoding='utf-8').splitlines():
            if 'src/premium/premium-theme-polish.css' in line and "'src/premium/premium-" in line:
                fail(f'over-prefixed premium-theme expectation remains in {p}: {line}')
            if "@import url('./src/premium/" in line:
                fail(f'over-prefixed exact @import remains in {p}: {line}')

    # Frozen Build 30 source topology.
    meta = Path('src/core/build-meta.js').read_text(encoding='utf-8')
    bridge = Path('src/core/runtime-bridge.js').read_text(encoding='utf-8')
    if "import './runtime-contracts.js?v=2.0.0-b30'" not in meta:
        fail('build-meta runtime-contracts import changed')
    if "import './runtime-bridge.js?v=2.0.0-b30'" not in meta:
        fail('build-meta runtime-bridge import changed')
    if "from './runtime-contracts.js?v=2.0.0-b30'" not in bridge:
        fail('runtime-bridge contract import changed')

    for wf in ('build30-architecture-hardening.yml', 'v2-release-freeze.yml'):
        text = (WF_DIR / wf).read_text(encoding='utf-8')
        if 'src/core/runtime-contracts.js?v=2.0.0-b30' in text or 'src/core/runtime-bridge.js?v=2.0.0-b30' in text:
            fail(f'Build30 relative import assertion still over-prefixed in {wf}')

    # Browser harness navigations that explicitly name index.html must resolve.
    broken = []
    attr = re.compile(r'(?:src|href)=["\']([^"\']+)["\']')
    for p in BROWSER_DIR.glob('*.html'):
        text = p.read_text(encoding='utf-8')
        for raw in attr.findall(text):
            if raw.startswith(('http:', 'https:', 'data:', '#', 'javascript:')):
                continue
            path = raw.split('?', 1)[0].split('#', 1)[0]
            if not path:
                continue
            target = (p.parent / path).resolve()
            if not target.exists():
                broken.append(f'{p}:{raw}')
    if broken:
        fail('broken browser src/href refs: ' + ', '.join(broken[:40]))

    # JS syntax remains valid.
    for base in (Path('src'), Path('tests/smoke')):
        for p in base.rglob('*.js'):
            result = subprocess.run(['node', '--check', str(p)], capture_output=True, text=True)
            if result.returncode:
                fail(f'node --check failed {p}: {result.stderr.strip()}')

    # Build28 pure test must find relocated recovery core.
    result = subprocess.run(['node', 'tools/test-build28-data-recovery.cjs'], capture_output=True, text=True)
    if result.returncode:
        fail('Build28 pure recovery test failed after rewire: ' + result.stderr.strip())
    note('Build28 pure recovery test passes')

    # Protected sanctuaries untouched.
    result = subprocess.run([
        'git', 'diff', '--exit-code', 'HEAD', '--',
        'app.js', 'voice-ios.js', 'free-voice.js', 'assets/LOGO.png', 'assets/Favicon.png'
    ])
    if result.returncode:
        fail('protected sanctuary diff detected')


def stage_workflows():
    if STAGE_DIR.exists():
        subprocess.run(['rm', '-rf', str(STAGE_DIR)], check=True)
    STAGE_DIR.mkdir(parents=True)
    for p in WF_DIR.glob('*.yml'):
        if p.name == TEMP_WORKFLOW:
            continue
        (STAGE_DIR / p.name).write_text(p.read_text(encoding='utf-8'), encoding='utf-8')
    note(f'staged {len(list(STAGE_DIR.glob("*.yml")))} workflows outside protected path')


def main():
    fix_workflows()
    fix_tool_requires()
    fix_browser_harnesses()
    verify()
    stage_workflows()
    note('repo-layout CI semantics migration verified')


if __name__ == '__main__':
    main()
