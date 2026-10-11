'use strict';
/* Static preview safety & completeness: no origin/data mixing. */
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const cp=require('node:child_process');
const vm=require('node:vm');
const ROOT=path.resolve(__dirname,'../..');
const arg=process.argv.indexOf('--out');
assert(arg>=0&&process.argv[arg+1], 'pass --out');
const output=path.resolve(process.argv[arg+1]);
const read=(p)=>fs.readFileSync(path.join(output,p),'utf8');
const manifest=JSON.parse(read('manifest.webmanifest'));
const meta=JSON.parse(read('preview-build.json'));
const provenance=JSON.parse(read('preview-provenance.json'));
const index=read('index.html'),sw=read('sw.js');
assert.equal(meta.format,'french-tranquille-isolated-preview/v1');
assert(meta.expectedOrigin.startsWith('https://'));
assert.notEqual(meta.expectedOrigin,'https://shinobione.github.io');
assert.equal(meta.originRootOnly,true);
assert.equal(meta.realLearnerDataIncluded,false);
assert.equal(meta.syntheticState,'fresh-empty-browser-storage-only');
assert.equal(meta.productionFilesModified,false);
assert.equal(meta.distribution,'CI artifact only; no publishing or uploading');
assert.equal(manifest.id,'/');
assert.equal(manifest.start_url,'/');
assert.equal(manifest.scope,'/');
assert(manifest.name.includes('TEST isolé'));
assert(manifest.short_name.includes('TEST'));
assert.equal(provenance.sourceCommit,meta.sourceCommit);
assert(index.includes('id="ft-preview-origin-firewall"'));
assert(index.includes(JSON.stringify(meta.expectedOrigin)));
assert(index.includes('<title>French Trân’quille — TEST isolé</title>'));
assert(index.includes('ftIsolatedPreview'));
assert(sw.includes("const CACHE='"+meta.previewCache+"';"));
assert(sw.includes("const CACHE_PREFIX='ft-isolated-preview-';"));
assert(!sw.includes("const CACHE='tran-french-teacher-v6.1.0-review4';"));
const assertSourceUnmodified=p=>
  assert.deepEqual(fs.readFileSync(path.join(ROOT,p)),fs.readFileSync(path.join(output,p)),
    'copied learner/PWA source modified: '+p);
for(const p of ['app.js','voice-ios.js','free-voice.js','src/core/build32-loader.js',
  'src/premium/v61-stitch-high-fidelity.css',
  'src/premium/v61-stitch-high-fidelity.js',
  'src/core/data-recovery-v3-runtime-core.js','src/pedagogy/curriculum-stage4.js']){
  assertSourceUnmodified(p);
}
assert.equal(read('src/core/build32-loader.js').includes('v61-stitch-high-fidelity.css'),true);
assert.equal(read('src/premium/v61-stitch-high-fidelity.css').includes('Stitch Export 4'),true);
const sandbox={self:{addEventListener(){}},caches:{},console};
vm.runInNewContext(sw+'\n;globalThis.__ftCore=CORE;',sandbox,{timeout:3000});
const core=Array.from(sandbox.__ftCore);
assert(core.length>150,'unexpectedly truncated SW precache: '+core.length);
let count=0;
for(const raw of core) {
  assert(raw.startsWith('./'), 'external/absolute SW precache URL forbidden: '+raw);
  const url=new URL(raw,'https://test.invalid/');
  assert.equal(url.origin,'https://test.invalid');
  const file=decodeURIComponent(url.pathname).slice(1)||'index.html';
  const dest=path.resolve(output,file);
  assert(dest.startsWith(output+path.sep),'precache escapes build root: '+raw);
  assert(fs.existsSync(dest)&&fs.statSync(dest).isFile(), 'missing offline asset: '+raw);
  count++;
}
const originalSw=fs.readFileSync(path.join(ROOT,'sw.js'),'utf8');
const strip=(v)=>v.replace(/^const CACHE='[^']+';/m,'const CACHE=<tag>;')
  .replace(/^const CACHE_PREFIX='[^']+';/m,'const CACHE_PREFIX=<prefix>;');
