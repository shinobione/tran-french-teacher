'use strict';
/* V6.1 isolated preview bundler.
 * A local/CI artifact producer, NEVER a GitHub Pages deployment.
 * The exported app is bound to a distinct HTTPS origin and empty storage.
 */
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const crypto = require('node:crypto');

const ROOT = path.resolve(__dirname, '..');
const PUBLIC_FILES = [
  'index.html', 'app.js', 'styles.css', 'voice-ios.js', 'free-voice.js',
  'sw.js', 'manifest.webmanifest', 'icon.svg', 'release-v2.json',
  'release-v2.5.json'
];
const PUBLIC_DIRS = ['assets', 'src', 'tests'];
function option(name) {
  const i = process.argv.indexOf(name);
  assert(i >= 0 && process.argv[i + 1], 'required argument: ' + name);
  return process.argv[i + 1];
}
function once(value, needle, replacement, label) {
  assert.equal(value.split(needle).length, 2, label + ': expected one exact anchor');
  return value.replace(needle, replacement);
}
function hostOrigin(raw) {
  const url = new URL(raw);
  assert.equal(url.protocol, 'https:', 'a real HTTPS origin is required');
  assert.equal(url.username + url.password, '', 'no credentials in origin');
  assert.equal(url.pathname, '/', 'publish bundle at the ORIGIN ROOT only');
  assert.equal(url.search + url.hash, '', 'no origin path/query/fragment');
  assert.equal(url.origin, (raw.endsWith('/') ? raw.slice(0,-1) : raw), 'pass only origin (scheme + hostname)');
  assert.notEqual(url.origin, 'https://shinobione.github.io', 'production origin forbidden even at a different path');
  assert(!url.hostname.toLowerCase().endsWith('.github.io'), 'any GitHub Pages origin is forbidden until independent origin ownership is proved');
  assert(!['localhost','127.0.0.1'].includes(url.hostname.toLowerCase()), 'use --origin for a real future HTTPS host, localhost only for CI simulation');
  return url.origin;
}
const origin = hostOrigin(option('--origin'));
const output = path.resolve(option('--out'));
assert(output !== ROOT && output !== '/' && !ROOT.startsWith(output + path.sep), 'output must not contain the repository');
assert(!PUBLIC_DIRS.some(d => output === path.join(ROOT,d) || path.join(ROOT,d).startsWith(output + path.sep)), 'output overlaps app source');
const source = cp.execFileSync('git',['rev-parse','HEAD'],{cwd:ROOT,encoding:'utf8'}).trim();
assert(/^[a-f0-9]{40}$/.test(source), 'invalid Git source head');
const tag = source.slice(0,16);
assert(!fs.existsSync(output), 'output already exists; never overwrite files silently');
fs.mkdirSync(output,{recursive:true});
for(const file of PUBLIC_FILES) {
  assert(fs.statSync(path.join(ROOT,file)).isFile(), 'missing required runtime file: ' + file);
  fs.copyFileSync(path.join(ROOT,file),path.join(output,file));
}
for(const dir of PUBLIC_DIRS) {
  fs.cpSync(path.join(ROOT,dir),path.join(output,dir),{recursive:true,
    filter:src => !src.split(path.sep).some(x=>x==='.git'||x==='node_modules'||x==='.DS_Store')});
}
const indexPath=path.join(output,'index.html');
let index=fs.readFileSync(indexPath,'utf8');
index=once(index,'<title>French Trân’quille</title>','<title>French Trân’quille — TEST isolé</title>','test title');
index=once(index,'content="French Trân’quille" />\n  <meta name="description"',
  'content="French Trân’quille TEST" />\n  <meta name="description"','app name');
index=once(index,'content="French Trân’quille" />\n  <meta name="application-name"',
  'content="French Trân’quille TEST" />\n  <meta name="application-name"','iOS home screen name');
const guard = `<meta name="ft-isolated-preview" content="${tag}" />
  <script id="ft-preview-origin-firewall">
    (()=>{'use strict';const expected=${JSON.stringify(origin)};
      const local=/^(localhost|127\\.0\\.0\\.1)$/.test(location.hostname)
        && location.protocol==='http:';
      if(location.origin!==expected&&!local){
        location.replace('about:blank');
        throw Error('ISOLATED_PREVIEW_ORIGIN_MISMATCH');
      }
      document.documentElement.dataset.ftIsolatedPreview='1';
    })();
  </script>`;
index=once(index,'  <meta charset="utf-8" />','  <meta charset="utf-8" />\n  '+guard,'early origin firewall');
fs.writeFileSync(indexPath,index);
const mp=path.join(output,'manifest.webmanifest');
const manifest=JSON.parse(fs.readFileSync(mp,'utf8'));
assert.equal(manifest.id,'/tran-french-teacher/');
assert.equal(manifest.start_url,'/tran-french-teacher/');
assert.equal(manifest.scope,'/tran-french-teacher/');
Object.assign(manifest,{id:'/',start_url:'/',scope:'/',
  name:'French Trân’quille — TEST isolé',short_name:'Trân TEST'});
fs.writeFileSync(mp,JSON.stringify(manifest,null,2)+'\n');
const swp=path.join(output,'sw.js');
let sw=fs.readFileSync(swp,'utf8');
sw=once(sw,"const CACHE='tran-french-teacher-v6.1.0-review4';",
  "const CACHE='ft-isolated-preview-"+tag+"';",'isolated cache ID');
sw=once(sw,"const CACHE_PREFIX='tran-french-teacher-';",
  "const CACHE_PREFIX='ft-isolated-preview-';",'isolated cache namespace');
fs.writeFileSync(swp,sw);
const metadata={
  format:'french-tranquille-isolated-preview/v1',sourceCommit:source,expectedOrigin:origin,
  originRootOnly:true,isolatedManifestId:'/',serviceWorkerScope:'/',
  previewCache:'ft-isolated-preview-'+tag,
  productionOrigin:'https://shinobione.github.io',
  syntheticState:'fresh-empty-browser-storage-only',
  realLearnerDataIncluded:false,productionFilesModified:false,
  distribution:'CI artifact only; no publishing or uploading'
};
fs.writeFileSync(path.join(output,'preview-build.json'),JSON.stringify(metadata,null,2)+'\n');
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const pin={sourceCommit:source,previewIndexSha256:hash(indexPath),previewManifestSha256:hash(mp),
  previewSwSha256:hash(swp),originalSwSha256:hash(path.join(ROOT,'sw.js'))};
fs.writeFileSync(path.join(output,'preview-provenance.json'),JSON.stringify(pin,null,2)+'\n');
console.log(JSON.stringify({status:'BUILT_NOT_DEPLOYED',out:output,files:PUBLIC_FILES.length,
  folders:PUBLIC_DIRS,source,origin,cache:metadata.previewCache},null,2));
