importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");
firebase.initializeApp({
 apiKey: "config data from general tab",
 authDomain: "config data from general tab",
 databaseURL: "config data from general tab",
 projectId: "config data from general tab",
 storageBucket: "config data from general tab",
 messagingSenderId: "config data from general tab",
 appId: "config data from general tab",
 measurementId: "config data from general tab"
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  // fcp_options.link field from the FCM backend service goes there, but as the host differ, it not handled by Firebase JS Client sdk, so custom handling
  if (event.notification && event.notification.data && event.notification.data.FCM_MSG && event.notification.data.FCM_MSG.notification) {
      const url = event.notification.data.FCM_MSG.notification.click_action;
      event.waitUntil(
          self.clients.matchAll({type: 'window'}).then( windowClients => {
              // Check if there is already a window/tab open with the target URL
              for (var i = 0; i < windowClients.length; i++) {
                  var client = windowClients[i];
                  // If so, just focus it.
                  if (client.url === url && 'focus' in client) {
                      return client.focus();
                  }
              }
              // If not, then open the target URL in a new window/tab.
              if (self.clients.openWindow) {
                  console.log("open window")
                  return self.clients.openWindow(url);
              }
          })
      )
  }
}, false);

const messaging = firebase.messaging();
