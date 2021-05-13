const cacheName = 'v1';
const cacheAssets = [
  'index.html',
  'about.html',
  '/css/style.css',
  '/js/main.js',
  'favicon.ico'
];

self.addEventListener('install', e => {
  console.log('Service Worker: Installed');

  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');

  // If the version changes, remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

// Add push notification support
self.addEventListener("push", e => {
  const data = e.data.json();
  console.log("Push Recieved...");
  console.log("Data received: ", data);
  self.registration.showNotification(data, {
    body: "50% off Preferred Plan!",
    icon: "https://digc4xe6kfaun.cloudfront.net/images/about-us/new_images/Randy-Inset-240x240.png"
  });
});