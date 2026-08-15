from pathlib import Path
import os
import re
import subprocess
import sys

WF_DIR=Path('.github/workflows')
BROWSER_DIR=Path('tests/browser')
SMOKE_DIR=Path('tests/smoke')
STAGE_DIR=Path('.repo-layout-ci-workflows')
TEMP_WORKFLOW='_repo-layout-ci-semantics-v2-temp.yml'


def note(msg):
    print(f'::notice title=Repo layout CI V2::{msg}', flush=True)


def fail(msg):
    print(f'::error title=Repo layout CI V2::{msg}', flush=True)
    raise SystemExit(msg)


def fix_workflows():
    touched=[]
    total=0
    for p in sorted(WF_DIR.glob('*.yml')):
        if p.name.startswith('_repo-layout-ci-semantics'):
            continue
        text=p.read_text(encoding='utf-8')
        out=text
        lines=[]
        for line in out.splitlines(keepends=True):
            original=line
            if 'src/premium/premium-theme-polish.css' in line:
                line=re.sub(
                    r"(['\"])src/premium/(premium-[^'\"]+\.css(?:\?[^'\"]*)?)\1(?=[^\n]*src/premium/premium-theme-polish\.css)",
                    lambda m: f"{m.group(1)}./{m.group(2)}{m.group(1)}",
                    line,
                )
                line=line.replace("@import url('./src/premium/premium-nav-geometry-hotfix.css", "@import url('./premium-nav-geometry-hotfix.css")
                line=line.replace('tail -n 1 ./premium-theme-polish.css','tail -n 1 src/premium/premium-theme-polish.css')

            if p.name in {'build30-architecture-hardening.yml','v2-release-freeze.yml'}:
                line=line.replace('src/core/runtime-contracts.js?v=2.0.0-b30','./runtime-contracts.js?v=2.0.0-b30')
                line=line.replace('src/core/runtime-bridge.js?v=2.0.0-b30','./runtime-bridge.js?v=2.0.0-b30')

            line=re.sub(r'/tmp/tests/browser/([^\s\"\']+)',r'/tmp/\1',line)
            line=re.sub(r'/tmp/tests/smoke/([^\s\"\']+)',r'/tmp/\1',line)
            line=re.sub(r'/tmp/src/(?:core|pedagogy|ui|premium)/([^\s\"\']+)',r'/tmp/\1',line)

            if line!=original:
                total+=1
            lines.append(line)
        out=''.join(lines)
        if out!=text:
            p.write_text(out,encoding='utf-8')
            touched.append(p)
    note(f'workflow semantics fixed: {total} line rewrites across {len(touched)} workflows')
    return touched


def unique_target_by_basename(name):
    hits=[p for base in (Path('src'),Path('tests')) for p in base.rglob(name) if p.is_file()]
    return hits[0] if len(hits)==1 else None


def fix_tool_requires():
    touched=[]
    pattern=re.compile(r"require\((['\"])(\.\./([^/'\"]+\.(?:js|json)))\1\)")
    for p in sorted(Path('tools').rglob('*')):
        if not p.is_file() or p.suffix not in {'.js','.cjs','.mjs'}:
            continue
        text=p.read_text(encoding='utf-8')
        def repl(m):
            quote,raw,basename=m.group(1),m.group(2),m.group(3)
            if (p.parent/raw).resolve().exists():
                return m.group(0)
            target=unique_target_by_basename(basename)
            if not target:
                return m.group(0)
            rel=os.path.relpath(target,p.parent).replace(os.sep,'/')
            if not rel.startswith('.'):
                rel='./'+rel
            return f'require({quote}{rel}{quote})'
        out=pattern.sub(repl,text)
        if out!=text:
            p.write_text(out,encoding='utf-8')
            touched.append(p)
    note('tool requires fixed: '+(', '.join(map(str,touched)) if touched else 'none'))
    return touched


def fix_browser_harnesses():
    touched=[]
    for p in sorted(BROWSER_DIR.glob('*.html')):
        text=p.read_text(encoding='utf-8')
        out=text
        out=re.sub(r"(['\"])\./index\.html",lambda m:f"{m.group(1)}../../index.html",out)
        out=re.sub(r"(['\"])\./\?",lambda m:f"{m.group(1)}../../?",out)
        if p.name=='premium-v510-practice-icons-tribunal.html':
            out=out.replace("'../../assets/premium/practice/","'./assets/premium/practice/")
            out=out.replace('"../../assets/premium/practice/','"./assets/premium/practice/')
        if out!=text:
            p.write_text(out,encoding='utf-8')
            touched.append(p)
    note('browser harnesses fixed: '+(', '.join(map(str,touched)) if touched else 'none'))
    return touched


