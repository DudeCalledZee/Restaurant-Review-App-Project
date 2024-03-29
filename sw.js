const cacheFiles = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/data/restaurants.json',
  '/js/dbhelper.js',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll(cacheFiles);
    })
  );
});

self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(re) {
		if (re) {
			return re;
		}
		else {
			return fetch(e.request)
			.then(function(re) {
				const clonedre = re.clone();
				caches.open('v1').then(function(cache) {
					cache.put(e.request, clonedre);
				})
				return re;
			})
			.catch(function(error) {
				console.error(error);
			});
		}
	})
  );
});
