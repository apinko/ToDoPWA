<<<<<<< HEAD
const CACHE_NAME = "todopwa-v2";
=======
const CACHE_NAME = "todopwa-v1";
>>>>>>> apinko_version3.2
const STATIC_ASSETS = [
    "/",
    "/index.html",
    "/manifest.json",
<<<<<<< HEAD
    "/offline.html", // 📌 Dodano stronę offline
=======
>>>>>>> apinko_version3.2
    "/pwa-64x64.png",
    "/pwa-192x192.png",
    "/pwa-512x512.png"
];

<<<<<<< HEAD
// Instalacja Service Workera i cache'owanie plików
self.addEventListener("install", (event) => {
    console.log("🛠️ Service Worker installing...");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("📦 Caching static assets...");
            return cache.addAll(STATIC_ASSETS);
        })
    );
    self.skipWaiting(); // 📌 Aktywacja nowego SW natychmiast
});

// Aktywacja i czyszczenie starego cache
self.addEventListener("activate", (event) => {
    console.log("⚡ Service Worker activating...");
=======
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
>>>>>>> apinko_version3.2
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
<<<<<<< HEAD
                        console.log("🗑️ Usuwam stary cache:", key);
=======
                        console.log("Deleting old cache:", key);
>>>>>>> apinko_version3.2
                        return caches.delete(key);
                    }
                })
            );
        })
    );
<<<<<<< HEAD
    self.clients.claim(); // 📌 Od razu przejmujemy kontrolę nad otwartymi stronami
});

// Obsługa kliknięcia powiadomienia
self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    console.log("🔔 Powiadomienie kliknięte:", event.notification);
});

// Obsługa push notifications z wibracjami
=======
    self.clients.claim(); // Przejmujemy kontrolę nad wszystkimi otwartymi stronami
});

self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    console.log("🔔 Powiadomienie kliknięte:", event.notification);
  });

// Obsługa powiadomień push z wibracjami
>>>>>>> apinko_version3.2
self.addEventListener("push", (event) => {
    console.log("🔔 Otrzymano event push w Service Workerze");
    const data = event.data ? event.data.json() : { title: "Nowe zadanie", body: "Dodano nowe zadanie!" };

    const options = {
        body: data.body,
<<<<<<< HEAD
        icon: "/pwa-192x192.png",
        badge: "/pwa-64x64.png",
=======
        icon: "/icon.png",
        badge: "/badge.png",
>>>>>>> apinko_version3.2
        vibrate: [200, 100, 200], // 📳 Wibracja na mobilnych (ignorowane na PC)
        requireInteraction: true // ⏳ Na PC powiadomienie nie zniknie samo
    };

    event.waitUntil(
        self.registration.showNotification(data.title, options)
            .catch(err => console.error("❌ Błąd wyświetlania powiadomienia:", err))
    );
});

<<<<<<< HEAD
// 📌 Fetch z priorytetem sieciowym (Network First + obsługa offline)
self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);

    // 📌 Ignorujemy zasoby z rozszerzeń Chrome, aby uniknąć błędów
    if (url.protocol === "chrome-extension:") {
        return;
    }

    event.respondWith(
        fetch(event.request) // 🔹 1. Najpierw próbujemy pobrać zasób z sieci
            .then((response) => {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, response.clone()); // 🔹 2. Jeśli sukces, zapisujemy do cache
                    return response; // 🔹 3. Zwracamy użytkownikowi odpowiedź z sieci
                });
            })
            .catch(() => {
                console.warn("⚠️ Brak sieci, próbuję znaleźć w cache:", event.request.url);
                return caches.match(event.request).then((cachedResponse) => {
                    return cachedResponse || caches.match("/offline.html"); // 📌 4. Jeśli brak sieci, pobieramy z cache
                });
            })
    );
});
=======
// Obsługa zamykania powiadomień
self.addEventListener("notificationclose", (event) => {
    console.log("🔕 Powiadomienie zostało zamknięte:", event.notification);
    if ("vibrate" in navigator) {
        navigator.vibrate([200, 100, 200]); // Wibracja: 200ms - przerwa 100ms - 200ms
    }
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
>>>>>>> apinko_version3.2
