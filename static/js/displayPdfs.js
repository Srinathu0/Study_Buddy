// Firebase configuration
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
firebase.initializeApp(firebaseConfig);
const analytics = firebase.analytics();
const storage = firebase.storage();
const db = firebase.database();
const auth = firebase.auth();

// Sign in anonymously
auth.signInAnonymously().catch((error) => {
    console.error('Error signing in anonymously:', error);
});

auth.onAuthStateChanged((user) => {
    if (user) {
        console.log('User signed in anonymously:', user.uid);
    } else {
        console.log('User is signed out');
    }
});

function showLoadingScreen() {
    document.getElementById('loadingScreen').style.display = 'flex';
}

function hideLoadingScreen() {
    document.getElementById('loadingScreen').style.display = 'none';
}

function showPopupMessage(message, isError = false) {
    const popupMessage = document.getElementById('popupMessage');
    popupMessage.textContent = message;
    popupMessage.className = isError ? 'error' : 'success';
    popupMessage.style.display = 'block';
    setTimeout(() => {
        popupMessage.style.display = 'none';
    }, 3000);
}

// async function displayFoldersAndPdfs() {
//     showLoadingScreen();
//     const foldersContainer = document.getElementById('foldersContainer');
//     foldersContainer.innerHTML = '';

//     try {
//         const rootRef = firebase.storage().ref('questionPapers'); // Root folder in storage
//         const folderList = await rootRef.listAll();

//         if (folderList.prefixes.length === 0) {
//             foldersContainer.innerHTML = '<p>No folders found.</p>';
//         } else {
//             // Loop through each folder
//             for (const folderRef of folderList.prefixes) {
//                 const folderName = folderRef.name;
//                 const folderDiv = document.createElement('div');
//                 folderDiv.innerHTML = `<h3>${folderName}</h3>`;
//                 foldersContainer.appendChild(folderDiv);

//                 // List files within each folder
//                 const fileList = await folderRef.listAll();
//                 if (fileList.items.length > 0) {
//                     const fileUl = document.createElement('ul');
//                     for (const fileRef of fileList.items) {
//                         const fileUrl = await fileRef.getDownloadURL();
//                         const fileLi = document.createElement('li');
//                         fileLi.innerHTML = `<a href="${fileUrl}" target="_blank">${fileRef.name}</a>`;
//                         fileUl.appendChild(fileLi);
//                     }
//                     folderDiv.appendChild(fileUl);
//                 } else {
//                     folderDiv.innerHTML += '<p>No files found in this folder.</p>';
//                 }
//             }
//         }
//     } catch (error) {
//         console.error('Error listing folders and files:', error);
//         showPopupMessage('Error loading files. Please try again later.', true);
//     } finally {
//         hideLoadingScreen();
//     }
// }

// // Call the function to display folders and PDFs
// displayFoldersAndPdfs();

// Function to delete a PDF
async function deletePDF(fileRef, listItem) {
    try {
        await fileRef.delete();
        listItem.remove();  // Remove the list item from the DOM
        showPopupMessage('File deleted successfully.');
    } catch (error) {
        console.error('Error deleting file:', error);
        showPopupMessage('Error deleting file. Please try again.', true);
    }
}

// async function displayFoldersAndPdfs() {
//     showLoadingScreen();
//     const foldersContainer = document.getElementById('foldersContainer');
//     foldersContainer.innerHTML = '';

//     try {
//         const rootRef = firebase.storage().ref('questionPapers'); // Root folder in storage
//         const folderList = await rootRef.listAll();

//         if (folderList.prefixes.length === 0) {
//             foldersContainer.innerHTML = '<p>No folders found.</p>';
//         } else {
//             // Loop through each folder
//             for (const folderRef of folderList.prefixes) {
//                 const folderName = folderRef.name;
//                 const folderDiv = document.createElement('div');
//                 folderDiv.classList.add('folder');
//                 folderDiv.innerHTML = `<span>${folderName}</span><i class="fas fa-chevron-down"></i>`;

//                 const fileUl = document.createElement('ul');
//                 fileUl.classList.add('file-list');

//                 // Toggle files display on click
//                 folderDiv.addEventListener('click', async () => {
//                     const isActive = folderDiv.classList.toggle('active');
//                     fileUl.style.display = isActive ? 'block' : 'none';

