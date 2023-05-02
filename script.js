function showHome() {
    // Update the page title and content
    document.getElementById("pageTitle").innerHTML = "Home";
    document.getElementById("pageContent").innerHTML = "Welcome to my home page! This site is still under construction, but I hope to have more content soon.";

    // Update the active tab
    var navLinks = document.getElementsByClassName("navbar")[0].getElementsByTagName("a");
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("active");
    }
    navLinks[0].classList.add("active");
}

function showAbout() {
    // Update the page title and content
    document.getElementById("pageTitle").innerHTML = "About";
    document.getElementById("pageContent").innerHTML = "I am a web developer who enjoys building responsive and user-friendly websites. I have experience with HTML, CSS, JavaScript, and Python.";

    // Update the active tab
    var navLinks = document.getElementsByClassName("navbar")[0].getElementsByTagName("a");
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("active");
    }
    navLinks[1].classList.add("active");
}

function showContact() {
document.getElementById("pageTitle").innerHTML = "Contact";
document.getElementById("pageContent").innerHTML = "You can reach me by email at <a href='mailto:maj.mohar4@gmail.com'>maj.mohar4@gmail.com</a>.";
var navLinks = document.getElementsByClassName("navbar")[0].getElementsByTagName("a");
for (var i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("active");
}
navLinks[2].classList.add("active");
}

function setCookie(cookieName, cookieValue, expirationDays) {
    var d = new Date();
    d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cookieName + "=" + cookieValue + ";" + expires + ";path=/";
  }
  
  function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
  
  function checkCookie() {
    var lastAccess = getCookie("lastAccess");
    var visitCount = getCookie("visitCount");
    var currentDate = new Date();
    var minutes = Math.floor((currentDate.getTime() - lastAccess) / 60000);
    if (lastAccess != "") {
      document.getElementById("lastAccess").innerHTML = minutes;
      document.getElementById("accessCount").innerHTML = parseInt(visitCount) + 1;
      setCookie("lastAccess", currentDate.getTime(), 30);
      setCookie("visitCount", parseInt(visitCount) + 1, 30);
    } else {
      setCookie("lastAccess", currentDate.getTime(), 30);
      setCookie("visitCount", 1, 30);
    }
  }
  
  checkCookie();
  

  function showLogin() {
    window.location = "login.html";
    // Update the active tab
    var navLinks = document.getElementsByClassName("login")[0].getElementsByTagName("a");
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].classList.remove("active");
    }
    navLinks[1].classList.add("active");
}
function showRegister() {
  window.location = "register.html";
  var navLinks = document.getElementsByClassName("register")[0].getElementsByTagName("a");
  for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].classList.remove("active");
  }
  navLinks[1].classList.add("active");
}

const firebaseConfig = {
  apiKey: "AIzaSyDEToCS6l8wxblLFrpRfo06QvdOlkXpSlA",
  authDomain: "kroky-8da29.firebaseapp.com",
  projectId: "kroky-8da29",
  storageBucket: "kroky-8da29.appspot.com",
  messagingSenderId: "790482221073",
  appId: "1:790482221073:web:933c53f7760d47b63219b0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the authentication service
const auth = firebase.auth();

// Get a reference to the Firestore database
const db = firebase.firestore();

// Login function
function login() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  auth.signInWithEmailAndPassword(email, password)
      .then(() => {
          document.getElementById("login-form").style.display = "none";
          document.getElementById("profile").style.display = "block";
          document.getElementById("user-email").innerHTML = "Logged in as: " + email;
          if (email === "maj.mohar4@gmail.com") {
              document.getElementById("users").style.display = "block";
              getUsers();
          } else {
              document.getElementById("users").style.display = "none";
          }
      })
      .catch(error => {
          alert(error.message);
      });
}

// Sign up function
function signup() {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;
  auth.createUserWithEmailAndPassword(email, password)
      .then(() => {
          alert("Account created successfully!");
      })
      .catch(error => {
          alert(error.message);
          alert("Account not created! Try again.")
      });
}

// Logout function
function logout() {
  auth.signOut()
      .then(() => {
          location.reload();
      })
      .catch(error => {
          alert(error.message);
      });
}

// Get all users
function getUsers() {
  db.collection("users").get()
      .then(querySnapshot => {
          const userList = document.getElementById("user-list");
          querySnapshot.forEach(doc => {
              const user = doc.data();
              const li = document.createElement("li");
              li.innerHTML = user.name + " (" + user.email + ")";
              userList.appendChild(li);
          });
      })
      .catch(error => {
          alert(error.message);
      });
}

