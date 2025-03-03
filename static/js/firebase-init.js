// Import Firebase services
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPKbsd5T7ybACh4imj9AJoNoEZueQPRzc",
    authDomain: "mis-portal-d9c0c.firebaseapp.com",
    projectId: "mis-portal-d9c0c",
    storageBucket: "mis-portal-d9c0c.appspot.com",
    messagingSenderId: "1068991778550",
    appId: "1:1068991778550:web:2ecf94961d240b02ef66d7",
    measurementId: "G-WH5EZJJWHH",
    databaseURL: "https://mis-portal-d9c0c-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getDatabase(app);
const auth = getAuth(app);

// Make Firebase services available globally
window.firebaseServices = {
    app,
    analytics,
    storage,
    db,
    auth
};
