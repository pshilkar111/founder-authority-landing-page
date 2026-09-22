import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';

/**
 * Connected Firebase Project Configuration
 * Project ID: founderauthority-ffb73
 */
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: "founderauthority-ffb73.firebaseapp.com",
  projectId: "founderauthority-ffb73",
  storageBucket: "founderauthority-ffb73.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID",
};

// Initialize Firebase App safely
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Cloud Firestore database for project 'founderauthority-ffb73'
export const db = getFirestore(app);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Configure Google Sign-In Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// List of predefined administrator emails for founder authority
export const DEFAULT_ADMIN_EMAILS = [
  'pshilkar111@gmail.com',
  'admin@founderauthority.in',
  'admin@founderauthority.com',
];

/**
 * Validates if the authenticated user has administrator privileges
 */
export async function checkIsAdminUser(user: User | null): Promise<boolean> {
  if (!user || !user.email) return false;

  const normalizedEmail = user.email.toLowerCase().trim();

  // 1. Check primary admin list
  if (DEFAULT_ADMIN_EMAILS.some((adm) => adm.toLowerCase() === normalizedEmail)) {
    return true;
  }

  // 2. Check Firestore admin_users collection if document exists
  try {
    if (db) {
      const adminDocRef = doc(db, 'admin_users', normalizedEmail);
      const adminSnap = await getDoc(adminDocRef);
      if (adminSnap.exists()) {
        const data = adminSnap.data();
        if (data.role === 'admin' || data.role === 'superadmin' || data.isAdmin === true) {
          return true;
        }
      }
    }
  } catch (err) {
    console.warn('Notice verifying admin status in Firestore:', err);
  }

  return false;
}

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  doc,
  getDoc,
  setDoc,
};
export type { User };

export default app;