def fix_smoke_runtime_urls():
    touched=[]
    for p in sorted(SMOKE_DIR.glob('*.js')):
        text=p.read_text(encoding='utf-8')
        out=text
        out=re.sub(r"(['\"])\./index\.html",lambda m:f"{m.group(1)}../../index.html",out)
        out=re.sub(r"(['\"])\./\?",lambda m:f"{m.group(1)}../../?",out)
        if out!=text:
            p.write_text(out,encoding='utf-8')
            touched.append(p)
    note('smoke runtime URLs fixed: '+(', '.join(map(str,touched)) if touched else 'none'))
    return touched


def verify():
    bad=[]
    for p in WF_DIR.glob('*.yml'):
        if p.name.startswith('_repo-layout-ci-semantics'):
            continue
        text=p.read_text(encoding='utf-8')
        if '/tmp/tests/browser/' in text or '/tmp/tests/smoke/' in text or '/tmp/src/' in text:
            bad.append(str(p))
    if bad:
        fail('stale migrated /tmp paths: '+', '.join(bad))

    for p in WF_DIR.glob('*.yml'):
        if p.name.startswith('_repo-layout-ci-semantics'):
            continue
        for line in p.read_text(encoding='utf-8').splitlines():
            if 'tail -n 1 ./premium-theme-polish.css' in line:
                fail(f'tail operand incorrectly made relative in {p}: {line}')
            if "@import url('./src/premium/" in line:
                fail(f'over-prefixed @import expectation remains in {p}: {line}')

    meta=Path('src/core/build-meta.js').read_text(encoding='utf-8')
    bridge=Path('src/core/runtime-bridge.js').read_text(encoding='utf-8')
    if "import './runtime-contracts.js?v=2.0.0-b30'" not in meta:
        fail('build-meta runtime-contracts import changed')
    if "import './runtime-bridge.js?v=2.0.0-b30'" not in meta:
        fail('build-meta runtime-bridge import changed')
    if "from './runtime-contracts.js?v=2.0.0-b30'" not in bridge:
        fail('runtime-bridge relative contract import changed')

    for wf in ('build30-architecture-hardening.yml','v2-release-freeze.yml'):
        text=(WF_DIR/wf).read_text(encoding='utf-8')
        if 'src/core/runtime-contracts.js?v=2.0.0-b30' in text or 'src/core/runtime-bridge.js?v=2.0.0-b30' in text:
            fail(f'Build30 assertion still over-prefixed in {wf}')

    broken=[]
    attr=re.compile(r'(?:src|href)=["\']([^"\']+)["\']')
    for p in BROWSER_DIR.glob('*.html'):
        text=p.read_text(encoding='utf-8')
        for raw in attr.findall(text):
            if raw.startswith(('http:','https:','data:','#','javascript:')):
                continue
            path=raw.split('?',1)[0].split('#',1)[0]
            if path and not (p.parent/path).resolve().exists():
                broken.append(f'{p}:{raw}')
    if broken:
        fail('broken browser src/href refs: '+', '.join(broken[:50]))

    nav=Path('tests/smoke/field-navigation-v3-smoke.js').read_text(encoding='utf-8')
    if "frame.src='../../index.html?uxSmoke=lesson8&fieldNavV3=1'" not in nav:
        fail('Field Navigation smoke still points at tests/browser/index.html')

    icons=Path('tests/browser/premium-v510-practice-icons-tribunal.html').read_text(encoding='utf-8')
    if "'review':'./assets/premium/practice/review-premium.webp'" not in icons:
        fail('V5.10 tribunal Review literal src expectation is not app-root relative')
    if "'listening':'./assets/premium/practice/listen-premium.webp'" not in icons:
        fail('V5.10 tribunal Listening literal src expectation is not app-root relative')

    for base in (Path('src'),SMOKE_DIR):
        for p in base.rglob('*.js'):
            r=subprocess.run(['node','--check',str(p)],capture_output=True,text=True)
            if r.returncode:
                fail(f'node --check failed {p}: {r.stderr.strip()}')

    r=subprocess.run(['node','tools/test-build28-data-recovery.cjs'],capture_output=True,text=True)
    if r.returncode:
        fail('Build28 pure recovery test failed: '+r.stderr.strip())
    note('Build28 pure recovery test passes')

    r=subprocess.run(['git','diff','--exit-code','HEAD','--','app.js','voice-ios.js','free-voice.js','assets/LOGO.png','assets/Favicon.png'])
    if r.returncode:
        fail('protected sanctuary diff detected')


def stage_workflows():
    if STAGE_DIR.exists():
        subprocess.run(['rm','-rf',str(STAGE_DIR)],check=True)
    STAGE_DIR.mkdir(parents=True)
    for p in WF_DIR.glob('*.yml'):
        if p.name.startswith('_repo-layout-ci-semantics'):
            continue
        (STAGE_DIR/p.name).write_text(p.read_text(encoding='utf-8'),encoding='utf-8')
    note(f'staged {len(list(STAGE_DIR.glob("*.yml")))} fixed workflows')


def main():
    fix_workflows()
    fix_tool_requires()
    fix_browser_harnesses()
    fix_smoke_runtime_urls()
    verify()
    stage_workflows()
    note('consolidated semantics migration verified')


if __name__=='__main__':
    main()
