  // Import the functions you need from the SDKs you need
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


//Function to write user data to Firebase Realtime Database
function writeUserData(userId, firstname, lastname, age, subject, gender, college, contactnumber, address, gmailId, height) {
    // Get the database instance
    // const db = getDatabase();
  
// Create a reference/points to 'users/{userId}' and set the data (name and email)
 set(ref(db, 'users/' + userId), {
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
    });
  }
writeUserData(2, "Signor", "Pandeya", 21, "PRG", "Female", "PGS", 9829561500, "Anamnagar", "signorpandeya6@gmail.com", 5.4)
writeUserData(3, "Sita", "Pandeya", 42, "Maths", "Female", "Gorkha", 9829588500, "Dang", "sitapandeya6@gmail.com", 5.5)
writeUserData(4, "Shibam", "Pandeya", 11, "English", "Male", "GMSS", 9829500500, "Lamahi", "shibampandeya6@gmail.com", 5)
writeUserData(5, "BheshRaj", "Pandeya", 50, "Science", "Male", "Trichandra", 9449561500, "Ghorahi", "bheshrajpandeya6@gmail.com", 5.8)
writeUserData(6, "Goma", "Pandeya", 81, "Management", "Female", "Tribhuvan", 985661500, "Tulsipur", "gomapandeya6@gmail.com", 5.2)
writeUserData(7, "Shreeya", "Bhandari", 21, "Nepali", "Female", "Semo", 9829568700, "Butwal", "shreeyabhandari6@gmail.com", 5)
writeUserData(8, "Purnima", "Sharma", 23, "Social", "Female", "Mahendra", 9821261500, "Kathmandu", "purnimasharma6@gmail.com", 5.3)
writeUserData(9, "Sangit", "BM", 29, "Grammar", "Male", "Texas", 9829561589, "lalitpur", "sangitbm6@gmail.com", 5.6)
writeUserData(10, "Nabin", "Pant", 34, "Account", "Male", "Dipshika", 9829561577, "Bhaktapur", "nabinpant@gmail.com", 6.1)

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
readUser();


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
updateUserData(9, {firstname: "Benz", age: 32});
updateUserData(8, {lastname: "Pandeya"});




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

// // // // // // // // // Example usage:
deleteUserData(7);

//console.log("Added! Good")