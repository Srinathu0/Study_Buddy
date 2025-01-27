// Import Firebase services
import { ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
// import { signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// Access Firebase services from the global object
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
const storage = getStorage(app);
const auth = getAuth(app);

// Sign in anonymously
signInAnonymously(auth)
  .then(() => {
    console.log('Signed in anonymously');
  })
  .catch((error) => {
    console.error('Error signing in anonymously: ', error);
  });

// Monitor auth state
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('User is signed in:', user);
  } else {
    console.log('No user is signed in.');
  }
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    function showLoadingScreen() {
        loadingScreen.style.display = 'flex';
    }

    function hideLoadingScreen() {
        loadingScreen.style.display = 'none';
    }
    // Download Functionality
    const searchButton = document.getElementById('searchProjectButton');
    if (searchButton) {
        searchButton.addEventListener('click', async function() {
            const courseCode = document.getElementById('projectCourseCode').value;
            const projectList = document.getElementById('projectList');

            if (courseCode) {
                showLoadingScreen();
                try {
                    const folderRef = ref(storage, 'questionPapers/' + courseCode);
                    const fileList = await listAll(folderRef);
                    projectList.innerHTML = '';

                    if (fileList.items.length > 0) {
                        fileList.items.forEach(async (itemRef) => {
                            const fileUrl = await getDownloadURL(itemRef);
                            projectList.innerHTML += `<a href="${fileUrl}" target="_blank">${itemRef.name}</a><br>`;
                            hideLoadingScreen();
                        });
                    } else {
                        projectList.innerHTML = 'No files found for this course code.';
                        hideLoadingScreen();
                    }
                } catch (error) {
                    console.error('Error getting data: ', error);
                    projectList.innerHTML = 'Error retrieving files. Please try again later.';
                    hideLoadingScreen();
                }
            }
        });
    }
});
