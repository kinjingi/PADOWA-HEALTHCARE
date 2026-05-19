import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeFirestore, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase app (singleton)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firestore once
// Use experimentalForceLongPolling ONLY in server/Node environment (not in browser)
let db: ReturnType<typeof getFirestore>;
try {
  db = initializeFirestore(app, {
    experimentalForceLongPolling: typeof window === "undefined",
    ignoreUndefinedProperties: true,
  });
} catch (e) {
  console.warn("initializeFirestore failed, using getFirestore fallback:", e);
  db = getFirestore(app);
}

export { app, db };
