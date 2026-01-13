const CACHE_NAME = "portfolio-cache-v1";

const ASSETS = [
  "/portfolio/",
  "/portfolio/index.html",
  "/portfolio/manifest.json",
  "/portfolio/resume.pdf",
  "/portfolio/images/favicon-16x16.png",
  "/portfolio/images/favicon-32x32.png",
  "/portfolio/images/favicon-32x32.png",
  "/portfolio/images/favicon-16x16.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      }))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
