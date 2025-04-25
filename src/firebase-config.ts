import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';  // Firebase Authentication
import { getFirestore } from 'firebase/firestore';  // Firestore Database

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDxWZtpm18wowWrsmi6K2hoYaSYarxY0A0",
  authDomain: "login-regist-c0994.firebaseapp.com",
  projectId: "login-regist-c0994",
  storageBucket: "login-regist-c0994.firebasestorage.app",
  messagingSenderId: "957253155928",
  appId: "1:957253155928:web:3b3d5c39b4a9a98a345e2d",
  measurementId: "G-37H7DWSTND"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore
export const firestore = getFirestore(app);
