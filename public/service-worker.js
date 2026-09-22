// The old site registered a service worker that keeps serving its cached pages.
// Browsers fetch this file to update that worker; this version clears its caches,
// unregisters itself, and reloads open tabs so they load the current site.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((client) => client.navigate(client.url));
    })()
  );
});
