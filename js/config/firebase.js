import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCne2tFwa651CnIcGx27pHS_0vuf19uEXg",
  authDomain: "arborize-33e40.firebaseapp.com",
  projectId: "arborize-33e40",
  storageBucket: "arborize-33e40.firebasestorage.app",
  messagingSenderId: "1067880262583",
  appId: "1:1067880262583:web:aeb0573145164aecc2d632"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app)
export { app, auth };
export const db = getFirestore(app); 
export const storage = getStorage(app);