// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnKuzMTIo5FxwaHicMqXHABKosx4jFUm8",
  authDomain: "ssuik-wallet.firebaseapp.com",
  projectId: "ssuik-wallet",
  storageBucket: "ssuik-wallet.appspot.com",
  messagingSenderId: "765847562735",
  appId: "1:765847562735:web:f0c6a6f3a36c222f936e1a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);