assert.equal(strip(sw),strip(originalSw),'preview SW changed beyond isolated cache identity');
const git=cp.execFileSync('git',['rev-parse','HEAD'],{cwd:ROOT,encoding:'utf8'}).trim();
assert.equal(meta.sourceCommit,git);
const forbidden=cp.spawnSync(process.execPath,
  [path.join(ROOT,'tools/build-isolated-preview.cjs'),'--origin',
  'https://shinobione.github.io','--out',path.join(output,'uncreated')],
  {encoding:'utf8'});
assert.notEqual(forbidden.status,0,'PRODUCTION_ORIGIN_SHOULD_BE_REJECTED');
assert(!fs.existsSync(path.join(output,'uncreated')),'rejected origin created output');
// Exercise original Service Worker event handlers against deterministic cache
// and fetch facades. This proves install/activate/offline behaviour without
// claiming physical device SW activation in headless Chrome.
async function exercisePreviewServiceWorker(){
  const listeners={},installed=new Set(),removed=[],precache=[],stale=meta.previewCache+'-old';
  installed.add(stale);
  const cacheApi={
    open:async name=>{
      assert.equal(name,meta.previewCache,'SW caches incorrect namespace');
      installed.add(name);
      return {
        addAll:async urls=>{
          assert.equal(urls.length,core.length,'SW install lost precache entries');
          for(let i=0;i<core.length;i++)assert.equal(urls[i],core[i],'SW changed precache resource');
          precache.push(...urls);
        },
        put:async()=>{}
      };
    },
    keys:async()=>Array.from(installed),
    delete:async name=>{removed.push(name);return installed.delete(name)},
    match:async url=>{
      const value=typeof url==='string'?url:url.url;
      return precache.includes(value)||value==='./index.html'?{ok:true,from:'offline-test-cache'}:undefined;
    }
  };
  const previewSelf={
    clients:{claim:async()=>{}},
    skipWaiting:async()=>{},
    addEventListener(event,handler){listeners[event]=handler}
  };
  const context={self:previewSelf,caches:cacheApi,
    fetch:async()=>{throw Error('simulated offline')},console};
  vm.runInNewContext(sw,context,{timeout:3000});
  for(const event of ['install','activate','fetch'])assert.equal(typeof listeners[event],'function','missing SW '+event);
  let installPromise;
  listeners.install({waitUntil:p=>{installPromise=p}});
  assert(installPromise,'SW install did not call waitUntil');
  await installPromise;
  assert.equal(precache.length,core.length,'precache incomplete');
  assert(installed.has(meta.previewCache),'preview cache never created');
  let activation;
  listeners.activate({waitUntil:p=>{activation=p}});
  await activation;
  assert(removed.includes(stale),'stale preview namespace never cleaned');
  assert(installed.has(meta.previewCache),'current preview cache unexpectedly deleted');
  let response;
  listeners.fetch({
    request:{method:'GET',url:'https://ft-v61-preview.invalid/src/premium/v61-stitch-high-fidelity.css'},
    respondWith:p=>{response=p},waitUntil:()=>{}
  });
  assert(response,'SW missing offline fetch fallback');
  const offline=await response;
  assert.equal(offline.from,'offline-test-cache','offline fetch not resolved from cache');
}
exercisePreviewServiceWorker().then(()=>{
  console.log('ISOLATED_PREVIEW_SMOKE_PASS '+JSON.stringify({
    source:git,precacheAssets:count,manifestScope:manifest.scope,
    expectedOrigin:meta.expectedOrigin,productionOriginRefused:true,
    learnerSourcesUnmodified:true,swLifecycleInstallActivateOffline:true
  }));
}).catch(err=>{console.error(err);process.exitCode=1});
