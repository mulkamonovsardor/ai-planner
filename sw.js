// AI Planner — Service Worker v1.0
// Offline ishlash, kesh boshqaruvi

const CACHE_NAME = 'ai-planner-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap'
];

// Install — barcha asosiy fayllarni keshlash
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS.filter(url => !url.startsWith('http')));
      })
      .then(() => self.skipWaiting())
  );
});

// Activate — eski keshlarni tozalash
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => {
            console.log('[SW] Deleting old cache:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim())
  );
});

// Fetch — Network first, fallback to cache
self.addEventListener('fetch', event => {
  const { request } = event;
  
  // Google Fonts — cache first
  if (request.url.includes('fonts.googleapis.com') || request.url.includes('fonts.gstatic.com')) {
    event.respondWith(
      caches.open(CACHE_NAME).then(cache =>
        cache.match(request).then(cached => {
          if (cached) return cached;
          return fetch(request).then(response => {
            cache.put(request, response.clone());
            return response;
          });
        })
      )
    );
    return;
  }

  // Prayer API — network only (real vaqt kerak)
  if (request.url.includes('namoz-vaqtlari') || request.url.includes('islomapi')) {
    event.respondWith(fetch(request).catch(() => new Response('{}', { headers: { 'Content-Type': 'application/json' } })));
    return;
  }

  // App shell — cache first, network fallback
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (!response || response.status !== 200 || response.type !== 'basic') return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
        return response;
      }).catch(() => caches.match('/index.html'));
    })
  );
});

// Push notifications — namoz vaqtlari uchun
self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  const title = data.title || '🕌 Namoz Vaqti';
  const options = {
    body: data.body || 'Namoz vaqti keldi',
    icon: '/icon-192.png',
    badge: '/icon-32.png',
    vibrate: [200, 100, 200],
    tag: 'prayer-notification',
    renotify: true,
    actions: [
      { action: 'mark-done', title: '✅ Bajarildi' },
      { action: 'dismiss', title: 'Keyinroq' }
    ]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'mark-done') {
    // Prayer completed — app ga xabar yuborish
    event.waitUntil(
      self.clients.matchAll({ type: 'window' }).then(clients => {
        if (clients.length) {
          clients[0].postMessage({ type: 'PRAYER_DONE', prayer: event.notification.tag });
          clients[0].focus();
        } else {
          self.clients.openWindow('/?action=prayer-done');
        }
      })
    );
  } else {
    event.waitUntil(
      self.clients.matchAll({ type: 'window' }).then(clients => {
        if (clients.length) clients[0].focus();
        else self.clients.openWindow('/');
      })
    );
  }
});
