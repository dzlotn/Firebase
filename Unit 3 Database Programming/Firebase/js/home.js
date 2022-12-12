// ----------------- Page Loaded After User Sign-in -------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//

// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
  import { getDatabase, ref, set,update,child,get,remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

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


// ---------------------// Get reference values -----------------------------
let userLink = document.getElementsByID('userLink') //user name for navbar
let signOutLink = document.getElementsByID('signOut'); //sign out link
let welcome = document.getElementsByID('welcome') //welcome header
let currentUser = null;//initialize currentUser to null





// ----------------------- Get User's Name'Name ------------------------------
function getUserName(){
  //Grab the value for the 'keep logged in' switch
  let keepLoggedIn = localStorage.getItem("keepLoggedIn");

  //Grab user information passed form signIn.js
  if(keepLoggedIn == "yes"){
    currentUser = JSON.parse(localStorage,getItem('user'));

  }
  else{
    currentUser = JSON.parse(sessionStorage,getItem('user'));
   
  }

}

// Sign-out function that will remove user info from local/session storage and
// sign-out from FRD



// ------------------------Set (insert) data into FRD ------------------------


// -------------------------Update data in database --------------------------


// ----------------------Get a datum from FRD (single data point)---------------


// ---------------------------Get a month's data set --------------------------
// Must be an async function because you need to get all the data from FRD
// before you can process it for a table or graph


// Add a item to the table of data



// -------------------------Delete a day's data from FRD ---------------------



// --------------------------- Home Page Loading -----------------------------

  // ------------------------- Set Welcome Message -------------------------

  
  // Get, Set, Update, Delete Sharkriver Temp. Data in FRD
  // Set (Insert) data function call
  

  // Update data function call
  

  // Get a datum function call
  

  // Get a data set function call
  

  // Delete a single day's data function call
  

