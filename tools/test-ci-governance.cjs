'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const cp=require('node:child_process');
const ROOT=path.resolve(__dirname,'..');
const W=path.join(ROOT,'.github','workflows');
const {documentationOnly}=require('./ci-pr-visual-scope.cjs');
const list=fs.readdirSync(W).filter(f=>/\.ya?ml$/.test(f));
const BLOCK="concurrency:\n  group: ${{ github.workflow_ref }}-${{ github.event_name == 'pull_request' && github.event.pull_request.number || github.run_id }}\n  cancel-in-progress: ${{ github.event_name == 'pull_request' }}";
const hasPR=s=>/^  pull_request\s*:/m.test(s.slice(0,s.search(/^jobs:/m)));
assert.equal(list.length,90,'89 original workflows plus a new governance audit');
const prFiles=[];
for(const file of list){
  const s=fs.readFileSync(path.join(W,file),'utf8');
  assert.ok(/^jobs:/m.test(s),'no jobs: '+file);
  if(hasPR(s)){
    prFiles.push(file);
    assert.ok(s.includes(BLOCK),'incorrect PR concurrency: '+file);
  }
}
assert.equal(prFiles.length,85,'84 legacy PR workflows plus CI governance audit');
const BASE='6b08edda98bd09520ed83c49682ebd2443202a23';
for(const file of ['pages.yml','build19-normalize.yml','build20-wire.yml','build21-wire.yml','build24-close.yml']){
  const p='.github/workflows/'+file;
  const base=cp.execFileSync('git',['rev-parse',BASE+':'+p],{encoding:'utf8'}).trim();
  const candidate=cp.execFileSync('git',['hash-object',p],{encoding:'utf8'}).trim();
  assert.equal(candidate,base,'protected non-PR workflow edited: '+p);
}
for(const [file,capture,upload] of [
  ['premium-v5-fidelity-reset.yml','Capture V5.5 primary iPhone review matrix','Upload V5.5 iPhone visual review artifact'],
  ['premium-v5-theme-art-integration.yml','Capture V5.7 five-viewport by four-theme matrix','Upload V5.7 visual matrix']
]){
  const s=fs.readFileSync(path.join(W,file),'utf8');
  assert.ok(s.includes('id: visual_capture_scope'),'no docs-only capture router: '+file);
  assert.ok(s.includes('fetch-depth: 0'),'no full PR history: '+file);
  for(const step of [capture,upload]){
    assert.ok(s.includes("- name: "+step+"\n        if: steps.visual_capture_scope.outputs.capture == 'true'"),
      'uncoupled capture/upload: '+step);
  }
  assert.ok(s.includes('Chrome —'),'functional Chrome smoke missing: '+file);
}
assert.equal(documentationOnly(['docs/CI-GOVERNANCE-2026-10-10.md','PROJECT-STATE.md']),true);
assert.equal(documentationOnly(['README.md']),true);
for(const set of [[],['index.html'],['sw.js'],['src/ui/main.js'],['voice-ios.js'],
 ['docs/notes.md','src/premium/card.css'],['assets/logo.svg'],['.github/workflows/quality.yml'],
 ['tests/browser/test.html','docs/text.md']]){
  assert.equal(documentationOnly(set),false,'unsafe visual skip '+JSON.stringify(set));
}
// The scoped 21 historical pedagogical workflows must have unchanged tests,
// names, jobs and push-event blocks. Only Phase 1 concurrency and Phase 2
// PR path selection are permitted relative to accepted main.
const scoped=list.filter(f=>/^build(?:37-[1-8]|38-(?:[1-9]|10)|41-[23]|42-2)-/.test(f));
assert.equal(scoped.length,21,'expected 21 path-scoped historical suites');
function specializedPaths(file){
  const common=['src/pedagogy/**','src/core/data-recovery*','src/core/memory-evidence*'];
  const tests=n=>['tests/browser/build'+n+'*','tests/unit/build'+n+'*','tools/test-build'+n+'*'];
  if(file.startsWith('build37-'))return [...common,...tests('37'),'.github/workflows/'+file];
  if(file.startsWith('build38-'))return [...common,...tests('37'),...tests('38'),'.github/workflows/'+file];
  if(file.startsWith('build41-'))return [...common,...tests('38'),...tests('41'),'.github/workflows/'+file];
  if(file.startsWith('build42-'))return [...common,...tests('37'),...tests('42'),'.github/workflows/'+file];
  throw new Error('unexpected scoped workflow '+file);
}
for(const file of scoped){
  const current=fs.readFileSync(path.join(W,file),'utf8');
  const p='.github/workflows/'+file;
  const baseline=cp.execFileSync('git',['show',BASE+':'+p],{encoding:'utf8'});
  const event="  pull_request:\n    branches: [main]\n";
  assert.equal(baseline.split(event).length,2,'historical trigger differs: '+file);
  const patterns=specializedPaths(file);
  assert.ok(!patterns.some(p=>p.startsWith('src/premium/')||p==='index.html'||p==='sw.js'),
    'an unrelated UI-only change must not trigger '+file);
  const enhanced=baseline.replace(event,event+"    paths:\n"+
    patterns.map(x=>"      - '"+x+"'").join("\n")+"\n");
  const expected=enhanced.replace(/^jobs:/m,BLOCK+"\n\njobs:");
  assert.equal(current,expected,'workflows must retain exact original tests and event contracts: '+file);
}
console.log('CI governance PASS: '+prFiles.length+' PR workflows; '+scoped.length+
  ' narrowly scoped pedagogy workflows; unchanged tests, Pages, push-only and visual safety');

