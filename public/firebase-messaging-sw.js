// Scripts for firebase and firebase messaging
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyD23nyKizSD4vUnH1TVBe-TqYt0UCscixc",
  authDomain: "notification-99798.firebaseapp.com",
  projectId: "notification-99798",
  storageBucket: "notification-99798.appspot.com",
  messagingSenderId: "903903576370",
  appId: "1:903903576370:web:06b364114070f6bae1172b",
  measurementId: "G-HJNMD889H3",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  // console.log("Received background message ", payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
