const cacheName = 'todopwa-app'

const STATIC = [
    '/manifest.json',
    '/favicon.ico',
    '/pwa-64x64.png',
    '/pwa-192x192.png',
    '/pwa-512x512.png',
  ];

self.addEventListener('install', (event) => {
    console.log('SW install')
    event.waitUntil(
        caches.open(cacheName).then((cache) => {
          console.log('Open cache');
          return cache.addAll(STATIC);
        })
      );
})

self.addEventListener('activate', (event) => {
    console.log('SW activate')

    event.waitUntil(caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.filter(item => item !== cacheName).map(name => caches.delete(name)))
    }))
})

self.addEventListener('fetch', (event) => {
    console.log('SW fetch')
    event.respondWith(
        caches.match(event.request).then(response => {
            if(response) {
                return response
            }
            return fetch(event.request)
            .then(response => {
            return caches.open(cacheName).then(cache => {cache.put(event.request, response.clone())
                return response
            })
        })
        })
    )
})