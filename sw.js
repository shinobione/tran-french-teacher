const CACHE='tran-french-teacher-v1.9.0-b16';
const V='1.9.0-b16';
const CORE=[
  './',
  './index.html',
  `./styles.css?v=${V}`,
  `./brand.css?v=${V}`,
  `./learning-memory.css?v=${V}`,
  `./visual-pass.css?v=${V}`,
  `./lucie-avatar.css?v=${V}`,
  `./curriculum-stage2.css?v=${V}`,
  `./daily-coach.css?v=${V}`,
  `./mastery-engine.css?v=${V}`,
  `./app.js?v=${V}`,
  `./curriculum-stage2.js?v=${V}`,
  `./stage2-boot.js?v=${V}`,
  `./debug-fr.js?v=${V}`,
  `./voice-ios.js?v=${V}`,
  `./free-voice.js?v=${V}`,
  `./build-meta.js?v=${V}`,
  `./learning-memory.js?v=${V}`,
  `./daily-coach.js?v=${V}`,
  `./mastery-engine.js?v=${V}`,
  `./manifest.webmanifest?v=${V}`,
  `./assets/LOGO.png?v=${V}`,
  `./assets/Favicon.png?v=${V}`,
  './assets/icon-192.webp'
];
self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)));
  self.skipWaiting();
});
self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith(
    fetch(event.request).then(response=>{
      if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy));}
      return response;
    }).catch(()=>caches.match(event.request).then(hit=>hit||caches.match('./index.html')))
  );
});