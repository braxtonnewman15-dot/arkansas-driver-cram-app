/* Offline app shell for the Arkansas Driver Exam Prep PWA. */
const CACHE_PREFIX = 'arkansas-driver-prep';
const CACHE_VERSION = 'v1';
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VERSION}`;
const BASE_URL = new URL('./', self.registration.scope);
const APP_SHELL = [
  BASE_URL.href,
  new URL('index.html', BASE_URL).href,
  new URL('manifest.webmanifest', BASE_URL).href,
  new URL('icons/icon-192.png', BASE_URL).href,
  new URL('icons/icon-512.png', BASE_URL).href,
  new URL('icons/apple-touch-icon.png', BASE_URL).href
];

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(APP_SHELL);
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  // Don't intercept third-party audio, official exam websites, or other external URLs.
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cached = await caches.match(request, { ignoreSearch: true });
    if (cached) {
      // Refresh the cache in the background when online, while showing the cached app immediately.
      event.waitUntil((async () => {
        try {
          const fresh = await fetch(request);
          if (fresh && fresh.ok) {
            const cache = await caches.open(CACHE_NAME);
            await cache.put(request, fresh.clone());
          }
        } catch (_) { /* Offline: cached response remains available. */ }
      })());
      return cached;
    }

    try {
      const response = await fetch(request);
      if (response && response.ok && (request.destination === 'document' || request.destination === 'script' || request.destination === 'style' || request.destination === 'image' || url.pathname.endsWith('.webmanifest'))) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(request, response.clone()).catch(() => {});
      }
      return response;
    } catch (error) {
      if (request.mode === 'navigate') {
        const fallback = await caches.match(new URL('index.html', BASE_URL).href);
        if (fallback) return fallback;
      }
      return new Response('You appear to be offline. Open the app once while connected to cache the study course, then try again.', {
        status: 503,
        headers: { 'Content-Type': 'text/plain; charset=utf-8' }
      });
    }
  })());
});
