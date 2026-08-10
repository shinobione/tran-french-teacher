const CACHE = 'tran-french-teacher-v1.4.0-b9';
const CORE = [
  './',
  './index.html',
  './styles.css',
  './brand.css',
  './app.js',
  './debug-fr.js',
  './voice-ios.js',
  './free-voice.js',
  './brand.js',
  './manifest.webmanifest',
  './assets/favicon-32.png',
  './assets/apple-touch-icon.png',
  './assets/icon-192.webp',
  './assets/brand/logo.1.b64',
  './assets/brand/logo.2.b64',
  './assets/brand/logo.3.b64',
  './assets/brand/logo.4.b64'
];
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)));
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(event.request, copy));
        }
        return response;
      })
      .catch(() => caches.match(event.request).then(hit => hit || caches.match('./index.html')))
  );
});
