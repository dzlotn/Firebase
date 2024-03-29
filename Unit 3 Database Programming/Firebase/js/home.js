// ----------------- Page Loaded After User Sign-in -------------------------//

// ----------------- Firebase Setup & Initialization ------------------------//

// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
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
let userLink = document.getElementById('userLink') //user name for navbar
let signOutLink = document.getElementById('signOut'); //sign out link
let welcome = document.getElementById('welcome') //welcome header
let currentUser = null;//initialize currentUser to null





// ----------------------- Get User's Name'Name ------------------------------
function getUserName(){
  //Grab the value for the 'keep logged in' switch
  let keepLoggedIn = localStorage.getItem("keepLoggedIn");

  //Grab user information passed form signIn.js
  if(keepLoggedIn == "yes"){
    currentUser = JSON.parse(localStorage.getItem('user'));

  }
  else{
    currentUser = JSON.parse(sessionStorage.getItem('user'));
   
  }
}
function signOutUser(){
  sessionStorage.removeItem('user')   //clear session storage
  localStorage.removeItem('user')     //clear local storage
  localStorage.removeItem('keepLoggedIn'); 
  signOut(auth).then(()=>{

    //sign-out successfull
  }).catch((error) =>{
    //error ocured
  })
  window.location = 'home.html'


}

// Sign-out function that will remove user info from local/session storage and
// sign-out from FRD



// ------------------------Set (insert) data into FRD ------------------------
function setData(userID,year,month,day,temperature){
//must use brackets around variable name to use it as a key dumbo
    set(ref(db,'users/'+userID+'/data/'+year+'/'+month),{
      [day]: temperature
    })
    .then(()=>{
      alert("Data stored successfully.")
    })
    .catch((error)=>{
      alert("There was an error. Error: " +error)
    });
}

// -------------------------Update data in database --------------------------
function updateData(userID,year,month,day,temperature){
  //must use brackets around variable name to use it as a key dumbo
      update(ref(db,'users/'+userID+'/data/'+year+'/'+month),{
        [day]: temperature
      })
      .then(()=>{
        alert("Data updated successfully.")
      })
      .catch((error)=>{
        alert("There was an error. Error: " +error)
      });
  }

// ----------------------Get a datum from FRD (single data point)---------------
function getData(userID,year,month,day){
  let yearVal = document.getElementById('yearVal');
  let monthVal = document.getElementById('monthVal');
  let dayVal = document.getElementById('dayVal');
  let tempVal = document.getElementById('tempVal');
  const dbref = ref(db); //firebase parameter required for get

  //provide the path through the nodes to the data
  get(child(dbref,'users/'+userID + '/data/' + year + '/' +month )).then((snapshot)=>{
    if(snapshot.exists()){
      yearVal.textContent = year;
      monthVal.textContent = month;
      dayVal.textContent = day;
      //to get specific value from a key: snapshot.val()[key]
      tempVal.textContent = snapshot.val()[day];
    }
    else{
      alert('no data found.')
    }
  })
  .catch((error)=>{
    alert('unsuccessful, error: '+error)
  })

  
}

// ---------------------------Get a month's data set --------------------------
// Must be an async function because you need to get all the data from FRD
// before you can process it for a table or graph


// Add a item to the table of data



// -------------------------Delete a day's data from FRD ---------------------



// --------------------------- Home Page Loading -----------------------------

window.onload = function(){
// ------------------------- Set Welcome Message -------------------------
  getUserName();
  if(currentUser == null){
  userLink.innerText = "Create New Account";
  userLink.classList.replace("nav-link","btn");
  userLink.classList.add("btn-primary")
  userLink.href = "register.html";

  signOutLink.innerText = "Sign In"
  signOutLink.classList.replace("nav-link","btn")
  signOutLink.classList.add("btn-success");
  signOutLink.href = "signIn.html";
  }
  else{
      userLink.innerText = currentUser.firstname;
      welcome.innerText = "Welcome "+currentUser.firstname;
      userLink.classList.replace("btn","nav_link");
      userLink.classList.add("btn-primary")
      userLink.href = "#";

      signOutLink.innerText = "Sign Out"
      signOutLink.classList.replace("btn","nav_link")
      signOutLink.classList.add("btn-success");
      document.getElementById('signOut').onclick = function(){
        signOutUser();
      }
  }
  

  
  // Get, Set, Update, Delete Sharkriver Temp. Data in FRD
  // Set (Insert) data function call
  document.getElementById('set').onclick = function(){
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;
    const day = document.getElementById('day').value;
    const temperature = document.getElementById('temperature').value;
    const userID = currentUser.uid;
    setData(userID,year,month,day,temperature);
  };
  
 
  
 

  // Update data function call
  document.getElementById('update').onclick = function(){
    const year = document.getElementById('year').value;
    const month = document.getElementById('month').value;
    const day = document.getElementById('day').value;
    const temperature = document.getElementById('temperature').value;
    const userID = currentUser.uid;
    updateData(userID,year,month,day,temperature);
  };

  // Get a datum function call
  document.getElementById('get').onclick = function(){
    const year = document.getElementById('getYear').value;
    const month = document.getElementById('getMonth').value;
    const day = document.getElementById('getDay').value;
    const userID = currentUser.uid;
    getData(userID,year,month,day);
  };
}

  // Get a data set function call
  

  // Delete a single day's data function call
  

