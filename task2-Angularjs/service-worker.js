const CACHE_NAME = "task-manager-v1";
const ASSETS = [
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
  "https://cdn.jsdelivr.net/npm/localforage@1.10.0/dist/localforage.min.js",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js",
  "app/lib/angular.min.js",
  "/index.html",
  "/app/app.js",
  "/app/tasks.js",
  "/app/utils.js",
  "/app/components/addTask/addTask.controller.js",
  "/app/components/completedTask/completed.controller.js",
  "/app/components/todoTask/todo.controller.js",
  "/app/components/footer/footer.controller.js",
  "/app/services/tasks.service.js",
  "/service-worker.js",
  "/app/manifest.json",
  "app/components/addTask/addTask.template.html",
  "app/components/todoTask/todo.template.html",
  "app/components/completedTask/completed.template.html",
  "app/components/footer/footer.template.html",
  "public/icons/icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          // Fallback for failed requests (e.g., show custom offline page)
          return caches.match("/"); // Always return the app shell
        })
      );
    })
  );
});