//                     // Fetch files if not already loaded
//                     if (isActive && fileUl.childNodes.length === 0) {
//                         const fileList = await folderRef.listAll();
//                         if (fileList.items.length > 0) {
//                             fileList.items.forEach(async (fileRef) => {
//                                 const fileUrl = await fileRef.getDownloadURL();
//                                 const fileLi = document.createElement('li');
//                                 // fileLi.innerHTML = `<a href="${fileUrl}" target="_blank">${fileRef.name}</a>`;
//                                 // fileUl.appendChild(fileLi);
//                                 fileLi.style.display = 'flex';
//                                 fileLi.style.alignItems = 'center';

//                                 // PDF Link
//                                 const fileLink = document.createElement('a');
//                                 fileLink.href = fileUrl;
//                                 fileLink.target = '_blank';
//                                 fileLink.textContent = fileRef.name;
//                                 fileLink.style.marginRight = '10px';

//                                 // Delete Icon
//                                 const deleteIcon = document.createElement('i');
//                                 deleteIcon.classList.add('fas', 'fa-trash-alt');
//                                 deleteIcon.style.color = '#f44336';
//                                 deleteIcon.style.cursor = 'pointer';

//                                 // Delete Functionality
//                                 deleteIcon.addEventListener('click', (e) => {
//                                     e.stopPropagation(); // Prevent folder toggle on delete
//                                     deletePDF(fileRef, fileLi);
//                                 });

//                                 // Append elements
//                                 fileLi.appendChild(fileLink);
//                                 fileLi.appendChild(deleteIcon);
//                                 fileUl.appendChild(fileLi);
//                             });
//                         } else {
//                             fileUl.innerHTML = '<p>No files found in this folder.</p>';
//                         }
//                     }
//                 });

//                 folderDiv.appendChild(fileUl);
//                 foldersContainer.appendChild(folderDiv);
//             }
//         }
//     } catch (error) {
//         console.error('Error listing folders and files:', error);
//         showPopupMessage('Error loading files. Please try again later.', true);
//     } finally {
//         hideLoadingScreen();
//     }
// }

// displayFoldersAndPdfs();

// async function displayFoldersAndPdfs() {
//     showLoadingScreen();
//     const foldersContainer = document.getElementById('foldersContainer');
//     foldersContainer.innerHTML = '';

//     try {
//         const rootRef = firebase.storage().ref('questionPapers'); // Root folder in storage
//         const folderList = await rootRef.listAll();

//         if (folderList.prefixes.length === 0) {
//             foldersContainer.innerHTML = '<p>No folders found.</p>';
//         } else {
//             // Loop through each folder
//             for (const folderRef of folderList.prefixes) {
//                 const folderName = folderRef.name;
                
//                 // Folder Header with Toggle
//                 const folderDiv = document.createElement('div');
//                 folderDiv.classList.add('folder');
//                 folderDiv.innerHTML = `<span>${folderName}</span><i class="fas fa-chevron-down"></i>`;

//                 // Create Table Element for File List
//                 const table = document.createElement('table');
//                 table.classList.add('file-table');
//                 table.style.width = '100%';
//                 table.style.marginLeft = '20px';
//                 table.style.display = 'none';
                
//                 // Table Header
//                 const headerRow = document.createElement('tr');
//                 headerRow.innerHTML = `
//                     <th style="color:white;">File Name</th>
//                     <th style="color:white;">Action</th>
//                 `;
//                 table.appendChild(headerRow);

//                 // Toggle files display on click
//                 folderDiv.addEventListener('click', async () => {
//                     const isActive = folderDiv.classList.toggle('active');
//                     table.style.display = isActive ? 'table' : 'none';

//                     // Fetch files if not already loaded
//                     if (isActive && table.rows.length === 1) { // Only load if header row exists
//                         const fileList = await folderRef.listAll();
//                         if (fileList.items.length > 0) {
//                             fileList.items.forEach(async (fileRef) => {
//                                 const fileUrl = await fileRef.getDownloadURL();

//                                 // Table Row for Each File
//                                 const row = document.createElement('tr');
//                                 row.style.color = 'white';

//                                 // File Link
//                                 const fileNameCell = document.createElement('td');
//                                 const fileLink = document.createElement('a');
//                                 fileLink.href = fileUrl;
//                                 fileLink.target = '_blank';
//                                 fileLink.textContent = fileRef.name;
//                                 fileNameCell.appendChild(fileLink);
//                                 row.appendChild(fileNameCell);

