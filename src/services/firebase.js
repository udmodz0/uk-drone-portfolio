import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

let db = null;
let initPromise = null;

// Fetch Firebase Configuration dynamically from backend endpoint
export async function getFirebaseDb() {
  if (db) return db;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      let config = null;
      
      // Attempt to fetch configuration from backend API
      try {
        const response = await fetch('/api/firebase-config');
        if (response.ok) {
          config = await response.json();
        }
      } catch (err) {
        console.warn('Could not fetch Firebase config from backend endpoint, using environment/runtime fallback:', err);
      }

      // Hardcoded fallback config if backend request unavailable
      if (!config || !config.apiKey) {
        config = {
          apiKey: "AIzaSyCJdashCu7Lddn2bmXExCq_u-FQA1IomH0",
          authDomain: "airvibeuk-db.firebaseapp.com",
          projectId: "airvibeuk-db",
          storageBucket: "airvibeuk-db.firebasestorage.app",
          messagingSenderId: "752474421961",
          appId: "1:752474421961:web:cfe9d65735a598ffad6b18",
          measurementId: "G-L4DJ1QKQPZ"
        };
      }

      const app = !getApps().length ? initializeApp(config) : getApp();
      db = getFirestore(app);
      return db;
    } catch (error) {
      console.error('Firebase initialization error:', error);
      return null;
    }
  })();

  return initPromise;
}

// Fetch site pricing and package data from Firebase Firestore
export async function fetchSiteDataFromFirebase() {
  try {
    const firestore = await getFirebaseDb();
    if (!firestore) return null;

    const docRef = doc(firestore, 'siteConfig', 'pricing');
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      return snapshot.data();
    }
  } catch (error) {
    console.error('Error fetching site data from Firebase:', error);
  }
  return null;
}

// Save site pricing and package data to Firebase Firestore
export async function saveSiteDataToFirebase(data) {
  try {
    const firestore = await getFirebaseDb();
    if (!firestore) return false;

    const docRef = doc(firestore, 'siteConfig', 'pricing');
    await setDoc(docRef, data, { merge: true });
    return true;
  } catch (error) {
    console.error('Error saving site data to Firebase:', error);
    return false;
  }
}
