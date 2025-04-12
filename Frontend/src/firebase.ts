// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import getFirestore to initialize Firestore
import { getAuth } from "firebase/auth"; // Import getAuth to initialize Firebase Auth
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPPCR-JR384RthRygs0CN-rsJmDTvnHgQ",
  authDomain: "canaville-97236.firebaseapp.com",
  projectId: "canaville-97236",
  storageBucket: "canaville-97236.firebasestorage.app",
  messagingSenderId: "665758383497",
  appId: "1:665758383497:web:ca542ebc4cb3a66465b558",
  measurementId: "G-B1R24T1PJM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const auth = getAuth(app); // Initialize Firebase Auth

export { db,auth}; // Export Firestore and Firebase Auth