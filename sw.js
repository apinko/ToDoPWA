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

// Obsługa powiadomień push z wibracjami
self.addEventListener("push", (event) => {
    console.log("🔔 Otrzymano event push w Service Workerze");
    const data = event.data ? event.data.json() : { title: "Nowe zadanie", body: "Dodano nowe zadanie!" };

    const options = {
        body: data.body,
        icon: "/icon.png",
        badge: "/badge.png",
        vibrate: [200, 100, 200], // 📳 Wibracja na mobilnych (ignorowane na PC)
        requireInteraction: true // ⏳ Na PC powiadomienie nie zniknie samo
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
            .catch(err => console.error("❌ Błąd wyświetlania powiadomienia:", err))
    );
});

// Obsługa zamykania powiadomień
self.addEventListener("notificationclose", (event) => {
    console.log("🔕 Powiadomienie zostało zamknięte:", event.notification);
});

// Fetch z priorytetem sieciowym (Network First)
self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);
    if (url.protocol === "chrome-extension:") {
        return; // Ignorujemy zasoby rozszerzeń
    }

    event.respondWith(
        fetch(event.request)
            .then((response) => {
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
