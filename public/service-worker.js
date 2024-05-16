self.addEventListener("push", function (event) {
  console.log("[Service Worker] Push Notification received");

  const data = event.data.json();
  console.log("[Service Worker] Push Data:", data);

  const options = {
    body: data.body,
    icon: data.icon,
    vibrate: [100, 50, 100],
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", function (event) {
  console.log("[Service Worker] Notification clicked");

  event.notification.close();
});
