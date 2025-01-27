import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC02PDf8lXPB6nKJjXgtqS8LvIbmeO0r5E",
  authDomain: "study-buddy-2aba2.firebaseapp.com",
  projectId: "study-buddy-2aba2",
  storageBucket: "study-buddy-2aba2.appspot.com",
  messagingSenderId: "850734171944",
  appId: "1:850734171944:web:16e758e5f3dcb6890cf21d",
  measurementId: "G-VTMHQ6R1D4",
  databaseURL: "https://study-buddy-2aba2-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const popup = document.getElementById("success-popup");
const popupMessage = document.getElementById("popup-message");
const loadingScreen = document.getElementById("loading-screen");
const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    loadingScreen.classList.add("show");
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            loadingScreen.classList.remove("show");
            const user = userCredential.user;
            console.log('User logged in:', user);
            popupMessage.textContent = "Login Successful!";
            popup.classList.remove("hidden", "error");
            popup.classList.add("show", "success");
            setTimeout(() => {
                window.location.href = "adminMain.html";
            }, 3000);
        })
        .catch((error) => {
            loadingScreen.classList.remove("show");
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(`Login failed: [${errorCode}] ${errorMessage}`);
            popupMessage.textContent = `Login Failed !!!`;
            popup.classList.remove("hidden", "success");
            popup.classList.add("show", "error");
            setTimeout(() => {
                popup.classList.add("hidden");
            }, 3000);
        });
});