// firebase.ts

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBxv8rsMCjYE5-GHL6oXDYy68pbvNK2YZM',
  authDomain: 'ridenshare-dede5.firebaseapp.com',
  projectId: 'ridenshare-dede5',
  storageBucket: 'ridenshare-dede5.firebasestorage.app',
  messagingSenderId: '72514895432', 
  appId: '1:72514895432:android:5ba6731a0843ee32f4a27d',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Retrieve Firebase Messaging
const messaging = getMessaging(app);

export { messaging, getToken, onMessage };
