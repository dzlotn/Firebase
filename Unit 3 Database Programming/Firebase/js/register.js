// This JS file is for registering a new app user ---------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
  import { getDatabase, ref, set,update,child,get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAXhE6PFCkOSccrb0VXpm_HkBI2Ga8SRJc",
    authDomain: "fblivedemo-a6d76.firebaseapp.com",
    databaseURL: "https://fblivedemo-a6d76-default-rtdb.firebaseio.com",
    projectId: "fblivedemo-a6d76",
    storageBucket: "fblivedemo-a6d76.appspot.com",
    messagingSenderId: "31960158000",
    appId: "1:31960158000:web:3eb4bae1cc8258755702f5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // Initialize authentication
  const auth = getAuth()
  // return instance of yuor app's firebase real time database (FRD) 
  const db = getDatabase(app)


// ---------------- Register New Uswer --------------------------------//

document.getElementById('submitData').onclick = function(){
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('userEmail').value;

  //Firebase will requrie a password of at least 6 characters
  const password = document.getElementById('userPass').value;

  // Validate user inputs
  if(!validation(firstName,lastName, email, password)){
    return;
  }
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // Add user account info to realtime database
    //'Set' will create a new reference or completely replace an existing one 
    //Each new user will be placed under the 'users' node
    set(ref(db,'users/' +user.uid + '/accountInfo'), {
      uid:user.uid,     //save userId for home.js reference
      email: email,
      password: encryptPass(password),
      firstname: firstName,
      lastname: lastName
    })
    .then(()=>{
      //data saved successfully
      alert('User created successfully!')
    })
    .catch((error)=>{
      alert(error)
    })


 
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
    // ..
  });

}


// --------------- Check for null, empty ("") or all spaces only ------------//
function isEmptyorSpaces(str){
  return str === null || str.match(/^ *$/) !== null

}

// ---------------------- Validate Registration Data -----------------------//
function validation(firstName, lastName, email, password){
  let fNameRegex = /^[a-zA-Z]+$/;
  let lNameRegex = /^[a-zA-Z]+$/;
  let emailRegex = /^[a-zA-Z0-9]+@ctemc\.org$/;
  
  if(isEmptyorSpaces(firstName) || isEmptyorSpaces(lastName) || 
  isEmptyorSpaces(email)||isEmptyorSpaces(password)){
    alert("Please complete all fields ")
    return false;
  }
  if(!fNameRegex.test(firstName)){
    alert("The first name should only contain letters.")
    return false;
  }
  if(!lNameRegex.test(lastName)){
    alert("The last name should only contain letters.")
    return false;
  }
  if(!emailRegex.test(email)){
    alert("Please enter a valid email")
    return false;
  }
  return true;


}

// --------------- Password Encryption -------------------------------------//

function encryptPass(password){
  let encrypted = CryptoJS.AES.encrypt(password,password)
  return encrypted.toString();
}
function decryptPass(password){
  let decrypted = CryptoJS.AES.decrypt(password,password)
  return decrypted.toString();
}