// For Demo Purpose [Changing input group text on focus]
// $(function () {
//     $('input, select').on('focus', function () {
//         $(this).parent().find('.input-group-text').css('border-color', '#80bdff');
//     });
//     $('input, select').on('blur', function () {
//         $(this).parent().find('.input-group-text').css('border-color', '#ced4da');
//     });
// });

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

// Your Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const loadingScreen = document.getElementById("loading-screen");
//const signupForm = document.querySelector('form');
const emailErrorModal = document.getElementById("email-error-modal");
const closeEmailModal = document.getElementById("close-email-modal");
const phoneErrorModal = document.getElementById("phone-error-modal");
const closePhoneModal = document.getElementById("close-phone-modal");
// Reference to the signup form
const signupForm = document.querySelector('form'); // Match the form tag
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  loadingScreen.classList.add("show");
  // Get form values
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phoneNumber").value;
  const password = document.getElementById("password").value;
  const passwordConfirmation = document.getElementById("passwordConfirmation").value;

  // Basic validations
  const emailRegex = /^[a-zA-Z0-9._%+-]+@vitstudent\.ac\.in$/;
  if (!emailRegex.test(email)) {
    //alert("Please use your VIT student email ending with @vitstudent.ac.in.");
    emailErrorModal.style.display = "block";
    loadingScreen.classList.remove("show");
    return;
  }

  if (password.length < 6) {
    //alert("Password must be at least 6 characters long.");
    phoneErrorModal.style.display = "block";
    loadingScreen.classList.remove("show");
    return;
  }

  if (password !== passwordConfirmation) {
    alert("Passwords do not match.");
    loadingScreen.classList.remove("show");
    return;
  }

  if (phone.length !== 10 || isNaN(phone)) {
    alert("Please enter a valid 10-digit mobile number.");
    loadingScreen.classList.remove("show");
    return;
  }

  // Create user with email and password using Firebase Authentication
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // Store user data in the Firebase Realtime Database
      set(ref(database, 'users/' + user.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        password: password // You might want to hash this before storing it for security
      })
        .then(() => {
          // alert("Account created successfully!");
          loadingScreen.classList.remove("show");
          const modal = document.getElementById("success-modal");
            
            if (modal) {
                console.log("Modal found. Displaying now..."); // Debugging
                
                // Set the display to block to show the modal
                modal.style.display = "block";
                modal.style.visibility = "visible";  // Ensure it's visible
        
                // Close the modal when clicking on the close button
                const closeModalButton = document.getElementById("close-modal");
                closeModalButton.onclick = function() {
                    console.log("Modal close button clicked."); // Debugging
                    modal.style.display = "none";
                    window.location.href = "loginmain.html"; // Redirect to login page after closing
                };
        
                // Close the modal if the user clicks outside of it
                window.onclick = function(event) {
                    if (event.target == modal) {
                        console.log("Clicked outside the modal."); // Debugging
                        modal.style.display = "none";
                        window.location.href = "loginmain.html"; // Redirect to login page
                    }
                };
            } else {
                console.error("Modal element not found!"); // Debugging
            }
        })
        .catch((error) => {
          console.error("Error storing user data: ", error);
          loadingScreen.classList.remove("show");
        });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(`Signup Error [${errorCode}]: ${errorMessage}`);
      loadingScreen.classList.remove("show");
    });
});

closeEmailModal.onclick = function() {
  emailErrorModal.style.display = "none";
};

// Close the email error modal when clicking outside of it
window.onclick = function(event) {
  if (event.target == emailErrorModal) {
    emailErrorModal.style.display = "none";
  }
};

closePhoneModal.onclick = function() {
  phoneErrorModal.style.display = "none";
};

// Close the email error modal when clicking outside of it
window.onclick = function(event) {
  if (event.target == phoneErrorModal) {
    phoneErrorModal.style.display = "none";
  }
};