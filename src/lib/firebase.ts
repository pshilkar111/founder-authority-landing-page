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
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase safely
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Use the database ID from config or default
export const db = firebaseConfig.firestoreDatabaseId
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// List of predefined administrator emails
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

  // 2. Check Firestore admin_users collection if available
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
    console.warn('Error verifying admin status in Firestore:', err);
  }

  return false;
}

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
};
export type { User };

export default app;
