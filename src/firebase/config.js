import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Real Firebase Web App Configuration for Havas Market
const firebaseConfig = {
  apiKey: "AIzaSyATE9IAYiXgc4sQtbGKAJt36zS1t35014o",
  authDomain: "havas-market.firebaseapp.com",
  projectId: "havas-market",
  storageBucket: "havas-market.firebasestorage.app",
  messagingSenderId: "748534342859",
  appId: "1:748534342859:web:85a034f602ab51226e274e",
  measurementId: "G-L0W5JJE57J"
};

// Initialize Firebase instance
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
auth.useDeviceLanguage();

export default app;
