const CACHE_NAME = "todopwa-v1";
const STATIC_ASSETS = [
    "/",
    "/index.html",
    "/manifest.json",
    "/pwa-64x64.png",
    "/pwa-192x192.png",
    "/pwa-512x512.png"
];

self.addEventListener("install", (event) => {
    console.log("Service Worker installing...");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching static assets");
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting(); // Aktywacja nowego SW natychmiast
});

self.addEventListener("activate", (event) => {
    console.log("Service Worker activating...");
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        console.log("Deleting old cache:", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim(); // Przejmujemy kontrolę nad wszystkimi otwartymi stronami
});

// Fetch z priorytetem sieciowym (Network First)
self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                // Jeśli pobranie zasobu z sieci się powiodło, zapisujemy go do cache
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, response.clone());
                    return response;
                });
            })
            .catch(() => {
                // Jeśli brak sieci, próbujemy pobrać z cache
                console.warn("Brak sieci, używam cache dla:", event.request.url);
                return caches.match(event.request).then((cachedResponse) => {
                    return cachedResponse || new Response("Offline", { status: 503 });
                });
            })
    );
});