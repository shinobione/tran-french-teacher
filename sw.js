const CACHE='tran-french-teacher-v1.5.0-b10';
const CORE=['./','./index.html','./styles.css','./brand.css','./app.js','./debug-fr.js','./voice-ios.js','./free-voice.js','./manifest.webmanifest','./assets/LOGO.png','./assets/Favicon.png','./assets/icon-192.webp'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)));self.skipWaiting()});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim()});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(fetch(event.request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy))}return response}).catch(()=>caches.match(event.request).then(hit=>hit||caches.match('./index.html'))))});
