const CACHE='tran-french-teacher-v1.18.0-b25-progression-ux';
const V='1.17.0-b24';
const UX='1.17.5-b24.5';
const P25='1.18.0-b25';
const CORE=[
  './','./index.html',
  `./styles.css?v=${V}`,`./brand.css?v=${V}`,`./learning-memory.css?v=${V}`,`./visual-pass.css?v=${V}`,`./lucie-avatar.css?v=${V}`,
  `./curriculum-stage2.css?v=${V}`,`./curriculum-stage3.css?v=${V}`,`./daily-coach.css?v=${V}`,`./mastery-engine.css?v=${V}`,`./mastery-stage3.css?v=${V}`,
  `./scenario-engine.css?v=${V}`,`./real-life-ux.css?v=${V}`,`./error-intelligence.css?v=${V}`,`./listening-engine.css?v=${V}`,`./language-ratio.css?v=${V}`,`./ux-shell.css?v=${UX}`,`./interaction-ux.css?v=${UX}`,`./mobile-polish.css?v=${UX}`,`./progression-ux.css?v=${P25}`,
  `./progress-safety.js?v=${V}`,`./app.js?v=${V}`,`./curriculum-stage2.js?v=${V}`,`./curriculum-stage3.js?v=${V}`,`./stage2-boot.js?v=${V}`,
  `./debug-fr.js?v=${V}`,`./voice-ios.js?v=${V}`,`./free-voice.js?v=${V}`,`./learning-memory.js?v=${V}`,`./error-intelligence.js?v=${V}`,
  `./language-ratio-core.js?v=${V}`,`./language-ratio.js?v=${V}`,`./daily-coach.js?v=${V}`,`./mastery-engine.js?v=${V}`,`./mastery-stage3.js?v=${V}`,
  `./scenario-data.js?v=${V}`,`./real-life-data.js?v=${V}`,`./real-life-data-2.js?v=${V}`,`./scenario-host.js?v=${V}`,`./scenario-engine.js?v=${V}`,`./real-life-ux.js?v=${V}`,
  `./listening-data.js?v=${V}`,`./listening-engine.js?v=${V}`,`./ux-shell.js?v=${UX}`,`./interaction-ux.js?v=${UX}`,`./progression-ux.js?v=${P25}`,`./build-meta.js?v=${P25}`,`./manifest.webmanifest?v=${V}`,
  `./assets/LOGO.png?v=${V}`,`./assets/Favicon.png?v=${V}`,'./assets/icon-192.webp'
];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)));self.skipWaiting();});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}return response;}).catch(()=>caches.match(event.request).then(hit=>hit||caches.match('./index.html'))));});