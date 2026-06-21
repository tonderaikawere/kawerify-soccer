import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkQvQoKvQoKvQoKvQoKvQoKvQoKvQoKvQ",
  authDomain: "kawerify-tournaments.firebaseapp.com",
  projectId: "kawerify-tournaments",
  storageBucket: "kawerify-tournaments.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789012345678"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// For development, you can use the Firestore emulator
// if (process.env.NODE_ENV === 'development') {
//   connectFirestoreEmulator(db, 'localhost', 8080);
// }

export default app;
