const STATIC_ASSETS = ['/static/sprite.svg', '/manifest.json'];

const STATIC_CACHE_NAME = 'static-data-v1';
const DYNAMIC_CACHE_NAME = 'dynamic-data-v1';

const networkFirst = async (request) => {
  const cache = await caches.open(DYNAMIC_CACHE_NAME);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());

    return response;
  } catch (error) {
    return cache.match(request);
  }
};

const update = async (request) => {
  return caches
    .open(DYNAMIC_CACHE_NAME)
    .then((cache) =>
      fetch(request).then((response) => cache.put(request, response))
    );
};

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => {
        return cache.addAll(STATIC_ASSETS);
      })
      // eslint-disable-next-line no-restricted-globals
      .then(() => self.skipWaiting())
      .catch((err) => {
        throw err;
      })
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const { url, method } = request;

  if (method !== 'GET') {
    return;
  }

  if (!(url.indexOf('http') === 0)) {
    return;
  }

  event.respondWith(networkFirst(request));
  event.waitUntil(update(request));
});
