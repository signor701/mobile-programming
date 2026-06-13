/// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
  import {getDatabase, ref, set, get, update, remove} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyDJoGM3KMN_bb7S5mk2GRgcQUekCGHPX8w",
    authDomain: "mobile-e6155.firebaseapp.com",
    projectId: "mobile-e6155",
    storageBucket: "mobile-e6155.firebasestorage.app",
    messagingSenderId: "850349311850",
    appId: "1:850349311850:web:352d575366a5fdba128713"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app)

  console.log(db)



// Function to write user data to Firebase Realtime Database
// Function to write user data with unique ID
function writeUserData(userId, firstname, lastname, age, subject, gender, college, contactnumber, address, gmailId, height) {
  // Create a reference to 'users' collection
  const usersRef = ref(db, 'users/' + userId);

  // push() generates a unique key for the new child
  //const newUserRef = push(usersRef);

  // set() stores the data at that unique location
  set(usersRef, {
    firstname: firstname,      
    lastname: lastname,
    age: age,
    subject: subject,
    gender: gender,
    college: college,
    contactnumber: contactnumber,
    address: address,
    gmailId: gmailId,
    height: height
  })
  .then(() => {
    console.log("User added successfully with ID:", userId);
  })
  .catch((error) => {
    console.error("Error adding user:", error);
  });
}

// Expose the function to the global scope so it can be accessed from HTML (e.g., via button click)
window.writeUserData = writeUserData;


// ref(db, 'users') points to the users path.
// get(userRef) gets the data at that path.
// snapshot.forEach(...) loops over each child node (each user).
// childsnapshot.val() gives the actual data (name and email), which is printed.
function readUser(){
    const userRef = ref(db,'users')
    get(userRef).then((snapshot)=>{
        snapshot.forEach((childsnapshot)=>{
            console.log(childsnapshot.val());
        })
    })
}
//readUser()
window.readUser = readUser;


// Read a single user by ID and show the result on the page.
function readUserById(userId) {
  const userRef = ref(db, 'users/' + userId);
  get(userRef).then((snapshot) => {
    const user = snapshot.val();
    console.log("User found:", user);
    document.getElementById('read-result').textContent =
      "Name: " + user.firstname +  user.lastname  + " | " + "Age: " + user.age + " | " + "Subject: " + user.subject + " | "+ "Gender: " + user.gender + " | " + "College: " + user.college + " | " + "ContactNumber: " + user.contactnumber + " | " + "Address: " + user.address + " | " + "gmailID: " + user.gmailId + " | " + "Height: " + user.height;
  });
}
window.readUserById = readUserById;



// Fetch an existing user by ID and load their data into the update input fields,
// so the values can be edited and then saved with updateUserData().
function fetchUserForUpdate(userId) {
  const userRef = ref(db, 'users/' + userId);
  get(userRef).then((snapshot) => {
    const user = snapshot.val();
    document.getElementById('update-firstname').value = user.firstname;
    document.getElementById('update-lastname').value = user.lastname;
    document.getElementById('update-age').value = user.age;
    document.getElementById('update-subject').value = user.subject;
    document.getElementById('update-gender').value = user.gender;
    document.getElementById('update-college').value = user.college;
    document.getElementById('update-contactnumber').value = user.contactnumber;
    document.getElementById('update-address').value = user.address;
    document.getElementById('update-gmailId').value = user.gmailId;
    document.getElementById('update-height').value = user.height;
    console.log("Loaded user into form:", user);
  });
}
window.fetchUserForUpdate = fetchUserForUpdate;


function updateUserData(userId, updatedData) {
  const userRef = ref(db, 'users/' + userId);
  update(userRef, updatedData)
    .then(() => {
      console.log("User updated successfully");
    })
    .catch((error) => {
      console.error("Error updating user:", error);
    });
}

// Example usage:
//updateUserData();
window.updateUserData = updateUserData;



function deleteUserData(userId) {
  const userRef = ref(db, 'users/' + userId);
  remove(userRef)
    .then(() => {
      console.log("User deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting user:", error);
    });
}

// Example usage:
//deleteUserData(2);
window.deleteUserData = deleteUserData;