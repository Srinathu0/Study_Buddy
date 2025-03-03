// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
import { getDatabase, ref as dbRef, set, get } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAuth, signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDPKbsd5T7ybACh4imj9AJoNoEZueQPRzc",
    authDomain: "mis-portal-d9c0c.firebaseapp.com",
    projectId: "mis-portal-d9c0c",
    storageBucket: "mis-portal-d9c0c.appspot.com",
    messagingSenderId: "1068991778550",
    appId: "1:1068991778550:web:2ecf94961d240b02ef66d7",
    measurementId: "G-WH5EZJJWHH",
    databaseURL: "https://mis-portal-d9c0c-default-rtdb.asia-southeast1.firebasedatabase.app" // Update with the correct URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
const db = getDatabase(app); // Initialize Realtime Database
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

    const uploadForm = document.getElementById('uploadForm');
    const popupMessage = document.getElementById('popupMessage');
    const popupMessageText = document.getElementById('popupMessageText');
    const closePopupButton = document.getElementById('closePopupButton');
    const loadingScreen = document.getElementById('loadingScreen');
    
    function showLoadingScreen() {
        loadingScreen.style.display = 'flex';
    }

    function hideLoadingScreen() {
        loadingScreen.style.display = 'none';
    }
    
    function showPopupMessage(message, isError = false) {
        popupMessageText.textContent = message;
        popupMessage.classList.add('show', 'large');
        popupMessage.classList.remove('error', 'success');
        popupMessage.classList.add(isError ? 'error' : 'success');
        if (isError) {
            popupMessage.style.backgroundColor = '#ffcccc';
        } else {
            popupMessage.style.backgroundColor = '#ccffcc';
        }
        
    }
    
    function hidePopupMessage() {
        popupMessage.classList.remove('large', 'show');
        popupMessage.classList.add('hide');
        popupMessage.addEventListener('animationend', () => {
            popupMessage.classList.remove('hide');
        }, { once: true });
    }

    if (uploadForm) {
        console.log('Upload form found');
        uploadForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const courseCode = document.getElementById('courseCode').value;
            const examType = document.getElementById('category').value;
            const file = document.getElementById('fileUpload').files[0];

            if (courseCode && examType && file) {
                console.log('Course code, exam type, and file found');
                showLoadingScreen();
                const folderRef = ref(storage, 'questionPapers/' + courseCode);
                try { 
                    // List all files in the courseCode folder to determine the next file number
                    const fileList = await listAll(folderRef);
                    const fileNumber = fileList.items.length + 1;
                    const fileName = `${courseCode}_${examType}_${fileNumber}.pdf`;
                    const fileRef = ref(storage, `questionPapers/${courseCode}/${fileName}`);

                    await uploadBytes(fileRef, file);
                    console.log('File uploaded to Firebase storage');
                    const url = await getDownloadURL(fileRef);
                    console.log('Download URL retrieved:', url);

                    // Save data to Realtime Database
                    await set(dbRef(db, 'questionPapers/' + courseCode), {
                        courseCode: courseCode,
                        pdfUrl: url,
                        examType: examType
                    });
                    console.log('Data written to Realtime Database');
                    hideLoadingScreen();
                    // Show success message
                    showPopupMessage('File uploaded successfully!');
                    //window.location.href = "question-paper.html";
                    setTimeout(() => {
                        window.location.href = "question-paper.html"; 
                      }, 3000);
                } catch (error) {
                    console.error('Error uploading file: ', error);
                    hideLoadingScreen();
                    // Show error message
                    showPopupMessage('Error uploading file. Please try again later.', true);
                }
            } else {
                showPopupMessage('Course code, exam type, or file missing. Please provide all fields.', true);
            }
        });
    } else {
        console.log('Upload form not found');
    }
    
    if (closePopupButton) {
        console.log('Close popup button found');
        closePopupButton.addEventListener('click', function() {
            hidePopupMessage();
        });
    } else {
        console.log('Close popup button not found');
    }
});
