// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getDatabase, ref, set, get, update, remove } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBwurhTkd5Uzu66RMY893RqNqOLUL9y0QQ",
  authDomain: "signor-2.firebaseapp.com",
  databaseURL: "https://signor-2-default-rtdb.firebaseio.com",
  projectId: "signor-2",
  storageBucket: "signor-2.firebasestorage.app",
  messagingSenderId: "548916971399",
  appId: "1:548916971399:web:4dab1cffb5caaa08d7f522"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log(db);

let editId = null;

document.getElementById("submitBtn").addEventListener("click", submitContact);
document.getElementById("updateBtn").addEventListener("click", updateContact);

loadContacts();

function submitContact() {
    console.log("Submit button clicked");
    const id = Date.now();
    const contactRef = ref(db, "contacts/" + id);
    set(contactRef, {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    })
    .then(() => {
        console.log("Contact saved successfully");
        alert("Contact Saved");
        clearForm();
        loadContacts();
    })
    .catch((error) => {
        console.error("Error saving contact:", error);
    });
}


function loadContacts() {
    const contactRef = ref(db, "contacts");
    get(contactRef)
    .then((snapshot) => {
        if (!snapshot.exists()) {
            document.getElementById("contactList").innerHTML = "No contacts found";
            return;
        }
        let latestId = null;
        let latestContact = null;
        snapshot.forEach((childSnapshot) => {
            latestId = childSnapshot.key;
            latestContact = childSnapshot.val();
        });
        document.getElementById("contactList").innerHTML = `
            <div>
                <p><b>Name:</b> ${latestContact.name}</p>
                <p><b>Email:</b> ${latestContact.email}</p>
                <p><b>Phone:</b> ${latestContact.phone}</p>
                <p><b>Subject:</b> ${latestContact.subject}</p>
                <p><b>Message:</b> ${latestContact.message}</p>
                <button onclick="editContact('${latestId}')">Edit</button>
            </div>
        `;
    })
    .catch((error) => {
        console.error("Error loading contacts:", error);
    });
}


function editContact(id) {
    const contactRef = ref(db, "contacts/" + id);
    get(contactRef)
    .then((snapshot) => {
        const contact = snapshot.val();
        document.getElementById("name").value = contact.name;
        document.getElementById("email").value = contact.email;
        document.getElementById("phone").value = contact.phone;
        document.getElementById("subject").value = contact.subject;
        document.getElementById("message").value = contact.message;
        editId = id;
        console.log("Loaded contact into form:", contact);
    })
    .catch((error) => {
        console.error("Error loading contact:", error);
    });
}

window.editContact = editContact;



function updateContact() {
    if (!editId) {
        alert("Please click Edit first");
        return;
    }
    const contactRef = ref(db, "contacts/" + editId);
    update(contactRef, {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        subject: document.getElementById("subject").value,
        message: document.getElementById("message").value
    })
    .then(() => {
        console.log("Contact updated successfully");
        alert("Contact Updated");
        editId = null;
        clearForm();
        loadContacts();
    })
    .catch((error) => {
        console.error("Error updating contact:", error);
    });
}


function clearForm() {

    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("message").value = "";
}