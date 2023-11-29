"use client";
import React from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD23nyKizSD4vUnH1TVBe-TqYt0UCscixc",
  authDomain: "notification-99798.firebaseapp.com",
  projectId: "notification-99798",
  storageBucket: "notification-99798.appspot.com",
  messagingSenderId: "903903576370",
  appId: "1:903903576370:web:06b364114070f6bae1172b",
  measurementId: "G-HJNMD889H3",
};
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const requestForToken = async () => {
  try {
    const messagingResolve = messaging;
    const currentToken = await getToken(messagingResolve, {
      vapidKey:
        "BBv0Z3XuuPAH8ef_LQHc8iBjkBwYD2d-dC7SK7PHrbzOUHt5fmDmuHQaE-5nUZWPfjACF3hjy9LvVZJG1mixb4o",
    });
    if (currentToken) {
      console.log("current token for client: ", currentToken);
    } else {
      // Show permission request UI
      console.log(
        "No registration token available. Request permission to generate one."
      );
    }
  } catch (err) {
    console.log("An error occurred while retrieving token. ", err);
  }
};

export const onMessageListener = () => {
  onMessage(messaging, (payload) => {
    console.log("Message received...:", payload);
    // return paylod
    return payload;
  });
};