//                                 // Delete Button
//                                 const actionCell = document.createElement('td');
//                                 const deleteIcon = document.createElement('i');
//                                 deleteIcon.classList.add('fas', 'fa-trash-alt');
//                                 deleteIcon.style.color = '#f44336';
//                                 deleteIcon.style.cursor = 'pointer';
//                                 deleteIcon.addEventListener('click', (e) => {
//                                     e.stopPropagation(); // Prevent folder toggle on delete
//                                     deletePDF(fileRef, row);
//                                 });
//                                 actionCell.appendChild(deleteIcon);
//                                 row.appendChild(actionCell);

//                                 table.appendChild(row);
//                             });
//                         } else {
//                             const noFilesRow = document.createElement('tr');
//                             const noFilesCell = document.createElement('td');
//                             noFilesCell.colSpan = 2;
//                             noFilesCell.textContent = 'No files found in this folder.';
//                             noFilesRow.appendChild(noFilesCell);
//                             table.appendChild(noFilesRow);
//                         }
//                     }
//                 });

//                 folderDiv.appendChild(table);
//                 foldersContainer.appendChild(folderDiv);
//             }
//         }
//     } catch (error) {
//         console.error('Error listing folders and files:', error);
//         showPopupMessage('Error loading files. Please try again later.', true);
//     } finally {
//         hideLoadingScreen();
//     }
// }

// displayFoldersAndPdfs();

async function displayFoldersAndPdfs() {
    showLoadingScreen();
    const foldersContainer = document.getElementById('foldersContainer');
    foldersContainer.innerHTML = '';

    try {
        const rootRef = firebase.storage().ref('questionPapers'); // Root folder in storage
        const folderList = await rootRef.listAll();

        if (folderList.prefixes.length === 0) {
            foldersContainer.innerHTML = '<p>No folders found.</p>';
        } else {
            for (const folderRef of folderList.prefixes) {
                const folderName = folderRef.name;
                
                // Folder Container
                const folderContainer = document.createElement('div');
                folderContainer.classList.add('folder-container');

                // Folder Header
                const folderHeader = document.createElement('div');
                folderHeader.classList.add('folder-header');
                folderHeader.innerHTML = `<span>${folderName}</span><i class="fas fa-chevron-down"></i>`;

                // Table Element for File List
                const table = document.createElement('table');
                table.classList.add('file-table');

                // Table Header
                const headerRow = document.createElement('tr');
                headerRow.innerHTML = `
                    <th>File Name</th>
                    <th>Action</th>
                `;
                table.appendChild(headerRow);

                // Toggle Table Display
                folderHeader.addEventListener('click', async () => {
                    const isActive = folderHeader.classList.toggle('active');
                    table.style.display = isActive ? 'table' : 'none';

                    // Load Files if Not Already Loaded
                    if (isActive && table.rows.length === 1) {
                        const fileList = await folderRef.listAll();
                        if (fileList.items.length > 0) {
                            fileList.items.forEach(async (fileRef) => {
                                const fileUrl = await fileRef.getDownloadURL();

                                // Table Row for Each File
                                const row = document.createElement('tr');

                                // File Link
                                const fileNameCell = document.createElement('td');
                                const fileLink = document.createElement('a');
                                fileLink.href = fileUrl;
                                fileLink.target = '_blank';
                                fileLink.textContent = fileRef.name;
                                fileNameCell.appendChild(fileLink);
                                row.appendChild(fileNameCell);

                                // Delete Icon
                                const actionCell = document.createElement('td');
                                const deleteIcon = document.createElement('i');
                                deleteIcon.classList.add('fas', 'fa-trash-alt');
                                deleteIcon.addEventListener('click', (e) => {
                                    e.stopPropagation();
                                    deletePDF(fileRef, row);
                                });
                                actionCell.appendChild(deleteIcon);
                                row.appendChild(actionCell);

                                table.appendChild(row);
                            });
                        } else {
                            const noFilesRow = document.createElement('tr');
                            const noFilesCell = document.createElement('td');
                            noFilesCell.colSpan = 2;
                            noFilesCell.textContent = 'No files found in this folder.';
                            noFilesRow.appendChild(noFilesCell);
                            table.appendChild(noFilesRow);
                        }
                    }
                });

                folderContainer.appendChild(folderHeader);
                folderContainer.appendChild(table);
                foldersContainer.appendChild(folderContainer);
            }
        }
    } catch (error) {
        console.error('Error listing folders and files:', error);
        showPopupMessage('Error loading files. Please try again later.', true);
    } finally {
        hideLoadingScreen();
    }
}

displayFoldersAndPdfs();
