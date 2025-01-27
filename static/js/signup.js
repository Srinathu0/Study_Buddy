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
    //databaseURL: "https://study-buddy-2aba2-default-rtdb.firebaseio.com"
    databaseURL: "https://study-buddy-2aba2-default-rtdb.asia-southeast1.firebasedatabase.app" 
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);

  // Reference to the signup form
  const signupForm = document.getElementById("signup-form");
  const loadingScreen = document.getElementById("loading-screen");

  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Show loading screen immediately after the form is submitted
    //loadingScreen.style.visibility = "visible";
    loadingScreen.classList.add("show");

    // Get form values
    const fullName = document.getElementById("fullname").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Check if the password is at least 6 characters long
    if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      //loadingScreen.style.display = "none";
      loadingScreen.classList.remove("show");
      return; // Stop the signup process if password is too short
    }

    // Create user with email and password using Firebase Authentication
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        // Store user data in the Firebase Realtime Database
        set(ref(database, 'users/' + user.uid), {
          fullName: fullName,
          email: email,
          password: password  // You might want to hash this before storing it for security
        })
          .then(() => {
            //loadingScreen.style.display = "none";
            loadingScreen.classList.remove("show");
            console.log("Data successfully written to Firebase."); // Debugging
        
            // Check if modal exists
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
                    window.location.href = "login.html"; // Redirect to login page after closing
                };
        
                // Close the modal if the user clicks outside of it
                window.onclick = function(event) {
                    if (event.target == modal) {
                        console.log("Clicked outside the modal."); // Debugging
                        modal.style.display = "none";
                        window.location.href = "login.html"; // Redirect to login page
                    }
                };
            } else {
                console.error("Modal element not found!"); // Debugging
            }
        })
        .catch((error) => {
            console.error("Error storing user data: ", error);
            //loadingScreen.style.display = "none";
            loadingScreen.classList.remove("show");
        });      
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Signup Error [${errorCode}]: ${errorMessage}`);
        //loadingScreen.style.display = "none";
        loadingScreen.classList.remove("show");
      });
});