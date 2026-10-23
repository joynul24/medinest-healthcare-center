/**
 * @file firebase.config.js
 * @description Firebase initialization configuration for MediNest Healthcare Center.
 * Configured with live Firebase credentials provided for authentication and analytics.
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Web app's Firebase configuration for MediNest
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyD3yZCfByIzATaIxXBvhHHu_vW9ABCZNSw',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'medinest-healthcare-center.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'medinest-healthcare-center',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'medinest-healthcare-center.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '642453711873',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:642453711873:web:55f7364920d399c6492400',
  measurementId: 'G-G6EE4KEVW8',
};

// Initialize Firebase app safely
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Authentication with Google Auth Provider
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Custom parameters to ensure prompt selection
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export { app, auth, googleProvider };
export default app;
