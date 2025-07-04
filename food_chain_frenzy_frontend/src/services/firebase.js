//
// Firebase setup and utility functions for authentication & storage.
// Uses environment variables for config and Google Auth as default.
//
// To use, import { auth, storage, signInWithGoogle, signOutUser } from './services/firebase';
//
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration from .env
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const provider = new GoogleAuthProvider();

// PUBLIC_INTERFACE
/**
 * Sign in with Google popup.
 * @returns {Promise} Auth user credential.
 */
export function signInWithGoogle() {
  /** This is a public function. */
  return signInWithPopup(auth, provider);
}

// PUBLIC_INTERFACE
/**
 * Sign out user from Firebase auth.
 * @returns {Promise} Resolves when signed out.
 */
export function signOutUser() {
  /** This is a public function. */
  return signOut(auth);
}

export { auth, storage };
