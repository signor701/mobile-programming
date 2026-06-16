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

//Function to write user data to Firebase Realtime Database
// Get the database instance
// Create a reference/points to 'users/{userId}' and set the data (name and email)
function writeUserData(userId, firstname, lastname, age, gender, height, course, address, email, phone, interests) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    firstname: firstname,      
    lastname: lastname,
    age: age,
    gender: gender,
    height: height,
    course: course,
    address: address,
    email: email,
    phone: phone,
    interests : interests
  });
}
writeUserData(1, "Signor", "Pandeya", 21, "Female", "161 cm", "BScIT", "Kathmandu", "signorpandeya2@gmail.com", 9829561500, "Mobile Development, Full Stack Development");
writeUserData(2, "Khushi", "Maharjan", 22, "Female", "182 cm", "BScIT", "Kathmandu", "khushhimaharjan@gmail.com", 9875467828, "AI/ML, Graphic Designing")
writeUserData(3, "Avipsha", "Shrestha", 20, "Female", "161 cm", "BScIT", "Kathmandu", "avipshashrestha@gmail.com", 9841234543, "Web Development, Cybersecurity");
writeUserData(4, "Preshika", "Thapa", 22, "Female", "171 cm", "BScIT", "Kathmandu", "preshikathapa@gmail.com", 9863456345, "Mobile App Development, UI/UX");
writeUserData(5, "Arpana", "Bista", 22, "Female", "162 cm", "BScIT", "Kathmandu", "arpanabista@gmail.com", 984456980, "Digital Marketing, Graphic Designing");
writeUserData(6, "Prija", "Sanjel", 22, "Female", "160 cm", "BScIT", "Kathmandu", "prijasanjel@gmail.com", 9866786543, "Software Engineering, Machine Learning");
writeUserData(7, "Ankita", "Gautam", 22, "Female", "159 cm", "BScIT", "Kathmandu", "ankitagautam@gmail.com", 9847890709, "Cybersecurity, Ethical Hacking");
writeUserData(8, "Resham", "ACharya", 29, "Male", "176 cm", "BIT", "Kathmandu", "reshamacharya@gmail.com", 9858906580, "Data Science, Frontend Development");
writeUserData(9, "Binod", "rijal", 21, "Male", "177 cm", "BIM", "Kathmandu", "binodrijal@gmail.com", 9869012358, "Artificial Intelligence, Robotics");
writeUserData(10, "Bhichhu", "Prasai", 20, "Female", "168 cm", "BScIT", "Kathmandu", "bhichhuprasai@gmail.com", 9855678410, "Cloud Computing, Networking");

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
updateUserData(2, {firstname: "Sakshi", lastname: "KC"});
updateUserData(8, {firstname: "<Mohan>", lastname: "Bhattarai"});
updateUserData(6, {firstname: "Sharmila", lastname: "Rijal", email: "sharmilarijal@gmail.com"});

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
deleteUserData(10);

console.log("Added! Good")