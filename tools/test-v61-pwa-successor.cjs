'use strict';
/* CI V6.1 successor-safe PWA attestation. NO waiver of legacy safety.
   Only exact reviewed mutations to index, SW and loader can pass. */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const cp = require('node:child_process');
const BASE='6b08edda98bd09520ed83c49682ebd2443202a23';
const OLD='2.3.22-b34.14-v58debug1', NEXT='6.1.0-review4';
const read=p=>fs.readFileSync(p,'utf8');
const fromBase=p=>cp.execFileSync('git',['show',BASE+':'+p],{encoding:'utf8'});
const replaceOne=(source,needle,replacement,label)=>{
  assert.equal(source.split(needle).length,2,label+': expected precisely one insertion point');
  return source.replace(needle,replacement);
};
const check=(actual,expected,label)=>assert.equal(actual,expected,label+': unapproved source change');
cp.execFileSync('git',['merge-base','--is-ancestor',BASE,'HEAD'],{stdio:'ignore'});
const originalIndex=fromBase('index.html');
const originalSW=fromBase('sw.js');
const originalLoader=fromBase('src/core/build32-loader.js');
const bt=String.fromCharCode(96);
const wantedIndex=replaceOne(originalIndex,
  "const HOTFIX='"+OLD+"'","const HOTFIX='"+NEXT+"'",'index cache hotfix');
const swAfterCache=replaceOne(originalSW,
  "const CACHE='tran-french-teacher-v"+OLD+"'",
  "const CACHE='tran-french-teacher-v"+NEXT+"'",'cache generation');
const wantedSW=replaceOne(swAfterCache,'const CORE=[',
  "const V61='"+NEXT+"';\nconst CORE=[\n"
  +"  "+bt+"./src/premium/v61-stitch-high-fidelity.css?v=${V61}"+bt+",\n"
  +"  "+bt+"./src/premium/v61-stitch-high-fidelity.js?v=${V61}"+bt+",",
  'exactly two additive precache entries');
const wantedLoader=replaceOne(originalLoader,'      installRuntimeMeta();',
  "      installRuntimeMeta();\n"
  +"      // V6.1 visual review candidate: late owner, existing pedagogical surfaces intact.\n"
  +"      loadStyle('./src/premium/v61-stitch-high-fidelity.css?v="+NEXT+"', 'v61StitchStyle');\n"
  +"      await loadScript('./src/premium/v61-stitch-high-fidelity.js?v="+NEXT+"', 'v61StitchRuntime');",
  'late-only visual loader');
check(read('index.html'),wantedIndex,'index.html');
check(read('sw.js'),wantedSW,'sw.js');
check(read('src/core/build32-loader.js'),wantedLoader,'Build32 loader');
for(const p of ['src/premium/v61-stitch-high-fidelity.css','src/premium/v61-stitch-high-fidelity.js']){
  assert.ok(fs.statSync(p).size>1000,'missing real asset: '+p);
}
const protectedFiles=[
  'app.js','voice-ios.js','free-voice.js','assets/LOGO.png',
  'assets/Favicon.png','manifest.webmanifest',
  'src/pedagogy/curriculum-stage4.js','src/core/data-recovery-core.js',
  'src/core/data-recovery-v3-contract.js','src/core/data-recovery-v3-runtime-core.js',
  'src/pedagogy/memory-evidence-v2-core.js',
  'src/pedagogy/foundations-pilot.js',
  'src/pedagogy/learner-action-practice-advisory.js',
  'src/premium/premium-v5-fidelity-reset.css','src/core/theme-controller.js'
];
for(const p of protectedFiles){
  assert.ok(fs.readFileSync(p).equals(cp.execFileSync('git',['show',BASE+':'+p])),
    'frozen file changed: '+p);
}
assert.throws(()=>check(wantedSW.replace("'./','./index.html'","'./index.html'"),wantedSW,'deleted historical CORE'));
assert.throws(()=>check(wantedIndex.replace('const learnerKey=','const alteredLearnerKey='),wantedIndex,'learner key'));
assert.throws(()=>check(wantedLoader.replace('installRuntimeMeta();','installRuntimeMetadata();'),wantedLoader,'boot order'));
console.log('V6.1 PWA successor boundary PASS: exact three deltas; original CORE preserved; protected files intact; negative tests PASS');
